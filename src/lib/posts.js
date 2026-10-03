import { supabase } from './supabaseClient';

const bucketName = 'fashion-posts';
let postViewRpcUnavailable = false;
const PRIVACY_PER_USER_KEY = 'aifashionProfilePrivacyPerUser';
const PRIVACY_KEY = 'aifashionProfilePrivacy';
let accountPrivacyCache = {};

function getCurrentLoggedInEmail() {
  try {
    const raw = window.localStorage.getItem('aifashionUserProfile');
    if (raw) {
      const p = JSON.parse(raw);
      if (p && p.email) return String(p.email).trim().toLowerCase();
    }
  } catch {}
  return '';
}

function normalizePrivacy(value) {
  return value === 'private' ? 'private' : 'public';
}

function postAuthorEmail(post) {
  if (!post || typeof post !== 'object') return '';
  return String(post.authorEmail || post.author_email || post.email || '').trim().toLowerCase();
}

function writeLocalPrivacy(userKey, value) {
  const privacy = normalizePrivacy(value);
  try {
    const raw = window.localStorage.getItem(PRIVACY_PER_USER_KEY);
    const map = raw ? JSON.parse(raw) || {} : {};
    map[userKey] = privacy;
    window.localStorage.setItem(PRIVACY_PER_USER_KEY, JSON.stringify(map));
  } catch {}
  const currentUserEmail = getCurrentLoggedInEmail();
  if (userKey && currentUserEmail && userKey === currentUserEmail) {
    try { window.localStorage.setItem(PRIVACY_KEY, privacy); } catch {}
  }
}

function mergePrivacyMapLocally(map) {
  try {
    const raw = window.localStorage.getItem(PRIVACY_PER_USER_KEY);
    const existing = raw ? JSON.parse(raw) || {} : {};
    window.localStorage.setItem(PRIVACY_PER_USER_KEY, JSON.stringify({ ...existing, ...map }));
  } catch {}
}

export function isSeedPost(post) {
  return typeof post === 'object' && String(post.id || '').startsWith('seed-');
}

export function getUserAccountPrivacy(userEmailOrAuthor) {
  const userKey = String(userEmailOrAuthor || 'default').trim().toLowerCase();
  if (accountPrivacyCache[userKey] === 'private' || accountPrivacyCache[userKey] === 'public') {
    return accountPrivacyCache[userKey];
  }
  try {
    const raw = window.localStorage.getItem(PRIVACY_PER_USER_KEY);
    if (raw) {
      const map = JSON.parse(raw);
      if (map && typeof map === 'object' && typeof map[userKey] === 'string') {
        return normalizePrivacy(map[userKey]);
      }
    }
  } catch {}
  const currentUserEmail = getCurrentLoggedInEmail();
  if (userKey && currentUserEmail && userKey === currentUserEmail) {
    try {
      const global = window.localStorage.getItem(PRIVACY_KEY);
      if (global) return normalizePrivacy(global);
    } catch {}
  }
  return 'public';
}

export async function fetchAccountPrivacyMap() {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('email, is_private');
    if (error) throw error;
    const map = {};
    for (const row of data || []) {
      const key = String(row.email || '').trim().toLowerCase();
      if (!key) continue;
      map[key] = row.is_private ? 'private' : 'public';
    }
    accountPrivacyCache = { ...accountPrivacyCache, ...map };
    mergePrivacyMapLocally(map);
    return accountPrivacyCache;
  } catch {
    return accountPrivacyCache;
  }
}

export async function persistUserAccountPrivacy(email, value) {
  const userKey = String(email || '').trim().toLowerCase();
  const privacy = normalizePrivacy(value);
  if (!userKey) return;
  accountPrivacyCache[userKey] = privacy;
  writeLocalPrivacy(userKey, privacy);

  const isPrivate = privacy === 'private';
  const { error: profileError } = await supabase
    .from('user_profiles')
    .upsert({ email: userKey, is_private: isPrivate, updated_at: new Date().toISOString() }, { onConflict: 'email' });
  if (profileError) {
    console.warn('Could not save account privacy to user_profiles:', profileError.message);
  }

  try {
    const { data: authorPosts, error: listError } = await supabase
      .from('posts')
      .select('id, author_email');
    if (!listError) {
      const ids = (authorPosts || [])
        .filter((post) => String(post.author_email || '').trim().toLowerCase() === userKey)
        .map((post) => post.id)
        .filter(Boolean);
      if (ids.length) {
        const { error: updateError } = await supabase
          .from('posts')
          .update({ is_private: isPrivate })
          .in('id', ids);
        if (updateError) {
          console.warn('Could not sync post privacy flags:', updateError.message);
        }
      }
    }
  } catch (error) {
    console.warn('Could not sync post privacy flags:', error?.message || error);
  }

  try { window.dispatchEvent(new Event('aifashion-privacy-updated')); } catch {}
  try { window.dispatchEvent(new Event('aifashion-posts-updated')); } catch {}
}

export async function syncCurrentUserAccountPrivacy(email) {
  const userKey = String(email || '').trim().toLowerCase();
  if (!userKey) return;
  let localPref = 'public';
  try {
    const raw = window.localStorage.getItem(PRIVACY_PER_USER_KEY);
    const map = raw ? JSON.parse(raw) : {};
    if (map && typeof map[userKey] === 'string') localPref = normalizePrivacy(map[userKey]);
    else localPref = normalizePrivacy(window.localStorage.getItem(PRIVACY_KEY) || 'public');
  } catch {}
  await fetchAccountPrivacyMap();
  const remotePref = accountPrivacyCache[userKey];
  if (localPref === 'private' && remotePref !== 'private') {
    await persistUserAccountPrivacy(userKey, 'private');
    return;
  }
  if (remotePref === 'private') {
    accountPrivacyCache[userKey] = 'private';
    writeLocalPrivacy(userKey, 'private');
    try { window.dispatchEvent(new Event('aifashion-privacy-updated')); } catch {}
  }
}

export function isPostPrivateGlobally(post, viewerEmail) {
  if (!post || typeof post !== 'object') return false;
  const perPostFlag = Boolean(post.isPrivate ?? post.is_private ?? post.private);
  if (perPostFlag) return true;
  const authorEmail = postAuthorEmail(post);
  if (!authorEmail) return false;
  const accountPrivate = Boolean(post.account_is_private) || getUserAccountPrivacy(authorEmail) === 'private';
  if (!accountPrivate) return false;
  const vKey = String(viewerEmail || '').trim().toLowerCase();
  if (vKey && authorEmail === vKey) return false;
  return true;
}

export function shouldHidePostFromViewer(post, viewerEmail) {
  if (!post || typeof post !== 'object') return false;
  const perPostPrivate = Boolean(post.isPrivate ?? post.is_private ?? post.private);
  if (perPostPrivate) return true;
  const authorEmail = postAuthorEmail(post);
  if (!authorEmail) return false;
  const accountPrivate = Boolean(post.account_is_private) || getUserAccountPrivacy(authorEmail) === 'private';
  if (!accountPrivate) return false;
  const vKey = String(viewerEmail || '').trim().toLowerCase();
  if (vKey && authorEmail === vKey) return false;
  return true;
}

export function purgeLocalUserPosts() {
  const removedIds = new Set(JSON.parse(window.localStorage.getItem('aifashionRemovedPostIds') || '[]'));
  const removeUserPosts = (posts) => (Array.isArray(posts) ? posts.filter((post) => {
    if (isSeedPost(post)) return true;
    const postId = typeof post === 'object' ? (post.id || post.url || post.title) : post;
    if (postId) removedIds.add(postId);
    return false;
  }) : []);

  try {
    const globalPosts = JSON.parse(window.localStorage.getItem('aifashionGlobalPosts') || '[]');
    window.localStorage.setItem('aifashionGlobalPosts', JSON.stringify(removeUserPosts(globalPosts)));
  } catch (e) {}

  try {
    const profiles = JSON.parse(window.localStorage.getItem('aifashionProfileStats') || '{}');
    for (const profile of Object.values(profiles)) {
      profile.postImages = removeUserPosts(profile.postImages);
      profile.posts = profile.postImages.length;
    }
    window.localStorage.setItem('aifashionProfileStats', JSON.stringify(profiles));
  } catch (e) {}

  try {
    const recentlyViewed = JSON.parse(window.localStorage.getItem('aifashionRecentlyViewed') || '[]');
    window.localStorage.setItem('aifashionRecentlyViewed', JSON.stringify(removeUserPosts(recentlyViewed)));
  } catch (e) {}

  window.localStorage.setItem('aifashionRemovedPostIds', JSON.stringify([...removedIds]));
}

export async function uploadPost({ files, title, category, price, description, stock, authorEmail, authorName, authorHandle, isPrivate }) {
  if (!files?.length) throw new Error('Please select at least one image.');
  const uploadedImages = [];

  for (const file of files) {
    const fileId = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const filePath = `${authorEmail || 'anonymous'}/${fileId}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, { cacheControl: '3600', upsert: false });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
    uploadedImages.push(data.publicUrl);
  }

  const privateFlag = Boolean(isPrivate) || getUserAccountPrivacy(authorEmail) === 'private';
  const row = {
    title: title || 'New Design',
    category: category || null,
    price: price ? Number(price) : 0,
    description: description || null,
    image_url: uploadedImages[0],
    images: uploadedImages,
    author_email: authorEmail || null,
    author_name: authorName || 'Anonymous',
    author_handle: authorHandle || '@user',
    stock: Number(stock) > 0 ? Number(stock) : 0,
    is_private: privateFlag,
  };

  let { data: post, error: postError } = await supabase
    .from('posts').insert(row).select().single();

  if (postError && /stock/i.test(postError.message || '')) {
    const { stock: _dropped, ...withoutStock } = row;
    ({ data: post, error: postError } = await supabase
      .from('posts').insert(withoutStock).select().single());
    if (!postError) {
      console.warn('posts.stock column is missing — run supabase-schema.sql to store stock counts.');
    }
  }

  if (postError && /is_private/i.test(postError.message || '')) {
    const { is_private: _dp, ...withoutPrivate } = row;
    ({ data: post, error: postError } = await supabase
      .from('posts').insert(withoutPrivate).select().single());
    if (!postError) {
      console.warn('posts.is_private column missing — storing as localStorage only.');
      if (post && privateFlag) post.is_private = true;
    }
  }

  if (postError) throw postError;
  return post;
}

export async function fetchPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  await fetchAccountPrivacyMap();
  const mergedPosts = new Map();
  const removedPostIds = new Set(JSON.parse(window.localStorage.getItem('aifashionRemovedPostIds') || '[]'));
  for (const post of (data || []).filter((post) => !removedPostIds.has(post.id))) {
    const mergeKey = [
      post.author_email || '',
      post.title || '',
      post.category || '',
      post.price || 0,
      post.description || '',
    ].join('|');
    const existing = mergedPosts.get(mergeKey);
    if (!existing) {
      mergedPosts.set(mergeKey, { ...post, images: Array.isArray(post.images) ? post.images : [post.image_url] });
      continue;
    }
    existing.images = [...existing.images, ...(Array.isArray(post.images) ? post.images : [post.image_url])]
      .filter((image, index, images) => image && !images.slice(0, index).includes(image));
  }

  return [...mergedPosts.values()].map((post) => {
    const authorEmail = postAuthorEmail(post);
    const accountPrivate = Boolean(post.account_is_private) || getUserAccountPrivacy(authorEmail) === 'private';
    const postPrivate = Boolean(post.is_private || post.isPrivate || post.private) || accountPrivate;
    return {
      ...post,
      url: post.image_url,
      images: post.images,
      date: post.created_at,
      isNew: true,
      views: post.views || 0,
      shares: post.shares || 0,
      authorEmail: post.author_email || post.authorEmail,
      account_is_private: accountPrivate,
      is_private: postPrivate,
      isPrivate: postPrivate,
    };
  });
}

export async function incrementPostView(postId) {
  if (postViewRpcUnavailable) return null;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(postId || ''))) {
    return null;
  }

  const { data, error } = await supabase.rpc('increment_post_view', {
    target_post_id: postId,
  });

  if (error?.code === 'PGRST202') {
    postViewRpcUnavailable = true;
    return null;
  }
  if (error) throw error;
  return data == null ? null : Number(data);
}

export async function deletePost(postId) {
  if (!postId) return;
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId);

  if (error) throw error;
}

import { supabase } from './supabaseClient';

const bucketName = 'fashion-posts';
const seedAuthorEmails = new Set(['awais@aifashion.com', 'sara@fashion.com', 'zain@studio.com']);

function isSeedPost(post) {
  return typeof post === 'object' && String(post.id || '').startsWith('seed-');
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

export async function uploadPost({ files, title, category, price, description, stock, authorEmail, authorName, authorHandle }) {
  if (!files?.length) throw new Error('Please select at least one image.');
  const uploadedImages = [];

  for (const file of files) {
    const filePath = `${authorEmail || 'anonymous'}/${crypto.randomUUID()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, { cacheControl: '3600', upsert: false });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
    uploadedImages.push(data.publicUrl);
  }

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
  };

  let { data: post, error: postError } = await supabase
    .from('posts').insert(row).select().single();

  // `stock` was added later — fall back gracefully if the column isn't there yet
  // so uploads keep working until supabase-schema.sql has been re-run.
  if (postError && /stock/i.test(postError.message || '')) {
    const { stock: _dropped, ...withoutStock } = row;
    ({ data: post, error: postError } = await supabase
      .from('posts').insert(withoutStock).select().single());
    if (!postError) {
      console.warn('posts.stock column is missing — run supabase-schema.sql to store stock counts.');
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

  return [...mergedPosts.values()].map((post) => ({
    ...post,
    url: post.image_url,
    images: post.images,
    date: post.created_at,
    isNew: true,
    views: post.views || 0,
    shares: post.shares || 0,
  }));
}

export async function purgeUserUploadedPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('id, author_email');

  if (error) throw error;
  const userPosts = (data || []).filter((post) => post.author_email && !seedAuthorEmails.has(post.author_email));
  const removedIds = new Set(JSON.parse(window.localStorage.getItem('aifashionRemovedPostIds') || '[]'));

  for (const post of userPosts) {
    removedIds.add(post.id);
    const { error: deleteError } = await supabase.from('posts').delete().eq('id', post.id);
    if (deleteError) console.error('User post could not be deleted from Supabase:', deleteError);
  }

  window.localStorage.setItem('aifashionRemovedPostIds', JSON.stringify([...removedIds]));
  return userPosts.length;
}

export async function deletePost(postId) {
  if (!postId) return;
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId);

  if (error) throw error;
}

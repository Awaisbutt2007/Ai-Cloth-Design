import { useEffect, useState } from 'react';

const REACTIONS_KEY = 'aifashionPostReactions';
const LIKED_POSTS_KEY = 'aifashionLikedPosts';
export const REACTIONS_UPDATED_EVENT = 'aifashion-reactions-updated';

function readJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : fallback;
    return parsed ?? fallback;
  } catch (e) {
    return fallback;
  }
}

export function getPostId(post) {
  if (!post) return '';
  if (typeof post === 'string') return post;
  return post.id || post.url || post.image_url || post.title || '';
}

/** The key reactions are stored under — same one ProfileSection reads. */
export function getUserKey(email) {
  if (email) return email;
  try {
    const profile = JSON.parse(window.localStorage.getItem('aifashionUserProfile') || 'null');
    if (profile?.email) return profile.email;
  } catch (e) {}
  return 'default';
}

export function getReactionStore() {
  return readJson(REACTIONS_KEY, {});
}

/**
 * Snapshots of liked posts, keyed by user then post id. Needed because a user
 * can like a post that isn't their own, and the profile has no other copy of it.
 */
function getLikedPostMap() {
  return readJson(LIKED_POSTS_KEY, {});
}

export function getLikedPostIds(email) {
  const userKey = getUserKey(email);
  const store = getReactionStore();
  return new Set(Object.keys(store).filter((id) => store[id]?.likes?.[userKey]));
}

export function getLikedPosts(email) {
  const userKey = getUserKey(email);
  const liked = getLikedPostIds(email);
  const snapshots = getLikedPostMap()[userKey] || {};
  return [...liked].map((id) => snapshots[id]).filter(Boolean);
}

export function isLiked(post, email) {
  const id = getPostId(post);
  if (!id) return false;
  return !!getReactionStore()[id]?.likes?.[getUserKey(email)];
}

/** Toggles the like and returns the new state. */
export function toggleLike(post, email) {
  const id = getPostId(post);
  if (!id) return false;

  const userKey = getUserKey(email);
  const store = getReactionStore();
  const entry = store[id] || { likes: {}, saves: {} };
  entry.likes = entry.likes || {};
  entry.saves = entry.saves || {};

  const nowLiked = !entry.likes[userKey];
  if (nowLiked) entry.likes[userKey] = true;
  else delete entry.likes[userKey];

  store[id] = entry;
  window.localStorage.setItem(REACTIONS_KEY, JSON.stringify(store));

  const snapshots = getLikedPostMap();
  const forUser = snapshots[userKey] || {};
  if (nowLiked) {
    forUser[id] = typeof post === 'string'
      ? { id, url: post, title: 'Custom Design' }
      : { ...post };
  } else {
    delete forUser[id];
  }
  snapshots[userKey] = forUser;
  window.localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify(snapshots));

  window.dispatchEvent(new Event(REACTIONS_UPDATED_EVENT));
  return nowLiked;
}

/** Keeps a component in sync with the set of liked post ids. */
export function useLikedPostIds(email) {
  const [ids, setIds] = useState(() => getLikedPostIds(email));

  useEffect(() => {
    const sync = () => setIds(getLikedPostIds(email));
    sync();
    window.addEventListener(REACTIONS_UPDATED_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(REACTIONS_UPDATED_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, [email]);

  return ids;
}

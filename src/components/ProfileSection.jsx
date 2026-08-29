import React, { useState, useRef, useEffect } from 'react';
import {
  Share2, Settings, QrCode, Copy, Check, Grid, Heart, User, AtSign, Clock, AlertCircle, X, MoreVertical, LogOut, Star, Eye, Bookmark, Send, Upload, ImagePlus, Download, Trash2, Flag, Link2, EyeOff
} from 'lucide-react';
import { repairImageUrl, DEFAULT_POST_PLACEHOLDER } from '../constants';
import { deletePost } from '../lib/posts';
import { getLikedPosts, REACTIONS_UPDATED_EVENT } from '../lib/reactions';
import QRCode from 'qrcode';

const SHARE_TARGETS = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    tint: '#25d366',
    icon: <Send size={18} />,
    href: (url, text) => `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
  },
  {
    id: 'x',
    label: 'X',
    tint: '#ffffff',
    icon: <Star size={18} />,
    href: (url, text) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
  },
  {
    id: 'facebook',
    label: 'Facebook',
    tint: '#1877f2',
    icon: <Flag size={18} />,
    href: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    id: 'email',
    label: 'Email',
    tint: '#f59e0b',
    icon: <Send size={18} />,
    href: (url, text) => `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`,
  },
];

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

function readEditInfo(storageKey) {
  try {
    const data = window.localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : { lastEditAt: null, lastValue: '' };
  } catch (e) {
    return { lastEditAt: null, lastValue: '' };
  }
}

function formatCooldown(cd) {
  if (!cd) return '';
  return cd.days > 0 ? `${cd.days}d ${cd.hours}h` : `${cd.hours}h ${cd.minutes}m`;
}

function getRemainingTime(targetMs) {
  const now = Date.now();
  const diff = targetMs - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  return { days, hours, minutes };
}

// Supabase rows use snake_case; the local post shape uses camelCase.
function normalizeRemotePost(post) {
  return {
    ...post,
    id: post.id,
    url: post.url || post.image_url,
    images: Array.isArray(post.images) ? post.images : [post.url || post.image_url].filter(Boolean),
    title: post.title,
    description: post.description,
    authorEmail: post.authorEmail || post.author_email,
    authorName: post.authorName || post.author_name,
    authorHandle: post.authorHandle || post.author_handle,
    views: Number(post.views || 0),
    likes: Number(post.likes || 0),
    comments: Number(post.comments || 0),
    shares: Number(post.shares || 0),
    date: post.date || post.created_at,
  };
}

function getProfileStats(email, remotePosts) {
  const all = JSON.parse(window.localStorage.getItem('aifashionProfileStats') || '{}');
  const userKey = email || 'default';
  const userStats = all[userKey] || { posts: 0, followers: 0, following: 0, postImages: [] };

  const postsById = new Map();
  const addPost = (post) => {
    const pid = typeof post === 'object' ? (post.id || post.url || post.title) : post;
    if (!pid) return;
    const previous = postsById.get(pid);
    postsById.set(pid, typeof post === 'object' && typeof previous === 'object'
      ? { ...previous, ...post, likes: Math.max(Number(previous.likes || 0), Number(post.likes || 0)) }
      : post);
  };

  for (const p of (userStats.postImages || [])) {
    addPost(p);
  }

  try {
    const globalStr = window.localStorage.getItem('aifashionGlobalPosts');
    if (globalStr) {
      const globalArr = JSON.parse(globalStr);
      if (Array.isArray(globalArr)) {
        for (const p of globalArr) {
          const authorMatch = typeof p === 'object' && (!userKey || userKey === 'default' || p.authorEmail === userKey);
          if (authorMatch) {
            addPost(p);
          }
        }
      }
    }
  } catch (e) {}

  // Posts uploaded through the Upload section live in Supabase, not localStorage.
  // Merge the ones authored by this user so they show up on their own profile.
  if (Array.isArray(remotePosts)) {
    let removedPostIds = new Set();
    try {
      removedPostIds = new Set(JSON.parse(window.localStorage.getItem('aifashionRemovedPostIds') || '[]'));
    } catch (e) {}

    for (const post of remotePosts) {
      if (!post || typeof post !== 'object') continue;
      const author = post.authorEmail || post.author_email;
      if (!author || author !== userKey) continue;
      if (removedPostIds.has(post.id)) continue;
      addPost(normalizeRemotePost(post));
    }
  }

  return {
    ...userStats,
    postImages: [...postsById.values()],
    posts: postsById.size,
  };
}

function getPostId(post) {
  return typeof post === 'object' ? (post.id || post.url || post.title) : post;
}

function getReactionStore() {
  try {
    return JSON.parse(window.localStorage.getItem('aifashionPostReactions') || '{}');
  } catch (e) {
    return {};
  }
}

function formatStatCount(value) {
  return Number(value || 0).toLocaleString();
}

function ProfileSection({
  activeSection,
  savedProfile,
  handleProfileSave,
  userName,
  setUserName,
  userEmail,
  userPhoto,
  setUserPhoto,
  userHandle,
  setUserHandle,
  userBio,
  setUserBio,
  handleSectionClick,
  handleProductClick,
  onLogout,
  posts,
}) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('mystyle');
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState('');
  const [draftHandle, setDraftHandle] = useState('');
  const [draftBio, setDraftBio] = useState('');
  const [profileStats, setProfileStats] = useState({ posts: 0, followers: 0, following: 0, postImages: [] });
  const [toastList, setToastList] = useState([]);
  const [showStyleUpload, setShowStyleUpload] = useState(false);
  const [stylePreview, setStylePreview] = useState(null);
  const [selectedStyleFile, setSelectedStyleFile] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPostMenu, setShowPostMenu] = useState(false);
  const [isDeletingPost, setIsDeletingPost] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [likedPostIds, setLikedPostIds] = useState(new Set());
  const [savedPostIds, setSavedPostIds] = useState(new Set());
  const [likePulsePostId, setLikePulsePostId] = useState(null);
  const styleFileInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const toastIdRef = useRef(0);
  const dropdownRef = useRef(null);

  const [showPhotoViewer, setShowPhotoViewer] = useState(false);
  const [showShareTargets, setShowShareTargets] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [closingModal, setClosingModal] = useState(null);

  const profileHandle = (userHandle || savedProfile?.handle || '@fashionista_ai').replace('@', '');
  const profileUrl = `https://aifashion.com/${profileHandle}`;
  const shareText = `Check out ${savedProfile?.name || userName || 'this profile'} on AI Fashion`;

  const [nameEditInfo, setNameEditInfo] = useState(() => readEditInfo('aifashion_nameEditInfo'));
  const [handleEditInfo, setHandleEditInfo] = useState(() => readEditInfo('aifashion_handleEditInfo'));
  const [bioEditInfo, setBioEditInfo] = useState(() => readEditInfo('aifashion_bioEditInfo'));

  const [, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTick(t => t + 1), 60000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    setProfileStats(getProfileStats(userEmail || savedProfile?.email, posts));
    const reactionStore = getReactionStore();
    const userKey = userEmail || savedProfile?.email || 'default';
    setLikedPostIds(new Set(Object.keys(reactionStore).filter(id => reactionStore[id]?.likes?.[userKey])));
    setSavedPostIds(new Set(Object.keys(reactionStore).filter(id => reactionStore[id]?.saves?.[userKey])));
  }, [userEmail, savedProfile?.email, activeSection, posts]);

  useEffect(() => {
    const refreshProfilePosts = () => setProfileStats(getProfileStats(userEmail || savedProfile?.email, posts));
    window.addEventListener('aifashion-posts-updated', refreshProfilePosts);
    return () => window.removeEventListener('aifashion-posts-updated', refreshProfilePosts);
  }, [userEmail, savedProfile?.email, posts]);

  // Render a real, scannable QR for the profile URL — the old one was only a
  // decorative lucide icon that encoded nothing.
  useEffect(() => {
    if (!showShareModal) return;
    let cancelled = false;

    QRCode.toDataURL(profileUrl, {
      width: 460,
      margin: 1,
      errorCorrectionLevel: 'M',
      color: { dark: '#1b1726', light: '#ffffff' },
    })
      .then((url) => { if (!cancelled) setQrDataUrl(url); })
      .catch(() => { if (!cancelled) setQrDataUrl(''); });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showShareModal, profileUrl]);

  useEffect(() => {
    if (!showShareModal) setShowShareTargets(false);
  }, [showShareModal]);

  // Likes can be toggled from Home or Search — keep the tabs in sync.
  useEffect(() => {
    const syncReactions = () => {
      const reactionStore = getReactionStore();
      const userKey = userEmail || savedProfile?.email || 'default';
      setLikedPostIds(new Set(Object.keys(reactionStore).filter(id => reactionStore[id]?.likes?.[userKey])));
      setSavedPostIds(new Set(Object.keys(reactionStore).filter(id => reactionStore[id]?.saves?.[userKey])));
    };
    window.addEventListener(REACTIONS_UPDATED_EVENT, syncReactions);
    window.addEventListener('storage', syncReactions);
    return () => {
      window.removeEventListener(REACTIONS_UPDATED_EVENT, syncReactions);
      window.removeEventListener('storage', syncReactions);
    };
  }, [userEmail, savedProfile?.email]);

  // Close the "..." menu on an outside click or Escape.
  useEffect(() => {
    if (!showDropdown) return;

    const onPointerDown = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setShowDropdown(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setShowDropdown(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [showDropdown]);

  // While a profile modal is open: lock the page behind it and allow Escape to close.
  const isAnyModalOpen = isEditing || showShareModal || showPhotoViewer;
  useEffect(() => {
    if (!isAnyModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      if (showPhotoViewer) closePhotoViewer();
      else if (showShareModal) closeShareModal();
      else if (isEditing) closeEditModal();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isAnyModalOpen, isEditing, showShareModal, showPhotoViewer]);

  const nameCoolEnd = nameEditInfo.lastEditAt ? nameEditInfo.lastEditAt + SEVEN_DAYS_MS : null;
  const nameCd = nameCoolEnd ? getRemainingTime(nameCoolEnd) : null;
  const isNameLocked = !!nameCd;

  // Username can be changed once every 30 days
  const handleCoolEnd = handleEditInfo.lastEditAt ? handleEditInfo.lastEditAt + THIRTY_DAYS_MS : null;
  const handleCd = handleCoolEnd ? getRemainingTime(handleCoolEnd) : null;
  const isHandleLocked = !!handleCd;

  // Bio can be changed once every 7 days
  const bioCoolEnd = bioEditInfo.lastEditAt ? bioEditInfo.lastEditAt + SEVEN_DAYS_MS : null;
  const bioCd = bioCoolEnd ? getRemainingTime(bioCoolEnd) : null;
  const isBioLocked = !!bioCd;

  const openEditModal = () => {
    setDraftName(userName || savedProfile?.name || '');
    setDraftHandle(userHandle || savedProfile?.handle || '');
    setDraftBio(userBio || savedProfile?.bio || '');
    setIsEditing(true);
  };

  const showToast = (message, type = 'success') => {
    const id = ++toastIdRef.current;
    setToastList(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToastList(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStyleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Please choose an image file.', 'error');
      return;
    }
    setSelectedStyleFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setStylePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const closeStyleUpload = () => {
    setShowStyleUpload(false);
    setStylePreview(null);
    setSelectedStyleFile(null);
    if (styleFileInputRef.current) styleFileInputRef.current.value = '';
  };

  const saveStylePost = () => {
    if (!stylePreview) return;
    const post = {
      id: `profile-style-${Date.now()}`,
      url: stylePreview,
      images: [stylePreview],
      title: selectedStyleFile?.name || 'My Style',
      description: 'A new style from my fashion collection.',
      authorEmail: userEmail || savedProfile?.email || 'default',
      authorName: savedProfile?.name || userName || 'Fashion Creator',
      authorHandle: userHandle || '@fashion_creator',
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      date: new Date().toISOString(),
    };
    const profileKey = userEmail || savedProfile?.email || 'default';
    const allProfiles = JSON.parse(window.localStorage.getItem('aifashionProfileStats') || '{}');
    const profile = allProfiles[profileKey] || { posts: 0, followers: 0, following: 0, postImages: [] };
    profile.postImages = [post, ...(profile.postImages || [])];
    profile.posts = profile.postImages.length;
    allProfiles[profileKey] = profile;
    window.localStorage.setItem('aifashionProfileStats', JSON.stringify(allProfiles));
    setProfileStats(getProfileStats(profileKey, posts));
    closeStyleUpload();
    showToast('Style added to your profile.', 'success');
  };

  const handlePostAction = (action) => {
    if (!selectedPost || typeof selectedPost === 'string') return;
    const postId = getPostId(selectedPost);
    const userKey = userEmail || savedProfile?.email || 'default';
    const reactionStore = getReactionStore();
    const reaction = reactionStore[postId] || { likes: {}, saves: {} };
    reaction.likes = reaction.likes || {};
    reaction.saves = reaction.saves || {};
    let updatedPost = selectedPost;

    if (action === 'like') {
      const isLiked = likedPostIds.has(postId);
      const nextIds = new Set(likedPostIds);
      isLiked ? nextIds.delete(postId) : nextIds.add(postId);
      setLikedPostIds(nextIds);
      updatedPost = { ...selectedPost, likes: Math.max(0, Number(selectedPost.likes || 0) + (isLiked ? -1 : 1)) };
      if (isLiked) delete reaction.likes[userKey];
      else reaction.likes[userKey] = true;
      setLikePulsePostId(postId);
      window.setTimeout(() => setLikePulsePostId(current => current === postId ? null : current), 520);
    }

    if (action === 'save') {
      const isSaved = savedPostIds.has(postId);
      const nextIds = new Set(savedPostIds);
      isSaved ? nextIds.delete(postId) : nextIds.add(postId);
      setSavedPostIds(nextIds);
      updatedPost = { ...selectedPost, saves: Math.max(0, Number(selectedPost.saves || 0) + (isSaved ? -1 : 1)) };
      if (isSaved) delete reaction.saves[userKey];
      else reaction.saves[userKey] = true;
    }

    if (action === 'share') {
      updatedPost = { ...selectedPost, shares: Number(selectedPost.shares || 0) + 1 };
      navigator.clipboard?.writeText(window.location.href);
      showToast('Style link copied.', 'success');
    }

    reactionStore[postId] = reaction;
    window.localStorage.setItem('aifashionPostReactions', JSON.stringify(reactionStore));
    window.dispatchEvent(new Event(REACTIONS_UPDATED_EVENT));

    setSelectedPost(updatedPost);
    const profileKey = userEmail || savedProfile?.email || 'default';
    const allProfiles = JSON.parse(window.localStorage.getItem('aifashionProfileStats') || '{}');
    if (allProfiles[profileKey]?.postImages) {
      allProfiles[profileKey].postImages = allProfiles[profileKey].postImages.map(post => {
        const currentId = typeof post === 'object' ? (post.id || post.url || post.title) : post;
        return currentId === postId ? updatedPost : post;
      });
      window.localStorage.setItem('aifashionProfileStats', JSON.stringify(allProfiles));
      setProfileStats(getProfileStats(profileKey, posts));
    }
  };

  const handlePostMenuAction = (action) => {
    if (!selectedPost || typeof selectedPost === 'string') return;
    const postId = selectedPost.id || selectedPost.url || selectedPost.title;
    const profileKey = userEmail || savedProfile?.email || 'default';

    if (action === 'share') {
      handlePostAction('share');
      setShowPostMenu(false);
      return;
    }

    if (action === 'download') {
      const link = document.createElement('a');
      link.href = repairImageUrl(selectedPost.url);
      link.download = selectedPost.title || 'ai-fashion-style';
      link.target = '_blank';
      link.click();
      showToast('Download started.', 'success');
      setShowPostMenu(false);
      return;
    }

    if (action === 'copy') {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Style link copied.', 'success');
      setShowPostMenu(false);
      return;
    }

    if (action === 'report') {
      showToast('Thanks. Your report has been received.', 'success');
      setShowPostMenu(false);
      return;
    }

    if (action === 'hide') {
      setSelectedPost(null);
      setShowPostMenu(false);
      showToast('Post hidden from this view.', 'success');
      return;
    }

    if (action === 'delete') {
      setIsDeletingPost(true);
      setShowPostMenu(false);
      const allProfiles = JSON.parse(window.localStorage.getItem('aifashionProfileStats') || '{}');
      if (allProfiles[profileKey]?.postImages) {
        allProfiles[profileKey].postImages = allProfiles[profileKey].postImages.filter(post => {
          const currentId = typeof post === 'object' ? (post.id || post.url || post.title) : post;
          return currentId !== postId;
        });
        allProfiles[profileKey].posts = allProfiles[profileKey].postImages.length;
        window.localStorage.setItem('aifashionProfileStats', JSON.stringify(allProfiles));
      }
      try {
        const globalPosts = JSON.parse(window.localStorage.getItem('aifashionGlobalPosts') || '[]');
        if (Array.isArray(globalPosts)) {
          const remainingPosts = globalPosts.filter(post => getPostId(post) !== postId);
          window.localStorage.setItem('aifashionGlobalPosts', JSON.stringify(remainingPosts));
        }
      } catch (e) {}
      const removedPostIds = new Set(JSON.parse(window.localStorage.getItem('aifashionRemovedPostIds') || '[]'));
      removedPostIds.add(postId);
      window.localStorage.setItem('aifashionRemovedPostIds', JSON.stringify([...removedPostIds]));
      // Recompute now so the grid updates immediately, without waiting on the Supabase refetch.
      setProfileStats(getProfileStats(profileKey, posts));
      window.dispatchEvent(new Event('aifashion-posts-updated'));
      setSelectedPost(null);
      const deleteRemotePost = async () => {
        try {
          await deletePost(selectedPost.id);
        } catch (error) {
          if (selectedPost.id) console.error('Remote post could not be deleted:', error);
        }
        window.dispatchEvent(new CustomEvent('aifashion-posts-updated'));
        window.setTimeout(() => {
          setIsDeletingPost(false);
          showToast('Style post deleted.', 'success');
        }, 450);
      };
      deleteRemotePost();
    }
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    setShowDropdown(false);
    onLogout?.();
  };

  const getInitials = () => {
    const name = savedProfile?.name || userName;
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return 'AF';
  };

  const onLocalSave = (e) => {
    e.preventDefault();

    if (!draftName.trim()) {
      showToast('Name is required to update your profile.', 'error');
      return;
    }
    if (!draftHandle.trim()) {
      showToast('Username is required to update your profile.', 'error');
      return;
    }

    const prevName = savedProfile?.name || userName || '';
    const prevHandle = savedProfile?.handle || userHandle || '';
    const prevBio = savedProfile?.bio || userBio || '';

    const nextName = draftName.trim();
    const nextHandle = draftHandle.trim();
    const nextBio = draftBio.trim();

    const nameChanged = nextName !== prevName;
    const handleChanged = nextHandle !== prevHandle;
    const bioChanged = nextBio !== prevBio;

    if (isNameLocked && nameChanged) {
      showToast(`Name can be changed again in ${formatCooldown(nameCd)}.`, 'error');
      return;
    }
    if (isHandleLocked && handleChanged) {
      showToast(`Username can be changed again in ${formatCooldown(handleCd)}.`, 'error');
      return;
    }
    if (isBioLocked && bioChanged) {
      showToast(`Bio can be changed again in ${formatCooldown(bioCd)}.`, 'error');
      return;
    }

    if (nameChanged) {
      const newInfo = { lastEditAt: Date.now(), lastValue: nextName };
      setNameEditInfo(newInfo);
      window.localStorage.setItem('aifashion_nameEditInfo', JSON.stringify(newInfo));
    }
    if (handleChanged) {
      const newInfo = { lastEditAt: Date.now(), lastValue: nextHandle };
      setHandleEditInfo(newInfo);
      window.localStorage.setItem('aifashion_handleEditInfo', JSON.stringify(newInfo));
    }
    if (bioChanged) {
      const newInfo = { lastEditAt: Date.now(), lastValue: nextBio };
      setBioEditInfo(newInfo);
      window.localStorage.setItem('aifashion_bioEditInfo', JSON.stringify(newInfo));
    }

    setUserName(nextName);
    setUserHandle(nextHandle);
    setUserBio(nextBio);

    const result = handleProfileSave({
      name: nextName,
      handle: nextHandle,
      bio: nextBio,
    });

    if (result?.success) {
      showToast(result.message, 'success');
      closeEditModal();
    } else {
      showToast(result?.message || 'Profile update failed. Please try again.', 'error');
    }
  };

  // Let the exit animation play before the modal actually unmounts.
  const closeWithAnimation = (setter, key) => {
    setClosingModal(key);
    window.setTimeout(() => {
      setter(false);
      setClosingModal((current) => (current === key ? null : current));
    }, 220);
  };

  const closeEditModal = () => closeWithAnimation(setIsEditing, 'edit');
  const closeShareModal = () => closeWithAnimation(setShowShareModal, 'share');
  const closePhotoViewer = () => closeWithAnimation(setShowPhotoViewer, 'photo');

  const copyProfileLink = () => {
    navigator.clipboard?.writeText(profileUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  // Use the OS share sheet where it exists, otherwise reveal our own targets.
  const handleShareProfile = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'AI Fashion', text: shareText, url: profileUrl });
        return;
      } catch (error) {
        if (error?.name === 'AbortError') return;
      }
    }
    setShowShareTargets((open) => !open);
  };

  const displayBio = (userBio || savedProfile?.bio || '').trim();
  const postImages = profileStats.postImages || [];

  // A like can land on someone else's post (from Home or Search), which never
  // appears in postImages — so merge in the snapshots saved at like time.
  const likedFromOwnPosts = postImages.filter(post => likedPostIds.has(getPostId(post)));
  const ownLikedIds = new Set(likedFromOwnPosts.map(getPostId));
  const likedPosts = [
    ...likedFromOwnPosts,
    ...getLikedPosts(userEmail || savedProfile?.email).filter(post => !ownLikedIds.has(getPostId(post))),
  ];
  const savedPosts = postImages.filter(post => savedPostIds.has(getPostId(post)));

  const visiblePosts = activeTab === 'saved'
    ? savedPosts
    : activeTab === 'liked'
      ? likedPosts
      : postImages;

  return (
    <section id="profile" className={`section profile-section ${activeSection === 'profile' ? 'active' : 'hidden'}`}>
      <div className="social-profile-container">
        {isDeletingPost && (
          <div className="profile-delete-loader" role="status" aria-label="Deleting style post">
            <div className="loader-spinner" />
            <span>Removing style...</span>
          </div>
        )}
        <div className="social-top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', position: 'relative' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: 'var(--text)' }}>FashionAI</h2>

          <div className="profile-menu-anchor" ref={dropdownRef}>
            <button
              type="button"
              className={`profile-menu-trigger ${showDropdown ? 'is-open' : ''}`}
              onClick={() => setShowDropdown(!showDropdown)}
              aria-haspopup="menu"
              aria-expanded={showDropdown}
              aria-label="Profile menu"
            >
              <MoreVertical size={20} />
            </button>
            {showDropdown && (
              <div className="profile-dropdown-menu profile-dropdown-menu-animated" role="menu">
                <button type="button" role="menuitem" className="dropdown-item" onClick={() => { setShowShareModal(true); setShowDropdown(false); }}>
                  <span className="dropdown-item-icon"><Share2 size={16} /></span>
                  <span className="dropdown-item-label">Share Profile</span>
                </button>
                <button type="button" role="menuitem" className="dropdown-item" onClick={() => { openEditModal(); setShowDropdown(false); }}>
                  <span className="dropdown-item-icon"><Settings size={16} /></span>
                  <span className="dropdown-item-label">Settings</span>
                </button>
                <div className="dropdown-divider" role="separator" />
                <button type="button" role="menuitem" className="dropdown-item is-danger" onClick={() => { setShowLogoutModal(true); setShowDropdown(false); }}>
                  <span className="dropdown-item-icon"><LogOut size={16} /></span>
                  <span className="dropdown-item-label">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="social-profile-header-redesign" style={{ padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
            <div className="social-profile-photo-block" style={{ position: 'relative', flexShrink: 0, marginRight: '20px' }}>
              {/* No hover overlay or camera badge — the bare photo itself opens the viewer */}
              <div
                className="social-profile-photo-wrapper"
                style={{ width: '104px', height: '104px', borderRadius: '50%', border: '3px solid #5E5CE6', overflow: 'hidden', position: 'relative', cursor: 'pointer', padding: '3px', background: 'var(--card-bg)' }}
                onClick={() => setShowPhotoViewer(true)}
                role="button"
                tabIndex={0}
                aria-label="View profile photo"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setShowPhotoViewer(true);
                  }
                }}
              >
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', position: 'relative' }}>
                  {userPhoto ? (
                    <img src={userPhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'var(--border)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '30px', fontWeight: '600', color: 'var(--text-secondary)' }}>{getInitials()}</span>
                    </div>
                  )}
                </div>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, color: 'var(--text)' }}>{savedProfile?.name || userName || 'Fashion Creator'}</h2>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" fill="#5E5CE6"/>
                  <path d="M8 12.5L11 15.5L16 9.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                {userHandle || savedProfile?.handle || '@fashionista_ai'}
              </div>

              {/* Bio lives with the name and username, right under them */}
              {displayBio && (
                <div className="social-bio">
                  <p>{displayBio}</p>
                </div>
              )}
            </div>
          </div>

          <div className="social-stats-row" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'var(--text)' }}>{formatStatCount(profileStats.posts)}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>Posts</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'var(--text)' }}>{formatStatCount(profileStats.followers)}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>Followers</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'var(--text)' }}>{formatStatCount(profileStats.following)}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>Following</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
             <button style={{ flex: 1, padding: '10px 0', borderRadius: '12px', border: '1px solid #5E5CE6', color: '#5E5CE6', background: 'transparent', fontWeight: '600', cursor: 'pointer' }} onClick={openEditModal}>Edit Profile</button>
             <button style={{ flex: 1, padding: '10px 0', borderRadius: '12px', background: '#5E5CE6', color: '#fff', border: 'none', fontWeight: '600', cursor: 'pointer' }} onClick={() => setShowShareModal(true)}>Share Profile</button>
          </div>
        </div>

        <div className="social-posts-container" style={{ padding: '0 20px' }}>
          <div className="social-tabs-container" role="tablist">
            <div className="social-tabs-thumb" data-tab={activeTab} aria-hidden="true" />
            {[
              { id: 'mystyle', label: 'My Style' },
              { id: 'saved', label: 'Saved' },
              { id: 'liked', label: 'Liked' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={activeTab === tab.id ? 'is-active' : ''}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {visiblePosts.length > 0 ? (
            <div className="social-posts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {visiblePosts.map((post, index) => {
                const rawSrc = typeof post === 'string' ? post : post.url;
                const src = repairImageUrl(rawSrc);
                return (
                  <div 
                    key={index} 
                    className="social-post-item" 
                    onClick={() => setSelectedPost(post)}
                    style={{ 
                      cursor: 'pointer', 
                      position: 'relative', 
                      aspectRatio: '4/6 ', 
                      borderRadius: '12px', 
                      overflow: 'hidden',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <img 
                      src={src} 
                      alt={`Post ${index + 1}`} 
                      loading="lazy" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                      onError={(e) => { e.currentTarget.src = DEFAULT_POST_PLACEHOLDER; }}
                    />
                    <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(0,0,0,0.6)', padding: '4px 10px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '6px', color: '#fff', fontSize: '12px', backdropFilter: 'blur(4px)' }}>
                      <Eye size={14} />
                      <span style={{ fontWeight: '500' }}>{typeof post === 'object' ? (post.views || 0) : 0}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="social-posts-empty" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px dashed var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Grid size={32} color="var(--text-secondary)" />
              </div>
              <p style={{ fontWeight: '600', fontSize: '18px', marginBottom: '8px', color: 'var(--text)' }}>{activeTab === 'saved' ? 'No saved styles yet' : activeTab === 'liked' ? 'No liked styles yet' : 'No posts yet'}</p>
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px', maxWidth: '250px' }}>{activeTab === 'saved' ? 'Styles you favorite will appear here.' : activeTab === 'liked' ? 'Styles you like will appear here.' : 'Your designs will appear here once you publish them.'}</span>
              {activeTab === 'mystyle' && (
                <button 
                  onClick={(e) => handleSectionClick(e, 'uploaded-images')}
                  style={{ padding: '12px 32px', borderRadius: '24px', background: 'var(--card-bg)', color: 'var(--text)', border: '1px solid var(--border)', fontWeight: '600', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
                >
                  Create Post
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="profile-toast-container" aria-live="polite">
        {toastList.map((toast) => (
          <div key={toast.id} className={`profile-toast ${toast.type}`}>
            {toast.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {isEditing && (
        <div className={`modal-overlay liquid-glass-overlay ${closingModal === 'edit' ? 'is-closing' : ''}`} onClick={closeEditModal}>
          <div className="modal-scroll-wrap profile-edit-modal-wrap">
            <div className="profile-form-modal profile-form-card-advanced animate-scale-in" onClick={e => e.stopPropagation()}>
              <div className="form-card-header">
                <div className="form-card-title-row">
                  <div className="form-card-icon-wrap"><Settings size={20} /></div>
                  <div style={{ flex: 1 }}>
                    <h3 className="form-card-title">Edit Profile</h3>
                    <p className="form-card-subtitle">Update your name, username and bio</p>
                  </div>
                  <button type="button" className="modal-close-x-btn" onClick={closeEditModal} aria-label="Close">
                    <X size={18} />
                  </button>
                </div>
              </div>

              <form onSubmit={onLocalSave} className="profile-form-advanced">
                <div className="form-group">
                  <label className="form-label"><User size={14} /> Full Name</label>
                  {isNameLocked ? (
                    <div className="form-input-wrap locked-input">
                      <input value={draftName} readOnly className="form-input" style={{ opacity: 0.7, cursor: 'not-allowed' }} />
                      <div className="lock-badge" title="Changed recently. Can edit again after 7-day cooldown.">
                        <Clock size={12} />
                        <span>{nameCd.days}d {nameCd.hours}h</span>
                      </div>
                    </div>
                  ) : (
                    <div className="form-input-wrap">
                      <input value={draftName} onChange={(e) => setDraftName(e.target.value)} placeholder="Enter your full name" className="form-input" />
                    </div>
                  )}
                  {isNameLocked ? (
                    <p className="cooldown-note">
                      <AlertCircle size={12} />
                      Recently changed. Next edit available in <strong>{nameCd.days}d {nameCd.hours}h {nameCd.minutes}m</strong>.
                    </p>
                  ) : (
                    <p className="cooldown-hint">Name can be changed once every 7 days.</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label"><AtSign size={14} /> Username</label>
                  {isHandleLocked ? (
                    <div className="form-input-wrap locked-input">
                      <input value={draftHandle} readOnly className="form-input" style={{ opacity: 0.7, cursor: 'not-allowed' }} />
                      <div className="lock-badge" title="Changed recently. Can edit again after 30-day cooldown.">
                        <Clock size={12} />
                        <span>{formatCooldown(handleCd)}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="form-input-wrap">
                      <input value={draftHandle} onChange={(e) => setDraftHandle(e.target.value)} placeholder="@your_handle" className="form-input" />
                    </div>
                  )}
                  {isHandleLocked ? (
                    <p className="cooldown-note">
                      <AlertCircle size={12} />
                      Recently changed. Next edit available in <strong>{handleCd.days}d {handleCd.hours}h {handleCd.minutes}m</strong>.
                    </p>
                  ) : (
                    <p className="cooldown-hint">Username can be changed once every 30 days.</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label"><User size={14} /> Bio</label>
                  {isBioLocked ? (
                    <div className="form-input-wrap locked-input">
                      <textarea
                        value={draftBio}
                        readOnly
                        className="form-input profile-bio-input"
                        rows={4}
                        style={{ opacity: 0.7, cursor: 'not-allowed' }}
                      />
                      <div className="lock-badge" title="Changed recently. Can edit again after 7-day cooldown.">
                        <Clock size={12} />
                        <span>{formatCooldown(bioCd)}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="form-input-wrap">
                      <textarea
                        value={draftBio}
                        onChange={(e) => setDraftBio(e.target.value)}
                        placeholder="Write a short bio..."
                        className="form-input profile-bio-input"
                        rows={4}
                      />
                    </div>
                  )}
                  {isBioLocked ? (
                    <p className="cooldown-note">
                      <AlertCircle size={12} />
                      Recently changed. Next edit available in <strong>{bioCd.days}d {bioCd.hours}h {bioCd.minutes}m</strong>.
                    </p>
                  ) : (
                    <p className="cooldown-hint">Bio can be changed once every 7 days.</p>
                  )}
                </div>

                <div className="form-actions modal-actions-center">
                  <button type="button" className="cancel-profile-btn" onClick={closeEditModal}>Cancel</button>
                  <button type="submit" className="save-profile-btn"><Check size={16} /> Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showShareModal && (
        <div className={`share-modal-overlay animate-fade-in ${closingModal === 'share' ? 'is-closing' : ''}`} onClick={closeShareModal}>
          <div className="share-modal-content animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="share-modal-header">
              <div className="share-modal-pic-wrap">
                {userPhoto ? (
                  <img src={userPhoto} alt="Profile" className="share-modal-pic" />
                ) : (
                  <div className="share-modal-pic-placeholder">{getInitials()}</div>
                )}
              </div>
              <h3 className="share-modal-name">{savedProfile?.name || userName || 'Fashion Creator'}</h3>
              <p className="share-modal-username">{userHandle}</p>
            </div>

            <div className="share-modal-qr-wrapper">
              {qrDataUrl ? (
                <img className="share-modal-qr" src={qrDataUrl} alt={`QR code for ${profileUrl}`} />
              ) : (
                <div className="share-modal-qr is-loading"><QrCode size={64} strokeWidth={1} /></div>
              )}
              <div className="qr-scan-text">Scan to view profile</div>
            </div>

            <div className="share-modal-actions">
              <button
                type="button"
                className="social-btn-secondary"
                onClick={copyProfileLink}
              >
                {copied ? <Check size={18}/> : <Copy size={18} />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
              <button type="button" className="social-btn-primary" onClick={handleShareProfile}>
                <Share2 size={18} /> Share Profile
              </button>
            </div>

            {showShareTargets && (
              <div className="share-target-grid">
                {SHARE_TARGETS.map((target) => (
                  <a
                    key={target.id}
                    className="share-target"
                    href={target.href(profileUrl, shareText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeShareModal}
                  >
                    <span className="share-target-icon" style={{ '--tint': target.tint }}>{target.icon}</span>
                    <span>{target.label}</span>
                  </a>
                ))}
                <button type="button" className="share-target" onClick={copyProfileLink}>
                  <span className="share-target-icon" style={{ '--tint': '#7c5cff' }}><Link2 size={18} /></span>
                  <span>{copied ? 'Copied' : 'Copy link'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {showPhotoViewer && (
        <div className={`profile-photo-viewer-overlay ${closingModal === 'photo' ? 'is-closing' : ''}`} onClick={closePhotoViewer}>
          <button type="button" className="profile-photo-viewer-close" onClick={closePhotoViewer} aria-label="Close">
            <X size={22} />
          </button>
          <div className="profile-photo-viewer" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Profile photo">
            {userPhoto ? (
              <img className="profile-photo-viewer-image" src={userPhoto} alt="Profile" />
            ) : (
              <div className="profile-photo-viewer-fallback">{getInitials()}</div>
            )}
          </div>
        </div>
      )}

      {showStyleUpload && (
        <div className="profile-style-upload-overlay" onClick={closeStyleUpload}>
          <div className="profile-style-upload-modal animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="profile-style-upload-header">
              <div>
                <p className="profile-style-eyebrow">MY STYLE</p>
                <h3>Add to your collection</h3>
                <p>Upload an outfit or fashion design to your profile.</p>
              </div>
              <button type="button" className="modal-close-x-btn" onClick={closeStyleUpload} aria-label="Close"><X size={18} /></button>
            </div>
            {stylePreview ? (
              <div className="profile-style-preview-wrap">
                <img src={stylePreview} alt="Style preview" />
                <button type="button" onClick={() => styleFileInputRef.current?.click()}><Upload size={16} /> Replace image</button>
              </div>
            ) : (
              <button type="button" className="profile-style-dropzone" onClick={() => styleFileInputRef.current?.click()}>
                <span><ImagePlus size={30} /></span>
                <strong>Choose a style image</strong>
                <small>JPG, PNG, WEBP up to 50MB</small>
              </button>
            )}
            <input ref={styleFileInputRef} type="file" accept="image/*" onChange={handleStyleFileChange} hidden />
            <div className="profile-style-upload-actions">
              <button type="button" className="cancel-profile-btn" onClick={closeStyleUpload}>Cancel</button>
              <button type="button" className="save-profile-btn" disabled={!stylePreview} onClick={saveStylePost}><Check size={16} /> Add Style</button>
            </div>
          </div>
        </div>
      )}

      {showLogoutModal && (
        <div className="profile-logout-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="profile-logout-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="logout-title">
            <div className="profile-logout-icon"><LogOut size={22} /></div>
            <h3 id="logout-title">Are you sure you want to log out?</h3>
            <p>You will need to sign in again to access your account.</p>
            <div className="profile-logout-actions">
              <button type="button" className="profile-logout-cancel" onClick={() => setShowLogoutModal(false)}>Cancel</button>
              <button type="button" className="profile-logout-confirm" onClick={confirmLogout}>Yes, Log Out</button>
            </div>
          </div>
        </div>
      )}

      {selectedPost && (
        <div className="profile-post-viewer-overlay" onClick={() => setSelectedPost(null)}>
          <div className="profile-post-viewer" onClick={e => e.stopPropagation()}>
            <button className="profile-post-viewer-close" type="button" onClick={() => setSelectedPost(null)} aria-label="Close"><X size={24} /></button>
            <img className="profile-post-viewer-image" src={repairImageUrl(typeof selectedPost === 'string' ? selectedPost : selectedPost.url)} alt={selectedPost.title || 'Fashion design'} onError={e => { e.currentTarget.src = DEFAULT_POST_PLACEHOLDER; }} />
            <div className="profile-post-viewer-gradient" />
            <div className="profile-post-viewer-author">
              <div className="profile-post-viewer-avatar">{getInitials()}</div>
              <div><strong>{selectedPost.authorName || userName || 'Fashion Creator'}</strong><span>{selectedPost.authorHandle || userHandle || '@fashion_creator'} · 2d ago</span></div>
            </div>
            <div className="profile-post-viewer-caption"><strong>{selectedPost.title || 'My latest style'} ✨</strong><span>{selectedPost.description || 'Crafted with creativity and AI.'}</span><span className="profile-post-viewer-tags">#AIFashion #MyStyle #Design</span></div>
            <div className="profile-post-viewer-actions">
              <button type="button" className={`profile-post-viewer-action ${likePulsePostId === getPostId(selectedPost) ? 'is-liked-pulse' : ''}`} onClick={() => handlePostAction('like')} aria-label="Like style"><Heart size={31} fill={likedPostIds.has(getPostId(selectedPost)) ? '#ff5277' : 'white'} color={likedPostIds.has(getPostId(selectedPost)) ? '#ff5277' : 'white'} /><span>{selectedPost.likes ?? 0}</span></button>
              <button type="button" className="profile-post-viewer-action" onClick={() => handlePostAction('save')} aria-label="Save style"><Bookmark size={31} fill={savedPostIds.has(getPostId(selectedPost)) ? 'white' : 'none'} /><span>{selectedPost.saves ?? 0}</span></button>
              <button type="button" className="profile-post-viewer-action" onClick={() => handlePostAction('share')} aria-label="Share style"><Send size={31} fill="white" /><span>{selectedPost.shares ?? 0}</span></button>
              <div className="profile-post-viewer-action"><Eye size={31} fill="white" /><span>{selectedPost.views ?? 0}</span></div>
              <button type="button" className="profile-post-viewer-more" onClick={() => setShowPostMenu(true)} aria-label="More post options"><MoreVertical size={31} /></button>
            </div>
            {showPostMenu && (
              <div className="profile-post-menu-backdrop" onClick={() => setShowPostMenu(false)}>
                <div className="profile-post-menu-sheet" onClick={e => e.stopPropagation()}>
                  <div className="profile-post-menu-handle" />
                  <div className="profile-post-menu-title"><strong>Post options</strong><button type="button" onClick={() => setShowPostMenu(false)} aria-label="Close options"><X size={20} /></button></div>
                  <div className="profile-post-menu-grid">
                    <button type="button" onClick={() => handlePostMenuAction('share')}><span className="profile-post-menu-icon"><Share2 size={21} /></span><span>Share</span></button>
                    <button type="button" onClick={() => handlePostMenuAction('download')}><span className="profile-post-menu-icon"><Download size={21} /></span><span>Download</span></button>
                    <button type="button" onClick={() => handlePostMenuAction('copy')}><span className="profile-post-menu-icon"><Link2 size={21} /></span><span>Copy link</span></button>
                    <button type="button" onClick={() => handlePostMenuAction('hide')}><span className="profile-post-menu-icon"><EyeOff size={21} /></span><span>Hide post</span></button>
                    <button type="button" className="profile-post-menu-danger" onClick={() => handlePostMenuAction('delete')}><span className="profile-post-menu-icon"><Trash2 size={21} /></span><span>Delete</span></button>
                    <button type="button" className="profile-post-menu-danger" onClick={() => handlePostMenuAction('report')}><span className="profile-post-menu-icon"><Flag size={21} /></span><span>Report</span></button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default ProfileSection;

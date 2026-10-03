import { useEffect, useMemo, useRef, useState } from 'react';
import { designs } from './constants';
import { isAuthProviderEnabled, supabase } from './lib/supabaseClient';
import { Check, AlertCircle, AlertTriangle, X, Menu, LogIn, Info } from 'lucide-react';
import Sidebar from './components/Sidebar';
import OfflineBanner from './components/OfflineBanner';
import SearchExploreSection from './components/SearchExploreSection';
import AddToCartSection from './components/AddToCartSection';
import ProfileSection from './components/ProfileSection';
import CreateSection from './components/CreateSection';
import DashboardSection from './components/DashboardSection';
import AllUserPostsSection from './components/AllUserPostsSection';
import AISection from './components/AISection';
import GeneratorSection from './components/GeneratorSection';
import DraftsSection from './components/DraftsSection';
import CustomizeSection from './components/CustomizeSection';
import SaleSection from './components/SaleSection';
import InsightsSection from './components/InsightsSection';
import GallerySection from './components/GallerySection';
import SettingsSection from './components/SettingsSection';
import WorkspaceSection from './components/WorkspaceSection';
import SecuritySection from './components/SecuritySection';
import TotalDesignsSection from './components/TotalDesignsSection';
import SubscriptionSection from './components/SubscriptionSection';
import CreditsSection from './components/CreditsSection';
import PaymentHistorySection from './components/PaymentHistorySection';
import DownloadsAnalyticsSection from './components/DownloadsAnalyticsSection';
import SharesAnalyticsSection from './components/SharesAnalyticsSection';
import AIUsageAnalyticsSection from './components/AIUsageAnalyticsSection';
import UploadedImagesSection from './components/UploadedImagesSection';
import SharedProfilePage from './components/SharedProfilePage';
import SharedPostPage from './components/SharedPostPage';
import AIGeneratedImagesSection from './components/AIGeneratedImagesSection';
import SavedPromptsSection from './components/SavedPromptsSection';
import BackgroundRemoverSection from './components/BackgroundRemoverSection';
import UpscaleImageSection from './components/UpscaleImageSection';
import RecolorOutfitSection from './components/RecolorOutfitSection';
import PatternGeneratorSection from './components/PatternGeneratorSection';
import CustomAvatarSection from './components/CustomAvatarSection';
import FavoritesSection from './components/FavoritesSection';
import PublishedDesignsSection from './components/PublishedDesignsSection';
import SuperAdminSection from './components/SuperAdminSection';
import Login from './components/Login';
import WelcomeOverlay from './components/WelcomeOverlay';
import InboxSection from './components/InboxSection';
import ProductDetailsSection from './components/ProductDetailsSection';
import RecentlyViewedSection from './components/RecentlyViewedSection';
import { fetchPosts, incrementPostView, purgeLocalUserPosts, getUserAccountPrivacy, shouldHidePostFromViewer, fetchAccountPrivacyMap, syncCurrentUserAccountPrivacy } from './lib/posts';

const SUPER_ADMIN_EMAIL = (import.meta.env.VITE_SUPER_ADMIN_EMAIL || 'buttawais2000@gmail.com').trim().toLowerCase();
let hasShownPostViewSetupNotice = false;

function initGlobalSeedPosts() {
  const key = 'aifashionGlobalPosts';
  try {
    const existing = window.localStorage.getItem(key);
    if (existing) {
      const arr = JSON.parse(existing);
      if (Array.isArray(arr) && arr.length > 0) return;
    }
  } catch (e) {}

  const seedPosts = [
    {
      id: 'seed-1-' + Date.now(),
      url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80',
      images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80'],
      title: 'Luxury Oversized Hoodie',
      category: 'fashion',
      price: '89.99',
      description: 'Premium quality oversized hoodie with minimalist design. Perfect for streetwear enthusiasts.',
      date: new Date(Date.now() - 86400000 * 2).toISOString(),
      isNew: true,
      views: 1240,
      shares: 56,
      authorEmail: 'awais@aifashion.com',
      authorName: 'Awais Designer',
      authorHandle: '@awais_designs',
    },
    {
      id: 'seed-2-' + Date.now(),
      url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80',
      images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80'],
      title: 'Summer Resort Dress',
      category: 'fashion',
      price: '129.50',
      description: 'Elegant summer dress with floral patterns. Ideal for beach vacations and resort wear.',
      date: new Date(Date.now() - 86400000 * 5).toISOString(),
      isNew: true,
      views: 890,
      shares: 42,
      authorEmail: 'sara@fashion.com',
      authorName: 'Sara Khan',
      authorHandle: '@sara_style',
    },
    {
      id: 'seed-3-' + Date.now(),
      url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80',
      images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80'],
      title: 'Modern Sports Jacket',
      category: 'design',
      price: '159.00',
      description: 'Modern sports jacket with breathable fabric. Great for athletic and casual wear.',
      date: new Date(Date.now() - 86400000 * 1).toISOString(),
      isNew: true,
      views: 560,
      shares: 28,
      authorEmail: 'zain@studio.com',
      authorName: 'Zain Studio',
      authorHandle: '@zain_studio',
    },
    {
      id: 'seed-4-' + Date.now(),
      url: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
      images: ['https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80'],
      title: 'Futuristic Street Style',
      category: 'fashion',
      price: '199.99',
      description: 'Futuristic street style outfit with reflective layers and bold silhouettes.',
      date: new Date(Date.now() - 86400000 * 3).toISOString(),
      isNew: false,
      views: 2100,
      shares: 112,
      authorEmail: 'awais@aifashion.com',
      authorName: 'Awais Designer',
      authorHandle: '@awais_designs',
    },
    {
      id: 'seed-5-' + Date.now(),
      url: 'https://images.unsplash.com/photo-1495121605193-b116b5b9c5d6?auto=format&fit=crop&w=600&q=80',
      images: ['https://images.unsplash.com/photo-1495121605193-b116b5b9c5d6?auto=format&fit=crop&w=600&q=80'],
      title: 'Velvet Noir Evening Wear',
      category: 'design',
      price: '249.00',
      description: 'Minimal elegance with soft velvet textures and architectural cutouts. Evening collection.',
      date: new Date(Date.now() - 86400000 * 7).toISOString(),
      isNew: false,
      views: 3200,
      shares: 156,
      authorEmail: 'sara@fashion.com',
      authorName: 'Sara Khan',
      authorHandle: '@sara_style',
    },
    {
      id: 'seed-6-' + Date.now(),
      url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80',
      images: ['https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80'],
      title: 'Chromatic Streetwear',
      category: 'texture',
      price: '79.99',
      description: 'High-contrast color blocking, metallic accents, and bold logo details.',
      date: new Date(Date.now() - 86400000 * 4).toISOString(),
      isNew: true,
      views: 1560,
      shares: 78,
      authorEmail: 'zain@studio.com',
      authorName: 'Zain Studio',
      authorHandle: '@zain_studio',
    },
  ];

  window.localStorage.setItem(key, JSON.stringify(seedPosts));

  const allProfiles = JSON.parse(window.localStorage.getItem('aifashionProfileStats') || '{}');
  for (const post of seedPosts) {
    const aEmail = post.authorEmail || 'default';
    if (!allProfiles[aEmail]) {
      allProfiles[aEmail] = { posts: 0, followers: 0, following: 0, postImages: [] };
    }
    const exists = allProfiles[aEmail].postImages?.some(p => p.id === post.id);
    if (!exists) {
      allProfiles[aEmail].postImages = [post, ...(allProfiles[aEmail].postImages || [])];
      allProfiles[aEmail].posts = (allProfiles[aEmail].posts || 0) + 1;
    }
  }
  window.localStorage.setItem('aifashionProfileStats', JSON.stringify(allProfiles));
}

function readSharedProfile() {
  try {
    const rawProfile = new URLSearchParams(window.location.search).get('sharedProfile');
    if (!rawProfile) return null;
    const profile = JSON.parse(rawProfile);
    const handle = String(profile?.handle || '').trim().replace(/^@/, '').slice(0, 40);
    if (!handle) return null;
    const isPrivate = (p) => Boolean(p && typeof p === 'object' && (p.isPrivate ?? p.is_private ?? p.private));
    const profileAuthorEmail = String(profile?.email || profile?.authorEmail || '').trim().toLowerCase();
    const accountIsPrivate = profileAuthorEmail ? getUserAccountPrivacy(profileAuthorEmail) === 'private' : false;

    return {
      name: String(profile.name || 'Fashion Creator').slice(0, 80),
      handle,
      bio: String(profile.bio || '').slice(0, 320),
      photo: /^https?:\/\//i.test(profile.photo || '') ? profile.photo : null,
      posts: accountIsPrivate
        ? []
        : Array.isArray(profile.posts)
          ? profile.posts.filter((post) => post && !isPrivate(post) && !shouldHidePostFromViewer(post, '') && /^https?:\/\//i.test(post.url || '')).slice(0, 2)
          : [],
    };
  } catch (error) {
    return null;
  }
}

function readSharedPost() {
  try {
    const rawPost = new URLSearchParams(window.location.search).get('sharedPost');
    if (!rawPost) return null;
    const post = JSON.parse(rawPost);
    if (!post || !String(post.title || '').trim()) return null;
    const isPrivate = Boolean(post.isPrivate ?? post.is_private ?? post.private);
    if (isPrivate) return null;
    const authorEmail = String(post.authorEmail || post.author_email || post.email || '').trim().toLowerCase();
    if (authorEmail && (getUserAccountPrivacy(authorEmail) === 'private' || post.account_is_private)) return null;
    return {
      id: String(post.id || '').slice(0, 64),
      title: String(post.title).slice(0, 80),
      description: String(post.description || '').slice(0, 320),
      url: /^https?:\/\//i.test(post.url || '') ? post.url : '',
      authorName: String(post.authorName || 'Fashion Creator').slice(0, 80),
      authorHandle: String(post.authorHandle || '@fashion_creator').slice(0, 50),
    };
  } catch (error) {
    return null;
  }
}

function App() {
  const [sharedProfile, setSharedProfile] = useState(readSharedProfile);
  const [sharedPost, setSharedPost] = useState(readSharedPost);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isAuthRestoring, setIsAuthRestoring] = useState(true);
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);
  const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(false);
  const [welcomeExiting, setWelcomeExiting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Ready-to-Wear');
  const [darkMode, setDarkMode] = useState(() => {
    return window.localStorage.getItem('aifashionDarkMode') === 'true';
  });
  const [activeSection, setActiveSection] = useState(() => {
    return window.localStorage.getItem('aifashionActiveSection') || 'profile';
  });
  const [isSectionLoading, setIsSectionLoading] = useState(false);
  const [visibleSections, setVisibleSections] = useState(['profile']);
  const [selectedTheme, setSelectedTheme] = useState('Modern Minimal');
  const [prompt, setPrompt] = useState('Create a bold outfit inspired by luxury travel.');
  const [output, setOutput] = useState(designs[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userPhoto, setUserPhoto] = useState(null);
  const [faceScanPhoto, setFaceScanPhoto] = useState('');
  const [userHandle, setUserHandle] = useState('@fashionista_ai');
  const [userBio, setUserBio] = useState('');
  const [savedProfile, setSavedProfile] = useState(null);
  const [profileMessage, setProfileMessage] = useState('');
  const [topSearch, setTopSearch] = useState('');
  const [sidebarSearch, setSidebarSearch] = useState('');
  // Generator state
  const [genDesignType, setGenDesignType] = useState('T-Shirt');
  const [genClothing, setGenClothing] = useState('Oversized Hoodie');
  const [genStyle, setGenStyle] = useState('Luxury');
  const [genFabric, setGenFabric] = useState('Cotton');
  const [genColors, setGenColors] = useState(['#000000', '#FFD700']);
  const [genPattern, setGenPattern] = useState('Solid');
  const [genSleeve, setGenSleeve] = useState('Long');
  const [genFit, setGenFit] = useState('Oversized');
  const [genNeck, setGenNeck] = useState('Round');
  const [genSeason, setGenSeason] = useState('Winter');
  const [genQuality, setGenQuality] = useState('HD');
  const [genCreativity, setGenCreativity] = useState(0.7);
  const [genNumDesigns, setGenNumDesigns] = useState(2);
  const [genAspectRatio, setGenAspectRatio] = useState('1:1');
  const [genPreviewMode, setGenPreviewMode] = useState('Flat Design');
  const [generatedDesigns, setGeneratedDesigns] = useState([]);
  const [generationHistory, setGenerationHistory] = useState([
    { id: 1, name: 'Hoodie', product: 'Hoodie', date: 'Today', status: 'Completed' },
    { id: 2, name: 'Jacket', product: 'Jacket', date: 'Yesterday', status: 'Completed' },
  ]);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem('aifashionSelectedProduct') || 'null');
    } catch {
      return null;
    }
  });

  const [toastList, setToastList] = useState([]);
  const toastIdRef = useRef(0);
  const toastTimerRef = useRef({});
  const [postsRefreshTick, setPostsRefreshTick] = useState(0);
  const [sharedPosts, setSharedPosts] = useState(null);
  // Open by default on desktop, closed on phones/tablets.
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    () => typeof window !== 'undefined' && window.innerWidth > 1024,
  );

  const topSearchRef = useRef(null);
  const sidebarSearchRef = useRef(null);

  const galleryItems = useMemo(
    () => designs.filter((design) => design.category === selectedCategory),
    [selectedCategory],
  );

  useEffect(() => {
    let mounted = true;
    const applySession = (session) => {
      if (!mounted) return;
      if (!session?.user) {
        setIsSuperAdmin(false);
        setIsDemoMode(false);
        setIsLoggedIn(false);
        setSavedProfile(null);
        window.localStorage.removeItem('aifashionUserProfile');
        setIsAuthRestoring(false);
        return;
      }

      const authUser = session.user;
      setIsSuperAdmin(authUser.email?.trim().toLowerCase() === SUPER_ADMIN_EMAIL);
      setIsDemoMode(false);
      const metadata = authUser.user_metadata || {};
      const email = authUser.email || '';
      const profile = {
        id: authUser.id,
        name: metadata.name || metadata.full_name || email.split('@')[0] || 'Fashion Creator',
        email,
        phone: metadata.phone || authUser.phone || '',
        photo: metadata.photo || metadata.avatar_url || null,
        handle: metadata.handle || `@${(email.split('@')[0] || 'fashionista').replace(/[^a-z0-9_]/gi, '').slice(0, 24)}`,
        bio: metadata.bio || '',
      };
      setIsLoggedIn(true);
      setSavedProfile(profile);
      setUserName(profile.name);
      setUserEmail(profile.email);
      setUserPhone(profile.phone);
      setUserPhoto(profile.photo);
      setUserHandle(profile.handle);
      setUserBio(profile.bio);
      window.localStorage.setItem('aifashionUserProfile', JSON.stringify(profile));
      const legacyUsers = JSON.parse(window.localStorage.getItem('mockUsers') || '[]');
      const remainingLegacyUsers = legacyUsers.filter((user) => String(user.email || '').toLowerCase() !== email.toLowerCase());
      if (remainingLegacyUsers.length !== legacyUsers.length) {
        window.localStorage.setItem('mockUsers', JSON.stringify(remainingLegacyUsers));
      }
      setIsAuthRestoring(false);
    };

    supabase.auth.getSession()
      .then(({ data, error }) => {
        if (error) console.error('Auth session could not be restored:', error.message);
        applySession(data?.session || null);
      })
      .catch((error) => {
        console.error('Auth session could not be restored:', error);
        applySession(null);
      });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') setIsPasswordRecovery(true);
      if (event === 'SIGNED_OUT') setIsPasswordRecovery(false);
      applySession(session);
      if (event === 'SIGNED_IN') {
        window.setTimeout(async () => {
          const { error } = await supabase.auth.signOut({ scope: 'others' });
          if (error) {
            console.error('Could not revoke other device sessions:', error.message);
            showToast('Signed in, but could not end other device sessions. This login remains active.');
          }
        }, 0);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isSuperAdmin && activeSection === 'super-admin') {
      setActiveSection('profile');
      window.localStorage.setItem('aifashionActiveSection', 'profile');
    }
  }, [isSuperAdmin, activeSection]);

  useEffect(() => {
    const closeSettings = () => setActiveSection((current) => current === 'settings' ? 'profile' : current);
    window.addEventListener('aifashion-settings-close', closeSettings);
    return () => window.removeEventListener('aifashion-settings-close', closeSettings);
  }, []);

  useEffect(() => {
    function handleShortcuts(event) {
      if (event.ctrlKey && event.key === '/') {
        event.preventDefault();
        sidebarSearchRef.current?.focus();
      }
      if (event.ctrlKey && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        topSearchRef.current?.focus();
      }
    }

    window.addEventListener('keydown', handleShortcuts);
    return () => window.removeEventListener('keydown', handleShortcuts);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark-theme', darkMode);
    window.localStorage.setItem('aifashionDarkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    window.localStorage.setItem('aifashionActiveSection', activeSection);
  }, [activeSection]);

  useEffect(() => {
    if (!isLoggedIn) return;
    setTopSearch('');
    setSidebarSearch('');
  }, [isLoggedIn]);

  useEffect(() => {
    const refreshPosts = () => setPostsRefreshTick((tick) => tick + 1);
    window.addEventListener('aifashion-posts-updated', refreshPosts);
    window.addEventListener('aifashion-privacy-updated', refreshPosts);
    window.addEventListener('storage', refreshPosts);
    return () => {
      window.removeEventListener('aifashion-posts-updated', refreshPosts);
      window.removeEventListener('aifashion-privacy-updated', refreshPosts);
      window.removeEventListener('storage', refreshPosts);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchAccountPrivacyMap().then(() => {
      if (cancelled) return;
      setSharedProfile(readSharedProfile());
      setSharedPost(readSharedPost());
    }).catch(() => {});
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!isLoggedIn || !userEmail) return;
    syncCurrentUserAccountPrivacy(userEmail).catch((error) => {
      console.warn('Account privacy could not be synced:', error?.message || error);
    });
  }, [isLoggedIn, userEmail]);

  useEffect(() => {
    if (!isLoggedIn) return;
    let cancelled = false;
    const loadPosts = async () => {
      try {
        if (!window.localStorage.getItem('aifashionLocalUserPostsPurged')) {
          purgeLocalUserPosts();
          window.localStorage.setItem('aifashionLocalUserPostsPurged', 'true');
        }
        const posts = await fetchPosts();
        if (!cancelled) setSharedPosts(posts);
      } catch (error) {
        console.error('Posts could not be loaded:', error);
        if (!cancelled) setSharedPosts([]);
      }
    };
    loadPosts();
    window.addEventListener('aifashion-posts-updated', loadPosts);
    window.addEventListener('aifashion-privacy-updated', loadPosts);
    return () => {
      cancelled = true;
      window.removeEventListener('aifashion-posts-updated', loadPosts);
      window.removeEventListener('aifashion-privacy-updated', loadPosts);
    };
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn || activeSection !== 'profile') return;
    let cancelled = false;
    const refreshProfilePosts = async () => {
      try {
        const latestPosts = await fetchPosts();
        if (!cancelled) setSharedPosts(latestPosts);
      } catch (error) {
        console.error('Profile post views could not be refreshed:', error);
      }
    };

    refreshProfilePosts();
    const interval = window.setInterval(() => {
      if (!document.hidden) refreshProfilePosts();
    }, 30000);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [isLoggedIn, activeSection]);

  // Shrinking to a narrow viewport always collapses the sidebar back to a drawer.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth <= 1024) setIsSidebarOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Escape closes the drawer only while it is overlaying the page.
  useEffect(() => {
    if (!isSidebarOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && window.innerWidth <= 1024) setIsSidebarOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isSidebarOpen]);

  function handleSidebarNavigate(event, section) {
    // On desktop the sidebar is permanent; only the mobile drawer closes on navigate.
    if (window.innerWidth <= 1024) setIsSidebarOpen(false);
    setSidebarSearch('');
    if (sidebarSearchRef.current) sidebarSearchRef.current.value = '';
    handleSectionClick(event, section);
  }

  function removeToast(id) {
    setToastList((current) => current.map((toast) => (
      toast.id === id ? { ...toast, closing: true } : toast
    )));
    setTimeout(() => {
      setToastList((current) => current.filter((toast) => toast.id !== id));
      if (toastTimerRef.current[id]) {
        clearTimeout(toastTimerRef.current[id]);
        delete toastTimerRef.current[id];
      }
    }, 350);
  }

  function showToast(message, type = 'info') {
    const id = ++toastIdRef.current;
    const title = type === 'success' ? 'Upload Successful' : 'Upload Failed';
    const toast = { id, type, title, desc: message };
    setToastList((current) => [...current, toast]);
    toastTimerRef.current[id] = setTimeout(() => removeToast(id), 3500);
  }

  useEffect(() => {
    const sectionIds = ['profile', 'workspace', 'dashboard', 'ai', 'generator', 'customize', 'sale', 'insights', 'gallery', 'settings'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setVisibleSections((current) =>
              current.includes(entry.target.id) ? current : [...current, entry.target.id],
            );
          }
        });
      },
      { threshold: 0.18 },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  async function handleProfileSave(updates = {}) {
    const name = (updates.name ?? userName).trim();
    const handle = (updates.handle ?? userHandle).trim();
    const bio = (updates.bio ?? userBio).trim();

    if (!name) {
      return { success: false, message: 'Name is required to update your profile.' };
    }
    if (!handle) {
      return { success: false, message: 'Username is required to update your profile.' };
    }
    if (!userEmail.trim()) {
      return { success: false, message: 'Account email is missing. Please log in again.' };
    }

    const profile = {
      name,
      email: userEmail.trim(),
      phone: userPhone.trim(),
      photo: userPhoto,
      handle,
      bio,
      savedAt: new Date().toISOString(),
    };

    try {
      const { error: authUpdateError } = await supabase.auth.updateUser({
        data: { name, phone: profile.phone, photo: profile.photo, handle, bio },
      });
      if (authUpdateError) {
        return { success: false, message: authUpdateError.message || 'Profile update failed. Please try again.' };
      }

      window.localStorage.setItem('aifashionUserProfile', JSON.stringify(profile));

      setUserName(name);
      setUserHandle(handle);
      setUserBio(bio);
      setSavedProfile(profile);
      setProfileMessage('Profile updated successfully.');
      setTimeout(() => setProfileMessage(''), 3000);
      return { success: true, message: 'Profile updated successfully.' };
    } catch {
      return { success: false, message: 'Profile update failed. Please try again.' };
    }
  }

  function handleGenerate() {
    setIsGenerating(true);
    setTimeout(() => {
      const match = designs.find((design) => design.category === selectedCategory) || designs[0];
      setOutput({
        ...match,
        title: `${selectedTheme} ${match.title}`,
        mood: `${prompt} ${match.mood}`,
      });
      setIsGenerating(false);
    }, 700);
  }

  function handleSectionClick(event, id) {
    event.preventDefault();
    if (activeSection === id) return;

    setIsSectionLoading(true);
    setActiveSection(id);

    setTimeout(() => {
      setIsSectionLoading(false);
    }, 150);
  }

  function handleLogin(user) {
    setIsDemoMode(false);
    setIsSuperAdmin(user?.email?.trim().toLowerCase() === SUPER_ADMIN_EMAIL);
    setIsLoggedIn(true);
    setShowWelcomeOverlay(true);
    setWelcomeExiting(false);
    setActiveSection('profile');
    window.localStorage.setItem('aifashionActiveSection', 'profile');
    setTopSearch('');
    setSidebarSearch('');
    if (user) {
      setUserName(user.name || '');
      setUserEmail(user.email || '');
      setUserPhone(user.phone || '');
      setUserHandle(user.handle || '@fashionista_ai');
      setUserBio(user.bio || '');
      const safeProfile = { ...user };
      delete safeProfile.password;
      setSavedProfile(safeProfile);
      window.localStorage.setItem('aifashionUserProfile', JSON.stringify(safeProfile));
    }
    requestAnimationFrame(() => {
      topSearchRef.current && (topSearchRef.current.value = '');
      sidebarSearchRef.current && (sidebarSearchRef.current.value = '');
      document.getElementById('profile')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
  }

  function handleDemoLogin() {
    setIsSuperAdmin(false);
    setIsDemoMode(true);
    setIsLoggedIn(true);
    setShowWelcomeOverlay(false);
    setActiveSection('profile');
    window.localStorage.setItem('aifashionActiveSection', 'profile');
    setUserName('');
    setUserEmail('');
    setUserPhone('');
    setUserPhoto(null);
    setUserHandle('');
    setUserBio('');
    setSavedProfile(null);
    window.localStorage.removeItem('aifashionUserProfile');
  }

  async function handleGuestGoogleLogin() {
    try {
      if (!await isAuthProviderEnabled('google')) {
        showToast('Google sign-in is not enabled for this app. Configure the Google provider in Supabase Auth first.', 'error');
        return;
      }
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin },
      });
      if (error) showToast(error.message || 'Google sign-in could not be started.', 'error');
    } catch (error) {
      showToast(error?.message || 'Google sign-in could not be started.', 'error');
    }
  }

  function handleLogout() {
    setIsSuperAdmin(false);
    setIsDemoMode(false);
    setIsLoggedIn(false);
    setFaceScanPhoto('');
    setShowWelcomeOverlay(false);
    setWelcomeExiting(false);
    setSavedProfile(null);
    setUserName('');
    setUserEmail('');
    setUserPhone('');
    setUserPhoto(null);
    setUserHandle('@fashionista_ai');
    setUserBio('');
    window.localStorage.removeItem('aifashionUserProfile');
    supabase.auth.signOut({ scope: 'local' }).catch((error) => {
      console.error('Could not clear the local auth session:', error);
    });
    setActiveSection('profile');
    window.localStorage.setItem('aifashionActiveSection', 'profile');
  }

  function handleProductClick(product) {
    let currentProduct = product;
    const productId = typeof product === 'object' ? (product.id || product.url || product.title) : product;

    if (typeof product === 'object') {
      const updatedProduct = { ...product, views: (product.views || 0) + 1 };
      currentProduct = updatedProduct;
      let found = false;

      const allProfiles = JSON.parse(window.localStorage.getItem('aifashionProfileStats') || '{}');
      for (const email in allProfiles) {
        if (allProfiles[email].postImages) {
          const idx = allProfiles[email].postImages.findIndex(p => 
            typeof p === 'object' && (p.id === productId || p.url === productId || p.title === productId)
          );
          if (idx !== -1) {
            allProfiles[email].postImages[idx] = updatedProduct;
            found = true;
            break;
          }
        }
      }
      if (found) {
        window.localStorage.setItem('aifashionProfileStats', JSON.stringify(allProfiles));
        currentProduct = updatedProduct;
      }

      try {
        const globalStr = window.localStorage.getItem('aifashionGlobalPosts');
        if (globalStr) {
          const globalArr = JSON.parse(globalStr);
          if (Array.isArray(globalArr)) {
            const gIdx = globalArr.findIndex(p => 
              typeof p === 'object' && (p.id === productId || p.url === productId || p.title === productId)
            );
            if (gIdx !== -1) {
              globalArr[gIdx] = updatedProduct;
              window.localStorage.setItem('aifashionGlobalPosts', JSON.stringify(globalArr));
              currentProduct = updatedProduct;
            }
          }
        }
      } catch (e) {}

      if (product.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(product.id)) {
        setSharedPosts((current) => Array.isArray(current)
          ? current.map((post) => post.id === product.id ? updatedProduct : post)
          : current);
        incrementPostView(product.id)
          .then((views) => {
            if (views == null) {
              if (!hasShownPostViewSetupNotice) {
                hasShownPostViewSetupNotice = true;
                showToast('View counting is temporarily unavailable. Please try again later.', 'info');
              }
              return;
            }
            setSharedPosts((current) => Array.isArray(current)
              ? current.map((post) => post.id === product.id ? { ...post, views } : post)
              : current);
            setSelectedProduct((current) => current?.id === product.id ? { ...current, views } : current);
            window.dispatchEvent(new Event('aifashion-posts-updated'));
          })
          .catch((error) => {
            console.error('Post view could not be recorded:', error);
          });
      }
    }
      
    const recentlyViewedStr = window.localStorage.getItem('aifashionRecentlyViewed');
    let recentlyViewed = [];
    if (recentlyViewedStr) {
      try { recentlyViewed = JSON.parse(recentlyViewedStr); } catch(e) {}
    }
    recentlyViewed = recentlyViewed.filter(p => {
       const pId = typeof p === 'object' ? (p.id || p.url || p.title) : p;
       return pId !== productId;
    });
    recentlyViewed.unshift(currentProduct);
    if (recentlyViewed.length > 8) recentlyViewed.pop();
    window.localStorage.setItem('aifashionRecentlyViewed', JSON.stringify(recentlyViewed));
    
    setSelectedProduct(currentProduct);
    window.localStorage.setItem('aifashionSelectedProduct', JSON.stringify(currentProduct));
    setActiveSection('product-details');
    window.localStorage.setItem('aifashionActiveSection', 'product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function closeWelcomeOverlay() {
    setWelcomeExiting(true);
    setTimeout(() => {
      setShowWelcomeOverlay(false);
      setWelcomeExiting(false);
    }, 520);
  }

  function handleWelcomeContinue() {
    setWelcomeExiting(true);
    setTimeout(() => {
      setShowWelcomeOverlay(false);
      setWelcomeExiting(false);
    }, 520);
  }

  if (sharedPost) {
    return <SharedPostPage post={sharedPost} />;
  }

  if (sharedProfile) {
    return <SharedProfilePage profile={sharedProfile} />;
  }

  if (isAuthRestoring) {
    return <div className="auth-restore-screen" role="status" aria-label="Restoring your session"><div className="auth-restore-spinner" /><p>Restoring your fashion workspace...</p></div>;
  }

  if (isPasswordRecovery) {
    return <Login recoveryMode onPasswordResetSuccess={() => setIsPasswordRecovery(false)} />;
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} onDemoLogin={handleDemoLogin} />;
  }

  return (
    <>
    <OfflineBanner />
    <div className={`app-shell ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <button
        type="button"
        className="mobile-nav-toggle"
        onClick={() => setIsSidebarOpen((open) => !open)}
        aria-label={isSidebarOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isSidebarOpen}
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div
        className="sidebar-backdrop"
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      />

      <Sidebar
        activeSection={activeSection}
        handleSectionClick={handleSidebarNavigate}
        isSuperAdmin={isSuperAdmin}
        sidebarSearch={sidebarSearch}
        setSidebarSearch={setSidebarSearch}
        sidebarSearchRef={sidebarSearchRef}
        onCloseSidebar={() => setIsSidebarOpen(false)}
      />

      <div className={`content-area ${isDemoMode ? 'guest-content-area' : ''}`}>
        {isDemoMode && (
          <aside className="guest-banner" aria-label="Guest browsing notice">
            <div className="guest-banner-copy">
              <strong>You are browsing as a guest</strong>
              <span>Sign in with Google to connect your account and set up your personal profile.</span>
            </div>
            <button type="button" className="guest-banner-button" onClick={handleGuestGoogleLogin}>
              <LogIn size={17} aria-hidden="true" />
              Continue with Google
            </button>
          </aside>
        )}
        <div className="content-scroll">
          {isSectionLoading && (
            <div className="section-loader-overlay">
              <div className="loader-spinner"></div>
              <p>Loading...</p>
            </div>
          )}
          <InboxSection activeSection={activeSection} />

          <SearchExploreSection
            activeSection={activeSection}
            handleProductClick={handleProductClick}
            handleSectionClick={handleSectionClick}
            onNotify={(message) => showToast(message, 'success')}
            posts={sharedPosts}
            postsRefreshTick={postsRefreshTick}
          />

          <AddToCartSection
            activeSection={activeSection}
            handleSectionClick={handleSectionClick}
            handleProductClick={handleProductClick}
            onNotify={(message) => showToast(message, 'success')}
          />

          <ProfileSection
            activeSection={activeSection}
            isDemoMode={isDemoMode}
            userId={savedProfile?.id}
            savedProfile={savedProfile}
            handleProfileSave={handleProfileSave}
            userName={userName}
            setUserName={setUserName}
            userEmail={userEmail}
            userPhoto={userPhoto}
            setUserPhoto={setUserPhoto}
            userHandle={userHandle}
            setUserHandle={setUserHandle}
            userBio={userBio}
            setUserBio={setUserBio}
            handleSectionClick={handleSectionClick}
            handleProductClick={handleProductClick}
            onLogout={handleLogout}
            posts={sharedPosts}
          />

          <CreateSection activeSection={activeSection} posts={sharedPosts} handleProductClick={handleProductClick} savedFacePhoto={faceScanPhoto} />

          <WorkspaceSection activeSection={activeSection} />

          <DashboardSection
            activeSection={activeSection}
            handleSectionClick={handleSectionClick}
            output={output}
            selectedTheme={selectedTheme}
          />

          <TotalDesignsSection
            activeSection={activeSection}
            handleSectionClick={handleSectionClick}
            handleProductClick={handleProductClick}
            posts={sharedPosts}
            postsRefreshTick={postsRefreshTick}
          />

          <RecentlyViewedSection
            activeSection={activeSection}
            handleSectionClick={handleSectionClick}
            handleProductClick={handleProductClick}
          />

          <AllUserPostsSection
            activeSection={activeSection}
            handleProductClick={handleProductClick}
            handleSectionClick={handleSectionClick}
            postsRefreshTick={postsRefreshTick}
            posts={sharedPosts}
          />

          <AISection activeSection={activeSection} />

          <GeneratorSection
            activeSection={activeSection}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
            prompt={prompt}
            setPrompt={setPrompt}
            handleGenerate={handleGenerate}
            isGenerating={isGenerating}
            output={output}
            genDesignType={genDesignType}
            setGenDesignType={setGenDesignType}
            genClothing={genClothing}
            setGenClothing={setGenClothing}
            genStyle={genStyle}
            setGenStyle={setGenStyle}
            genFabric={genFabric}
            setGenFabric={setGenFabric}
            genColors={genColors}
            setGenColors={setGenColors}
            genPattern={genPattern}
            setGenPattern={setGenPattern}
            genSleeve={genSleeve}
            setGenSleeve={setGenSleeve}
            genFit={genFit}
            setGenFit={setGenFit}
            genNeck={genNeck}
            setGenNeck={setGenNeck}
            genSeason={genSeason}
            setGenSeason={setGenSeason}
            genQuality={genQuality}
            setGenQuality={setGenQuality}
            genCreativity={genCreativity}
            setGenCreativity={setGenCreativity}
            genNumDesigns={genNumDesigns}
            setGenNumDesigns={setGenNumDesigns}
            genAspectRatio={genAspectRatio}
            setGenAspectRatio={setGenAspectRatio}
            genPreviewMode={genPreviewMode}
            setGenPreviewMode={setGenPreviewMode}
            generatedDesigns={generatedDesigns}
            setGeneratedDesigns={setGeneratedDesigns}
            generationHistory={generationHistory}
            setGenerationHistory={setGenerationHistory}
            selectedDesign={selectedDesign}
            setSelectedDesign={setSelectedDesign}
            handleSectionClick={handleSectionClick}
          />
          <DraftsSection
            activeSection={activeSection}
            handleSectionClick={handleSectionClick}
          />

          <CustomizeSection activeSection={activeSection} />

          <SaleSection activeSection={activeSection} />

          <InsightsSection activeSection={activeSection} />

          <GallerySection activeSection={activeSection} galleryItems={galleryItems} />

          <SettingsSection
            activeSection={activeSection}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            userEmail={userEmail}
            onLogout={handleLogout}
            onFacePhotoChange={setFaceScanPhoto}
          />

          <SecuritySection activeSection={activeSection} />

          <SubscriptionSection activeSection={activeSection} />

          <CreditsSection activeSection={activeSection} />

          <PaymentHistorySection activeSection={activeSection} />
          <UploadedImagesSection
            activeSection={activeSection}
            userEmail={userEmail}
            onUploadSuccess={(customMessage) => {
              setActiveSection('home');
              window.localStorage.setItem('aifashionActiveSection', 'home');
              showToast(
                typeof customMessage === 'string' && customMessage
                  ? customMessage
                  : 'Your post is now visible to all users.',
                'success',
              );
            }}
            onUploadError={(message) => showToast(message, 'error')}
          />
          <AIGeneratedImagesSection activeSection={activeSection} />

          <DownloadsAnalyticsSection activeSection={activeSection} />

          <SharesAnalyticsSection activeSection={activeSection} />

          <AIUsageAnalyticsSection activeSection={activeSection} />
          <SavedPromptsSection activeSection={activeSection} />
          <BackgroundRemoverSection activeSection={activeSection} />
          <UpscaleImageSection activeSection={activeSection} />
          <RecolorOutfitSection activeSection={activeSection} />
          <PatternGeneratorSection activeSection={activeSection} />
          <CustomAvatarSection activeSection={activeSection} />
          <FavoritesSection activeSection={activeSection} />
          <PublishedDesignsSection activeSection={activeSection} />
          {isSuperAdmin && <SuperAdminSection activeSection={activeSection} />}
          <ProductDetailsSection
            activeSection={activeSection}
            product={selectedProduct}
            handleSectionClick={handleSectionClick}
            onNotify={(message) => showToast(message, 'success')}
            posts={sharedPosts}
            onNavigate={handleProductClick}
          />
        </div>
      </div>
    </div>
    {showWelcomeOverlay && (
      <WelcomeOverlay exiting={welcomeExiting} onContinue={handleWelcomeContinue} />
    )}
    <div className="tr-toast-container" aria-live="polite" aria-atomic="true">
      {toastList.map((toast) => {
        const IconComp = toast.type === 'success' ? Check : toast.type === 'error' ? AlertCircle : Info;
        return (
          <div key={toast.id} className={`tr-toast ${toast.type} ${toast.closing ? 'closing' : ''}`}>
            <div className="tr-toast-icon"><IconComp size={18} strokeWidth={2.5} /></div>
            <div className="tr-toast-body">
              <div className="tr-toast-title">{toast.title}</div>
              <div className="tr-toast-desc">{toast.desc}</div>
            </div>
            <button type="button" className="tr-toast-close" aria-label="Dismiss notification" onClick={() => removeToast(toast.id)}>
              <X size={14} strokeWidth={2.5} />
            </button>
          </div>
        );
      })}
    </div>
    </>
  );
}

export default App;

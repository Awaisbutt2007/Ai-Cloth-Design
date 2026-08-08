import { useEffect, useMemo, useRef, useState } from 'react';
import { designs } from './constants';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import ProfileSection from './components/ProfileSection';
import DashboardSection from './components/DashboardSection';
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
import AIGeneratedImagesSection from './components/AIGeneratedImagesSection';
import SavedPromptsSection from './components/SavedPromptsSection';
import BackgroundRemoverSection from './components/BackgroundRemoverSection';
import UpscaleImageSection from './components/UpscaleImageSection';
import RecolorOutfitSection from './components/RecolorOutfitSection';
import PatternGeneratorSection from './components/PatternGeneratorSection';
import CustomAvatarSection from './components/CustomAvatarSection';
import FavoritesSection from './components/FavoritesSection';
import PublishedDesignsSection from './components/PublishedDesignsSection';
import Login from './components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
  const [userPassword, setUserPassword] = useState('');
  const [userPhoto, setUserPhoto] = useState(null);
  const [userHandle, setUserHandle] = useState('@fashionista_ai');
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

  const topSearchRef = useRef(null);
  const sidebarSearchRef = useRef(null);

  const galleryItems = useMemo(
    () => designs.filter((design) => design.category === selectedCategory),
    [selectedCategory],
  );

  useEffect(() => {
    const stored = window.localStorage.getItem('aifashionUserProfile');
    if (stored) {
      const profile = JSON.parse(stored);
      setSavedProfile(profile);
      setUserName(profile.name || '');
      setUserEmail(profile.email || '');
      setUserPhone(profile.phone || '');
      setUserPassword(profile.password || '');
      setUserPhoto(profile.photo || null);
      setUserHandle(profile.handle || '@fashionista_ai');
    }
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

  function handleProfileSave(event) {
    event.preventDefault();
    if (!userName.trim() || !userEmail.trim() || !userPhone.trim() || !userHandle.trim()) {
      setProfileMessage('Please complete all fields before saving.');
      return;
    }

    const profile = {
      name: userName.trim(),
      email: userEmail.trim(),
      phone: userPhone.trim(),
      password: userPassword.trim(),
      photo: userPhoto,
      handle: userHandle.trim(),
      savedAt: new Date().toISOString(),
    };

    window.localStorage.setItem('aifashionUserProfile', JSON.stringify(profile));
    setSavedProfile(profile);
    setProfileMessage('Profile saved successfully.');
    setTimeout(() => setProfileMessage(''), 3000);
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

  if (!isLoggedIn) {
    return <Login onLogin={(user) => {
      setIsLoggedIn(true);
      if (user) {
        setUserName(user.name || '');
        setUserEmail(user.email || '');
        setUserPhone(user.phone || '');
        setUserPassword(user.password || '');
        setSavedProfile(user); // Also set as saved profile so 'Not set' doesn't show initially
      }
    }} />;
  }

  return (
    <div className="app-shell">
      <Sidebar
        activeSection={activeSection}
        handleSectionClick={handleSectionClick}
        sidebarSearch={sidebarSearch}
        setSidebarSearch={setSidebarSearch}
        sidebarSearchRef={sidebarSearchRef}
      />

      <div className="content-area">
        <Topbar
          topSearch={topSearch}
          setTopSearch={setTopSearch}
          topSearchRef={topSearchRef}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div className="content-scroll">
          {isSectionLoading && (
            <div className="section-loader-overlay">
              <div className="loader-spinner"></div>
              <p>Loading...</p>
            </div>
          )}
          <ProfileSection
            activeSection={activeSection}
            savedProfile={savedProfile}
            handleProfileSave={handleProfileSave}
            userName={userName}
            setUserName={setUserName}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            userPhone={userPhone}
            setUserPhone={setUserPhone}
            userPassword={userPassword}
            setUserPassword={setUserPassword}
            userPhoto={userPhoto}
            setUserPhoto={setUserPhoto}
            userHandle={userHandle}
            setUserHandle={setUserHandle}
            profileMessage={profileMessage}
          />

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

          <SettingsSection activeSection={activeSection} />

          <SecuritySection activeSection={activeSection} />

          <SubscriptionSection activeSection={activeSection} />

          <CreditsSection activeSection={activeSection} />

          <PaymentHistorySection activeSection={activeSection} />
          <UploadedImagesSection activeSection={activeSection} />
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
        </div>
      </div>
    </div>
  );
}

export default App;

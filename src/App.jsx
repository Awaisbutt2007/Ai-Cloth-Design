import { useEffect, useMemo, useRef, useState } from 'react';
import { designs } from './constants';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import ProfileSection from './components/ProfileSection';
import DashboardSection from './components/DashboardSection';
import AISection from './components/AISection';
import GeneratorSection from './components/GeneratorSection';
import CustomizeSection from './components/CustomizeSection';
import SaleSection from './components/SaleSection';
import InsightsSection from './components/InsightsSection';
import GallerySection from './components/GallerySection';
import SettingsSection from './components/SettingsSection';
import WorkspaceSection from './components/WorkspaceSection';
import APIKeysSection from './components/APIKeysSection';
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
import BrandLogosSection from './components/BrandLogosSection';
import BackgroundRemoverSection from './components/BackgroundRemoverSection';
import UpscaleImageSection from './components/UpscaleImageSection';
import RecolorOutfitSection from './components/RecolorOutfitSection';
import PatternGeneratorSection from './components/PatternGeneratorSection';
import LogoGeneratorSection from './components/LogoGeneratorSection';
import TShirtMockupSection from './components/TShirtMockupSection';
import HoodieMockupSection from './components/HoodieMockupSection';
import DressMockupSection from './components/DressMockupSection';
import JacketMockupSection from './components/JacketMockupSection';
import FemaleModelsSection from './components/FemaleModelsSection';
import MaleModelsSection from './components/MaleModelsSection';
import KidsModelsSection from './components/KidsModelsSection';
import CustomAvatarSection from './components/CustomAvatarSection';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Ready-to-Wear');
  const [darkMode, setDarkMode] = useState(() => {
    return window.localStorage.getItem('aifashionDarkMode') === 'true';
  });
  const [activeSection, setActiveSection] = useState(() => {
    return window.localStorage.getItem('aifashionActiveSection') || 'profile';
  });
  const [visibleSections, setVisibleSections] = useState(['profile']);
  const [selectedTheme, setSelectedTheme] = useState('Modern Minimal');
  const [prompt, setPrompt] = useState('Create a bold outfit inspired by luxury travel.');
  const [output, setOutput] = useState(designs[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [savedProfile, setSavedProfile] = useState(null);
  const [profileMessage, setProfileMessage] = useState('');
  const [topSearch, setTopSearch] = useState('');
  const [sidebarSearch, setSidebarSearch] = useState('');

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
    if (!userName.trim() || !userEmail.trim() || !userPhone.trim()) {
      setProfileMessage('Please complete all fields before saving.');
      return;
    }

    const profile = {
      name: userName.trim(),
      email: userEmail.trim(),
      phone: userPhone.trim(),
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
    setActiveSection(id);
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
            profileMessage={profileMessage}
          />

          <WorkspaceSection activeSection={activeSection} />

          <DashboardSection
            activeSection={activeSection}
            handleSectionClick={handleSectionClick}
            output={output}
            selectedTheme={selectedTheme}
          />

          <TotalDesignsSection activeSection={activeSection} />

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
          />

          <CustomizeSection activeSection={activeSection} />

          <SaleSection activeSection={activeSection} />

          <InsightsSection activeSection={activeSection} />

          <GallerySection activeSection={activeSection} galleryItems={galleryItems} />

          <SettingsSection activeSection={activeSection} />

          <APIKeysSection activeSection={activeSection} />

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
          <BrandLogosSection activeSection={activeSection} />
          <BackgroundRemoverSection activeSection={activeSection} />
          <UpscaleImageSection activeSection={activeSection} />
          <RecolorOutfitSection activeSection={activeSection} />
          <PatternGeneratorSection activeSection={activeSection} />
          <LogoGeneratorSection activeSection={activeSection} />
          <TShirtMockupSection activeSection={activeSection} />
          <HoodieMockupSection activeSection={activeSection} />
          <DressMockupSection activeSection={activeSection} />
          <JacketMockupSection activeSection={activeSection} />
          <FemaleModelsSection activeSection={activeSection} />
          <MaleModelsSection activeSection={activeSection} />
          <KidsModelsSection activeSection={activeSection} />
          <CustomAvatarSection activeSection={activeSection} />
        </div>
      </div>
    </div>
  );
}

export default App;

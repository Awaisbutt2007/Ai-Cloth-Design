import React, { useState } from 'react';
import {
  Home,
  Wand2,
  Shirt,
  Folder,
  Sparkles,
  Users,
  ShoppingBag,
  Wrench,
  Image,
  BarChart3,
  CreditCard,
  Bell,
  Settings,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';

function Sidebar({
  activeSection,
  handleSectionClick,
  sidebarSearch,
  setSidebarSearch,
  sidebarSearchRef,
}) {

  const sidebarSections = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: Home,
      items: ['Profile', 'Overview', 'Total Designs', 'Credits Left', 'Recent Activity'],
    },
    {
      id: 'ai-studio',
      title: 'AI Design Studio',
      icon: Wand2,
      items: ['Generate Design'],
    },
    {
      id: 'my-designs',
      title: 'My Designs',
      icon: Shirt,
      items: ['All Designs', 'Drafts', 'Favorites', 'Published'],
    },
    {
      id: 'collections',
      title: 'Collections',
      icon: Folder,
      items: ['Custom Collections'],
    },
    {
      id: 'inspiration',
      title: 'Inspiration',
      icon: Sparkles,
      items: ['Color Palettes', 'Fabric Library', 'Style Gallery'],
    },
    {
      id: 'ai-models',
      title: 'AI Models',
      icon: Users,
      items: ['Custom Avatar'],
    },

    {
      id: 'ai-tools',
      title: 'AI Tools',
      icon: Wrench,
      items: ['Background Remover', 'Upscale Image', 'Recolor Outfit', 'Pattern Generator'],
    },
    {
      id: 'assets',
      title: 'Assets',
      icon: Image,
      items: ['Uploaded Images', 'AI Generated Images', 'Saved Prompts'],
    },
    {
      id: 'analytics',
      title: 'Analytics',
      icon: BarChart3,
      items: ['Downloads', 'Shares', 'AI Usage'],
    },
    {
      id: 'billing',
      title: 'Billing',
      icon: CreditCard,
      items: ['Subscription', 'Credits', 'Payment History'],
    },

    {
      id: 'settings',
      title: 'Settings',
      icon: Settings,
      items: ['Workspace', 'API Keys', 'Security'],
    },
    {
      id: 'help',
      title: 'Help Center',
      icon: HelpCircle,
      items: ['Documentation', 'FAQs', 'Contact Support'],
    },
  ];


  const filteredSections = sidebarSections.map(section => {
    if (!sidebarSearch) return section;
    const lowerSearch = sidebarSearch.toLowerCase();
    const titleMatches = section.title.toLowerCase().includes(lowerSearch);
    const matchingItems = section.items.filter(item =>
      item.toLowerCase().includes(lowerSearch)
    );

    if (titleMatches || matchingItems.length > 0) {
      return {
        ...section,
        items: titleMatches ? section.items : matchingItems
      };
    }
    return null;
  }).filter(Boolean);

  return (
    <aside className="sidebar">
      <div className="sidebar-sticky">
        <div className="sidebar-brand">AIFashion</div>
        <div className="sidebar-search">
          <label>Sidebar search</label>
          <input
            ref={sidebarSearchRef}
            value={sidebarSearch}
            onChange={(e) => setSidebarSearch(e.target.value)}
            placeholder="Ctrl + / to search sidebar"
          />
        </div>
        <nav className="sidebar-nav">
          {filteredSections.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 10px', color: '#8d6f55' }}>
              <p style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: '8px' }}>No results found</p>
              <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>Koi bhi section nahi mila.</p>
            </div>
          ) : (
            <div className="dropdown-items" style={{ animation: 'none', padding: 0, display: 'grid', gap: '8px' }}>
              {filteredSections.map((section) =>
                section.items.map((item) => {
                  const lowerSearch = sidebarSearch ? sidebarSearch.toLowerCase() : '';
                  const titleMatches = section.title.toLowerCase().includes(lowerSearch);
                  const isItemHidden = sidebarSearch && !titleMatches && !item.toLowerCase().includes(lowerSearch);

                  return (
                    <a
                      key={`${section.id}-${item}`}
                      href={`#${section.id}-${item.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={(event) => handleSectionClick(event, item.toLowerCase().replace(/\s+/g, '-'))}
                      className={`${activeSection === item.toLowerCase().replace(/\s+/g, '-') ? 'active' : ''} ${isItemHidden ? 'hide-item' : ''}`}
                    >
                      {item}
                    </a>
                  );
                })
              )}
            </div>
          )}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;

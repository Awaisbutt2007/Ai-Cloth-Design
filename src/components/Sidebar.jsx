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
  const [expandedDropdowns, setExpandedDropdowns] = useState({});

  const toggleDropdown = (section) => {
    setExpandedDropdowns((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleMouseEnter = (section) => {
    setExpandedDropdowns((prev) => ({
      ...prev,
      [section]: true,
    }));
  };

  const handleMouseLeave = (section) => {
    setExpandedDropdowns((prev) => ({
      ...prev,
      [section]: false,
    }));
  };

  const sidebarSections = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: Home,
      items: ['Overview', 'Total Designs', 'Credits Left', 'Recent Activity'],
    },
    {
      id: 'ai-studio',
      title: 'AI Design Studio',
      icon: Wand2,
      items: ['Generate Design', 'Text to Fashion', 'Image to Fashion', 'Sketch to Design'],
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
      items: ['Summer Collection', 'Winter Collection', 'Casual Wear', 'Formal Wear', 'Streetwear', 'Custom Collections'],
    },
    {
      id: 'inspiration',
      title: 'Inspiration',
      icon: Sparkles,
      items: ['Trending Designs', 'Color Palettes', 'Fabric Library', 'Style Gallery'],
    },
    {
      id: 'ai-models',
      title: 'AI Models',
      icon: Users,
      items: ['Female Models', 'Male Models', 'Kids Models', 'Custom Avatar'],
    },
    {
      id: 'mockups',
      title: 'Mockups',
      icon: ShoppingBag,
      items: ['T-Shirt Mockup', 'Hoodie Mockup', 'Dress Mockup', 'Jacket Mockup'],
    },
    {
      id: 'ai-tools',
      title: 'AI Tools',
      icon: Wrench,
      items: ['Background Remover', 'Upscale Image', 'Recolor Outfit', 'Pattern Generator', 'Logo Generator'],
    },
    {
      id: 'assets',
      title: 'Assets',
      icon: Image,
      items: ['Uploaded Images', 'AI Generated Images', 'Saved Prompts', 'Brand Logos'],
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
      items: ['Profile', 'Workspace', 'API Keys', 'Security'],
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
          {filteredSections.map((section) => {
            const IconComponent = section.icon;
            const isExpanded = expandedDropdowns[section.id];

            return (
              <div
                key={section.id}
                className="sidebar-dropdown"
              >
                <button
                  className={`dropdown-toggle ${isExpanded ? 'expanded' : ''}`}
                  onClick={() => toggleDropdown(section.id)}
                >
                  <div className="dropdown-header">
                    <IconComponent size={20} className="dropdown-icon" />
                    <span className="dropdown-title">{section.title}</span>
                  </div>
                  {section.items.length > 0 && (
                    <ChevronDown size={18} className="dropdown-arrow" />
                  )}
                </button>
                {isExpanded && section.items.length > 0 && (
                  <div className="dropdown-items">
                    {section.items.map((item) => {
                      const lowerSearch = sidebarSearch ? sidebarSearch.toLowerCase() : '';
                      const titleMatches = section.title.toLowerCase().includes(lowerSearch);
                      const isItemHidden = sidebarSearch && !titleMatches && !item.toLowerCase().includes(lowerSearch);

                      return (
                        <a
                          key={item}
                          href={`#${section.id}-${item.toLowerCase().replace(/\s+/g, '-')}`}
                          onClick={(event) => handleSectionClick(event, item.toLowerCase().replace(/\s+/g, '-'))}
                          className={`${activeSection === item.toLowerCase().replace(/\s+/g, '-') ? 'active' : ''} ${isItemHidden ? 'hide-item' : ''}`}
                        >
                          {item}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;

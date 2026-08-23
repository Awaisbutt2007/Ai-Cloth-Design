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
  Search,
  Inbox,
  Crown,
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
      id: 'my-designs',
      title: 'My Designs', 
      icon: Shirt,
      items: ['Home'],
    },
    {
      id: 'search',
      title: 'Search',
      icon: Search,
      items: ['Search'],
    },
    {
      id: 'Ai Scan',
      title: 'Ai Scan',
      icon: Image,
      items: ['Ai Scan'],
    },
      {
      id: 'Upload',
      title: 'Upload',
      icon: Inbox,
      items: ['Upload'],
    },
    {
      id: 'inbox',
      title: 'Inbox',
      icon: Inbox,
      items: ['Inbox'],
    },
   
    {
      id: 'billing',
      title: 'Billing',
      icon: CreditCard,
      items: ['Subscription'],
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: Settings,
      items: ['Workspace'],
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: Home,
      items: ['Profile'],
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
            type="search"
            name="app-sidebar-search"
            value={sidebarSearch}
            onChange={(e) => setSidebarSearch(e.target.value)}
            placeholder="Ctrl + / to search sidebar"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            data-1p-ignore="true"
            data-lpignore="true"
            readOnly
            onFocus={(e) => e.target.removeAttribute('readonly')}
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

        <div className="sidebar-premium-box">
          <div className="premium-icon-wrap">
            <Crown size={20} color="#FFD700" />
          </div>
          <h4 className="premium-title">Upgrade to Premium</h4>
          <p className="premium-desc">Unlock all features and get more AI credits</p>
          <button className="premium-upgrade-btn">Upgrade Now</button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

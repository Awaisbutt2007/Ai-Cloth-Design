
import React, { useState } from 'react';
import { Plus, Download, Edit, Star, Copy, Share2, Trash2, Sparkles, Folder, Search, ChevronDown, X, Play } from 'lucide-react';

function SavedPromptsSection({ activeSection }) {
  const [selectedPrompts, setSelectedPrompts] = useState([]);
  const [previewPrompt, setPreviewPrompt] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [showEmptyState, setShowEmptyState] = useState(false);

  const sectionId = 'assets-saved-prompts';
  const activeId = 'saved-prompts';

  if (activeSection !== activeId) return null;

  const samplePrompts = [
    {
      id: 1,
      title: 'Luxury Winter Jacket',
      category: 'Jackets',
      style: 'Luxury',
      lastUsed: 'Today',
      timesUsed: 42,
      imagesGenerated: 126,
      successRate: 98,
      rating: 5,
      prompt: 'Design a luxury black winter jacket with gold zippers and premium leather.',
      negativePrompt: 'Low quality, blur, extra arms',
      createdAt: '2026-07-10',
      isFavorite: true,
      tags: ['Winter', 'Luxury', 'Leather']
    },
    {
      id: 2,
      title: 'Summer Floral Dress',
      category: 'Dresses',
      style: 'Minimal',
      lastUsed: 'Yesterday',
      timesUsed: 30,
      imagesGenerated: 90,
      successRate: 95,
      rating: 4,
      prompt: 'Elegant floral summer dress with lightweight fabric and A-line silhouette.',
      negativePrompt: 'Heavy fabric, loud prints',
      createdAt: '2026-07-08',
      isFavorite: true,
      tags: ['Summer', 'Floral', 'Minimal']
    },
    {
      id: 3,
      title: 'Streetwear Hoodie',
      category: 'Hoodies',
      style: 'Streetwear',
      lastUsed: '3 Days Ago',
      timesUsed: 18,
      imagesGenerated: 54,
      successRate: 97,
      rating: 5,
      prompt: 'Oversized streetwear hoodie with bold graphics and drop shoulder design.',
      negativePrompt: 'Fitted, plain design',
      createdAt: '2026-07-05',
      isFavorite: false,
      tags: ['Streetwear', 'Oversized', 'Hoodie']
    },
    {
      id: 4,
      title: 'Vintage Leather Boots',
      category: 'Shoes',
      style: 'Vintage',
      lastUsed: '1 Week Ago',
      timesUsed: 15,
      imagesGenerated: 45,
      successRate: 92,
      rating: 4,
      prompt: 'Classic vintage leather boots with distressed finish and lace-up design.',
      negativePrompt: 'Synthetic materials, modern design',
      createdAt: '2026-06-28',
      isFavorite: true,
      tags: ['Vintage', 'Leather', 'Boots']
    }
  ];

  const collections = [
    { id: 1, name: 'Winter Collection', count: 8, icon: '❄️' },
    { id: 2, name: 'Luxury Collection', count: 12, icon: '✨' },
    { id: 3, name: 'Streetwear', count: 15, icon: '🔥' },
    { id: 4, name: 'Client Prompts', count: 20, icon: '👥' }
  ];

  const togglePromptSelection = (id) => {
    setSelectedPrompts(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id) 
        : [...prev, id]
    );
  };

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    // Add favorite logic here
  };

  const openPreview = (prompt) => {
    setPreviewPrompt(prompt);
  };

  const closePreview = () => {
    setPreviewPrompt(null);
  };

  return (
    <section id={sectionId} className={`section saved-prompts-section ${activeSection === activeId ? 'active' : 'hidden'}`}>
      <div className="sub-content">
        
        {/* 1️⃣ Header */}
        <div className="saved-prompts-header">
          <div className="saved-prompts-header-text">
            <h2>Saved Prompts</h2>
            <p>Save and reuse your best AI prompts.</p>
          </div>
          <div className="saved-prompts-header-actions">
            <button className="btn-primary">
              <Plus size={18} />
              New Prompt
            </button>
            <button className="btn-secondary">
              <Download size={18} />
              Import Prompt
            </button>
          </div>
        </div>

        {/* 2️⃣ Prompt Summary */}
        <div className="prompt-summary-grid">
          <div className="prompt-summary-card">
            <span className="prompt-summary-label">Total Prompts</span>
            <strong className="prompt-summary-value">{showEmptyState ? 0 : 148}</strong>
          </div>
          <div className="prompt-summary-card">
            <span className="prompt-summary-label">Favorites</span>
            <strong className="prompt-summary-value">{showEmptyState ? 0 : 28}</strong>
          </div>
          <div className="prompt-summary-card">
            <span className="prompt-summary-label">Most Used</span>
            <strong className="prompt-summary-value">{showEmptyState ? '-' : 'Luxury Jacket'}</strong>
          </div>
          <div className="prompt-summary-card">
            <span className="prompt-summary-label">This Month</span>
            <strong className="prompt-summary-value">{showEmptyState ? 0 : 18} New Prompts</strong>
          </div>
        </div>

        {/* 3️⃣ Search & Filters */}
        <div className="search-filters-card">
          <div className="search-filters-toolbar">
            <div className="search-filters-search">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search Prompt..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="search-filters-selectors">
              <div className="filter-selector">
                <span>Category</span>
                <ChevronDown size={16} />
              </div>
              <div className="filter-selector">
                <span>Style</span>
                <ChevronDown size={16} />
              </div>
              <div className="filter-selector">
                <span>Tags</span>
                <ChevronDown size={16} />
              </div>
              <div className="filter-selector">
                <span>Sort</span>
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* 9️⃣ Bulk Actions */}
        {selectedPrompts.length > 0 && (
          <div className="bulk-actions-card">
            <div className="bulk-actions-info">
              <strong>{selectedPrompts.length} prompts selected</strong>
              <button 
                onClick={() => setSelectedPrompts([])}
                className="bulk-actions-clear"
              >
                Clear
              </button>
            </div>
            <div className="bulk-actions-buttons">
              <button className="btn-secondary bulk-btn">
                <Trash2 size={16} />
                Delete
              </button>
              <button className="btn-secondary bulk-btn">
                <Folder size={16} />
                Move
              </button>
              <button className="btn-secondary bulk-btn">
                <Star size={16} />
                Favorite
              </button>
              <button className="btn-secondary bulk-btn">
                <Download size={16} />
                Export
              </button>
              <button className="btn-secondary bulk-btn">
                <Share2 size={16} />
                Share
              </button>
            </div>
          </div>
        )}

        {/* Layout: Main Content + Sidebar */}
        <div className="saved-prompts-layout">
          
          {/* Left Column: Prompts Grid */}
          <div className="saved-prompts-main">
            
            {/* Empty State or Prompts Grid */}
            {showEmptyState ? (
              <div className="empty-state-card">
                <div className="empty-state-icon-wrapper">
                  <Sparkles size={64} />
                </div>
                <h3>No Saved Prompts</h3>
                <p>Save your first AI prompt.</p>
                <button className="btn-primary">
                  <Plus size={18} />
                  Create Prompt
                </button>
              </div>
            ) : (
              <div className="prompts-grid">
                {samplePrompts.map((prompt) => (
                  <div 
                    key={prompt.id} 
                    className={`prompt-card ${selectedPrompts.includes(prompt.id) ? 'selected' : ''}`}
                    onClick={() => openPreview(prompt)}
                  >
                    <div className="prompt-check">
                      <input 
                        type="checkbox" 
                        checked={selectedPrompts.includes(prompt.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          togglePromptSelection(prompt.id);
                        }}
                      />
                    </div>
                    <div className="prompt-header">
                      <h3 className="prompt-title">{prompt.title}</h3>
                      <button 
                        className={`prompt-favorite-btn ${prompt.isFavorite ? 'active' : ''}`}
                        onClick={(e) => toggleFavorite(e, prompt.id)}
                      >
                        <Star size={16} fill={prompt.isFavorite ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    <div className="prompt-meta">
                      <span className="prompt-category">{prompt.category}</span>
                      <span className="prompt-style">{prompt.style}</span>
                      <span className="prompt-last-used">{prompt.lastUsed}</span>
                    </div>
                    <div className="prompt-preview">
                      {prompt.prompt.length > 100 
                        ? prompt.prompt.substring(0, 100) + '...' 
                        : prompt.prompt}
                    </div>
                    <div className="prompt-rating">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill={i < prompt.rating ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                    <div className="prompt-actions">
                      <button className="prompt-action-btn" title="Use Prompt">
                        <Play size={14} />
                      </button>
                      <button className="prompt-action-btn" title="Edit">
                        <Edit size={14} />
                      </button>
                      <button className="prompt-action-btn" title="Copy">
                        <Copy size={14} />
                      </button>
                      <button className="prompt-action-btn" title="Share">
                        <Share2 size={14} />
                      </button>
                      <button className="prompt-action-btn danger" title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <div className="saved-prompts-sidebar">
            
            {/* 6️⃣ Favorite Prompts */}
            <div className="sidebar-section-card">
              <h3 className="sidebar-section-title">
                <Star size={18} />
                Favorites
              </h3>
              <div className="favorite-prompts-list">
                {samplePrompts.filter(p => p.isFavorite).map((prompt) => (
                  <div key={prompt.id} className="favorite-prompt-item">
                    <span className="favorite-prompt-name">{prompt.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 7️⃣ Collections */}
            <div className="sidebar-section-card">
              <h3 className="sidebar-section-title">
                <Folder size={18} />
                Collections
              </h3>
              <div className="collections-list">
                {collections.map((collection) => (
                  <div key={collection.id} className="collection-item">
                    <span className="collection-icon">{collection.icon}</span>
                    <div className="collection-info">
                      <span className="collection-name">{collection.name}</span>
                      <span className="collection-count">{collection.count} prompts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 8️⃣ Prompt Performance */}
            <div className="sidebar-section-card">
              <h3 className="sidebar-section-title">
                <Sparkles size={18} />
                Performance
              </h3>
              <div className="prompt-performance-table">
                <table>
                  <thead>
                    <tr>
                      <th>Prompt</th>
                      <th>Used</th>
                      <th>Images</th>
                      <th>Success</th>
                    </tr>
                  </thead>
                  <tbody>
                    {samplePrompts.slice(0, 3).map((prompt) => (
                      <tr key={prompt.id}>
                        <td className="perf-prompt-name">{prompt.title}</td>
                        <td>{prompt.timesUsed}</td>
                        <td>{prompt.imagesGenerated}</td>
                        <td className="perf-success-rate">{prompt.successRate}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

        {/* 5️⃣ Prompt Details Drawer */}
        {previewPrompt && (
          <div className="prompt-preview-overlay" onClick={closePreview}>
            <div className="prompt-preview-drawer" onClick={(e) => e.stopPropagation()}>
              <button className="drawer-close-btn" onClick={closePreview}>
                <X size={20} />
              </button>
              <div className="drawer-content">
                <div className="drawer-header">
                  <h2>{previewPrompt.title}</h2>
                  <div className="drawer-meta">
                    <span className="drawer-category">{previewPrompt.category}</span>
                    <span className="drawer-style">{previewPrompt.style}</span>
                  </div>
                </div>

                <div className="drawer-section">
                  <h3>Prompt</h3>
                  <p className="drawer-text">{previewPrompt.prompt}</p>
                </div>

                <div className="drawer-section">
                  <h3>Negative Prompt</h3>
                  <p className="drawer-text">{previewPrompt.negativePrompt}</p>
                </div>

                <div className="drawer-stats-grid">
                  <div className="drawer-stat">
                    <span className="drawer-stat-label">Created</span>
                    <span className="drawer-stat-value">{previewPrompt.createdAt}</span>
                  </div>
                  <div className="drawer-stat">
                    <span className="drawer-stat-label">Times Used</span>
                    <span className="drawer-stat-value">{previewPrompt.timesUsed}</span>
                  </div>
                  <div className="drawer-stat">
                    <span className="drawer-stat-label">Last Used</span>
                    <span className="drawer-stat-value">{previewPrompt.lastUsed}</span>
                  </div>
                  <div className="drawer-stat">
                    <span className="drawer-stat-label">Success Rate</span>
                    <span className="drawer-stat-value">{previewPrompt.successRate}%</span>
                  </div>
                </div>

                <div className="drawer-buttons">
                  <button className="btn-primary drawer-btn">
                    <Sparkles size={16} />
                    Generate Design
                  </button>
                  <button className="btn-secondary drawer-btn">
                    <Edit size={16} />
                    Edit Prompt
                  </button>
                  <button className="btn-secondary drawer-btn">
                    <Copy size={16} />
                    Duplicate
                  </button>
                  <button className="btn-secondary drawer-btn">
                    <Copy size={16} />
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

export default SavedPromptsSection;


import React, { useState } from 'react';
import {
  Plus, UploadCloud, Download, Search, Filter, Grid, List,
  Eye, Edit, Copy, Share2, Trash2, Heart, DownloadCloud, X,
  TrendingUp, ChevronLeft, ChevronRight, CheckSquare, Square, Palette, Zap, Star,
  Sparkles, Maximize, Folder, Clock, ArrowUpDown, LayoutGrid, List as ListIcon, Maximize2, Minimize2,
  Archive, FileText, FileSpreadsheet
} from 'lucide-react';

// Enhanced mock designs with all required fields
const mockDesigns = [];

const collections = [
  'Summer Collection', 'Winter Collection', 'Streetwear', 'Luxury', 'Sports', 'Client Projects'
];

function TotalDesignsSection({ activeSection, handleSectionClick }) {
  const [viewMode, setViewMode] = useState('grid');
  const [displaySize, setDisplaySize] = useState('medium');
  const [selectedDesigns, setSelectedDesigns] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('Design Name');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest');
  const [selectedCollection, setSelectedCollection] = useState(null);

  const toggleSelection = (id) => {
    setSelectedDesigns(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedDesigns.length === mockDesigns.length) {
      setSelectedDesigns([]);
    } else {
      setSelectedDesigns(mockDesigns.map(d => d.id));
    }
  };

  const openDrawer = (design) => {
    setSelectedDesign(design);
    setDrawerOpen(true);
  };

  return (
    <section id="all-designs" className={`section total-designs-section ${(activeSection === 'all-designs' || activeSection === 'total-designs') ? 'active' : 'hidden'}`}>
      
      {/* 1. Page Header */}
      <div className="td-header">
        <div className="td-header-left">
          <h2>All Designs</h2>
          <p>Manage all your AI-generated fashion designs.</p>
        </div>
        <div className="td-header-actions">
          <button className="ws-btn-secondary">
            <Plus size={16} /> New Design
          </button>
          <button className="ws-btn-secondary">
            <UploadCloud size={16} /> Import Design
          </button>
        </div>
      </div>

      {/* 2. Statistics Cards */}
      <div className="td-stats-row">
        <div className="td-stat-card">
          <div className="td-stat-title">Total Designs</div>
          <div className="td-stat-value">0</div>
        </div>
        <div className="td-stat-card">
          <div className="td-stat-title">Favorites</div>
          <div className="td-stat-value">0</div>
        </div>
        <div className="td-stat-card">
          <div className="td-stat-title">This Month</div>
          <div className="td-stat-value">0</div>
        </div>
        <div className="td-stat-card">
          <div className="td-stat-title">Storage Used</div>
          <div className="td-stat-value">0 MB</div>
        </div>
      </div>

      <div className="td-main-layout">
        <div className="td-content-area">
          
          {/* 3 & 4. Search, Filters, View Options */}
          <div className="td-toolbar">
            <div className="td-search-wrapper">
              <div className="td-search-box">
                <Search size={16} className="td-search-icon" />
                <input 
                  type="text" 
                  placeholder="Search Designs..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="td-search-by">
                <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
                  <option value="Design Name">Design Name</option>
                  <option value="Prompt">Prompt</option>
                  <option value="Tags">Tags</option>
                  <option value="Product Type">Product Type</option>
                </select>
              </div>
              <div className="td-filters">
                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                  <option value="All">Category: All</option>
                  <option value="T-Shirt">T-Shirt</option>
                  <option value="Hoodie">Hoodie</option>
                  <option value="Jacket">Jacket</option>
                  <option value="Dress">Dress</option>
                  <option value="Shoes">Shoes</option>
                  <option value="Cap">Cap</option>
                </select>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="All">Status: All</option>
                  <option value="Completed">Completed</option>
                  <option value="Draft">Draft</option>
                  <option value="Processing">Processing</option>
                  <option value="Failed">Failed</option>
                </select>
                <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
                  <option value="All">Date: All</option>
                  <option value="Today">Today</option>
                  <option value="This Week">This Week</option>
                  <option value="This Month">This Month</option>
                  <option value="Custom">Custom</option>
                </select>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                  <option value="Newest">Sort: Newest</option>
                  <option value="Oldest">Oldest</option>
                  <option value="Most Downloaded">Most Downloaded</option>
                  <option value="Most Viewed">Most Viewed</option>
                  <option value="Favorites">Favorites</option>
                </select>
              </div>
              <div className="td-view-options">
                <div className="td-view-toggle">
                  <button 
                    className={viewMode === 'grid' ? 'active' : ''} 
                    onClick={() => setViewMode('grid')}
                    title="Grid View"
                  >
                    <Grid size={18} />
                  </button>
                  <button 
                    className={viewMode === 'list' ? 'active' : ''} 
                    onClick={() => setViewMode('list')}
                    title="List View"
                  >
                    <List size={18} />
                  </button>
                </div>
                <div className="td-display-size">
                  <button 
                    className={displaySize === 'small' ? 'active' : ''} 
                    onClick={() => setDisplaySize('small')}
                  >
                    <Minimize2 size={16} />
                  </button>
                  <button 
                    className={displaySize === 'medium' ? 'active' : ''} 
                    onClick={() => setDisplaySize('medium')}
                  >
                    <LayoutGrid size={16} />
                  </button>
                  <button 
                    className={displaySize === 'large' ? 'active' : ''} 
                    onClick={() => setDisplaySize('large')}
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Design Gallery */}
          {mockDesigns.length === 0 ? (
            /* 12. Empty State */
            <div className="td-empty-state">
              <div className="td-empty-icon">🎨</div>
              <h3>No Designs Found</h3>
              <p>Create your first AI fashion design.</p>
              <button className="ws-btn-primary" onClick={(e) => handleSectionClick(e, 'generator')}>
                <Sparkles size={16} /> Generate Design
              </button>
            </div>
          ) : (
            <>
              <div className={`td-gallery ${viewMode === 'grid' ? 'td-grid-view' : 'td-list-view'} td-size-${displaySize}`}>
                {mockDesigns.map(design => (
                  <div key={design.id} className="td-design-card" onClick={() => openDrawer(design)}>
                    <div className="td-card-checkbox" onClick={(e) => { e.stopPropagation(); toggleSelection(design.id); }}>
                      {selectedDesigns.includes(design.id) ? <CheckSquare size={20} className="text-primary" /> : <Square size={20} className="text-muted" />}
                    </div>
                    <div className="td-image-wrapper">
                      <img src={design.image} alt={design.title} />
                      <div className="td-status-badge">{design.status}</div>
                      {design.favorite && <div className="td-favorite-badge"><Heart size={14} fill="currentColor" /></div>}
                      
                      {/* Quick Actions on Hover */}
                      <div className="td-card-actions">
                        <button title="View" onClick={(e) => { e.stopPropagation(); openDrawer(design); }}><Eye size={16} /></button>
                        <button title="Edit" onClick={(e) => { e.stopPropagation(); }}><Edit size={16} /></button>
                        <button title="Duplicate" onClick={(e) => { e.stopPropagation(); }}><Copy size={16} /></button>
                        <button title="Download" onClick={(e) => { e.stopPropagation(); }}><DownloadCloud size={16} /></button>
                        <button title="Delete" onClick={(e) => { e.stopPropagation(); }}><Trash2 size={16} /></button>
                      </div>
                    </div>
                    <div className="td-card-info">
                      <div className="td-card-header-row">
                        <h4>{design.title}</h4>
                      </div>
                      <div className="td-card-meta">
                        <span>{design.category}</span>
                        <span>•</span>
                        <span>{design.created}</span>
                        <span>•</span>
                        <span>{design.resolution}</span>
                        <span>•</span>
                        <span>{design.creditsUsed} Credits</span>
                      </div>
                      
                      {/* 10. Activity */}
                      <div className="td-card-activity">
                        <div className="td-activity-item">
                          <Clock size={12} />
                          <span>{design.lastEdited}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 11. Load More */}
              <div className="td-load-more">
                <button className="ws-btn-secondary">
                  Load More
                </button>
              </div>
            </>
          )}
        </div>

        {/* Sidebar for Collections & Premium Features */}
        <div className="td-sidebar">
          {/* 9. Collections */}
          <div className="td-collections">
            <h3 className="td-sidebar-title">Collections</h3>
            <div className="td-collection-list">
              {collections.map((col, i) => (
              <button 
                key={col} 
                className={`td-collection-btn ${selectedCollection === col ? 'active' : ''}`}
                onClick={() => setSelectedCollection(col)}
              >
                <Folder size={16} />
                <span>{col}</span>
              </button>
            ))}
            </div>
          </div>

          {/* Premium Features */}
          <div className="td-premium-sidebar">
            <h3 className="td-sidebar-title">🌟 Premium Features</h3>
            <div className="td-premium-item">
              <Star size={16} />
              <span>⭐ Favorites</span>
            </div>
            <div className="td-premium-item">
              <Palette size={16} />
              <span>🏷 Smart Tags</span>
            </div>
            <div className="td-premium-item">
              <TrendingUp size={16} />
              <span>📊 Design Analytics</span>
            </div>
            <div className="td-premium-item">
              <Zap size={16} />
              <span>🔄 Version History</span>
            </div>
            <div className="td-premium-item">
              <Archive size={16} />
              <span>📦 Export Collection</span>
            </div>
            <div className="td-premium-item">
              <Sparkles size={16} />
              <span>🤖 AI Recommendations</span>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Floating Bulk Actions */}
      {selectedDesigns.length > 0 && (
        <div className="td-bulk-actions">
          <div className="td-bulk-info">
          <button className="td-clear-btn" onClick={() => setSelectedDesigns([])}><X size={16} /></button>
          <span>{selectedDesigns.length} selected</span>
        </div>
        <div className="td-bulk-buttons">
          <button className="ws-btn-secondary"><Trash2 size={16} /> Delete</button>
          <button className="ws-btn-secondary"><DownloadCloud size={16} /> Download</button>
          <button className="ws-btn-secondary">Move</button>
          <button className="ws-btn-secondary">Add Tags</button>
          <button className="ws-btn-secondary"><Archive size={16} /> Export ZIP</button>
        </div>
        </div>
      )}

      {/* 8. Design Details Drawer */}
      <div className={`td-drawer-overlay ${drawerOpen ? 'open' : ''}`} onClick={() => setDrawerOpen(false)}>
        <div className="td-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="td-drawer-header">
            <h3>Design Details</h3>
            <button className="td-drawer-close" onClick={() => setDrawerOpen(false)}><X size={20} /></button>
          </div>
          {selectedDesign && (
            <div className="td-drawer-content">
              <img src={selectedDesign.image} alt="Preview" className="td-drawer-img" />
              
              <div className="td-drawer-details">
                <div className="td-drawer-section">
                  <label>Prompt Used</label>
                  <p className="td-prompt-text">{selectedDesign.prompt}</p>
                </div>
                
                <div className="td-drawer-grid">
                  <div className="td-info-item">
                    <label>AI Model</label>
                    <p>{selectedDesign.aiModel}</p>
                  </div>
                  <div className="td-info-item">
                    <label>Resolution</label>
                    <p>{selectedDesign.resolution}</p>
                  </div>
                  <div className="td-info-item">
                    <label>Generation Time</label>
                    <p>12 sec</p>
                  </div>
                  <div className="td-info-item">
                    <label>Credits Used</label>
                    <p>{selectedDesign.creditsUsed}</p>
                  </div>
                </div>

                <div className="td-drawer-section">
                  <label>Tags</label>
                  <div className="td-tag-list">
                    {selectedDesign.tags.map(tag => (
                      <span key={tag} className="td-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="td-drawer-section">
                  <label>Notes</label>
                  <textarea className="td-notes-input" placeholder="Add notes..."></textarea>
                </div>
                
                {/* 📊 Design Analytics (Premium) */}
                <div className="td-drawer-section">
                  <div className="td-analytics-grid">
                    <div className="td-analytics-item">
                      <label>Downloads</label>
                      <span>{selectedDesign.downloads}</span>
                    </div>
                    <div className="td-analytics-item">
                      <label>Views</label>
                      <span>{selectedDesign.views}</span>
                    </div>
                    <div className="td-analytics-item">
                      <label>Shares</label>
                      <span>{selectedDesign.shares}</span>
                    </div>
                    <div className="td-analytics-item">
                      <label>Mockups Created</label>
                      <span>1</span>
                    </div>
                  </div>
                </div>
                
                {/* 🔄 Version History (Premium) */}
                <div className="td-drawer-section">
                  <div className="td-version-history">
                    <div className="td-version-item">
                      <div className="td-version-number">Version 3</div>
                      <div className="td-version-time">2 hours ago</div>
                    </div>
                    <div className="td-version-divider">
                      <div className="td-version-line"></div>
                      <div className="td-version-arrow">↓</div>
                    </div>
                    <div className="td-version-item">
                      <div className="td-version-number">Version 2</div>
                      <div className="td-version-time">Yesterday</div>
                    </div>
                    <div className="td-version-divider">
                      <div className="td-version-line"></div>
                      <div className="td-version-arrow">↓</div>
                    </div>
                    <div className="td-version-item">
                      <div className="td-version-number">Version 1</div>
                      <div className="td-version-time">2 days ago</div>
                    </div>
                  </div>
                </div>
                
                {/* 🤖 AI Recommendations (Premium) */}
                <div className="td-drawer-section">
                  <div className="td-recommendations">
                    <div className="td-recommendation-item">
                      Create Hoodie Mockup
                    </div>
                    <div className="td-recommendation-item">
                      Generate Matching Cap
                    </div>
                    <div className="td-recommendation-item">
                      Generate Jacket Version
                    </div>
                    <div className="td-recommendation-item">
                      Upscale Design
                    </div>
                  </div>
                </div>
                
              </div>

              <div className="td-drawer-actions">
                <button className="ws-btn-primary w-full" onClick={(e) => handleSectionClick(e, 'generator')}>
                  <Edit size={16} /> Open Editor
                </button>
                <button className="ws-btn-secondary w-full" onClick={(e) => handleSectionClick(e, 'hoodie-mockup')}>
                  Create Mockup
                </button>
                <button className="ws-btn-secondary w-full" onClick={(e) => handleSectionClick(e, 'female-models')}>
                  Apply to Avatar
                </button>
                <div className="td-drawer-actions-row">
                  <button className="ws-btn-secondary w-full">
                    <Share2 size={16} /> Share
                  </button>
                  <button className="ws-btn-secondary w-full">
                    <Sparkles size={16} /> Regenerate
                  </button>
                </div>
              </div>
              
              {/* 🔗 Related Designs */}
              <div className="td-related-designs">
                <h4>Related Designs</h4>
                <div className="td-related-grid">
                  {mockDesigns.slice(0, 4).map(rel => (
                    <div key={rel.id} className="td-related-card">
                      <img src={rel.image} alt={rel.title} />
                      <span>{rel.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </section>
  );
}

export default TotalDesignsSection;
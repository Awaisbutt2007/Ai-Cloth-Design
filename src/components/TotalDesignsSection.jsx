import React, { useState } from 'react';
import {
  Plus, UploadCloud, Download, Search, Filter, Grid, List,
  Eye, Edit, Copy, Share2, Trash2, Heart, DownloadCloud, X,
  TrendingUp, ChevronLeft, ChevronRight, CheckSquare, Square, Palette, Zap, Star
} from 'lucide-react';

const mockDesigns = Array.from({ length: 12 }).map((_, i) => ({
  id: `d${i + 1}`,
  title: ['Luxury Hoodie', 'Streetwear Jacket', 'Vintage Dress', 'Minimalist Tee', 'Cyberpunk Coat'][i % 5],
  category: ['Streetwear', 'Formal', 'Vintage', 'Casual', 'Luxury'][i % 5],
  style: ['Casual', 'Luxury', 'Vintage', 'Streetwear', 'Minimal'][i % 5],
  created: '8 Jul 2026',
  status: ['Published', 'Draft', 'Archived'][i % 3],
  favorite: i % 4 === 0,
  image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
  prompt: 'Red oversized hoodie with anime print and futuristic details.',
  fabric: 'Cotton Blend',
  season: 'Winter',
  colors: ['Black', 'Red', 'White'],
  resolution: '2048×2048'
}));

function TotalDesignsSection({ activeSection }) {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDesigns, setSelectedDesigns] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);
  
  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [styleFilter, setStyleFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest');

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
    <section id="total-designs" className={`section total-designs-section ${activeSection === 'total-designs' ? 'active' : 'hidden'}`}>
      
      {/* 1. Page Header */}
      <div className="td-header">
        <div className="td-header-left">
          <h2>Total Designs</h2>
          <p>View and manage all your AI-generated fashion designs.</p>
        </div>
        <div className="td-header-actions">
          <button className="ws-btn-secondary"><UploadCloud size={16} /> Import Design</button>
          <button className="ws-btn-secondary"><Download size={16} /> Export</button>
          <button className="ws-btn-primary"><Plus size={16} /> New Design</button>
        </div>
      </div>

      {/* 2. Statistics Cards */}
      <div className="td-stats-row">
        <div className="td-stat-card">
          <div className="td-stat-title">Total Designs</div>
          <div className="td-stat-value">248</div>
        </div>
        <div className="td-stat-card">
          <div className="td-stat-title">Favorites</div>
          <div className="td-stat-value text-warning">38</div>
        </div>
        <div className="td-stat-card">
          <div className="td-stat-title">Downloads</div>
          <div className="td-stat-value text-info">154</div>
        </div>
        <div className="td-stat-card">
          <div className="td-stat-title">Draft Designs</div>
          <div className="td-stat-value text-orange">21</div>
        </div>
      </div>

      <div className="td-main-layout">
        <div className="td-content-area">
          
          {/* 3 & 4. Search, Filters, View Toggle */}
          <div className="td-toolbar">
            <div className="td-search-box">
              <Search size={16} className="td-search-icon" />
              <input 
                type="text" 
                placeholder="Search Designs..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="td-filters">
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="All">Category ▼</option>
                <option value="T-Shirts">T-Shirts</option>
                <option value="Jackets">Jackets</option>
                <option value="Dresses">Dresses</option>
                <option value="Shoes">Shoes</option>
              </select>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="All">Status ▼</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
              <select value={styleFilter} onChange={(e) => setStyleFilter(e.target.value)}>
                <option value="All">Style ▼</option>
                <option value="Casual">Casual</option>
                <option value="Luxury">Luxury</option>
                <option value="Streetwear">Streetwear</option>
              </select>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="Newest">Sort By: Newest</option>
                <option value="Oldest">Oldest</option>
                <option value="Most Downloaded">Most Downloaded</option>
                <option value="A-Z">A–Z</option>
              </select>
            </div>
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
          </div>

          {/* 5. Design Gallery */}
          {mockDesigns.length === 0 ? (
            /* 10. Empty State */
            <div className="td-empty-state">
              <div className="td-empty-icon">🎨</div>
              <h3>No Designs Yet</h3>
              <p>Create your first AI Fashion Design</p>
              <button className="ws-btn-primary">Generate Design</button>
            </div>
          ) : (
            <div className={`td-gallery ${viewMode === 'grid' ? 'td-grid-view' : 'td-list-view'}`}>
              {mockDesigns.map(design => (
                <div key={design.id} className="td-design-card" onClick={() => openDrawer(design)}>
                  <div className="td-card-checkbox" onClick={(e) => { e.stopPropagation(); toggleSelection(design.id); }}>
                    {selectedDesigns.includes(design.id) ? <CheckSquare size={20} className="text-primary" /> : <Square size={20} className="text-muted" />}
                  </div>
                  <div className="td-image-wrapper">
                    <img src={design.image} alt={design.title} />
                    <div className="td-status-badge">{design.status}</div>
                    {design.favorite && <div className="td-favorite-badge"><Heart size={14} fill="currentColor" /></div>}
                    
                    {/* 6. Card Actions on Hover */}
                    <div className="td-card-actions">
                      <button title="View" onClick={(e) => { e.stopPropagation(); openDrawer(design); }}><Eye size={16} /></button>
                      <button title="Edit" onClick={(e) => e.stopPropagation()}><Edit size={16} /></button>
                      <button title="Duplicate" onClick={(e) => e.stopPropagation()}><Copy size={16} /></button>
                      <button title="Download" onClick={(e) => e.stopPropagation()}><DownloadCloud size={16} /></button>
                      <button title="Share" onClick={(e) => e.stopPropagation()}><Share2 size={16} /></button>
                      <button title="Delete" className="text-danger" onClick={(e) => e.stopPropagation()}><Trash2 size={16} /></button>
                    </div>
                  </div>
                  <div className="td-card-info">
                    <div className="td-card-header-row">
                      <h4>{design.title}</h4>
                      <div className="td-stars">★★★★★</div>
                    </div>
                    <div className="td-card-meta">
                      <span>{design.category}</span>
                      <span>•</span>
                      <span>Created {design.created}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 9. Pagination */}
          <div className="td-pagination">
            <button className="td-page-btn" disabled><ChevronLeft size={16} /> Previous</button>
            <div className="td-page-numbers">
              <button className="td-page-num active">1</button>
              <button className="td-page-num">2</button>
              <button className="td-page-num">3</button>
              <button className="td-page-num">4</button>
            </div>
            <button className="td-page-btn">Next <ChevronRight size={16} /></button>
          </div>

        </div>

        {/* 11. Right Side Analytics */}
        <div className="td-analytics-sidebar">
          <h3>Quick Insights</h3>
          <div className="td-mini-card">
            <div className="td-mc-icon"><Palette size={18} className="text-primary" /></div>
            <div className="td-mc-info">
              <label>Most Used Style</label>
              <p>Streetwear</p>
            </div>
          </div>
          <div className="td-mini-card">
            <div className="td-mc-icon"><Heart size={18} className="text-danger" /></div>
            <div className="td-mc-info">
              <label>Favorite Color</label>
              <p>Black</p>
            </div>
          </div>
          <div className="td-mini-card">
            <div className="td-mc-icon"><Star size={18} className="text-warning" /></div>
            <div className="td-mc-info">
              <label>Best Performing</label>
              <p>Luxury Jacket</p>
            </div>
          </div>
          <div className="td-mini-card">
            <div className="td-mc-icon"><Zap size={18} className="text-info" /></div>
            <div className="td-mc-info">
              <label>AI Credits Used</label>
              <p>845</p>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Floating Bulk Actions */}
      {selectedDesigns.length > 0 && (
        <div className="td-bulk-actions">
          <div className="td-bulk-info">
            <button className="td-clear-btn" onClick={() => setSelectedDesigns([])}><X size={16} /></button>
            <span>{selectedDesigns.length} selected</span>
          </div>
          <div className="td-bulk-buttons">
            <button className="ws-btn-secondary"><Heart size={16} /> Favorite</button>
            <button className="ws-btn-secondary"><DownloadCloud size={16} /> Download</button>
            <button className="ws-btn-secondary">Move</button>
            <button className="ws-btn-secondary">Archive</button>
            <button className="ws-btn-danger"><Trash2 size={16} /> Delete</button>
          </div>
        </div>
      )}

      {/* 7. Design Details Drawer */}
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
                  <label>Prompt</label>
                  <p className="td-prompt-text">{selectedDesign.prompt}</p>
                </div>
                
                <div className="td-drawer-grid">
                  <div className="td-info-item">
                    <label>Style</label>
                    <p>{selectedDesign.style}</p>
                  </div>
                  <div className="td-info-item">
                    <label>Fabric</label>
                    <p>{selectedDesign.fabric}</p>
                  </div>
                  <div className="td-info-item">
                    <label>Season</label>
                    <p>{selectedDesign.season}</p>
                  </div>
                  <div className="td-info-item">
                    <label>Resolution</label>
                    <p>{selectedDesign.resolution}</p>
                  </div>
                </div>

                <div className="td-drawer-section">
                  <label>Colors</label>
                  <div className="td-color-tags">
                    {selectedDesign.colors.map(color => (
                      <span key={color} className="td-color-tag">
                        <span className="td-color-dot" style={{ backgroundColor: color }}></span> {color}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="td-drawer-actions">
                <button className="ws-btn-primary w-full"><Edit size={16} /> Edit Design</button>
                <button className="ws-btn-secondary w-full"><Sparkles size={16} /> Regenerate</button>
                <div className="td-drawer-actions-row">
                  <button className="ws-btn-secondary w-full"><DownloadCloud size={16} /> Download</button>
                  <button className="ws-btn-secondary w-full"><Share2 size={16} /> Share</button>
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

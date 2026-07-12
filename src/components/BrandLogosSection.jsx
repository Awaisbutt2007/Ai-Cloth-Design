
import React, { useState } from 'react';
import {
  Plus,
  Upload,
  Search,
  ChevronDown,
  Eye,
  Edit,
  Star,
  Download,
  Trash2,
  Image as ImageIcon,
  Palette,
  Layout,
  X,
  FileImage,
  Check
} from 'lucide-react';

function BrandLogosSection({ activeSection }) {
  const [selectedLogos, setSelectedLogos] = useState([]);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmptyState, setShowEmptyState] = useState(false);

  const sectionId = 'assets-brand-logos';
  const activeId = 'brand-logos';

  if (activeSection !== activeId) return null;

  const sampleLogos = [
    {
      id: 1,
      name: 'Nike Logo',
      brand: 'Urban Wear',
      format: 'SVG',
      size: '240 KB',
      dimensions: '1024 × 1024',
      uploaded: '10 Jul 2026',
      updated: 'Yesterday',
      isPrimary: true,
      isFavorite: true,
      status: 'Active',
      usedIn: 48,
      lastUsed: 'Today'
    },
    {
      id: 2,
      name: 'White Logo',
      brand: 'Urban Wear',
      format: 'PNG',
      size: '180 KB',
      dimensions: '512 × 512',
      uploaded: '08 Jul 2026',
      updated: '2 Days Ago',
      isPrimary: false,
      isFavorite: true,
      status: 'Active',
      usedIn: 22,
      lastUsed: 'Yesterday'
    },
    {
      id: 3,
      name: 'Icon Logo',
      brand: 'Urban Wear',
      format: 'SVG',
      size: '85 KB',
      dimensions: '256 × 256',
      uploaded: '05 Jul 2026',
      updated: '1 Week Ago',
      isPrimary: false,
      isFavorite: false,
      status: 'Active',
      usedIn: 16,
      lastUsed: '2 Days Ago'
    },
    {
      id: 4,
      name: 'Dark Theme Logo',
      brand: 'Urban Wear',
      format: 'SVG',
      size: '220 KB',
      dimensions: '1024 × 1024',
      uploaded: '01 Jul 2026',
      updated: '1 Week Ago',
      isPrimary: false,
      isFavorite: true,
      status: 'Active',
      usedIn: 12,
      lastUsed: '3 Days Ago'
    },
    {
      id: 5,
      name: 'Print Logo',
      brand: 'Urban Wear',
      format: 'PDF',
      size: '1.2 MB',
      dimensions: '300 DPI',
      uploaded: '28 Jun 2026',
      updated: '2 Weeks Ago',
      isPrimary: false,
      isFavorite: false,
      status: 'Active',
      usedIn: 8,
      lastUsed: '1 Week Ago'
    },
    {
      id: 6,
      name: 'Old Logo',
      brand: 'Urban Wear',
      format: 'PNG',
      size: '320 KB',
      dimensions: '2048 × 2048',
      uploaded: '15 Jun 2026',
      updated: '1 Month Ago',
      isPrimary: false,
      isFavorite: false,
      status: 'Archived',
      usedIn: 0,
      lastUsed: '1 Month Ago'
    }
  ];

  const toggleLogoSelection = (id) => {
    setSelectedLogos(prev =>
      prev.includes(id)
        ? prev.filter(l => l !== id)
        : [...prev, id]
    );
  };

  const openPreview = (logo) => {
    setPreviewLogo(logo);
  };

  const closePreview = () => {
    setPreviewLogo(null);
  };

  return (
    <section id={sectionId} className={`section brand-logos-section ${activeSection === activeId ? 'active' : 'hidden'}`}>
      <div className="sub-content">

        {/* 1️⃣ Header */}
        <div className="brand-logos-header">
          <div className="brand-logos-header-text">
            <h2>Brand Logos</h2>
            <p>Manage your brand logos and identity assets.</p>
          </div>
          <div className="brand-logos-header-actions">
            <button className="btn-primary">
              <Upload size={18} />
              Upload Logo
            </button>
            <button className="btn-secondary">
              <Plus size={18} />
              Create Brand
            </button>
          </div>
        </div>

        {/* 2️⃣ Brand Summary */}
        <div className="brand-summary-grid">
          <div className="brand-summary-card">
            <span className="brand-summary-label">Total Logos</span>
            <strong className="brand-summary-value">{showEmptyState ? 0 : 24}</strong>
          </div>
          <div className="brand-summary-card">
            <span className="brand-summary-label">Primary Logo</span>
            <strong className="brand-summary-value">{showEmptyState ? 0 : 1}</strong>
          </div>
          <div className="brand-summary-card">
            <span className="brand-summary-label">Active Brands</span>
            <strong className="brand-summary-value">{showEmptyState ? 0 : 5}</strong>
          </div>
          <div className="brand-summary-card">
            <span className="brand-summary-label">Used in Designs</span>
            <strong className="brand-summary-value">{showEmptyState ? 0 : 186}</strong>
          </div>
        </div>

        {/* 3️⃣ Upload Logo */}
        <div className="upload-area-card">
          <div className="upload-dropzone">
            <div className="upload-icon-wrapper">
              <FileImage size={48} />
            </div>
            <h3>Drag & Drop your logo here</h3>
            <p>or</p>
            <button className="btn-secondary upload-browse-btn">
              Browse Files
            </button>
            <div className="upload-formats">
              <span>SVG</span>
              <span>PNG</span>
              <span>JPG</span>
              <span>PDF</span>
            </div>
            <p className="upload-note">Recommended: Transparent PNG or SVG</p>
          </div>
        </div>

        {/* 4️⃣ Search & Filters */}
        <div className="search-filters-card">
          <div className="search-filters-toolbar">
            <div className="search-filters-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search Logo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="search-filters-selectors">
              <div className="filter-selector">
                <span>Brand</span>
                <ChevronDown size={16} />
              </div>
              <div className="filter-selector">
                <span>Status</span>
                <ChevronDown size={16} />
              </div>
              <div className="filter-selector">
                <span>Format</span>
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
        {selectedLogos.length > 0 && (
          <div className="bulk-actions-card">
            <div className="bulk-actions-info">
              <strong>{selectedLogos.length} logos selected</strong>
              <button
                onClick={() => setSelectedLogos([])}
                className="bulk-actions-clear"
              >
                Clear
              </button>
            </div>
            <div className="bulk-actions-buttons">
              <button className="btn-secondary bulk-btn">
                <Download size={16} />
                Download
              </button>
              <button className="btn-secondary bulk-btn">
                <Trash2 size={16} />
                Delete
              </button>
              <button className="btn-secondary bulk-btn">
                Archive
              </button>
              <button className="btn-secondary bulk-btn">
                Set Active
              </button>
            </div>
          </div>
        )}

        {/* Layout: Main Content + Sidebar */}
        <div className="brand-logos-layout">

          {/* Left Column: Logo Gallery */}
          <div className="brand-logos-main">
            {/* Empty State or Logo Gallery */}
            {showEmptyState ? (
              <div className="empty-state-card">
                <div className="empty-state-icon-wrapper">
                  <Palette size={64} />
                </div>
                <h3>No Brand Logos</h3>
                <p>Upload your first brand logo.</p>
                <button className="btn-primary">
                  <Upload size={18} />
                  Upload Logo
                </button>
              </div>
            ) : (
              <div className="logo-gallery">
                {sampleLogos.map((logo) => (
                  <div
                    key={logo.id}
                    className={`logo-card ${selectedLogos.includes(logo.id) ? 'selected' : ''}`}
                    onClick={() => openPreview(logo)}
                  >
                    <div className="logo-check">
                      <input
                        type="checkbox"
                        checked={selectedLogos.includes(logo.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleLogoSelection(logo.id);
                        }}
                      />
                    </div>
                    <div className="logo-preview-wrapper">
                      <div className="logo-preview" style={{
                        background: 'linear-gradient(135deg, #f5f5f5, #e8e8e8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#888'
                      }}>
                        <ImageIcon size={48} />
                      </div>
                      {logo.isPrimary && (
                        <div className="logo-badge primary">
                          Primary
                        </div>
                      )}
                      {logo.isFavorite && (
                        <div className="logo-badge favorite">
                          <Star size={12} fill="currentColor" />
                        </div>
                      )}
                    </div>
                    <div className="logo-info">
                      <div className="logo-name">{logo.name}</div>
                      <div className="logo-meta">
                        <span className="logo-format">{logo.format}</span>
                        <span className="logo-brand">{logo.brand}</span>
                        <span className="logo-updated">{logo.updated}</span>
                      </div>
                    </div>
                    <div className="logo-hover-actions">
                      <button className="logo-action-btn" title="Preview">
                        <Eye size={16} />
                      </button>
                      <button className="logo-action-btn" title="Edit Name">
                        <Edit size={16} />
                      </button>
                      <button className="logo-action-btn" title="Set as Primary">
                        <Check size={16} />
                      </button>
                      <button className="logo-action-btn" title="Download">
                        <Download size={16} />
                      </button>
                      <button className="logo-action-btn" title="Use in Design">
                        <Layout size={16} />
                      </button>
                      <button className="logo-action-btn danger" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <div className="brand-logos-sidebar">

            {/* 7️⃣ Brand Settings */}
            <div className="sidebar-section-card">
              <h3 className="sidebar-section-title">
                <Palette size={18} />
                Brand Settings
              </h3>
              <div className="brand-settings-form">
                <div className="form-group">
                  <label>Brand Name</label>
                  <input type="text" defaultValue="Urban Wear" />
                </div>
                <div className="form-group">
                  <label>Brand Slogan</label>
                  <input type="text" defaultValue="Style that speaks" />
                </div>
                <div className="form-group">
                  <label>Website</label>
                  <input type="url" defaultValue="https://urbanwear.com" />
                </div>
                <div className="form-group">
                  <label>Primary Color</label>
                  <div className="color-input-wrapper">
                    <input type="color" defaultValue="#7f58ff" />
                    <span>#7f58ff</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Secondary Color</label>
                  <div className="color-input-wrapper">
                    <input type="color" defaultValue="#ff6f73" />
                    <span>#ff6f73</span>
                  </div>
                </div>
                <button className="btn-primary">
                  Save Changes
                </button>
              </div>
            </div>

            {/* 8️⃣ Logo Usage */}
            <div className="sidebar-section-card">
              <h3 className="sidebar-section-title">
                <Layout size={18} />
                Logo Usage
              </h3>
              <div className="logo-usage-table">
                <table>
                  <thead>
                    <tr>
                      <th>Logo</th>
                      <th>Used In</th>
                      <th>Last Used</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleLogos.slice(0, 4).map((logo) => (
                      <tr key={logo.id}>
                        <td className="usage-logo-name">{logo.name}</td>
                        <td>{logo.usedIn} Designs</td>
                        <td>{logo.lastUsed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

        {/* 6️⃣ Logo Details Drawer */}
        {previewLogo && (
          <div className="logo-preview-overlay" onClick={closePreview}>
            <div className="logo-preview-drawer" onClick={(e) => e.stopPropagation()}>
              <button className="drawer-close-btn" onClick={closePreview}>
                <X size={20} />
              </button>
              <div className="drawer-content">
                <div className="drawer-logo-preview-wrapper">
                  <div className="drawer-logo-preview" style={{
                    background: 'linear-gradient(135deg, #f5f5f5, #e8e8e8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#888'
                  }}>
                    <ImageIcon size={96} />
                  </div>
                </div>
                <div className="drawer-section">
                  <h3>Brand Name</h3>
                  <p className="drawer-text">{previewLogo.brand}</p>
                </div>
                <div className="drawer-section">
                  <h3>File Name</h3>
                  <p className="drawer-text">{previewLogo.name.toLowerCase().replace(/ /g, '-')}.{previewLogo.format.toLowerCase()}</p>
                </div>
                <div className="drawer-section">
                  <h3>Format</h3>
                  <p className="drawer-text">{previewLogo.format}</p>
                </div>
                <div className="drawer-section">
                  <h3>File Size</h3>
                  <p className="drawer-text">{previewLogo.size}</p>
                </div>
                <div className="drawer-section">
                  <h3>Dimensions</h3>
                  <p className="drawer-text">{previewLogo.dimensions}</p>
                </div>
                <div className="drawer-section">
                  <h3>Uploaded</h3>
                  <p className="drawer-text">{previewLogo.uploaded}</p>
                </div>
                <div className="drawer-section">
                  <h3>Primary</h3>
                  <p className="drawer-text">{previewLogo.isPrimary ? 'Yes' : 'No'}</p>
                </div>
                <div className="drawer-buttons">
                  <button className="btn-secondary drawer-btn">
                    Replace Logo
                  </button>
                  <button className="btn-secondary drawer-btn">
                    <Download size={16} />
                    Download
                  </button>
                  <button className="btn-secondary drawer-btn">
                    Copy
                  </button>
                  <button className="btn-danger drawer-btn">
                    <Trash2 size={16} />
                    Delete
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

export default BrandLogosSection;


import React, { useState, useRef, useEffect } from 'react';
import {
  Globe,
  Plus,
  Search,
  Download,
  Eye,
  Edit3,
  Copy,
  Share2,
  Image as ImageIcon,
  Sparkles,
  Trash2,
  ExternalLink,
  ChevronDown,
  Filter,
  Clock,
  TrendingUp,
  Tag,
  FileText,
  Archive,
  Calendar,
  BarChart3,
  RefreshCw,
  X,
  MoreHorizontal,
  Zap,
  Layers,
  QrCode,
  Link,
  CheckCircle,
  AlertCircle,
  Package,
  DollarSign,
  MousePointerClick,
} from 'lucide-react';
import {
  publishedStats,
  platformOverview,
  publishedDesigns,
  publishHistory,
  syncStatus,
  repairImageUrl,
  DEFAULT_POST_PLACEHOLDER,
} from '../constants';

const PRODUCT_OPTIONS = ['All', 'T-Shirt', 'Hoodie', 'Jacket', 'Dress', 'Shoes', 'Cap'];
const PLATFORM_OPTIONS = ['All', 'Website', 'Shopify', 'WooCommerce', 'Etsy', 'Amazon', 'Social Media'];
const STATUS_OPTIONS = ['All', 'Live', 'Scheduled', 'Paused', 'Archived'];
const SORT_OPTIONS = ['Latest', 'Oldest', 'Most Viewed', 'Most Shared'];
const SEARCH_BY_OPTIONS = ['Design Name', 'Product', 'Platform', 'Tags'];

function PublishedDesignsSection({ activeSection }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('Design Name');
  const [selectedProduct, setSelectedProduct] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [designs, setDesigns] = useState(publishedDesigns);

  const handleDesignClick = (design) => {
    setSelectedDesign(design);
    setShowDetails(true);
  };

  const handleArchive = (id) => {
    setDesigns(designs.map(d => d.id === id ? { ...d, status: 'Archived' } : d));
  };

  const handleRepublish = (id) => {
    setDesigns(designs.map(d => d.id === id ? { ...d, status: 'Live' } : d));
  };

  const filteredDesigns = designs.filter(design => {
    const matchesProduct = selectedProduct === 'All' || design.productType === selectedProduct;
    const matchesPlatform = selectedPlatform === 'All' || design.platform === selectedPlatform;
    const matchesStatus = selectedStatus === 'All' || design.status === selectedStatus;
    const matchesSearch = searchQuery === '' || 
      design.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.productType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.platform.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProduct && matchesPlatform && matchesStatus && matchesSearch;
  });

  if (activeSection !== 'published') return null;

  return (
    <section id="published" className="published-section">
      {/* Header */}
      <div className="published-header">
        <div className="published-header-content">
          <div className="published-title">
            <Globe className="published-icon" size={28} />
            <div>
              <h1>Published Designs</h1>
              <p>Manage and track all your published fashion designs.</p>
            </div>
          </div>
          <div className="published-header-actions">
            <button type="button" className="published-btn primary">
              <Plus size={18} />
              Publish New Design
            </button>
            <button type="button" className="published-btn secondary">
              <Globe size={18} />
              Manage Platforms
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="published-stats">
        <div className="stat-card">
          <div className="stat-icon globe">
            <Globe size={24} fill="currentColor" />
          </div>
          <div className="stat-content">
            <span className="stat-value">{publishedStats.totalPublished}</span>
            <span className="stat-label">Published Designs</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active">
            <CheckCircle size={24} fill="currentColor" />
          </div>
          <div className="stat-content">
            <span className="stat-value">{publishedStats.active}</span>
            <span className="stat-label">Active</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon draft">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{publishedStats.draftPublications}</span>
            <span className="stat-label">Draft Publications</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon archived">
            <Archive size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{publishedStats.archived}</span>
            <span className="stat-label">Archived</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="published-search">
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search Published Designs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button type="button" className="clear-search" onClick={() => setSearchQuery('')}>
              <X size={18} />
            </button>
          )}
        </div>
        <div className="search-by">
          <label>Search By</label>
          <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
            {SEARCH_BY_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Filters */}
      <div className="published-filters">
        <div className="filter-group">
          <label>Product</label>
          <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
            {PRODUCT_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Platform</label>
          <select value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)}>
            {PLATFORM_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Status</label>
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            {STATUS_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Sort</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            {SORT_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Platform Overview */}
      <div className="platform-overview">
        <h3>Platform Overview</h3>
        <div className="platform-grid">
          {platformOverview.map(platform => (
            <div key={platform.id} className="platform-card">
              <div className="platform-icon">{platform.icon}</div>
              <div className="platform-info">
                <span className="platform-name">{platform.name}</span>
                <span className="platform-count">{platform.designs} Designs</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {showEmptyState && (
        <div className="published-empty-state">
          <Globe size={64} className="empty-icon" />
          <h2>No Published Designs</h2>
          <p>Publish your first design to make it available online.</p>
          <button type="button" className="publish-btn">
            <Plus size={18} />
            Publish Design
          </button>
        </div>
      )}

      {/* Designs Grid */}
      {!showEmptyState && (
        <div className="published-designs-grid">
          {filteredDesigns.map(design => (
            <PublishedDesignCard
              key={design.id}
              design={design}
              onDesignClick={handleDesignClick}
              onArchive={handleArchive}
              onRepublish={handleRepublish}
            />
          ))}
        </div>
      )}

      {/* Design Details Modal */}
      {showDetails && selectedDesign && (
        <PublishDetailsModal
          design={selectedDesign}
          onClose={() => setShowDetails(false)}
        />
      )}

      {/* Quick Actions */}
      <div className="published-quick-actions">
        <h3>Quick Actions</h3>
        <div className="quick-actions-grid">
          <button type="button" className="quick-action-btn">
            <RefreshCw size={20} />
            Publish Again
          </button>
          <button type="button" className="quick-action-btn">
            <Share2 size={20} />
            Share
          </button>
          <button type="button" className="quick-action-btn">
            <ImageIcon size={20} />
            Create Mockup
          </button>
          <button type="button" className="quick-action-btn">
            <Sparkles size={20} />
            Generate Variations
          </button>
          <button type="button" className="quick-action-btn">
            <Download size={20} />
            Download
          </button>
          <button type="button" className="quick-action-btn">
            <FileText size={20} />
            Export
          </button>
        </div>
      </div>

      {/* Publish History */}
      <div className="publish-history">
        <h3>Publish History</h3>
        <div className="history-timeline">
          {publishHistory.map((item, index) => (
            <div key={index} className="history-item">
              <div className="history-dot"></div>
              <div className="history-content">
                <span className="history-action">{item.action}</span>
                <span className="history-date">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sync Status */}
      <div className="sync-status">
        <h3>Sync Status</h3>
        <div className="sync-grid">
          {syncStatus.map((item, index) => (
            <div key={index} className="sync-item">
              <div className="sync-platform">{item.platform}</div>
              <div className="sync-status-indicator">
                {item.status === 'Synced' ? (
                  <CheckCircle size={16} className="sync-icon synced" />
                ) : (
                  <AlertCircle size={16} className="sync-icon warning" />
                )}
                <span className={`sync-text ${item.status === 'Synced' ? 'synced' : 'warning'}`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        <button type="button" className="sync-now-btn">
          <RefreshCw size={16} />
          Sync Now
        </button>
      </div>

      {/* Premium Features */}
      <div className="published-premium-features">
        <h3>🌟 Premium Features</h3>
        <div className="premium-features-grid">
          <div className="premium-feature">
            <div className="premium-icon">📅</div>
            <h4>Schedule Publishing</h4>
            <p>Publish Today, Tomorrow, or Custom Date & Time</p>
            <div className="schedule-options">
              <span className="schedule-option">Today</span>
              <span className="schedule-option">Tomorrow</span>
              <span className="schedule-option">Custom</span>
            </div>
          </div>
          <div className="premium-feature">
            <div className="premium-icon">🌍</div>
            <h4>Multi-Platform Publishing</h4>
            <p>Ek click mein publish to multiple platforms</p>
            <div className="platform-tags">
              <span className="platform-tag">Website</span>
              <span className="platform-tag">Shopify</span>
              <span className="platform-tag">Etsy</span>
              <span className="platform-tag">Instagram</span>
            </div>
          </div>
          <div className="premium-feature">
            <div className="premium-icon">📈</div>
            <h4>Performance Insights</h4>
            <p>Top Published Design: Luxury Hoodie</p>
            <div className="performance-stats">
              <div className="perf-stat">
                <Eye size={14} />
                <span>8,240</span>
              </div>
              <div className="perf-stat">
                <Download size={14} />
                <span>620</span>
              </div>
              <div className="perf-stat">
                <Package size={14} />
                <span>84</span>
              </div>
            </div>
          </div>
          <div className="premium-feature">
            <div className="premium-icon">🔗</div>
            <h4>Share Links</h4>
            <p>Generate Public Link, QR Code, Short URL</p>
            <div className="share-link-actions">
              <button type="button" className="share-link-btn">
                <Link size={14} />
                Public Link
              </button>
              <button type="button" className="share-link-btn">
                <QrCode size={14} />
                QR Code
              </button>
            </div>
          </div>
          <div className="premium-feature">
            <div className="premium-icon">🏷</div>
            <h4>SEO Information</h4>
            <p>Title, Meta Description, URL Slug, Keywords</p>
            <div className="seo-fields">
              <span className="seo-field">Title</span>
              <span className="seo-field">Meta Description</span>
              <span className="seo-field">URL Slug</span>
            </div>
          </div>
          <div className="premium-feature">
            <div className="premium-icon">📦</div>
            <h4>Export Catalog</h4>
            <p>Generate PDF Catalog, Product Catalog, Lookbook</p>
            <div className="export-actions">
              <button type="button" className="export-btn">
                <FileText size={14} />
                PDF Catalog
              </button>
              <button type="button" className="export-btn">
                <Package size={14} />
                Product Catalog
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PublishedDesignCard({ design, onDesignClick, onArchive, onRepublish }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Live': return 'live';
      case 'Scheduled': return 'scheduled';
      case 'Paused': return 'paused';
      case 'Archived': return 'archived';
      default: return '';
    }
  };

  return (
    <div className="published-design-card">
      <div className="card-preview" onClick={() => onDesignClick(design)}>
        <img src={repairImageUrl(design.image)} alt={design.name} onError={(e) => { e.currentTarget.src = DEFAULT_POST_PLACEHOLDER; }} />
        <div className="card-overlay">
          <button type="button" className="overlay-btn" title="View">
            <Eye size={16} />
          </button>
          <button type="button" className="overlay-btn" title="Edit">
            <Edit3 size={16} />
          </button>
          <button type="button" className="overlay-btn" title="Duplicate">
            <Copy size={16} />
          </button>
        </div>
        <div className={`status-badge ${getStatusColor(design.status)}`}>
          {design.status}
        </div>
      </div>
      <div className="card-body">
        <h4>{design.name}</h4>
        <div className="card-meta">
          <span className="card-product">{design.productType}</span>
          <span className="card-date">{design.publishedDate}</span>
        </div>
        <div className="card-platform">
          <span className="platform-label">{design.platform}</span>
        </div>
        <div className="card-stats">
          <span className="card-stat">
            <Eye size={12} />
            {design.views.toLocaleString()}
          </span>
          <span className="card-stat">
            <Download size={12} />
            {design.downloads}
          </span>
          <span className="card-stat">
            <Share2 size={12} />
            {design.shares}
          </span>
        </div>
        <div className="card-actions">
          <button type="button" className="card-action-btn" title="View">
            <Eye size={14} />
          </button>
          <button type="button" className="card-action-btn" title="Edit">
            <Edit3 size={14} />
          </button>
          <button type="button" className="card-action-btn" title="Duplicate">
            <Copy size={14} />
          </button>
          <button type="button" className="card-action-btn" title="Republish" onClick={() => onRepublish(design.id)}>
            <RefreshCw size={14} />
          </button>
          <button type="button" className="card-action-btn" title="Share">
            <Share2 size={14} />
          </button>
          <button type="button" className="card-action-btn" title="Archive" onClick={() => onArchive(design.id)}>
            <Archive size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function PublishDetailsModal({ design, onClose }) {
  return (
    <div className="publish-details-overlay" onClick={onClose}>
      <div className="publish-details-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        <div className="modal-content">
          <div className="modal-image">
            <img src={repairImageUrl(design.image)} alt={design.name} onError={(e) => { e.currentTarget.src = DEFAULT_POST_PLACEHOLDER; }} />
          </div>
          <div className="modal-info">
            <h2>{design.name}</h2>
            <div className="modal-details">
              <div className="detail-row">
                <label>Platform</label>
                <span>{design.platform}</span>
              </div>
              <div className="detail-row">
                <label>Published On</label>
                <span>{design.publishedDate}</span>
              </div>
              <div className="detail-row">
                <label>Published By</label>
                <span>{design.publishedBy}</span>
              </div>
              <div className="detail-row">
                <label>Visibility</label>
                <span>{design.visibility}</span>
              </div>
              <div className="detail-row">
                <label>Last Updated</label>
                <span>{design.lastUpdated}</span>
              </div>
              <div className="detail-row">
                <label>Product Link</label>
                <span className="product-link">{design.productLink || 'Not set'}</span>
              </div>
            </div>
            <div className="modal-actions">
              <button type="button" className="modal-action-btn primary">
                <ExternalLink size={18} />
                Open Design
              </button>
              <button type="button" className="modal-action-btn">
                <Edit3 size={18} />
                Update
              </button>
              <button type="button" className="modal-action-btn">
                <Link size={18} />
                Copy Link
              </button>
              <button type="button" className="modal-action-btn danger">
                <Archive size={18} />
                Unpublish
              </button>
            </div>
          </div>
        </div>

        {/* Performance Analytics */}
        <div className="performance-analytics">
          <h3>Performance Analytics</h3>
          <div className="analytics-grid">
            <div className="analytics-card">
              <Eye size={24} className="analytics-icon" />
              <div className="analytics-content">
                <span className="analytics-value">{design.views.toLocaleString()}</span>
                <span className="analytics-label">Views</span>
              </div>
            </div>
            <div className="analytics-card">
              <Download size={24} className="analytics-icon" />
              <div className="analytics-content">
                <span className="analytics-value">{design.downloads}</span>
                <span className="analytics-label">Downloads</span>
              </div>
            </div>
            <div className="analytics-card">
              <Share2 size={24} className="analytics-icon" />
              <div className="analytics-content">
                <span className="analytics-value">{design.shares}</span>
                <span className="analytics-label">Shares</span>
              </div>
            </div>
            <div className="analytics-card">
              <MousePointerClick size={24} className="analytics-icon" />
              <div className="analytics-content">
                <span className="analytics-value">{design.clicks}</span>
                <span className="analytics-label">Clicks</span>
              </div>
            </div>
          </div>
          {design.orders > 0 && (
            <div className="ecommerce-analytics">
              <h4>E-commerce Integration</h4>
              <div className="ecommerce-grid">
                <div className="ecommerce-card">
                  <Package size={20} className="ecommerce-icon" />
                  <div className="ecommerce-content">
                    <span className="ecommerce-value">{design.orders}</span>
                    <span className="ecommerce-label">Orders</span>
                  </div>
                </div>
                <div className="ecommerce-card">
                  <DollarSign size={20} className="ecommerce-icon" />
                  <div className="ecommerce-content">
                    <span className="ecommerce-value">${design.revenue.toLocaleString()}</span>
                    <span className="ecommerce-label">Revenue</span>
                  </div>
                </div>
                <div className="ecommerce-card">
                  <TrendingUp size={20} className="ecommerce-icon" />
                  <div className="ecommerce-content">
                    <span className="ecommerce-value">{design.conversionRate}%</span>
                    <span className="ecommerce-label">Conversion Rate</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PublishedDesignsSection;

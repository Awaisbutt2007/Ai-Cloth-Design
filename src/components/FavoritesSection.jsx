import React, { useState, useRef, useEffect } from 'react';
import {
  Heart,
  Plus,
  Search,
  Star,
  Download,
  Folder,
  Eye,
  Edit3,
  Copy,
  Share2,
  Image as ImageIcon,
  Sparkles,
  Zap,
  Trash2,
  ExternalLink,
  ChevronDown,
  Filter,
  Grid3x3,
  Clock,
  TrendingUp,
  Tag,
  FileText,
  Archive,
  Palette,
  Wand2,
  Layers,
  ArrowRight,
  X,
  MoreHorizontal,
  ChevronUp,
} from 'lucide-react';
import {
  favoriteStats,
  favoriteCollections,
  favoriteDesigns,
  recentlyAdded,
  aiRecommendations,
} from '../constants';

const CATEGORY_OPTIONS = ['All', 'T-Shirt', 'Hoodie', 'Jacket', 'Dress', 'Shoes', 'Cap'];
const COLLECTION_OPTIONS = ['All', 'Summer', 'Winter', 'Streetwear', 'Luxury', 'Sportswear'];
const SORT_OPTIONS = ['Recently Added', 'Most Used', 'Most Downloaded', 'Alphabetical'];
const SEARCH_BY_OPTIONS = ['Design Name', 'Prompt', 'Tags', 'Product Type'];

function FavoritesSection({ activeSection }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('Design Name');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCollection, setSelectedCollection] = useState('All');
  const [sortBy, setSortBy] = useState('Recently Added');
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [favorites, setFavorites] = useState(favoriteDesigns);
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [showNotes, setShowNotes] = useState({});
  const [noteText, setNoteText] = useState({});

  const handleRemoveFavorite = (id) => {
    setFavorites(favorites.filter(f => f.id !== id));
  };

  const handleToggleNote = (id) => {
    setShowNotes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSaveNote = (id) => {
    setShowNotes(prev => ({ ...prev, [id]: false }));
  };

  const handleDesignClick = (design) => {
    setSelectedDesign(design);
    setShowDetails(true);
  };

  const filteredDesigns = favorites.filter(design => {
    const matchesCategory = selectedCategory === 'All' || design.category === selectedCategory;
    const matchesCollection = selectedCollection === 'All' || design.collection === selectedCollection;
    const matchesSearch = searchQuery === '' || 
      design.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesCollection && matchesSearch;
  });

  if (activeSection !== 'favorites') return null;

  return (
    <section id="favorites" className="favorites-section">
      {/* Header */}
      <div className="favorites-header">
        <div className="favorites-header-content">
          <div className="favorites-title">
            <Heart className="favorites-icon" size={28} />
            <div>
              <h1>Favorite Designs</h1>
              <p>Access your most important and frequently used designs.</p>
            </div>
          </div>
          <div className="favorites-header-actions">
            <button type="button" className="favorites-btn primary">
              <Heart size={18} />
              View All Favorites
            </button>
            <button type="button" className="favorites-btn secondary">
              <Plus size={18} />
              Create New Design
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="favorites-stats">
        <div className="stat-card">
          <div className="stat-icon heart">
            <Heart size={24} fill="currentColor" />
          </div>
          <div className="stat-content">
            <span className="stat-value">{favoriteStats.totalFavorites}</span>
            <span className="stat-label">Total Favorites</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon star">
            <Star size={24} fill="currentColor" />
          </div>
          <div className="stat-content">
            <span className="stat-value">{favoriteStats.mostUsed}</span>
            <span className="stat-label">Most Used</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon download">
            <Download size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{favoriteStats.downloads}</span>
            <span className="stat-label">Downloads</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon folder">
            <Folder size={24} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{favoriteStats.collections}</span>
            <span className="stat-label">Collections</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="favorites-search">
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search Favorite Designs..."
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
      <div className="favorites-filters">
        <div className="filter-group">
          <label>Category</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {CATEGORY_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Collection</label>
          <select value={selectedCollection} onChange={(e) => setSelectedCollection(e.target.value)}>
            {COLLECTION_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Sort By</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            {SORT_OPTIONS.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Collections */}
      <div className="favorites-collections">
        <h3>Favorite Collections</h3>
        <div className="collections-grid">
          {favoriteCollections.map(collection => (
            <div key={collection.id} className="collection-folder">
              <div className="folder-icon">{collection.icon}</div>
              <div className="folder-info">
                <span className="folder-name">{collection.name}</span>
                <span className="folder-count">{collection.count} designs</span>
              </div>
              <ChevronDown size={16} className="folder-arrow" />
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {showEmptyState && (
        <div className="favorites-empty-state">
          <Heart size={64} className="empty-icon" />
          <h2>No Favorite Designs Yet</h2>
          <p>Click the heart icon on any design to save it here.</p>
          <button type="button" className="explore-btn">
            Explore Designs
          </button>
        </div>
      )}

      {/* Designs Grid */}
      {!showEmptyState && (
        <div className="favorites-designs-grid">
          {filteredDesigns.map(design => (
            <DesignCard
              key={design.id}
              design={design}
              onRemoveFavorite={handleRemoveFavorite}
              onDesignClick={handleDesignClick}
              showNote={showNotes[design.id]}
              onToggleNote={() => handleToggleNote(design.id)}
              noteText={noteText[design.id] || ''}
              onNoteChange={(text) => setNoteText(prev => ({ ...prev, [design.id]: text }))}
              onSaveNote={() => handleSaveNote(design.id)}
            />
          ))}
        </div>
      )}

      {/* Design Details Modal */}
      {showDetails && selectedDesign && (
        <DesignDetailsModal
          design={selectedDesign}
          onClose={() => setShowDetails(false)}
        />
      )}

      {/* Quick Actions */}
      <div className="favorites-quick-actions">
        <h3>Quick Actions</h3>
        <div className="quick-actions-grid">
          <button type="button" className="quick-action-btn">
            <ImageIcon size={20} />
            Create Mockup
          </button>
          <button type="button" className="quick-action-btn">
            <Sparkles size={20} />
            Generate Variations
          </button>
          <button type="button" className="quick-action-btn">
            <Zap size={20} />
            Upscale
          </button>
          <button type="button" className="quick-action-btn">
            <Layers size={20} />
            Remove Background
          </button>
          <button type="button" className="quick-action-btn">
            <Palette size={20} />
            Recolor Outfit
          </button>
          <button type="button" className="quick-action-btn">
            <Wand2 size={20} />
            Generate Pattern
          </button>
        </div>
      </div>

      {/* Recently Added */}
      <div className="favorites-recently-added">
        <h3>Recently Added</h3>
        <div className="recently-timeline">
          {recentlyAdded.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-design">{item.design}</span>
                <span className="timeline-date">{item.added}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="favorites-ai-recommendations">
        <div className="ai-rec-header">
          <Sparkles size={24} className="ai-icon" />
          <h3>AI Recommendations</h3>
        </div>
        <p className="ai-rec-subtitle">Based on favorite designs</p>
        <div className="ai-rec-content">
          <div className="ai-rec-suggestion">
            <span className="rec-title">Because you like Luxury Hoodies:</span>
            <div className="rec-actions">
              <button type="button" className="rec-btn">
                <ArrowRight size={16} />
                Generate Matching Jacket
              </button>
              <button type="button" className="rec-btn">
                <ArrowRight size={16} />
                Create Premium Cap
              </button>
              <button type="button" className="rec-btn">
                <ArrowRight size={16} />
                Create Winter Collection
              </button>
              <button type="button" className="rec-btn">
                <ArrowRight size={16} />
                Generate Similar Design
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Features */}
      <div className="favorites-premium-features">
        <h3>🌟 Premium Features</h3>
        <div className="premium-features-grid">
          <div className="premium-feature">
            <div className="premium-icon">⭐</div>
            <h4>Favorite Notes</h4>
            <p>Add personal notes to each favorite design</p>
            <div className="premium-example">
              <span className="example-note">Best design for Client A</span>
              <span className="example-note">Use in Winter Collection</span>
            </div>
          </div>
          <div className="premium-feature">
            <div className="premium-icon">🏷</div>
            <h4>Smart Tags</h4>
            <p>Automatically generate tags</p>
            <div className="premium-tags">
              <span className="tag">Luxury</span>
              <span className="tag">Black</span>
              <span className="tag">Winter</span>
              <span className="tag">Oversized</span>
              <span className="tag">Minimal</span>
            </div>
          </div>
          <div className="premium-feature">
            <div className="premium-icon">📈</div>
            <h4>Performance Insights</h4>
            <p>Track performance for each design</p>
            <div className="premium-stats">
              <div className="mini-stat">
                <Download size={14} />
                <span>124</span>
              </div>
              <div className="mini-stat">
                <Eye size={14} />
                <span>320</span>
              </div>
              <div className="mini-stat">
                <Share2 size={14} />
                <span>56</span>
              </div>
            </div>
          </div>
          <div className="premium-feature">
            <div className="premium-icon">🔄</div>
            <h4>Generate Similar</h4>
            <p>One click to generate similar designs</p>
            <button type="button" className="premium-action-btn">
              <Sparkles size={16} />
              Generate Similar Design
            </button>
          </div>
          <div className="premium-feature">
            <div className="premium-icon">📂</div>
            <h4>Move Between Collections</h4>
            <p>Drag & Drop to organize</p>
            <div className="drag-drop-example">
              <span className="collection-badge">Streetwear</span>
              <ChevronDown size={16} />
              <span className="collection-badge">Luxury Collection</span>
            </div>
          </div>
          <div className="premium-feature">
            <div className="premium-icon">📦</div>
            <h4>Export Favorites</h4>
            <p>Download or share your collection</p>
            <div className="export-actions">
              <button type="button" className="export-btn">
                <Download size={14} />
                Download ZIP
              </button>
              <button type="button" className="export-btn">
                <FileText size={14} />
                Export PDF Catalog
              </button>
              <button type="button" className="export-btn">
                <Share2 size={14} />
                Share Collection
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DesignCard({ design, onRemoveFavorite, onDesignClick, showNote, onToggleNote, noteText, onNoteChange, onSaveNote }) {
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

  return (
    <div className="favorite-design-card">
      <div className="card-preview" onClick={() => onDesignClick(design)}>
        <img src={design.image} alt={design.name} />
        <div className="card-overlay">
          <button type="button" className="overlay-btn" title="Preview">
            <Eye size={16} />
          </button>
          <button type="button" className="overlay-btn" title="Edit">
            <Edit3 size={16} />
          </button>
          <button type="button" className="overlay-btn" title="Duplicate">
            <Copy size={16} />
          </button>
        </div>
      </div>
      <div className="card-body">
        <div className="card-header">
          <h4>{design.name}</h4>
          <button
            type="button"
            className="favorite-btn"
            onClick={() => onRemoveFavorite(design.id)}
          >
            <Heart size={16} fill="currentColor" />
          </button>
        </div>
        <div className="card-meta">
          <span className="card-category">{design.category}</span>
          <span className="card-date">Added {design.addedToFavorites}</span>
        </div>
        <div className="card-stats">
          <span className="card-stat">
            <Download size={12} />
            {design.downloads}
          </span>
          <span className="card-stat">
            <Eye size={12} />
            {design.views}
          </span>
        </div>
        <div className="card-tags">
          {design.tags.slice(0, 3).map(tag => (
            <span key={tag} className="card-tag">{tag}</span>
          ))}
        </div>
        <div className="card-actions">
          <button type="button" className="card-action-btn" title="Download">
            <Download size={14} />
          </button>
          <button type="button" className="card-action-btn" title="Create Mockup">
            <ImageIcon size={14} />
          </button>
          <button type="button" className="card-action-btn" title="Share">
            <Share2 size={14} />
          </button>
          <div className="card-menu" ref={menuRef}>
            <button
              type="button"
              className="card-action-btn"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <MoreHorizontal size={14} />
            </button>
            {menuOpen && (
              <div className="card-dropdown">
                <button type="button" onClick={() => { onToggleNote(); setMenuOpen(false); }}>
                  <FileText size={14} /> Add Note
                </button>
                <button type="button" onClick={() => { onDesignClick(design); setMenuOpen(false); }}>
                  <ExternalLink size={14} /> View Details
                </button>
                <button type="button">
                  <Archive size={14} /> Move to Collection
                </button>
              </div>
            )}
          </div>
        </div>
        {showNote && (
          <div className="card-note-section">
            <textarea
              placeholder="Add a note..."
              value={noteText}
              onChange={(e) => onNoteChange(e.target.value)}
              className="card-note-input"
            />
            <button type="button" className="save-note-btn" onClick={onSaveNote}>
              Save Note
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function DesignDetailsModal({ design, onClose }) {
  return (
    <div className="design-details-overlay" onClick={onClose}>
      <div className="design-details-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        <div className="modal-content">
          <div className="modal-image">
            <img src={design.image} alt={design.name} />
          </div>
          <div className="modal-info">
            <h2>{design.name}</h2>
            <div className="modal-details">
              <div className="detail-row">
                <label>Prompt Used</label>
                <span>{design.prompt}</span>
              </div>
              <div className="detail-row">
                <label>Created Date</label>
                <span>{design.createdDate}</span>
              </div>
              <div className="detail-row">
                <label>Last Modified</label>
                <span>{design.lastModified}</span>
              </div>
              <div className="detail-row">
                <label>Resolution</label>
                <span>{design.resolution}</span>
              </div>
              <div className="detail-row">
                <label>Credits Used</label>
                <span>{design.creditsUsed}</span>
              </div>
              <div className="detail-row">
                <label>Tags</label>
                <div className="modal-tags">
                  {design.tags.map(tag => (
                    <span key={tag} className="modal-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button type="button" className="modal-action-btn primary">
                <Edit3 size={18} />
                Open Editor
              </button>
              <button type="button" className="modal-action-btn">
                <Sparkles size={18} />
                Apply to Avatar
              </button>
              <button type="button" className="modal-action-btn">
                <ImageIcon size={18} />
                Create Mockup
              </button>
              <button type="button" className="modal-action-btn">
                <Download size={18} />
                Export
              </button>
              <button type="button" className="modal-action-btn">
                <Share2 size={18} />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavoritesSection;

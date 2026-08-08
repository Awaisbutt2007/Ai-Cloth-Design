import React, { useState } from 'react';
import {
  Plus, UploadCloud, Search, Filter, Grid, List,
  Play, Edit, Heart, Copy, Trash2, Eye, Save,
  FileText, ArrowRight, Clock, Pin, History,
  Trash, Folder, Zap, Star
} from 'lucide-react';

const mockDrafts = [
  {
    id: 1,
    name: 'Black Hoodie',
    productType: 'Hoodie',
    lastEdited: '5 min ago',
    autoSave: '2 min ago',
    status: 'Auto Saved',
    completion: 85,
    preview: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    prompt: 'Create a bold oversized hoodie with gold details.',
    aiModel: 'Fashion AI v3',
    creditsUsed: 6,
    createdDate: 'Today',
    pinned: true
  },
  {
    id: 2,
    name: 'Summer Dress',
    productType: 'Dress',
    lastEdited: '20 min ago',
    autoSave: '25 min ago',
    status: 'Draft',
    completion: 45,
    preview: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80',
    prompt: 'Light summer dress with floral patterns.',
    aiModel: 'Fashion AI v2',
    creditsUsed: 4,
    createdDate: 'Yesterday',
    pinned: false
  },
  {
    id: 3,
    name: 'Sports Jacket',
    productType: 'Jacket',
    lastEdited: 'Yesterday',
    autoSave: '1 day ago',
    status: 'Needs Review',
    completion: 70,
    preview: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80',
    prompt: 'Sporty jacket with reflective details.',
    aiModel: 'Fashion AI v3',
    creditsUsed: 8,
    createdDate: '2 days ago',
    pinned: false
  },
];

function DraftsSection({ activeSection, handleSectionClick }) {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('Draft Name');
  const [productTypeFilter, setProductTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [lastEditedFilter, setLastEditedFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Recently Edited');
  const [selectedDrafts, setSelectedDrafts] = useState([]);
  const [selectedDraft, setSelectedDraft] = useState(null);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [autoSaveInterval, setAutoSaveInterval] = useState('5');
  const [draftRetention, setDraftRetention] = useState('forever');
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const toggleDraftSelection = (draftId) => {
    setSelectedDrafts(prev => 
      prev.includes(draftId) ? prev.filter(id => id !== draftId) : [...prev, draftId]
    );
  };

  const selectAll = () => {
    if (selectedDrafts.length === mockDrafts.length) {
      setSelectedDrafts([]);
    } else {
      setSelectedDrafts(mockDrafts.map(d => d.id));
    }
  };

  const openDraftDetails = (draft) => {
    setSelectedDraft(draft);
    setIsDetailsOpen(true);
  };

  return (
    <section id="drafts" className={`section drafts-section ${activeSection === 'drafts' ? 'active' : 'hidden'}`}>
      <div className="drafts-wrapper">
        <div className="drafts-header">
          <div className="drafts-header-left">
            <h2 className="drafts-title">Draft Designs</h2>
            <p className="drafts-subtitle">Continue working on your unfinished designs.</p>
          </div>
          <div className="drafts-header-right">
            <button className="drafts-btn-secondary" onClick={(e) => handleSectionClick(e, 'generator')}>
              <Plus size={16} /> New Design
            </button>
            <button className="drafts-btn-secondary">
              <UploadCloud size={16} /> Import Draft
            </button>
          </div>
        </div>

        <div className="drafts-statistics">
          <div className="drafts-stat-card">
            <span className="drafts-stat-label">Total Drafts</span>
            <span className="drafts-stat-value">42</span>
          </div>
          <div className="drafts-stat-card">
            <span className="drafts-stat-label">Edited Today</span>
            <span className="drafts-stat-value">8</span>
          </div>
          <div className="drafts-stat-card">
            <span className="drafts-stat-label">Auto Saved</span>
            <span className="drafts-stat-value">39</span>
          </div>
          <div className="drafts-stat-card">
            <span className="drafts-stat-label">Storage Used</span>
            <span className="drafts-stat-value">1.2 GB</span>
          </div>
        </div>

        <div className="drafts-main-grid">
          <div className="drafts-content">
            <div className="drafts-toolbar">
              <div className="drafts-search-wrapper">
                <div className="drafts-search-box">
                  <Search size={16} className="drafts-search-icon" />
                  <input
                    type="text"
                    placeholder="Search Drafts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="drafts-search-by">
                  <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
                    <option value="Draft Name">Draft Name</option>
                    <option value="Prompt">Prompt</option>
                    <option value="Tags">Tags</option>
                    <option value="Product Type">Product Type</option>
                  </select>
                </div>
              </div>
              <div className="drafts-filters">
                <div className="drafts-filter-group">
                  <span className="drafts-filter-label">Product Type</span>
                  <div className="drafts-filter-options">
                    {['All', 'T-Shirt', 'Hoodie', 'Jacket', 'Dress', 'Shoes', 'Cap'].map((type) => (
                      <button
                        key={type}
                        className={`drafts-filter-option ${productTypeFilter === type ? 'active' : ''}`}
                        onClick={() => setProductTypeFilter(type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="drafts-filter-group">
                  <span className="drafts-filter-label">Status</span>
                  <div className="drafts-filter-options">
                    {['All', 'Draft', 'Auto Saved', 'Needs Review'].map((status) => (
                      <button
                        key={status}
                        className={`drafts-filter-option ${statusFilter === status ? 'active' : ''}`}
                        onClick={() => setStatusFilter(status)}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="drafts-filter-group">
                  <span className="drafts-filter-label">Last Edited</span>
                  <div className="drafts-filter-options">
                    {['All', 'Today', 'Yesterday', 'This Week', 'This Month'].map((time) => (
                      <button
                        key={time}
                        className={`drafts-filter-option ${lastEditedFilter === time ? 'active' : ''}`}
                        onClick={() => setLastEditedFilter(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="drafts-filter-group">
                  <span className="drafts-filter-label">Sort</span>
                  <div className="drafts-filter-options">
                    {['Recently Edited', 'Oldest', 'Name A-Z'].map((sort) => (
                      <button
                        key={sort}
                        className={`drafts-filter-option ${sortBy === sort ? 'active' : ''}`}
                        onClick={() => setSortBy(sort)}
                      >
                        {sort}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="drafts-view-options">
                <div className="drafts-view-toggle">
                  <button
                    className={viewMode === 'grid' ? 'active' : ''}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    className={viewMode === 'list' ? 'active' : ''}
                    onClick={() => setViewMode('list')}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {mockDrafts.length === 0 ? (
              <div className="drafts-empty-state">
                <div className="drafts-empty-icon">📝</div>
                <h3>No Draft Designs</h3>
                <p>Start creating a design and it will appear here automatically.</p>
                <button className="drafts-primary-btn" onClick={(e) => handleSectionClick(e, 'generator')}>
                  Create New Design
                </button>
              </div>
            ) : (
              <>
                <div className={`drafts-grid ${viewMode === 'grid' ? 'drafts-grid-view' : 'drafts-list-view'}`}>
                  {mockDrafts.map((draft) => (
                    <div key={draft.id} className="drafts-card" onClick={() => openDraftDetails(draft)}>
                      <div
                        className="drafts-checkbox"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDraftSelection(draft.id);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedDrafts.includes(draft.id)}
                          onChange={() => {}}
                        />
                      </div>
                      {draft.pinned && (
                        <div className="drafts-pinned-badge">
                          <Pin size={14} />
                        </div>
                      )}
                      <div className="drafts-card-preview">
                        <img src={draft.preview} alt={draft.name} />
                      </div>
                      <div className="drafts-card-info">
                        <h4 className="drafts-card-name">{draft.name}</h4>
                        <div className="drafts-card-meta">
                          <span className="drafts-product-type">{draft.productType}</span>
                          <span>•</span>
                          <span className="drafts-last-edited">
                            <Clock size={12} /> {draft.lastEdited}
                          </span>
                        </div>
                        <div className="drafts-card-status">
                          <span className={`drafts-status-badge ${draft.status.toLowerCase().replace(' ', '-')}`}>
                            {draft.status}
                          </span>
                          <span className="drafts-autosave">Auto Save: {draft.autoSave}</span>
                        </div>
                        <div className="drafts-progress">
                          <div className="drafts-progress-bar">
                            <div className="drafts-progress-fill" style={{ width: `${draft.completion}%` }}></div>
                          </div>
                          <span className="drafts-progress-text">{draft.completion}% Complete</span>
                        </div>
                        <div className="drafts-card-actions">
                          <button className="drafts-action-btn" onClick={(e) => { e.stopPropagation(); handleSectionClick(e, 'generator'); }}>
                            <Play size={14} /> Continue
                          </button>
                          <button className="drafts-action-btn" onClick={(e) => e.stopPropagation()}>
                            <Edit size={14} /> Rename
                          </button>
                          <button className="drafts-action-btn" onClick={(e) => e.stopPropagation()}>
                            <Heart size={14} /> Favorite
                          </button>
                          <button className="drafts-action-btn" onClick={(e) => e.stopPropagation()}>
                            <Copy size={14} /> Duplicate
                          </button>
                          <button className="drafts-action-btn drafts-danger-btn" onClick={(e) => e.stopPropagation()}>
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="drafts-continue-section">
                  <button
                    className="drafts-continue-btn"
                    onClick={(e) => handleSectionClick(e, 'generator')}
                  >
                    Continue Editing
                  </button>
                </div>

                {selectedDrafts.length > 0 && (
                  <div className="drafts-bulk-actions">
                    <div className="drafts-bulk-info">
                      <span>{selectedDrafts.length} selected</span>
                      <button
                        className="drafts-clear-btn"
                        onClick={() => setSelectedDrafts([])}
                      >
                        Clear
                      </button>
                    </div>
                    <div className="drafts-bulk-buttons">
                      <button className="drafts-bulk-btn">
                        <Trash2 size={16} /> Delete
                      </button>
                      <button className="drafts-bulk-btn">
                        <Folder size={16} /> Move to Collection
                      </button>
                      <button className="drafts-bulk-btn">
                        <Copy size={16} /> Duplicate
                      </button>
                      <button className="drafts-bulk-btn">
                        <FileText size={16} /> Export
                      </button>
                      <button className="drafts-bulk-btn">
                        <History size={16} /> Restore
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="drafts-sidebar">
            <div className="drafts-sidebar-card">
              <h4 className="drafts-sidebar-title">Auto Save Status</h4>
              <div className="drafts-autosave-status">
                <div className="drafts-autosave-info">
                  <span className="drafts-autosave-label">Auto Save</span>
                  <span className={`drafts-autosave-value ${autoSaveEnabled ? 'enabled' : 'disabled'}`}>
                    {autoSaveEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="drafts-last-saved">
                  <span className="drafts-last-saved-label">Last Saved</span>
                  <span className="drafts-last-saved-value">2 Minutes Ago</span>
                </div>
                <div className="drafts-autosave-toggle">
                  <button
                    className={`drafts-toggle-btn ${autoSaveEnabled ? 'active' : ''}`}
                    onClick={() => setAutoSaveEnabled(!autoSaveEnabled)}
                  >
                    {autoSaveEnabled ? 'Disable Auto Save' : 'Enable Auto Save'}
                  </button>
                </div>
              </div>
            </div>

            <div className="drafts-sidebar-card">
              <h4 className="drafts-sidebar-title">Recently Edited</h4>
              <div className="drafts-recent-list">
                {mockDrafts.map((draft) => (
                  <div key={draft.id} className="drafts-recent-item">
                    <div className="drafts-recent-info">
                      <span className="drafts-recent-name">{draft.name}</span>
                      <span className="drafts-recent-time">{draft.lastEdited}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="drafts-sidebar-card">
              <h4 className="drafts-sidebar-title">Draft Settings</h4>
              <div className="drafts-settings-list">
                <div className="drafts-setting-item">
                  <span className="drafts-setting-label">Auto Save Every</span>
                  <div className="drafts-setting-options">
                    {['1', '5'].map((interval) => (
                      <button
                        key={interval}
                        className={`drafts-setting-btn ${autoSaveInterval === interval ? 'active' : ''}`}
                        onClick={() => setAutoSaveInterval(interval)}
                      >
                        {interval} Minute{interval === '1' ? '' : 's'}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="drafts-setting-item">
                  <span className="drafts-setting-label">Keep Drafts</span>
                  <div className="drafts-setting-options">
                    <button
                      className={`drafts-setting-btn ${draftRetention === 'forever' ? 'active' : ''}`}
                      onClick={() => setDraftRetention('forever')}
                    >
                      Forever
                    </button>
                    <button
                      className={`drafts-setting-btn ${draftRetention === '90' ? 'active' : ''}`}
                      onClick={() => setDraftRetention('90')}
                    >
                      90 Days
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="drafts-premium-card">
              <h4 className="drafts-premium-title">🌟 Premium Features</h4>
              <div className="drafts-premium-list">
                <div className="drafts-premium-item">
                  <Pin size={16} />
                  <span>📌 Pin Draft</span>
                </div>
                <div className="drafts-premium-item">
                  <Star size={16} />
                  <span>📈 Completion Progress</span>
                </div>
                <div className="drafts-premium-item">
                  <History size={16} />
                  <span>🕒 Version History</span>
                </div>
                <div className="drafts-premium-item">
                  <Trash size={16} />
                  <span>🔄 Recover Deleted Draft</span>
                </div>
                <div className="drafts-premium-item">
                  <Zap size={16} />
                  <span>🤖 AI Reminder</span>
                </div>
                <div className="drafts-premium-item">
                  <Folder size={16} />
                  <span>📂 Collections</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isDetailsOpen && selectedDraft && (
        <div className="drafts-modal-overlay" onClick={() => setIsDetailsOpen(false)}>
          <div className="drafts-modal" onClick={(e) => e.stopPropagation()}>
            <div className="drafts-modal-header">
              <h3>Draft Details</h3>
              <button className="drafts-modal-close" onClick={() => setIsDetailsOpen(false)}>
                ✕
              </button>
            </div>
            <div className="drafts-modal-content">
              <img src={selectedDraft.preview} alt={selectedDraft.name} className="drafts-modal-preview" />
              <div className="drafts-modal-details">
                <div className="drafts-detail-row">
                  <span className="drafts-detail-label">Draft Name</span>
                  <span className="drafts-detail-value">{selectedDraft.name}</span>
                </div>
                <div className="drafts-detail-row">
                  <span className="drafts-detail-label">Created Date</span>
                  <span className="drafts-detail-value">{selectedDraft.createdDate}</span>
                </div>
                <div className="drafts-detail-row">
                  <span className="drafts-detail-label">Last Edited</span>
                  <span className="drafts-detail-value">{selectedDraft.lastEdited}</span>
                </div>
                <div className="drafts-detail-row">
                  <span className="drafts-detail-label">Prompt Used</span>
                  <span className="drafts-detail-value">{selectedDraft.prompt}</span>
                </div>
                <div className="drafts-detail-row">
                  <span className="drafts-detail-label">AI Model</span>
                  <span className="drafts-detail-value">{selectedDraft.aiModel}</span>
                </div>
                <div className="drafts-detail-row">
                  <span className="drafts-detail-label">Credits Used</span>
                  <span className="drafts-detail-value">{selectedDraft.creditsUsed}</span>
                </div>
                <div className="drafts-detail-row">
                  <span className="drafts-detail-label">Completion</span>
                  <div className="drafts-detail-progress">
                    <div className="drafts-detail-progress-bar">
                      <div className="drafts-detail-progress-fill" style={{ width: `${selectedDraft.completion}%` }}></div>
                    </div>
                    <span>{selectedDraft.completion}%</span>
                  </div>
                </div>
              </div>
              <div className="drafts-modal-actions">
                <button className="drafts-modal-btn drafts-modal-primary" onClick={(e) => handleSectionClick(e, 'generator')}>
                  Continue
                </button>
                <button className="drafts-modal-btn">
                  Publish
                </button>
                <button className="drafts-modal-btn">
                  Export
                </button>
                <button className="drafts-modal-btn drafts-modal-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default DraftsSection;

import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Plus,
  Upload,
  Search,
  FolderOpen,
  MoreHorizontal,
  Heart,
  Star,
  Copy,
  Pencil,
  Share2,
  Trash2,
  ExternalLink,
  FolderPlus,
  Edit3,
  Download,
  Folder,
  LayoutGrid,
  Clock,
  HardDrive,
  Zap,
  CreditCard,
} from 'lucide-react';
import CustomSelect from './CustomSelect';
import {
  workspaceStats,
  workspaceFolders,
  workspaceProjects,
  workspaceActivities,
  workspaceQuickActions,
} from '../constants';

const STATUS_OPTIONS = ['All', 'Completed', 'Draft', 'Favorite', 'Archived'];
const CATEGORY_OPTIONS = ['All Categories', 'Streetwear', 'Evening Wear', 'Ready-to-Wear', 'Resort Collection'];
const SORT_OPTIONS = ['Last Modified', 'Name A–Z', 'Most Designs', 'Recently Created'];

function ProjectCard({ project, onToggleFavorite, onAction }) {
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

  const statusClass = {
    Draft: 'status-draft',
    Completed: 'status-completed',
    Archived: 'status-archived',
  }[project.status] || 'status-draft';

  return (
    <div className="ws-project-card">
      <div className="ws-project-thumb">
        <img src={project.image} alt={project.title} />
        <div className="ws-project-overlay">
          <button type="button" className="ws-overlay-btn" title="Open" onClick={() => onAction('open', project)}>
            <ExternalLink size={16} />
          </button>
          <button type="button" className="ws-overlay-btn" title="Duplicate" onClick={() => onAction('duplicate', project)}>
            <Copy size={16} />
          </button>
          <button type="button" className="ws-overlay-btn" title="Share" onClick={() => onAction('share', project)}>
            <Share2 size={16} />
          </button>
        </div>
        {project.favorite && (
          <span className="ws-fav-badge">
            <Star size={12} fill="currentColor" />
          </span>
        )}
      </div>

      <div className="ws-project-body">
        <div className="ws-project-top">
          <h3>{project.title}</h3>
          <div className="ws-project-menu" ref={menuRef}>
            <button type="button" className="ws-menu-trigger" onClick={() => setMenuOpen(!menuOpen)}>
              <MoreHorizontal size={16} />
            </button>
            {menuOpen && (
              <ul className="ws-dropdown">
                <li onClick={() => { onAction('open', project); setMenuOpen(false); }}>
                  <ExternalLink size={14} /> Open
                </li>
                <li onClick={() => { onAction('duplicate', project); setMenuOpen(false); }}>
                  <Copy size={14} /> Duplicate
                </li>
                <li onClick={() => { onAction('rename', project); setMenuOpen(false); }}>
                  <Pencil size={14} /> Rename
                </li>
                <li onClick={() => { onAction('share', project); setMenuOpen(false); }}>
                  <Share2 size={14} /> Share
                </li>
                <li onClick={() => { onToggleFavorite(project.id); setMenuOpen(false); }}>
                  <Heart size={14} /> {project.favorite ? 'Unfavorite' : 'Favorite'}
                </li>
                <li className="danger" onClick={() => { onAction('delete', project); setMenuOpen(false); }}>
                  <Trash2 size={14} /> Delete
                </li>
              </ul>
            )}
          </div>
        </div>

        <span className="ws-project-category">{project.category}</span>

        <div className="ws-project-meta">
          <span><LayoutGrid size={12} /> {project.designs} Designs</span>
          <span><Clock size={12} /> {project.modified}</span>
        </div>

        <div className="ws-project-footer">
          <span className={`ws-status ${statusClass}`}>{project.status}</span>
          <div className="ws-project-icons">
            <button
              type="button"
              className={`ws-icon-btn ${project.favorite ? 'active' : ''}`}
              onClick={() => onToggleFavorite(project.id)}
              title="Favorite"
            >
              <Heart size={14} fill={project.favorite ? 'currentColor' : 'none'} />
            </button>
            <button
              type="button"
              className={`ws-icon-btn ${project.favorite ? 'active-star' : ''}`}
              onClick={() => onToggleFavorite(project.id)}
              title="Star"
            >
              <Star size={14} fill={project.favorite ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FolderCard({ folder, onAction }) {
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
    <div className="ws-folder-card">
      <div className="ws-folder-icon">{folder.icon || '📁'}</div>
      <div className="ws-folder-info">
        <h4>{folder.name}</h4>
        <p>{folder.count} Designs</p>
      </div>
      <div className="ws-folder-menu" ref={menuRef}>
        <button type="button" className="ws-menu-trigger" onClick={() => setMenuOpen(!menuOpen)}>
          <MoreHorizontal size={14} />
        </button>
        {menuOpen && (
          <ul className="ws-dropdown">
            <li onClick={() => { onAction('rename', folder); setMenuOpen(false); }}>
              <Edit3 size={14} /> Rename
            </li>
            <li onClick={() => { onAction('share', folder); setMenuOpen(false); }}>
              <Share2 size={14} /> Share
            </li>
            <li className="danger" onClick={() => { onAction('delete', folder); setMenuOpen(false); }}>
              <Trash2 size={14} /> Delete
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

function WorkspaceSection({ activeSection }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [sortBy, setSortBy] = useState('Last Modified');
  const [projects, setProjects] = useState(workspaceProjects);
  const [toast, setToast] = useState('');

  const filteredProjects = useMemo(() => {
    let result = [...projects];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q),
      );
    }

    if (statusFilter === 'Favorite') {
      result = result.filter((p) => p.favorite);
    } else if (statusFilter !== 'All') {
      result = result.filter((p) => p.status === statusFilter);
    }

    if (categoryFilter !== 'All Categories') {
      result = result.filter((p) => p.category === categoryFilter);
    }

    if (sortBy === 'Name A–Z') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'Most Designs') {
      result.sort((a, b) => b.designs - a.designs);
    }

    return result;
  }, [projects, search, statusFilter, categoryFilter, sortBy]);

  const recentProjects = filteredProjects.slice(0, 4);
  const sharedProjects = projects.filter((p) => p.shared);
  const favoriteProjects = projects.filter((p) => p.favorite);

  const storagePercent = (workspaceStats.storageUsed / workspaceStats.storageTotal) * 100;

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }

  function handleToggleFavorite(id) {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, favorite: !p.favorite } : p)),
    );
  }

  function handleProjectAction(action, project) {
    showToast(`${action.charAt(0).toUpperCase() + action.slice(1)}: ${project.title}`);
  }

  function handleFolderAction(action, folder) {
    showToast(`${action.charAt(0).toUpperCase() + action.slice(1)} folder: ${folder.name}`);
  }

  function handleNewProject() {
    showToast('New project created!');
  }

  function handleImportDesign() {
    showToast('Import design dialog opened');
  }

  const activitiesByDate = workspaceActivities.reduce((acc, item) => {
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {});

  return (
    <section
      id="workspace"
      className={`section workspace-section ${activeSection === 'workspace' ? 'active' : 'hidden'}`}
    >
      {toast && (
        <div className="ws-toast">
          <Zap size={14} />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="ws-header">
        <div className="ws-header-left">
          <h2>Workspace</h2>
          <p>Manage all your fashion design projects</p>
        </div>
        <div className="ws-header-actions">
          <button type="button" className="ws-btn-primary" onClick={handleNewProject}>
            <Plus size={16} />
            New Project
          </button>
          <button type="button" className="ws-btn-secondary" onClick={handleImportDesign}>
            <Upload size={16} />
            Import Design
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="ws-stats-row">
        <div className="ws-stat-card">
          <FolderOpen size={20} />
          <div>
            <span className="ws-stat-value">{workspaceStats.projects}</span>
            <span className="ws-stat-label">Projects</span>
          </div>
        </div>
        <div className="ws-stat-card">
          <LayoutGrid size={20} />
          <div>
            <span className="ws-stat-value">{workspaceStats.designs}</span>
            <span className="ws-stat-label">Designs</span>
          </div>
        </div>
        <div className="ws-stat-card">
          <Download size={20} />
          <div>
            <span className="ws-stat-value">{workspaceStats.downloads}</span>
            <span className="ws-stat-label">Downloads</span>
          </div>
        </div>
        <div className="ws-stat-card">
          <Star size={20} />
          <div>
            <span className="ws-stat-value">{workspaceStats.favorites}</span>
            <span className="ws-stat-label">Favorites</span>
          </div>
        </div>
      </div>

      {/* Main Layout: Content + Sidebar */}
      <div className="ws-layout">
        <div className="ws-main">

          {/* Search & Filters Toolbar */}
          <div className="ws-toolbar">
            <div className="ws-search">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="ws-filters">
              <div className="ws-filter-item">
                <label>Status</label>
                <CustomSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} options={STATUS_OPTIONS} />
              </div>
              <div className="ws-filter-item">
                <label>Category</label>
                <CustomSelect value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} options={CATEGORY_OPTIONS} />
              </div>
              <div className="ws-filter-item">
                <label>Sort By</label>
                <CustomSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)} options={SORT_OPTIONS} />
              </div>
            </div>
          </div>

          {/* Folders */}
          <div className="ws-section-block">
            <div className="ws-section-header">
              <h3><Folder size={18} /> Folders</h3>
              <button type="button" className="ws-btn-ghost" onClick={() => showToast('Create new folder')}>
                <FolderPlus size={14} /> New Folder
              </button>
            </div>
            <div className="ws-folders-grid">
              {workspaceFolders.map((folder) => (
                <FolderCard key={folder.id} folder={folder} onAction={handleFolderAction} />
              ))}
            </div>
          </div>

          {/* Recent Projects */}
          <div className="ws-section-block">
            <div className="ws-section-header">
              <h3><Clock size={18} /> Recent Projects</h3>
              <span className="ws-count">{filteredProjects.length} projects</span>
            </div>
            <div className="ws-projects-grid">
              {recentProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onToggleFavorite={handleToggleFavorite}
                  onAction={handleProjectAction}
                />
              ))}
            </div>
          </div>

          {/* Shared Projects */}
          {sharedProjects.length > 0 && (
            <div className="ws-section-block">
              <div className="ws-section-header">
                <h3><Share2 size={18} /> Shared Projects</h3>
              </div>
              <div className="ws-projects-grid ws-projects-grid-2">
                {sharedProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onToggleFavorite={handleToggleFavorite}
                    onAction={handleProjectAction}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Favorite Projects */}
          {favoriteProjects.length > 0 && (
            <div className="ws-section-block">
              <div className="ws-section-header">
                <h3><Star size={18} /> Favorite Designs</h3>
              </div>
              <div className="ws-projects-grid ws-projects-grid-3">
                {favoriteProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onToggleFavorite={handleToggleFavorite}
                    onAction={handleProjectAction}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Billing & Subscription Section */}
          <div className="ws-section-block">
            <div className="ws-section-header ws-billing-header">
              <div>
                <h3><CreditCard size={18} /> Billing & Subscription</h3>
                <p>Manage your subscription and payments</p>
              </div>
            </div>
            
            <div className="ws-billing-grid">
              {/* Current Plan */}
              <div className="ws-billing-card ws-billing-highlight">
                 <div className="ws-billing-plan-info">
                   <span className="ws-plan-badge">⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐</span>
                   <span className="ws-plan-badge-title">PRO PLAN</span>
                   <h2 className="ws-plan-price">$19<span>/month</span></h2>
                 </div>
                 <div className="ws-plan-status-row">
                    <span>Status <span className="ws-status-active">🟢 Active</span></span>
                    <span>Next Billing <strong>15 July 2026</strong></span>
                 </div>
                 <div className="ws-plan-actions">
                   <button type="button" className="ws-btn-primary">Upgrade</button>
                   <button type="button" className="ws-btn-secondary">Cancel</button>
                 </div>
                 <span className="ws-plan-badge-bottom">⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐</span>
              </div>

              {/* Usage & Credits */}
              <div className="ws-billing-card">
                 <h4>Usage & Credits</h4>
                 <div className="ws-credits-bar-container">
                    <div className="ws-credits-fill" style={{ width: '60%' }}></div>
                 </div>
                 <p className="ws-credits-text">600 / 1000 Credits Used</p>
              </div>

              {/* Available Plans */}
              <div className="ws-billing-card">
                 <h4>Available Plans</h4>
                 <ul className="ws-simple-list">
                   <li>Free - $0</li>
                   <li>Pro - $19</li>
                   <li>Enterprise - $99</li>
                 </ul>
                 <button type="button" className="ws-btn-ghost ws-mt-auto">View all features</button>
              </div>

              {/* Payment Method */}
              <div className="ws-billing-card">
                 <h4>Payment Method</h4>
                 <div className="ws-payment-method">
                    <span className="ws-card-icon">💳</span>
                    <div className="ws-payment-details">
                      <p>Visa ending in 4242</p>
                      <small>Expires 12/28</small>
                    </div>
                 </div>
                 <button type="button" className="ws-btn-ghost ws-mt-auto">Update</button>
              </div>

              {/* Billing History */}
              <div className="ws-billing-card">
                 <h4>Billing History</h4>
                 <ul className="ws-history-list">
                    <li><span>15 Jun 2026</span> <strong>$19.00</strong></li>
                    <li><span>15 May 2026</span> <strong>$19.00</strong></li>
                 </ul>
                 <button type="button" className="ws-btn-ghost ws-mt-auto">Download Invoices</button>
              </div>

              {/* Auto Renewal */}
              <div className="ws-billing-card">
                 <h4>Auto Renewal</h4>
                 <p className="ws-auto-renew-desc">Your subscription will automatically renew.</p>
                 <div className="ws-auto-renew-toggle ws-mt-auto">
                    <label className="ws-switch">
                      <input type="checkbox" defaultChecked />
                      <span className="ws-slider"></span>
                    </label>
                    <span>Enabled</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="ws-sidebar">
          {/* AI Quick Actions */}
          <div className="ws-sidebar-card">
            <h4><Zap size={16} /> AI Quick Actions</h4>
            <div className="ws-quick-actions">
              {workspaceQuickActions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  className="ws-quick-btn"
                  onClick={() => showToast(`${action.label} started`)}
                >
                  <span className="ws-quick-icon">{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="ws-sidebar-card">
            <h4><Clock size={16} /> Activity Timeline</h4>
            <div className="ws-activity">
              {Object.entries(activitiesByDate).map(([date, items]) => (
                <div key={date} className="ws-activity-group">
                  <span className="ws-activity-date">{date}</span>
                  {items.map((item) => (
                    <div key={item.id} className="ws-activity-item">
                      <span className="ws-activity-check">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Storage Usage */}
          <div className="ws-sidebar-card ws-storage-card">
            <h4><HardDrive size={16} /> Storage</h4>
            <div className="ws-storage-info">
              <span className="ws-storage-used">{workspaceStats.storageUsed} GB</span>
              <span className="ws-storage-total">of {workspaceStats.storageTotal} GB</span>
            </div>
            <div className="ws-storage-bar">
              <div className="ws-storage-fill" style={{ width: `${storagePercent}%` }} />
            </div>
            <p className="ws-storage-hint">{Math.round(storagePercent)}% used</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default WorkspaceSection;

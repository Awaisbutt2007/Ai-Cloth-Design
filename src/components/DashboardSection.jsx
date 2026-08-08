import React, { useState } from 'react';
import { 
  Shirt, Sparkles, Heart, Download, FolderOpen, Zap, Eye, Share2, Edit, DownloadCloud, TrendingUp, Zap as ZapIcon, 
  Search, Filter, Clock, CheckCircle, XCircle, Loader2, Palette, User, Image as ImageIcon, 
  Upload, CreditCard, Workflow, Star, Plus, FileText, ChevronDown, ChevronRight
} from 'lucide-react';

function DashboardSection({
  activeSection,
  handleSectionClick,
  output,
  selectedTheme,
}) {
  // Recent Activity State
  const [searchActivity, setSearchActivity] = useState('');
  const [timeFilter, setTimeFilter] = useState('Today');
  const [categoryFilter, setCategoryFilter] = useState('All Activities');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedActivity, setSelectedActivity] = useState(null);

  const activities = [];

  const getActivityIcon = (category) => {
    switch(category) {
      case 'Designs': return <Palette size={18} />;
      case 'Mockups': return <Shirt size={18} />;
      case 'AI Models': return <User size={18} />;
      case 'Assets': return <ImageIcon size={18} />;
      case 'Exports': return <Upload size={18} />;
      case 'Billing': return <CreditCard size={18} />;
      case 'Workspace': return <Workflow size={18} />;
      default: return <Sparkles size={18} />;
    }
  };

  const stats = [
    {
      icon: Shirt,
      label: 'Total Designs',
      value: '0',
      color: '#7f58ff',
       expanded: true,
      todayNew: '0',
      growthPercent: '0%',
      lastCreatedDate: 'N/A',
    },
    {
      icon: Sparkles,
      label: 'AI Designs Generated',
      value: '0',
      color: '#ff6f73',
    },
    {
      icon: Heart,
      label: 'Favorite Designs',
      value: '0',
      color: '#ff9a56',
    },
    {
      icon: Download,
      label: 'Downloads',
      value: '0',
      color: '#56d9ff',
    },
    {
      icon: FolderOpen,
      label: 'Projects',
      value: '0',
      color: '#7fff56',
    },
    {
      icon: Zap,
      label: 'AI Credits Remaining',
      value: '0',
      color: '#ffd956',
    },
  ];

  const recentDesigns = [];

  const analyticsData = [
    {
      label: 'Designs per Day',
      value: '0',
      icon: TrendingUp,
      color: '#7f58ff',
      subtext: 'avg this week',
    },
    {
      label: 'AI Usage',
      value: '0%',
      icon: Sparkles,
      color: '#ff6f73',
      subtext: 'of quota',
    },
    {
      label: 'Downloads',
      value: '0',
      icon: DownloadCloud,
      color: '#56d9ff',
      subtext: 'this month',
    },
    {
      label: 'Credits Used',
      value: '0',
      icon: ZapIcon,
      color: '#ffd956',
      subtext: 'of 1000',
    },
  ];

  const categories = [
    { name: 'Dresses', count: 0, color: '#ff6f73' },
    { name: 'Formal', count: 0, color: '#7f58ff' },
    { name: 'Casual', count: 0, color: '#56d9ff' },
    { name: 'Jackets', count: 0, color: '#7fff56' },
    { name: 'Shoes', count: 0, color: '#ff9a56' },
    { name: 'Bags', count: 0, color: '#ffd956' },
  ];

  const trendingStyles = [
    { name: 'Minimalist Luxury', icon: '✨', color: '#7f58ff' },
    { name: 'Cyberpunk', icon: '⚡', color: '#ff6f73' },
    { name: 'Vintage', icon: '🎨', color: '#ff9a56' },
    { name: 'Y2K', icon: '🎭', color: '#56d9ff' },
    { name: 'Streetwear', icon: '👟', color: '#7fff56' },
    { name: 'Old Money', icon: '💎', color: '#ffd956' },
    { name: 'Boho', icon: '🌸', color: '#ff9a56' },
  ];

  const aiModels = [
    {
      name: 'Fashion AI v3',
      description: 'Latest fashion design model',
      usage: '0%',
      status: 'active',
    },
    {
      name: 'Sketch AI',
      description: 'Convert sketches to designs',
      usage: '0%',
      status: 'active',
    },
    {
      name: 'Pattern Generator',
      description: 'Generate unique patterns',
      usage: '0%',
      status: 'active',
    },
    {
      name: 'Texture AI',
      description: 'Create realistic textures',
      usage: '0%',
      status: 'inactive',
    },
    {
      name: 'Color AI',
      description: 'Intelligent color matching',
      usage: '0%',
      status: 'inactive',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published':
        return '#7fff56';
      case 'Draft':
        return '#ff9a56';
      case 'Archived':
        return '#8d7369';
      default:
        return '#7f58ff';
    }
  };

  const renderOverviewSection = () => (
    <>
      <div className="dashboard-overview">
        <h2 className="overview-title">Overview</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return stat.expanded ? (
              <div key={index} className="stat-box stat-box-expanded" style={{ borderColor: stat.color }}>
                <div className="stat-expanded-header">
                  <div className="stat-icon-wrapper" style={{ borderColor: stat.color }}>
                    <IconComponent size={24} style={{ color: stat.color }} />
                  </div>
                  <div className="stat-expanded-main">
                    <p className="stat-label">{stat.label}</p>
                    <p className="stat-value">{stat.value}</p>
                  </div>
                </div>
                <div className="stat-expanded-details">
                  <div className="detail-row">
                    <span className="detail-icon">📅</span>
                    <div className="detail-content">
                      <span className="detail-label">Today's New</span>
                      <span className="detail-value" style={{ color: stat.color }}>{stat.todayNew}</span>
                    </div>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">📈</span>
                    <div className="detail-content">
                      <span className="detail-label">Growth</span>
                      <span className="detail-value" style={{ color: stat.color }}>{stat.growthPercent}</span>
                    </div>
                  </div>
                  <div className="detail-row">
                    <span className="detail-icon">⏰</span>
                    <div className="detail-content">
                      <span className="detail-label">Last Created</span>
                      <span className="detail-value-text">{stat.lastCreatedDate}</span>
                    </div>
                  </div>
                </div>
                <button 
                  className="view-all-designs-btn" 
                  style={{ borderColor: stat.color, color: stat.color }}
                  onClick={(e) => handleSectionClick(e, 'total-designs')}
                >
                  View All Designs →
                </button>
              </div>
            ) : (
              <div key={index} className="stat-box">
                <div className="stat-icon-wrapper" style={{ borderColor: stat.color }}>
                  <IconComponent size={24} style={{ color: stat.color }} />
                </div>
                <div className="stat-content">
                  <p className="stat-label">{stat.label}</p>
                  <p className="stat-value">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="recent-designs-section">
        <h2 className="recent-designs-title">Recent Designs</h2>
        {recentDesigns.length > 0 ? (
          <div className="designs-grid">
            {recentDesigns.map((design) => (
              <div key={design.id} className="design-card">
                <div className="design-image-wrapper">
                  <img src={design.image} alt={design.title} className="design-image" />
                  <div className="design-overlay">
                    <button className="design-action-btn" title="View">
                      <Eye size={18} />
                    </button>
                    <button className="design-action-btn" title="Share">
                      <Share2 size={18} />
                    </button>
                  </div>
                  <span className="design-category">{design.category}</span>
                </div>
                <div className="design-info">
                  <h3>{design.title}</h3>
                  <p className="design-date">{design.date}</p>
                  <div className="design-status" style={{ color: getStatusColor(design.status) }}>
                    ● {design.status}
                  </div>
                  <div className="design-stats">
                    <span className="design-stat">
                      <Eye size={14} />
                      {design.views}
                    </span>
                    <span className="design-stat">
                      <Share2 size={14} />
                      {design.shares}
                    </span>
                  </div>
                  <div className="design-actions">
                    <button className="design-btn download-btn" title="Download">
                      <DownloadCloud size={16} />
                      Download
                    </button>
                    <button className="design-btn edit-btn" title="Edit">
                      <Edit size={16} />
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="dashboard-empty-state">
            <Shirt size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
            <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>No designs found</p>
            <p style={{ fontSize: '0.95rem', marginTop: '8px', opacity: 0.8 }}>You haven't generated any designs yet. Your new creations will appear here.</p>
          </div>
        )}
      </div>

      <div className="analytics-section">
        <h2 className="section-title">AI Usage Analytics</h2>
        <div className="analytics-grid">
          {analyticsData.map((analytic, index) => {
            const IconComponent = analytic.icon;
            return (
              <div key={index} className="analytics-card" style={{ borderLeftColor: analytic.color }}>
                <div className="analytics-header">
                  <div className="analytics-icon" style={{ color: analytic.color }}>
                    <IconComponent size={20} />
                  </div>
                  <p className="analytics-label">{analytic.label}</p>
                </div>
                <p className="analytics-value">{analytic.value}</p>
                <p className="analytics-subtext">{analytic.subtext}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="categories-section">
        <h2 className="section-title">Design Categories</h2>
        <p className="categories-subtitle">Popular categories</p>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-card" style={{ borderLeftColor: category.color }}>
              <p className="category-name">{category.name}</p>
              <p className="category-count">{category.count} designs</p>
            </div>
          ))}
        </div>
      </div>

      <div className="trending-styles-section">
        <h2 className="section-title">Trending AI Styles</h2>
        <div className="styles-grid">
          {trendingStyles.map((style, index) => (
            <div key={index} className="style-card" style={{ borderTopColor: style.color }}>
              <div className="style-icon">{style.icon}</div>
              <p className="style-name">{style.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="ai-models-section">
        <h2 className="section-title">Recently Used AI Models</h2>
        <div className="models-list">
          {aiModels.map((model, index) => (
            <div key={index} className={`model-card ${model.status}`}>
              <div className="model-header">
                <div className="model-info">
                  <h4 className="model-name">{model.name}</h4>
                  <p className="model-description">{model.description}</p>
                </div>
                <div className={`model-badge ${model.status}`}>
                  {model.status === 'active' ? '● Active' : '● Inactive'}
                </div>
              </div>
              <div className="model-usage">
                <div className="usage-label">Usage: {model.usage}</div>
                <div className="usage-bar">
                  <div className="usage-fill" style={{ width: model.usage }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderTotalDesignsSection = () => (
    <>
      <div className="dashboard-overview">
        <h2 className="overview-title">Total Designs</h2>
      </div>
      <div className="recent-designs-section">
        <h2 className="recent-designs-title">All Designs</h2>
        {recentDesigns.length > 0 ? (
          <div className="designs-grid">
            {recentDesigns.map((design) => (
              <div key={design.id} className="design-card">
                <div className="design-image-wrapper">
                  <img src={design.image} alt={design.title} className="design-image" />
                  <div className="design-overlay">
                    <button className="design-action-btn" title="View">
                      <Eye size={18} />
                    </button>
                    <button className="design-action-btn" title="Share">
                      <Share2 size={18} />
                    </button>
                  </div>
                  <span className="design-category">{design.category}</span>
                </div>
                <div className="design-info">
                  <h3>{design.title}</h3>
                  <p className="design-date">{design.date}</p>
                  <div className="design-status" style={{ color: getStatusColor(design.status) }}>
                    ● {design.status}
                  </div>
                  <div className="design-stats">
                    <span className="design-stat">
                      <Eye size={14} />
                      {design.views}
                    </span>
                    <span className="design-stat">
                      <Share2 size={14} />
                      {design.shares}
                    </span>
                  </div>
                  <div className="design-actions">
                    <button className="design-btn download-btn" title="Download">
                      <DownloadCloud size={16} />
                      Download
                    </button>
                    <button className="design-btn edit-btn" title="Edit">
                      <Edit size={16} />
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="dashboard-empty-state">
            <Shirt size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
            <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>No designs found</p>
            <p style={{ fontSize: '0.95rem', marginTop: '8px', opacity: 0.8 }}>You haven't generated any designs yet. Your new creations will appear here.</p>
          </div>
        )}
      </div>
    </>
  );

  const renderCreditsSection = () => (
    <div className="credits-section">
      <h2 className="section-title">Credits Left</h2>

      {/* 1️⃣ Current Balance (Top Card) */}
      <div className="credits-top-card">
        <div className="credits-top-header">
          <h3 className="credits-top-title">Credits Left</h3>
          <p className="credits-top-value">2,450 Credits</p>
        </div>
        <div className="credits-top-info">
          <p className="credits-plan">Premium Plan</p>
          <p className="credits-renewal">Renews in 18 Days</p>
        </div>
        <div className="credits-top-buttons">
          <button className="credits-btn-primary">Buy Credits</button>
          <button className="credits-btn-secondary">Upgrade Plan</button>
        </div>
      </div>

      {/* 2️⃣ Progress Card */}
      <div className="credits-progress-card">
        <div className="credits-progress-info">
          <div className="credits-progress-item">
            <p className="credits-progress-label">Used</p>
            <p className="credits-progress-value">2550</p>
          </div>
          <div className="credits-progress-item">
            <p className="credits-progress-label">Remaining</p>
            <p className="credits-progress-value">2450</p>
          </div>
        </div>
        <div className="credits-progress-wrapper">
          <p className="credits-progress-text">2450 / 5000 Credits</p>
          <div className="credits-progress-bar">
            <div className="credits-progress-fill" style={{ width: '49%' }}></div>
          </div>
          <p className="credits-progress-percentage">49%</p>
        </div>
      </div>

      {/* 3️⃣ Credits Summary */}
      <div className="credits-summary-grid">
        <div className="credits-summary-card">
          <p className="credits-summary-label">Monthly Credits</p>
          <p className="credits-summary-value">5000</p>
        </div>
        <div className="credits-summary-card">
          <p className="credits-summary-label">Used</p>
          <p className="credits-summary-value">2550</p>
        </div>
        <div className="credits-summary-card">
          <p className="credits-summary-label">Remaining</p>
          <p className="credits-summary-value">2450</p>
        </div>
        <div className="credits-summary-card">
          <p className="credits-summary-label">Expiring Soon</p>
          <p className="credits-summary-value">120</p>
        </div>
      </div>

      {/* 4️⃣ Usage Breakdown */}
      <div className="credits-breakdown-section">
        <h3 className="credits-subtitle">Usage Breakdown</h3>
        <div className="credits-breakdown-table">
          <div className="credits-breakdown-row header">
            <p className="credits-breakdown-cell">Feature</p>
            <p className="credits-breakdown-cell">Credits Used</p>
          </div>
          {[
            { feature: 'AI Design Generator', credits: 850 },
            { feature: 'Background Remover', credits: 220 },
            { feature: 'Upscale Image', credits: 180 },
            { feature: 'Recolor Outfit', credits: 140 },
            { feature: 'Pattern Generator', credits: 320 },
            { feature: 'Logo Generator', credits: 260 },
            { feature: 'Mockups', credits: 580 }
          ].map((item, index) => (
            <div key={index} className="credits-breakdown-row">
              <p className="credits-breakdown-cell">{item.feature}</p>
              <p className="credits-breakdown-cell">{item.credits}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5️⃣ Recent Usage */}
      <div className="credits-recent-section">
        <h3 className="credits-subtitle">Recent Usage</h3>
        <div className="credits-recent-table">
          <div className="credits-recent-row header">
            <p className="credits-recent-cell">Time</p>
            <p className="credits-recent-cell">Action</p>
            <p className="credits-recent-cell">Credits</p>
          </div>
          {[
            { time: '5 min ago', action: 'AI Design Generated', credits: -8 },
            { time: '15 min ago', action: 'Background Removed', credits: -2 },
            { time: '1 hour ago', action: 'Logo Generated', credits: -6 },
            { time: 'Today', action: 'T-Shirt Mockup', credits: -4 }
          ].map((item, index) => (
            <div key={index} className="credits-recent-row">
              <p className="credits-recent-cell">{item.time}</p>
              <p className="credits-recent-cell">{item.action}</p>
              <p className="credits-recent-cell">{item.credits}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 6️⃣ AI Tool Usage */}
      <div className="credits-tool-section">
        <h3 className="credits-subtitle">AI Tool Usage</h3>
        <div className="credits-tool-list">
          {[
            { tool: 'AI Design Generator', credits: 850 },
            { tool: 'Mockups', credits: 580 },
            { tool: 'Pattern Generator', credits: 320 }
          ].map((item, index) => (
            <div key={index} className="credits-tool-card">
              <div className="credits-tool-info">
                <p className="credits-tool-name">{item.tool}</p>
                <p className="credits-tool-credits">{item.credits} Credits</p>
              </div>
              {index < 2 && <div className="credits-tool-divider"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* 7️⃣ Estimated Remaining */}
      <div className="credits-estimated-section">
        <h3 className="credits-subtitle">Estimated Remaining</h3>
        <div className="credits-estimated-card">
          <div className="credits-estimated-item">
            <p className="credits-estimated-label">Current Usage</p>
            <p className="credits-estimated-value">≈ 80 Credits / Day</p>
          </div>
          <div className="credits-estimated-item">
            <p className="credits-estimated-label">Estimated Remaining</p>
            <p className="credits-estimated-value">30 Days</p>
          </div>
          <div className="credits-estimated-warning">
            <p className="credits-warning-text">⚠ High Usage</p>
            <p className="credits-warning-desc">Credits may finish within 10 days.</p>
          </div>
        </div>
      </div>

      {/* 8️⃣ Quick Actions */}
      <div className="credits-actions-section">
        <h3 className="credits-subtitle">Quick Actions</h3>
        <div className="credits-actions-grid">
          <button className="credits-action-btn">Buy Credits</button>
          <button className="credits-action-btn">Upgrade Plan</button>
          <button className="credits-action-btn">View Billing</button>
          <button className="credits-action-btn">Usage History</button>
        </div>
      </div>

      {/* 9️⃣ Upgrade Plan */}
      <div className="credits-upgrade-section">
        <h3 className="credits-subtitle">Upgrade Plan</h3>
        <div className="credits-upgrade-card">
          <h4 className="credits-upgrade-title">Need More Credits?</h4>
          <p className="credits-upgrade-subtitle">Upgrade to Pro</p>
          <p className="credits-upgrade-details">10,000 Credits / Month</p>
          <button className="credits-btn-primary">Upgrade Now</button>
        </div>
      </div>

      {/* 🔟 Usage Tips */}
      <div className="credits-tips-section">
        <h3 className="credits-subtitle">Usage Tips</h3>
        <div className="credits-tips-list">
          <div className="credits-tip-item">
            <span className="credits-tip-icon">💡</span>
            <p className="credits-tip-text">Batch generate designs to reduce repeated AI requests.</p>
          </div>
          <div className="credits-tip-item">
            <span className="credits-tip-icon">💡</span>
            <p className="credits-tip-text">Reuse saved assets instead of generating them again.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRecentActivitySection = () => (
    <div className="recent-activity-section">
      {/* 1️⃣ Header */}
      <div className="ra-header">
        <div className="ra-header-left">
          <h2 className="section-title">Recent Activity</h2>
          <p>Track your latest actions across the platform.</p>
        </div>
        <div className="ra-header-right">
          <button className="ra-btn-secondary">View All</button>
          <button className="ra-btn-secondary">Clear History</button>
        </div>
      </div>

      {/* 📊 Activity Statistics */}
      <div className="ra-stats-grid">
        <div className="ra-stat-card">
          <p className="ra-stat-label">Today's Designs</p>
          <p className="ra-stat-value">12</p>
        </div>
        <div className="ra-stat-card">
          <p className="ra-stat-label">Exports</p>
          <p className="ra-stat-value">6</p>
        </div>
        <div className="ra-stat-card">
          <p className="ra-stat-label">Credits Used</p>
          <p className="ra-stat-value">45</p>
        </div>
        <div className="ra-stat-card">
          <p className="ra-stat-label">Mockups</p>
          <p className="ra-stat-value">9</p>
        </div>
      </div>

      {/* 2️⃣ Activity Filters */}
      <div className="ra-filters">
        <div className="ra-search">
          <Search size={18} className="ra-search-icon" />
          <input 
            type="text" 
            placeholder="Search Activity..." 
            value={searchActivity}
            onChange={(e) => setSearchActivity(e.target.value)}
          />
        </div>
        
        <div className="ra-filter-buttons">
          <div className="ra-filter-group">
            {['Today', 'Last 7 Days', 'Last 30 Days', 'All Time'].map(filter => (
              <button 
                key={filter}
                className={`ra-filter-btn ${timeFilter === filter ? 'active' : ''}`}
                onClick={() => setTimeFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="ra-filter-group">
            {['All Activities', 'Designs', 'Mockups', 'AI Models', 'Assets', 'Exports', 'Billing', 'Workspace'].map(filter => (
              <button 
                key={filter}
                className={`ra-filter-btn ${categoryFilter === filter ? 'active' : ''}`}
                onClick={() => setCategoryFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="ra-filter-group">
            {['All', 'Success', 'Processing', 'Failed'].map(filter => (
              <button 
                key={filter}
                className={`ra-filter-btn ${statusFilter === filter ? 'active' : ''}`}
                onClick={() => setStatusFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="ra-main-layout">
        {/* 3️⃣ Activity Timeline */}
        <div className="ra-timeline">
          {activities.length === 0 ? (
            /* 7️⃣ Empty State */
            <div className="ra-empty-state">
              <div className="ra-empty-icon">📋</div>
              <h3>No Recent Activity</h3>
              <p>Start creating designs to see your activity here.</p>
              <button className="ra-btn-primary">Create Design</button>
            </div>
          ) : (
            activities.map((activity, index) => (
              <div 
                key={activity.id} 
                className={`ra-timeline-item ${selectedActivity?.id === activity.id ? 'selected' : ''}`}
                onClick={() => setSelectedActivity(activity)}
              >
                <div className="ra-timeline-icon">
                  {getActivityIcon(activity.category)}
                </div>
                <div className="ra-timeline-content">
                  <div className="ra-timeline-header">
                    <div className="ra-timeline-action">{activity.action}</div>
                    <div className={`ra-timeline-status ${activity.status.toLowerCase()}`}>
                      {activity.status === 'Success' && <CheckCircle size={14} />}
                      {activity.status === 'Processing' && <Loader2 size={14} className="spin" />}
                      {activity.status === 'Failed' && <XCircle size={14} />}
                      {activity.status}
                    </div>
                  </div>
                  <div className="ra-timeline-meta">
                    <span className="ra-timeline-time"><Clock size={14} /> {activity.time}</span>
                    <span className={`ra-timeline-credits ${activity.credits > 0 ? 'positive' : 'negative'}`}>
                      {activity.credits > 0 ? '+' : ''}{activity.credits}
                    </span>
                  </div>
                </div>
                {index < activities.length - 1 && <div className="ra-timeline-line"></div>}
              </div>
            ))
          )}

          {/* 6️⃣ Load More */}
          {activities.length > 0 && (
            <button className="ra-load-more-btn">Load More Activities</button>
          )}
        </div>

        {/* 4️⃣ Activity Details */}
        <div className="ra-details-sidebar">
          {selectedActivity ? (
            <div className="ra-details-card">
              <h3 className="ra-details-title">{selectedActivity.action}</h3>
              
              <div className="ra-details-section">
                <label className="ra-details-label">Date</label>
                <p className="ra-details-value">{selectedActivity.date}</p>
              </div>
              
              <div className="ra-details-divider"></div>
              
              <div className="ra-details-section">
                <label className="ra-details-label">Time</label>
                <p className="ra-details-value">{selectedActivity.exactTime}</p>
              </div>
              
              <div className="ra-details-divider"></div>
              
              <div className="ra-details-section">
                <label className="ra-details-label">Credits Used</label>
                <p className="ra-details-value">{Math.abs(selectedActivity.credits)}</p>
              </div>
              
              <div className="ra-details-divider"></div>
              
              <div className="ra-details-section">
                <label className="ra-details-label">Duration</label>
                <p className="ra-details-value">{selectedActivity.duration}</p>
              </div>
              
              <div className="ra-details-divider"></div>
              
              <div className="ra-details-section">
                <label className="ra-details-label">Status</label>
                <p className={`ra-details-value ${selectedActivity.status.toLowerCase()}`}>{selectedActivity.status}</p>
              </div>

              <div className="ra-details-actions">
                <button className="ra-btn-primary w-full">Open</button>
                <button className="ra-btn-secondary w-full"><Download size={16} /> Download</button>
                <button className="ra-btn-secondary w-full">Repeat Action</button>
                <button className="ra-btn-danger w-full">Delete</button>
              </div>
            </div>
          ) : (
            <div className="ra-details-empty">
              <p>Select an activity to view details</p>
            </div>
          )}

          {/* 5️⃣ Quick Actions */}
          <div className="ra-quick-actions">
            <h4 className="ra-quick-title">Quick Actions</h4>
            <div className="ra-quick-buttons">
              <button className="ra-btn-primary w-full"><Plus size={16} /> Create New Design</button>
              <button className="ra-btn-secondary w-full"><Workflow size={16} /> Open Workspace</button>
              <button className="ra-btn-secondary w-full"><ImageIcon size={16} /> View Assets</button>
              <button className="ra-btn-secondary w-full"><FileText size={16} /> Download Report</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
      case 'dashboard':
        return renderOverviewSection();
      case 'total-designs':
        return renderTotalDesignsSection();
      case 'credits-left':
        return renderCreditsSection();
      case 'recent-activity':
        return renderRecentActivitySection();
      default:
        return renderOverviewSection();
    }
  };

  return (
    <section id="dashboard" className={`section dashboard-section ${activeSection === 'overview' || activeSection === 'dashboard' || activeSection === 'credits-left' || activeSection === 'total-designs' || activeSection === 'recent-activity' ? 'active' : 'hidden'}`}>
      <div key={activeSection} className="section-content">
        {renderContent()}
      </div>
    </section>
  );
}

export default DashboardSection;

import React from 'react';
import { Sparkles, Shirt, Lightbulb, TrendingUp, Grid, Heart, Star, Clock } from 'lucide-react';
import { repairImageUrl, repairPostImages, DEFAULT_POST_PLACEHOLDER } from '../constants';

function getAllPosts() {
  const seenIds = new Set();
  const result = [];

  try {
    const globalStr = window.localStorage.getItem('aifashionGlobalPosts');
    if (globalStr) {
      const globalArr = JSON.parse(globalStr);
      if (Array.isArray(globalArr)) {
        for (const p of globalArr) {
          const pid = typeof p === 'object' ? (p.id || p.url || p.title) : p;
          if (!seenIds.has(pid)) {
            seenIds.add(pid);
            result.push(repairPostImages(p));
          }
        }
      }
    }
  } catch (e) {}

  try {
    const allProfiles = JSON.parse(window.localStorage.getItem('aifashionProfileStats') || '{}');
    const profilePosts = Object.values(allProfiles).flatMap(p => p.postImages || []);
    for (const p of profilePosts) {
      const pid = typeof p === 'object' ? (p.id || p.url || p.title) : p;
      if (!seenIds.has(pid)) {
        seenIds.add(pid);
        result.push(repairPostImages(p));
      }
    }
  } catch (e) {}

  return result;
}

function TotalDesignsSection({ activeSection, handleSectionClick, handleProductClick, posts }) {

  const allPosts = posts || [];
  const quickActions = [
    { title: 'AI Stylist', desc: 'Get outfit recommendations tailored for you', icon: Sparkles },
    { title: 'Virtual Try-On', desc: 'Try outfits virtually before you buy', icon: Shirt },
    { title: 'Style Tips', desc: 'Get personalized style tips', icon: Lightbulb },
    { title: 'Trends', desc: 'Explore latest fashion trends', icon: TrendingUp },
    { title: 'Outfit Ideas', desc: 'Discover outfit ideas for any occasion', icon: Grid },
  ];

  const recentlyViewedStr = window.localStorage.getItem('aifashionRecentlyViewed');
  let recentlyViewed = [];
  if (recentlyViewedStr) {
    try { recentlyViewed = JSON.parse(recentlyViewedStr); } catch(e) {}
  }

  // Dummy data removed, using real posts from allPosts

  return (
    <section id="home" className={`section dashboard-overview-section ${(activeSection === 'home' || activeSection === 'all-designs' || activeSection === 'total-designs') ? 'active' : 'hidden'}`}>
      <div className="dashboard-overview-container">

        {/* Hero Banner */}
        <div className="overview-hero-banner">
          <div className="overview-hero-content">
            <span className="overview-hero-tag">AI FASHION</span>
            <h1 className="overview-hero-title">
              AI Fashion<br />Made for <span className="highlight-text">You</span>
            </h1>
            <p className="overview-hero-subtitle">Scan • Suggest • Shop</p>
            <button className="overview-hero-btn" onClick={(e) => handleSectionClick(e, 'ai-scan')}>
              Try AI Stylist <Sparkles size={16} />
            </button>
          </div>
          <div className="overview-hero-image-wrap">
            <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop" alt="Fashion Model" className="overview-hero-image" />
            <div className="overview-hero-circles">
              <div className="circle circle-1"></div>
              <div className="circle circle-2"></div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="overview-section">
          <h2 className="overview-section-title">Quick Actions</h2>
          <div className="quick-actions-grid">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <div key={idx} className="quick-action-card">
                  <div className="quick-action-icon-wrap">
                    <Icon size={20} />
                  </div>
                  <h3 className="quick-action-title">{action.title}</h3>
                  <p className="quick-action-desc">{action.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trending Looks */}
        <div className="overview-section">
          <div className="overview-section-header">
            <h2 className="overview-section-title">Trending Looks</h2>
            <button className="view-all-link" onClick={(e) => handleSectionClick(e, 'all-user-posts')}>View All</button>
          </div>
          <div className="trending-looks-grid">
            {allPosts.length > 0 ? (
              allPosts.slice(0, 4).map((post, idx) => {
                const rawImgSrc = typeof post === 'string' ? post : post.url;
                const imgSrc = repairImageUrl(rawImgSrc);
                const title = typeof post === 'string' ? `User Design ${idx + 1}` : (post.title || `User Design ${idx + 1}`);
                const price = typeof post === 'string' ? 'Custom' : `Rs. ${post.price || 0}`;
                const isNew = typeof post === 'object' && post.isNew;

                return (
                  <div key={idx} className="trending-product-card" onClick={() => handleProductClick(post)}>
                    <div className="trending-product-image-wrap">
                      <img src={imgSrc} alt={title} className="trending-product-image" loading="lazy" onError={(e) => { e.currentTarget.src = DEFAULT_POST_PLACEHOLDER; }} />
                      <button className="trending-product-favorite" onClick={(e) => e.stopPropagation()}>
                        <Heart size={18} />
                      </button>
                    </div>
                    <div className="trending-product-info">
                      <h3 className="trending-product-name">{title}</h3>
                      <div className="trending-product-price-row">
                        <span className="trending-product-price">{price}</span>
                        <span className="trending-product-rating">
                          {isNew ? (
                            <><Star size={14} fill="#FFD700" color="#FFD700" /> New</>
                          ) : (
                            <><Star size={14} fill="#FFD700" color="#FFD700" /> 5.0</>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>No designs have been published yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* New Looks */}
        <div className="overview-section" style={{ marginTop: '40px' }}>
          <div className="overview-section-header">
            <h2 className="overview-section-title">New</h2>
            <button className="view-all-link" onClick={(e) => handleSectionClick(e, 'all-user-posts')}>View All</button>
          </div>
          <div className="trending-looks-grid">
            {allPosts.length > 0 ? (
              allPosts.slice(0, 4).map((post, idx) => {
                const rawImgSrc = typeof post === 'string' ? post : post.url;
                const imgSrc = repairImageUrl(rawImgSrc);
                const title = typeof post === 'string' ? `New Design ${idx + 1}` : (post.title || `New Design ${idx + 1}`);
                const price = typeof post === 'string' ? 'Custom' : `Rs. ${post.price || 0}`;
                
                return (
                  <div key={`new-${idx}`} className="trending-product-card" onClick={() => handleProductClick(post)}>
                    <div className="trending-product-image-wrap">
                      <img src={imgSrc} alt={title} className="trending-product-image" loading="lazy" onError={(e) => { e.currentTarget.src = DEFAULT_POST_PLACEHOLDER; }} />
                      <button className="trending-product-favorite" onClick={(e) => e.stopPropagation()}>
                        <Heart size={18} />
                      </button>
                    </div>
                    <div className="trending-product-info">
                      <h3 className="trending-product-name">{title}</h3>
                      <div className="trending-product-price-row">
                        <span className="trending-product-price">{price}</span>
                        <span className="trending-product-rating">
                          <Star size={14} fill="#FFD700" color="#FFD700" /> New
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>No new designs yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Recently Viewed */}
        <div className="overview-section" style={{ marginTop: '40px' }}>
          <div className="overview-section-header">
            <h2 className="overview-section-title">Recently Viewed</h2>
          </div>
          <div className="trending-looks-grid">
            {recentlyViewed.length > 0 ? (
              recentlyViewed.map((post, idx) => {
                const rawImgSrc = typeof post === 'string' ? post : post.url;
                const imgSrc = repairImageUrl(rawImgSrc);
                const title = typeof post === 'string' ? `Custom Design` : (post.title || `Custom Design`);
                const price = typeof post === 'string' ? 'Custom' : `Rs. ${post.price || 0}`;
                const isNew = typeof post === 'object' && post.isNew;

                return (
                  <div key={idx} className="trending-product-card" onClick={() => handleProductClick(post)}>
                    <div className="trending-product-image-wrap">
                      <img src={imgSrc} alt={title} className="trending-product-image" loading="lazy" onError={(e) => { e.currentTarget.src = DEFAULT_POST_PLACEHOLDER; }} />
                      <button className="trending-product-favorite" onClick={(e) => e.stopPropagation()}>
                        <Heart size={18} />
                      </button>
                    </div>
                    <div className="trending-product-info">
                      <h4 className="trending-product-name">{title}</h4>
                      <p className="trending-product-price">{price}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>No recently viewed designs.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

export default TotalDesignsSection;
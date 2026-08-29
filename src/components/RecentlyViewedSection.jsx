import React from 'react';
import { ArrowLeft, Heart, Star } from 'lucide-react';
import PostImage from './PostImage';
import { useLikedPostIds, toggleLike, getPostId } from '../lib/reactions';
import { repairImageUrl, DEFAULT_POST_PLACEHOLDER } from '../constants';

function readRecentlyViewed() {
  try {
    const stored = window.localStorage.getItem('aifashionRecentlyViewed');
    const items = stored ? JSON.parse(stored) : [];
    return Array.isArray(items) ? items : [];
  } catch (error) {
    return [];
  }
}

export default function RecentlyViewedSection({ activeSection, handleSectionClick, handleProductClick }) {
  const recentlyViewed = readRecentlyViewed();
  const likedPostIds = useLikedPostIds();

  if (activeSection !== 'recently-viewed') return null;

  return (
    <section id="recently-viewed" className="section dashboard-overview-section active">
      <div className="dashboard-overview-container">
        <button type="button" className="section-back-btn" onClick={(event) => handleSectionClick(event, 'home')}>
          <span className="section-back-icon"><ArrowLeft size={17} /></span>
          <span>Back to Home</span>
        </button>
        <div className="overview-section-header" style={{ marginTop: '24px' }}>
          <h2 className="overview-section-title">Recently Viewed</h2>
        </div>
        <div className="trending-looks-grid">
          {recentlyViewed.length > 0 ? recentlyViewed.map((post, index) => {
            const rawImgSrc = typeof post === 'string' ? post : post.url;
            const imgSrc = repairImageUrl(rawImgSrc);
            const title = typeof post === 'string' ? 'Custom Design' : (post.title || 'Custom Design');
            const price = typeof post === 'string' ? 'Custom' : `Rs. ${post.price || 0}`;
            return (
              <div key={post.id || `${post.url}-${index}`} className="trending-product-card" onClick={() => handleProductClick(post)}>
                <div className="trending-product-image-wrap">
                  <PostImage src={imgSrc} alt={title} className="trending-product-image" />
                  <button
                    type="button"
                    className={`trending-product-favorite ${likedPostIds.has(getPostId(post)) ? 'is-liked' : ''}`}
                    onClick={(event) => { event.stopPropagation(); toggleLike(post); }}
                    aria-label={likedPostIds.has(getPostId(post)) ? 'Unlike' : 'Like'}
                  >
                    <Heart size={18} fill={likedPostIds.has(getPostId(post)) ? '#ff5277' : 'none'} color={likedPostIds.has(getPostId(post)) ? '#ff5277' : 'currentColor'} />
                  </button>
                </div>
                <div className="trending-product-info">
                  <h3 className="trending-product-name">{title}</h3>
                  <div className="trending-product-price-row">
                    <span className="trending-product-price">{price}</span>
                    <span className="trending-product-rating"><Star size={14} fill="#FFD700" color="#FFD700" /> Viewed</span>
                  </div>
                </div>
              </div>
            );
          }) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>No recently viewed designs.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

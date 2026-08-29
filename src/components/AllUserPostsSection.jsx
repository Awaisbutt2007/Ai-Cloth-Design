import React from 'react';
import { Heart, Star, ArrowLeft } from 'lucide-react';
import { repairImageUrl, repairPostImages, DEFAULT_POST_PLACEHOLDER } from '../constants';
import PostImage from './PostImage';
import { useLikedPostIds, toggleLike, getPostId } from '../lib/reactions';

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

function AllUserPostsSection({ activeSection, handleProductClick, handleSectionClick, postsRefreshTick, posts }) {
  void postsRefreshTick;
  const likedPostIds = useLikedPostIds();
  const allPosts = posts || [];

  return (
    <section id="all-user-posts" className={`section ${(activeSection === 'all-user-posts') ? 'active' : 'hidden'}`}>
      <div className="dashboard-overview-container">

        <button type="button" className="section-back-btn" onClick={(event) => handleSectionClick?.(event, 'home')}>
          <span className="section-back-icon"><ArrowLeft size={17} /></span>
          <span>Back to Home</span>
        </button>

        <div className="overview-section" style={{ marginTop: '24px' }}>
          <div className="overview-section-header">
            <h2 className="overview-section-title">All User Posts</h2>
          </div>

          <div className="all-user-posts-grid">
            {allPosts.length > 0 ? (
              allPosts.map((post, idx) => {
                const rawImgSrc = typeof post === 'string' ? post : post.url;
                const imgSrc = repairImageUrl(rawImgSrc);
                const title = typeof post === 'string' ? `User Design ${idx + 1}` : (post.title || `User Design ${idx + 1}`);
                const price = typeof post === 'string' ? 'Custom' : `Rs. ${post.price || 0}`;
                const isNew = typeof post === 'object' && post.isNew;

                return (
                  <div key={idx} className="trending-product-card" onClick={() => handleProductClick(post)}>
                    <div className="trending-product-image-wrap">
                      <PostImage src={imgSrc} alt={title} className="trending-product-image" />
                      <button
                        type="button"
                        className={`trending-product-favorite ${likedPostIds.has(getPostId(post)) ? 'is-liked' : ''}`}
                        onClick={(e) => { e.stopPropagation(); toggleLike(post); }}
                        aria-label={likedPostIds.has(getPostId(post)) ? 'Unlike' : 'Like'}
                      >
                        <Heart size={18} fill={likedPostIds.has(getPostId(post)) ? '#ff5277' : 'none'} color={likedPostIds.has(getPostId(post)) ? '#ff5277' : 'currentColor'} />
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
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>No designs have been published yet.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

export default AllUserPostsSection;

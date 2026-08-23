import React from 'react';
import { Heart, Star } from 'lucide-react';

function AllUserPostsSection({ activeSection, handleProductClick }) {
  const allProfiles = JSON.parse(window.localStorage.getItem('aifashionProfileStats') || '{}');
  const allPosts = Object.values(allProfiles).flatMap(p => p.postImages || []);

  return (
    <section id="all-user-posts" className={`section ${(activeSection === 'all-user-posts') ? 'active' : 'hidden'}`}>
      <div className="dashboard-overview-container">

        <div className="overview-section">
          <div className="overview-section-header">
            <h2 className="overview-section-title">All User Posts</h2>
          </div>

          <div className="all-user-posts-grid">
            {allPosts.length > 0 ? (
              allPosts.map((post, idx) => {
                const imgSrc = typeof post === 'string' ? post : post.url;
                const title = typeof post === 'string' ? `User Design ${idx + 1}` : (post.title || `User Design ${idx + 1}`);
                const price = typeof post === 'string' ? 'Custom' : `Rs. ${post.price || 0}`;
                const isNew = typeof post === 'object' && post.isNew;

                return (
                  <div key={idx} className="trending-product-card" onClick={() => handleProductClick(post)}>
                    <div className="trending-product-image-wrap">
                      <img src={imgSrc} alt={title} className="trending-product-image" loading="lazy" />
                      <button className="trending-product-favorite">
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

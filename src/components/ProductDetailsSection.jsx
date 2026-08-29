import React, { useState, useEffect } from 'react';
import { Heart, Star, Lightbulb, Minus, Plus, Truck, RefreshCcw, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';
import { repairImageUrl, DEFAULT_POST_PLACEHOLDER } from '../constants';
import { addToCart } from '../lib/cart';

/** Real images for a product, de-duplicated. Never padded out to a fixed count. */
function getProductImages(product) {
  const raw = typeof product === 'string'
    ? [product]
    : (Array.isArray(product?.images) && product.images.length > 0 ? product.images : [product?.url]);

  const seen = new Set();
  const images = [];
  for (const item of raw) {
    if (!item) continue;
    const fixed = repairImageUrl(item);
    if (seen.has(fixed)) continue;
    seen.add(fixed);
    images.push(fixed);
  }
  return images;
}

function productKey(item) {
  if (!item) return '';
  if (typeof item === 'string') return item;
  return item.id || item.url || item.title || '';
}

export default function ProductDetailsSection({
  activeSection, product, handleSectionClick, onNotify, posts, onNavigate,
}) {
  const [selectedSize, setSelectedSize] = useState('M');
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(null);
  const [slideDirection, setSlideDirection] = useState(null);

  const isOpen = activeSection === 'product-details' && !!product;
  const list = Array.isArray(posts) ? posts : [];
  const currentIndex = list.findIndex((item) => productKey(item) === productKey(product));

  const goToSibling = React.useCallback((delta) => {
    if (currentIndex < 0) return false;
    const next = list[currentIndex + delta];
    if (!next) return false;
    setSlideDirection(delta > 0 ? 'next' : 'prev');
    onNavigate?.(next);
    return true;
  }, [currentIndex, list, onNavigate]);

  // Arrow keys on desktop, wheel / vertical swipe on touch.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.target?.closest?.('input, textarea, select')) return;
      if (e.key === 'ArrowDown') { if (goToSibling(1)) e.preventDefault(); }
      else if (e.key === 'ArrowUp') { if (goToSibling(-1)) e.preventDefault(); }
    };

    let lastMove = 0;
    const throttled = (delta) => {
      const now = Date.now();
      if (now - lastMove < 650) return false;
      const moved = goToSibling(delta);
      if (moved) lastMove = now;
      return moved;
    };

    // Only swap ads at the scroll edges, otherwise a normal swipe to read the
    // page would jump away from the product the user is still looking at.
    const atBottom = () => (
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 48
    );
    const atTop = () => window.scrollY <= 12;

    let touchStartY = null;
    const onTouchStart = (e) => { touchStartY = e.touches[0]?.clientY ?? null; };
    const onTouchEnd = (e) => {
      if (touchStartY === null) return;
      const endY = e.changedTouches[0]?.clientY ?? touchStartY;
      const diff = touchStartY - endY;
      touchStartY = null;
      if (Math.abs(diff) < 70) return;
      if (diff > 0 && atBottom()) throttled(1);
      else if (diff < 0 && atTop()) throttled(-1);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isOpen, goToSibling]);

  // Clear the slide class once the animation has played.
  useEffect(() => {
    if (!slideDirection) return;
    const timer = window.setTimeout(() => setSlideDirection(null), 400);
    return () => window.clearTimeout(timer);
  }, [slideDirection, product]);

  useEffect(() => {
    if (product) {
      setActiveImage(getProductImages(product)[0] || null);
    }
  }, [product]);

  if (activeSection !== 'product-details' || !product) return null;

  const title = typeof product === 'string' ? 'Custom Design' : (product.title || 'Custom Design');
  const price = typeof product === 'string' ? 'Custom' : `Rs. ${product.price || 0}`;
  const isNew = typeof product === 'object' && product.isNew;

  // Show exactly what was uploaded — no padding, no duplicates.
  const images = getProductImages(product);

  const handleAddToCart = () => {
    const { added } = addToCart({
      id: typeof product === 'object' ? (product.id || product.url || product.title) : product,
      title,
      price: typeof product === 'object' ? Number(product.price || 0) : 0,
      image: images[0],
      size: selectedSize,
      color: (typeof product === 'object' && product.color) || '—',
    }, qty);

    onNotify?.(added ? `${title} added to cart.` : `${title} is already in your cart.`);
  };

  return (
    <section id="product-details" className={`section ${activeSection === 'product-details' ? 'active' : 'hidden'}`}>
      <div className="dashboard-overview-container" style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '20px' }}>
        
        <button type="button" className="section-back-btn" onClick={(e) => handleSectionClick(e, 'home')}>
          <span className="section-back-icon"><ArrowLeft size={17} /></span>
          <span>Back to Home</span>
        </button>

        <div className={`product-modal-content ${slideDirection ? `is-slide-${slideDirection}` : ''}`} key={productKey(product)} style={{ maxWidth: '100%', margin: '0', boxShadow: 'none', borderRadius: '24px', padding: '0', border: '1px solid var(--border-color)', overflow: 'hidden', maxHeight: 'none' }}>
          
          <div className="product-modal-body" style={{ padding: '40px' }}>
            {/* Left Gallery */}
            <div className="product-modal-gallery">
              {images.length > 1 && (
                <div className="product-thumbnails">
                  {images.map((img, i) => (
                    <div
                      key={img}
                      className={`thumbnail-img-wrap ${activeImage === img ? 'active' : ''}`}
                      onClick={() => setActiveImage(img)}
                    >
                      {img.startsWith('data:video') || img.match(/\.(mp4|webm)$/) ? (
                        <video src={img} />
                      ) : (
                        <img src={img} alt={`Thumb ${i+1}`} onError={(e) => { e.currentTarget.src = DEFAULT_POST_PLACEHOLDER; }} />
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div className="product-main-image-wrap">
                {activeImage && (activeImage.startsWith('data:video') || activeImage.match(/\.(mp4|webm)$/)) ? (
                  <video src={activeImage} autoPlay loop muted className="product-main-image" />
                ) : (
                  <img src={activeImage} alt="Main Product" className="product-main-image" onError={(e) => { e.currentTarget.src = DEFAULT_POST_PLACEHOLDER; }} />
                )}
                <button className="main-image-favorite">
                  <Heart size={20} />
                </button>
                <button className="ai-try-on-btn">
                  <Sparkles size={16} /> AI Try-On
                </button>
              </div>
            </div>

            {/* Right Info */}
            <div className="product-modal-info">
              <h2 className="pm-title">{title}</h2>
              <div className="pm-price-row">
                <span className="pm-price">{price}</span>
                <span className="pm-badge">In Stock</span>
              </div>
              
              <div className="pm-rating">
                {isNew ? (
                  <span className="pm-new-text" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '600' }}>
                    <Star size={16} fill="#FFD700" color="#FFD700" /> New
                  </span>
                ) : (
                  <>
                    <Star size={16} fill="#FFD700" color="#FFD700" />
                    <span className="pm-rating-text">4.9 (234 reviews)</span>
                  </>
                )}
              </div>

              <div className="pm-ai-suggestion">
                <Lightbulb size={18} className="ai-icon" />
                <p>Looks great with light jeans and white sneakers.</p>
              </div>

              <div className="pm-selectors">
                <div className="pm-size-selector">
                  <h4>Size</h4>
                  <div className="size-options">
                    {['S', 'M', 'L', 'XL'].map(s => (
                      <button 
                        key={s} 
                        className={`size-btn ${selectedSize === s ? 'active' : ''}`}
                        onClick={() => setSelectedSize(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pm-qty-selector">
                  <h4>Qty</h4>
                  <div className="qty-controls">
                    <button onClick={() => setQty(q => Math.max(1, q - 1))}><Minus size={16} /></button>
                    <span>{qty}</span>
                    <button onClick={() => setQty(q => q + 1)}><Plus size={16} /></button>
                  </div>
                </div>
              </div>

              <div className="pm-actions">
                <button className="pm-add-to-cart" type="button" onClick={handleAddToCart}>
                  Add to Cart
                </button>
                <button className="pm-wishlist-btn">
                  <Heart size={18} color="#7f58ff" /> Wishlist
                </button>
              </div>

              <div className="pm-footer-badges">
                <div className="badge-item">
                  <Truck size={16} /> Free Delivery
                </div>
                <div className="badge-item">
                  <RefreshCcw size={16} /> 7 Days Return
                </div>
                <div className="badge-item">
                  <ShieldCheck size={16} /> Secure Payment
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

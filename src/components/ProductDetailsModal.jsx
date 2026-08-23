import React, { useState } from 'react';
import { Heart, Star, Lightbulb, Minus, Plus, Truck, RefreshCcw, ShieldCheck, X, Sparkles } from 'lucide-react';

export default function ProductDetailsModal({ product, onClose }) {
  if (!product) return null;

  const title = typeof product === 'string' ? 'Custom Design' : (product.title || 'Custom Design');
  const price = typeof product === 'string' ? 'Custom' : `Rs. ${product.price || 0}`;
  let images = typeof product === 'string' ? [product] : (product.images && product.images.length > 0 ? product.images : [product.url]);
  const isNew = typeof product === 'object' && product.isNew;

  // Make sure we have at least 3 thumbnails for the layout if the user uploaded less
  if (images.length === 1) {
    images = [images[0], images[0], images[0]];
  } else if (images.length === 2) {
    images = [images[0], images[1], images[0]];
  }

  const [selectedSize, setSelectedSize] = useState('M');
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="product-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="product-modal-close" onClick={onClose}>
          <X size={20} />
        </button>
        
        <div className="product-modal-body">
          {/* Left Gallery */}
          <div className="product-modal-gallery">
            <div className="product-thumbnails">
              {images.slice(0, 3).map((img, i) => (
                <div 
                  key={i} 
                  className={`thumbnail-img-wrap ${activeImage === img ? 'active' : ''}`}
                  onClick={() => setActiveImage(img)}
                >
                  {img.startsWith('data:video') || img.match(/\.(mp4|webm)$/) ? (
                    <video src={img} />
                  ) : (
                    <img src={img} alt={`Thumb ${i+1}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="product-main-image-wrap">
              {activeImage.startsWith('data:video') || activeImage.match(/\.(mp4|webm)$/) ? (
                <video src={activeImage} autoPlay loop muted className="product-main-image" />
              ) : (
                <img src={activeImage} alt="Main Product" className="product-main-image" />
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
              <button className="pm-add-to-cart">
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
  );
}

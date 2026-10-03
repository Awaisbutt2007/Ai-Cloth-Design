import React, { useEffect, useMemo, useState } from 'react';
import {
  ShoppingCart, Trash2, Heart, Minus, Plus, ArrowLeft, ShieldCheck,
  ClipboardList, ShoppingBag, AlertCircle,
} from 'lucide-react';
import {
  useCart, setQty, toggleSelected, setAllSelected, removeFromCart, clearCart, addToCart, getCartCount,
} from '../lib/cart';
import { CATALOG } from '../lib/catalog';
import { toggleLike, isLiked } from '../lib/reactions';
import PostImage from './PostImage';

const SHIPPING_FLAT = 4.99;

function money(value) {
  return `$${Number(value || 0).toFixed(2)}`;
}

function AddToCartSection({ activeSection, handleSectionClick, handleProductClick, onNotify }) {
  const items = useCart();

  const [removedPostIds, setRemovedPostIds] = useState(() => {
    try {
      return new Set(JSON.parse(window.localStorage.getItem('aifashionRemovedPostIds') || '[]'));
    } catch (e) {
      return new Set();
    }
  });

  useEffect(() => {
    const refreshRemoved = () => {
      try {
        setRemovedPostIds(new Set(JSON.parse(window.localStorage.getItem('aifashionRemovedPostIds') || '[]')));
      } catch (e) {
        setRemovedPostIds(new Set());
      }
    };
    window.addEventListener('storage', refreshRemoved);
    window.addEventListener('aifashion-posts-updated', refreshRemoved);
    return () => {
      window.removeEventListener('storage', refreshRemoved);
      window.removeEventListener('aifashion-posts-updated', refreshRemoved);
    };
  }, []);

  const catalogIds = useMemo(() => new Set(CATALOG.map((p) => p.id)), []);

  const isDeleted = (item) => {
    if (!item || !item.id) return false;
    if (catalogIds.has(item.id)) return false;
    if (removedPostIds.has(item.id)) return true;
    try {
      const itemUrl = item.image || item.url || item.id;
      const globalPosts = JSON.parse(window.localStorage.getItem('aifashionGlobalPosts') || '[]');
      const allStats = JSON.parse(window.localStorage.getItem('aifashionProfileStats') || '{}');
      const allProfilePosts = Object.values(allStats || {}).flatMap((s) => s?.postImages || []);
      const matchAny = (source) => {
        if (!Array.isArray(source)) return false;
        return source.some((p) => {
          const pid = typeof p === 'object' ? (p.id || p.url || p.image_url || p.image || p.title) : p;
          const purl = typeof p === 'object' ? (p.url || p.image_url || p.image || p.id) : p;
          return pid === item.id || String(purl || '') === String(itemUrl || '');
        });
      };
      if (matchAny(globalPosts)) return false;
      if (matchAny(allProfilePosts)) return false;
      if (!globalPosts.length && !allProfilePosts.length) return false;
      return true;
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    if (!items.length) return;
    let dirty = false;
    const next = items.map((item) => {
      if (isDeleted(item) && item.selected) {
        dirty = true;
        return { ...item, selected: false };
      }
      return item;
    });
    if (dirty) {
      try {
        window.localStorage.setItem('aifashionCart', JSON.stringify(next));
        window.dispatchEvent(new Event('aifashion-cart-updated'));
      } catch (e) {}
    }
  }, [items, removedPostIds]);

  const selectableItems = items.filter((it) => !isDeleted(it));
  const selected = selectableItems.filter((item) => item.selected);
  const allSelected = selectableItems.length > 0 && selected.length === selectableItems.length;
  const subtotal = selected.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = selected.length ? SHIPPING_FLAT : 0;
  const total = subtotal + shipping;

  const inCartIds = new Set(items.map((item) => item.id));
  const suggestions = CATALOG.filter((product) => !inCartIds.has(product.id)).slice(0, 4);

  const removeSelected = () => {
    if (!selected.length) return;
    removeFromCart(selected.map((item) => item.id));
    onNotify?.(`${selected.length} item${selected.length > 1 ? 's' : ''} removed.`);
  };

  return (
    <section id="add-to-cart" className={`section cart-section ${activeSection === 'add-to-cart' ? 'active' : 'hidden'}`}>
      <header className="cart-header">
        <div className="cart-heading">
          <h1>My Cart</h1>
          <span className="cart-count-pill">
            <ShoppingCart size={17} />
            <span>{getCartCount(items)}</span>
          </span>
        </div>
        <nav className="cart-breadcrumb" aria-label="Breadcrumb">
          <button type="button" onClick={(e) => handleSectionClick?.(e, 'home')}>Home</button>
          <span>&gt;</span>
          <span aria-current="page">Add to Cart</span>
        </nav>
      </header>

      {items.length === 0 ? (
        <div className="cart-empty">
          <ShoppingBag size={34} />
          <p>Your cart is empty</p>
          <span>Browse the catalogue and add a few styles you like.</span>
          <button type="button" onClick={(e) => handleSectionClick?.(e, 'home')}>Start shopping</button>
        </div>
      ) : (
        <>
          <div className="cart-toolbar">
            <label className="cart-check">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={() => {
                  const nextVal = !allSelected;
                  setAllSelected(nextVal);
                  if (!nextVal) return;
                  try {
                    const current = JSON.parse(window.localStorage.getItem('aifashionCart') || '[]');
                    const fixed = (Array.isArray(current) ? current : []).map((it) => (
                      isDeleted(it) ? { ...it, selected: false } : it
                    ));
                    window.localStorage.setItem('aifashionCart', JSON.stringify(fixed));
                    window.dispatchEvent(new Event('aifashion-cart-updated'));
                  } catch (e) {}
                }}
              />
              <span className="cart-check-box" aria-hidden="true" />
              <span>Select All ({selectableItems.length}{items.length > selectableItems.length ? ` / ${items.length}` : ''})</span>
            </label>
            <button
              type="button"
              className="cart-remove-selected"
              onClick={removeSelected}
              disabled={!selected.length}
            >
              <Trash2 size={15} /> Remove Selected
            </button>
          </div>

          <div className="cart-layout">
            <div className="cart-items">
              {items.map((item) => {
                const deleted = isDeleted(item);
                return (
                  <article className={`cart-item ${item.selected ? 'is-selected' : ''} ${deleted ? 'is-deleted' : ''}`} key={item.id}>
                    <label className="cart-check cart-item-check">
                      <input
                        type="checkbox"
                        checked={deleted ? false : !!item.selected}
                        onChange={() => !deleted && toggleSelected(item.id)}
                        disabled={deleted}
                        aria-label={`Select ${item.title}`}
                      />
                      <span className="cart-check-box" aria-hidden="true" />
                    </label>

                    <div className="cart-item-media">
                      <PostImage src={item.image} alt={item.title} />
                    </div>

                    <div className="cart-item-info">
                      <h3>{item.title}</h3>
                      <p className="cart-item-meta">
                        <span>Size: {item.size}</span>
                        <span className="cart-item-sep">|</span>
                        <span>Color: {item.color}</span>
                      </p>
                      {deleted ? (
                        <>
                          <p className="cart-item-stock is-out">Unavailable</p>
                          <div>
                            <p className="cart-item-deleted-note" role="status">
                              <AlertCircle size={14} /> This post has been deleted.
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <p className={`cart-item-stock ${item.inStock ? '' : 'is-out'}`}>
                            {item.inStock ? 'In Stock' : 'Out of Stock'}
                          </p>
                          <button
                            type="button"
                            className="cart-item-wishlist"
                            onClick={() => { if (!isLiked(item)) toggleLike(item); removeFromCart(item.id); onNotify?.(`${item.title} moved to wishlist.`); }}
                          >
                            <Heart size={15} /> Move to Wishlist
                          </button>
                        </>
                      )}
                    </div>

                    <div className="cart-item-actions">
                      <div className="cart-item-price-row">
                        <span className="cart-item-price">{money(item.price * item.qty)}</span>
                        <button
                          type="button"
                          className="cart-item-delete"
                          onClick={() => { removeFromCart(item.id); onNotify?.(`${item.title} removed.`); }}
                          aria-label={`Remove ${item.title}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="cart-stepper">
                        <button
                          type="button"
                          onClick={() => setQty(item.id, item.qty - 1)}
                          disabled={deleted || item.qty <= 1}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={15} />
                        </button>
                        <span aria-live="polite">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => setQty(item.id, item.qty + 1)}
                          disabled={deleted}
                          aria-label="Increase quantity"
                        >
                          <Plus size={15} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}

              <div className="cart-footer-actions">
                <button type="button" className="cart-continue" onClick={(e) => handleSectionClick?.(e, 'search')}>
                  <ArrowLeft size={16} /> Continue Shopping
                </button>
                <button type="button" className="cart-clear" onClick={() => { clearCart(); onNotify?.('Cart cleared.'); }}>
                  Clear Cart <Trash2 size={16} />
                </button>
              </div>
            </div>

            <aside className="cart-rail">
              <div className="cart-panel cart-summary">
                <h2><ClipboardList size={18} /> Order Summary</h2>

                <div className="cart-summary-row">
                  <span>Subtotal ({selected.length} item{selected.length === 1 ? '' : 's'})</span>
                  <span>{money(subtotal)}</span>
                </div>
                <div className="cart-summary-row">
                  <span>Shipping</span>
                  <span>{money(shipping)}</span>
                </div>

                <div className="cart-summary-divider" />

                <div className="cart-summary-total">
                  <span>Total</span>
                  <strong>{money(total)}</strong>
                </div>

                <button
                  type="button"
                  className="cart-checkout"
                  disabled={!selected.length}
                  onClick={() => onNotify?.('Checkout is not wired up yet.')}
                >
                  <ShoppingBag size={18} /> Proceed to Checkout
                </button>

                <div className="cart-secure">
                  <ShieldCheck size={20} />
                  <div>
                    <strong>Secure Checkout</strong>
                    <small>100% secure payment</small>
                  </div>
                </div>
              </div>

              {suggestions.length > 0 && (
                <div className="cart-panel">
                  <div className="cart-panel-head">
                    <span>You May Also Like</span>
                    <button type="button" onClick={(e) => handleSectionClick?.(e, 'search')}>View All</button>
                  </div>
                  <div className="cart-suggestions">
                    {suggestions.map((product) => (
                      <article className="cart-suggestion" key={product.id} onClick={() => handleProductClick?.(product)}>
                        <div className="cart-suggestion-media">
                          <PostImage src={product.image} alt={product.title} />
                        </div>
                        <h4>{product.title}</h4>
                        <div className="cart-suggestion-row">
                          <span>{money(product.price)}</span>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); const { added } = addToCart(product); onNotify?.(added ? `${product.title} added to cart.` : `${product.title} is already in your cart.`); }}
                            aria-label={`Add ${product.title} to cart`}
                          >
                            <ShoppingCart size={14} />
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </>
      )}
    </section>
  );
}

export default AddToCartSection;

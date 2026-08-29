import { useEffect, useState } from 'react';

const CART_KEY = 'aifashionCart';
export const CART_UPDATED_EVENT = 'aifashion-cart-updated';

export function getCart() {
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function persist(items) {
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
  return items;
}

/**
 * Adds a product. Returns { added } — `added: false` means it was already in
 * the cart, so the caller can say so instead of silently bumping the quantity.
 */
export function addToCart(product, qty = 1) {
  const source = typeof product === 'string' ? { url: product } : (product || {});
  const id = source.id || source.url || source.title;
  if (!id) return { added: false, reason: 'invalid' };

  const amount = Math.max(1, Number(qty) || 1);
  const items = getCart();

  if (items.some((item) => item.id === id)) {
    return { added: false, reason: 'duplicate' };
  }

  const image = source.image
    || source.url
    || (Array.isArray(source.images) ? source.images[0] : '')
    || '';

  persist([
    ...items,
    {
      id,
      title: source.title || 'Untitled design',
      price: Number(source.price || 0),
      image,
      size: source.size || 'One Size',
      color: source.color || '—',
      inStock: source.inStock !== false,
      qty: amount,
      selected: true,
    },
  ]);

  return { added: true };
}

export function setQty(id, qty) {
  const next = getCart().map((item) => (
    item.id === id ? { ...item, qty: Math.max(1, Number(qty) || 1) } : item
  ));
  return persist(next);
}

export function toggleSelected(id) {
  const next = getCart().map((item) => (
    item.id === id ? { ...item, selected: !item.selected } : item
  ));
  return persist(next);
}

export function setAllSelected(selected) {
  return persist(getCart().map((item) => ({ ...item, selected })));
}

export function removeFromCart(ids) {
  const removing = new Set(Array.isArray(ids) ? ids : [ids]);
  return persist(getCart().filter((item) => !removing.has(item.id)));
}

export function clearCart() {
  return persist([]);
}

export function getCartCount(items = getCart()) {
  return items.reduce((total, item) => total + Number(item.qty || 1), 0);
}

/** Keeps a component in sync with the cart, including changes from other tabs. */
export function useCart() {
  const [items, setItems] = useState(getCart);

  useEffect(() => {
    const sync = () => setItems(getCart());
    window.addEventListener(CART_UPDATED_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return items;
}

import React, { useMemo, useState } from 'react';
import {
  Search, Sparkles, SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight,
  Heart, ShoppingCart, LayoutGrid, List, Rows3, Flame, Clock,
} from 'lucide-react';
import {
  CATALOG, FILTER_COLORS, SORT_OPTIONS, POPULAR_SEARCHES, getProductTags,
} from '../lib/catalog';
import { CATEGORY_GROUPS } from './CategorySelect';
import { addToCart } from '../lib/cart';
import { useLikedPostIds, toggleLike } from '../lib/reactions';
import { repairImageUrl } from '../constants';
import PostImage from './PostImage';

const PAGE_SIZE = 8;
const MAX_PRICE = 500;
const MIN_PRICE = 10;

/** Turn a stored/remote post into the shape the grid renders. */
function normalizePost(post) {
  if (typeof post === 'string') {
    return { id: post, title: 'Custom Design', price: 0, image: post, popularity: 0, rating: 0, createdAt: '', raw: post };
  }
  return {
    id: post.id || post.url || post.title,
    title: post.title || 'Custom Design',
    price: Number(post.price || 0),
    image: repairImageUrl(post.url || post.image_url || (Array.isArray(post.images) ? post.images[0] : '')),
    category: post.category,
    color: post.color || '',
    popularity: Number(post.views || 0),
    rating: Number(post.rating || 0),
    createdAt: post.date || post.created_at || '',
    raw: post,
  };
}

function readRecentlyViewed() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem('aifashionRecentlyViewed') || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function ProductCard({ product, isFavourite, onToggleFavourite, onAdd, onOpen }) {
  const [pulse, setPulse] = useState(null);

  const handleFav = (e) => {
    e.stopPropagation();
    setPulse(isFavourite ? 'unlike' : 'like');
    window.setTimeout(() => setPulse(null), 460);
    onToggleFavourite(product.id);
  };

  return (
    <article className="explore-card" onClick={() => onOpen(product)}>
      <div className="explore-card-media">
        <PostImage src={product.image} alt={product.title} className="explore-card-image" />
        <button
          type="button"
          className={`explore-card-fav ${isFavourite ? 'is-active' : ''} ${pulse ? `is-${pulse}-pulse` : ''}`}
          onClick={handleFav}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          aria-pressed={isFavourite}
        >
          <Heart size={16} fill={isFavourite ? '#ff5277' : 'none'} color={isFavourite ? '#ff5277' : 'currentColor'} />
        </button>
      </div>
      <div className="explore-card-body">
        <h3 className="explore-card-title">{product.title}</h3>
        <div className="explore-card-row">
          <span className="explore-card-price">${Number(product.price || 0).toFixed(2)}</span>
          <button
            type="button"
            className="explore-card-cart"
            onClick={(e) => { e.stopPropagation(); onAdd(product); }}
            aria-label={`Add ${product.title} to cart`}
          >
            <ShoppingCart size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}

function FilterGroup({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`explore-filter-group ${open ? 'is-open' : ''}`}>
      <button type="button" className="explore-filter-head" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span>{title}</span>
        <ChevronDown size={16} />
      </button>
      {open && <div className="explore-filter-body">{children}</div>}
    </div>
  );
}

function SearchExploreSection({ activeSection, handleProductClick, handleSectionClick, onNotify, posts }) {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [colors, setColors] = useState([]);
  const [sortBy, setSortBy] = useState('popular');
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const likedPostIds = useLikedPostIds();

  // Real uploaded posts come first, demo catalogue fills the rest of the grid.
  const userProducts = useMemo(
    () => (Array.isArray(posts) ? posts : []).map(normalizePost).filter((p) => p.id && p.image),
    [posts],
  );

  const allProducts = useMemo(() => {
    const seen = new Set(userProducts.map((p) => p.id));
    return [...userProducts, ...CATALOG.filter((p) => !seen.has(p.id))];
  }, [userProducts]);

  const trending = useMemo(
    () => [...userProducts].sort((a, b) => b.popularity - a.popularity).slice(0, 4),
    [userProducts],
  );

  // Read fresh on every render, exactly like the Home section does, so a product
  // viewed a moment ago is already here when the user comes back.
  const recentlyViewed = readRecentlyViewed().map(normalizePost).filter((p) => p.image).slice(0, 3);

  const toggleTag = (value) => {
    setSelectedTags((current) => (
      current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
    ));
    setPage(1);
  };

  const results = useMemo(() => {
    const term = submittedQuery.trim().toLowerCase();

    const filtered = allProducts.filter((product) => {
      if (term && !`${product.title} ${product.category || ''} ${product.color || ''}`.toLowerCase().includes(term)) return false;
      if (selectedTags.length) {
        const tags = getProductTags(product);
        if (!selectedTags.some((tag) => tags.includes(tag))) return false;
      }
      if (Number(product.price || 0) > maxPrice) return false;
      if (colors.length && !colors.includes(product.color)) return false;
      return true;
    });

    const sorted = [...filtered];
    if (sortBy === 'price-low') sorted.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') sorted.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    else if (sortBy === 'newest') sorted.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
    else sorted.sort((a, b) => b.popularity - a.popularity);

    return sorted;
  }, [allProducts, submittedQuery, selectedTags, maxPrice, colors, sortBy]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const openProduct = (product) => handleProductClick?.(product.raw || product);

  const handleAdd = (product) => {
    const { added } = addToCart(product);
    onNotify?.(added ? `${product.title} added to cart.` : `${product.title} is already in your cart.`);
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setMaxPrice(MAX_PRICE);
    setColors([]);
    setSubmittedQuery('');
    setQuery('');
    setPage(1);
  };

  const pageNumbers = totalPages <= 4
    ? Array.from({ length: totalPages }, (_, i) => i + 1)
    : [1, 2, 3, '…', totalPages];

  return (
    <section id="search" className={`section explore-section ${activeSection === 'search' ? 'active' : 'hidden'}`}>
      <header className="explore-header">
        <h1 className="explore-title">Search &amp; Explore</h1>
        <p className="explore-subtitle">Discover the latest styles, outfits and fashion ideas made for you.</p>
      </header>

      <form
        className="explore-searchbar"
        onSubmit={(e) => { e.preventDefault(); setSubmittedQuery(query); setPage(1); }}
      >
        <Search size={19} className="explore-searchbar-icon" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for clothes, brands, categories..."
          aria-label="Search for clothes, brands, categories"
        />
        <button type="submit" className="explore-searchbar-btn">Search</button>
      </form>

      <div className="explore-popular">
        <span className="explore-popular-label">Popular Searches:</span>
        {POPULAR_SEARCHES.map((term) => (
          <button
            type="button"
            key={term}
            className={`explore-chip ${submittedQuery === term ? 'is-active' : ''}`}
            onClick={() => { setQuery(term); setSubmittedQuery(term); setPage(1); }}
          >
            {term}
          </button>
        ))}
        <button
          type="button"
          className="explore-chip is-ai"
          onClick={() => { setSortBy('rating'); setPage(1); onNotify?.('Showing AI recommended picks.'); }}
        >
          <Sparkles size={13} /> AI Recommended
        </button>
      </div>

      <div className="explore-layout">
        {/* ── Filters: same groups as the upload form's Category dropdown ── */}
        <aside className="explore-filters">
          <div className="explore-filters-head">
            <span><Sparkles size={15} /> Filters</span>
            <button type="button" onClick={clearFilters} title="Clear all filters" aria-label="Clear all filters">
              <SlidersHorizontal size={15} />
            </button>
          </div>

          {CATEGORY_GROUPS.map((group) => (
            <FilterGroup title={group.label} key={group.label}>
              {group.options.map((option) => (
                <label className="explore-check" key={option.value}>
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(option.value)}
                    onChange={() => toggleTag(option.value)}
                  />
                  <span className="explore-check-box" aria-hidden="true" />
                  <span className="explore-check-label">{option.label}</span>
                </label>
              ))}
            </FilterGroup>
          ))}

          <FilterGroup title="Price Range">
            <input
              type="range"
              className="explore-range"
              min={MIN_PRICE}
              max={MAX_PRICE}
              value={maxPrice}
              onChange={(e) => { setMaxPrice(Number(e.target.value)); setPage(1); }}
              aria-label="Maximum price"
            />
            <div className="explore-range-labels">
              <span>${MIN_PRICE}</span>
              <span>${maxPrice}</span>
            </div>
          </FilterGroup>

          <FilterGroup title="Colors">
            <div className="explore-colors">
              {FILTER_COLORS.map((item) => (
                <button
                  type="button"
                  key={item.value}
                  className={`explore-color ${colors.includes(item.value) ? 'is-active' : ''}`}
                  style={{ '--swatch': item.hex }}
                  onClick={() => {
                    setColors((c) => (c.includes(item.value) ? c.filter((v) => v !== item.value) : [...c, item.value]));
                    setPage(1);
                  }}
                  aria-label={item.value}
                  aria-pressed={colors.includes(item.value)}
                />
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Sort By">
            <div className="explore-native-select">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort results">
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <ChevronDown size={15} />
            </div>
          </FilterGroup>
        </aside>

        {/* ── Results ── */}
        <div className="explore-results">
          <div className="explore-results-bar">
            <span className="explore-results-count">Showing {results.length} Results</span>

            <div className="explore-results-tools">
              <span className="explore-sort-label">Sort by:</span>
              <div className={`explore-sort ${showSortMenu ? 'is-open' : ''}`}>
                <button type="button" className="explore-sort-trigger" onClick={() => setShowSortMenu((o) => !o)}>
                  {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
                  <ChevronDown size={14} />
                </button>
                {showSortMenu && (
                  <div className="explore-sort-menu">
                    {SORT_OPTIONS.map((option) => (
                      <button
                        type="button"
                        key={option.value}
                        className={option.value === sortBy ? 'is-active' : ''}
                        onClick={() => { setSortBy(option.value); setShowSortMenu(false); }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="explore-view-toggle" role="group" aria-label="Result layout">
                <button type="button" className={view === 'compact' ? 'is-active' : ''} onClick={() => setView('compact')} aria-label="Compact view"><Rows3 size={16} /></button>
                <button type="button" className={view === 'grid' ? 'is-active' : ''} onClick={() => setView('grid')} aria-label="Grid view"><LayoutGrid size={16} /></button>
                <button type="button" className={view === 'list' ? 'is-active' : ''} onClick={() => setView('list')} aria-label="List view"><List size={16} /></button>
              </div>
            </div>
          </div>

          {visible.length > 0 ? (
            <div className={`explore-grid is-${view}`}>
              {visible.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavourite={likedPostIds.has(product.id)}
                  onToggleFavourite={() => toggleLike(product.raw || product)}
                  onAdd={handleAdd}
                  onOpen={openProduct}
                />
              ))}
            </div>
          ) : (
            <div className="explore-empty">
              <Search size={30} />
              <p>No results found</p>
              <span>Try a different search or clear your filters.</span>
              <button type="button" onClick={clearFilters}>Clear filters</button>
            </div>
          )}

          {results.length > 0 && (
            <nav className="explore-pagination" aria-label="Results pages">
              <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} aria-label="Previous page">
                <ChevronLeft size={16} />
              </button>
              {pageNumbers.map((num, i) => (
                num === '…' ? (
                  <span className="explore-page-gap" key={`gap-${i}`}>…</span>
                ) : (
                  <button
                    type="button"
                    key={num}
                    className={num === currentPage ? 'is-active' : ''}
                    onClick={() => setPage(num)}
                  >
                    {num}
                  </button>
                )
              ))}
              <button type="button" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} aria-label="Next page">
                <ChevronRight size={16} />
              </button>
            </nav>
          )}
        </div>

        {/* ── Right rail ── */}
        <aside className="explore-rail">
          <div className="explore-panel">
            <div className="explore-panel-head">
              <span><Flame size={15} /> Trending Now</span>
              <button type="button" onClick={() => { setSortBy('popular'); setPage(1); }}>View All</button>
            </div>
            {trending.length > 0 ? (
              <ul className="explore-trending">
                {trending.map((product) => (
                  <li key={product.id}>
                    <button type="button" onClick={() => openProduct(product)}>
                      <span className="explore-trending-thumb">
                        <PostImage src={product.image} alt={product.title} />
                      </span>
                      <span className="explore-trending-text">
                        <strong>{product.title}</strong>
                        <small>{product.popularity} view{product.popularity === 1 ? '' : 's'}</small>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="explore-panel-empty">No posts yet. Upload a design and it will show up here.</p>
            )}
          </div>

          <div className="explore-panel explore-ai-finder">
            <div className="explore-ai-copy">
              <span className="explore-ai-tag"><Sparkles size={14} /> AI Style Finder</span>
              <p>Upload your photo and let AI find perfect outfits for you.</p>
              <button type="button" onClick={(e) => handleSectionClick?.(e, 'ai-scan')}>Try Now</button>
            </div>
          </div>

          <div className="explore-panel">
            <div className="explore-panel-head">
              <span><Clock size={15} /> Recently Viewed</span>
              <button type="button" onClick={() => { setSortBy('newest'); setPage(1); }}>View All</button>
            </div>
            {recentlyViewed.length > 0 ? (
              <div className="explore-recent">
                {recentlyViewed.map((product) => (
                  <button type="button" key={product.id} onClick={() => openProduct(product)} aria-label={product.title}>
                    <PostImage src={product.image} alt={product.title} />
                  </button>
                ))}
              </div>
            ) : (
              <p className="explore-panel-empty">Nothing viewed yet.</p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}

export default SearchExploreSection;

export const designs = [
  {
    title: 'Solar Shift',
    category: 'Ready-to-Wear',
    mood: 'Futuristic street style with reflective layers and bold silhouettes.',
    palette: 'Amber, charcoal, neon green',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Velvet Noir',
    category: 'Evening Wear',
    mood: 'Minimal elegance with soft velvet textures and architectural cutouts.',
    palette: 'Midnight blue, pearl, satin gold',
    image: 'https://images.unsplash.com/photo-1495121605193-b116b5b9c5d6?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Botanical Breeze',
    category: 'Resort Collection',
    mood: 'Organic prints, relaxed tailoring, and airy layers for warm weather.',
    palette: 'Emerald, peach, creamy white',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Chromatic Edge',
    category: 'Streetwear',
    mood: 'High-contrast color blocking, metallic accents, and bold logo details.',
    palette: 'Orange, electric blue, stone',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
  },
];

export const categories = ['Ready-to-Wear', 'Evening Wear', 'Streetwear', 'Resort Collection'];
export const themes = ['Modern Minimal', 'Urban Chic', 'Couture Glam', 'Soft Bohemian'];
export const sales = [
  {
    label: 'New Drop',
    title: 'Neon Nights Capsule',
    detail: '30% off first preview sketches for this weekend.',
  },
  {
    label: 'Limited Sale',
    title: 'Summer Resort Essentials',
    detail: 'Upgrade your palette with exclusive AI color pairings.',
  },
  {
    label: 'Flash Offer',
    title: 'Leather Luxe Edit',
    detail: 'Add refined edge pieces to your collection instantly.',
  },
];

export const settingsOptions = [
  { label: 'Profile privacy', value: 'Public' },
  { label: 'Email notifications', value: 'Weekly updates' },
  { label: 'Auto-save drafts', value: 'Enabled' },
  { label: 'AI assistant', value: 'Style advisor active' },
  { label: 'Release reminders', value: 'On' },
  { label: 'Collection sync', value: 'Live updates' },
];

export const workspaceStats = {
  projects: 48,
  designs: 320,
  downloads: 96,
  favorites: 18,
  storageUsed: 7.2,
  storageTotal: 20,
};

export const workspaceFolders = [
  { id: 'f1', name: 'Streetwear', count: 12, icon: '👕' },
  { id: 'f2', name: 'Summer Collection', count: 8, icon: '☀️' },
  { id: 'f3', name: 'Luxury Brand', count: 20, icon: '✨' },
  { id: 'f4', name: 'Client Projects', count: 15, icon: '💼' },
];

export const workspaceProjects = [
  {
    id: 'p1',
    title: 'Luxury Winter Jacket',
    category: 'Streetwear',
    designs: 12,
    modified: 'Today',
    status: 'Draft',
    lastEdited: '2 hours ago',
    image: 'https://images.unsplash.com/photo-1551028711-00167b16eac5?auto=format&fit=crop&w=600&q=80',
    favorite: true,
    shared: false,
  },
  {
    id: 'p2',
    title: 'Summer Resort Dress',
    category: 'Resort Collection',
    designs: 8,
    modified: 'Yesterday',
    status: 'Completed',
    lastEdited: '1 day ago',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80',
    favorite: false,
    shared: true,
  },
  {
    id: 'p3',
    title: 'Urban Streetwear Set',
    category: 'Streetwear',
    designs: 16,
    modified: '3 days ago',
    status: 'Draft',
    lastEdited: '3 days ago',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80',
    favorite: true,
    shared: false,
  },
  {
    id: 'p4',
    title: 'Evening Gown Collection',
    category: 'Evening Wear',
    designs: 6,
    modified: '1 week ago',
    status: 'Completed',
    lastEdited: '1 week ago',
    image: 'https://images.unsplash.com/photo-1495121605193-b116b5b9c5d6?auto=format&fit=crop&w=600&q=80',
    favorite: false,
    shared: true,
  },
  {
    id: 'p5',
    title: 'Botanical Print Blouse',
    category: 'Ready-to-Wear',
    designs: 4,
    modified: 'Today',
    status: 'Draft',
    lastEdited: '4 hours ago',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
    favorite: true,
    shared: false,
  },
  {
    id: 'p6',
    title: 'Neon Nights Capsule',
    category: 'Streetwear',
    designs: 10,
    modified: '2 days ago',
    status: 'Archived',
    lastEdited: '2 days ago',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80',
    favorite: false,
    shared: false,
  },
];

export const workspaceActivities = [
  { id: 'a1', label: 'Jacket Generated', date: 'Today', icon: '✔' },
  { id: 'a2', label: 'Color Changed', date: 'Today', icon: '✔' },
  { id: 'a3', label: 'Downloaded PNG', date: 'Today', icon: '✔' },
  { id: 'a4', label: 'Project Created', date: 'Yesterday', icon: '✔' },
  { id: 'a5', label: 'Shared with Team', date: 'Yesterday', icon: '✔' },
];

export const workspaceQuickActions = [
  { id: 'qa1', label: 'Quick Generate', icon: '⚡' },
  { id: 'qa2', label: 'Generate Outfit', icon: '🎨' },
  { id: 'qa3', label: 'Recommend Fabric', icon: '🧵' },
  { id: 'qa4', label: 'Color Palette', icon: '🎨' },
  { id: 'qa5', label: 'Tech Pack', icon: '📄' },
  { id: 'qa6', label: 'Create Mockup', icon: '📸' },
];

export const aiFeatures = [
  {
    title: 'Trend intelligence',
    description: 'Spot emerging palettes, silhouettes, and materials across the fashion ecosystem.',
  },
  {
    title: 'Smart collection builder',
    description: 'Automatically assemble coordinated capsules and editorial drops from your brand voice.',
  },
  {
    title: 'Creative assistant',
    description: 'Generate styling notes, fabric pairings, and promo copy with one click.',
  },
  {
    title: 'Performance insights',
    description: 'Measure collection interest, runway resonance, and demand signals in real time.',
  },
];

export const favoriteStats = {
  totalFavorites: 245,
  mostUsed: 52,
  downloads: 980,
  collections: 12,
};

export const favoriteCollections = [
  { id: 'c1', name: 'Best Sellers', icon: '⭐', count: 45 },
  { id: 'c2', name: 'Luxury Collection', icon: '✨', count: 38 },
  { id: 'c3', name: 'Streetwear', icon: '👕', count: 52 },
  { id: 'c4', name: 'Client Favorites', icon: '💼', count: 28 },
  { id: 'c5', name: 'Summer Collection', icon: '☀️', count: 35 },
  { id: 'c6', name: 'Winter Collection', icon: '❄️', count: 47 },
];

export const favoriteDesigns = [
  {
    id: 'f1',
    name: 'Luxury Hoodie',
    category: 'Hoodie',
    collection: 'Luxury',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80',
    prompt: 'Create a luxury oversized hoodie in black with gold accents',
    addedToFavorites: '2 days ago',
    downloads: 124,
    views: 320,
    tags: ['Luxury', 'Black', 'Winter', 'Oversized', 'Minimal'],
    createdDate: '2024-01-15',
    lastModified: '2024-01-18',
    resolution: '4096x4096',
    creditsUsed: 5,
  },
  {
    id: 'f2',
    name: 'Sports Jacket',
    category: 'Jacket',
    collection: 'Sportswear',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80',
    prompt: 'Design a modern sports jacket with breathable fabric',
    addedToFavorites: 'Yesterday',
    downloads: 89,
    views: 245,
    tags: ['Sport', 'Modern', 'Breathable', 'Athletic'],
    createdDate: '2024-01-10',
    lastModified: '2024-01-12',
    resolution: '4096x4096',
    creditsUsed: 4,
  },
  {
    id: 'f3',
    name: 'Summer Dress',
    category: 'Dress',
    collection: 'Summer',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
    prompt: 'Elegant summer dress with floral patterns',
    addedToFavorites: '3 days ago',
    downloads: 156,
    views: 412,
    tags: ['Summer', 'Floral', 'Elegant', 'Lightweight'],
    createdDate: '2024-01-08',
    lastModified: '2024-01-09',
    resolution: '4096x4096',
    creditsUsed: 5,
  },
  {
    id: 'f4',
    name: 'Streetwear Cap',
    category: 'Cap',
    collection: 'Streetwear',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80',
    prompt: 'Urban streetwear cap with bold logo',
    addedToFavorites: '1 week ago',
    downloads: 78,
    views: 198,
    tags: ['Streetwear', 'Urban', 'Bold', 'Logo'],
    createdDate: '2024-01-05',
    lastModified: '2024-01-06',
    resolution: '4096x4096',
    creditsUsed: 3,
  },
  {
    id: 'f5',
    name: 'Premium T-Shirt',
    category: 'T-Shirt',
    collection: 'Luxury',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    prompt: 'Premium cotton t-shirt with minimalist design',
    addedToFavorites: '5 days ago',
    downloads: 203,
    views: 567,
    tags: ['Premium', 'Minimalist', 'Cotton', 'Basic'],
    createdDate: '2024-01-03',
    lastModified: '2024-01-04',
    resolution: '4096x4096',
    creditsUsed: 3,
  },
  {
    id: 'f6',
    name: 'Winter Jacket',
    category: 'Jacket',
    collection: 'Winter',
    image: 'https://images.unsplash.com/photo-1551028711-00167b16eac5?auto=format&fit=crop&w=600&q=80',
    prompt: 'Warm winter jacket with insulation',
    addedToFavorites: '4 days ago',
    downloads: 145,
    views: 389,
    tags: ['Winter', 'Warm', 'Insulated', 'Heavy'],
    createdDate: '2024-01-02',
    lastModified: '2024-01-03',
    resolution: '4096x4096',
    creditsUsed: 5,
  },
];

export const recentlyAdded = [
  { design: 'Luxury Hoodie', added: 'Today' },
  { design: 'Sports Jacket', added: 'Yesterday' },
  { design: 'Summer Dress', added: '3 Days Ago' },
  { design: 'Streetwear Cap', added: '1 Week Ago' },
  { design: 'Premium T-Shirt', added: '5 Days Ago' },
];

export const aiRecommendations = [
  {
    title: 'Because you like Luxury Hoodies',
    suggestions: [
      'Generate Matching Jacket',
      'Create Premium Cap',
      'Create Winter Collection',
      'Generate Similar Design',
    ],
  },
];

export const publishedStats = {
  totalPublished: 156,
  active: 140,
  draftPublications: 10,
  archived: 6,
};

export const platformOverview = [
  { id: 'p1', name: 'Website', designs: 45, icon: '🌐' },
  { id: 'p2', name: 'Shopify', designs: 52, icon: '🛒' },
  { id: 'p3', name: 'Etsy', designs: 18, icon: '🎨' },
  { id: 'p4', name: 'Instagram', designs: 41, icon: '📸' },
];

export const publishedDesigns = [
  {
    id: 'pd1',
    name: 'Luxury Hoodie',
    productType: 'Hoodie',
    publishedDate: '2024-01-15',
    platform: 'Website',
    status: 'Live',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80',
    views: 2450,
    downloads: 310,
    shares: 96,
    clicks: 580,
    publishedBy: 'John Doe',
    visibility: 'Public',
    lastUpdated: '2024-01-18',
    productLink: 'https://example.com/luxury-hoodie',
    orders: 84,
    revenue: 4200,
    conversionRate: 3.4,
  },
  {
    id: 'pd2',
    name: 'Summer Dress',
    productType: 'Dress',
    publishedDate: '2024-01-12',
    platform: 'Shopify',
    status: 'Live',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
    views: 1820,
    downloads: 245,
    shares: 72,
    clicks: 420,
    publishedBy: 'Jane Smith',
    visibility: 'Public',
    lastUpdated: '2024-01-14',
    productLink: 'https://shop.example.com/summer-dress',
    orders: 56,
    revenue: 2800,
    conversionRate: 2.8,
  },
  {
    id: 'pd3',
    name: 'Sports Jacket',
    productType: 'Jacket',
    publishedDate: '2024-01-10',
    platform: 'Etsy',
    status: 'Live',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80',
    views: 1560,
    downloads: 180,
    shares: 45,
    clicks: 320,
    publishedBy: 'John Doe',
    visibility: 'Public',
    lastUpdated: '2024-01-11',
    productLink: 'https://etsy.com/shop/sports-jacket',
    orders: 32,
    revenue: 1600,
    conversionRate: 2.1,
  },
  {
    id: 'pd4',
    name: 'Streetwear Cap',
    productType: 'Cap',
    publishedDate: '2024-01-08',
    platform: 'Instagram',
    status: 'Live',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80',
    views: 3240,
    downloads: 95,
    shares: 156,
    clicks: 780,
    publishedBy: 'Jane Smith',
    visibility: 'Public',
    lastUpdated: '2024-01-09',
    productLink: 'https://instagram.com/p/streetwear-cap',
    orders: 0,
    revenue: 0,
    conversionRate: 0,
  },
  {
    id: 'pd5',
    name: 'Premium T-Shirt',
    productType: 'T-Shirt',
    publishedDate: '2024-01-05',
    platform: 'Website',
    status: 'Scheduled',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    views: 0,
    downloads: 0,
    shares: 0,
    clicks: 0,
    publishedBy: 'John Doe',
    visibility: 'Public',
    lastUpdated: '2024-01-05',
    productLink: '',
    orders: 0,
    revenue: 0,
    conversionRate: 0,
  },
  {
    id: 'pd6',
    name: 'Winter Jacket',
    productType: 'Jacket',
    publishedDate: '2024-01-02',
    platform: 'Shopify',
    status: 'Archived',
    image: 'https://images.unsplash.com/photo-1551028711-00167b16eac5?auto=format&fit=crop&w=600&q=80',
    views: 890,
    downloads: 120,
    shares: 28,
    clicks: 190,
    publishedBy: 'Jane Smith',
    visibility: 'Private',
    lastUpdated: '2024-01-03',
    productLink: 'https://shop.example.com/winter-jacket',
    orders: 18,
    revenue: 900,
    conversionRate: 1.9,
  },
];

export const publishHistory = [
  { date: 'Today', action: 'Published to Website' },
  { date: 'Yesterday', action: 'Shared to Instagram' },
  { date: '3 Days Ago', action: 'Updated Shopify Listing' },
  { date: '1 Week Ago', action: 'Published to Etsy' },
  { date: '2 Weeks Ago', action: 'Archived Old Design' },
];

export const syncStatus = [
  { platform: 'Website', status: 'Synced' },
  { platform: 'Shopify', status: 'Synced' },
  { platform: 'Instagram', status: 'Sync Required' },
  { platform: 'Etsy', status: 'Synced' },
];

// Summer Collection Data
export const summerCollectionStats = {
  totalDesigns: 58,
  categories: 8,
  favorites: 18,
  lastUpdated: 'Today',
  collectionName: 'Summer Collection 2026',
  createdDate: '15 June 2026',
  designCount: 58,
  owner: 'Awais',
};

export const summerCollectionCategories = [
  { id: 'sc1', name: 'Beach Wear', icon: '🏖️', count: 12, color: '#87CEEB' },
  { id: 'sc2', name: 'Casual Wear', icon: '👕', count: 15, color: '#98FB98' },
  { id: 'sc3', name: 'Sports Wear', icon: '🏃', count: 10, color: '#FFD700' },
  { id: 'sc4', name: 'Vacation', icon: '✈️', count: 8, color: '#FF69B4' },
  { id: 'sc5', name: 'Luxury Summer', icon: '✨', count: 7, color: '#DDA0DD' },
  { id: 'sc6', name: 'Resort Wear', icon: '🌴', count: 6, color: '#40E0D0' },
];

export const summerCollectionDesigns = [
  {
    id: 'sd1',
    name: 'Ocean Breeze T-Shirt',
    productType: 'T-Shirt',
    category: 'Beach Wear',
    colors: ['White', 'Sky Blue'],
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-06-15',
    status: 'Completed',
    favorite: true,
    tags: ['Beach', 'Casual', 'Lightweight'],
  },
  {
    id: 'sd2',
    name: 'Sunset Polo',
    productType: 'Polo',
    category: 'Casual Wear',
    colors: ['Coral', 'Beige'],
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-06-14',
    status: 'Completed',
    favorite: false,
    tags: ['Casual', 'Summer', 'Elegant'],
  },
  {
    id: 'sd3',
    name: 'Tropical Shorts',
    productType: 'Shorts',
    category: 'Beach Wear',
    colors: ['Green', 'Yellow'],
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-06-13',
    status: 'Draft',
    favorite: true,
    tags: ['Beach', 'Tropical', 'Comfort'],
  },
  {
    id: 'sd4',
    name: 'Floral Summer Dress',
    productType: 'Dress',
    category: 'Vacation',
    colors: ['Light Pink', 'White'],
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-06-12',
    status: 'Completed',
    favorite: true,
    tags: ['Vacation', 'Floral', 'Elegant'],
  },
  {
    id: 'sd5',
    name: 'Resort Skirt',
    productType: 'Skirt',
    category: 'Resort Wear',
    colors: ['Beige', 'White'],
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0uj9a?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-06-11',
    status: 'Completed',
    favorite: false,
    tags: ['Resort', 'Elegant', 'Light'],
  },
  {
    id: 'sd6',
    name: 'Active Tank Top',
    productType: 'Tank Top',
    category: 'Sports Wear',
    colors: ['White', 'Mint Green'],
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-06-10',
    status: 'Draft',
    favorite: false,
    tags: ['Sports', 'Active', 'Breathable'],
  },
  {
    id: 'sd7',
    name: 'Linen Summer Shirt',
    productType: 'Shirt',
    category: 'Luxury Summer',
    colors: ['White', 'Beige'],
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-06-09',
    status: 'Completed',
    favorite: true,
    tags: ['Luxury', 'Linen', 'Premium'],
  },
  {
    id: 'sd8',
    name: 'Beach Sandals',
    productType: 'Sandals',
    category: 'Beach Wear',
    colors: ['Beige', 'White'],
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-06-08',
    status: 'Completed',
    favorite: false,
    tags: ['Beach', 'Comfort', 'Casual'],
  },
];

export const summerFilterOptions = {
  product: ['T-Shirt', 'Polo', 'Shorts', 'Dress', 'Skirt', 'Tank Top', 'Shirt', 'Sandals'],
  style: ['Casual', 'Beach', 'Minimal', 'Luxury', 'Streetwear', 'Resort Wear'],
  color: ['White', 'Sky Blue', 'Yellow', 'Green', 'Coral', 'Beige'],
  sort: ['Newest', 'Oldest', 'Most Used', 'Favorites'],
  searchBy: ['Design Name', 'Tags', 'Product', 'Color'],
};

export const summerColorPalette = [
  { name: 'White', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
  { name: 'Sky Blue', hex: '#87CEEB', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
  { name: 'Mint Green', hex: '#98FB98', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
  { name: 'Yellow', hex: '#FFD700', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
  { name: 'Orange', hex: '#FFA500', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
  { name: 'Coral', hex: '#FF7F50', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
  { name: 'Beige', hex: '#F5F5DC', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
  { name: 'Light Pink', hex: '#FFB6C1', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
];

export const summerFabricLibrary = [
  {
    name: 'Cotton',
    texture: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80',
    bestFor: ['T-Shirts', 'Casual Wear', 'Everyday'],
    breathability: 9,
    description: 'Natural, breathable, perfect for summer',
  },
  {
    name: 'Linen',
    texture: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80',
    bestFor: ['Shirts', 'Dresses', 'Luxury'],
    breathability: 10,
    description: 'Lightweight, elegant, ideal for hot weather',
  },
  {
    name: 'Rayon',
    texture: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80',
    bestFor: ['Dresses', 'Flowy garments', 'Beach'],
    breathability: 8,
    description: 'Soft, drapes well, comfortable',
  },
  {
    name: 'Bamboo Fabric',
    texture: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80',
    bestFor: ['Activewear', 'Underwear', 'Eco-friendly'],
    breathability: 9,
    description: 'Sustainable, antibacterial, moisture-wicking',
  },
  {
    name: 'Light Denim',
    texture: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80',
    bestFor: ['Shorts', 'Jackets', 'Casual'],
    breathability: 7,
    description: 'Durable, stylish, lighter weight',
  },
];

export const summerAISuggestions = [
  'Generate Matching Shorts',
  'Create Beach Version',
  'Add Summer Pattern',
  'Generate Matching Cap',
  'Create Kids Version',
];

export const summerQuickActions = [
  { label: 'Generate Design', icon: '🤖' },
  { label: 'Create Mockup', icon: '📸' },
  { label: 'Apply to Female Model', icon: '👩' },
  { label: 'Apply to Male Model', icon: '👨' },
  { label: 'Apply to Kids Model', icon: '👶' },
  { label: 'Export Collection', icon: '📤' },
];

export const summerExportFormats = [
  { name: 'PDF Lookbook', icon: '📄', description: 'Professional portfolio format' },
  { name: 'ZIP Images', icon: '📦', description: 'All designs in one package' },
  { name: 'PNG', icon: '🖼️', description: 'High quality with transparency' },
  { name: 'JPG', icon: '📷', description: 'Compressed for web use' },
];

export const seasonalPlanner = [
  { season: 'Summer 2026', status: 'Ready', icon: '✅' },
  { season: 'Autumn 2026', status: 'Planning', icon: '📋' },
  { season: 'Winter 2026', status: 'Not Started', icon: '⏳' },
];

export const outfitSuggestions = [
  { item: 'T-Shirt', icon: '👕' },
  { item: 'Shorts', icon: '🩳' },
  { item: 'Cap', icon: '🧢' },
  { item: 'Shoes', icon: '👟' },
  { item: 'Bag', icon: '👜' },
];

export const summerTrendColors = [
  { name: 'Lavender Haze', hex: '#E6E6FA', trending: true },
  { name: 'Peach Fuzz', hex: '#FFE5B4', trending: true },
  { name: 'Butter Yellow', hex: '#FFF59D', trending: true },
  { name: 'Mint Fresh', hex: '#98FF98', trending: false },
  { name: 'Sky Blue', hex: '#87CEEB', trending: true },
  { name: 'Coral Pink', hex: '#FF6B6B', trending: false },
];

export const summerCollectionAnalytics = {
  totalDownloads: 420,
  mostUsedColor: 'White',
  topProduct: 'Oversized T-Shirt',
  mostPopularStyle: 'Minimal',
};

export const summerCollectionNotes = {
  designerNotes: 'Focus on breathable fabrics and minimalist designs for the summer collection. Emphasize comfort without sacrificing style.',
  targetAudience: 'Young Adults (18-35)',
  launchMonth: 'June',
  theme: 'Minimal Beach Wear',
};

// Winter Collection Data
export const winterCollectionStats = {
  totalDesigns: 84,
  categories: 10,
  favorites: 28,
  lastUpdated: 'Today',
  collectionName: 'Winter Collection 2026',
  createdDate: 'October 2026',
  designCount: 84,
  owner: 'Awais',
};

export const winterCollectionCategories = [
  { id: 'wc1', name: 'Hoodies', icon: '🧥', count: 18, color: '#4A5568' },
  { id: 'wc2', name: 'Jackets', icon: '🧥', count: 15, color: '#2D3748' },
  { id: 'wc3', name: 'Coats', icon: '🧥', count: 12, color: '#1A202C' },
  { id: 'wc4', name: 'Sweaters', icon: '🧶', count: 14, color: '#553C9A' },
  { id: 'wc5', name: 'Sportswear', icon: '🏂', count: 10, color: '#319795' },
  { id: 'wc6', name: 'Outdoor Wear', icon: '🏔', count: 15, color: '#285E61' },
];

export const winterCollectionDesigns = [
  {
    id: 'wd1',
    name: 'Arctic Hoodie',
    productType: 'Hoodie',
    category: 'Hoodies',
    fabric: 'Fleece',
    colors: ['Black', 'Charcoal'],
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-10-15',
    status: 'Completed',
    favorite: true,
    tags: ['Winter', 'Warm', 'Fleece'],
  },
  {
    id: 'wd2',
    name: 'Snowstorm Jacket',
    productType: 'Jacket',
    category: 'Jackets',
    fabric: 'Wool',
    colors: ['Navy Blue', 'Dark Gray'],
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-10-14',
    status: 'Completed',
    favorite: true,
    tags: ['Winter', 'Wool', 'Waterproof'],
  },
  {
    id: 'wd3',
    name: 'Alpine Coat',
    productType: 'Coat',
    category: 'Coats',
    fabric: 'Leather',
    colors: ['Black', 'Brown'],
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-10-13',
    status: 'Draft',
    favorite: false,
    tags: ['Winter', 'Leather', 'Luxury'],
  },
  {
    id: 'wd4',
    name: 'Frost Sweater',
    productType: 'Sweater',
    category: 'Sweaters',
    fabric: 'Wool',
    colors: ['Dark Green', 'Maroon'],
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-10-12',
    status: 'Completed',
    favorite: true,
    tags: ['Winter', 'Wool', 'Comfortable'],
  },
  {
    id: 'wd5',
    name: 'Winter Tracksuit',
    productType: 'Tracksuit',
    category: 'Sportswear',
    fabric: 'Cotton Blend',
    colors: ['Black', 'Dark Gray'],
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-10-11',
    status: 'Completed',
    favorite: false,
    tags: ['Sport', 'Winter', 'Active'],
  },
  {
    id: 'wd6',
    name: 'Mountain Parka',
    productType: 'Coat',
    category: 'Outdoor Wear',
    fabric: 'Quilted Fabric',
    colors: ['Dark Green', 'Black'],
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-10-10',
    status: 'Draft',
    favorite: true,
    tags: ['Outdoor', 'Winter', 'Heavy'],
  },
  {
    id: 'wd7',
    name: 'Urban Beanie',
    productType: 'Beanie',
    category: 'Hoodies',
    fabric: 'Wool',
    colors: ['Black', 'Charcoal'],
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-10-09',
    status: 'Completed',
    favorite: false,
    tags: ['Winter', 'Accessory', 'Wool'],
  },
  {
    id: 'wd8',
    name: 'Winter Scarf',
    productType: 'Scarf',
    category: 'Outdoor Wear',
    fabric: 'Cashmere',
    colors: ['Maroon', 'Navy Blue'],
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-10-08',
    status: 'Completed',
    favorite: true,
    tags: ['Winter', 'Accessory', 'Cashmere'],
  },
];

export const winterFilterOptions = {
  product: ['Hoodie', 'Jacket', 'Coat', 'Sweater', 'Sweatshirt', 'Tracksuit', 'Beanie', 'Scarf', 'Gloves'],
  style: ['Casual', 'Luxury', 'Streetwear', 'Minimal', 'Outdoor', 'Sportswear'],
  fabric: ['Fleece', 'Wool', 'Leather', 'Denim', 'Cotton Blend'],
  sort: ['Latest', 'Oldest', 'Favorites', 'Most Downloaded'],
  searchBy: ['Design Name', 'Product', 'Tags', 'Fabric'],
};

export const winterColorPalette = [
  { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
  { name: 'Charcoal', hex: '#36454F', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
  { name: 'Navy Blue', hex: '#000080', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
  { name: 'Dark Green', hex: '#006400', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
  { name: 'Maroon', hex: '#800000', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
  { name: 'Brown', hex: '#964B00', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
  { name: 'Dark Gray', hex: '#A9A9A9', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
  { name: 'White', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
];

export const winterFabricLibrary = [
  {
    name: 'Fleece',
    texture: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80',
    warmthRating: 8,
    bestFor: ['Hoodies', 'Jackets', 'Casual'],
    description: 'Soft, warm, lightweight insulation',
  },
  {
    name: 'Wool',
    texture: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80',
    warmthRating: 9,
    bestFor: ['Sweaters', 'Coats', 'Scarves'],
    description: 'Natural warmth, breathable, durable',
  },
  {
    name: 'Cashmere',
    texture: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80',
    warmthRating: 10,
    bestFor: ['Sweaters', 'Scarves', 'Luxury'],
    description: 'Premium softness, exceptional warmth',
  },
  {
    name: 'Leather',
    texture: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80',
    warmthRating: 7,
    bestFor: ['Jackets', 'Gloves', 'Luxury'],
    description: 'Windproof, durable, stylish',
  },
  {
    name: 'Heavy Cotton',
    texture: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80',
    warmthRating: 6,
    bestFor: ['Sweatshirts', 'Tracksuits', 'Casual'],
    description: 'Durable, comfortable, versatile',
  },
  {
    name: 'Quilted Fabric',
    texture: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80',
    warmthRating: 9,
    bestFor: ['Coats', 'Jackets', 'Outdoor'],
    description: 'Insulated padding, excellent warmth',
  },
];

export const winterAISuggestions = [
  'Generate Matching Hoodie',
  'Create Winter Jacket',
  'Add Wool Texture',
  'Generate Matching Beanie',
  'Create Full Winter Outfit',
];

export const winterQuickActions = [
  { label: 'Generate Design', icon: '🤖' },
  { label: 'Create Mockup', icon: '📸' },
  { label: 'Apply to Female Model', icon: '👩' },
  { label: 'Apply to Male Model', icon: '👨' },
  { label: 'Apply to Kids Model', icon: '👶' },
  { label: 'Export Collection', icon: '📤' },
];

export const winterExportFormats = [
  { name: 'PDF Lookbook', icon: '📄', description: 'Professional portfolio format' },
  { name: 'ZIP Images', icon: '📦', description: 'All designs in one package' },
  { name: 'PNG', icon: '🖼️', description: 'High quality with transparency' },
  { name: 'JPG', icon: '📷', description: 'Compressed for web use' },
];

export const winterLayeringOptions = [
  { item: 'T-Shirt', icon: '👕', layer: 1 },
  { item: 'Hoodie', icon: '🧥', layer: 2 },
  { item: 'Jacket', icon: '🧥', layer: 3 },
  { item: 'Scarf', icon: '🧣', layer: 4 },
  { item: 'Beanie', icon: '🧢', layer: 5 },
];

export const winterTrendColors = [
  { name: 'Deep Charcoal', hex: '#36454F', trending: true },
  { name: 'Forest Green', hex: '#228B22', trending: true },
  { name: 'Burgundy', hex: '#800020', trending: true },
  { name: 'Navy Midnight', hex: '#191970', trending: false },
  { name: 'Chocolate Brown', hex: '#7B3F00', trending: true },
  { name: 'Ice White', hex: '#F8F8FF', trending: false },
];

export const winterAccessories = [
  { name: 'Beanie', icon: '🧢', essential: true },
  { name: 'Gloves', icon: '🧤', essential: true },
  { name: 'Scarf', icon: '🧣', essential: true },
  { name: 'Boots', icon: '👢', essential: true },
];

export const winterCompleteOutfit = [
  { item: 'Hoodie', icon: '🧥' },
  { item: 'Jacket', icon: '🧥' },
  { item: 'Jeans', icon: '👖' },
  { item: 'Boots', icon: '👢' },
  { item: 'Beanie', icon: '🧢' },
  { item: 'Scarf', icon: '🧣' },
];

export const winterCollectionAnalytics = {
  totalDownloads: 620,
  mostUsedProduct: 'Hoodie',
  mostUsedFabric: 'Fleece',
  mostPopularColor: 'Black',
};

export const winterCollectionNotes = {
  designerNotes: 'Focus on warmth and layering options for the winter collection. Emphasize functional yet stylish pieces.',
  targetAudience: 'Adults (25-45)',
  launchMonth: 'October',
  theme: 'Urban Winter Comfort',
};

// Casual Wear Data
export const casualWearStats = {
  totalDesigns: 135,
  categories: 12,
  favorites: 42,
  lastUpdated: 'Today',
  collectionName: 'Casual Wear Collection',
  createdDate: 'January 2026',
  designCount: 135,
  owner: 'Awais',
};

export const casualWearCategories = [
  { id: 'cw1', name: 'Basic Essentials', icon: '👕', count: 25, color: '#718096' },
  { id: 'cw2', name: 'Oversized Wear', icon: '🧥', count: 20, color: '#4A5568' },
  { id: 'cw3', name: 'Smart Casual', icon: '👔', count: 18, color: '#2D3748' },
  { id: 'cw4', name: 'Street Casual', icon: '🛹', count: 22, color: '#1A202C' },
  { id: 'cw5', name: 'Weekend Wear', icon: '🌴', count: 15, color: '#2C5282' },
  { id: 'cw6', name: 'Travel Wear', icon: '✈️', count: 12, color: '#2B6CB0' },
  { id: 'cw7', name: 'College Wear', icon: '🎓', count: 14, color: '#2C7A7B' },
  { id: 'cw8', name: 'Home Wear', icon: '🏠', count: 9, color: '#285E61' },
];

export const casualWearDesigns = [
  {
    id: 'cd1',
    name: 'Classic White Tee',
    productType: 'T-Shirt',
    category: 'Basic Essentials',
    style: 'Minimal',
    colors: ['White'],
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-01-15',
    status: 'Completed',
    favorite: true,
    tags: ['Basic', 'Essential', 'Minimal'],
  },
  {
    id: 'cd2',
    name: 'Oversized Hoodie',
    productType: 'Hoodie',
    category: 'Oversized Wear',
    style: 'Oversized',
    colors: ['Black', 'Gray'],
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-01-14',
    status: 'Completed',
    favorite: true,
    tags: ['Oversized', 'Comfortable', 'Street'],
  },
  {
    id: 'cd3',
    name: 'Smart Casual Shirt',
    productType: 'Shirt',
    category: 'Smart Casual',
    style: 'Smart Casual',
    colors: ['Navy', 'White'],
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-01-13',
    status: 'Draft',
    favorite: false,
    tags: ['Smart', 'Casual', 'Office'],
  },
  {
    id: 'cd4',
    name: 'Street Joggers',
    productType: 'Joggers',
    category: 'Street Casual',
    style: 'Street Casual',
    colors: ['Black', 'Gray'],
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-01-12',
    status: 'Completed',
    favorite: true,
    tags: ['Street', 'Comfortable', 'Active'],
  },
  {
    id: 'cd5',
    name: 'Relaxed Jeans',
    productType: 'Jeans',
    category: 'Weekend Wear',
    style: 'Relaxed Fit',
    colors: ['Blue', 'Black'],
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-01-11',
    status: 'Completed',
    favorite: false,
    tags: ['Weekend', 'Relaxed', 'Comfortable'],
  },
  {
    id: 'cd6',
    name: 'Travel Polo',
    productType: 'Polo Shirt',
    category: 'Travel Wear',
    style: 'Basic',
    colors: ['Beige', 'White'],
    image: 'https://images.unsplash.com/photo-1625910513413-5fc5a00db2c5?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-01-10',
    status: 'Draft',
    favorite: true,
    tags: ['Travel', 'Lightweight', 'Breathable'],
  },
  {
    id: 'cd7',
    name: 'College Hoodie',
    productType: 'Hoodie',
    category: 'College Wear',
    style: 'Oversized',
    colors: ['Navy', 'Red'],
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-01-09',
    status: 'Completed',
    favorite: false,
    tags: ['College', 'Casual', 'Comfortable'],
  },
  {
    id: 'cd8',
    name: 'Home Sweatshirt',
    productType: 'Sweatshirt',
    category: 'Home Wear',
    style: 'Relaxed Fit',
    colors: ['Gray', 'White'],
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-01-08',
    status: 'Completed',
    favorite: true,
    tags: ['Home', 'Comfortable', 'Cozy'],
  },
];

export const casualWearFilterOptions = {
  product: ['T-Shirt', 'Polo Shirt', 'Hoodie', 'Sweatshirt', 'Jeans', 'Shorts', 'Joggers', 'Shirt'],
  style: ['Minimal', 'Oversized', 'Street Casual', 'Smart Casual', 'Basic', 'Relaxed Fit'],
  color: ['Black', 'White', 'Gray', 'Navy', 'Beige', 'Olive', 'Blue'],
  sort: ['Latest', 'Oldest', 'Favorites', 'Most Downloaded'],
  searchBy: ['Design Name', 'Product', 'Tags', 'Color'],
};

export const casualWearColorPalette = [
  { name: 'White', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
  { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
  { name: 'Gray', hex: '#808080', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
  { name: 'Beige', hex: '#F5F5DC', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
  { name: 'Olive', hex: '#808000', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
  { name: 'Light Blue', hex: '#ADD8E6', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
  { name: 'Navy', hex: '#000080', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
];

export const casualWearFabricLibrary = [
  {
    name: 'Cotton',
    texture: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80',
    comfortRating: 9,
    bestSeason: ['All Season', 'Summer', 'Spring'],
    description: 'Natural, breathable, everyday comfort',
  },
  {
    name: 'Cotton Blend',
    texture: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80',
    comfortRating: 8,
    bestSeason: ['All Season', 'Fall', 'Winter'],
    description: 'Durable, stretchy, versatile',
  },
  {
    name: 'Jersey',
    texture: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80',
    comfortRating: 9,
    bestSeason: ['All Season', 'Summer'],
    description: 'Soft, stretchy, lightweight',
  },
  {
    name: 'Denim',
    texture: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80',
    comfortRating: 7,
    bestSeason: ['All Season', 'Fall', 'Spring'],
    description: 'Durable, classic, versatile',
  },
  {
    name: 'Linen',
    texture: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80',
    comfortRating: 10,
    bestSeason: ['Summer', 'Spring'],
    description: 'Lightweight, breathable, elegant',
  },
  {
    name: 'Fleece (Lightweight)',
    texture: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80',
    comfortRating: 8,
    bestSeason: ['Fall', 'Winter', 'Spring'],
    description: 'Soft, warm, lightweight comfort',
  },
];

export const casualWearAISuggestions = [
  'Generate Matching Hoodie',
  'Create Casual Jacket',
  'Add Minimal Logo',
  'Generate Matching Cap',
  'Create Complete Outfit',
];

export const casualWearQuickActions = [
  { label: 'Generate Design', icon: '🤖' },
  { label: 'Create Mockup', icon: '📸' },
  { label: 'Apply to Female Model', icon: '👩' },
  { label: 'Apply to Male Model', icon: '👨' },
  { label: 'Apply to Kids Model', icon: '👶' },
  { label: 'Export Collection', icon: '📤' },
];

export const casualWearExportFormats = [
  { name: 'PDF Lookbook', icon: '📄', description: 'Professional portfolio format' },
  { name: 'PNG', icon: '🖼️', description: 'High quality with transparency' },
  { name: 'JPG', icon: '📷', description: 'Compressed for web use' },
  { name: 'ZIP Package', icon: '📦', description: 'All designs in one package' },
];

export const casualWearOutfitBuilder = [
  { item: 'T-Shirt', icon: '👕', layer: 1 },
  { item: 'Jeans', icon: '👖', layer: 2 },
  { item: 'Sneakers', icon: '👟', layer: 3 },
  { item: 'Cap', icon: '🧢', layer: 4 },
  { item: 'Watch', icon: '⌚', layer: 5 },
];

export const casualWearCapsuleWardrobe = [
  { item: 'White T-Shirt', icon: '👕' },
  { item: 'Blue Jeans', icon: '👖' },
  { item: 'Black Hoodie', icon: '🧥' },
  { item: 'White Sneakers', icon: '👟' },
];

export const casualWearOccasions = [
  { name: 'Daily Wear', icon: '📅' },
  { name: 'Office Casual', icon: '💼' },
  { name: 'College', icon: '🎓' },
  { name: 'Travel', icon: '✈️' },
  { name: 'Weekend', icon: '🌴' },
  { name: 'Coffee Meetup', icon: '☕' },
];

export const casualWearAccessories = [
  { name: 'Sneakers', icon: '👟' },
  { name: 'Cap', icon: '🧢' },
  { name: 'Backpack', icon: '🎒' },
  { name: 'Watch', icon: '⌚' },
  { name: 'Sunglasses', icon: '🕶️' },
];

export const casualWearAnalytics = {
  totalDownloads: 980,
  mostUsedProduct: 'T-Shirt',
  mostUsedColor: 'Black',
  topStyle: 'Oversized',
};

export const casualWearNotes = {
  designerNotes: 'Focus on comfort and versatility for everyday wear. Create pieces that can be mixed and matched easily.',
  targetAudience: 'Young Adults (18-35)',
  collectionGoal: 'Versatile Everyday Wardrobe',
  theme: 'Effortless Comfort',
};

// Formal Wear Data
export const formalWearStats = {
  totalDesigns: 98,
  categories: 9,
  favorites: 35,
  lastUpdated: 'Today',
  collectionName: 'Formal Wear Collection',
  createdDate: 'February 2026',
  designCount: 98,
  owner: 'Awais',
};

export const formalWearCategories = [
  { id: 'fw1', name: 'Business Wear', icon: '💼', count: 18, color: '#1A365D' },
  { id: 'fw2', name: 'Corporate Wear', icon: '🏢', count: 15, color: '#2C5282' },
  { id: 'fw3', name: 'Wedding Wear', icon: '💒', count: 12, color: '#2B6CB0' },
  { id: 'fw4', name: 'Evening Wear', icon: '🌟', count: 14, color: '#2C7A7B' },
  { id: 'fw5', name: 'Luxury Collection', icon: '✨', count: 16, color: '#285E61' },
  { id: 'fw6', name: 'Office Collection', icon: '🏛️', count: 12, color: '#2D3748' },
  { id: 'fw7', name: 'VIP Collection', icon: '👑', count: 11, color: '#1A202C' },
];

export const formalWearDesigns = [
  {
    id: 'fd1',
    name: 'Executive Navy Blazer',
    productType: 'Blazer',
    category: 'Business Wear',
    style: 'Executive',
    fabric: 'Wool',
    colors: ['Navy Blue', 'Black'],
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-02-15',
    status: 'Completed',
    favorite: true,
    tags: ['Executive', 'Business', 'Premium'],
  },
  {
    id: 'fd2',
    name: 'Classic White Dress Shirt',
    productType: 'Dress Shirt',
    category: 'Corporate Wear',
    style: 'Business',
    fabric: 'Premium Cotton',
    colors: ['White', 'Light Blue'],
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-02-14',
    status: 'Completed',
    favorite: true,
    tags: ['Corporate', 'Classic', 'Essential'],
  },
  {
    id: 'fd3',
    name: 'Luxury Silk Tie',
    productType: 'Tie',
    category: 'Luxury Collection',
    style: 'Luxury',
    fabric: 'Silk',
    colors: ['Burgundy', 'Navy'],
    image: 'https://images.unsplash.com/photo-1589363368082-f475f4d4b9a0?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-02-13',
    status: 'Draft',
    favorite: false,
    tags: ['Luxury', 'Silk', 'Elegant'],
  },
  {
    id: 'fd4',
    name: 'Charcoal Formal Pants',
    productType: 'Formal Pants',
    category: 'Business Wear',
    style: 'Executive',
    fabric: 'Wool Blend',
    colors: ['Charcoal', 'Black'],
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-02-12',
    status: 'Completed',
    favorite: true,
    tags: ['Business', 'Formal', 'Classic'],
  },
  {
    id: 'fd5',
    name: 'Elegant Waistcoat',
    productType: 'Waistcoat',
    category: 'Wedding Wear',
    style: 'Wedding',
    fabric: 'Silk Blend',
    colors: ['Black', 'Gray'],
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-02-11',
    status: 'Completed',
    favorite: false,
    tags: ['Wedding', 'Elegant', 'Formal'],
  },
  {
    id: 'fd6',
    name: 'Evening Dress Coat',
    productType: 'Coat',
    category: 'Evening Wear',
    style: 'Evening',
    fabric: 'Cashmere',
    colors: ['Black', 'Dark Gray'],
    image: 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-02-10',
    status: 'Draft',
    favorite: true,
    tags: ['Evening', 'Luxury', 'Cashmere'],
  },
  {
    id: 'fd7',
    name: 'Office Dress Shirt',
    productType: 'Dress Shirt',
    category: 'Office Collection',
    style: 'Corporate',
    fabric: 'Cotton',
    colors: ['Light Blue', 'White'],
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-02-09',
    status: 'Completed',
    favorite: false,
    tags: ['Office', 'Corporate', 'Daily'],
  },
  {
    id: 'fd8',
    name: 'VIP Black Suit',
    productType: 'Suit',
    category: 'VIP Collection',
    style: 'Luxury',
    fabric: 'Wool',
    colors: ['Black'],
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80',
    createdDate: '2026-02-08',
    status: 'Completed',
    favorite: true,
    tags: ['VIP', 'Luxury', 'Premium'],
  },
];

export const formalWearFilterOptions = {
  product: ['Suit', 'Blazer', 'Dress Shirt', 'Formal Pants', 'Waistcoat', 'Tie', 'Dress', 'Coat'],
  style: ['Business', 'Executive', 'Luxury', 'Wedding', 'Evening', 'Corporate'],
  color: ['Black', 'Navy', 'Charcoal', 'Gray', 'White', 'Burgundy', 'Dark Green'],
  sort: ['Latest', 'Favorites', 'Most Downloaded', 'A-Z'],
  searchBy: ['Design Name', 'Product', 'Fabric', 'Color'],
};

export const formalWearColorPalette = [
  { name: 'Black', hex: '#000000', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
  { name: 'Navy Blue', hex: '#000080', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
  { name: 'Charcoal Gray', hex: '#36454F', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
  { name: 'White', hex: '#FFFFFF', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
  { name: 'Burgundy', hex: '#800020', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
  { name: 'Dark Green', hex: '#006400', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80' },
];

export const formalWearFabricLibrary = [
  {
    name: 'Wool',
    texture: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80',
    bestSeason: ['Fall', 'Winter', 'Spring'],
    premiumRating: 5,
    description: 'Classic, durable, professional',
  },
  {
    name: 'Cashmere',
    texture: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80',
    bestSeason: ['Fall', 'Winter'],
    premiumRating: 5,
    description: 'Ultra-soft, luxurious, premium',
  },
  {
    name: 'Silk Blend',
    texture: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80',
    bestSeason: ['All Season', 'Spring', 'Summer'],
    premiumRating: 5,
    description: 'Smooth, elegant, lightweight',
  },
  {
    name: 'Linen',
    texture: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80',
    bestSeason: ['Spring', 'Summer'],
    premiumRating: 4,
    description: 'Breathable, crisp, professional',
  },
  {
    name: 'Premium Cotton',
    texture: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80',
    bestSeason: ['All Season', 'Spring', 'Summer', 'Fall'],
    premiumRating: 4,
    description: 'Soft, durable, versatile',
  },
  {
    name: 'Tweed',
    texture: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80',
    bestSeason: ['Fall', 'Winter'],
    premiumRating: 4,
    description: 'Textured, classic, sophisticated',
  },
];

export const formalWearAISuggestions = [
  'Generate Matching Blazer',
  'Create Formal Pants',
  'Add Luxury Tie',
  'Generate Pocket Square',
  'Create Complete Suit',
];

export const formalWearQuickActions = [
  { label: 'Generate Design', icon: '🤖' },
  { label: 'Create Mockup', icon: '📸' },
  { label: 'Apply to Female Model', icon: '👩' },
  { label: 'Apply to Male Model', icon: '👨' },
  { label: 'Export Collection', icon: '📤' },
  { label: 'Share Collection', icon: '📤' },
];

export const formalWearExportFormats = [
  { name: 'PDF Lookbook', icon: '📄', description: 'Professional portfolio format' },
  { name: 'PNG', icon: '🖼️', description: 'High quality with transparency' },
  { name: 'JPG', icon: '📷', description: 'Compressed for web use' },
  { name: 'ZIP Collection', icon: '📦', description: 'All designs in one package' },
];

export const formalWearSuitBuilder = [
  { item: 'Blazer', icon: '🧥', layer: 1 },
  { item: 'Dress Shirt', icon: '👔', layer: 2 },
  { item: 'Tie', icon: '👔', layer: 3 },
  { item: 'Formal Pants', icon: '👖', layer: 4 },
  { item: 'Dress Shoes', icon: '👞', layer: 5 },
  { item: 'Watch', icon: '⌚', layer: 6 },
];

export const formalWearAccessories = [
  { name: 'Tie', icon: '👔' },
  { name: 'Bow Tie', icon: '🎀' },
  { name: 'Pocket Square', icon: '🧣' },
  { name: 'Belt', icon: '🥋' },
  { name: 'Watch', icon: '⌚' },
  { name: 'Cufflinks', icon: '💎' },
  { name: 'Dress Shoes', icon: '👞' },
];

export const formalWearOccasions = [
  { name: 'Office', icon: '🏢' },
  { name: 'Business Meeting', icon: '💼' },
  { name: 'Conference', icon: '📊' },
  { name: 'Wedding', icon: '💒' },
  { name: 'Gala Dinner', icon: '🍽️' },
  { name: 'Graduation', icon: '🎓' },
];

export const formalWearTailoringOptions = [
  { name: 'Slim Fit', icon: '📏' },
  { name: 'Regular Fit', icon: '📐' },
  { name: 'Relaxed Fit', icon: '📏' },
  { name: 'Double Breasted', icon: '🧥' },
  { name: 'Single Breasted', icon: '🧥' },
];

export const formalWearAnalytics = {
  totalDownloads: 540,
  mostUsedProduct: 'Blazer',
  mostUsedFabric: 'Wool',
  topColor: 'Navy Blue',
};

export const formalWearNotes = {
  designerNotes: 'Focus on elegance and professionalism. Create timeless pieces that exude sophistication and confidence.',
  targetAudience: 'Professionals (25-50)',
  collectionTheme: 'Elegant Professional',
  launchSeason: 'Spring',
};

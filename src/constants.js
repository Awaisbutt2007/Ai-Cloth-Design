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

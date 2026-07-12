
import React, { useState } from 'react';
import {
  Sparkles,
  FolderOpen,
  Search,
  ChevronDown,
  Eye,
  Edit,
  RotateCcw,
  Heart,
  Download,
  Share2,
  Folder,
  Trash2,
  ArrowUpDown,
  X
} from 'lucide-react';

function AIGeneratedImagesSection({ activeSection }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const sectionId = 'assets-ai-generated-images';
  const activeId = 'ai-generated-images';

  if (activeSection !== activeId) return null;

  const sampleImages = [
    {
      id: 1,
      title: 'Luxury Hoodie',
      style: 'Streetwear',
      generated: 'Today',
      quality: 'HD',
      rating: 4,
      isFavorite: true,
      prompt: 'Black oversized hoodie with silver zipper',
      negativePrompt: 'Low quality, Blur',
      model: 'Fashion AI v2',
      resolution: '2048×2048',
      generationTime: '4.2 sec',
      creditsUsed: 5,
      createdAt: '10 Jul 2026',
      aspectRatio: '1:1',
      seed: '452187'
    },
    {
      id: 2,
      title: 'Summer Dress',
      style: 'Casual',
      generated: 'Yesterday',
      quality: 'SD',
      rating: 5,
      isFavorite: false,
      prompt: 'Flowy summer dress with floral print',
      negativePrompt: 'Too short, bright colors',
      model: 'Fashion AI v1',
      resolution: '1024×1536',
      generationTime: '3.8 sec',
      creditsUsed: 3,
      createdAt: '09 Jul 2026',
      aspectRatio: '2:3',
      seed: '123456'
    },
    {
      id: 3,
      title: 'Anime Hoodie',
      style: 'Streetwear',
      generated: 'Yesterday',
      quality: 'HD',
      rating: 3,
      isFavorite: true,
      prompt: 'Anime-inspired hoodie with neon accents',
      negativePrompt: 'Blurry, low-res',
      model: 'Fashion AI v2',
      resolution: '1024×1024',
      generationTime: '4.5 sec',
      creditsUsed: 5,
      createdAt: '09 Jul 2026',
      aspectRatio: '1:1',
      seed: '789012'
    }
  ];

  const toggleImageSelection = (id) => {
    setSelectedImages(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
  };

  const openPreview = (image) => {
    setPreviewImage(image);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  return (
    <section id={sectionId} className={`section ai-generated-images-section ${activeSection === activeId ? 'active' : 'hidden'}`}>
      <div className="sub-content">
        {/* 1️⃣ Header */}
        <div className="ai-gen-header">
          <div className="ai-gen-header-text">
            <h2>AI Generated Images</h2>
            <p>Manage all AI-created fashion designs.</p>
          </div>
          <div className="ai-gen-header-actions">
            <button className="btn-primary">
              <Sparkles size={18} />
              Generate New Design
            </button>
            <button className="btn-secondary">
              <FolderOpen size={18} />
              Import to Workspace
            </button>
          </div>
        </div>

        {/* 2️⃣ AI Generation Summary */}
        <div className="ai-gen-summary-grid">
          <div className="ai-gen-summary-card">
            <span className="ai-gen-summary-label">Total AI Images</span>
            <strong className="ai-gen-summary-value">856</strong>
          </div>
          <div className="ai-gen-summary-card">
            <span className="ai-gen-summary-label">Today's Generated</span>
            <strong className="ai-gen-summary-value">18</strong>
          </div>
          <div className="ai-gen-summary-card">
            <span className="ai-gen-summary-label">Favorites</span>
            <strong className="ai-gen-summary-value">62</strong>
          </div>
          <div className="ai-gen-summary-card">
            <span className="ai-gen-summary-label">Downloads</span>
            <strong className="ai-gen-summary-value">284</strong>
          </div>
        </div>

        {/* 3️⃣ Search & Filters */}
        <div className="ai-gen-search-filters-card">
          <div className="ai-gen-search-filters-toolbar">
            <div className="ai-gen-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="ai-gen-filter-selectors">
              <div className="ai-gen-filter-selector">
                <span>Category</span>
                <ChevronDown size={16} />
              </div>
              <div className="ai-gen-filter-selector">
                <span>Style</span>
                <ChevronDown size={16} />
              </div>
              <div className="ai-gen-filter-selector">
                <span>Status</span>
                <ChevronDown size={16} />
              </div>
              <div className="ai-gen-filter-selector">
                <span>Date</span>
                <ChevronDown size={16} />
              </div>
              <div className="ai-gen-filter-selector">
                <ArrowUpDown size={16} />
                <span>Sort</span>
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
          <div className="ai-gen-filter-groups">
            <div className="ai-gen-filter-group">
              <h4 className="ai-gen-filter-group-label">Category</h4>
              <div className="ai-gen-filter-tags">
                <button className="ai-gen-filter-tag">Jacket</button>
                <button className="ai-gen-filter-tag">Dress</button>
                <button className="ai-gen-filter-tag">Shoes</button>
                <button className="ai-gen-filter-tag">Hoodie</button>
                <button className="ai-gen-filter-tag">T-Shirt</button>
                <button className="ai-gen-filter-tag">Accessories</button>
              </div>
            </div>
            <div className="ai-gen-filter-group">
              <h4 className="ai-gen-filter-group-label">Style</h4>
              <div className="ai-gen-filter-tags">
                <button className="ai-gen-filter-tag">Casual</button>
                <button className="ai-gen-filter-tag">Luxury</button>
                <button className="ai-gen-filter-tag active">Streetwear</button>
                <button className="ai-gen-filter-tag">Vintage</button>
                <button className="ai-gen-filter-tag">Minimal</button>
                <button className="ai-gen-filter-tag">Formal</button>
              </div>
            </div>
            <div className="ai-gen-filter-group">
              <h4 className="ai-gen-filter-group-label">Status</h4>
              <div className="ai-gen-filter-tags">
                <button className="ai-gen-filter-tag">Draft</button>
                <button className="ai-gen-filter-tag active">Final</button>
                <button className="ai-gen-filter-tag">Favorite</button>
                <button className="ai-gen-filter-tag">Archived</button>
              </div>
            </div>
          </div>
        </div>

        {/* 8️⃣ Bulk Actions (only when images selected) */}
        {selectedImages.length > 0 && (
          <div className="ai-gen-bulk-actions-card">
            <div className="ai-gen-bulk-actions-info">
              <strong>{selectedImages.length} images selected</strong>
              <button
                onClick={() => setSelectedImages([])}
                className="ai-gen-bulk-actions-clear"
              >
                Clear
              </button>
            </div>
            <div className="ai-gen-bulk-actions-buttons">
              <button className="btn-secondary ai-gen-bulk-btn">
                <Download size={16} />
                Download
              </button>
              <button className="btn-danger ai-gen-bulk-btn">
                <Trash2 size={16} />
                Delete
              </button>
              <button className="btn-secondary ai-gen-bulk-btn">
                <Heart size={16} />
                Favorite
              </button>
              <button className="btn-secondary ai-gen-bulk-btn">
                <Folder size={16} />
                Move
              </button>
              <button className="btn-secondary ai-gen-bulk-btn">
                <Folder size={16} />
                Archive
              </button>
              <button className="btn-secondary ai-gen-bulk-btn">
                <Share2 size={16} />
                Share
              </button>
            </div>
          </div>
        )}

        {/* Empty State or Image Gallery */}
        {false ? (
          /* 🔟 Empty State */
          <div className="ai-gen-empty-state-card">
            <div className="ai-gen-empty-icon-wrapper">
              <Sparkles size={64} />
            </div>
            <h3>No AI Images Yet</h3>
            <p>Generate your first AI Fashion Design.</p>
            <button className="btn-primary">
              <Sparkles size={18} />
              Generate
            </button>
          </div>
        ) : (
          <>
            {/* 4️⃣ AI Image Gallery */}
            <div className="ai-gen-images-grid">
              {sampleImages.map((image) => (
                <div
                  key={image.id}
                  className={`ai-gen-image-card ${selectedImages.includes(image.id) ? 'selected' : ''}`}
                  onClick={() => openPreview(image)}
                >
                  <div className="ai-gen-image-check">
                    <input
                      type="checkbox"
                      checked={selectedImages.includes(image.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleImageSelection(image.id);
                      }}
                    />
                  </div>
                  <div className="ai-gen-image-preview-wrapper">
                    <div
                      className="ai-gen-image-preview"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1520975916090-3105956dac38?w=400&h=400&fit=crop')`
                      }}
                    />
                    {image.isFavorite && (
                      <div className="ai-gen-favorite-badge">
                        <Heart size={14} fill="currentColor" />
                      </div>
                    )}
                  </div>
                  <div className="ai-gen-image-info">
                    <div className="ai-gen-image-title">{image.title}</div>
                    <div className="ai-gen-image-meta">
                      <span className="ai-gen-image-style">{image.style}</span>
                      <span className="ai-gen-image-generated">{image.generated}</span>
                      <span className="ai-gen-image-quality">{image.quality}</span>
                    </div>
                    <div className="ai-gen-image-rating">
                      {Array(5).fill(0).map((_, i) => (
                        <span
                          key={i}
                          className={`ai-gen-star ${i < image.rating ? 'filled' : ''}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="ai-gen-image-hover-actions">
                    <button className="ai-gen-image-action-btn" title="Preview">
                      <Eye size={16} />
                    </button>
                    <button className="ai-gen-image-action-btn" title="Edit">
                      <Edit size={16} />
                    </button>
                    <button className="ai-gen-image-action-btn" title="Regenerate">
                      <RotateCcw size={16} />
                    </button>
                    <button
                      className="ai-gen-image-action-btn"
                      title="Favorite"
                      onClick={(e) => toggleFavorite(e, image.id)}
                    >
                      <Heart size={16} fill={image.isFavorite ? 'currentColor' : 'none'} />
                    </button>
                    <button className="ai-gen-image-action-btn" title="Download">
                      <Download size={16} />
                    </button>
                    <button className="ai-gen-image-action-btn" title="Share">
                      <Share2 size={16} />
                    </button>
                    <button className="ai-gen-image-action-btn" title="Move to Workspace">
                      <Folder size={16} />
                    </button>
                    <button className="ai-gen-image-action-btn danger" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 5️⃣ Image Details Drawer */}
            {previewImage && (
              <div className="ai-gen-image-preview-overlay" onClick={closePreview}>
                <div className="ai-gen-image-preview-drawer" onClick={(e) => e.stopPropagation()}>
                  <button className="ai-gen-drawer-close-btn" onClick={closePreview}>
                    <X size={20} />
                  </button>
                  <div className="ai-gen-drawer-content">
                    <div className="ai-gen-drawer-image-wrapper">
                      <div
                        className="ai-gen-drawer-image"
                        style={{
                          backgroundImage: `url('https://images.unsplash.com/photo-1520975916090-3105956dac38?w=800&h=800&fit=crop')`
                        }}
                      />
                    </div>
                    <div className="ai-gen-drawer-details">
                      <h3>Title</h3>
                      <p>{previewImage.title}</p>

                      <h3>Prompt</h3>
                      <p>{previewImage.prompt}</p>

                      <h3>Negative Prompt</h3>
                      <p>{previewImage.negativePrompt}</p>

                      <h3>AI Model</h3>
                      <p>{previewImage.model}</p>

                      <h3>Resolution</h3>
                      <p>{previewImage.resolution}</p>

                      <h3>Generation Time</h3>
                      <p>{previewImage.generationTime}</p>

                      <h3>Credits Used</h3>
                      <p>{previewImage.creditsUsed}</p>

                      <h3>Created</h3>
                      <p>{previewImage.createdAt}</p>

                      <div className="ai-gen-drawer-buttons">
                        <button className="btn-secondary ai-gen-drawer-btn">
                          <Edit size={16} />
                          Edit
                        </button>
                        <button className="btn-secondary ai-gen-drawer-btn">
                          <RotateCcw size={16} />
                          Regenerate
                        </button>
                        <button className="btn-primary ai-gen-drawer-btn">
                          <Download size={16} />
                          Download
                        </button>
                        <button className="btn-secondary ai-gen-drawer-btn">
                          <Share2 size={16} />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 6️⃣ Prompt History */}
            <div className="ai-gen-prompt-history-card">
              <div className="ai-gen-card-header">
                <h3>Prompt History</h3>
                <button className="btn-secondary">Reuse Prompt</button>
              </div>
              <div className="ai-gen-prompt-table-wrapper">
                <table className="ai-gen-prompt-table">
                  <thead>
                    <tr>
                      <th>Prompt</th>
                      <th>Date</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleImages.map((image) => (
                      <tr key={image.id}>
                        <td>{image.prompt}</td>
                        <td>{image.generated}</td>
                        <td style={{ color: 'var(--primary)', fontWeight: 600 }}>✅</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 7️⃣ AI Settings Used */}
            {previewImage && (
              <div className="ai-gen-settings-card">
                <h3>AI Settings Used</h3>
                <div className="ai-gen-settings-grid">
                  <div className="ai-gen-setting-item">
                    <span className="ai-gen-setting-label">Model</span>
                    <span className="ai-gen-setting-value">{previewImage.model}</span>
                  </div>
                  <div className="ai-gen-setting-item">
                    <span className="ai-gen-setting-label">Style</span>
                    <span className="ai-gen-setting-value">{previewImage.style}</span>
                  </div>
                  <div className="ai-gen-setting-item">
                    <span className="ai-gen-setting-label">Aspect Ratio</span>
                    <span className="ai-gen-setting-value">{previewImage.aspectRatio}</span>
                  </div>
                  <div className="ai-gen-setting-item">
                    <span className="ai-gen-setting-label">Quality</span>
                    <span className="ai-gen-setting-value">{previewImage.quality}</span>
                  </div>
                  <div className="ai-gen-setting-item">
                    <span className="ai-gen-setting-label">Seed</span>
                    <span className="ai-gen-setting-value">{previewImage.seed}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 9️⃣ Export Options */}
            <div className="ai-gen-export-card">
              <h3>Export Options</h3>
              <div className="ai-gen-export-buttons">
                <button className="btn-secondary ai-gen-export-btn">PNG</button>
                <button className="btn-secondary ai-gen-export-btn">JPG</button>
                <button className="btn-secondary ai-gen-export-btn">PDF</button>
                <button className="btn-primary ai-gen-export-btn">ZIP</button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default AIGeneratedImagesSection;

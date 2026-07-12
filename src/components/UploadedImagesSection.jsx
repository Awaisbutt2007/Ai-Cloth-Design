
import React, { useState } from 'react';
import { 
  Upload, Folder, Search, ChevronDown, Eye, Edit, Star, Link2, Download, Trash2, 
  Move, Tag, X, Image as ImageIcon, FileImage, ArrowUpDown 
} from 'lucide-react';

function UploadedImagesSection({ activeSection }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showEmptyState, setShowEmptyState] = useState(false);

  const sectionId = 'assets-uploaded-images';
  const activeId = 'uploaded-images';
  
  if (activeSection !== activeId) return null;

  const sampleImages = [
    { id: 1, name: 'Winter Jacket Inspiration', format: 'PNG', size: '2.4 MB', uploaded: 'Today', resolution: '2048 × 2048', usedIn: 'Winter Collection', tags: ['Reference', 'Inspiration'] },
    { id: 2, name: 'Fabric Swatch Wool', format: 'JPG', size: '1.2 MB', uploaded: 'Yesterday', resolution: '1024 × 768', usedIn: 'Winter Collection', tags: ['Fabric'] },
    { id: 3, name: 'Brand Logo Dark', format: 'PNG', size: '0.8 MB', uploaded: '3 Days Ago', resolution: '512 × 512', usedIn: 'All', tags: ['Logo'] },
    { id: 4, name: 'Leather Texture', format: 'WEBP', size: '3.1 MB', uploaded: '1 Week Ago', resolution: '1536 × 1024', usedIn: 'Streetwear', tags: ['Texture'] },
    { id: 5, name: 'Summer Dress Mockup', format: 'PNG', size: '5.2 MB', uploaded: '2 Weeks Ago', resolution: '1920 × 1080', usedIn: 'Summer Collection', tags: ['Mockup'] },
    { id: 6, name: 'Silk Texture Detail', format: 'JPG', size: '2.1 MB', uploaded: '2 Weeks Ago', resolution: '1024 × 1024', usedIn: 'Formal Wear', tags: ['Texture'] },
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
    // Add favorite logic here
  };

  const openPreview = (image) => {
    setPreviewImage(image);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  return (
    <section id={sectionId} className={`section uploaded-images-section ${activeSection === activeId ? 'active' : 'hidden'}`}>
      <div className="sub-content">
        
        {/* 1️⃣ Header */}
        <div className="uploaded-header">
          <div className="uploaded-header-text">
            <h2>Uploaded Images</h2>
            <p>Manage all your uploaded images and reference files.</p>
          </div>
          <div className="uploaded-header-actions">
            <button className="btn-primary">
              <Upload size={18} />
              Upload Images
            </button>
            <button className="btn-secondary">
              <Folder size={18} />
              Create Folder
            </button>
          </div>
        </div>

        {/* 2️⃣ Upload Area */}
        <div className="upload-area-card">
          <div className="upload-dropzone">
            <div className="upload-icon-wrapper">
              <FileImage size={48} />
            </div>
            <h3>Drop images here</h3>
            <p>or</p>
            <button className="btn-secondary upload-browse-btn">
              Browse Files
            </button>
            <div className="upload-formats">
              <span>PNG</span>
              <span>JPG</span>
              <span>JPEG</span>
              <span>WEBP</span>
            </div>
            <p className="upload-note">Max 20 MB</p>
          </div>
        </div>

        {/* 3️⃣ Storage Summary */}
        <div className="storage-summary-grid">
          <div className="storage-summary-card">
            <span className="storage-summary-label">Total Images</span>
            <strong className="storage-summary-value">{showEmptyState ? 0 : 428}</strong>
          </div>
          <div className="storage-summary-card">
            <span className="storage-summary-label">Storage Used</span>
            <strong className="storage-summary-value">{showEmptyState ? '0 GB' : '6.8 GB'}</strong>
          </div>
          <div className="storage-summary-card">
            <span className="storage-summary-label">Folders</span>
            <strong className="storage-summary-value">{showEmptyState ? 0 : 18}</strong>
          </div>
          <div className="storage-summary-card">
            <span className="storage-summary-label">Recent Uploads</span>
            <strong className="storage-summary-value">{showEmptyState ? 0 : 12}</strong>
          </div>
        </div>

        {/* 4️⃣ Search & Filters */}
        <div className="search-filters-card">
          <div className="search-filters-toolbar">
            <div className="search-filters-search">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search Images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="search-filters-selectors">
              <div className="filter-selector">
                <span>Folder</span>
                <ChevronDown size={16} />
              </div>
              <div className="filter-selector">
                <span>Category</span>
                <ChevronDown size={16} />
              </div>
              <div className="filter-selector">
                <span>Date</span>
                <ChevronDown size={16} />
              </div>
              <div className="filter-selector">
                <ArrowUpDown size={16} />
                <span>Sort</span>
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
          <div className="search-filters-tags">
            <button className="filter-tag active">All</button>
            <button className="filter-tag">Reference</button>
            <button className="filter-tag">Logo</button>
            <button className="filter-tag">Fabric</button>
            <button className="filter-tag">Texture</button>
            <button className="filter-tag">Inspiration</button>
            <button className="filter-tag">Mockup</button>
          </div>
        </div>

        {/* 7️⃣ Bulk Actions (only when images selected) */}
        {selectedImages.length > 0 && (
          <div className="bulk-actions-card">
            <div className="bulk-actions-info">
              <strong>{selectedImages.length} images selected</strong>
              <button 
                onClick={() => setSelectedImages([])}
                className="bulk-actions-clear"
              >
                Clear
              </button>
            </div>
            <div className="bulk-actions-buttons">
              <button className="btn-secondary bulk-btn">
                <Move size={16} />
                Move
              </button>
              <button className="btn-secondary bulk-btn">
                <Download size={16} />
                Download
              </button>
              <button className="btn-secondary bulk-btn">
                <Star size={16} />
                Favorite
              </button>
              <button className="btn-secondary bulk-btn">
                <Tag size={16} />
                Add Tags
              </button>
              <button className="btn-danger bulk-btn">
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        )}

        {/* Empty State or Images Grid */}
        {showEmptyState ? (
          /* 9️⃣ Empty State */
          <div className="empty-state-card">
            <div className="empty-state-icon-wrapper">
              <ImageIcon size={64} />
            </div>
            <h3>No Images Uploaded</h3>
            <p>Upload your first reference image.</p>
            <button className="btn-primary">
              <Upload size={18} />
              Upload Image
            </button>
          </div>
        ) : (
          <>
            {/* 5️⃣ Images Grid */}
            <div className="images-grid">
              {sampleImages.map((image) => (
                <div 
                  key={image.id} 
                  className={`image-card ${selectedImages.includes(image.id) ? 'selected' : ''}`}
                  onClick={() => openPreview(image)}
                >
                  <div className="image-check">
                    <input 
                      type="checkbox" 
                      checked={selectedImages.includes(image.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleImageSelection(image.id);
                      }}
                    />
                  </div>
                  <div className="image-preview-wrapper">
                    <div className="image-preview" style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400&h=300&fit=crop')`
                    }} />
                  </div>
                  <div className="image-info">
                    <div className="image-name">{image.name}</div>
                    <div className="image-meta">
                      <span className="image-format">{image.format}</span>
                      <span className="image-size">{image.size}</span>
                      <span className="image-uploaded">{image.uploaded}</span>
                    </div>
                  </div>
                  <div className="image-hover-actions">
                    <button className="image-action-btn" title="Preview">
                      <Eye size={16} />
                    </button>
                    <button className="image-action-btn" title="Rename">
                      <Edit size={16} />
                    </button>
                    <button 
                      className="image-action-btn" 
                      title="Favorite" 
                      onClick={(e) => toggleFavorite(e, image.id)}
                    >
                      <Star size={16} />
                    </button>
                    <button className="image-action-btn" title="Copy Link">
                      <Link2 size={16} />
                    </button>
                    <button className="image-action-btn" title="Download">
                      <Download size={16} />
                    </button>
                    <button className="image-action-btn danger" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* 8️⃣ Storage Usage */}
        <div className="storage-usage-card">
          <div className="storage-usage-header">
            <h3>Storage</h3>
            <button className="btn-primary">Upgrade Storage</button>
          </div>
          <div className="storage-usage-info">
            <span className="storage-usage-count">{showEmptyState ? '0 GB' : '6.8 GB'} / 20 GB</span>
            <div className="storage-usage-progress">
              <div className="storage-usage-fill" style={{ width: showEmptyState ? '0%' : '34%' }} />
            </div>
          </div>
        </div>

        {/* 6️⃣ Image Preview Drawer */}
        {previewImage && (
          <div className="image-preview-overlay" onClick={closePreview}>
            <div className="image-preview-drawer" onClick={(e) => e.stopPropagation()}>
              <button className="drawer-close-btn" onClick={closePreview}>
                <X size={20} />
              </button>
              <div className="drawer-content">
                <div className="drawer-image-wrapper">
                  <div className="drawer-image" style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=800&h=600&fit=crop')`
                  }} />
                </div>
                <div className="drawer-details">
                  <h3>File Name</h3>
                  <p>{previewImage.name.toLowerCase().replace(/ /g, '-')}.png</p>
                  
                  <h3>Size</h3>
                  <p>{previewImage.size}</p>
                  
                  <h3>Resolution</h3>
                  <p>{previewImage.resolution}</p>
                  
                  <h3>Format</h3>
                  <p>{previewImage.format}</p>
                  
                  <h3>Upload Date</h3>
                  <p>{previewImage.uploaded === 'Today' ? '10 Jul 2026' : previewImage.uploaded}</p>
                  
                  <h3>Used In</h3>
                  <p>{previewImage.usedIn}</p>
                  
                  <div className="drawer-buttons">
                    <button className="btn-secondary drawer-btn">
                      <Download size={16} />
                      Download
                    </button>
                    <button className="btn-secondary drawer-btn">
                      <Edit size={16} />
                      Rename
                    </button>
                    <button className="btn-secondary drawer-btn">
                      <Upload size={16} />
                      Replace
                    </button>
                    <button className="btn-danger drawer-btn">
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

export default UploadedImagesSection;

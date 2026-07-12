
import React, { useState } from 'react';
import {
  Upload,
  FolderOpen,
  Palette,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Download,
  Save,
  Layout,
  Share2,
  RefreshCw,
  Check,
  Image as ImageIcon
} from 'lucide-react';

function RecolorOutfitSection({ activeSection }) {
  const [hasUploadedImage, setHasUploadedImage] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [selectedItems, setSelectedItems] = useState(['Jacket']);
  const [intensity, setIntensity] = useState(75);
  const [saturation, setSaturation] = useState(80);
  const [brightness, setBrightness] = useState(50);
  const [contrast, setContrast] = useState(50);
  const [preserveTexture, setPreserveTexture] = useState(true);

  const sectionId = 'ai-tools-recolor-outfit';
  const activeId = 'recolor-outfit';

  if (activeSection !== activeId) return null;

  const detectedItems = ['Jacket', 'Pants', 'Shoes', 'Hat'];
  const aiSuggestions = ['#000000', '#ffffff', '#f5deb3', '#808000', '#000080', '#800080'];
  const colorPalettes = [
    { name: 'Luxury', colors: ['#2c1810', '#8b4513', '#d4af37'] },
    { name: 'Minimal', colors: ['#ffffff', '#e0e0e0', '#808080'] },
    { name: 'Summer', colors: ['#ff8c00', '#4169e1', '#32cd32'] },
    { name: 'Autumn', colors: ['#8b0000', '#d2691e', '#ffd700'] },
    { name: 'Streetwear', colors: ['#ff0000', '#0000ff', '#ffff00'] }
  ];
  const recentColors = ['#000000', '#ffffff', '#808000', '#ff0000', '#f5deb3'];

  const toggleItemSelection = (item) => {
    setSelectedItems(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  return (
    <section id={sectionId} className={`section recolor-section ${activeSection === activeId ? 'active' : 'hidden'}`}>
      <div className="sub-content">
        {/* 1️⃣ Header */}
        <div className="recolor-header">
          <div className="recolor-header-text">
            <h2>Recolor Outfit</h2>
            <p>Change outfit colors instantly using AI.</p>
          </div>
          <div className="recolor-header-actions">
            <button className="btn-primary">
              <Upload size={18} />
              Upload Image
            </button>
            <button className="btn-secondary">
              <FolderOpen size={18} />
              Choose from Assets
            </button>
          </div>
        </div>

        {hasUploadedImage ? (
          <div className="recolor-layout">
            {/* Left Column: Controls */}
            <div className="recolor-sidebar-left">
              {/* 3️⃣ AI Detection */}
              <div className="recolor-section-card">
                <h3 className="recolor-section-title">AI Detection</h3>
                <p className="recolor-desc">Detected items (select to recolor):</p>
                <div className="recolor-detected-items">
                  {detectedItems.map(item => (
                    <button
                      key={item}
                      className={`recolor-detected-btn ${selectedItems.includes(item) ? 'active' : ''}`}
                      onClick={() => toggleItemSelection(item)}
                    >
                      <Check size={14} className="recolor-check-icon" />
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4️⃣ Color Selection */}
              <div className="recolor-section-card">
                <h3 className="recolor-section-title">Color Selection</h3>
                <div className="recolor-color-picker-wrap">
                  <div className="recolor-color-wheel"></div>
                  <div className="recolor-color-inputs">
                    <div className="recolor-input-group">
                      <label>HEX</label>
                      <input type="text" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} />
                    </div>
                    <div className="recolor-input-row">
                      <div className="recolor-input-group">
                        <label>R</label>
                        <input type="number" value={255} />
                      </div>
                      <div className="recolor-input-group">
                        <label>G</label>
                        <input type="number" value={255} />
                      </div>
                      <div className="recolor-input-group">
                        <label>B</label>
                        <input type="number" value={255} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5️⃣ AI Color Suggestions */}
              <div className="recolor-section-card">
                <h3 className="recolor-section-title">AI Color Suggestions</h3>
                <div className="recolor-ai-suggestions">
                  {aiSuggestions.map(color => (
                    <button
                      key={color}
                      className="recolor-suggestion-btn"
                      style={{ backgroundColor: color, borderColor: color === '#ffffff' ? '#e4ddd5' : color }}
                      onClick={() => setSelectedColor(color)}
                    ></button>
                  ))}
                </div>
                <div className="recolor-palettes">
                  {colorPalettes.map(palette => (
                    <div key={palette.name} className="recolor-palette">
                      <span className="recolor-palette-name">{palette.name}</span>
                      <div className="recolor-palette-colors">
                        {palette.colors.map(color => (
                          <button
                            key={color}
                            className="recolor-palette-color"
                            style={{ backgroundColor: color, borderColor: color === '#ffffff' ? '#e4ddd5' : color }}
                            onClick={() => setSelectedColor(color)}
                          ></button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 8️⃣ Color History */}
              <div className="recolor-section-card">
                <h3 className="recolor-section-title">Color History</h3>
                <div className="recolor-history">
                  {recentColors.map(color => (
                    <div key={color} className="recolor-history-item">
                      <button
                        className="recolor-history-color"
                        style={{ backgroundColor: color, borderColor: color === '#ffffff' ? '#e4ddd5' : color }}
                        onClick={() => setSelectedColor(color)}
                      ></button>
                      <button className="recolor-apply-again-btn">Apply Again</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle Column: Preview */}
            <div className="recolor-main">
              {/* 6️⃣ Before & After Preview */}
              <div className="recolor-preview-wrapper">
                <div className="recolor-preview-actions">
                  <div className="recolor-toggle-view-group">
                    <span>Original</span>
                    <span className="recolor-toggle-arrow">↓</span>
                    <span>Recolored</span>
                  </div>
                  <div className="recolor-zoom-actions">
                    <button className="recolor-zoom-btn">
                      <ZoomIn size={18} />
                    </button>
                    <button className="recolor-zoom-btn">
                      <ZoomOut size={18} />
                    </button>
                    <button className="recolor-zoom-btn">
                      <Maximize2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="recolor-preview-container">
                  <div className="recolor-before-wrapper">
                    <div className="recolor-preview-label">Original</div>
                    <div className="recolor-preview-inner">
                      <div className="recolor-placeholder-img">
                        <ImageIcon size={64} />
                      </div>
                    </div>
                  </div>
                  <div className="recolor-divider"></div>
                  <div className="recolor-after-wrapper">
                    <div className="recolor-preview-label">Recolored</div>
                    <div className="recolor-preview-inner">
                      <div className="recolor-placeholder-img">
                        <ImageIcon size={64} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 7️⃣ Fine Adjustments */}
              <div className="recolor-section-card">
                <h3 className="recolor-section-title">Fine Adjustments</h3>
                <div className="recolor-adjustments">
                  <div className="recolor-adjustment">
                    <div className="recolor-adjustment-label">
                      <span>Color Intensity</span>
                      <span>{intensity}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={intensity}
                      onChange={(e) => setIntensity(Number(e.target.value))}
                    />
                  </div>
                  <div className="recolor-adjustment">
                    <div className="recolor-adjustment-label">
                      <span>Saturation</span>
                      <span>{saturation}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={saturation}
                      onChange={(e) => setSaturation(Number(e.target.value))}
                    />
                  </div>
                  <div className="recolor-adjustment">
                    <div className="recolor-adjustment-label">
                      <span>Brightness</span>
                      <span>{brightness}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={brightness}
                      onChange={(e) => setBrightness(Number(e.target.value))}
                    />
                  </div>
                  <div className="recolor-adjustment">
                    <div className="recolor-adjustment-label">
                      <span>Contrast</span>
                      <span>{contrast}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={contrast}
                      onChange={(e) => setContrast(Number(e.target.value))}
                    />
                  </div>
                  <div className="recolor-checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="preserve-texture"
                      checked={preserveTexture}
                      onChange={(e) => setPreserveTexture(e.target.checked)}
                    />
                    <label for="preserve-texture">Preserve Fabric Texture</label>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Export */}
            <div className="recolor-sidebar-right">
              {/* 9️⃣ Export */}
              <div className="recolor-section-card">
                <h3 className="recolor-section-title">Export</h3>
                <div className="recolor-export-buttons">
                  <button className="btn-primary recolor-full-btn">
                    <Download size={18} />
                    Download PNG
                  </button>
                  <button className="btn-secondary recolor-full-btn">
                    <Save size={18} />
                    Save to Assets
                  </button>
                  <button className="btn-secondary recolor-full-btn">
                    <Layout size={18} />
                    Save to Workspace
                  </button>
                  <button className="btn-secondary recolor-full-btn">
                    <Palette size={18} />
                    Generate Mockup
                  </button>
                  <button className="btn-secondary recolor-full-btn">
                    <Share2 size={18} />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* 2️⃣ Upload / Select Image */}
            <div className="recolor-upload-area upload-area-card">
              <div className="upload-dropzone">
                <div className="upload-icon-wrapper">
                  <Palette size={64} />
                </div>
                <h3>Upload or select an outfit image</h3>
                <div className="recolor-upload-buttons">
                  <button className="btn-primary">
                    <Upload size={18} />
                    Upload
                  </button>
                  <button className="btn-secondary">
                    <FolderOpen size={18} />
                    Browse Assets
                  </button>
                </div>
                <div className="upload-formats">
                  <span>PNG</span>
                  <span>JPG</span>
                  <span>JPEG</span>
                  <span>WEBP</span>
                </div>
              </div>
            </div>

            {/* 🔟 Empty State */}
            <div className="recolor-empty-state empty-state-card">
              <div className="empty-state-icon-wrapper">
                <Palette size={64} />
              </div>
              <h3>Upload an outfit image to start recoloring.</h3>
              <button
                className="btn-primary"
                onClick={() => setHasUploadedImage(true)}
              >
                <Upload size={18} />
                Upload Image
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default RecolorOutfitSection;

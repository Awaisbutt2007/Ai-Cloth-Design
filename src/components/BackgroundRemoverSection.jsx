
import React, { useState } from 'react';
import {
  Upload,
  History,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RefreshCw,
  Eraser,
  Crop,
  RotateCw,
  FlipHorizontal,
  Sparkles,
  Download,
  Save,
  Layout,
  Palette,
  Image as ImageIcon,
  Trash2,
  Check
} from 'lucide-react';

function BackgroundRemoverSection({ activeSection }) {
  const [hasUploadedImage, setHasUploadedImage] = useState(false);
  const [showBefore, setShowBefore] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [aiQuality, setAiQuality] = useState('standard');
  const [edgeDetection, setEdgeDetection] = useState(50);
  const [feather, setFeather] = useState(10);
  const [shadow, setShadow] = useState(true);
  const [keepTransparent, setKeepTransparent] = useState(true);
  const [selectedBgCategory, setSelectedBgCategory] = useState('transparent');
  const [exportFormat, setExportFormat] = useState('png');
  const [exportQuality, setExportQuality] = useState('hd');

  const sectionId = 'ai-tools-background-remover';
  const activeId = 'background-remover';

  if (activeSection !== activeId) return null;

  const bgCategories = [
    { id: 'transparent', name: 'Transparent' },
    { id: 'white', name: 'White' },
    { id: 'black', name: 'Black' },
    { id: 'solid', name: 'Solid Colors' },
    { id: 'studio', name: 'Studio' },
    { id: 'outdoor', name: 'Outdoor' },
    { id: 'runway', name: 'Fashion Runway' },
    { id: 'gradient', name: 'Gradient' }
  ];

  const historyItems = [
    { id: 1, name: 'Jacket.png', date: 'Today', status: 'Completed', action: 'Download' },
    { id: 2, name: 'Dress.jpg', date: 'Yesterday', status: 'Completed', action: 'Open' },
    { id: 3, name: 'Shoes.png', date: 'Yesterday', status: 'Completed', action: 'Reuse' }
  ];

  return (
    <section id={sectionId} className={`section background-remover-section ${activeSection === activeId ? 'active' : 'hidden'}`}>
      <div className="sub-content">

        {/* 1️⃣ Header */}
        <div className="bg-remover-header">
          <div className="bg-remover-header-text">
            <h2>Background Remover</h2>
            <p>Remove image backgrounds instantly using AI.</p>
          </div>
          <div className="bg-remover-header-actions">
            <button className="btn-primary">
              <Upload size={18} />
              Upload Image
            </button>
            <button className="btn-secondary">
              <History size={18} />
              History
            </button>
          </div>
        </div>

        {hasUploadedImage ? (
          <div className="bg-remover-layout">
            {/* Left Column: Tool Settings & Edit Tools */}
            <div className="bg-remover-sidebar-left">
              {/* 3️⃣ Tool Settings */}
              <div className="bg-remover-section-card">
                <h3 className="bg-remover-section-title">Tool Settings</h3>
                
                <div className="bg-remover-setting-group">
                  <label>AI Quality</label>
                  <div className="bg-remover-radio-group">
                    <button
                      className={`bg-remover-radio-btn ${aiQuality === 'fast' ? 'active' : ''}`}
                      onClick={() => setAiQuality('fast')}
                    >
                      Fast
                    </button>
                    <button
                      className={`bg-remover-radio-btn ${aiQuality === 'standard' ? 'active' : ''}`}
                      onClick={() => setAiQuality('standard')}
                    >
                      Standard
                    </button>
                    <button
                      className={`bg-remover-radio-btn ${aiQuality === 'high' ? 'active' : ''}`}
                      onClick={() => setAiQuality('high')}
                    >
                      High Quality
                    </button>
                  </div>
                </div>

                <div className="bg-remover-setting-group">
                  <label>Edge Detection: <span>{edgeDetection}</span></label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={edgeDetection}
                    onChange={(e) => setEdgeDetection(Number(e.target.value))}
                  />
                  <div className="bg-remover-slider-labels">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>

                <div className="bg-remover-setting-group">
                  <label>Feather: <span>{feather}</span></label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={feather}
                    onChange={(e) => setFeather(Number(e.target.value))}
                  />
                </div>

                <div className="bg-remover-setting-group">
                  <label>Shadow</label>
                  <button
                    className={`bg-remover-toggle ${shadow ? 'active' : ''}`}
                    onClick={() => setShadow(!shadow)}
                  >
                    <span>{shadow ? 'ON' : 'OFF'}</span>
                  </button>
                </div>

                <div className="bg-remover-setting-group">
                  <div className="bg-remover-checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="keep-transparent"
                      checked={keepTransparent}
                      onChange={(e) => setKeepTransparent(e.target.checked)}
                    />
                    <label for="keep-transparent">Keep Transparent Background</label>
                  </div>
                </div>
              </div>

              {/* 5️⃣ Edit Tools */}
              <div className="bg-remover-section-card">
                <h3 className="bg-remover-section-title">Edit Tools</h3>
                <div className="bg-remover-edit-tools-grid">
                  <button className="bg-remover-edit-btn">
                    <RefreshCw size={18} />
                    Restore Brush
                  </button>
                  <button className="bg-remover-edit-btn">
                    <Eraser size={18} />
                    Erase Brush
                  </button>
                  <button className="bg-remover-edit-btn">
                    <Crop size={18} />
                    Crop
                  </button>
                  <button className="bg-remover-edit-btn">
                    <RotateCw size={18} />
                    Rotate
                  </button>
                  <button className="bg-remover-edit-btn">
                    <FlipHorizontal size={18} />
                    Flip
                  </button>
                  <button className="bg-remover-edit-btn">
                    <Sparkles size={18} />
                    Magic Eraser
                  </button>
                </div>
              </div>

              {/* 8️⃣ History */}
              <div className="bg-remover-section-card">
                <h3 className="bg-remover-section-title">History</h3>
                <div className="bg-remover-history-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historyItems.map(item => (
                        <tr key={item.id}>
                          <td className="bg-remover-history-name">{item.name}</td>
                          <td>{item.date}</td>
                          <td className="bg-remover-status-completed">{item.status}</td>
                          <td><button className="bg-remover-small-link">{item.action}</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Middle Column: Original vs Result Preview */}
            <div className="bg-remover-main">
              {/* 4️⃣ Original vs Result */}
              <div className="bg-remover-preview-wrapper">
                <div className="bg-remover-preview-actions">
                  <button
                    className={`bg-remover-toggle-view ${!showBefore ? 'active' : ''}`}
                    onClick={() => setShowBefore(!showBefore)}
                  >
                    {showBefore ? 'After' : 'Before'}
                  </button>
                  <button
                    className="bg-remover-zoom-btn"
                    onClick={() => setZoomLevel(z => Math.min(z + 0.2, 2))}
                  >
                    <ZoomIn size={18} />
                  </button>
                  <button
                    className="bg-remover-zoom-btn"
                    onClick={() => setZoomLevel(z => Math.max(z - 0.2, 0.5))}
                  >
                    <ZoomOut size={18} />
                  </button>
                  <button className="bg-remover-zoom-btn">
                    <Maximize2 size={18} />
                  </button>
                </div>
                <div className="bg-remover-preview-container">
                  <div
                    className="bg-remover-preview-inner"
                    style={{ transform: `scale(${zoomLevel})` }}
                  >
                    {showBefore ? (
                      <div className="bg-remover-original">
                        <div className="bg-remover-placeholder-img">
                          <ImageIcon size={64} />
                          <span>Original Image</span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-remover-result">
                        <div className="bg-remover-placeholder-img">
                          <ImageIcon size={64} />
                          <span>Background Removed</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Background Library & Export Options */}
            <div className="bg-remover-sidebar-right">
              {/* 6️⃣ Background Library */}
              <div className="bg-remover-section-card">
                <h3 className="bg-remover-section-title">Background Library</h3>
                <div className="bg-remover-bg-categories">
                  {bgCategories.map(cat => (
                    <button
                      key={cat.id}
                      className={`bg-remover-bg-cat-btn ${selectedBgCategory === cat.id ? 'active' : ''}`}
                      onClick={() => setSelectedBgCategory(cat.id)}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
                <button className="bg-remover-upload-bg-btn">
                  <Upload size={16} />
                  Upload Background
                </button>
              </div>

              {/* 7️⃣ Export Options */}
              <div className="bg-remover-section-card">
                <h3 className="bg-remover-section-title">Export Options</h3>
                
                <div className="bg-remover-setting-group">
                  <label>Format</label>
                  <div className="bg-remover-format-buttons">
                    <button
                      className={`bg-remover-format-btn ${exportFormat === 'png' ? 'active' : ''}`}
                      onClick={() => setExportFormat('png')}
                    >
                      PNG (Transparent)
                    </button>
                    <button
                      className={`bg-remover-format-btn ${exportFormat === 'jpg' ? 'active' : ''}`}
                      onClick={() => setExportFormat('jpg')}
                    >
                      JPG
                    </button>
                    <button
                      className={`bg-remover-format-btn ${exportFormat === 'webp' ? 'active' : ''}`}
                      onClick={() => setExportFormat('webp')}
                    >
                      WEBP
                    </button>
                    <button
                      className={`bg-remover-format-btn ${exportFormat === 'pdf' ? 'active' : ''}`}
                      onClick={() => setExportFormat('pdf')}
                    >
                      PDF
                    </button>
                  </div>
                </div>

                <div className="bg-remover-setting-group">
                  <label>Quality</label>
                  <div className="bg-remover-radio-group">
                    <button
                      className={`bg-remover-radio-btn ${exportQuality === 'standard' ? 'active' : ''}`}
                      onClick={() => setExportQuality('standard')}
                    >
                      Standard
                    </button>
                    <button
                      className={`bg-remover-radio-btn ${exportQuality === 'hd' ? 'active' : ''}`}
                      onClick={() => setExportQuality('hd')}
                    >
                      HD
                    </button>
                    <button
                      className={`bg-remover-radio-btn ${exportQuality === 'ultra' ? 'active' : ''}`}
                      onClick={() => setExportQuality('ultra')}
                    >
                      Ultra HD
                    </button>
                  </div>
                </div>

                <div className="bg-remover-export-buttons">
                  <button className="btn-primary bg-remover-full-btn">
                    <Download size={18} />
                    Download
                  </button>
                  <button className="btn-secondary bg-remover-full-btn">
                    <Save size={18} />
                    Save to Assets
                  </button>
                  <button className="btn-secondary bg-remover-full-btn">
                    <Layout size={18} />
                    Use in Workspace
                  </button>
                  <button className="btn-secondary bg-remover-full-btn">
                    <Palette size={18} />
                    Generate Mockup
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* 2️⃣ Upload Image */}
            <div className="bg-remover-upload-area upload-area-card">
              <div className="upload-dropzone">
                <div className="upload-icon-wrapper">
                  <ImageIcon size={64} />
                </div>
                <h3>Drag & Drop your image here</h3>
                <p>or</p>
                <div className="bg-remover-upload-buttons">
                  <button className="btn-primary">
                    <Upload size={18} />
                    Browse Files
                  </button>
                  <button className="btn-secondary">
                    Paste Image
                  </button>
                </div>
                <div className="upload-formats">
                  <span>PNG</span>
                  <span>JPG</span>
                  <span>JPEG</span>
                  <span>WEBP</span>
                </div>
                <p className="upload-note">Maximum Size: 20 MB</p>
              </div>
            </div>

            {/* 9️⃣ Empty State */}
            <div className="bg-remover-empty-state empty-state-card">
              <div className="empty-state-icon-wrapper">
                <ImageIcon size={64} />
              </div>
              <h3>Upload an image to remove its background.</h3>
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

export default BackgroundRemoverSection;

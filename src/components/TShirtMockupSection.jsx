import React, { useState } from 'react';
import {
  Sparkles,
  Upload,
  Folder,
  Layout,
  Palette,
  Rotate3d,
  Maximize,
  Download,
  Share2,
  Save,
  Edit,
  Copy,
  Trash2,
  Shirt,
  Plus,
  Image as ImageIcon,
  Move,
  RotateCcw,
  Scissors
} from 'lucide-react';

function TShirtMockupSection({ activeSection }) {
  const [hasCreatedMockup, setHasCreatedMockup] = useState(false);
  const [activePreviewMode, setActivePreviewMode] = useState('front');
  const [activeModel, setActiveModel] = useState('male');
  const [activeScene, setActiveScene] = useState('studio');
  const [selectedMockup, setSelectedMockup] = useState('basic-tshirt');
  const [selectedPlacement, setSelectedPlacement] = useState('front-center');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedFit, setSelectedFit] = useState('Regular');
  const [selectedFabric, setSelectedFabric] = useState('Cotton');
  const [shirtColor, setShirtColor] = useState('#000000');
  const [sleeveColor, setSleeveColor] = useState('#000000');
  const [collarColor, setCollarColor] = useState('#000000');
  const [stitchColor, setStitchColor] = useState('#ffffff');
  const [selectedExportFormat, setSelectedExportFormat] = useState('PNG');

  const activeId = 't-shirt-mockup';

  if (activeSection !== activeId) return null;

  const mockupCategories = [
    { id: 'basic-tshirt', name: 'Basic T-Shirt' },
    { id: 'oversized', name: 'Oversized' },
    { id: 'polo', name: 'Polo' },
    { id: 'v-neck', name: 'V-Neck' },
    { id: 'long-sleeve', name: 'Long Sleeve' },
    { id: 'crop-top', name: 'Crop Top' },
    { id: 'sports-tee', name: 'Sports Tee' },
    { id: 'kids-tshirt', name: 'Kids T-Shirt' }
  ];

  const viewOptions = [
    'Front', 'Back', 'Left Side', 'Right Side', 'Folded View', 'Hanging View', 'Flat Lay', 'On Model'
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const fits = ['Regular', 'Slim', 'Oversized', 'Relaxed'];
  const fabrics = ['Cotton', 'Polyester', 'Linen', 'Dry Fit', 'Heavy Cotton'];
  const placements = [
    'Front Center', 'Back', 'Left Chest', 'Right Chest', 'Sleeve', 'Pocket', 'Full Front', 'Full Back'
  ];

  const quickColors = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#ffffff' },
    { name: 'Red', value: '#ff0000' },
    { name: 'Blue', value: '#0000ff' },
    { name: 'Green', value: '#00ff00' },
    { name: 'Beige', value: '#f5f5dc' },
    { name: 'Gray', value: '#808080' }
  ];

  const previewModes = ['Front', 'Back', '360° View', 'Male Model', 'Female Model', 'Invisible Mannequin', 'Flat Lay'];

  const scenes = ['Studio', 'Street', 'Gym', 'Beach', 'Cafe', 'Fashion Store'];

  const printMethods = ['Screen Printing', 'DTG', 'Embroidery', 'Heat Transfer'];

  const multiColorVariants = ['Black', 'White', 'Blue', 'Red', 'Green'];

  const savedMockups = [
    { id: 1, mockup: 'Black Tee', product: 'Oversized', date: 'Today', status: 'Saved' },
    { id: 2, mockup: 'White Tee', product: 'Polo', date: 'Yesterday', status: 'Exported' }
  ];

  const exportFormats = ['PNG', 'JPG', 'PDF', 'PSD (Optional)'];

  return (
    <section className={`section ${activeSection === activeId ? 'active' : 'hidden'}`}>
      <div className="sub-content">
        <div className="tsm-section">
          {/* Header */}
          <div className="tsm-header">
            <div className="tsm-header-content">
              <h2>T-Shirt Mockups</h2>
              <p>Create realistic AI-powered T-shirt mockups.</p>
            </div>
            <div className="tsm-header-actions">
              <button className="tsm-btn-primary" onClick={() => setHasCreatedMockup(true)}>
                <Plus size={18} />
                New Mockup
              </button>
              <button className="tsm-btn-secondary">
                <Layout size={18} />
                Browse Templates
              </button>
            </div>
          </div>

          {hasCreatedMockup ? (
            <>
              {/* Upload Design */}
              <div className="tsm-upload-section">
                <h3 className="tsm-section-title">Upload Design</h3>
                <div className="tsm-upload-area">
                  <div className="tsm-upload-icon">
                    <Upload size={32} />
                  </div>
                  <div className="tsm-upload-text">
                    <h4>Drag and drop your design here</h4>
                    <p>or click to browse files</p>
                  </div>
                  <div className="tsm-upload-formats">
                    {['PNG', 'SVG', 'AI Generated Design'].map((format, idx) => (
                      <span key={idx} className="tsm-format-tag">{format}</span>
                    ))}
                  </div>
                </div>
                <div className="tsm-upload-actions">
                  <button className="tsm-btn-outline">
                    <Upload size={16} />
                    Upload Design
                  </button>
                  <button className="tsm-btn-outline">
                    <Folder size={16} />
                    Choose From Assets
                  </button>
                  <button className="tsm-btn-outline">
                    <Layout size={16} />
                    Choose From Workspace
                  </button>
                </div>
              </div>

              {/* Choose Mockup */}
              <div className="tsm-choose-mockup-section">
                <h3 className="tsm-section-title">Choose Mockup</h3>
                <div className="tsm-category-tabs">
                  {mockupCategories.map(cat => (
                    <button
                      key={cat.id}
                      className={`tsm-category-tab ${selectedMockup === cat.id ? 'active' : ''}`}
                      onClick={() => setSelectedMockup(cat.id)}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
                <div className="tsm-view-options">
                  {viewOptions.map(view => (
                    <button
                      key={view}
                      className="tsm-view-btn"
                    >
                      {view}
                    </button>
                  ))}
                </div>
                <div className="tsm-mockup-grid">
                  {mockupCategories.map(cat => (
                    <div
                      key={cat.id}
                      className={`tsm-mockup-card ${selectedMockup === cat.id ? 'selected' : ''}`}
                      onClick={() => setSelectedMockup(cat.id)}
                    >
                      <div className="tsm-mockup-placeholder">
                        <div className="tsm-mockup-placeholder-icon">
                          <Shirt size={40} />
                        </div>
                        <p>{cat.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Settings */}
              <div className="tsm-settings-section">
                <h3 className="tsm-section-title">Product Settings</h3>
                <div className="tsm-settings-grid">
                  <div className="tsm-setting-group">
                    <label>Size</label>
                    <div className="tsm-size-buttons">
                      {sizes.map(size => (
                        <button
                          key={size}
                          className={`tsm-size-btn ${selectedSize === size ? 'active' : ''}`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="tsm-setting-group">
                    <label>Fit</label>
                    <select className="tsm-select" value={selectedFit} onChange={(e) => setSelectedFit(e.target.value)}>
                      {fits.map(fit => (
                        <option key={fit} value={fit}>{fit}</option>
                      ))}
                    </select>
                  </div>
                  <div className="tsm-setting-group">
                    <label>Fabric</label>
                    <select className="tsm-select" value={selectedFabric} onChange={(e) => setSelectedFabric(e.target.value)}>
                      {fabrics.map(fabric => (
                        <option key={fabric} value={fabric}>{fabric}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Design Placement */}
              <div className="tsm-placement-section">
                <h3 className="tsm-section-title">Design Placement</h3>
                <div className="tsm-placement-options">
                  {placements.map(place => (
                    <button
                      key={place}
                      className={`tsm-placement-btn ${selectedPlacement === place.toLowerCase().replace(/\s+/g, '-') ? 'active' : ''}`}
                      onClick={() => setSelectedPlacement(place.toLowerCase().replace(/\s+/g, '-'))}
                    >
                      {place}
                    </button>
                  ))}
                </div>
                <div className="tsm-placement-controls">
                  <button className="tsm-control-btn"><Move size={18} /></button>
                  <button className="tsm-control-btn"><Scissors size={18} /></button>
                  <button className="tsm-control-btn"><RotateCcw size={18} /></button>
                  <button className="tsm-control-btn"><Rotate3d size={18} /></button>
                  <button className="tsm-control-btn"><Copy size={18} /></button>
                </div>
              </div>

              {/* Color Customization */}
              <div className="tsm-color-section">
                <h3 className="tsm-section-title">Color Customization</h3>
                <div className="tsm-color-groups">
                  <div className="tsm-color-group">
                    <label>Shirt Color</label>
                    <div className="tsm-color-input-row">
                      <input type="color" className="tsm-color-picker" value={shirtColor} onChange={(e) => setShirtColor(e.target.value)} />
                      <input type="text" className="tsm-color-hex" value={shirtColor} readOnly />
                    </div>
                  </div>
                  <div className="tsm-color-group">
                    <label>Sleeve Color</label>
                    <div className="tsm-color-input-row">
                      <input type="color" className="tsm-color-picker" value={sleeveColor} onChange={(e) => setSleeveColor(e.target.value)} />
                      <input type="text" className="tsm-color-hex" value={sleeveColor} readOnly />
                    </div>
                  </div>
                  <div className="tsm-color-group">
                    <label>Collar Color</label>
                    <div className="tsm-color-input-row">
                      <input type="color" className="tsm-color-picker" value={collarColor} onChange={(e) => setCollarColor(e.target.value)} />
                      <input type="text" className="tsm-color-hex" value={collarColor} readOnly />
                    </div>
                  </div>
                  <div className="tsm-color-group">
                    <label>Stitch Color (Optional)</label>
                    <div className="tsm-color-input-row">
                      <input type="color" className="tsm-color-picker" value={stitchColor} onChange={(e) => setStitchColor(e.target.value)} />
                      <input type="text" className="tsm-color-hex" value={stitchColor} readOnly />
                    </div>
                  </div>
                </div>
                <div className="tsm-quick-colors">
                  {quickColors.map(color => (
                    <button
                      key={color.name}
                      className={`tsm-quick-color-btn ${shirtColor === color.value ? 'active' : ''}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => {
                        setShirtColor(color.value);
                        setSleeveColor(color.value);
                        setCollarColor(color.value);
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Live 3D Preview */}
              <div className="tsm-preview-section">
                <h3 className="tsm-section-title">Live 3D Preview</h3>
                <div className="tsm-preview-container">
                  <div className="tsm-preview-tabs">
                    {previewModes.map(mode => (
                      <button
                        key={mode}
                        className={`tsm-preview-tab ${activePreviewMode === mode.toLowerCase().replace(/\s+/g, '-').replace(/°/g, '') ? 'active' : ''}`}
                        onClick={() => setActivePreviewMode(mode.toLowerCase().replace(/\s+/g, '-').replace(/°/g, ''))}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                  <div className="tsm-preview-mockup">
                    <Shirt size={80} />
                  </div>
                  <div className="tsm-preview-controls">
                    <button className="tsm-zoom-btn"><Maximize size={16} /></button>
                    <button className="tsm-fullscreen-btn"><Maximize size={16} /> Fullscreen</button>
                  </div>
                </div>
              </div>

              {/* Mockup Details */}
              <div className="tsm-details-section">
                <h3 className="tsm-section-title">Mockup Details</h3>
                <div className="tsm-details-grid">
                  <div className="tsm-detail-card">
                    <div className="tsm-detail-label">Product</div>
                    <div className="tsm-detail-value">Oversized T-Shirt</div>
                  </div>
                  <div className="tsm-detail-card">
                    <div className="tsm-detail-label">Color</div>
                    <div className="tsm-detail-value">Black</div>
                  </div>
                  <div className="tsm-detail-card">
                    <div className="tsm-detail-label">Fabric</div>
                    <div className="tsm-detail-value">Cotton</div>
                  </div>
                  <div className="tsm-detail-card">
                    <div className="tsm-detail-label">Print Area</div>
                    <div className="tsm-detail-value">Front Center</div>
                  </div>
                  <div className="tsm-detail-card">
                    <div className="tsm-detail-label">Resolution</div>
                    <div className="tsm-detail-value">4000 × 4000</div>
                  </div>
                  <div className="tsm-detail-card">
                    <div className="tsm-detail-label">DPI</div>
                    <div className="tsm-detail-value">300</div>
                  </div>
                </div>
              </div>

              {/* Export */}
              <div className="tsm-export-section">
                <h3 className="tsm-section-title">Export</h3>
                <div className="tsm-export-formats">
                  {exportFormats.map(format => (
                    <button
                      key={format}
                      className={`tsm-format-btn ${selectedExportFormat === format ? 'active' : ''}`}
                      onClick={() => setSelectedExportFormat(format)}
                    >
                      {format}
                    </button>
                  ))}
                </div>
                <div className="tsm-export-actions">
                  <button className="tsm-btn-primary">
                    <Download size={16} />
                    Download
                  </button>
                  <button className="tsm-btn-secondary">
                    <Layout size={16} />
                    Save to Workspace
                  </button>
                  <button className="tsm-btn-secondary">
                    <Save size={16} />
                    Save to Assets
                  </button>
                  <button className="tsm-btn-secondary">
                    <Share2 size={16} />
                    Share
                  </button>
                  <button className="tsm-btn-secondary">
                    <Sparkles size={16} />
                    Generate Product Page
                  </button>
                </div>
              </div>

              {/* Saved Mockups */}
              <div className="tsm-saved-section">
                <h3 className="tsm-section-title">Saved Mockups</h3>
                <div className="tsm-saved-grid">
                  {savedMockups.map(mockup => (
                    <div key={mockup.id} className="tsm-saved-card">
                      <div className="tsm-saved-preview">
                        <Shirt size={48} />
                      </div>
                      <div className="tsm-saved-info">
                        <div className="tsm-saved-name">{mockup.mockup}</div>
                        <div className="tsm-saved-meta">
                          {mockup.product} • {mockup.date} • {mockup.status}
                        </div>
                        <div className="tsm-saved-actions">
                          <button className="tsm-saved-action-btn"><Edit size={14} /> Edit</button>
                          <button className="tsm-saved-action-btn"><Copy size={14} /> Duplicate</button>
                          <button className="tsm-saved-action-btn delete"><Trash2 size={14} /> Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Features */}
              <div className="tsm-premium-section">
                <h3 className="tsm-premium-title">🌟 Premium Features</h3>
                <div className="tsm-premium-grid">
                  <div className="tsm-premium-card">
                    <h4>👕 AI Model Preview</h4>
                    <p>Ek hi design ko different models par dekho.</p>
                    <div className="tsm-premium-options">
                      {['Male', 'Female', 'Child', 'Plus Size'].map(model => (
                        <span key={model} className="tsm-premium-option">{model}</span>
                      ))}
                    </div>
                  </div>
                  <div className="tsm-premium-card">
                    <h4>📸 Lifestyle Scenes</h4>
                    <p>Backgrounds to choose from.</p>
                    <div className="tsm-premium-options">
                      {scenes.map(scene => (
                        <span key={scene} className="tsm-premium-option">{scene}</span>
                      ))}
                    </div>
                  </div>
                  <div className="tsm-premium-card">
                    <h4>🌞 Lighting Controls</h4>
                    <p>User adjust kar sake brightness, shadow, contrast.</p>
                  </div>
                  <div className="tsm-premium-card">
                    <h4>🧵 Print Method</h4>
                    <p>Preview bhi us hisaab se change ho.</p>
                    <div className="tsm-premium-options">
                      {printMethods.map(method => (
                        <span key={method} className="tsm-premium-option">{method}</span>
                      ))}
                    </div>
                  </div>
                  <div className="tsm-premium-card">
                    <h4>🎨 Multiple Color Variants</h4>
                    <p>Ek design ko ek sath multiple shirt colors par preview karo.</p>
                    <div className="tsm-premium-options">
                      {multiColorVariants.map(variant => (
                        <span key={variant} className="tsm-premium-option">{variant}</span>
                      ))}
                    </div>
                  </div>
                  <div className="tsm-premium-card">
                    <h4>🏷️ Product Information</h4>
                    <p>Automatically generate product name, description, SKU, tags.</p>
                  </div>
                  <div className="tsm-premium-card">
                    <h4>📏 Print Safe Area</h4>
                    <p>Ek overlay dikhaye jahan design safely print ho sakta hai.</p>
                  </div>
                  <div className="tsm-premium-card">
                    <h4>💰 Cost Estimation</h4>
                    <p>Printing cost, selling price, estimated profit.</p>
                    <div className="tsm-cost-calculation" style={{ marginTop: 12, padding: 12, background: '#f5f5f5', borderRadius: 8 }}>
                      <div className="tsm-cost-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span>Printing Cost</span>
                        <span>$6.50</span>
                      </div>
                      <div className="tsm-cost-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span>Selling Price</span>
                        <span>$20</span>
                      </div>
                      <div className="tsm-cost-item total" style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: '#7f58ff' }}>
                        <span>Estimated Profit</span>
                        <span>$13.50</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="tsm-empty-state">
              <div className="tsm-empty-icon">
                <Shirt size={64} />
              </div>
              <h3>No Mockups Yet</h3>
              <p>Upload your first design to create a T-shirt mockup.</p>
              <button className="tsm-btn-primary" onClick={() => setHasCreatedMockup(true)}>
                <Plus size={18} />
                Create Mockup
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default TShirtMockupSection;

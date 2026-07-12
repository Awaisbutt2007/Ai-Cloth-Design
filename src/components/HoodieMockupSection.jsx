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
  Move,
  RotateCcw,
  Scissors,
  ShoppingBag
} from 'lucide-react';

function HoodieMockupSection({ activeSection }) {
  const [hasCreatedMockup, setHasCreatedMockup] = useState(false);
  const [activePreviewMode, setActivePreviewMode] = useState('front');
  const [activeModel, setActiveModel] = useState('male');
  const [activeScene, setActiveScene] = useState('studio');
  const [selectedHoodieStyle, setSelectedHoodieStyle] = useState('pullover');
  const [selectedPlacement, setSelectedPlacement] = useState('front-center');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedFit, setSelectedFit] = useState('Regular');
  const [selectedFabric, setSelectedFabric] = useState('Cotton');
  const [primaryColor, setPrimaryColor] = useState('#000000');
  const [secondaryColor, setSecondaryColor] = useState('#ffffff');
  const [selectedExportFormat, setSelectedExportFormat] = useState('PNG');

  const activeId = 'hoodie-mockup';

  if (activeSection !== activeId) return null;

  const hoodieStyles = [
    { id: 'pullover', name: 'Pullover Hoodie' },
    { id: 'zip', name: 'Zip Hoodie' },
    { id: 'oversized', name: 'Oversized Hoodie' },
    { id: 'cropped', name: 'Cropped Hoodie' },
    { id: 'heavyweight', name: 'Heavyweight Hoodie' },
    { id: 'sports', name: 'Sports Hoodie' },
    { id: 'kids', name: 'Kids Hoodie' }
  ];

  const viewOptions = [
    'Front', 'Back', 'Left Side', 'Right Side', 'Folded', 'Hanging', 'Flat Lay', 'On Model'
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const fits = ['Regular', 'Oversized', 'Relaxed', 'Slim'];
  const fabrics = ['Cotton', 'Fleece', 'French Terry', 'Polyester Blend', 'Heavyweight Cotton'];
  const placements = [
    'Front Center', 'Back', 'Left Chest', 'Right Chest', 'Left Sleeve', 'Right Sleeve', 'Hood', 'Pocket', 'Full Front', 'Full Back'
  ];

  const quickColors = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#ffffff' },
    { name: 'Gray', value: '#808080' },
    { name: 'Beige', value: '#f5f5dc' },
    { name: 'Navy', value: '#000080' },
    { name: 'Olive', value: '#808000' },
    { name: 'Red', value: '#ff0000' },
    { name: 'Brown', value: '#a52a2a' }
  ];

  const previewModes = ['Front', 'Back', '360°', 'Male', 'Female', 'Child', 'Invisible Mannequin', 'Flat Lay'];
  const scenes = ['Studio', 'Street', 'Gym', 'Winter', 'Lifestyle'];

  const printMethods = ['Screen Printing', 'DTG', 'Embroidery', 'Puff Print'];
  const fabricTextures = ['Cotton', 'Fleece', 'French Terry', 'Heavyweight'];
  const multiColorVariants = ['Black', 'White', 'Brown', 'Olive', 'Navy'];

  const savedMockups = [
    { id: 1, mockup: 'Black Hoodie', style: 'Oversized', date: 'Today', status: 'Saved' },
    { id: 2, mockup: 'Gray Zip Hoodie', style: 'Zip', date: 'Yesterday', status: 'Exported' }
  ];

  const exportFormats = ['PNG', 'JPG', 'PDF', 'PSD (Optional)'];

  return (
    <section className={`section ${activeSection === activeId ? 'active' : 'hidden'}`}>
      <div className="sub-content">
        <div className="hsm-section">
          {/* Header */}
          <div className="hsm-header">
            <div className="hsm-header-content">
              <h2>Hoodie Mockups</h2>
              <p>Create realistic AI-powered hoodie mockups.</p>
            </div>
            <div className="hsm-header-actions">
              <button className="hsm-btn-primary" onClick={() => setHasCreatedMockup(true)}>
                <Plus size={18} />
                New Mockup
              </button>
              <button className="hsm-btn-secondary">
                <Layout size={18} />
                Browse Templates
              </button>
            </div>
          </div>

          {hasCreatedMockup ? (
            <>
              {/* Upload Design */}
              <div className="hsm-upload-section">
                <h3 className="hsm-section-title">Upload Design</h3>
                <div className="hsm-upload-area">
                  <div className="hsm-upload-icon">
                    <Upload size={32} />
                  </div>
                  <div className="hsm-upload-text">
                    <h4>Drag and drop your design here</h4>
                    <p>or click to browse files</p>
                  </div>
                  <div className="hsm-upload-formats">
                    {['PNG', 'SVG', 'AI Generated Image'].map((format, idx) => (
                      <span key={idx} className="hsm-format-tag">{format}</span>
                    ))}
                  </div>
                </div>
                <div className="hsm-upload-actions">
                  <button className="hsm-btn-outline">
                    <Upload size={16} />
                    Upload PNG/SVG
                  </button>
                  <button className="hsm-btn-outline">
                    <Folder size={16} />
                    Choose from Assets
                  </button>
                  <button className="hsm-btn-outline">
                    <Layout size={16} />
                    Choose from Workspace
                  </button>
                  <button className="hsm-btn-outline">
                    <Sparkles size={16} />
                    Choose AI Generated Image
                  </button>
                </div>
              </div>

              {/* Choose Hoodie Style */}
              <div className="hsm-choose-style-section">
                <h3 className="hsm-section-title">Choose Hoodie Style</h3>
                <div className="hsm-style-grid">
                  {hoodieStyles.map(style => (
                    <div
                      key={style.id}
                      className={`hsm-style-card ${selectedHoodieStyle === style.id ? 'selected' : ''}`}
                      onClick={() => setSelectedHoodieStyle(style.id)}
                    >
                      <div className="hsm-style-icon">
                        <ShoppingBag size={40} />
                      </div>
                      <p>{style.name}</p>
                    </div>
                  ))}
                </div>
                <div className="hsm-view-options">
                  {viewOptions.map(view => (
                    <button key={view} className="hsm-view-btn">{view}</button>
                  ))}
                </div>
              </div>

              {/* Product Settings */}
              <div className="hsm-settings-section">
                <h3 className="hsm-section-title">Product Settings</h3>
                <div className="hsm-settings-grid">
                  <div className="hsm-setting-group">
                    <label>Size</label>
                    <div className="hsm-size-buttons">
                      {sizes.map(size => (
                        <button
                          key={size}
                          className={`hsm-size-btn ${selectedSize === size ? 'active' : ''}`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="hsm-setting-group">
                    <label>Fit</label>
                    <select className="hsm-select" value={selectedFit} onChange={(e) => setSelectedFit(e.target.value)}>
                      {fits.map(fit => (
                        <option key={fit} value={fit}>{fit}</option>
                      ))}
                    </select>
                  </div>
                  <div className="hsm-setting-group">
                    <label>Fabric</label>
                    <select className="hsm-select" value={selectedFabric} onChange={(e) => setSelectedFabric(e.target.value)}>
                      {fabrics.map(fabric => (
                        <option key={fabric} value={fabric}>{fabric}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Design Placement */}
              <div className="hsm-placement-section">
                <h3 className="hsm-section-title">Design Placement</h3>
                <div className="hsm-placement-options">
                  {placements.map(place => (
                    <button
                      key={place}
                      className={`hsm-placement-btn ${selectedPlacement === place.toLowerCase().replace(/\s+/g, '-') ? 'active' : ''}`}
                      onClick={() => setSelectedPlacement(place.toLowerCase().replace(/\s+/g, '-'))}
                    >
                      {place}
                    </button>
                  ))}
                </div>
                <div className="hsm-placement-controls">
                  <button className="hsm-control-btn"><Move size={18} /></button>
                  <button className="hsm-control-btn"><Scissors size={18} /></button>
                  <button className="hsm-control-btn"><RotateCcw size={18} /></button>
                  <button className="hsm-control-btn"><Rotate3d size={18} /></button>
                  <button className="hsm-control-btn"><Copy size={18} /></button>
                </div>
              </div>

              {/* Hoodie Customization */}
              <div className="hsm-hoodie-custom-section">
                <h3 className="hsm-section-title">Hoodie Customization</h3>
                <div className="hsm-custom-grid">
                  <div className="hsm-custom-group">
                    <label>Hood Color</label>
                    <div className="hsm-color-input-row">
                      <input type="color" className="hsm-color-picker" value="#000000" />
                      <input type="text" className="hsm-color-hex" value="#000000" readOnly />
                    </div>
                  </div>
                  <div className="hsm-custom-group">
                    <label>Drawstring Color</label>
                    <div className="hsm-color-input-row">
                      <input type="color" className="hsm-color-picker" value="#ffffff" />
                      <input type="text" className="hsm-color-hex" value="#ffffff" readOnly />
                    </div>
                  </div>
                  <div className="hsm-custom-group">
                    <label>Pocket Style</label>
                    <div className="hsm-option-buttons">
                      {['Kangaroo Pocket', 'No Pocket', 'Hidden Pocket'].map(opt => (
                        <button key={opt} className="hsm-option-btn">{opt}</button>
                      ))}
                    </div>
                  </div>
                  <div className="hsm-custom-group">
                    <label>Zipper</label>
                    <div className="hsm-option-buttons">
                      {['Black', 'White', 'Metal', 'No Zipper (Pullover)'].map(opt => (
                        <button key={opt} className="hsm-option-btn">{opt}</button>
                      ))}
                    </div>
                  </div>
                  <div className="hsm-custom-group">
                    <label>Rib Cuffs & Hem</label>
                    <div className="hsm-color-input-row">
                      <input type="color" className="hsm-color-picker" value="#000000" />
                      <input type="text" className="hsm-color-hex" value="#000000" readOnly />
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Customization */}
              <div className="hsm-color-section">
                <h3 className="hsm-section-title">Color Customization</h3>
                <div className="hsm-quick-colors">
                  {quickColors.map(color => (
                    <button
                      key={color.name}
                      className={`hsm-quick-color-btn ${primaryColor === color.value ? 'active' : ''}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => {
                        setPrimaryColor(color.value);
                      }}
                    />
                  ))}
                </div>
                <div className="hsm-advanced-colors">
                  <div className="hsm-custom-group">
                    <label>Primary Color</label>
                    <div className="hsm-color-input-row">
                      <input type="color" className="hsm-color-picker" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
                      <input type="text" className="hsm-color-hex" value={primaryColor} readOnly />
                    </div>
                  </div>
                  <div className="hsm-custom-group">
                    <label>Secondary Color</label>
                    <div className="hsm-color-input-row">
                      <input type="color" className="hsm-color-picker" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />
                      <input type="text" className="hsm-color-hex" value={secondaryColor} readOnly />
                    </div>
                  </div>
                  <div className="hsm-custom-group">
                    <label>Gradient (Optional)</label>
                    <button className="hsm-btn-outline">Enable Gradient</button>
                  </div>
                </div>
              </div>

              {/* Live 3D Preview */}
              <div className="hsm-preview-section">
                <h3 className="hsm-section-title">Live 3D Preview</h3>
                <div className="hsm-preview-container">
                  <div className="hsm-preview-tabs">
                    {previewModes.map(mode => (
                      <button
                        key={mode}
                        className={`hsm-preview-tab ${activePreviewMode === mode.toLowerCase().replace(/\s+/g, '-').replace(/°/g, '') ? 'active' : ''}`}
                        onClick={() => setActivePreviewMode(mode.toLowerCase().replace(/\s+/g, '-').replace(/°/g, ''))}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                  <div className="hsm-preview-mockup">
                    <ShoppingBag size={80} />
                  </div>
                  <div className="hsm-preview-controls">
                    <button className="hsm-zoom-btn"><Maximize size={16} /></button>
                    <button className="hsm-fullscreen-btn"><Maximize size={16} /> Fullscreen</button>
                  </div>
                </div>
                <div className="hsm-scene-options">
                  {scenes.map(scene => (
                    <button
                      key={scene}
                      className={`hsm-scene-btn ${activeScene === scene.toLowerCase() ? 'active' : ''}`}
                      onClick={() => setActiveScene(scene.toLowerCase())}
                    >
                      {scene}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mockup Details */}
              <div className="hsm-details-section">
                <h3 className="hsm-section-title">Mockup Details</h3>
                <div className="hsm-details-grid">
                  <div className="hsm-detail-card">
                    <div className="hsm-detail-label">Product</div>
                    <div className="hsm-detail-value">Oversized Hoodie</div>
                  </div>
                  <div className="hsm-detail-card">
                    <div className="hsm-detail-label">Color</div>
                    <div className="hsm-detail-value">Black</div>
                  </div>
                  <div className="hsm-detail-card">
                    <div className="hsm-detail-label">Fabric</div>
                    <div className="hsm-detail-value">Heavyweight Cotton</div>
                  </div>
                  <div className="hsm-detail-card">
                    <div className="hsm-detail-label">Print Area</div>
                    <div className="hsm-detail-value">Front + Hood</div>
                  </div>
                  <div className="hsm-detail-card">
                    <div className="hsm-detail-label">Resolution</div>
                    <div className="hsm-detail-value">4500 × 5400</div>
                  </div>
                  <div className="hsm-detail-card">
                    <div className="hsm-detail-label">DPI</div>
                    <div className="hsm-detail-value">300</div>
                  </div>
                </div>
              </div>

              {/* Export */}
              <div className="hsm-export-section">
                <h3 className="hsm-section-title">Export</h3>
                <div className="hsm-export-formats">
                  {exportFormats.map(format => (
                    <button
                      key={format}
                      className={`hsm-format-btn ${selectedExportFormat === format ? 'active' : ''}`}
                      onClick={() => setSelectedExportFormat(format)}
                    >
                      {format}
                    </button>
                  ))}
                </div>
                <div className="hsm-export-actions">
                  <button className="hsm-btn-primary">
                    <Download size={16} />
                    Download
                  </button>
                  <button className="hsm-btn-secondary">
                    <Layout size={16} />
                    Save to Workspace
                  </button>
                  <button className="hsm-btn-secondary">
                    <Save size={16} />
                    Save to Assets
                  </button>
                  <button className="hsm-btn-secondary">
                    <Share2 size={16} />
                    Share
                  </button>
                  <button className="hsm-btn-secondary">
                    <Sparkles size={16} />
                    Create Product Listing
                  </button>
                </div>
              </div>

              {/* Saved Mockups */}
              <div className="hsm-saved-section">
                <h3 className="hsm-section-title">Saved Mockups</h3>
                <div className="hsm-saved-grid">
                  {savedMockups.map(mockup => (
                    <div key={mockup.id} className="hsm-saved-card">
                      <div className="hsm-saved-preview">
                        <ShoppingBag size={48} />
                      </div>
                      <div className="hsm-saved-info">
                        <div className="hsm-saved-name">{mockup.mockup}</div>
                        <div className="hsm-saved-meta">
                          {mockup.style} • {mockup.date} • {mockup.status}
                        </div>
                        <div className="hsm-saved-actions">
                          <button className="hsm-saved-action-btn"><Edit size={14} /> Open</button>
                          <button className="hsm-saved-action-btn"><Edit size={14} /> Edit</button>
                          <button className="hsm-saved-action-btn"><Copy size={14} /> Duplicate</button>
                          <button className="hsm-saved-action-btn delete"><Trash2 size={14} /> Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Features */}
              <div className="hsm-premium-section">
                <h3 className="hsm-premium-title">🌟 Premium Features</h3>
                <div className="hsm-premium-grid">
                  <div className="hsm-premium-card">
                    <h4>👕 Print Method Preview</h4>
                    <p>Preview how your design looks with different printing methods.</p>
                    <div className="hsm-premium-options">
                      {printMethods.map(method => (
                        <span key={method} className="hsm-premium-option">{method}</span>
                      ))}
                    </div>
                  </div>
                  <div className="hsm-premium-card">
                    <h4>🧵 Fabric Texture Preview</h4>
                    <p>See your design on different fabric textures.</p>
                    <div className="hsm-premium-options">
                      {fabricTextures.map(texture => (
                        <span key={texture} className="hsm-premium-option">{texture}</span>
                      ))}
                    </div>
                  </div>
                  <div className="hsm-premium-card">
                    <h4>🎨 Multi-Color Variants</h4>
                    <p>Generate the same mockup in multiple hoodie colors at once.</p>
                    <div className="hsm-premium-options">
                      {multiColorVariants.map(variant => (
                        <span key={variant} className="hsm-premium-option">{variant}</span>
                      ))}
                    </div>
                  </div>
                  <div className="hsm-premium-card">
                    <h4>📏 Print Safe Area</h4>
                    <p>Shows an overlay where your design can be safely printed.</p>
                  </div>
                  <div className="hsm-premium-card">
                    <h4>🏷️ Product Details Generator</h4>
                    <p>Automatically generate product name, description, SKU, and tags.</p>
                  </div>
                  <div className="hsm-premium-card">
                    <h4>💰 Cost Estimation</h4>
                    <p>Calculate production cost, selling price, and estimated profit.</p>
                    <div className="hsm-cost-calculation" style={{ marginTop: 12, padding: 12, background: '#f5f5f5', borderRadius: 8 }}>
                      <div className="hsm-cost-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span>Production Cost</span>
                        <span>$12</span>
                      </div>
                      <div className="hsm-cost-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span>Selling Price</span>
                        <span>$35</span>
                      </div>
                      <div className="hsm-cost-item total" style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: '#7f58ff' }}>
                        <span>Estimated Profit</span>
                        <span>$23</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="hsm-empty-state">
              <div className="hsm-empty-icon">
                <ShoppingBag size={64} />
              </div>
              <h3>No Hoodie Mockups Yet</h3>
              <p>Upload a design to create your first hoodie mockup.</p>
              <button className="hsm-btn-primary" onClick={() => setHasCreatedMockup(true)}>
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

export default HoodieMockupSection;

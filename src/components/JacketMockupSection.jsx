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
  Plus,
  Move,
  RotateCcw,
  Scissors,
  Shirt,
  AlignCenter
} from 'lucide-react';

function JacketMockupSection({ activeSection }) {
  const [hasCreatedMockup, setHasCreatedMockup] = useState(false);
  const [activePreviewMode, setActivePreviewMode] = useState('front');
  const [activeModel, setActiveModel] = useState('male');
  const [activeScene, setActiveScene] = useState('studio');
  const [selectedJacketStyle, setSelectedJacketStyle] = useState('bomber-jacket');
  const [selectedPlacement, setSelectedPlacement] = useState('front');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedFit, setSelectedFit] = useState('Regular Fit');
  const [selectedFabric, setSelectedFabric] = useState('Leather');
  const [primaryColor, setPrimaryColor] = useState('#000000');
  const [secondaryColor, setSecondaryColor] = useState('#ffffff');
  const [selectedExportFormat, setSelectedExportFormat] = useState('PNG');

  const activeId = 'jacket-mockup';

  if (activeSection !== activeId) return null;

  const jacketStyles = [
    { id: 'bomber-jacket', name: 'Bomber Jacket' },
    { id: 'denim-jacket', name: 'Denim Jacket' },
    { id: 'leather-jacket', name: 'Leather Jacket' },
    { id: 'puffer-jacket', name: 'Puffer Jacket' },
    { id: 'varsity-jacket', name: 'Varsity Jacket' },
    { id: 'blazer', name: 'Blazer' },
    { id: 'windbreaker', name: 'Windbreaker' },
    { id: 'track-jacket', name: 'Track Jacket' },
    { id: 'rain-jacket', name: 'Rain Jacket' },
    { id: 'winter-parka', name: 'Winter Parka' }
  ];

  const viewOptions = [
    'Front', 'Back', 'Left Side', 'Right Side', 'Open Jacket', 'Closed Jacket', 'Hanging', 'Flat Lay', 'On Model'
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const fits = ['Slim Fit', 'Regular Fit', 'Relaxed Fit', 'Oversized'];
  const genders = ['Men', 'Women', 'Unisex'];
  const placements = [
    'Front', 'Back', 'Left Chest', 'Right Chest', 'Left Sleeve', 'Right Sleeve', 'Collar', 'Shoulders', 'Pocket', 'Full Jacket'
  ];

  const fabrics = [
    'Leather', 'Denim', 'Cotton', 'Polyester', 'Nylon', 'Wool', 'Fleece'
  ];

  const quickColors = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#ffffff' },
    { name: 'Navy', value: '#000080' },
    { name: 'Olive', value: '#808000' },
    { name: 'Brown', value: '#8b4513' },
    { name: 'Gray', value: '#808080' },
    { name: 'Red', value: '#ff0000' }
  ];

  const previewModes = ['Front', 'Back', '360°', 'Zoom', 'Fullscreen'];
  const scenes = ['Studio', 'Urban Street', 'Snow', 'Fashion Runway', 'Outdoor'];
  const modelTypes = ['Male', 'Female', 'Unisex', 'Invisible Mannequin'];
  const poses = ['Standing', 'Walking', 'Side View', 'Back View', 'Hands in Pocket'];

  const savedMockups = [
    { id: 1, mockup: 'Black Bomber', style: 'Bomber', date: 'Today', status: 'Saved' },
    { id: 2, mockup: 'Denim Blue', style: 'Denim', date: 'Yesterday', status: 'Exported' }
  ];

  const exportFormats = ['PNG', 'JPG', 'PDF', 'PSD (Optional)'];

  return (
    <section className={`section ${activeSection === activeId ? 'active' : 'hidden'}`}>
      <div className="sub-content">
        <div className="jkm-section">
          {/* Header */}
          <div className="jkm-header">
            <div className="jkm-header-content">
              <h2>Jacket Mockups</h2>
              <p>Create realistic AI-powered jacket mockups.</p>
            </div>
            <div className="jkm-header-actions">
              <button className="jkm-btn-primary" onClick={() => setHasCreatedMockup(true)}>
                <Plus size={18} />
                Create Mockup
              </button>
              <button className="jkm-btn-secondary">
                <Folder size={18} />
                Browse Templates
              </button>
            </div>
          </div>

          {hasCreatedMockup ? (
            <>
              {/* Upload Design */}
              <div className="jkm-upload-section">
                <h3 className="jkm-section-title">Upload Design</h3>
                <div className="jkm-upload-area">
                  <div className="jkm-upload-icon">
                    <Upload size={32} />
                  </div>
                  <div className="jkm-upload-text">
                    <h4>Drag and drop your design here</h4>
                    <p>or click to browse files</p>
                  </div>
                  <div className="jkm-upload-formats">
                    {['PNG', 'SVG', 'AI Generated Design'].map((format, idx) => (
                      <span key={idx} className="jkm-format-tag">{format}</span>
                    ))}
                  </div>
                </div>
                <div className="jkm-upload-actions">
                  <button className="jkm-btn-outline">
                    <Upload size={16} />
                    Upload PNG
                  </button>
                  <button className="jkm-btn-outline">
                    <Upload size={16} />
                    Upload SVG
                  </button>
                  <button className="jkm-btn-outline">
                    <Folder size={16} />
                    Choose from Assets
                  </button>
                  <button className="jkm-btn-outline">
                    <Layout size={16} />
                    Choose from Workspace
                  </button>
                  <button className="jkm-btn-outline">
                    <Sparkles size={16} />
                    Choose AI Generated Design
                  </button>
                </div>
              </div>

              {/* Choose Jacket Style */}
              <div className="jkm-choose-style-section">
                <h3 className="jkm-section-title">Choose Jacket Style</h3>
                <div className="jkm-style-grid">
                  {jacketStyles.map(style => (
                    <div
                      key={style.id}
                      className={`jkm-style-card ${selectedJacketStyle === style.id ? 'selected' : ''}`}
                      onClick={() => setSelectedJacketStyle(style.id)}
                    >
                      <div className="jkm-style-icon">
                        <Shirt size={40} />
                      </div>
                      <p>{style.name}</p>
                    </div>
                  ))}
                </div>
                <div className="jkm-view-options">
                  {viewOptions.map(view => (
                    <button key={view} className="jkm-view-btn">{view}</button>
                  ))}
                </div>
              </div>

              {/* Product Settings */}
              <div className="jkm-settings-section">
                <h3 className="jkm-section-title">Product Settings</h3>
                <div className="jkm-settings-grid">
                  <div className="jkm-setting-group">
                    <label>Size</label>
                    <div className="jkm-size-buttons">
                      {sizes.map(size => (
                        <button
                          key={size}
                          className={`jkm-size-btn ${selectedSize === size ? 'active' : ''}`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="jkm-setting-group">
                    <label>Fit</label>
                    <select className="jkm-select" value={selectedFit} onChange={(e) => setSelectedFit(e.target.value)}>
                      {fits.map(fit => (
                        <option key={fit} value={fit}>{fit}</option>
                      ))}
                    </select>
                  </div>
                  <div className="jkm-setting-group">
                    <label>Gender</label>
                    <select className="jkm-select">
                      {genders.map(gender => (
                        <option key={gender} value={gender}>{gender}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Design Placement */}
              <div className="jkm-placement-section">
                <h3 className="jkm-section-title">Design Placement</h3>
                <div className="jkm-placement-options">
                  {placements.map(place => (
                    <button
                      key={place}
                      className={`jkm-placement-btn ${selectedPlacement === place.toLowerCase().replace(/\s+/g, '-') ? 'active' : ''}`}
                      onClick={() => setSelectedPlacement(place.toLowerCase().replace(/\s+/g, '-'))}
                    >
                      {place}
                    </button>
                  ))}
                </div>
                <div className="jkm-placement-controls">
                  <button className="jkm-control-btn"><Move size={18} /></button>
                  <button className="jkm-control-btn"><Scissors size={18} /></button>
                  <button className="jkm-control-btn"><RotateCcw size={18} /></button>
                  <button className="jkm-control-btn"><Rotate3d size={18} /></button>
                  <button className="jkm-control-btn"><Copy size={18} /></button>
                  <button className="jkm-control-btn"><AlignCenter size={18} /></button>
                </div>
              </div>

              {/* Jacket Customization */}
              <div className="jkm-customization-section">
                <h3 className="jkm-section-title">Jacket Customization</h3>
                <div className="jkm-customization-grid">
                  <div className="jkm-customization-group">
                    <label>Collar</label>
                    <div className="jkm-customization-buttons">
                      {['Stand Collar', 'Hooded', 'Shirt Collar', 'Bomber Rib Collar'].map(opt => (
                        <button key={opt} className="jkm-customization-btn">{opt}</button>
                      ))}
                    </div>
                  </div>
                  <div className="jkm-customization-group">
                    <label>Closure</label>
                    <div className="jkm-customization-buttons">
                      {['Zipper', 'Buttons', 'Snap Buttons', 'Open Front'].map(opt => (
                        <button key={opt} className="jkm-customization-btn">{opt}</button>
                      ))}
                    </div>
                  </div>
                  <div className="jkm-customization-group">
                    <label>Pocket Style</label>
                    <div className="jkm-customization-buttons">
                      {['Side Pocket', 'Chest Pocket', 'Flap Pocket', 'Zipper Pocket'].map(opt => (
                        <button key={opt} className="jkm-customization-btn">{opt}</button>
                      ))}
                    </div>
                  </div>
                  <div className="jkm-customization-group">
                    <label>Cuffs</label>
                    <div className="jkm-customization-buttons">
                      {['Ribbed', 'Elastic', 'Button Cuffs'].map(opt => (
                        <button key={opt} className="jkm-customization-btn">{opt}</button>
                      ))}
                    </div>
                  </div>
                  <div className="jkm-customization-group">
                    <label>Lining</label>
                    <div className="jkm-customization-buttons">
                      {['Cotton', 'Quilted', 'Fleece'].map(opt => (
                        <button key={opt} className="jkm-customization-btn">{opt}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Material & Fabric */}
              <div className="jkm-fabric-section">
                <h3 className="jkm-section-title">Material & Fabric</h3>
                <div className="jkm-fabric-grid">
                  {fabrics.map(fabric => (
                    <button
                      key={fabric}
                      className={`jkm-fabric-btn ${selectedFabric === fabric ? 'active' : ''}`}
                      onClick={() => setSelectedFabric(fabric)}
                    >
                      {fabric}
                    </button>
                  ))}
                </div>
                <div className="jkm-fabric-options">
                  <label className="jkm-checkbox">
                    <input type="checkbox" />
                    <span>Texture Strength</span>
                  </label>
                  <label className="jkm-checkbox">
                    <input type="checkbox" />
                    <span>Fabric Shine</span>
                  </label>
                  <label className="jkm-checkbox">
                    <input type="checkbox" />
                    <span>Wrinkle Simulation</span>
                  </label>
                </div>
              </div>

              {/* Color Customization */}
              <div className="jkm-color-section">
                <h3 className="jkm-section-title">Color Customization</h3>
                <div className="jkm-quick-colors">
                  {quickColors.map(color => (
                    <button
                      key={color.name}
                      className={`jkm-quick-color-btn ${primaryColor === color.value ? 'active' : ''}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => {
                        setPrimaryColor(color.value);
                      }}
                    />
                  ))}
                </div>
                <div className="jkm-advanced-colors">
                  <div className="jkm-custom-group">
                    <label>Main Body</label>
                    <div className="jkm-color-input-row">
                      <input type="color" className="jkm-color-picker" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
                      <input type="text" className="jkm-color-hex" value={primaryColor} readOnly />
                    </div>
                  </div>
                  <div className="jkm-custom-group">
                    <label>Sleeves</label>
                    <div className="jkm-color-input-row">
                      <input type="color" className="jkm-color-picker" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />
                      <input type="text" className="jkm-color-hex" value={secondaryColor} readOnly />
                    </div>
                  </div>
                  <div className="jkm-custom-group">
                    <label>Collar</label>
                    <div className="jkm-color-input-row">
                      <input type="color" className="jkm-color-picker" value="#808080" />
                      <input type="text" className="jkm-color-hex" value="#808080" readOnly />
                    </div>
                  </div>
                  <div className="jkm-custom-group">
                    <label>Cuffs</label>
                    <div className="jkm-color-input-row">
                      <input type="color" className="jkm-color-picker" value="#808080" />
                      <input type="text" className="jkm-color-hex" value="#808080" readOnly />
                    </div>
                  </div>
                  <div className="jkm-custom-group">
                    <label>Zipper</label>
                    <div className="jkm-color-input-row">
                      <input type="color" className="jkm-color-picker" value="#c0c0c0" />
                      <input type="text" className="jkm-color-hex" value="#c0c0c0" readOnly />
                    </div>
                  </div>
                  <div className="jkm-custom-group">
                    <label>Buttons</label>
                    <div className="jkm-color-input-row">
                      <input type="color" className="jkm-color-picker" value="#c0c0c0" />
                      <input type="text" className="jkm-color-hex" value="#c0c0c0" readOnly />
                    </div>
                  </div>
                  <div className="jkm-custom-group">
                    <label>Lining</label>
                    <div className="jkm-color-input-row">
                      <input type="color" className="jkm-color-picker" value="#f5f5f5" />
                      <input type="text" className="jkm-color-hex" value="#f5f5f5" readOnly />
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Model Preview */}
              <div className="jkm-model-preview-section">
                <h3 className="jkm-section-title">AI Model Preview</h3>
                <div className="jkm-model-selection">
                  {modelTypes.map(model => (
                    <button
                      key={model}
                      className={`jkm-model-btn ${activeModel === model.toLowerCase().replace(/\s+/g, '-') ? 'active' : ''}`}
                      onClick={() => setActiveModel(model.toLowerCase().replace(/\s+/g, '-'))}
                    >
                      {model}
                    </button>
                  ))}
                </div>
                <div className="jkm-pose-selection">
                  {poses.map(pose => (
                    <button key={pose} className="jkm-pose-btn">{pose}</button>
                  ))}
                </div>
                <div className="jkm-scene-options">
                  {scenes.map(scene => (
                    <button
                      key={scene}
                      className={`jkm-scene-btn ${activeScene === scene.toLowerCase().replace(/\s+/g, '-') ? 'active' : ''}`}
                      onClick={() => setActiveScene(scene.toLowerCase().replace(/\s+/g, '-'))}
                    >
                      {scene}
                    </button>
                  ))}
                </div>
              </div>

              {/* 360° Preview */}
              <div className="jkm-preview-section">
                <h3 className="jkm-section-title">360° Preview</h3>
                <div className="jkm-preview-container">
                  <div className="jkm-preview-tabs">
                    {previewModes.map(mode => (
                      <button
                        key={mode}
                        className={`jkm-preview-tab ${activePreviewMode === mode.toLowerCase().replace(/\s+/g, '-').replace(/°/g, '') ? 'active' : ''}`}
                        onClick={() => setActivePreviewMode(mode.toLowerCase().replace(/\s+/g, '-').replace(/°/g, ''))}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                  <div className="jkm-preview-mockup">
                    <Shirt size={80} />
                  </div>
                  <div className="jkm-preview-controls">
                    <button className="jkm-zoom-btn"><Maximize size={16} /></button>
                    <button className="jkm-fullscreen-btn"><Maximize size={16} /> Fullscreen</button>
                  </div>
                </div>
              </div>

              {/* Mockup Details */}
              <div className="jkm-details-section">
                <h3 className="jkm-section-title">Mockup Details</h3>
                <div className="jkm-details-grid">
                  <div className="jkm-detail-card">
                    <div className="jkm-detail-label">Product</div>
                    <div className="jkm-detail-value">Bomber Jacket</div>
                  </div>
                  <div className="jkm-detail-card">
                    <div className="jkm-detail-label">Material</div>
                    <div className="jkm-detail-value">Leather</div>
                  </div>
                  <div className="jkm-detail-card">
                    <div className="jkm-detail-label">Color</div>
                    <div className="jkm-detail-value">Black</div>
                  </div>
                  <div className="jkm-detail-card">
                    <div className="jkm-detail-label">Print Area</div>
                    <div className="jkm-detail-value">Front + Back</div>
                  </div>
                  <div className="jkm-detail-card">
                    <div className="jkm-detail-label">Resolution</div>
                    <div className="jkm-detail-value">5000 × 5000</div>
                  </div>
                  <div className="jkm-detail-card">
                    <div className="jkm-detail-label">DPI</div>
                    <div className="jkm-detail-value">300</div>
                  </div>
                </div>
              </div>

              {/* Export */}
              <div className="jkm-export-section">
                <h3 className="jkm-section-title">Export</h3>
                <div className="jkm-export-formats">
                  {exportFormats.map(format => (
                    <button
                      key={format}
                      className={`jkm-format-btn ${selectedExportFormat === format ? 'active' : ''}`}
                      onClick={() => setSelectedExportFormat(format)}
                    >
                      {format}
                    </button>
                  ))}
                </div>
                <div className="jkm-export-actions">
                  <button className="jkm-btn-primary">
                    <Download size={16} />
                    Download
                  </button>
                  <button className="jkm-btn-secondary">
                    <Layout size={16} />
                    Save to Workspace
                  </button>
                  <button className="jkm-btn-secondary">
                    <Save size={16} />
                    Save to Assets
                  </button>
                  <button className="jkm-btn-secondary">
                    <Share2 size={16} />
                    Share
                  </button>
                  <button className="jkm-btn-secondary">
                    <Sparkles size={16} />
                    Generate Product Listing
                  </button>
                </div>
              </div>

              {/* Saved Mockups */}
              <div className="jkm-saved-section">
                <h3 className="jkm-section-title">Saved Mockups</h3>
                <div className="jkm-saved-grid">
                  {savedMockups.map(mockup => (
                    <div key={mockup.id} className="jkm-saved-card">
                      <div className="jkm-saved-preview">
                        <Shirt size={48} />
                      </div>
                      <div className="jkm-saved-info">
                        <div className="jkm-saved-name">{mockup.mockup}</div>
                        <div className="jkm-saved-meta">
                          {mockup.style} • {mockup.date} • {mockup.status}
                        </div>
                        <div className="jkm-saved-actions">
                          <button className="jkm-saved-action-btn"><Edit size={14} /> Open</button>
                          <button className="jkm-saved-action-btn"><Edit size={14} /> Edit</button>
                          <button className="jkm-saved-action-btn"><Copy size={14} /> Duplicate</button>
                          <button className="jkm-saved-action-btn delete"><Trash2 size={14} /> Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Features */}
              <div className="jkm-premium-section">
                <h3 className="jkm-premium-title">🌟 Premium Features</h3>
                <div className="jkm-premium-grid">
                  <div className="jkm-premium-card">
                    <h4>🎨 Embroidery Preview</h4>
                    <p>User choose kare preview k hisab se update.</p>
                    <div className="jkm-premium-options">
                      {['Embroidery', 'Screen Print', 'DTG', 'Patch'].map(opt => (
                        <span key={opt} className="jkm-premium-option">{opt}</span>
                      ))}
                    </div>
                  </div>
                  <div className="jkm-premium-card">
                    <h4>🏷️ Brand Patch Placement</h4>
                    <p>Patch lagao.</p>
                    <div className="jkm-premium-options">
                      {['Sleeve', 'Chest', 'Back Neck', 'Pocket'].map(opt => (
                        <span key={opt} className="jkm-premium-option">{opt}</span>
                      ))}
                    </div>
                  </div>
                  <div className="jkm-premium-card">
                    <h4>🧵 Stitching Preview</h4>
                    <p>Different stitching styles.</p>
                    <div className="jkm-premium-options">
                      {['Single Stitch', 'Double Stitch', 'Contrast Stitch'].map(opt => (
                        <span key={opt} className="jkm-premium-option">{opt}</span>
                      ))}
                    </div>
                  </div>
                  <div className="jkm-premium-card">
                    <h4>🌦️ Weather Preview</h4>
                    <p>Jacket ko different environments mein dekho.</p>
                    <div className="jkm-premium-options">
                      {['Winter', 'Rain', 'Street', 'Studio'].map(opt => (
                        <span key={opt} className="jkm-premium-option">{opt}</span>
                      ))}
                    </div>
                  </div>
                  <div className="jkm-premium-card">
                    <h4>👕 Layer Preview</h4>
                    <p>Jacket ke andar layers.</p>
                    <div className="jkm-premium-options">
                      {['T-Shirt', 'Hoodie', 'Shirt'].map(opt => (
                        <span key={opt} className="jkm-premium-option">{opt}</span>
                      ))}
                    </div>
                  </div>
                  <div className="jkm-premium-card">
                    <h4>📏 Print Safe Area</h4>
                    <p>Safe print zone overlay.</p>
                  </div>
                  <div className="jkm-premium-card">
                    <h4>💰 Cost Calculator</h4>
                    <p>Material, printing, production cost.</p>
                    <div style={{ marginTop: 12, padding: 12, background: '#f5f5f5', borderRadius: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span>Material Cost</span>
                        <span>$22</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span>Printing Cost</span>
                        <span>$8</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span>Production Cost</span>
                        <span>$30</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span>Selling Price</span>
                        <span>$75</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: '#7f58ff' }}>
                        <span>Estimated Profit</span>
                        <span>$45</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="jkm-empty-state">
              <div className="jkm-empty-icon">
                <Shirt size={64} />
              </div>
              <h3>No Jacket Mockups Yet</h3>
              <p>Create your first jacket mockup.</p>
              <button className="jkm-btn-primary" onClick={() => setHasCreatedMockup(true)}>
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

export default JacketMockupSection;

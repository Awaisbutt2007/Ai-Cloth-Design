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
  Shirt
} from 'lucide-react';

function DressMockupSection({ activeSection }) {
  const [hasCreatedMockup, setHasCreatedMockup] = useState(false);
  const [activePreviewMode, setActivePreviewMode] = useState('front');
  const [activeModel, setActiveModel] = useState('female');
  const [activeScene, setActiveScene] = useState('studio');
  const [selectedDressStyle, setSelectedDressStyle] = useState('mini-dress');
  const [selectedPlacement, setSelectedPlacement] = useState('full-dress');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedFit, setSelectedFit] = useState('Regular');
  const [selectedFabric, setSelectedFabric] = useState('Cotton');
  const [primaryColor, setPrimaryColor] = useState('#000000');
  const [secondaryColor, setSecondaryColor] = useState('#ffffff');
  const [selectedExportFormat, setSelectedExportFormat] = useState('PNG');

  const activeId = 'dress-mockup';

  if (activeSection !== activeId) return null;

  const dressStyles = [
    { id: 'mini-dress', name: 'Mini Dress' },
    { id: 'midi-dress', name: 'Midi Dress' },
    { id: 'maxi-dress', name: 'Maxi Dress' },
    { id: 'bodycon', name: 'Bodycon' },
    { id: 'a-line', name: 'A-Line' },
    { id: 'wrap-dress', name: 'Wrap Dress' },
    { id: 'evening-gown', name: 'Evening Gown' },
    { id: 'cocktail-dress', name: 'Cocktail Dress' },
    { id: 'summer-dress', name: 'Summer Dress' },
    { id: 'wedding-dress', name: 'Wedding Dress' },
    { id: 'kids-dress', name: 'Kids Dress' }
  ];

  const viewOptions = [
    'Front', 'Back', 'Left', 'Right', 'Flat Lay', 'Hanging', 'On Model'
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const fits = ['Slim', 'Regular', 'Loose', 'Oversized'];
  const dressLengths = ['Mini', 'Knee Length', 'Midi', 'Maxi'];
  const sleeveStyles = ['Sleeveless', 'Short Sleeve', 'Half Sleeve', 'Full Sleeve', 'Puff Sleeve'];
  const necklines = ['Round Neck', 'V Neck', 'Square Neck', 'Boat Neck', 'Off Shoulder', 'High Neck'];
  const placements = [
    'Full Dress', 'Upper Body', 'Skirt Only', 'Sleeves', 'Waist Belt', 'Collar', 'Back', 'Pocket'
  ];

  const fabrics = [
    'Cotton', 'Silk', 'Satin', 'Linen', 'Chiffon', 'Denim', 'Velvet', 'Polyester'
  ];

  const quickColors = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#ffffff' },
    { name: 'Red', value: '#ff0000' },
    { name: 'Pink', value: '#ff69b4' },
    { name: 'Blue', value: '#0000ff' },
    { name: 'Green', value: '#00ff00' },
    { name: 'Beige', value: '#f5f5dc' },
    { name: 'Lavender', value: '#e6e6fa' }
  ];

  const previewModes = ['Front', 'Back', '360°', 'Zoom', 'Fullscreen'];
  const scenes = ['Studio', 'Fashion Show', 'Boutique', 'Outdoor'];
  const modelTypes = ['Female Model', 'Teen Model', 'Kids Model', 'Invisible Mannequin'];
  const poses = ['Standing', 'Walking', 'Side Pose', 'Back Pose', 'Runway Pose'];

  const savedMockups = [
    { id: 1, mockup: 'Summer Dress', style: 'Maxi', date: 'Today', status: 'Saved' },
    { id: 2, mockup: 'Evening Gown', style: 'Gown', date: 'Yesterday', status: 'Exported' }
  ];

  const exportFormats = ['PNG', 'JPG', 'PDF', 'PSD (Optional)'];

  return (
    <section className={`section ${activeSection === activeId ? 'active' : 'hidden'}`}>
      <div className="sub-content">
        <div className="dsm-section">
          {/* Header */}
          <div className="dsm-header">
            <div className="dsm-header-content">
              <h2>Dress Mockups</h2>
              <p>Create realistic dress mockups with AI.</p>
            </div>
            <div className="dsm-header-actions">
              <button className="dsm-btn-primary" onClick={() => setHasCreatedMockup(true)}>
                <Plus size={18} />
                Create Mockup
              </button>
              <button className="dsm-btn-secondary">
                <Folder size={18} />
                Browse Templates
              </button>
            </div>
          </div>

          {hasCreatedMockup ? (
            <>
              {/* Upload Design */}
              <div className="dsm-upload-section">
                <h3 className="dsm-section-title">Upload Design</h3>
                <div className="dsm-upload-area">
                  <div className="dsm-upload-icon">
                    <Upload size={32} />
                  </div>
                  <div className="dsm-upload-text">
                    <h4>Drag and drop your design here</h4>
                    <p>or click to browse files</p>
                  </div>
                  <div className="dsm-upload-formats">
                    {['PNG', 'SVG', 'AI Generated Design'].map((format, idx) => (
                      <span key={idx} className="dsm-format-tag">{format}</span>
                    ))}
                  </div>
                </div>
                <div className="dsm-upload-actions">
                  <button className="dsm-btn-outline">
                    <Upload size={16} />
                    Upload PNG
                  </button>
                  <button className="dsm-btn-outline">
                    <Upload size={16} />
                    Upload SVG
                  </button>
                  <button className="dsm-btn-outline">
                    <Folder size={16} />
                    Choose from Assets
                  </button>
                  <button className="dsm-btn-outline">
                    <Layout size={16} />
                    Choose from Workspace
                  </button>
                  <button className="dsm-btn-outline">
                    <Sparkles size={16} />
                    Choose AI Generated Design
                  </button>
                </div>
              </div>

              {/* Choose Dress Style */}
              <div className="dsm-choose-style-section">
                <h3 className="dsm-section-title">Choose Dress Style</h3>
                <div className="dsm-style-grid">
                  {dressStyles.map(style => (
                    <div
                      key={style.id}
                      className={`dsm-style-card ${selectedDressStyle === style.id ? 'selected' : ''}`}
                      onClick={() => setSelectedDressStyle(style.id)}
                    >
                      <div className="dsm-style-icon">
                        <Shirt size={40} />
                      </div>
                      <p>{style.name}</p>
                    </div>
                  ))}
                </div>
                <div className="dsm-view-options">
                  {viewOptions.map(view => (
                    <button key={view} className="dsm-view-btn">{view}</button>
                  ))}
                </div>
              </div>

              {/* Dress Settings */}
              <div className="dsm-settings-section">
                <h3 className="dsm-section-title">Dress Settings</h3>
                <div className="dsm-settings-grid">
                  <div className="dsm-setting-group">
                    <label>Dress Size</label>
                    <div className="dsm-size-buttons">
                      {sizes.map(size => (
                        <button
                          key={size}
                          className={`dsm-size-btn ${selectedSize === size ? 'active' : ''}`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="dsm-setting-group">
                    <label>Fit</label>
                    <select className="dsm-select" value={selectedFit} onChange={(e) => setSelectedFit(e.target.value)}>
                      {fits.map(fit => (
                        <option key={fit} value={fit}>{fit}</option>
                      ))}
                    </select>
                  </div>
                  <div className="dsm-setting-group">
                    <label>Dress Length</label>
                    <select className="dsm-select">
                      {dressLengths.map(length => (
                        <option key={length} value={length}>{length}</option>
                      ))}
                    </select>
                  </div>
                  <div className="dsm-setting-group">
                    <label>Sleeve Style</label>
                    <select className="dsm-select">
                      {sleeveStyles.map(style => (
                        <option key={style} value={style}>{style}</option>
                      ))}
                    </select>
                  </div>
                  <div className="dsm-setting-group">
                    <label>Neckline</label>
                    <select className="dsm-select">
                      {necklines.map(neckline => (
                        <option key={neckline} value={neckline}>{neckline}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Design Placement */}
              <div className="dsm-placement-section">
                <h3 className="dsm-section-title">Design Placement</h3>
                <div className="dsm-placement-options">
                  {placements.map(place => (
                    <button
                      key={place}
                      className={`dsm-placement-btn ${selectedPlacement === place.toLowerCase().replace(/\s+/g, '-') ? 'active' : ''}`}
                      onClick={() => setSelectedPlacement(place.toLowerCase().replace(/\s+/g, '-'))}
                    >
                      {place}
                    </button>
                  ))}
                </div>
                <div className="dsm-placement-controls">
                  <button className="dsm-control-btn"><Move size={18} /></button>
                  <button className="dsm-control-btn"><Scissors size={18} /></button>
                  <button className="dsm-control-btn"><RotateCcw size={18} /></button>
                  <button className="dsm-control-btn"><Rotate3d size={18} /></button>
                  <button className="dsm-control-btn"><Copy size={18} /></button>
                </div>
              </div>

              {/* Fabric & Material */}
              <div className="dsm-fabric-section">
                <h3 className="dsm-section-title">Fabric & Material</h3>
                <div className="dsm-fabric-grid">
                  {fabrics.map(fabric => (
                    <button
                      key={fabric}
                      className={`dsm-fabric-btn ${selectedFabric === fabric ? 'active' : ''}`}
                      onClick={() => setSelectedFabric(fabric)}
                    >
                      {fabric}
                    </button>
                  ))}
                </div>
                <div className="dsm-fabric-options">
                  <label className="dsm-checkbox">
                    <input type="checkbox" />
                    <span>Fabric Texture Preview</span>
                  </label>
                  <label className="dsm-checkbox">
                    <input type="checkbox" />
                    <span>Fabric Shine</span>
                  </label>
                  <label className="dsm-checkbox">
                    <input type="checkbox" />
                    <span>Fabric Stretch Simulation</span>
                  </label>
                </div>
              </div>

              {/* Color Customization */}
              <div className="dsm-color-section">
                <h3 className="dsm-section-title">Color Customization</h3>
                <div className="dsm-quick-colors">
                  {quickColors.map(color => (
                    <button
                      key={color.name}
                      className={`dsm-quick-color-btn ${primaryColor === color.value ? 'active' : ''}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => {
                        setPrimaryColor(color.value);
                      }}
                    />
                  ))}
                </div>
                <div className="dsm-advanced-colors">
                  <div className="dsm-custom-group">
                    <label>Primary Color</label>
                    <div className="dsm-color-input-row">
                      <input type="color" className="dsm-color-picker" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
                      <input type="text" className="dsm-color-hex" value={primaryColor} readOnly />
                    </div>
                  </div>
                  <div className="dsm-custom-group">
                    <label>Secondary Color</label>
                    <div className="dsm-color-input-row">
                      <input type="color" className="dsm-color-picker" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />
                      <input type="text" className="dsm-color-hex" value={secondaryColor} readOnly />
                    </div>
                  </div>
                  <div className="dsm-custom-group">
                    <label>Accent Color</label>
                    <div className="dsm-color-input-row">
                      <input type="color" className="dsm-color-picker" />
                      <input type="text" className="dsm-color-hex" value="#ff69b4" readOnly />
                    </div>
                  </div>
                  <div className="dsm-custom-group">
                    <label>Gradient (Optional)</label>
                    <button className="dsm-btn-outline">Enable Gradient</button>
                  </div>
                </div>
              </div>

              {/* AI Model Preview */}
              <div className="dsm-model-preview-section">
                <h3 className="dsm-section-title">AI Model Preview</h3>
                <div className="dsm-model-selection">
                  {modelTypes.map(model => (
                    <button
                      key={model}
                      className={`dsm-model-btn ${activeModel === model.toLowerCase().replace(/\s+/g, '-') ? 'active' : ''}`}
                      onClick={() => setActiveModel(model.toLowerCase().replace(/\s+/g, '-'))}
                    >
                      {model}
                    </button>
                  ))}
                </div>
                <div className="dsm-pose-selection">
                  {poses.map(pose => (
                    <button key={pose} className="dsm-pose-btn">{pose}</button>
                  ))}
                </div>
              </div>

              {/* 360° Preview */}
              <div className="dsm-preview-section">
                <h3 className="dsm-section-title">360° Preview</h3>
                <div className="dsm-preview-container">
                  <div className="dsm-preview-tabs">
                    {previewModes.map(mode => (
                      <button
                        key={mode}
                        className={`dsm-preview-tab ${activePreviewMode === mode.toLowerCase().replace(/\s+/g, '-').replace(/°/g, '') ? 'active' : ''}`}
                        onClick={() => setActivePreviewMode(mode.toLowerCase().replace(/\s+/g, '-').replace(/°/g, ''))}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                  <div className="dsm-preview-mockup">
                    <Shirt size={80} />
                  </div>
                  <div className="dsm-preview-controls">
                    <button className="dsm-zoom-btn"><Maximize size={16} /></button>
                    <button className="dsm-fullscreen-btn"><Maximize size={16} /> Fullscreen</button>
                  </div>
                </div>
                <div className="dsm-scene-options">
                  {scenes.map(scene => (
                    <button
                      key={scene}
                      className={`dsm-scene-btn ${activeScene === scene.toLowerCase() ? 'active' : ''}`}
                      onClick={() => setActiveScene(scene.toLowerCase())}
                    >
                      {scene}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mockup Details */}
              <div className="dsm-details-section">
                <h3 className="dsm-section-title">Mockup Details</h3>
                <div className="dsm-details-grid">
                  <div className="dsm-detail-card">
                    <div className="dsm-detail-label">Product</div>
                    <div className="dsm-detail-value">Maxi Dress</div>
                  </div>
                  <div className="dsm-detail-card">
                    <div className="dsm-detail-label">Material</div>
                    <div className="dsm-detail-value">Silk</div>
                  </div>
                  <div className="dsm-detail-card">
                    <div className="dsm-detail-label">Color</div>
                    <div className="dsm-detail-value">Emerald Green</div>
                  </div>
                  <div className="dsm-detail-card">
                    <div className="dsm-detail-label">Print Area</div>
                    <div className="dsm-detail-value">Full Dress</div>
                  </div>
                  <div className="dsm-detail-card">
                    <div className="dsm-detail-label">Resolution</div>
                    <div className="dsm-detail-value">5000 × 6000</div>
                  </div>
                  <div className="dsm-detail-card">
                    <div className="dsm-detail-label">DPI</div>
                    <div className="dsm-detail-value">300</div>
                  </div>
                </div>
              </div>

              {/* Export */}
              <div className="dsm-export-section">
                <h3 className="dsm-section-title">Export</h3>
                <div className="dsm-export-formats">
                  {exportFormats.map(format => (
                    <button
                      key={format}
                      className={`dsm-format-btn ${selectedExportFormat === format ? 'active' : ''}`}
                      onClick={() => setSelectedExportFormat(format)}
                    >
                      {format}
                    </button>
                  ))}
                </div>
                <div className="dsm-export-actions">
                  <button className="dsm-btn-primary">
                    <Download size={16} />
                    Download
                  </button>
                  <button className="dsm-btn-secondary">
                    <Layout size={16} />
                    Save to Workspace
                  </button>
                  <button className="dsm-btn-secondary">
                    <Save size={16} />
                    Save to Assets
                  </button>
                  <button className="dsm-btn-secondary">
                    <Share2 size={16} />
                    Share
                  </button>
                  <button className="dsm-btn-secondary">
                    <Sparkles size={16} />
                    Generate Product Listing
                  </button>
                </div>
              </div>

              {/* Saved Mockups */}
              <div className="dsm-saved-section">
                <h3 className="dsm-section-title">Saved Mockups</h3>
                <div className="dsm-saved-grid">
                  {savedMockups.map(mockup => (
                    <div key={mockup.id} className="dsm-saved-card">
                      <div className="dsm-saved-preview">
                        <Shirt size={48} />
                      </div>
                      <div className="dsm-saved-info">
                        <div className="dsm-saved-name">{mockup.mockup}</div>
                        <div className="dsm-saved-meta">
                          {mockup.style} • {mockup.date} • {mockup.status}
                        </div>
                        <div className="dsm-saved-actions">
                          <button className="dsm-saved-action-btn"><Edit size={14} /> Open</button>
                          <button className="dsm-saved-action-btn"><Edit size={14} /> Edit</button>
                          <button className="dsm-saved-action-btn"><Copy size={14} /> Duplicate</button>
                          <button className="dsm-saved-action-btn delete"><Trash2 size={14} /> Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Features */}
              <div className="dsm-premium-section">
                <h3 className="dsm-premium-title">🌟 Premium Features</h3>
                <div className="dsm-premium-grid">
                  <div className="dsm-premium-card">
                    <h4>👗 Pattern Placement</h4>
                    <p>User choose kare pattern kahan apply hoga.</p>
                    <div className="dsm-premium-options">
                      {['Full Dress', 'Top Only', 'Bottom Only', 'Sleeves', 'Collar', 'Waist Belt'].map(opt => (
                        <span key={opt} className="dsm-premium-option">{opt}</span>
                      ))}
                    </div>
                  </div>
                  <div className="dsm-premium-card">
                    <h4>🧵 Stitch Preview</h4>
                    <p>AI stitching lines preview kare.</p>
                  </div>
                  <div className="dsm-premium-card">
                    <h4>💃 Dress Movement Simulation</h4>
                    <p>Fabric movement dikhaye.</p>
                    <div className="dsm-premium-options">
                      {['Standing', 'Walking', 'Wind Effect'].map(opt => (
                        <span key={opt} className="dsm-premium-option">{opt}</span>
                      ))}
                    </div>
                  </div>
                  <div className="dsm-premium-card">
                    <h4>🌈 Seasonal Collections</h4>
                    <p>Quick templates.</p>
                    <div className="dsm-premium-options">
                      {['Summer', 'Winter', 'Spring', 'Autumn', 'Party Wear', 'Bridal'].map(opt => (
                        <span key={opt} className="dsm-premium-option">{opt}</span>
                      ))}
                    </div>
                  </div>
                  <div className="dsm-premium-card">
                    <h4>👠 Accessories Preview</h4>
                    <p>Preview with accessories.</p>
                    <div className="dsm-premium-options">
                      {['Heels', 'Handbag', 'Belt', 'Necklace', 'Hat'].map(opt => (
                        <span key={opt} className="dsm-premium-option">{opt}</span>
                      ))}
                    </div>
                  </div>
                  <div className="dsm-premium-card">
                    <h4>📏 Print Safe Area</h4>
                    <p>Print-safe overlay dikhaye.</p>
                  </div>
                  <div className="dsm-premium-card">
                    <h4>💰 Cost Estimation</h4>
                    <p>Fabric, production, selling price and profit.</p>
                    <div style={{ marginTop: 12, padding: 12, background: '#f5f5f5', borderRadius: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span>Fabric Cost</span>
                        <span>$18</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span>Production Cost</span>
                        <span>$12</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span>Selling Price</span>
                        <span>$65</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: '#7f58ff' }}>
                        <span>Estimated Profit</span>
                        <span>$35</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="dsm-empty-state">
              <div className="dsm-empty-icon">
                <Shirt size={64} />
              </div>
              <h3>No Dress Mockups Yet</h3>
              <p>Create your first AI dress mockup.</p>
              <button className="dsm-btn-primary" onClick={() => setHasCreatedMockup(true)}>
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

export default DressMockupSection;

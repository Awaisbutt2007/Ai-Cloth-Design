
import React, { useState } from 'react';
import {
  Upload,
  Sparkles,
  Layers,
  Palette,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Download,
  Save,
  Layout,
  Star,
  Copy,
  Edit,
  Trash2,
  Image as ImageIcon,
  Check
} from 'lucide-react';

function PatternGeneratorSection({ activeSection }) {
  const [hasGeneratedPattern, setHasGeneratedPattern] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState('t-shirt');
  const [selectedPatternCategory, setSelectedPatternCategory] = useState(null);
  const [selectedAreas, setSelectedAreas] = useState(['front', 'back']);

  const sectionId = 'ai-tools-pattern-generator';
  const activeId = 'pattern-generator';

  if (activeSection !== activeId) return null;

  const patternCategories = [
    { id: 'floral', name: 'Floral', icon: '🌸' },
    { id: 'geometric', name: 'Geometric', icon: '⬜' },
    { id: 'stripes', name: 'Stripes', icon: '📏' },
    { id: 'plaid', name: 'Plaid', icon: '🔲' },
    { id: 'nature', name: 'Nature', icon: '🌿' },
    { id: 'animal', name: 'Animal Print', icon: '🐆' },
    { id: 'abstract', name: 'Abstract', icon: '🎭' },
    { id: 'waves', name: 'Waves', icon: '🌊' },
    { id: 'polka-dots', name: 'Polka Dots', icon: '⭐' },
    { id: 'camouflage', name: 'Camouflage', icon: '🪖' },
    { id: 'embroidery', name: 'Embroidery Style', icon: '🧵' },
    { id: 'luxury', name: 'Luxury Monogram', icon: '✨' }
  ];

  const savedPatterns = [
    { id: 1, name: 'Black & Gold Floral', category: 'Floral', date: '2026-07-11', timesUsed: 8 },
    { id: 2, name: 'Geometric Stripes', category: 'Geometric', date: '2026-07-10', timesUsed: 5 },
    { id: 3, name: 'Minimal Polka Dots', category: 'Polka Dots', date: '2026-07-09', timesUsed: 3 }
  ];

  const toggleArea = (area) => {
    setSelectedAreas(prev =>
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    );
  };

  return (
    <section id={sectionId} className={`section pattern-generator-section ${activeSection === activeId ? 'active' : 'hidden'}`}>
      <div className="sub-content">
        {/* 1️⃣ Header */}
        <div className="pg-header">
          <div className="pg-header-text">
            <h2>Pattern Generator</h2>
            <p>Create custom fashion patterns using AI.</p>
          </div>
          <div className="pg-header-actions">
            <button className="btn-primary">
              <Sparkles size={18} />
              Generate Pattern
            </button>
            <button className="btn-secondary">
              <Layers size={18} />
              Browse Templates
            </button>
          </div>
        </div>

        {hasGeneratedPattern ? (
          <div className="pg-layout">
            {/* Left Column: Settings & Customization */}
            <div className="pg-sidebar-left">
              {/* 4️⃣ AI Pattern Generator Settings */}
              <div className="pg-section-card">
                <h3 className="pg-section-title">AI Pattern Generator</h3>
                <div className="pg-setting-group">
                  <label>Complexity</label>
                  <div className="pg-radio-group">
                    <button className="pg-radio-btn active">Simple</button>
                    <button className="pg-radio-btn">Medium</button>
                    <button className="pg-radio-btn">Detailed</button>
                  </div>
                </div>
                <div className="pg-setting-group">
                  <div className="pg-setting-label-row">
                    <label>Pattern Size</label>
                    <span>Medium</span>
                  </div>
                  <input type="range" min="0" max="100" className="pg-slider" />
                </div>
                <div className="pg-setting-group">
                  <label>Repeat Style</label>
                  <div className="pg-select-wrapper">
                    <select className="pg-select">
                      <option>Grid</option>
                      <option>Half Drop</option>
                      <option>Brick</option>
                      <option>Mirror</option>
                      <option>Random</option>
                    </select>
                  </div>
                </div>
                <div className="pg-setting-group">
                  <div className="pg-setting-label-row">
                    <label>Pattern Density</label>
                    <span>Medium</span>
                  </div>
                  <input type="range" min="0" max="100" className="pg-slider" />
                </div>
              </div>

              {/* 5️⃣ Pattern Customization */}
              <div className="pg-section-card">
                <h3 className="pg-section-title">Pattern Customization</h3>
                <div className="pg-color-section">
                  <label>Colors</label>
                  <div className="pg-color-inputs">
                    <div className="pg-color-input">
                      <label>Primary</label>
                      <input type="color" value="#7f58ff" />
                    </div>
                    <div className="pg-color-input">
                      <label>Secondary</label>
                      <input type="color" value="#ff6f73" />
                    </div>
                    <div className="pg-color-input">
                      <label>Accent</label>
                      <input type="color" value="#ffd700" />
                    </div>
                  </div>
                  <div className="pg-bg-options">
                    <label>Background</label>
                    <div className="pg-bg-btns">
                      <button className="pg-bg-btn active">Transparent</button>
                      <button className="pg-bg-btn">White</button>
                      <button className="pg-bg-btn">Custom</button>
                    </div>
                  </div>
                </div>
                <div className="pg-setting-group">
                  <div className="pg-setting-label-row">
                    <label>Rotation</label>
                    <span>0°</span>
                  </div>
                  <input type="range" min="0" max="360" className="pg-slider" />
                </div>
                <div className="pg-setting-group">
                  <div className="pg-setting-label-row">
                    <label>Scale</label>
                    <span>100%</span>
                  </div>
                  <input type="range" min="50" max="200" className="pg-slider" />
                </div>
                <div className="pg-setting-group">
                  <div className="pg-setting-label-row">
                    <label>Opacity</label>
                    <span>100%</span>
                  </div>
                  <input type="range" min="0" max="100" className="pg-slider" />
                </div>
              </div>

              {/* 7️⃣ Apply to Outfit */}
              <div className="pg-section-card">
                <h3 className="pg-section-title">Apply to Outfit</h3>
                <p className="pg-desc">AI automatically pattern ko clothing par apply kare.</p>
                <div className="pg-areas-list">
                  {[
                    { id: 'front', label: 'Front' },
                    { id: 'back', label: 'Back' },
                    { id: 'sleeves', label: 'Sleeves' },
                    { id: 'collar', label: 'Collar' },
                    { id: 'pocket', label: 'Pocket' },
                    { id: 'full', label: 'Full Outfit' }
                  ].map(area => (
                    <button
                      key={area.id}
                      className={`pg-area-btn ${selectedAreas.includes(area.id) ? 'active' : ''}`}
                      onClick={() => toggleArea(area.id)}
                    >
                      <span className="pg-area-check">{selectedAreas.includes(area.id) ? <Check size={14} /> : null}</span>
                      {area.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle Column: Preview & Categories */}
            <div className="pg-main">
              {/* 3️⃣ Pattern Categories */}
              <div className="pg-section-card">
                <h3 className="pg-section-title">Pattern Categories</h3>
                <div className="pg-categories-grid">
                  {patternCategories.map(cat => (
                    <button
                      key={cat.id}
                      className={`pg-category-card ${selectedPatternCategory === cat.id ? 'active' : ''}`}
                      onClick={() => setSelectedPatternCategory(cat.id)}
                    >
                      <span className="pg-category-icon">{cat.icon}</span>
                      <span className="pg-category-name">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 6️⃣ Live Preview */}
              <div className="pg-preview-wrapper">
                <div className="pg-preview-tabs">
                  <button
                    className={`pg-preview-tab ${activePreviewTab === 'pattern-only' ? 'active' : ''}`}
                    onClick={() => setActivePreviewTab('pattern-only')}
                  >
                    Pattern Only
                  </button>
                  <button
                    className={`pg-preview-tab ${activePreviewTab === 'fabric' ? 'active' : ''}`}
                    onClick={() => setActivePreviewTab('fabric')}
                  >
                    Fabric Preview
                  </button>
                  <button
                    className={`pg-preview-tab ${activePreviewTab === 't-shirt' ? 'active' : ''}`}
                    onClick={() => setActivePreviewTab('t-shirt')}
                  >
                    T-Shirt
                  </button>
                  <button
                    className={`pg-preview-tab ${activePreviewTab === 'hoodie' ? 'active' : ''}`}
                    onClick={() => setActivePreviewTab('hoodie')}
                  >
                    Hoodie
                  </button>
                  <button
                    className={`pg-preview-tab ${activePreviewTab === 'dress' ? 'active' : ''}`}
                    onClick={() => setActivePreviewTab('dress')}
                  >
                    Dress
                  </button>
                  <button
                    className={`pg-preview-tab ${activePreviewTab === 'shoes' ? 'active' : ''}`}
                    onClick={() => setActivePreviewTab('shoes')}
                  >
                    Shoes
                  </button>
                  <button
                    className={`pg-preview-tab ${activePreviewTab === 'bag' ? 'active' : ''}`}
                    onClick={() => setActivePreviewTab('bag')}
                  >
                    Bag
                  </button>
                </div>
                <div className="pg-preview-content">
                  <div className="pg-preview-inner">
                    <div className="pg-preview-placeholder">
                      <ImageIcon size={64} />
                    </div>
                  </div>
                  <div className="pg-preview-tools">
                    <button className="pg-preview-tool"><ZoomIn size={18} /></button>
                    <button className="pg-preview-tool"><ZoomOut size={18} /></button>
                    <button className="pg-preview-tool"><RotateCw size={18} /></button>
                    <button className="pg-preview-tool"><Maximize2 size={18} /></button>
                    <button className="pg-preview-tool">Before/After</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Saved & Export */}
            <div className="pg-sidebar-right">
              {/* 8️⃣ Saved Patterns */}
              <div className="pg-section-card">
                <h3 className="pg-section-title">Saved Patterns</h3>
                <div className="pg-saved-grid">
                  {savedPatterns.map(pattern => (
                    <div key={pattern.id} className="pg-saved-card">
                      <div className="pg-saved-thumb"></div>
                      <div className="pg-saved-info">
                        <div className="pg-saved-name">{pattern.name}</div>
                        <div className="pg-saved-meta">
                          <span className="pg-saved-category">{pattern.category}</span>
                          <span className="pg-saved-date">{pattern.date}</span>
                          <span className="pg-saved-used">{pattern.timesUsed}× used</span>
                        </div>
                      </div>
                      <div className="pg-saved-actions">
                        <button className="pg-saved-action"><Edit size={14} /></button>
                        <button className="pg-saved-action"><Copy size={14} /></button>
                        <button className="pg-saved-action"><Star size={14} /></button>
                        <button className="pg-saved-action danger"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 9️⃣ Export */}
              <div className="pg-section-card">
                <h3 className="pg-section-title">Export</h3>
                <div className="pg-export-formats">
                  <button className="pg-format-btn active">PNG</button>
                  <button className="pg-format-btn">SVG</button>
                  <button className="pg-format-btn">JPG</button>
                  <button className="pg-format-btn">PDF</button>
                </div>
                <div className="pg-export-buttons">
                  <button className="btn-primary pg-full-btn"><Download size={18} /> Download</button>
                  <button className="btn-secondary pg-full-btn"><Save size={18} /> Save to Assets</button>
                  <button className="btn-secondary pg-full-btn"><Layout size={18} /> Save to Workspace</button>
                  <button className="btn-secondary pg-full-btn"><Palette size={18} /> Create Mockup</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* 2️⃣ Create Pattern */}
            <div className="pg-create-area">
              <div className="pg-create-option">
                <h3>Option 1: AI Prompt</h3>
                <textarea
                  className="pg-prompt-input"
                  placeholder="Create a luxury black and gold floral pattern"
                ></textarea>
                <button className="btn-primary">Generate</button>
              </div>
              <div className="pg-create-divider">
                <span>OR</span>
              </div>
              <div className="pg-create-option">
                <h3>Option 2: Reference Image Upload</h3>
                <div className="pg-upload-box">
                  <Upload size={48} />
                  <p>Upload Inspiration Image</p>
                </div>
              </div>
            </div>

            {/* 🔟 Empty State */}
            <div className="pg-empty-state empty-state-card">
              <div className="empty-state-icon-wrapper">
                <Palette size={64} />
              </div>
              <h3>No Patterns Created</h3>
              <p>Generate your first AI pattern.</p>
              <button className="btn-primary" onClick={() => setHasGeneratedPattern(true)}>
                <Sparkles size={18} />
                Generate Pattern
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default PatternGeneratorSection;

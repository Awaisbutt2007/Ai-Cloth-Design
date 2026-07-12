
import React, { useState } from 'react';
import {
  Sparkles,
  Heart,
  Edit,
  RotateCcw,
  Copy,
  Star,
  Download,
  Image as ImageIcon,
  Save,
  Layout,
  Palette,
  Type,
  Layers,
} from 'lucide-react';

function LogoGeneratorSection({ activeSection }) {
  const [hasGeneratedLogos, setHasGeneratedLogos] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState('t-shirt');
  const [selectedStyle, setSelectedStyle] = useState('minimal');
  const [selectedIndustry, setSelectedIndustry] = useState('fashion');
  const [selectedFormat, setSelectedFormat] = useState('svg');

  const sectionId = 'ai-tools-logo-generator';
  const activeId = 'logo-generator';

  if (activeSection !== activeId) return null;

  const logoStyles = [
    'Minimal', 'Luxury', 'Modern', 'Vintage', 'Elegant', 'Streetwear',
    'Sport', 'Monogram', 'Typography', 'Badge', 'Emblem'
  ];

  const quickPresets = [
    'Black & Gold', 'Black & White', 'Navy & Silver',
    'Brown & Beige', 'Luxury Gold', 'Minimal Gray'
  ];

  const industries = ['Fashion', 'Luxury', 'Sportswear', 'Streetwear', 'Kids Wear'];

  const typographyOptions = [
    'Modern', 'Luxury', 'Bold', 'Minimal', 'Serif', 'Sans Serif', 'Handwritten'
  ];

  const iconCategories = [
    'T-Shirt', 'Hoodie', 'Dress', 'Needle', 'Thread', 'Crown',
    'Diamond', 'Leaf', 'Lion', 'Star', 'Abstract', 'No Icon', 'AI Choose Best Icon'
  ];

  const mockupTabs = [
    'T-Shirt', 'Hoodie', 'Cap', 'Shopping Bag', 'Label',
    'Business Card', 'Website Header', 'Clothing Tag', 'Packaging Box'
  ];

  const generatedLogos = [
    { id: 1, name: 'UrbanWear', style: 'Minimal', created: 'Today', favorite: true },
    { id: 2, name: 'BlackGold', style: 'Luxury', created: 'Today', favorite: false },
    { id: 3, name: 'StreetStyle', style: 'Streetwear', created: 'Today', favorite: false },
    { id: 4, name: 'ElegantDress', style: 'Elegant', created: 'Today', favorite: false }
  ];

  const historyLogos = [
    { id: 1, logo: 'UrbanWear', date: 'Today', style: 'Minimal', status: 'Saved' },
    { id: 2, logo: 'BlackGold', date: 'Yesterday', style: 'Luxury', status: 'Downloaded' }
  ];

  return (
    <section id={sectionId} className={`section logo-generator-section ${activeSection === activeId ? 'active' : 'hidden'}`}>
      <div className="sub-content">
        {/* Header */}
        <div className="lg-header">
          <div className="lg-header-text">
            <h2>Logo Generator</h2>
            <p>Create professional fashion brand logos using AI.</p>
          </div>
          <div className="lg-header-actions">
            <button className="btn-primary">
              <Sparkles size={18} />
              Generate Logo
            </button>
            <button className="btn-secondary">
              <Layers size={18} />
              My Logos
            </button>
          </div>
        </div>

        {hasGeneratedLogos ? (
          <div className="lg-layout">
            {/* Left Column: Settings */}
            <div className="lg-sidebar-left">
              {/* Brand Information */}
              <div className="lg-section-card">
                <h3 className="lg-section-title">Brand Information</h3>
                <div className="lg-form-group">
                  <label>Brand Name *</label>
                  <input type="text" placeholder="UrbanWear" />
                </div>
                <div className="lg-form-group">
                  <label>Tagline</label>
                  <input type="text" placeholder="Premium Street Fashion" />
                </div>
                <div className="lg-form-group">
                  <label>Industry</label>
                  <div className="lg-industry-buttons">
                    {industries.map(industry => (
                      <button
                        key={industry}
                        className={selectedIndustry === industry.toLowerCase() ? 'active' : ''}
                        onClick={() => setSelectedIndustry(industry.toLowerCase())}
                      >
                        {industry}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="lg-form-group">
                  <label>Logo Description</label>
                  <textarea placeholder="Describe your logo..." />
                </div>
              </div>

              {/* AI Logo Prompt */}
              <div className="lg-section-card">
                <h3 className="lg-section-title">AI Logo Prompt</h3>
                <textarea
                  className="lg-prompt-input"
                  placeholder="Create a luxury minimalist logo using black and gold colors with a modern fashion style."
                />
                <button className="btn-secondary lg-full-btn">
                  <Sparkles size={16} /> Improve Prompt
                </button>
              </div>

              {/* Logo Style */}
              <div className="lg-section-card">
                <h3 className="lg-section-title">Logo Style</h3>
                <div className="lg-style-grid">
                  {logoStyles.map(style => (
                    <button
                      key={style}
                      className={`lg-style-card ${selectedStyle === style.toLowerCase() ? 'active' : ''}`}
                      onClick={() => setSelectedStyle(style.toLowerCase())}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="lg-section-card">
                <h3 className="lg-section-title">Color Selection</h3>
                <div className="lg-color-pickers">
                  <div className="lg-color-input">
                    <label>Primary Color</label>
                    <input type="color" value="#000000" />
                  </div>
                  <div className="lg-color-input">
                    <label>Secondary Color</label>
                    <input type="color" value="#ffd700" />
                  </div>
                  <div className="lg-color-input">
                    <label>Accent Color</label>
                    <input type="color" value="#ffffff" />
                  </div>
                </div>
                <div className="lg-presets">
                  <label>Quick Presets</label>
                  <div className="lg-preset-buttons">
                    {quickPresets.map(preset => (
                      <button key={preset}>{preset}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Typography */}
              <div className="lg-section-card">
                <h3 className="lg-section-title">Typography</h3>
                <div className="lg-form-group">
                  <select>
                    {typographyOptions.map(opt => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="lg-typography-controls">
                  <div className="lg-slider-group">
                    <div className="lg-slider-label">Font Weight</div>
                    <input type="range" min="100" max="900" defaultValue="400" />
                  </div>
                  <div className="lg-slider-group">
                    <div className="lg-slider-label">Letter Spacing</div>
                    <input type="range" min="-2" max="10" defaultValue="0" />
                  </div>
                  <div className="lg-slider-group">
                    <div className="lg-slider-label">Font Size</div>
                    <input type="range" min="12" max="48" defaultValue="24" />
                  </div>
                </div>
              </div>

              {/* Icon Selection */}
              <div className="lg-section-card">
                <h3 className="lg-section-title">Icon Selection</h3>
                <div className="lg-icon-grid">
                  {iconCategories.map(icon => (
                    <button key={icon}>{icon}</button>
                  ))}
                </div>
              </div>

              {/* AI Generation Settings */}
              <div className="lg-section-card">
                <h3 className="lg-section-title">AI Generation Settings</h3>
                <div className="lg-form-group">
                  <label>Creativity</label>
                  <div className="lg-radio-group">
                    <button>Low</button>
                    <button className="active">Medium</button>
                    <button>High</button>
                  </div>
                </div>
                <div className="lg-form-group">
                  <label>Variations</label>
                  <div className="lg-radio-group">
                    <button>4</button>
                    <button className="active">8</button>
                    <button>12 Logos</button>
                  </div>
                </div>
                <div className="lg-form-group">
                  <label>Background</label>
                  <div className="lg-radio-group">
                    <button className="active">Transparent</button>
                    <button>White</button>
                    <button>Black</button>
                  </div>
                </div>
                <div className="lg-form-group">
                  <label>Output Style</label>
                  <div className="lg-radio-group">
                    <button className="active">Flat</button>
                    <button>3D</button>
                    <button>Gradient</button>
                    <button>Outline</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Column: Generated Logos, Logo Editor, Brand Mockup */}
            <div className="lg-main">
              {/* Generated Logos */}
              <div className="lg-section-card">
                <h3 className="lg-section-title">Generated Logos</h3>
                <div className="lg-logos-grid">
                  {generatedLogos.map(logo => (
                    <div key={logo.id} className="lg-logo-card">
                      <div className="lg-logo-preview"></div>
                      <div className="lg-logo-info">
                        <div className="lg-logo-name">{logo.name}</div>
                        <div className="lg-logo-meta">
                          <span className="lg-logo-style">{logo.style}</span>
                          <span className="lg-logo-created">{logo.created}</span>
                        </div>
                      </div>
                      <div className="lg-logo-actions">
                        <button className={logo.favorite ? 'active' : ''} title="Favorite">
                          <Heart size={16} />
                        </button>
                        <button title="Edit">
                          <Edit size={16} />
                        </button>
                        <button title="Regenerate">
                          <RotateCcw size={16} />
                        </button>
                        <button title="Duplicate">
                          <Copy size={16} />
                        </button>
                        <button title="Set as Brand Logo">
                          <Star size={16} />
                        </button>
                        <button title="Download">
                          <Download size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Logo Editor */}
              <div className="lg-section-card">
                <h3 className="lg-section-title">Logo Editor</h3>
                <div className="lg-editor-grid">
                  <button>Change Text</button>
                  <button>Change Colors</button>
                  <button>Replace Icon</button>
                  <button>Adjust Size</button>
                  <button>Rotate</button>
                  <button>Opacity</button>
                  <button>Shadow</button>
                  <button>Border</button>
                  <button>Gradient</button>
                </div>
              </div>

              {/* Brand Mockup Preview */}
              <div className="lg-section-card">
                <h3 className="lg-section-title">Brand Mockup Preview</h3>
                <p className="lg-subtitle">Preview logo on different products.</p>
                <div className="lg-mockup-tabs">
                  {mockupTabs.map(tab => (
                    <button
                      key={tab}
                      className={activePreviewTab === tab.toLowerCase().replace(/\s+/g, '-') ? 'active' : ''}
                      onClick={() => setActivePreviewTab(tab.toLowerCase().replace(/\s+/g, '-'))}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="lg-mockup-preview">
                  <div className="lg-mockup-placeholder">
                    <ImageIcon size={48} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Export, History */}
            <div className="lg-sidebar-right">
              {/* Export */}
              <div className="lg-section-card">
                <h3 className="lg-section-title">Export</h3>
                <div className="lg-export-formats">
                  {['SVG', 'PNG', 'PDF', 'JPG'].map(format => (
                    <button
                      key={format}
                      className={selectedFormat === format.toLowerCase() ? 'active' : ''}
                      onClick={() => setSelectedFormat(format.toLowerCase())}
                    >
                      {format}
                    </button>
                  ))}
                </div>
                <div className="lg-export-buttons">
                  <button className="btn-primary lg-full-btn">
                    <Download size={18} /> Download
                  </button>
                  <button className="btn-secondary lg-full-btn">
                    <Save size={18} /> Save to Assets
                  </button>
                  <button className="btn-secondary lg-full-btn">
                    <Star size={18} /> Save as Brand Logo
                  </button>
                  <button className="btn-secondary lg-full-btn">
                    <Layout size={18} /> Open in Workspace
                  </button>
                </div>
              </div>

              {/* History */}
              <div className="lg-section-card">
                <h3 className="lg-section-title">History</h3>
                <div className="lg-history-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Logo</th>
                        <th>Date</th>
                        <th>Style</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historyLogos.map(item => (
                        <tr key={item.id}>
                          <td>{item.logo}</td>
                          <td>{item.date}</td>
                          <td>{item.style}</td>
                          <td>{item.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg-empty-state empty-state-card">
            <div className="empty-state-icon-wrapper">
              <Palette size={64} />
            </div>
            <h3>No Logos Yet</h3>
            <p>Create your first AI logo.</p>
            <button className="btn-primary" onClick={() => setHasGeneratedLogos(true)}>
              <Sparkles size={18} />
              Generate Logo
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default LogoGeneratorSection;

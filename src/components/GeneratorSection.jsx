import React, { useState } from 'react';
import {
  Plus, Folder, Mic, Sparkles, Shuffle, Heart, Edit, RefreshCw, Download, Image as ImageIcon,
  Maximize, RotateCw, X, Trash2, Copy, Share2, Palette, Layers, Shirt, Zap, TrendingUp
} from 'lucide-react';

function GeneratorSection({
  activeSection,
  prompt,
  setPrompt,
  handleGenerate,
  isGenerating,
  output,
  genDesignType,
  setGenDesignType,
  genClothing,
  setGenClothing,
  genStyle,
  setGenStyle,
  genFabric,
  setGenFabric,
  genColors,
  setGenColors,
  genPattern,
  setGenPattern,
  genSleeve,
  setGenSleeve,
  genFit,
  setGenFit,
  genNeck,
  setGenNeck,
  genSeason,
  setGenSeason,
  genQuality,
  setGenQuality,
  genCreativity,
  setGenCreativity,
  genNumDesigns,
  setGenNumDesigns,
  genAspectRatio,
  setGenAspectRatio,
  genPreviewMode,
  setGenPreviewMode,
  generatedDesigns,
  setGeneratedDesigns,
  generationHistory,
  setGenerationHistory,
  selectedDesign,
  setSelectedDesign,
  handleSectionClick,
}) {
  const designTypes = ['T-Shirt', 'Hoodie', 'Jacket', 'Dress', 'Polo', 'Shorts', 'Pants', 'Shoes', 'Cap', 'Bag'];
  const clothingOptions = ['Oversized Hoodie', 'Zip Hoodie', 'Bomber Jacket', 'Maxi Dress', 'Polo Shirt'];
  const styles = ['Minimal', 'Luxury', 'Streetwear', 'Vintage', 'Cyberpunk', 'Techwear', 'Y2K', 'Anime', 'Formal', 'Sport'];
  const fabrics = ['Cotton', 'Denim', 'Leather', 'Silk', 'Fleece', 'Polyester', 'Linen'];
  const patterns = ['Solid', 'Floral', 'Camouflage', 'Abstract', 'Plaid', 'Geometric', 'Stripes', 'Custom Pattern'];
  const quickPalettes = [
    { name: 'Black & Gold', colors: ['#000000', '#FFD700'] },
    { name: 'Black & White', colors: ['#000000', '#FFFFFF'] },
    { name: 'Navy & Silver', colors: ['#0A192F', '#C0C0C0'] },
    { name: 'Earth Tones', colors: ['#8B4513', '#D2B48C'] },
    { name: 'Pastel', colors: ['#FFB6C1', '#87CEFA'] },
    { name: 'Neon', colors: ['#39FF14', '#FF00FF'] },
  ];
  const quickTags = ['Luxury', 'Minimal', 'Streetwear', 'Vintage', 'Oversized', 'Sports', 'Casual', 'Formal', 'Winter', 'Summer'];

  const addTagToPrompt = (tag) => {
    setPrompt(prev => prev + (prev ? ' ' : '') + tag);
  };

  const handleGenerateDesigns = () => {
    const newDesigns = Array.from({ length: genNumDesigns }, (_, i) => ({
      id: Date.now() + i,
      image: output.image,
      prompt,
      credits: 8,
      time: new Date().toLocaleTimeString(),
      favorite: false,
    }));
    setGeneratedDesigns(newDesigns);
  };

  return (
    <section id="generator" className={`section generator-section ${activeSection === 'generate-design' ? 'active' : 'hidden'}`}>
      <div className="gen-wrapper" key={activeSection}>
        {/* 1. Header */}
        <div className="gen-header">
          <div className="gen-header-left">
            <h2 className="gen-title">AI Design Generator</h2>
            <p className="gen-subtitle">Create unique fashion designs with AI.</p>
          </div>
          <div className="gen-header-right">
            <button className="gen-btn-secondary">
              <Plus size={18} /> New Design
            </button>
            <button className="gen-btn-secondary" onClick={(e) => handleSectionClick(e, 'all-designs')}>
              <Folder size={18} /> My Designs
            </button>
          </div>
        </div>

        <div className="gen-main-grid">
          {/* Left Column */}
          <div className="gen-left">
            {/* 2. Design Prompt */}
            <div className="gen-card">
              <label className="gen-label">Design Prompt</label>
              <textarea
                className="gen-prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your fashion design...\nExample: Create a luxury oversized black hoodie with golden floral embroidery for winter."
                rows={4}
              />
              <div className="gen-prompt-actions">
                <button className="gen-prompt-btn">
                  <Mic size={16} /> Voice Input
                </button>
                <button className="gen-prompt-btn">
                  <Sparkles size={16} /> Improve Prompt
                </button>
                <button className="gen-prompt-btn">
                  <Shuffle size={16} /> Random Prompt
                </button>
              </div>
            </div>

            {/* 3. AI Prompt Assistant */}
            <div className="gen-card">
              <label className="gen-label">AI Prompt Assistant</label>
              <div className="gen-tags">
                {quickTags.map(tag => (
                  <button
                    key={tag}
                    className="gen-tag"
                    onClick={() => addTagToPrompt(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Design Type */}
            <div className="gen-card">
              <label className="gen-label">Design Type</label>
              <div className="gen-option-grid">
                {designTypes.map(type => (
                  <button
                    key={type}
                    className={`gen-option-btn ${genDesignType === type ? 'active' : ''}`}
                    onClick={() => setGenDesignType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Clothing Selection */}
            <div className="gen-card">
              <label className="gen-label">Clothing Selection</label>
              <div className="gen-option-grid">
                {clothingOptions.map(clothing => (
                  <button
                    key={clothing}
                    className={`gen-option-btn ${genClothing === clothing ? 'active' : ''}`}
                    onClick={() => setGenClothing(clothing)}
                  >
                    {clothing}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. Style Selection */}
            <div className="gen-card">
              <label className="gen-label">Style Selection</label>
              <div className="gen-option-grid">
                {styles.map(style => (
                  <button
                    key={style}
                    className={`gen-option-btn ${genStyle === style ? 'active' : ''}`}
                    onClick={() => setGenStyle(style)}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* 7. Fabric Selection */}
            <div className="gen-card">
              <label className="gen-label">Fabric Selection</label>
              <div className="gen-option-grid">
                {fabrics.map(fabric => (
                  <button
                    key={fabric}
                    className={`gen-option-btn ${genFabric === fabric ? 'active' : ''}`}
                    onClick={() => setGenFabric(fabric)}
                  >
                    {fabric}
                  </button>
                ))}
              </div>
            </div>

            {/* 8. Color Palette */}
            <div className="gen-card">
              <label className="gen-label">Color Palette</label>
              <div className="gen-colors">
                <div className="gen-color-picker">
                  {genColors.map((color, i) => (
                    <input
                      key={i}
                      type="color"
                      value={color}
                      onChange={(e) => {
                        const newColors = [...genColors];
                        newColors[i] = e.target.value;
                        setGenColors(newColors);
                      }}
                      className="gen-color-input"
                    />
                  ))}
                </div>
                <div className="gen-quick-palettes">
                  {quickPalettes.map(palette => (
                    <button
                      key={palette.name}
                      className="gen-palette-btn"
                      onClick={() => setGenColors(palette.colors)}
                      title={palette.name}
                    >
                      {palette.colors.map((c, i) => (
                        <div key={i} className="gen-palette-color" style={{ backgroundColor: c }} />
                      ))}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 9. Pattern Selection */}
            <div className="gen-card">
              <label className="gen-label">Pattern Selection</label>
              <div className="gen-option-grid">
                {patterns.map(pattern => (
                  <button
                    key={pattern}
                    className={`gen-option-btn ${genPattern === pattern ? 'active' : ''}`}
                    onClick={() => setGenPattern(pattern)}
                  >
                    {pattern}
                  </button>
                ))}
              </div>
            </div>

            {/* 10. Design Settings */}
            <div className="gen-card">
              <label className="gen-label">Design Settings</label>
              <div className="gen-settings-grid">
                <div className="gen-setting">
                  <span className="gen-setting-label">Sleeve</span>
                  <div className="gen-setting-options">
                    {['Short', 'Long', 'Sleeveless'].map(opt => (
                      <button
                        key={opt}
                        className={`gen-setting-btn ${genSleeve === opt ? 'active' : ''}`}
                        onClick={() => setGenSleeve(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="gen-setting">
                  <span className="gen-setting-label">Fit</span>
                  <div className="gen-setting-options">
                    {['Slim', 'Regular', 'Oversized'].map(opt => (
                      <button
                        key={opt}
                        className={`gen-setting-btn ${genFit === opt ? 'active' : ''}`}
                        onClick={() => setGenFit(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="gen-setting">
                  <span className="gen-setting-label">Neck</span>
                  <div className="gen-setting-options">
                    {['Round', 'V Neck', 'Polo'].map(opt => (
                      <button
                        key={opt}
                        className={`gen-setting-btn ${genNeck === opt ? 'active' : ''}`}
                        onClick={() => setGenNeck(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="gen-setting">
                  <span className="gen-setting-label">Season</span>
                  <div className="gen-setting-options">
                    {['Summer', 'Winter', 'Spring', 'Autumn'].map(opt => (
                      <button
                        key={opt}
                        className={`gen-setting-btn ${genSeason === opt ? 'active' : ''}`}
                        onClick={() => setGenSeason(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 11. AI Generation Settings */}
            <div className="gen-card">
              <label className="gen-label">AI Generation Settings</label>
              <div className="gen-ai-settings">
                <div className="gen-ai-setting">
                  <span className="gen-setting-label">Quality</span>
                  <div className="gen-setting-options">
                    {['Standard', 'HD', 'Ultra HD'].map(opt => (
                      <button
                        key={opt}
                        className={`gen-setting-btn ${genQuality === opt ? 'active' : ''}`}
                        onClick={() => setGenQuality(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="gen-ai-setting">
                  <span className="gen-setting-label">Creativity</span>
                  <div className="gen-creativity">
                    <span>Low</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={genCreativity}
                      onChange={(e) => setGenCreativity(parseFloat(e.target.value))}
                    />
                    <span>High</span>
                  </div>
                </div>
                <div className="gen-ai-setting">
                  <span className="gen-setting-label">Number of Designs</span>
                  <div className="gen-setting-options">
                    {[1, 2, 4, 8].map(opt => (
                      <button
                        key={opt}
                        className={`gen-setting-btn ${genNumDesigns === opt ? 'active' : ''}`}
                        onClick={() => setGenNumDesigns(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="gen-ai-setting">
                  <span className="gen-setting-label">Aspect Ratio</span>
                  <div className="gen-setting-options">
                    {['1:1', '4:5', '9:16', '16:9'].map(opt => (
                      <button
                        key={opt}
                        className={`gen-setting-btn ${genAspectRatio === opt ? 'active' : ''}`}
                        onClick={() => setGenAspectRatio(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="gen-right">
            {/* 12. Live Preview */}
            <div className="gen-card gen-preview-card">
              <div className="gen-preview-header">
                <label className="gen-label">Live Preview</label>
                <div className="gen-preview-modes">
                  {['Flat Design', 'On Model', 'Mockup', '3D View'].map(mode => (
                    <button
                      key={mode}
                      className={`gen-preview-mode ${genPreviewMode === mode ? 'active' : ''}`}
                      onClick={() => setGenPreviewMode(mode)}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
              <div className="gen-preview-area">
                {selectedDesign ? (
                  <img src={selectedDesign.image} alt="Preview" className="gen-preview-img" />
                ) : (
                  <div className="gen-preview-placeholder">
                    <Palette size={64} />
                    <p>Preview will appear here</p>
                  </div>
                )}
              </div>
              <div className="gen-preview-tools">
                <button className="gen-tool-btn"><Maximize size={18} /></button>
                <button className="gen-tool-btn"><RotateCw size={18} /></button>
              </div>
            </div>

            {/* Generate Button */}
            <button
              className="gen-generate-btn"
              onClick={handleGenerateDesigns}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate Design'}
            </button>

            {/* 13. Generated Designs */}
            {generatedDesigns.length > 0 && (
              <div className="gen-card">
                <label className="gen-label">Generated Designs</label>
                <div className="gen-designs-grid">
                  {generatedDesigns.map((design) => (
                    <div key={design.id} className="gen-design-card">
                      <img src={design.image} alt="Design" className="gen-design-img" />
                      <div className="gen-design-info">
                        <p className="gen-design-prompt">{design.prompt.slice(0, 40)}...</p>
                        <div className="gen-design-meta">
                          <span>Credits: {design.credits}</span>
                          <span>{design.time}</span>
                        </div>
                        <div className="gen-design-actions">
                          <button
                            className="gen-design-icon-btn"
                            onClick={() => {
                              const newDesigns = generatedDesigns.map(d =>
                                d.id === design.id ? { ...d, favorite: !d.favorite } : d
                              );
                              setGeneratedDesigns(newDesigns);
                            }}
                          >
                            <Heart size={16} fill={design.favorite ? '#ff6b7a' : 'none'} />
                          </button>
                          <button className="gen-design-icon-btn"><Edit size={16} /></button>
                          <button className="gen-design-icon-btn"><RefreshCw size={16} /></button>
                          <button className="gen-design-icon-btn"><Download size={16} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 14. Design Actions */}
            <div className="gen-card">
              <label className="gen-label">Design Actions</label>
              <div className="gen-actions-grid">
                <button className="gen-action-btn" onClick={(e) => handleSectionClick(e, 'background-remover')}>
                  Background Remove
                </button>
                <button className="gen-action-btn" onClick={(e) => handleSectionClick(e, 'upscale-image')}>
                  Upscale
                </button>
                <button className="gen-action-btn" onClick={(e) => handleSectionClick(e, 'recolor-outfit')}>
                  Recolor
                </button>
                <button className="gen-action-btn" onClick={(e) => handleSectionClick(e, 'pattern-generator')}>
                  Generate Pattern
                </button>
                <button className="gen-action-btn" onClick={(e) => handleSectionClick(e, 'logo-generator')}>
                  Create Logo
                </button>
                <button className="gen-action-btn" onClick={(e) => handleSectionClick(e, 'female-models')}>
                  Apply to Avatar
                </button>
              </div>
            </div>

            {/* 15. Save & Export */}
            <div className="gen-card">
              <label className="gen-label">Save & Export</label>
              <div className="gen-actions-grid">
                <button className="gen-action-btn" onClick={(e) => handleSectionClick(e, 'workspace')}>
                  Save to Workspace
                </button>
                <button className="gen-action-btn">Save to Assets</button>
                <button className="gen-action-btn">Download PNG</button>
                <button className="gen-action-btn">Download JPG</button>
                <button className="gen-action-btn">Download PDF</button>
                <button className="gen-action-btn"><Share2 size={16} /> Share</button>
              </div>
            </div>

            {/* 16. Generation History */}
            <div className="gen-card">
              <label className="gen-label">Generation History</label>
              <div className="gen-history-table">
                <div className="gen-history-row header">
                  <span>Design</span>
                  <span>Product</span>
                  <span>Date</span>
                  <span>Status</span>
                  <span>Actions</span>
                </div>
                {generationHistory.map((item) => (
                  <div key={item.id} className="gen-history-row">
                    <span>{item.name}</span>
                    <span>{item.product}</span>
                    <span>{item.date}</span>
                    <span className={`gen-status gen-status-${item.status.toLowerCase()}`}>{item.status}</span>
                    <div className="gen-history-actions">
                      <button className="gen-mini-btn">Open</button>
                      <button className="gen-mini-btn"><Copy size={14} /></button>
                      <button className="gen-mini-btn gen-mini-btn-danger"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 17. Empty State (if no designs) */}
        {generatedDesigns.length === 0 && (
          <div className="gen-empty-state">
            <div className="gen-empty-icon">
              <Palette size={64} />
            </div>
            <h3>Start by writing a prompt.</h3>
            <p>Example: "Luxury oversized streetwear hoodie with gold embroidery."</p>
            <button className="gen-generate-btn" onClick={handleGenerateDesigns}>
              Generate Design
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default GeneratorSection;

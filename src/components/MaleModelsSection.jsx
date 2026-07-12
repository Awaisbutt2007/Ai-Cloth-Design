import React, { useState } from 'react';
import {
  Sparkles,
  User,
  Search,
  Move,
  Download,
  Share2,
  Save,
  Edit,
  Plus,
  Heart,
  Camera,
  Sun,
  Cloud,
  Waves,
  Building2,
  Dumbbell,
  Crown,
  Trophy,
  Coffee
} from 'lucide-react';

function MaleModelsSection({ activeSection }) {
  const [hasGeneratedModel, setHasGeneratedModel] = useState(false);
  const [selectedModelStyle, setSelectedModelStyle] = useState('casual');
  const [selectedPose, setSelectedPose] = useState('standing');
  const [selectedScene, setSelectedScene] = useState('studio');
  const [selectedQuality, setSelectedQuality] = useState('HD');
  const [selectedAspectRatio, setSelectedAspectRatio] = useState('1:1');
  const [selectedNumResults, setSelectedNumResults] = useState(1);
  const [selectedCollection, setSelectedCollection] = useState('');

  const activeId = 'male-models';

  if (activeSection !== activeId) return null;

  const modelStyles = [
    { id: 'casual', name: 'Casual' },
    { id: 'streetwear', name: 'Streetwear' },
    { id: 'luxury', name: 'Luxury' },
    { id: 'business', name: 'Business' },
    { id: 'formal', name: 'Formal' },
    { id: 'sports', name: 'Sports' },
    { id: 'gym', name: 'Gym' },
    { id: 'outdoor', name: 'Outdoor' },
    { id: 'runway', name: 'Runway' }
  ];

  const poses = [
    { id: 'standing', name: 'Standing' },
    { id: 'walking', name: 'Walking' },
    { id: 'side-pose', name: 'Side Pose' },
    { id: 'back-pose', name: 'Back Pose' },
    { id: 'hands-in-pocket', name: 'Hands in Pocket' },
    { id: 'crossed-arms', name: 'Crossed Arms' },
    { id: 'running', name: 'Running' },
    { id: 'fashion-runway', name: 'Fashion Runway' }
  ];

  const scenes = [
    { id: 'studio', name: 'Studio' },
    { id: 'street', name: 'Street' },
    { id: 'office', name: 'Office' },
    { id: 'gym', name: 'Gym' },
    { id: 'sports-ground', name: 'Sports Ground' },
    { id: 'fashion-runway', name: 'Fashion Runway' },
    { id: 'coffee-shop', name: 'Coffee Shop' },
    { id: 'outdoor', name: 'Outdoor' }
  ];

  const qualities = ['Standard', 'HD', 'Ultra HD'];
  const aspectRatios = ['1:1', '4:5', '9:16', '16:9'];
  const numResultsOptions = [1, 2, 4, 8];

  const collections = [
    'Sports Collection',
    'Streetwear',
    'Formal Wear',
    'Winter Collection',
    'Summer Collection'
  ];

  const generatedResults = [
    { id: 1, style: 'Business' },
    { id: 2, style: 'Casual' },
    { id: 3, style: 'Gym' },
    { id: 4, style: 'Streetwear' }
  ];

  return (
    <section className={`section ${activeSection === activeId ? 'active' : 'hidden'}`}>
      <div className="sub-content">
        <div className="fm-section">
          {/* Header */}
          <div className="fm-header">
            <div className="fm-header-content">
              <h2>Male Models</h2>
              <p>Create realistic AI male fashion models.</p>
            </div>
            <div className="fm-header-actions">
              <button className="fm-btn-primary" onClick={() => setHasGeneratedModel(true)}>
                <Plus size={18} />
                Generate Model
              </button>
              <button className="fm-btn-secondary">
                <Search size={18} />
                Browse Models
              </button>
            </div>
          </div>

          {hasGeneratedModel ? (
            <>
              {/* Model Library */}
              <div className="fm-model-library-section">
                <h3 className="fm-section-title">Model Library</h3>
                <div className="fm-style-grid">
                  {modelStyles.map(style => (
                    <div
                      key={style.id}
                      className={`fm-style-card ${selectedModelStyle === style.id ? 'selected' : ''}`}
                      onClick={() => setSelectedModelStyle(style.id)}
                    >
                      <div className="fm-style-icon">
                        <User size={40} />
                      </div>
                      <p>{style.name}</p>
                      <div className="flex gap-2">
                        <button className="fm-favorite-btn">
                          <Heart size={16} />
                        </button>
                        <button className="fm-favorite-btn" style={{ fontSize: '10px', padding: '2px 6px' }}>
                          Use
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Search & Filters */}
              <div className="fm-search-filters-section">
                <h3 className="fm-section-title">Search & Filters</h3>
                <div className="fm-search-box">
                  <Search size={18} />
                  <input type="text" placeholder="Search Models..." />
                </div>
                <div className="fm-filters-grid">
                  <div className="fm-filter-group">
                    <label>Age</label>
                    <div className="fm-filter-buttons">
                      {['Teen', 'Young Adult', 'Adult', 'Mature'].map(opt => (
                        <button key={opt} className="fm-filter-btn">{opt}</button>
                      ))}
                    </div>
                  </div>
                  <div className="fm-filter-group">
                    <label>Height</label>
                    <div className="fm-filter-buttons">
                      {['Short', 'Average', 'Tall'].map(opt => (
                        <button key={opt} className="fm-filter-btn">{opt}</button>
                      ))}
                    </div>
                  </div>
                  <div className="fm-filter-group">
                    <label>Body Type</label>
                    <div className="fm-filter-buttons">
                      {['Slim', 'Athletic', 'Muscular', 'Regular', 'Plus Size'].map(opt => (
                        <button key={opt} className="fm-filter-btn">{opt}</button>
                      ))}
                    </div>
                  </div>
                  <div className="fm-filter-group">
                    <label>Skin Tone</label>
                    <div className="fm-filter-buttons">
                      {['Fair', 'Light', 'Medium', 'Tan', 'Deep'].map(opt => (
                        <button key={opt} className="fm-filter-btn">{opt}</button>
                      ))}
                    </div>
                  </div>
                  <div className="fm-filter-group">
                    <label>Hair Style</label>
                    <div className="fm-filter-buttons">
                      {['Buzz Cut', 'Short Hair', 'Curly', 'Long Hair', 'Fade', 'Bald'].map(opt => (
                        <button key={opt} className="fm-filter-btn">{opt}</button>
                      ))}
                    </div>
                  </div>
                  <div className="fm-filter-group">
                    <label>Beard</label>
                    <div className="fm-filter-buttons">
                      {['Clean Shave', 'Light Stubble', 'Full Beard', 'Mustache'].map(opt => (
                        <button key={opt} className="fm-filter-btn">{opt}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Model Details */}
              <div className="fm-model-details-section">
                <h3 className="fm-section-title">Model Details</h3>
                <div className="fm-details-grid">
                  <div className="fm-detail-card">
                    <div className="fm-detail-label">Model Name</div>
                    <div className="fm-detail-value">Alex</div>
                  </div>
                  <div className="fm-detail-card">
                    <div className="fm-detail-label">Height</div>
                    <div className="fm-detail-value">182 cm</div>
                  </div>
                  <div className="fm-detail-card">
                    <div className="fm-detail-label">Body Type</div>
                    <div className="fm-detail-value">Athletic</div>
                  </div>
                  <div className="fm-detail-card">
                    <div className="fm-detail-label">Hair</div>
                    <div className="fm-detail-value">Black</div>
                  </div>
                  <div className="fm-detail-card">
                    <div className="fm-detail-label">Beard</div>
                    <div className="fm-detail-value">Light Stubble</div>
                  </div>
                </div>
              </div>

              {/* Appearance */}
              <div className="fm-appearance-section">
                <h3 className="fm-section-title">Appearance</h3>
                <div className="fm-appearance-grid">
                  <div className="fm-appearance-group">
                    <label>Face Shape</label>
                    <select className="fm-select">
                      <option>Oval</option>
                      <option>Round</option>
                      <option>Square</option>
                      <option>Heart</option>
                    </select>
                  </div>
                  <div className="fm-appearance-group">
                    <label>Eye Color</label>
                    <select className="fm-select">
                      <option>Brown</option>
                      <option>Blue</option>
                      <option>Green</option>
                      <option>Hazel</option>
                    </select>
                  </div>
                  <div className="fm-appearance-group">
                    <label>Hair Color</label>
                    <select className="fm-select">
                      <option>Black</option>
                      <option>Blonde</option>
                      <option>Brown</option>
                      <option>Red</option>
                    </select>
                  </div>
                  <div className="fm-appearance-group">
                    <label>Hair Style</label>
                    <select className="fm-select">
                      <option>Buzz Cut</option>
                      <option>Short Hair</option>
                      <option>Curly</option>
                      <option>Long Hair</option>
                    </select>
                  </div>
                  <div className="fm-appearance-group">
                    <label>Beard Style</label>
                    <select className="fm-select">
                      <option>Clean Shave</option>
                      <option>Light Stubble</option>
                      <option>Full Beard</option>
                      <option>Mustache</option>
                    </select>
                  </div>
                  <div className="fm-appearance-group">
                    <label>Beard Length</label>
                    <select className="fm-select">
                      <option>None</option>
                      <option>Short</option>
                      <option>Medium</option>
                      <option>Long</option>
                    </select>
                  </div>
                  <div className="fm-appearance-group">
                    <label>Facial Expression</label>
                    <div className="fm-expression-buttons">
                      {['Neutral', 'Smile', 'Serious', 'Confident'].map(exp => (
                        <button key={exp} className="fm-expression-btn">{exp}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Body Type */}
              <div className="fm-body-type-section">
                <h3 className="fm-section-title">Body Type</h3>
                <div className="fm-body-type-buttons">
                  {['Slim', 'Regular', 'Athletic', 'Muscular', 'Plus Size'].map(type => (
                    <button key={type} className="fm-body-type-btn">{type}</button>
                  ))}
                </div>
                <div className="fm-body-sliders">
                  <div className="fm-slider-group">
                    <label>Height</label>
                    <input type="range" min="160" max="200" defaultValue="182" />
                  </div>
                  <div className="fm-slider-group">
                    <label>Chest</label>
                    <input type="range" min="1" max="10" defaultValue="5" />
                  </div>
                  <div className="fm-slider-group">
                    <label>Waist</label>
                    <input type="range" min="1" max="10" defaultValue="5" />
                  </div>
                  <div className="fm-slider-group">
                    <label>Shoulders</label>
                    <input type="range" min="1" max="10" defaultValue="5" />
                  </div>
                  <div className="fm-slider-group">
                    <label>Arms</label>
                    <input type="range" min="1" max="10" defaultValue="5" />
                  </div>
                </div>
              </div>

              {/* Pose Selection */}
              <div className="fm-pose-section">
                <h3 className="fm-section-title">Pose Selection</h3>
                <div className="fm-pose-grid">
                  {poses.map(pose => (
                    <div
                      key={pose.id}
                      className={`fm-pose-card ${selectedPose === pose.id ? 'selected' : ''}`}
                      onClick={() => setSelectedPose(pose.id)}
                    >
                      <div className="fm-pose-icon">
                        <User size={32} />
                      </div>
                      <p>{pose.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clothing Preview */}
              <div className="fm-clothing-preview-section">
                <h3 className="fm-section-title">Clothing Preview</h3>
                <div className="fm-clothing-sources">
                  <button className="fm-clothing-btn"><Move size={16} /> Workspace</button>
                  <button className="fm-clothing-btn"><Save size={16} /> Assets</button>
                  <button className="fm-clothing-btn"><Crown size={16} /> Mockups</button>
                </div>
                <div className="fm-supported-products">
                  {['T-Shirt', 'Hoodie', 'Jacket', 'Polo Shirt', 'Jeans', 'Shorts', 'Shoes', 'Cap'].map(product => (
                    <span key={product} className="fm-product-tag">{product}</span>
                  ))}
                </div>
              </div>

              {/* Scene & Background */}
              <div className="fm-scene-section">
                <h3 className="fm-section-title">Scene & Background</h3>
                <div className="fm-scene-grid">
                  {scenes.map(scene => (
                    <div
                      key={scene.id}
                      className={`fm-scene-card ${selectedScene === scene.id ? 'selected' : ''}`}
                      onClick={() => setSelectedScene(scene.id)}
                    >
                      <div className="fm-scene-icon">
                        {scene.id === 'studio' && <Camera size={24} />}
                        {scene.id === 'street' && <Building2 size={24} />}
                        {scene.id === 'office' && <Building2 size={24} />}
                        {scene.id === 'gym' && <Dumbbell size={24} />}
                        {scene.id === 'sports-ground' && <Trophy size={24} />}
                        {scene.id === 'fashion-runway' && <Crown size={24} />}
                        {scene.id === 'coffee-shop' && <Coffee size={24} />}
                        {scene.id === 'outdoor' && <Cloud size={24} />}
                      </div>
                      <p>{scene.name}</p>
                    </div>
                  ))}
                </div>
                <div className="fm-background-controls">
                  <div className="fm-control-group">
                    <label>Blur</label>
                    <input type="range" min="0" max="100" defaultValue="0" />
                  </div>
                  <div className="fm-control-group">
                    <label>Brightness</label>
                    <input type="range" min="0" max="100" defaultValue="50" />
                  </div>
                  <div className="fm-control-group">
                    <label>Shadow</label>
                    <input type="range" min="0" max="100" defaultValue="30" />
                  </div>
                  <div className="fm-control-group">
                    <label>Color Temperature</label>
                    <input type="range" min="0" max="100" defaultValue="50" />
                  </div>
                </div>
              </div>

              {/* AI Generation Settings */}
              <div className="fm-generation-section">
                <h3 className="fm-section-title">AI Generation Settings</h3>
                <div className="fm-generation-grid">
                  <div className="fm-generation-group">
                    <label>Quality</label>
                    <div className="fm-option-buttons">
                      {qualities.map(quality => (
                        <button
                          key={quality}
                          className={`fm-option-btn ${selectedQuality === quality ? 'active' : ''}`}
                          onClick={() => setSelectedQuality(quality)}
                        >
                          {quality}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="fm-generation-group">
                    <label>Aspect Ratio</label>
                    <div className="fm-option-buttons">
                      {aspectRatios.map(ratio => (
                        <button
                          key={ratio}
                          className={`fm-option-btn ${selectedAspectRatio === ratio ? 'active' : ''}`}
                          onClick={() => setSelectedAspectRatio(ratio)}
                        >
                          {ratio}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="fm-generation-group">
                    <label>Number of Results</label>
                    <div className="fm-option-buttons">
                      {numResultsOptions.map(num => (
                        <button
                          key={num}
                          className={`fm-option-btn ${selectedNumResults === num ? 'active' : ''}`}
                          onClick={() => setSelectedNumResults(num)}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Generated Results */}
              <div className="fm-results-section">
                <h3 className="fm-section-title">Generated Results</h3>
                <div className="fm-results-grid">
                  {generatedResults.map(result => (
                    <div key={result.id} className="fm-result-card">
                      <div className="fm-result-preview">
                        <User size={64} />
                      </div>
                      <div className="fm-result-actions">
                        <button className="fm-result-action-btn"><Download size={14} /></button>
                        <button className="fm-result-action-btn"><Save size={14} /></button>
                        <button className="fm-result-action-btn"><Sparkles size={14} /></button>
                        <button className="fm-result-action-btn"><Edit size={14} /></button>
                        <button className="fm-result-action-btn"><Share2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Collection */}
              <div className="fm-collection-section">
                <h3 className="fm-section-title">Save Collection</h3>
                <div className="fm-collection-grid">
                  {collections.map(collection => (
                    <button
                      key={collection}
                      className={`fm-collection-btn ${selectedCollection === collection ? 'active' : ''}`}
                      onClick={() => setSelectedCollection(collection)}
                    >
                      {collection}
                    </button>
                  ))}
                  <button className="fm-collection-btn new">
                    <Plus size={16} /> New Collection
                  </button>
                </div>
              </div>

              {/* Premium Features */}
              <div className="fm-premium-section">
                <h3 className="fm-premium-title">🌟 Premium Features</h3>
                <div className="fm-premium-grid">
                  <div className="fm-premium-card">
                    <h4>👔 Outfit Categories</h4>
                    <p>Business Suit, Casual Wear, Streetwear, Gym Wear, Winter Wear, Formal Wear.</p>
                  </div>
                  <div className="fm-premium-card">
                    <h4>🧥 Layered Clothing</h4>
                    <p>T-Shirt + Jacket, Hoodie + Jacket, Shirt + Blazer, Polo + Jeans.</p>
                  </div>
                  <div className="fm-premium-card">
                    <h4>💪 Physique Presets</h4>
                    <p>Slim, Athletic, Muscular, Heavy Build.</p>
                  </div>
                  <div className="fm-premium-card">
                    <h4>📸 Multi-Angle Preview</h4>
                    <p>Front, Back, Left, Right, 360°.</p>
                  </div>
                  <div className="fm-premium-card">
                    <h4>💡 Lighting Presets</h4>
                    <p>Studio, Natural, Sunset, Indoor, Spotlight.</p>
                  </div>
                  <div className="fm-premium-card">
                    <h4>📱 Social Media Preview</h4>
                    <p>Instagram Post, Instagram Story, Facebook Ad, Website Banner.</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="fm-empty-state">
              <div className="fm-empty-icon">
                <User size={64} />
              </div>
              <h3>No Male Models Generated</h3>
              <p>Create your first AI male model.</p>
              <button className="fm-btn-primary" onClick={() => setHasGeneratedModel(true)}>
                <Sparkles size={18} />
                Generate Model
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default MaleModelsSection;

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
  Building2,
  Dumbbell,
  Trophy,
  Coffee,
  Cake,
  School
} from 'lucide-react';

function KidsModelsSection({ activeSection }) {
  const [hasGeneratedModel, setHasGeneratedModel] = useState(false);
  const [selectedModelStyle, setSelectedModelStyle] = useState('baby');
  const [selectedPose, setSelectedPose] = useState('standing');
  const [selectedScene, setSelectedScene] = useState('playground');
  const [selectedQuality, setSelectedQuality] = useState('HD');
  const [selectedAspectRatio, setSelectedAspectRatio] = useState('1:1');
  const [selectedNumResults, setSelectedNumResults] = useState(1);
  const [selectedCollection, setSelectedCollection] = useState('');

  const activeId = 'kids-models';

  if (activeSection !== activeId) return null;

  const modelStyles = [
    { id: 'baby', name: 'Baby' },
    { id: 'toddler', name: 'Toddler' },
    { id: 'kids', name: 'Kids' },
    { id: 'pre-teen', name: 'Pre-Teen' },
    { id: 'boys', name: 'Boys' },
    { id: 'girls', name: 'Girls' },
    { id: 'school-uniform', name: 'School Uniform' },
    { id: 'sports', name: 'Sports' }
  ];

  const poses = [
    { id: 'standing', name: 'Standing' },
    { id: 'walking', name: 'Walking' },
    { id: 'running', name: 'Running' },
    { id: 'jumping', name: 'Jumping' },
    { id: 'waving', name: 'Waving' },
    { id: 'sitting', name: 'Sitting' },
    { id: 'playing', name: 'Playing' },
    { id: 'school-pose', name: 'School Pose' }
  ];

  const scenes = [
    { id: 'playground', name: 'Playground' },
    { id: 'school', name: 'School' },
    { id: 'studio', name: 'Studio' },
    { id: 'park', name: 'Park' },
    { id: 'birthday-party', name: 'Birthday Party' },
    { id: 'sports-ground', name: 'Sports Ground' },
    { id: 'classroom', name: 'Classroom' }
  ];

  const qualities = ['Standard', 'HD', 'Ultra HD'];
  const aspectRatios = ['1:1', '4:5', '9:16', '16:9'];
  const numResultsOptions = [1, 2, 4, 8];

  const collections = [
    'School Collection',
    'Summer Kids',
    'Winter Wear',
    'Sports Collection',
    'Party Wear'
  ];

  const generatedResults = [
    { id: 1, style: 'School Uniform' },
    { id: 2, style: 'Summer Kids' },
    { id: 3, style: 'Sports' },
    { id: 4, style: 'Party Wear' }
  ];

  return (
    <section className={`section ${activeSection === activeId ? 'active' : 'hidden'}`}>
      <div className="sub-content">
        <div className="fm-section">
          {/* Header */}
          <div className="fm-header">
            <div className="fm-header-content">
              <h2>Kids Models</h2>
              <p>Create realistic AI kids fashion mockups.</p>
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
                      <button className="fm-favorite-btn">
                        <Heart size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Search & Filters */}
              <div className="fm-search-filters-section">
                <h3 className="fm-section-title">Search & Filters</h3>
                <div className="fm-search-box">
                  <Search size={18} />
                  <input type="text" placeholder="Search Kids Models..." />
                </div>
                <div className="fm-filters-grid">
                  <div className="fm-filter-group">
                    <label>Gender</label>
                    <div className="fm-filter-buttons">
                      {['Boy', 'Girl', 'Unisex'].map(opt => (
                        <button key={opt} className="fm-filter-btn">{opt}</button>
                      ))}
                    </div>
                  </div>
                  <div className="fm-filter-group">
                    <label>Age Group</label>
                    <div className="fm-filter-buttons">
                      {['0–2 Years', '3–5 Years', '6–9 Years', '10–12 Years'].map(opt => (
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
                    <label>Skin Tone</label>
                    <div className="fm-filter-buttons">
                      {['Fair', 'Light', 'Medium', 'Tan', 'Deep'].map(opt => (
                        <button key={opt} className="fm-filter-btn">{opt}</button>
                      ))}
                    </div>
                  </div>
                  <div className="fm-filter-group">
                    <label>Hair</label>
                    <div className="fm-filter-buttons">
                      {['Short', 'Curly', 'Straight', 'Long', 'Ponytail'].map(opt => (
                        <button key={opt} className="fm-filter-btn">{opt}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Age Group */}
              <div className="fm-model-details-section">
                <h3 className="fm-section-title">Age Group</h3>
                <div className="fm-details-grid">
                  {[
                    { emoji: '👶', name: 'Baby' },
                    { emoji: '🧒', name: 'Toddler' },
                    { emoji: '👦', name: 'Kids' },
                    { emoji: '🧑', name: 'Pre-Teen' }
                  ].map(group => (
                    <div key={group.name} className="fm-detail-card">
                      <div className="fm-detail-value">{group.emoji} {group.name}</div>
                    </div>
                  ))}
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
                    <label>Hair Style</label>
                    <select className="fm-select">
                      <option>Short</option>
                      <option>Curly</option>
                      <option>Straight</option>
                      <option>Long</option>
                      <option>Ponytail</option>
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
                    <label>Eye Color</label>
                    <select className="fm-select">
                      <option>Brown</option>
                      <option>Blue</option>
                      <option>Green</option>
                      <option>Hazel</option>
                    </select>
                  </div>
                  <div className="fm-appearance-group">
                    <label>Facial Expression</label>
                    <div className="fm-expression-buttons">
                      {['Happy', 'Smile', 'Excited', 'Neutral', 'Curious'].map(exp => (
                        <button key={exp} className="fm-expression-btn">{exp}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Body Size */}
              <div className="fm-body-type-section">
                <h3 className="fm-section-title">Body Size</h3>
                <div className="fm-body-type-buttons">
                  {['Slim', 'Average', 'Healthy'].map(type => (
                    <button key={type} className="fm-body-type-btn">{type}</button>
                  ))}
                </div>
                <div className="fm-body-sliders">
                  <div className="fm-slider-group">
                    <label>Height</label>
                    <input type="range" min="1" max="10" defaultValue="5" />
                  </div>
                  <div className="fm-slider-group">
                    <label>Build</label>
                    <input type="range" min="1" max="10" defaultValue="5" />
                  </div>
                </div>
              </div>

              {/* Hair & Face - Using Appearance section above as per user's requirement but keeping the section title as per the list */}
              <div className="fm-appearance-section">
                <h3 className="fm-section-title">Hair & Face</h3>
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
                  <button className="fm-clothing-btn"><School size={16} /> Mockups</button>
                </div>
                <div className="fm-supported-products">
                  {['T-Shirt', 'Hoodie', 'Jacket', 'School Uniform', 'Dress', 'Shorts', 'Pants', 'Shoes', 'Cap'].map(product => (
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
                        {scene.id === 'playground' && <Dumbbell size={24} />}
                        {scene.id === 'school' && <School size={24} />}
                        {scene.id === 'studio' && <Camera size={24} />}
                        {scene.id === 'park' && <Sun size={24} />}
                        {scene.id === 'birthday-party' && <Cake size={24} />}
                        {scene.id === 'sports-ground' && <Trophy size={24} />}
                        {scene.id === 'classroom' && <Building2 size={24} />}
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
                    <h4>👕 School Uniform Preview</h4>
                    <p>Shirt, Pants, Skirt, Blazer, Tie.</p>
                  </div>
                  <div className="fm-premium-card">
                    <h4>🎒 Accessories</h4>
                    <p>Backpack, School Bag, Cap, Shoes, Water Bottle.</p>
                  </div>
                  <div className="fm-premium-card">
                    <h4>🌞 Seasonal Collections</h4>
                    <p>Summer, Winter, Rainy, Sports Day, Party Wear.</p>
                  </div>
                  <div className="fm-premium-card">
                    <h4>📸 Multi-Angle Preview</h4>
                    <p>Front, Back, Left, Right, 360°.</p>
                  </div>
                  <div className="fm-premium-card">
                    <h4>👨‍👩‍👧 Family Preview</h4>
                    <p>Father, Mother, Child in one scene.</p>
                  </div>
                  <div className="fm-premium-card">
                    <h4>🏷️ Size Guide</h4>
                    <p>2Y, 4Y, 6Y, 8Y, 10Y, 12Y.</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="fm-empty-state">
              <div className="fm-empty-icon">
                <User size={64} />
              </div>
              <h3>No Kids Models Generated</h3>
              <p>Create your first AI kids model.</p>
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

export default KidsModelsSection;

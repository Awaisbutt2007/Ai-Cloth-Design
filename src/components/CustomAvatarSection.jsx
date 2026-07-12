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
  Upload,
  Play,
  Pause,
  RotateCcw,
  Copy,
  Trash2,
  Users
} from 'lucide-react';

function CustomAvatarSection({ activeSection }) {
  const [hasCreatedAvatar, setHasCreatedAvatar] = useState(false);
  const [selectedCreateOption, setSelectedCreateOption] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(4);
  const [trainingStatus, setTrainingStatus] = useState('idle'); // idle, training, paused
  const [trainingProgress, setTrainingProgress] = useState(85);
  const [selectedPose, setSelectedPose] = useState('standing');
  const [selectedScene, setSelectedScene] = useState('studio');
  const [selectedLighting, setSelectedLighting] = useState('studio');

  const activeId = 'custom-avatar';

  if (activeSection !== activeId) return null;

  const createOptions = [
    { id: 'from-photos', name: 'Create From Photos', icon: <Camera size={24} /> },
    { id: 'from-scratch', name: 'Create From Scratch', icon: <Plus size={24} /> }
  ];

  const uploadViews = ['Front View', 'Side View', 'Back View', 'Face Close-up'];
  const poses = [
    { id: 'standing', name: 'Standing' },
    { id: 'walking', name: 'Walking' },
    { id: 'running', name: 'Running' },
    { id: 'sitting', name: 'Sitting' },
    { id: 'cross-arms', name: 'Cross Arms' },
    { id: 'hands-in-pocket', name: 'Hands in Pocket' },
    { id: 'runway', name: 'Runway' },
    { id: 'side-pose', name: 'Side Pose' }
  ];
  const scenes = [
    { id: 'studio', name: 'Studio' },
    { id: 'street', name: 'Street' },
    { id: 'fashion-show', name: 'Fashion Show' },
    { id: 'store', name: 'Store' },
    { id: 'park', name: 'Park' },
    { id: 'white-background', name: 'White Background' }
  ];
  const lightings = ['Studio', 'Natural', 'Sunset', 'Indoor'];
  const avatars = [
    { id: 1, name: 'Alex', lastUsed: '2 hours ago', createdDate: '2026-07-10' },
    { id: 2, name: 'Sophie', lastUsed: '1 day ago', createdDate: '2026-07-05' },
    { id: 3, name: 'Max', lastUsed: '3 days ago', createdDate: '2026-06-28' }
  ];

  return (
    <section className={`section ${activeSection === activeId ? 'active' : 'hidden'}`}>
      <div className="sub-content">
        <div className="fm-section">
          {/* Header */}
          <div className="fm-header">
            <div className="fm-header-content">
              <h2>Custom Avatar</h2>
              <p>Create your own AI fashion model.</p>
            </div>
            <div className="fm-header-actions">
              <button className="fm-btn-primary" onClick={() => setHasCreatedAvatar(true)}>
                <Plus size={18} />
                Create Avatar
              </button>
              <button className="fm-btn-secondary">
                <Search size={18} />
                My Avatars
              </button>
            </div>
          </div>

          {hasCreatedAvatar ? (
            <>
              {/* Create Avatar */}
              {!selectedCreateOption ? (
                <div className="fm-model-library-section">
                  <h3 className="fm-section-title">Create Avatar</h3>
                  <div className="fm-style-grid">
                    {createOptions.map(option => (
                      <div
                        key={option.id}
                        className="fm-style-card"
                        onClick={() => setSelectedCreateOption(option.id)}
                      >
                        <div className="fm-style-icon">
                          {option.icon}
                        </div>
                        <p>{option.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {/* Upload Reference Images */}
                  <div className="fm-search-filters-section">
                    <h3 className="fm-section-title">Upload Reference Images</h3>
                    <div className="fm-filters-grid">
                      {uploadViews.map((view) => (
                        <div key={view} className="fm-filter-group">
                          <label>{view}</label>
                          <div className="flex gap-2">
                            <button className="fm-filter-btn flex items-center gap-2">
                              <Upload size={16} />
                              Upload
                            </button>
                            <span className="text-sm text-gray-500">
                              (JPG/PNG, High Quality)
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>4 / 4 Images Uploaded</span>
                        <span>{Math.round((uploadProgress / 4) * 100)}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                          style={{ width: `${(uploadProgress / 4) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="fm-model-details-section">
                    <h3 className="fm-section-title">Basic Information</h3>
                    <div className="fm-details-grid">
                      <div className="fm-detail-card">
                        <div className="fm-detail-label">Avatar Name</div>
                        <input
                          type="text"
                          placeholder="Enter avatar name"
                          className="mt-2 w-full p-2 rounded-lg border border-gray-300"
                        />
                      </div>
                      <div className="fm-detail-card">
                        <div className="fm-detail-label">Gender</div>
                        <select className="mt-2 w-full p-2 rounded-lg border border-gray-300">
                          <option>Male</option>
                          <option>Female</option>
                          <option>Unisex</option>
                        </select>
                      </div>
                      <div className="fm-detail-card">
                        <div className="fm-detail-label">Age Group</div>
                        <select className="mt-2 w-full p-2 rounded-lg border border-gray-300">
                          <option>0–2 Years</option>
                          <option>3–5 Years</option>
                          <option>6–9 Years</option>
                          <option>10–12 Years</option>
                          <option>Teen</option>
                          <option>Young Adult</option>
                          <option>Adult</option>
                          <option>Mature</option>
                        </select>
                      </div>
                      <div className="fm-detail-card">
                        <div className="fm-detail-label">Height</div>
                        <input
                          type="text"
                          placeholder="Enter height"
                          className="mt-2 w-full p-2 rounded-lg border border-gray-300"
                        />
                      </div>
                      <div className="fm-detail-card">
                        <div className="fm-detail-label">Body Type</div>
                        <select className="mt-2 w-full p-2 rounded-lg border border-gray-300">
                          <option>Slim</option>
                          <option>Regular</option>
                          <option>Athletic</option>
                          <option>Muscular</option>
                          <option>Curvy</option>
                          <option>Plus Size</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Appearance */}
                  <div className="fm-appearance-section">
                    <h3 className="fm-section-title">Appearance</h3>
                    <div className="fm-appearance-grid">
                      <div className="fm-appearance-group">
                        <label>Skin Tone</label>
                        <select className="fm-select">
                          <option>Fair</option>
                          <option>Light</option>
                          <option>Medium</option>
                          <option>Tan</option>
                          <option>Deep</option>
                        </select>
                      </div>
                      <div className="fm-appearance-group">
                        <label>Eye Color</label>
                        <select className="fm-select">
                          <option>Brown</option>
                          <option>Blue</option>
                          <option>Green</option>
                          <option>Hazel</option>
                          <option>Gray</option>
                        </select>
                      </div>
                      <div className="fm-appearance-group">
                        <label>Hair Color</label>
                        <select className="fm-select">
                          <option>Black</option>
                          <option>Blonde</option>
                          <option>Brown</option>
                          <option>Red</option>
                          <option>Gray</option>
                        </select>
                      </div>
                      <div className="fm-appearance-group">
                        <label>Hair Style</label>
                        <select className="fm-select">
                          <option>Short</option>
                          <option>Long</option>
                          <option>Curly</option>
                          <option>Straight</option>
                          <option>Ponytail</option>
                          <option>Bun</option>
                        </select>
                      </div>
                      <div className="fm-appearance-group">
                        <label>Facial Expression</label>
                        <div className="fm-expression-buttons">
                          {['Smile', 'Neutral', 'Serious', 'Happy', 'Confident'].map(exp => (
                            <button key={exp} className="fm-expression-btn">{exp}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Body Measurements */}
                  <div className="fm-body-type-section">
                    <h3 className="fm-section-title">Body Measurements</h3>
                    <div className="fm-body-sliders">
                      <div className="fm-slider-group">
                        <label>Height</label>
                        <input type="range" min="150" max="200" defaultValue="175" />
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
                        <label>Hip</label>
                        <input type="range" min="1" max="10" defaultValue="5" />
                      </div>
                      <div className="fm-slider-group">
                        <label>Shoulder Width</label>
                        <input type="range" min="1" max="10" defaultValue="5" />
                      </div>
                      <div className="fm-slider-group">
                        <label>Leg Length</label>
                        <input type="range" min="1" max="10" defaultValue="5" />
                      </div>
                    </div>
                  </div>

                  {/* Face Customization */}
                  <div className="fm-appearance-section">
                    <h3 className="fm-section-title">Face Customization</h3>
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
                        <label>Nose</label>
                        <select className="fm-select">
                          <option>Small</option>
                          <option>Medium</option>
                          <option>Large</option>
                        </select>
                      </div>
                      <div className="fm-appearance-group">
                        <label>Lips</label>
                        <select className="fm-select">
                          <option>Thin</option>
                          <option>Medium</option>
                          <option>Full</option>
                        </select>
                      </div>
                      <div className="fm-appearance-group">
                        <label>Eyebrows</label>
                        <select className="fm-select">
                          <option>Thin</option>
                          <option>Medium</option>
                          <option>Thick</option>
                        </select>
                      </div>
                      <div className="fm-appearance-group">
                        <label>Eyes</label>
                        <select className="fm-select">
                          <option>Almond</option>
                          <option>Round</option>
                          <option>Hooded</option>
                        </select>
                      </div>
                      <div className="fm-appearance-group">
                        <label>Ears</label>
                        <select className="fm-select">
                          <option>Small</option>
                          <option>Medium</option>
                          <option>Large</option>
                        </select>
                      </div>
                      <div className="fm-appearance-group">
                        <label>Smile</label>
                        <input type="range" min="0" max="100" defaultValue="50" />
                      </div>
                      <div className="fm-appearance-group">
                        <label>Jawline</label>
                        <input type="range" min="0" max="100" defaultValue="50" />
                      </div>
                      <div className="fm-appearance-group">
                        <label>Face Width</label>
                        <input type="range" min="0" max="100" defaultValue="50" />
                      </div>
                    </div>
                  </div>

                  {/* Hair Studio */}
                  <div className="fm-appearance-section">
                    <h3 className="fm-section-title">Hair Studio</h3>
                    <div className="fm-appearance-grid">
                      <div className="fm-appearance-group">
                        <label>Hair Style</label>
                        <div className="flex gap-2">
                          {['Short', 'Long', 'Curly', 'Straight', 'Ponytail', 'Bun'].map(style => (
                            <button key={style} className="fm-filter-btn">{style}</button>
                          ))}
                        </div>
                      </div>
                      <div className="fm-appearance-group">
                        <label>Hair Color</label>
                        <div className="flex gap-2">
                          {['Black', 'Brown', 'Blonde', 'Red', 'Gray'].map(color => (
                            <button key={color} className="fm-filter-btn">{color}</button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Clothing Preview */}
                  <div className="fm-clothing-preview-section">
                    <h3 className="fm-section-title">Clothing Preview</h3>
                    <div className="fm-clothing-sources">
                      <button className="fm-clothing-btn"><Move size={16} /> Workspace</button>
                      <button className="fm-clothing-btn"><Save size={16} /> Assets</button>
                      <button className="fm-clothing-btn"><Users size={16} /> Mockups</button>
                    </div>
                    <div className="fm-supported-products">
                      {['T-Shirt', 'Hoodie', 'Jacket', 'Dress', 'Shoes', 'Accessories'].map(product => (
                        <span key={product} className="fm-product-tag">{product}</span>
                      ))}
                    </div>
                  </div>

                  {/* Pose Library */}
                  <div className="fm-pose-section">
                    <h3 className="fm-section-title">Pose Library</h3>
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
                            {scene.id === 'fashion-show' && <Sparkles size={24} />}
                            {scene.id === 'store' && <Building2 size={24} />}
                            {scene.id === 'park' && <Sun size={24} />}
                            {scene.id === 'white-background' && <Cloud size={24} />}
                          </div>
                          <p>{scene.name}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold mb-3">Lighting</h4>
                      <div className="flex gap-2 flex-wrap">
                        {lightings.map(lighting => (
                          <button
                            key={lighting}
                            className={`fm-option-btn ${selectedLighting === lighting ? 'active' : ''}`}
                            onClick={() => setSelectedLighting(lighting)}
                          >
                            {lighting}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* AI Training */}
                  <div className="fm-model-details-section">
                    <h3 className="fm-section-title">AI Training</h3>
                    <div className="fm-details-grid">
                      <div className="fm-detail-card">
                        <div className="fm-detail-label">Status</div>
                        <div className="fm-detail-value">{trainingStatus === 'idle' ? 'Idle' : trainingStatus === 'training' ? 'Training' : 'Paused'}</div>
                        {trainingStatus === 'training' && (
                          <>
                            <div className="mt-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Training Progress</span>
                                <span>{trainingProgress}%</span>
                              </div>
                              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                  style={{ width: `${trainingProgress}%` }}
                                ></div>
                              </div>
                              <div className="mt-2 text-sm text-gray-500">
                                Estimated Time: 4 Minutes
                              </div>
                            </div>
                          </>
                        )}
                        <div className="mt-4 flex gap-2">
                          <button
                            className="fm-option-btn active"
                            onClick={() => {
                              if (trainingStatus === 'idle') {
                                setTrainingStatus('training');
                              } else if (trainingStatus === 'paused') {
                                setTrainingStatus('training');
                              }
                            }}
                          >
                            <Play size={16} className="mr-1" />
                            Start Training
                          </button>
                          <button
                            className="fm-option-btn"
                            onClick={() => setTrainingStatus(trainingStatus === 'training' ? 'paused' : 'idle')}
                            disabled={trainingStatus === 'idle'}
                          >
                            <Pause size={16} className="mr-1" />
                            Pause
                          </button>
                          <button
                            className="fm-option-btn"
                          >
                            <RotateCcw size={16} className="mr-1" />
                            Retrain
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Avatar Library */}
                  <div className="fm-model-library-section">
                    <h3 className="fm-section-title">Avatar Library</h3>
                    <div className="fm-style-grid">
                      {avatars.map(avatar => (
                        <div key={avatar.id} className="fm-style-card">
                          <div className="fm-style-icon">
                            <User size={40} />
                          </div>
                          <p>{avatar.name}</p>
                          <div className="mt-1 text-xs text-gray-500">
                            <div>Last Used: {avatar.lastUsed}</div>
                            <div>Created: {avatar.createdDate}</div>
                          </div>
                          <div className="mt-3 flex gap-2 justify-center">
                            <button className="fm-result-action-btn">
                              <Edit size={14} />
                            </button>
                            <button className="fm-result-action-btn">
                              <Copy size={14} />
                            </button>
                            <button className="fm-result-action-btn">
                              <Heart size={14} />
                            </button>
                            <button className="fm-result-action-btn">
                              <Trash2 size={14} />
                            </button>
                            <button className="fm-result-action-btn text-xs px-3 py-1">
                              Use Avatar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Export */}
                  <div className="fm-clothing-preview-section">
                    <h3 className="fm-section-title">Export</h3>
                    <div className="fm-clothing-sources">
                      <button className="fm-clothing-btn"><Save size={16} /> Save to Assets</button>
                      <button className="fm-clothing-btn"><Users size={16} /> Save to Workspace</button>
                      <button className="fm-clothing-btn"><Download size={16} /> Download</button>
                      <button className="fm-clothing-btn"><Share2 size={16} /> Share</button>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold mb-2">Formats</h4>
                      <div className="flex gap-2">
                        {['PNG', 'JPG', 'PDF'].map(format => (
                          <button key={format} className="fm-option-btn">{format}</button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Premium Features */}
                  <div className="fm-premium-section">
                    <h3 className="fm-premium-title">🌟 Premium Features</h3>
                    <div className="fm-premium-grid">
                      <div className="fm-premium-card">
                        <h4>🎭 Expression Library</h4>
                        <p>Smile, Neutral, Happy, Serious, Confident.</p>
                      </div>
                      <div className="fm-premium-card">
                        <h4>📸 Multi-Angle View</h4>
                        <p>Front, Back, Left, Right, 360°.</p>
                      </div>
                      <div className="fm-premium-card">
                        <h4>👕 Outfit Library</h4>
                        <p>Casual, Formal, Sports, Streetwear.</p>
                      </div>
                      <div className="fm-premium-card">
                        <h4>📏 Size Profiles</h4>
                        <p>Regular, Winter Bulk, Fitness, Oversized Fit.</p>
                      </div>
                      <div className="fm-premium-card">
                        <h4>⭐ Favorite Avatars</h4>
                        <p>Mark frequently used avatars.</p>
                      </div>
                      <div className="fm-premium-card">
                        <h4>📚 Collections</h4>
                        <p>Men, Women, Kids, Clients, Summer Campaign.</p>
                      </div>
                      <div className="fm-premium-card">
                        <h4>🔄 Version History</h4>
                        <p>Version 1 → Version 2 → Version 3.</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="fm-empty-state">
              <div className="fm-empty-icon">
                <User size={64} />
              </div>
              <h3>No Custom Avatars</h3>
              <p>Create your first avatar.</p>
              <button className="fm-btn-primary" onClick={() => setHasCreatedAvatar(true)}>
                <Sparkles size={18} />
                Create Avatar
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default CustomAvatarSection;

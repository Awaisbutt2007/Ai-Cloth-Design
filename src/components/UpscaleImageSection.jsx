
import React, { useState } from 'react';
import {
  Upload,
  History,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Download,
  Save,
  Layout,
  RefreshCw,
  Trash2,
  Eye,
  Image as ImageIcon
} from 'lucide-react';

function UpscaleImageSection({ activeSection }) {
  const [hasUploadedImage, setHasUploadedImage] = useState(false);
  const [upscaleLevel, setUpscaleLevel] = useState('4x');
  const [outputQuality, setOutputQuality] = useState('hd');
  const [enhancements, setEnhancements] = useState({
    sharpenDetails: true,
    reduceNoise: true,
    enhanceColors: true,
    improveTexture: true,
    faceEnhancement: false
  });
  const [outputFormat, setOutputFormat] = useState('png');

  const sectionId = 'ai-tools-upscale-image';
  const activeId = 'upscale-image';

  if (activeSection !== activeId) return null;

  const historyItems = [
    { id: 1, image: 'Jacket.png', upscale: '4×', date: 'Today', status: 'Completed' },
    { id: 2, image: 'Dress.jpg', upscale: '2×', date: 'Yesterday', status: 'Completed' },
    { id: 3, image: 'Shoes.png', upscale: '8×', date: 'Yesterday', status: 'Completed' }
  ];

  const toggleEnhancement = (key) => {
    setEnhancements(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <section id={sectionId} className={`section upscale-section ${activeSection === activeId ? 'active' : 'hidden'}`}>
      <div className="sub-content">
        {/* 1️⃣ Header */}
        <div className="upscale-header">
          <div className="upscale-header-text">
            <h2>Upscale Image</h2>
            <p>Increase image resolution and improve quality using AI.</p>
          </div>
          <div className="upscale-header-actions">
            <button className="btn-primary">
              <Upload size={18} />
              Upload Image
            </button>
            <button className="btn-secondary">
              <History size={18} />
              History
            </button>
          </div>
        </div>

        {hasUploadedImage ? (
          <div className="upscale-layout">
            {/* Left Column: Upscale Settings */}
            <div className="upscale-sidebar-left">
              <div className="upscale-section-card">
                <h3 className="upscale-section-title">Upscale Settings</h3>

                {/* Upscale Level */}
                <div className="upscale-setting-group">
                  <label>Upscale Level</label>
                  <div className="upscale-radio-group">
                    <button
                      className={`upscale-radio-btn ${upscaleLevel === '2x' ? 'active' : ''}`}
                      onClick={() => setUpscaleLevel('2x')}
                    >
                      2×
                    </button>
                    <button
                      className={`upscale-radio-btn ${upscaleLevel === '4x' ? 'active' : ''}`}
                      onClick={() => setUpscaleLevel('4x')}
                    >
                      4×
                    </button>
                    <button
                      className={`upscale-radio-btn ${upscaleLevel === '8x' ? 'active' : ''}`}
                      onClick={() => setUpscaleLevel('8x')}
                    >
                      8×
                    </button>
                  </div>
                </div>

                {/* Output Quality */}
                <div className="upscale-setting-group">
                  <label>Output Quality</label>
                  <div className="upscale-radio-group">
                    <button
                      className={`upscale-radio-btn ${outputQuality === 'standard' ? 'active' : ''}`}
                      onClick={() => setOutputQuality('standard')}
                    >
                      Standard
                    </button>
                    <button
                      className={`upscale-radio-btn ${outputQuality === 'hd' ? 'active' : ''}`}
                      onClick={() => setOutputQuality('hd')}
                    >
                      High
                    </button>
                    <button
                      className={`upscale-radio-btn ${outputQuality === 'ultra' ? 'active' : ''}`}
                      onClick={() => setOutputQuality('ultra')}
                    >
                      Ultra HD
                    </button>
                  </div>
                </div>

                {/* AI Enhancement */}
                <div className="upscale-setting-group">
                  <label>AI Enhancement</label>
                  <div className="upscale-enhancements">
                    <div className="upscale-checkbox-wrapper">
                      <input
                        type="checkbox"
                        id="sharpen-details"
                        checked={enhancements.sharpenDetails}
                        onChange={() => toggleEnhancement('sharpenDetails')}
                      />
                      <label for="sharpen-details">Sharpen Details</label>
                    </div>
                    <div className="upscale-checkbox-wrapper">
                      <input
                        type="checkbox"
                        id="reduce-noise"
                        checked={enhancements.reduceNoise}
                        onChange={() => toggleEnhancement('reduceNoise')}
                      />
                      <label for="reduce-noise">Reduce Noise</label>
                    </div>
                    <div className="upscale-checkbox-wrapper">
                      <input
                        type="checkbox"
                        id="enhance-colors"
                        checked={enhancements.enhanceColors}
                        onChange={() => toggleEnhancement('enhanceColors')}
                      />
                      <label for="enhance-colors">Enhance Colors</label>
                    </div>
                    <div className="upscale-checkbox-wrapper">
                      <input
                        type="checkbox"
                        id="improve-texture"
                        checked={enhancements.improveTexture}
                        onChange={() => toggleEnhancement('improveTexture')}
                      />
                      <label for="improve-texture">Improve Texture</label>
                    </div>
                    <div className="upscale-checkbox-wrapper">
                      <input
                        type="checkbox"
                        id="face-enhancement"
                        checked={enhancements.faceEnhancement}
                        onChange={() => toggleEnhancement('faceEnhancement')}
                      />
                      <label for="face-enhancement">Face Enhancement (Optional)</label>
                    </div>
                  </div>
                </div>

                {/* Output Format */}
                <div className="upscale-setting-group">
                  <label>Output Format</label>
                  <div className="upscale-format-buttons">
                    <button
                      className={`upscale-format-btn ${outputFormat === 'png' ? 'active' : ''}`}
                      onClick={() => setOutputFormat('png')}
                    >
                      PNG
                    </button>
                    <button
                      className={`upscale-format-btn ${outputFormat === 'jpg' ? 'active' : ''}`}
                      onClick={() => setOutputFormat('jpg')}
                    >
                      JPG
                    </button>
                    <button
                      className={`upscale-format-btn ${outputFormat === 'webp' ? 'active' : ''}`}
                      onClick={() => setOutputFormat('webp')}
                    >
                      WEBP
                    </button>
                  </div>
                </div>
              </div>

              {/* 5️⃣ AI Enhancement Details */}
              <div className="upscale-section-card">
                <h3 className="upscale-section-title">AI Enhancement Details</h3>
                <div className="upscale-details-grid">
                  <div className="upscale-detail-item">
                    <span className="upscale-detail-label">Original Resolution</span>
                    <span className="upscale-detail-value">1024 × 1024</span>
                  </div>
                  <div className="upscale-detail-arrow">↓</div>
                  <div className="upscale-detail-item">
                    <span className="upscale-detail-label">New Resolution</span>
                    <span className="upscale-detail-value">4096 × 4096</span>
                  </div>
                  <div className="upscale-detail-item">
                    <span className="upscale-detail-label">Upscale Level</span>
                    <span className="upscale-detail-value">{upscaleLevel.replace('x', '×')}</span>
                  </div>
                  <div className="upscale-detail-item">
                    <span className="upscale-detail-label">Processing Time</span>
                    <span className="upscale-detail-value">4.3 sec</span>
                  </div>
                  <div className="upscale-detail-item">
                    <span className="upscale-detail-label">Credits Used</span>
                    <span className="upscale-detail-value">8</span>
                  </div>
                  <div className="upscale-detail-item">
                    <span className="upscale-detail-label">AI Confidence</span>
                    <span className="upscale-detail-value">98%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Column: Before & After Preview */}
            <div className="upscale-main">
              <div className="upscale-preview-wrapper">
                <div className="upscale-preview-actions">
                  <div className="upscale-toggle-view-group">
                    <span>Before</span>
                    <span className="upscale-toggle-dot">•</span>
                    <span>After</span>
                  </div>
                  <button className="upscale-zoom-btn">
                    <ZoomIn size={18} />
                  </button>
                  <button className="upscale-zoom-btn">
                    <ZoomOut size={18} />
                  </button>
                  <button className="upscale-zoom-btn">
                    <Maximize2 size={18} />
                  </button>
                  <button className="upscale-compare-btn">Side-by-side Compare</button>
                </div>
                <div className="upscale-preview-container">
                  <div className="upscale-before-wrapper">
                    <div className="upscale-preview-label">Original</div>
                    <div className="upscale-preview-inner">
                      <div className="upscale-placeholder-img">
                        <ImageIcon size={64} />
                      </div>
                    </div>
                  </div>
                  <div className="upscale-after-wrapper">
                    <div className="upscale-preview-label">Upscaled</div>
                    <div className="upscale-preview-inner">
                      <div className="upscale-placeholder-img">
                        <ImageIcon size={64} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6️⃣ Export Options */}
              <div className="upscale-section-card">
                <h3 className="upscale-section-title">Export Options</h3>
                <div className="upscale-export-buttons">
                  <button className="btn-primary upscale-full-btn">
                    <Download size={18} />
                    Download PNG
                  </button>
                  <button className="btn-secondary upscale-full-btn">
                    <Download size={18} />
                    Download JPG
                  </button>
                  <button className="btn-secondary upscale-full-btn">
                    <Save size={18} />
                    Save to Assets
                  </button>
                  <button className="btn-secondary upscale-full-btn">
                    <Layout size={18} />
                    Use in Workspace
                  </button>
                  <button className="btn-secondary upscale-full-btn">
                    Replace Original
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Processing History */}
            <div className="upscale-sidebar-right">
              <div className="upscale-section-card">
                <h3 className="upscale-section-title">Processing History</h3>
                <div className="upscale-history-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Upscale</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historyItems.map(item => (
                        <tr key={item.id}>
                          <td className="upscale-history-name">{item.image}</td>
                          <td>{item.upscale}</td>
                          <td>{item.date}</td>
                          <td className="upscale-status-completed">{item.status}</td>
                          <td className="upscale-history-actions">
                            <button className="upscale-history-action">
                              <Eye size={14} />
                            </button>
                            <button className="upscale-history-action">
                              <Download size={14} />
                            </button>
                            <button className="upscale-history-action">
                              <Trash2 size={14} />
                            </button>
                            <button className="upscale-history-action">
                              <RefreshCw size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* 2️⃣ Upload Image */}
            <div className="upscale-upload-area upload-area-card">
              <div className="upload-dropzone">
                <div className="upload-icon-wrapper">
                  <ImageIcon size={64} />
                </div>
                <h3>Drag & Drop your image here</h3>
                <p>or</p>
                <div className="upscale-upload-buttons">
                  <button className="btn-primary">
                    <Upload size={18} />
                    Browse Files
                  </button>
                  <button className="btn-secondary">
                    Paste Image
                  </button>
                </div>
                <div className="upload-formats">
                  <span>PNG</span>
                  <span>JPG</span>
                  <span>JPEG</span>
                  <span>WEBP</span>
                </div>
                <p className="upload-note">Maximum Size: 25 MB</p>
              </div>
            </div>

            {/* 8️⃣ Empty State */}
            <div className="upscale-empty-state empty-state-card">
              <div className="empty-state-icon-wrapper">
                <ImageIcon size={64} />
              </div>
              <h3>No Images Yet</h3>
              <p>Upload an image to upscale it.</p>
              <button
                className="btn-primary"
                onClick={() => setHasUploadedImage(true)}
              >
                <Upload size={18} />
                Upload Image
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default UpscaleImageSection;

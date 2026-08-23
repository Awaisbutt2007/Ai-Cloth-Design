import React, { useState, useRef } from 'react';
import { UploadCloud, Info, FileText, ChevronDown, Image as ImageIcon, X, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

export default function UploadedImagesSection({ activeSection }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [showGuide, setShowGuide] = useState(false);
  const [guideStep, setGuideStep] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef(null);

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      alert("Please select at least one file to upload.");
      return;
    }

    const allProfiles = JSON.parse(window.localStorage.getItem('aifashionProfileStats') || '{}');
    const currentUser = 'default';
    if (!allProfiles[currentUser]) {
      allProfiles[currentUser] = { postImages: [] };
    }
    
    const newPost = {
      id: Date.now().toString(),
      url: selectedFiles[0].url,
      images: selectedFiles.map(f => f.url),
      title: title || 'New Design',
      category: category,
      price: price || '0',
      description: description,
      date: new Date().toISOString(),
      isNew: true
    };
    
    allProfiles[currentUser].postImages = [newPost, ...(allProfiles[currentUser].postImages || [])];
    
    window.localStorage.setItem('aifashionProfileStats', JSON.stringify(allProfiles));
    
    setTitle('');
    setCategory('');
    setPrice('');
    setDescription('');
    setSelectedFiles([]);
  };

  const activeId = 'uploaded-images';
  if (activeSection !== activeId && activeSection !== 'Upload' && activeSection !== 'upload') return null;

  return (
    <section id="assets-uploaded-images" className={`section uploaded-images-section active`}>
      <div className="upload-new-container">
        
        {/* Header */}
        <div className="upload-header-row">
          <div className="upload-header-left">
            <div className="upload-title-icon-box">
              <UploadCloud size={24} color="#7f58ff" />
            </div>
            <div className="upload-header-text">
              <h2>Upload</h2>
              <p>Upload your content and earn auras from the community.</p>
            </div>
          </div>
          <button className="upload-how-btn" onClick={() => { setShowGuide(true); setGuideStep(1); }}>
            <Info size={16} />
            How it works?
          </button>
        </div>

        {/* Dropzone */}
        <div 
          className={`upload-dropzone-box ${isDragging ? 'drag-active' : ''}`}
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }}
          onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }}
          onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
              const filesArray = Array.from(e.dataTransfer.files).map((file) => ({
                file,
                url: URL.createObjectURL(file),
              }));
              setSelectedFiles((prev) => [...prev, ...filesArray]);
            }
          }}
        >
          {selectedFiles.length > 0 ? (
            <div className="selected-files-row">
              {selectedFiles.map((item, index) => (
                <div key={index} className="selected-file-item">
                  {item.file.type.startsWith('video/') ? (
                    <video src={item.url} className="selected-file-preview" />
                  ) : (
                    <img src={item.url} alt="preview" className="selected-file-preview" />
                  )}
                  <button 
                    className="remove-file-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFiles(prev => prev.filter((_, i) => i !== index));
                      URL.revokeObjectURL(item.url);
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <button className="add-more-files-btn" onClick={() => fileInputRef.current?.click()}>
                <UploadCloud size={24} color="#7f58ff" />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                multiple
                accept="image/png, image/jpeg, image/webp, image/gif, video/mp4"
                onChange={(e) => {
                  if (e.target.files) {
                    const filesArray = Array.from(e.target.files).map((file) => ({
                      file,
                      url: URL.createObjectURL(file),
                    }));
                    setSelectedFiles((prev) => [...prev, ...filesArray]);
                  }
                  e.target.value = '';
                }}
              />
            </div>
          ) : (
            <div className="dropzone-content">
              <UploadCloud size={48} color="#7f58ff" className="dropzone-icon" />
              <h3>Drag & Drop your file here</h3>
              <p className="dropzone-or">or</p>
              <button className="dropzone-choose-btn" onClick={() => fileInputRef.current?.click()}>
                Choose File
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                multiple
                accept="image/png, image/jpeg, image/webp, image/gif, video/mp4"
                onChange={(e) => {
                  if (e.target.files) {
                    const filesArray = Array.from(e.target.files).map((file) => ({
                      file,
                      url: URL.createObjectURL(file),
                    }));
                    setSelectedFiles((prev) => [...prev, ...filesArray]);
                  }
                  e.target.value = '';
                }}
              />
              <p className="dropzone-formats">Supported formats: JPG, PNG, MP4, GIF, WEBP (Max 50MB)</p>
            </div>
          )}
        </div>

        {/* Details Panel */}
        <div className="upload-details-panel">
          <div className="details-header">
            <FileText size={18} color="#7f58ff" />
            <h3>Upload Details</h3>
          </div>

          <div className="details-form">
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label>Title</label>
              <input 
                type="text" 
                placeholder="Enter a catchy title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="details-row-2">
              <div className="form-group">
                <label>Category</label>
                <div className="select-wrapper">
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="theme-select"
                  >
                    <option value="" disabled>Select Category</option>
                    <option value="fashion">Fashion</option>
                    <option value="design">Design</option>
                    <option value="texture">Texture</option>
                  </select>
                  <ChevronDown size={16} className="select-icon" />
                </div>
              </div>

              <div className="form-group">
                <label>Price ($)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 29.99" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label>Description</label>
              <div className="textarea-wrapper">
                <textarea 
                  placeholder="Describe your content..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={500}
                ></textarea>
                <span className="char-count">{description.length}/500</span>
              </div>
            </div>
            
            <div className="upload-actions-row">
              <button 
                className="upload-reset-btn"
                onClick={() => {
                  setTitle('');
                  setCategory('');
                  setPrice('');
                  setDescription('');
                  setSelectedFiles([]);
                }}
              >
                Reset
              </button>
              <button className="upload-submit-btn" onClick={handleUpload}>
                <UploadCloud size={18} />
                Upload
              </button>
            </div>
          </div>
        </div>

        {/* Guide Modal */}
        {showGuide && (
          <div className="upload-guide-modal-overlay">
            <div className="upload-guide-modal">
              <button className="guide-close-btn" onClick={() => setShowGuide(false)}>
                <X size={20} />
              </button>
              
              <div className="guide-modal-content">
                {guideStep === 1 && (
                  <div className="guide-step animate-slide-in">
                    <div className="guide-icon-box">
                      <UploadCloud size={48} color="#7f58ff" />
                    </div>
                    <h3>Step 1: Upload Any Images</h3>
                    <p>Start by selecting or dragging and dropping your fashion designs or texture files into the dropzone.</p>
                    
                    <div className="guide-footer">
                      <div className="guide-dots">
                        <span className="dot active"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                      </div>
                      <div className="guide-actions">
                        <button className="guide-next-btn" onClick={() => setGuideStep(2)}>
                          Next <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {guideStep === 2 && (
                  <div className="guide-step animate-slide-in">
                    <div className="guide-icon-box">
                      <FileText size={48} color="#7f58ff" />
                    </div>
                    <h3>Step 2: Add Details</h3>
                    <p>Provide a catchy title, select an appropriate category, and add a descriptive text for your upload.</p>
                    
                    <div className="guide-footer">
                      <div className="guide-dots">
                        <span className="dot"></span>
                        <span className="dot active"></span>
                        <span className="dot"></span>
                      </div>
                      <div className="guide-actions">
                        <button className="guide-prev-btn" onClick={() => setGuideStep(1)}>
                          <ArrowLeft size={16} /> Previous
                        </button>
                        <button className="guide-next-btn" onClick={() => setGuideStep(3)}>
                          Next <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {guideStep === 3 && (
                  <div className="guide-step animate-slide-in">
                    <div className="guide-icon-box">
                      <CheckCircle size={48} color="#7f58ff" />
                    </div>
                    <h3>Step 3: Ready to Upload</h3>
                    <p>After filling everything, click the Upload button to publish your content and earn auras!</p>
                    
                    <div className="guide-footer">
                      <div className="guide-dots">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot active"></span>
                      </div>
                      <div className="guide-actions">
                        <button className="guide-prev-btn" onClick={() => setGuideStep(2)}>
                          <ArrowLeft size={16} /> Previous
                        </button>
                        <button className="guide-next-btn finish-btn" onClick={() => setShowGuide(false)}>
                          Got it!
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

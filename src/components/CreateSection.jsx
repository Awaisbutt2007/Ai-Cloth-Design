import React, { useState, useEffect, useRef } from 'react';
import PostImage from './PostImage';
import { ShoppingBag, Palette, Sparkles, Package, Play, Camera, Image as ImageIcon, X, ChevronRight } from 'lucide-react';

function CreateSection({ activeSection, posts, handleProductClick }) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [mode, setMode] = useState('choose'); // 'choose' | 'camera' | 'preview'
  const [cameraError, setCameraError] = useState('');
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const galleryInputRef = useRef(null);

  // Reset state when section is hidden
  useEffect(() => {
    if (activeSection !== 'ai-scan') {
      setIsScanning(false);
      setScanProgress(0);
      setShowCameraModal(false);
      setMode('choose');
      setCapturedPhoto(null);
      setShowRecommendations(false);
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, [activeSection]);

  // Never leave the camera light on.
  useEffect(() => () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
  }, []);

  useEffect(() => {
    let interval;
    if (isScanning && scanProgress < 100) {
      interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.floor(Math.random() * 15) + 5;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isScanning, scanProgress]);

  // Lock the page behind the source picker and let Escape close it.
  useEffect(() => {
    if (!showCameraModal) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      // Must go through closeModal so the camera stream is actually released.
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [showCameraModal]);

  const handleStartScanClick = () => {
    setCameraError('');
    setMode('choose');
    setShowCameraModal(true);
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  const closeModal = () => {
    stopCamera();
    setShowCameraModal(false);
    setMode('choose');
    setCameraError('');
  };

  // Choosing a photo only previews it — the scan waits for an explicit Start.
  const previewPhoto = (imageDataUrl) => {
    if (!imageDataUrl) return;
    stopCamera();
    setCapturedPhoto(imageDataUrl);
    setMode('preview');
  };

  const beginScan = () => {
    closeModal();
    setIsScanning(true);
    setScanProgress(0);
    setShowRecommendations(false);
  };

  const openCamera = async () => {
    setCameraError('');

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError('This browser does not support camera access.');
      return;
    }

    setMode('camera');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
    } catch (error) {
      const denied = error?.name === 'NotAllowedError' || error?.name === 'SecurityError';
      setCameraError(
        denied
          ? 'Camera permission was blocked. Allow it in your browser settings and try again.'
          : error?.name === 'NotFoundError'
            ? 'No camera was found on this device.'
            : `Camera could not be opened: ${error?.message || 'unknown error'}`,
      );
      setMode('choose');
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    previewPhoto(canvas.toDataURL('image/jpeg', 0.9));
  };

  const handleGalleryFile = (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => previewPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  // Only real uploaded posts — no demo catalogue here.
  const uploadedLooks = (Array.isArray(posts) ? posts : []).filter(
    (post) => post && typeof post === 'object' && (post.url || post.image_url),
  );

  if (showRecommendations) {
    return (
      <section id="ai-scan" className={`section ${activeSection === 'ai-scan' ? 'active' : 'hidden'}`}>
        <div className="scan-results">
          <button type="button" className="section-back-btn" onClick={() => setShowRecommendations(false)}>
            <span className="section-back-icon"><ChevronRight size={17} style={{ transform: 'rotate(180deg)' }} /></span>
            <span>Back to scan</span>
          </button>

          <header className="scan-results-head">
            <div className="scan-results-face">
              {capturedPhoto
                ? <img src={capturedPhoto} alt="Your scan" />
                : <span className="scan-results-face-empty"><Camera size={26} /></span>}
            </div>
            <h1>Your Style Matches</h1>
            <p>Based on your scan, these uploaded looks suit you best.</p>
          </header>

          {uploadedLooks.length > 0 ? (
            <div className="scan-results-grid">
              {uploadedLooks.map((post, index) => (
                <article
                  className="scan-result-card"
                  key={post.id || post.url || index}
                  onClick={() => handleProductClick?.(post)}
                >
                  <div className="scan-result-media">
                    <PostImage src={post.url || post.image_url} alt={post.title || 'Uploaded look'} />
                  </div>
                  <div className="scan-result-body">
                    <h3>{post.title || 'Untitled design'}</h3>
                    <span>Rs. {post.price || 0}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="scan-results-empty">
              <Package size={30} />
              <p>No uploaded looks yet</p>
              <span>Once designs are uploaded, your matches will appear here.</span>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section id="ai-scan" className={`section ${activeSection === 'ai-scan' ? 'active' : 'hidden'}`}>
      <div className="create-section-container">
        <div className="create-header">
          <h1 className="create-title">AI Face Scan</h1>
          <p className="create-subtitle">Let AI understand your style</p>
        </div>

        <div className="create-content-grid">
          {/* Left Card: Scan Animation */}
          <div className="create-card scan-card">
            <div className="scan-animation-container">
              <div className="scan-ring"></div>
              <div className="scan-image-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--card-bg)' }}>
                {(isScanning || scanProgress > 0) && capturedPhoto ? (
                  <img
                    src={capturedPhoto}
                    alt="Your scan"
                    className="scan-image"
                    style={{ animation: 'fadeIn 1s ease-out' }}
                  />
                ) : (
                  <div style={{ color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                      <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
                      <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
                      <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
                      <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>Awaiting Camera</span>
                  </div>
                )}
                <div className="scan-grid-overlay"></div>
              </div>
            </div>

            <div className="scan-progress-wrap">
              <div className="scan-progress-bar">
                <div className="scan-progress-fill" style={{ width: `${scanProgress > 100 ? 100 : scanProgress}%` }}></div>
              </div>
              <p className="scan-progress-text">
                {scanProgress === 0 ? 'Ready to scan' : scanProgress >= 100 ? 'Scan complete!' : `Scanning your face... ${scanProgress}%`}
              </p>
              {!isScanning && scanProgress === 0 && (
                <button className="liquid-btn" onClick={handleStartScanClick} style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 24px', width: '100%', fontSize: '1rem', fontWeight: 'bold' }}>
                  <Play size={18} fill="currentColor" /> START AI SCAN
                </button>
              )}
            </div>
          </div>

          {/* Right Card: Style Suggestions */}
          {(isScanning || scanProgress > 0) && (
            <div className="create-card suggestion-card" style={{ animation: 'fadeIn 0.5s ease-out' }}>
              <h2 className="suggestion-title">AI Style Analysis</h2>

              <div className="suggestion-list">
                {scanProgress > 20 && (
                  <div className="suggestion-item" style={{ animation: 'slideInRight 0.5s ease-out' }}>
                    <div className="suggestion-icon-wrap">
                      <ShoppingBag size={18} />
                    </div>
                    <span className="suggestion-text">Best Fit: <strong>Smart Casual</strong></span>
                  </div>
                )}

                {scanProgress > 45 && (
                  <div className="suggestion-item" style={{ animation: 'slideInRight 0.5s ease-out' }}>
                    <div className="suggestion-icon-wrap">
                      <Palette size={18} />
                    </div>
                    <span className="suggestion-text">Colors: <strong>Navy, Black, White</strong></span>
                  </div>
                )}

                {scanProgress > 70 && (
                  <div className="suggestion-item" style={{ animation: 'slideInRight 0.5s ease-out' }}>
                    <div className="suggestion-icon-wrap">
                      <Sparkles size={18} />
                    </div>
                    <span className="suggestion-text">Vibe: <strong>Modern Classic</strong></span>
                  </div>
                )}

                {scanProgress >= 100 && (
                  <div className="suggestion-item" style={{ animation: 'slideInRight 0.5s ease-out' }}>
                    <div className="suggestion-icon-wrap">
                      <Package size={18} />
                    </div>
                    <span className="suggestion-text">Found <strong>3 Matches</strong></span>
                  </div>
                )}
              </div>

              {scanProgress >= 100 && (
                <button
                  type="button"
                  className="btn-primary view-recommendations-btn"
                  style={{ animation: 'fadeIn 0.5s ease-out' }}
                  onClick={() => setShowRecommendations(true)}
                >
                  View Recommendations
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {showCameraModal && mode === 'preview' && (
        <div className="scan-source-overlay" onClick={closeModal}>
          <div className="scan-source-modal is-camera" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Confirm photo">
            <button type="button" className="scan-source-close" onClick={closeModal} aria-label="Close">
              <X size={18} />
            </button>

            <div className="scan-camera-stage">
              <img src={capturedPhoto} alt="Selected" className="scan-preview-image" />
            </div>

            <div className="scan-preview-actions">
              <button type="button" className="scan-camera-back" onClick={() => { setMode('choose'); setCapturedPhoto(null); }}>
                Change photo
              </button>
              <button type="button" className="scan-start-btn" onClick={beginScan}>
                <Play size={17} fill="currentColor" /> Start Scan
              </button>
            </div>

            <p className="scan-source-note">
              <Sparkles size={13} /> Happy with this photo? Start the scan when you're ready.
            </p>
          </div>
        </div>
      )}

      {showCameraModal && mode === 'camera' && (
        <div className="scan-source-overlay" onClick={closeModal}>
          <div
            className="scan-source-modal is-camera"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Camera"
          >
            <button type="button" className="scan-source-close" onClick={closeModal} aria-label="Close">
              <X size={18} />
            </button>

            <div className="scan-camera-stage">
              <video ref={videoRef} playsInline muted autoPlay className="scan-camera-video" />
              <div className="scan-camera-frame" aria-hidden="true" />
            </div>

            <div className="scan-camera-actions">
              <button type="button" className="scan-camera-back" onClick={() => { stopCamera(); setMode('choose'); }}>
                Back
              </button>
              <button type="button" className="scan-camera-shutter" onClick={capturePhoto} aria-label="Capture photo">
                <span />
              </button>
              <span className="scan-camera-spacer" aria-hidden="true" />
            </div>

            <p className="scan-source-note">
              <Sparkles size={13} /> Centre your face in the frame, then tap the shutter.
            </p>
          </div>
        </div>
      )}

      {showCameraModal && mode === 'choose' && (
        <div className="scan-source-overlay" onClick={closeModal}>
          <div
            className="scan-source-modal"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="scan-source-title"
          >
            <button type="button" className="scan-source-close" onClick={closeModal} aria-label="Close">
              <X size={18} />
            </button>

            <div className="scan-source-head">
              <div className="scan-source-icon">
                <Camera size={26} />
                <span className="scan-source-icon-pulse" aria-hidden="true" />
              </div>
              <h2 id="scan-source-title">Select Photo Source</h2>
              <p>Upload or take a picture so our AI can analyse your style profile.</p>
            </div>

            <div className="scan-source-options">
              <button type="button" className="scan-source-option is-primary" onClick={openCamera}>
                <span className="scan-source-option-icon"><Camera size={20} /></span>
                <span className="scan-source-option-text">
                  <strong>Take a Photo</strong>
                  <small>Use your camera right now</small>
                </span>
                <ChevronRight size={18} className="scan-source-option-arrow" />
              </button>

              <button type="button" className="scan-source-option" onClick={() => galleryInputRef.current?.click()}>
                <span className="scan-source-option-icon"><ImageIcon size={20} /></span>
                <span className="scan-source-option-text">
                  <strong>Choose from Gallery</strong>
                  <small>Pick an existing photo</small>
                </span>
                <ChevronRight size={18} className="scan-source-option-arrow" />
              </button>
              <input
                ref={galleryInputRef}
                type="file"
                accept="image/*"
                onChange={handleGalleryFile}
                hidden
              />
            </div>

            {cameraError && (
              <p className="scan-source-error">{cameraError}</p>
            )}

            <p className="scan-source-note">
              <Sparkles size={13} /> Good lighting and a front-facing photo give the best results.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default CreateSection;

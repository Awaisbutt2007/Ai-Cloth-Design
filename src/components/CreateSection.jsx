import React, { useState, useEffect } from 'react';
import { ShoppingBag, Palette, Sparkles, Package, Play, Camera, Image as ImageIcon, X } from 'lucide-react';

function CreateSection({ activeSection }) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [showCameraModal, setShowCameraModal] = useState(false);

  // Reset state when section is hidden
  useEffect(() => {
    if (activeSection !== 'ai-scan') {
      setIsScanning(false);
      setScanProgress(0);
      setShowCameraModal(false);
    }
  }, [activeSection]);

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

  const handleStartScanClick = () => {
    setShowCameraModal(true);
  };

  const handleSelectSource = () => {
    setShowCameraModal(false);
    setIsScanning(true);
    setScanProgress(0);
  };

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
                {(isScanning || scanProgress > 0) ? (
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop"
                    alt="Face Scan"
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
                <button className="btn-primary view-recommendations-btn" style={{ animation: 'fadeIn 0.5s ease-out' }}>
                  View Recommendations
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {showCameraModal && (
        <div className="modal-overlay" onClick={() => setShowCameraModal(false)} style={{ animation: 'fadeIn 0.3s ease-out' }}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)', padding: '40px', maxWidth: '420px', borderRadius: '24px', background: 'var(--card-bg)', border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <button className="modal-close-btn" onClick={() => setShowCameraModal(false)} style={{ top: '20px', right: '20px' }}>
              <X size={20} />
            </button>
            
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(var(--primary-rgb), 0.15)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--primary)' }}>
                <Camera size={32} />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>Select Photo Source</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Upload or take a picture so our AI can analyze your style profile.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                className="liquid-btn" 
                onClick={handleSelectSource} 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '16px', fontSize: '1.05rem', fontWeight: '600', borderRadius: '16px', border: 'none', cursor: 'pointer' }}
              >
                <Camera size={20} /> Take a Photo
              </button>
              
              <button 
                onClick={handleSelectSource} 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '16px', fontSize: '1.05rem', fontWeight: '600', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--hover-bg)'; e.currentTarget.style.borderColor = 'var(--text-secondary)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <ImageIcon size={20} /> Choose from Gallery
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default CreateSection;

import React, { useEffect, useRef, useState } from 'react';
import {
  Camera, ChevronDown, Globe2, HelpCircle, LogOut, Moon, Monitor, Shield, Sun,
  SwitchCamera, Upload, UserRound, X, Lock, AlertTriangle,
} from 'lucide-react';
import { persistUserAccountPrivacy } from '../lib/posts';

const FACE_PHOTO_KEY = 'aifashionFaceScanPhoto';
const LANGUAGE_KEY = 'aifashionLanguage';
const PRIVACY_KEY = 'aifashionProfilePrivacy';
const PRIVACY_PER_USER_KEY = 'aifashionProfilePrivacyPerUser';
const THEME_MODE_KEY = 'aifashionThemeMode';

function facePhotoStorageKey(email) {
  return `${FACE_PHOTO_KEY}:${String(email || 'guest').trim().toLowerCase()}`;
}

function readStoredValue(key, fallback) {
  try {
    return window.localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

function readPerUserPrivacy(email, fallback) {
  const userKey = String(email || 'default').trim().toLowerCase();
  try {
    const raw = window.localStorage.getItem(PRIVACY_PER_USER_KEY);
    if (raw) {
      const map = JSON.parse(raw);
      if (map && typeof map === 'object' && typeof map[userKey] === 'string') {
        return map[userKey];
      }
    }
  } catch {}
  return fallback;
}

function writePerUserPrivacy(email, value) {
  const userKey = String(email || 'default').trim().toLowerCase();
  try {
    const raw = window.localStorage.getItem(PRIVACY_PER_USER_KEY);
    const map = raw ? JSON.parse(raw) || {} : {};
    map[userKey] = value;
    window.localStorage.setItem(PRIVACY_PER_USER_KEY, JSON.stringify(map));
  } catch {}
}

function SettingsSection({ activeSection, darkMode, setDarkMode, userEmail, onLogout, onFacePhotoChange }) {
  const [facePhoto, setFacePhoto] = useState(() => readStoredValue(facePhotoStorageKey(userEmail), ''));
  const [language, setLanguage] = useState(() => readStoredValue(LANGUAGE_KEY, 'en'));
  const [privacy, setPrivacy] = useState(() => {
    const perUser = readPerUserPrivacy(userEmail, null);
    return perUser || readStoredValue(PRIVACY_KEY, 'public');
  });
  const [themeMode, setThemeMode] = useState(() => {
    const savedMode = readStoredValue(THEME_MODE_KEY, '');
    return ['system', 'light', 'dark'].includes(savedMode) ? savedMode : darkMode ? 'dark' : 'light';
  });
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [helpOpen, setHelpOpen] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const isOpen = activeSection === 'settings';

  useEffect(() => {
    const savedPhoto = readStoredValue(facePhotoStorageKey(userEmail), '');
    setFacePhoto(savedPhoto);
    onFacePhotoChange?.(savedPhoto);
  }, [userEmail, onFacePhotoChange]);

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setIsCameraOpen(false);
  };

  const closeDrawer = () => {
    stopCamera();
    setCameraError('');
    window.dispatchEvent(new CustomEvent('aifashion-settings-close'));
  };

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeDrawer();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isCameraOpen && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(() => {});
    }
  }, [isCameraOpen]);

  const saveFacePhoto = (dataUrl) => {
    if (!dataUrl) return;
    setFacePhoto(dataUrl);
    onFacePhotoChange?.(dataUrl);
    try {
      window.localStorage.setItem(facePhotoStorageKey(userEmail), dataUrl);
    } catch {
      setCameraError('This photo is too large to save in browser storage. Choose a smaller image.');
    }
    stopCamera();
    setCameraError('');
  };

  const openCamera = async () => {
    setCameraError('');
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError('Camera access is not available. Upload a face photo instead.');
      return;
    }
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });
      setIsCameraOpen(true);
    } catch (error) {
      setCameraError(error?.name === 'NotAllowedError'
        ? 'Camera permission was blocked. Allow it in browser settings or upload a photo.'
        : error?.name === 'NotFoundError'
          ? 'No camera was found. Upload a photo instead.'
          : `Camera could not be opened: ${error?.message || 'unknown error'}`);
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video?.videoWidth) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
    saveFacePhoto(canvas.toDataURL('image/jpeg', 0.86));
  };

  const choosePhoto = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setCameraError('Choose an image file for the face scan.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') saveFacePhoto(reader.result);
    };
    reader.onerror = () => setCameraError('Could not read this image. Choose another photo.');
    reader.readAsDataURL(file);
  };

  const removeFacePhoto = () => {
    setFacePhoto('');
    onFacePhotoChange?.('');
    try { window.localStorage.removeItem(facePhotoStorageKey(userEmail)); } catch {}
  };

  const updateLanguage = (value) => {
    setLanguage(value);
    try { window.localStorage.setItem(LANGUAGE_KEY, value); } catch {}
    document.documentElement.lang = value;
  };

  const updateThemeMode = (value) => {
    setThemeMode(value);
    try { window.localStorage.setItem(THEME_MODE_KEY, value); } catch {}
    setDarkMode(value === 'dark' || (value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches));
  };

  useEffect(() => {
    if (themeMode !== 'system') return undefined;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const syncSystemTheme = () => setDarkMode(media.matches);
    syncSystemTheme();
    media.addEventListener?.('change', syncSystemTheme);
    return () => media.removeEventListener?.('change', syncSystemTheme);
  }, [themeMode, setDarkMode]);

  const [pendingPrivacy, setPendingPrivacy] = useState(null);

  const commitPrivacy = (value) => {
    setPrivacy(value);
    try { window.localStorage.setItem(PRIVACY_KEY, value); } catch {}
    writePerUserPrivacy(userEmail, value);
    persistUserAccountPrivacy(userEmail, value).catch((error) => {
      console.warn('Could not sync account privacy:', error?.message || error);
    });
    try { window.dispatchEvent(new Event('aifashion-privacy-updated')); } catch {}
  };

  const requestPrivacy = (value) => {
    if (value === privacy) return;
    setPendingPrivacy(value);
  };

  const cancelPendingPrivacy = () => setPendingPrivacy(null);

  const confirmPendingPrivacy = () => {
    if (!pendingPrivacy) return;
    commitPrivacy(pendingPrivacy);
    setPendingPrivacy(null);
  };

  const updatePrivacy = (value) => {
    requestPrivacy(value);
  };

  if (!isOpen) return null;

  return (
    <div className="settings-drawer-layer">
      <button type="button" className="settings-drawer-backdrop" onClick={closeDrawer} aria-label="Close settings drawer" />
      <aside className="settings-drawer" role="dialog" aria-modal="true" aria-labelledby="settings-drawer-title">
        <header className="settings-drawer-header">
          <div className="settings-drawer-brand"><span>AI</span><div><h2 id="settings-drawer-title">More</h2><p>Account and app preferences</p></div></div>
          <button type="button" className="settings-drawer-close" onClick={closeDrawer} aria-label="Close settings"><X size={19} /></button>
        </header>

        <button type="button" className="settings-account-switch" onClick={onLogout}>
          <span className="settings-account-icon"><SwitchCamera size={18} /></span>
          <span><strong>Switch account</strong><small>{userEmail || 'Current account'}</small></span>
          <ChevronDown size={16} className="settings-account-chevron" />
        </button>

        <div className="settings-drawer-content">
          <section className="settings-group settings-appearance-group">
            <div className="settings-category-label">Appearance</div>
            <div className="settings-theme-row">
              <div className="settings-row-copy"><span className="settings-setting-icon">{themeMode === 'system' ? <Monitor size={17} /> : darkMode ? <Moon size={17} /> : <Sun size={17} />}</span><span><strong>Theme</strong><small>Choose how the app looks</small></span></div>
              <div className="settings-theme-segment" role="group" aria-label="Theme preference">
                <button type="button" className={themeMode === 'system' ? 'is-selected' : ''} onClick={() => updateThemeMode('system')} aria-label="Use system theme" aria-pressed={themeMode === 'system'}><Monitor size={15} /><span className="sr-only">System</span></button>
                <button type="button" className={themeMode === 'dark' ? 'is-selected' : ''} onClick={() => updateThemeMode('dark')} aria-label="Use dark theme" aria-pressed={themeMode === 'dark'}><Moon size={15} /><span className="sr-only">Dark</span></button>
                <button type="button" className={themeMode === 'light' ? 'is-selected' : ''} onClick={() => updateThemeMode('light')} aria-label="Use light theme" aria-pressed={themeMode === 'light'}><Sun size={15} /><span className="sr-only">Light</span></button>
              </div>
            </div>
          </section>

          <section className="settings-group settings-face-group">
            <div className="settings-category-label">Tools</div>
            <div className="settings-group-heading"><UserRound size={17} /><h3>AI face scan</h3></div>
            <p className="settings-helper-copy">Save a face photo on this device. AI Scan will use it automatically when you open that section.</p>
            {isCameraOpen ? (
              <div className="settings-face-preview is-live"><video ref={videoRef} playsInline muted autoPlay aria-label="Live face camera preview" /><div className="settings-face-reticle" /></div>
            ) : facePhoto ? (
              <img className="settings-face-preview" src={facePhoto} alt="Saved face for AI scan" />
            ) : (
              <div className="settings-face-empty"><Camera size={24} /><span>No face photo saved</span></div>
            )}
            <div className="settings-face-actions">
              {isCameraOpen ? <button type="button" className="settings-action-primary" onClick={capturePhoto}><Camera size={15} />Capture photo</button> : <button type="button" className="settings-action-primary" onClick={openCamera}><Camera size={15} />Use camera</button>}
              <button type="button" className="settings-action-secondary" onClick={() => fileInputRef.current?.click()}><Upload size={15} />Upload photo</button>
              {facePhoto && !isCameraOpen && <button type="button" className="settings-photo-remove" onClick={removeFacePhoto}>Remove</button>}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={choosePhoto} hidden />
            </div>
            {cameraError && <p className="settings-inline-error" role="alert">{cameraError}</p>}
          </section>

          <div className="settings-category-label settings-other-label">Other</div>
          <section className="settings-group">
            <div className="settings-group-heading"><Globe2 size={17} /><h3>Language</h3></div>
            <label className="settings-language-select">
              <span className="sr-only">App language</span>
              <select value={language} onChange={(event) => updateLanguage(event.target.value)}>
                <option value="en">English</option>
                <option value="ur">اردو</option>
              </select>
              <ChevronDown size={15} />
            </label>
            <p className="settings-helper-copy">Language preference is saved on this device.</p>
          </section>

          <section className="settings-group">
            <div className="settings-group-heading"><Shield size={17} /><h3>Profile visibility</h3></div>
            <div className="settings-privacy-options" role="group" aria-label="Profile visibility">
              <button type="button" className={privacy === 'public' ? 'is-selected' : ''} onClick={() => updatePrivacy('public')}><span className="privacy-indicator" />Public</button>
              <button type="button" className={privacy === 'private' ? 'is-selected' : ''} onClick={() => updatePrivacy('private')}><span className="privacy-indicator" />Private</button>
            </div>
            <p className="settings-helper-copy">Private accounts hide every post from other users until you switch back to Public.</p>
          </section>

          <button type="button" className="settings-help-link" onClick={() => setHelpOpen((open) => !open)} aria-expanded={helpOpen}>
            <HelpCircle size={17} /><span>Help Center</span><ChevronDown size={15} className={helpOpen ? 'is-open' : ''} />
          </button>
          {helpOpen && <div className="settings-help-panel"><strong>Quick help</strong><ul><li>Allow camera access in your browser to capture a face photo.</li><li>Saved face photos stay in this browser under the current account.</li><li>Use Switch account to leave this account before signing in with another one.</li></ul></div>}
        </div>

        <footer className="settings-drawer-footer">
          <button type="button" className="settings-logout-button" onClick={onLogout}><LogOut size={17} />Logout</button>
        </footer>
      </aside>

      {pendingPrivacy && (
        <div className="ll-overlay" onClick={cancelPendingPrivacy} role="dialog" aria-modal="true" aria-labelledby="privacy-confirm-title">
          <div className="ll-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 420 }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%', margin: '0 auto 18px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: pendingPrivacy === 'private'
                ? 'linear-gradient(135deg, rgba(255,106,95,0.18), rgba(127,88,255,0.14))'
                : 'linear-gradient(135deg, rgba(34,197,94,0.18), rgba(94,92,230,0.14))',
              color: pendingPrivacy === 'private' ? '#ff5252' : '#22c55e',
              border: `1px solid ${pendingPrivacy === 'private' ? 'rgba(255,106,95,0.3)' : 'rgba(34,197,94,0.3)'}`,
            }}>
              {pendingPrivacy === 'private' ? <Lock size={28} /> : <Globe2 size={28} />}
            </div>
            <h3 id="privacy-confirm-title" className="ll-title" style={{ fontSize: '1.35rem', marginBottom: 10 }}>
              {pendingPrivacy === 'private' ? 'Make profile Private?' : 'Make profile Public?'}
            </h3>
            <p className="ll-subtitle" style={{ marginBottom: 22, lineHeight: 1.6 }}>
              {pendingPrivacy === 'private'
                ? <>
                    <strong style={{ color: 'var(--text, #111827)' }}>Are you sure</strong> you want to switch to a <strong>Private</strong> account?
                    <br /><br />
                    <span style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 6, marginTop: 4 }}>
                      <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: 2, color: '#ff8a00' }} />
                      <span>Your existing posts and any new uploads will be hidden from other users on the Home and Search sections. Only you will be able to see your designs in your profile under the <strong>Private</strong> tab.</span>
                    </span>
                  </>
                : <>
                    <strong style={{ color: 'var(--text, #111827)' }}>Are you sure</strong> you want to switch to a <strong>Public</strong> account?
                    <br /><br />
                    Your designs and any new posts will become visible to everyone on the Home and Search sections. Other users will be able to like, share, and explore your public fashion collection.
                  </>}
            </p>
            <div className="ll-actions">
              <button type="button" className="ll-btn-secondary" onClick={cancelPendingPrivacy}>Cancel</button>
              <button
                type="button"
                className="ll-btn-primary"
                onClick={confirmPendingPrivacy}
                style={{
                  background: pendingPrivacy === 'private'
                    ? 'linear-gradient(135deg, #ff5b5b, #ff7a90)'
                    : 'linear-gradient(135deg, #7f58ff, #a66dff)',
                  boxShadow: pendingPrivacy === 'private'
                    ? '0 8px 20px rgba(255,91,91,0.3)'
                    : '0 8px 20px rgba(127, 88, 255, 0.3)',
                }}
              >
                Yes, make it {pendingPrivacy === 'private' ? 'Private' : 'Public'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsSection;

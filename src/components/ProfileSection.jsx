import React, { useState, useRef, useEffect } from 'react';
import {
  Camera, Share2, Settings, QrCode, Copy, Check, Grid, Heart, User, AtSign, Clock, AlertCircle, X
} from 'lucide-react';

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function getRemainingTime(targetMs) {
  const now = Date.now();
  const diff = targetMs - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  return { days, hours, minutes };
}

function getProfileStats(email) {
  if (!email) return { posts: 0, followers: 0, following: 0, postImages: [] };
  const all = JSON.parse(window.localStorage.getItem('aifashionProfileStats') || '{}');
  return all[email] || { posts: 0, followers: 0, following: 0, postImages: [] };
}

function formatStatCount(value) {
  return Number(value || 0).toLocaleString();
}

function ProfileSection({
  activeSection,
  savedProfile,
  handleProfileSave,
  userName,
  setUserName,
  userEmail,
  userPhoto,
  setUserPhoto,
  userHandle,
  setUserHandle,
  userBio,
  setUserBio,
}) {
  const [isHoveringPhoto, setIsHoveringPhoto] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState('');
  const [draftHandle, setDraftHandle] = useState('');
  const [draftBio, setDraftBio] = useState('');
  const [profileStats, setProfileStats] = useState({ posts: 0, followers: 0, following: 0, postImages: [] });
  const [toastList, setToastList] = useState([]);
  const fileInputRef = useRef(null);
  const toastIdRef = useRef(0);

  const [nameEditInfo, setNameEditInfo] = useState(() => {
    const data = window.localStorage.getItem('aifashion_nameEditInfo');
    return data ? JSON.parse(data) : { lastEditAt: null, lastValue: '' };
  });

  const [, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTick(t => t + 1), 60000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    setProfileStats(getProfileStats(userEmail || savedProfile?.email));
  }, [userEmail, savedProfile?.email, activeSection]);

  const nameCoolEnd = nameEditInfo.lastEditAt ? nameEditInfo.lastEditAt + SEVEN_DAYS_MS : null;
  const nameCd = nameCoolEnd ? getRemainingTime(nameCoolEnd) : null;
  const isNameLocked = !!nameCd;

  const openEditModal = () => {
    setDraftName(userName || savedProfile?.name || '');
    setDraftHandle(userHandle || savedProfile?.handle || '');
    setDraftBio(userBio || savedProfile?.bio || '');
    setIsEditing(true);
  };

  const showToast = (message, type = 'success') => {
    const id = ++toastIdRef.current;
    setToastList(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToastList(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = () => {
    const name = savedProfile?.name || userName;
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return 'AF';
  };

  const onLocalSave = (e) => {
    e.preventDefault();

    if (!draftName.trim()) {
      showToast('Name is required to update your profile.', 'error');
      return;
    }
    if (!draftHandle.trim()) {
      showToast('Username is required to update your profile.', 'error');
      return;
    }

    const prevName = savedProfile?.name || userName || '';
    if (isNameLocked && draftName.trim() !== prevName) {
      showToast(`Name can be changed again in ${nameCd.days}d ${nameCd.hours}h.`, 'error');
      return;
    }

    if (draftName.trim() !== prevName) {
      const newInfo = { lastEditAt: Date.now(), lastValue: draftName.trim() };
      setNameEditInfo(newInfo);
      window.localStorage.setItem('aifashion_nameEditInfo', JSON.stringify(newInfo));
    }

    setUserName(draftName.trim());
    setUserHandle(draftHandle.trim());
    setUserBio(draftBio.trim());

    const result = handleProfileSave({
      name: draftName.trim(),
      handle: draftHandle.trim(),
      bio: draftBio.trim(),
    });

    if (result?.success) {
      showToast(result.message, 'success');
      setIsEditing(false);
    } else {
      showToast(result?.message || 'Profile update failed. Please try again.', 'error');
    }
  };

  const displayBio = (userBio || savedProfile?.bio || '').trim();
  const postImages = profileStats.postImages || [];

  return (
    <section id="profile" className={`section profile-section ${activeSection === 'profile' ? 'active' : 'hidden'}`}>
      <div className="social-profile-container">
        <div className="social-top-bar">
          <div style={{ width: 44 }} />

          <div className="top-bar-right">
            <button className="social-icon-btn" title="Share Profile" onClick={() => setShowShareModal(true)}>
              <Share2 size={22} />
            </button>
            <button className="social-icon-btn" title="Profile Settings" onClick={openEditModal}>
              <Settings size={22} />
            </button>
          </div>
        </div>

        <div className="social-profile-header">
          <div
            className="social-profile-photo-wrapper"
            onMouseEnter={() => setIsHoveringPhoto(true)}
            onMouseLeave={() => setIsHoveringPhoto(false)}
            onClick={() => fileInputRef.current?.click()}
          >
            {userPhoto ? (
              <img src={userPhoto} alt="Profile" className="social-profile-photo" />
            ) : (
              <div className="social-profile-placeholder">
                <span className="profile-initials">{getInitials()}</span>
              </div>
            )}
            <div className={`social-profile-photo-overlay ${isHoveringPhoto ? 'visible' : ''}`}>
              <Camera size={24} color="#fff" />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden-file-input"
            />
          </div>

          <div className="social-name-row">
            <h2 className="social-display-name">
              {savedProfile?.name || userName || 'Fashion Creator'}
            </h2>
          </div>

          <span className="social-username">{userHandle}</span>

          <div className="social-stats-row">
            <div className="social-stat-item">
              <span className="stat-num">{formatStatCount(profileStats.posts)}</span>
              <span className="stat-label">Posts</span>
            </div>
            <div className="social-stat-item">
              <span className="stat-num">{formatStatCount(profileStats.followers)}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="social-stat-item">
              <span className="stat-num">{formatStatCount(profileStats.following)}</span>
              <span className="stat-label">Following</span>
            </div>
          </div>

          {displayBio && (
            <div className="social-bio">
              <p>{displayBio}</p>
            </div>
          )}
        </div>

        <div className="social-posts-container">
          <div className="social-posts-tabs">
            <button className="social-tab active"><Grid size={20} /></button>
            <button className="social-tab"><Heart size={20} /></button>
          </div>

          {postImages.length > 0 ? (
            <div className="social-posts-grid">
              {postImages.map((src, index) => (
                <div key={index} className="social-post-item">
                  <img src={src} alt={`Post ${index + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          ) : (
            <div className="social-posts-empty">
              <Grid size={28} />
              <p>No posts yet</p>
              <span>Your designs will appear here once you publish them.</span>
            </div>
          )}
        </div>
      </div>

      <div className="profile-toast-container" aria-live="polite">
        {toastList.map((toast) => (
          <div key={toast.id} className={`profile-toast ${toast.type}`}>
            {toast.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="modal-overlay liquid-glass-overlay" onClick={() => setIsEditing(false)}>
          <div className="modal-scroll-wrap profile-edit-modal-wrap">
            <div className="profile-form-modal profile-form-card-advanced animate-scale-in" onClick={e => e.stopPropagation()}>
              <div className="form-card-header">
                <div className="form-card-title-row">
                  <div className="form-card-icon-wrap"><Settings size={20} /></div>
                  <div style={{ flex: 1 }}>
                    <h3 className="form-card-title">Edit Profile</h3>
                    <p className="form-card-subtitle">Update your name, username and bio</p>
                  </div>
                  <button type="button" className="modal-close-x-btn" onClick={() => setIsEditing(false)} aria-label="Close">
                    <X size={18} />
                  </button>
                </div>
              </div>

              <form onSubmit={onLocalSave} className="profile-form-advanced">
                <div className="form-group">
                  <label className="form-label"><User size={14} /> Full Name</label>
                  {isNameLocked ? (
                    <div className="form-input-wrap locked-input">
                      <input value={draftName} readOnly className="form-input" style={{ opacity: 0.7, cursor: 'not-allowed' }} />
                      <div className="lock-badge" title="Changed recently. Can edit again after 7-day cooldown.">
                        <Clock size={12} />
                        <span>{nameCd.days}d {nameCd.hours}h</span>
                      </div>
                    </div>
                  ) : (
                    <div className="form-input-wrap">
                      <input value={draftName} onChange={(e) => setDraftName(e.target.value)} placeholder="Enter your full name" className="form-input" />
                    </div>
                  )}
                  {isNameLocked && (
                    <p className="cooldown-note">
                      <AlertCircle size={12} />
                      Recently changed. Next edit available in <strong>{nameCd.days}d {nameCd.hours}h {nameCd.minutes}m</strong>.
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label"><AtSign size={14} /> Username</label>
                  <div className="form-input-wrap">
                    <input value={draftHandle} onChange={(e) => setDraftHandle(e.target.value)} placeholder="@your_handle" className="form-input" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label"><User size={14} /> Bio</label>
                  <div className="form-input-wrap">
                    <textarea
                      value={draftBio}
                      onChange={(e) => setDraftBio(e.target.value)}
                      placeholder="Write a short bio..."
                      className="form-input profile-bio-input"
                      rows={4}
                    />
                  </div>
                </div>

                <div className="form-actions modal-actions-center">
                  <button type="button" className="cancel-profile-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                  <button type="submit" className="save-profile-btn"><Check size={16} /> Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showShareModal && (
        <div className="share-modal-overlay animate-fade-in" onClick={() => setShowShareModal(false)}>
          <div className="share-modal-content animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="share-modal-header">
              <div className="share-modal-pic-wrap">
                {userPhoto ? (
                  <img src={userPhoto} alt="Profile" className="share-modal-pic" />
                ) : (
                  <div className="share-modal-pic-placeholder">{getInitials()}</div>
                )}
              </div>
              <h3 className="share-modal-name">{savedProfile?.name || userName || 'Fashion Creator'}</h3>
              <p className="share-modal-username">{userHandle}</p>
            </div>

            <div className="share-modal-qr-wrapper">
              <QrCode size={180} strokeWidth={1} color="var(--primary)" />
              <div className="qr-scan-text">Scan to view profile</div>
            </div>

            <div className="share-modal-actions">
              <button
                className="social-btn-secondary"
                onClick={() => {
                  navigator.clipboard.writeText(`https://aifashion.com/${userHandle.replace('@', '')}`);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                {copied ? <Check size={18}/> : <Copy size={18} />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
              <button className="social-btn-primary">
                <Share2 size={18} /> Share Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProfileSection;

import React, { useState, useRef, useEffect } from 'react';
import {
  Camera, Share2, Settings, QrCode, Copy, Check, Grid, Heart, User, AtSign, Clock, AlertCircle, X, ArrowLeft, MoreVertical, LogOut, Star, Eye
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
  const all = JSON.parse(window.localStorage.getItem('aifashionProfileStats') || '{}');
  const userKey = email || 'default';
  const userStats = all[userKey] || { posts: 0, followers: 0, following: 0, postImages: [] };
  
  if (userKey !== 'default' && all['default']) {
    return {
      ...userStats,
      postImages: [...(all['default'].postImages || []), ...(userStats.postImages || [])]
    };
  }
  return userStats;
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
  handleSectionClick,
  handleProductClick,
}) {
  const [isHoveringPhoto, setIsHoveringPhoto] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('mystyle');
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
        <div className="social-top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', position: 'relative' }}>
          <button className="social-icon-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)' }}>
            <ArrowLeft size={22} />
          </button>
          
          <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: 'var(--text)' }}>FashionAI</h2>

          <div style={{ position: 'relative' }}>
            <button className="social-icon-btn" onClick={() => setShowDropdown(!showDropdown)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)' }}>
              <MoreVertical size={22} />
            </button>
            {showDropdown && (
              <div className="profile-dropdown-menu" style={{ position: 'absolute', right: 0, top: '100%', background: 'var(--card-bg)', borderRadius: '12px', padding: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', zIndex: 10, minWidth: '160px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <button className="dropdown-item" onClick={() => { setShowShareModal(true); setShowDropdown(false); }} style={{ display: 'flex', alignItems: 'center', padding: '10px 12px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', color: 'var(--text)', borderRadius: '6px' }}>
                  <Share2 size={16} style={{marginRight: '12px'}} /> Share Profile
                </button>
                <button className="dropdown-item" onClick={() => { openEditModal(); setShowDropdown(false); }} style={{ display: 'flex', alignItems: 'center', padding: '10px 12px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', color: 'var(--text)', borderRadius: '6px' }}>
                  <Settings size={16} style={{marginRight: '12px'}} /> Settings
                </button>
                <button className="dropdown-item" onClick={() => setShowDropdown(false)} style={{ display: 'flex', alignItems: 'center', padding: '10px 12px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', color: '#ff453a', borderRadius: '6px' }}>
                  <LogOut size={16} style={{marginRight: '12px'}} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="social-profile-header-redesign" style={{ padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <div
              className="social-profile-photo-wrapper"
              style={{ width: '85px', height: '85px', flexShrink: 0, marginRight: '20px', borderRadius: '50%', border: '3px solid #5E5CE6', overflow: 'hidden', position: 'relative', cursor: 'pointer', padding: '3px', background: 'var(--card-bg)' }}
              onMouseEnter={() => setIsHoveringPhoto(true)}
              onMouseLeave={() => setIsHoveringPhoto(false)}
              onClick={() => fileInputRef.current?.click()}
            >
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', position: 'relative' }}>
                {userPhoto ? (
                  <img src={userPhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'var(--border)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text-secondary)' }}>{getInitials()}</span>
                  </div>
                )}
                <div className={`social-profile-photo-overlay ${isHoveringPhoto ? 'visible' : ''}`} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: isHoveringPhoto ? 1 : 0, transition: 'opacity 0.2s' }}>
                  <Camera size={24} color="#fff" />
                </div>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, color: 'var(--text)' }}>{savedProfile?.name || userName || 'Fashion Creator'}</h2>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" fill="#5E5CE6"/>
                  <path d="M8 12.5L11 15.5L16 9.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '16px' }}>
                <Star size={14} fill="#FF9F0A" color="#FF9F0A" strokeWidth={0} /> Premium Member
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingRight: '10px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'var(--text)' }}>{formatStatCount(profileStats.posts)}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>Posts</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'var(--text)' }}>{formatStatCount(profileStats.followers)}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>Followers</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'var(--text)' }}>{formatStatCount(profileStats.following)}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>Following</div>
                </div>
              </div>
            </div>
          </div>
          
          {displayBio && (
            <div className="social-bio" style={{ fontSize: '14px', marginBottom: '20px', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
              <p>{displayBio}</p>
            </div>
          )}
          
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', marginTop: displayBio ? 0 : '16px' }}>
             <button style={{ flex: 1, padding: '10px 0', borderRadius: '12px', border: '1px solid #5E5CE6', color: '#5E5CE6', background: 'transparent', fontWeight: '600', cursor: 'pointer' }} onClick={openEditModal}>Edit Profile</button>
             <button style={{ flex: 1, padding: '10px 0', borderRadius: '12px', background: '#5E5CE6', color: '#fff', border: 'none', fontWeight: '600', cursor: 'pointer' }} onClick={() => setShowShareModal(true)}>Share Profile</button>
          </div>
        </div>

        <div className="social-posts-container" style={{ padding: '0 20px' }}>
          <div className="social-tabs-container" style={{ display: 'flex', position: 'relative', borderBottom: '1px solid var(--border)', marginBottom: '20px' }}>
            <button onClick={() => setActiveTab('mystyle')} style={{ flex: 1, padding: '12px 0', background: 'none', border: 'none', fontWeight: activeTab === 'mystyle' ? 'bold' : '500', color: activeTab === 'mystyle' ? '#5E5CE6' : 'var(--text)', cursor: 'pointer', transition: 'color 0.3s ease' }}>My Style</button>
            <button onClick={() => setActiveTab('saved')} style={{ flex: 1, padding: '12px 0', background: 'none', border: 'none', fontWeight: activeTab === 'saved' ? 'bold' : '500', color: activeTab === 'saved' ? '#5E5CE6' : 'var(--text)', cursor: 'pointer', transition: 'color 0.3s ease' }}>Saved</button>
            <button onClick={() => setActiveTab('liked')} style={{ flex: 1, padding: '12px 0', background: 'none', border: 'none', fontWeight: activeTab === 'liked' ? 'bold' : '500', color: activeTab === 'liked' ? '#5E5CE6' : 'var(--text)', cursor: 'pointer', transition: 'color 0.3s ease' }}>Liked</button>
            
            <div style={{ 
              position: 'absolute', 
              bottom: 0, 
              left: activeTab === 'mystyle' ? '0%' : activeTab === 'saved' ? '33.33%' : '66.66%', 
              width: '33.33%', 
              height: '3px', 
              background: '#5E5CE6', 
              transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              borderRadius: '3px 3px 0 0'
            }} />
          </div>

          {postImages.length > 0 ? (
            <div className="social-posts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {postImages.map((post, index) => {
                const src = typeof post === 'string' ? post : post.url;
                return (
                  <div 
                    key={index} 
                    className="social-post-item" 
                    onClick={() => handleProductClick && handleProductClick(post)}
                    style={{ 
                      cursor: 'pointer', 
                      position: 'relative', 
                      aspectRatio: '4/6 ', 
                      borderRadius: '12px', 
                      overflow: 'hidden',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <img 
                      src={src} 
                      alt={`Post ${index + 1}`} 
                      loading="lazy" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                    />
                    <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(0,0,0,0.6)', padding: '4px 10px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '6px', color: '#fff', fontSize: '12px', backdropFilter: 'blur(4px)' }}>
                      <Eye size={14} />
                      <span style={{ fontWeight: '500' }}>{typeof post === 'object' ? (post.views || 0) : 0}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="social-posts-empty" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px dashed var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Grid size={32} color="var(--text-secondary)" />
              </div>
              <p style={{ fontWeight: '600', fontSize: '18px', marginBottom: '8px', color: 'var(--text)' }}>No posts yet</p>
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px', maxWidth: '250px' }}>Your designs will appear here once you publish them.</span>
              <button 
                onClick={(e) => handleSectionClick(e, 'uploaded-images')}
                style={{ padding: '12px 32px', borderRadius: '24px', background: 'var(--card-bg)', color: 'var(--text)', border: '1px solid var(--border)', fontWeight: '600', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
              >
                Create Post
              </button>
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

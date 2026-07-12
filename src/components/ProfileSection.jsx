import React, { useState, useRef } from 'react';
import {
  Camera,
  Crown,
  Sparkles,
  Palette,
  Zap,
  Mail,
  Phone,
  Calendar,
  User,
  AtSign,
  Shield,
  Edit3,
  Check,
  Star,
  TrendingUp,
  Award,
} from 'lucide-react';

function ProfileSection({
  activeSection,
  savedProfile,
  handleProfileSave,
  userName,
  setUserName,
  userEmail,
  setUserEmail,
  userPhone,
  setUserPhone,
  profileMessage,
}) {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isHoveringPhoto, setIsHoveringPhoto] = useState(false);
  const [subscriptionPlan] = useState('Pro');
  const [totalDesigns] = useState(47);
  const [aiCreditsLeft] = useState(820);
  const [aiCreditsTotal] = useState(1000);
  const [memberSince] = useState('Jan 2025');
  const [displayUsername] = useState('@fashionista_ai');
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const creditsPercentage = (aiCreditsLeft / aiCreditsTotal) * 100;

  const getInitials = () => {
    if (savedProfile?.name) {
      return savedProfile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    if (userName) {
      return userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return 'AF';
  };

  return (
    <section id="profile" className={`section profile-section ${activeSection === 'profile' ? 'active' : 'hidden'}`}>
      <div className="profile-grid-advanced">
        {/* ─── LEFT: Profile Card ─── */}
        <div className="profile-card-left">
          {/* Decorative background gradient */}
          <div className="profile-card-banner">
            <div className="banner-pattern"></div>
            <div className="banner-glow"></div>
          </div>

          {/* Profile Photo */}
          <div className="profile-photo-section">
            <div
              className="profile-photo-wrapper"
              onMouseEnter={() => setIsHoveringPhoto(true)}
              onMouseLeave={() => setIsHoveringPhoto(false)}
              onClick={() => fileInputRef.current?.click()}
            >
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" className="profile-photo-img" />
              ) : (
                <div className="profile-photo-placeholder">
                  <span className="profile-initials">{getInitials()}</span>
                </div>
              )}
              <div className={`profile-photo-overlay ${isHoveringPhoto ? 'visible' : ''}`}>
                <Camera size={20} />
                <span>Change</span>
              </div>
              <div className="profile-photo-ring"></div>
              {subscriptionPlan === 'Pro' && (
                <div className="profile-badge-pro">
                  <Crown size={12} />
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden-file-input"
            />
            <button className="upload-photo-btn" onClick={() => fileInputRef.current?.click()}>
              <Camera size={14} />
              Upload Photo
            </button>
          </div>

          {/* User Identity */}
          <div className="profile-identity">
            <h2 className="profile-display-name">
              {savedProfile?.name || userName || 'Fashion Creator'}
            </h2>
            <span className="profile-username">{displayUsername}</span>
          </div>

          {/* Subscription Badge */}
          <div className={`subscription-badge ${subscriptionPlan.toLowerCase()}`}>
            {subscriptionPlan === 'Pro' ? <Crown size={15} /> : <Star size={15} />}
            <span>{subscriptionPlan} Plan</span>
            {subscriptionPlan === 'Pro' && <span className="badge-glow-dot"></span>}
          </div>

          {/* Info Items */}
          <div className="profile-info-list">
            <div className="profile-info-item">
              <div className="info-icon-wrap">
                <Mail size={16} />
              </div>
              <div className="info-content">
                <span className="info-label">Email</span>
                <span className="info-value">{savedProfile?.email || userEmail || 'Not set'}</span>
              </div>
            </div>

            <div className="profile-info-item">
              <div className="info-icon-wrap">
                <Phone size={16} />
              </div>
              <div className="info-content">
                <span className="info-label">Phone</span>
                <span className="info-value">{savedProfile?.phone || userPhone || 'Not set'}</span>
              </div>
            </div>

            <div className="profile-info-item">
              <div className="info-icon-wrap">
                <Calendar size={16} />
              </div>
              <div className="info-content">
                <span className="info-label">Member Since</span>
                <span className="info-value">{memberSince}</span>
              </div>
            </div>

            <div className="profile-info-item">
              <div className="info-icon-wrap">
                <AtSign size={16} />
              </div>
              <div className="info-content">
                <span className="info-label">Username</span>
                <span className="info-value">{displayUsername}</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="profile-divider"></div>

          {/* Stats Cards */}
          <div className="profile-stats-row">
            <div className="profile-stat-card">
              <div className="stat-card-icon designs">
                <Palette size={18} />
              </div>
              <div className="stat-card-info">
                <span className="stat-card-number">{totalDesigns}</span>
                <span className="stat-card-label">Designs</span>
              </div>
            </div>

            <div className="profile-stat-card">
              <div className="stat-card-icon credits">
                <Zap size={18} />
              </div>
              <div className="stat-card-info">
                <span className="stat-card-number">{aiCreditsLeft}</span>
                <span className="stat-card-label">AI Credits</span>
              </div>
            </div>
          </div>

          {/* AI Credits Progress */}
          <div className="credits-progress-section">
            <div className="credits-progress-header">
              <div className="credits-progress-label">
                <Sparkles size={14} />
                <span>AI Credits Usage</span>
              </div>
              <span className="credits-progress-count">{aiCreditsLeft} / {aiCreditsTotal}</span>
            </div>
            <div className="credits-progress-bar">
              <div
                className="credits-progress-fill"
                style={{ width: `${creditsPercentage}%` }}
              >
                <div className="credits-progress-glow"></div>
              </div>
            </div>
            <p className="credits-progress-hint">
              {creditsPercentage > 50
                ? '✨ Great balance! Keep creating amazing designs.'
                : '⚡ Running low — consider upgrading your plan.'}
            </p>
          </div>

          {/* Achievement Badges */}
          <div className="profile-achievements">
            <h4 className="achievements-title">Achievements</h4>
            <div className="achievements-row">
              <div className="achievement-badge" title="Early Adopter">
                <Award size={16} />
              </div>
              <div className="achievement-badge" title="50 Designs">
                <Palette size={16} />
              </div>
              <div className="achievement-badge" title="Trending Creator">
                <TrendingUp size={16} />
              </div>
              <div className="achievement-badge" title="AI Master">
                <Sparkles size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* ─── RIGHT: Edit Profile Form ─── */}
        <div className="profile-form-card-advanced">
          <div className="form-card-header">
            <div className="form-card-title-row">
              <div className="form-card-icon-wrap">
                <Edit3 size={20} />
              </div>
              <div>
                <h3 className="form-card-title">Edit Profile</h3>
                <p className="form-card-subtitle">Update your personal information</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleProfileSave} className="profile-form-advanced">
            <div className="form-group">
              <label className="form-label">
                <User size={14} />
                Full Name
              </label>
              <div className="form-input-wrap">
                <input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your full name"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <Mail size={14} />
                Email Address
              </label>
              <div className="form-input-wrap">
                <input
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="you@example.com"
                  type="email"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <Phone size={14} />
                Phone Number
              </label>
              <div className="form-input-wrap">
                <input
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="+92 300 1234567"
                  type="tel"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <AtSign size={14} />
                Username
              </label>
              <div className="form-input-wrap">
                <input
                  value={displayUsername}
                  disabled
                  className="form-input disabled"
                />
                <span className="form-input-hint">Username cannot be changed</span>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="save-profile-btn">
                <Check size={16} />
                Save Changes
              </button>
            </div>

            {profileMessage && (
              <div className={`profile-toast ${profileMessage.includes('success') ? 'success' : 'warning'}`}>
                <div className="toast-icon">
                  {profileMessage.includes('success') ? <Check size={16} /> : <Shield size={16} />}
                </div>
                <p>{profileMessage}</p>
              </div>
            )}
          </form>

          {/* Account Info Card */}
          <div className="account-info-card">
            <div className="account-info-header">
              <Shield size={18} />
              <h4>Account Security</h4>
            </div>
            <div className="account-info-items">
              <div className="account-info-row">
                <span className="account-info-label">Two-Factor Auth</span>
                <span className="account-info-status enabled">Enabled</span>
              </div>
              <div className="account-info-row">
                <span className="account-info-label">Last Login</span>
                <span className="account-info-value">Today, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="account-info-row">
                <span className="account-info-label">Password</span>
                <span className="account-info-value">••••••••</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileSection;

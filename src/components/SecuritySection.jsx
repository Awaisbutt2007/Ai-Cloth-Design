import React, { useState } from 'react';
import {
  Shield,
  Key,
  Smartphone,
  Monitor,
  Link,
  History,
  LifeBuoy,
  AlertOctagon,
  Bell,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  LogOut,
  Mail,
  Phone,
  Trash2,
  ChevronDown
} from 'lucide-react';

function SecuritySection({ activeSection }) {
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showDangerModal, setShowDangerModal] = useState(false);
  const [dangerAction, setDangerAction] = useState(null);

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleDangerAction = (actionName) => {
    setDangerAction(actionName);
    setShowDangerModal(true);
  };

  return (
    <section id="security" className={`section security-section ${activeSection === 'security' ? 'active' : 'hidden'}`}>
      
      {/* Header */}
      <div className="api-header">
        <div className="api-header-left">
          <h2><Shield size={24} /> Security Settings</h2>
          <p>Protect your account and manage security preferences.</p>
        </div>
      </div>

      <div className="security-content">
        
        {/* 1. Change Password */}
        <div className="sec-card">
          <div className="sec-card-header">
            <h3><Key size={20} /> Password</h3>
          </div>
          <div className="sec-form-container">
            <div className="sec-form-group">
              <label>Current Password</label>
              <div className="sec-input-wrapper">
                <input type={showPassword.current ? 'text' : 'password'} placeholder="••••••••" />
                <button type="button" onClick={() => togglePassword('current')}>
                  {showPassword.current ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="sec-form-group">
              <label>New Password</label>
              <div className="sec-input-wrapper">
                <input type={showPassword.new ? 'text' : 'password'} placeholder="••••••••" />
                <button type="button" onClick={() => togglePassword('new')}>
                  {showPassword.new ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="sec-password-strength">
                <span>Password Strength: Strong</span>
                <div className="api-progress-bar">
                  <div className="api-progress-fill bg-success" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
            <div className="sec-form-group">
              <label>Confirm Password</label>
              <div className="sec-input-wrapper">
                <input type={showPassword.confirm ? 'text' : 'password'} placeholder="••••••••" />
                <button type="button" onClick={() => togglePassword('confirm')}>
                  {showPassword.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="sec-actions">
              <button className="ws-btn-secondary">Cancel</button>
              <button className="ws-btn-primary">Save Password</button>
            </div>
          </div>
        </div>

        {/* 2. Two-Factor Authentication */}
        <div className="sec-card">
          <div className="sec-card-header">
            <h3><Smartphone size={20} /> Two-Factor Authentication (2FA)</h3>
            <span className={`api-status-${is2FAEnabled ? 'connected' : 'disconnected'}`}>
              {is2FAEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <p className="sec-desc">Enable extra security for your account. You will need a code from an authenticator app to log in.</p>
          {!is2FAEnabled ? (
            <button className="ws-btn-primary sec-mt" onClick={() => setIs2FAEnabled(true)}>Enable 2FA</button>
          ) : (
            <div className="sec-2fa-enabled-state">
              <div className="sec-qr-placeholder">
                <div className="qr-dummy">QR Code</div>
                <p>Scan this QR code with Google Authenticator or Authy</p>
              </div>
              <div className="sec-backup-codes">
                <h4>Backup Codes</h4>
                <p>Save these codes in a secure place. They can be used to recover your account.</p>
                <button className="ws-btn-secondary">Download Recovery Codes</button>
              </div>
              <button className="ws-btn-secondary sec-mt" onClick={() => setIs2FAEnabled(false)}>Disable 2FA</button>
            </div>
          )}
        </div>

        {/* 3. Active Sessions */}
        <div className="sec-card">
          <div className="sec-card-header">
            <h3><Monitor size={20} /> Active Sessions</h3>
            <button className="ws-btn-secondary sec-btn-sm">Logout All Devices</button>
          </div>
          <div className="api-table-wrapper">
            <table className="api-table">
              <thead>
                <tr>
                  <th>Device</th>
                  <th>Browser</th>
                  <th>Location</th>
                  <th>Last Active</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Windows PC</strong></td>
                  <td>Chrome</td>
                  <td>Pakistan</td>
                  <td><span className="text-success">Now</span></td>
                  <td><span className="api-status-connected">Current Device</span></td>
                </tr>
                <tr>
                  <td><strong>iPhone</strong></td>
                  <td>Safari</td>
                  <td>Lahore</td>
                  <td>Yesterday</td>
                  <td>
                    <button className="sec-text-btn"><LogOut size={14} /> Logout</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Connected Accounts */}
        <div className="sec-card">
          <div className="sec-card-header">
            <h3><Link size={20} /> Connected Accounts</h3>
          </div>
          <div className="api-providers-grid">
            <div className="api-provider-card">
              <div className="api-provider-header">
                <div className="api-provider-title">
                  <h4>Google</h4>
                </div>
                <span className="api-status-connected">Connected</span>
              </div>
              <button className="ws-btn-secondary w-full">Disconnect</button>
            </div>
            
            <div className="api-provider-card">
              <div className="api-provider-header">
                <div className="api-provider-title">
                  <h4>GitHub</h4>
                </div>
                <span className="api-status-connected">Connected</span>
              </div>
              <button className="ws-btn-secondary w-full">Disconnect</button>
            </div>

            <div className="api-provider-card">
              <div className="api-provider-header">
                <div className="api-provider-title">
                  <h4>Microsoft</h4>
                </div>
                <span className="api-status-disconnected">Not Connected</span>
              </div>
              <button className="ws-btn-primary w-full">Connect</button>
            </div>
          </div>
        </div>

        {/* 5. Login History */}
        <div className="sec-card">
          <div className="sec-card-header">
            <h3><History size={20} /> Login History</h3>
            <div className="sec-filter-dropdown">
              <span>Filter:</span>
              <select defaultValue="30">
                <option value="today">Today</option>
                <option value="7">7 Days</option>
                <option value="30">30 Days</option>
              </select>
            </div>
          </div>
          <div className="api-table-wrapper">
            <table className="api-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Device</th>
                  <th>Browser</th>
                  <th>IP</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Today, 10:45 AM</td>
                  <td>Windows</td>
                  <td>Chrome</td>
                  <td>192.168.1.1</td>
                  <td><span className="api-status-connected">Success</span></td>
                </tr>
                <tr>
                  <td>Yesterday, 04:20 PM</td>
                  <td>Windows</td>
                  <td>Edge</td>
                  <td>192.168.1.1</td>
                  <td><span className="api-status-connected">Success</span></td>
                </tr>
                <tr>
                  <td>2 Days Ago, 11:10 PM</td>
                  <td>Android</td>
                  <td>Chrome</td>
                  <td>103.255.45.12</td>
                  <td><span className="api-status-disconnected" style={{color: '#ff453a'}}>Failed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Recovery Options */}
        <div className="sec-card">
          <div className="sec-card-header">
            <h3><LifeBuoy size={20} /> Recovery Options</h3>
          </div>
          <div className="sec-recovery-grid">
            <div className="sec-recovery-item">
              <div className="sec-recovery-info">
                <Mail size={18} className="text-secondary" />
                <div>
                  <label>Recovery Email</label>
                  <p>awais@email.com</p>
                </div>
              </div>
              <button className="ws-btn-secondary">Change Email</button>
            </div>
            <div className="sec-recovery-item">
              <div className="sec-recovery-info">
                <Phone size={18} className="text-secondary" />
                <div>
                  <label>Recovery Phone</label>
                  <p>+92 302 XXXXXXX</p>
                </div>
              </div>
              <button className="ws-btn-secondary">Change Phone</button>
            </div>
          </div>
        </div>

        {/* 8. Security Notifications */}
        <div className="sec-card">
          <div className="sec-card-header">
            <h3><Bell size={20} /> Security Notifications</h3>
          </div>
          <div className="api-checkbox-group">
            <label className="api-checkbox"><input type="checkbox" defaultChecked /> Notify me when a new device logs in</label>
            <label className="api-checkbox"><input type="checkbox" defaultChecked /> Notify me after password changes</label>
            <label className="api-checkbox"><input type="checkbox" defaultChecked /> Notify me about suspicious login attempts</label>
            <label className="api-checkbox"><input type="checkbox" /> Weekly security summary</label>
          </div>
        </div>

        {/* 9. Security Score (Unique Feature) */}
        <div className="sec-card sec-score-card">
          <div className="sec-score-header">
            <h3>Security Score</h3>
            <span className="sec-score-value">85%</span>
          </div>
          <div className="api-progress-bar sec-score-bar-container">
            <div className="api-progress-fill bg-primary" style={{ width: '85%' }}></div>
          </div>
          <ul className="sec-score-list">
            <li><CheckCircle2 size={16} className="text-success" /> Strong Password</li>
            <li><CheckCircle2 size={16} className="text-success" /> Google Connected</li>
            <li><CheckCircle2 size={16} className="text-success" /> Email Verified</li>
            <li><XCircle size={16} className="text-danger" /> Two-Factor Disabled</li>
          </ul>
        </div>

        {/* 7. Danger Zone */}
        <div className="sec-card sec-danger-zone">
          <div className="sec-card-header">
            <h3><AlertOctagon size={20} /> Danger Zone</h3>
          </div>
          <p className="sec-desc">These actions are destructive and cannot be undone. Please proceed with caution.</p>
          <div className="sec-danger-actions">
            <button className="sec-btn-danger" onClick={() => handleDangerAction('Delete all AI Designs')}>
              <Trash2 size={16} /> Delete all AI Designs
            </button>
            <button className="sec-btn-danger" onClick={() => handleDangerAction('Remove All Sessions')}>
              <LogOut size={16} /> Remove All Sessions
            </button>
            <button className="sec-btn-danger" onClick={() => handleDangerAction('Deactivate Account')}>
              <Monitor size={16} /> Deactivate Account
            </button>
            <button className="sec-btn-danger-outline" onClick={() => handleDangerAction('Delete Account')}>
              <AlertOctagon size={16} /> Delete Account
            </button>
          </div>
        </div>

      </div>

      {/* Danger Zone Confirmation Modal */}
      {showDangerModal && (
        <div className="api-popup-overlay">
          <div className="api-popup sec-danger-popup">
            <div className="api-popup-header">
              <h3>Confirm Action</h3>
              <button className="api-popup-close" onClick={() => setShowDangerModal(false)}>×</button>
            </div>
            <div className="api-popup-body">
              <p>Are you absolutely sure you want to <strong>{dangerAction}</strong>?</p>
              <p className="text-danger">This action cannot be undone.</p>
              
              <div className="api-form-group">
                <label>To confirm, type your password:</label>
                <div className="sec-input-wrapper">
                  <input type="password" placeholder="Password" />
                </div>
              </div>
              
              <div className="api-popup-actions">
                <button className="ws-btn-secondary" onClick={() => setShowDangerModal(false)}>Cancel</button>
                <button className="sec-btn-danger-solid" onClick={() => {
                  alert(`${dangerAction} executed.`);
                  setShowDangerModal(false);
                }}>
                  Yes, {dangerAction}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default SecuritySection;

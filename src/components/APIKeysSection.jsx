import React, { useState } from 'react';
import {
  Key,
  Plus,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  Trash2,
  Bot,
  Image as ImageIcon,
  Palette,
  Activity,
  CheckCircle2,
  AlertCircle,
  Link,
  BookOpen,
  Code,
  ShieldCheck,
} from 'lucide-react';

const DEMO_KEYS = {
  prod: { masked: 'sk-••••••••8dK9', reveal: 'sk-demo-not-a-real-key-prod' },
  test: { masked: 'sk-••••••••P31x', reveal: 'sk-demo-not-a-real-key-test' },
};

function APIKeysSection({ activeSection }) {
  const [showKey, setShowKey] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const toggleShowKey = (id) => {
    setShowKey((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('API Key copied to clipboard!');
  };

  return (
    <section id="api-keys" className={`section api-keys-section ${activeSection === 'api-keys' ? 'active' : 'hidden'}`}>
      
      {/* 1. Header */}
      <div className="api-header">
        <div className="api-header-left">
          <h2><Key size={24} /> API Keys</h2>
          <p>Manage your API keys securely.<br/>Generate, regenerate, or revoke API access.</p>
        </div>
        <button className="ws-btn-primary" onClick={() => setIsPopupOpen(true)}>
          <Plus size={16} /> Generate API Key
        </button>
      </div>

      <div className="api-content">
        {/* 2. Active API Keys */}
        <div className="api-card">
          <h3 className="api-card-title">Active API Keys</h3>
          <div className="api-table-wrapper">
            <table className="api-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>API Key</th>
                  <th>Created</th>
                  <th>Last Used</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Production</strong></td>
                  <td className="api-key-text">
                    {showKey['prod'] ? DEMO_KEYS.prod.reveal : DEMO_KEYS.prod.masked}
                  </td>
                  <td>02 Jul</td>
                  <td>Today</td>
                  <td><span className="api-status-active">Active</span></td>
                  <td>
                    <div className="api-actions">
                      <button title="Show/Hide" onClick={() => toggleShowKey('prod')}>
                        {showKey['prod'] ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button title="Copy" onClick={() => copyToClipboard(DEMO_KEYS.prod.reveal)}>
                        <Copy size={16} />
                      </button>
                      <button title="Regenerate"><RefreshCw size={16} /></button>
                      <button title="Delete" className="api-action-danger"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><strong>Testing</strong></td>
                  <td className="api-key-text">
                    {showKey['test'] ? DEMO_KEYS.test.reveal : DEMO_KEYS.test.masked}
                  </td>
                  <td>01 Jul</td>
                  <td>Yesterday</td>
                  <td><span className="api-status-active">Active</span></td>
                  <td>
                    <div className="api-actions">
                      <button title="Show/Hide" onClick={() => toggleShowKey('test')}>
                        {showKey['test'] ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button title="Copy" onClick={() => copyToClipboard(DEMO_KEYS.test.reveal)}>
                        <Copy size={16} />
                      </button>
                      <button title="Delete" className="api-action-danger"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Connected AI Providers */}
        <div className="api-card">
          <h3 className="api-card-title">Connected AI Providers</h3>
          <div className="api-providers-grid">
            <div className="api-provider-card">
              <div className="api-provider-header">
                <div className="api-provider-title">
                  <Bot size={20} className="text-openai" />
                  <h4>OpenAI</h4>
                </div>
                <span className="api-status-connected">Connected</span>
              </div>
              <button className="ws-btn-secondary w-full">Configure</button>
            </div>
            
            <div className="api-provider-card">
              <div className="api-provider-header">
                <div className="api-provider-title">
                  <Palette size={20} className="text-stability" />
                  <h4>Stability AI</h4>
                </div>
                <span className="api-status-disconnected">Disconnected</span>
              </div>
              <button className="ws-btn-primary w-full">Connect</button>
            </div>

            <div className="api-provider-card">
              <div className="api-provider-header">
                <div className="api-provider-title">
                  <ImageIcon size={20} className="text-replicate" />
                  <h4>Replicate</h4>
                </div>
                <span className="api-status-connected">Connected</span>
              </div>
              <button className="ws-btn-secondary w-full">Configure</button>
            </div>
          </div>
        </div>

        {/* 5. API Usage & 6. Rate Limits */}
        <div className="api-grid-2">
          {/* API Usage */}
          <div className="api-card">
            <h3 className="api-card-title">API Usage (Today)</h3>
            <div className="api-stats-grid">
              <div className="api-stat-box">
                <span className="api-stat-label">API Requests</span>
                <span className="api-stat-value">12,540</span>
              </div>
              <div className="api-stat-box">
                <span className="api-stat-label">Credits Used</span>
                <span className="api-stat-value">480</span>
              </div>
              <div className="api-stat-box">
                <span className="api-stat-label">Success Rate</span>
                <span className="api-stat-value text-success">99.8%</span>
              </div>
              <div className="api-stat-box">
                <span className="api-stat-label">Errors</span>
                <span className="api-stat-value text-danger">12</span>
              </div>
            </div>
          </div>

          {/* Rate Limits */}
          <div className="api-card">
            <h3 className="api-card-title">Rate Limits</h3>
            <div className="api-rate-limits">
              <div className="api-progress-item">
                <div className="api-progress-header">
                  <span>Daily Requests</span>
                  <span>12,540 / 50,000</span>
                </div>
                <div className="api-progress-bar">
                  <div className="api-progress-fill bg-primary" style={{ width: '25%' }}></div>
                </div>
              </div>
              <div className="api-progress-item">
                <div className="api-progress-header">
                  <span>Monthly Credits</span>
                  <span>4,200 / 10,000</span>
                </div>
                <div className="api-progress-bar">
                  <div className="api-progress-fill bg-secondary" style={{ width: '42%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 7. Webhooks */}
        <div className="api-card">
          <h3 className="api-card-title">Webhooks (Optional)</h3>
          <div className="api-webhook-container">
            <div className="api-webhook-input-group">
              <label>Webhook URL</label>
              <input type="text" placeholder="https://example.com/webhook" defaultValue="https://example.com/webhook" />
            </div>
            <div className="api-webhook-events">
              <label>Events</label>
              <div className="api-checkbox-group">
                <label className="api-checkbox"><input type="checkbox" defaultChecked /> Design Generated</label>
                <label className="api-checkbox"><input type="checkbox" defaultChecked /> Project Created</label>
                <label className="api-checkbox"><input type="checkbox" /> Payment Success</label>
              </div>
            </div>
            <button className="ws-btn-primary">Save Webhook</button>
          </div>
        </div>

        {/* 8. Documentation & 9. Security Tips */}
        <div className="api-grid-2">
          {/* Documentation */}
          <div className="api-card api-docs-card">
            <h3 className="api-card-title">Developer Resources</h3>
            <ul className="api-docs-list">
              <li><BookOpen size={18} /> <a href="#">API Documentation</a></li>
              <li><Link size={18} /> <a href="#">Authentication Guide</a></li>
              <li><Code size={18} /> <a href="#">Code Examples</a></li>
              <li><Activity size={18} /> <a href="#">SDK Download</a></li>
            </ul>
          </div>

          {/* Security Tips */}
          <div className="api-card api-security-card">
            <h3 className="api-card-title"><ShieldCheck size={18} /> Security Tips</h3>
            <ul className="api-security-list">
              <li><CheckCircle2 size={16} className="text-success" /> Never share your API key.</li>
              <li><CheckCircle2 size={16} className="text-success" /> Store it securely in environment variables.</li>
              <li><AlertCircle size={16} className="text-warning" /> Regenerate immediately if compromised.</li>
            </ul>
          </div>
        </div>

      </div>

      {/* 3. Generate API Key Popup */}
      {isPopupOpen && (
        <div className="api-popup-overlay">
          <div className="api-popup">
            <div className="api-popup-header">
              <h3>Generate API Key</h3>
              <button className="api-popup-close" onClick={() => setIsPopupOpen(false)}>×</button>
            </div>
            <div className="api-popup-body">
              <div className="api-form-group">
                <label>Key Name</label>
                <input type="text" placeholder="e.g., Production" defaultValue="Production" />
              </div>
              <div className="api-form-group">
                <label>Permissions</label>
                <select defaultValue="read-write">
                  <option value="read-only">Read Only</option>
                  <option value="read-write">Read & Write</option>
                </select>
              </div>
              <div className="api-form-group">
                <label>Expiration</label>
                <select defaultValue="never">
                  <option value="never">Never</option>
                  <option value="30">30 Days</option>
                  <option value="90">90 Days</option>
                </select>
              </div>
              <div className="api-popup-actions">
                <button className="ws-btn-secondary" onClick={() => setIsPopupOpen(false)}>Cancel</button>
                <button className="ws-btn-primary" onClick={() => {
                  alert('Generated Key: sk-new-example-key! (This will only be shown once)');
                  setIsPopupOpen(false);
                }}>
                  Generate Key
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default APIKeysSection;

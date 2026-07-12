import React, { useState } from 'react';
import {
  Check,
  X,
  Star,
  CreditCard,
  Calendar,
  Zap,
  HelpCircle,
  MessageSquare,
  Mail,
  AlertCircle
} from 'lucide-react';

function SubscriptionSection({ activeSection }) {
  const [autoRenew, setAutoRenew] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);

  if (activeSection !== 'billing-subscription' && activeSection !== 'subscription') return null;

  return (
    <section id="billing-subscription" className={`section subscription-section ${activeSection === 'billing-subscription' || activeSection === 'subscription' ? 'active' : 'hidden'}`}>
      <div className="sub-header">
        <h2>Subscription</h2>
        <p>Manage your billing, plans, and payment methods.</p>
      </div>

      <div className="sub-content">
        {/* 1. Current Plan (Hero Card) */}
        <div className="sub-hero-card">
          <div className="sub-hero-header">
            <div>
              <div className="sub-plan-badge">
                <Star size={14} fill="currentColor" /> Most Popular
              </div>
              <h3 className="sub-plan-title">PRO PLAN</h3>
            </div>
            <div className="sub-status">
              <span className="status-dot"></span> Active
            </div>
          </div>
          
          <div className="sub-hero-body">
            <div className="sub-price-block">
              <span className="sub-price">$19</span>
              <span className="sub-period">/month</span>
            </div>
            <div className="sub-details">
              <div className="detail-item">
                <span className="detail-label">Billing Cycle</span>
                <span className="detail-value">Monthly</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Next Renewal</span>
                <span className="detail-value">15 Aug 2026</span>
              </div>
            </div>
          </div>
          
          <div className="sub-hero-footer">
            <button className="btn-primary sub-upgrade-btn">Upgrade Plan</button>
            <button className="btn-secondary">Change Plan</button>
          </div>
        </div>

        {/* 2. Plan Benefits */}
        <div className="sub-benefits-card">
          <h4>Your Plan Includes</h4>
          <div className="benefits-grid">
            <div className="benefit-item"><Check size={16} className="benefit-icon" /> Unlimited AI Designs</div>
            <div className="benefit-item"><Check size={16} className="benefit-icon" /> HD Downloads</div>
            <div className="benefit-item"><Check size={16} className="benefit-icon" /> Premium Templates</div>
            <div className="benefit-item"><Check size={16} className="benefit-icon" /> AI Model Preview</div>
            <div className="benefit-item"><Check size={16} className="benefit-icon" /> Priority Support</div>
            <div className="benefit-item"><Check size={16} className="benefit-icon" /> Commercial License</div>
          </div>
        </div>

        {/* 3. Available Plans */}
        <div className="sub-section-title">
          <h3>Available Plans</h3>
        </div>
        <div className="sub-pricing-grid">
          <div className="pricing-card">
            <h4>Free</h4>
            <div className="price-tag">$0<span>/mo</span></div>
            <ul className="plan-features">
              <li><Check size={14} /> 20 AI Designs</li>
              <li><Check size={14} /> Basic Templates</li>
              <li><Check size={14} /> Community Support</li>
            </ul>
            <button className="btn-secondary w-full">Current Plan</button>
          </div>

          <div className="pricing-card highlighted">
            <div className="highlight-badge"><Star size={12} fill="currentColor" /> Most Popular</div>
            <h4>Pro</h4>
            <div className="price-tag">$19<span>/mo</span></div>
            <ul className="plan-features">
              <li><Check size={14} /> Unlimited Designs</li>
              <li><Check size={14} /> HD Export</li>
              <li><Check size={14} /> Tech Pack</li>
              <li><Check size={14} /> Priority AI</li>
              <li><Check size={14} /> Priority Support</li>
            </ul>
            <button className="btn-primary w-full">Upgrade</button>
          </div>

          <div className="pricing-card">
            <h4>Enterprise</h4>
            <div className="price-tag">Custom</div>
            <ul className="plan-features">
              <li><Check size={14} /> Unlimited Everything</li>
              <li><Check size={14} /> Unlimited Team Members</li>
              <li><Check size={14} /> API Access</li>
              <li><Check size={14} /> Dedicated Manager</li>
              <li><Check size={14} /> Custom AI Models</li>
            </ul>
            <button className="btn-secondary w-full">Contact Sales</button>
          </div>
        </div>

        {/* 4. Compare Plans */}
        <div className="sub-section-title">
          <h3>Compare Plans</h3>
        </div>
        <div className="sub-table-container">
          <table className="sub-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Free</th>
                <th>Pro</th>
                <th>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>AI Designs</td>
                <td>20</td>
                <td>Unlimited</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td>HD Export</td>
                <td><X size={16} className="icon-x" /></td>
                <td><Check size={16} className="icon-check" /></td>
                <td><Check size={16} className="icon-check" /></td>
              </tr>
              <tr>
                <td>Premium Templates</td>
                <td><X size={16} className="icon-x" /></td>
                <td><Check size={16} className="icon-check" /></td>
                <td><Check size={16} className="icon-check" /></td>
              </tr>
              <tr>
                <td>Team Workspace</td>
                <td><X size={16} className="icon-x" /></td>
                <td><X size={16} className="icon-x" /></td>
                <td><Check size={16} className="icon-check" /></td>
              </tr>
              <tr>
                <td>API Access</td>
                <td><X size={16} className="icon-x" /></td>
                <td><X size={16} className="icon-x" /></td>
                <td><Check size={16} className="icon-check" /></td>
              </tr>
              <tr>
                <td>Priority Support</td>
                <td><X size={16} className="icon-x" /></td>
                <td><Check size={16} className="icon-check" /></td>
                <td><Check size={16} className="icon-check" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="sub-settings-grid">
          {/* 5. Auto Renewal */}
          <div className="sub-card">
            <div className="sub-card-header">
              <div className="icon-wrapper">
                <Zap size={20} />
              </div>
              <div className="sub-card-title">
                <h4>Auto Renewal</h4>
                <p>Automatically renew every month.</p>
              </div>
              <div className="toggle-switch">
                <input 
                  type="checkbox" 
                  id="autoRenewToggle" 
                  checked={autoRenew} 
                  onChange={() => setAutoRenew(!autoRenew)} 
                />
                <label htmlFor="autoRenewToggle"></label>
              </div>
            </div>
          </div>

          {/* 6. Billing Summary */}
          <div className="sub-card">
            <div className="sub-card-header">
              <div className="icon-wrapper">
                <Calendar size={20} />
              </div>
              <div className="sub-card-title">
                <h4>Billing Summary</h4>
                <p>Your upcoming payment details.</p>
              </div>
            </div>
            <div className="summary-details">
              <div className="summary-row">
                <span>Next Payment</span>
                <strong>15 Aug 2026</strong>
              </div>
              <div className="summary-row">
                <span>Amount</span>
                <strong>$19</strong>
              </div>
              <div className="summary-row">
                <span>Payment Method</span>
                <span className="payment-method">
                  <CreditCard size={14} /> Visa **** 4521
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 7. Cancel Subscription */}
        <div className="sub-danger-card">
          <div className="danger-info">
            <h4>Cancel Subscription</h4>
            <p>Your plan will remain active until <strong>15 Aug 2026</strong>.</p>
          </div>
          <button className="btn-danger" onClick={() => setShowCancelModal(true)}>
            Cancel Subscription
          </button>
        </div>

        {/* 8. Need Help */}
        <div className="sub-help-card">
          <h4>Need Help?</h4>
          <div className="help-links">
            <button className="help-btn">
              <HelpCircle size={16} /> Billing FAQ
            </button>
            <button className="help-btn">
              <MessageSquare size={16} /> Live Chat
            </button>
            <button className="help-btn">
              <Mail size={16} /> Email Support
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showCancelModal && (
        <div className="sub-modal-overlay">
          <div className="sub-modal">
            <div className="modal-icon-danger">
              <AlertCircle size={24} />
            </div>
            <h3>Cancel Subscription?</h3>
            <p>Are you sure you want to cancel your Pro Plan? You'll lose access to premium features at the end of your billing cycle.</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowCancelModal(false)}>No, Keep Plan</button>
              <button className="btn-danger" onClick={() => setShowCancelModal(false)}>Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default SubscriptionSection;

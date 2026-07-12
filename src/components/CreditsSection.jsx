import React, { useState } from 'react';
import {
  Coins,
  TrendingUp,
  Activity,
  Lightbulb,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Gift
} from 'lucide-react';

function CreditsSection({ activeSection }) {
  const [activityFilter, setActivityFilter] = useState('All');

  if (activeSection !== 'billing-credits' && activeSection !== 'credits') return null;

  const activities = [
    { id: 1, date: 'Today', action: 'Generated Hoodie', type: 'spent', amount: -5 },
    { id: 2, date: 'Today', action: 'HD Download', type: 'spent', amount: -10 },
    { id: 3, date: 'Yesterday', action: 'Bought Credits', type: 'earned', amount: +500 },
    { id: 4, date: 'Yesterday', action: 'Generated Dress', type: 'spent', amount: -5 },
  ];

  const filteredActivities = activities.filter(act => {
    if (activityFilter === 'Earned') return act.type === 'earned';
    if (activityFilter === 'Spent') return act.type === 'spent';
    return true;
  });

  return (
    <section id="billing-credits" className={`section credits-section ${activeSection === 'billing-credits' || activeSection === 'credits' ? 'active' : 'hidden'}`}>
      <div className="cred-header">
        <h2>Usage & Credits</h2>
        <p>Monitor your AI generation usage, buy credits, and view history.</p>
      </div>

      <div className="cred-content">
        {/* 1. Current Credits (Hero Card) */}
        <div className="cred-hero-card">
          <div className="cred-hero-top">
            <div className="cred-title-block">
              <div className="icon-badge">
                <Coins size={20} />
              </div>
              <div>
                <h3 className="cred-title">AI Credits</h3>
                <p className="cred-subtitle">850 / 1000 Remaining</p>
              </div>
            </div>
            <div className="cred-reset">
              <span>Next Reset</span>
              <strong>1 August 2026</strong>
            </div>
          </div>

          <div className="cred-progress-container">
            <div className="cred-progress-bar">
              <div className="cred-progress-fill" style={{ width: '85%' }}></div>
            </div>
            <span className="cred-progress-text">85%</span>
          </div>

          <div className="cred-hero-actions">
            <button className="btn-primary">Buy Credits</button>
            <button className="btn-secondary">Upgrade Plan</button>
          </div>
        </div>

        {/* 2. Credit Usage Overview */}
        <div className="cred-overview-grid">
          <div className="overview-card">
            <span className="overview-label">Used Today</span>
            <strong className="overview-value">45</strong>
          </div>
          <div className="overview-card">
            <span className="overview-label">Used This Week</span>
            <strong className="overview-value">180</strong>
          </div>
          <div className="overview-card">
            <span className="overview-label">Used This Month</span>
            <strong className="overview-value">640</strong>
          </div>
          <div className="overview-card highlight">
            <span className="overview-label">Credits Remaining</span>
            <strong className="overview-value">360</strong>
          </div>
        </div>

        <div className="cred-split-layout">
          {/* 3. Feature-wise Credit Cost */}
          <div className="cred-card">
            <div className="cred-card-header">
              <h4>Feature Cost</h4>
            </div>
            <div className="cred-table-wrapper">
              <table className="cred-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th className="text-right">Credits</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Generate Design</td>
                    <td className="text-right">5</td>
                  </tr>
                  <tr>
                    <td>Regenerate</td>
                    <td className="text-right">3</td>
                  </tr>
                  <tr>
                    <td>HD Download</td>
                    <td className="text-right">10</td>
                  </tr>
                  <tr>
                    <td>4K Download</td>
                    <td className="text-right">15</td>
                  </tr>
                  <tr>
                    <td>AI Model Preview</td>
                    <td className="text-right">8</td>
                  </tr>
                  <tr>
                    <td>Background Remove</td>
                    <td className="text-right">2</td>
                  </tr>
                  <tr>
                    <td>Tech Pack</td>
                    <td className="text-right">6</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. Credit Activity */}
          <div className="cred-card">
            <div className="cred-card-header">
              <h4>Activity</h4>
              <div className="cred-filters">
                {['All', 'Earned', 'Spent'].map(filter => (
                  <button 
                    key={filter}
                    className={`filter-btn ${activityFilter === filter ? 'active' : ''}`}
                    onClick={() => setActivityFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            <div className="cred-table-wrapper">
              <table className="cred-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Activity</th>
                    <th className="text-right">Credits</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredActivities.map(act => (
                    <tr key={act.id}>
                      <td>{act.date}</td>
                      <td>{act.action}</td>
                      <td className={`text-right font-bold ${act.type === 'earned' ? 'text-success' : 'text-danger'}`}>
                        {act.type === 'earned' ? '+' : ''}{act.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 5. Monthly Usage Analytics */}
        <div className="cred-card">
          <div className="cred-card-header">
            <h4>Monthly Usage Analytics</h4>
            <TrendingUp size={20} className="icon-muted" />
          </div>
          
          <div className="cred-chart-container">
            <div className="cred-chart">
              <div className="chart-bar-group"><div className="chart-bar" style={{height: '30%'}}></div><span>Jan</span></div>
              <div className="chart-bar-group"><div className="chart-bar" style={{height: '60%'}}></div><span>Feb</span></div>
              <div className="chart-bar-group"><div className="chart-bar" style={{height: '45%'}}></div><span>Mar</span></div>
              <div className="chart-bar-group"><div className="chart-bar" style={{height: '25%'}}></div><span>Apr</span></div>
              <div className="chart-bar-group"><div className="chart-bar" style={{height: '85%'}}></div><span>May</span></div>
              <div className="chart-bar-group"><div className="chart-bar" style={{height: '55%'}}></div><span>Jun</span></div>
            </div>
          </div>

          <div className="chart-stats">
            <div className="stat-item">
              <span className="stat-label">Average Daily Usage</span>
              <strong className="stat-value">22 Credits</strong>
            </div>
            <div className="stat-item">
              <span className="stat-label">Highest Usage</span>
              <strong className="stat-value text-success"><ArrowUpRight size={16}/> Tuesday</strong>
            </div>
            <div className="stat-item">
              <span className="stat-label">Lowest Usage</span>
              <strong className="stat-value text-danger"><ArrowDownRight size={16}/> Sunday</strong>
            </div>
          </div>
        </div>

        {/* 6. Buy More Credits */}
        <div className="cred-section-title">
          <h3>Buy More Credits</h3>
        </div>
        <div className="cred-buy-grid">
          <div className="buy-card">
            <div className="buy-amount"><Coins size={24} /> 500 Credits</div>
            <div className="buy-price">$5</div>
            <button className="btn-secondary w-full">Buy</button>
          </div>
          <div className="buy-card popular">
            <div className="buy-badge">Most Popular</div>
            <div className="buy-amount"><Coins size={24} /> 1000 Credits</div>
            <div className="buy-price">$9</div>
            <button className="btn-primary w-full">Buy</button>
          </div>
          <div className="buy-card">
            <div className="buy-amount"><Coins size={24} /> 5000 Credits</div>
            <div className="buy-price">$39</div>
            <button className="btn-secondary w-full">Buy</button>
          </div>
        </div>

        {/* 7 & 8 Expiry and Tips Row */}
        <div className="cred-bottom-grid">
          <div className="cred-expiry-card">
            <div className="expiry-icon">
              <Gift size={24} />
            </div>
            <div className="expiry-info">
              <h4>Bonus Credits</h4>
              <p>You have <strong>150</strong> bonus credits.</p>
              <div className="expiry-date">
                <Clock size={14} /> Expire On: 30 Aug 2026
              </div>
            </div>
          </div>

          <div className="cred-tips-card">
            <div className="tips-header">
              <Lightbulb size={20} className="tips-icon" />
              <h4>Tips for saving credits</h4>
            </div>
            <ul className="tips-list">
              <li>Use Standard Quality to save credits.</li>
              <li>Batch generation is more efficient.</li>
              <li>Upgrade to Pro for better credit limits.</li>
              <li>Monitor your monthly usage regularly.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreditsSection;

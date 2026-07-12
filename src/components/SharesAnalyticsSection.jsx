
import React, { useState } from 'react';
import { Download, Calendar, BarChart3, TrendingUp, Share2, Globe, Users, Trophy, Smartphone, FileText } from 'lucide-react';

function SharesAnalyticsSection({ activeSection }) {
  const [trendFilter, setTrendFilter] = useState('last-7-days');

  const sectionId = 'analytics-shares';
  const activeId = 'shares';
  
  if (activeSection !== activeId) return null;

  // Mock data
  const platformAnalytics = [
    { platform: 'Instagram', shares: 520 },
    { platform: 'Pinterest', shares: 310 },
    { platform: 'Facebook', shares: 220 },
    { platform: 'LinkedIn', shares: 140 },
    { platform: 'X (Twitter)', shares: 110 },
    { platform: 'WhatsApp', shares: 120 },
  ];

  const topSharedDesigns = [
    { name: 'Luxury Jacket', shares: 245, lastShared: 'Today' },
    { name: 'Summer Dress', shares: 198, lastShared: 'Yesterday' },
    { name: 'Streetwear Hoodie', shares: 170, lastShared: 'Today' },
    { name: 'Denim Collection', shares: 140, lastShared: '2 Days Ago' },
  ];

  const recentShareActivity = [
    { time: '10:30 AM', design: 'Luxury Jacket', platform: 'Instagram' },
    { time: '9:15 AM', design: 'Summer Dress', platform: 'Pinterest' },
    { time: 'Yesterday', design: 'Winter Hoodie', platform: 'WhatsApp' },
  ];

  const trendData = [
    { day: 'Mon', height: '35%' },
    { day: 'Tue', height: '55%' },
    { day: 'Wed', height: '28%' },
    { day: 'Thu', height: '60%' },
    { day: 'Fri', height: '75%' },
    { day: 'Sat', height: '45%' },
    { day: 'Sun', height: '32%' },
  ];

  return (
    <section id={sectionId} className={`section shares-analytics-section ${activeSection === activeId ? 'active' : 'hidden'}`}>
      <div className="sub-content">
        {/* 1️⃣ Header */}
        <div className="shares-header">
          <div className="shares-header-text">
            <h2>Shares Analytics</h2>
            <p>Track how your AI fashion designs are shared.</p>
          </div>
          <div className="shares-header-actions">
            <button className="btn-secondary">
              <FileText size={18} />
              Export Report
            </button>
            <button className="btn-secondary">
              <Calendar size={18} />
              Date Filter
            </button>
          </div>
        </div>

        {/* 2️⃣ Share Summary */}
        <div className="shares-summary-grid">
          <div className="shares-summary-card">
            <span className="shares-summary-label">Total Shares</span>
            <strong className="shares-summary-value">1,420</strong>
          </div>
          <div className="shares-summary-card">
            <span className="shares-summary-label">Today's Shares</span>
            <strong className="shares-summary-value">24</strong>
          </div>
          <div className="shares-summary-card">
            <span className="shares-summary-label">This Month</span>
            <strong className="shares-summary-value">310</strong>
          </div>
          <div className="shares-summary-card">
            <span className="shares-summary-label">Unique Shares</span>
            <strong className="shares-summary-value">980</strong>
          </div>
        </div>

        {/* 3️⃣ Share Trend */}
        <div className="shares-trend-card">
          <div className="shares-card-header">
            <h3>Share Trend</h3>
            <div className="shares-trend-filters">
              {['Last 7 Days', 'Last 30 Days', 'Last 12 Months'].map(filter => (
                <button
                  key={filter}
                  className={`shares-trend-filter-btn ${trendFilter === filter.toLowerCase().replace(/\s+/g, '-') ? 'active' : ''}`}
                  onClick={() => setTrendFilter(filter.toLowerCase().replace(/\s+/g, '-'))}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="shares-trend-chart-container">
            <div className="shares-trend-chart">
              {trendData.map(item => (
                <div key={item.day} className="shares-trend-bar-group">
                  <div className="shares-trend-bar" style={{ height: item.height }}></div>
                  <span>{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4️⃣ Platform Analytics */}
        <div className="shares-card">
          <div className="shares-card-header">
            <h3>Platform Analytics</h3>
          </div>
          <div className="shares-table-wrapper">
            <table className="shares-table">
              <thead>
                <tr>
                  <th>Platform</th>
                  <th className="text-right">Shares</th>
                </tr>
              </thead>
              <tbody>
                {platformAnalytics.map((platform, index) => (
                  <tr key={index}>
                    <td>
                      <div className="shares-platform-info">
                        <Globe size={20} />
                        <span>{platform.platform}</span>
                      </div>
                    </td>
                    <td className="text-right">{platform.shares}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5️⃣ Top Shared Designs */}
        <div className="shares-card">
          <div className="shares-card-header">
            <h3>Top Shared Designs</h3>
          </div>
          <div className="shares-table-wrapper">
            <table className="shares-table">
              <thead>
                <tr>
                  <th>Design</th>
                  <th>Shares</th>
                  <th>Last Shared</th>
                </tr>
              </thead>
              <tbody>
                {topSharedDesigns.map((design, index) => (
                  <tr key={index}>
                    <td>{design.name}</td>
                    <td>{design.shares}</td>
                    <td>{design.lastShared}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6️⃣ Recent Share Activity */}
        <div className="shares-card">
          <div className="shares-card-header">
            <h3>Recent Share Activity</h3>
          </div>
          <div className="shares-recent-feed">
            {recentShareActivity.map((item, index) => (
              <div key={index} className="shares-recent-item">
                <span className="shares-recent-time">{item.time}</span>
                <div className="shares-recent-info">
                  <span className="shares-recent-design">
                    {item.design} shared to {item.platform}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7️⃣ Audience Analytics */}
        <div className="audience-analytics-card">
          <h3>Audience Analytics</h3>
          <div className="audience-grid">
            <div className="audience-item">
              <span className="audience-label">Most Active Platform</span>
              <span className="audience-value">Instagram</span>
            </div>
            <div className="audience-item">
              <span className="audience-label">Best Sharing Day</span>
              <span className="audience-value">Friday</span>
            </div>
            <div className="audience-item">
              <span className="audience-label">Average Shares Per Day</span>
              <span className="audience-value">18</span>
            </div>
            <div className="audience-item">
              <span className="audience-label">Top Country</span>
              <span className="audience-value">Pakistan</span>
            </div>
          </div>
        </div>

        {/* 8️⃣ Export Report */}
        <div className="shares-export-card">
          <h3>Export Report</h3>
          <div className="shares-export-buttons">
            <button className="btn-secondary">Export CSV</button>
            <button className="btn-secondary">Export PDF</button>
            <button className="btn-primary">
              <Download size={18} />
              Download Report
            </button>
          </div>
        </div>

        {/* 9️⃣ Insights */}
        <div className="shares-insights-card">
          <h3>Insights</h3>
          <div className="shares-insights-grid">
            <div className="shares-insight-item">
              <div className="shares-insight-icon-wrapper">
                <Trophy size={20} />
              </div>
              <div className="shares-insight-content">
                <span className="shares-insight-label">Most Shared Design</span>
                <span className="shares-insight-value">Luxury Jacket</span>
              </div>
            </div>
            <div className="shares-insight-item">
              <div className="shares-insight-icon-wrapper">
                <Smartphone size={20} />
              </div>
              <div className="shares-insight-content">
                <span className="shares-insight-label">Most Used Platform</span>
                <span className="shares-insight-value">Instagram</span>
              </div>
            </div>
            <div className="shares-insight-item">
              <div className="shares-insight-icon-wrapper">
                <TrendingUp size={20} />
              </div>
              <div className="shares-insight-content">
                <span className="shares-insight-label">Share Growth</span>
                <span className="shares-insight-value shares-insight-positive">+18% This Month</span>
              </div>
            </div>
            <div className="shares-insight-item">
              <div className="shares-insight-icon-wrapper">
                <Calendar size={20} />
              </div>
              <div className="shares-insight-content">
                <span className="shares-insight-label">Best Time to Share</span>
                <span className="shares-insight-value">6:00 PM – 9:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SharesAnalyticsSection;

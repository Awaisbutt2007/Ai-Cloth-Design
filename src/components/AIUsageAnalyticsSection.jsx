
import React, { useState } from 'react';
import { 
  Download, Calendar, BarChart3, TrendingUp, Sparkles, Wand2, CheckCircle2, XCircle, Clock, Zap, TrendingDown, Brain, FileText, Trophy } from 'lucide-react';

function AIUsageAnalyticsSection({ activeSection }) {
  const [trendFilter, setTrendFilter] = useState('last-7-days');

  const sectionId = 'analytics-ai-usage';
  const activeId = 'ai-usage';
  
  if (activeSection !== activeId) return null;

  // Mock data
  const featureUsage = [
    { feature: 'Design Generator', timesUsed: 820, creditsUsed: 4100 },
    { feature: 'Background Remover', timesUsed: 240, creditsUsed: 480 },
    { feature: 'Color Palette', timesUsed: 350, creditsUsed: 700 },
    { feature: 'Fabric Recommendation', timesUsed: 180, creditsUsed: 360 },
    { feature: 'Tech Pack Generator', timesUsed: 90, creditsUsed: 540 },
    { feature: 'AI Model Preview', timesUsed: 120, creditsUsed: 960 },
  ];

  const aiModelsUsage = [
    { model: 'Image Generator', requests: 1100 },
    { model: 'Prompt Enhancer', requests: 420 },
    { model: 'Style Analyzer', requests: 280 },
    { model: 'Color Generator', requests: 350 },
    { model: 'Fabric AI', requests: 300 },
  ];

  const promptAnalytics = [
    { prompt: 'Luxury Black Jacket', generated: 18, success: true },
    { prompt: 'Minimal White Dress', generated: 12, success: true },
    { prompt: 'Streetwear Hoodie', generated: 9, success: true },
    { prompt: 'Vintage Shoes', generated: 3, success: false },
  ];

  const recentAIActivity = [
    { time: '11:20 AM', activity: 'Generated Winter Jacket' },
    { time: '10:45 AM', activity: 'Generated Tech Pack' },
    { time: '9:55 AM', activity: 'Background Removed' },
    { time: 'Yesterday', activity: 'Generated Luxury Dress' },
  ];

  const trendData = [
    { day: 'Mon', height: '42%' },
    { day: 'Tue', height: '60%' },
    { day: 'Wed', height: '30%' },
    { day: 'Thu', height: '70%' },
    { day: 'Fri', height: '62%' },
    { day: 'Sat', height: '45%' },
    { day: 'Sun', height: '33%' },
  ];

  return (
    <section id={sectionId} className={`section ai-usage-analytics-section ${activeSection === activeId ? 'active' : 'hidden'}`}>
      <div className="sub-content">
        {/* 1️⃣ Header */}
        <div className="ai-header">
          <div className="ai-header-text">
            <h2>AI Usage Analytics</h2>
            <p>Track your AI-generated designs and usage statistics.</p>
          </div>
          <div className="ai-header-actions">
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

        {/* 2️⃣ AI Usage Summary */}
        <div className="ai-summary-grid">
          <div className="ai-summary-card">
            <span className="ai-summary-label">Total AI Requests</span>
            <strong className="ai-summary-value">2,450</strong>
          </div>
          <div className="ai-summary-card">
            <span className="ai-summary-label">Designs Generated</span>
            <strong className="ai-summary-value">1,120</strong>
          </div>
          <div className="ai-summary-card">
            <span className="ai-summary-label">Credits Used</span>
            <strong className="ai-summary-value">8,940</strong>
          </div>
          <div className="ai-summary-card">
            <span className="ai-summary-label">Average Generation Time</span>
            <strong className="ai-summary-value">4.2 sec</strong>
          </div>
          <div className="ai-summary-card highlight">
            <span className="ai-summary-label">Success Rate</span>
            <strong className="ai-summary-value">99.2%</strong>
          </div>
          <div className="ai-summary-card">
            <span className="ai-summary-label">Failed Requests</span>
            <strong className="ai-summary-value">18</strong>
          </div>
        </div>

        {/* 3️⃣ AI Requests Trend */}
        <div className="ai-trend-card">
          <div className="ai-card-header">
            <h3>AI Requests Trend</h3>
            <div className="ai-trend-filters">
              {['Last 7 Days', 'Last 30 Days', 'Last 12 Months'].map(filter => (
                <button
                  key={filter}
                  className={`ai-trend-filter-btn ${trendFilter === filter.toLowerCase().replace(/\s+/g, '-') ? 'active' : ''}`}
                  onClick={() => setTrendFilter(filter.toLowerCase().replace(/\s+/g, '-'))}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="ai-trend-chart-container">
            <div className="ai-trend-chart">
              {trendData.map(item => (
                <div key={item.day} className="ai-trend-bar-group">
                  <div className="ai-trend-bar" style={{ height: item.height }}></div>
                  <span>{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4️⃣ Feature Usage */}
        <div className="ai-card">
          <div className="ai-card-header">
            <h3>Feature Usage</h3>
          </div>
          <div className="ai-table-wrapper">
            <table className="ai-table">
              <thead>
                <tr>
                  <th>AI Feature</th>
                  <th className="text-right">Times Used</th>
                  <th className="text-right">Credits Used</th>
                </tr>
              </thead>
              <tbody>
                {featureUsage.map((feature, index) => (
                  <tr key={index}>
                    <td>{feature.feature}</td>
                    <td className="text-right">{feature.timesUsed}</td>
                    <td className="text-right">{feature.creditsUsed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5️⃣ AI Models Usage */}
        <div className="ai-card">
          <div className="ai-card-header">
            <h3>AI Models Usage</h3>
          </div>
          <div className="ai-table-wrapper">
            <table className="ai-table">
              <thead>
                <tr>
                  <th>AI Model</th>
                  <th className="text-right">Requests</th>
                </tr>
              </thead>
              <tbody>
                {aiModelsUsage.map((model, index) => (
                  <tr key={index}>
                    <td>{model.model}</td>
                    <td className="text-right">{model.requests}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6️⃣ Credit Consumption */}
        <div className="ai-credit-card">
          <div className="ai-card-header">
            <h3>Credit Consumption</h3>
          </div>
          <div className="ai-credit-cards">
            <div className="ai-credit-item">
              <div className="ai-credit-header">
                <span className="ai-credit-label">Monthly Credits</span>
                <span className="ai-credit-count">8940 / 10000</span>
              </div>
              <div className="ai-credit-progress-container">
                <div className="ai-credit-progress-bar">
                  <div className="ai-credit-progress-fill" style={{ width: '89.4%' }}></div>
                </div>
              </div>
            </div>
            <div className="ai-credit-item">
              <div className="ai-credit-header">
                <span className="ai-credit-label">Today's Credits</span>
                <span className="ai-credit-count">120</span>
              </div>
            </div>
            <div className="ai-credit-item">
              <div className="ai-credit-header">
                <span className="ai-credit-label">This Week</span>
                <span className="ai-credit-count">560</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7️⃣ Recent AI Activity */}
        <div className="ai-card">
          <div className="ai-card-header">
            <h3>Recent AI Activity</h3>
          </div>
          <div className="ai-recent-feed">
            {recentAIActivity.map((item, index) => (
              <div key={index} className="ai-recent-item">
                <span className="ai-recent-time">{item.time}</span>
                <span className="ai-recent-activity">{item.activity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 8️⃣ Prompt Analytics */}
        <div className="ai-card">
          <div className="ai-card-header">
            <h3>Prompt Analytics</h3>
          </div>
          <div className="ai-table-wrapper">
            <table className="ai-table">
              <thead>
                <tr>
                  <th>Prompt</th>
                  <th className="text-right">Generated</th>
                  <th>Success</th>
                </tr>
              </thead>
              <tbody>
                {promptAnalytics.map((prompt, index) => (
                  <tr key={index}>
                    <td>{prompt.prompt}</td>
                    <td className="text-right">{prompt.generated}</td>
                    <td>
                      {prompt.success ? (
                        <CheckCircle2 size={20} style={{ color: '#10b981' }} />
                      ) : (
                        <XCircle size={20} style={{ color: '#ef4444' }} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 9️⃣ AI Success Rate */}
        <div className="ai-success-card">
          <h3>AI Success Rate</h3>
          <div className="ai-success-grid">
            <div className="ai-success-item">
              <span className="ai-success-label">Successful</span>
              <strong className="ai-success-value">99.2%</strong>
            </div>
            <div className="ai-success-item">
              <span className="ai-success-label">Failed</span>
              <strong className="ai-success-value ai-failed">0.8%</strong>
            </div>
            <div className="ai-success-item">
              <span className="ai-success-label">Average Processing Time</span>
              <strong className="ai-success-value">4.2 sec</strong>
            </div>
          </div>
        </div>

        {/* 🔟 Export Report */}
        <div className="ai-export-card">
          <h3>Export Report</h3>
          <div className="ai-export-buttons">
            <button className="btn-secondary">Export CSV</button>
            <button className="btn-secondary">Export PDF</button>
            <button className="btn-primary">
              <Download size={18} />
              Download Analytics
            </button>
          </div>
        </div>

        {/* 1️⃣1️⃣ AI Insights */}
        <div className="ai-insights-card">
          <h3>AI Insights</h3>
          <div className="ai-insights-grid">
            <div className="ai-insight-item">
              <div className="ai-insight-icon-wrapper ai-purple">
                <Trophy size={20} />
              </div>
              <div className="ai-insight-content">
                <span className="ai-insight-label">Most Used Feature</span>
                <span className="ai-insight-value">Design Generator</span>
              </div>
            </div>
            <div className="ai-insight-item">
              <div className="ai-insight-icon-wrapper ai-pink">
                <Sparkles size={20} />
              </div>
              <div className="ai-insight-content">
                <span className="ai-insight-label">Favorite Style</span>
                <span className="ai-insight-value">Streetwear</span>
              </div>
            </div>
            <div className="ai-insight-item">
              <div className="ai-insight-icon-wrapper ai-green">
                <Zap size={20} />
              </div>
              <div className="ai-insight-content">
                <span className="ai-insight-label">Fastest Generation</span>
                <span className="ai-insight-value">2.1 sec</span>
              </div>
            </div>
            <div className="ai-insight-item">
              <div className="ai-insight-icon-wrapper ai-blue">
                <TrendingUp size={20} />
              </div>
              <div className="ai-insight-content">
                <span className="ai-insight-label">AI Usage Growth</span>
                <span className="ai-insight-value ai-positive">+22% This Month</span>
              </div>
            </div>
            <div className="ai-insight-item">
              <div className="ai-insight-icon-wrapper ai-orange">
                <Wand2 size={20} />
              </div>
              <div className="ai-insight-content">
                <span className="ai-insight-label">Highest Credit Usage</span>
                <span className="ai-insight-value">Design Generator</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIUsageAnalyticsSection;

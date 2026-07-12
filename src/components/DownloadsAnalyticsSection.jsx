
import React, { useState } from 'react';
import { Download, Calendar, BarChart3, TrendingUp, PieChart, Smartphone, Monitor, Tablet, FileText, ArrowRight } from 'lucide-react';

function DownloadsAnalyticsSection({ activeSection }) {
  const [trendFilter, setTrendFilter] = useState('7-days');

  const sectionId = 'analytics-downloads';
  const activeId = 'downloads';
  
  if (activeSection !== activeId) return null;

  // Mock data
  const topDesigns = [
    { name: 'Luxury Jacket', downloads: 245, lastDownload: 'Today', format: 'PNG' },
    { name: 'Summer Dress', downloads: 182, lastDownload: 'Yesterday', format: 'PDF' },
    { name: 'Hoodie Mockup', downloads: 170, lastDownload: 'Today', format: 'JPG' },
    { name: 'Sneakers', downloads: 156, lastDownload: '2 Days Ago', format: 'PNG' },
  ];

  const recentDownloads = [
    { time: '10:30 AM', design: 'Luxury Jacket', format: 'PNG' },
    { time: '9:45 AM', design: 'Summer Dress', format: 'PDF' },
    { time: 'Yesterday', design: 'Winter Hoodie', format: 'JPG' },
  ];

  const formatDistribution = [
    { name: 'PNG', percentage: 52 },
    { name: 'PDF', percentage: 25 },
    { name: 'JPG', percentage: 15 },
    { name: 'ZIP', percentage: 8 },
  ];

  const deviceAnalytics = [
    { device: 'Desktop', downloads: 720 },
    { device: 'Mobile', downloads: 410 },
    { device: 'Tablet', downloads: 118 },
  ];

  const trendData = [
    { day: 'Mon', height: '40%' },
    { day: 'Tue', height: '60%' },
    { day: 'Wed', height: '30%' },
    { day: 'Thu', height: '75%' },
    { day: 'Fri', height: '45%' },
    { day: 'Sat', height: '55%' },
    { day: 'Sun', height: '35%' },
  ];

  return (
    <section id={sectionId} className={`section downloads-analytics-section ${activeSection === activeId ? 'active' : 'hidden'}`}>
      <div className="sub-content">
        {/* 1️⃣ Header */}
        <div className="downloads-header">
          <div className="downloads-header-text">
            <h2>Downloads Analytics</h2>
            <p>Track all your downloaded fashion designs.</p>
          </div>
          <div className="downloads-header-actions">
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

        {/* 2️⃣ Download Summary */}
        <div className="downloads-summary-grid">
          <div className="downloads-summary-card">
            <span className="downloads-summary-label">Total Downloads</span>
            <strong className="downloads-summary-value">1,248</strong>
          </div>
          <div className="downloads-summary-card">
            <span className="downloads-summary-label">Today's Downloads</span>
            <strong className="downloads-summary-value">18</strong>
          </div>
          <div className="downloads-summary-card">
            <span className="downloads-summary-label">This Month</span>
            <strong className="downloads-summary-value">342</strong>
          </div>
          <div className="downloads-summary-card">
            <span className="downloads-summary-label">Unique Downloads</span>
            <strong className="downloads-summary-value">920</strong>
          </div>
        </div>

        {/* 3️⃣ Download Trend Chart */}
        <div className="downloads-trend-card">
          <div className="downloads-card-header">
            <h3>Download Trend</h3>
            <div className="trend-filters">
              {['7 Days', '30 Days', '12 Months'].map(filter => (
                <button
                  key={filter}
                  className={`trend-filter-btn ${trendFilter === filter.toLowerCase().replace(/\s+/g, '-') ? 'active' : ''}`}
                  onClick={() => setTrendFilter(filter.toLowerCase().replace(/\s+/g, '-'))}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="trend-chart-container">
            <div className="trend-chart">
              {trendData.map(item => (
                <div key={item.day} className="trend-bar-group">
                  <div className="trend-bar" style={{ height: item.height }}></div>
                  <span>{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4️⃣ Top Downloaded Designs */}
        <div className="downloads-card">
          <div className="downloads-card-header">
            <h3>Top Downloaded Designs</h3>
          </div>
          <div className="downloads-table-wrapper">
            <table className="downloads-table">
              <thead>
                <tr>
                  <th>Design</th>
                  <th>Downloads</th>
                  <th>Last Download</th>
                  <th>Format</th>
                </tr>
              </thead>
              <tbody>
                {topDesigns.map((design, index) => (
                  <tr key={index}>
                    <td>{design.name}</td>
                    <td>{design.downloads}</td>
                    <td>{design.lastDownload}</td>
                    <td>
                      <span className="download-format-badge">{design.format}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5️⃣ Recent Downloads */}
        <div className="downloads-card">
          <div className="downloads-card-header">
            <h3>Recent Downloads</h3>
          </div>
          <div className="recent-downloads-feed">
            {recentDownloads.map((item, index) => (
              <div key={index} className="recent-download-item">
                <span className="recent-download-time">{item.time}</span>
                <div className="recent-download-info">
                  <span className="recent-download-design">{item.design}</span>
                  <span className="recent-download-format">{item.format}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6️⃣ & 7️⃣: Download Formats + Device Analytics */}
        <div className="downloads-grid-two">
          <div className="downloads-card">
            <div className="downloads-card-header">
              <h3>Download Formats</h3>
            </div>
            <div className="formats-grid">
              {formatDistribution.map((format, index) => (
                <div key={index} className="format-card">
                  <div className="format-icon-wrapper">
                    <FileText size={24} />
                  </div>
                  <div className="format-info">
                    <span className="format-name">{format.name}</span>
                    <span className="format-percentage">{format.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="downloads-card">
            <div className="downloads-card-header">
              <h3>Device Analytics</h3>
            </div>
            <div className="downloads-table-wrapper">
              <table className="downloads-table">
                <thead>
                  <tr>
                    <th>Device</th>
                    <th className="text-right">Downloads</th>
                  </tr>
                </thead>
                <tbody>
                  {deviceAnalytics.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <div className="device-info">
                          {item.device === 'Desktop' && <Monitor size={20} />}
                          {item.device === 'Mobile' && <Smartphone size={20} />}
                          {item.device === 'Tablet' && <Tablet size={20} />}
                          <span>{item.device}</span>
                        </div>
                      </td>
                      <td className="text-right">{item.downloads}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 8️⃣ Export Analytics */}
        <div className="export-analytics-card">
          <h3>Export Analytics</h3>
          <div className="export-buttons">
            <button className="btn-secondary">Export CSV</button>
            <button className="btn-secondary">Export PDF</button>
            <button className="btn-primary">
              <Download size={18} />
              Download Report
            </button>
          </div>
        </div>

        {/* 9️⃣ Insights */}
        <div className="downloads-insights-card">
          <h3>Insights</h3>
          <div className="insights-grid">
            <div className="insight-item">
              <span className="insight-label">Most Downloaded Design</span>
              <span className="insight-value">Luxury Jacket</span>
            </div>
            <div className="insight-item">
              <span className="insight-label">Best Day</span>
              <span className="insight-value">Friday</span>
            </div>
            <div className="insight-item">
              <span className="insight-label">Most Used Format</span>
              <span className="insight-value">PNG</span>
            </div>
            <div className="insight-item">
              <span className="insight-label">Average Downloads Per Day</span>
              <span className="insight-value">18</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DownloadsAnalyticsSection;


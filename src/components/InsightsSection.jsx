import React from 'react';

function InsightsSection({ activeSection }) {
  return (
    <section id="insights" className={`section insights-section ${activeSection === 'insights' ? 'active' : 'hidden'}`}>
      <div className="section-heading">
        <h2>Trend insights</h2>
        <p>See what colors, fabrics, and silhouettes are driving the season.</p>
      </div>
      <div className="insights-grid">
        <div className="insight-card">
          <h3>Color heatmap</h3>
          <p>Soft neutrals with neon contrast are emerging across street-to-evening pieces.</p>
        </div>
        <div className="insight-card">
          <h3>Material momentum</h3>
          <p>Sheer layering and tactile textures are top-performing with fashion buyers.</p>
        </div>
        <div className="insight-card">
          <h3>Silhouette pulse</h3>
          <p>Oversized tailoring and sculptural shoulders continue to dominate luxury collections.</p>
        </div>
      </div>
    </section>
  );
}

export default InsightsSection;

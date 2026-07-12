import React from 'react';

function CustomizeSection({ activeSection }) {
  return (
    <section id="customize" className={`section customize-section ${activeSection === 'customize' ? 'active' : 'hidden'}`}>
      <div className="section-heading">
        <h2>Customize your studio</h2>
        <p>Refine your brand voice, materials, and customer experience with quick controls.</p>
      </div>
      <div className="customize-grid">
        <div className="custom-card">
          <h3>Style presets</h3>
          <div className="tag-list">
            <span>Minimal</span>
            <span>Avant-garde</span>
            <span>Eco-luxe</span>
            <span>Editorial</span>
          </div>
        </div>
        <div className="custom-card">
          <h3>Fabric focus</h3>
          <ul>
            <li>Silk & satin</li>
            <li>Structured denim</li>
            <li>Sustainable knit</li>
            <li>Sheer layering</li>
          </ul>
        </div>
        <div className="custom-card customize-actions">
          <h3>Design workflow</h3>
          <button>Save collection</button>
          <button>Export moodboard</button>
          <button>Publish sale drop</button>
        </div>
      </div>
    </section>
  );
}

export default CustomizeSection;

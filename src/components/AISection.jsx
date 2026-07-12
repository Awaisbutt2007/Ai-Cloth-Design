import React from 'react';
import { aiFeatures } from '../constants';

function AISection({ activeSection }) {
  return (
    <section id="ai" className={`section ai-section ${activeSection === 'ai' ? 'active' : 'hidden'}`}>
      <div className="section-heading">
        <h2>AI feature studio</h2>
        <p>All AI-powered capabilities and model-driven workflows are grouped here for faster access.</p>
      </div>
      <div className="ai-grid">
        {aiFeatures.map((feature) => (
          <div key={feature.title} className="ai-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AISection;

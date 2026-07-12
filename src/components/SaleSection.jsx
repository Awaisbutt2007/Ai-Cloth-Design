import React from 'react';
import { sales } from '../constants';

function SaleSection({ activeSection }) {
  return (
    <section id="sale" className={`section sale-section ${activeSection === 'sale' ? 'active' : 'hidden'}`}>
      <div className="section-heading">
        <h2>Sale spotlight</h2>
        <p>Create momentum with limited offers, exclusive drops, and high-value price strategies.</p>
      </div>
      <div className="sale-grid">
        {sales.map((item) => (
          <article key={item.title} className="sale-card">
            <span className="sale-tag">{item.label}</span>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default SaleSection;

import React from 'react';

function GallerySection({ activeSection, galleryItems }) {
  return (
    <section id="gallery" className={`section gallery-section ${activeSection === 'gallery' ? 'active' : 'hidden'}`}>
      <div className="section-heading">
        <h2>Design gallery</h2>
        <p>Explore a curated set of AI-inspired style directions for your next collection.</p>
      </div>
      <div className="gallery-grid">
        {galleryItems.map((item) => (
          <div key={item.title} className="gallery-card">
            <img src={item.image} alt={item.title} />
            <div className="gallery-content">
              <p className="pill">{item.category}</p>
              <h3>{item.title}</h3>
              <p>{item.mood}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default GallerySection;

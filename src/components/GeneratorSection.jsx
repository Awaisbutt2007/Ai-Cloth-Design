import React from 'react';
import { categories, themes } from '../constants';
import CustomSelect from './CustomSelect';

function GeneratorSection({
  activeSection,
  selectedCategory,
  setSelectedCategory,
  selectedTheme,
  setSelectedTheme,
  prompt,
  setPrompt,
  handleGenerate,
  isGenerating,
  output,
}) {
  return (
    <section id="generator" className={`section generator-section ${activeSection === 'generator' ? 'active' : 'hidden'}`}>
      <div className="section-heading">
        <h2>AI design generator</h2>
        <p>Customize your design prompt, choose a collection theme, and generate a fresh fashion concept instantly.</p>
      </div>
      <div className="generator-grid">
        <div className="input-card">
          <label>Category</label>
          <CustomSelect
            value={selectedCategory}
            onChange={(val) => setSelectedCategory(val.target.value)}
            options={categories}
          />
          <label>Theme</label>
          <CustomSelect
            value={selectedTheme}
            onChange={(val) => setSelectedTheme(val.target.value)}
            options={themes}
          />
          <label>Design prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows="4"
            placeholder="Describe the mood, fabric, or experience you want."
          />
          <button className="generate-button" onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? 'Generating...' : 'Generate AI Design'}
          </button>
        </div>
        <div className="output-card">
          <h3>Generated concept</h3>
          <div className="output-block">
            <span className="label">Title</span>
            <p>{output.title}</p>
          </div>
          <div className="output-block">
            <span className="label">Mood</span>
            <p>{output.mood}</p>
          </div>
          <div className="output-block">
            <span className="label">Color palette</span>
            <p>{output.palette}</p>
          </div>
          <div className="output-block">
            <span className="label">Inspiration</span>
            <p>AI blends runway trends with timeless tailoring for a confident, directional look.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GeneratorSection;

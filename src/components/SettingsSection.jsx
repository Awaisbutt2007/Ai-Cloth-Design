import React from 'react';
import { settingsOptions } from '../constants';

function SettingsSection({ activeSection }) {
  return (
    <section id="settings" className={`section settings-section ${activeSection === 'settings' ? 'active' : 'hidden'}`}>
      <div className="section-heading">
        <h2>Studio settings</h2>
        <p>Keep your workspace sharp and your notifications streamlined for maximum impact.</p>
      </div>
      <div className="settings-grid">
        {settingsOptions.map((item) => (
          <div key={item.label} className="setting-card">
            <h3>{item.label}</h3>
            <p>{item.value}</p>
          </div>
        ))}
        <div className="setting-card setting-action">
          <h3>Manage account</h3>
          <button>Edit profile</button>
          <button>Style preferences</button>
        </div>
      </div>
    </section>
  );
}

export default SettingsSection;

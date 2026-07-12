import React from 'react';

function Topbar({
  topSearch,
  setTopSearch,
  topSearchRef,
  darkMode,
  setDarkMode,
}) {
  return (
    <header className="topbar">
      <div className="topbar-search-wrap">
        <input
          ref={topSearchRef}
          className="top-search"
          value={topSearch}
          onChange={(e) => setTopSearch(e.target.value)}
          placeholder="Ctrl + K to search"
        />
      </div>
      <label className="theme-toggle" htmlFor="theme-switch">
        <input
          id="theme-switch"
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode((current) => !current)}
        />
        <span className="theme-slider" />
      </label>
    </header>
  );
}

export default Topbar;

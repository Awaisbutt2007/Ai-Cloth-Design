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
          type="search"
          name="app-global-search"
          value={topSearch}
          onChange={(e) => setTopSearch(e.target.value)}
          placeholder="Ctrl + K to search"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          data-1p-ignore="true"
          data-lpignore="true"
          readOnly
          onFocus={(e) => e.target.removeAttribute('readonly')}
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

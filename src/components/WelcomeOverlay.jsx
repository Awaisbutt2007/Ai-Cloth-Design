function WelcomeOverlay({ exiting, onContinue }) {
  return (
    <div
      className={`welcome-fullscreen-panel ${exiting ? 'exiting' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
    >
      <h1 id="welcome-title" className="welcome-simple-title">AI Fashion Design</h1>
      <p className="welcome-simple-desc">
        We scan your face to understand your features and recommend fashion styles that complement your look, personality, and proportions.
      </p>
      <button
        type="button"
        className="welcome-simple-start-btn"
        onClick={onContinue}
      >
        Welcome
      </button>
    </div>
  );
}

export default WelcomeOverlay;

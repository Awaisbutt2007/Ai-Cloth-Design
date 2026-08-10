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
        AI fashion design uses smart computer tools and text prompts to turn creative ideas into digital clothing drawings, realistic fabric patterns, and virtual clothing lines in seconds.
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

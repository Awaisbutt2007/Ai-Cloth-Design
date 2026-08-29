import React, { useState, useEffect, useRef } from 'react';
import { repairImageUrl, DEFAULT_POST_PLACEHOLDER } from '../constants';

// A freshly uploaded Supabase object can 404 for a moment before its public URL
// is served. Without a retry the <img> would fall back to the placeholder and
// stay there until the user reloaded the page.
const MAX_RETRIES = 3;
const RETRY_BASE_MS = 700;

function PostImage({ src, alt, className, loading = 'eager', onError, ...rest }) {
  const resolvedSrc = repairImageUrl(typeof src === 'string' ? src : '');

  const [status, setStatus] = useState('loading');
  const [attempt, setAttempt] = useState(0);
  const retryTimerRef = useRef(null);
  const giveUpTimerRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    setStatus('loading');
    setAttempt(0);
  }, [resolvedSrc]);

  // An image served from cache can finish before React attaches onLoad, so the
  // event never fires and the spinner would sit there forever. Check directly.
  useEffect(() => {
    if (status !== 'loading') return;

    const node = imgRef.current;
    if (node?.complete && node.naturalWidth > 0) {
      setStatus('loaded');
      return;
    }

    // Last-resort escape hatch: never leave a spinner running indefinitely.
    giveUpTimerRef.current = window.setTimeout(() => {
      setStatus((current) => (current === 'loading' ? 'loaded' : current));
    }, 10000);

    return () => window.clearTimeout(giveUpTimerRef.current);
  }, [status, resolvedSrc, attempt]);

  useEffect(() => () => {
    window.clearTimeout(retryTimerRef.current);
    window.clearTimeout(giveUpTimerRef.current);
  }, []);

  const handleError = (e) => {
    if (attempt < MAX_RETRIES) {
      window.clearTimeout(retryTimerRef.current);
      retryTimerRef.current = window.setTimeout(
        () => setAttempt((a) => a + 1),
        RETRY_BASE_MS * (attempt + 1),
      );
      return;
    }
    setStatus('failed');
    onError?.(e);
  };

  // A changing query param defeats the browser cache, so a retry actually refetches.
  const displaySrc = status === 'failed'
    ? DEFAULT_POST_PLACEHOLDER
    : attempt > 0
      ? `${resolvedSrc}${resolvedSrc.includes('?') ? '&' : '?'}r=${attempt}`
      : resolvedSrc;

  return (
    <>
      {status === 'loading' && <span className="post-image-loader" aria-hidden="true" />}
      <img
        {...rest}
        ref={imgRef}
        src={displaySrc}
        alt={alt}
        className={className}
        loading={loading}
        decoding="async"
        onLoad={() => setStatus('loaded')}
        onError={handleError}
        style={{
          ...rest.style,
          opacity: status === 'loading' ? 0 : 1,
          transition: 'opacity 0.25s ease',
        }}
      />
    </>
  );
}

export default PostImage;

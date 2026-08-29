import React, { useEffect, useState } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

/**
 * Tells the user the app is offline, so an image that never loads reads as a
 * connection problem rather than a broken app.
 */
function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(() => typeof navigator !== 'undefined' && navigator.onLine === false);
  const [showBackOnline, setShowBackOnline] = useState(false);

  useEffect(() => {
    const goOffline = () => {
      setIsOffline(true);
      setShowBackOnline(false);
    };
    const goOnline = () => {
      setIsOffline(false);
      setShowBackOnline(true);
      window.setTimeout(() => setShowBackOnline(false), 3000);
    };

    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);
    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
    };
  }, []);

  if (!isOffline && !showBackOnline) return null;

  return (
    <div
      className={`offline-banner ${isOffline ? 'is-offline' : 'is-online'}`}
      role="status"
      aria-live="polite"
    >
      {isOffline ? <WifiOff size={16} /> : <Wifi size={16} />}
      <span>
        {isOffline
          ? "You're offline — images and posts may not load until the connection is back."
          : 'Back online.'}
      </span>
    </div>
  );
}

export default OfflineBanner;

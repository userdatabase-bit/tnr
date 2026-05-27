import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Watches for hash changes in the URL and scrolls the matching element
 * into view. Retries a few times to handle lazy-loaded sections that
 * may not be in the DOM immediately.
 */
export default function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = hash.replace('#', '');
    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 20; // ~4 seconds

    const tryScroll = () => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(tryScroll, 200);
      }
    };

    // Small delay to let the route render
    const timer = setTimeout(tryScroll, 100);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [hash]);

  return null;
}

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls the window to the top whenever the route path changes.
 *
 * Place this once inside the <Router> tree — it requires no props.
 *
 * NOTE: React Router v7 also ships a built-in <ScrollRestoration />
 * component that preserves scroll position on browser back/forward.
 * If you need that behaviour, replace this component with:
 *   import { ScrollRestoration } from 'react-router-dom';
 * and render <ScrollRestoration /> in the same location.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';
import App from './App.tsx';
import NotFound from './pages/NotFound';
import WoodenPallets from './components/WoodenPallets';
import ScrollToTop from './components/ScrollToTop';
import ScrollToHash from './components/ScrollToHash';
import ErrorBoundary from './components/ErrorBoundary';
import GlobalUI from './components/GlobalUI';

// Register GSAP plugins once at app entry — avoids repeated registerPlugin() calls in components
gsap.registerPlugin(ScrollTrigger);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <GlobalUI />
          <ScrollToTop />
          <ScrollToHash />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/products/wooden-pallets" element={<WoodenPallets />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>,
);


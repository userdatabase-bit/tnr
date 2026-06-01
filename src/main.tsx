import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { inject } from '@vercel/analytics';
import './index.css';
import App from './App.tsx';
import NotFound from './pages/NotFound';
import WoodenPallets from './pages/WoodenPallets'; // ← FIXED: was './components/WoodenPallets'
import CorrugatedBoxes from './pages/CorrugatedBoxes';
import WoodenBoxes from './pages/WoodenBoxes';
import Products from './pages/Products';
import Services from './pages/Services';
import DigitalMarketing from './pages/DigitalMarketing';
import ITManagement from './pages/ITManagement';
import SoftwareServices from './pages/SoftwareServices';
import AboutUs from './pages/AboutUs';
import ScrollToTop from './components/ScrollToTop';
import ScrollToHash from './components/ScrollToHash';
import ErrorBoundary from './components/ErrorBoundary';
import GlobalUI from './components/GlobalUI';

// Register GSAP plugins once at app entry — avoids repeated registerPlugin() calls in components
gsap.registerPlugin(ScrollTrigger);

// Initialize Vercel Analytics tracking
inject();

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
            <Route path="/products" element={<Products />} />
            <Route path="/products/wooden-pallets" element={<WoodenPallets />} />
            <Route path="/products/corrugated-boxes" element={<CorrugatedBoxes />} />
            <Route path="/products/wooden-boxes" element={<WoodenBoxes />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
            <Route path="/services/it-management" element={<ITManagement />} />
            <Route path="/services/software-services" element={<SoftwareServices />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>,
);
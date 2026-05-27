import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { COMPANY_NAME, SITE_URL } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { WaveDivider, AngledDivider } from './components/Dividers';
import { ArrowUp } from 'lucide-react';
import { PHONE_PRIMARY, WHATSAPP_NUMBER } from './constants';

// ── Eagerly loaded (above fold or tiny) ──────────────────────────────────────
import TrustMarquee from './components/TrustMarquee';
import WoodenBoxes from './components/WoodenBoxes';

// ── Lazily loaded (below fold / heavy) ──────────────────────────────────────
const CorrugatedBoxes  = lazy(() => import('./components/CorrugatedBoxes'));
const Pallets          = lazy(() => import('./components/Pallets'));
const DigitalPrinting  = lazy(() => import('./components/DigitalPrinting'));
const Process          = lazy(() => import('./components/Process'));
const BrandPillars     = lazy(() => import('./components/BrandPillars'));
const Testimonials     = lazy(() => import('./components/Testimonials'));
const Stats            = lazy(() => import('./components/Stats'));
const ServiceMap       = lazy(() => import('./components/ServiceMap'));
const ContactFooter    = lazy(() => import('./components/ContactFooter'));

// ── Section loader placeholder ───────────────────────────────────────────────
function SectionSkeleton() {
  return <div className="w-full py-32 bg-offwhite animate-pulse" />;
}

// ── Loading screen ───────────────────────────────────────────────────────────
function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [opacity,  setOpacity]  = useState(1);
  const [gone,     setGone]     = useState(false);

  useEffect(() => {
    let iv: ReturnType<typeof setInterval> | null = null;

    const startDelay = window.setTimeout(() => {
      let p = 0;
      iv = window.setInterval(() => {
        p += Math.random() * 25 + 15;
        if (p >= 100) {
          if (iv) clearInterval(iv);
          setProgress(100);
          window.setTimeout(() => setOpacity(0), 150);
          window.setTimeout(() => setGone(true), 750);
        } else {
          setProgress(Math.round(p));
        }
      }, 100);
    }, 250);

    return () => {
      window.clearTimeout(startDelay);
      if (iv) clearInterval(iv);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      style={{
        position:        'fixed',
        inset:           0,
        zIndex:          10000,
        background:      '#1B2A5E',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        opacity,
        transition:      'opacity 0.5s ease',
        pointerEvents:   opacity < 1 ? 'none' : 'auto',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <img
          src="/uploads/upload_1.png"
          alt="TNR Solutions"
          style={{
            height:       '56px',      /* explicit px — immune to CSS cascade */
            width:        'auto',
            display:      'block',
            margin:       '0 auto 24px',
            background:   'white',
            borderRadius: '12px',
            padding:      '6px 12px',
            boxShadow:    '0 4px 16px rgba(0,0,0,0.2)',
          }}
        />
        <div style={{
          width:        '192px',
          height:       '4px',
          background:   'rgba(255,255,255,0.1)',
          borderRadius: '9999px',
          overflow:     'hidden',
          margin:       '0 auto',
        }}>
          <div style={{
            height:           '100%',
            width:            `${progress}%`,
            background:       '#E8821A',
            borderRadius:     '9999px',
            transition:       'width 0.15s ease',
          }} />
        </div>
      </div>
    </div>
  );
}


// ── Scroll progress bar ──────────────────────────────────────────────────────
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px]">
      <div
        className="h-full bg-gradient-to-r from-orange to-orange-light transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// ── Back to top button ───────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-navy hover:bg-navy-light text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center border border-white/10 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}

// ── Custom cursor (desktop only) ─────────────────────────────────────────────
function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'ontouchstart' in window) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseenter', () => {
      visibleRef.current = true;
      setVisible(true);
    });
    document.addEventListener('mouseleave', () => {
      visibleRef.current = false;
      setVisible(false);
    });

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (
        t.tagName === 'A' ||
        t.tagName === 'BUTTON' ||
        t.closest('a') ||
        t.closest('button') ||
        t.classList.contains('cursor-pointer')
      ) {
        setHovering(true);
      }
    };
    const out = () => setHovering(false);

    document.addEventListener('mouseover', over, { passive: true });
    document.addEventListener('mouseout', out, { passive: true });

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-transform duration-150 ease-out hidden md:block"
      aria-hidden="true"
      style={{
        left: pos.x,
        top: pos.y,
        transform: `translate(-50%, -50%) scale(${hovering ? 1.8 : 1})`,
      }}
    >
      <div
        className={`rounded-full border-2 transition-colors duration-200 ${
          hovering ? 'border-orange w-8 h-8 bg-orange/10' : 'border-orange/50 w-5 h-5'
        }`}
      />
    </div>
  );
}

// ── Floating WhatsApp button ──────────────────────────────────────────────────
function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hi! I would like to get a quote from TNR Solutions.'
  )}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp: ${PHONE_PRIMARY}`}
      className={`fixed bottom-24 right-6 z-50 flex items-center gap-2 group transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      {/* Tooltip label */}
      <span className="hidden sm:block bg-white text-navy font-heading font-semibold text-xs px-3 py-1.5 rounded-full shadow-lg border border-navy/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        Chat with us
      </span>

      {/* Icon button */}
      <div className="w-14 h-14 rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.45)] flex items-center justify-center hover:scale-110 transition-transform duration-200 animate-glow-pulse-wa">
        <svg
          viewBox="0 0 24 24"
          fill="white"
          className="w-7 h-7"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </div>
    </a>
  );
}

// ── Root app ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Helmet>
        <title>{COMPANY_NAME} — Premium Packaging, Pallets & Digital Printing</title>
        <meta name="description" content={`${COMPANY_NAME}: Premium wooden boxes, corrugated boxes, press wood & timber pallets, edge protectors, and digital printing in Greater Noida, India.`} />
        <link rel="canonical" href={SITE_URL} />
        {/* Open Graph */}
        <meta property="og:title" content={`${COMPANY_NAME} — Premium Packaging, Pallets & Digital Printing`} />
        <meta property="og:description" content="Premium wooden boxes, corrugated boxes, pallets, edge protectors, and digital printing solutions." />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${COMPANY_NAME} — Premium Packaging, Pallets & Digital Printing`} />
        <meta name="twitter:description" content="Premium packaging and pallet solutions built for strength, reliability, and brand impact." />
      </Helmet>
      <div className="relative">
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />
      <BackToTop />
      <WhatsAppFloat />
      <Navbar />
      <main>
        {/* Eagerly rendered — above fold */}
        <Hero />
        <TrustMarquee />
        <WaveDivider color="#F5F6F8" />
        <WoodenBoxes />

        {/* Lazily rendered — below fold */}
        <Suspense fallback={<SectionSkeleton />}>
          <WaveDivider flip color="#F5F6F8" />
          <CorrugatedBoxes />
          <AngledDivider color="#0F1A3D" />
          <Pallets />
          <WaveDivider color="#F5F6F8" />
          <DigitalPrinting />
          <Process />
          <WaveDivider flip color="#FFFFFF" />
          <BrandPillars />
          <Testimonials />
          <AngledDivider flip color="#1B2A5E" />
          <Stats />
          <WaveDivider color="#F5F6F8" />
          <ServiceMap />
          <ContactFooter />
        </Suspense>
      </main>
    </div>
    </>
  );
}

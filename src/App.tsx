import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { COMPANY_NAME, SITE_URL, SOCIAL_FACEBOOK, SOCIAL_INSTAGRAM, SOCIAL_LINKEDIN, ADDRESS_LINE1 } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { WaveDivider, AngledDivider } from './components/Dividers';

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
const WoodenPalletsPreview = lazy(() => import('./components/WoodenPalletsPreview'));
const Stats            = lazy(() => import('./components/Stats'));
const ServiceMap       = lazy(() => import('./components/ServiceMap'));
const LocationMap      = lazy(() => import('./components/LocationMap'));
const ContactFooter    = lazy(() => import('./components/ContactFooter'));

// ── Section loader placeholder ───────────────────────────────────────────────
function SectionSkeleton() {
  return <div className="w-full py-32 bg-offwhite animate-pulse" />;
}

// ── Root app ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Helmet>
        <title>{COMPANY_NAME} — Premium Packaging, Pallets & Digital Printing</title>
        <meta name="description" content={`${COMPANY_NAME}: Premium wooden boxes, corrugated boxes, press wood & timber pallets, edge protectors, and digital printing in Greater Noida, India. Custom packaging solutions for industrial & commercial use.`} />
        <meta name="keywords" content="wooden boxes, corrugated boxes, pallets, timber pallets, edge protectors, digital printing, packaging solutions, TNR Solutions, Greater Noida packaging, industrial packaging, reusable wooden crates, press wood pallets, custom packaging India" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={SITE_URL} />
        {/* Open Graph */}
        <meta property="og:title" content={`${COMPANY_NAME} — Premium Packaging, Pallets & Digital Printing`} />
        <meta property="og:description" content="Premium wooden boxes, corrugated boxes, pallets, edge protectors, and digital printing solutions in Greater Noida. Industrial-strength packaging for every need." />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={COMPANY_NAME} />
        <meta property="og:locale" content="en_IN" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${COMPANY_NAME} — Premium Packaging, Pallets & Digital Printing`} />
        <meta name="twitter:description" content="Premium wooden boxes, corrugated boxes, pallets, edge protectors & digital printing in Greater Noida. Industrial-strength packaging solutions." />

        {/* JSON-LD structured data — Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: COMPANY_NAME,
            url: SITE_URL,
            logo: `${SITE_URL}/images/logo.png`,
            description: 'Premium packaging, pallets, and digital printing solutions in Greater Noida, India.',
            address: {
              '@type': 'PostalAddress',
              streetAddress: ADDRESS_LINE1,
              addressLocality: 'Greater Noida',
              addressRegion: 'Uttar Pradesh',
              postalCode: '201306',
              addressCountry: 'IN',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+91-9999640071',
              contactType: 'sales',
              email: 'info@tnrsolutions.co.in',
            },
            sameAs: [
              SOCIAL_FACEBOOK,
              SOCIAL_INSTAGRAM,
              SOCIAL_LINKEDIN,
            ],
          })}
        </script>
      </Helmet>
      <div className="relative">
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
          <WoodenPalletsPreview />
          <WaveDivider flip color="#F5F6F8" />
          <DigitalPrinting />
          <Process />
          <WaveDivider flip color="#FFFFFF" />
          <BrandPillars />
          <Testimonials />
          <AngledDivider flip color="#1B2A5E" />
          <Stats />
          <WaveDivider color="#F5F6F8" />
          <ServiceMap />
          <LocationMap />
          <ContactFooter />
        </Suspense>
      </main>
    </div>
    </>
  );
}

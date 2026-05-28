import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { COMPANY_NAME, SITE_URL } from '../constants';
import WoodenBox from '../components/WoodenBox';

export default function WoodenPallets() {
  return (
    <>
      <Helmet>
        <title>Wooden Pallets & Boxes | {COMPANY_NAME}</title>
        <meta name="description" content={`Premium wooden pallets, boxes & industrial packaging by ${COMPANY_NAME} in Greater Noida. ISPM 15 compliant, custom sizes, 1T+ load capacity. Durable & reusable solutions for shipping and storage.`} />
        <meta name="keywords" content="wooden pallets, wooden boxes, industrial packaging, timber pallets, custom wooden crates, ISPM 15 pallets, heavy-duty packaging, TNR Solutions, Greater Noida packaging, reusable pallets, press wood pallets, edge protectors" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/products/wooden-pallets`} />
        <meta property="og:title" content={`Wooden Pallets & Boxes | ${COMPANY_NAME}`} />
        <meta property="og:description" content="Premium wooden pallets, boxes, and industrial packaging solutions built for strength and reliability. ISPM 15 compliant, custom sizes available." />
        <meta property="og:url" content={`${SITE_URL}/products/wooden-pallets`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={COMPANY_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Wooden Pallets & Boxes | ${COMPANY_NAME}`} />
        <meta name="twitter:description" content="Premium wooden pallets, boxes & industrial packaging — ISPM 15 compliant, custom sizes, 1T+ capacity." />

        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Wooden Pallets & Boxes',
            description: 'Premium industrial wooden pallets, boxes, and custom packaging solutions.',
            brand: {
              '@type': 'Brand',
              name: COMPANY_NAME,
            },
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              url: `${SITE_URL}/products/wooden-pallets`,
            },
            image: `${SITE_URL}/images/logo.png`,
          })}
        </script>
      </Helmet>

      <Navbar scrolled />
      <div className="min-h-screen bg-offwhite">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-4">
          <nav className="inline-flex items-center gap-2 text-navy/60 font-body text-sm font-medium">
            <Link to="/" className="hover:text-orange transition-colors">Home</Link>
            <span aria-hidden="true">&gt;</span>
            <Link to="/products" className="hover:text-orange transition-colors">Products</Link>
            <span aria-hidden="true">&gt;</span>
            <span className="text-navy/80">Wooden Pallets</span>
          </nav>
        </div>

        {/* Hero section */}
        <section className="relative overflow-hidden">
          {/* Background texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            aria-hidden="true"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #1B2A5E 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />

          <div className="max-w-7xl mx-auto px-6 pb-24">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Left: 3D Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative flex items-center justify-center min-h-[350px] md:min-h-[450px]"
              >
                <div className="absolute w-80 h-80 sm:w-96 sm:h-96 bg-orange/5 rounded-full blur-3xl" />
                <div className="absolute w-48 h-48 bg-navy/5 rounded-full blur-2xl top-10 -left-10" />
                <WoodenBox
                  size={220}
                  label="TNR"
                  subLabel="SOLUTIONS"
                />
              </motion.div>

              {/* Right: Content */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              >
                <span className="inline-block px-4 py-1.5 bg-orange/10 text-orange font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">
                  WOODEN PALLETS & BOXES
                </span>

                <h1 className="font-heading font-black text-navy text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
                  Premium{' '}
                  <span className="text-orange">Wooden</span>{' '}
                  Packaging Solutions
                </h1>

                <p className="font-body text-grey-dark text-base sm:text-lg leading-relaxed mb-8">
                  From heavy-duty industrial pallets to precision-crafted wooden boxes,
                  TNR Solutions delivers custom wooden packaging built for strength,
                  reusability, and brand impact. Each piece is engineered to protect
                  your goods during transport and storage.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  {[
                    { value: '1T+', label: 'Load Capacity' },
                    { value: 'ISPM 15', label: 'Compliant' },
                    { value: 'Custom', label: 'Sizes Available' },
                    { value: 'Reusable', label: 'Eco-Friendly' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white rounded-xl border border-navy/5 p-4 text-center hover:border-orange/20 hover:shadow-md transition-all"
                    >
                      <div className="font-heading font-bold text-navy text-lg">{stat.value}</div>
                      <div className="font-body text-grey-dark text-xs mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <Link
                  to="/#contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-orange hover:bg-orange-light text-white font-heading font-semibold text-sm rounded-full transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(232,130,26,0.4)]"
                >
                  Request a Quote
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

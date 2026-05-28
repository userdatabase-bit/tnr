import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { COMPANY_NAME, SITE_URL } from '../constants';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// Fixed with `as const` to resolve TypeScript's string literal widening issue on build
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
} as const;

// Fixed with `as const` to ensure proper mapping of animation literals
const iconEntryVariants = {
  hidden: { scale: 0, rotate: -10 },
  visible: { scale: 1, rotate: 0, transition: { duration: 0.5, delay: 0.2, ease: 'easeOut' } },
} as const;

// ── Hover animation variants (used with whileHover variant propagation) ──────

const accentBarVariants = {
  rest: { height: 8 },
  hover: { height: 14, transition: { type: 'spring' as const, stiffness: 400, damping: 25 } },
};

const PRODUCT_CATEGORIES = [
  {
    slug: 'corrugated-boxes',
    title: 'Corrugated Boxes',
    subtitle: 'Custom corrugated packaging',
    tag: 'CORRUGATED BOXES & PACKAGING',
    description:
      'From standard shipping cartons to custom printed boxes, die-cut retail packaging, pizza boxes, and premium gifting solutions. Fully customizable sizes, flute grades, and full-colour print.',
    accent: '#E8821A',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
        <rect x="10" y="18" width="44" height="34" rx="2" fill="currentColor" opacity="0.2" />
        <rect x="10" y="18" width="44" height="20" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M10 38 L10 49 C10 51 12 54 14 54 L50 54 C52 54 54 51 54 49 L54 38" stroke="currentColor" strokeWidth="2" fill="none" />
        <line x1="20" y1="18" x2="18" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="32" y1="18" x2="32" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="44" y1="18" x2="46" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="18" y1="10" x2="46" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="36" x2="49" y2="36" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
      </svg>
    ),
    features: ['9+ Box Variants', 'CMYK Full-Colour Print', 'Custom Sizes & Flutes', 'Eco-Friendly Materials'],
  },
  {
    slug: 'wooden-pallets',
    title: 'Wooden Pallets',
    subtitle: 'Industrial wooden packaging',
    tag: 'WOODEN PALLETS & BOXES',
    description:
      'Heavy-duty industrial pallets, precision-crafted wooden boxes, and custom timber packaging. ISPM 15 compliant with 1T+ load capacity. Built for strength, reusability, and brand impact.',
    accent: '#5D4037',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
        {/* Bottom deck */}
        <rect x="6" y="48" width="52" height="6" rx="1" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5" />
        {/* Stringers */}
        <rect x="12" y="32" width="6" height="16" rx="1" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.2" />
        <rect x="29" y="32" width="6" height="16" rx="1" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.2" />
        <rect x="46" y="32" width="6" height="16" rx="1" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.2" />
        {/* Top deck */}
        <rect x="6" y="28" width="52" height="6" rx="1" fill="currentColor" opacity="0.35" stroke="currentColor" strokeWidth="1.5" />
        {/* Upper blocks */}
        <rect x="12" y="20" width="6" height="8" rx="1" fill="currentColor" opacity="0.35" stroke="currentColor" strokeWidth="1.2" />
        <rect x="29" y="20" width="6" height="8" rx="1" fill="currentColor" opacity="0.35" stroke="currentColor" strokeWidth="1.2" />
        <rect x="46" y="20" width="6" height="8" rx="1" fill="currentColor" opacity="0.35" stroke="currentColor" strokeWidth="1.2" />
        {/* Top deck boards */}
        <rect x="6" y="12" width="52" height="8" rx="1" fill="currentColor" opacity="0.5" stroke="currentColor" strokeWidth="1.5" />
        {/* Cross boards */}
        <rect x="8" y="10" width="14" height="3" rx="0.5" fill="currentColor" opacity="0.3" />
        <rect x="25" y="10" width="14" height="3" rx="0.5" fill="currentColor" opacity="0.3" />
        <rect x="42" y="10" width="14" height="3" rx="0.5" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    features: ['1T+ Load Capacity', 'ISPM 15 Compliant', 'Custom Sizes', 'Reusable & Durable'],
  },
];

export default function Products() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Products | {COMPANY_NAME}</title>
        <meta
          name="description"
          content={`Explore our product range — corrugated boxes, custom printed packaging, wooden pallets, and industrial packaging solutions by ${COMPANY_NAME} in Greater Noida.`}
        />
        <meta name="keywords" content="corrugated boxes, wooden pallets, packaging solutions, TNR Solutions, industrial packaging, Greater Noida" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/products`} />
        <meta property="og:title" content={`Products | ${COMPANY_NAME}`} />
        <meta property="og:description" content="Explore corrugated boxes, wooden pallets, and industrial packaging solutions by TNR Solutions." />
        <meta property="og:url" content={`${SITE_URL}/products`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={COMPANY_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Products | ${COMPANY_NAME}`} />
        <meta name="twitter:description" content="Explore corrugated boxes, wooden pallets, and industrial packaging solutions." />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Products',
            description: 'Product range at TNR Solutions — corrugated boxes, wooden pallets, and packaging solutions.',
            brand: { '@type': 'Brand', name: COMPANY_NAME },
            url: `${SITE_URL}/products`,
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
            <span className="text-navy/80">Products</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden">
          {/* Background dot texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            aria-hidden="true"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #1B2A5E 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />

          <div className="max-w-7xl mx-auto px-6 pb-24">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-center mb-16 pt-4"
            >
              <span className="inline-block px-4 py-1.5 bg-orange/10 text-orange font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">
                OUR PRODUCTS
              </span>
              <h1 className="font-heading font-black text-navy text-4xl sm:text-5xl lg:text-6xl leading-tight mb-5">
                Packaging{' '}
                <span className="text-orange">Solutions</span>
              </h1>
              <p className="font-body text-grey-dark text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Choose from our range of industrial-grade packaging — from custom corrugated boxes to
                heavy-duty wooden pallets. Each product is engineered for strength, sustainability, and reliability.
              </p>
            </motion.div>

            {/* Product category cards */}
            <motion.div
              className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {PRODUCT_CATEGORIES.map((cat) => (
                <motion.div
                  key={cat.slug}
                  variants={cardVariants}
                  whileHover="hover"
                  onClick={() => navigate(`/products/${cat.slug}`)}
                  className="cursor-pointer"
                  role="link"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/products/${cat.slug}`); }}
                >
                  <motion.div
                    className="group bg-white rounded-3xl border border-navy/5 overflow-hidden h-full"
                    style={{
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)',
                    }}
                    whileHover={{
                      y: -10,
                      boxShadow: '0 24px 48px -12px rgba(0,0,0,0.15)',
                      transition: { type: 'spring', stiffness: 300, damping: 22 },
                    }}
                  >
                    {/* Accent bar — animated grow on hover */}
                    <motion.div
                      variants={accentBarVariants}
                      style={{ background: cat.accent }}
                    />

                    <div className="p-8 lg:p-10 flex flex-col h-full">
                      {/* Icon — bounce + rotate on hover */}
                      <motion.div
                        variants={iconEntryVariants}
                        className="mb-6 w-20 h-20 rounded-2xl flex items-center justify-center"
                        style={{ background: `${cat.accent}12`, color: cat.accent }}
                        whileHover={{
                          scale: 1.12,
                          rotate: [0, -5, 5, -3, 0],
                          transition: { duration: 0.45, ease: 'easeOut' },
                        }}
                      >
                        {cat.icon}
                      </motion.div>

                      {/* Tag */}
                      <span
                        className="inline-block self-start px-3 py-1 font-heading font-bold text-[10px] tracking-[0.15em] rounded-full mb-4"
                        style={{
                          background: `${cat.accent}10`,
                          color: cat.accent,
                        }}
                      >
                        {cat.tag}
                      </span>

                      {/* Title & subtitle */}
                      <h2 className="font-heading font-black text-navy text-2xl sm:text-3xl leading-tight mb-2 group-hover:text-orange transition-colors duration-300">
                        {cat.title}
                      </h2>
                      <p className="font-body text-grey-dark text-sm font-medium mb-4">
                        {cat.subtitle}
                      </p>

                      {/* Description */}
                      <p className="font-body text-grey-dark text-sm leading-relaxed mb-6 flex-1">
                        {cat.description}
                      </p>

                      {/* Feature chips — subtle stagger lift on card hover */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {cat.features.map((feat, i) => (
                          <motion.span
                            key={feat}
                            custom={i}
                            variants={{
                              rest: { y: 0 },
                              hover: (i: number) => ({
                                y: [0, -4, 0],
                                transition: { delay: i * 0.04, duration: 0.35, ease: 'easeOut' },
                              }),
                            }}
                            className="px-3 py-1.5 rounded-lg text-xs font-body font-medium bg-offwhite border border-navy/5 text-navy/70 inline-block"
                          >
                            {feat}
                          </motion.span>
                        ))}
                      </div>

                      {/* CTA — animated arrow bounce on hover */}
                      <div
                        className="inline-flex items-center gap-2 font-heading font-semibold text-sm transition-all group-hover:gap-3"
                        style={{ color: cat.accent }}
                      >
                        Explore {cat.title}
                        <motion.span
                          className="inline-flex"
                          whileHover={{
                            x: [0, 6, 0],
                            transition: { duration: 0.7, repeat: Infinity, ease: 'easeOut' },
                          }}
                        >
                          →
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-navy">
          <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-heading font-black text-white text-2xl sm:text-3xl leading-tight mb-2">
                Not sure which product fits your needs?
              </h2>
              <p className="font-body text-white/60 text-sm">
                Tell us about your packaging requirements — we'll recommend the right solution within 24 hours.
              </p>
            </div>
            <Link
              to="/#contact"
              className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-3.5 bg-orange hover:bg-orange-light text-white font-heading font-semibold text-sm rounded-full transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(232,130,26,0.4)] whitespace-nowrap"
            >
              Get a Recommendation →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
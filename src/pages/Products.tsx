import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import Navbar from '../components/Navbar';
import { COMPANY_NAME, SITE_URL } from '../constants';
import { 
  Package, Shield, ChevronRight, Box, Layers, 
  CheckCircle, ArrowRight, Star, Truck, Clock, 
  Leaf, Ruler, Printer, Palette, Weight
} from 'lucide-react';

// ── Animation variants ────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

// ── SVG Icon components ───────────────────────────────────────────────────────

function CorrugatedIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="8" y="16" width="48" height="38" rx="3" fill="currentColor" opacity="0.15" />
      <rect x="8" y="16" width="48" height="22" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M8 38 L8 50 C8 52.2 10.2 54 12 54 L52 54 C53.8 54 56 52.2 56 50 L56 38" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="18" y1="16" x2="16" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="16" x2="32" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="46" y1="16" x2="48" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="8" x2="48" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="38" x2="52" y2="38" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
      {/* Flute lines */}
      <path d="M14 28 Q20 24, 26 28 Q32 32, 38 28 Q44 24, 50 28" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="none" />
    </svg>
  );
}

function WoodenBoxIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="8" y="12" width="48" height="40" rx="2" fill="currentColor" opacity="0.15" />
      <rect x="8" y="12" width="48" height="28" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M8 40 L8 50 C8 51.5 9.5 53 11 53 L53 53 C54.5 53 56 51.5 56 50 L56 40" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="12" y1="16" x2="52" y2="16" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="12" y1="20" x2="52" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <line x1="12" y1="24" x2="52" y2="24" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="12" y1="28" x2="52" y2="28" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <line x1="12" y1="32" x2="52" y2="32" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="12" y1="36" x2="52" y2="36" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <line x1="16" y1="12" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="12" x2="32" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="48" y1="12" x2="48" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="6" x2="48" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function WoodenPalletIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="4" y="48" width="56" height="6" rx="1.5" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="10" y="32" width="8" height="16" rx="1" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.2" />
      <rect x="28" y="32" width="8" height="16" rx="1" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.2" />
      <rect x="46" y="32" width="8" height="16" rx="1" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.2" />
      <rect x="4" y="28" width="56" height="6" rx="1.5" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="10" y="18" width="8" height="10" rx="1" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.2" />
      <rect x="28" y="18" width="8" height="10" rx="1" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.2" />
      <rect x="46" y="18" width="8" height="10" rx="1" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.2" />
      <rect x="4" y="10" width="56" height="8" rx="1.5" fill="currentColor" opacity="0.45" stroke="currentColor" strokeWidth="1.5" />
      {/* Wood grain lines */}
      <line x1="8" y1="12" x2="56" y2="12" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
      <line x1="8" y1="14" x2="56" y2="14" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
      <line x1="8" y1="16" x2="56" y2="16" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      <rect x="6" y="8" width="16" height="3" rx="0.5" fill="currentColor" opacity="0.25" />
      <rect x="24" y="8" width="16" height="3" rx="0.5" fill="currentColor" opacity="0.25" />
      <rect x="42" y="8" width="16" height="3" rx="0.5" fill="currentColor" opacity="0.25" />
    </svg>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '500+', label: 'Clients Served', icon: Star },
  { value: '10M+', label: 'Units Shipped', icon: Package },
  { value: '24hr', label: 'Quote Turnaround', icon: Clock },
  { value: '100%', label: 'Custom Solutions', icon: CheckCircle },
];

const PRODUCT_CATEGORIES = [
  {
    slug: 'corrugated-boxes',
    title: 'Corrugated Boxes',
    subtitle: 'Custom corrugated packaging solutions',
    tag: 'CORRUGATED BOXES',
    description:
      'From standard shipping cartons to custom printed boxes, die-cut retail packaging, pizza boxes, sweet boxes, fancy gift boxes, and premium gifting solutions. Fully customizable sizes, flute grades (A/B/C/E/BC), and full-colour CMYK print with Pantone matching.',
    accent: '#E8821A',
    icon: <CorrugatedIcon />,
    features: [
      { icon: Box, text: '9+ Box Variants' },
      { icon: Printer, text: 'Full-Colour CMYK Print' },
      { icon: Ruler, text: 'Custom Sizes & Flutes' },
      { icon: Leaf, text: 'Eco-Friendly Materials' },
    ],
    highlights: [
      'Single, double & triple-wall construction',
      'Moisture-resistant coatings available',
      'Tamper-evident closures',
      'Barcoded labelling option',
    ],
  },
  {
    slug: 'wooden-pallets',
    title: 'Wooden Pallets',
    subtitle: 'Industrial wooden packaging solutions',
    tag: 'WOODEN PALLETS & BOXES',
    description:
      'Heavy-duty industrial pallets, precision-crafted wooden boxes, and custom timber packaging. Available in 2-way and 4-way entry configurations with load capacities up to 3000 kg. ISPM 15 heat-treated for export compliance. Built for strength, reusability, and brand impact.',
    accent: '#5D4037',
    icon: <WoodenPalletIcon />,
    features: [
      { icon: Shield, text: '1T+ Load Capacity' },
      { icon: Leaf, text: 'ISPM 15 Compliant' },
      { icon: Ruler, text: 'Custom Sizes' },
      { icon: Truck, text: 'Reusable & Durable' },
    ],
    highlights: [
      'Hardwood & softwood options',
      'Heat-treated for export (ISPM-15)',
      '4-way forklift entry available',
      'Flat & slatted deck designs',
    ],
  },
  {
    slug: 'wooden-boxes',
    title: 'Wooden Boxes',
    subtitle: 'Premium wooden & plywood box solutions',
    tag: 'WOODEN BOXES & CRATES',
    description:
      'Premium wooden boxes, cargo crates, and plywood packaging built for industrial strength. Solid wood and plywood options with load capacities up to 15 tons. Custom sizes, export-ready heat-treated surfaces, and nailed or nailless construction styles for every application.',
    accent: '#8B6914',
    icon: <WoodenBoxIcon />,
    features: [
      { icon: Box, text: '16+ Box Variants' },
      { icon: Weight, text: 'Up to 15 Ton Capacity' },
      { icon: Ruler, text: 'Custom Dimensions' },
      { icon: Shield, text: 'Export Heat Treated' },
    ],
    highlights: [
      'Solid wood & plywood options',
      'Nailed & nailless construction',
      'Open crate & fully closed styles',
      'ISPM-15 heat treatment available',
    ],
  },
];

// ── Product Card ──────────────────────────────────────────────────────────────

function ProductCard({ cat }: { cat: (typeof PRODUCT_CATEGORIES)[number] }) {
  const url = `/products/${cat.slug}`;

  return (
    <motion.div
      variants={fadeUpVariants}
      className="group"
    >
      <Link to={url} className="no-underline block h-full">
        <div className="relative h-full bg-white rounded-3xl border border-navy/5 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
          {/* Accent top bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 z-10" style={{ background: `linear-gradient(90deg, ${cat.accent}, ${cat.accent}88)` }} />
          
          <div className="relative flex flex-col h-full">
            {/* Image preview area */}
            <div className="relative h-52 sm:h-56 overflow-hidden">
              <div 
                className="absolute inset-0 bg-gradient-to-br"
                style={{ background: `linear-gradient(135deg, ${cat.accent}15, ${cat.accent}05)` }}
              />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div 
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                  style={{ background: `${cat.accent}12`, color: cat.accent }}
                >
                  {cat.icon}
                </div>
              </div>
              {/* Tag badge */}
              <span 
                className="absolute top-4 left-4 px-3 py-1.5 font-heading font-bold text-[10px] tracking-[0.15em] rounded-full backdrop-blur-sm shadow-sm"
                style={{ background: `${cat.accent}15`, color: cat.accent, border: `1px solid ${cat.accent}20` }}
              >
                {cat.tag}
              </span>
              {/* Explore overlay on hover */}
              <div 
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `${cat.accent}08` }}
              >
                <span 
                  className="inline-flex items-center gap-2 px-5 py-2.5 font-heading font-semibold text-sm text-white rounded-full shadow-lg"
                  style={{ background: cat.accent }}
                >
                  View Products <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 lg:p-8 flex flex-col flex-1">
              {/* Title & subtitle */}
              <h2 className="font-heading font-black text-navy text-2xl lg:text-3xl leading-tight mb-2 transition-colors duration-300"
                style={{ color: cat.accent === '#5D4037' ? '#3E2723' : '#1B2A5E' }}>
                {cat.title}
              </h2>
              <p className="font-body text-grey-dark text-sm font-medium mb-4">{cat.subtitle}</p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {cat.features.map((feat) => {
                  const FeatIcon = feat.icon;
                  return (
                    <div 
                      key={feat.text}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-offwhite border border-navy/5"
                    >
                      <FeatIcon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: cat.accent }} />
                      <span className="font-body text-navy/70 text-xs font-medium">{feat.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Description */}
              <p className="font-body text-grey-dark text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                {cat.description}
              </p>

              {/* Highlights */}
              <div className="space-y-2 mb-6">
                {cat.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cat.accent }} />
                    <span className="font-body text-navy/60 text-xs">{h}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div 
                className="inline-flex items-center gap-2 px-6 py-3 font-heading font-semibold text-sm text-white rounded-full transition-all duration-300 group-hover:gap-4 group-hover:shadow-lg self-start"
                style={{ background: cat.accent }}
              >
                Explore All {cat.title.split(' ')[0]} Products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Products() {
  const jsonLd = useMemo(
    () =>
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Products',
        description: `Product range at ${COMPANY_NAME} — corrugated boxes, wooden pallets, and packaging solutions.`,
        url: `${SITE_URL}/products`,
        dateModified: new Date().toISOString().split('T')[0],
        brand: { '@type': 'Brand', name: COMPANY_NAME },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: PRODUCT_CATEGORIES.map((cat, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: cat.title,
            description: cat.description,
            url: `${SITE_URL}/products/${cat.slug}`,
          })),
        },
      }),
    []
  );

  return (
    <>
      <Helmet>
        <title>Products | {COMPANY_NAME}</title>
        <meta
          name="description"
          content={`Explore our product range — corrugated boxes, custom printed packaging, wooden pallets, and industrial packaging solutions by ${COMPANY_NAME} in Greater Noida.`}
        />
        <meta
          name="keywords"
          content="corrugated boxes, wooden pallets, packaging solutions, TNR Solutions, industrial packaging, Greater Noida"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/products`} />
        <meta property="og:title" content={`Products | ${COMPANY_NAME}`} />
        <meta property="og:description" content="Explore corrugated boxes, wooden pallets, and industrial packaging solutions by TNR Solutions." />
        <meta property="og:url" content={`${SITE_URL}/products`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={COMPANY_NAME} />
        <meta property="og:image" content={`${SITE_URL}/og-products.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Products | ${COMPANY_NAME}`} />
        <meta name="twitter:description" content="Explore corrugated boxes, wooden pallets, and industrial packaging solutions." />
        <meta name="twitter:image" content={`${SITE_URL}/og-products.jpg`} />
        <script type="application/ld+json">{jsonLd}</script>
      </Helmet>

      <Navbar scrolled />

      <div className="min-h-screen bg-offwhite">
        {/* ── Hero ── */}
        <section className="relative bg-navy overflow-hidden pt-28 pb-20 lg:pb-24">
          {/* Background dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-orange/10" />

          <div className="relative max-w-7xl mx-auto px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-white/50 text-sm mb-8">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-white/80" aria-current="page">Products</span>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <span className="inline-block px-4 py-1.5 bg-orange/20 text-orange font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">
                OUR PRODUCTS
              </span>
              <h1 className="font-heading font-black text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mb-5">
                Packaging{' '}
                <span className="text-orange">Solutions</span>
              </h1>
              <p className="font-body text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed">
                Choose from our range of industrial-grade packaging — from custom corrugated boxes to
                heavy-duty wooden pallets. Each product is engineered for strength, sustainability, and reliability.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <section className="relative -mt-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-5xl mx-auto px-6"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/20 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
              {STATS.map((stat) => {
                const StatIcon = stat.icon;
                return (
                  <div key={stat.label} className="bg-white px-6 py-5 text-center">
                    <StatIcon className="w-5 h-5 mx-auto mb-2 text-orange" />
                    <p className="font-heading font-black text-2xl text-orange leading-none mb-1">{stat.value}</p>
                    <p className="font-body text-xs text-navy/50 font-medium tracking-wide">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* ── Product Categories ── */}
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 bg-orange/10 text-orange font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">
                PRODUCT CATEGORIES
              </span>
              <h2 className="font-heading font-black text-navy text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Choose Your{' '}
                <span className="text-orange">Packaging</span> Solution
              </h2>
              <p className="font-body text-grey-dark text-base mt-4 max-w-2xl mx-auto leading-relaxed">
                Click on a category to explore the full range of products, specifications, and customization options.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {PRODUCT_CATEGORIES.map((cat) => (
                <ProductCard key={cat.slug} cat={cat} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 bg-navy/10 text-navy font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">
                WHY CHOOSE US
              </span>
              <h2 className="font-heading font-black text-navy text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Built for{' '}
                <span className="text-orange">Performance</span>
              </h2>
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { icon: Shield, title: 'Industrial Strength', desc: 'Engineered to withstand heavy loads, rough handling, and demanding supply chains.' },
                { icon: Palette, title: 'Fully Customizable', desc: 'Every product tailored to your exact specifications — size, print, material, and finish.' },
                { icon: Truck, title: 'Fast Delivery', desc: '48-hour turnaround on standard orders. Reliable delivery across all of Delhi NCR.' },
                { icon: Leaf, title: 'Eco-Conscious', desc: 'Sustainable materials and processes. Recyclable, reusable, and responsibly sourced.' },
              ].map((item) => {
                const ItemIcon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={fadeUpVariants}
                    className="text-center p-6"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-orange/10 text-orange flex items-center justify-center mx-auto mb-4">
                      <ItemIcon className="w-7 h-7" />
                    </div>
                    <h3 className="font-heading font-bold text-navy text-base mb-2">{item.title}</h3>
                    <p className="font-body text-grey-dark text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
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
              className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-3.5 bg-orange hover:bg-orange-light text-white font-heading font-semibold text-sm rounded-full transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(232,130,26,0.4)] whitespace-nowrap no-underline"
            >
              Get a Recommendation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { COMPANY_NAME, SITE_URL } from '../constants';

// ─── Inline SVG: animated corrugated box (replaces WoodenBox for this page) ───
function CorrugatedBoxSVG() {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <style>{`
        @keyframes floatBox {
          0%, 100% { transform: translateY(0px) rotateY(-18deg) rotateX(8deg); }
          50%       { transform: translateY(-14px) rotateY(-18deg) rotateX(8deg); }
        }
        @keyframes shadowPulse {
          0%, 100% { transform: scaleX(1); opacity: 0.18; }
          50%       { transform: scaleX(0.78); opacity: 0.1; }
        }
        .cb-scene { perspective: 900px; }
        .cb-box   {
          transform-style: preserve-3d;
          animation: floatBox 4s ease-in-out infinite;
          width: 200px; height: 180px; position: relative;
        }
        .cb-shadow {
          width: 200px; height: 22px;
          background: rgba(27,42,94,0.22);
          border-radius: 50%;
          margin: 0 auto;
          animation: shadowPulse 4s ease-in-out infinite;
        }
      `}</style>

      <div className="cb-scene flex flex-col items-center gap-3">
        <div className="cb-box">
          <svg
            viewBox="0 0 200 180"
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="180"
          >
            {/* ── Corrugation pattern defs ── */}
            <defs>
              {/* Front face corrugation */}
              <pattern id="corrFront" x="0" y="0" width="8" height="180" patternUnits="userSpaceOnUse">
                <rect width="8" height="180" fill="#D4A843"/>
                <rect x="0" width="1.5" height="180" fill="rgba(0,0,0,0.10)"/>
                <rect x="6.5" width="1.5" height="180" fill="rgba(255,255,255,0.08)"/>
              </pattern>
              {/* Top face corrugation */}
              <pattern id="corrTop" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                <rect width="8" height="8" fill="#E8C05A"/>
                <rect x="0" width="1.5" height="8" fill="rgba(0,0,0,0.08)"/>
              </pattern>
              {/* Side face corrugation */}
              <pattern id="corrSide" x="0" y="0" width="8" height="180" patternUnits="userSpaceOnUse">
                <rect width="8" height="180" fill="#A87C2A"/>
                <rect x="0" width="1.5" height="180" fill="rgba(0,0,0,0.12)"/>
              </pattern>
            </defs>

            {/* ── FRONT FACE ── */}
            <polygon points="30,40 170,40 170,170 30,170" fill="url(#corrFront)"/>
            {/* front border lines (kraft edge) */}
            <polygon points="30,40 170,40 170,170 30,170" fill="none" stroke="#8B6020" strokeWidth="1.2"/>
            {/* horizontal score lines */}
            <line x1="30" y1="105" x2="170" y2="105" stroke="#8B6020" strokeWidth="0.8" strokeDasharray="4,3"/>
            {/* flap fold line top */}
            <line x1="30" y1="60" x2="170" y2="60" stroke="#8B6020" strokeWidth="0.6" strokeDasharray="6,4"/>

            {/* ── TOP FACE (trapezoid) ── */}
            <polygon points="30,40 170,40 140,10 60,10" fill="url(#corrTop)"/>
            <polygon points="30,40 170,40 140,10 60,10" fill="none" stroke="#8B6020" strokeWidth="1"/>
            {/* top flap center fold */}
            <line x1="100" y1="10" x2="100" y2="40" stroke="#8B6020" strokeWidth="0.8" strokeDasharray="3,3"/>

            {/* ── RIGHT SIDE FACE ── */}
            <polygon points="170,40 200,15 200,145 170,170" fill="url(#corrSide)"/>
            <polygon points="170,40 200,15 200,145 170,170" fill="none" stroke="#6B4A10" strokeWidth="1"/>

            {/* ── Tape strip across top ── */}
            <rect x="85" y="8" width="30" height="34" rx="1" fill="rgba(232,192,90,0.5)" stroke="#C8A030" strokeWidth="0.5"/>
            <line x1="100" y1="8" x2="100" y2="42" stroke="#C8A030" strokeWidth="0.5" strokeDasharray="2,2"/>

            {/* ── Brand stamp on front ── */}
            <rect x="52" y="78" width="90" height="36" rx="4"
              fill="rgba(27,42,94,0.08)" stroke="rgba(27,42,94,0.2)" strokeWidth="1"/>
            <text x="97" y="93" textAnchor="middle"
              fontFamily="Arial, sans-serif" fontWeight="800"
              fontSize="11" fill="#1B2A5E" letterSpacing="2">TNR</text>
            <text x="97" y="106" textAnchor="middle"
              fontFamily="Arial, sans-serif" fontWeight="500"
              fontSize="6.5" fill="#1B2A5E" letterSpacing="1.5">SOLUTIONS</text>

            {/* ── Fragile / handle icon ── */}
            <text x="97" y="145" textAnchor="middle"
              fontFamily="Arial, sans-serif" fontSize="8"
              fill="#8B6020" letterSpacing="0.5">▲ THIS SIDE UP ▲</text>
          </svg>
        </div>
        <div className="cb-shadow" />
      </div>
    </div>
  );
}

// ─── Product data (sourced from jainbox.com) ─────────────────────────────────
const PRODUCTS = [
  {
    id: 'corrugated-boxes',
    name: 'Corrugated Boxes',
    tagline: 'Industrial-grade corrugated packaging',
    description:
      'Heavy-duty corrugated boxes with a fluted middle layer sandwiched between two flat liners. Lightweight yet strong — ideal for shipping across e-commerce, electronics, food & beverage, and industrial sectors.',
    specs: ['Single / Double / Triple-wall', 'Custom sizes', 'Recyclable & eco-friendly', 'Stackable up to 500 kg'],
    icon: '📦',
    accent: '#E8821A',
  },
  {
    id: 'custom-printed-corrugated-boxes',
    name: 'Custom Printed Corrugated Boxes',
    tagline: 'Your brand on every package',
    description:
      'Full-colour custom printed corrugated boxes that showcase your logo, brand colours, and messaging. Elevate unboxing experience and drive brand recall with tailored dimensions and high-quality print.',
    specs: ['Full-colour CMYK printing', 'Brand logos & artwork', 'Regular Slotted Container (RSC)', 'Minimum order quantities flexible'],
    icon: '🎨',
    accent: '#1B2A5E',
  },
  {
    id: 'customised-shipping-boxes',
    name: 'Customised Shipping Boxes',
    tagline: 'Built for safe transit',
    description:
      'Purpose-built shipping boxes designed to protect goods during transportation. Available in a variety of flute grades to match product weight and fragility requirements, with tamper-evident closures.',
    specs: ['Tamper-evident closure', 'E / B / C / BC flute options', 'Moisture-resistant coating available', 'Optimised for courier networks'],
    icon: '🚚',
    accent: '#2E7D32',
  },
  {
    id: 'die-cut-boxes',
    name: 'Die-Cut Boxes',
    tagline: 'Precision-cut, perfect fit',
    description:
      'Custom-shaped die-cut boxes manufactured through a specialised die-cutting process for precise designs and tailored sizes. Ideal for retail packaging, POP displays, and products requiring unique shapes.',
    specs: ['Unique shapes & styles', 'No glue/tape assembly', 'Retail & e-commerce ready', 'Reduced material waste'],
    icon: '✂️',
    accent: '#6A1B9A',
  },
  {
    id: 'pizza-boxes',
    name: 'Pizza Boxes',
    tagline: 'Hot, fresh & on-brand',
    description:
      'Food-grade corrugated pizza boxes engineered for heat retention and grease resistance. Available in 7″–20″ sizes with custom print options for your restaurant brand.',
    specs: ['Food-safe, grease-resistant', '7" to 20" sizes', 'Ventilation holes available', 'Custom restaurant branding'],
    icon: '🍕',
    accent: '#C62828',
  },
  {
    id: 'sweet-boxes',
    name: 'Sweet Boxes',
    tagline: 'Gifting made beautiful',
    description:
      'Elegant corrugated sweet and mithai boxes for festive gifting, weddings, and retail. Premium finish with optional foiling, embossing, and window cut-outs to showcase your confections.',
    specs: ['Festive & wedding designs', 'Window cut-outs optional', 'Foil & emboss finishing', 'Diwali / Eid / seasonal themes'],
    icon: '🍬',
    accent: '#AD1457',
  },
  {
    id: 'fancy-corrugated-boxes',
    name: 'Fancy Corrugated Boxes',
    tagline: 'Luxury packaging, corrugated strength',
    description:
      'High-end fancy corrugated boxes that blend aesthetic appeal with structural integrity. Magnetic closures, ribbon pulls, and textured finishes available — ideal for gifting, cosmetics, and premium retail.',
    specs: ['Magnetic / ribbon closure', 'Textured exterior finishes', 'Rigid & corrugated hybrid', 'Premium unboxing experience'],
    icon: '✨',
    accent: '#E8821A',
  },
  {
    id: 'master-packaging',
    name: 'Master Packaging',
    tagline: 'Bulk outer cartons for distribution',
    description:
      'Heavy-duty master cartons and outer packaging solutions designed for bulk distribution and warehouse storage. Double-wall and triple-wall constructions support high stacking loads.',
    specs: ['Double / triple-wall construction', 'High stacking load bearing', 'Pallet-compatible footprint', 'Barcoded & labelled versions'],
    icon: '🏭',
    accent: '#37474F',
  },
  {
    id: 'flutes',
    name: 'Flutes',
    tagline: 'The backbone of corrugated packaging',
    description:
      'Raw corrugated flute materials including A, B, C, E, and F flute profiles. Supplied as sheets or rolls for packaging manufacturers, box plants, and converters who require precise flute grades.',
    specs: ['A / B / C / E / F flute profiles', 'Kraft & test liner facings', 'Custom GSM & thickness', 'Sheet or roll supply format'],
    icon: '📄',
    accent: '#4E342E',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

// ─── Page Component ───────────────────────────────────────────────────────────
export default function CorrugatedBoxes() {
  return (
    <>
      <Helmet>
        <title>Corrugated Boxes & Packaging | {COMPANY_NAME}</title>
        <meta
          name="description"
          content={`Premium corrugated boxes, custom printed packaging, die-cut boxes, pizza boxes, sweet boxes & more by ${COMPANY_NAME} in Greater Noida. Custom sizes, full-colour print, eco-friendly solutions.`}
        />
        <meta
          name="keywords"
          content="corrugated boxes, custom printed corrugated boxes, shipping boxes, die cut boxes, pizza boxes, sweet boxes, fancy boxes, master packaging, flutes, corrugated packaging manufacturer, TNR Solutions, Greater Noida"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/products/corrugated-boxes`} />
        <meta property="og:title" content={`Corrugated Boxes & Packaging | ${COMPANY_NAME}`} />
        <meta
          property="og:description"
          content="Custom corrugated boxes, printed packaging, die-cut boxes, pizza boxes, sweet boxes and industrial master cartons. Eco-friendly, custom sizes available."
        />
        <meta property="og:url" content={`${SITE_URL}/products/corrugated-boxes`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={COMPANY_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Corrugated Boxes & Packaging | ${COMPANY_NAME}`} />
        <meta
          name="twitter:description"
          content="Custom corrugated boxes & packaging — printed, die-cut, pizza, sweet, master cartons & flutes."
        />
        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Corrugated Boxes & Packaging',
            description:
              'Premium corrugated boxes, custom printed packaging, die-cut boxes, and industrial packaging solutions.',
            brand: { '@type': 'Brand', name: COMPANY_NAME },
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              url: `${SITE_URL}/products/corrugated-boxes`,
            },
            image: `${SITE_URL}/images/logo.png`,
          })}
        </script>
      </Helmet>

      <Navbar scrolled />

      <div className="min-h-screen bg-offwhite">

        {/* ── Breadcrumb ── */}
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-4">
          <nav className="inline-flex items-center gap-2 text-navy/60 font-body text-sm font-medium">
            <Link to="/" className="hover:text-orange transition-colors">Home</Link>
            <span aria-hidden="true">&gt;</span>
            <Link to="/products" className="hover:text-orange transition-colors">Products</Link>
            <span aria-hidden="true">&gt;</span>
            <span className="text-navy/80">Corrugated Boxes</span>
          </nav>
        </div>

        {/* ── Hero Section ── */}
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
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

              {/* Left: 3D Corrugated Box illustration */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative flex items-center justify-center min-h-[350px] md:min-h-[450px]"
              >
                <div className="absolute w-80 h-80 sm:w-96 sm:h-96 bg-orange/5 rounded-full blur-3xl" />
                <div className="absolute w-48 h-48 bg-navy/5 rounded-full blur-2xl top-10 -left-10" />
                <CorrugatedBoxSVG />
              </motion.div>

              {/* Right: Content */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              >
                <span className="inline-block px-4 py-1.5 bg-orange/10 text-orange font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">
                  CORRUGATED BOXES & PACKAGING
                </span>
                <h1 className="font-heading font-black text-navy text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
                  Custom{' '}
                  <span className="text-orange">Corrugated</span>{' '}
                  Packaging Solutions
                </h1>
                <p className="font-body text-grey-dark text-base sm:text-lg leading-relaxed mb-8">
                  From standard shipping cartons to fully custom printed boxes, die-cut
                  retail packaging, pizza boxes, and premium gifting solutions — TNR
                  Solutions delivers corrugated packaging engineered for strength,
                  sustainability, and brand impact.
                </p>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                  {[
                    { value: '9+', label: 'Box Variants' },
                    { value: 'CMYK', label: 'Full-Colour Print' },
                    { value: 'Custom', label: 'Sizes & Flutes' },
                    { value: 'Eco', label: 'Recyclable Materials' },
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

        {/* ── Products Grid Section ── */}
        <section className="bg-white border-t border-navy/5">
          <div className="max-w-7xl mx-auto px-6 py-20">

            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <span className="inline-block px-4 py-1.5 bg-navy/5 text-navy font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-4">
                OUR PRODUCT RANGE
              </span>
              <h2 className="font-heading font-black text-navy text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Every Box,{' '}
                <span className="text-orange">Every Need</span>
              </h2>
              <p className="font-body text-grey-dark text-base max-w-2xl mx-auto mt-4">
                We manufacture and supply the complete range of corrugated packaging products —
                from industrial master cartons to premium gifting solutions.
              </p>
            </motion.div>

            {/* Product cards */}
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {PRODUCTS.map((product) => (
                <motion.div
                  key={product.id}
                  variants={cardVariants}
                  className="group bg-offwhite rounded-2xl border border-navy/5 p-6 hover:border-orange/20 hover:shadow-lg transition-all duration-300 flex flex-col"
                >
                  {/* Icon & name row */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: `${product.accent}15` }}
                    >
                      {product.icon}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-navy text-base leading-snug">
                        {product.name}
                      </h3>
                      <p
                        className="font-body text-xs font-medium mt-0.5"
                        style={{ color: product.accent }}
                      >
                        {product.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-body text-grey-dark text-sm leading-relaxed mb-5 flex-1">
                    {product.description}
                  </p>

                  {/* Specs chips */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {product.specs.map((spec) => (
                      <span
                        key={spec}
                        className="px-2.5 py-1 rounded-lg text-xs font-body font-medium bg-white border border-navy/8 text-navy/70"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    to="/#contact"
                    className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold transition-colors group-hover:gap-2.5"
                    style={{ color: product.accent }}
                  >
                    Get a Quote
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Why Corrugated? Feature Strip ── */}
        <section className="bg-offwhite border-t border-navy/5">
          <div className="max-w-7xl mx-auto px-6 py-20">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <h2 className="font-heading font-black text-navy text-3xl sm:text-4xl leading-tight">
                Why Choose{' '}
                <span className="text-orange">Corrugated</span>?
              </h2>
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              {[
                {
                  icon: '💪',
                  title: 'Durable & Strong',
                  body: 'Fluted structure provides rigidity and crush resistance while remaining lightweight — protecting goods under pressure.',
                },
                {
                  icon: '🌱',
                  title: 'Eco-Friendly',
                  body: 'Made from renewable, recyclable materials. Up to 70% recycled fibre content. Fully biodegradable and compostable.',
                },
                {
                  icon: '🎯',
                  title: 'Fully Customisable',
                  body: 'Any size, any shape, any print. From plain kraft to full-colour digital or flexo-printed branded packaging.',
                },
                {
                  icon: '💰',
                  title: 'Cost-Effective',
                  body: 'Lower material costs than rigid boxes or wooden crates. Reduced shipping weight translates to lower logistics spend.',
                },
              ].map((feat) => (
                <motion.div
                  key={feat.title}
                  variants={cardVariants}
                  className="bg-white rounded-2xl border border-navy/5 p-6 hover:border-orange/20 hover:shadow-md transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-orange/8 flex items-center justify-center text-2xl mb-4">
                    {feat.icon}
                  </div>
                  <h3 className="font-heading font-bold text-navy text-sm mb-2">{feat.title}</h3>
                  <p className="font-body text-grey-dark text-sm leading-relaxed">{feat.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="bg-navy">
          <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-heading font-black text-white text-2xl sm:text-3xl leading-tight mb-2">
                Need a custom corrugated solution?
              </h2>
              <p className="font-body text-white/60 text-sm">
                Share your dimensions, print requirements, or product specs — we'll get back with a quote within 24 hours.
              </p>
            </div>
            <Link
              to="/#contact"
              className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-3.5 bg-orange hover:bg-orange-light text-white font-heading font-semibold text-sm rounded-full transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(232,130,26,0.4)] whitespace-nowrap"
            >
              Request a Quote →
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}

import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import Navbar from '../components/Navbar';
import { COMPANY_NAME, SITE_URL, SERVICES_GST_NUMBER, SERVICES_ADDRESS } from '../constants';
import { 
  Globe, Monitor, Code, ArrowRight, CheckCircle,
  Star, Clock, Users, BarChart3, ChevronRight, ExternalLink
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

// ── Data ──────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '500+', label: 'Clients Served', icon: Users },
  { value: '200+', label: 'Projects Delivered', icon: BarChart3 },
  { value: '10+', label: 'Years Experience', icon: Clock },
  { value: '50+', label: 'Enterprise Clients', icon: Star },
];

const SERVICE_CATEGORIES = [
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    subtitle: 'Data-driven marketing strategies',
    tag: 'DIGITAL MARKETING',
    description:
      'From SEO and PPC to social media and content marketing — we help businesses build their online presence, generate qualified leads, and maximize ROI across every channel.',
    accent: '#06B6D4',
    icon: Globe,
    features: [
      'SEO & SEM',
      'Social Media Marketing',
      'PPC & Paid Ads',
      'Content Marketing',
      'Analytics & Reporting',
      'Email Automation',
    ],
    highlights: [
      '10+ Years Experience',
      'Certified Professionals',
      'Transparent Reporting',
      'ROI Guarantee',
    ],
  },
  {
    slug: 'it-management',
    title: 'IT Management',
    subtitle: 'Enterprise-grade IT infrastructure',
    tag: 'IT INFRASTRUCTURE',
    description:
      'From cloud migration and cybersecurity to network optimization and 24/7 monitoring — we keep your systems secure, reliable, and performing at their peak.',
    accent: '#7C3AED',
    icon: Monitor,
    features: [
      'Cloud Infrastructure',
      'Cybersecurity',
      'Network Optimization',
      '24/7 Monitoring',
      'Disaster Recovery',
      'IT Audit & Compliance',
    ],
    highlights: [
      '99.9% Uptime SLA',
      '<15 min Response',
      '24/7 NOC Monitoring',
      'ISO Compliance',
    ],
  },
  {
    slug: 'software-services',
    title: 'Software Services',
    subtitle: 'Custom-built software solutions',
    tag: 'SOFTWARE DEVELOPMENT',
    description:
      'From AI-powered automation to full-scale ERP platforms — we design, develop, and deploy solutions that streamline operations, enhance customer experiences, and drive growth.',
    accent: '#059669',
    icon: Code,
    features: [
      'Web & Mobile Apps',
      'ERP & CRM Solutions',
      'AI-Powered Automation',
      'API Integrations',
      'UI/UX Design',
      'DevOps & Cloud',
    ],
    highlights: [
      '10+ Years Engineering',
      'Full Ownership',
      'Quality-First',
      'Scalable Architecture',
    ],
  },
];

const WHY_US = [
  {
    icon: Users,
    title: 'Client-First Approach',
    desc: 'We listen, understand, and deliver solutions that match your goals — not ours.',
  },
  {
    icon: CheckCircle,
    title: 'End-to-End Delivery',
    desc: 'From strategy to deployment and ongoing support, we handle every step of the journey.',
  },
  {
    icon: Star,
    title: 'Proven Expertise',
    desc: '10+ years of experience delivering 200+ successful projects across industries.',
  },
  {
    icon: BarChart3,
    title: 'Data-Backed Decisions',
    desc: 'Every strategy is driven by data, measured by results, and optimized for growth.',
  },
];

// ── Service Card ──────────────────────────────────────────────────────────────

function ServiceCard({ cat }: { cat: (typeof SERVICE_CATEGORIES)[number] }) {
  const url = `/services/${cat.slug}`;
  const Icon = cat.icon;

  return (
    <motion.div variants={fadeUpVariants} className="group">
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
                  <Icon className="w-16 h-16" />
                </div>
              </div>
              {/* Tag badge */}
              <span 
                className="absolute top-4 left-4 px-3 py-1.5 font-heading font-bold text-[10px] tracking-[0.15em] rounded-full backdrop-blur-sm shadow-sm"
                style={{ background: `${cat.accent}15`, color: cat.accent, border: `1px solid ${cat.accent}20` }}
              >
                {cat.tag}
              </span>
              {/* Hover overlay */}
              <div 
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `${cat.accent}08` }}
              >
                <span 
                  className="inline-flex items-center gap-2 px-5 py-2.5 font-heading font-semibold text-sm text-white rounded-full shadow-lg"
                  style={{ background: cat.accent }}
                >
                  View Services <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 lg:p-8 flex flex-col flex-1">
              <h2 className="font-heading font-black text-navy text-2xl lg:text-3xl leading-tight mb-2 transition-colors duration-300">
                {cat.title}
              </h2>
              <p className="font-body text-grey-dark text-sm font-medium mb-4">{cat.subtitle}</p>

              {/* Features */} 
              <div className="flex flex-wrap gap-2 mb-5">
                {cat.features.map((feat) => (
                  <span
                    key={feat}
                    className="px-3 py-1.5 rounded-lg text-xs font-body font-medium bg-offwhite border border-navy/5 text-navy/70"
                  >
                    {feat}
                  </span>
                ))}
              </div>

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
                Explore {cat.title}
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

export default function Services() {
  const jsonLd = useMemo(
    () =>
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Services',
        description: `IT and digital services by ${COMPANY_NAME} — digital marketing, IT management, and software development.`,
        url: `${SITE_URL}/services`,
        dateModified: new Date().toISOString().split('T')[0],
        brand: { '@type': 'Brand', name: COMPANY_NAME },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: SERVICE_CATEGORIES.map((svc, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: svc.title,
            description: svc.description,
            url: `${SITE_URL}/services/${svc.slug}`,
          })),
        },
      }),
    []
  );

  return (
    <>
      <Helmet>
        <title>Services | {COMPANY_NAME}</title>
        <meta
          name="description"
          content={`IT and digital services by ${COMPANY_NAME} in Delhi NCR — digital marketing, IT management, and software development.`}
        />
        <meta
          name="keywords"
          content="digital marketing, IT management, software development, web development, SEO, digital transformation, IT services, Delhi NCR, TNR Solutions"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/services`} />
        <meta property="og:title" content={`Services | ${COMPANY_NAME}`} />
        <meta property="og:description" content="IT and digital services — digital marketing, IT management, and software development." />
        <meta property="og:url" content={`${SITE_URL}/services`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={COMPANY_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Services | ${COMPANY_NAME}`} />
        <meta name="twitter:description" content="IT and digital services — digital marketing, IT management, and software development." />
        <script type="application/ld+json">{jsonLd}</script>
      </Helmet>

      <Navbar scrolled />

      <div className="min-h-screen bg-offwhite">
        {/* ── Hero ── */}
        <section className="relative bg-navy overflow-hidden pt-28 pb-20 lg:pb-24">
          {/* Background image */}
          <div className="absolute inset-0 opacity-10">
            <img
              src="/images/services-hero.jpg"
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              width={1920}
              height={1080}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-orange/15" />

          <div className="relative max-w-7xl mx-auto px-6">
            <nav className="flex items-center gap-2 text-white/50 text-sm mb-8">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-white/80" aria-current="page">Services</span>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <span className="inline-block px-4 py-1.5 bg-orange/20 text-orange font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">
                OUR SERVICES
              </span>
              <h1 className="font-heading font-black text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mb-5">
                Digital{' '}
                <span className="text-orange">Services</span>{' '}
                for Your Business
              </h1>
              <p className="font-body text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed">
                From digital marketing and IT infrastructure management to custom software development — 
                we provide end-to-end technology solutions to help your business grow, compete, and succeed 
                in the digital age.
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

        {/* ── Service Categories ── */}
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 bg-orange/10 text-orange font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">
                WHAT WE OFFER
              </span>
              <h2 className="font-heading font-black text-navy text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Choose Your{' '}
                <span className="text-orange">Service</span>
              </h2>
              <p className="font-body text-grey-dark text-base mt-4 max-w-2xl mx-auto leading-relaxed">
                Click on a category to explore the full range of services, processes, and solutions.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {SERVICE_CATEGORIES.map((cat) => (
                <ServiceCard key={cat.slug} cat={cat} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Why Us ── */}
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
                <span className="text-orange">Results</span>
              </h2>
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {WHY_US.map((item) => {
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

        {/* ── CTA Section ── */}
        <section className="bg-navy">
          <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-heading font-black text-white text-2xl sm:text-3xl leading-tight mb-2">
                Ready to Transform Your Business?
              </h2>
              <p className="font-body text-white/60 text-sm">
                Whether you need a digital marketing strategy, IT infrastructure, or custom software — 
                we'll get back to you within 24 hours.
              </p>
            </div>
            <Link
              to="/#contact"
              className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-3.5 bg-orange hover:bg-orange-light text-white font-heading font-semibold text-sm rounded-full transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(232,130,26,0.4)] whitespace-nowrap no-underline"
            >
              Request a Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ── Services Office Address ── */}
        <section className="bg-navy-dark/95 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <span className="font-body text-white/30 text-xs font-medium tracking-wider">SERVICES OFFICE</span>
              <p className="font-body text-white/60 text-sm mt-2 max-w-xl mx-auto leading-relaxed">
                {SERVICES_ADDRESS}
              </p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(SERVICES_ADDRESS)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 mt-4 bg-orange hover:bg-orange-light text-white font-heading font-semibold text-xs rounded-full transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(232,130,26,0.4)]"
              >
                <ExternalLink size={14} />
                Get Directions
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── GST Information ── */}
        <section className="bg-navy-dark/95 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3"
            >
              <span className="font-body text-white/30 text-xs font-medium">Services GST:</span>
              <span className="font-heading font-bold text-orange text-sm tracking-wider">
                {SERVICES_GST_NUMBER}
              </span>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

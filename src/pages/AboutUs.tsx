import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import Navbar from '../components/Navbar';
import { COMPANY_NAME, SITE_URL, ADDRESS_LINE1, ADDRESS_LINE2, PHONE_PRIMARY, EMAIL } from '../constants';
import { useCountUp } from '../hooks/useCountUp';
import { gsap } from '../hooks/useScrollAnimation';
import { 
  ShieldCheck, Lightbulb, Handshake, Dumbbell, 
  Quote, Star, MapPin, ChevronLeft, ChevronRight,
  ArrowRight, Target, Eye, Heart
} from 'lucide-react';

// ── Animation variants ────────────────────────────────────────────────────────

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ── Data ──────────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    title: 'RELIABILITY',
    desc: 'We deliver every time — on schedule, on spec, on budget.',
    icon: ShieldCheck,
    color: '#E8821A',
  },
  {
    title: 'INNOVATION',
    desc: 'Digital meets expertise. We continuously evolve our processes.',
    icon: Lightbulb,
    color: '#1B2A5E',
  },
  {
    title: 'INTEGRITY',
    desc: 'Partnerships built on trust, transparency, and mutual growth.',
    icon: Handshake,
    color: '#B8874A',
  },
  {
    title: 'STRENGTH',
    desc: 'Industrial-grade solutions engineered for the toughest demands.',
    icon: Dumbbell,
    color: '#E8821A',
  },
];

const TESTIMONIALS = [
  {
    name: 'Rajesh Kumar',
    role: 'Supply Chain Head',
    text: 'TNR delivered 5,000 custom wooden boxes in under a week. Zero defects. Their reliability is unmatched in the NCR region.',
    rating: 5,
    initials: 'RK',
    color: '#4F46E5',
  },
  {
    name: 'Priya Sharma',
    role: 'Operations Manager',
    text: 'The corrugated packaging from TNR meets all our pharma compliance requirements. Their 48-hour delivery keeps our production running.',
    rating: 5,
    initials: 'PS',
    color: '#7C3AED',
  },
  {
    name: 'Amit Verma',
    role: 'Logistics Director',
    text: 'Switched to TNR press wood pallets and cut our shipping costs by 30%. ISPM-15 compliant right out of the box. Exceptional quality.',
    rating: 5,
    initials: 'AV',
    color: '#059669',
  },
  {
    name: 'Suresh Nair',
    role: 'Procurement Manager',
    text: 'We have been sourcing timber pallets from TNR for 3 years. Consistent quality, fair pricing, and always on-time. Highly recommended.',
    rating: 5,
    initials: 'SN',
    color: '#EA580C',
  },
  {
    name: 'Kavita Mehra',
    role: 'Brand Manager',
    text: "TNR's digital printing team transformed our packaging. Vibrant CMYK printing, quick turnaround, and the team was extremely responsive.",
    rating: 5,
    initials: 'KM',
    color: '#E11D48',
  },
];

const TIMELINE = [
  { year: '2008', event: 'Founded in Greater Noida with a vision to revolutionize industrial packaging.' },
  { year: '2012', event: 'Expanded into corrugated box manufacturing with state-of-the-art machinery.' },
  { year: '2016', event: 'Launched digital printing division for custom packaging solutions.' },
  { year: '2019', event: 'Achieved ISPM-15 certification for export-ready wooden pallets.' },
  { year: '2022', event: 'Crossed 10 million units shipped and 500+ active clients across Delhi NCR.' },
  { year: '2024', event: 'Expanded facility with advanced manufacturing capabilities and larger production capacity.' },
];

// ── Stat Counter Component ────────────────────────────────────────────────────

function StatCounter({ end, suffix = '', label }: { end: number; suffix?: string; label: string }) {
  const { ref, value } = useCountUp({ end, suffix, duration: 3000 });
  return (
    <div ref={ref} className="text-center px-4">
      <div className="font-heading font-black text-orange text-3xl sm:text-4xl md:text-5xl mb-2">
        {value}
      </div>
      <div className="font-body text-white/70 text-sm font-medium tracking-wider uppercase">
        {label}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AboutUs() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-rotate testimonials
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [paused]);

  // GSAP parallax on stats
  useEffect(() => {
    if (!statsRef.current) return;
    const ctx = gsap.context(() => {
      const items = statsRef.current!.querySelectorAll('.stat-item');
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 50 + i * 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              end: 'center center',
              scrub: 1,
            },
          }
        );
      });
    }, statsRef);

    return () => ctx.revert();
  }, []);

  const jsonLd = useMemo(
    () =>
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: `About Us | ${COMPANY_NAME}`,
        description: `Learn about ${COMPANY_NAME} — our story, values, and team. Premium packaging and pallet solutions in Greater Noida, Delhi NCR.`,
        url: `${SITE_URL}/about`,
        brand: { '@type': 'Brand', name: COMPANY_NAME },
        founder: { '@type': 'Person', name: 'TNR Solutions Team' },
        foundingDate: '2008',
        foundingLocation: 'Greater Noida, Uttar Pradesh, India',
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
          telephone: PHONE_PRIMARY,
          contactType: 'sales',
          email: EMAIL,
        },
      }),
    []
  );

  return (
    <>
      <Helmet>
        <title>About Us | {COMPANY_NAME}</title>
        <meta
          name="description"
          content={`Learn about ${COMPANY_NAME} — Greater Noida's premier packaging and pallet manufacturer. Our story, values, and commitment to quality since 2008.`}
        />
        <meta
          name="keywords"
          content="about TNR Solutions, packaging company Greater Noida, industrial packaging manufacturer, wooden pallet manufacturer, corrugated box manufacturer, Delhi NCR packaging"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/about`} />
        <meta property="og:title" content={`About Us | ${COMPANY_NAME}`} />
        <meta property="og:description" content="Learn about TNR Solutions — our story, values, and premium packaging solutions." />
        <meta property="og:url" content={`${SITE_URL}/about`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={COMPANY_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`About Us | ${COMPANY_NAME}`} />
        <meta name="twitter:description" content="Premium packaging & pallet manufacturer since 2008." />
        <script type="application/ld+json">{jsonLd}</script>
      </Helmet>

      <Navbar scrolled />

      <div className="min-h-screen bg-offwhite">
        {/* ── Hero ── */}
        <section className="relative bg-navy overflow-hidden pt-28 pb-20 lg:pb-28">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-orange/10" />

          <div className="relative max-w-7xl mx-auto px-6">
            <nav className="flex items-center gap-2 text-white/50 text-sm mb-8">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span aria-hidden="true">/</span>
              <span className="text-white/80" aria-current="page">About Us</span>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <span className="inline-block px-4 py-1.5 bg-orange/20 text-orange font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">
                ABOUT US
              </span>
              <h1 className="font-heading font-black text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mb-5">
                Building Packaging{' '}
                <span className="text-orange">Excellence</span>{' '}
                Since 2008
              </h1>
              <p className="font-body text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed">
                TNR Solutions is Greater Noida's trusted partner for premium packaging, pallets, and digital printing. 
                We combine decades of manufacturing expertise with modern technology to deliver solutions that protect, present, and perform.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Story Section ── */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-1.5 bg-orange/10 text-orange font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">
                  OUR STORY
                </span>
                <h2 className="font-heading font-black text-navy text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
                  From Humble Beginnings to{' '}
                  <span className="text-orange">Industry Leader</span>
                </h2>
                <div className="space-y-4 font-body text-grey-dark text-sm sm:text-base leading-relaxed">
                  <p>
                    Founded in 2008 in Greater Noida's Surajpur Industrial Area, TNR Solutions started with a simple mission: 
                    deliver industrial-grade packaging that businesses can rely on. What began as a small wooden pallet workshop 
                    has grown into a full-spectrum packaging manufacturer serving over 500 clients across Delhi NCR.
                  </p>
                  <p>
                    Today, we manufacture corrugated boxes, wooden pallets and boxes, press wood pallets, timber pallets, 
                    edge protectors, and provide digital printing services — all under one roof. Our 15+ years of experience 
                    have taught us that great packaging is about more than materials; it's about understanding your product, 
                    your supply chain, and your brand.
                  </p>
                  <p>
                    We've invested in state-of-the-art manufacturing equipment, digital printing technology, and a skilled 
                    team dedicated to quality at every step. From a single prototype to bulk production runs of 10,000+ units, 
                    we deliver consistency, reliability, and craftsmanship.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative"
              >
                {/* Timeline */}
                <div className="relative pl-8 border-l-2 border-orange/20">
                  {TIMELINE.map((item, i) => (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative mb-8 last:mb-0"
                    >
                      {/* Dot */}
                      <div className="absolute -left-[33px] top-0 w-6 h-6 rounded-full bg-white border-2 border-orange flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-orange" />
                      </div>
                      {/* Year */}
                      <span className="font-heading font-black text-orange text-lg">{item.year}</span>
                      <p className="font-body text-grey-dark text-sm mt-1 leading-relaxed">{item.event}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Mission / Vision / Values ── */}
        <section className="py-20 lg:py-28 bg-offwhite">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 bg-orange/10 text-orange font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">
                OUR DNA
              </span>
              <h2 className="font-heading font-black text-navy text-3xl sm:text-4xl lg:text-5xl leading-tight">
                What Drives{' '}
                <span className="text-orange">Us</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: Target,
                  title: 'Our Mission',
                  desc: 'To deliver packaging solutions that protect our clients\' products, enhance their brand, and optimize their supply chain — with reliability, speed, and craftsmanship.',
                  color: '#E8821A',
                  bg: 'bg-orange/5',
                  border: 'border-orange/10',
                },
                {
                  icon: Eye,
                  title: 'Our Vision',
                  desc: 'To be Delhi NCR\'s most trusted packaging partner — known for quality, innovation, and the unwavering commitment to helping businesses package their success.',
                  color: '#1B2A5E',
                  bg: 'bg-navy/5',
                  border: 'border-navy/10',
                },
                {
                  icon: Heart,
                  title: 'Our Values',
                  desc: 'Reliability in every delivery. Innovation in every solution. Integrity in every relationship. Strength in every product. These pillars define who we are and how we serve our clients.',
                  color: '#B8874A',
                  bg: 'bg-kraft/5',
                  border: 'border-kraft/10',
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`p-8 rounded-2xl ${item.bg} border ${item.border} group hover:shadow-lg transition-all duration-300`}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                      style={{ background: `${item.color}15`, color: item.color }}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-heading font-bold text-navy text-xl mb-3">{item.title}</h3>
                    <p className="font-body text-grey-dark text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Brand Pillars ── */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 bg-navy/10 text-navy font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">
                WHY TNR
              </span>
              <h2 className="font-heading font-black text-navy text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Our Brand <span className="text-orange">Pillars</span>
              </h2>
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {PILLARS.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    variants={fadeUpVariants}
                    className="group relative p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 cursor-default overflow-hidden border"
                    style={{
                      background: `linear-gradient(135deg, ${pillar.color}08, transparent)`,
                      borderColor: `${pillar.color}20`,
                    }}
                  >
                    <div
                      className="absolute -top-4 -right-2 font-heading font-black text-8xl opacity-[0.04] text-navy select-none"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    <div
                      className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform"
                      style={{ background: pillar.color }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="font-heading font-extrabold text-navy text-lg tracking-wider mb-3">
                      {pillar.title}
                    </h3>

                    <p className="font-body text-grey-dark text-sm leading-relaxed">
                      {pillar.desc}
                    </p>

                    <div
                      className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(90deg, ${pillar.color}, ${pillar.color}88)` }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section ref={statsRef} className="relative py-20 lg:py-28 bg-navy overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '32px 32px',
            }}
          />
          <div className="absolute top-0 left-0 w-64 h-64 bg-orange/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

          <div className="relative max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <h2 className="font-heading font-black text-white text-3xl sm:text-4xl lg:text-5xl">
                Numbers That <span className="text-orange">Speak</span>
              </h2>
              <p className="font-body text-white/50 text-base mt-4 max-w-lg mx-auto leading-relaxed">
                Over 15 years of manufacturing and supplying premium packaging solutions across Delhi NCR — the numbers tell the story.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
              <div className="stat-item"><StatCounter end={1000000} suffix="+" label="Units Shipped" /></div>
              <div className="stat-item"><StatCounter end={48} suffix="hr" label="Delivery" /></div>
              <div className="stat-item"><StatCounter end={15} suffix="+" label="Years Experience" /></div>
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="relative py-20 lg:py-28 bg-offwhite overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="inline-block px-4 py-1.5 bg-orange/10 text-orange font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">
                TESTIMONIALS
              </span>
              <h2 className="font-heading font-black text-navy text-3xl sm:text-4xl lg:text-5xl">
                What Our <span className="text-orange">Clients</span> Say
              </h2>
            </motion.div>

            <div className="relative">
              <button
                onClick={() => setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                aria-label="Previous testimonial"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 hidden sm:flex w-11 h-11 items-center justify-center rounded-full bg-white border border-navy/10 shadow-md hover:border-orange/30 hover:shadow-lg hover:scale-110 transition-all z-10"
              >
                <ChevronLeft className="w-5 h-5 text-navy" />
              </button>

              <button
                onClick={() => setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length)}
                aria-label="Next testimonial"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 hidden sm:flex w-11 h-11 items-center justify-center rounded-full bg-white border border-navy/10 shadow-md hover:border-orange/30 hover:shadow-lg hover:scale-110 transition-all z-10"
              >
                <ChevronRight className="w-5 h-5 text-navy" />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-navy/5 relative"
                >
                  <div className="absolute -top-4 left-8 w-10 h-10 bg-orange rounded-xl flex items-center justify-center shadow-lg">
                    <Quote className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex gap-1 mb-5 mt-2">
                    {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-orange fill-orange" />
                    ))}
                  </div>

                  <p className="font-body text-navy/80 text-base md:text-lg leading-relaxed mb-8">
                    "{TESTIMONIALS[activeTestimonial].text}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shadow-md ring-2 ring-white"
                      style={{ background: TESTIMONIALS[activeTestimonial].color }}
                    >
                      <span className="font-heading font-bold text-white text-sm">
                        {TESTIMONIALS[activeTestimonial].initials}
                      </span>
                    </div>
                    <div>
                      <span className="font-heading font-bold text-navy text-sm block">
                        {TESTIMONIALS[activeTestimonial].name}
                      </span>
                      <span className="font-body text-grey text-xs">
                        {TESTIMONIALS[activeTestimonial].role}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-center gap-3 mt-8" role="group" aria-label="Testimonial navigation">
                {TESTIMONIALS.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    aria-pressed={i === activeTestimonial}
                    aria-label={`Go to testimonial by ${t.name}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === activeTestimonial ? 'bg-orange w-8' : 'bg-navy/15 hover:bg-navy/30 w-2.5'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center justify-center gap-4 mt-6 sm:hidden">
                <button
                  onClick={() => setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                  aria-label="Previous testimonial"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-white border border-navy/10 shadow-md"
                >
                  <ChevronLeft className="w-5 h-5 text-navy" />
                </button>
                <span className="font-body text-grey text-xs">
                  {activeTestimonial + 1} / {TESTIMONIALS.length}
                </span>
                <button
                  onClick={() => setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length)}
                  aria-label="Next testimonial"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-white border border-navy/10 shadow-md"
                >
                  <ChevronRight className="w-5 h-5 text-navy" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Location / Office ── */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1.5 bg-orange/10 text-orange font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-5">
                VISIT US
              </span>
              <h2 className="font-heading font-black text-navy text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Our <span className="text-orange">Facility</span>
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-offwhite rounded-2xl p-8 md:p-10 border border-navy/5"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-orange flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-navy text-lg mb-1">TNR Solutions</h3>
                    <p className="font-body text-grey-dark text-sm leading-relaxed">
                      {ADDRESS_LINE1}<br />
                      {ADDRESS_LINE2}
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-white border border-navy/5">
                    <p className="font-body text-grey text-xs uppercase tracking-wider mb-1">Phone</p>
                    <a href={`tel:${PHONE_PRIMARY.replace(/\s/g, '')}`} className="font-heading font-semibold text-navy text-sm hover:text-orange transition-colors">
                      {PHONE_PRIMARY}
                    </a>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-navy/5">
                    <p className="font-body text-grey text-xs uppercase tracking-wider mb-1">Email</p>
                    <a href={`mailto:${EMAIL}`} className="font-heading font-semibold text-navy text-sm hover:text-orange transition-colors break-all">
                      {EMAIL}
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-navy/5">
                  <p className="font-body text-grey text-xs uppercase tracking-wider mb-2">Working Hours</p>
                  <p className="font-body text-navy/70 text-sm">Monday – Saturday: 9:00 AM – 6:00 PM</p>
                  <p className="font-body text-navy/70 text-sm">Sunday: Closed</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-navy">
          <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-heading font-black text-white text-2xl sm:text-3xl leading-tight mb-2">
                Let's Build Something Together
              </h2>
              <p className="font-body text-white/60 text-sm">
                Tell us about your packaging requirements — we'll get back to you within 24 hours.
              </p>
            </div>
            <Link
              to="/#contact"
              className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-3.5 bg-orange hover:bg-orange-light text-white font-heading font-semibold text-sm rounded-full transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(232,130,26,0.4)] whitespace-nowrap no-underline"
            >
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

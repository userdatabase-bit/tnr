import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import Navbar from '../components/Navbar';
import { COMPANY_NAME, SITE_URL, SERVICES_GST_NUMBER } from '../constants';
import { 
  Globe, Search, BarChart3, Target, Share2, Mail,
  ArrowRight, CheckCircle, TrendingUp, Users, Eye, Zap,
  ChevronRight, FileText
} from 'lucide-react';

// ── Animation variants ────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

// ── Data ──────────────────────────────────────────────────────────────────────

const SUB_SERVICES = [
  {
    icon: Search, title: 'SEO & SEM',
    desc: 'Search engine optimization and paid search marketing to improve visibility, drive organic traffic, and maximize ROI from search campaigns.',
    features: ['Keyword Research', 'On-Page SEO', 'Technical SEO', 'Google Ads Management'],
  },
  {
    icon: Share2, title: 'Social Media Marketing',
    desc: 'Strategic social media management across platforms — content creation, community management, paid social, and influencer partnerships.',
    features: ['Platform Strategy', 'Content Creation', 'Community Management', 'Paid Social'],
  },
  {
    icon: Target, title: 'PPC & Paid Advertising',
    desc: 'Targeted pay-per-click campaigns across Google, Bing, and social platforms with detailed audience segmentation and A/B testing.',
    features: ['Google Ads', 'Bing Ads', 'Display Networks', 'Retargeting'],
  },
  {
    icon: FileText, title: 'Content Marketing',
    desc: 'High-quality content that educates, engages, and converts — from blog posts and whitepapers to videos and infographics.',
    features: ['Blog & Articles', 'Whitepapers', 'Video Content', 'Infographics'],
  },
  {
    icon: BarChart3, title: 'Analytics & Reporting',
    desc: 'Data-driven insights with custom dashboards, monthly performance reviews, and actionable recommendations for continuous improvement.',
    features: ['Custom Dashboards', 'Monthly Reports', 'Conversion Tracking', 'ROI Analysis'],
  },
  {
    icon: Mail, title: 'Email & Automation',
    desc: 'Automated email marketing campaigns with lead nurturing, behavioral triggers, and detailed performance analytics.',
    features: ['Campaign Setup', 'Lead Nurturing', 'A/B Testing', 'Automation Workflows'],
  },
];

const HOW_WE_WORK = [
  { step: '01', title: 'Discovery & Audit', desc: 'We analyze your current digital presence, competitors, and target audience to identify opportunities.' },
  { step: '02', title: 'Strategy Development', desc: 'We create a data-backed marketing roadmap with clear KPIs, timelines, and budget allocation.' },
  { step: '03', title: 'Execution & Optimization', desc: 'Our team deploys campaigns with continuous monitoring, testing, and real-time optimization.' },
  { step: '04', title: 'Reporting & Growth', desc: 'We provide transparent monthly reports and iterate strategies to drive sustained growth.' },
];

const STATS = [
  { value: '500+', label: 'Campaigns Executed' },
  { value: '50+', label: 'Happy Clients' },
  { value: '10+', label: 'Years Experience' },
  { value: '300%', label: 'Avg. ROI Generated' },
];

const WHY_CHOOSE = [
  { icon: Users, title: 'Experienced Team', desc: 'Certified professionals with 10+ years across industries.' },
  { icon: Eye, title: 'Transparent Reporting', desc: 'Real-time dashboards and monthly performance reviews.' },
  { icon: Zap, title: 'Data-Driven', desc: 'Every decision backed by data, every result measured against KPIs.' },
  { icon: TrendingUp, title: 'Proven ROI', desc: 'Our clients see an average of 3x return on their marketing investment.' },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DigitalMarketing() {
  const jsonLd = useMemo(
    () =>
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Digital Marketing Services',
        provider: { '@type': 'Organization', name: COMPANY_NAME },
        description: `Comprehensive digital marketing services by ${COMPANY_NAME} — SEO, SEM, social media marketing, PPC, content marketing, analytics, and email automation.`,
        areaServed: 'Delhi NCR, India',
      }),
    []
  );

  return (
    <>
      <Helmet>
        <title>Digital Marketing Services | {COMPANY_NAME}</title>
        <meta name="description" content={`Digital marketing services by ${COMPANY_NAME} in Delhi NCR — SEO, SEM, social media marketing, PPC, content marketing, analytics, and email automation.`} />
        <meta name="keywords" content="digital marketing, SEO, SEM, social media marketing, PPC, content marketing, email marketing, Delhi NCR" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/services/digital-marketing`} />
        <meta property="og:title" content={`Digital Marketing Services | ${COMPANY_NAME}`} />
        <meta property="og:description" content="Data-driven digital marketing strategies — SEO, SEM, social media, PPC, and content marketing." />
        <meta property="og:url" content={`${SITE_URL}/services/digital-marketing`} />
        <script type="application/ld+json">{jsonLd}</script>
      </Helmet>

      <Navbar scrolled />

      <div className="min-h-screen bg-offwhite">
        {/* ── Hero ── */}
        <section className="relative bg-navy overflow-hidden pt-28 pb-20 lg:pb-28">
          {/* Background image */}
          <div className="absolute inset-0 opacity-15">
            <img
              src="/images/services-digital-marketing.jpg"
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              width={1920}
              height={1080}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-cyan-500/15" />

          <div className="relative max-w-7xl mx-auto px-6">
            <nav className="flex items-center gap-2 text-white/50 text-sm mb-8">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} />
              <Link to="/services" className="hover:text-white transition-colors">Services</Link>
              <ChevronRight size={14} />
              <span className="text-white/80" aria-current="page">Digital Marketing</span>
            </nav>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6">
                <Globe className="w-8 h-8" />
              </div>
              <span className="inline-block px-4 py-1.5 bg-cyan-500/20 text-cyan-400 font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">
                DIGITAL MARKETING
              </span>
              <h1 className="font-heading font-black text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mb-5">
                Data-Driven{' '}
                <span className="text-cyan-400">Digital Marketing</span>
              </h1>
              <p className="font-body text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed">
                From SEO and PPC to social media and content marketing — we craft data-backed strategies that 
                drive measurable results, generate qualified leads, and maximize your marketing ROI.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="relative -mt-8 z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/20 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-white px-6 py-5 text-center">
                  <p className="font-heading font-black text-2xl sm:text-3xl text-cyan-500 leading-none mb-1">{stat.value}</p>
                  <p className="font-body text-xs text-navy/50 font-medium tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Sub-Services ── */}
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-cyan-500/10 text-cyan-600 font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">WHAT WE OFFER</span>
              <h2 className="font-heading font-black text-navy text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Our{' '}
                <span className="text-cyan-500">Services</span>
              </h2>
              <p className="font-body text-grey-dark text-base mt-4 max-w-2xl mx-auto leading-relaxed">
                End-to-end digital marketing solutions tailored to your business goals and target audience.
              </p>
            </motion.div>

            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
              {SUB_SERVICES.map((svc) => {
                const Icon = svc.icon;
                return (
                  <motion.div key={svc.title} variants={fadeUpVariants} className="group bg-white rounded-2xl border border-navy/5 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                    <div className="relative h-36 bg-gradient-to-br from-cyan-500/5 to-cyan-500/10 flex items-center justify-center overflow-hidden">
                      <img
                        src={svc.title.includes('SEO') ? '/images/dm-seo.jpg' : svc.title.includes('Social') ? '/images/dm-social.jpg' : '/images/services-digital-marketing.jpg'}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-40 transition-opacity duration-500"
                        loading="lazy"
                        decoding="async"
                        width={400}
                        height={144}
                      />
                      <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/90 text-cyan-500 flex items-center justify-center shadow-lg backdrop-blur-sm transition-transform group-hover:scale-110 group-hover:-rotate-3">
                        <Icon className="w-7 h-7" />
                      </div>
                    </div>
                    <div className="p-6">
                    <h3 className="font-heading font-bold text-navy text-lg mb-3">{svc.title}</h3>
                    <p className="font-body text-grey-dark text-sm leading-relaxed mb-4">{svc.desc}</p>
                    <div className="space-y-2">
                      {svc.features.map((f) => (
                        <div key={f} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" />
                          <span className="font-body text-navy/60 text-xs">{f}</span>
                        </div>
                      ))}
                    </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── How We Work ── */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-cyan-500/10 text-cyan-600 font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">HOW WE WORK</span>
              <h2 className="font-heading font-black text-navy text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Our{' '}
                <span className="text-cyan-500">Process</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-cyan-500/40 via-navy/20 to-cyan-500/40" />
              {HOW_WE_WORK.map((step, i) => (
                <motion.div key={step.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center">
                  <div className="w-24 h-24 rounded-2xl bg-cyan-500 flex items-center justify-center mx-auto mb-5 shadow-xl relative z-10">
                    <span className="font-heading font-black text-white text-2xl">{step.step}</span>
                  </div>
                  <h3 className="font-heading font-bold text-navy text-lg mb-2">{step.title}</h3>
                  <p className="font-body text-grey-dark text-sm leading-relaxed max-w-[240px] mx-auto">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section className="py-20 lg:py-28 bg-offwhite">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-cyan-500/10 text-cyan-600 font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">WHY CHOOSE US</span>
              <h2 className="font-heading font-black text-navy text-3xl sm:text-4xl lg:text-5xl leading-tight">
                What Sets Us{' '}
                <span className="text-cyan-500">Apart</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_CHOOSE.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center p-6 bg-white rounded-2xl border border-navy/5 hover:shadow-lg transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-heading font-bold text-navy text-base mb-2">{item.title}</h3>
                    <p className="font-body text-grey-dark text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 lg:py-28 bg-navy">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-heading font-black text-white text-3xl sm:text-4xl lg:text-5xl leading-tight mb-5">
                Ready to Grow Your{' '}
                <span className="text-cyan-400">Online Presence?</span>
              </h2>
              <p className="font-body text-white/60 text-base max-w-2xl mx-auto leading-relaxed mb-10">
                Get a free digital marketing audit and consultation. We'll show you exactly where you can improve and what ROI to expect.
              </p>
              <Link to="/#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-heading font-bold text-base rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                Get Your Free Audit
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── GST Information ── */}
        <section className="bg-navy/80 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3"
            >
              <span className="font-body text-white/30 text-xs font-medium">Services GST:</span>
              <span className="font-heading font-bold text-cyan-400 text-sm tracking-wider">
                {SERVICES_GST_NUMBER}
              </span>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

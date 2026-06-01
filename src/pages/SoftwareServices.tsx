import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import Navbar from '../components/Navbar';
import { COMPANY_NAME, SITE_URL, SERVICES_GST_NUMBER } from '../constants';
import { 
  Code, Smartphone, Database, Cpu, Palette, Cloud,
  ArrowRight, CheckCircle, Layers, Users, Shield, Zap,
  ChevronRight
} from 'lucide-react';

// ── Animation variants ────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// ── Data ──────────────────────────────────────────────────────────────────────

const SUB_SERVICES = [
  {
    icon: Smartphone, title: 'Custom Web & Mobile Apps',
    desc: 'Cross-platform applications built with modern frameworks — React, Next.js, Flutter, and React Native for seamless user experiences.',
    features: ['React & Next.js', 'Flutter & React Native', 'Progressive Web Apps', 'API-First Architecture'],
  },
  {
    icon: Database, title: 'ERP & CRM Solutions',
    desc: 'Customized enterprise resource planning and customer relationship management platforms tailored to your business workflows.',
    features: ['Custom ERP', 'CRM Platforms', 'Inventory Management', 'Sales Automation'],
  },
  {
    icon: Cpu, title: 'AI-Powered Automation',
    desc: 'Intelligent automation solutions using machine learning, RPA, and chatbots to streamline operations and reduce costs.',
    features: ['Machine Learning', 'RPA', 'Intelligent Chatbots', 'Predictive Analytics'],
  },
  {
    icon: Code, title: 'API Integrations & Middleware',
    desc: 'Connect your entire technology stack with robust APIs and middleware solutions for seamless data flow and interoperability.',
    features: ['REST & GraphQL APIs', 'Middleware Solutions', 'System Integration', 'Data Synchronization'],
  },
  {
    icon: Palette, title: 'UI/UX Design & Prototyping',
    desc: 'User-centered design processes with rapid prototyping, usability testing, and pixel-perfect interfaces that delight users.',
    features: ['User Research', 'Wireframing', 'Interactive Prototypes', 'Usability Testing'],
  },
  {
    icon: Cloud, title: 'DevOps & Cloud Deployment',
    desc: 'Continuous integration and deployment pipelines with Kubernetes, Docker, and AWS for reliable, scalable infrastructure.',
    features: ['CI/CD Pipelines', 'Kubernetes', 'Docker', 'AWS Infrastructure'],
  },
];

const HOW_WE_WORK = [
  { step: '01', title: 'Discovery & Planning', desc: 'We understand your business requirements, define scope, and create a detailed project roadmap.' },
  { step: '02', title: 'Design & Prototype', desc: 'Our designers create interactive prototypes and gather feedback before development begins.' },
  { step: '03', title: 'Agile Development', desc: 'We build your solution in iterative sprints with continuous testing and stakeholder reviews.' },
  { step: '04', title: 'Deployment & Support', desc: 'We deploy, monitor, and provide ongoing support with regular updates and maintenance.' },
];

const STATS = [
  { value: '200+', label: 'Projects Delivered' },
  { value: '50+', label: 'Happy Clients' },
  { value: '10+', label: 'Years Engineering' },
  { value: '98%', label: 'On-Time Delivery' },
];

const WHY_CHOOSE = [
  { icon: Layers, title: 'Full Ownership', desc: 'We take end-to-end ownership — from ideation to deployment and beyond.' },
  { icon: Shield, title: 'Quality-First', desc: 'Rigorous testing, code reviews, and QA processes ensure enterprise-grade quality.' },
  { icon: Users, title: 'Expert Team', desc: 'Senior engineers with 10+ years of experience across modern tech stacks.' },
  { icon: Zap, title: 'Scalable Architecture', desc: 'Solutions built to grow with your business — from MVP to enterprise scale.' },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SoftwareServices() {
  const jsonLd = useMemo(
    () =>
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Software Development Services',
        provider: { '@type': 'Organization', name: COMPANY_NAME },
        description: `Software development services by ${COMPANY_NAME} — custom web & mobile apps, ERP/CRM solutions, AI automation, API integrations, UI/UX design, and DevOps.`,
        areaServed: 'Delhi NCR, India',
      }),
    []
  );

  return (
    <>
      <Helmet>
        <title>Software Services | {COMPANY_NAME}</title>
        <meta name="description" content={`Software development services by ${COMPANY_NAME} — custom web & mobile apps, ERP/CRM, AI automation, API integrations, UI/UX design, and DevOps in Delhi NCR.`} />
        <meta name="keywords" content="software development, web development, mobile apps, ERP, CRM, AI automation, API integration, UI/UX design, DevOps, Delhi NCR" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/services/software-services`} />
        <meta property="og:title" content={`Software Services | ${COMPANY_NAME}`} />
        <meta property="og:description" content="Custom software development — web & mobile apps, ERP/CRM, AI, API integrations, UI/UX, and DevOps." />
        <meta property="og:url" content={`${SITE_URL}/services/software-services`} />
        <script type="application/ld+json">{jsonLd}</script>
      </Helmet>

      <Navbar scrolled />

      <div className="min-h-screen bg-offwhite">
        {/* ── Hero ── */}
        <section className="relative bg-navy overflow-hidden pt-28 pb-20 lg:pb-28">
          {/* Background image */}
          <div className="absolute inset-0 opacity-15">
            <img
              src="/images/services-software.jpg"
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              width={1920}
              height={1080}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-emerald-500/15" />

          <div className="relative max-w-7xl mx-auto px-6">
            <nav className="flex items-center gap-2 text-white/50 text-sm mb-8">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} />
              <Link to="/services" className="hover:text-white transition-colors">Services</Link>
              <ChevronRight size={14} />
              <span className="text-white/80" aria-current="page">Software Services</span>
            </nav>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                <Code className="w-8 h-8" />
              </div>
              <span className="inline-block px-4 py-1.5 bg-emerald-500/20 text-emerald-400 font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">
                SOFTWARE DEVELOPMENT
              </span>
              <h1 className="font-heading font-black text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mb-5">
                Custom{' '}
                <span className="text-emerald-400">Software</span>{' '}
                Solutions
              </h1>
              <p className="font-body text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed">
                From AI-powered automation and custom web/mobile apps to full-scale ERP platforms — we design, 
                develop, and deploy solutions that streamline operations, enhance experiences, and drive growth.
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
                  <p className="font-heading font-black text-2xl sm:text-3xl text-emerald-500 leading-none mb-1">{stat.value}</p>
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
              <span className="inline-block px-4 py-1.5 bg-emerald-500/10 text-emerald-600 font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">WHAT WE OFFER</span>
              <h2 className="font-heading font-black text-navy text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Our{' '}
                <span className="text-emerald-500">Services</span>
              </h2>
              <p className="font-body text-grey-dark text-base mt-4 max-w-2xl mx-auto leading-relaxed">
                Full-cycle software development from concept to deployment and beyond.
              </p>
            </motion.div>

            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
              {SUB_SERVICES.map((svc) => {
                const Icon = svc.icon;
                return (
                  <motion.div key={svc.title} variants={fadeUpVariants} className="group bg-white rounded-2xl border border-navy/5 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                    <div className="relative h-36 bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 flex items-center justify-center overflow-hidden">
                      <img
                        src={svc.title.includes('API') || svc.title.includes('DevOps') ? '/images/sw-code.jpg' : '/images/services-software.jpg'}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-40 transition-opacity duration-500"
                        loading="lazy"
                        decoding="async"
                        width={400}
                        height={144}
                      />
                      <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/90 text-emerald-500 flex items-center justify-center shadow-lg backdrop-blur-sm transition-transform group-hover:scale-110 group-hover:-rotate-3">
                        <Icon className="w-7 h-7" />
                      </div>
                    </div>
                    <div className="p-6">
                    <h3 className="font-heading font-bold text-navy text-lg mb-3">{svc.title}</h3>
                    <p className="font-body text-grey-dark text-sm leading-relaxed mb-4">{svc.desc}</p>
                    <div className="space-y-2">
                      {svc.features.map((f) => (
                        <div key={f} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
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
              <span className="inline-block px-4 py-1.5 bg-emerald-500/10 text-emerald-600 font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">HOW WE WORK</span>
              <h2 className="font-heading font-black text-navy text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Our{' '}
                <span className="text-emerald-500">Process</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-emerald-500/40 via-navy/20 to-emerald-500/40" />
              {HOW_WE_WORK.map((step, i) => (
                <motion.div key={step.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center">
                  <div className="w-24 h-24 rounded-2xl bg-emerald-500 flex items-center justify-center mx-auto mb-5 shadow-xl relative z-10">
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
              <span className="inline-block px-4 py-1.5 bg-emerald-500/10 text-emerald-600 font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">WHY CHOOSE US</span>
              <h2 className="font-heading font-black text-navy text-3xl sm:text-4xl lg:text-5xl leading-tight">
                What Sets Us{' '}
                <span className="text-emerald-500">Apart</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_CHOOSE.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center p-6 bg-white rounded-2xl border border-navy/5 hover:shadow-lg transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-4">
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
                Have a Project in{' '}
                <span className="text-emerald-400">Mind?</span>
              </h2>
              <p className="font-body text-white/60 text-base max-w-2xl mx-auto leading-relaxed mb-10">
                Get a free consultation and project estimate. We'll help you choose the right technology stack and architecture for your needs.
              </p>
              <Link to="/#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-heading font-bold text-base rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(5,150,105,0.4)]">
                Start Your Project
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
              <span className="font-heading font-bold text-emerald-400 text-sm tracking-wider">
                {SERVICES_GST_NUMBER}
              </span>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

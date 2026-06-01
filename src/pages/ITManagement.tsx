import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import Navbar from '../components/Navbar';
import { COMPANY_NAME, SITE_URL, SERVICES_GST_NUMBER } from '../constants';
import { 
  Monitor, Cloud, Shield, Wifi, HeadphonesIcon, Server, 
  ArrowRight, CheckCircle, Clock, Users, Lock, Activity,
  ChevronRight
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
    icon: Cloud, title: 'Cloud Infrastructure',
    desc: 'AWS and Azure architecture design, migration, and management — scalable, secure, and cost-optimized cloud environments.',
    features: ['AWS/Azure Architecture', 'Cloud Migration', 'Cost Optimization', 'Auto Scaling'],
  },
  {
    icon: Shield, title: 'Cybersecurity',
    desc: 'Comprehensive security solutions including penetration testing, SIEM implementation, endpoint protection, and incident response.',
    features: ['Penetration Testing', 'SIEM Implementation', 'Endpoint Protection', 'Incident Response'],
  },
  {
    icon: Wifi, title: 'Network Optimization',
    desc: 'SD-WAN, VPN, and structured cabling solutions designed for maximum performance, reliability, and security.',
    features: ['SD-WAN Deployment', 'VPN Solutions', 'Structured Cabling', 'Bandwidth Management'],
  },
  {
    icon: HeadphonesIcon, title: '24/7 Support & Monitoring',
    desc: 'Round-the-clock NOC services with sub-15-minute incident response times and proactive system monitoring.',
    features: ['NOC Services', '<15 min Response', 'Proactive Monitoring', 'Help Desk Support'],
  },
  {
    icon: Server, title: 'Disaster Recovery',
    desc: 'Comprehensive backup strategies and business continuity planning to ensure minimal downtime and data loss.',
    features: ['Backup Strategies', 'BCP Planning', 'Failover Systems', 'Data Replication'],
  },
  {
    icon: Lock, title: 'IT Audit & Compliance',
    desc: 'ISO readiness assessments, gap analysis, and remediation planning to meet industry standards and regulations.',
    features: ['ISO Readiness', 'Gap Analysis', 'Compliance Audits', 'Remediation Planning'],
  },
];

const HOW_WE_WORK = [
  { step: '01', title: 'Assessment & Planning', desc: 'We evaluate your current IT infrastructure, identify gaps, and create a comprehensive roadmap.' },
  { step: '02', title: 'Implementation', desc: 'Our certified engineers deploy solutions with minimal disruption to your operations.' },
  { step: '03', title: 'Monitoring & Support', desc: '24/7 proactive monitoring with automated alerts and rapid incident response.' },
  { step: '04', title: 'Optimization & Growth', desc: 'Continuous performance optimization, regular audits, and scalable growth planning.' },
];

const STATS = [
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '15min', label: 'Response Time' },
  { value: '200+', label: 'Projects Delivered' },
  { value: '24/7', label: 'NOC Coverage' },
];

const WHY_CHOOSE = [
  { icon: Clock, title: '99.9% Uptime', desc: 'Enterprise-grade SLA guarantees your systems stay online and performant.' },
  { icon: Shield, title: 'Enterprise Security', desc: 'Multi-layered security with ISO compliance and 24/7 threat monitoring.' },
  { icon: Users, title: 'Expert Team', desc: 'Certified engineers with deep expertise across cloud, network, and security.' },
  { icon: Activity, title: 'Proactive Approach', desc: 'We identify and resolve issues before they impact your business operations.' },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ITManagement() {
  const jsonLd = useMemo(
    () =>
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'IT Management Services',
        provider: { '@type': 'Organization', name: COMPANY_NAME },
        description: `IT infrastructure management services by ${COMPANY_NAME} — cloud infrastructure, cybersecurity, network optimization, 24/7 support, disaster recovery, and IT audit & compliance.`,
        areaServed: 'Delhi NCR, India',
      }),
    []
  );

  return (
    <>
      <Helmet>
        <title>IT Management Services | {COMPANY_NAME}</title>
        <meta name="description" content={`IT management services by ${COMPANY_NAME} — cloud infrastructure, cybersecurity, network optimization, 24/7 support, disaster recovery, and IT audit & compliance in Delhi NCR.`} />
        <meta name="keywords" content="IT management, cloud infrastructure, cybersecurity, network optimization, IT support, disaster recovery, IT audit, Delhi NCR" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/services/it-management`} />
        <meta property="og:title" content={`IT Management Services | ${COMPANY_NAME}`} />
        <meta property="og:description" content="Enterprise-grade IT infrastructure management — cloud, cybersecurity, network, and 24/7 support." />
        <meta property="og:url" content={`${SITE_URL}/services/it-management`} />
        <script type="application/ld+json">{jsonLd}</script>
      </Helmet>

      <Navbar scrolled />

      <div className="min-h-screen bg-offwhite">
        {/* ── Hero ── */}
        <section className="relative bg-navy overflow-hidden pt-28 pb-20 lg:pb-28">
          {/* Background image */}
          <div className="absolute inset-0 opacity-15">
            <img
              src="/images/services-it-management.jpg"
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              width={1920}
              height={1080}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-purple-500/15" />

          <div className="relative max-w-7xl mx-auto px-6">
            <nav className="flex items-center gap-2 text-white/50 text-sm mb-8">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} />
              <Link to="/services" className="hover:text-white transition-colors">Services</Link>
              <ChevronRight size={14} />
              <span className="text-white/80" aria-current="page">IT Management</span>
            </nav>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
                <Monitor className="w-8 h-8" />
              </div>
              <span className="inline-block px-4 py-1.5 bg-purple-500/20 text-purple-400 font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">
                IT MANAGEMENT
              </span>
              <h1 className="font-heading font-black text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mb-5">
                Enterprise IT{' '}
                <span className="text-purple-400">Management</span>
              </h1>
              <p className="font-body text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed">
                From cloud migration and cybersecurity to network optimization and 24/7 monitoring — we keep 
                your systems secure, reliable, and performing at their peak, so you can focus on your business.
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
                  <p className="font-heading font-black text-2xl sm:text-3xl text-purple-500 leading-none mb-1">{stat.value}</p>
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
              <span className="inline-block px-4 py-1.5 bg-purple-500/10 text-purple-600 font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">WHAT WE OFFER</span>
              <h2 className="font-heading font-black text-navy text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Our{' '}
                <span className="text-purple-500">Services</span>
              </h2>
              <p className="font-body text-grey-dark text-base mt-4 max-w-2xl mx-auto leading-relaxed">
                End-to-end IT management solutions designed for reliability, security, and scalability.
              </p>
            </motion.div>

            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
              {SUB_SERVICES.map((svc) => {
                const Icon = svc.icon;
                return (
                  <motion.div key={svc.title} variants={fadeUpVariants} className="group bg-white rounded-2xl border border-navy/5 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                    <div className="relative h-36 bg-gradient-to-br from-purple-500/5 to-purple-500/10 flex items-center justify-center overflow-hidden">
                      <img
                        src={svc.title.includes('Cloud') ? '/images/it-cloud.jpg' : svc.title.includes('Cyber') ? '/images/it-cyber.jpg' : '/images/services-it-management.jpg'}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-40 transition-opacity duration-500"
                        loading="lazy"
                        decoding="async"
                        width={400}
                        height={144}
                      />
                      <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/90 text-purple-500 flex items-center justify-center shadow-lg backdrop-blur-sm transition-transform group-hover:scale-110 group-hover:-rotate-3">
                        <Icon className="w-7 h-7" />
                      </div>
                    </div>
                    <div className="p-6">
                    <h3 className="font-heading font-bold text-navy text-lg mb-3">{svc.title}</h3>
                    <p className="font-body text-grey-dark text-sm leading-relaxed mb-4">{svc.desc}</p>
                    <div className="space-y-2">
                      {svc.features.map((f) => (
                        <div key={f} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
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
              <span className="inline-block px-4 py-1.5 bg-purple-500/10 text-purple-600 font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">HOW WE WORK</span>
              <h2 className="font-heading font-black text-navy text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Our{' '}
                <span className="text-purple-500">Process</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-purple-500/40 via-navy/20 to-purple-500/40" />
              {HOW_WE_WORK.map((step, i) => (
                <motion.div key={step.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center">
                  <div className="w-24 h-24 rounded-2xl bg-purple-500 flex items-center justify-center mx-auto mb-5 shadow-xl relative z-10">
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
              <span className="inline-block px-4 py-1.5 bg-purple-500/10 text-purple-600 font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">WHY CHOOSE US</span>
              <h2 className="font-heading font-black text-navy text-3xl sm:text-4xl lg:text-5xl leading-tight">
                What Sets Us{' '}
                <span className="text-purple-500">Apart</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_CHOOSE.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center p-6 bg-white rounded-2xl border border-navy/5 hover:shadow-lg transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center mx-auto mb-4">
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
                Ready to Secure &{' '}
                <span className="text-purple-400">Optimize</span> Your IT?
              </h2>
              <p className="font-body text-white/60 text-base max-w-2xl mx-auto leading-relaxed mb-10">
                Get a free IT infrastructure assessment. We'll identify vulnerabilities, performance bottlenecks, and cost-saving opportunities.
              </p>
              <Link to="/#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-heading font-bold text-base rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]">
                Get Your Free Assessment
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
              <span className="font-heading font-bold text-purple-400 text-sm tracking-wider">
                {SERVICES_GST_NUMBER}
              </span>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

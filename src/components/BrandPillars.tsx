import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useParallaxDrift } from '../hooks/useScrollAnimation';
import { ShieldCheck, Lightbulb, Handshake, Dumbbell } from 'lucide-react';

// ScrollTrigger registered once in main.tsx

const pillars = [
  {
    title: 'RELIABILITY',
    desc: 'We deliver every time',
    icon: ShieldCheck,
    bgGradient: 'from-orange/10 to-orange/5',
    borderColor: 'border-orange/20',
    iconBg: 'bg-orange',
    accentLine: 'from-orange to-orange-light',
  },
  {
    title: 'INNOVATION',
    desc: 'Digital meets expertise',
    icon: Lightbulb,
    bgGradient: 'from-navy/10 to-navy/5',
    borderColor: 'border-navy/20',
    iconBg: 'bg-navy',
    accentLine: 'from-navy to-navy-light',
  },
  {
    title: 'INTEGRITY',
    desc: 'Partnerships built on trust',
    icon: Handshake,
    bgGradient: 'from-kraft/10 to-kraft/5',
    borderColor: 'border-kraft/20',
    iconBg: 'bg-kraft',
    accentLine: 'from-kraft to-kraft-light',
  },
  {
    title: 'STRENGTH',
    desc: 'Industrial-grade solutions',
    icon: Dumbbell,
    bgGradient: 'from-orange/10 to-orange/5',
    borderColor: 'border-orange/20',
    iconBg: 'bg-orange',
    accentLine: 'from-orange to-orange-light',
  },
];

export default function BrandPillars() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const driftRef1 = useParallaxDrift(0.15, 0.1);
  const driftRef2 = useParallaxDrift(-0.1, 0.15);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-40 bg-white overflow-hidden"
    >
      {/* Parallax decorative shapes */}
      <div ref={driftRef1} className="absolute top-32 right-16 w-24 h-24 border-2 border-navy/5 rounded-2xl rotate-12 hidden lg:block" />
      <div ref={driftRef2} className="absolute bottom-24 left-12 w-20 h-20 border-2 border-orange/10 rounded-full hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-navy/10 text-navy font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">
            WHY TNR
          </span>

          <h2 className="font-heading font-black text-navy text-4xl sm:text-5xl lg:text-6xl leading-tight">
            Our Brand <span className="text-orange">Pillars</span>
          </h2>
        </div>

        {/* Pillar Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                className="pillar-card group relative p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 cursor-default overflow-hidden border"
                style={{
                  background: `linear-gradient(135deg, ${pillar.iconBg === 'bg-orange' ? 'rgba(232,130,26,0.08)' : pillar.iconBg === 'bg-navy' ? 'rgba(27,42,94,0.08)' : 'rgba(184,135,74,0.08)'}, transparent)`,
                  borderColor: pillar.iconBg === 'bg-orange' ? 'rgba(232,130,26,0.2)' : pillar.iconBg === 'bg-navy' ? 'rgba(27,42,94,0.2)' : 'rgba(184,135,74,0.2)',
                }}
              >
                {/* Background number */}
                <div className="absolute -top-4 -right-2 font-heading font-black text-8xl opacity-[0.04] text-navy select-none">
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 ${pillar.iconBg} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="font-heading font-extrabold text-navy text-lg tracking-wider mb-3">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="font-body text-grey-dark text-sm leading-relaxed">
                  {pillar.desc}
                </p>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${pillar.accentLine} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

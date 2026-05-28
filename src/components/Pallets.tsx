import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap, ScrollTrigger } from '../hooks/useScrollAnimation';
import { Package, Layers, Shield, ArrowRight } from 'lucide-react';

// ScrollTrigger registered once in main.tsx

const palletTypes = [
  {
    title: 'Press Wood',
    desc: 'Lightweight, nestable design saves storage space. Engineered from compressed wood chips for consistent quality and ISPM-15 compliance.',
    icon: Layers,
    gradient: 'from-kraft to-kraft-dark',
    image: '/images/pallets.jpg',
    stats: ['Nestable', 'ISPM-15', 'Up to 1000kg'],
  },
  {
    title: 'Timber',
    desc: 'Heavy-duty solid timber construction. Stackable up to 4 high with load capacities exceeding 1500kg. The industry standard for reliability.',
    icon: Package,
    gradient: 'from-navy to-navy-light',
    image: '/images/wooden-box.jpg',
    stats: ['Stackable', '1500kg+', '4-Way Entry'],
  },
  {
    title: 'Edge Protectors',
    desc: 'Precision-cut corner protection for palletized goods. Prevents strap damage and load shifting during transit. Multiple sizes available.',
    icon: Shield,
    gradient: 'from-orange to-orange-dark',
    image: '/images/corrugated-boxes.jpg',
    stats: ['Multi-Size', 'Strap Guard', 'Load Secure'],
  },
];

export default function Pallets() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isMobile || !trackRef.current || !sectionRef.current) return;

    const track = trackRef.current;
    const lastCard = track.lastElementChild as HTMLElement;
    const totalScroll = Math.max(0, lastCard.offsetLeft + lastCard.offsetWidth - window.innerWidth);

    const startBuffer = 0.25; // 25% wait at start
    const endBuffer = 0.35;   // 35% wait at end (extra pause before unpin)
    const scrollRatio = 1 - startBuffer - endBuffer; // 40% for actual scroll

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalScroll / scrollRatio}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const adjustedProgress = Math.max(0, Math.min(1, (self.progress - startBuffer) / scrollRatio));
            const index = Math.min(
              Math.floor(adjustedProgress * palletTypes.length),
              palletTypes.length - 1
            );
            setActiveIndex(index);
            setScrollProgress(self.progress);
          },
        },
      });

      // Phase 1: Wait at start — no movement
      tl.to(track, { x: 0, duration: startBuffer, ease: 'none' });

      // Phase 2: Scroll through cards — actual horizontal movement
      tl.to(track, { x: -totalScroll, duration: scrollRatio, ease: 'none' });

      // Phase 3: Wait at end — hold position before unpin
      tl.to(track, { x: -totalScroll, duration: endBuffer, ease: 'none' });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  // ── Mobile: render cards as vertical stack ──
  if (isMobile) {
    return (
      <section
        id="pallets"
        className="relative bg-navy-dark overflow-hidden py-24"
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(/images/warehouse-bg.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy-dark/90 to-navy-dark" />

        {/* Header */}
        <div className="relative z-10 px-6 mb-10">
          <div className="max-w-7xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-orange/20 text-orange font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-4">
              PALLET SOLUTIONS
            </span>
            <h2 className="font-heading font-black text-white text-4xl leading-tight mt-4">
              Built to <span className="text-orange">Carry</span> the Load
            </h2>
          </div>
        </div>

        {/* Vertical card stack */}
        <div className="relative z-10 px-6 space-y-6">
          {palletTypes.map((pallet, i) => {
            const Icon = pallet.icon;
            return (
              <div
                key={pallet.title}
                className="bg-navy/40 border border-white/10 rounded-2xl overflow-hidden group"
              >
                <img
                  src={pallet.image}
                  alt={pallet.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-48 object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                />
                <div className="p-5">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${pallet.gradient} mb-4 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-white text-2xl mb-2">{pallet.title}</h3>
                  <p className="font-body text-white/60 text-sm leading-relaxed mb-4">{pallet.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pallet.stats.map((stat) => (
                      <span
                        key={stat}
                        className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-white/80 text-xs font-heading font-semibold"
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-orange font-heading font-semibold text-sm"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section
      id="pallets"
      ref={sectionRef}
      className="relative bg-navy-dark overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* Background warehouse image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(/images/warehouse-bg.jpg)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy-dark/90 to-navy-dark" />

      {/* Section Header */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-28 pb-8 px-6 bg-gradient-to-b from-navy-dark via-navy-dark/95 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-orange/20 text-orange font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-4"
          >
            PALLET SOLUTIONS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-black text-white text-4xl sm:text-5xl lg:text-6xl leading-tight"
          >
            Built to <span className="text-orange">Carry</span> the Load
          </motion.h2>

        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={trackRef}
        className="flex items-center pt-64 sm:pt-64 lg:pt-72 pb-16 px-6 lg:px-12"
        style={{ width: `${palletTypes.length * 80 + 10}vw` }}
      >
        {palletTypes.map((pallet, i) => {
          const Icon = pallet.icon;
          return (
            <div
              key={pallet.title}
              className="flex-shrink-0 w-[70vw] md:w-[50vw] lg:w-[35vw] mr-8 lg:mr-16"
            >
              <div className="relative h-[55vh] min-h-[380px] rounded-3xl overflow-hidden group cursor-pointer">
                {/* Background Image */}
                <img
                  src={pallet.image}
                  alt={pallet.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Multi-layer overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/50 to-navy-dark/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${pallet.gradient} mb-5 shadow-xl`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="font-heading font-bold text-white text-3xl md:text-4xl mb-3 group-hover:text-orange transition-colors">
                    {pallet.title}
                  </h3>
                  <p className="font-body text-white/60 text-sm md:text-base max-w-md leading-relaxed mb-6">
                    {pallet.desc}
                  </p>

                  {/* Stats pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {pallet.stats.map((stat) => (
                      <span
                        key={stat}
                        className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-white/80 text-xs font-heading font-semibold backdrop-blur-sm"
                      >
                        {stat}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-orange font-heading font-semibold text-sm group-hover:gap-3 transition-all"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                {/* Card border glow on hover */}
                <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-orange/30 transition-colors duration-500" />

                {/* Number indicator */}
                <div className="absolute top-6 right-6 font-heading font-black text-6xl text-white/[0.06] select-none">
                  0{i + 1}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {palletTypes.map((_, i) => (
          <div key={i} className="w-8 sm:w-10 h-1 bg-white/10 rounded-full overflow-hidden transition-all duration-300 hover:scale-y-125">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                i === activeIndex
                  ? 'bg-orange w-full'
                  : i < activeIndex
                    ? 'bg-orange/40 w-full'
                    : 'bg-white/20 w-1/4'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Subtle horizontal scrollbar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-1.5 bg-gradient-to-t from-white/[0.02] to-transparent">
        <div className="max-w-7xl mx-auto relative h-full">
          <div className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange/30 to-orange/60"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

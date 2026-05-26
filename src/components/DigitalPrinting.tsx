import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap, ScrollTrigger } from '../hooks/useScrollAnimation';
import { Printer, Zap, Box, Palette } from 'lucide-react';

// ScrollTrigger registered once in main.tsx

const features = [
  { icon: Zap, label: 'No plate charges', desc: 'Direct-to-print saves setup costs' },
  { icon: Box, label: 'Small runs', desc: 'From 50 to 50,000 units' },
  { icon: Palette, label: 'Custom designs', desc: 'Full CMYK + Pantone matching' },
];

export default function DigitalPrinting() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const printerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const conveyorRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'center center',
          scrub: 1,
        },
      });

      // Power on animation
      tl.fromTo(
        '.printer-light',
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.3 }
      );

      // Conveyor movement
      tl.fromTo(
        conveyorRef.current,
        { x: -20 },
        { x: 0, duration: 0.3 },
        '-=0.1'
      );

      // Box emerges
      tl.fromTo(
        boxRef.current,
        { x: -80, opacity: 0, scale: 0.8 },
        { x: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.4)' },
        '-=0.1'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="printing"
      ref={sectionRef}
      className="relative py-24 md:py-40 bg-offwhite overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-orange/10 text-orange font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6"
          >
            DIGITAL PRINTING
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading font-black text-navy text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6"
          >
            Digital Printing.{' '}
            <span className="text-orange">Limitless</span> Customization.
          </motion.h2>
        </div>

        {/* Printer Visualization */}
        <div className="relative max-w-4xl mx-auto mb-20">
          {/* MacBook-style frame */}
          <div className="relative bg-navy rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            {/* Top bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-navy-dark/80 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-400/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
              <div className="w-3 h-3 rounded-full bg-green-400/60" />
              <span className="ml-3 text-white/30 text-xs font-body">TNR Digital Print Studio</span>
            </div>

            {/* Printer Scene */}
            <div className="relative p-8 md:p-12 min-h-[400px] bg-gradient-to-br from-navy-dark to-navy flex items-center justify-center">
              {/* Printer Machine */}
              <div ref={printerRef} className="relative">
                {/* Printer body */}
                <div className="relative w-64 md:w-80 h-48 md:h-56 bg-gradient-to-b from-grey/20 to-grey/10 rounded-xl border border-white/10">
                  {/* Power light */}
                  <div className="printer-light absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full shadow-[0_0_10px_rgba(74,222,128,0.6)]" />
                  {/* Status light */}
                  <div className="printer-light absolute top-4 right-10 w-3 h-3 bg-orange rounded-full shadow-[0_0_10px_rgba(232,130,26,0.6)]" style={{ animationDelay: '0.5s' }} />
                  
                  {/* Print head */}
                  <div className="absolute top-12 left-4 right-4 h-2 bg-white/10 rounded-full">
                    <motion.div
                      animate={isInView ? { x: [0, 200, 0] } : {}}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-8 h-2 bg-orange/60 rounded-full"
                    />
                  </div>

                  {/* TNR label on printer */}
                  <div className="absolute bottom-4 left-4 font-heading font-bold text-white/20 text-sm tracking-wider">
                    TNR DIGITAL
                  </div>
                </div>

                {/* Conveyor belt */}
                <div
                  ref={conveyorRef}
                  className="absolute -bottom-4 -left-8 -right-8 h-4 bg-grey/10 rounded-full border border-white/5"
                >
                  <div className="flex items-center h-full px-2 gap-3 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                      <div key={i} className="w-2 h-1 bg-white/10 rounded-full flex-shrink-0" />
                    ))}
                  </div>
                </div>

                {/* Printed box emerging */}
                <div
                  ref={boxRef}
                  className="absolute -bottom-16 -right-4 md:right-8 opacity-0"
                >
                  <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-kraft-light to-kraft rounded-lg border border-kraft-dark/30 shadow-xl">
                    {/* TNR print on box */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-heading font-black text-navy/40 text-xs md:text-sm">TNR</span>
                    </div>
                    {/* Print accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-orange/40 rounded-b-lg" />
                  </div>
                </div>
              </div>

              {/* Hotspot indicators */}
              {features.map((feature, i) => {
                const Icon = feature.icon;
                const positions = [
                  { top: '15%', left: '10%' },
                  { top: '60%', left: '5%' },
                  { top: '15%', right: '10%' },
                ];
                return (
                  <button
                    key={i}
                    onClick={() => setActiveHotspot(activeHotspot === i ? null : i)}
                    className="absolute z-10 group"
                    style={positions[i]}
                    aria-label={feature.label}
                  >
                    <div className="w-8 h-8 bg-orange/20 hover:bg-orange/40 rounded-full flex items-center justify-center transition-all border border-orange/30 hover:border-orange/60 hover:scale-110">
                      <Icon className="w-4 h-4 text-orange" />
                    </div>
                    {/* Pulse ring */}
                    <div className="absolute inset-0 rounded-full border border-orange/30 animate-pulse-ring" />
                    
                    {/* Tooltip */}
                    {activeHotspot === i && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white rounded-xl p-4 shadow-xl min-w-[200px] z-50"
                      >
                        <div className="font-heading font-bold text-navy text-sm mb-1">{feature.label}</div>
                        <div className="font-body text-grey-dark text-xs">{feature.desc}</div>
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* MacBook base */}
          <div className="mx-auto w-[120%] -mt-1 h-4 bg-gradient-to-b from-grey/30 to-grey/15 rounded-b-xl" />
          <div className="mx-auto w-[140%] h-2 bg-grey/10 rounded-b-lg" />
        </div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.label}
                className="flex items-center gap-2 px-5 py-3 bg-white rounded-full border border-navy/10 shadow-sm hover:border-orange/30 hover:shadow-md transition-all"
              >
                <Icon className="w-4 h-4 text-orange" />
                <span className="font-heading font-semibold text-navy text-sm">{feature.label}</span>
              </div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange hover:bg-orange-light text-white font-heading font-bold text-base rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(232,130,26,0.5)]"
          >
            See Capabilities
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap, ScrollTrigger } from '../hooks/useScrollAnimation';
import { useParallax, useParallaxDrift } from '../hooks/useScrollAnimation';
import { useCountUp } from '../hooks/useCountUp';

// ScrollTrigger registered once in main.tsx

function Stat({ end, suffix = '', prefix = '', label, separator = ',' }: {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  separator?: string;
}) {
  const { ref, value } = useCountUp({ end, suffix, prefix, separator, duration: 3000 });
  return (
    <div ref={ref} className="text-center px-4">
      <div className="font-heading font-black text-orange text-2xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 break-all">
        {value}
      </div>
      <div className="font-body text-white/70 text-sm md:text-base font-medium tracking-wider uppercase">
        {label}
      </div>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const driftRef = useParallaxDrift(0.15, -0.12);
  const glowRef = useParallax(0.15);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax reveal on stat items
      const statItems = sectionRef.current!.querySelectorAll('.stat-item');
      statItems.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 50 + i * 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'center center',
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-navy overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Parallax decorative elements */}
      <div ref={glowRef} className="absolute top-0 left-0 w-64 h-64 bg-orange/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div ref={driftRef} className="absolute top-20 right-16 w-16 h-16 border border-orange/10 rounded-xl rotate-45 hidden lg:block" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange/[0.03] rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading font-black text-white text-3xl sm:text-4xl lg:text-5xl">
            Numbers That <span className="text-orange">Speak</span>
          </h2>
          <p className="font-body text-white/50 text-base mt-4 max-w-lg mx-auto leading-relaxed">
            Over 15 years of manufacturing and supplying premium packaging solutions across Delhi NCR — the numbers tell the story.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          <div className="stat-item"><Stat end={1000000} suffix="+" label="Pallets" /></div>
          <div className="stat-item"><Stat end={48} suffix="hr" label="Delivery" separator="" /></div>
          <div className="stat-item"><Stat end={15} suffix="+" label="Years Experience" separator="" /></div>
        </div>
      </div>
    </section>
  );
}

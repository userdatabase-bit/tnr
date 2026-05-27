import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from '../hooks/useScrollAnimation';
import { useParallax, useParallaxDrift } from '../hooks/useScrollAnimation';
import { ArrowRight } from 'lucide-react';
// 1. Import the new dynamic 3D component
import { CorrugatedBox3D } from './CorrugatedBox3D'; 

const boxSizes = [
  { id: 'small', label: 'S', name: 'Small', dims: '200 × 150 × 100 mm' },
  { id: 'medium', label: 'M', name: 'Medium', dims: '300 × 200 × 200 mm' },
  { id: 'large', label: 'L', name: 'Large', dims: '400 × 300 × 300 mm' },
  { id: 'xlarge', label: 'XL', name: 'Extra Large', dims: '500 × 400 × 400 mm' },
];

const products = [
  { id: 'CB001', desc: 'Custom sizes — any dimension', icon: '📐' },
  { id: 'CB002', desc: 'Crash-lock base, fast assembly', icon: '⚡' },
  { id: 'CB003', desc: '100% recyclable & eco-friendly', icon: '♻️' },
];

export default function CorrugatedBoxes() {
  const [activeSize, setActiveSize] = useState<string>('medium');
  const sizeScale: Record<string, number> = {
    small: 0.70,
    medium: 0.85,
    large: 1.0,
    xlarge: 1.10,
  };
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useParallax(0.15);
  const driftRef = useParallaxDrift(-0.15, 0.1);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.corrugated-text',
        { y: 80, opacity: 0 },
        {
          y: -40,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'center center',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="corrugated"
      ref={sectionRef}
      className="relative py-24 md:py-40 bg-white overflow-hidden"
    >
      {/* Parallax background dots */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #1B2A5E 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Parallax decorative shapes */}
      <div ref={driftRef} className="absolute top-20 right-10 w-32 h-32 border-2 border-orange/10 rounded-full hidden lg:block" />
      <div ref={glowRef} className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange/[0.04] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: 3D Animated Box + Size Selector */}
          <div className="relative">
            {/* Size Selector */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6">
              {boxSizes.map((bs) => (
                <button
                  key={bs.id}
                  onClick={() => setActiveSize(bs.id)}
                  className={`relative flex flex-col items-center gap-0.5 sm:gap-1 px-2.5 sm:px-4 py-2 sm:py-3 rounded-xl font-heading font-bold text-sm transition-all duration-300 cursor-pointer select-none ${
                    activeSize === bs.id
                      ? 'bg-navy text-white shadow-lg shadow-navy/20 scale-105'
                      : 'bg-offwhite text-navy/60 border border-navy/10 hover:border-orange/30 hover:text-navy hover:bg-white'
                  }`}
                >
                  <span className="text-base sm:text-lg leading-none">{bs.label}</span>
                  <span className="text-[9px] sm:text-[10px] font-medium tracking-wide normal-case hidden sm:inline">{bs.name}</span>
                  {activeSize === bs.id && (
                    <motion.div
                      layoutId="sizeIndicator"
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-orange rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Active size dimensions */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSize}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="text-center mb-6"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-kraft/10 border border-kraft/20 rounded-full">
                  <span className="font-heading font-bold text-navy text-xs">{boxSizes.find(b => b.id === activeSize)?.name}</span>
                  <span className="w-px h-3 bg-navy/20" />
                  <span className="font-body text-grey-dark text-xs">{boxSizes.find(b => b.id === activeSize)?.dims}</span>
                </span>
              </motion.div>
            </AnimatePresence>

            {/* 3D Animated Box Integration */}
            <div className="relative flex items-center justify-center min-h-[260px] md:min-h-[400px]">
              {/* 2. Swapped old placeholder component out for the live interactive 3D box scene */}
              <CorrugatedBox3D activeScale={sizeScale[activeSize] ?? 1} />
              
              <div className="absolute w-80 h-80 sm:w-96 sm:h-96 bg-orange/5 rounded-full blur-3xl -z-10" />
              <div className="absolute w-48 h-48 bg-navy/5 rounded-full blur-2xl top-10 -left-10 -z-10" />
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="corrugated-text">
            <span className="inline-block px-4 py-1.5 bg-orange/10 text-orange font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">
              CORRUGATED PACKAGING
            </span>

            <h2 className="font-heading font-black text-navy text-4xl sm:text-5xl lg:text-6xl leading-tight mb-8">
              Fast Assembly.{' '}
              <span className="text-orange">Zero</span> Compromise.
            </h2>

            <div className="space-y-4 mb-8">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-offwhite/60 border border-navy/5 hover:border-orange/20 hover:shadow-lg transition-all group"
                >
                  <span className="text-2xl mt-0.5">{product.icon}</span>
                  <div>
                    <span className="font-heading font-bold text-navy text-sm">{product.id}</span>
                    <p className="font-body text-grey-dark text-sm mt-0.5">{product.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-orange font-heading font-semibold text-sm hover:gap-3 transition-all group"
            >
              Explore Corrugated Solutions
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
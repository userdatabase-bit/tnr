import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap } from '../hooks/useScrollAnimation';
import { useParallax, useParallaxDrift } from '../hooks/useScrollAnimation';
import { ArrowRight, Layers, Weight, Ruler } from 'lucide-react';
import WoodenPallet3D from './WoodenPallet3D';

const palletProducts = [
  { id: 'PP001', desc: 'Press Wood — Lightweight & nestable', icon: <Layers className="w-5 h-5 text-orange" /> },
  { id: 'PP002', desc: 'Timber — Heavy-duty, 1500kg+ capacity', icon: <Weight className="w-5 h-5 text-orange" /> },
  { id: 'PP003', desc: 'Custom sizes — Tailored to your load', icon: <Ruler className="w-5 h-5 text-orange" /> },
];

export default function WoodenPalletsPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const glowRef = useParallax(0.15);
  const driftRef = useParallaxDrift(-0.15, 0.1);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pallet-text',
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
      id="pallet-preview"
      ref={sectionRef}
      className="relative py-24 md:py-40 bg-offwhite overflow-hidden"
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
          {/* Left: 3D Animated Pallet */}
          <div className="relative">
            <div className="relative flex items-center justify-center min-h-[300px] md:min-h-[500px]">
              {/* 3D Animated Pallet */}
              <WoodenPallet3D size={200} />

              {/* Glow orbs behind pallet */}
              <div className="absolute w-80 h-80 sm:w-96 sm:h-96 bg-orange/5 rounded-full blur-3xl -z-10" />
              <div className="absolute w-48 h-48 bg-navy/5 rounded-full blur-2xl top-10 -left-10 -z-10" />
              <div className="absolute w-64 h-64 bg-kraft/5 rounded-full blur-2xl bottom-10 -right-10 -z-10" />
            </div>


          </div>

          {/* Right: Text Content */}
          <div className="pallet-text">
            <span className="inline-block px-4 py-1.5 bg-orange/10 text-orange font-heading font-bold text-xs tracking-[0.2em] rounded-full mb-6">
              PALLET SOLUTIONS
            </span>

            <h2 className="font-heading font-black text-navy text-4xl sm:text-5xl lg:text-6xl leading-tight mb-8">
              Built to{' '}
              <span className="text-orange">Carry</span>{' '}
              the Load
            </h2>

            <div className="space-y-4 mb-8">
              {palletProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/60 border border-navy/5 hover:border-orange/20 hover:shadow-lg transition-all group"
                >
                  <span className="flex-shrink-0 mt-0.5 w-9 h-9 flex items-center justify-center rounded-lg bg-orange/10">
                    {product.icon}
                  </span>
                  <div>
                    <span className="font-heading font-bold text-navy text-sm">{product.id}</span>
                    <p className="font-body text-grey-dark text-sm mt-0.5">{product.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              to="/products/wooden-pallets"
              className="inline-flex items-center gap-2 text-orange font-heading font-semibold text-sm hover:gap-3 transition-all group"
            >
              Explore Pallet Solutions
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

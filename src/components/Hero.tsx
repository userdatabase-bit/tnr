import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import AnimatedBox from './AnimatedBox';
import { useParallaxDrift } from '../hooks/useScrollAnimation';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const cornerDrift1 = useParallaxDrift(0.08, 0.05);
  const cornerDrift2 = useParallaxDrift(-0.06, 0.08);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => {
      setVideoLoaded(true);
      video.play().catch(() => {
        // Autoplay blocked — try muted
        video.muted = true;
        video.play().catch(() => {
          setVideoError(true);
        });
      });
    };

    const onError = () => {
      setVideoError(true);
    };

    // If video data is already loaded
    if (video.readyState >= 3) {
      onCanPlay();
    } else {
      video.addEventListener('canplay', onCanPlay);
      video.addEventListener('error', onError);
    }

    return () => {
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('error', onError);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-28">
      {/* Background — video or poster fallback */}
      <div className="absolute inset-0 z-0">
        {/* Poster image always shown as base */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/images/warehouse-bg.jpg)` }}
        />

        {!videoError && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            width="1920"
            height="1080"
            poster="/images/warehouse-bg.jpg"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src="/videos/hero_video.mp4" type="video/mp4" />
          </video>
        )}

        {/* Gradient bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-navy-dark to-transparent" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating 3D Boxes — decorative */}
      <div className="absolute right-[5%] top-[18%] hidden xl:block z-[2] opacity-30">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 0.3, y: 0 }}
          transition={{ duration: 1.5, delay: 1.8 }}
        >
          <AnimatedBox size={0.45} className="animate-float" />
        </motion.div>
      </div>

      <div className="absolute left-[5%] bottom-[22%] hidden xl:block z-[2] opacity-20">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 0.2, y: 0 }}
          transition={{ duration: 1.5, delay: 2.2 }}
        >
          <AnimatedBox size={0.35} className="animate-float" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto" aria-labelledby="hero-heading">
        {/* Brand badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 bg-orange/20 border border-orange/30 text-orange font-heading font-bold text-xs tracking-[0.25em] rounded-full">
            PACKAGING &amp; PALLETS EXPERTS
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-heading font-black text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] mb-6"
        >
          Packaging that protects,
          <span className="text-orange"> presents,</span>
          <span className="block text-white">and performs.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-white/75 text-base sm:text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Custom wood, corrugated, pallet and digital-print packaging engineered for strength, brand impact and reliable delivery across India.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.8 }}
          className="grid gap-4 sm:grid-cols-3 mb-12 text-left"
        >
          {[
            'On-time dispatch for every order',
            'High-strength custom packaging',
            'Brand-ready digital printing'
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-3xl border border-white/10 bg-white/5 p-4">
              <CheckCircle className="w-5 h-5 text-orange mt-0.5" />
              <p className="font-body text-white/75 text-sm sm:text-base leading-snug">{item}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="group px-8 py-4 bg-orange hover:bg-orange-light text-white font-heading font-bold text-base rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(232,130,26,0.5)] flex items-center gap-2"
          >
            Request a Quote
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a
            href="#wooden"
            className="px-8 py-4 border-2 border-white/30 hover:border-white/60 text-white font-heading font-semibold text-base rounded-full transition-all duration-300 hover:bg-white/10 hover:scale-105"
          >
            Explore Services
          </a>
        </motion.div>
      </div>

      {/* Decorative corners — parallax drift */}
      <div ref={cornerDrift1} className="absolute top-24 left-8 w-20 h-20 border-l-2 border-t-2 border-orange/20 rounded-tl-lg z-[1]" />
      <div className="absolute top-24 right-8 w-20 h-20 border-r-2 border-t-2 border-orange/20 rounded-tr-lg z-[1]" />
      <div ref={cornerDrift2} className="absolute bottom-24 left-8 w-20 h-20 border-l-2 border-b-2 border-orange/20 rounded-bl-lg z-[1]" />
      <div className="absolute bottom-24 right-8 w-20 h-20 border-r-2 border-b-2 border-orange/20 rounded-br-lg z-[1]" />
    </section>
  );
}

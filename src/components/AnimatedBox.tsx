import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../hooks/useScrollAnimation';

// ScrollTrigger registered once in main.tsx

// Wood textures
const woodFront = 'linear-gradient(135deg, #C4944E 0%, #A67835 25%, #B8874A 50%, #D4A76A 75%, #C4944E 100%)';
const woodSide = 'linear-gradient(180deg, #A67835 0%, #8B6530 50%, #A67835 100%)';
const woodBottom = 'linear-gradient(90deg, #8B6530 0%, #A67835 50%, #8B6530 100%)';
const woodLid = 'linear-gradient(90deg, #D4A76A 0%, #C4944E 30%, #B8874A 60%, #D4A76A 100%)';
const woodInside = 'linear-gradient(135deg, #E8C88A 0%, #F0D8A0 100%)';

// Box dimensions
const W = 240;
const H = 160;
const D = 180;
const HW = W / 2;
const HH = H / 2;
const HD = D / 2;

function WoodGrain({ count = 8 }: { count?: number }) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute left-0 right-0"
          style={{
            top: `${10 + i * (80 / count)}%`,
            height: '1px',
            background: 'rgba(139,101,48,0.08)',
            transform: `rotate(${(i % 3 - 1) * 0.4}deg)`,
          }}
        />
      ))}
    </>
  );
}

function MetalCorners() {
  return (
    <>
      <div className="absolute top-0 left-0 w-7 h-7 border-t-[3px] border-l-[3px] border-gray-400/40 rounded-tl-sm" />
      <div className="absolute top-0 right-0 w-7 h-7 border-t-[3px] border-r-[3px] border-gray-400/40 rounded-tr-sm" />
      <div className="absolute bottom-0 left-0 w-7 h-7 border-b-[3px] border-l-[3px] border-gray-400/40 rounded-bl-sm" />
      <div className="absolute bottom-0 right-0 w-7 h-7 border-b-[3px] border-r-[3px] border-gray-400/40 rounded-br-sm" />
    </>
  );
}

interface AnimatedBoxProps {
  size?: number;
  className?: string;
}

export default function AnimatedBox({ size = 1, className = '' }: AnimatedBoxProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  // Outer wrapper — GSAP controls rotation/opacity on this
  const rotatorRef = useRef<HTMLDivElement>(null);
  // Inner wrapper — holds preserve-3d, NOT touched by GSAP
  const boxInnerRef = useRef<HTMLDivElement>(null);
  const lidHingeRef = useRef<HTMLDivElement>(null);
  const frontHingeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sceneRef.current || !rotatorRef.current || !lidHingeRef.current || !frontHingeRef.current) return;

    const ctx = gsap.context(() => {
      // Initial states on the rotator (outer wrapper)
      gsap.set(rotatorRef.current, { rotateY: -30, rotateX: -15, opacity: 0, scale: 0.5, y: 40 });
      gsap.set(lidHingeRef.current, { rotateX: -130 });
      gsap.set(frontHingeRef.current, { rotateY: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          start: 'top 90%',
          end: 'bottom 5%',
          scrub: 0.8,
        },
      });

      // Phase 1: Box flies in, lid open (0% → 8%)
      tl.to(rotatorRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        rotateY: -30,
        rotateX: -15,
        duration: 0.08,
        ease: 'power3.out',
      }, 0);

      // Phase 2: Hold (8% → 15%)
      tl.to(rotatorRef.current, { duration: 0.07 });

      // Phase 3: Lid closes (15% → 28%)
      tl.to(lidHingeRef.current, {
        rotateX: -20,
        duration: 0.07,
        ease: 'power2.in',
      });
      tl.to(lidHingeRef.current, {
        rotateX: 0,
        duration: 0.06,
        ease: 'bounce.out(1, 0.4)',
      });

      // Phase 4: Full rotation (28% → 58%)
      tl.to(rotatorRef.current, {
        rotateY: 330,
        rotateX: -10,
        duration: 0.30,
        ease: 'none',
      });

      // Phase 5: Brief hold (58% → 62%)
      tl.to(rotatorRef.current, { duration: 0.04 });

      // Phase 6: Lid opens back up (62% → 72%)
      tl.to(lidHingeRef.current, {
        rotateX: -130,
        duration: 0.10,
        ease: 'power2.inOut',
      });

      // Phase 7: Tilt to peek inside (72% → 78%)
      tl.to(rotatorRef.current, {
        rotateX: -30,
        rotateY: 310,
        duration: 0.06,
        ease: 'power2.out',
      });

      // Phase 8: Front door swings open (78% → 88%)
      tl.to(frontHingeRef.current, {
        rotateY: -120,
        duration: 0.10,
        ease: 'back.out(1.4)',
      });

      // Phase 9: Hold (88% → 95%)
      tl.to(rotatorRef.current, { duration: 0.07 });

      // Phase 10: Close everything (95% → 100%)
      tl.to(lidHingeRef.current, {
        rotateX: 0,
        duration: 0.03,
        ease: 'power3.in',
      });
      tl.to(frontHingeRef.current, {
        rotateY: 0,
        duration: 0.02,
        ease: 'power3.in',
      });
    }, sceneRef);

    return () => ctx.revert();
  }, []);

  const s = size;

  return (
    <div
      ref={sceneRef}
      className={`flex items-center justify-center ${className}`}
      style={{ perspective: `${1400 / s}px` }}
    >
      {/* GSAP controls this outer wrapper — rotation, scale, opacity */}
      <div ref={rotatorRef} style={{ transformStyle: 'preserve-3d' }}>
        {/* Inner wrapper holds preserve-3d — NEVER touched by GSAP */}
        <div
          ref={boxInnerRef}
          style={{
            width: W * s,
            height: H * s,
            transformStyle: 'preserve-3d',
            position: 'relative',
          }}
        >
          {/* ===== BOTTOM ===== */}
          <div
            className="absolute rounded-sm border border-kraft-dark/30"
            style={{
              width: W * s,
              height: D * s,
              left: 0,
              top: (HH - HD) * s,
              background: woodBottom,
              transform: `rotateX(-90deg) translateZ(${HH * s}px)`,
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)',
            }}
          >
            <WoodGrain count={6} />
          </div>

          {/* ===== BACK ===== */}
          <div
            className="absolute rounded-sm border border-kraft-dark/30"
            style={{
              width: W * s,
              height: H * s,
              left: 0,
              top: 0,
              background: woodSide,
              transform: `rotateY(180deg) translateZ(${HD * s}px)`,
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.15)',
            }}
          >
            <WoodGrain count={6} />
            <MetalCorners />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-heading font-bold text-navy/20" style={{ fontSize: `${14 * s}px` }}>TNR</span>
            </div>
          </div>

          {/* ===== LEFT ===== */}
          <div
            className="absolute rounded-sm border border-kraft-dark/30"
            style={{
              width: D * s,
              height: H * s,
              left: (HW - HD) * s,
              top: 0,
              background: woodSide,
              transform: `rotateY(-90deg) translateZ(${HW * s}px)`,
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.15)',
            }}
          >
            <WoodGrain count={6} />
          </div>

          {/* ===== RIGHT ===== */}
          <div
            className="absolute rounded-sm border border-kraft-dark/30"
            style={{
              width: D * s,
              height: H * s,
              left: (HW - HD) * s,
              top: 0,
              background: woodSide,
              transform: `rotateY(90deg) translateZ(${HW * s}px)`,
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.15)',
            }}
          >
            <WoodGrain count={6} />
          </div>

          {/* ===== FRONT (Door) ===== */}
          <div
            className="absolute"
            style={{
              width: W * s,
              height: H * s,
              left: 0,
              top: 0,
              transformStyle: 'preserve-3d',
              transform: `translateZ(${HD * s}px)`,
            }}
          >
            <div
              ref={frontHingeRef}
              className="absolute inset-0"
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: 'left center',
              }}
            >
              <div
                className="absolute inset-0 rounded-sm border border-kraft-dark/30"
                style={{
                  background: woodFront,
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.15)',
                  backfaceVisibility: 'hidden',
                }}
              >
                <WoodGrain count={8} />
                <MetalCorners />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-heading font-bold text-navy/25" style={{ fontSize: `${18 * s}px` }}>TNR</span>
                </div>
                <div
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-400/40 rounded-full"
                  style={{ width: `${3 * s}px`, height: `${20 * s}px` }}
                />
              </div>
              <div
                className="absolute inset-0 rounded-sm border border-kraft-dark/20"
                style={{
                  background: woodInside,
                  transform: 'rotateY(180deg)',
                  backfaceVisibility: 'hidden',
                }}
              />
            </div>
          </div>

          {/* ===== LID (Top) ===== */}
          <div
            className="absolute"
            style={{
              width: W * s,
              height: D * s,
              left: 0,
              top: (HH - HD) * s,
              transformStyle: 'preserve-3d',
              transform: `rotateX(90deg) translateZ(${HH * s}px)`,
            }}
          >
            <div
              ref={lidHingeRef}
              className="absolute inset-0"
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: '50% 100%',
              }}
            >
              <div
                className="absolute inset-0 rounded-sm border border-kraft-dark/30"
                style={{
                  background: woodLid,
                  boxShadow: 'inset 0 0 15px rgba(0,0,0,0.1)',
                  backfaceVisibility: 'hidden',
                }}
              >
                <WoodGrain count={5} />
                <div
                  className="absolute left-1/2 -translate-x-1/2 bottom-3 bg-gray-400/30 rounded-full"
                  style={{ width: `${30 * s}px`, height: `${4 * s}px` }}
                />
              </div>
              <div
                className="absolute inset-0 rounded-sm border border-kraft-dark/20"
                style={{
                  background: woodInside,
                  transform: 'rotateX(180deg)',
                  backfaceVisibility: 'hidden',
                }}
              />
            </div>
          </div>

          {/* ===== INTERIOR GLOW ===== */}
          <div
            className="absolute rounded-sm pointer-events-none"
            style={{
              width: (W - 12) * s,
              height: (H - 12) * s,
              left: 6 * s,
              top: 6 * s,
              background: 'radial-gradient(ellipse at center, rgba(232,130,26,0.15) 0%, rgba(232,130,26,0.05) 50%, transparent 70%)',
              transform: `translateZ(${(HD - 5) * s}px)`,
            }}
          />

          {/* ===== INTERIOR PACKAGES ===== */}
          <div
            className="absolute pointer-events-none"
            style={{
              transform: `translateZ(${(HD - 8) * s}px)`,
              left: 20 * s,
              bottom: 10 * s,
            }}
          >
            <div
              className="absolute rounded-sm"
              style={{
                width: 40 * s, height: 30 * s,
                background: 'linear-gradient(135deg, #D4A76A, #C4944E)',
                border: `${1 * s}px solid rgba(139,101,48,0.3)`,
                left: 0, bottom: 0,
              }}
            />
            <div
              className="absolute rounded-sm"
              style={{
                width: 30 * s, height: 22 * s,
                background: 'linear-gradient(135deg, #E8C88A, #D4A76A)',
                border: `${1 * s}px solid rgba(139,101,48,0.3)`,
                left: 45 * s, bottom: 0,
              }}
            />
            <div
              className="absolute rounded-sm"
              style={{
                width: 35 * s, height: 20 * s,
                background: 'linear-gradient(135deg, #C4944E, #B8874A)',
                border: `${1 * s}px solid rgba(139,101,48,0.3)`,
                left: 5 * s, bottom: 32 * s,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

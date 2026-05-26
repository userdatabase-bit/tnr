import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ScrollTrigger registered once in main.tsx

/**
 * Applies a parallax scroll effect to a ref element.
 * speed: positive = slower (background feel), negative = faster (foreground feel)
 * Typical values: -0.3 to 0.5
 */
export function useParallax(speed: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const distance = speed * 100;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -distance },
        {
          y: distance,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement || el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

/**
 * Applies a fade-in-up parallax reveal to children with .parallax-reveal class
 */
export function useParallaxReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const elements = container.querySelectorAll('.parallax-reveal');
      elements.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              end: 'top 60%',
              scrub: 0.8,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return containerRef;
}

/**
 * Applies a horizontal parallax drift to decorative elements
 */
export function useParallaxDrift(xSpeed: number = 0.2, ySpeed: number = 0.1) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { x: -xSpeed * 80, y: -ySpeed * 80 },
        {
          x: xSpeed * 80,
          y: ySpeed * 80,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement || el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [xSpeed, ySpeed]);

  return ref;
}

export { gsap, ScrollTrigger };

// ─────────────────────────────────────────────────────────────────────────────
//  useAnimation — Consolidated Animation Hub
// ─────────────────────────────────────────────────────────────────────────────
//
//  WHY TWO LIBRARIES?
//  The project uses both Framer Motion AND GSAP + ScrollTrigger.
//  This is intentional — each serves a distinct purpose:
//
//  FRAMER MOTION  →  Component-level scroll-in reveals, exit animations
//                    (AnimatePresence), and layout transitions.
//                    Used across ALL components (Hero, ContactFooter,
//                    ServiceMap, Stats, Testimonials, etc.).
//                    These are declarative, per-element animations using
//                    `motion.div` with initial / whileInView / transition.
//
//  GSAP           →  Continuous parallax scroll effects with scrub-based
//                    timing. Used only in decorative background elements
//                    (drift, glow, parallax reveal). Framer Motion cannot
//                    natively do scrub-linked scroll animations.
//                    Used in: Hero, BrandPillars, CorrugatedBoxes,
//                    Stats, WoodenBoxes, ServiceMap, AnimatedBox,
//                    DigitalPrinting, Pallets.
//
//  RECOMMENDATION:
//  Both are genuinely needed for the current feature set. If you want to
//  eliminate one in the future:
//  - Replace Framer Motion → use `@react-spring/web` + `useInView`
//    (smaller bundle, but same feature set).
//  - Replace GSAP          → use native IntersectionObserver + CSS
//    transforms for parallax (less smooth, no scrub).
// ─────────────────────────────────────────────────────────────────────────────

// ─── GSAP (parallax / scrub animations) ─────────────────────────────────
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ─── Framer Motion (scroll reveals / exit animations) ───────────────────
import {
  motion,
  AnimatePresence,
  useInView,
} from 'framer-motion';

export {
  gsap,
  ScrollTrigger,
  motion,
  AnimatePresence,
  useInView,
};

// ─── Shared animation helpers ───────────────────────────────────────────────

/** Standard fade-in-up config — used across most sections */
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
} as const;

/** Slightly slower fade-in-up for hero / prominent elements */
export const fadeInUpSlow = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: 'easeOut' },
} as const;

/** Fade-in with scale (used for cards / images) */
export const fadeInScale = {
  initial: { opacity: 0, scale: 0.92 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: 'easeOut' },
} as const;

/** Slide-in from left (for staggered list items) */
export const slideInLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: 'easeOut' },
} as const;

/** Slide-in from right */
export const slideInRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: 'easeOut' },
} as const;

/** Fade-in only (no movement) */
export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.6 },
} as const;

// ─── Type ───────────────────────────────────────────────────────────────────

export type { Variants, Transition, MotionProps } from 'framer-motion';

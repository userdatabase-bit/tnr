// ─── Wooden Box — Dynamic Style Utilities ──────────────────────────────────
// Extracts all size‑proportional computations so the component stays readable.
// ─────────────────────────────────────────────────────────────────────────────

import type { CSSProperties } from 'react';

export const COLORS = {
  strip: '#7B5B2A',
  metal: '#A08040',
  bolt: '#6B5020',
  latch: '#9A7830',
  logo: '#5a3510',
  sub: '#7a5530',
} as const;

/** All computed sizes and textures for a given box configuration. */
export interface BoxStyles {
  half: number;
  stripThick: number;
  bracketSize: number;
  boltSize: number;
  latchW: number;
  latchH: number;
  logoSize: number;
  subSize: number;
  grainH: string;
  grainV: string;
}

/**
 * Compute all dynamic styles from the `size` and `woodColor` props.
 * Returns everything the component needs — no inline calculations left behind.
 */
export function getBoxStyles(size: number, woodColor: string): BoxStyles {
  return {
    half: size / 2,
    stripThick: Math.max(8, size * 0.05),
    bracketSize: Math.max(18, size * 0.11),
    boltSize: Math.max(5, size * 0.03),
    latchW: Math.max(24, size * 0.14),
    latchH: Math.max(15, size * 0.09),
    logoSize: Math.max(11, size * 0.065),
    subSize: Math.max(8, size * 0.045),
    grainH: `repeating-linear-gradient(0deg,rgba(0,0,0,0.09) 0,rgba(0,0,0,0.09) 1px,transparent 1px,transparent ${size / 4}px),${woodColor}`,
    grainV: `repeating-linear-gradient(90deg,rgba(0,0,0,0.07) 0,rgba(0,0,0,0.07) 1px,transparent 1px,transparent ${size / 4}px),${woodColor}`,
  };
}

/** Corner bracket radius for each position. */
export function bracketRadius(pos: 'tl' | 'tr' | 'bl' | 'br'): string {
  return pos === 'tl' ? '0 0 4px 0' :
    pos === 'tr' ? '0 0 0 4px' :
      pos === 'bl' ? '0 4px 0 0' : '4px 0 0 0';
}

/** Inline style for a corner bracket. */
export function bracketStyle(pos: 'tl' | 'tr' | 'bl' | 'br', sz: BoxStyles): CSSProperties {
  return {
    position: 'absolute',
    background: COLORS.metal,
    zIndex: 3,
    width: sz.bracketSize,
    height: sz.bracketSize,
    top: pos.startsWith('t') ? -1 : 'auto',
    bottom: pos.startsWith('b') ? -1 : 'auto',
    left: pos.endsWith('l') ? -1 : 'auto',
    right: pos.endsWith('r') ? -1 : 'auto',
    borderRadius: bracketRadius(pos),
  };
}

/** Inline style for a corner bolt. */
export function boltStyle(pos: 'tl' | 'tr' | 'bl' | 'br', sz: BoxStyles): CSSProperties {
  const offset = sz.boltSize * 0.6;
  return {
    position: 'absolute',
    background: COLORS.bolt,
    zIndex: 4,
    width: sz.boltSize,
    height: sz.boltSize,
    borderRadius: '50%',
    top: pos.startsWith('t') ? offset : 'auto',
    bottom: pos.startsWith('b') ? offset : 'auto',
    left: pos.endsWith('l') ? offset : 'auto',
    right: pos.endsWith('r') ? offset : 'auto',
  };
}

/** Inline style for the latch plate. */
export function latchStyle(sz: BoxStyles): CSSProperties {
  return {
    position: 'absolute',
    zIndex: 5,
    width: sz.latchW,
    height: sz.latchH,
    background: COLORS.latch,
    borderRadius: 4,
    border: `2px solid ${COLORS.bolt}`,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
}

/** Inline style for the latch keyhole. */
export function latchInnerStyle(sz: BoxStyles): CSSProperties {
  return {
    position: 'absolute',
    width: sz.latchW * 0.36,
    height: sz.latchH * 0.45,
    background: COLORS.bolt,
    borderRadius: 2,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
}

/** Inline style for a strip element (top / bottom / left / right). */
export function stripStyle(thick: number, isHorizontal: boolean): CSSProperties {
  return {
    position: 'absolute',
    background: COLORS.strip,
    zIndex: 2,
    width: isHorizontal ? '100%' : thick,
    height: isHorizontal ? thick : '100%',
    top: 0,
    left: 0,
  };
}


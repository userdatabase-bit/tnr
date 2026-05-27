import { useRef, useEffect, useState } from 'react';
import {
  getBoxStyles,
  stripStyle, bracketStyle, boltStyle,
  latchStyle, latchInnerStyle,
  COLORS,
} from '../utils/woodenBoxStyles';

interface WoodenBoxProps {
  /** Rotation duration in seconds — lower = faster */
  speed?: number;
  /** Label shown on the front face */
  label?: string;
  /** Sub-label shown below the main label */
  subLabel?: string;
  /** Box size in px (width = height = depth) */
  size?: number;
  /** Wood base color hex */
  woodColor?: string;
  /** When true, renders a flat pallet shape (wide, shallow, no latch/logo, with slats) */
  palletMode?: boolean;
  /** When true, hides the play/pause and speed controls */
  hideControls?: boolean;
}

export default function WoodenBox({
  speed = 9,
  label = 'TNR',
  subLabel = 'SOLUTIONS',
  size = 200,
  woodColor = '#C9884C',
  palletMode = false,
  hideControls = false,
}: WoodenBoxProps) {
  const [paused, setPaused] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const wrapRef = useRef<HTMLDivElement>(null);

  const sz = getBoxStyles(size, woodColor);

  // ── Pallet dimensions ────────────────────────────────────────────────────
  const palletWidth  = size * 1.8;
  const palletDepth  = size * 1.2;
  const palletHeight = size * 0.25;
  const halfW = palletWidth  / 2;
  const halfD = palletDepth  / 2;
  const halfH = palletHeight / 2;

  useEffect(() => {
    if (wrapRef.current) {
      wrapRef.current.style.animationPlayState = paused ? 'paused' : 'running';
    }
  }, [paused]);

  useEffect(() => {
    if (wrapRef.current) {
      wrapRef.current.style.animationDuration = `${currentSpeed}s`;
    }
  }, [currentSpeed]);

  // ── Wood-grain texture objects ───────────────────────────────────────────
  const faceTextures = {
    H: { background: sz.grainH },
    V: { background: sz.grainV },
  } as const;

  // ── Face component ───────────────────────────────────────────────────────
  function Face({
    transform,
    texture,
    brightness,
    withMid,
    withLatch,
    withLogo,
    withBolts,
    withSlats,
    faceWidth,
    faceHeight,
  }: {
    transform: string;
    texture: 'H' | 'V';
    brightness?: number;
    withMid?: boolean;
    withLatch?: boolean;
    withLogo?: boolean;
    withBolts?: boolean;
    withSlats?: boolean;
    faceWidth?: number;
    faceHeight?: number;
  }) {
    const w = faceWidth ?? size;
    const h = faceHeight ?? size;
    const bg = faceTextures[texture];

    return (
      <div
        className="absolute overflow-hidden"
        style={{ width: w, height: h, transform }}
      >
        <div
          className="relative w-full h-full"
          style={{
            ...bg,
            filter: brightness !== undefined ? `brightness(${brightness})` : undefined,
          }}
        >
          {/* Corner strips */}
          <div style={stripStyle(sz.stripThick, true)} />
          <div style={{ ...stripStyle(sz.stripThick, true), top: 'auto', bottom: 0 }} />
          <div style={stripStyle(sz.stripThick, false)} />
          <div style={{ ...stripStyle(sz.stripThick, false), left: 'auto', right: 0 }} />

          {withMid && (
            <div
              className="absolute top-1/2 left-0 w-full"
              style={{ height: 2, background: COLORS.strip, zIndex: 2 }}
            />
          )}

          {/* Corner brackets */}
          <div style={bracketStyle('tl', sz)} />
          <div style={bracketStyle('tr', sz)} />
          <div style={bracketStyle('bl', sz)} />
          <div style={bracketStyle('br', sz)} />

          {withBolts && (
            <>
              <div style={boltStyle('tl', sz)} />
              <div style={boltStyle('tr', sz)} />
              <div style={boltStyle('bl', sz)} />
              <div style={boltStyle('br', sz)} />
            </>
          )}

          {withLatch && (
            <div style={latchStyle(sz)}>
              <div style={latchInnerStyle(sz)} />
            </div>
          )}

          {withLogo && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-20 leading-tight">
              <span
                className="block font-bold tracking-wider"
                style={{ color: '#5a3510', fontSize: sz.logoSize, fontFamily: 'Arial, sans-serif' }}
              >
                {label}
              </span>
              {subLabel && (
                <span
                  className="block tracking-wide"
                  style={{ color: '#7a5530', fontSize: sz.subSize, fontFamily: 'Arial, sans-serif', marginTop: 2 }}
                >
                  {subLabel}
                </span>
              )}
            </div>
          )}

          {/* Pallet slats (horizontal plank lines on top face) */}
          {withSlats && (
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-around px-1">
              {[0, 1, 2, 3, 4, 5].map(i => (
                <div
                  key={i}
                  className="w-full rounded-sm"
                  style={{
                    height: `${100 / 14}%`,
                    background: 'linear-gradient(90deg, rgba(0,0,0,0.06), rgba(0,0,0,0.14) 20%, rgba(0,0,0,0.14) 80%, rgba(0,0,0,0.06))',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col items-center select-none" style={{ padding: '60px 0 30px', perspective: '1000px' }}>
      <style>{`
        @keyframes rotatebox {
          0%   { transform: rotateX(-22deg) rotateY(0deg); }
          100% { transform: rotateX(-22deg) rotateY(360deg); }
        }
        @keyframes shadowpulse {
          0%, 100% { transform: scaleX(1); }
          25%       { transform: scaleX(0.72); }
          50%       { transform: scaleX(0.88); }
          75%       { transform: scaleX(0.72); }
        }
        .wb-wrap {
          transform-style: preserve-3d;
          animation: rotatebox ${currentSpeed}s linear infinite;
        }
        .wb-shadow {
          animation: shadowpulse ${currentSpeed}s linear infinite;
        }
      `}</style>

      {/* Box / Pallet */}
      <div
        ref={wrapRef}
        className="wb-wrap relative"
        style={palletMode ? { width: palletWidth, height: palletHeight } : { width: size, height: size }}
      >
        {palletMode ? (
          <>
            {/* Pallet faces — flat rectangular shape */}
            <Face transform={`translateZ(${halfD}px)`}                texture="H" faceWidth={palletWidth} faceHeight={palletHeight} />
            <Face transform={`rotateY(180deg) translateZ(${halfD}px)`} texture="H" faceWidth={palletWidth} faceHeight={palletHeight} brightness={0.75} />
            <Face transform={`rotateY(-90deg) translateZ(${halfW}px)`} texture="V" faceWidth={palletDepth} faceHeight={palletHeight} brightness={0.58} />
            <Face transform={`rotateY(90deg) translateZ(${halfW}px)`}  texture="V" faceWidth={palletDepth} faceHeight={palletHeight} brightness={0.75} />
            {/* Top face with slat lines */}
            <Face transform={`rotateX(90deg) translateZ(${halfH}px)`}  texture="H" faceWidth={palletWidth} faceHeight={palletDepth} brightness={1.12} withSlats />
            <Face transform={`rotateX(-90deg) translateZ(${halfH}px)`} texture="H" faceWidth={palletWidth} faceHeight={palletDepth} brightness={0.58} />
          </>
        ) : (
          <>
            {/* Original box faces */}
            <Face transform={`translateZ(${sz.half}px)`}         texture="H" withMid withLatch withLogo withBolts />
            <Face transform={`rotateY(180deg) translateZ(${sz.half}px)`} texture="H" brightness={0.75} withMid />
            <Face transform={`rotateY(-90deg) translateZ(${sz.half}px)`} texture="V" brightness={0.58} withMid />
            <Face transform={`rotateY(90deg) translateZ(${sz.half}px)`}  texture="V" brightness={0.75} withMid />
            <Face transform={`rotateX(90deg) translateZ(${sz.half}px)`}  texture="V" brightness={1.12} />
            <Face transform={`rotateX(-90deg) translateZ(${sz.half}px)`} texture="V" brightness={0.58} />
          </>
        )}
      </div>

      {/* Shadow */}
      <div
        className="wb-shadow rounded-full"
        style={{
          width: palletMode ? palletWidth * 1.2 : size * 1.2,
          height: palletMode ? 10 : 18,
          background: 'rgba(0,0,0,0.15)',
          marginTop: palletMode ? 12 : 24,
        }}
      />

      {/* Controls (hidden in pallet mode or when hideControls is true) */}
      {!hideControls && !palletMode && (
        <div className="flex items-center gap-3 mt-5 font-sans">
          <button
            onClick={() => setPaused(p => !p)}
            className="px-[18px] py-[7px] text-[13px] border border-[#ccc] rounded-md bg-white cursor-pointer text-[#333] hover:bg-gray-100 active:bg-gray-200 transition-colors"
          >
            {paused ? '▶ Play' : '⏸ Pause'}
          </button>
          <span className="text-[13px] text-[#666]">Speed:</span>
          <input
            type="range" min={2} max={20} step={1}
            value={currentSpeed}
            onChange={e => setCurrentSpeed(Number(e.target.value))}
            className="w-[110px]"
          />
          <span className="text-[13px] text-[#666] min-w-[28px]">{currentSpeed}s</span>
        </div>
      )}
    </div>
  );
}

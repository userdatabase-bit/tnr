interface WoodenPallet3DProps {
  /** Overall scale in px (affects all dimensions proportionally) */
  size?: number;
  /** Rotation speed in seconds — lower = faster */
  speed?: number;
}

/**
 * A single mini 3D box (plank or stringer) rendered with CSS preserve-3d.
 * Uses the same face-positioning technique as WoodenBox.tsx.
 */
function MiniBox({
  w, h, d,
  x, y, z,
  color,
  brightnessTop = 1.1,
  brightnessBottom = 0.6,
  brightnessFront = 1.0,
  brightnessBack = 0.75,
  brightnessLeft = 0.65,
  brightnessRight = 0.8,
}: {
  w: number; h: number; d: number;
  x: number; y: number; z: number;
  color: string;
  brightnessTop?: number;
  brightnessBottom?: number;
  brightnessFront?: number;
  brightnessBack?: number;
  brightnessLeft?: number;
  brightnessRight?: number;
}) {
  const halfW = w / 2;
  const halfH = h / 2;
  const halfD = d / 2;

  // Wood-grain textured backgrounds (same style as getBoxStyles)
  const grainH = `repeating-linear-gradient(0deg,rgba(0,0,0,0.09) 0,rgba(0,0,0,0.09) 1px,transparent 1px,transparent ${Math.max(8, w / 4)}px),${color}`;
  const grainV = `repeating-linear-gradient(90deg,rgba(0,0,0,0.07) 0,rgba(0,0,0,0.07) 1px,transparent 1px,transparent ${Math.max(8, d / 4)}px),${color}`;

  return (
    <div
      className="absolute"
      style={{
        transformStyle: 'preserve-3d',
        transform: `translate3d(${x}px, ${y}px, ${z}px)`,
        width: w,
        height: h,
      }}
    >
      {/* Top face */}
      <div
        className="absolute"
        style={{
          width: w, height: d,
          transform: `rotateX(90deg) translateZ(${halfH}px)`,
          background: grainH,
          filter: `brightness(${brightnessTop})`,
        }}
      />
      {/* Bottom face */}
      <div
        className="absolute"
        style={{
          width: w, height: d,
          transform: `rotateX(-90deg) translateZ(${halfH}px)`,
          background: grainH,
          filter: `brightness(${brightnessBottom})`,
        }}
      />
      {/* Front face */}
      <div
        className="absolute"
        style={{
          width: w, height: h,
          transform: `translateZ(${halfD}px)`,
          background: grainH,
          filter: `brightness(${brightnessFront})`,
        }}
      />
      {/* Back face */}
      <div
        className="absolute"
        style={{
          width: w, height: h,
          transform: `rotateY(180deg) translateZ(${halfD}px)`,
          background: grainH,
          filter: `brightness(${brightnessBack})`,
        }}
      />
      {/* Left face */}
      <div
        className="absolute"
        style={{
          width: d, height: h,
          transform: `rotateY(-90deg) translateZ(${halfW}px)`,
          background: grainV,
          filter: `brightness(${brightnessLeft})`,
        }}
      />
      {/* Right face */}
      <div
        className="absolute"
        style={{
          width: d, height: h,
          transform: `rotateY(90deg) translateZ(${halfW}px)`,
          background: grainV,
          filter: `brightness(${brightnessRight})`,
        }}
      />
    </div>
  );
}

export default function WoodenPallet3D({
  size = 200,
  speed = 9,
}: WoodenPallet3DProps) {
  // ── Pallet dimensions (all derived from `size`) ───────────────────────────
  const palletW = size * 1.8;           // total width (X axis)
  const palletD = size * 1.0;           // total depth (Z axis)

  // Top deck planks
  const plankH = size * 0.055;          // plank thickness (Y)
  const plankW = size * 0.1;            // individual plank width (Z)
  const numPlanks = 6;
  const gapZ = (palletD - numPlanks * plankW) / (numPlanks + 1);

  // Stringers
  const stringerH = size * 0.2;         // stringer height (Y)
  const stringerW = size * 0.12;        // stringer width (X)
  const stringerD = palletD - size * 0.04;
  const numStringers = 3;
  const stringerPosX = [
    palletW * 0.12,
    palletW * 0.5,
    palletW * 0.88,
  ];

  // Bottom deck planks
  const bottomPlankH = size * 0.04;     // bottom plank thickness (Y)
  const bottomPlankW = size * 0.09;     // bottom plank width (Z)
  const numBottom = 3;

  // Y positions (centered around pallet middle)
  const topY = stringerH / 2 + plankH / 2;
  const bottomY = -(stringerH / 2 + bottomPlankH / 2);

  // Colors
  const topColor = '#C9884C';
  const stringerColor = '#8B5E34';
  const bottomColor = '#A86E3A';

  // Wrapper dimensions to center the origin
  const wrapW = palletW + stringerW;
  const wrapH = stringerH + plankH + bottomPlankH;

  // Build Z positions for top planks
  const topPlanZPositions = Array.from({ length: numPlanks }, (_, i) =>
    -(palletD / 2) + gapZ + i * (plankW + gapZ) + plankW / 2
  );

  // Build Z positions for bottom planks (3, evenly distributed)
  const bottomZPositions = [
    -(palletD / 2) + gapZ + bottomPlankW / 2,
    0,
    (palletD / 2) - gapZ - bottomPlankW / 2,
  ];

  return (
    <div
      className="flex flex-col items-center select-none"
      style={{ padding: '60px 0 30px', perspective: '1000px' }}
    >
      <style>{`
        @keyframes rotatepallet {
          0%   { transform: rotateX(-20deg) rotateY(0deg); }
          100% { transform: rotateX(-20deg) rotateY(360deg); }
        }
        @keyframes shadowpulse {
          0%, 100% { transform: scaleX(1); opacity: 0.25; }
          25%      { transform: scaleX(0.72); opacity: 0.15; }
          50%      { transform: scaleX(0.88); opacity: 0.2; }
          75%      { transform: scaleX(0.72); opacity: 0.15; }
        }
        .pallet-wrap {
          transform-style: preserve-3d;
          animation: rotatepallet ${speed}s linear infinite;
        }
        .pallet-shadow {
          animation: shadowpulse ${speed}s linear infinite;
        }
      `}</style>

      {/* 3D Pallet */}        <div
          className="pallet-wrap relative"
        style={{ width: wrapW, height: wrapH }}
      >
        {/* ── Top deck planks ─────────────────────────────────────────────── */}
        {topPlanZPositions.map((zPos, i) => (
          <MiniBox
            key={`top-${i}`}
            w={palletW}
            h={plankH}
            d={plankW}
            x={0}
            y={topY}
            z={zPos}
            color={topColor}
          />
        ))}

        {/* ── Stringers ───────────────────────────────────────────────────── */}
        {stringerPosX.map((xPos, i) => (
          <MiniBox
            key={`str-${i}`}
            w={stringerW}
            h={stringerH}
            d={stringerD}
            x={xPos - palletW / 2}
            y={0}
            z={0}
            color={stringerColor}
            brightnessTop={0.95}
            brightnessBottom={0.55}
            brightnessFront={0.9}
            brightnessBack={0.7}
            brightnessLeft={0.6}
            brightnessRight={0.75}
          />
        ))}

        {/* ── Bottom deck planks ──────────────────────────────────────────── */}
        {bottomZPositions.map((zPos, i) => (
          <MiniBox
            key={`bot-${i}`}
            w={palletW}
            h={bottomPlankH}
            d={bottomPlankW}
            x={0}
            y={bottomY}
            z={zPos}
            color={bottomColor}
            brightnessTop={0.9}
            brightnessBottom={0.55}
            brightnessFront={0.85}
            brightnessBack={0.65}
            brightnessLeft={0.6}
            brightnessRight={0.7}
          />
        ))}
      </div>

      {/* Shadow */}
      <div
        className="pallet-shadow rounded-full"
        style={{
          width: palletW * 1.15,
          height: 12,
          background: 'rgba(0,0,0,0.15)',
          marginTop: 16,
        }}
      />
    </div>
  );
}

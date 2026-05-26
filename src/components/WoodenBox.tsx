import { useRef, useEffect, useState } from "react";

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
  /** Hide the play/pause and speed controls */
  hideControls?: boolean;
}

export default function WoodenBox({
  speed = 9,
  label = "TNR",
  subLabel = "SOLUTIONS",
  size = 200,
  woodColor = "#C9884C",
  hideControls = false,
}: WoodenBoxProps) {
  const half = size / 2;
  const [paused, setPaused] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapRef.current) {
      wrapRef.current.style.animationPlayState = paused ? "paused" : "running";
    }
  }, [paused]);

  useEffect(() => {
    if (wrapRef.current) {
      wrapRef.current.style.animationDuration = `${currentSpeed}s`;
    }
  }, [currentSpeed]);

  const faceStyle: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    overflow: "hidden",
  };

  const grainH: React.CSSProperties = {
    width: "100%",
    height: "100%",
    position: "relative",
    background: `repeating-linear-gradient(
      0deg,
      rgba(0,0,0,0.09) 0, rgba(0,0,0,0.09) 1px,
      transparent 1px, transparent ${size / 4}px
    ), ${woodColor}`,
  };

  const grainV: React.CSSProperties = {
    width: "100%",
    height: "100%",
    position: "relative",
    background: `repeating-linear-gradient(
      90deg,
      rgba(0,0,0,0.07) 0, rgba(0,0,0,0.07) 1px,
      transparent 1px, transparent ${size / 4}px
    ), ${woodColor}`,
  };

  const stripThick = Math.max(8, size * 0.05);
  const bracketSize = Math.max(18, size * 0.11);
  const boltSize = Math.max(5, size * 0.03);
  const latchW = Math.max(24, size * 0.14);
  const latchH = Math.max(15, size * 0.09);
  const logoSize = Math.max(11, size * 0.065);
  const subSize = Math.max(8, size * 0.045);

  const stripColor = "#7B5B2A";
  const metalColor = "#A08040";
  const boltColor = "#6B5020";
  const latchColor = "#9A7830";

  const stripTop: React.CSSProperties = { position: "absolute", background: stripColor, zIndex: 2, width: "100%", height: stripThick, top: 0, left: 0 };
  const stripBot: React.CSSProperties = { ...stripTop, top: "auto", bottom: 0 };
  const stripLeft: React.CSSProperties = { position: "absolute", background: stripColor, zIndex: 2, width: stripThick, height: "100%", top: 0, left: 0 };
  const stripRight: React.CSSProperties = { ...stripLeft, left: "auto", right: 0 };
  const midLine: React.CSSProperties = { position: "absolute", background: stripColor, zIndex: 2, width: "100%", height: 2, top: "50%", left: 0 };

  const bracket = (pos: "tl" | "tr" | "bl" | "br"): React.CSSProperties => ({
    position: "absolute",
    background: metalColor,
    zIndex: 3,
    width: bracketSize,
    height: bracketSize,
    top: pos.startsWith("t") ? -1 : "auto",
    bottom: pos.startsWith("b") ? -1 : "auto",
    left: pos.endsWith("l") ? -1 : "auto",
    right: pos.endsWith("r") ? -1 : "auto",
    borderRadius:
      pos === "tl" ? "0 0 4px 0" :
      pos === "tr" ? "0 0 0 4px" :
      pos === "bl" ? "0 4px 0 0" : "4px 0 0 0",
  });

  const bolt = (pos: "tl" | "tr" | "bl" | "br"): React.CSSProperties => ({
    position: "absolute",
    background: boltColor,
    zIndex: 4,
    width: boltSize,
    height: boltSize,
    borderRadius: "50%",
    top: pos.startsWith("t") ? boltSize * 0.6 : "auto",
    bottom: pos.startsWith("b") ? boltSize * 0.6 : "auto",
    left: pos.endsWith("l") ? boltSize * 0.6 : "auto",
    right: pos.endsWith("r") ? boltSize * 0.6 : "auto",
  });

  const latchStyle: React.CSSProperties = {
    position: "absolute",
    zIndex: 5,
    width: latchW,
    height: latchH,
    background: latchColor,
    borderRadius: 4,
    border: `2px solid ${boltColor}`,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const latchInner: React.CSSProperties = {
    position: "absolute",
    width: latchW * 0.36,
    height: latchH * 0.45,
    background: boltColor,
    borderRadius: 2,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const logoStyle: React.CSSProperties = {
    position: "absolute",
    zIndex: 6,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    pointerEvents: "none",
    lineHeight: 1.3,
  };

  const Face = ({
    transform,
    texture,
    brightness,
    withMid,
    withLatch,
    withLogo,
    withBolts,
  }: {
    transform: string;
    texture: React.CSSProperties;
    brightness?: number;
    withMid?: boolean;
    withLatch?: boolean;
    withLogo?: boolean;
    withBolts?: boolean;
  }) => (
    <div style={{ ...faceStyle, transform }}>
      <div style={{ ...texture, filter: brightness !== undefined ? `brightness(${brightness})` : undefined }}>
        <div style={stripTop} />
        <div style={stripBot} />
        <div style={stripLeft} />
        <div style={stripRight} />
        {withMid && <div style={midLine} />}
        <div style={bracket("tl")} />
        <div style={bracket("tr")} />
        <div style={bracket("bl")} />
        <div style={bracket("br")} />
        {withBolts && (
          <>
            <div style={bolt("tl")} />
            <div style={bolt("tr")} />
            <div style={bolt("bl")} />
            <div style={bolt("br")} />
          </>
        )}
        {withLatch && (
          <div style={latchStyle}>
            <div style={latchInner} />
          </div>
        )}
        {withLogo && (
          <div style={logoStyle}>
            <span style={{ display: "block", color: "#5a3510", fontWeight: 700, fontSize: logoSize, letterSpacing: "1.5px", fontFamily: "Arial, sans-serif" }}>
              {label}
            </span>
            {subLabel && (
              <span style={{ display: "block", color: "#7a5530", fontSize: subSize, letterSpacing: "0.5px", fontFamily: "Arial, sans-serif", marginTop: 2 }}>
                {subLabel}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: hideControls ? "20px 0 0" : "60px 0 30px", perspective: "1000px", userSelect: "none" }}>
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

      {/* Box */}
      <div
        ref={wrapRef}
        className="wb-wrap"
        style={{ width: size, height: size, position: "relative" }}
      >
        <Face transform={`translateZ(${half}px)`}        texture={grainH}               withMid withLatch withLogo withBolts />
        <Face transform={`rotateY(180deg) translateZ(${half}px)`} texture={grainH} brightness={0.75} withMid />
        <Face transform={`rotateY(-90deg) translateZ(${half}px)`} texture={grainV} brightness={0.58} withMid />
        <Face transform={`rotateY(90deg) translateZ(${half}px)`}  texture={grainV} brightness={0.75} withMid />
        <Face transform={`rotateX(90deg) translateZ(${half}px)`}  texture={grainV} brightness={1.12} />
        <Face transform={`rotateX(-90deg) translateZ(${half}px)`} texture={grainV} brightness={0.58} />
      </div>

      {/* Shadow */}
      <div
        className="wb-shadow"
        style={{
          width: size * 1.2,
          height: 18,
          background: "rgba(0,0,0,0.15)",
          borderRadius: "50%",
          marginTop: 24,
        }}
      />

      {/* Controls */}
      {!hideControls && (
        <div style={{ display: "flex", gap: 12, marginTop: 20, alignItems: "center", fontFamily: "Arial, sans-serif" }}>
          <button
            onClick={() => setPaused(p => !p)}
            style={{ padding: "7px 18px", fontSize: 13, border: "1px solid #ccc", borderRadius: 6, background: "#fff", cursor: "pointer", color: "#333" }}
          >
            {paused ? "▶ Play" : "⏸ Pause"}
          </button>
          <span style={{ fontSize: 13, color: "#666" }}>Speed:</span>
          <input
            type="range" min={2} max={20} step={1}
            value={currentSpeed}
            onChange={e => setCurrentSpeed(Number(e.target.value))}
            style={{ width: 110 }}
          />
          <span style={{ fontSize: 13, color: "#666", minWidth: 28 }}>{currentSpeed}s</span>
        </div>
      )}
    </div>
  );
}

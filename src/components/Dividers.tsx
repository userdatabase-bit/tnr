export function WaveDivider({ flip = false, color = '#F5F6F8' }: { flip?: boolean; color?: string }) {
  return (
    <div
      className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''}`}
      style={{ marginTop: '-1px', marginBottom: '-1px' }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-[50px] md:h-[70px]"
      >
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

export function AngledDivider({ flip = false, color = '#F5F6F8' }: { flip?: boolean; color?: string }) {
  return (
    <div
      className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''}`}
      style={{ marginTop: '-1px', marginBottom: '-1px' }}
    >
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="w-full h-[40px] md:h-[55px]"
      >
        <polygon points="0,60 1440,0 1440,60" fill={color} />
      </svg>
    </div>
  );
}

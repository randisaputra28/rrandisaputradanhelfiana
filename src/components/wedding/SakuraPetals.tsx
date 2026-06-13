import { useMemo } from "react";

const COLORS = [
  "#ffd6e4", // soft pink
  "#ffc0d4", // blush
  "#ffe8ef", // ivory pink
  "#fbb6ce", // pink
  "#fff5f7", // ivory
];

const Petal = ({ color }: { color: string }) => (
  <svg viewBox="0 0 32 32" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <defs>
      <radialGradient id={`g-${color.slice(1)}`} cx="35%" cy="30%" r="80%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="55%" stopColor={color} stopOpacity="0.95" />
        <stop offset="100%" stopColor="#e07aa0" stopOpacity="0.9" />
      </radialGradient>
    </defs>
    <path
      d="M16 2 C22 8 28 12 28 18 C28 24 22 30 16 30 C10 30 4 24 4 18 C4 12 10 8 16 2 Z"
      fill={`url(#g-${color.slice(1)})`}
    />
    <path d="M16 6 Q17 16 16 28" stroke="#e07aa0" strokeOpacity="0.35" strokeWidth="0.6" fill="none" />
  </svg>
);

export const SakuraPetals = ({ count = 20 }: { count?: number }) => {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const depth = Math.random(); // 0 far → 1 near
        return {
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 18,
          duration: 14 + (1 - depth) * 14 + Math.random() * 6,
          size: 10 + depth * 18,
          sway: 30 + Math.random() * 90,
          rotate: Math.random() * 360,
          opacity: 0.55 + depth * 0.3,
          blur: (1 - depth) * 1.6,
          color: COLORS[i % COLORS.length],
          z: depth > 0.85 ? 60 : 5,
        };
      }),
    [count]
  );

  return (
    <div className="sakura-layer" aria-hidden>
      {petals.map((p) => (
        <span
          key={p.id}
          className="sakura-petal"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `-${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
            filter: `blur(${p.blur}px) drop-shadow(0 0 4px rgba(255,182,210,0.55))`,
            zIndex: p.z,
            ['--sway' as any]: `${p.sway}px`,
            ['--rot' as any]: `${p.rotate}deg`,
          }}
        >
          <Petal color={p.color} />
        </span>
      ))}
    </div>
  );
};

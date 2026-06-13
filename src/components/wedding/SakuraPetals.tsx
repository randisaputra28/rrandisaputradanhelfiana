import { useMemo } from "react";

export const SakuraPetals = ({ count = 22 }: { count?: number }) => {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 12,
        size: 10 + Math.random() * 14,
        sway: 20 + Math.random() * 60,
        rotate: Math.random() * 360,
        opacity: 0.5 + Math.random() * 0.5,
      })),
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
            ['--sway' as any]: `${p.sway}px`,
            ['--rot' as any]: `${p.rotate}deg`,
          }}
        />
      ))}
    </div>
  );
};

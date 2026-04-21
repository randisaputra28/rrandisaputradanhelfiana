import { useEffect, useRef } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  hue: number;
  life: number;
}

export const SparkleEffect = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  useEffect(() => {
    const spawn = (x: number, y: number) => {
      const container = containerRef.current;
      if (!container) return;
      const count = 6;
      for (let i = 0; i < count; i++) {
        const el = document.createElement("span");
        const size = 6 + Math.random() * 10;
        const angle = Math.random() * Math.PI * 2;
        const distance = 20 + Math.random() * 50;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        el.className = "sparkle-particle";
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.setProperty("--dx", `${dx}px`);
        el.style.setProperty("--dy", `${dy}px`);
        container.appendChild(el);
        setTimeout(() => el.remove(), 900);
      }
    };

    const handlePointer = (e: PointerEvent) => {
      spawn(e.clientX, e.clientY);
    };
    const handleTouch = (e: TouchEvent) => {
      for (const t of Array.from(e.touches)) spawn(t.clientX, t.clientY);
    };
    window.addEventListener("pointerdown", handlePointer);
    window.addEventListener("touchstart", handleTouch, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", handlePointer);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[100]" aria-hidden />;
};

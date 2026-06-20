import { useEffect, useRef, useState, ReactNode } from "react";

interface DoorRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const DoorReveal = ({ children, className = "", delay = 0 }: DoorRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setOpen(true), delay);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`door-reveal ${open ? "door-open" : ""} ${className}`}>
      <div className="door-panel door-panel-left" aria-hidden />
      <div className="door-panel door-panel-right" aria-hidden />
      <div className="door-content">{children}</div>
    </div>
  );
};

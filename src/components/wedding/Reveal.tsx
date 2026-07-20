import { useEffect, useRef, useState, ReactNode, ElementType } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  threshold?: number;
}

export const Reveal = ({ children, className = "", as: Tag = "div", threshold = 0.15 }: Props) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag ref={ref as any} className={`reveal ${visible ? "in-view" : ""} ${className}`.trim()}>
      {children}
    </Tag>
  );
};

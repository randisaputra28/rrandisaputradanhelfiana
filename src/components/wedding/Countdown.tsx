import { useEffect, useState } from "react";

interface Props { targetDate: Date; }

export const Countdown = ({ targetDate }: Props) => {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [t, setT] = useState(calc());
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = [
    { label: "Hari", value: t.days },
    { label: "Jam", value: t.hours },
    { label: "Menit", value: t.minutes },
    { label: "Detik", value: t.seconds },
  ];
  return (
    <div className="grid grid-cols-4 gap-3 md:gap-5 max-w-md mx-auto">
      {items.map((i) => (
        <div key={i.label} className="bg-card border border-gold/30 rounded-xl py-4 shadow-soft">
          <div className="text-3xl md:text-4xl font-serif-display font-semibold text-gold">
            {String(i.value).padStart(2, "0")}
          </div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{i.label}</div>
        </div>
      ))}
    </div>
  );
};

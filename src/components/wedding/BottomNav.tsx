import { Home, Users, Calendar, Image as ImageIcon, Mail, Wallet } from "lucide-react";

const items = [
  { id: "hero", label: "Home", Icon: Home },
  { id: "couple", label: "Mempelai", Icon: Users },
  { id: "event", label: "Acara", Icon: Calendar },
  { id: "gallery", label: "Galeri", Icon: ImageIcon },
  { id: "rsvp", label: "RSVP", Icon: Mail },
  { id: "gift", label: "Hadiah", Icon: Wallet },
];

export const BottomNav = () => {
  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 max-w-[95vw]">
      <div className="flex items-center gap-0.5 sm:gap-1 bg-card/90 backdrop-blur-md border border-gold/40 rounded-full px-2 py-1.5 shadow-elegant">
        {items.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => go(id)}
            aria-label={label}
            className="flex flex-col items-center justify-center px-2 sm:px-3 py-1.5 rounded-full text-primary hover:bg-gold/20 transition-colors min-w-[44px]"
          >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
            <span className="text-[9px] sm:text-[10px] mt-0.5 leading-none">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

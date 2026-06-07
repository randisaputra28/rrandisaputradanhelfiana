import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Wallet, QrCode } from "lucide-react";
import { toast } from "sonner";
import qrisRahel from "@/assets/qris-rahel.jpeg";

type CardKind = "bca" | "bri" | "dana";
interface BankCard {
  kind: CardKind;
  bankName: string;
  bankTagline: string;
  number: string;
  name: string;
}

const cards: BankCard[] = [
  { kind: "bca", bankName: "BCA", bankTagline: "Bank Central Asia", number: "1110022878801", name: "RANDI SAPUTRA" },
  { kind: "bri", bankName: "BRI", bankTagline: "Bank Rakyat Indonesia", number: "1110022878801", name: "RANDI SAPUTRA" },
  { kind: "dana", bankName: "DANA", bankTagline: "Digital Wallet", number: "082388522071", name: "RANDI SAPUTRA" },
];

const formatNumber = (n: string) => n.replace(/(.{4})/g, "$1 ").trim();

const cardStyles: Record<CardKind, { bg: string; ring: string; logo: string; tag: string }> = {
  bca: {
    bg: "bg-[linear-gradient(135deg,#003a8c_0%,#0050b3_45%,#1d4ed8_100%)]",
    ring: "ring-blue-300/40",
    logo: "text-white",
    tag: "text-blue-100/80",
  },
  bri: {
    bg: "bg-[linear-gradient(135deg,#0b2545_0%,#13315c_50%,#1b4079_100%)]",
    ring: "ring-amber-300/30",
    logo: "text-white",
    tag: "text-blue-100/80",
  },
  dana: {
    bg: "bg-[linear-gradient(135deg,#0ea5e9_0%,#38bdf8_50%,#7dd3fc_100%)]",
    ring: "ring-sky-200/50",
    logo: "text-white",
    tag: "text-white/85",
  },
};

const PremiumCard = ({ card, index }: { card: BankCard; index: number }) => {
  const s = cardStyles[card.kind];
  const copy = () => {
    navigator.clipboard.writeText(card.number);
    toast.success(`Nomor ${card.bankName} disalin`);
  };
  return (
    <div
      className="relative group animate-fade-up"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div
        className={`relative ${s.bg} rounded-2xl p-5 aspect-[1.586/1] w-full overflow-hidden ring-1 ${s.ring} shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[0.4deg]`}
      >
        {/* Glass reflection */}
        <div className="pointer-events-none absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.35),transparent_45%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.18)_50%,transparent_70%)] opacity-60" />
        {/* Hologram dot */}
        <div className="pointer-events-none absolute bottom-3 right-3 w-10 h-10 rounded-full bg-[conic-gradient(from_0deg,#f0abfc,#67e8f9,#fde68a,#f0abfc)] opacity-40 blur-[2px]" />

        {/* Top row */}
        <div className="relative flex items-start justify-between">
          <div>
            <div className={`text-2xl font-black tracking-tight ${s.logo} drop-shadow`}>
              {card.bankName}
            </div>
            <div className={`text-[10px] uppercase tracking-[0.2em] ${s.tag} mt-0.5`}>{card.bankTagline}</div>
          </div>
          {card.kind === "dana" ? (
            <div className="bg-white/90 rounded-md p-1.5">
              <QrCode className="w-5 h-5 text-sky-700" />
            </div>
          ) : (
            // Gold chip
            <div className="w-10 h-7 rounded-[5px] bg-[linear-gradient(135deg,#fde68a,#d4a017_55%,#a16207)] shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-[1px] opacity-40">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-amber-900/40" />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Number */}
        <div className="relative mt-5 sm:mt-7">
          <div className="text-white font-mono text-base sm:text-xl tracking-[0.15em] drop-shadow font-semibold break-all">
            {formatNumber(card.number)}
          </div>
        </div>

        {/* Bottom row */}
        <div className="relative mt-3 flex items-end justify-between">
          <div>
            <div className="text-[9px] uppercase tracking-widest text-white/70">Card Holder</div>
            <div className="text-white font-semibold text-sm tracking-wide">{card.name}</div>
          </div>
          <button
            onClick={copy}
            className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white text-xs font-medium px-3 h-9 rounded-full transition-all active:scale-95"
            aria-label={`Salin nomor ${card.bankName}`}
          >
            <Copy className="w-3.5 h-3.5" /> Salin
          </button>
        </div>
      </div>
    </div>
  );
};

export const DigitalEnvelope = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="border-gold text-gold hover:bg-gold hover:text-primary-foreground min-h-12 px-6 rounded-full"
      >
        <Wallet className="w-4 h-4 mr-2" /> Kirim Hadiah
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif-display text-2xl text-center">Amplop Digital</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Doa restu Anda merupakan karunia yang sangat berarti. Bagi yang ingin memberikan tanda kasih:
          </p>
          <div className="space-y-4">
            {cards.map((c, i) => (
              <PremiumCard key={c.kind} card={c} index={i} />
            ))}
            <div className="bg-secondary/50 border border-gold/30 rounded-2xl p-4 text-center animate-fade-up" style={{ animationDelay: "360ms" }}>
              <div className="text-xs uppercase tracking-wider text-gold font-semibold mb-2">QRIS</div>
              <img src={qrisRahel} alt="QRIS Rahel Fragrance" className="w-full max-w-[240px] mx-auto rounded-lg" loading="lazy" />
              <div className="text-sm text-muted-foreground mt-2">a.n. Rahel Fragrance</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

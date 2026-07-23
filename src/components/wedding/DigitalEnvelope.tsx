import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Wallet } from "lucide-react";
import { toast } from "sonner";
import qrisRahel from "@/assets/qris-rahel.jpeg";

const ACCOUNT = {
  number: "1110022878801",
  display: "1110 0228 7880 1",
  name: "RANDI SAPUTRA",
};

const MandiriCard = () => {
  const copy = () => {
    navigator.clipboard.writeText(ACCOUNT.number);
    toast.success("Nomor rekening berhasil disalin.");
  };

  // build red dotted map-ish pattern with radial-gradient dots
  const dotsBg =
    "radial-gradient(circle at 1px 1px, rgba(220,38,38,0.55) 1px, transparent 1.6px)";

  return (
    <div className="group animate-fade-up w-full" style={{ animationDelay: "80ms" }}>
      <div
        className="relative w-full aspect-[1.586/1] overflow-hidden p-4 sm:p-5 text-white transition-all duration-300 group-hover:-translate-y-1.5"
        style={{
          borderRadius: "16px",
          background:
            "linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 35%,#2a2a2a 60%,#101010 100%)",
          boxShadow:
            "0 24px 50px -18px rgba(0,0,0,0.75), 0 8px 20px -8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        {/* brushed metal sheen */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60 mix-blend-overlay"
          style={{
            background:
              "repeating-linear-gradient(115deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 3px)",
          }}
        />
        {/* diagonal glass highlight */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_40%,rgba(255,255,255,0.08)_50%,transparent_60%)]" />

        {/* Red dotted Indonesia-style map cluster (decorative) */}
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            backgroundImage: dotsBg,
            backgroundSize: "6px 6px",
            WebkitMaskImage:
              "radial-gradient(ellipse 65% 55% at 42% 58%, #000 35%, transparent 70%)",
            maskImage:
              "radial-gradient(ellipse 65% 55% at 42% 58%, #000 35%, transparent 70%)",
          }}
        />

        {/* Top row: chip (left) + mandiri logo (right) */}
        <div className="relative flex items-start justify-between">
          {/* Gold chip */}
          <div
            className="relative w-10 h-7 sm:w-12 sm:h-9 rounded-[5px] overflow-hidden shadow-inner mt-6 sm:mt-7"
            style={{ background: "linear-gradient(135deg,#fde68a 0%,#f5c518 45%,#a87a0b 100%)" }}
          >
            <div className="absolute inset-1 grid grid-cols-3 grid-rows-3 gap-[1px] opacity-50">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bg-amber-900/50" />
              ))}
            </div>
          </div>

          {/* mandiri logo */}
          <div className="flex flex-col items-end leading-none">
            <div className="flex items-end gap-[3px] mb-1">
              <span className="block w-1.5 h-2.5 sm:w-2 sm:h-3 rounded-[1px] bg-[#ffd200]" />
              <span className="block w-1.5 h-3.5 sm:w-2 sm:h-4 rounded-[1px] bg-[#ffd200]/80" />
              <span className="block w-1.5 h-2.5 sm:w-2 sm:h-3 rounded-[1px] bg-[#1d4ed8]" />
            </div>
            <div className="text-lg sm:text-2xl font-black italic tracking-tight text-white">
              mandiri
            </div>
          </div>
        </div>

        {/* Card number */}
        <div className="relative mt-3 sm:mt-4">
          <div
            className="font-mono font-semibold text-white tracking-[0.15em] text-[15px] sm:text-xl md:text-2xl"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.6)" }}
          >
            {ACCOUNT.display}
          </div>
          <div className="mt-1 text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-white/60">
            Member Since · 2026
          </div>
        </div>

        {/* Bottom row: name + GPN */}
        <div className="relative mt-2 sm:mt-3 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="font-semibold text-[11px] sm:text-sm tracking-[0.15em] truncate">
              {ACCOUNT.name}
            </div>
          </div>
          {/* GPN badge */}
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-[8px] sm:text-[9px] font-black text-white shadow">
              ✦
            </div>
            <div className="leading-none">
              <div className="text-[10px] sm:text-xs font-black tracking-wider text-white">GPN</div>
              <div className="text-[6px] sm:text-[7px] tracking-[0.2em] text-white/70 uppercase">Nasional</div>
            </div>
          </div>
        </div>
      </div>

      {/* Account details */}
      <div className="mt-3 text-center">
        <div className="text-xs text-muted-foreground">Bank Mandiri · a.n. {ACCOUNT.name}</div>
      </div>

      {/* Copy button */}
      <button
        onClick={copy}
        className="mt-3 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#1a1a1a] to-[#3a3a3a] hover:opacity-95 text-white text-sm font-semibold px-5 h-12 rounded-full transition-all active:scale-[0.98] shadow-[0_8px_20px_-6px_rgba(0,0,0,0.55)] border border-[#ffd200]/40"
      >
        <Copy className="w-4 h-4 text-[#ffd200]" /> Salin Nomor Rekening
      </button>
    </div>
  );
};

export const DigitalEnvelope = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="gift-frame">
        <Button
          onClick={() => setOpen(true)}
          className="rounded-full min-h-12 px-7 text-primary-foreground border-0 hover:scale-[1.03] transition-transform"
          style={{ background: "linear-gradient(135deg, #2a1a08 0%, #4a2f10 50%, #2a1a08 100%)" }}
        >
          <span className="gift-emoji text-xl mr-2" aria-hidden>🎁</span>
          <span className="font-semibold tracking-wide" style={{ color: "hsl(42 90% 82%)" }}>Kirim Hadiah</span>
        </Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif-display text-2xl text-center">Amplop Digital</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground text-center mb-4 px-1">
            Doa restu Anda merupakan karunia yang sangat berarti. Bagi yang ingin memberikan tanda kasih:
          </p>
          <div className="space-y-5">
            <MandiriCard />
            <div className="bg-secondary/50 border border-gold/30 rounded-2xl p-4 text-center animate-fade-up" style={{ animationDelay: "200ms" }}>
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

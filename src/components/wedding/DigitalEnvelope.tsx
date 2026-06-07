import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Wallet } from "lucide-react";
import { toast } from "sonner";
import qrisRahel from "@/assets/qris-rahel.jpeg";

const ACCOUNT = {
  bank: "MANDIRI",
  tagline: "Bank Mandiri",
  number: "1110022878801",
  display: "111-0022-8788-01",
  name: "RANDI SAPUTRA",
};

const MandiriCard = () => {
  const copy = () => {
    navigator.clipboard.writeText(ACCOUNT.number);
    toast.success("Nomor rekening berhasil disalin.");
  };
  return (
    <div className="group animate-fade-up w-full" style={{ animationDelay: "80ms" }}>
      <div
        className="relative w-full aspect-[1.586/1] overflow-hidden p-5 sm:p-6 text-white transition-all duration-300 group-hover:-translate-y-1.5"
        style={{
          borderRadius: "20px",
          background:
            "linear-gradient(135deg,#001a4d 0%,#003a8c 40%,#0b4ba8 75%,#1d4ed8 100%)",
          boxShadow:
            "0 24px 50px -18px rgba(0,30,90,0.65), 0 8px 20px -8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)",
        }}
      >
        {/* glass highlight */}
        <div className="pointer-events-none absolute -top-1/3 -left-1/4 w-[160%] h-[120%] bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.35),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.18)_50%,transparent_65%)]" />
        {/* subtle wave */}
        <div className="pointer-events-none absolute -right-10 -bottom-10 w-56 h-56 rounded-full bg-[radial-gradient(circle,rgba(253,224,71,0.18),transparent_60%)]" />

        {/* Top row: Logo + chip */}
        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-2">
            {/* Mandiri-style logo mark */}
            <div className="flex items-center gap-1">
              <span className="block w-2.5 h-5 sm:w-3 sm:h-6 rounded-sm bg-[#ffd200] shadow-[0_0_8px_rgba(255,210,0,0.6)]" />
              <span className="block w-2.5 h-5 sm:w-3 sm:h-6 rounded-sm bg-[#ffd200]/80" />
              <span className="block w-2.5 h-5 sm:w-3 sm:h-6 rounded-sm bg-[#ffd200]/60" />
            </div>
            <div className="leading-tight ml-1">
              <div className="text-base sm:text-lg font-black tracking-wide italic">mandiri</div>
              <div className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-blue-100/80">Premium Debit</div>
            </div>
          </div>
          {/* Gold chip */}
          <div className="relative w-11 h-8 sm:w-12 sm:h-9 rounded-[6px] overflow-hidden shadow-inner"
            style={{ background: "linear-gradient(135deg,#fde68a 0%,#f5c518 40%,#b8860b 100%)" }}>
            <div className="absolute inset-1 grid grid-cols-3 grid-rows-3 gap-[1px] opacity-50">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bg-amber-900/40" />
              ))}
            </div>
          </div>
        </div>

        {/* Card number */}
        <div className="relative mt-5 sm:mt-7">
          <div className="font-mono font-semibold tracking-[0.12em] text-base sm:text-xl md:text-2xl drop-shadow-md break-all">
            {ACCOUNT.display}
          </div>
        </div>

        {/* Bottom row */}
        <div className="relative mt-3 sm:mt-4 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-blue-100/70">Card Holder</div>
            <div className="font-semibold text-xs sm:text-sm tracking-wide truncate">{ACCOUNT.name}</div>
          </div>
          <div className="text-right">
            <div className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-blue-100/70">Bank</div>
            <div className="font-semibold text-xs sm:text-sm tracking-wide">{ACCOUNT.tagline}</div>
          </div>
        </div>
      </div>

      {/* Copy button */}
      <button
        onClick={copy}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#003a8c] to-[#1d4ed8] hover:opacity-95 text-white text-sm font-semibold px-5 h-12 rounded-full transition-all active:scale-[0.98] shadow-[0_8px_20px_-6px_rgba(0,58,140,0.55)]"
      >
        <Copy className="w-4 h-4" /> Salin Nomor Rekening
      </button>
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

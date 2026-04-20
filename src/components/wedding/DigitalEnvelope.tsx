import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Wallet } from "lucide-react";
import { toast } from "sonner";
import qrisRahel from "@/assets/qris-rahel.jpeg";

const accounts = [
  { type: "Bank Mandiri", number: "1110022878801", name: "Randi Saputra" },
  { type: "DANA", number: "082388522071", name: "Randi Saputra" },
];

export const DigitalEnvelope = () => {
  const [open, setOpen] = useState(false);
  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
    toast.success("Nomor disalin");
  };
  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline" className="border-gold text-gold hover:bg-gold hover:text-primary-foreground">
        <Wallet className="w-4 h-4 mr-2" /> Kirim Hadiah
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif-display text-2xl text-center">Amplop Digital</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground text-center mb-2">
            Doa restu Anda merupakan karunia yang sangat berarti. Bagi yang ingin memberikan tanda kasih, dapat melalui:
          </p>
          <div className="space-y-3">
            {accounts.map((a) => (
              <div key={a.type} className="bg-secondary/50 border border-gold/30 rounded-xl p-4">
                <div className="text-xs uppercase tracking-wider text-gold font-semibold">{a.type}</div>
                <div className="text-lg font-mono font-semibold mt-1">{a.number}</div>
                <div className="text-sm text-muted-foreground">a.n. {a.name}</div>
                <Button onClick={() => copy(a.number)} size="sm" variant="ghost" className="mt-2 h-8">
                  <Copy className="w-3 h-3 mr-1" /> Salin
                </Button>
              </div>
            ))}
            <div className="bg-secondary/50 border border-gold/30 rounded-xl p-4 text-center">
              <div className="text-xs uppercase tracking-wider text-gold font-semibold mb-2">QRIS</div>
              <img src={qrisRahel} alt="QRIS Rahel Fragrance" className="w-full max-w-[260px] mx-auto rounded-lg" />
              <div className="text-sm text-muted-foreground mt-2">a.n. Rahel Fragrance</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

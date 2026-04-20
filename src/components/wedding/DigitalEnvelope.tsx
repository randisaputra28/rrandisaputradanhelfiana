import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Wallet } from "lucide-react";
import { toast } from "sonner";

const accounts = [
  { bank: "BCA", number: "1234567890", name: "Randi Saputra" },
  { bank: "Mandiri", number: "0987654321", name: "Helfi Angeliana" },
];

export const DigitalEnvelope = () => {
  const [open, setOpen] = useState(false);
  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
    toast.success("Nomor rekening disalin");
  };
  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline" className="border-gold text-gold hover:bg-gold hover:text-primary-foreground">
        <Wallet className="w-4 h-4 mr-2" /> Kirim Hadiah
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-serif-display text-2xl text-center">Amplop Digital</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground text-center mb-2">
            Doa restu Anda merupakan karunia yang sangat berarti. Bagi yang ingin memberikan tanda kasih, dapat melalui:
          </p>
          <div className="space-y-3">
            {accounts.map((a) => (
              <div key={a.bank} className="bg-secondary/50 border border-gold/30 rounded-xl p-4">
                <div className="text-xs uppercase tracking-wider text-gold font-semibold">{a.bank}</div>
                <div className="text-lg font-mono font-semibold mt-1">{a.number}</div>
                <div className="text-sm text-muted-foreground">a.n. {a.name}</div>
                <Button onClick={() => copy(a.number)} size="sm" variant="ghost" className="mt-2 h-8">
                  <Copy className="w-3 h-3 mr-1" /> Salin
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

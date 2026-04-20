import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const RsvpForm = ({ defaultName = "" }: { defaultName?: string }) => {
  const [name, setName] = useState(defaultName);
  const [attendance, setAttendance] = useState<"hadir" | "tidak_hadir" | "ragu">("hadir");
  const [count, setCount] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Mohon isi nama Anda");
    setLoading(true);
    const { error } = await supabase.from("rsvps").insert({
      guest_name: name.trim(),
      attendance,
      guest_count: count,
      message: message.trim() || null,
    });
    if (message.trim()) {
      await supabase.from("guestbook").insert({ name: name.trim(), message: message.trim() });
    }
    setLoading(false);
    if (error) return toast.error("Gagal mengirim RSVP");
    toast.success("Terima kasih! Konfirmasi kehadiran Anda telah terkirim.");
    setMessage("");
  };

  const opts: Array<{ v: typeof attendance; l: string }> = [
    { v: "hadir", l: "Hadir" },
    { v: "tidak_hadir", l: "Tidak Hadir" },
    { v: "ragu", l: "Masih Ragu" },
  ];

  return (
    <form onSubmit={submit} className="space-y-4 bg-card border border-gold/30 rounded-2xl p-6 shadow-soft">
      <div>
        <Label htmlFor="name">Nama</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama Anda" className="mt-1.5" />
      </div>
      <div>
        <Label>Konfirmasi Kehadiran</Label>
        <div className="grid grid-cols-3 gap-2 mt-1.5">
          {opts.map((o) => (
            <button
              key={o.v}
              type="button"
              onClick={() => setAttendance(o.v)}
              className={`px-3 py-2 rounded-md text-sm border transition-all ${
                attendance === o.v
                  ? "bg-gold text-primary-foreground border-gold"
                  : "bg-background border-border hover:border-gold/50"
              }`}
            >
              {o.l}
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label htmlFor="count">Jumlah Tamu</Label>
        <Input id="count" type="number" min={1} max={10} value={count} onChange={(e) => setCount(Number(e.target.value))} className="mt-1.5" />
      </div>
      <div>
        <Label htmlFor="msg">Ucapan & Doa</Label>
        <Textarea id="msg" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tuliskan ucapan & doa terbaik untuk kedua mempelai..." rows={4} className="mt-1.5" />
      </div>
      <Button type="submit" disabled={loading} className="w-full bg-gold hover:bg-gold/90 text-primary-foreground">
        {loading ? "Mengirim..." : "Kirim Konfirmasi"}
      </Button>
    </form>
  );
};

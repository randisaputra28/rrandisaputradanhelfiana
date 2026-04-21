import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

const TEMPLATE_MESSAGES = [
  { label: "Barakallahu laka...", text: "Barakallahu laka wa baraka 'alaika wa jama'a bainakuma fi khair. Semoga menjadi keluarga sakinah, mawaddah, warahmah. Aamiin." },
  { label: "Selamat menempuh hidup baru...", text: "Selamat menempuh hidup baru! Semoga selalu bahagia, langgeng sampai jannah, dan dikaruniai keturunan yang shaleh & shalehah." },
  { label: "Selamat berbahagia...", text: "Selamat berbahagia Randi & Helfi. Semoga pernikahan ini menjadi awal dari kisah indah yang penuh berkah dan cinta sejati." },
  { label: "Semoga Allah memberkahi...", text: "Semoga Allah senantiasa memberkahi pernikahan kalian, melimpahkan rahmat, kasih sayang, dan kebahagiaan dunia akhirat." },
  { label: "Tahniah & selamat...", text: "Tahniah & selamat menempuh bahtera rumah tangga. Jadilah pasangan yang saling melengkapi, menguatkan, dan menyayangi sepanjang masa." },
];

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
    <form onSubmit={submit} className="space-y-4 bg-card border border-gold/30 rounded-2xl p-5 sm:p-6 shadow-soft">
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
              className={`px-2 py-2 rounded-md text-xs sm:text-sm border transition-all ${
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
        <div className="flex items-center justify-between mb-1.5">
          <Label htmlFor="msg">Ucapan & Doa</Label>
          <Sparkles className="w-3.5 h-3.5 text-gold" />
        </div>
        <Textarea id="msg" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tuliskan ucapan & doa terbaik untuk kedua mempelai..." rows={4} />
        <div className="mt-2">
          <p className="text-[11px] uppercase tracking-wider text-gold mb-1.5">Pilih ucapan terbaik</p>
          <div className="flex flex-wrap gap-1.5">
            {TEMPLATE_MESSAGES.map((m, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setMessage(m.text)}
                className="text-[11px] px-2.5 py-1 rounded-full border border-gold/40 bg-background hover:bg-gold/10 text-primary transition-colors"
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Button type="submit" disabled={loading} className="w-full bg-gold hover:bg-gold/90 text-primary-foreground">
        {loading ? "Mengirim..." : "Kirim Konfirmasi"}
      </Button>
    </form>
  );
};

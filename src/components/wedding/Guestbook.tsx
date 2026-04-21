import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Heart, CheckCircle2, XCircle, HelpCircle, Users } from "lucide-react";

interface Entry {
  id: string;
  guest_name: string;
  message: string | null;
  attendance: string;
  guest_count: number;
  created_at: string;
}

const ATTENDANCE_META: Record<string, { label: string; emoji: string; Icon: typeof CheckCircle2; color: string; bg: string }> = {
  hadir: { label: "Hadir", emoji: "🎉", Icon: CheckCircle2, color: "text-sage", bg: "bg-sage/10 border-sage/40" },
  tidak_hadir: { label: "Tidak Hadir", emoji: "😔", Icon: XCircle, color: "text-rose", bg: "bg-rose/10 border-rose/40" },
  ragu: { label: "Masih Ragu", emoji: "🤔", Icon: HelpCircle, color: "text-gold", bg: "bg-gold/10 border-gold/40" },
};

export const Guestbook = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("rsvps")
        .select("id, guest_name, message, attendance, guest_count, created_at")
        .order("created_at", { ascending: false })
        .limit(50);
      if (data) setEntries(data as Entry[]);
    };
    load();
    const interval = setInterval(load, 3000);
    const channel = supabase
      .channel("rsvps-changes")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "rsvps" }, (payload) => {
        setEntries((prev) => [payload.new as Entry, ...prev]);
      })
      .subscribe();
    return () => { clearInterval(interval); supabase.removeChannel(channel); };
  }, []);

  if (!entries.length) {
    return <p className="text-center text-muted-foreground italic">Jadilah yang pertama mengirim ucapan & doa 💐</p>;
  }

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
      {entries.map((e) => {
        const meta = ATTENDANCE_META[e.attendance] ?? ATTENDANCE_META.ragu;
        const Icon = meta.Icon;
        return (
          <div key={e.id} className="bg-card border border-gold/20 rounded-xl p-4 shadow-soft">
            <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose fill-rose" />
                <span className="font-semibold text-primary">{e.guest_name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border ${meta.bg} ${meta.color}`}>
                  <Icon className="w-3 h-3" />
                  {meta.emoji} {meta.label}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border border-gold/40 bg-background text-primary">
                  <Users className="w-3 h-3" /> {e.guest_count}
                </span>
              </div>
            </div>
            {e.message && (
              <p className="text-sm text-muted-foreground leading-relaxed">{e.message}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

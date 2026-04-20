import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Heart } from "lucide-react";

interface Entry { id: string; name: string; message: string; created_at: string; }

export const Guestbook = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("guestbook")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      if (data) setEntries(data);
    };
    load();
    const channel = supabase
      .channel("guestbook-changes")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "guestbook" }, (payload) => {
        setEntries((prev) => [payload.new as Entry, ...prev]);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  if (!entries.length) {
    return <p className="text-center text-muted-foreground italic">Jadilah yang pertama mengirim ucapan & doa 💐</p>;
  }

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
      {entries.map((e) => (
        <div key={e.id} className="bg-card border border-gold/20 rounded-xl p-4 shadow-soft">
          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-4 h-4 text-rose fill-rose" />
            <span className="font-semibold text-primary">{e.name}</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{e.message}</p>
        </div>
      ))}
    </div>
  );
};

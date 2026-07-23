import { Heart, Flower2, Gem, Users } from "lucide-react";

const ITEMS = [
  {
    icon: Flower2,
    emoji: "🌹",
    title: "Awal Pertemuan",
    date: "28 Maret 2018",
    text: "Pada tanggal 28 Maret 2018, kisah kami dimulai. Sebuah pertemuan sederhana yang kemudian menjadi awal dari perjalanan panjang yang penuh cerita, tawa, harapan, dan kebahagiaan.",
  },
  {
    icon: Heart,
    emoji: "💕",
    title: "Menjalin Hubungan",
    date: "2018 – 2025",
    text: "Seiring berjalannya waktu, kami saling mengenal lebih dalam, belajar memahami satu sama lain, serta tumbuh bersama melalui berbagai suka dan duka. Setiap langkah yang kami lalui semakin menguatkan keyakinan bahwa kami adalah bagian dari perjalanan hidup masing-masing.",
  },
  {
    icon: Gem,
    emoji: "💍",
    title: "Menuju Ikatan Suci",
    date: "2026",
    text: "Dengan penuh rasa syukur dan atas izin Allah SWT serta doa restu keluarga, kami memutuskan untuk melangkah ke jenjang yang lebih serius dalam ikatan pernikahan yang suci.",
  },
  {
    icon: Users,
    emoji: "🤍",
    title: "Hari Bahagia",
    date: "21 – 22 Agustus 2026",
    text: "Menjadi hari yang kami nantikan, hari di mana dua hati dan dua keluarga dipersatukan dalam ikatan cinta dan kasih sayang. Semoga langkah baru ini menjadi awal dari kehidupan yang penuh keberkahan, kebahagiaan, dan cinta yang abadi.",
  },
];

export const LoveStory = () => {
  return (
    <section id="love-story" className="relative py-20 px-4 sm:px-6 max-w-3xl mx-auto scroll-mt-16">
      <div className="text-center mb-12 animate-fade-up">
        <p className="text-sm uppercase tracking-[0.3em] text-gold mb-2">❤️ Our Love Story</p>
        <h2 className="font-serif-display text-4xl text-4d" style={{ color: "hsl(42 90% 88%)" }}>Perjalanan Cinta Kami</h2>
        <p className="mt-4 italic font-serif-display text-lg leading-relaxed" style={{ color: "hsl(36 60% 94%)", textShadow: "0 2px 8px hsl(25 45% 8% / 0.6)" }}>
          "Perjalanan cinta yang dipertemukan oleh takdir, dipersatukan oleh waktu, dan disempurnakan dalam ikatan suci pernikahan."
        </p>
      </div>

      <div className="relative">
        {/* vertical line */}
        <div
          className="absolute left-5 sm:left-1/2 top-0 bottom-0 w-px sm:-translate-x-1/2 pointer-events-none"
          style={{ background: "linear-gradient(180deg, transparent, hsl(var(--gold) / 0.5) 12%, hsl(var(--gold) / 0.5) 88%, transparent)" }}
        />

        <ol className="space-y-10 sm:space-y-14">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            const left = i % 2 === 0;
            return (
              <li
                key={item.title}
                className={`relative animate-fade-up sm:grid sm:grid-cols-2 sm:gap-10 ${left ? "" : "sm:[&>*:first-child]:order-2"}`}
                style={{ animationDelay: `${i * 120}ms` }}
              >
                {/* dot */}
                <span className="absolute left-5 sm:left-1/2 top-6 sm:top-8 -translate-x-1/2 z-10 flex items-center justify-center">
                  <span className="absolute w-8 h-8 rounded-full bg-gold/20 animate-shimmer" />
                  <span className="relative w-4 h-4 rounded-full bg-gradient-to-br from-[#f5d27a] to-[#b88a2a] shadow-[0_0_10px_hsl(var(--gold)/0.7)] border border-background" />
                </span>

                {/* card */}
                <div className={`pl-14 sm:pl-0 ${left ? "sm:pr-10 sm:text-right" : "sm:pl-10 sm:text-left"}`}>
                  <div className="group bg-card/80 backdrop-blur-md border border-gold/30 rounded-2xl p-5 sm:p-6 shadow-soft hover:shadow-elegant hover:-translate-y-1 hover:border-gold/60 transition-all duration-300">
                    <div className={`flex items-center gap-3 ${left ? "sm:justify-end" : ""}`}>
                      <span className="text-2xl" aria-hidden>{item.emoji}</span>
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#f5d27a]/30 to-[#b88a2a]/30 border border-gold/40">
                        <Icon className="w-5 h-5 text-gold" />
                      </span>
                    </div>
                    <h3 className="font-serif-display text-2xl text-primary mt-3">{item.title}</h3>
                    <p className="text-xs uppercase tracking-[0.25em] text-gold mt-1">{item.date}</p>
                    <div className={`w-12 h-px bg-gold/60 my-3 ${left ? "sm:ml-auto" : ""}`} />
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                </div>

                {/* spacer for the other column */}
                <div className="hidden sm:block" />
              </li>
            );
          })}
        </ol>
      </div>

    </section>
  );
};

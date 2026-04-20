import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Heart, MapPin, Calendar, Music, Music2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/wedding/Countdown";
import { RsvpForm } from "@/components/wedding/RsvpForm";
import { Guestbook } from "@/components/wedding/Guestbook";
import { DigitalEnvelope } from "@/components/wedding/DigitalEnvelope";
import floralBorder from "@/assets/floral-border.png";
import coupleHero from "@/assets/couple-hero.jpg";
import bgTexture from "@/assets/bg-texture.jpg";

const WEDDING_DATE = new Date("2026-08-15T10:00:00+07:00");

const Index = () => {
  const [params] = useSearchParams();
  const guestName = useMemo(() => (params.get("to") || "Tamu Undangan").replace(/\+/g, " "), [params]);
  const [opened, setOpened] = useState(false);
  const [musicOn, setMusicOn] = useState(false);

  useEffect(() => {
    if (opened) {
      const audio = document.getElementById("bg-music") as HTMLAudioElement | null;
      if (audio) {
        audio.volume = 0.4;
        audio.play().then(() => setMusicOn(true)).catch(() => {});
      }
    }
  }, [opened]);

  const toggleMusic = () => {
    const audio = document.getElementById("bg-music") as HTMLAudioElement | null;
    if (!audio) return;
    if (musicOn) { audio.pause(); setMusicOn(false); }
    else { audio.play().then(() => setMusicOn(true)).catch(() => {}); }
  };

  if (!opened) {
    return (
      <div className="min-h-screen relative flex items-center justify-center overflow-hidden" style={{ backgroundImage: `url(${bgTexture})`, backgroundSize: "cover" }}>
        <img src={floralBorder} alt="" className="absolute top-0 left-0 w-full pointer-events-none opacity-90" />
        <img src={floralBorder} alt="" className="absolute bottom-0 left-0 w-full pointer-events-none opacity-90 rotate-180" />
        <div className="relative z-10 text-center px-6 max-w-md animate-fade-up">
          <p className="text-sm uppercase tracking-[0.4em] text-gold mb-3">The Wedding of</p>
          <h1 className="font-script text-6xl md:text-7xl text-primary mb-2">Randi & Helfi</h1>
          <div className="w-20 h-px bg-gold mx-auto my-6" />
          <p className="text-muted-foreground text-sm mb-1">Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <p className="font-serif-display text-2xl text-primary font-semibold mb-8">{guestName}</p>
          <Button onClick={() => setOpened(true)} size="lg" className="bg-gold hover:bg-gold/90 text-primary-foreground rounded-full px-8 shadow-elegant">
            <BookOpen className="w-4 h-4 mr-2" /> Buka Undangan
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" style={{ backgroundImage: `url(${bgTexture})`, backgroundSize: "cover", backgroundAttachment: "fixed" }}>
      <audio id="bg-music" loop src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_1718e49cf3.mp3?filename=relaxing-145038.mp3" />

      <button onClick={toggleMusic} className="fixed bottom-5 right-5 z-50 bg-gold text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center shadow-elegant hover:scale-110 transition-transform">
        {musicOn ? <Music2 className="w-5 h-5 animate-shimmer" /> : <Music className="w-5 h-5" />}
      </button>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img src={floralBorder} alt="" className="absolute top-0 left-0 w-full pointer-events-none opacity-80 z-10" />
        <div className="absolute inset-0">
          <img src={coupleHero} alt="Randi dan Helfi" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
        </div>
        <div className="relative z-20 text-center px-6 animate-fade-up">
          <p className="text-sm uppercase tracking-[0.5em] text-gold mb-4">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-2">The Wedding of</p>
          <h1 className="font-script text-7xl md:text-9xl text-primary leading-none">Randi</h1>
          <p className="font-serif-display text-3xl text-gold my-2">&</p>
          <h1 className="font-script text-7xl md:text-9xl text-primary leading-none">Helfi</h1>
          <div className="w-24 h-px bg-gold mx-auto my-8" />
          <p className="font-serif-display text-xl md:text-2xl text-primary">Sabtu, 15 Agustus 2026</p>
        </div>
        <img src={floralBorder} alt="" className="absolute bottom-0 left-0 w-full pointer-events-none opacity-80 rotate-180 z-10" />
      </section>

      {/* QUOTE */}
      <section className="py-20 px-6 text-center max-w-2xl mx-auto animate-fade-up">
        <p className="font-serif-display text-2xl md:text-3xl text-primary italic leading-relaxed">
          "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya."
        </p>
        <p className="text-gold mt-4 tracking-widest uppercase text-sm">— QS. Ar-Rum: 21</p>
      </section>

      {/* COUPLE */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-2">The Bride & Groom</p>
          <h2 className="font-serif-display text-4xl text-primary">Mempelai Kami</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          {[
            { name: "Helfi Angeliana", role: "Putri dari", parents: "Bpk. Ahmad & Ibu Siti", side: "The Bride" },
            { name: "Randi Saputra", role: "Putra dari", parents: "Bpk. Hasan & Ibu Aminah", side: "The Groom" },
          ].map((p) => (
            <div key={p.name} className="bg-card/80 backdrop-blur border border-gold/30 rounded-2xl p-8 text-center shadow-elegant">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gold/40 animate-float-slow">
                <img src={coupleHero} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <p className="text-xs uppercase tracking-widest text-gold">{p.side}</p>
              <h3 className="font-script text-4xl text-primary mt-2">{p.name}</h3>
              <p className="text-sm text-muted-foreground mt-3">{p.role}</p>
              <p className="text-sm text-primary font-medium">{p.parents}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="py-16 px-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-gold mb-2">Counting The Days</p>
        <h2 className="font-serif-display text-4xl text-primary mb-8">Menuju Hari Bahagia</h2>
        <Countdown targetDate={WEDDING_DATE} />
      </section>

      {/* EVENT */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-2">Save The Date</p>
          <h2 className="font-serif-display text-4xl text-primary">Acara Pernikahan</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Akad Nikah", time: "10:00 - 12:00 WIB", date: "Sabtu, 15 Agustus 2026" },
            { title: "Resepsi", time: "13:00 - 16:00 WIB", date: "Sabtu, 15 Agustus 2026" },
          ].map((e) => (
            <div key={e.title} className="bg-card/80 backdrop-blur border border-gold/30 rounded-2xl p-8 text-center shadow-soft">
              <Calendar className="w-8 h-8 text-gold mx-auto mb-3" />
              <h3 className="font-serif-display text-3xl text-primary">{e.title}</h3>
              <div className="w-12 h-px bg-gold mx-auto my-4" />
              <p className="text-primary font-medium">{e.date}</p>
              <p className="text-muted-foreground text-sm mt-1">{e.time}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 bg-card/80 backdrop-blur border border-gold/30 rounded-2xl p-8 text-center shadow-soft">
          <MapPin className="w-8 h-8 text-gold mx-auto mb-3" />
          <h3 className="font-serif-display text-2xl text-primary">Lokasi</h3>
          <p className="text-muted-foreground mt-2">Gedung Serbaguna Anggrek<br/>Jl. Melati No. 123, Jakarta Selatan</p>
          <Button asChild className="mt-5 bg-gold hover:bg-gold/90 text-primary-foreground rounded-full">
            <a href="https://maps.google.com/?q=Jakarta+Selatan" target="_blank" rel="noreferrer">
              <MapPin className="w-4 h-4 mr-2" /> Lihat Lokasi
            </a>
          </Button>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-2">Our Moments</p>
          <h2 className="font-serif-display text-4xl text-primary">Galeri</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-xl shadow-soft group">
              <img src={coupleHero} alt={`Moment ${i + 1}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </section>

      {/* RSVP & GUESTBOOK */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-2">RSVP</p>
          <h2 className="font-serif-display text-4xl text-primary">Konfirmasi Kehadiran</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <RsvpForm defaultName={guestName !== "Tamu Undangan" ? guestName : ""} />
          <div>
            <h3 className="font-serif-display text-2xl text-primary mb-4 text-center md:text-left">Ucapan & Doa</h3>
            <Guestbook />
          </div>
        </div>
      </section>

      {/* GIFT */}
      <section className="py-16 px-6 text-center max-w-2xl mx-auto">
        <p className="text-sm uppercase tracking-[0.3em] text-gold mb-2">Wedding Gift</p>
        <h2 className="font-serif-display text-4xl text-primary mb-4">Tanda Kasih</h2>
        <p className="text-muted-foreground mb-6">
          Doa restu Anda adalah hadiah terbaik. Bagi yang ingin mengirimkan tanda kasih, kami sediakan amplop digital.
        </p>
        <DigitalEnvelope />
      </section>

      {/* CLOSING */}
      <section className="relative py-24 px-6 text-center overflow-hidden">
        <img src={floralBorder} alt="" className="absolute top-0 left-0 w-full pointer-events-none opacity-70" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <Heart className="w-10 h-10 text-rose mx-auto mb-4 fill-rose animate-shimmer" />
          <p className="font-serif-display text-xl md:text-2xl text-primary italic leading-relaxed">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.
          </p>
          <p className="mt-6 text-sm uppercase tracking-widest text-gold">Wassalamualaikum Wr. Wb.</p>
          <p className="mt-8 font-serif-display text-lg text-muted-foreground">Hormat Kami,</p>
          <h3 className="font-script text-5xl text-primary mt-2">Randi & Helfi</h3>
        </div>
        <img src={floralBorder} alt="" className="absolute bottom-0 left-0 w-full pointer-events-none opacity-70 rotate-180" />
      </section>

      <footer className="py-6 text-center text-xs text-muted-foreground border-t border-border/50">
        Made with <Heart className="w-3 h-3 inline fill-rose text-rose" /> for Randi & Helfi
      </footer>
    </div>
  );
};

export default Index;

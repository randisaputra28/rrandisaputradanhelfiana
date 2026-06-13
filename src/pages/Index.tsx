import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Heart, MapPin, Calendar, Music, Music2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/wedding/Countdown";
import { RsvpForm } from "@/components/wedding/RsvpForm";
import { Guestbook } from "@/components/wedding/Guestbook";
import { DigitalEnvelope } from "@/components/wedding/DigitalEnvelope";
import { GalleryLightbox } from "@/components/wedding/GalleryLightbox";
import { BottomNav } from "@/components/wedding/BottomNav";
import { SparkleEffect } from "@/components/wedding/SparkleEffect";
import { SakuraPetals } from "@/components/wedding/SakuraPetals";
import { LoveStory } from "@/components/wedding/LoveStory";
import floralBorder from "@/assets/bg-floral-green.jpeg";
import coupleHero from "@/assets/couple-overlay.jpeg";
import bgTexture from "@/assets/bg-floral-green.jpeg";
import coupleOverlay from "@/assets/couple-overlay.jpeg";
import randiPhoto from "@/assets/randi.jpg";
import helfiPhoto from "@/assets/helfi.jpeg";
import g1 from "@/assets/gallery-1.jpeg";
import g2 from "@/assets/gallery-2.jpeg";
import g3 from "@/assets/gallery-3.jpeg";
import g4 from "@/assets/gallery-4.jpeg";

import bgRings from "@/assets/bg-rings.png";
import bgVenue from "@/assets/bg-rumah-gadang.png";
import bgMinangMap from "@/assets/bg-minang-map.png";
import bgMarawa from "@/assets/bg-marawa.png";


const WEDDING_DATE = new Date("2026-08-21T08:00:00+07:00");
const GALLERY = [
  { src: g1, alt: "Momen 1" },
  { src: g2, alt: "Momen 2" },
  { src: g3, alt: "Momen 3" },
  { src: g4, alt: "Momen 4" },
  { src: coupleHero, alt: "Momen 5" },
];

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
      <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: `url(${bgTexture})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <img src={coupleOverlay} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none" />
        <div className="absolute inset-0 bg-background/40" />
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
    <div className="min-h-screen relative pb-32 sm:pb-28">
      <SparkleEffect />
      <SakuraPetals />

      <BottomNav />
      <div className="fixed inset-0 -z-10" style={{ backgroundImage: `url(${bgTexture})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <img src={coupleOverlay} alt="" className="fixed inset-0 -z-10 w-full h-full object-cover opacity-35 pointer-events-none" />
      <div className="fixed inset-0 -z-10 bg-background/30 pointer-events-none" />
      <audio id="bg-music" loop src="/wedding-music.mp3" preload="auto" />

      <button onClick={toggleMusic} className="fixed bottom-20 right-4 z-50 bg-gold text-primary-foreground rounded-full w-11 h-11 flex items-center justify-center shadow-elegant hover:scale-110 transition-transform">
        {musicOn ? <Music2 className="w-5 h-5 animate-shimmer" /> : <Music className="w-5 h-5" />}
      </button>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        <img src={floralBorder} alt="" className="absolute top-0 left-0 w-full pointer-events-none opacity-80 z-10" />
        <div className="absolute inset-0">
          <img src={coupleHero} alt="Randi dan Helfi" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
        </div>
        <div className="relative z-20 text-center w-full max-w-md mx-auto animate-fade-up">
          <p lang="ar" dir="rtl" className="font-arabic text-2xl sm:text-3xl md:text-4xl text-gold mb-4 sm:mb-5 leading-loose drop-shadow-sm" style={{ textShadow: "0 1px 2px hsl(var(--background) / 0.6)" }}>بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] text-muted-foreground mb-2">The Wedding of</p>
          <h1 className="font-script text-6xl sm:text-7xl md:text-9xl text-primary leading-none">Randi</h1>
          <p className="font-serif-display text-2xl sm:text-3xl text-gold my-1 sm:my-2">&</p>
          <h1 className="font-script text-6xl sm:text-7xl md:text-9xl text-primary leading-none">Helfi</h1>
          <div className="w-20 sm:w-24 h-px bg-gold mx-auto my-6 sm:my-8" />
          <p className="font-serif-display text-lg sm:text-xl md:text-2xl text-primary">Jum'at, 21 &middot; Sabtu, 22 Agustus 2026</p>
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

      {/* LOVE STORY */}
      <LoveStory />

      {/* COUPLE */}
      <section id="couple" className="py-16 px-6 max-w-4xl mx-auto scroll-mt-16">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-2">The Bride & Groom</p>
          <h2 className="font-serif-display text-4xl text-primary">Mempelai Kami</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          {[
            { name: "Randi Saputra", role: "Putra ke-2 dari", parents: "Bpk. Lukman & Ibu Amrina", side: "The Groom", photo: randiPhoto },
            { name: "Helfiana Anggraini", role: "Putri ke-2 dari", parents: "Bpk. Heri Sukandi & Ibu Nengsi Harni", side: "The Bride", photo: helfiPhoto },
          ].map((p) => (
            <div key={p.name} className="bg-card/80 backdrop-blur border border-gold/30 rounded-2xl p-8 text-center shadow-elegant animate-fade-up">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gold/40 animate-float-slow">
                <img src={p.photo} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
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
      <section id="event" className="py-16 px-6 max-w-4xl mx-auto scroll-mt-16">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-2">Save The Date</p>
          <h2 className="font-serif-display text-4xl text-primary">Acara Pernikahan</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Akad Nikah", time: "08:00 WIB - Selesai", date: "Jum'at, 21 Agustus 2026", bg: bgRings, opacity: 0.10 },
            { title: "Resepsi", time: "10:00 WIB - Selesai", date: "Sabtu, 22 Agustus 2026", bg: bgVenue, opacity: 0.10 },
          ].map((e) => (
            <div key={e.title} className="group relative overflow-hidden bg-card/80 backdrop-blur-md border border-gold/30 rounded-2xl p-8 text-center shadow-soft hover:shadow-elegant hover:-translate-y-1 hover:border-gold/60 transition-all duration-300 animate-fade-up">
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(circle at 50% 0%, hsl(var(--gold) / 0.18), transparent 60%)" }} />
              <img src={e.bg} alt="" aria-hidden loading="lazy" className="pointer-events-none absolute inset-0 m-auto w-[78%] h-[78%] object-contain" style={{ opacity: e.opacity }} />
              <div className="relative z-10">
                <Calendar className="w-8 h-8 text-gold mx-auto mb-3" />
                <h3 className="font-serif-display text-3xl text-primary">{e.title}</h3>
                <div className="w-12 h-px bg-gold mx-auto my-4" />
                <p className="text-primary font-medium">{e.date}</p>
                <p className="text-muted-foreground text-sm mt-1">{e.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="group relative overflow-hidden mt-8 bg-card/80 backdrop-blur-md border border-gold/30 rounded-2xl p-8 text-center shadow-soft hover:shadow-elegant transition-all duration-300 animate-fade-up">
          <img src={bgMarawa} alt="" aria-hidden loading="lazy" className="pointer-events-none absolute inset-y-0 left-0 h-full w-10 sm:w-14 object-cover" style={{ opacity: 0.12 }} />
          <img src={bgMarawa} alt="" aria-hidden loading="lazy" className="pointer-events-none absolute inset-y-0 right-0 h-full w-10 sm:w-14 object-cover scale-x-[-1]" style={{ opacity: 0.12 }} />
          <img src={bgMinangMap} alt="" aria-hidden loading="lazy" className="pointer-events-none absolute inset-0 m-auto w-[78%] h-[78%] object-contain transition-transform duration-700 group-hover:scale-105" style={{ opacity: 0.10 }} />
          <div className="relative z-10">
            <MapPin className="w-8 h-8 text-gold mx-auto mb-3 animate-float-slow" />
            <h3 className="font-serif-display text-2xl text-primary">Lokasi</h3>
            <p className="text-muted-foreground mt-2">JG7Q+94J, Pasie Laweh,<br/>Kec. Sungai Tarab, Kabupaten Tanah Datar,<br/>Sumatera Barat 27261</p>
            <Button asChild className="mt-5 rounded-full text-primary-foreground shadow-elegant hover:scale-105 transition-transform" style={{ background: "linear-gradient(135deg, #b88a2a, #f5d27a, #b88a2a)" }}>
              <a href="https://maps.app.goo.gl/F3jEsuCrH6HGruDZA" target="_blank" rel="noreferrer">
                <MapPin className="w-4 h-4 mr-2" /> Lihat Lokasi di Google Maps
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-16 px-6 max-w-5xl mx-auto scroll-mt-16">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-2">Our Moments</p>
          <h2 className="font-serif-display text-4xl text-primary">Galeri</h2>
        </div>
        <GalleryLightbox images={GALLERY} />
      </section>

      {/* RSVP & GUESTBOOK */}
      <section id="rsvp" className="py-16 px-6 max-w-5xl mx-auto scroll-mt-16">
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
      <section id="gift" className="py-16 px-6 text-center max-w-2xl mx-auto scroll-mt-16">
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

import { useEffect, useMemo, useRef, useState } from "react";
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
import { DoorReveal } from "@/components/wedding/DoorReveal";
import { Reveal } from "@/components/wedding/Reveal";
import { LoveStory } from "@/components/wedding/LoveStory";
import { SaveToCalendar } from "@/components/wedding/SaveToCalendar";
import randiPhoto from "@/assets/randi.jpg";
import helfiPhoto from "@/assets/helfi.jpeg";
import galleryHeart from "@/assets/gallery-heart.webp";
import galleryPose from "@/assets/gallery-pose.webp";
import galleryRing from "@/assets/gallery-ring.webp";
import galleryNoseTouch from "@/assets/gallery-nose-touch.webp";
import galleryBackToBack from "@/assets/gallery-back-to-back.webp";
import galleryWhisperAsset from "@/assets/gallery-whisper.jpg.asset.json";
import bgOrnamentAsset from "@/assets/bg-ornament.jpg.asset.json";

import bgRings from "@/assets/bg-rings.png";
import bgVenue from "@/assets/bg-rumah-gadang.png";
import bgMinangMap from "@/assets/bg-minang-map.png";
import bgMarawa from "@/assets/bg-marawa.png";

const bgOrnament = bgOrnamentAsset.url;
const WEDDING_DATE = new Date("2026-08-21T08:00:00+07:00");
const GALLERY = [
  { src: galleryHeart, alt: "Momen romantis membentuk hati" },
  { src: galleryWhisperAsset.url, alt: "Momen berbisik penuh cerita" },
  { src: galleryPose, alt: "Potret berdua penuh senyum" },
  { src: galleryRing, alt: "Potret cincin pertunangan" },
  { src: galleryNoseTouch, alt: "Momen manis saling menatap" },
  { src: galleryBackToBack, alt: "Potret elegan bersandar" },
];

const LongTextPop = ({ text, className = "" }: { text: string; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={`text-pop ${inView ? "in-view" : ""} ${className}`.trim()}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="text-pop-word"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {word}&nbsp;
        </span>
      ))}
    </span>
  );
};

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
    if (musicOn) {
      audio.pause();
      setMusicOn(false);
    } else {
      audio.play().then(() => setMusicOn(true)).catch(() => {});
    }
  };

  if (!opened) {
    return (
      <div className="mobile-shell min-h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: `url(${bgOrnament})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsl(25 45% 10% / 0.55), hsl(25 45% 10% / 0.35) 45%, hsl(25 45% 10% / 0.6))" }} />
        <div className="relative z-10 w-[90%] max-w-sm mx-auto animate-fade-up">
          <div className="relative rounded-[1.6rem] p-[2px]" style={{ background: "linear-gradient(135deg, #f5d27a, #b88a2a 40%, #f5d27a 70%, #8a5a15)" }}>
            <div className="relative rounded-[1.5rem] px-6 py-11 text-center overflow-hidden" style={{ background: "linear-gradient(160deg, hsl(36 42% 97% / 0.96), hsl(32 30% 90% / 0.94))" }}>
              <div className="pointer-events-none absolute inset-3 rounded-[1.25rem] border border-gold/50" />
              <div className="pointer-events-none absolute inset-[14px] rounded-[1.1rem] border border-gold/25" />
              <span className="pointer-events-none absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-gold rounded-tl-lg" />
              <span className="pointer-events-none absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-gold rounded-tr-lg" />
              <span className="pointer-events-none absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-gold rounded-bl-lg" />
              <span className="pointer-events-none absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-gold rounded-br-lg" />
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-5">
                  <span className="h-px w-10" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--gold)))" }} />
                  <span className="text-[10px] uppercase tracking-[0.55em] text-gold font-semibold">The Wedding Of</span>
                  <span className="h-px w-10" style={{ background: "linear-gradient(90deg, hsl(var(--gold)), transparent)" }} />
                </div>
                <h1 className="font-script text-[3.4rem] leading-[0.95] text-primary text-4d">Randi</h1>
                <div className="flex items-center justify-center gap-2 my-1">
                  <span className="h-px w-6 bg-gold/50" />
                  <span className="font-serif-display text-xl italic text-gold">&amp;</span>
                  <span className="h-px w-6 bg-gold/50" />
                </div>
                <h1 className="font-script text-[3.4rem] leading-[0.95] text-primary text-4d">Helfi</h1>
                <div className="flex items-center justify-center gap-2 my-5">
                  <span className="h-px w-10 bg-gold/60" />
                  <Heart className="w-4 h-4 text-rose fill-rose" />
                  <span className="h-px w-10 bg-gold/60" />
                </div>
                <p className="font-serif-display text-sm text-primary/85 tracking-wide">21 &middot; 22 Agustus 2026</p>
                <div className="mt-7">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground mb-1">Kepada Yth.</p>
                  <p className="font-serif-display text-lg text-primary font-semibold">{guestName}</p>
                </div>
                <Button onClick={() => setOpened(true)} size="lg" className="mt-7 text-primary-foreground rounded-full px-8 shadow-elegant min-h-12 hover:scale-105 transition-transform" style={{ background: "linear-gradient(135deg, #b88a2a, #f5d27a 50%, #b88a2a)" }}>
                  <BookOpen className="w-4 h-4 mr-2" /> Buka Undangan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="mobile-shell with-ornament min-h-screen relative pb-32 sm:pb-28"
      style={{ ["--ornament-bg" as any]: `url(${bgOrnament})` }}
    >

      <SparkleEffect />

      <BottomNav />
      <audio id="bg-music" loop src="/wedding-music.mp3" preload="auto" />


      <button onClick={toggleMusic} className="fixed bottom-20 right-4 z-50 bg-gold text-primary-foreground rounded-full w-11 h-11 flex items-center justify-center shadow-elegant hover:scale-110 transition-transform">
        {musicOn ? <Music2 className="w-5 h-5 animate-shimmer" /> : <Music className="w-5 h-5" />}
      </button>

      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-10 pb-8">
        <div className="relative z-20 text-center w-full max-w-[22rem] mx-auto animate-fade-up">
          <div className="relative mx-auto rounded-[1.4rem] p-[2px]" style={{ background: "linear-gradient(135deg, #f5d27a, #8a5a15 50%, #f5d27a)" }}>
            <div className="relative rounded-[1.3rem] px-6 py-9 overflow-hidden" style={{ background: "linear-gradient(160deg, hsl(25 30% 10% / 0.68), hsl(25 30% 8% / 0.55))", backdropFilter: "blur(6px)" }}>
              <div className="pointer-events-none absolute inset-2.5 rounded-[1.05rem] border border-gold/40" />
              <span className="pointer-events-none absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gold/80 rounded-tl-md" />
              <span className="pointer-events-none absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gold/80 rounded-tr-md" />
              <span className="pointer-events-none absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gold/80 rounded-bl-md" />
              <span className="pointer-events-none absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gold/80 rounded-br-md" />
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="h-px w-10 bg-gold/70" />
                  <span className="text-[10px] uppercase tracking-[0.55em] text-gold font-semibold">The Wedding Of</span>
                  <span className="h-px w-10 bg-gold/70" />
                </div>
                <h1 className="font-script text-[3.6rem] sm:text-6xl leading-[0.95] text-4d" style={{ color: "hsl(42 90% 88%)" }}>Randi</h1>
                <div className="flex items-center justify-center gap-2 my-1">
                  <span className="h-px w-6 bg-gold/60" />
                  <span className="font-serif-display text-xl italic text-gold">&amp;</span>
                  <span className="h-px w-6 bg-gold/60" />
                </div>
                <h1 className="font-script text-[3.6rem] sm:text-6xl leading-[0.95] text-4d" style={{ color: "hsl(42 90% 88%)" }}>Helfi</h1>
                <div className="flex items-center justify-center gap-3 my-4">
                  <span className="h-px w-12 bg-gold/60" />
                  <Heart className="w-4 h-4 text-rose fill-rose" />
                  <span className="h-px w-12 bg-gold/60" />
                </div>
                <p className="font-serif-display text-sm sm:text-base font-medium tracking-wide" style={{ color: "hsl(36 60% 94%)" }}>Jum'at, 21 &middot; Sabtu, 22 Agustus 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="py-8 sm:py-10 px-4 sm:px-6 max-w-2xl mx-auto -mt-2 sm:-mt-4">
        <Reveal>
          <div className="relative bg-card/90 backdrop-blur-md border border-gold/40 rounded-2xl shadow-elegant px-5 sm:px-8 py-8 sm:py-10 text-center overflow-hidden">
            <div className="pointer-events-none absolute -top-16 -left-16 w-48 h-48 rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--gold) / 0.22), transparent 70%)" }} />
            <div className="pointer-events-none absolute -bottom-16 -right-16 w-48 h-48 rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--rose) / 0.18), transparent 70%)" }} />
            <Heart className="w-7 h-7 text-rose fill-rose mx-auto mb-5 animate-shimmer relative z-10" />
            <p lang="ar" dir="rtl" className="font-arabic text-xl sm:text-2xl md:text-3xl text-gold leading-loose mb-5 relative z-10">
              ﴿وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً﴾
            </p>
            <p className="font-serif-display text-sm sm:text-base text-primary italic leading-relaxed relative z-10">
              <LongTextPop text="Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri supaya kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang." />
            </p>
            <p className="text-gold mt-4 tracking-[0.3em] uppercase text-xs relative z-10">— QS. Ar-Rum: 21</p>
          </div>
        </Reveal>
      </section>

      <LoveStory />

      <section id="couple" className="py-9 sm:py-12 px-5 sm:px-6 max-w-4xl mx-auto scroll-mt-16">
        <Reveal className="text-center mb-9">
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-2">The Bride & Groom</p>
          <h2 className="font-serif-display text-4xl text-primary">Mempelai Kami</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {[
            { name: "Randi Saputra", role: "Putra ke-2 dari", parents: "Bpk. Lukman & Ibu Amrina", side: "The Groom", photo: randiPhoto },
            { name: "Helfiana Anggraini", role: "Putri ke-2 dari", parents: "Bpk. Heri Sukandi & Ibu Nengsi Harni", side: "The Bride", photo: helfiPhoto },
          ].map((p, i) => (
            <DoorReveal key={p.name} delay={i * 150} className="rounded-2xl">
              <div className="bg-card/85 backdrop-blur border border-gold/30 rounded-2xl p-6 sm:p-8 text-center shadow-elegant">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gold/40 animate-float-slow">
                  <img src={p.photo} alt={p.name} className="w-full h-full object-cover object-top" loading="lazy" />
                </div>
                <p className="text-xs uppercase tracking-widest text-gold">{p.side}</p>
                <h3 className="font-script text-3xl sm:text-4xl text-primary mt-2">{p.name}</h3>
                <p className="text-sm text-muted-foreground mt-3">{p.role}</p>
                <p className="text-sm text-primary font-medium">{p.parents}</p>
              </div>
            </DoorReveal>
          ))}
        </div>
      </section>

      <section className="py-9 sm:py-12 px-5 sm:px-6 text-center">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-2">Counting The Days</p>
          <h2 className="font-serif-display text-4xl mb-7" style={{ color: "hsl(36 60% 96%)" }}>Menuju Hari Bahagia</h2>
        </Reveal>
        <Countdown targetDate={WEDDING_DATE} />
      </section>

      <section id="event" className="py-9 sm:py-12 px-5 sm:px-6 max-w-4xl mx-auto scroll-mt-16">
        <Reveal className="text-center mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-2">Save The Date</p>
          <h2 className="font-serif-display text-4xl" style={{ color: "hsl(36 60% 96%)" }}>Acara Pernikahan</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {[
            { title: "Akad Nikah", time: "08:00 WIB - Selesai", date: "Jum'at, 21 Agustus 2026", bg: bgRings, opacity: 0.10 },
            { title: "Resepsi", time: "10:00 WIB - Selesai", date: "Sabtu, 22 Agustus 2026", bg: bgVenue, opacity: 0.10 },
          ].map((e, i) => (
            <DoorReveal key={e.title} delay={i * 150} className="rounded-2xl">
              <div className="group relative overflow-hidden bg-card/85 backdrop-blur-md border border-gold/30 rounded-2xl p-6 sm:p-8 text-center shadow-soft hover:shadow-elegant hover:-translate-y-1 hover:border-gold/60 transition-all duration-300">
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(circle at 50% 0%, hsl(var(--gold) / 0.18), transparent 60%)" }} />
                <img src={e.bg} alt="" aria-hidden loading="lazy" className="pointer-events-none absolute inset-0 m-auto w-[78%] h-[78%] object-contain" style={{ opacity: e.opacity }} />
                <div className="relative z-10">
                  <Calendar className="w-8 h-8 text-gold mx-auto mb-3" />
                  <h3 className="font-serif-display text-2xl sm:text-3xl text-primary">{e.title}</h3>
                  <div className="w-12 h-px bg-gold mx-auto my-3 sm:my-4" />
                  <p className="text-primary font-medium text-sm sm:text-base">{e.date}</p>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-1">{e.time}</p>
                </div>
              </div>
            </DoorReveal>
          ))}
        </div>
        <SaveToCalendar />
        <DoorReveal delay={200} className="rounded-2xl mt-4">
          <div className="group relative overflow-hidden bg-card/85 backdrop-blur-md border border-gold/30 rounded-2xl p-6 sm:p-8 text-center shadow-soft hover:shadow-elegant transition-all duration-300">
            <img src={bgMarawa} alt="" aria-hidden loading="lazy" className="pointer-events-none absolute inset-y-0 left-0 h-full w-10 sm:w-14 object-cover" style={{ opacity: 0.12 }} />
            <img src={bgMarawa} alt="" aria-hidden loading="lazy" className="pointer-events-none absolute inset-y-0 right-0 h-full w-10 sm:w-14 object-cover scale-x-[-1]" style={{ opacity: 0.12 }} />
            <img src={bgMinangMap} alt="" aria-hidden loading="lazy" className="pointer-events-none absolute inset-0 m-auto w-[55%] h-[55%] object-contain transition-transform duration-700 group-hover:scale-105" style={{ opacity: 0.08 }} />
            <div className="relative z-10">
              <MapPin className="w-8 h-8 text-gold mx-auto mb-3 animate-float-slow" />
              <h3 className="font-serif-display text-2xl text-primary">Lokasi</h3>
              <p className="text-muted-foreground mt-2 text-sm sm:text-base">JG7Q+94J, Pasie Laweh,<br />Kec. Sungai Tarab, Kabupaten Tanah Datar,<br />Sumatera Barat 27261</p>
              <div className="mt-5 rounded-2xl overflow-hidden border border-gold/40 shadow-elegant">
                <iframe
                  title="Lokasi Pernikahan"
                  src="https://www.google.com/maps?q=JG7Q%2B94J+Pasie+Laweh+Sungai+Tarab+Tanah+Datar&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-32 sm:h-40"
                />
              </div>
              <Button asChild className="mt-4 rounded-full text-primary-foreground shadow-elegant hover:scale-105 transition-transform min-h-12" style={{ background: "linear-gradient(135deg, #b88a2a, #f5d27a, #b88a2a)" }}>
                <a href="https://maps.app.goo.gl/F3jEsuCrH6HGruDZA" target="_blank" rel="noreferrer">
                  <MapPin className="w-4 h-4 mr-2" /> Buka di Google Maps
                </a>
              </Button>
            </div>
          </div>
        </DoorReveal>
      </section>

      <section id="gallery" className="py-9 sm:py-12 px-5 sm:px-6 max-w-5xl mx-auto scroll-mt-16">
        <Reveal className="text-center mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-2">Our Moments</p>
          <h2 className="font-serif-display text-4xl" style={{ color: "hsl(36 60% 96%)" }}>Galeri</h2>
        </Reveal>
        <GalleryLightbox images={GALLERY} />
      </section>

      <section id="doa" className="py-9 sm:py-12 px-5 sm:px-6 max-w-2xl mx-auto scroll-mt-16">
        <Reveal className="text-center mb-6">
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-2">Doa Untuk Pengantin</p>
          <h2 className="font-serif-display text-3xl sm:text-4xl text-4d-soft" style={{ color: "hsl(36 60% 96%)" }}>Barakallahu Laka</h2>
        </Reveal>
        <DoorReveal className="rounded-2xl">
          <div className="relative bg-card/90 backdrop-blur-md border border-gold/40 rounded-2xl shadow-elegant px-5 sm:px-8 py-8 sm:py-10 text-center overflow-hidden">
            <div className="pointer-events-none absolute -top-16 -left-16 w-48 h-48 rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--gold) / 0.22), transparent 70%)" }} />
            <div className="pointer-events-none absolute -bottom-16 -right-16 w-48 h-48 rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--rose) / 0.18), transparent 70%)" }} />
            <Heart className="w-7 h-7 text-rose fill-rose mx-auto mb-5 animate-shimmer relative z-10" />
            <p lang="ar" dir="rtl" className="font-arabic text-xl sm:text-2xl md:text-3xl text-gold leading-loose mb-5 relative z-10">
              بَارَكَ اللّٰهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِيْ خَيْرٍ
            </p>
            <p className="font-serif-display text-sm sm:text-base text-primary italic leading-relaxed relative z-10">
              <LongTextPop text="Semoga Allah memberkahimu dan memberkahi pernikahanmu, serta semoga Allah mempersatukan kalian berdua dalam kebaikan." />
            </p>
            <p className="text-gold mt-4 tracking-[0.3em] uppercase text-xs relative z-10">— Doa Pernikahan</p>
          </div>
        </DoorReveal>
      </section>

      <section id="rsvp" className="py-9 sm:py-12 px-5 sm:px-6 max-w-5xl mx-auto scroll-mt-16">
        <Reveal className="text-center mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-2">RSVP</p>
          <h2 className="font-serif-display text-4xl" style={{ color: "hsl(36 60% 96%)" }}>Konfirmasi Kehadiran</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          <RsvpForm defaultName={guestName !== "Tamu Undangan" ? guestName : ""} />
          <div>
            <h3 className="font-serif-display text-2xl mb-4 text-center md:text-left" style={{ color: "hsl(36 60% 96%)" }}>Ucapan & Doa</h3>
            <Guestbook />
          </div>
        </div>
      </section>

      <section id="gift" className="py-9 sm:py-12 px-5 sm:px-6 text-center max-w-2xl mx-auto scroll-mt-16">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-2">Wedding Gift</p>
          <h2 className="font-serif-display text-4xl mb-4" style={{ color: "hsl(36 60% 96%)" }}>Tanda Kasih</h2>
          <p className="mb-6" style={{ color: "hsl(36 30% 88%)" }}>
            <LongTextPop text="Doa restu Anda adalah hadiah terbaik. Bagi yang ingin mengirimkan tanda kasih, kami sediakan amplop digital." />
          </p>
        </Reveal>
        <DigitalEnvelope />
      </section>

      <section className="relative py-12 sm:py-16 px-5 sm:px-6 text-center">
        <Reveal>
          <div className="relative max-w-2xl mx-auto bg-card/90 backdrop-blur-md border border-gold/40 rounded-2xl shadow-elegant px-6 sm:px-10 py-10 sm:py-12 overflow-hidden">
            <div className="pointer-events-none absolute inset-3 rounded-[1.1rem] border border-gold/25" />
            <div className="pointer-events-none absolute -top-16 -left-16 w-48 h-48 rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--gold) / 0.22), transparent 70%)" }} />
            <div className="pointer-events-none absolute -bottom-16 -right-16 w-48 h-48 rounded-full" style={{ background: "radial-gradient(circle, hsl(var(--rose) / 0.18), transparent 70%)" }} />
            <div className="relative z-10">
              <Heart className="w-10 h-10 text-rose mx-auto mb-4 fill-rose animate-shimmer" />
              <p className="font-serif-display text-lg sm:text-xl md:text-2xl text-primary italic leading-relaxed">
                <LongTextPop text="Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami." />
              </p>
              <p className="mt-6 text-sm uppercase tracking-widest text-gold">Wassalamualaikum Wr. Wb.</p>
              <p className="mt-6 font-serif-display text-base text-muted-foreground">Hormat Kami,</p>
              <h3 className="font-script text-5xl text-primary mt-1 text-4d">Randi &amp; Helfi</h3>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="py-6 text-center text-xs border-t border-gold/20" style={{ color: "hsl(36 30% 82%)" }}>
        Made with <Heart className="w-3 h-3 inline fill-rose text-rose" /> for Randi & Helfi
      </footer>
    </div>
  );
};

export default Index;

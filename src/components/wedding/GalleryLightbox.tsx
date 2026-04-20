import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Props {
  images: { src: string; alt: string }[];
}

export const GalleryLightbox = ({ images }: Props) => {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) (diff > 0 ? next : prev)();
    setTouchStart(null);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => { setIdx(i); setOpen(true); }}
            className="aspect-square overflow-hidden rounded-xl shadow-soft group cursor-zoom-in"
          >
            <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl bg-background/95 border-gold/30 p-2 md:p-4">
          <div className="relative" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <img src={images[idx].src} alt={images[idx].alt} className="w-full max-h-[80vh] object-contain rounded-lg" />
            <button onClick={() => setOpen(false)} className="absolute -top-1 -right-1 bg-gold text-primary-foreground rounded-full p-1.5 shadow-elegant">
              <X className="w-4 h-4" />
            </button>
            <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-gold/80 hover:bg-gold text-primary-foreground rounded-full p-2 shadow-elegant">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-gold/80 hover:bg-gold text-primary-foreground rounded-full p-2 shadow-elegant">
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="text-center text-xs text-muted-foreground mt-2">{idx + 1} / {images.length}</div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventInfo {
  title: string;
  description: string;
  location: string;
  start: Date; // local WIB
  end: Date;
}

const pad = (n: number) => String(n).padStart(2, "0");
// Format as UTC for ICS/Google (Z suffix)
const fmt = (d: Date) =>
  `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;

const buildICS = (events: EventInfo[]) => {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Randi & Helfi Wedding//ID",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];
  events.forEach((e, i) => {
    lines.push(
      "BEGIN:VEVENT",
      `UID:randi-helfi-${i}-${Date.now()}@wedding`,
      `DTSTAMP:${fmt(new Date())}`,
      `DTSTART:${fmt(e.start)}`,
      `DTEND:${fmt(e.end)}`,
      `SUMMARY:${e.title}`,
      `DESCRIPTION:${e.description}`,
      `LOCATION:${e.location}`,
      // Reminders: 3 days, 2 days, 1 day, 3 hours before — with default device alarm sound
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      "DESCRIPTION:Pernikahan Randi & Helfi — 3 hari lagi",
      "TRIGGER:-P3D",
      "END:VALARM",
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      "DESCRIPTION:Pernikahan Randi & Helfi — 2 hari lagi",
      "TRIGGER:-P2D",
      "END:VALARM",
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      "DESCRIPTION:Pernikahan Randi & Helfi — 1 hari lagi",
      "TRIGGER:-P1D",
      "END:VALARM",
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      "DESCRIPTION:Pernikahan Randi & Helfi — Hari ini",
      "TRIGGER:-PT3H",
      "END:VALARM",
      "END:VEVENT",
    );
  });
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
};

const EVENTS: EventInfo[] = [
  {
    title: "Akad Nikah — Randi & Helfi",
    description: "Akad Nikah Randi Saputra & Helfiana Anggraini",
    location: "Pasie Laweh, Sungai Tarab, Tanah Datar, Sumatera Barat",
    start: new Date("2026-08-21T08:00:00+07:00"),
    end: new Date("2026-08-21T11:00:00+07:00"),
  },
  {
    title: "Resepsi Pernikahan — Randi & Helfi",
    description: "Resepsi Pernikahan Randi Saputra & Helfiana Anggraini",
    location: "Pasie Laweh, Sungai Tarab, Tanah Datar, Sumatera Barat",
    start: new Date("2026-08-22T10:00:00+07:00"),
    end: new Date("2026-08-22T16:00:00+07:00"),
  },
];

const googleCalUrl = (e: EventInfo) => {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    details: `${e.description}\n\nPengingat otomatis aktif H-3 hingga hari H.`,
    location: e.location,
    dates: `${fmt(e.start)}/${fmt(e.end)}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const SaveToCalendar = () => {
  const downloadICS = () => {
    const blob = new Blob([buildICS(EVENTS)], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Randi-Helfi-Wedding.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-stretch">
      <Button
        onClick={downloadICS}
        className="rounded-full text-primary-foreground shadow-elegant hover:scale-105 transition-transform min-h-12 px-6"
        style={{ background: "linear-gradient(135deg, #b88a2a, #f5d27a 50%, #b88a2a)" }}
      >
        <CalendarPlus className="w-4 h-4 mr-2" /> Simpan ke Kalender (+ Alarm)
      </Button>
      <Button
        asChild
        variant="outline"
        className="rounded-full border-gold/60 text-gold hover:bg-gold/10 min-h-12 px-6"
      >
        <a href={googleCalUrl(EVENTS[0])} target="_blank" rel="noreferrer">
          <CalendarPlus className="w-4 h-4 mr-2" /> Google Calendar
        </a>
      </Button>
    </div>
  );
};

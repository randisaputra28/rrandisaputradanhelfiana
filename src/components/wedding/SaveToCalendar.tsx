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
  const saveToCalendar = () => {
    // On mobile devices, opening the .ics file adds the event directly to
    // the native calendar app (with the built-in alarms baked into the file).
    // On desktop, most browsers download the file which the OS opens with
    // the default calendar. Either way it lands in the user's phone/laptop.
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const blob = new Blob([buildICS(EVENTS)], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    if (isMobile) {
      // Direct navigation triggers the OS calendar handler on Android/iOS
      window.location.href = url;
      // As a graceful fallback for Android browsers that block the intent,
      // also open the Google Calendar web flow (user is already signed in
      // to their Google account on the phone in most cases).
      setTimeout(() => {
        window.open(googleCalUrl(EVENTS[0]), "_blank", "noopener");
      }, 800);
    } else {
      const a = document.createElement("a");
      a.href = url;
      a.download = "Randi-Helfi-Wedding.ics";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  };

  return (
    <div className="mt-6 flex justify-center">
      <Button
        onClick={saveToCalendar}
        className="rounded-full text-primary-foreground shadow-elegant hover:scale-105 transition-transform min-h-12 px-7"
        style={{ background: "linear-gradient(135deg, #b88a2a, #f5d27a 50%, #b88a2a)" }}
      >
        <CalendarPlus className="w-4 h-4 mr-2" /> Simpan ke Kalender HP
      </Button>
    </div>
  );
};

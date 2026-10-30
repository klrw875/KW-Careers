// Real dates only. Events hide automatically after `end`. Times are Mountain Time.
export type SiteEvent = {
  id: string;
  title: string;
  pitch: string;
  start: string; // ISO with offset
  end: string;
  location: string;
  officeSlug: "idaho-falls" | "pocatello" | "zoom";
  openTo: string;
  price: string;
  image: "trainingFinancial" | "trainingSession" | "marketPulse" | "mastermind" | "lobby";
  primaryCta: boolean; // the main recruiting CTA while upcoming (hero banner)
  details: string[];
};

export const events: SiteEvent[] = [
  {
    id: "business-planning-clinic-2026-10-29",
    title: "Business Planning Clinic",
    pitch: "Leave with a written plan for your 2027 business.",
    start: "2026-10-29T11:00:00-06:00",
    end: "2026-10-29T13:00:00-06:00",
    location: "Keller Williams Realty East Idaho, 3525 Merlin Dr, Idaho Falls, ID 83404",
    officeSlug: "idaho-falls",
    openTo: "Open to all licensed agents. Free.",
    price: "Free",
    image: "trainingFinancial",
    primaryCta: true,
    details: [
      "The number of conversations, appointments and listings your income goal really takes",
      "Where your 2026 business came from, and how to get more of it",
      "A simple weekly schedule you can keep through a busy spring",
    ],
  },
];

export function upcomingEvents(now = new Date()) {
  return events.filter((e) => new Date(e.end) > now).sort((a, b) => +new Date(a.start) - +new Date(b.start));
}

const tz = "America/Denver";
export function formatEventDate(e: SiteEvent) {
  const s = new Date(e.start), en = new Date(e.end);
  const day = s.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: tz });
  const t = (d: Date) => d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: tz });
  return { day, time: `${t(s)}–${t(en)} MT`, short: s.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: tz }) };
}

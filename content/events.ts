// Real dates only. Events hide automatically after `end`. Times are Mountain Time.
// With EVENTBRITE_TOKEN set, public listed Eventbrite events are added automatically (lib/eventbrite.ts);
// entries here are for events not on Eventbrite, or to add detail to one that is (same registerUrl).
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
  /** Eventbrite (or other) registration page. Without it, the on-site form registers them. */
  registerUrl?: string;
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
  {
    id: "agent-insider-your-brand-your-story-2026-11-04",
    title: "Agent Insider: Your Brand, Your Story",
    pitch: "Scrolling isn’t a strategy. Posting and praying isn’t either.",
    start: "2026-11-04T14:00:00-07:00",
    end: "2026-11-04T15:00:00-07:00",
    location: "Keller Williams Realty East Idaho Training Room, 3525 Merlin Dr, Idaho Falls, ID 83404",
    officeSlug: "idaho-falls",
    openTo: "For agents at every level who want more business from Facebook.",
    price: "See Eventbrite",
    image: "trainingSession",
    primaryCta: true,
    details: [
      "Realtor Matt Hansen on how he uses Facebook to build his business",
      "His three personal brand pillars, and how to choose yours",
      "When, where and how often to post, and how to tag without annoying people",
      "A two-step funnel that turns conversations into clients",
    ],
    registerUrl: "https://www.eventbrite.com/e/agent-insider-your-brand-your-story-tickets-2003376471957",
  },
];

export function upcomingEvents(list: SiteEvent[] = events, now = new Date()) {
  return list.filter((e) => new Date(e.end) > now).sort((a, b) => +new Date(a.start) - +new Date(b.start));
}

const tz = "America/Denver";
export function formatEventDate(e: SiteEvent) {
  const s = new Date(e.start), en = new Date(e.end);
  const day = s.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: tz });
  const t = (d: Date) => d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: tz });
  return { day, time: `${t(s)}–${t(en)} MT`, short: s.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: tz }) };
}

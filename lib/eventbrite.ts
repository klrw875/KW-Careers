// Pulls public, listed events from the KW East Idaho Eventbrite organization so new events
// show on the site without a code change. Needs EVENTBRITE_TOKEN (Eventbrite private token)
// in Vercel; EVENTBRITE_ORG_ID is optional (looked up from the token if missing).
// Any failure falls back to the hand-entered events in content/events.ts.
import { events as manual, hiddenEventbriteTitles, upcomingEvents, type SiteEvent } from "@/content/events";

const API = "https://www.eventbriteapi.com/v3";
const REVALIDATE = 3600; // seconds: a new Eventbrite event shows within the hour

type EbEvent = {
  id: string;
  name: { text: string };
  summary?: string | null;
  url: string;
  start: { utc: string };
  end: { utc: string };
  listed: boolean;
  status: string;
  is_free: boolean;
  online_event: boolean;
  venue?: { name?: string | null; address?: { city?: string | null; localized_address_display?: string | null } } | null;
};

type Fetch = typeof fetch;

async function get<T>(path: string, token: string, f: Fetch): Promise<T> {
  const res = await f(`${API}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: REVALIDATE },
  } as RequestInit);
  if (!res.ok) throw new Error(`Eventbrite ${path}: ${res.status}`);
  return res.json() as Promise<T>;
}

const squash = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
/** True for events like PEAK Leadgen that run on Eventbrite but aren't promoted on the site. */
export const isHidden = (title: string, hidden = hiddenEventbriteTitles) =>
  hidden.some((h) => squash(title).includes(squash(h)));

/** Eventbrite event id from a public event URL (…-tickets-2003376471957?aff=…). */
export const eventbriteId = (url?: string) => url?.match(/-(\d{6,})(?:[/?#]|$)/)?.[1];

export function fromEventbrite(e: EbEvent): SiteEvent {
  const city = e.venue?.address?.city?.toLowerCase() ?? "";
  const address = e.venue?.address?.localized_address_display;
  return {
    id: `eb-${e.id}`,
    title: e.name.text.trim(),
    pitch: e.summary?.trim() ?? "",
    start: e.start.utc,
    end: e.end.utc,
    location: e.online_event ? "Online" : [e.venue?.name, address].filter(Boolean).join(", "),
    officeSlug: e.online_event ? "zoom" : city.includes("pocatello") ? "pocatello" : "idaho-falls",
    openTo: e.is_free ? "Free. Register on Eventbrite." : "Tickets on Eventbrite.",
    price: e.is_free ? "Free" : "See Eventbrite",
    image: "trainingSession",
    primaryCta: true,
    details: [],
    registerUrl: e.url,
  };
}

/** Hand-entered events win over the Eventbrite copy of the same event (they carry curated copy). */
export function mergeEvents(manualList: SiteEvent[], eb: SiteEvent[]) {
  const have = new Set(manualList.map((e) => eventbriteId(e.registerUrl)).filter(Boolean));
  return [...manualList, ...eb.filter((e) => !have.has(eventbriteId(e.registerUrl)))];
}

export async function fetchEventbriteEvents(token: string, orgId?: string, f: Fetch = fetch): Promise<SiteEvent[]> {
  const org = orgId || (await get<{ organizations: { id: string }[] }>("/users/me/organizations/", token, f)).organizations[0]?.id;
  if (!org) return [];
  const { events } = await get<{ events: EbEvent[] }>(
    `/organizations/${org}/events/?status=live&order_by=start_asc&expand=venue&page_size=50`,
    token,
    f,
  );
  // Unlisted/private events (agent-only trainings) stay off the recruiting site
  return events.filter((e) => e.listed && e.status === "live" && !isHidden(e.name.text)).map(fromEventbrite);
}

/** All upcoming events: hand-entered plus Eventbrite (when configured), soonest first. */
export async function getUpcomingEvents(now = new Date()): Promise<SiteEvent[]> {
  const token = process.env.EVENTBRITE_TOKEN;
  if (!token || process.env.STATIC_PREVIEW === "1") return upcomingEvents(manual, now);
  try {
    const eb = await fetchEventbriteEvents(token, process.env.EVENTBRITE_ORG_ID);
    return upcomingEvents(mergeEvents(manual, eb), now);
  } catch (err) {
    console.error("[eventbrite]", err);
    return upcomingEvents(manual, now);
  }
}

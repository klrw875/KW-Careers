import { describe, expect, it } from "vitest";
import { eventbriteId, fetchEventbriteEvents, isHidden, mergeEvents } from "./eventbrite";
import type { SiteEvent } from "@/content/events";

const eb = (over: Record<string, unknown> = {}) => ({
  id: "111222333",
  name: { text: "Open Training " },
  summary: "Bring your questions.",
  url: "https://www.eventbrite.com/e/open-training-tickets-111222333",
  start: { utc: "2026-11-10T21:00:00Z" },
  end: { utc: "2026-11-10T22:00:00Z" },
  listed: true,
  status: "live",
  is_free: true,
  online_event: false,
  venue: { name: "KW Pocatello", address: { city: "Pocatello", localized_address_display: "123 Main St, Pocatello, ID" } },
  ...over,
});

const fakeFetch = (events: unknown[]) =>
  (async (url: string) => {
    const body = url.includes("/users/me/organizations/") ? { organizations: [{ id: "42" }] } : { events };
    if (!url.includes("/users/me/") && !url.includes("/organizations/42/events/")) throw new Error(`unexpected ${url}`);
    return new Response(JSON.stringify(body), { status: 200 });
  }) as unknown as typeof fetch;

describe("eventbrite", () => {
  it("reads the event id from a public link with tracking params", () => {
    expect(eventbriteId("https://www.eventbrite.com/e/agent-insider-your-brand-your-story-tickets-2003376471957?aff=oddtdtcreator&keep_tld=true")).toBe("2003376471957");
    expect(eventbriteId(undefined)).toBeUndefined();
  });

  it("maps public events and skips unlisted or draft ones", async () => {
    const list = await fetchEventbriteEvents("t", undefined, fakeFetch([eb(), eb({ id: "9", listed: false }), eb({ id: "8", status: "draft" })]));
    expect(list).toHaveLength(1);
    expect(list[0]).toMatchObject({
      title: "Open Training",
      pitch: "Bring your questions.",
      officeSlug: "pocatello",
      price: "Free",
      registerUrl: "https://www.eventbrite.com/e/open-training-tickets-111222333",
    });
  });

  it("skips PEAK Leadgen however it's written", async () => {
    expect(isHidden("PEAK Lead Gen: Tuesday Call Session")).toBe(true);
    expect(isHidden("Peak LeadGen")).toBe(true);
    expect(isHidden("Agent Insider: Your Brand, Your Story")).toBe(false);
    const list = await fetchEventbriteEvents("t", "42", fakeFetch([eb({ id: "7", name: { text: "PEAK Leadgen" } }), eb()]));
    expect(list.map((e) => e.title)).toEqual(["Open Training"]);
  });

  it("keeps the hand-entered copy when both list the same event", async () => {
    const [fromEb] = await fetchEventbriteEvents("t", "42", fakeFetch([eb()]));
    const manual = { ...fromEb, id: "manual", title: "Curated", registerUrl: `${fromEb.registerUrl}?aff=x` } as SiteEvent;
    const merged = mergeEvents([manual], [fromEb, { ...fromEb, id: "eb-2", registerUrl: "https://www.eventbrite.com/e/other-tickets-555666777" }]);
    expect(merged.map((e) => e.id)).toEqual(["manual", "eb-2"]);
  });
});

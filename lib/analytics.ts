"use client";
// One place for every tracked event. See docs/event-map.md for the full map.
// Pushes to dataLayer (GTM), gtag (GA4 + Google Ads) and fbq (Meta Pixel) when present.

export type EventName =
  | "quiz_start"
  | "quiz_step"
  | "quiz_complete"
  | "calculator_used"
  | "lead_submit"
  | "booking_complete"
  | "event_register"
  | "video_play"
  | "video_50"
  | "video_complete"
  | "persona_select"
  | "cta_click"
  | "click_to_text"
  | "click_to_call"
  | "exit_offer_view"
  | "hero_variant";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

// Meta standard events used for optimization and the Conversions API dedupe (event_id)
const metaMap: Partial<Record<EventName, string>> = {
  lead_submit: "Lead",
  booking_complete: "Schedule",
  quiz_complete: "CompleteRegistration",
  event_register: "CompleteRegistration",
};

export function track(name: EventName, params: Params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
  window.gtag?.("event", name, params);
  const meta = metaMap[name];
  if (meta) window.fbq?.("track", meta, params, params.event_id ? { eventID: String(params.event_id) } : undefined);
  else window.fbq?.("trackCustom", name, params);
  const adsLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL;
  if (name === "lead_submit" && adsLabel) window.gtag?.("event", "conversion", { send_to: adsLabel });
}

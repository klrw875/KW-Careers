"use client";
import { useState, useSyncExternalStore } from "react";
import { formatEventDate, type SiteEvent } from "@/content/events";
import { LeadForm } from "./LeadForm";
import { track } from "@/lib/analytics";

/** Hides events after their end time on the client too, so a stale static build never shows a past date. */
const noop = () => () => {};
export function useLiveEvents(list: SiteEvent[]) {
  // Current minute in the browser; 0 during SSR/hydration so markup stays identical
  const minute = useSyncExternalStore(noop, () => Math.floor(Date.now() / 60000), () => 0);
  return minute ? list.filter((e) => +new Date(e.end) > minute * 60000) : list;
}

export function EventRegister({ event, dark = false }: { event: SiteEvent; dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const { day, time } = formatEventDate(event);
  if (!open)
    return (
      <button type="button" className="btn btn-red w-full sm:w-auto" onClick={() => setOpen(true)}>
        Save My Seat
      </button>
    );
  return (
    <LeadForm
      source="event"
      submitLabel="Register Free"
      dark={dark}
      compact
      extra={() => ({ eventId: event.id })}
      onSuccess={() => track("event_register", { event: event.id })}
      success={
        <>
          <p className="text-lg font-bold">You’re registered.</p>
          <p className="mt-1">{event.title}: {day}, {time}. We’ll text you a reminder the day before and 2 hours before.</p>
        </>
      }
    />
  );
}

export function NotifyForm() {
  return (
    <div>
      <p className="text-xl font-bold">Next clinic announced soon.</p>
      <p className="mt-1 mb-4 text-kw-gray-medium">Get the date first.</p>
      <LeadForm source="notify" submitLabel="Notify Me" emailOnly success={<p className="font-bold">You’re on the list.</p>} />
    </div>
  );
}

/** Dated banner for the hero while the primary event is upcoming. */
export function EventBanner({ events }: { events: SiteEvent[] }) {
  const live = useLiveEvents(events).filter((e) => e.primaryCta);
  const e = live[0];
  if (!e) return null;
  const { short, time } = formatEventDate(e);
  return (
    <a href="/events#register" className="group flex w-full items-center gap-3 bg-kw-red px-5 py-3 text-sm leading-snug text-white md:w-auto md:max-w-xl md:px-4">
      <span className="shrink-0 font-bold whitespace-nowrap uppercase tracking-wider">{short}</span>
      <span>{e.title}, {time}. {e.openTo}</span>
      <span aria-hidden className="ml-auto transition-transform group-hover:translate-x-1">→</span>
    </a>
  );
}

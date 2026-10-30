"use client";
import { useEffect } from "react";
import { booking, leadOwner } from "@/content/config";
import { track } from "@/lib/analytics";
import { LeadForm } from "./LeadForm";

// Inline calendar (Cal.com or Calendly) on our own page. Until Debbie's link exists,
// a 3-field "request a time" form routes to her like any other lead.
export function Booking({ compact = false, dark = false }: { compact?: boolean; dark?: boolean }) {
  useEffect(() => {
    // Both Cal.com and Calendly post a message to the parent window when a booking completes
    const onMsg = (e: MessageEvent) => {
      const d = e.data as { event?: string; type?: string } | undefined;
      if (d?.event === "calendly.event_scheduled" || d?.type === "bookingSuccessful" || d?.type === "booking_successful") track("booking_complete");
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  // Cal.com, Calendly and Google's ?gv=true embed URLs can sit inline; anything else opens in a new tab.
  const embeddable = !!booking.url && /cal\.com|calendly\.com|[?&]gv=true/.test(booking.url);

  if (booking.url && !embeddable)
    return (
      <div className={dark ? "text-white" : ""}>
        <a
          href={booking.url}
          target="_blank"
          rel="noopener"
          onClick={() => track("cta_click", { cta: "booking_calendar_open" })}
          className="btn btn-red w-full justify-between text-[17px]"
        >
          Pick a time on {leadOwner.firstName}’s calendar <span aria-hidden>→</span>
        </a>
        <p className={`mt-3 text-sm ${dark ? "text-kw-gray-light" : "text-kw-gray-medium"}`}>
          Opens {leadOwner.firstName}’s booking page in a new tab. {booking.minutes} minutes, confidential.
        </p>
        <details className="mt-6">
          <summary className={`min-h-11 cursor-pointer py-2 font-bold ${dark ? "text-white" : ""}`}>
            Rather have {leadOwner.firstName} text you?
          </summary>
          <div className="mt-3">
            <LeadForm source="booking-request" submitLabel="Request My Conversation" dark={dark} compact={compact} />
          </div>
        </details>
      </div>
    );

  if (booking.url)
    return (
      <iframe
        src={booking.url}
        title={`Book a ${booking.minutes}-minute ${booking.meetingName} with ${leadOwner.name}`}
        loading="lazy"
        className={`w-full border-0 bg-white ${compact ? "h-[640px]" : "h-[760px]"}`}
      />
    );

  return (
    <div className={dark ? "text-white" : ""}>
      <p className={`mb-4 text-sm ${dark ? "text-kw-gray-light" : "text-kw-gray-medium"}`}>
        Tell us how to reach you and {leadOwner.firstName} will text you to pick a time that works.
      </p>
      <LeadForm source="booking-request" submitLabel="Request My Conversation" dark={dark} compact={compact} />
    </div>
  );
}

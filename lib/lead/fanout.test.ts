import { describe, expect, it } from "vitest";
import { bookingConfirmEmail } from "./fanout";
import type { Lead } from "./types";

const lead = (over: Partial<Lead> = {}) =>
  ({ id: "1", receivedAt: "", score: "warm", source: "booking-request", firstName: "Steven", email: "s@example.com", mobileE164: "+12085550100", smsConsent: true, ...over }) as Lead;

// 2026-11-03 21:00 UTC = 2pm Mountain; 05:00 UTC = 10pm Mountain
const afternoon = new Date("2026-11-03T21:00:00Z");
const night = new Date("2026-11-04T05:00:00Z");

describe("booking confirmation email", () => {
  it("commits Debbie to a text within the hour during the day", () => {
    const body = bookingConfirmEmail(lead(), afternoon);
    expect(body).toContain("I'll text you within the hour from (208) 590-7653");
    expect(body).toContain("Your current brokerage won't hear about it from us.");
    expect(body).not.toMatch(/reply to this email|call or text me/i);
  });

  it("promises the morning after hours, and a call without SMS consent", () => {
    expect(bookingConfirmEmail(lead({ smsConsent: false }), night)).toContain("I'll call you first thing in the morning");
  });

  it("says the text already went out once Twilio is live", () => {
    expect(bookingConfirmEmail(lead(), afternoon, true)).toContain("I just sent you a text from (208) 590-7653.");
  });
});

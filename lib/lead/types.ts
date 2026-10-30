export type LeadSource = "quiz" | "calculator" | "event" | "booking-request" | "exit-offer" | "refer" | "notify" | "contact";

export type LeadPayload = {
  source: LeadSource;
  firstName?: string;
  lastName?: string;
  mobile?: string;
  email?: string;
  smsConsent?: boolean;
  persona?: string;
  quiz?: Record<string, string>;
  calculator?: Record<string, string | number | boolean>;
  eventId?: string;
  referral?: { agentName?: string; prospectName?: string; prospectMobile?: string };
  attribution?: Record<string, string>;
  heroVariant?: string;
  page?: string;
  eventIdDedupe?: string; // shared with Meta Pixel for Conversions API dedupe
  website?: string; // honeypot, must stay empty
};

export type Lead = LeadPayload & { id: string; receivedAt: string; score: "hot" | "warm" | "nurture"; mobileE164?: string };

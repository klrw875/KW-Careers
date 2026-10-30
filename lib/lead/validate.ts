import type { LeadPayload } from "./types";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function toE164(phone?: string) {
  const d = (phone ?? "").replace(/\D/g, "");
  if (d.length === 10) return `+1${d}`;
  if (d.length === 11 && d.startsWith("1")) return `+${d}`;
  return null;
}

const clip = (s: unknown, n = 200) => (typeof s === "string" ? s.trim().slice(0, n) : undefined);

export function validateLead(body: unknown): { ok: true; lead: LeadPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid request." };
  const b = body as LeadPayload;
  if (b.website) return { ok: false, error: "spam" };
  const lead: LeadPayload = {
    ...b,
    firstName: clip(b.firstName, 60),
    lastName: clip(b.lastName, 60),
    email: clip(b.email, 120)?.toLowerCase(),
    mobile: clip(b.mobile, 30),
  };
  if (lead.source === "refer") {
    if (!lead.referral?.prospectName || !toE164(lead.referral.prospectMobile)) return { ok: false, error: "Add their name and a 10-digit mobile number." };
    return { ok: true, lead };
  }
  // Email-only forms: event notify list and the exit-offer guide
  if (lead.source === "notify" || lead.source === "exit-offer") {
    if (!lead.email || !EMAIL.test(lead.email)) return { ok: false, error: "Enter a valid email." };
    return { ok: true, lead };
  }
  if (!lead.firstName) return { ok: false, error: "Add your first name." };
  if (!toE164(lead.mobile)) return { ok: false, error: "Enter a 10-digit mobile number." };
  if (!lead.email || !EMAIL.test(lead.email)) return { ok: false, error: "Enter a valid email." };
  return { ok: true, lead };
}

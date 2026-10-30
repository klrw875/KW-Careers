import { NextResponse } from "next/server";
import { validateLead, toE164 } from "@/lib/lead/validate";
import { fanOut } from "@/lib/lead/fanout";
import { scoreLead, type QuizAnswers } from "@/lib/quiz";
import type { Lead } from "@/lib/lead/types";

// Dedupe window: the same mobile/email + source within 10 minutes is treated as one lead
// (double taps, back-button resubmits). Per-instance memory is enough for that; the CRM
// and Sheet do long-term dedupe on email/mobile.
const seen = new Map<string, number>();
const WINDOW = 10 * 60 * 1000;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const v = validateLead(body);
  if (!v.ok) {
    // Pretend success to bots so they don't retry
    if (v.error === "spam") return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false, error: v.error }, { status: 422 });
  }

  const p = v.lead;
  const mobileE164 = toE164(p.mobile) ?? undefined;
  const key = `${p.source}:${mobileE164 ?? ""}:${p.email ?? ""}:${p.eventId ?? ""}`;
  const now = Date.now();
  for (const [k, t] of seen) if (now - t > WINDOW) seen.delete(k);
  if (seen.has(key)) return NextResponse.json({ ok: true, duplicate: true });
  seen.set(key, now);

  const lead: Lead = {
    ...p,
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    mobileE164,
    score: p.quiz ? scoreLead(p.quiz as QuizAnswers) : p.source === "booking-request" ? "warm" : "nurture",
  };

  const results = await fanOut(lead);
  const failed = results.filter((r) => !r.ok);
  if (failed.length) console.error("lead fan-out failures", lead.id, failed);
  return NextResponse.json({ ok: true, id: lead.id });
}

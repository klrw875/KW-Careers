// Fan-out for a validated lead: KW Command intake, Google Sheet backup, owner alerts,
// speed-to-lead auto-text + email in Debbie's name, and event reminders.
// Every integration is optional and skipped when its env vars are missing, so the
// form keeps working while integrations are being set up.
import { createHash } from "node:crypto";
import { leadOwner, leadMagnets, site, marketCenter } from "@/content/config";
import { events, formatEventDate } from "@/content/events";
import type { Lead } from "./types";

const env = (k: string) => process.env[k] || undefined;

type Result = { channel: string; ok: boolean; skipped?: boolean; error?: string };

async function safe(channel: string, fn: () => Promise<unknown> | undefined): Promise<Result> {
  try {
    const r = fn();
    if (r === undefined) return { channel, ok: true, skipped: true };
    await r;
    return { channel, ok: true };
  } catch (e) {
    return { channel, ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

async function ok(res: Response) {
  if (!res.ok) throw new Error(`${res.status} ${await res.text().catch(() => "")}`.slice(0, 300));
  return res;
}

function summary(lead: Lead) {
  const lines = [
    `${lead.score.toUpperCase()} lead · ${lead.source}${lead.persona ? ` · ${lead.persona}` : ""}`,
    `${lead.firstName ?? ""} ${lead.lastName ?? ""}`.trim(),
    lead.mobile && `Mobile: ${lead.mobile}`,
    lead.email && `Email: ${lead.email}`,
    lead.quiz && `Quiz: ${Object.entries(lead.quiz).map(([k, v]) => `${k}=${v}`).join(", ")}`,
    lead.calculator && `Calculator: ${Object.entries(lead.calculator).map(([k, v]) => `${k}=${v}`).join(", ")}`,
    lead.eventId && `Event: ${lead.eventId}`,
    lead.referral && `Referral: ${lead.referral.prospectName} ${lead.referral.prospectMobile ?? ""} (from ${lead.referral.agentName ?? "?"})`,
    lead.attribution && `Source: ${Object.entries(lead.attribution).map(([k, v]) => `${k}=${v}`).join(", ")}`,
    `SMS consent: ${lead.smsConsent ? "yes" : "no"}`,
  ];
  return lines.filter(Boolean).join("\n");
}

// ---- channels ----

function sendEmail(to: string, subject: string, text: string, replyTo?: string) {
  const key = env("RESEND_API_KEY");
  const from = env("LEAD_EMAIL_FROM");
  if (!key || !from) return undefined;
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, text, reply_to: replyTo }),
  }).then(ok);
}

function sendSms(to: string, body: string, sendAt?: Date) {
  const sid = env("TWILIO_ACCOUNT_SID");
  const token = env("TWILIO_AUTH_TOKEN");
  const service = env("TWILIO_MESSAGING_SERVICE_SID");
  if (!sid || !token || !service) return undefined;
  const form = new URLSearchParams({ To: to, MessagingServiceSid: service, Body: body });
  // Twilio Message Scheduling: 15 min to 35 days out
  if (sendAt) {
    if (+sendAt - Date.now() < 16 * 60 * 1000) return Promise.resolve();
    form.set("ScheduleType", "fixed");
    form.set("SendAt", sendAt.toISOString());
  }
  return fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: "POST",
    headers: { Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: form,
  }).then(ok);
}

export async function fanOut(lead: Lead) {
  const text = summary(lead);
  const owner = env("LEAD_OWNER_EMAIL") ?? leadOwner.email;
  const ownerSms = env("LEAD_OWNER_SMS") ?? leadOwner.phoneE164;
  const tasks: Promise<Result>[] = [];

  // 1. KW Command: lead-intake email address for this account (confirm with KW tech support).
  //    If KW support gives an API/Zapier webhook instead, set KW_COMMAND_WEBHOOK_URL.
  const kwCommandEmail = env("KW_COMMAND_LEAD_EMAIL");
  tasks.push(safe("kw-command-email", () => (kwCommandEmail ? sendEmail(kwCommandEmail, `New recruiting lead: ${lead.firstName ?? ""}`, text) : undefined)));
  const kwHook = env("KW_COMMAND_WEBHOOK_URL");
  tasks.push(safe("kw-command-webhook", () => (kwHook ? fetch(kwHook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) }).then(ok) : undefined)));

  // 2. Google Sheet backup via an Apps Script web app (see README)
  const sheet = env("GOOGLE_SHEET_WEBHOOK_URL");
  tasks.push(safe("google-sheet", () => (sheet ? fetch(sheet, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ secret: env("GOOGLE_SHEET_SECRET"), ...flatten(lead) }) }).then(ok) : undefined)));

  // 3. Instant alert to the lead owner (Hot leads also go to leadership)
  tasks.push(safe("owner-email", () => sendEmail(owner, `${lead.score === "hot" ? "🔥 HOT " : ""}Recruiting lead: ${lead.firstName ?? lead.referral?.prospectName ?? lead.email}`, text, lead.email)));
  tasks.push(safe("owner-sms", () => sendSms(ownerSms, text.slice(0, 600))));
  const leadership = env("HOT_LEAD_SMS_LIST");
  if (lead.score === "hot" && leadership) for (const n of leadership.split(",")) tasks.push(safe("hot-sms", () => sendSms(n.trim(), text.slice(0, 600))));

  // 4. Speed to lead: auto-text + email in Debbie's name within 60 seconds
  if (lead.mobileE164 && lead.smsConsent) tasks.push(safe("auto-text", () => sendSms(lead.mobileE164!, autoText(lead))));
  if (lead.email && lead.source !== "refer") tasks.push(safe("auto-email", () => sendEmail(lead.email!, autoEmailSubject(lead), autoEmail(lead), leadOwner.email)));

  // 5. Event registration: confirmation now, reminders 24h and 2h before
  const ev = lead.eventId ? events.find((e) => e.id === lead.eventId) : undefined;
  if (ev && lead.mobileE164 && lead.smsConsent) {
    const start = new Date(ev.start);
    const { short, time } = formatEventDate(ev);
    tasks.push(safe("event-24h", () => sendSms(lead.mobileE164!, `Reminder: ${ev.title} is tomorrow, ${time}, at ${marketCenter.street}, ${marketCenter.city}. See you there! – ${leadOwner.firstName}`, new Date(+start - 24 * 3600e3))));
    tasks.push(safe("event-2h", () => sendSms(lead.mobileE164!, `${ev.title} starts in 2 hours (${short}, ${time}) at ${marketCenter.street}. Reply here if you're running late. – ${leadOwner.firstName}`, new Date(+start - 2 * 3600e3))));
  }

  // 6. Meta Conversions API: server-side Lead, deduped against the Pixel by event_id
  const pixel = env("NEXT_PUBLIC_META_PIXEL_ID");
  const capi = env("META_CAPI_TOKEN");
  if (pixel && capi && lead.source !== "refer") tasks.push(safe("meta-capi", () => sendMetaLead(pixel, capi, lead)));

  return Promise.all(tasks);
}

const sha256 = (v: string) => createHash("sha256").update(v.trim().toLowerCase()).digest("hex");

function sendMetaLead(pixel: string, token: string, lead: Lead) {
  const user_data: Record<string, string[]> = {};
  if (lead.email) user_data.em = [sha256(lead.email)];
  if (lead.mobileE164) user_data.ph = [sha256(lead.mobileE164.replace("+", ""))];
  if (lead.firstName) user_data.fn = [sha256(lead.firstName)];
  return fetch(`https://graph.facebook.com/v21.0/${pixel}/events?access_token=${encodeURIComponent(token)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: [{ event_name: "Lead", event_time: Math.floor(Date.now() / 1000), event_id: lead.eventIdDedupe, action_source: "website", event_source_url: `${site.url}${lead.page ?? "/"}`, user_data, custom_data: { source: lead.source, persona: lead.persona, score: lead.score } }],
    }),
  }).then(ok);
}

function autoText(lead: Lead) {
  const hi = `Hi ${lead.firstName}, this is ${leadOwner.name} with ${site.brokerage}.`;
  const stop = " Reply STOP to opt out.";
  const ev = lead.eventId ? events.find((e) => e.id === lead.eventId) : undefined;
  if (ev) {
    const { short, time } = formatEventDate(ev);
    return `${hi} You're registered for the ${ev.title}, ${short}, ${time}, at ${marketCenter.street}, ${marketCenter.city}. Save my number in case you need anything.${stop}`;
  }
  switch (lead.source) {
    case "quiz":
      return `${hi} Saw you just took the career quiz. I'd love to hear what you're looking for. Is now a good time for a quick call, or would you rather text?${stop}`;
    case "calculator":
      return `${hi} Your KW MyWay plan breakdown is on its way to your email. Happy to walk you through it in 20 minutes. When works for you?${stop}`;
    case "booking-request":
      return `${hi} Got your request for a confidential conversation. What day and time work best this week?${stop}`;
    default:
      return `${hi} Thanks for reaching out. What's the best time for a quick, confidential chat?${stop}`;
  }
}

function autoEmailSubject(lead: Lead) {
  if (lead.source === "calculator") return "Your KW MyWay plan breakdown";
  const magnet = magnetFor(lead);
  if (magnet) return `Your copy of ${magnet.title}`;
  if (lead.eventId) return "You're registered";
  if (lead.source === "quiz") return "Your personalized career plan";
  return `${lead.firstName ? `${lead.firstName}, ` : ""}thanks for reaching out`;
}

/** Exit-offer leads carry the guide title in calculator.magnet; returns that guide if it has a file to send. */
function magnetFor(lead: Lead) {
  if (lead.source !== "exit-offer") return null;
  const title = (lead.calculator as Record<string, unknown> | undefined)?.magnet;
  const m = Object.values(leadMagnets).find((g) => g.title === title && g.file);
  return m ?? null;
}

function autoEmail(lead: Lead) {
  const magnet = magnetFor(lead);
  const guide = magnet
    ? `\n\nHere's your copy of ${magnet.title}:\n${site.url}${magnet.file}\n\nGrab a pen. Every section ends with a worksheet. When you've filled in your numbers, I'd love to look at them with you.`
    : "";
  const calc = lead.calculator && !magnet
    ? `\n\nHere's what you entered:\n${Object.entries(lead.calculator).map(([k, v]) => `• ${k}: ${v}`).join("\n")}\n\nI'll send your full side-by-side breakdown and walk you through it. Illustrative only, not a guarantee of income.`
    : "";
  return `Hi ${lead.firstName ?? "there"},\n\nThis is ${leadOwner.name}, ${leadOwner.title} at ${site.brokerage}. Thanks for taking a minute with us.${guide}${calc}\n\nThe easiest next step is a confidential, 20-minute conversation. No pressure, no hard sell. Just reply to this email or call or text me at ${leadOwner.phone}.\n\n${leadOwner.name}\n${site.brokerage}\n${marketCenter.street}, ${marketCenter.city}, ID ${marketCenter.zip}\n${leadOwner.phone}`;
}

function flatten(lead: Lead) {
  const out: Record<string, string> = {};
  const walk = (o: unknown, p: string) => {
    if (o && typeof o === "object") for (const [k, v] of Object.entries(o)) walk(v, p ? `${p}.${k}` : k);
    else if (o !== undefined) out[p] = String(o);
  };
  walk(lead, "");
  return out;
}

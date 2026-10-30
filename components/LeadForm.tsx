"use client";
import { useId, useState } from "react";
import Link from "@/components/SmartLink";
import { getAttribution, getPersona } from "@/lib/attribution";
import { track } from "@/lib/analytics";
import { leadOwner, site } from "@/content/config";
import type { LeadPayload, LeadSource } from "@/lib/lead/types";

const ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "/api/lead";
// Static preview builds have no server; simulate success so the flow can be reviewed.
const PREVIEW = process.env.NEXT_PUBLIC_PREVIEW === "1";

export const TCPA_TEXT = `By checking this box, you agree to receive calls and text messages, including automated messages, from ${site.brokerage} at the number you provided about real estate career opportunities. Consent is not required to talk with us or to join. Msg & data rates may apply. Msg frequency varies. Reply STOP to opt out, HELP for help.`;

export async function submitLead(payload: LeadPayload) {
  const body: LeadPayload = {
    ...payload,
    persona: payload.persona ?? getPersona() ?? undefined,
    attribution: { ...(getAttribution() as Record<string, string>) },
    heroVariant: (typeof document !== "undefined" && document.documentElement.dataset.hero) || undefined,
    page: typeof location !== "undefined" ? location.pathname : undefined,
    eventIdDedupe: crypto.randomUUID(),
  };
  if (PREVIEW) {
    await new Promise((r) => setTimeout(r, 500));
    return { ok: true as const, eventId: body.eventIdDedupe };
  }
  const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
  if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
  return { ok: true as const, eventId: body.eventIdDedupe };
}

type Props = {
  source: LeadSource;
  submitLabel: string;
  extra?: () => Partial<LeadPayload>;
  onSuccess?: (firstName: string) => void;
  success?: React.ReactNode;
  dark?: boolean;
  emailOnly?: boolean;
  compact?: boolean;
};

/** Never more than 3 fields on first ask. Everything else rides along as hidden data. */
export function LeadForm({ source, submitLabel, extra, onSuccess, success, dark = false, emailOnly = false, compact = false }: Props) {
  const id = useId();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [first, setFirst] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const firstName = String(f.get("firstName") ?? "");
    setState("sending");
    setError("");
    try {
      const r = await submitLead({
        source,
        firstName: firstName || undefined,
        mobile: String(f.get("mobile") ?? "") || undefined,
        email: String(f.get("email") ?? ""),
        smsConsent: f.get("smsConsent") === "on",
        website: String(f.get("website") ?? ""),
        ...extra?.(),
      });
      track("lead_submit", { source, event_id: r.eventId });
      setFirst(firstName);
      setState("done");
      onSuccess?.(firstName);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  if (state === "done")
    return (
      <div role="status" className={`border-l-4 border-kw-red p-5 ${dark ? "bg-white/10 text-white" : "bg-kw-wash"}`}>
        {success ?? (
          <>
            <p className="text-lg font-bold">Thanks{first ? `, ${first}` : ""}. You’re all set.</p>
            <p className="mt-1">
              {leadOwner.firstName} will reach out shortly. Questions first? Call or text{" "}
              <a className="font-bold underline" href={`tel:${leadOwner.phoneE164}`}>{leadOwner.phone}</a>.
            </p>
          </>
        )}
        {PREVIEW && <p className="mt-2 text-xs opacity-70">Preview mode: nothing was sent.</p>}
      </div>
    );

  const label = `mb-1 block text-sm font-medium ${dark ? "text-white" : "text-black"}`;
  return (
    <form onSubmit={onSubmit} noValidate={false} className="grid gap-3" aria-describedby={error ? `${id}-err` : undefined}>
      <div className={`grid gap-3 ${compact || emailOnly ? "" : "sm:grid-cols-3"}`}>
        {!emailOnly && (
          <div>
            <label htmlFor={`${id}-first`} className={label}>First name</label>
            <input id={`${id}-first`} name="firstName" autoComplete="given-name" required className="field" />
          </div>
        )}
        {!emailOnly && (
          <div>
            <label htmlFor={`${id}-mobile`} className={label}>Mobile</label>
            <input id={`${id}-mobile`} name="mobile" type="tel" inputMode="tel" autoComplete="tel" required pattern="[\d\s()+.\-]{10,}" className="field" />
          </div>
        )}
        <div>
          <label htmlFor={`${id}-email`} className={label}>Email</label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" required className="field" />
        </div>
      </div>
      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {!emailOnly && (
        <label className={`flex items-start gap-3 text-xs leading-snug ${dark ? "text-kw-gray-light" : "text-kw-gray-medium"}`}>
          <input type="checkbox" name="smsConsent" className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--kw-red)]" />
          <span>
            {TCPA_TEXT} See our <Link href="/privacy" className="underline">Privacy Policy</Link>.
          </span>
        </label>
      )}
      <button type="submit" className="btn btn-red w-full sm:w-auto" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : submitLabel}
      </button>
      {state === "error" && (
        <p id={`${id}-err`} role="alert" className={`text-sm font-medium ${dark ? "text-white" : "text-kw-red"}`}>
          {error} Or call or text {leadOwner.firstName} at <a className="underline" href={`tel:${leadOwner.phoneE164}`}>{leadOwner.phone}</a>.
        </p>
      )}
    </form>
  );
}

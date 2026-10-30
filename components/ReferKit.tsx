"use client";
import { useId, useState } from "react";
import { submitLead } from "./LeadForm";
import { CopyButton } from "./client";
import { track } from "@/lib/analytics";
import { site } from "@/content/config";

const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);

export function ReferForm() {
  const id = useId();
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");
  return state === "done" ? (
    <div role="status" className="border-l-4 border-kw-red bg-kw-wash p-5">
      <p className="text-lg font-bold">Thank you. We’ll take it from here.</p>
      <p className="mt-1">We’ll reach out to them personally and keep you posted.</p>
    </div>
  ) : (
    <form
      className="grid gap-3"
      onSubmit={async (e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        setState("sending");
        try {
          await submitLead({
            source: "refer",
            referral: { agentName: String(f.get("agentName")), prospectName: String(f.get("prospectName")), prospectMobile: String(f.get("prospectMobile")) },
            website: String(f.get("website") ?? ""),
          });
          track("lead_submit", { source: "refer" });
          setState("done");
        } catch (x) {
          setErr(x instanceof Error ? x.message : "Something went wrong.");
          setState("error");
        }
      }}
    >
      {[
        ["agentName", "Your name", "name"],
        ["prospectName", "Their name", "off"],
        ["prospectMobile", "Their mobile", "off"],
      ].map(([n, l, ac]) => (
        <div key={n}>
          <label htmlFor={`${id}-${n}`} className="mb-1 block text-sm font-medium">{l}</label>
          <input id={`${id}-${n}`} name={n} required autoComplete={ac} type={n === "prospectMobile" ? "tel" : "text"} className="field" />
        </div>
      ))}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <button className="btn btn-red" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Refer This Agent"}</button>
      {state === "error" && <p role="alert" className="text-sm font-medium text-kw-red">{err}</p>}
    </form>
  );
}

export function ShareKit() {
  const [name, setName] = useState("");
  const code = slugify(name);
  const link = `${site.url}/?ref=${code || "your-name"}&utm_source=agent-referral&utm_medium=share&utm_campaign=refer`;
  const texts = [
    `Hey! I’m with KW East Idaho and I think you’d love it here. Training every week, and you choose your plan. Take a look: ${link}`,
    `Not sure if you’ve thought about switching, but our Business Planning Clinic is free and open to any brokerage. Worth 2 hours: ${link}`,
    `You’d crush it here. 20-minute confidential chat with our leadership, no pressure: ${link}`,
  ];
  return (
    <div>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Your name (for your personal link)</span>
        <input value={name} onChange={(e) => setName(e.target.value)} className="field" placeholder="e.g. Jamie Smith" />
      </label>
      <div className="mt-4 flex flex-wrap items-center gap-3 bg-kw-wash p-4">
        <code className="min-w-0 flex-1 text-sm break-all">{link}</code>
        <CopyButton text={link} label="Copy link" />
      </div>
      <h3 className="mt-8 text-xl font-bold">Ready-to-send texts</h3>
      <ul className="mt-3 grid gap-3">
        {texts.map((t) => (
          <li key={t.slice(0, 20)} className="flex flex-col gap-3 border border-kw-gray-light p-4 sm:flex-row sm:items-start">
            <p className="flex-1 text-sm">{t}</p>
            <CopyButton text={t} />
          </li>
        ))}
      </ul>
    </div>
  );
}

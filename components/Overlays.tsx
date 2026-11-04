"use client";
import { useEffect, useState } from "react";
import Link from "@/components/SmartLink";
import { usePathname } from "next/navigation";
import { leadOwner, leadMagnets, textUsBody } from "@/content/config";
import { getPersona } from "@/lib/attribution";
import { track } from "@/lib/analytics";
import { LeadForm } from "./LeadForm";

const smsHref = `sms:${leadOwner.phoneE164}?&body=${encodeURIComponent(textUsBody)}`;

/** Mobile sticky CTA bar once the visitor scrolls past the first screen. Hidden on /book (already the destination). */
export function StickyCta() {
  const [show, setShow] = useState(false);
  const path = usePathname();
  useEffect(() => {
    const on = () => {
      setShow(scrollY > innerHeight * 0.9);
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  if (path?.startsWith("/book")) return null;
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_auto] gap-2 border-t border-white/20 bg-black p-2 pb-[max(.5rem,env(safe-area-inset-bottom))] transition-transform duration-300 md:hidden ${show ? "translate-y-0" : "translate-y-full"}`}
      aria-hidden={!show}
    >
      <Link href="/book" tabIndex={show ? 0 : -1} onClick={() => track("cta_click", { cta: "sticky_book" })} className="btn btn-red min-h-12">
        Book a Conversation
      </Link>
      <a href={smsHref} tabIndex={show ? 0 : -1} onClick={() => track("click_to_text", { from: "sticky" })} className="btn btn-ghost min-h-12 text-white">
        Text {leadOwner.firstName}
      </a>
    </div>
  );
}

// Guide offer state per visitor: "dismissed" (with time) or "sent". Read/write never throw.
const KEY = "kwei_guide";
const REST_DAYS = 30;
function readGuide(): { state: "dismissed" | "sent"; at: number } | null {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "null");
  } catch {
    return null;
  }
}
function writeGuide(state: "dismissed" | "sent") {
  try {
    localStorage.setItem(KEY, JSON.stringify({ state, at: Date.now() }));
  } catch {}
}

/**
 * Free guide offer: a small card that slides into the corner once the visitor has read
 * half a page for 20+ seconds. Never a modal, never blocks content, never on /book, /quiz or /lp.
 * Closing it leaves a small "Free Playbook" tab; it won't pop up again for 30 days, and never after they get the guide.
 */
export function ExitOffer() {
  const [view, setView] = useState<"none" | "card" | "tab">("none");
  const [form, setForm] = useState(false); // email field opens only when they ask for it
  const path = usePathname();
  const persona = typeof window !== "undefined" ? getPersona() : null;
  const magnet = persona === "new" && leadMagnets.new.file ? leadMagnets.new : leadMagnets.experienced;
  const hidden = path?.startsWith("/book") || path?.startsWith("/quiz") || path?.startsWith("/lp");

  useEffect(() => {
    const saved = readGuide();
    if (saved?.state === "sent") return;
    const resting = saved?.state === "dismissed" && Date.now() - saved.at < REST_DAYS * 864e5;
    if (resting) {
      // After hydration, so server and first client render match
      const id = requestAnimationFrame(() => setView("tab"));
      return () => cancelAnimationFrame(id);
    }
    const t0 = Date.now();
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      if (h > 0 && scrollY / h > 0.5 && Date.now() - t0 > 20000) {
        removeEventListener("scroll", onScroll);
        setView("card");
        track("exit_offer_view");
      }
    };
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (view !== "card") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [view]);

  function dismiss() {
    writeGuide("dismissed");
    setView("tab");
  }

  if (hidden || view === "none") return null;
  // Sits above the mobile sticky CTA bar
  const spot = "fixed right-3 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-40 md:right-6 md:bottom-6";
  if (view === "tab")
    return (
      <button type="button" onClick={() => { setForm(true); setView("card"); }} className={`${spot} border-l-4 border-kw-red bg-black px-4 py-2.5 text-sm font-bold text-white hover:bg-kw-red`}>
        Free Playbook
      </button>
    );
  return (
    <aside aria-labelledby="guide-title" className={`${spot} guide-in left-3 border-t-4 border-kw-red bg-white py-3 pr-10 pl-4 ring-1 ring-black/15 md:left-auto md:w-80 md:p-4 md:pr-10`}>
      <button type="button" onClick={dismiss} className="absolute top-0 right-0 grid h-10 w-10 place-items-center text-2xl text-kw-gray-medium hover:text-black" aria-label="Close">×</button>
      <p className="text-xs font-bold tracking-[.14em] text-kw-red uppercase">Free guide</p>
      <h2 id="guide-title" className="mt-1 leading-snug font-bold">{magnet.title}</h2>
      {!form ? (
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-sm text-kw-gray-medium">{magnet.subtitle}.</p>
          <button type="button" onClick={() => setForm(true)} className="text-sm font-bold text-kw-red underline underline-offset-4">
            Send it to me
          </button>
        </div>
      ) : (
        <div className="mt-3">
          <LeadForm
            source="exit-offer"
            submitLabel="Send Me the Guide"
            emailOnly
            compact
            extra={() => ({ calculator: { magnet: magnet.title } })}
            onSuccess={() => writeGuide("sent")}
            success={<p className="font-bold">On its way. Check your inbox.</p>}
          />
        </div>
      )}
    </aside>
  );
}

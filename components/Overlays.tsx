"use client";
import { useEffect, useRef, useState } from "react";
import Link from "@/components/SmartLink";
import { usePathname } from "next/navigation";
import { leadOwner, leadMagnets, textUsBody } from "@/content/config";
import { getPersona } from "@/lib/attribution";
import { track } from "@/lib/analytics";
import { LeadForm } from "./LeadForm";

const smsHref = `sms:${leadOwner.phoneE164}?&body=${encodeURIComponent(textUsBody)}`;

/** Mobile sticky CTA bar after 30% scroll. Hidden on /book (already the destination). */
export function StickyCta() {
  const [show, setShow] = useState(false);
  const path = usePathname();
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      setShow(h > 0 && scrollY / h > 0.3);
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
        Text Us
      </a>
    </div>
  );
}

/** Desktop exit intent, mobile 70% scroll + 45s. Once per session; never on /book or /lp. */
export function ExitOffer() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const persona = typeof window !== "undefined" ? getPersona() : null;
  const magnet = persona === "new" && leadMagnets.new.file ? leadMagnets.new : leadMagnets.experienced;

  useEffect(() => {
    if (path?.startsWith("/book") || path?.startsWith("/quiz")) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem("kwei_exit") === "1";
    } catch {}
    if (seen) return;
    const fire = () => {
      try {
        sessionStorage.setItem("kwei_exit", "1");
      } catch {}
      setOpen(true);
      track("exit_offer_view");
    };
    const t0 = Date.now();
    const desktop = matchMedia("(min-width: 768px) and (pointer: fine)").matches;
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && Date.now() - t0 > 8000) fire();
    };
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      if (h > 0 && scrollY / h > 0.7 && Date.now() - t0 > 45000) fire();
    };
    if (desktop) document.addEventListener("mouseout", onLeave);
    else addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mouseout", onLeave);
      removeEventListener("scroll", onScroll);
    };
  }, [path]);

  useEffect(() => {
    if (open) dialog.current?.showModal();
  }, [open]);

  if (!open) return null;
  return (
    <dialog ref={dialog} onClose={() => setOpen(false)} className="m-auto w-[min(34rem,calc(100%-2rem))] bg-white p-0 backdrop:bg-black/70" aria-labelledby="exit-title">
      <div className="border-t-8 border-kw-red p-6 sm:p-8">
        <button type="button" onClick={() => dialog.current?.close()} className="float-right -mt-2 -mr-2 grid h-11 w-11 place-items-center text-2xl" aria-label="Close">×</button>
        <p className="eyebrow text-kw-gray-medium">Free guide</p>
        <h2 id="exit-title" className="mt-3 text-2xl font-bold sm:text-3xl">{magnet.title}</h2>
        <p className="mt-2 mb-5 text-kw-gray-medium">{magnet.subtitle}. Sent to your inbox in a minute.</p>
        <LeadForm source="exit-offer" submitLabel="Send Me the Guide" emailOnly extra={() => ({ calculator: { magnet: magnet.title } })} success={<p className="font-bold">On its way. Check your inbox.</p>} />
      </div>
    </dialog>
  );
}

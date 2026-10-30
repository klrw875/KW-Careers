"use client";
// Small interactive pieces. Each is tiny so pages stay mostly server-rendered HTML.
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import Link from "@/components/SmartLink";
import { captureAttribution, getPersona, setPersona } from "@/lib/attribution";
import { track } from "@/lib/analytics";
import type { Persona } from "@/content/config";

/** Runs once per page load: UTMs/ref capture + hero variant tag for analytics. */
export function ClientBoot({ heroVariant }: { heroVariant?: string }) {
  useEffect(() => {
    captureAttribution();
    if (heroVariant) {
      document.documentElement.dataset.hero = heroVariant;
      track("hero_variant", { variant: heroVariant });
    }
  }, [heroVariant]);
  return null;
}

/** Silent cinematic loop. Starts after the poster (LCP) has painted; still image on reduced motion / Save-Data. */
export function HeroVideo({ mp4, webm, poster, end, loop = true }: { mp4: string; webm: string; poster: string; end?: string; loop?: boolean }) {
  const [on, setOn] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (reduce || conn?.saveData || conn?.effectiveType === "2g") {
      if (end && img.current) img.current.src = end; // no motion: show the finished shot instead of the first frame
      return;
    }
    const go = () => setTimeout(() => setOn(true), 600);
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
  }, [end]);
  return (
    <>
      <img ref={img} src={poster} alt="" width={1280} height={960} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
      {on && (
        <video autoPlay muted loop={loop} playsInline poster={poster} className="rise absolute inset-0 h-full w-full object-cover" aria-hidden>
          <source src={webm} type="video/webm" />
          <source src={mp4} type="video/mp4" />
        </video>
      )}
    </>
  );
}

/** Counts up once when scrolled into view. Server HTML already has the final number (SEO, no-JS). */
export function CountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el || value < 10 || matchMedia("(prefers-reduced-motion: reduce)").matches) return; // "#1" counting up reads oddly
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) return; // already visible: don't flash
    setN(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), dur = 1400;
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {n.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

// Problem card answer: the photo is the button ("See how it works at KW"); tapping it reveals the KW answer in place.
export function ProblemReveal({ photo, answer, label = "problem" }: { photo: React.ReactNode; answer: React.ReactNode; label?: string }) {
  const [open, setOpen] = useState(false);
  if (open) {
    return (
      <div className="rise flex flex-col self-start bg-white">
        {answer}
        <div className="mt-auto px-6 pb-6">
          <button
            type="button"
            aria-expanded
            onClick={() => setOpen(false)}
            className="group flex min-h-12 w-full items-center justify-between gap-3 border-2 border-black bg-white px-5 text-left font-bold text-black transition-colors hover:bg-black hover:text-white"
          >
            Back to the problem
            <span aria-hidden className="text-xl leading-none">←</span>
          </button>
        </div>
      </div>
    );
  }
  return (
    <button
      type="button"
      aria-expanded={false}
      onClick={() => {
        track("cta_click", { cta: "how_it_works_here", card: label });
        setOpen(true);
      }}
      className="group relative block aspect-[16/9] w-full self-start overflow-hidden text-left"
    >
      {photo}
      <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" aria-hidden />
      <span className="absolute inset-x-4 bottom-4 flex min-h-12 items-center justify-between gap-3 bg-kw-red px-5 font-bold text-white transition-colors group-hover:bg-kw-red-dark">
        See how it works at KW
        <span aria-hidden className="text-xl leading-none transition-transform group-hover:translate-x-1">→</span>
      </span>
    </button>
  );
}

export function PersonaChips({ items }: { items: { id: Persona; href: string; chip: string }[] }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Choose what fits you">
      {items.map((p) => (
        <Link
          key={p.id}
          href={p.href}
          onClick={() => {
            setPersona(p.id);
            track("persona_select", { persona: p.id });
          }}
          className="min-h-11 rounded-full border border-white/50 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white hover:text-black"
        >
          {p.chip}
        </Link>
      ))}
    </div>
  );
}

/** Swaps text by remembered persona (localStorage / ?persona=). Server renders the default. */
const subscribePersona = (cb: () => void) => {
  window.addEventListener("kwei:persona", cb);
  return () => window.removeEventListener("kwei:persona", cb);
};
export function PersonaText({ variants }: { variants: Record<Persona | "default", string> }) {
  const p = useSyncExternalStore(subscribePersona, getPersona, () => null);
  return <>{variants[p ?? "default"]}</>;
}

export function TrackedLink({ href, event, params, className, children }: { href: string; event: Parameters<typeof track>[0]; params?: Record<string, string>; className?: string; children: React.ReactNode }) {
  return (
    <a href={href} className={className} onClick={() => track(event, params)}>
      {children}
    </a>
  );
}

/** Muted autoplay loop with a sound toggle (RED Day: no dialogue needed). */
export function LoopVideo({ src, poster, title }: { src: string; poster: string; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [visible, setVisible] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
      if (!ref.current) return;
      if (e.isIntersecting) ref.current.play().catch(() => {});
      else ref.current.pause();
    }, { threshold: 0.25 });
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={wrap} className="relative h-full w-full overflow-hidden bg-black">
      <video ref={ref} src={visible ? src : undefined} poster={poster} muted={muted} loop playsInline autoPlay={visible} preload="none" className="absolute inset-0 h-full w-full object-cover" aria-label={title} />
      <button
        type="button"
        onClick={() => {
          setMuted(!muted);
          if (ref.current) {
            ref.current.muted = !muted;
            ref.current.play().catch(() => {});
          }
          if (muted) track("video_play", { video: title });
        }}
        className="absolute right-3 bottom-3 grid h-11 w-11 place-items-center rounded-full bg-black/70 text-white"
        aria-label={muted ? "Turn sound on" : "Turn sound off"}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
          {muted ? <path d="M3 9v6h4l5 5V4L7 9H3zm13.6 3 2.7-2.7-1.4-1.4-2.7 2.7-2.7-2.7-1.4 1.4 2.7 2.7-2.7 2.7 1.4 1.4 2.7-2.7 2.7 2.7 1.4-1.4z" /> : <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z" />}
        </svg>
      </button>
    </div>
  );
}

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="btn btn-ghost-dark min-h-10 px-4 text-sm"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1800);
        } catch {
          /* clipboard blocked: user can select the text */
        }
      }}
    >
      {done ? "Copied ✓" : label}
    </button>
  );
}

// Arms a CSS entrance animation (see .chart-anim in globals.css) and runs it once when scrolled into view.
// Content renders in its final state without JS, when already on screen, or with reduced motion.
export function InViewAnim({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) return;
    el.dataset.anim = "armed";
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        requestAnimationFrame(() => (el.dataset.anim = "run"));
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`chart-anim ${className}`}>
      {children}
    </div>
  );
}

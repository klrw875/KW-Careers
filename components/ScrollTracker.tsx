"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

/**
 * Shows where visitors stop reading: scroll_depth at 25/50/75/100% of the page, and section_view
 * (with the section's headline and its position) the first time each section is half on screen.
 */
export function ScrollTracker() {
  const path = usePathname();
  useEffect(() => {
    const sent = new Set<number>();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (max <= 0) return;
      const pct = (scrollY / max) * 100;
      for (const mark of [25, 50, 75, 100]) {
        if (pct >= mark - 1 && !sent.has(mark)) {
          sent.add(mark);
          track("scroll_depth", { percent: mark, page: path ?? "" });
        }
      }
    };
    const sections = [...document.querySelectorAll<HTMLElement>("main section")].filter((s) => s.querySelector("h1, h2"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // Half the section, or half the screen for sections taller than the screen
          const need = Math.min(e.boundingClientRect.height, innerHeight) * 0.5;
          if (!e.isIntersecting || e.intersectionRect.height < need) continue;
          io.unobserve(e.target);
          const el = e.target as HTMLElement;
          const title = (el.querySelector("h1, h2")?.textContent ?? "").trim().slice(0, 80);
          track("section_view", { section: el.id || title, title, position: sections.indexOf(el) + 1, page: path ?? "" });
        }
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
    );
    sections.forEach((s) => io.observe(s));
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      removeEventListener("scroll", onScroll);
    };
  }, [path]);
  return null;
}

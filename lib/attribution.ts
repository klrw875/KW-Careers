"use client";
// Persists UTMs, landing page, referrer, referring-agent code and persona across sessions
// so every form can send them as hidden fields.
import type { Persona } from "@/content/config";

const KEY = "kwei_attr";
const PERSONA_KEY = "kwei_persona";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;

export type Attribution = Partial<Record<(typeof UTM_KEYS)[number], string>> & {
  landing_page?: string;
  referrer?: string;
  ref?: string; // referring agent code from /refer links
  first_seen?: string;
};

function read<T>(key: string): T | null {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : null;
  } catch {
    return null;
  }
}
function write(key: string, v: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(v));
  } catch {
    /* private mode: attribution just won't persist */
  }
}

export function captureAttribution() {
  const url = new URL(window.location.href);
  const prev = read<Attribution>(KEY) ?? {};
  const next: Attribution = { ...prev };
  let touched = false;
  for (const k of UTM_KEYS) {
    const v = url.searchParams.get(k);
    if (v) {
      next[k] = v;
      touched = true;
    }
  }
  const ref = url.searchParams.get("ref");
  if (ref) next.ref = ref.slice(0, 64);
  if (!prev.landing_page || touched) {
    next.landing_page = url.pathname + url.search;
    next.referrer = document.referrer || undefined;
    next.first_seen = new Date().toISOString();
  }
  write(KEY, next);
  const p = url.searchParams.get("persona");
  if (p === "new" || p === "experienced" || p === "team") setPersona(p);
}

export function getAttribution(): Attribution {
  return (typeof window !== "undefined" && read<Attribution>(KEY)) || {};
}

export function getPersona(): Persona | null {
  if (typeof window === "undefined") return null;
  const p = read<Persona>(PERSONA_KEY);
  return p === "new" || p === "experienced" || p === "team" ? p : null;
}

export function setPersona(p: Persona) {
  write(PERSONA_KEY, p);
  window.dispatchEvent(new CustomEvent("kwei:persona", { detail: p }));
}

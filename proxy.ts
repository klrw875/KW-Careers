// A/B split for the home hero (Next.js 16 proxy, runs on Vercel; ignored by static export).
// Visitors get a sticky cookie; variant B is served from /v/b while the URL stays "/".
import { NextResponse, type NextRequest } from "next/server";

// Only "a" (Same market. Better odds.) until traffic supports a real test (Steven, 2026-10-30).
// Add "b" (and "c") back to restart the split; old "b" cookies fall back to "a".
const VARIANTS = ["a"] as const;

export function proxy(req: NextRequest) {
  let v = req.cookies.get("kwei_hero")?.value;
  if (!v || !VARIANTS.includes(v as (typeof VARIANTS)[number])) v = VARIANTS[Math.floor(Math.random() * VARIANTS.length)];
  const res = v === "a" ? NextResponse.next() : NextResponse.rewrite(new URL(`/v/${v}`, req.url));
  res.cookies.set("kwei_hero", v, { maxAge: 60 * 60 * 24 * 30, sameSite: "lax", path: "/" });
  return res;
}

export const config = { matcher: "/" };

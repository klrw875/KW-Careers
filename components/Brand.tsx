import Link from "@/components/SmartLink";
import { site } from "@/content/config";

// Official Keller Williams Realty East Idaho DBA logo (from Steven, 2026-10-26; EPS masters in project assets/logos).
// Rules: clear space = width of the "W" on all sides, min 72px wide, never recolor, retype or add effects.
// Black on light backgrounds, reversed white on dark. 1137x224 source, so it stays sharp up to ~560px wide.
export function DbaLogo({ dark = false }: { dark?: boolean; compact?: boolean }) {
  return (
    <Link href="/" aria-label={`${site.brokerage} home`} className="inline-flex min-w-[72px] items-center py-2">
      <img
        src={dark ? "/brand/kw-east-idaho-logo-white.png" : "/brand/kw-east-idaho-logo-black.png"}
        alt={site.brokerage}
        width={1137}
        height={224}
        className="h-8 w-auto md:h-9"
      />
    </Link>
  );
}

export function EqualHousingLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Equal Housing Opportunity">
      <path d="M32 4 4 26v6h6v28h44V32h6v-6L32 4Zm0 7.5L50 25.6V54H14V25.6L32 11.5Z" fill="currentColor" />
      <rect x="21" y="31" width="22" height="5" fill="currentColor" />
      <rect x="21" y="41" width="22" height="5" fill="currentColor" />
    </svg>
  );
}

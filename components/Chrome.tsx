import Link from "@/components/SmartLink";
import { DbaLogo, EqualHousingLogo } from "./Brand";
import { leadOwner, offices, site, franchiseLine, profitShare } from "@/content/config";

const nav = [
  { href: "/new-agents", label: "New Agents" },
  { href: "/experienced-agents", label: "Experienced" },
  { href: "/teams", label: "Teams" },
  { href: "/stories", label: "Stories" },
];

// Minimal nav: logo, four links, one persistent red button. `bare` = paid landing variants (no nav).
export function Header({ bare = false, dark = true }: { bare?: boolean; dark?: boolean }) {
  return (
    <header className={`${dark ? "on-dark bg-black text-white" : "bg-white text-black"} relative z-30`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:p-3 focus:text-black">
        Skip to content
      </a>
      <div className="wrap flex h-16 items-center justify-between gap-4 md:h-20">
        <DbaLogo dark={dark} />
        {!bare && (
          <nav aria-label="Main" className="hidden items-center gap-7 text-[15px] font-medium lg:flex">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="py-2 hover:text-kw-gray">
                {n.label}
              </Link>
            ))}
          </nav>
        )}
        <div className="flex items-center gap-2">
          <Link href="/book" className="btn btn-red min-h-11 px-4 text-sm md:min-h-12 md:px-5 md:text-[15px]">
            <span className="sm:hidden">Book a Call</span>
            <span className="hidden sm:inline">Book a Conversation</span>
          </Link>
          {!bare && (
            <details className="group relative lg:hidden">
              <summary className="grid h-11 w-11 cursor-pointer list-none place-items-center [&::-webkit-details-marker]:hidden" aria-label="Menu">
                <svg viewBox="0 0 24 24" className="h-6 w-6 stroke-current group-open:hidden" fill="none" strokeWidth="2" aria-hidden><path d="M3 6h18M3 12h18M3 18h18" /></svg>
                <svg viewBox="0 0 24 24" className="hidden h-6 w-6 stroke-current group-open:block" fill="none" strokeWidth="2" aria-hidden><path d="M6 6l12 12M18 6 6 18" /></svg>
              </summary>
              <nav aria-label="Site menu" className="absolute top-full right-0 mt-2 w-64 border-t-4 border-kw-red bg-black p-2 text-white">
                {[...nav, { href: "/calculator", label: "Take-home calculator" }, { href: "/events", label: "Events" }, { href: "/faq", label: "FAQ" }, { href: "/refer", label: "Refer an agent" }].map((n) => (
                  <Link key={n.href} href={n.href} className="block min-h-12 px-3 py-3 font-medium hover:bg-white/10">
                    {n.label}
                  </Link>
                ))}
              </nav>
            </details>
          )}
        </div>
      </div>
    </header>
  );
}

export function Footer({ bare = false }: { bare?: boolean }) {
  return (
    <footer className="on-dark bg-black pb-24 text-white md:pb-0">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <DbaLogo dark />
          <p className="mt-4 max-w-sm text-sm text-kw-gray">{franchiseLine}</p>
          <p className="mt-4 text-sm">
            Questions? Call or text {leadOwner.name}, {leadOwner.title}:{" "}
            <a href={`tel:${leadOwner.phoneE164}`} className="font-bold underline">{leadOwner.phone}</a>
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold tracking-[.14em] text-kw-gray uppercase">Offices</h2>
          <ul className="mt-3 space-y-4 text-sm">
            {offices.map((o) => (
              <li key={o.slug}>
                <Link href={`/${o.slug}`} className="font-bold hover:underline">{o.city}</Link>
                {o.confirmed ? (
                  <address className="not-italic text-kw-gray-light">
                    {o.name}<br />{o.street}, {o.city}, ID {o.zip}
                    {o.phone && (<><br /><a href={`tel:${o.phone}`} className="underline">{o.phone}</a></>)}
                  </address>
                ) : (
                  <p className="text-kw-gray-light">Training live on Zoom. Meet us in Idaho Falls.</p>
                )}
              </li>
            ))}
          </ul>
        </div>
        {!bare && (
          <div>
            <h2 className="text-sm font-bold tracking-[.14em] text-kw-gray uppercase">Explore</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm md:grid-cols-1">
              {[
                ["/new-agents", "New agents"], ["/experienced-agents", "Experienced agents"], ["/teams", "Team leaders"],
                ["/calculator", "Take-home calculator"], ["/quiz", "Career Fit Quiz"], ["/stories", "Agent stories"],
                ["/events", "Events"], ["/refer", "Refer an agent"], ["/faq", "FAQ"], ["/book", "Book a conversation"],
              ].map(([h, l]) => (
                <li key={h}><Link href={h} className="inline-block py-1 hover:underline">{l}</Link></li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="border-t border-white/15">
        <div className="wrap flex flex-col gap-4 py-6 text-xs text-kw-gray md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-3">
            <EqualHousingLogo className="h-10 w-10 shrink-0 text-white" />
            <p className="max-w-2xl leading-relaxed">
              {site.brokerage} is a licensed Idaho real estate brokerage.
              {site.designatedBroker ? ` Designated broker: ${site.designatedBroker}.` : " [TODO: designated broker name]"}
              {site.brokerageLicense ? ` License #${site.brokerageLicense}.` : " [TODO: brokerage license #]"} Each office is independently owned and operated.
              Equal Housing Opportunity. Income and profit share examples are illustrative only and not a guarantee of earnings. {profitShare.disclaimer}
            </p>
          </div>
          <div className="flex shrink-0 gap-4">
            <Link href="/privacy" className="underline">Privacy policy</Link>
            <Link href="/disclosures" className="underline">Disclosures</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

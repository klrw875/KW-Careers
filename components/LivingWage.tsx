import Link from "@/components/SmartLink";
import { InViewAnim } from "./client";
import { livingWage as lw, type Persona } from "@/content/config";

// "Can this career pay your bills?" Living-wage odds from the SRMLS analysis. KW red vs. all other
// brokerages combined in gray; no competitor is named. Honest about year one so agents can decide.
function Pair({ label, kw, others, delay }: { label: string; kw: number; others: number; delay: number }) {
  return (
    <div>
      <p className="text-sm font-bold">{label}</p>
      {[
        { l: "KW East Idaho", v: kw, red: true },
        { l: "All other brokerages", v: others, red: false },
      ].map((r, i) => (
        <div key={r.l} className="mt-2 grid grid-cols-[8.5rem_1fr_2.75rem] items-center gap-2 text-sm" title={`${r.l}: ${r.v}%`}>
          <span className={r.red ? "font-bold" : "text-kw-gray-medium"}>{r.l}</span>
          <span className="h-4 bg-kw-wash">
            <span className={`grow-x block h-full rounded-r-[4px] ${r.red ? "bg-kw-red" : "bg-kw-gray"}`} style={{ width: `${r.v}%`, ["--d" as string]: `${delay + i * 150}ms` }} />
          </span>
          <span className={`text-right tabular-nums ${r.red ? "font-bold" : "text-kw-gray-medium"}`}>{r.v}%</span>
        </div>
      ))}
    </div>
  );
}

export function LivingWageSection({ persona }: { persona?: Persona }) {
  const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
  const firstYear = (
    <p className={`border-l-4 border-kw-red p-4 ${persona === "new" ? "bg-black text-white" : "bg-kw-wash"}`}>
      <strong>The first year is hard everywhere:</strong> only about 1 in 8 first-year agents reach a living wage at any brokerage. That’s why your first 90 days come with a written plan, a mentor and training every week. You paid the price to get in, so give yourself the best tools, training and support to succeed. You wouldn’t plant a garden and then never water or fertilize it. Feed your business everything it needs to grow.
    </p>
  );
  return (
    <section id="living-wage" className="scroll-mt-20 py-16 md:py-24">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div>
          <p className="eyebrow text-kw-gray-medium">Can this career pay your bills?</p>
          <h2 className="mt-4 text-3xl leading-tight font-bold md:text-5xl">
            Our agents are about <span className="text-kw-red">{lw.roster.ratio}</span> as likely to earn a living wage.
          </h2>
          <p className="mt-5 text-lg text-kw-gray-medium">
            {lw.marketBackdrop} At KW East Idaho, {lw.roster.kw}% of our whole roster does, counting agents who closed nothing. At every other brokerage combined, it’s {lw.roster.others}%.
          </p>
          <div className="mt-6 bg-kw-wash p-5 text-sm">
            <p className="font-bold">What we mean by a living wage</p>
            <p className="mt-1 text-kw-gray-medium">
              {usd(lw.annual)} a year for one adult in Bonneville County. After self-employment tax and about $10,000 in business costs, that takes about <strong className="text-black">{usd(lw.netCommissionNeeded)}</strong> in commission you keep: roughly <strong className="text-black">{lw.sidesNeeded} closings</strong> a year for a solo agent.
            </p>
          </div>
          {persona === "new" && <div className="mt-6">{firstYear}</div>}
        </div>
        <div>
          <InViewAnim className="space-y-8">
            <Pair label="Whole roster at a living wage" kw={lw.roster.kw} others={lw.roster.others} delay={0} />
            <Pair label="Experienced agents (closed deals both years)" kw={lw.experienced.kw} others={lw.experienced.others} delay={300} />
            <Pair label="Bingham, Bonneville and Jefferson counties only" kw={lw.threeCounty.kw} others={lw.threeCounty.others} delay={600} />
          </InViewAnim>
          <p className="mt-8 text-lg">
            <strong className="text-kw-red">{lw.shareOfAgents}%</strong> of the MLS’s agents, <strong className="text-kw-red">{lw.shareOfSides}%</strong> of its transactions.
          </p>
          {persona !== "new" && <div className="mt-6">{firstYear}</div>}
          <Link href="#calculator" className="btn btn-red mt-8">Check my number against the living wage</Link>
        </div>
      </div>
      <p className="wrap mt-10 text-xs text-kw-gray-medium">{lw.source}</p>
    </section>
  );
}

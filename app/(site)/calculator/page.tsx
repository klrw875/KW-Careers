import { CalculatorSection, FaqSection, FinalCta, ProofBar } from "@/components/sections";
import { pageMeta } from "@/lib/meta";
import { plans, compensationRules, compensationDisclaimer } from "@/content/compensation";
import { usd } from "@/lib/calculator";

export const metadata = pageMeta({
  title: "KW MyWay Take-Home Pay Calculator",
  description: "See your take-home on all four KW MyWay plans at KW East Idaho: Supported, 12K, 16K and Commercial. Compare with your current brokerage.",
  path: "/calculator",
});

export default function Page() {
  return (
    <>
      <div className="on-dark bg-black py-12 text-white md:py-16">
        <div className="wrap">
          <p className="eyebrow text-kw-gray">Take-home calculator</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-tight font-bold md:text-6xl">What would you keep at KW East Idaho?</h1>
        </div>
      </div>
      <CalculatorSection />
      <section className="bg-kw-wash py-16">
        <div className="wrap">
          <h2 className="text-3xl font-bold">All four plans</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[42rem] border-collapse bg-white text-left text-sm">
              <thead>
                <tr className="bg-black text-white">
                  <th scope="col" className="p-3"> </th>
                  {plans.map((p) => <th key={p.id} scope="col" className="p-3 text-base">{p.name}</th>)}
                </tr>
              </thead>
              <tbody className="[&_td]:border-b [&_td]:border-kw-gray-light [&_td]:p-3 [&_th]:border-b [&_th]:border-kw-gray-light [&_th]:p-3">
                <tr><th scope="row">Split (agent / MC)</th>{plans.map((p) => <td key={p.id}>{100 - p.mcSplit * 100}/{p.mcSplit * 100}</td>)}</tr>
                <tr><th scope="row">Market center cap</th>{plans.map((p) => <td key={p.id}>{p.mcCap ? usd(p.mcCap) : "No cap"}</td>)}</tr>
                <tr><th scope="row">Team member cap</th>{plans.map((p) => <td key={p.id}>{p.teamMemberCap ? usd(p.teamMemberCap) : "n/a"}</td>)}</tr>
                <tr><th scope="row">KWRI royalty</th>{plans.map((p) => <td key={p.id}>{p.royaltyRate * 100}%, capped at {usd(p.royaltyCap)}</td>)}</tr>
                <tr><th scope="row">Monthly fee</th>{plans.map((p) => <td key={p.id}>{p.id === "commercial" ? "$110 + $199 KW Commercial" : usd(p.monthlyFee)}</td>)}</tr>
                <tr><th scope="row">Annual fee</th>{plans.map((p) => <td key={p.id}>{usd(p.annualFee)}</td>)}</tr>
                <tr><th scope="row">Transaction fee</th>{plans.map((p) => <td key={p.id}>{p.transactionFee.when === "none" ? "$0" : `${usd(p.transactionFee.amount)} per deal${p.transactionFee.when === "afterCap" ? " after cap" : ""}`}</td>)}</tr>
                <tr><th scope="row">Compliance fee</th>{plans.map((p) => <td key={p.id}>{p.compliancePerDeal ? `${usd(p.compliancePerDeal)} per deal` : "Included"}</td>)}</tr>
                <tr><th scope="row">E&amp;O</th>{plans.map((p) => <td key={p.id}>{p.eoPerDeal ? `${usd(p.eoPerDeal)} per deal, max ${usd(p.eoAnnualCap ?? 0)}/yr` : "Included"}</td>)}</tr>
                <tr><th scope="row">Concierge service</th>{plans.map((p) => <td key={p.id}>{p.included.length ? p.included.join("; ") : "None"}</td>)}</tr>
                <tr><th scope="row">Eligibility</th>{plans.map((p) => <td key={p.id}>{p.eligibility ?? "—"}</td>)}</tr>
              </tbody>
            </table>
          </div>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-kw-gray-medium">{compensationRules.map((r) => <li key={r}>{r}</li>)}<li>{compensationDisclaimer}</li></ul>
        </div>
      </section>
      <ProofBar compact />
      <FaqSection limit={4} />
      <FinalCta />
    </>
  );
}

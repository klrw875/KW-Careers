"use client";
import { useMemo, useRef, useState } from "react";
import { comparePlans, calcCurrent, usd, type PlanRow } from "@/lib/calculator";
import { livingWage } from "@/content/config";
import { compensationDisclaimer } from "@/content/compensation";
import { track } from "@/lib/analytics";
import { LeadForm } from "./LeadForm";
import Link from "@/components/SmartLink";

type Mode = "gci" | "price";

function NumberField({ label, value, onChange, prefix, suffix, step = 1, min = 0, hint }: { label: string; value: number; onChange: (n: number) => void; prefix?: string; suffix?: string; step?: number; min?: number; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      <span className="relative block">
        {prefix && <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-kw-gray-medium">{prefix}</span>}
        <input
          type="number"
          inputMode="decimal"
          min={min}
          step={step}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
          className={`field ${prefix ? "pl-7" : ""} ${suffix ? "pr-10" : ""}`}
        />
        {suffix && <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-kw-gray-medium">{suffix}</span>}
      </span>
      {hint && <span className="mt-1 block text-xs text-kw-gray-medium">{hint}</span>}
    </label>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (b: boolean) => void }) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center justify-between gap-4 border-b border-kw-gray-light py-2">
      <span className="text-sm font-medium">{label}</span>
      <input type="checkbox" role="switch" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
      <span aria-hidden className="relative h-7 w-12 shrink-0 rounded-full bg-kw-gray-light transition-colors peer-checked:bg-kw-red peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-kw-red after:absolute after:top-1 after:left-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5" />
    </label>
  );
}

function PlanCard({ r, best }: { r: PlanRow; best: boolean }) {
  const supported = r.plan.id === "supported";
  return (
    <div
      className={`relative flex flex-col border-2 p-4 sm:p-5 ${best ? "border-kw-red bg-white" : r.eligible ? "border-kw-gray-light bg-white" : "border-dashed border-kw-gray-light bg-kw-wash"}`}
      aria-label={`${r.plan.name} plan${best ? ", best fit" : ""}`}
    >
      {best && <span className="absolute -top-3 left-4 bg-kw-red px-2 py-0.5 text-xs font-bold tracking-wider text-white uppercase">Best fit</span>}
      <h3 className="text-xl font-bold">{r.plan.name}</h3>
      <p className="text-sm text-kw-gray-medium">{r.plan.tagline}</p>
      {r.eligible ? (
        <>
          <p className={`font-display mt-3 text-3xl font-bold tabular-nums sm:text-4xl ${best ? "text-kw-red" : ""}`}>{usd(r.takeHome)}</p>
          <p className="text-xs text-kw-gray-medium">estimated take-home</p>
        </>
      ) : (
        <p className="mt-3 text-sm font-medium text-kw-gray-medium">{r.ineligibleReason}</p>
      )}
      {supported && (
        <ul className="mt-3 space-y-1 text-xs">
          {r.plan.included.map((i) => (
            <li key={i} className="flex gap-1.5"><span className="text-kw-red" aria-hidden>✓</span>{i}</li>
          ))}
        </ul>
      )}
      {r.eligible && (
        <details className="mt-3 text-xs text-kw-gray-medium">
          <summary className="cursor-pointer font-medium text-black">See the math</summary>
          <dl className="mt-2 grid grid-cols-[1fr_auto] gap-x-3 gap-y-0.5 tabular-nums">
            <dt>Market center split{r.cap ? ` (cap ${usd(r.cap)})` : ""}</dt><dd>{usd(r.mcSplit)}</dd>
            <dt>KWRI royalty (6%, max $3,000)</dt><dd>{usd(r.royalty)}</dd>
            <dt>Transaction fees</dt><dd>{usd(r.transactionFees)}</dd>
            <dt>Compliance fees</dt><dd>{usd(r.complianceFees)}</dd>
            <dt>E&amp;O</dt><dd>{usd(r.eoFees)}</dd>
            <dt>Monthly fees × 12</dt><dd>{usd(r.monthlyFees)}</dd>
            <dt>Annual fee</dt><dd>{usd(r.annualFee)}</dd>
            <dt className="font-bold text-black">Total cost</dt><dd className="font-bold text-black">{usd(r.totalCost)}</dd>
          </dl>
        </details>
      )}
    </div>
  );
}

export function Calculator({ defaultNewlyLicensed = false, defaultGci = 100000, defaultDeals = 12 }: { defaultNewlyLicensed?: boolean; defaultGci?: number; defaultDeals?: number }) {
  const [mode, setMode] = useState<Mode>("gci");
  const [gciInput, setGciInput] = useState(defaultGci);
  const [price, setPrice] = useState(400000);
  const [commission, setCommission] = useState(2.5);
  const [deals, setDeals] = useState(defaultDeals);
  const [newlyLicensed, setNewlyLicensed] = useState(defaultNewlyLicensed);
  const [last12, setLast12] = useState(defaultDeals);
  const [onTeam, setOnTeam] = useState(false);
  const [commercial, setCommercial] = useState(false);
  const [compare, setCompare] = useState(false);
  const [cur, setCur] = useState({ split: 30, cap: 0, monthly: 0, perDeal: 0 });
  const used = useRef(false);

  const gci = mode === "gci" ? gciInput : Math.round(price * (commission / 100) * deals);
  const n = Math.max(1, Math.round(deals));

  const { rows, bestId } = useMemo(
    () => comparePlans({ gci, deals: n, onTeam, newlyLicensed, transactionsLast12: last12, sellsCommercial: commercial }),
    [gci, n, onTeam, newlyLicensed, last12, commercial],
  );
  const best = rows.find((r) => r.plan.id === bestId)!;
  // Cap bar: the best plan if it has a cap, otherwise the 12K plan so producers see where cap lands
  const capRow = best?.cap ? best : rows.find((r) => r.plan.id === "cap12k")!;
  const current = compare ? calcCurrent({ brokerageSplit: cur.split / 100, cap: cur.cap > 0 ? cur.cap : null, monthlyFees: cur.monthly, perDealFees: cur.perDeal, annualFees: 0 }, { gci, deals: n }) : null;
  const diff = current && best ? best.takeHome - current.takeHome : null;

  const touch = <T,>(fn: (v: T) => void) => (v: T) => {
    if (!used.current) {
      used.current = true;
      track("calculator_used");
    }
    fn(v);
  };

  const capMonth = capRow?.capDeal ? Math.ceil((capRow.capDeal / n) * 12) : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-12">
      {/* Inputs */}
      <div className="space-y-4">
        <div className="flex border-2 border-black text-sm font-bold" role="tablist" aria-label="How to enter your income">
          {(["gci", "price"] as Mode[]).map((m) => (
            <button key={m} role="tab" aria-selected={mode === m} onClick={() => setMode(m)} className={`min-h-11 flex-1 px-3 ${mode === m ? "bg-black text-white" : "bg-white"}`}>
              {m === "gci" ? "I know my GCI" : "Price × commission"}
            </button>
          ))}
        </div>
        {mode === "gci" ? (
          <NumberField label="Expected annual GCI" prefix="$" step={5000} value={gciInput} onChange={touch(setGciInput)} hint="Gross commission income before any split" />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <NumberField label="Avg. sale price" prefix="$" step={10000} value={price} onChange={touch(setPrice)} />
            <NumberField label="Your commission" suffix="%" step={0.25} value={commission} onChange={touch(setCommission)} />
            <p className="col-span-2 text-sm text-kw-gray-medium">GCI: <strong className="text-black">{usd(gci)}</strong></p>
          </div>
        )}
        <NumberField label="Transactions this year" min={1} value={deals} onChange={touch(setDeals)} />
        <div>
          <Toggle label="Are you newly licensed?" checked={newlyLicensed} onChange={touch(setNewlyLicensed)} />
          {!newlyLicensed && (
            <div className="pt-3">
              <NumberField label="Transactions in the last 12 months" value={last12} onChange={touch(setLast12)} />
            </div>
          )}
          <Toggle label="I’m on a team" checked={onTeam} onChange={touch(setOnTeam)} />
          <Toggle label="I sell commercial" checked={commercial} onChange={touch(setCommercial)} />
          <Toggle label="Compare with my current brokerage" checked={compare} onChange={touch(setCompare)} />
        </div>
        {compare && (
          <div className="grid grid-cols-2 gap-3 bg-kw-wash p-4">
            <NumberField label="Brokerage keeps" suffix="%" value={cur.split} onChange={(v) => setCur({ ...cur, split: v })} />
            <NumberField label="Their cap" prefix="$" step={1000} value={cur.cap} onChange={(v) => setCur({ ...cur, cap: v })} hint="0 = no cap" />
            <NumberField label="Monthly fees" prefix="$" step={10} value={cur.monthly} onChange={(v) => setCur({ ...cur, monthly: v })} />
            <NumberField label="Fees per deal" prefix="$" step={25} value={cur.perDeal} onChange={(v) => setCur({ ...cur, perDeal: v })} />
          </div>
        )}
      </div>

      {/* Phone: the plan cards sit below the inputs, so keep the answer visible while typing */}
      {best && (
        <a href="#plan-results" className="sticky bottom-[4.5rem] z-10 flex items-center justify-between gap-3 bg-black px-4 py-3 text-white lg:hidden">
          <span className="text-sm">Best fit: <strong>{best.plan.name}</strong></span>
          <span className="font-display text-xl font-bold tabular-nums">{usd(best.takeHome)}</span>
        </a>
      )}
      {/* Output */}
      <div id="plan-results" className="scroll-mt-24" aria-live="polite">
        <div className="grid grid-cols-1 gap-4 pt-3 min-[480px]:grid-cols-2 xl:grid-cols-4">
          {rows.map((r) => (
            <PlanCard key={r.plan.id} r={r} best={r.plan.id === bestId} />
          ))}
        </div>

        {capRow?.cap && (
          <div className="mt-8">
            <p className="text-sm font-bold">
              {capRow.capDeal
                ? `On the ${capRow.plan.name} plan you’d hit your ${usd(capRow.cap)} cap on deal #${capRow.capDeal} of ${n}, around month ${capMonth}.`
                : `At ${n} deals you wouldn’t reach the ${usd(capRow.cap)} cap on the ${capRow.plan.name} plan this year.`}
              {capRow.capDeal ? " After that, the split is yours." : ""}
            </p>
            <div className="mt-3 flex h-10 w-full" role="img" aria-label={`12-month bar: cap reached around month ${capMonth ?? "none"}`}>
              {Array.from({ length: 12 }, (_, i) => {
                const after = capMonth != null && i + 1 > capMonth;
                return <div key={i} className={`flex-1 border-r-2 border-white ${after ? "bg-kw-red" : "bg-black"}`} />;
              })}
            </div>
            <div className="mt-1 flex justify-between text-xs text-kw-gray-medium">
              <span>Month 1</span>
              <span><span className="mr-1 inline-block h-2.5 w-2.5 bg-black" />paying split <span className="mr-1 ml-3 inline-block h-2.5 w-2.5 bg-kw-red" />capped</span>
              <span>Month 12</span>
            </div>
          </div>
        )}

        {best && (() => {
          // Living-wage check: take-home on the best plan vs. the commission an agent must keep
          // to clear a living wage after SE tax and business costs (see content/config.ts livingWage).
          const need = livingWage.netCommissionNeeded;
          const pct = Math.min(100, (best.takeHome / need) * 100);
          const perDeal = best.takeHome / n;
          const more = best.takeHome >= need ? 0 : Math.ceil((need - best.takeHome) / Math.max(perDeal, 1));
          return (
            <div className="mt-8">
              <p className="text-sm font-bold">
                {more === 0
                  ? `Living wage check: at ${n} deals your take-home clears the ${usd(need)} living-wage line.`
                  : `Living wage check: you’d need about ${more} more deal${more === 1 ? "" : "s"} at this average to clear the ${usd(need)} living-wage line.`}
              </p>
              <div className="relative mt-3 h-4 bg-kw-wash" role="img" aria-label={`Take-home is ${Math.round((best.takeHome / need) * 100)}% of the living-wage line`}>
                <div className={`h-full rounded-r-[4px] ${more === 0 ? "bg-kw-red" : "bg-black"}`} style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-1 text-xs text-kw-gray-medium">Living wage for one adult in Bonneville County ({usd(livingWage.annual)}, MIT 2026), plus self-employment tax and about $10,000 in business costs.</p>
            </div>
          );
        })()}

        {diff != null && (
          <p className="mt-6 border-l-4 border-kw-red bg-kw-wash p-4 text-lg">
            {diff >= 0 ? (
              <>On the {best.plan.name} plan you’d take home about <strong className="text-kw-red">{usd(diff)} more</strong> a year than at your current brokerage.</>
            ) : (
              <>Your current setup comes out {usd(-diff)} ahead on paper. Let’s talk about what you’d get for the difference.</>
            )}
          </p>
        )}

        <div className="mt-8 border-t-2 border-black pt-6">
          <h3 className="text-xl font-bold">Send me my plan breakdown</h3>
          <p className="mb-4 text-sm text-kw-gray-medium">A one-page PDF with your numbers, side by side, plus a 20-minute walkthrough if you want it.</p>
          <LeadForm
            source="calculator"
            submitLabel="Send My Breakdown"
            extra={() => ({
              calculator: { gci, deals: n, newlyLicensed, transactionsLast12: last12, onTeam, commercial, bestPlan: best?.plan.name ?? "", bestTakeHome: best?.takeHome ?? 0, ...(current ? { currentTakeHome: current.takeHome } : {}) },
            })}
          />
        </div>
        <p className="mt-4 text-xs text-kw-gray-medium">
          {compensationDisclaimer} Royalty and cap reset on your anniversary date. <Link href="/disclosures" className="underline">Disclosures</Link>.
        </p>
      </div>
    </div>
  );
}

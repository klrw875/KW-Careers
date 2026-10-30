import { plans as defaultPlans, supportedMinTransactions, type Plan, type PlanId } from "@/content/compensation";

export type CalcInput = {
  gci: number; // expected annual gross commission income
  deals: number; // transactions in the year (equal-sized)
  onTeam?: boolean;
};

export type PlanResult = {
  plan: Plan;
  mcSplit: number;
  royalty: number;
  transactionFees: number;
  complianceFees: number;
  eoFees: number;
  monthlyFees: number;
  annualFee: number;
  totalCost: number;
  takeHome: number;
  cap: number | null;
  capDeal: number | null; // the transaction on which the cap is reached (1-based), null if never
};

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Deal-by-deal, in order, exactly as the market center calculates it. */
export function calcPlan(plan: Plan, { gci, deals, onTeam = false }: CalcInput): PlanResult {
  const n = Math.max(0, Math.floor(deals));
  const perDeal = n > 0 ? gci / n : 0;
  const cap = onTeam && plan.teamMemberCap != null ? plan.teamMemberCap : plan.mcCap;

  let mc = 0, royalty = 0, txFees = 0, compliance = 0, eo = 0;
  let capDeal: number | null = null;

  for (let i = 1; i <= n; i++) {
    const capMetBefore = cap != null && mc >= cap;
    // 30% to the market center until cap (partial on the capping deal)
    let mcPart = perDeal * plan.mcSplit;
    if (cap != null) mcPart = Math.min(mcPart, Math.max(0, cap - mc));
    mc += mcPart;
    if (cap != null && capDeal == null && mc >= cap - 1e-9) capDeal = i;

    royalty += Math.min(perDeal * plan.royaltyRate, Math.max(0, plan.royaltyCap - royalty));

    const tf = plan.transactionFee;
    if (tf.when === "every" || (tf.when === "afterCap" && capMetBefore)) txFees += tf.amount;

    compliance += plan.compliancePerDeal;
    const eoCap = plan.eoAnnualCap ?? Infinity;
    eo += Math.min(plan.eoPerDeal, Math.max(0, eoCap - eo));
  }

  const monthlyFees = plan.monthlyFee * 12;
  const totalCost = mc + royalty + txFees + compliance + eo + monthlyFees + plan.annualFee;
  return {
    plan,
    mcSplit: round2(mc),
    royalty: round2(royalty),
    transactionFees: txFees,
    complianceFees: compliance,
    eoFees: eo,
    monthlyFees,
    annualFee: plan.annualFee,
    totalCost: round2(totalCost),
    takeHome: round2(gci - totalCost),
    cap,
    capDeal,
  };
}

export function isSupportedEligible(newlyLicensed: boolean, transactionsLast12: number) {
  return newlyLicensed || transactionsLast12 > supportedMinTransactions;
}

export type CompareInput = CalcInput & {
  newlyLicensed: boolean;
  transactionsLast12: number;
  sellsCommercial: boolean;
};

export type PlanRow = PlanResult & { eligible: boolean; ineligibleReason?: string };

export function comparePlans(input: CompareInput, planList: Plan[] = defaultPlans) {
  const rows: PlanRow[] = planList.map((plan) => {
    const r = calcPlan(plan, input);
    if (plan.id === "supported" && !isSupportedEligible(input.newlyLicensed, input.transactionsLast12))
      return { ...r, eligible: false, ineligibleReason: plan.eligibility ?? undefined };
    if (plan.requiresCommercial && !input.sellsCommercial)
      return { ...r, eligible: false, ineligibleReason: plan.eligibility ?? undefined };
    return { ...r, eligible: true };
  });
  const eligible = rows.filter((r) => r.eligible);
  const best = eligible.reduce<PlanRow | null>((b, r) => (!b || r.takeHome > b.takeHome ? r : b), null);
  return { rows, bestId: (best?.plan.id ?? null) as PlanId | null };
}

export type CurrentBrokerage = {
  brokerageSplit: number; // 0–1, share the brokerage keeps
  cap: number | null;
  monthlyFees: number;
  perDealFees: number;
  annualFees: number;
};

export function calcCurrent(b: CurrentBrokerage, { gci, deals }: CalcInput) {
  const n = Math.max(0, Math.floor(deals));
  const perDeal = n > 0 ? gci / n : 0;
  let paid = 0;
  for (let i = 0; i < n; i++) {
    let part = perDeal * b.brokerageSplit;
    if (b.cap != null) part = Math.min(part, Math.max(0, b.cap - paid));
    paid += part;
  }
  const totalCost = paid + b.perDealFees * n + b.monthlyFees * 12 + b.annualFees;
  return { totalCost: round2(totalCost), takeHome: round2(gci - totalCost) };
}

export const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

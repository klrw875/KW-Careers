import { describe, expect, it } from "vitest";
import { plans } from "@/content/compensation";
import { calcCurrent, calcPlan, comparePlans, isSupportedEligible } from "./calculator";

const byId = Object.fromEntries(plans.map((p) => [p.id, p]));

// Expected take-home from leadership (equal deals, full year, not on a team)
const cases: [number, number, Record<string, number>][] = [
  [30000, 4, { supported: 17700, cap12k: 17595, cap16k: 17595, commercial: 15207 }],
  [60000, 8, { supported: 36500, cap12k: 42885, cap16k: 39135, commercial: 34747 }],
  [100000, 12, { supported: 63500, cap12k: 82000, cap16k: 78875, commercial: 71987 }],
  [180000, 20, { supported: 117500, cap12k: 160780, cap16k: 158655, commercial: 150767 }],
];

describe("KW MyWay take-home", () => {
  for (const [gci, deals, expected] of cases) {
    for (const [id, takeHome] of Object.entries(expected)) {
      it(`$${gci} / ${deals} deals → ${id} = $${takeHome}`, () => {
        expect(calcPlan(byId[id], { gci, deals }).takeHome).toBe(takeHome);
      });
    }
  }

  it("charges the 12K after-cap fee only on deals that close once cap is already met", () => {
    const r = calcPlan(byId.cap12k, { gci: 60000, deals: 8 });
    expect(r.capDeal).toBe(6); // partial split on deal 6
    expect(r.transactionFees).toBe(250); // deals 7 and 8
  });

  it("caps E&O at $500 a year", () => {
    expect(calcPlan(byId.cap12k, { gci: 180000, deals: 20 }).eoFees).toBe(500);
  });

  it("uses the team member cap when on a team", () => {
    const r = calcPlan(byId.cap12k, { gci: 100000, deals: 12, onTeam: true });
    expect(r.cap).toBe(8000);
    expect(r.mcSplit).toBe(8000);
    expect(calcPlan(byId.cap16k, { gci: 100000, deals: 12, onTeam: true }).mcSplit).toBe(9000);
  });

  it("handles zero deals", () => {
    const r = calcPlan(byId.supported, { gci: 0, deals: 0 });
    expect(r.takeHome).toBe(-500);
  });
});

describe("eligibility and best plan", () => {
  it("Supported: newly licensed or MORE than 7 transactions", () => {
    expect(isSupportedEligible(true, 0)).toBe(true);
    expect(isSupportedEligible(false, 7)).toBe(false);
    expect(isSupportedEligible(false, 8)).toBe(true);
  });

  it("greys out Supported and Commercial when not eligible and picks the best of the rest", () => {
    const { rows, bestId } = comparePlans({ gci: 30000, deals: 4, newlyLicensed: false, transactionsLast12: 4, sellsCommercial: false });
    expect(rows.find((r) => r.plan.id === "supported")!.eligible).toBe(false);
    expect(rows.find((r) => r.plan.id === "commercial")!.eligible).toBe(false);
    expect(bestId).toBe("cap12k");
  });

  it("picks Supported for a newly licensed agent at low volume", () => {
    expect(comparePlans({ gci: 30000, deals: 4, newlyLicensed: true, transactionsLast12: 0, sellsCommercial: false }).bestId).toBe("supported");
  });
});

describe("current brokerage comparison", () => {
  it("applies split up to cap plus fees", () => {
    const r = calcCurrent({ brokerageSplit: 0.3, cap: 15000, monthlyFees: 100, perDealFees: 200, annualFees: 0 }, { gci: 100000, deals: 10 });
    expect(r.totalCost).toBe(15000 + 2000 + 1200);
  });
});

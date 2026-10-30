// KW MyWay plans at Keller Williams Realty East Idaho.
// Leadership can change any value here; the calculator, plan table and FAQ read from it.
// Confirmed by leadership: the 30% split and 6% royalty are both calculated on GCI.

export type PlanId = "supported" | "cap12k" | "cap16k" | "commercial";

export type Plan = {
  id: PlanId;
  name: string;
  tagline: string;
  mcSplit: number; // market center share of GCI (agent keeps the rest until cap)
  mcCap: number | null; // null = no cap
  teamMemberCap: number | null; // used instead of mcCap when the agent is on a team; null = not applicable
  royaltyRate: number;
  royaltyCap: number;
  monthlyFee: number;
  annualFee: number;
  transactionFee: { amount: number; when: "every" | "afterCap" | "none" };
  compliancePerDeal: number;
  eoPerDeal: number;
  eoAnnualCap: number | null;
  included: string[];
  eligibility: string | null;
  requiresCommercial?: boolean;
};

export const plans: Plan[] = [
  {
    id: "supported",
    name: "Supported",
    tagline: "The “we cover it” plan",
    mcSplit: 0.3,
    mcCap: null,
    teamMemberCap: null,
    royaltyRate: 0.06,
    royaltyCap: 3000,
    monthlyFee: 0,
    annualFee: 500,
    transactionFee: { amount: 250, when: "every" },
    compliancePerDeal: 0,
    eoPerDeal: 0,
    eoAnnualCap: null,
    included: ["No monthly office bill", "No E&O charge", "No compliance charge", "Transaction coordinating (contract to close) included"],
    eligibility: "Newly licensed agents and those who did more than 7 transactions in the previous 12 months.",
  },
  {
    id: "cap12k",
    name: "12K",
    tagline: "Cap at $12,000, then keep it",
    mcSplit: 0.3,
    mcCap: 12000,
    teamMemberCap: 8000,
    royaltyRate: 0.06,
    royaltyCap: 3000,
    monthlyFee: 110,
    annualFee: 25,
    transactionFee: { amount: 125, when: "afterCap" },
    compliancePerDeal: 25,
    eoPerDeal: 40,
    eoAnnualCap: 500,
    included: [],
    eligibility: null,
  },
  {
    id: "cap16k",
    name: "16K",
    tagline: "Cap at $16,000, no transaction fee",
    mcSplit: 0.3,
    mcCap: 16000,
    teamMemberCap: 9000,
    royaltyRate: 0.06,
    royaltyCap: 3000,
    monthlyFee: 110,
    annualFee: 25,
    transactionFee: { amount: 0, when: "none" },
    compliancePerDeal: 25,
    eoPerDeal: 40,
    eoAnnualCap: 500,
    included: [],
    eligibility: null,
  },
  {
    id: "commercial",
    name: "Commercial",
    tagline: "For agents in KW Commercial",
    mcSplit: 0.3,
    mcCap: 20000,
    teamMemberCap: null,
    royaltyRate: 0.06,
    royaltyCap: 3000,
    monthlyFee: 110 + 199, // $110 + $199 KW Commercial membership
    annualFee: 25,
    transactionFee: { amount: 125, when: "afterCap" },
    compliancePerDeal: 25,
    eoPerDeal: 40,
    eoAnnualCap: 500,
    included: [],
    eligibility: "Must join KW Commercial.",
    requiresCommercial: true,
  },
];

export const compensationRules = [
  "Royalty and cap reset to $0 on your anniversary date.",
  "The 70/30 split and 6% royalty are calculated on your gross commission income (GCI).",
  "Team member caps apply to agents on a KW team. Your team leader’s own split is separate.",
];

export const compensationDisclaimer =
  "Illustrative only, not a guarantee of income. Assumes equal-sized deals over a full year. Final terms per the market center’s current agreement.";

export const supportedMinTransactions = 7; // must be MORE than this in the previous 12 months

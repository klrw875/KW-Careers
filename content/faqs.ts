// Objection-handling FAQ. `review: true` = wording leadership must confirm before launch.
export type Faq = { q: string; a: string; review?: boolean; personas?: ("new" | "experienced" | "team")[] };

export const faqs: Faq[] = [
  {
    q: "Will I lose my listings?",
    a: "Your listings are contracts between your sellers and your current brokerage, so your current broker decides whether they come with you. Many release them; some don’t. In your first conversation we’ll go through your listings and pending deals one by one and plan your timing so no client gets dropped.",
    personas: ["experienced", "team"],
    review: true,
  },
  {
    q: "What does it cost?",
    a: "You choose your plan with KW MyWay. Supported has no monthly bill: a $500 annual fee and $250 per deal, with E&O, compliance and transaction coordinating included. The 12K and 16K plans are $110 a month and a $25 annual fee, with small per-deal compliance and E&O fees. Every plan is a 70/30 split with a 6% royalty capped at $3,000. Use the calculator to see your number.",
  },
  {
    q: "How many closings does it take to earn a living wage?",
    a: "About 7 a year for a solo agent at today’s East Idaho prices. A living wage for one adult in Bonneville County is $48,486 (MIT, 2026). After self-employment tax and roughly $10,000 in business costs, that takes about $62,195 in commission you keep. Fewer than 1 in 4 agents in our MLS gets there; at KW East Idaho it’s 34%, about 1.5x the rate at every other brokerage combined. Put your own numbers in the calculator to see where you land.",
    review: true,
  },
  {
    q: "How does cap work?",
    a: "On a capped plan you pay the market center 30% of each commission until you’ve paid your cap ($12,000 or $16,000). After that, the split is yours for the rest of your year, minus small per-deal fees. Your cap and royalty reset on your anniversary date.",
  },
  {
    q: "Do I have to recruit?",
    a: "No. Nobody here is required to recruit. Profit share is optional: if an agent you introduce joins, you may share in market center profits. Many of our agents never think about it.",
  },
  {
    q: "What if I’m part-time?",
    a: "Talk to us. We’ll be honest about what it takes to build a business on your hours and which plan fits. Every class is also on Zoom, so you can train around another job.",
    personas: ["new"],
    review: true,
  },
  {
    q: "Can my team keep its name?",
    a: "Yes, teams at Keller Williams can market under their own team name, within KW brand and Idaho advertising rules. We’ll walk through your branding, signs and systems in the first conversation.",
    personas: ["team"],
    review: true,
  },
  {
    q: "How long does switching take?",
    a: "Most agents can move within a few days. Your license transfer runs through the Idaho Real Estate Commission, and our transition concierge helps move your listings, signs and database so you keep working.",
    personas: ["experienced", "team"],
    review: true,
  },
  {
    q: "I’m not licensed yet. Can I still talk to you?",
    a: "Yes. We’ll show you the steps to get licensed in Idaho, what your first 90 days look like, and how the Supported plan keeps your costs low while you get going.",
    personas: ["new"],
  },
  {
    q: "Is the first conversation really confidential?",
    a: "Yes. It’s 20 minutes with a leader, not a sales pitch. We won’t contact your broker or tell anyone you talked to us.",
  },
];

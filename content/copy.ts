// Page copy that leadership may want to tune. Grade 6–8 reading level, "you" over "we".
import type { MediaKey } from "./media.generated";
import type { Persona } from "./config";

export const heroVariants = {
  a: { id: "a", headline: "Same market. Better odds." },
  b: { id: "b", headline: "The agents winning in Idaho Falls and Pocatello have one thing in common." },
  c: { id: "c", headline: "Your next chapter in real estate starts here, and you won’t build it alone." },
} as const;
export type HeroVariant = keyof typeof heroVariants;

// Proof line under every hero headline. Numbers live in config.livingWage; keep the footnote with it.
export const heroProof = {
  subhead:
    "From a new agent to the top producers and teams, Keller Williams Realty East Idaho dominates the stats. Come learn the proven ways we systematically do it again and again.",
  lead: "Agents here are",
  stat: "1.5x more likely",
  tail: "to succeed.",
  footnote:
    "Success here means earning at least a living wage: 34% of KW East Idaho agents vs. 22% everywhere else, counting every agent on each roster, Snake River MLS, 10/2025–9/2026. Earnings modeled from closed sales, not reported income.",
  link: "#living-wage",
};

// Subhead swaps by remembered persona
export const heroSubheads: Record<Persona | "default", string> = {
  default: "Keller Williams training, technology and profit share, led by people who live and sell here. 203 agents. One team.",
  new: "Weekly training, a mentor and a plan for your first 90 days, led by people who live and sell here. 203 agents. One team.",
  experienced: "Choose your split, your cap and your fees, with systems and leadership that answer the phone. 203 agents. One team.",
  team: "Keep your team brand, grow with real operations support, and build wealth through profit share. 203 agents. One team.",
};

export const personaPaths: { id: Persona; href: string; chip: string; title: string; outcome: string; proof: string; cta: string; image: MediaKey }[] = [
  {
    id: "new",
    href: "/new-agents",
    chip: "I’m new or getting licensed",
    title: "New agents",
    outcome: "Get a plan, a mentor and your first paycheck sooner.",
    proof: "Weekly training in Idaho Falls and Pocatello, live on Zoom from anywhere.",
    cta: "Start your career",
    image: "trainingSession",
  },
  {
    id: "experienced",
    href: "/experienced-agents",
    chip: "I’m an experienced agent",
    title: "Experienced agents",
    outcome: "Keep more after a great year, and get your time back.",
    proof: "The typical KW East Idaho agent closes 75% more.",
    cta: "Make your move",
    image: "marketPulse",
  },
  {
    id: "team",
    href: "/teams",
    chip: "I lead a team",
    title: "Team leaders",
    outcome: "Keep your brand. Scale with support. Build wealth.",
    proof: "17 of the Snake River MLS’s top 50 producers are here.",
    cta: "Grow your team",
    image: "mastermind",
  },
];

export const problemCards: { pain: string; detail: string; answer: string; answerDetail: string; image: MediaKey }[] = [
  {
    pain: "Doing everything alone.",
    detail: "You’re the agent, the marketer, the bookkeeper and the transaction coordinator. Nobody to call when a deal goes sideways.",
    answer: "Mastermind groups where producers trade what’s working.",
    answerDetail: "Sit at the table with agents who’ve solved the problem you have this week. Leadership is down the hall, and answers the phone. Everything from multiple live events a week on current market issues and opportunities, led by some of the market’s top producers, to smaller customized training, down to one-on-one training and mentorship: we give you options for success.",
    image: "mastermind",
  },
  {
    pain: "Paying more than you should after a great year.",
    detail: "Your best months shouldn’t be your brokerage’s best months. Uncapped splits punish you for growing.",
    answer: "Choose your split, your cap, your fees and your services.",
    answerDetail: "With KW MyWay, the 12K plan caps at $12,000. After cap, it’s yours except small per-deal fees. And remember: what you make matters more than what it costs. Would you spend a couple thousand dollars more to close 2–8 more deals? It’s not a cost. It’s an investment, and it comes with a return.",
    image: "marketPulse",
  },
  {
    pain: "Training that ends after orientation.",
    detail: "A week of onboarding, then you’re on your own. Markets change. Your skills should too.",
    answer: "Training every week, in person and on Zoom.",
    answerDetail: "Business planning, market numbers, powerful conversations, and even how to use AI in your business, taught by people who sell and succeed here. Every week there are multiple live trainings, plus the largest collection of world-class real estate training online. No matter how hungry you are for training, we’ve got you covered. That’s why Keller Williams is in the hall of fame for training.",
    image: "trainingFinancial",
  },
];

export const valueStack: { group: string; items: { headline: string; meaning: string }[] }[] = [
  {
    group: "Training",
    items: [
      { headline: "Ignite and BOLD", meaning: "Proven KW programs that get new agents to closings and get veterans back to lead generation." },
      { headline: "Business Planning Clinic", meaning: "Leave with your year on paper: the numbers, the schedule, the plan." },
      { headline: "Weekly local trainings", meaning: "In person every week in Idaho Falls and Pocatello, and live on Zoom so agents across East Idaho never miss one." },
    ],
  },
  {
    group: "Market intelligence",
    items: [{ headline: "Know the numbers before your clients ask", meaning: "Monthly Market Pulse meetings break down Bonneville County trends you can share the same day." }],
  },
  {
    group: "Technology",
    items: [
      { headline: "KW Command", meaning: "One CRM for your contacts, SmartPlans, follow-up and marketing." },
      { headline: "Consumer app and Canva", meaning: "Your own branded search app for clients, and design tools for listings and social." },
    ],
  },
  {
    group: "Leads and lead generation",
    items: [{ headline: "Systems, not luck", meaning: "Lead generation plans, scripts and accountability that turn your database into a pipeline." }],
  },
  {
    group: "Mentorship and coaching",
    items: [{ headline: "Someone in your corner", meaning: "Productivity coaching and mentors who sell in East Idaho every day." }],
  },
  {
    group: "Profit share and wealth",
    items: [{ headline: "Share in what you help build", meaning: "Agents shared $138,741 in profit share, Jan–Sep 2026. Not guaranteed; varies by year." }],
  },
  {
    group: "Admin and transaction support",
    items: [{ headline: "Contract to close, covered", meaning: "On the Supported plan, transaction coordinating is included. No extra bill." }],
  },
  {
    group: "Community and events",
    items: [{ headline: "A team you’re proud of", meaning: "RED Day service, celebrations and masterminds. People who show up for each other." }],
  },
];

export const first90: { when: string; title: string; body: string }[] = [
  { when: "Day 1", title: "A confidential conversation", body: "20 minutes with a leader. Your goals, your numbers, your questions. No pressure." },
  { when: "Week 1", title: "Onboarding and transition concierge", body: "We help move your listings, signs and database, and get your tech set up, so you don’t miss a beat." },
  { when: "Day 30", title: "Your business plan", body: "Sit down with leadership and write the plan: goals, lead sources, weekly schedule." },
  { when: "Day 90", title: "Your first review", body: "Check the numbers together. Keep what’s working. Fix what isn’t." },
];

// KW Belief System (WI4C2TS), as shown on the Learning Center wall. Confirm against the current KW brand kit.
export const beliefSystem = [
  ["Win-Win", "or no deal"],
  ["Integrity", "do the right thing"],
  ["Customers", "always come first"],
  ["Commitment", "in all things"],
  ["Communication", "seek first to understand"],
  ["Creativity", "ideas before results"],
  ["Teamwork", "together everyone achieves more"],
  ["Trust", "starts with honesty"],
  ["Equity", "opportunities for all"],
  ["Success", "results through people"],
] as const;

export const localMission: string | null = null; // TODO: KW East Idaho local mission statement

// Steven's "don't starve your business" analogy, for agents weighing cost over growth.
export const feedYourBusiness = {
  eyebrow: "Cost vs. growth",
  title: "You’d never stop buying groceries to save money. So why starve your business?",
  body: [
    "When money is tight, nobody stops paying the house payment or stops feeding their family. Those aren’t costs you cut. They’re what keeps you alive.",
    "Yet when agents try to save, they often cut the very things that feed their business. The cheaper option looks like savings. In reality it costs you, because it takes away what a business needs to keep growing.",
  ],
  close: "Yes, they cost. But like food, a healthy business needs all of it.",
  nutrients: [
    { t: "Systems", b: "So your business runs the same in a slow month as a busy one." },
    { t: "Tools", b: "So your hours go to clients, not paperwork." },
    { t: "Models", b: "Proven plans to follow instead of guessing." },
    { t: "Community", b: "Agents to call when a deal gets hard." },
    { t: "Culture", b: "A place that makes you want to show up." },
    { t: "Accountability", b: "Someone who knows your goals and keeps you on them." },
    { t: "Training", b: "New skills every week, not once a year." },
    { t: "Support", b: "Help with the details so you can sell." },
    { t: "Technology", b: "Keep up with what today’s clients expect." },
  ],
};

// Keller Williams International mission, vision and purpose (kwri.kw.com/about-us, thrive.kw.com/culture).
export const kwMission = {
  // Local mission statement as Steven writes it (2026-10-26): the five nouns are emphasized.
  mission: "To build CAREERS worth having, BUSINESSES worth owning, LIVES worth living, EXPERIENCES worth giving, and LEGACIES worth leaving.",
  vision: "To be the real estate company of choice for agents and their customers.",
  purpose: "To be the place where entrepreneurs thrive.",
  priorities: "God, family, then business.",
};

// Steven's "best of both worlds" point: virtual brokerages isolate, all-office ones swallow your life.
// Never name other brokerages; describe the model only.
export const bothWorlds = {
  eyebrow: "Freedom without isolation",
  title: "Too much freedom can cost you your business. Too much office can cost you your life.",
  intro:
    "Most agents swing too far one way. We built the middle on purpose.",
  extremes: [
    {
      label: "All virtual",
      pro: "The flexibility every agent wants.",
      con: "At home, the dishes, the laundry, the lawn and the kids always need you first. Too much freedom stalls momentum, and isolation breeds discouragement, inactivity and, too often, failure.",
    },
    {
      label: "All brick and mortar",
      pro: "Energy, people and a place to work.",
      con: "It’s easy to get so caught up in the business that the priorities you work for get left behind.",
    },
  ],
  middle: {
    label: "KW East Idaho: both",
    body: "A beautiful building full of passionate agents, staff, coaches and mentors, with training, energy, culture and fun. Plus live online training and support for the days you need to be home. And we teach balance: God, family, then business. When it’s time for business, we help you knock it out of the park, so you can fund the life you’re building.",
  },
  close: "We don’t just build successful agents. We teach, mentor, coach and promote successful lives.",
  // Jake Rosen (video 2026-10-26). Story framing from Steven: two tries alone, the third time he plugged in. Confirm quote wording with Jake.
  quote: {
    eyebrow: "Third time’s the one",
    lead: "Jake Rosen got into real estate twice and walked away twice. The third time, he plugged into the systems and showed up at the office every day.",
    text: "Working out at home, I couldn’t get anything done. Having a physical office to go to every day is a huge game changer for me.",
    name: "Jake Rosen, KW East Idaho agent · 15 closings so far this year",
    story: "jake-rosen",
  } as null | { eyebrow: string; lead: string; text: string; name: string; story: string },
};

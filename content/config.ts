// Every number, name, phone, address and claim on the site lives here (or in the other
// files in /content). Change values here, not in components. Anything marked TODO is a
// fact leadership still has to supply; placeholders only render while
// NEXT_PUBLIC_SHOW_PLACEHOLDERS is not "false" (turn it off for launch).

export const showPlaceholders = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS !== "false";

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://careers.kweastidaho.com", // TODO: confirm domain
  name: "Keller Williams Realty East Idaho Careers",
  brokerage: "Keller Williams Realty East Idaho",
  shortName: "KW East Idaho",
  region: "Idaho Falls, Pocatello and the Upper Snake River Valley",
  // Idaho Real Estate Commission disclosures (from Steven, 2026-10-26)
  designatedBroker: "Dwayne Coburn" as string | null,
  brokerageLicense: "PT39082" as string | null,
  youtube: "https://www.youtube.com/@kweastidaho", // TODO: confirm channel URL
  podcast: null as string | null, // TODO: podcast URL
};

export const leadOwner = {
  name: "Debbie Richards",
  firstName: "Debbie",
  title: "Team Leader",
  email: "justcallDebbie@kw.com",
  phone: "(208) 590-7653",
  phoneE164: "+12085907653",
  photo: "/media/debbie-richards.webp" as string | null, // 4:5 headshot from Steven, 2026-10-26 (source is 484x590; a larger original would look sharper)
};

export const booking = {
  // Debbie's Google Calendar booking page (from Steven, 2026-10-26). Short links can't be framed, so the site
  // links out to it. For an inline calendar, use Google's "Website embed" URL (it ends in ?gv=true).
  url: process.env.NEXT_PUBLIC_BOOKING_URL ?? ("https://calendar.app.google/gaA5rbnJ3uXsuY9V6" as string | null),
  meetingName: "Confidential Career Conversation",
  minutes: 20,
};

export type Office = {
  slug: "idaho-falls" | "pocatello";
  city: string;
  name: string;
  street: string | null;
  zip: string | null;
  phone: string | null;
  isMarketCenter: boolean;
  confirmed: boolean; // false = physical office not confirmed; no LocalBusiness schema is emitted
  geo?: { lat: number; lng: number };
};

export const offices: Office[] = [
  {
    slug: "idaho-falls",
    city: "Idaho Falls",
    name: "Keller Williams Realty East Idaho",
    street: "3525 Merlin Dr",
    zip: "83404",
    phone: "(208) 529-8888",
    isMarketCenter: true,
    confirmed: true,
  },
  // Address from Steven, 2026-10-26. Same phone as Idaho Falls (Steven, 2026-10-30).
  { slug: "pocatello", city: "Pocatello", name: "Keller Williams Realty East Idaho", street: "1777 E Clark St #110", zip: "83201", phone: "(208) 529-8888", isMarketCenter: false, confirmed: true },
];

export const marketCenter = offices[0];

// ---- Proof. Every stat carries its source. ----
export const mlsSource = "Based on Snake River MLS data, 10/1/2025–9/30/2026. Data not compiled or verified by the MLS.";

export const roster = {
  asOf: "10/23/2026", // update monthly
  agents: 203,
  joinedThisYear: 46,
  joinedLabel: "agents joined in 2026",
  // never publish departures or attrition
};

export const profitShare = {
  amount: 138741,
  period: "Jan–Sep 2026",
  disclaimer:
    "Profit share is paid from market center profits, varies year to year and is not guaranteed. Past amounts do not predict future payments.",
};

export type Stat = { value: number; prefix?: string; suffix?: string; label: string; detail?: string; source: string };

export const proofStats: Stat[] = [
  { value: 1, prefix: "#", label: "brokerage in the Snake River MLS", detail: "by agent sales volume", source: mlsSource },
  { value: 822, prefix: "$", suffix: "M", label: "in agent volume", detail: "more than the next two brokerages combined", source: mlsSource },
  { value: 75, suffix: "%", label: "more closings for the typical agent", detail: "median 7 sides at KW East Idaho vs. 4 elsewhere", source: mlsSource },
  { value: 17, label: "of the MLS’s top 50 producers", detail: "work at KW East Idaho", source: mlsSource },
];

// Comparison data behind the four proof stats (same MLS export, 10/1/2025–9/30/2026).
// Other brokerages are never named on the site: they are shown by rank only.
export const proofCharts = {
  volumeByRank: [821.6, 398.8, 380.3, 231.3, 98.9], // $M, KW East Idaho first, then #2–#5
  medianSides: { kw: 7, elsewhere: 4 }, // median closed sides, producing agents
  medianVolume: { kw: 2.78, elsewhere: 1.59 }, // $M, median producing agent
  top50: { kw: 17, nextBest: 10, total: 50 }, // top 50 producers by volume
};

export const rosterStats: Stat[] = [
  { value: roster.agents, label: "agents", detail: `as of ${roster.asOf}`, source: "KW East Idaho roster" },
  { value: roster.joinedThisYear, label: roster.joinedLabel, detail: "and counting", source: "KW East Idaho roster" },
  { value: profitShare.amount, prefix: "$", label: "profit share paid to our agents", detail: profitShare.period, source: "Market center records" },
];

export const franchiseLine = "Part of the world’s largest real estate franchise by agent count.";

// ---- Testimonials: real quotes only, with written permission. ----
export type Testimonial = { quote: string; name: string; detail: string; photo: string; persona: Persona[] };
export const testimonials: Testimonial[] = [
  // Real agent quotes only (with photo + written OK). Shown beside every form. TODO: 2–5 more, incl. a new agent.
  {
    quote: "I chose Keller Williams, and that made all the difference.",
    name: "Rebecca Running",
    detail: "Grew her business sevenfold in 9 months",
    photo: "/media/story-rebecca-running-portrait.webp",
    persona: ["experienced"],
  },
  {
    quote: "It’s been way more than I even expected.",
    name: "Allison Youngstrom",
    detail: "On the coaching and support she got as a new agent",
    photo: "/media/story-allison-youngstrom-portrait.webp",
    persona: ["new"],
  },
  {
    quote: "There couldn’t be a bigger culture of sharing than what we have.",
    name: "Dave Nelson",
    detail: "Leads the Nelson Group",
    photo: "/media/story-dave-nelson-portrait.webp",
    persona: ["team"],
  },
  {
    quote: "I’m busier than I imagined. It’s changed the way I approach business.",
    name: "Andrew Schneider",
    detail: "Switched from another brokerage",
    photo: "/media/story-andrew-schneider-portrait.webp",
    persona: ["experienced"],
  },
];

export type Persona = "new" | "experienced" | "team";

// ---- Leadership ----
export const leaders = [
  {
    name: leadOwner.name,
    title: leadOwner.title,
    phone: leadOwner.phone,
    email: leadOwner.email,
    photo: leadOwner.photo,
    // From Steven, 2026-10-26 (lightly edited)
    bio: "Debbie left public education to help families buy and sell real estate, and became a top-producing agent. Now she uses that combined experience to teach agents how to do the same." as string | null,
  },
  // TODO: operating principal / MCA and other leaders
];

// ---- Videos. Replace local files with Mux/Cloudflare Stream/YouTube URLs for launch. ----
export const videos = {
  // Home hero background: push-in to the Idaho Falls office at dusk (AI-generated from Steven, 10s).
  // Plays once and holds on the last frame; reduced-motion visitors get the last frame as a still.
  heroLoop: { mp4: "/media/hero-office.mp4", webm: "/media/hero-office.webm", poster: "/media/hero-office-poster.webp", end: "/media/hero-office-end.webp", loop: false },
  skilledAgents: {
    // Re-edit from Steven 2026-10-26 ("Mike talking about needing to grow with the market"): cleaner cut, 1:15.
    title: "Grow With the Market: Why Skilled Agents Win in a Tough Market",
    src: "/media/grow-with-the-market.mp4",
    poster: "/media/grow-with-the-market-poster.webp",
    duration: "PT1M15S",
    uploadDate: "2026-10-26", // TODO: real publish date
    description: "Mike Hicks and Steven Hatch of KW East Idaho on why you have to keep changing, and why a tougher market can mean less competition for skilled agents.",
    speakers: ["Mike Hicks", "Steven Hatch"],
    captions: "burned-in",
  },
  redDay: {
    title: "RED Day 2026: our agents with Habitat for Humanity Idaho Falls",
    src: "/media/red-day-2026.mp4",
    poster: "/media/redDayPoster-540.webp",
    duration: "PT43S",
    uploadDate: "2026-05-14", // TODO: confirm RED Day 2026 date
    description: "KW East Idaho agents volunteering with Habitat for Humanity Idaho Falls Area on RED Day 2026.",
  },
  kwCares: {
    title: "KW Cares and Habitat for Humanity",
    src: "/media/kw-cares-habitat.mp4",
    poster: "/media/kw-cares-habitat-poster.webp",
    duration: "PT1M50S",
    uploadDate: "2026-10-24", // TODO: real publish date
    description: "KW East Idaho agents working a Habitat for Humanity build day.",
  },
  pocatelloEvent: {
    title: "KW Pocatello client event",
    src: "/media/pocatello-client-event.mp4",
    poster: "/media/pocatello-client-event-poster.webp",
    duration: "PT2M15S",
    uploadDate: "2026-10-24", // TODO: real event date
    description: "A client appreciation party in the park, put on by KW East Idaho’s Pocatello agents.",
  },
  skillshareTestimonials: {
    title: "What agents say about Skillshare",
    src: "/media/skillshare-testimonials.mp4",
    poster: "/media/skillshare-testimonials-poster.webp",
    duration: "PT2M14S",
    uploadDate: "2026-10-24", // TODO
    description: "KW East Idaho agents on Skillshare, the weekly call where agents share scripts and what’s working right now.",
  },
  skillshareNugget: {
    title: "A Skillshare golden nugget",
    src: "/media/skillshare-golden-nugget.mp4",
    poster: "/media/skillshare-golden-nugget-poster.webp",
    duration: "PT38S",
    uploadDate: "2026-10-24", // TODO
    description: "A 38-second clip from Skillshare: how much would it benefit you if you got great at this one conversation?",
  },
  // TODO: 60–90s leader welcome video (needs filming). When it exists, set src + poster + transcript.
  // "Our KW Story" (Oct 2026): Steven Hatch on why 17 of the top 50 are here. Captions are a .vtt from speech-to-text, reviewed.
  leaderWelcome: {
    title: "Our KW Story: 17 of the top 50, by design",
    src: "/media/our-kw-story.mp4",
    poster: "/media/our-kw-story-poster.webp",
    captions: "/media/our-kw-story.vtt",
    duration: "PT2M58S",
    uploadDate: "2026-10-25", // TODO: real publish date
    description: "Steven Hatch of KW East Idaho on the leaders, systems and priorities behind the market’s top producers.",
    speaker: "Steven Hatch",
    transcript: "17 of the top 50 agents in the Snake River MLS work at one brokerage. That’s profound when you look and see that there are more than 200 brokerages registered in this MLS. One of them is home to more than one in three of the market’s top producers. It’s Keller Williams Realty East Idaho. And that isn’t luck. It’s by design. See, most brokerages give you a desk, a logo and a good broker, but for the most part, you’re on your own. Plenty of good agents have survived that way for years. But is survival truly what you are aiming for? At Keller Williams Realty East Idaho, you get five full-time leaders whose job is your growth: a productivity coach, an agent services team, a team leader, an operating principal and a broker. And they pick up the phone, and they go well beyond what most offices can. We don’t just teach you how to get business. We teach you how to build one, with proven systems, tools and models. And we teach you how to build a purposeful life around it. Our priorities are God, family, then business, in that order. We care about the whole of life, not just the next closing. Real estate is the vehicle. A more abundant life is the destination. Rebecca Running started her career at a small brokerage where her friends were. And in her first nine months, she closed one deal. Then she joined Keller Williams Realty East Idaho. In her next nine months, she closed seven. Same agent, same market, same amount of time, seven times the results. The difference was what she plugged into. And Rebecca isn’t an outlier. She’s the pattern. Keller Williams Realty East Idaho has closed over $1 billion in sales every year since 2019, including $1,030,882,982 in 2025. Boy, that was a mouthful. And this year we’ve done more sales volume than the next two brokerages combined. But let’s be honest. We’re not for everyone. So if you want to do one or two deals a year and coast, there are easier places to park your license. We’re built for agents who are serious about growth in their business and in their life. More than 200 brokerages. One of them is home to 17 of the top 50 agents. If you want to be a top producer, the odds say you should be where the top producers are. So here’s the question. What would seven times your business do for your family? What if it was only doubling what you’re doing now? Would it be worth it? Let’s have a 20-minute conversation. No pressure, no pitch deck, just your goals and whether we’re the place to hit them.",
  } as null | { title: string; src: string; poster: string; captions: string; duration: string; uploadDate: string; description: string; speaker: string; transcript: string },
};

export const leadMagnets = {
  experienced: {
    title: "The East Idaho Agent Playbook", // approved by Steven 2026-10-28; source in project files playbook/
    subtitle: "Your path to 30 closings a year",
    file: "/guides/east-idaho-agent-playbook.pdf" as string | null,
  },
  new: {
    title: "The New Agent’s First 90 Days in East Idaho",
    subtitle: "A week-by-week plan for your first three months",
    file: null as string | null, // not written yet; new agents are offered the Playbook until it exists
  },
};

export const textUsBody = "Hi Debbie, I have a question about a career at KW East Idaho.";

// ---- Living wage (SRMLS Agent Success analysis, Oct 2026; final numbers from Steven's handoff) ----
// Modeled from closed volume, not reported income. Whole roster counts agents who closed nothing.
// Never publish team-member earnings, growth claims, or competitor names from this analysis.
export const livingWage = {
  annual: 48486, // MIT Living Wage Calculator, Bonneville County, 1 adult, Feb 2026
  netCommissionNeeded: 62195, // + employer half of SE tax (7.65%) + $10,000 business costs
  sidesNeeded: 7, // solo agent at 2.75% per side, ~$2.7–2.8M volume
  roster: { kw: 34, others: 22, ratio: "1.5x" }, // % of whole roster at a living wage
  experienced: { kw: 53, others: 43 }, // agents who also closed last year
  threeCounty: { kw: 28, others: 17, ratio: "1.7x" }, // Bingham, Bonneville, Jefferson business only
  shareOfAgents: 14,
  shareOfSides: 25,
  firstYear: { kw: 13, everywhere: "10–13%" }, // first-year producers, any brokerage
  marketBackdrop: "Fewer than 1 in 4 Snake River MLS agents earns a living wage.",
  source:
    "Source: Snake River MLS closed residential production, 10/1/2025–9/30/2026; living wage per MIT Living Wage Calculator, Bonneville County, 2026 ($48,486 for one adult). Earnings modeled from closed volume at 2.75% per side, after each brokerage’s split and cap, self-employment tax and $10,000 in business costs. Not reported income. Data not compiled or verified by the MLS.",
};

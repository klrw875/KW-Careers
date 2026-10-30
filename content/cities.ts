// City page copy. Unique per city (SEO + "these people get my town").
import type { MediaKey } from "./media.generated";

export type City = {
  slug: "idaho-falls" | "pocatello";
  city: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  heroImage: MediaKey;
  localPoints: { t: string; b: string }[];
  howWeServe: string;
  // TODO: local leaders (name, title, photo) and a local market snapshot from Market Pulse
  leaders: { name: string; title: string; photo: string | null }[];
  marketSnapshot: { label: string; value: string; source: string }[];
};

export const cities: City[] = [
  {
    slug: "idaho-falls",
    city: "Idaho Falls",
    title: "Real Estate Brokerage in Idaho Falls",
    description: "Join Keller Williams in Idaho Falls. Visit the KW East Idaho market center at 3525 Merlin Dr: weekly training in the Learning Center, Market Pulse and leadership down the hall.",
    h1: "Your home base on Merlin Drive.",
    intro: "The KW East Idaho market center: the Learning Center, Market Pulse, masterminds, and leadership down the hall when you need them.",
    heroImage: "office",
    localPoints: [
      { t: "The Learning Center", b: "Weekly classes in person, from business planning to how to use AI in your business." },
      { t: "Market Pulse", b: "Monthly Bonneville County numbers so you can answer your clients before they ask." },
      { t: "Leadership on site", b: "Walk in, call or text. The people who run the office are here." },
    ],
    howWeServe: "Idaho Falls is home to our market center at 3525 Merlin Dr. Agents across Bonneville County and the River Walk, Ammon, Iona and Rigby areas train here every week.",
    leaders: [],
    marketSnapshot: [],
  },
  {
    slug: "pocatello",
    city: "Pocatello",
    title: "Real Estate Jobs in Pocatello",
    description: "Build your real estate career in Pocatello and Bannock County with KW East Idaho. Every training is live on Zoom, with KW MyWay plans and profit share.",
    h1: "Build your Pocatello business with a team behind it.",
    intro: "Sell in the Portneuf Valley from our Pocatello office. Train live on Zoom every week, and plug into the #1 brokerage in the Snake River MLS.",
    heroImage: "zoom",
    localPoints: [
      { t: "An office in Pocatello", b: "Work from our office on East Clark Street, and join every training live on Zoom without the drive up I-15." },
      { t: "Your clients, your market", b: "From Old Town to Chubbuck and the ISU area, you keep your local focus and your relationships." },
      { t: "Idaho Falls when you want it", b: "The market center is about 50 minutes north for events, masterminds and the Business Planning Clinic." },
    ],
    howWeServe: "KW East Idaho agents serve Pocatello, Chubbuck and Bannock County.",
    leaders: [],
    marketSnapshot: [],
  },
];

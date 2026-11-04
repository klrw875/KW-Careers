import {
  AgentStories, ChoosePath, Culture, FaqSection, FinalCta, First90, Hero, InlineAsk, LeadershipVideo,
  ProfitShareSection, ProofBar, UpcomingEventsSection,
} from "./sections";
import { LivingWageSection } from "./LivingWage";
import { ClientBoot } from "./client";
import { JsonLd, homeVideos, localBusinessSchemas, eventSchema } from "@/lib/schema";
import { getUpcomingEvents } from "@/lib/eventbrite";
import type { HeroVariant } from "@/content/copy";

// Home order (site audit, Nov 2026): show people before arguing, ask for the meeting every few screens.
// The calculator, value stack, problem cards and groceries analogy live on the persona pages.
export async function HomePage({ variant = "a" }: { variant?: HeroVariant }) {
  const events = await getUpcomingEvents();
  return (
    <>
      <ClientBoot heroVariant={variant} />
      <JsonLd data={[...localBusinessSchemas(), ...homeVideos(), ...events.map(eventSchema)]} />
      <Hero variant={variant} />
      <ChoosePath />
      <AgentStories />
      <InlineAsk cta="ask_stories" text="Want the same kind of support? Talk with Debbie. Your current brokerage won’t hear about it from us." />
      <ProofBar compact />
      <LivingWageSection calcHref="/calculator" />
      <ProfitShareSection />
      <InlineAsk cta="ask_living_wage" text="Want to see where your own numbers land? Debbie will walk you through them. 20 minutes, confidential." />
      <LeadershipVideo />
      <Culture compact />
      <InlineAsk cta="ask_culture" text="Come see it for yourself. 20 minutes with Debbie, at the office, by phone or on Zoom." />
      <UpcomingEventsSection />
      <First90 />
      <FaqSection limit={6} />
      <FinalCta />
    </>
  );
}

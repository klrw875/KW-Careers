import {
  AgentStories, CalculatorSection, ChoosePath, Culture, FaqSection, FinalCta, First90, Hero, LeadershipVideo,
  ProblemCards, ProfitShareSection, InlineAsk, ProofBar, QuizSection, UpcomingEventsSection, FeedYourBusiness, BothWorlds, ValueStack,
} from "./sections";
import { LivingWageSection } from "./LivingWage";
import { ClientBoot } from "./client";
import { JsonLd, homeVideos, localBusinessSchemas, eventSchema } from "@/lib/schema";
import { getUpcomingEvents } from "@/lib/eventbrite";
import type { HeroVariant } from "@/content/copy";

export async function HomePage({ variant = "a" }: { variant?: HeroVariant }) {
  const events = await getUpcomingEvents();
  return (
    <>
      <ClientBoot heroVariant={variant} />
      <JsonLd data={[...localBusinessSchemas(), ...homeVideos(), ...events.map(eventSchema)]} />
      <Hero variant={variant} />
      <ProofBar />
      <ProblemCards />
      <LeadershipVideo />
      <ChoosePath />
      <LivingWageSection />
      <InlineAsk cta="ask_living_wage" text="Want to see where your own numbers land? Debbie will walk you through them. 20 minutes, confidential." />
      <CalculatorSection />
      <FeedYourBusiness next="#stories" nextLabel="Meet agents who fed their business" />
      <ValueStack />
      <AgentStories />
      <InlineAsk cta="ask_stories" text="Want the same kind of support? Talk with Debbie. Your current brokerage won’t hear about it from us." />
      <ProfitShareSection />
      <BothWorlds />
      <Culture />
      <InlineAsk cta="ask_culture" text="Come see it for yourself. 20 minutes with Debbie, at the office, by phone or on Zoom." />
      <First90 />
      <UpcomingEventsSection />
      <QuizSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}

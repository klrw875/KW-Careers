import {
  AgentStories, CalculatorSection, ChoosePath, Culture, FaqSection, FinalCta, First90, Hero, LeadershipVideo,
  ProblemCards, ProfitShareSection, ProofBar, QuizSection, UpcomingEventsSection, FeedYourBusiness, BothWorlds, ValueStack,
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
      <CalculatorSection />
      <FeedYourBusiness next="#stories" nextLabel="Meet agents who fed their business" />
      <ValueStack />
      <AgentStories />
      <ProfitShareSection />
      <BothWorlds />
      <Culture />
      <First90 />
      <UpcomingEventsSection />
      <QuizSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}

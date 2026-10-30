import {
  AgentStories, CalculatorSection, ChoosePath, Culture, FaqSection, FinalCta, First90, Hero, LeadershipVideo,
  ProblemCards, ProfitShareSection, ProofBar, QuizSection, UpcomingEventsSection, FeedYourBusiness, BothWorlds, ValueStack,
} from "./sections";
import { LivingWageSection } from "./LivingWage";
import { ClientBoot } from "./client";
import { JsonLd, homeVideos, localBusinessSchemas, eventSchema } from "@/lib/schema";
import { upcomingEvents } from "@/content/events";
import type { HeroVariant } from "@/content/copy";

export function HomePage({ variant = "a" }: { variant?: HeroVariant }) {
  return (
    <>
      <ClientBoot heroVariant={variant} />
      <JsonLd data={[...localBusinessSchemas(), ...homeVideos(), ...upcomingEvents().map(eventSchema)]} />
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

import { UpcomingEventsSection, FinalCta, SectionHead } from "@/components/sections";
import { NotifyForm } from "@/components/EventsClient";
import { JsonLd, eventSchema } from "@/lib/schema";
import { upcomingEvents } from "@/content/events";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Events: Career Nights, Clinics and Open Trainings",
  description: "Free events for real estate agents in East Idaho: Business Planning Clinic, open trainings and career nights at the KW East Idaho office in Idaho Falls.",
  path: "/events",
  og: "og-training",
});

export default function Page() {
  return (
    <>
      <JsonLd data={upcomingEvents().map(eventSchema)} />
      <div className="on-dark bg-black py-12 text-white md:py-16">
        <div className="wrap">
          <p className="eyebrow text-kw-gray">Events</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-tight font-bold md:text-6xl">Free sessions for every licensed agent in East Idaho.</h1>
        </div>
      </div>
      <UpcomingEventsSection />
      <section className="py-16">
        <div className="wrap max-w-2xl">
          <SectionHead eyebrow="Never miss one" title="Get new dates first." />
          <div className="mt-6"><NotifyForm /></div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}

import { PageHero, Split, Checks } from "@/components/PageHero";
import { SectionHead, CalculatorSection, FaqSection, FinalCta, ProofBar, UpcomingEventsSection, StoryFeature, AgentStories, NextLink, FeedYourBusiness } from "@/components/sections";
import { VideoPlayer } from "@/components/VideoPlayer";
import { LivingWageSection } from "@/components/LivingWage";
import { videoSchema } from "@/lib/schema";
import { JsonLd, careerSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/meta";
import { showPlaceholders, videos } from "@/content/config";

export const metadata = pageMeta({
  title: "Start Your Real Estate Career in Idaho",
  description: "How to become a real estate agent in Idaho, and what your first 90 days look like at KW East Idaho: weekly training, a mentor and the Supported plan with no monthly bill.",
  path: "/new-agents",
  og: "og-training",
});

// TODO(review): confirm licensing steps against current Idaho Real Estate Commission requirements.
const roadmap = [
  { step: "Take your pre-license classes", body: "Idaho requires approved pre-license courses (Principles and Practices). Many agents finish online in a few weeks." },
  { step: "Pass the state exam", body: "Schedule the Idaho real estate exam once your courses are done. We’ll share what to study." },
  { step: "Background check", body: "Submit fingerprints for the background check the Commission requires." },
  { step: "Choose your brokerage", body: "Your license is held by a brokerage. Pick one that trains you, not one that just takes a split." },
  { step: "Apply for your license", body: "Submit your application to the Idaho Real Estate Commission with your sponsoring broker." },
];

const ninety = [
  { when: "Week 1", t: "Get set up", b: "Onboarding, KW Command, your database, your business cards and your first client conversations." },
  { when: "Weeks 2–4", t: "Learn the core skills", b: "Weekly trainings on lead generation, scripts, contracts and showings. Every class is also on Zoom." },
  { when: "Day 30", t: "Write your plan", b: "Sit down with leadership. Pick your goal and work backward to the weekly habits that get you there." },
  { when: "Day 90", t: "First review", b: "Look at your numbers together. Celebrate the wins. Fix what isn’t working." },
];

export default function Page() {
  return (
    <>
      <JsonLd data={[careerSchema("Idaho Falls"), videoSchema(videos.skillshareTestimonials), videoSchema(videos.skillshareNugget)]} />
      <PageHero
        eyebrow="New and aspiring agents"
        title="Start strong. You won’t do your first year alone."
        intro="Weekly training, a mentor, a written plan, and a plan that keeps your costs low while you get your first closings."
        image="trainingSession"
        mobileImage="trainingSessionTall"
        alt="A packed KW Learning Center during “The ABCs of AI” class"
        primary={{ href: "/quiz", label: "Find My Career Path" }}
        secondary={{ href: "/book", label: "Talk to Debbie" }}
      />
      <section className="py-16 md:py-24">
        <div className="wrap">
          <SectionHead eyebrow="Licensing roadmap" title="How to become a real estate agent in Idaho." intro="Five steps. We’ll walk you through each one, even before you’re licensed." />
          <ol className="mt-10 grid gap-4 md:grid-cols-5">
            {roadmap.map((r, i) => (
              <li key={r.step} className="border-t-4 border-black pt-4">
                <p className="font-display text-4xl font-bold text-kw-red">{i + 1}</p>
                <h3 className="mt-2 text-lg font-bold">{r.step}</h3>
                <p className="mt-1 text-sm text-kw-gray-medium">{r.body}</p>
              </li>
            ))}
          </ol>
          {showPlaceholders && <p className="mt-6 bg-kw-wash p-3 text-xs font-bold">TODO: leadership to confirm current IREC hours, fees and links.</p>}
        </div>
      </section>
      <section className="on-dark bg-black py-16 text-white md:py-24">
        <div className="wrap">
          <SectionHead dark eyebrow="KW MyWay Supported plan" title="No monthly office bill while you get going." intro="Supported is our “we cover it” plan, built for newly licensed agents." />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Checks dark items={["No monthly office bill", "No E&O charge", "No compliance charge", "Transaction coordinating, contract to close, included", "$500 a year and $250 per deal, on a 70/30 split"]} />
            <p className="self-end text-kw-gray-light">Eligibility: newly licensed agents and those who did more than 7 transactions in the previous 12 months. Royalty is 6%, capped at $3,000, and resets on your anniversary date.</p>
          </div>
          <NextLink href="#calculator" dark>See your first-year numbers</NextLink>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="wrap">
          <SectionHead eyebrow="Your first 90 days" title="A real plan, week by week." />
          <ol className="mt-10 grid gap-6 md:grid-cols-4">
            {ninety.map((s) => (
              <li key={s.when} className="bg-kw-wash p-6">
                <p className="text-sm font-bold tracking-[.14em] text-kw-red uppercase">{s.when}</p>
                <h3 className="mt-2 text-xl font-bold">{s.t}</h3>
                <p className="mt-2 text-kw-gray-medium">{s.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <FeedYourBusiness />
      <Split image="zoom" alt="A live Zoom training with about 20 agents on screen" caption="Every session is on Zoom.">
        <p className="eyebrow text-kw-gray-medium">Train from anywhere</p>
        <h2 className="mt-4 text-3xl font-bold md:text-4xl">Train live from Idaho Falls, Pocatello or anywhere.</h2>
        <p className="mt-4 text-lg text-kw-gray-medium">Every session is on Zoom, so you never miss a class because of the drive or your schedule.</p>
      </Split>
      <section className="on-dark bg-black py-16 text-white md:py-24">
        <div className="wrap">
          <SectionHead dark eyebrow="Skillshare" title="Top agents share exactly what’s working. Every week." intro="Skillshare is the call where KW East Idaho agents trade scripts, conversations and what’s working in this market right now. Nothing is a secret. Here’s what agents say about it, and a 38-second taste of a session." />
          <div className="mt-10 grid gap-8 md:grid-cols-[1.6fr_1fr]">
            <figure>
              <VideoPlayer {...videos.skillshareTestimonials} label="What agents say about Skillshare · 2:14" />
              <figcaption className="mt-3 text-sm text-kw-gray-light">“I’m not alone in this business.” Agents on what Skillshare gives them.</figcaption>
            </figure>
            <figure>
              <VideoPlayer {...videos.skillshareNugget} label="A Skillshare golden nugget · 0:38" />
              <figcaption className="mt-3 text-sm text-kw-gray-light">“How much would it benefit you financially if you got great at this one conversation?”</figcaption>
            </figure>
          </div>
        </div>
      </section>
      <StoryFeature
        slug="allison-youngstrom"
        eyebrow="Changing careers"
        title="“Way more than I even expected.”"
        intro="Allison had been in careers where she wasn’t guided or helped enough. She didn’t want that again. Here’s who showed up for her in her first months."
      />
      <Split image="mastermind" alt="Agents at a mastermind roundtable" reverse>
        <p className="eyebrow text-kw-gray-medium">Mentorship</p>
        <h2 className="mt-4 text-3xl font-bold md:text-4xl">Someone to call when a deal gets hard.</h2>
        <p className="mt-4 text-lg text-kw-gray-medium">Mentors and mastermind groups where experienced agents share what’s working right now, in this market.</p>
      </Split>
      <ProofBar compact />
      <AgentStories persona="new" />
      <LivingWageSection persona="new" />
      <CalculatorSection newlyLicensed title="See what your first year could look like." />
      <UpcomingEventsSection />
      <FaqSection persona="new" />
      <FinalCta persona="new" />
    </>
  );
}

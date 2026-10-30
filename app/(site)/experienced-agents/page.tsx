import { PageHero, Split, Checks } from "@/components/PageHero";
import { SectionHead, CalculatorSection, FaqSection, FinalCta, ProofBar, ValueStack, UpcomingEventsSection, NextLink, StoryFeature, BothWorlds, MeetYourCoaches } from "@/components/sections";
import { VideoPlayer } from "@/components/VideoPlayer";
import { LivingWageSection } from "@/components/LivingWage";
import { JsonLd, careerSchema, videoSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/meta";
import { videos } from "@/content/config";

export const metadata = pageMeta({
  title: "Make Your Move: Experienced Agents",
  description: "Choose your split, cap and fees with KW MyWay. Cap at $12,000 and keep the rest. Transition concierge, KW Command and leadership that answers the phone.",
  path: "/experienced-agents",
  og: "og-lobby",
});

export default function Page() {
  return (
    <>
      <JsonLd data={[careerSchema("Idaho Falls"), videoSchema(videos.skilledAgents)]} />
      <PageHero
        eyebrow="Experienced agents"
        title="Keep more after a great year. Get your time back."
        intro="Choose your split, your cap, your fees and your services. Then let leadership, systems and a transition concierge carry the load you’ve been carrying alone."
        image="lobby"
        alt="The Idaho Falls office lobby"
        primary={{ href: "#calculator", label: "See My Take-Home" }}
        secondary={{ href: "/book", label: "Book a Confidential Conversation" }}
      />
      <ProofBar compact />
      <section className="on-dark bg-black py-16 text-white md:py-24">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_300px]">
          <div>
            <SectionHead dark eyebrow="KW MyWay 12K plan" title="Cap at $12,000. After that, it’s yours." intro="Everything after cap is yours except small per-deal fees: $125 per transaction after cap, $25 compliance and $40 E&O (capped at $500 a year)." />
            <Checks dark items={["70/30 split until you reach your $12,000 cap", "6% royalty, capped at $3,000", "$110 a month and $25 a year", "Cap and royalty reset on your anniversary date"]} />
            <NextLink href="#calculator" dark>Run your numbers</NextLink>
          </div>
          <div className="w-full max-w-[300px] justify-self-center">
            <VideoPlayer {...videos.skilledAgents} vertical phoneFrame label="Leadership perspective · 1:15" />
          </div>
        </div>
      </section>
      <StoryFeature
        slug="rebecca-running"
        eyebrow="From another brokerage"
        title="“Don’t go to Keller Williams. They take so much of your money.”"
        intro="Rebecca heard it too. Then she looked at the whole picture: what she pays, and what she gets for it. Nine months later, her business has grown sevenfold."
      />
      <Split image="trainingFinancial" alt="“A Financially Sound Business” class at the KW Learning Center">
        <p className="eyebrow text-kw-gray-medium">Run it like a business</p>
        <h2 className="mt-4 text-3xl font-bold md:text-4xl">You’re not just an agent. You’re a business owner.</h2>
        <p className="mt-4 text-lg text-kw-gray-medium">Classes like “A Financially Sound Business,” the Business Planning Clinic and productivity coaching help you track your numbers, cut what isn’t working and plan your year.</p>
      </Split>
      <section className="bg-kw-wash py-16 md:py-24">
        <div className="wrap">
          <SectionHead eyebrow="Transition concierge" title="Switching shouldn’t cost you a month of business." intro="We help you move your listings, signs and database, and get your tech set up in week one, so you keep working while we handle the details." />
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {["Listings and pendings plan", "Signs and marketing", "Database import into KW Command", "License transfer paperwork"].map((t) => (
              <div key={t} className="border-t-4 border-kw-red bg-white p-5 font-bold">{t}</div>
            ))}
          </div>
        </div>
      </section>
      <BothWorlds />
      <MeetYourCoaches persona="experienced" />
      <StoryFeature
        slug="andrew-schneider"
        white
        eyebrow="He almost didn’t take the call"
        title="Zero closings in April, May and June. About $1.1 million in July."
        intro="Andrew planned to stay put at his old brokerage as a single agent. He came in to ask why we kept calling. Here’s what happened next."
      />
      <LivingWageSection persona="experienced" />
      <CalculatorSection title="Compare your current split to KW MyWay." />
      <ValueStack />
      <UpcomingEventsSection />
      <FaqSection persona="experienced" />
      <FinalCta persona="experienced" />
    </>
  );
}

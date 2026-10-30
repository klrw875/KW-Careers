import { PageHero, Split, Checks } from "@/components/PageHero";
import { SectionHead, CalculatorSection, FaqSection, FinalCta, ProofBar, ProfitShareSection, StoryFeature } from "@/components/sections";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "For Team Leaders and Top Producers",
  description: "Keep your team brand, scale with operations support, and build wealth through profit share at KW East Idaho. Team member caps from $8,000.",
  path: "/teams",
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Team leaders and top producers"
        title="Keep your brand. Scale with support. Build wealth."
        intro="You’ve built something real. Grow it with leverage, operations support and a profit share model that rewards you for growing the community."
        image="mastermind"
        alt="Producers at a mastermind roundtable"
        secondary={{ href: "#calculator", label: "Model My Team’s Caps" }}
      />
      <ProofBar compact />
      <section className="py-16 md:py-24">
        <div className="wrap grid gap-10 md:grid-cols-3">
          {[
            { t: "Keep your brand", b: "Your team name, your look and your culture, within KW brand and Idaho advertising rules." },
            { t: "Scale with leverage", b: "Lower team member caps, KW Command for the whole team, and training your agents can attend every week." },
            { t: "Build wealth", b: "Profit share rewards you for helping the market center grow, and it can continue as the community grows." },
          ].map((x) => (
            <div key={x.t} className="border-t-4 border-black pt-4">
              <h2 className="text-2xl font-bold">{x.t}</h2>
              <p className="mt-2 text-kw-gray-medium">{x.b}</p>
            </div>
          ))}
        </div>
      </section>
      <StoryFeature
        slug="dave-nelson"
        eyebrow="Team leader story"
        title="A high producer with no life, until he learned to leverage."
        intro="Dave Nelson was licensed for 10 years before real estate really clicked. Today he leads the Nelson Group, and he says the open, sharing culture is what most people get wrong about KW."
      />
      <section className="on-dark bg-black py-16 text-white md:py-24">
        <div className="wrap">
          <SectionHead dark eyebrow="Team member caps" title="Your agents cap sooner. You keep more margin." />
          <Checks dark items={["12K plan: team members cap at $8,000", "16K plan: team members cap at $9,000", "Same 70/30 split and 6% royalty (capped at $3,000)", "Your own team split is between you and your agents"]} />
        </div>
      </section>
      <Split image="marketPulse" alt="Market Pulse meeting with a Bonneville County key-metrics slide">
        <p className="eyebrow text-kw-gray-medium">Operations and data</p>
        <h2 className="mt-4 text-3xl font-bold md:text-4xl">Run your team on real numbers.</h2>
        <p className="mt-4 text-lg text-kw-gray-medium">Monthly market data, business planning and leadership that helps you build systems, so your team doesn’t depend on you for every decision.</p>
      </Split>
      <ProfitShareSection />
      <StoryFeature
        slug="michele-robison"
        eyebrow="Beyond the commission"
        title="“What do I do with my money after I’ve earned it?”"
        intro="Michele Robison has been with KW East Idaho since 2016. What KW Wealth taught her now pays for her family’s dream home."
      />
      <CalculatorSection title="Model take-home for your team members." />
      <FaqSection persona="team" />
      <FinalCta persona="team" />
    </>
  );
}

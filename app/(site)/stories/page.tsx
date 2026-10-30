import { AgentStories, FinalCta, SectionHead, StoryFeature } from "@/components/sections";
import { VideoPlayer } from "@/components/VideoPlayer";
import { LoopVideo } from "@/components/client";
import { JsonLd, videoSchema, storyVideoSchema } from "@/lib/schema";
import { stories } from "@/content/stories";
import { pageMeta } from "@/lib/meta";
import { site, videos } from "@/content/config";

export const metadata = pageMeta({
  title: "Agent Stories",
  description: "Real KW East Idaho agents in Idaho Falls and Pocatello: how they built their business, in their own words. New stories every month.",
  path: "/stories",
  og: "og-training",
});

export default function Page() {
  return (
    <>
      <JsonLd data={[videoSchema(videos.skilledAgents), videoSchema(videos.redDay), videoSchema(videos.kwCares), videoSchema(videos.pocatelloEvent), ...stories.filter((s) => s.slug !== "rebecca-running").map(storyVideoSchema)]} />
      <div className="on-dark bg-black pt-12 text-white md:pt-16">
        <div className="wrap">
          <p className="eyebrow text-kw-gray">Agent stories</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-tight font-bold md:text-6xl">Real agents. Real East Idaho. Updated every month.</h1>
        </div>
      </div>
      <AgentStories all />
      <StoryFeature slug="rebecca-running" eyebrow="Featured story" title="Sevenfold in 9 months." intro="Rebecca Running came from another brokerage. Here’s what changed when she chose KW East Idaho." />
      <section className="py-16 md:py-24">
        <div className="wrap grid gap-12 md:grid-cols-2">
          <div>
            <SectionHead eyebrow="Leadership perspective" title={videos.skilledAgents.title} intro={videos.skilledAgents.description} />
            <div className="mt-8 max-w-[300px]"><VideoPlayer {...videos.skilledAgents} vertical phoneFrame label="Watch · 1:15" /></div>
          </div>
          <div>
            <SectionHead eyebrow="RED Day 2026" title="Our agents with Habitat for Humanity Idaho Falls." intro="Every year on RED Day, Keller Williams agents around the world step away from business to serve their communities. Here’s ours." />
            <div className="mt-8 aspect-[9/16] max-w-[300px]"><LoopVideo {...videos.redDay} /></div>
          </div>
        </div>
        <div className="wrap mt-16 grid gap-12 md:grid-cols-[1.6fr_1fr]">
          <div>
            <SectionHead eyebrow="KW Cares" title="Agents on a Habitat for Humanity build day." intro="Wheelbarrows, mulch and gravel: KW East Idaho agents giving a day to Habitat for Humanity." />
            <div className="mt-8"><VideoPlayer {...videos.kwCares} label="KW Cares and Habitat for Humanity · 1:50" /></div>
          </div>
          <div>
            <SectionHead eyebrow="Pocatello" title="A party for our clients." intro="Our Pocatello agents throwing a client appreciation party in the park." />
            <div className="mt-8 max-w-[300px]"><VideoPlayer {...videos.pocatelloEvent} vertical phoneFrame label="Pocatello client event · 2:15" /></div>
          </div>
        </div>
        <div className="wrap mt-12">
          <a href={site.youtube} className="btn btn-ghost-dark" rel="noopener">More on the KW East Idaho YouTube channel →</a>
        </div>
      </section>
      <FinalCta />
    </>
  );
}

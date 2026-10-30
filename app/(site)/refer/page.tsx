import { ReferForm, ShareKit } from "@/components/ReferKit";
import { SectionHead, UpcomingEventsSection } from "@/components/sections";
import { pageMeta } from "@/lib/meta";
import { showPlaceholders } from "@/content/config";

export const metadata = pageMeta({
  title: "Refer an Agent",
  description: "KW East Idaho agents: refer an agent you’d love to work with, grab your personal referral link and ready-to-send texts.",
  path: "/refer",
});

export default function Page() {
  return (
    <>
      <div className="on-dark bg-black py-12 text-white md:py-16">
        <div className="wrap">
          <p className="eyebrow text-kw-gray">For KW East Idaho agents</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-tight font-bold md:text-6xl">Know an agent who belongs here?</h1>
          <p className="mt-4 max-w-2xl text-xl text-kw-gray-light">Send us their name, or share your personal link. We’ll take great care of them, and you get the credit.</p>
        </div>
      </div>
      <section className="py-16 md:py-20">
        <div className="wrap grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHead eyebrow="Quick referral" title="Three fields. That’s it." />
            <div className="mt-6"><ReferForm /></div>
          </div>
          <div>
            <SectionHead eyebrow="Share kit" title="Your personal referral link." intro="Every visit and lead from your link tracks back to you." />
            <div className="mt-6"><ShareKit /></div>
            {showPlaceholders && <p className="mt-6 border-2 border-dashed border-kw-gray-light p-4 text-sm"><strong>TODO: social graphics</strong> — square + story-size images for Instagram/Facebook (clinic invite, “we’re growing” with 46 agents joined in 2026).</p>}
          </div>
        </div>
      </section>
      <UpcomingEventsSection />
    </>
  );
}

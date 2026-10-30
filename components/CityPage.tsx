import { PageHero, Split } from "./PageHero";
import { SectionHead, ProofBar, AgentStories, UpcomingEventsSection, FaqSection, FinalCta, ValueStack } from "./sections";
import { Picture } from "./Picture";
import { JsonLd, careerSchema, localBusinessSchemas } from "@/lib/schema";
import { cities } from "@/content/cities";
import { offices, showPlaceholders, marketCenter, videos } from "@/content/config";
import { VideoPlayer } from "./VideoPlayer";
import { videoSchema } from "@/lib/schema";

export function CityPage({ slug }: { slug: (typeof cities)[number]["slug"] }) {
  const c = cities.find((x) => x.slug === slug)!;
  const office = offices.find((o) => o.slug === slug)!;
  // Visit section: this city's own office when we have its address, otherwise the market center
  const visit = office.confirmed && office.street ? office : marketCenter;
  const mapQuery = encodeURIComponent(office.confirmed ? `${office.street}, ${office.city}, ID ${office.zip}` : `${c.city}, Idaho`);
  return (
    <>
      <JsonLd data={[careerSchema(c.city), ...localBusinessSchemas().filter((s) => s.url.endsWith(slug)), ...(slug === "pocatello" ? [videoSchema(videos.pocatelloEvent)] : [])]} />
      <PageHero eyebrow={`KW East Idaho · ${c.city}`} title={c.h1} intro={c.intro} image={c.heroImage} alt={slug === "idaho-falls" ? "The KW East Idaho office in Idaho Falls at sunset" : ""} />
      <ProofBar compact />
      <section className="py-16 md:py-24">
        <div className="wrap">
          <SectionHead eyebrow={c.city} title={`What it’s like to sell in ${c.city} with KW.`} intro={c.howWeServe} />
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {c.localPoints.map((p) => (
              <div key={p.t} className="border-t-4 border-black pt-4">
                <h3 className="text-xl font-bold">{p.t}</h3>
                <p className="mt-2 text-kw-gray-medium">{p.b}</p>
              </div>
            ))}
          </div>
          {showPlaceholders && (
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <div className="border-2 border-dashed border-kw-gray-light p-5 text-sm"><strong>TODO: local leaders</strong> — name, title and photo for {c.city}.</div>
              <div className="border-2 border-dashed border-kw-gray-light p-5 text-sm"><strong>TODO: local market snapshot</strong> — 3–4 numbers for {c.city} from Market Pulse, with source and date.</div>
            </div>
          )}
        </div>
      </section>
      {slug !== "idaho-falls" && (
        <Split image="zoom" alt="A live Zoom training with about 20 agents on screen" dark>
          <p className="eyebrow text-kw-gray">Train from {c.city}</p>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">Train live from {c.city}, or anywhere.</h2>
          <p className="mt-4 text-lg text-kw-gray-light">Every session is on Zoom. Same classes, same leaders, no drive.</p>
        </Split>
      )}
      {slug === "pocatello" && (
        <section className="py-16 md:py-24">
          <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_300px]">
            <div>
              <SectionHead eyebrow="Pocatello community" title="Our Pocatello agents throw a great party." intro="Food, a bounce house and pony cart rides in the park: a client appreciation event put on by KW agents in Pocatello." />
              <blockquote className="mt-8 border-l-4 border-kw-red pl-5 font-serif text-xl leading-snug md:text-2xl">“We do the soup party in the winter. We invite all of our clients, our friends, neighbors, and everybody talks about it for months.”</blockquote>
              <p className="mt-3 font-bold">Jesse Baeza <span className="font-normal text-kw-gray-medium">· KW agent in Pocatello</span></p>
            </div>
            <div className="w-full max-w-[300px] justify-self-center">
              <VideoPlayer {...videos.pocatelloEvent} vertical phoneFrame label="Pocatello client event · 2:15" />
            </div>
          </div>
        </section>
      )}
      <section id="visit" className="bg-kw-wash py-16 md:py-24">
        <div className="wrap grid gap-8 md:grid-cols-2">
          <div>
            <SectionHead eyebrow="Visit us" title="Come see the office." intro={`${visit.name}, ${visit.street}, ${visit.city}, ID ${visit.zip}${visit.phone ? ` · ${visit.phone}` : ""}`} />
            {!office.confirmed && showPlaceholders && <p className="mt-4 text-sm font-bold">TODO: confirm whether there’s a physical office in {c.city}.</p>}
            {visit.isMarketCenter && <div className="relative mt-6 aspect-[4/3] overflow-hidden"><Picture k="lobby" alt="The Idaho Falls office lobby with the knotty-alder reception desk" sizes="(min-width:768px) 50vw, 100vw" fill /></div>}
          </div>
          <div className="min-h-80 bg-white">
            <iframe
              title={`Map: ${visit.name}, ${visit.city}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(`${visit.street}, ${visit.city}, ID ${visit.zip}`)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-80 w-full border-0"
            />
            <a className="sr-only" href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}>Open in Google Maps</a>
          </div>
        </div>
      </section>
      <ValueStack />
      <AgentStories city={c.city} />
      <UpcomingEventsSection />
      <FaqSection limit={5} />
      <FinalCta />
    </>
  );
}

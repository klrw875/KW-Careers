// Home page sections. Each section has one job and ends with a path to the next one.
// Reused on persona and city pages.
import Link from "@/components/SmartLink";
import { preload } from "react-dom";
import { Picture } from "./Picture";
import {
  CountUp,
  ProblemReveal,
  HeroVideo,
  InViewAnim,
  LoopVideo,
  PersonaChips,
  TrackedLink,
} from "./client";
import { VideoPlayer } from "./VideoPlayer";
import { Checks } from "./PageHero";
import { Calculator } from "./Calculator";
import { Quiz } from "./Quiz";
import { Booking } from "./Booking";
import { EventBanner, EventRegister, NotifyForm } from "./EventsClient";
import { FormProof } from "./FormProof";
import { ProofCharts } from "./ProofCharts";
import {
  coaches,
  franchiseLine,
  leadOwner,
  leaders,
  mlsSource,
  profitShare,
  proofStats,
  rosterStats,
  showPlaceholders,
  videos,
  type Coach,
  type Persona,
} from "@/content/config";
import {
  beliefSystem,
  feedYourBusiness,
  bothWorlds,
  kwMission,
  first90,
  heroProof,
  heroVariants,
  localMission,
  personaPaths,
  problemCards,
  valueStack,
  type HeroVariant,
} from "@/content/copy";
import { formatEventDate } from "@/content/events";
import { getUpcomingEvents } from "@/lib/eventbrite";
import { faqs } from "@/content/faqs";
import {
  stories,
  storyPlaceholders,
  storyDisclaimer,
  storyMeta,
  pickStories,
  findStory,
  durationLabel,
  type Story,
} from "@/content/stories";
import { faqSchema, JsonLd, storyVideoSchema, videoSchema } from "@/lib/schema";

const smsHref = `sms:${leadOwner.phoneE164}`;

export function SectionHead({
  eyebrow,
  title,
  intro,
  dark = false,
  center = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`eyebrow ${dark ? "text-kw-gray" : "text-kw-gray-medium"}`}>
        {eyebrow}
      </p>
      <h2 className="mt-4 text-[2rem] leading-[1.08] font-bold md:text-5xl">
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 text-lg md:text-xl ${dark ? "text-kw-gray-light" : "text-kw-gray-medium"}`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

export function NextLink({
  href,
  children,
  dark = false,
}: {
  href: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group mt-10 inline-flex min-h-11 items-center gap-2 font-bold ${dark ? "text-white" : "text-black"}`}
    >
      <span className="border-b-2 border-kw-red pb-0.5">{children}</span>
      <span
        aria-hidden
        className="transition-transform group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}

// ---------- 1. Hero ----------
export async function Hero({ variant = "a" }: { variant?: HeroVariant }) {
  const v = heroVariants[variant];
  const events = await getUpcomingEvents();
  // The poster is the LCP element: tell the browser about it before it parses the hero
  preload(videos.heroLoop.poster, { as: "image", fetchPriority: "high" });
  return (
    <section className="on-dark relative isolate overflow-hidden bg-black text-white lg:grid lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[1.1fr_.9fr]">
      {/* Full-bleed background video behind the copy on every screen size. */}
      <div className="absolute inset-0 -z-10">
        <HeroVideo {...videos.heroLoop} />
        <div
          className="absolute inset-0 bg-black/60 lg:bg-transparent lg:bg-gradient-to-r lg:from-black/90 lg:via-black/60 lg:to-black/5"
          aria-hidden
        />
      </div>
      <div className="flex min-h-[calc(100svh-4rem)] flex-col justify-end px-5 pt-24 pb-10 md:px-10 lg:min-h-0 lg:justify-center lg:py-20 lg:pr-16 lg:pl-[max(2rem,calc((100vw-76rem)/2+2rem))]">
        <div className="mb-6 -mx-5 md:mx-0">
          <EventBanner events={events} />
        </div>
        <p className="eyebrow rise text-kw-gray-light">
          Idaho Falls · Pocatello
        </p>
        <h1 className="mt-4 max-w-[16ch] text-[2.55rem] leading-[1.02] font-bold md:text-6xl xl:text-7xl">
          {v.headline}
        </h1>
        <p className="mt-5 max-w-xl text-2xl leading-snug font-bold md:text-3xl">
          {heroProof.lead}{" "}
          <span className="text-white underline decoration-kw-red decoration-4 underline-offset-[6px]">
            {heroProof.stat}
          </span>{" "}
          {heroProof.tail}
          <sup className="ml-0.5 text-base text-kw-gray-light">1</sup>
        </p>
        <p className="mt-4 max-w-xl text-lg text-kw-gray-light md:text-xl min-h-[3.5em]">
          {heroProof.subhead}
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <TrackedLink
            href="/quiz"
            event="cta_click"
            params={{ cta: "hero_quiz" }}
            className="btn btn-red text-[17px]"
          >
            Find My Career Path
          </TrackedLink>
          <TrackedLink
            href="/book"
            event="cta_click"
            params={{ cta: "hero_book" }}
            className="btn btn-ghost text-white"
          >
            Book a Confidential Conversation
          </TrackedLink>
        </div>
        <div className="mt-6">
          <PersonaChips items={personaPaths} />
        </div>
        <p className="mt-6 max-w-xl text-xs leading-relaxed text-kw-gray-light">
          <sup>1</sup> {heroProof.footnote}{" "}
          <a href={heroProof.link} className="underline underline-offset-2 hover:text-white">
            How we measured
          </a>
        </p>
      </div>
    </section>
  );
}

// ---------- 2. Proof bar ----------
export function ProofBar({ compact = false }: { compact?: boolean }) {
  return (
    <section
      aria-labelledby="proof-title"
      className="border-b border-kw-gray-light bg-white"
    >
      <div className="wrap py-14 md:py-20">
        <h2 id="proof-title" className="sr-only">
          KW East Idaho by the numbers
        </h2>
        {compact ? (
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {proofStats.map((s) => (
              <div key={s.label} className="border-t-4 border-black pt-4">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="font-display block text-5xl font-bold text-kw-red md:text-6xl">
                    <CountUp
                      value={s.value}
                      prefix={s.prefix}
                      suffix={s.suffix}
                    />
                  </span>
                  <span className="mt-2 block font-bold leading-snug md:text-lg">
                    {s.label}
                  </span>
                  {s.detail && (
                    <span className="mt-1 block text-sm text-kw-gray-medium">
                      {s.detail}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <ProofCharts />
        )}
        {!compact && (
          <dl className="mt-10 grid gap-4 bg-black p-6 text-white sm:grid-cols-3 md:p-8">
            {rosterStats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="font-display text-4xl font-bold">
                    <CountUp
                      value={s.value}
                      prefix={s.prefix}
                      suffix={s.suffix}
                    />
                  </span>
                  <span className="block text-sm text-kw-gray-light">
                    {s.label}, {s.detail}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        )}
        <p className="mt-6 text-xs text-kw-gray-medium">
          {mlsSource} Roster figures as of{" "}
          {rosterStats[0].detail?.replace("as of ", "")}.{" "}
          {profitShare.disclaimer}
        </p>
        <p className="mt-2 text-sm font-medium">{franchiseLine}</p>
      </div>
    </section>
  );
}

// ---------- 3. Problem / recognition ----------
export function ProblemCards() {
  return (
    <section className="bg-kw-wash py-16 md:py-24">
      <div className="wrap">
        <SectionHead
          eyebrow="Sound familiar?"
          title="You didn’t get into real estate to do it all by yourself."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3 md:grid-rows-[auto_auto] md:gap-y-0">
          {problemCards.map((c, i) => (
            // Subgrid keeps the problem panels the same height, so the photos line up across cards.
            <article key={c.pain} className="flex flex-col md:row-span-2 md:grid md:grid-rows-subgrid">
              {/* The problem is the text graphic; the photo below is the KW answer. */}
              <div className="flex flex-col bg-black p-6 text-white md:min-h-[15.5rem]">
                <p className="flex items-center gap-2 text-xs font-bold tracking-[.16em] text-kw-gray-light uppercase">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
                    <circle cx="8" cy="8" r="7" fill="none" stroke="#B40101" strokeWidth="2" />
                    <path d="M5.2 5.2l5.6 5.6M10.8 5.2l-5.6 5.6" stroke="#fff" strokeWidth="2" />
                  </svg>
                  The problem
                  <span className="text-kw-gray">· {i + 1} of {problemCards.length}</span>
                </p>
                <h3 className="mt-4 text-3xl leading-tight font-bold">{c.pain}</h3>
                <p className="mt-3 text-kw-gray-light">{c.detail}</p>
              </div>
              <ProblemReveal
                label={`problem_${i + 1}`}
                photo={<Picture k={c.image} alt="" sizes="(min-width:768px) 33vw, 100vw" fill />}
                answer={
                  <>
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Picture k={c.image} alt="" sizes="(min-width:768px) 33vw, 100vw" fill />
                      <p className="absolute top-0 left-0 flex items-center gap-2 bg-kw-red px-3 py-2 text-xs font-bold tracking-[.14em] text-white uppercase">
                        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
                          <circle cx="8" cy="8" r="7" fill="none" stroke="#fff" strokeWidth="2" />
                          <path d="M4.8 8.2l2.2 2.2 4.2-4.6" fill="none" stroke="#fff" strokeWidth="2" />
                        </svg>
                        How it works at KW East Idaho
                      </p>
                    </div>
                    <div className="p-6">
                      <h4 className="text-2xl font-bold">{c.answer}</h4>
                      <p className="mt-3 text-kw-gray-medium">{c.answerDetail}</p>
                    </div>
                  </>
                }
              />
            </article>
          ))}
        </div>
        <div className="mt-14 border-t border-kw-gray-light pt-12">
          <p className="eyebrow text-kw-red">You won’t do it alone</p>
          <h3 className="mt-3 max-w-3xl text-3xl font-bold md:text-4xl">Meet {coaches.growth.name.split(" ")[0]}, one of the coaches in your corner.</h3>
          <div className="mt-8">
            <CoachCard c={coaches.growth} />
          </div>
        </div>
        <NextLink href="#leadership">
          Hear it from the people who run it
        </NextLink>
      </div>
    </section>
  );
}

// ---------- Coaches ----------
function coachSchema(c: Coach) {
  return videoSchema({ title: `${c.name}, ${c.title}`, description: c.quote, poster: c.poster, src: c.video, duration: c.duration, uploadDate: c.uploadDate });
}

function CoachCard({ c, dark = false }: { c: Coach; dark?: boolean }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_300px]">
      <figure className="max-w-2xl">
        <p className={`eyebrow ${dark ? "text-kw-gray-light" : "text-kw-gray-medium"}`}>{c.title}</p>
        <blockquote className="mt-4 border-l-4 border-kw-red pl-5 font-serif text-2xl leading-snug md:text-3xl">“{c.quote}”</blockquote>
        <figcaption className={`mt-3 text-sm ${dark ? "text-kw-gray-light" : "text-kw-gray-medium"}`}>
          {c.name}, {c.title}
        </figcaption>
        <p className={`mt-6 ${dark ? "text-kw-gray-light" : "text-kw-gray-medium"}`}>{c.forWho}</p>
        <Checks dark={dark} items={c.helps} />
        <details className={`mt-4 ${dark ? "text-kw-gray-light" : "text-kw-gray-medium"}`}>
          <summary className={`min-h-11 cursor-pointer py-2 font-bold ${dark ? "text-white" : "text-black"}`}>Read the transcript</summary>
          <p className="mt-2 leading-relaxed">{c.transcript}</p>
        </details>
      </figure>
      <div className="w-full max-w-[300px] justify-self-center">
        <JsonLd data={coachSchema(c)} />
        <VideoPlayer src={c.video} poster={c.poster} title={`${c.name}, ${c.title}`} vertical phoneFrame label={`${c.name} · ${durationLabel(c.duration)}`} />
      </div>
    </div>
  );
}

/** "Meet your coaches": the people behind "someone holding you to it". */
export function MeetYourCoaches({ persona = "experienced" }: { persona?: Persona }) {
  const c = persona === "new" ? (coaches.newAgent ?? coaches.growth) : coaches.growth;
  return (
    <section className="py-16 md:py-24">
      <div className="wrap">
        <SectionHead
          eyebrow="Meet your coaches"
          title="Someone in your corner, every week."
          intro="Training teaches you what to do. A coach helps you actually do it, one week at a time, with a plan that fits how you like to work."
        />
        <div className="mt-10">
          <CoachCard c={c} />
        </div>
        {persona === "new" && !coaches.newAgent && showPlaceholders && (
          <p className="mt-10 max-w-3xl border-2 border-dashed border-kw-gray-medium p-4 text-sm text-kw-gray-medium">
            TODO: Jodi Steo, productivity coach for new agents (video coming).
          </p>
        )}
      </div>
    </section>
  );
}

// ---------- 4. Leadership video ----------
export function LeadershipVideo() {
  const welcome = videos.leaderWelcome;
  return (
    <section
      id="leadership"
      className="on-dark scroll-mt-20 bg-black py-16 text-white md:py-24"
    >
      <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_300px]">
        <div>
          <SectionHead
            dark
            eyebrow="Our KW story"
            title="17 of the top 50 producers work here. That isn’t luck. It’s by design."
            intro="Steven Hatch on what you plug into at KW East Idaho: five full-time leaders whose job is your growth, proven systems, and a life built around God, family, then business."
          />
          {welcome ? (
            <div className="mt-8 max-w-2xl">
              <JsonLd
                data={videoSchema({
                  title: welcome.title,
                  description: welcome.description,
                  poster: welcome.poster,
                  src: welcome.src,
                  duration: welcome.duration,
                  uploadDate: welcome.uploadDate,
                })}
              />
              <VideoPlayer
                src={welcome.src}
                poster={welcome.poster}
                title={welcome.title}
                captions={welcome.captions}
                label="Watch: Our KW Story · 2:58"
              />
              <details className="mt-3 text-kw-gray-light">
                <summary className="min-h-11 cursor-pointer py-2 font-bold text-white">
                  Read the transcript
                </summary>
                <p className="mt-2 leading-relaxed">{welcome.transcript}</p>
              </details>
            </div>
          ) : (
            showPlaceholders && (
              <div className="mt-8 max-w-2xl border-2 border-dashed border-kw-gray-medium p-6 text-kw-gray-light">
                <p className="font-bold text-white">
                  TODO: 60–90s leader welcome video
                </p>
                <p className="mt-1 text-sm">
                  Team leader or operating principal on camera: who we are, what
                  we believe, what happens in the first conversation. Captions +
                  transcript.
                </p>
              </div>
            )
          )}
          <div className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
            {[
              "You talk. We listen to where you are and where you want to go.",
              "We explore strategic plans together, find the pieces that fit, and create a proven plan to get you where you want to be.",
              "Then you decide if it’s right for you. No pressure, no hard sell, ever.",
            ].map((t, i) => (
              <div key={t} className="border-t-2 border-kw-red pt-3">
                <p className="text-sm text-kw-gray">Step {i + 1}</p>
                <p className="mt-1 font-medium">{t}</p>
              </div>
            ))}
          </div>
          <NextLink href="#paths" dark>
            Find the path that fits you
          </NextLink>
        </div>
        <div className="w-full max-w-[300px] justify-self-center">
          <VideoPlayer
            {...videos.skilledAgents}
            vertical
            phoneFrame
            label="Grow with the market · 1:15"
          />
        </div>
      </div>
    </section>
  );
}

// ---------- 5. Choose your path ----------
export function ChoosePath() {
  return (
    <section id="paths" className="scroll-mt-20 py-16 md:py-24">
      <div className="wrap">
        <SectionHead
          eyebrow="Choose your path"
          title="Wherever you are in your career, there’s a plan for you here."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {personaPaths.map((p) => (
            <Link
              key={p.id}
              href={p.href}
              className="group relative flex min-h-[26rem] flex-col justify-end overflow-hidden bg-black p-6 text-white"
            >
              <Picture
                k={p.image}
                alt=""
                sizes="(min-width:768px) 33vw, 100vw"
                fill
                imgClassName="transition-transform duration-[1.2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60" aria-hidden />
              <div className="relative">
                <p className="eyebrow text-kw-gray-light">{p.title}</p>
                <h3 className="mt-3 text-3xl leading-tight font-bold">
                  {p.outcome}
                </h3>
                <p className="mt-3 text-kw-gray-light">{p.proof}</p>
                <span className="btn btn-red mt-6 w-full">{p.cta} →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- 6. KW MyWay plan finder + calculator ----------
export function CalculatorSection({
  newlyLicensed = false,
  title,
}: {
  newlyLicensed?: boolean;
  title?: string;
}) {
  return (
    <section
      id="calculator"
      className="scroll-mt-20 border-t-8 border-kw-red bg-white py-16 md:py-24"
    >
      <div className="wrap">
        {/* Official KW MyWay logo (white background, so keep it on white sections only). */}
        <img src="/brand/kw-myway-logo.png" alt="KW MyWay" width={408} height={128} className="mb-6 h-10 w-auto md:h-12" />
        <SectionHead
          eyebrow="KW MyWay plan finder"
          title={title ?? "With KW MyWay, you choose how you do business."}
          intro="Choose your split, your cap, your fees and your services. Put in your numbers and see your take-home on all four plans."
        />
        <div className="mt-10">
          <Calculator
            defaultNewlyLicensed={newlyLicensed}
            defaultGci={newlyLicensed ? 30000 : 100000}
            defaultDeals={newlyLicensed ? 4 : 12}
          />
        </div>
      </div>
    </section>
  );
}

// ---------- 7. Value stack ----------
// Cost vs. growth: Steven's groceries analogy, for agents focused on cutting costs.
export function FeedYourBusiness({
  next = "#calculator",
  nextLabel = "Run your real numbers",
}: {
  next?: string;
  nextLabel?: string;
}) {
  const f = feedYourBusiness;
  return (
    <section className="on-dark bg-black py-16 text-white md:py-24">
      <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <p className="eyebrow text-kw-gray">{f.eyebrow}</p>
          <h2 className="mt-4 text-3xl leading-tight font-bold md:text-5xl">
            {f.title}
          </h2>
          {f.body.map((p) => (
            <p key={p} className="mt-5 text-lg text-kw-gray-light">
              {p}
            </p>
          ))}
          <p className="mt-6 border-l-4 border-kw-red pl-4 font-serif text-2xl leading-snug">
            {f.close}
          </p>
          <NextLink href={next} dark>
            {nextLabel}
          </NextLink>
        </div>
        <div>
          <h3 className="text-xs font-bold tracking-[.14em] text-kw-gray uppercase">
            What a healthy business eats
          </h3>
          <ul className="mt-4 grid grid-cols-1 gap-px bg-kw-gray-medium sm:grid-cols-3">
            {f.nutrients.map((n) => (
              <li key={n.t} className="bg-black p-4 sm:p-5">
                <p className="flex items-center gap-2 font-bold">
                  <span className="h-2 w-2 shrink-0 bg-kw-red" aria-hidden />
                  {n.t}
                </p>
                <p className="mt-1 text-sm text-kw-gray-light">{n.b}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// Freedom without isolation: virtual vs. all-office extremes, with KW East Idaho in the balanced middle.
export function BothWorlds() {
  const b = bothWorlds;
  return (
    <section className="on-dark bg-black py-16 text-white md:py-24">
      <div className="wrap">
        <SectionHead dark eyebrow={b.eyebrow} title={b.title} intro={b.intro} />
        <InViewAnim className="mt-10">
          <svg
            viewBox="0 0 600 150"
            className="mx-auto block w-full max-w-xl"
            role="img"
            aria-label="A pendulum swings between all virtual and all brick and mortar, then settles in the balanced middle."
          >
            <line
              x1="300"
              y1="6"
              x2="300"
              y2="14"
              stroke="#666"
              strokeWidth="3"
            />
            <path
              d="M80 120 Q300 175 520 120"
              fill="none"
              stroke="#333"
              strokeWidth="2"
              strokeDasharray="4 6"
            />
            <g className="pendulum">
              <line
                x1="300"
                y1="10"
                x2="300"
                y2="128"
                stroke="#fff"
                strokeWidth="3"
              />
              <circle cx="300" cy="134" r="12" fill="#B40101" />
            </g>
            <circle cx="300" cy="10" r="6" fill="#fff" />
          </svg>
        </InViewAnim>
        <div className="mt-6 grid gap-px bg-kw-gray-medium md:grid-cols-3">
          {[b.extremes[0], null, b.extremes[1]].map((x, i) =>
            x ? (
              <div
                key={x.label}
                className={`bg-black p-6 ${i === 2 ? "md:order-3" : "md:order-1"}`}
              >
                <h3 className="text-xs font-bold tracking-[.14em] text-kw-gray uppercase">
                  {x.label}
                </h3>
                <p className="mt-3 font-bold">{x.pro}</p>
                <p className="mt-2 text-kw-gray-light">But: {x.con}</p>
              </div>
            ) : (
              <div
                key="middle"
                className="order-first bg-kw-red p-6 md:order-2"
              >
                <h3 className="text-xs font-bold tracking-[.14em] uppercase">
                  {b.middle.label}
                </h3>
                <p className="mt-3 text-white">{b.middle.body}</p>
              </div>
            ),
          )}
        </div>
        {b.quote ? (
          (() => {
            const jake = findStory(b.quote.story);
            return (
              <div className="mt-12 grid items-center gap-10 border-t border-white/20 pt-12 lg:grid-cols-[1fr_300px]">
                <figure className="max-w-2xl">
                  <p className="eyebrow text-kw-gray-light">{b.quote.eyebrow}</p>
                  <p className="mt-4 text-lg text-kw-gray-light">{b.quote.lead}</p>
                  <blockquote className="mt-6 border-l-4 border-kw-red pl-5 font-serif text-2xl leading-snug md:text-3xl">
                    “{b.quote.text}”
                  </blockquote>
                  <figcaption className="mt-3 text-sm text-kw-gray-light">{b.quote.name}</figcaption>
                  {jake && (
                    <details className="mt-6 text-kw-gray-light">
                      <summary className="min-h-11 cursor-pointer py-2 font-bold text-white">Read the transcript</summary>
                      <p className="mt-2 leading-relaxed">{jake.transcript}</p>
                    </details>
                  )}
                </figure>
                {jake && (
                  <div className="w-full max-w-[300px] justify-self-center">
                    <JsonLd data={storyVideoSchema(jake)} />
                    <VideoPlayer
                      src={jake.video}
                      poster={jake.poster}
                      title={`${jake.name}: ${jake.result}`}
                      vertical
                      phoneFrame
                      label={`${jake.name} · ${durationLabel(jake.duration)}`}
                    />
                  </div>
                )}
              </div>
            );
          })()
        ) : (
          showPlaceholders && (
            <p className="mt-10 max-w-3xl border-2 border-dashed border-kw-gray-medium p-4 text-sm text-kw-gray-light">
              TODO: an agent quote about failing while isolated at home.
            </p>
          )
        )}
        <p className="mt-10 max-w-3xl text-2xl font-bold md:text-3xl">
          {b.close}
        </p>
        <NextLink href="/events" dark>
          Come feel the energy at a free session
        </NextLink>
      </div>
    </section>
  );
}

export function ValueStack() {
  return (
    <section className="bg-kw-wash py-16 md:py-24">
      <div className="wrap">
        <SectionHead
          eyebrow="What you get"
          title="Everything a growing business needs, under one roof."
        />
        <div className="mt-10 grid gap-px bg-kw-gray-light md:grid-cols-2 lg:grid-cols-4">
          {valueStack.map((g) => (
            <div key={g.group} className="bg-white p-6">
              <h3 className="text-xs font-bold tracking-[.14em] text-kw-red uppercase">
                {g.group}
              </h3>
              <ul className="mt-3 space-y-4">
                {g.items.map((i) => (
                  <li key={i.headline}>
                    <p className="text-lg leading-snug font-bold">
                      {i.headline}
                    </p>
                    <p className="mt-1 text-sm text-kw-gray-medium">
                      {i.meaning}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 grid items-center gap-6 bg-black text-white md:grid-cols-2">
          <div className="relative aspect-[4/3]">
            <Picture
              k="marketPulse"
              alt="Market Pulse meeting: a presenter beside a Bonneville County key-metrics slide"
              sizes="(min-width:768px) 50vw, 100vw"
              fill
            />
          </div>
          <div className="p-6 md:p-10">
            <p className="eyebrow text-kw-gray">Every month</p>
            <h3 className="mt-3 text-3xl font-bold">
              Know the numbers before your clients ask.
            </h3>
            <p className="mt-3 text-kw-gray-light">
              Market Pulse breaks down the latest local data, so you walk into
              every listing appointment as the expert.
            </p>
          </div>
        </div>
        <NextLink href="#stories">See the agents doing it</NextLink>
      </div>
    </section>
  );
}

// ---------- 8. Agent stories ----------
function StoryCaption({ s }: { s: Story }) {
  return (
    <>
      <blockquote className="mt-4 font-serif text-xl leading-snug">
        “{s.quote}”
      </blockquote>
      <figcaption className="mt-2 text-sm text-kw-gray-light">
        <strong className="block text-white">{s.name}</strong>
        {storyMeta(s) || s.result}
        {showPlaceholders &&
          (s.city == null ||
            s.yearsInBusiness == null ||
            s.nameConfirmed === false) && (
            <span className="mt-1 block text-xs">
              TODO: {s.nameConfirmed === false ? "agent’s name, " : ""}city and
              years in real estate
            </span>
          )}
      </figcaption>
    </>
  );
}

export function AgentStories({
  persona,
  city,
  all = false,
}: {
  persona?: Persona;
  city?: string;
  all?: boolean;
}) {
  const { wide, tall } = pickStories({ persona, city, all });
  return (
    <section
      id="stories"
      className="on-dark scroll-mt-20 bg-black py-16 text-white md:py-24"
    >
      <div className="wrap">
        <SectionHead
          dark
          eyebrow="Agent stories"
          title={
            city
              ? `Agents like you, winning in ${city}.`
              : "Agents like you, winning in your town."
          }
        />
        {wide.length > 0 && (
          <div
            className={`mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2 ${wide.length % 3 === 0 ? "lg:grid-cols-3" : ""}`}
          >
            {wide.map((s) => (
              <figure key={s.slug}>
                <VideoPlayer
                  src={s.video}
                  poster={s.poster}
                  title={`${s.name}: ${s.result}`}
                  label={`${s.name} · ${durationLabel(s.duration)}`}
                />
                <StoryCaption s={s} />
              </figure>
            ))}
          </div>
        )}
        <div className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-2 md:px-0 lg:grid-cols-4">
          {tall.map((s) => (
            <figure
              key={s.slug}
              className="w-[78%] shrink-0 snap-start md:w-auto"
            >
              <VideoPlayer
                src={s.video}
                poster={s.poster}
                title={`${s.name}: ${s.result}`}
                vertical
                label={`${s.name} · ${durationLabel(s.duration)}`}
              />
              <StoryCaption s={s} />
            </figure>
          ))}
          {!all && (
            <figure className="w-[78%] shrink-0 snap-start md:w-auto">
              <div className="aspect-[9/16]">
                <LoopVideo {...videos.redDay} />
              </div>
              <figcaption className="mt-4 text-sm text-kw-gray-light">
                {videos.redDay.title}
              </figcaption>
            </figure>
          )}
          {showPlaceholders &&
            storyPlaceholders
              .slice(0, Math.max(0, 3 - tall.length))
              .map((p) => (
                <div
                  key={p.label}
                  className="flex aspect-[9/16] w-[78%] shrink-0 snap-start flex-col justify-end border-2 border-dashed border-kw-gray-medium p-5 md:w-auto"
                >
                  <p className="font-bold">TODO: agent story video</p>
                  <p className="mt-1 text-sm text-kw-gray-light">
                    {p.label}. {p.note}. 30–60s, name, city, years, one specific
                    result.
                  </p>
                </div>
              ))}
        </div>
        {stories.length > 0 && (
          <p className="mt-6 text-xs text-kw-gray">{storyDisclaimer}</p>
        )}
        {!all && (
          <NextLink href="/stories" dark>
            See all {stories.length} agent stories
          </NextLink>
        )}
      </div>
    </section>
  );
}

// Featured agent story with transcript (objection handling on persona pages)
export function StoryFeature({
  slug,
  eyebrow,
  title,
  intro,
  white = false,
}: {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  white?: boolean;
}) {
  const s = findStory(slug);
  if (!s) return null;
  const wide = s.orientation === "horizontal";
  return (
    <section className={`${white ? "" : "bg-kw-wash"} py-16 md:py-24`}>
      <JsonLd data={storyVideoSchema(s)} />
      <div
        className={`wrap grid items-center gap-12 ${wide ? "lg:grid-cols-[1fr_1.15fr]" : "lg:grid-cols-[1fr_300px]"}`}
      >
        <div>
          <SectionHead eyebrow={eyebrow} title={title} intro={intro} />
          <blockquote className="mt-8 border-l-4 border-kw-red pl-5 font-serif text-2xl leading-snug md:text-3xl">
            “{s.quote}”
          </blockquote>
          <p className="mt-3 font-bold">
            {s.name}{" "}
            <span className="font-normal text-kw-gray-medium">
              · {storyMeta(s) || s.result}
            </span>
          </p>
          <details className="mt-6 max-w-2xl text-kw-gray-medium">
            <summary className="min-h-11 cursor-pointer py-2 font-bold text-black">
              Read the transcript
            </summary>
            <p className="mt-2 leading-relaxed">{s.transcript}</p>
          </details>
          <p className="mt-4 text-xs text-kw-gray-medium">{storyDisclaimer}</p>
        </div>
        <div
          className={
            wide ? "w-full" : "w-full max-w-[300px] justify-self-center"
          }
        >
          <VideoPlayer
            src={s.video}
            poster={s.poster}
            title={`${s.name}: ${s.result}`}
            vertical={!wide}
            phoneFrame={!wide}
            label={`${s.name} · ${durationLabel(s.duration)}`}
          />
        </div>
      </div>
    </section>
  );
}

// ---------- 9. Profit share ----------
export function ProfitShareSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="wrap grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-kw-gray-medium">Profit share and wealth</p>
          <p className="font-display mt-5 text-6xl font-bold text-kw-red md:text-7xl">
            $<CountUp value={profitShare.amount} />
          </p>
          <h2 className="mt-3 text-3xl leading-tight font-bold md:text-4xl">
            paid to KW East Idaho agents in profit share, {profitShare.period}.
          </h2>
          <p className="mt-5 text-lg text-kw-gray-medium">
            When the market center makes a profit, part of it is shared with the
            agents who helped it grow. Help a great agent find a home here, and
            you may share in the profit their business helps create. As the
            community grows, everyone in it can benefit.
          </p>
          <p className="mt-4 text-sm text-kw-gray-medium">
            {profitShare.disclaimer}{" "}
            <Link href="/disclosures" className="underline">
              Read the full disclosure
            </Link>
            .
          </p>
          <NextLink href="#culture">See what it’s like here</NextLink>
        </div>
        <figure>
          <svg
            viewBox="0 0 400 400"
            className="mx-auto w-full max-w-md"
            role="img"
            aria-labelledby="ps-title ps-desc"
          >
            <title id="ps-title">How profit share works</title>
            <desc id="ps-desc">
              You help agents join. Their success helps the market center
              profit. Part of that profit is shared back with you.
            </desc>
            <circle
              cx="200"
              cy="200"
              r="70"
              className="pulse-ring"
              fill="none"
              stroke="#B40101"
              strokeWidth="2"
            />
            <circle
              cx="200"
              cy="200"
              r="70"
              className="pulse-ring d2"
              fill="none"
              stroke="#B40101"
              strokeWidth="2"
            />
            <circle
              cx="200"
              cy="200"
              r="70"
              className="pulse-ring d3"
              fill="none"
              stroke="#B40101"
              strokeWidth="2"
            />
            <circle cx="200" cy="200" r="70" fill="#000" />
            <text
              x="200"
              y="193"
              textAnchor="middle"
              fill="#fff"
              fontSize="17"
              fontWeight="700"
            >
              Market center
            </text>
            <text x="200" y="215" textAnchor="middle" fill="#ccc" fontSize="14">
              profit
            </text>
            {[
              { x: 200, y: 48, l1: "You" },
              { x: 340, y: 290, l1: "Agents you", l2: "helped join" },
              { x: 60, y: 290, l1: "Shared back", l2: "to you" },
            ].map((n, i) => (
              <g key={i}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="40"
                  fill={i === 0 ? "#B40101" : "#fff"}
                  stroke="#000"
                  strokeWidth="3"
                />
                <text
                  x={n.x}
                  y={n.y + (n.l2 ? -2 : 5)}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={i === 0 ? "#fff" : "#000"}
                >
                  {n.l1}
                </text>
                {n.l2 && (
                  <text
                    x={n.x}
                    y={n.y + 14}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#000"
                  >
                    {n.l2}
                  </text>
                )}
              </g>
            ))}
            <path
              d="M236 70 Q330 120 335 245"
              fill="none"
              stroke="#000"
              strokeWidth="3"
              markerEnd="url(#arr)"
            />
            <path
              d="M300 300 Q270 290 262 245"
              fill="none"
              stroke="#000"
              strokeWidth="3"
              markerEnd="url(#arr)"
            />
            <path
              d="M140 240 Q110 270 98 285"
              fill="none"
              stroke="#B40101"
              strokeWidth="3"
              markerEnd="url(#arr-r)"
            />
            <path
              d="M68 250 Q90 120 165 66"
              fill="none"
              stroke="#B40101"
              strokeWidth="3"
              strokeDasharray="6 6"
              markerEnd="url(#arr-r)"
            />
            <defs>
              <marker
                id="arr"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M0 0 10 5 0 10z" fill="#000" />
              </marker>
              <marker
                id="arr-r"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M0 0 10 5 0 10z" fill="#B40101" />
              </marker>
            </defs>
          </svg>
          <figcaption className="mt-2 text-center text-sm text-kw-gray-medium">
            Simplified. Eligibility, vesting and amounts follow the official KW
            profit share plan.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

// ---------- 10. Culture ----------
export function Culture() {
  return (
    <section id="culture" className="scroll-mt-20 bg-kw-wash py-16 md:py-24">
      <div className="wrap">
        <SectionHead
          eyebrow="Life at KW East Idaho"
          title="A team that shows up for each other, and for East Idaho."
          intro={
            localMission ??
            "God, family, then business. It’s how Keller Williams has always put it, and it’s how we run our office."
          }
        />
        <div className="mt-10 grid auto-rows-[9rem] grid-cols-2 gap-2 md:auto-rows-[12rem] md:grid-cols-4">
          <div className="relative col-span-2 row-span-2 overflow-hidden">
            <Picture
              k="trainingSession"
              alt="A packed KW Learning Center during “The ABCs of AI” class in Idaho Falls"
              sizes="(min-width:768px) 50vw, 100vw"
              fill
            />
            <p className="absolute bottom-0 left-0 bg-black px-3 py-2 text-xs text-white">
              Weekly training in Idaho Falls and Pocatello, including how to use AI in your
              business.
            </p>
          </div>
          <div className="relative row-span-2 overflow-hidden">
            <LoopVideo {...videos.redDay} />
            <p className="absolute top-0 left-0 bg-kw-red px-3 py-2 text-xs font-bold text-white">
              RED Day 2026 with Habitat for Humanity
            </p>
          </div>
          <div className="relative overflow-hidden">
            <Picture
              k="lobby"
              alt="The Idaho Falls office lobby"
              sizes="25vw"
              fill
            />
          </div>
          <div className="relative overflow-hidden">
            <Picture
              k="mastermind"
              alt="Agents at a mastermind roundtable"
              sizes="25vw"
              fill
            />
          </div>
          <div className="relative overflow-hidden">
            <Picture
              k="trainingFinancial"
              alt="“A Financially Sound Business” class with the Meet, Learn, Grow check-in sign"
              sizes="25vw"
              fill
            />
          </div>
          <div className="relative col-span-2 overflow-hidden md:col-span-1">
            <Picture
              k="zoom"
              alt="A live Zoom training with about 20 agents on screen"
              sizes="(min-width:768px) 25vw, 100vw"
              fill
            />
          </div>
          <div className="relative hidden overflow-hidden md:col-span-2 md:block">
            <Picture
              k="office"
              alt="The Idaho Falls office at sunset"
              sizes="25vw"
              fill
            />
          </div>
        </div>
        <div className="mt-12 grid gap-6 border-t-4 border-black pt-6 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h3 className="text-xs font-bold tracking-[.14em] text-kw-gray-medium uppercase">
              Our mission
            </h3>
            <p className="mt-3 font-serif text-2xl leading-snug md:text-3xl">
              {kwMission.mission.split(/([A-Z]{2,})/).map((part, i) =>
                /^[A-Z]{2,}$/.test(part) ? (
                  <strong key={i} className="font-sans font-bold tracking-wide text-kw-red">{part}</strong>
                ) : (
                  part
                ),
              )}
            </p>
          </div>
          <dl className="grid content-start gap-3 text-sm">
            <div>
              <dt className="font-bold">Priorities</dt>
              <dd className="text-kw-gray-medium">{kwMission.priorities}</dd>
            </div>
            <div>
              <dt className="font-bold">Vision</dt>
              <dd className="text-kw-gray-medium">{kwMission.vision}</dd>
            </div>
            <div>
              <dt className="font-bold">Purpose</dt>
              <dd className="text-kw-gray-medium">{kwMission.purpose}</dd>
            </div>
          </dl>
        </div>
        <div className="mt-12">
          <h3 className="text-xs font-bold tracking-[.14em] text-kw-gray-medium uppercase">
            The KW Belief System
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-5">
            {beliefSystem.map(([w, rest]) => (
              <li key={w} className="border-l-4 border-kw-red pl-3">
                <strong className="block">{w}</strong>
                <span className="text-sm text-kw-gray-medium">{rest}</span>
              </li>
            ))}
          </ul>
        </div>
        <NextLink href="#first-90">What your first 90 days look like</NextLink>
      </div>
    </section>
  );
}

// ---------- 11. First 90 days ----------
export function First90() {
  return (
    <section id="first-90" className="scroll-mt-20 py-16 md:py-24">
      <div className="wrap">
        <SectionHead
          eyebrow="Your first 90 days"
          title="Switching is easier than you think. We do the heavy lifting."
        />
        <ol className="relative mt-12 grid gap-8 md:grid-cols-4 md:gap-6">
          <span
            className="absolute top-0 bottom-0 left-[11px] w-[3px] bg-black md:top-[11px] md:right-0 md:bottom-auto md:left-0 md:h-[3px] md:w-auto"
            aria-hidden
          />
          {first90.map((s) => (
            <li key={s.when} className="relative pl-10 md:pt-10 md:pl-0">
              <span
                className="absolute top-0 left-0 h-6 w-6 rounded-full border-4 border-black bg-kw-red"
                aria-hidden
              />
              <p className="text-sm font-bold tracking-[.14em] text-kw-red uppercase">
                {s.when}
              </p>
              <h3 className="mt-1 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-kw-gray-medium">{s.body}</p>
            </li>
          ))}
        </ol>
        <NextLink href="#events">Come see it for yourself</NextLink>
      </div>
    </section>
  );
}

// ---------- 12. Events ----------
export async function UpcomingEventsSection() {
  const list = await getUpcomingEvents();
  return (
    <section id="events" className="scroll-mt-20 bg-kw-wash py-16 md:py-24">
      <div className="wrap">
        <SectionHead
          eyebrow="Upcoming events"
          title="Come to a free session. See how we work."
        />
        <div className="mt-10 grid gap-6">
          {list.length === 0 && <NotifyForm />}
          {list.map((e) => {
            const { day, time } = formatEventDate(e);
            return (
              <article
                key={e.id}
                className="grid bg-white md:grid-cols-[2fr_3fr]"
              >
                <div className="relative aspect-[4/3] md:aspect-auto">
                  <Picture
                    k={e.image}
                    alt="Agents in a class at the KW Learning Center"
                    sizes="(min-width:768px) 40vw, 100vw"
                    fill
                  />
                </div>
                <div className="p-6 md:p-10">
                  <p className="text-sm font-bold tracking-[.14em] text-kw-red uppercase">
                    {day}
                  </p>
                  <h3 className="mt-2 text-3xl font-bold">{e.title}</h3>
                  <p className="mt-2 text-xl">{e.pitch}</p>
                  <p className="mt-3 text-kw-gray-medium">
                    {time} · {e.location}
                  </p>
                  <p className="mt-1 font-bold">{e.openTo}</p>
                  {e.details.length > 0 && <ul className="mt-4 space-y-1.5 text-sm">
                    {e.details.map((d) => (
                      <li key={d} className="flex gap-2">
                        <span className="text-kw-red" aria-hidden>
                          ✓
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>}
                  <div className="mt-6" id="register">
                    <EventRegister event={e} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <NextLink href="#faq">Questions? We’ve got answers</NextLink>
      </div>
    </section>
  );
}

// ---------- 13. FAQ ----------
export function FaqSection({
  persona,
  limit,
}: {
  persona?: Persona;
  limit?: number;
}) {
  let list = persona
    ? faqs.filter((f) => !f.personas || f.personas.includes(persona))
    : faqs;
  if (limit) list = list.slice(0, limit);
  return (
    <section id="faq" className="scroll-mt-20 py-16 md:py-24">
      <JsonLd data={faqSchema(list)} />
      <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <SectionHead
          eyebrow="FAQ"
          title="Straight answers."
          intro={
            <>
              Don’t see yours? Call or text {leadOwner.firstName} at{" "}
              <a
                href={`tel:${leadOwner.phoneE164}`}
                className="font-bold text-black underline"
              >
                {leadOwner.phone}
              </a>
              .
            </>
          }
        />
        <div className="border-t-2 border-black">
          {list.map((f) => (
            <details key={f.q} className="group border-b border-kw-gray-light">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden
                  className="text-2xl text-kw-red transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="pb-5 text-kw-gray-medium">
                {f.a}
                {showPlaceholders && f.review && (
                  <span className="ml-2 bg-kw-wash px-1.5 py-0.5 text-xs font-bold text-black">
                    TODO: leadership to confirm
                  </span>
                )}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- 14. Final CTA ----------
export function FinalCta({ persona }: { persona?: Persona }) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-black py-20 text-white md:py-28">
      <Picture
        k="office"
        alt=""
        sizes="100vw"
        fill
        className="-z-10"
        imgClassName="opacity-30"
      />
      <div className="absolute inset-0 -z-10 bg-black/50" aria-hidden />
      <div className="wrap grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h2 className="text-[2.4rem] leading-[1.04] font-bold md:text-6xl">
            Your career deserves a team that’s all in.
          </h2>
          <p className="mt-5 text-xl text-kw-gray-light">
            Confidential. 20 minutes. No pressure, no hard sell.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <div className={`grid h-[100px] w-20 shrink-0 place-items-center overflow-hidden bg-kw-red text-2xl font-bold ${leadOwner.photo ? "" : "rounded-full"}`}>
              {leadOwner.photo ? (
                <img
                  src={leadOwner.photo}
                  alt=""
                  width={80}
                  height={100}
                  className="h-full w-full object-cover"
                />
              ) : (
                "DR"
              )}
            </div>
            <div>
              <p className="text-lg font-bold">{leadOwner.name}</p>
              <p className="text-kw-gray-light">
                {leadOwner.title}, KW East Idaho
              </p>
              <p className="mt-1">
                Questions first? Call or text{" "}
                <a
                  href={`tel:${leadOwner.phoneE164}`}
                  className="font-bold underline"
                >
                  {leadOwner.phone}
                </a>
              </p>
            </div>
          </div>
          {leaders[0].bio && (
            <p className="mt-4 max-w-md text-kw-gray-light">{leaders[0].bio}</p>
          )}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/quiz" className="btn btn-ghost text-white">
              Take the Career Fit Quiz
            </Link>
            <a href={smsHref} className="btn btn-ghost text-white">
              Text {leadOwner.firstName}
            </a>
          </div>
        </div>
        <div className="bg-white p-6 text-black md:p-8">
          <h3 className="text-2xl font-bold">Book a Conversation</h3>
          <div className="mt-4">
            <Booking compact />
          </div>
          <div className="mt-6 border-t border-kw-gray-light pt-5">
            <FormProof persona={persona} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Embedded quiz ----------
export function QuizSection() {
  return (
    <section id="quiz" className="scroll-mt-20 bg-white py-16 md:py-24">
      <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <SectionHead
            eyebrow="Career Fit Quiz"
            title="Find your path in 60 seconds."
            intro="Seven quick taps. Get a personalized career plan for where you are right now."
          />
          <div className="mt-8">
            <FormProof />
          </div>
        </div>
        <div className="border-2 border-black p-5 md:p-8">
          <Quiz />
        </div>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import Link from "@/components/SmartLink";
import { activeSteps, personaFromAnswers, planQuestions, scoreLead, snapshotLines, type QuizAnswers } from "@/lib/quiz";
import { setPersona } from "@/lib/attribution";
import { track } from "@/lib/analytics";
import { LeadForm } from "./LeadForm";
import { Booking } from "./Booking";
import { VideoPlayer } from "./VideoPlayer";
import { leadOwner, videos, type Persona } from "@/content/config";

const results: Record<Persona, { headline: string; body: string; next: { href: string; label: string }; points: string[] }> = {
  new: {
    headline: "Your path: a strong first year, with people in your corner.",
    body: "New agents do best with three things: weekly training, a mentor and a plan for the first 90 days. You’d get all three here, plus the Supported plan, so there’s no monthly office bill while you get going.",
    next: { href: "/new-agents", label: "See the new agent roadmap" },
    points: ["Weekly training in Idaho Falls and Pocatello, and live on Zoom", "Supported plan: E&O, compliance and transaction coordinating included", "A written first-90-days plan"],
  },
  experienced: {
    headline: "Your path: keep more of what you earn, and get your time back.",
    body: "You already know how to sell. The question is what you keep and what you carry alone. With KW MyWay you choose your split, cap and fees. With leadership down the hall, you stop doing everything yourself.",
    next: { href: "/experienced-agents", label: "See what changes when you move" },
    points: ["12K plan: after cap, it’s yours except small per-deal fees", "Debbie and the team walk you through every step of the move", "The typical KW East Idaho agent closes 50% more"],
  },
  team: {
    headline: "Your path: keep your brand and scale with real support.",
    body: "You’ve built something. You should keep it. Teams here keep their name, get operations support, and share in market center profit as they help it grow.",
    next: { href: "/teams", label: "See how teams grow here" },
    points: ["Team member caps of $8,000 (12K) and $9,000 (16K)", "Profit share and wealth building", "17 of the Snake River MLS’s top 50 producers are here"],
  },
};

export function Quiz({ onDone }: { onDone?: () => void }) {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<"questions" | "contact" | "result">("questions");
  const [first, setFirst] = useState("");
  const started = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const steps = activeSteps(answers);
  const step = steps[i];
  const total = steps.length + 1;

  // Move focus to each new question for screen readers, but never on first render (would scroll the page)
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    heading.current?.focus({ preventScroll: false });
  }, [i, phase]);

  function choose(value: string) {
    if (!started.current) {
      started.current = true;
      track("quiz_start");
    }
    const next = { ...answers, [step.key]: value } as QuizAnswers;
    setAnswers(next);
    track("quiz_step", { step: step.key, value });
    const nextSteps = activeSteps(next);
    const idx = nextSteps.findIndex((s) => s.key === step.key);
    if (idx + 1 < nextSteps.length) setI(idx + 1);
    else setPhase("contact");
  }

  const persona = personaFromAnswers(answers);

  if (phase === "result") {
    const r = results[persona];
    const snapshot = snapshotLines(answers);
    return (
      <div>
        <p className="eyebrow text-kw-red">Your career snapshot</p>
        <h3 ref={heading} tabIndex={-1} className="mt-3 text-3xl font-bold outline-none md:text-4xl">{first ? `${first}, ${r.headline[0].toLowerCase()}${r.headline.slice(1)}` : r.headline}</h3>
        <p className="mt-4 max-w-2xl text-lg">{r.body}</p>
        {snapshot.length > 0 && (
          <dl className="mt-6 grid gap-4">
            {snapshot.map((s) => (
              <div key={s.said} className="border-l-4 border-black pl-4">
                <dt className="font-bold">{s.said}</dt>
                <dd className="mt-1">{s.answer}</dd>
              </div>
            ))}
          </dl>
        )}
        <ul className="mt-6 grid gap-2">
          {r.points.map((p) => (
            <li key={p} className="flex gap-2"><span className="font-bold text-kw-red" aria-hidden>✓</span>{p}</li>
          ))}
        </ul>
        <div className="mt-8 bg-kw-wash p-5 md:p-6">
          <h4 className="text-xl font-bold">Next: your personalized plan</h4>
          <p className="mt-2">This snapshot is the start. A plan you can actually follow needs a few more answers, so {leadOwner.firstName} builds it with you in a 20-minute conversation and gives it to you. She’ll ask about:</p>
          <ul className="mt-3 grid gap-1">
            {planQuestions(persona).map((q) => (
              <li key={q} className="flex gap-2"><span aria-hidden>•</span>{q}</li>
            ))}
          </ul>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[18rem_1fr]">
          {persona === "new" ? (
            <div className="bg-black p-5 text-white">
              <p className="font-bold">What happens next</p>
              <p className="mt-2 text-sm text-kw-gray-light">{leadOwner.firstName} will reach out within the hour (8am to 7pm, Mountain), or first thing the next morning. Questions before then? Call or text {leadOwner.phone}.</p>
            </div>
          ) : (
            <VideoPlayer {...videos.skilledAgents} vertical label="Grow with the market" />
          )}
          <div>
            <h4 className="text-xl font-bold">Pick a time for your plan conversation</h4>
            <p className="mb-4 text-sm text-kw-gray-medium">Optional. {leadOwner.firstName} will reach out either way. 20 minutes, confidential.</p>
            <Booking compact requestForm={false} />
          </div>
        </div>
        <Link href={r.next.href} className="btn btn-ghost-dark mt-8">{r.next.label} →</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="h-1.5 flex-1 bg-kw-gray-light" aria-hidden>
          <div className="h-full bg-kw-red transition-all duration-500" style={{ width: `${((phase === "contact" ? total : i + 1) / total) * 100}%` }} />
        </div>
        <span className="text-xs font-medium text-kw-gray-medium tabular-nums">{phase === "contact" ? total : i + 1} of {total}</span>
      </div>

      {phase === "questions" && step && (
        <fieldset>
          <legend className="contents">
            <h3 ref={heading} tabIndex={-1} className="text-2xl font-bold outline-none md:text-3xl">{step.question}</h3>
          </legend>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {step.options.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => choose(o.value)}
                aria-pressed={answers[step.key] === o.value}
                className={`min-h-14 border-2 px-4 py-3 text-left font-medium transition-colors hover:border-kw-red ${answers[step.key] === o.value ? "border-kw-red bg-kw-red text-white" : "border-black bg-white"}`}
              >
                {o.label}
              </button>
            ))}
          </div>
          {i > 0 && (
            <button type="button" onClick={() => setI(i - 1)} className="mt-4 min-h-11 text-sm font-medium underline">← Back</button>
          )}
        </fieldset>
      )}

      {phase === "contact" && (
        <div>
          <h3 ref={heading} tabIndex={-1} className="text-2xl font-bold outline-none md:text-3xl">Where should we send your career snapshot?</h3>
          <p className="mt-2 mb-5 text-kw-gray-medium">You’ll see your snapshot on the next screen and get a copy by email. Want a full personalized plan? {leadOwner.firstName} builds it with you in a 20-minute conversation, because a real plan needs your numbers.</p>
          <LeadForm
            source="quiz"
            submitLabel="Show My Snapshot"
            compact
            extra={() => ({ quiz: answers as Record<string, string>, persona })}
            onSuccess={(f) => {
              setFirst(f);
              setPersona(persona);
              track("quiz_complete", { persona, score: scoreLead(answers) });
              setPhase("result");
              onDone?.();
            }}
          />
          <button type="button" onClick={() => setPhase("questions")} className="mt-4 min-h-11 text-sm font-medium underline">← Back</button>
        </div>
      )}
    </div>
  );
}

// Career Fit Quiz: questions, persona routing and lead scoring.
import type { Persona } from "@/content/config";

export type QuizAnswers = {
  licensed?: "licensed" | "in-class" | "thinking";
  years?: "<1" | "1-2" | "3-5" | "6-10" | "10+";
  transactions?: "0" | "1-5" | "6-11" | "12-24" | "25+";
  frustration?: string;
  want?: string;
  timeline?: "now" | "1-3mo" | "3-6mo" | "exploring";
  city?: string;
};

export type QuizStep = {
  key: keyof QuizAnswers;
  question: string;
  options: { value: string; label: string }[];
  skipIf?: (a: QuizAnswers) => boolean;
};

const notLicensed = (a: QuizAnswers) => a.licensed !== undefined && a.licensed !== "licensed";

export const quizSteps: QuizStep[] = [
  {
    key: "licensed",
    question: "Where are you right now?",
    options: [
      { value: "licensed", label: "I’m a licensed agent" },
      { value: "in-class", label: "I’m taking my licensing class" },
      { value: "thinking", label: "I’m thinking about getting licensed" },
    ],
  },
  {
    key: "years",
    question: "How long have you been in real estate?",
    skipIf: notLicensed,
    options: [
      { value: "<1", label: "Less than a year" },
      { value: "1-2", label: "1–2 years" },
      { value: "3-5", label: "3–5 years" },
      { value: "6-10", label: "6–10 years" },
      { value: "10+", label: "More than 10 years" },
    ],
  },
  {
    key: "transactions",
    question: "How many deals did you close in the last 12 months?",
    skipIf: notLicensed,
    options: [
      { value: "0", label: "None yet" },
      { value: "1-5", label: "1–5" },
      { value: "6-11", label: "6–11" },
      { value: "12-24", label: "12–24" },
      { value: "25+", label: "25 or more" },
    ],
  },
  {
    key: "frustration",
    question: "What’s your biggest frustration?",
    options: [
      { value: "alone", label: "I’m doing everything alone" },
      { value: "cost", label: "I pay too much on my splits and fees" },
      { value: "training", label: "Training stopped after orientation" },
      { value: "leads", label: "I don’t have enough leads or a plan" },
      { value: "leadership", label: "I can’t reach my leadership" },
      { value: "starting", label: "I don’t know where to start" },
    ],
  },
  {
    key: "want",
    question: "What do you want most in the next year?",
    options: [
      { value: "training", label: "Training and a mentor" },
      { value: "economics", label: "Keep more of what I earn" },
      { value: "leads", label: "Leads and systems" },
      { value: "team", label: "Build or grow a team" },
      { value: "culture", label: "A culture I’m proud of" },
      { value: "wealth", label: "Build long-term wealth" },
    ],
  },
  {
    key: "timeline",
    question: "When would you like to make a change?",
    options: [
      { value: "now", label: "As soon as possible" },
      { value: "1-3mo", label: "In the next 1–3 months" },
      { value: "3-6mo", label: "In 3–6 months" },
      { value: "exploring", label: "Just exploring" },
    ],
  },
  {
    key: "city",
    question: "Where do you work (or want to)?",
    options: [
      { value: "Idaho Falls", label: "Idaho Falls" },
      { value: "Pocatello", label: "Pocatello" },
      { value: "Other East Idaho", label: "Somewhere else in East Idaho" },
    ],
  },
];

export function activeSteps(a: QuizAnswers) {
  return quizSteps.filter((s) => !s.skipIf?.(a));
}

export function personaFromAnswers(a: QuizAnswers): Persona {
  if (a.licensed !== "licensed" || a.years === "<1") return "new";
  if (a.want === "team" || a.transactions === "25+") return "team";
  return "experienced";
}

export type LeadScore = "hot" | "warm" | "nurture";

/** Hot = experienced, 12+ closings, timeline under 90 days. Hot leads ping leadership immediately. */
export function scoreLead(a: QuizAnswers): LeadScore {
  const highVolume = a.transactions === "12-24" || a.transactions === "25+";
  const soon = a.timeline === "now" || a.timeline === "1-3mo";
  const experienced = a.licensed === "licensed" && a.years !== undefined && a.years !== "<1";
  if (experienced && highVolume && soon) return "hot";
  if (soon || (a.licensed === "licensed" && (highVolume || a.transactions === "6-11")) || a.timeline === "3-6mo") return "warm";
  return "nurture";
}

/** Rough transactions-last-12 number for the calculator's Supported eligibility check. */
export function transactionsEstimate(t?: QuizAnswers["transactions"]) {
  return { "0": 0, "1-5": 3, "6-11": 8, "12-24": 18, "25+": 30 }[t ?? "0"];
}

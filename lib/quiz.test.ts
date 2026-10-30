import { describe, expect, it } from "vitest";
import { activeSteps, personaFromAnswers, scoreLead } from "./quiz";

describe("quiz", () => {
  it("skips years and transactions for people who aren't licensed", () => {
    expect(activeSteps({ licensed: "thinking" }).map((s) => s.key)).not.toContain("years");
    expect(activeSteps({ licensed: "licensed" }).length).toBe(7);
  });

  it("routes personas", () => {
    expect(personaFromAnswers({ licensed: "in-class" })).toBe("new");
    expect(personaFromAnswers({ licensed: "licensed", years: "<1" })).toBe("new");
    expect(personaFromAnswers({ licensed: "licensed", years: "6-10", want: "team" })).toBe("team");
    expect(personaFromAnswers({ licensed: "licensed", years: "3-5", transactions: "6-11" })).toBe("experienced");
  });

  it("scores Hot only for experienced, 12+ closings, under 90 days", () => {
    expect(scoreLead({ licensed: "licensed", years: "3-5", transactions: "12-24", timeline: "1-3mo" })).toBe("hot");
    expect(scoreLead({ licensed: "licensed", years: "3-5", transactions: "12-24", timeline: "3-6mo" })).toBe("warm");
    expect(scoreLead({ licensed: "licensed", years: "3-5", transactions: "6-11", timeline: "now" })).toBe("warm");
    expect(scoreLead({ licensed: "thinking", timeline: "exploring" })).toBe("nurture");
  });
});

import { describe, expect, it } from "vitest";
import { validateLead } from "./validate";

describe("validateLead", () => {
  it("accepts the exit-offer guide form with only an email", () => {
    expect(validateLead({ source: "exit-offer", email: "agent@example.com" }).ok).toBe(true);
  });

  it("still requires a valid email on the exit-offer form", () => {
    expect(validateLead({ source: "exit-offer", email: "nope" }).ok).toBe(false);
  });

  it("still requires first name and mobile on full forms", () => {
    expect(validateLead({ source: "contact", email: "agent@example.com" }).ok).toBe(false);
  });
});

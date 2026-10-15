import { describe, expect, it } from "vitest";
import { asTier, countLine, countOf, formatDay, formatMoney, leftAfterSitting } from "@/lib/mornings";
import { morningsContent } from "@/content/mornings";

describe("mornings left after a sitting", () => {
  const left = (balance: number, lang: "en" | "hi" = "en") =>
    countLine(morningsContent[lang].left, leftAfterSitting(balance));

  it("counts from what is left once this morning is spent", () => {
    expect(left(1)).toBe("Your mornings are complete");
    expect(left(2)).toBe("One morning left");
    expect(left(3)).toBe("2 mornings left");
    expect(left(11)).toBe("10 mornings left");
  });

  it("never goes below zero", () => {
    expect(leftAfterSitting(0)).toBe(0);
    expect(countOf(-3)).toBe("zero");
    expect(left(0)).toBe("Your mornings are complete");
  });

  it("speaks Hindi in the same three shapes", () => {
    expect(left(1, "hi")).toBe("आपकी सुबहें पूरी हुईं");
    expect(left(2, "hi")).toBe("एक सुबह शेष");
    expect(left(5, "hi")).toBe("4 सुबहें शेष");
  });
});

describe("purchase rows, for a reader", () => {
  it("knows the three packs and nothing else", () => {
    expect(asTier("eleven")).toBe("eleven");
    expect(asTier("twelve")).toBeNull();
    expect(asTier(null)).toBeNull();
  });

  it("writes money from minor units", () => {
    expect(formatMoney(1100, "usd")).toBe("$11");
    expect(formatMoney(50100, "INR", "en-IN")).toBe("₹501");
    expect(formatMoney(4250, "EUR", "en")).toBe("€42.50");
  });

  it("dates a purchase in the buyer's own zone", () => {
    const at = new Date("2026-10-15T23:30:00Z");
    expect(formatDay(at, "America/Toronto", "en-IN")).toBe("15 Oct 2026");
    expect(formatDay(at, "Asia/Kolkata", "en-IN")).toBe("16 Oct 2026");
    expect(formatDay(at, "Not/AZone", "en-IN")).toBe("16 Oct 2026");
  });
});

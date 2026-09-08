import { describe, expect, it } from "vitest";
import { clock, LIMB_ORDER, LIMB_START, SITTING, TOTAL_SECONDS } from "@/lib/sitting-plan";

describe("the sitting plan", () => {
  it("runs for two minutes and thirty-one seconds", () => {
    expect(TOTAL_SECONDS).toBe(151);
  });

  it("holds the vow for exactly eleven seconds", () => {
    expect(SITTING.hold).toBe(11);
  });

  it("gives the stillness a full minute", () => {
    expect(SITTING.stillness).toBe(60);
  });

  it("starts each limb where the one before it ended", () => {
    expect(LIMB_START.reading).toBe(0);
    expect(LIMB_START.breath).toBe(15);
    expect(LIMB_START.hold).toBe(60);
    expect(LIMB_START.stillness).toBe(71);
    expect(LIMB_START.mark).toBe(131);
  });

  it("orders the five limbs once each", () => {
    expect([...LIMB_ORDER].sort()).toEqual(Object.keys(SITTING).sort());
  });

  it("prints the clock the way the page sets it", () => {
    expect(clock(0)).toBe("0:00");
    expect(clock(71)).toBe("1:11");
    expect(clock(131)).toBe("2:11");
  });
});

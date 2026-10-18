import { describe, expect, it } from "vitest";
import { PRINT_FALLBACK_MM, PRINT_HEIGHT_MM, PRINT_MAX_MM, printWidthMm } from "@/lib/patra-print";

describe("the printed column", () => {
  it("ends every sheet inside the height of US Letter, the shorter paper", () => {
    for (const ratio of [1.6, 1.9, 2.3, 2.6, 3.2]) {
      expect(printWidthMm(ratio) * ratio).toBeLessThanOrEqual(PRINT_HEIGHT_MM);
    }
    expect(PRINT_HEIGHT_MM).toBeLessThanOrEqual(279.4 - 20);
  });

  it("keeps a short sheet at a sheet's width, never the whole page", () => {
    expect(printWidthMm(1)).toBe(PRINT_MAX_MM);
  });

  it("falls back to the column that fits the tallest sheet", () => {
    expect(printWidthMm(Number.NaN)).toBe(PRINT_FALLBACK_MM);
    expect(printWidthMm(0)).toBe(PRINT_FALLBACK_MM);
    /* Five names, the prayer and a full sankalp measure about 2.6. */
    expect(PRINT_FALLBACK_MM * 2.6).toBeLessThanOrEqual(PRINT_HEIGHT_MM);
  });
});

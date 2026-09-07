import { describe, expect, it } from "vitest";
import { BASE58, ID_LENGTH, isId, newId } from "@/lib/ids";

describe("newId", () => {
  it("is twenty-two characters", () => {
    expect(newId()).toHaveLength(ID_LENGTH);
  });

  it("uses base58 only, so it survives a WhatsApp message and a phone call", () => {
    for (let i = 0; i < 200; i += 1) {
      for (const ch of newId()) expect(BASE58).toContain(ch);
    }
  });

  it("omits the characters people misread", () => {
    for (const ch of ["0", "O", "I", "l"]) expect(BASE58).not.toContain(ch);
  });

  it("does not repeat itself", () => {
    const seen = new Set<string>();
    for (let i = 0; i < 10_000; i += 1) seen.add(newId());
    expect(seen.size).toBe(10_000);
  });

  it("spreads across the alphabet rather than favouring the low bytes", () => {
    /* A naive `byte % 58` over 256 values makes the first 24 characters of the
       alphabet about 27% likelier than the rest. Over this many draws that bias
       is far outside the tolerance below, so this test fails on a modulo
       implementation and passes on a rejection-sampling one. */
    const counts = new Map<string, number>();
    const draws = 4000;
    for (let i = 0; i < draws; i += 1) {
      for (const ch of newId()) counts.set(ch, (counts.get(ch) ?? 0) + 1);
    }
    const expected = (draws * ID_LENGTH) / BASE58.length;
    for (const ch of BASE58) {
      const n = counts.get(ch) ?? 0;
      expect(n).toBeGreaterThan(expected * 0.8);
      expect(n).toBeLessThan(expected * 1.2);
    }
  });
});

describe("isId", () => {
  it("accepts what newId makes", () => {
    expect(isId(newId())).toBe(true);
  });

  it("rejects the wrong length, the wrong alphabet and the obvious attacks", () => {
    expect(isId("")).toBe(false);
    expect(isId("short")).toBe(false);
    expect(isId("0".repeat(22))).toBe(false);
    expect(isId("../../etc/passwd------")).toBe(false);
    expect(isId(`${newId()}x`)).toBe(false);
  });
});

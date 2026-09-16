import { describe, expect, it } from "vitest";
import { ordinal } from "@/lib/ordinal";

describe("ordinal", () => {
  it("suffixes English ranks correctly, teens included", () => {
    expect([1, 2, 3, 4, 11, 12, 13, 21, 22, 23, 42, 100, 101, 111].map((n) => ordinal(n))).toEqual([
      "1st", "2nd", "3rd", "4th", "11th", "12th", "13th", "21st", "22nd", "23rd", "42nd", "100th", "101st", "111th",
    ]);
  });

  it("leaves Hindi to its own suffix in the copy", () => {
    expect(ordinal(42, "hi")).toBe("42");
  });
});

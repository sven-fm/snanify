import { describe, expect, it } from "vitest";
import { CATALOGUE_CURRENCIES, currencyForCountry, DEFAULT_CURRENCY } from "@/lib/currency";

describe("currencyForCountry", () => {
  it("gives rupees to India", () => {
    expect(currencyForCountry("IN")).toBe("INR");
  });

  it("gives Canadian dollars to Canada", () => {
    expect(currencyForCountry("CA")).toBe("CAD");
    expect(currencyForCountry("GB")).toBe(CATALOGUE_CURRENCIES.includes("GBP") ? "GBP" : "USD");
  });

  it("gives euro to the eurozone and not to the wider EU", () => {
    expect(currencyForCountry("DE")).toBe("EUR");
    expect(currencyForCountry("PL")).toBe(DEFAULT_CURRENCY);
  });

  it("is case-insensitive", () => {
    expect(currencyForCountry("in")).toBe("INR");
  });

  it("falls back to US dollars when the country is unknown", () => {
    expect(currencyForCountry(undefined)).toBe("USD");
    expect(currencyForCountry(null)).toBe("USD");
    expect(currencyForCountry("")).toBe("USD");
    expect(currencyForCountry("XX")).toBe("USD");
  });
});

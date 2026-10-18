import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { numberRegister } from "@/lib/mornings";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: () => {} }) }));
vi.mock("@/app/[lang]/(app)/account/actions", () => ({ setReminder: async () => {}, deleteAccount: async () => {} }));

const { AccountView } = await import("@/components/pages/AccountView");

const html = (node: React.ReactElement) => renderToStaticMarkup(node);
const count = (s: string, re: RegExp) => (s.match(re) ?? []).length;
const PRESS = /class="press(?=[\s"])(?![^"]*press-share)/g;

const rows = numberRegister([
  { id: "c", keptOn: "2026-10-12", water: "Ganga", morningNo: 3 },
  { id: "b", keptOn: "2026-10-11", water: "Yamuna", morningNo: null },
  { id: "a", keptOn: "2026-10-10", water: "Ganga", morningNo: null },
]).map((r) => ({ id: r.id, day: r.keptOn, water: r.water, n: r.n }));

const base = {
  credits: 8,
  setUp: true,
  names: ["Rekha", "Anil"],
  rows,
  purchases: [],
  today: null,
  reminder: { hour: 6, on: true, tz: "Asia/Kolkata" },
  signOut: null,
};
const view = (lang: "en" | "hi", extra: Record<string, unknown> = {}) =>
  html(React.createElement(AccountView, { lang, ...base, ...extra } as never));

describe("numberRegister", () => {
  it("numbers pre-v3 rows by position, oldest = 1", () => {
    expect(rows.map((r) => r.n)).toEqual([3, 2, 1]);
  });
});

describe("/account", () => {
  it("lists one row per morning, newest first, each with its ordinal", () => {
    const out = view("en");
    expect(count(out, /data-register-row/g)).toBe(3);
    expect(out.indexOf("3rd morning")).toBeLessThan(out.indexOf("2nd morning"));
    expect(out.indexOf("2nd morning")).toBeLessThan(out.indexOf("1st morning"));
    expect(out).toContain("Yamuna");
    expect(out).toContain('href="/p/c"');
  });

  it("says the mornings left in plain words", () => {
    expect(view("en")).toContain("You have 8 mornings left.");
    expect(view("en", { credits: 1 })).toContain("You have one morning left.");
    expect(view("hi")).toContain("8 सुबहें बाकी");
  });

  it("carries one press: sit, or the marigold share when today's sheet exists", () => {
    const sit = view("en");
    expect(count(sit, PRESS)).toBe(1);
    expect(count(sit, /press-share/g)).toBe(0);
    const shared = view("en", {
      today: { id: "c", pageUrl: "https://x/p/c", imageUrl: "https://x/p/c/image", text: "t", waterSlug: "ganga" },
    });
    expect(count(shared, PRESS)).toBe(0);
    expect(count(shared, /press-share/g)).toBe(1);
  });

  it("with nothing left the press leads to the next pack", () => {
    const out = view("en", { credits: 0 });
    expect(count(out, PRESS)).toBe(1);
    expect(out).toContain("/begin?out=1");
  });

  it("is free of the retired pieces", () => {
    const out = view("en");
    for (const gone of ["impress", "bg-paper2", "WaterBand", "Tilak", "Kumkum", "Mauli", "Diya"]) {
      expect(out).not.toContain(gone);
    }
  });

  it("names the fold for what it does, and keeps it closed until opened", () => {
    for (const [lang, label] of [
      ["en", "Delete your account"],
      ["hi", "अपना खाता मिटाइए"],
    ] as const) {
      const out = view(lang);
      const summary = out.match(/<summary[^>]*>([\s\S]*?)<\/summary>/)?.[1] ?? "";
      expect(summary).toContain(label);
      /* A heading inside the summary, so the fold is in the outline. */
      expect(summary).toMatch(new RegExp(`<h2[^>]*>${label}</h2>`));
      expect(out).toMatch(/<details class="group[^"]*">/);
      expect(out).not.toMatch(/<details[^>]*open/);
    }
    expect(view("en")).not.toContain("Your account");
  });
});

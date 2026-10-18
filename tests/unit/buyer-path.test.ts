import { describe, expect, it, vi } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

/* ---------------------------------------------------------------------------
   The buyer's path in v3 (spec 6.3): /begin, sign-in and setup.

   /begin and /setup sit behind a sign-in and read the database, so the
   browser tests cannot reach them without an account (and .env.local writes
   to the production database). Their views are rendered here instead: the
   pay step through BeginView, which takes what Begin fetched as props, and
   the setup form with the router and the save action stubbed.
   --------------------------------------------------------------------------- */

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: () => {} }) }));
vi.mock("@/app/[lang]/begin/actions", () => ({ startCheckout: async () => {} }));
vi.mock("@/app/[lang]/(app)/setup/actions", () => ({ saveProfile: async () => ({ ok: false, errors: {} }) }));

const { BeginView } = await import("@/components/pages/BeginView");
const { SetupForm } = await import("@/components/setup/SetupForm");
const { Steps } = await import("@/components/site/Steps");
const { beginContent } = await import("@/content/begin");
const { setupContent } = await import("@/content/setup");
const { clerkAppearance } = await import("@/lib/clerk-look");

const html = (node: React.ReactElement) => renderToStaticMarkup(node);
const count = (s: string, re: RegExp) => (s.match(re) ?? []).length;
/* `class="press …"` exactly: the primary block, never press-choice or press-share. */
const PRESS = /class="press(?=[\s"])(?![^"]*press-share)/g;

const begin = (lang: "en" | "hi", extra: Partial<React.ComponentProps<typeof BeginView>> = {}) =>
  html(React.createElement(BeginView, { lang, credits: 0, returning: false, ...extra }));

describe("/begin", () => {
  it("carries one press, one band, one label and the price seal", () => {
    const out = begin("en");
    expect(count(out, PRESS)).toBe(1);
    expect(count(out, /data-band/g)).toBe(1);
    expect(count(out, /data-label/g)).toBe(1);
    expect(out).toContain('data-seal="price"');
    expect(out).toContain("€11");
  });

  it("the label is the eleven pack, and one and sixty are plain rows", () => {
    const out = begin("en");
    const label = out.slice(out.indexOf("data-label"), out.indexOf("data-label") + 1500);
    expect(label).toContain("Eleven mornings");
    expect(out).toContain("One morning");
    expect(out).toContain("Sixty mornings");
    for (const tier of ["one", "eleven", "sixty"]) expect(out).toContain(`name="tier" value="${tier}"`);
  });

  it("speaks the v3 lines", () => {
    const out = begin("en");
    expect(out).toContain("Pick your mornings.");
    expect(out).toContain("Eleven for eleven.");
    expect(out).toContain("Pay once, no subscription. Sit on any morning you like.");
  });

  it("keeps one press with mornings in hand, and the steps on a first visit only", () => {
    const held = begin("en", { credits: 3, returning: true });
    expect(count(held, PRESS)).toBe(1);
    expect(held).toContain("You already have 3 mornings");
    expect(held).not.toContain('aria-current="step"');
    expect(begin("en")).toContain('aria-current="step"');
  });

  it("drops the retired marks and the tint blocks", () => {
    const out = begin("en") + begin("hi");
    for (const gone of ["misregister", "bg-paper2", "impress", "tilak", "water-band"]) expect(out).not.toContain(gone);
  });

  it("names ₹501 to a rupee reader, and eleven for eleven to everyone else", () => {
    /* What a reader in one currency sees: every other currency's span goes
       (they hold plain text only), then the tags. */
    const seen = (out: string, cur: string) =>
      out
        .replace(new RegExp(`<span class="cur cur-(?!${cur})[A-Z]{3}[^"]*">[^<]*</span>`, "g"), "")
        .replace(/<[^>]+>/g, "");
    const en = begin("en");
    expect(seen(en, "INR")).toContain("Eleven mornings for ₹501.");
    expect(seen(en, "INR").toLowerCase()).not.toContain("eleven for eleven");
    expect(seen(en, "USD")).toContain("Eleven for eleven.");
    expect(seen(en, "GBP")).toContain("Eleven for eleven.");
    const hi = begin("hi");
    expect(seen(hi, "INR")).toContain("ग्यारह सुबहें ₹501 में।");
    expect(seen(hi, "INR")).not.toContain("ग्यारह में");
    expect(seen(hi, "EUR")).toContain("ग्यारह सुबहें, ग्यारह में।");
  });

  it("the landing and /snan say the same, through the same line", async () => {
    const { CurrencyLine } = await import("@/components/ui");
    const { content } = await import("@/lib/content");
    const { snanContent } = await import("@/content/snan");
    for (const lang of ["en", "hi"] as const) {
      for (const [other, inr] of [
        [content[lang].pricing.title, content[lang].pricing.titleInr],
        [snanContent[lang].tariff.title, snanContent[lang].tariff.titleInr],
      ]) {
        const out = html(React.createElement(CurrencyLine, { other, inr }));
        expect(out).toContain('<span class="cur cur-USD">' + other + "</span>");
        expect(inr).toContain("{price:eleven}");
        expect(out).toContain("₹501");
      }
    }
  });

  it("has a Hindi edition in आप", () => {
    const out = begin("hi");
    expect(out).toContain(beginContent.hi.title);
    expect(out).toContain(beginContent.hi.band);
    expect(count(out, PRESS)).toBe(1);
  });
});

const setup = (lang: "en" | "hi", sankalpText = "") =>
  html(
    React.createElement(SetupForm, {
      lang,
      t: setupContent[lang],
      waters: [
        { slug: "haridwar", river: "Ganga", ghat: "Har Ki Pauri", city: "Haridwar" },
        { slug: "prayagraj", river: "Triveni Sangam", ghat: "Sangam", city: "Prayagraj" },
      ],
      prayers: [{ id: "gayatri", title: "Gayatri", line: "ॐ भूर्भुवः स्वः", waters: "all" }],
      initial: { waterSlug: "haridwar", names: ["Asha"], prayerId: "", sankalpText, reminderHour: 6, portraitUrl: null },
    }),
  );

describe("setup", () => {
  it("each one-of-many choice is a radio in a radiogroup, drawn as a small block", () => {
    const out = setup("en");
    expect(count(out, /role="radiogroup"/g)).toBe(3);
    const radios = out.match(/<button[^>]*role="radio"[^>]*>/g) ?? [];
    /* Two waters, the prayer and "without", twenty-four hours. */
    expect(radios.length).toBe(2 + 2 + 24);
    for (const r of radios) {
      expect(r).toContain("press-choice");
      expect(r).toMatch(/aria-checked="(true|false)"/);
    }
    /* The chosen water, the empty prayer and six o'clock: the group's tab stops. */
    expect(count(out, /aria-checked="true"/g)).toBe(3);
    expect(count(out, /role="radio"[^>]*tabindex="0"|tabindex="0"[^>]*role="radio"/g)).toBe(3);
    expect(out).not.toMatch(/role="radio"[^>]*aria-pressed/);
  });

  it("the example sankalps are press-choice buttons, and one taken stays pressed", () => {
    const examples = setup("en").match(/<button[^>]*aria-pressed[^>]*>/g) ?? [];
    expect(examples.length).toBe(3);
    for (const e of examples) expect(e).toContain("press-choice");
    const taken = setup("en", setupContent.en.sankalp.examples[1]);
    expect(count(taken, /aria-pressed="true"/g)).toBe(1);
  });

  it("sends the choices as fields", () => {
    const out = setup("en");
    expect(out).toContain('name="waterSlug" value="haridwar"');
    expect(out).toContain('name="prayerId" value=""');
    expect(out).toContain('name="reminderHour" value="6"');
  });

  it("keeps the fields on their 2px rule, one save press, no band and no seal", () => {
    const out = setup("en");
    expect(out).toContain("field");
    expect(count(out, PRESS)).toBe(1);
    for (const gone of ["data-band", "data-seal", "data-label", "impress", "bg-paper2", "rulestrong"]) {
      expect(out).not.toContain(gone);
    }
  });

  it("renders in Hindi", () => {
    expect(setup("hi")).toContain(setupContent.hi.save);
  });
});

describe("the masthead on a screen with its own press", () => {
  it("drops its sindoor Begin, and draws it as the press elsewhere", async () => {
    const { Header } = await import("@/components/site/Header");
    const shown = html(React.createElement(Header, { lang: "en", currentPath: "/" }));
    const hidden = html(React.createElement(Header, { lang: "en", currentPath: "/begin", hideCta: true }));
    expect(count(shown, PRESS)).toBeGreaterThan(0);
    expect(count(hidden, PRESS)).toBe(0);
    expect(shown + hidden).not.toMatch(/<a[^>]*impress[^>]*bg-sindoor/);
  });
});

describe("the step line", () => {
  it("puts the bindu on the current step", () => {
    const out = html(React.createElement(Steps, { steps: ["A", "B", "C"], here: [2], label: "Steps" }));
    expect(count(out, /aria-current="step"/g)).toBe(1);
    expect(count(out, /var\(--sindoor\)/g)).toBe(1);
  });
});

describe("Clerk, dressed as the site", () => {
  const primary = clerkAppearance.elements.formButtonPrimary as Record<string, unknown>;

  it("its primary button is the press: sindoor face, 2px ink border, ink walls", () => {
    expect(primary.backgroundColor).toBe("var(--sindoor)");
    expect(String(primary.border)).toContain("2px solid var(--ink)");
    expect(String(primary.boxShadow)).toContain("6px 6px 0 var(--wall)");
    const active = primary["&:active"] as Record<string, string>;
    expect(active.transform).toContain("translate(6px, 6px)");
  });

  it("reads only the palette's tokens", () => {
    const tokens = new Set(["paper", "paper-2", "paper-3", "ink", "ink-2", "sindoor", "marigold", "teal", "rule", "wall", "on-sindoor", "font-body", "font-display"]);
    const used = [...JSON.stringify(clerkAppearance).matchAll(/var\(--([a-z0-9-]+)\)/g)].map((m) => m[1]);
    expect(used.length).toBeGreaterThan(0);
    for (const name of used) expect(tokens, name).toContain(name);
  });
});

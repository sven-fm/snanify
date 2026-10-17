# Design system v3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild every Snanify surface (site, snan, Sankalp Patra, email, cards, icons, ads) to design system v3 on a `design-v3` branch, reviewed on a Vercel preview, shipped in one cutover.

**Architecture:** One palette module and one set of pure geometry/model functions (`palette.ts`, `gauge.ts`, `river-geometry.ts`) feed three renderers: React components (the kit), the HarfBuzz/resvg Patra and card images, and the email HTML. Surfaces are then rebuilt one task each on top of the kit. Old Patras keep rendering through the v2 image path, chosen by a new `image_version` column.

**Tech Stack:** Next.js App Router, React, Tailwind v4 (`globals.css` tokens), TypeScript, Vitest (node env, `tests/unit/**/*.test.ts`), Playwright (`tests/e2e`), Drizzle + Neon, resvg/sharp/HarfBuzz (`src/lib/typeset.ts`), Resend email, Clerk.

**Spec:** `docs/superpowers/specs/2026-10-17-design-system-v3-design.md` (read it with this plan; section numbers below are the spec's). Mockups: `docs/design/v3-mockups/`.

## Global Constraints

- All work on branch `design-v3`; nothing merges to `main` before the owner's go (spec 9).
- Hex values come only from `src/lib/palette.ts` (renderers) and `--*` tokens in `src/app/globals.css` (site); both carry exactly the spec 3 table.
- Day: paper `#f2ead9`, paper-2 `#eae0c9`, paper-3 `#ded1b4`, ink `#141210`, ink-2 `#57513f`, sindoor `#c8251d`, marigold `#f2c230`, haldi `#e3962b`, teal `#1d5a6a`, maroon `#7a1a14`, rule `#c3b697`, wall `#141210`. Night: `#12110e`, `#1a1814`, `#24211a`, `#ece3cf`, `#99917f`, `#e04a40`, `#f2c230`, `#f0a83c`, `#5c9aa5`, `#a8352b`, `#35302a`, `#000000`.
- Gauge fills day `#f2ead9 #e8dcc0 #c9d7d2 #7fa3a6 #1d5a6a`, night `#1a1814 #2a2a22 #24393c #3d6b72 #5c9aa5`; widths 1:2:4:2:1.
- Night river: waves `#16404a`, sun `#4a1410`, path `#5a4a1c`. Stillness ground `#0b0a08`.
- Display h1: Eczar 800, uppercase (Latin), `line-height 0.95`, `letter-spacing -0.01em`; Hindi Eczar 800 `line-height 1.22`. h2/h3 sentence case Eczar 700. Never letter-spaced capitals.
- One press (primary block) per screen; at most one band per page and only on the landing, `/snan`, `/begin`, the snan's ready screen; the label only on the eleven pack (landing, `/begin`); the seal only as price seal or morning badge.
- Never on the Patra or in the sitting: band, label, price, pack count, "of 11".
- Copy rules from `CLAUDE.md`: no em dashes, no negative constructions, two locales via `Record<Lang, …>` with `satisfies`; voice per spec 7.2; plain river sentences per spec 7.3 ("for this time of year").
- Mobile first (spec 6.11): design at 390 wide; nothing scrolls sideways at 360, 390, 430; landing press above 660 at 390 wide and above 640 at 360 wide, both locales; primary press ≥ 56px tall, other targets ≥ 44px.
- Round every computed SVG coordinate with `.toFixed(2)` (hydration trap in `CLAUDE.md`).
- Every motion stops under `prefers-reduced-motion`; transform and opacity only.
- `npx tsc --noEmit` clean, `npm run lint` 0 errors, `npm test` green before every commit.

## Review Focus

1. **Hindi runs taller.** `/hi` landing at 360 × 640: the press must still sit above the fold. Pinned by the e2e fold test in Task 7 (both locales, both sizes).
2. **The feed is quiet.** When `percentile` is null or `figureKind` is `"normal"`, the gauge shows no today-dot and the sentence is `flow.stateMedian`, never a guessed band. Pinned in Task 2 (`gaugeModel(null)`) and Task 10 (Patra renders without a dot).
3. **Five long, mixed-script names.** "Meenakshi Raghunathan", "Kamala Devi Sharma", Devanagari names: each wraps under itself inside the column, never overflows, never shares a line. Pinned in Task 10.
4. **Night mode.** Press walls, gauge fills and the strip must read on `#12110e`. Pinned by the night snapshot step in Task 4 and the palette test in Task 1.
5. **Old Patras.** A sitting with `image_version` null still renders the v2 memento, byte-identical to before. Pinned in Task 10.

---

### Task 0: Branch and preview safety

**Files:** none in the repo.

- [ ] **Step 1:** `git switch -c design-v3` from `main` at the spec commit (`8990d61` or later).
- [ ] **Step 2:** Run `vercel env ls preview` and check `DATABASE_URL`. If Preview points at the production database, stop and ask the owner to choose: a Neon branch for Preview, or review only with a test account (spec 9). Record the answer in `plan.md` under the v3 item.
- [ ] **Step 3:** `git push -u origin design-v3`; confirm a Vercel preview URL builds.

---

### Task 1: The palette

**Files:**
- Create: `src/lib/palette.ts`
- Modify: `src/app/globals.css` (tokens, `@theme` names), every `src/**/*.tsx|ts` using `spot`, `haldi2`, `warm`
- Modify: `src/lib/patra-image.ts`, `src/lib/site-card.ts`, `src/lib/email.ts` (import hex from `palette.ts` instead of local constants)
- Test: `tests/unit/palette.test.ts`

**Interfaces:**
- Produces: `PALETTE: { day: Record<PaletteKey, string>; night: Record<PaletteKey, string> }`, `type PaletteKey = "paper" | "paper2" | "paper3" | "ink" | "ink2" | "sindoor" | "marigold" | "haldi" | "teal" | "maroon" | "rule" | "wall"`, `GAUGE_FILLS: { day: readonly string[5]; night: readonly string[5] }`, `NIGHT_RIVER = { waves: "#16404a", sun: "#4a1410", path: "#5a4a1c" }`, `STILLNESS = "#0b0a08"`. Tailwind utilities `bg-sindoor text-sindoor border-sindoor bg-marigold text-marigold bg-teal text-teal bg-maroon` and `--wall`, `--gauge-1..5`.

- [ ] **Step 1: Write the failing test** `tests/unit/palette.test.ts`:

```ts
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { PALETTE, GAUGE_FILLS } from "@/lib/palette";
const css = readFileSync("src/app/globals.css", "utf8");
it("globals.css carries every day and night value from palette.ts", () => {
  const varName = { paper2: "paper-2", paper3: "paper-3", ink2: "ink-2" } as Record<string, string>;
  for (const [k, hex] of Object.entries(PALETTE.day)) expect(css).toMatch(new RegExp(`--${varName[k] ?? k}:\\s*${hex}`, "i"));
  for (const [k, hex] of Object.entries(PALETTE.night)) expect(css).toMatch(new RegExp(`--${varName[k] ?? k}:\\s*${hex}`, "i"));
  GAUGE_FILLS.day.forEach((hex, i) => expect(css).toMatch(new RegExp(`--gauge-${i + 1}:\\s*${hex}`, "i")));
});
it("pins the spec values", () => {
  expect(PALETTE.day.sindoor).toBe("#c8251d");
  expect(PALETTE.day.marigold).toBe("#f2c230");
  expect(PALETTE.day.teal).toBe("#1d5a6a");
  expect(PALETTE.night.wall).toBe("#000000");
});
it("leaves no retired token in src", () => {
  const out = execSync("grep -rEl '(--spot|--haldi-2|\\b(text|bg|border)-spot\\b|bg-haldi2|className=\"[^\"]*\\bwarm\\b)' src || true").toString();
  expect(out.trim()).toBe("");
});
```

- [ ] **Step 2:** `npx vitest run tests/unit/palette.test.ts` → FAIL (module missing).
- [ ] **Step 3:** Create `palette.ts` with the Global Constraints values; rewrite the `:root`, night (`@media (prefers-color-scheme: dark)` and `[data-theme="dark"]`) and `@theme` blocks of `globals.css` to them; rename `spot` → `sindoor` across `src` (`sed -i '' 's/\b\(text\|bg\|border\)-spot\b/\1-sindoor/g'` then fix `var(--spot)`); replace `warm`/`bg-haldi2` grounds with `bg-paper2` and note each place for its surface task; point the three renderers at `PALETTE.day`.
- [ ] **Step 4:** `npm test && npx tsc --noEmit && npm run lint` → all green.
- [ ] **Step 5:** Commit `design-v3: one palette for site, images and email`.

---

### Task 2: The gauge model and plain river words

**Files:**
- Create: `src/lib/gauge.ts`
- Modify: `src/content/flow.ts` (add `plain`)
- Test: `tests/unit/gauge.test.ts`

**Interfaces:**
- Produces: `gaugeModel(percentile: number | null): { dot: number | null; band: FlowBand | null; segments: { band: FlowBand; from: number; to: number }[] }` (`from`/`to`/`dot` as 0..1), `flowContent[lang].plain: Record<FlowBand, string>`.
- Consumes: `bandFor` from `src/lib/riverdata.ts`.

- [ ] **Step 1: Failing test:**

```ts
it("cuts the strip at the band edges", () => {
  expect(gaugeModel(50).segments.map((s) => [s.from, s.to])).toEqual([[0, 0.1], [0.1, 0.3], [0.3, 0.7], [0.7, 0.9], [0.9, 1]]);
});
it("puts today at its percentile and names the band", () => {
  expect(gaugeModel(86)).toMatchObject({ dot: 0.86, band: "full" });
  expect(gaugeModel(0).dot).toBe(0); expect(gaugeModel(100).dot).toBe(1);
});
it("shows no dot when the feed is quiet", () => {
  expect(gaugeModel(null)).toMatchObject({ dot: null, band: null });
});
it("says 'for this time of year' in every English plain line", () => {
  for (const line of Object.values(flowContent.en.plain)) expect(line).toMatch(/for this time of year\.$/);
  expect(flowContent.en.plain.full).toBe("Fuller than usual for this time of year.");
});
```

- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement `gaugeModel` (clamp percentile to 0..100, `dot = p / 100`); add `plain` to `en` (spec 7.3 table) and `hi` (spec 7.3 drafts, full sentences: "इस समय के हिसाब से सामान्य से बहुत कम।" etc.).
- [ ] **Step 4:** `npm test` → green (copy-guard included).
- [ ] **Step 5:** Commit `design-v3: the gauge model and the river in plain words`.

---

### Task 3: River geometry

**Files:**
- Create: `src/lib/river-geometry.ts`
- Test: `tests/unit/river-geometry.test.ts`

**Interfaces:**
- Produces:
  - `waveRows(opts: { width: number; height: number; rows: number; top?: number }): { y: number; amp: number; period: number; stroke: number; opacity: number; points: string; drift: number }[]` (rows spaced `top + (height - top - 4) * t^1.7`; `amp = 0.5 + 2.6t`, `period = 40 + 50t` scaled to width/260; `stroke = 0.6 + 1.2t`; `opacity = 0.3 + 0.6t`; `drift` seconds `11 - 4t`; `points` is a polyline twice the width so it can slide one period).
  - `sunPath(rows: ReturnType<typeof waveRows>, opts: { sunX: number; width: number }): { x: number; y: number; w: number; h: number }[]` (per row: centre moves from `sunX` at the horizon to `width/2` at the front; total width `5 + 64t` scaled; 1 dash below t 0.3, 2 below 0.7, else 3).
  - `horizonSun(opts: { cx: number; horizonY: number; r: number }): { cx: number; cy: number; r: number; clipBelow: number }` (sun centre 0.35r above the horizon, clipped at the horizon).

- [ ] **Step 1: Failing test:**

```ts
const rows = waveRows({ width: 390, height: 150, rows: 11 });
it("bunches rows toward the horizon", () => {
  const gaps = rows.slice(1).map((r, i) => r.y - rows[i].y);
  gaps.slice(1).forEach((g, i) => expect(g).toBeGreaterThan(gaps[i]));
});
it("rounds every coordinate to two places", () => {
  for (const r of rows) for (const n of r.points.split(/[ ,]/)) expect(n).toMatch(/^-?\d+(\.\d{1,2})?$/);
});
it("runs the sun's path from under the sun toward the front, widening", () => {
  const dashes = sunPath(rows, { sunX: 300, width: 390 });
  const first = dashes[0], last = dashes[dashes.length - 1];
  expect(Math.abs(first.x + first.w / 2 - 300)).toBeLessThan(8);
  expect(last.x).toBeLessThan(first.x);
  expect(last.w * 3).toBeGreaterThan(first.w);
});
it("cuts the sun at the horizon", () => {
  const s = horizonSun({ cx: 300, horizonY: 6, r: 20 });
  expect(s.cy).toBeLessThan(6); expect(s.cy + s.r).toBeGreaterThan(6); expect(s.clipBelow).toBe(6);
});
```

- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement (reference: the generator in `docs/design/v3-mockups/landing-v7.html` source and `sitting.html`). **Step 4:** green. **Step 5:** Commit `design-v3: river geometry shared by page, image and email`.

---

### Task 4: The kit

**Files:**
- Create: `src/components/kit/Seal.tsx`, `Band.tsx`, `Label.tsx`, `Gauge.tsx`, `River.tsx` (exports `RiverHorizon`, `RiverStrip`), `index.ts`
- Modify: `src/components/ui/index.tsx` (`buttonVariants`, `CTA`, `LinkButton`, `SubmitButton` become the press), `src/app/globals.css` (`.press`, `.press-share`, `.press-choice`, motions `sink`, `breathe`, `stamp`, `flow`; remove `impress`, `flicker`, petal keyframes, `.warm`, `.misregister`)
- Test: `tests/unit/kit.test.ts` (renderToStaticMarkup via `React.createElement`)

**Interfaces:**
- Consumes: `gaugeModel`, `flowContent[lang].plain`, `waveRows`, `sunPath`, `horizonSun`, `PALETTE`.
- Produces:
  - `buttonClass(variant: "solid" | "share" | "quiet" = "solid", className?)` → `"press"` (sindoor face, white text) / `"press press-share"` (marigold face, ink text) / underlined link.
  - `<Seal kind="price" prices={Prices} lang />`, `<Seal kind="morning" n={number} lang />` (en `${ordinal(n)} morning` from `src/lib/ordinal.ts`, e.g. "7th morning"; hi `${nthMorning(n, "hi")} सुबह`, e.g. "सातवीं सुबह"; returns null when `n < 2`).
  - `<Band>{children}</Band>`, `<Label kicker? title price? />`.
  - `<Gauge percentile={number | null} band={FlowBand | null} lang figure?={string} />` (5 fills, dashed "usual" line at 0.5, sindoor dot at `dot`, the words "Thin / Usual / In spate", and the optional small figure row under it).
  - `<RiverHorizon height={number} sun?={boolean} night?={boolean} breathe?={boolean} />`, `<RiverStrip />` (74px, teal only, no path).

- [ ] **Step 1: Failing tests:**

```ts
it("the press sinks: a .press with 6 wall steps", () => {
  expect(buttonClass()).toContain("press");
  expect(css).toMatch(/\.press\s*\{[^}]*6px 6px 0 var\(--wall\)/);
  expect(css).toMatch(/\.press:active\s*\{[^}]*translate\(6px,\s*6px\)/);
});
it("the morning seal waits for the second morning", () => {
  expect(html(Seal({ kind: "morning", n: 1, lang: "en" }))).toBe("");
  expect(html(Seal({ kind: "morning", n: 7, lang: "en" }))).toContain("7th morning");
  expect(html(Seal({ kind: "morning", n: 7, lang: "hi" }))).toContain("सातवीं सुबह");
});
it("the gauge draws no dot when the feed is quiet", () => {
  expect(html(Gauge({ percentile: null, band: null, lang: "en" }))).not.toContain('data-today');
});
it("the strip carries no marigold", () => {
  expect(html(RiverStrip({}))).not.toMatch(/f2c230|marigold/i);
});
it("every motion stops under reduced motion", () => {
  const block = css.match(/@media \(prefers-reduced-motion: reduce\)\s*\{([\s\S]*?)\n\}/)![1];
  for (const n of ["sink", "breathe", "stamp", "flow"]) expect(block).toContain(n);
});
```

- [ ] **Step 2:** Run → FAIL. **Step 3:** Implement per spec 5.1 to 5.6 (seal ring dashed 6px inset, rotation -8° price / +10° morning; band rotate(-2deg), ink ground, marigold Martel 800, overhang clipped by its parent; label 3px ink frame + 1.5px sindoor inset rule; night press walls `#000` with 2px `--ink` border). `RiverHorizon` animates with `<animateTransform>`/CSS transforms on one shared clock, pauses off screen via `InView`. **Step 4:** green. **Step 5:** Open `/specimen` and a scratch page in the preview at 390 × 844 by day and night (`data-theme`), screenshot both into `docs/design/v3-mockups/kit-check-{day,night}.png`; walls, gauge and strip read on both. **Step 6:** Commit `design-v3: the kit (press, seal, band, label, gauge, river)`.

---

### Task 5: Logo, wordmark, icons, header and footer

**Files:**
- Modify: `src/components/Logo.tsx` (`Mark`, `Wordmark`, `Logo`, `Colophon`), `src/components/site/Header.tsx`, `src/components/site/Footer.tsx`, `src/lib/seo.ts` (icons, manifest), `src/app/globals.css` (`.wordmark` at Eczar 800)
- Create: `scripts/icons.mjs` (renders `public/icon.svg`, `public/favicon.ico` 16/32/48, `public/apple-touch-icon.png` 180, `public/icon-512.png`, `public/brand-1024.png`), `src/app/manifest.ts`
- Test: `tests/unit/logo.test.ts`

**Interfaces:**
- Produces: `<Mark small?={boolean} />` (48 grid: ring 2.4, small cut ring 3.6 and two water bands; sun clipped at y 24.6; teal waves; no marigold), `<Wordmark />` (Eczar 800, `-0.015em`, U+0131 with the SVG bindu, `aria-hidden` lettering + `sr-only` "Snanify").

- [ ] **Step 1: Failing test:** `Mark` markup contains `#c8251d` and `#1d5a6a` (or their vars) and no `#f2c230`; the small cut has exactly 2 water rects; `Wordmark` contains `ı` and an `sr-only` "Snanify"; `public/icon-512.png` and `public/brand-1024.png` exist with those pixel sizes (sharp metadata); `manifest.ts` lists 192/512 icons.
- [ ] **Step 2:** Run → FAIL. **Step 3:** Redraw per spec 6.9; re-measure the bindu rise for weight 800 (today's 0.826em constant) against the live face; header sits on `<RiverStrip />`, footer closes with `<RiverHorizon height={120} />`; run `node scripts/icons.mjs`. **Step 4:** green; check the tab icon at 16px in the preview. **Step 5:** Commit `design-v3: the horizon sun and the heavy wordmark, everywhere`.

---

### Task 6: RiverFlow restyled

**Files:**
- Modify: `src/components/RiverFlow.tsx`, `src/components/WaterBand.tsx` (becomes a thin wrapper over `RiverStrip`, or is deleted with its call sites moved)
- Test: `tests/unit/riverflow.test.ts`

- [ ] **Step 1: Failing test:** the module's colour constants use `PALETTE` teal for ripples and marigold for glitter; it exports no petal code; the sun is placed by `horizonSun` (lower part clipped) and no longer reads `shape-outside` from the headline.
- [ ] **Step 2:** FAIL. **Step 3:** Keep the `1/d` projection and trapezoid glitter; drop the float-coupling and petals; place the composition below its container's press. **Step 4:** green. **Step 5:** Commit `design-v3: RiverFlow in teal with the sun on the horizon`.

---

### Task 7: The landing

**Files:**
- Modify: `src/components/Landing.tsx`, `src/content/landing/en.ts`, `src/content/landing/hi.ts`
- Test: `tests/e2e/fold.spec.ts` (new), `tests/e2e/smoke.spec.ts` (add 360 and 430 widths)

- [ ] **Step 1: Failing e2e:**

```ts
for (const [w, h] of [[390, 660], [360, 640]]) for (const path of ["/", "/hi"]) {
  test(`${path} press above the fold at ${w}x${h}`, async ({ page }) => {
    await page.setViewportSize({ width: w, height: h }); await page.goto(path);
    const box = await page.locator("[data-hero-press]").boundingBox();
    expect(box!.y + box!.height).toBeLessThanOrEqual(h);
    expect(box!.height).toBeGreaterThanOrEqual(56);
  });
}
```

- [ ] **Step 2:** `npm run dev` then `npx playwright test tests/e2e/fold.spec.ts` → FAIL.
- [ ] **Step 3:** Rebuild the hero per spec 6.1 with the owner's exact English (headline "Your {River} snan. From home.", band "Takes just 3 minutes. Then share it with your family.", seal + "Breathe with the river as it runs this morning. Make your sankalp. **Do your first snan today!**", press "Start your snan now") and the Hindi drafts; delete the live line and the lede; below the fold the river, the gauge with figure row, the specimen phone, the six waters list, the eleven pack on `<Label>` and one/sixty as rows. From `lg` up the hero keeps its 390 composition at `max-w-md` beside the specimen phone, adding nothing the phone lacks (spec 6.11). Remove `Tilak`, `Diya`, `Petals`, mauli usages here.
- [ ] **Step 4:** fold + smoke green; `npm test` green. **Step 5:** Commit `design-v3: the landing`.

---

### Task 8: `/snan`

**Files:** `src/components/pages/SnanIntro.tsx`, `src/content/snan.ts`. Test: `tests/e2e/cta.spec.ts` (one press on `/snan`).

- [ ] **Step 1:** Failing e2e: `/snan` and `/hi/snan` have exactly one `.press` above the five-part list and no "Walk through the five parts" link.
- [ ] **Step 2:** FAIL. **Step 3:** Capitals h1 "Three minutes with your {river}.", one band, one press, the five parts as a list with durations from `sitting-plan.ts`; voice per spec 7.2 table. **Step 4:** green. **Step 5:** Commit.

---

### Task 9: The morning number and the image version

**Files:**
- Modify: `src/db/schema.ts` (sittings: `morningNo: integer("morning_no")`, `imageVersion: integer("image_version")`), `src/lib/sitting.ts` (`mintSitting` sets both), `src/lib/patra-view.ts` (`PatraView.morning: number | null`)
- Create: migration via `npx drizzle-kit generate --name v3-morning-image` → `src/db/migrations/0002_v3-morning-image.sql`
- Test: `tests/unit/patra-record.test.ts` (extend)

**Interfaces:**
- Produces: `morningNumber(priorMornings: number): number` (`prior + 1`, all waters) exported from `src/lib/sitting.ts`; `IMAGE_VERSION = 3` exported from `src/lib/patra-image.ts`; `PatraView.morning` (`null` when the row's `morning_no` is null).

- [ ] **Step 1:** Failing test: `patraView({...row, morningNo: 7}).morning === 7`; `patraView({...row, morningNo: null}).morning === null`; `morningNumber(6) === 7`.
- [ ] **Step 2:** FAIL. **Step 3:** Add columns (nullable, no default, so old rows stay null); in `mintSitting` count the user's sittings across all waters inside the same transaction before insert, set `morningNo` and `imageVersion: IMAGE_VERSION`. Generate the migration. **Step 4:** green. **Step 5:** Apply the migration to the Preview database only (Task 0's answer); commit `design-v3: count mornings and version the Patra image`.

---

### Task 10: The Patra image v3

**Files:**
- Create: `src/lib/patra-image-v2.ts` (today's `patra-image.ts` moved verbatim, exports suffixed `V2`)
- Modify: `src/lib/patra-image.ts` (v3 `mementoSvg`, `patraSvg`, `patraCardSvg`, dispatcher), `src/lib/patra-store.ts`, `src/app/[lang]/p/[id]/image/route.tsx`, `src/app/[lang]/specimen/route.tsx`, `src/lib/engraving.ts` (restyle only: colours, horizon, sun, path; seed and density logic untouched)
- Test: `tests/unit/patra-image.test.ts` (new), `tests/unit/engraving.test.ts` (must stay green unchanged)

**Interfaces:**
- Consumes: `PatraView` (+`morning`), `engrave()`, `sunPath`, `horizonSun`, `gaugeModel`, `PALETTE.day`, `nthMorning`.
- Produces: `renderPatraFor(sitting: Sitting): Promise<Buffer>` (v2 when `imageVersion` is null, else v3), used by `storeSheet` and the image route.

- [ ] **Step 1: Failing tests** (assert on the SVG string; names are outlined, so tag name groups with `data-name-line` and the badge with `data-morning`):

```ts
const svg = (v: Partial<PatraView>) => mementoSvg({ ...SPECIMEN_VIEW, ...v });
it("sets names one per line at 84/68/56", async () => {
  expect((await svg({ names: ["A B", "C D"] })).match(/data-name-line="84"/g)).toHaveLength(2);
  expect((await svg({ names: ["A", "B", "C"] })).match(/data-name-line="68"/g)).toHaveLength(3);
  expect((await svg({ names: FIVE_LONG })).match(/data-name-line="56"/g)!.length).toBeGreaterThanOrEqual(5);
});
it("keeps every name line inside the 1080 column", async () => {
  for (const m of (await svg({ names: FIVE_LONG })).matchAll(/data-right="([\d.]+)"/g)) expect(+m[1]).toBeLessThanOrEqual(1080 - 64);
});
it("stamps the badge from the second morning, at the photo's top right", async () => {
  expect(await svg({ morning: 1 })).not.toContain("data-morning");
  expect(await svg({ morning: 7, portraitUrl: PORTRAIT })).toContain('data-morning="7"');
});
it("never carries a band, label, pack count or the sankalp", async () => {
  const s = await svg({ morning: 7 });
  expect(s).not.toMatch(/data-band|data-label|of 11/);
});
it("draws the gauge without a dot when the feed is quiet", async () => {
  expect(await svg({ percentile: null, figureKind: "normal" })).not.toContain("data-today");
});
it("keeps the link card free of a face and a badge", async () => {
  const c = await patraCardSvg({ ...SPECIMEN_VIEW, morning: 7, portraitUrl: PORTRAIT });
  expect(c).not.toMatch(/data-morning|data-portrait/);
});
it("still renders an old sitting through v2, unchanged", async () => {
  expect(await renderPatraFor({ ...OLD_ROW, imageVersion: null })).toEqual(await renderPatraV2(patraView(OLD_ROW)));
});
```

(`FIVE_LONG = ["Anjali Sharma", "Vikram Sharma", "Meenakshi Raghunathan", "Rohan Sharma", "कमला देवी शर्मा"]`; `SPECIMEN_VIEW`, `PORTRAIT`, `OLD_ROW` from `tests/unit/helpers/`.)

- [ ] **Step 2:** FAIL. **Step 3:** Lay out per spec 6.5 at 1080 × 1920 (mock ×4: header "Sankalp Patra" Eczar 700 sindoor sentence case + date/tithi; ghat engraving full width; portrait right, vertically centred on the picture, 3° tilt, paper mount, 12px ink offset; seal 152px set outward at the print's top-right; names 84/68/56 with `wrap()`; "at the {River}, {ghat}, {city}"; prayer; state, plain line, gauge, figure and rank small right; the flow-seeded engraving as the closing river with horizon sun and marigold path; footer zone/IST/distance/`snanify.com`). Adapt to 1080 × 1350 and the 1200 × 630 card (no portrait, no badge). `storeSheet` and the image route call `renderPatraFor`. **Step 4:** green, and `engraving.test.ts` unchanged and green. **Step 5:** Render the specimen at `/specimen` in the preview and compare to `docs/design/v3-mockups/patra-names-v3.html`. **Step 6:** Commit `design-v3: the Sankalp Patra image`.

---

### Task 11: The Patra page and the owner's print copy

**Files:** `src/components/SankalpPatra.tsx`, `src/components/patra/PatraOwner.tsx`, `PatraGuest.tsx`, `ShareButton.tsx`, `src/content/patra-page.ts`, `src/content/patra.ts`. Test: `tests/unit/patra-record.test.ts` (extend).

- [ ] **Step 1:** Failing test: the HTML sheet for the owner (`printableRecord`) contains the sankalp text; the guest render of the same sitting does not; neither contains a register, gotra or giver line.
- [ ] **Step 2:** FAIL. **Step 3:** HTML sheet mirrors Task 10's layout; owner copy adds the sankalp in Eczar 700 under the names; print CSS keeps `#faf6ea`; under the sheet the marigold share press (`buttonClass("share")`) and download as a quiet link; guest gets one sindoor press to start their own snan. **Step 4:** green. **Step 5:** Commit.

---

### Task 12: The snan

**Files:** `src/components/snan/Sitting.tsx`, `src/components/snan/SittingLoop.tsx`, `src/content/today.ts`. Test: `tests/unit/sitting-phase.test.ts` (extend), `tests/e2e/cta.spec.ts`.

**Interfaces:** Consumes `<Gauge>`, `<RiverHorizon night breathe>`, `<Seal kind="morning">`, `<Band>`, `buttonClass`, `PatraView.morning` (via the mint result), `sitting-plan.ts` durations (unchanged).

- [ ] **Step 1:** Failing tests: `today.ts` en strings equal the spec 7.2 table (`ready` "Your {river}, this morning.", band "Three minutes. Phone on silent.", stillness "Be still with the river.", mark "Snan done.", after "Your family will want to see this.", cta "Send it to the family"); no string in `today.ts` matches `/of 1[1]|\bpack\b/i`; `sitting-plan.test.ts` untouched and green.
- [ ] **Step 2:** FAIL. **Step 3:** Rebuild per spec 6.4: river at the foot of every part (night river in the stillness on `#0b0a08`); reading = sindoor capitals river name, state, plain line, gauge, small figure-and-rank row; breath scales the waves 4s up / 6s down via `breathe`, In/Out in capitals (Out in teal); hold = paper press filling with sindoor over the hold duration; mark = "Snan done.", the written line, the morning seal with `stamp` (from the second morning), the marigold press linking to `/p/[id]?new=1`; auto-advance unchanged. Remove `Diya`, `Petals`, `.warm` here. **Step 4:** green; sit once on the preview with a test account (Task 0), day and night. **Step 5:** Commit.

---

### Task 13: `/begin`, sign-in, setup

**Files:** `src/components/pages/Begin.tsx`, `src/content/begin.ts`, `src/components/setup/SetupForm.tsx`, `src/content/setup.ts`, `src/components/ClerkThemed.tsx`, `src/lib/clerk-look.ts`, `src/components/site/Steps.tsx`. Test: `tests/e2e/cta.spec.ts`.

- [ ] **Step 1:** Failing e2e: `/begin` shows one `.press`, one `[data-band]`, one `[data-label]` (the eleven pack) and the price seal; setup choices are `.press-choice` with `aria-pressed`.
- [ ] **Step 2:** FAIL. **Step 3:** Per spec 6.3; Clerk appearance takes `PALETTE` and the press for its primary button; copy per 7.2 ("Pick your mornings. Eleven for eleven.", "Pay once. Use them any morning you like."). **Step 4:** green. **Step 5:** Commit.

---

### Task 14: Reference pages and the 404

**Files:** `src/components/pages/{LiveRivers,RiversIndex,RiverDetail,Panchang,CityPanchang,Shraddha,MuhuratIndex,MuhuratDetail,Kumbh,Faq,About,Legal,CityFinder}.tsx`, `src/components/NotFoundPage.tsx`, `src/components/live/LiveHero.tsx`, their content modules. Test: `tests/e2e/smoke.spec.ts` (add these paths at 360/390/430), `tests/unit/copy-guard.test.ts`.

- [ ] **Step 1:** Failing e2e: every listed route has the strip in the masthead, one capitals `h1`, at most one `.press`, zero `[data-band]`, zero `[data-label]`, and no sideways scroll at 360/390/430.
- [ ] **Step 2:** FAIL. **Step 3:** Per spec 6.6: `/live` and river pages show each river as name, state, plain line, gauge, then the figure-and-rank row with its source line (the copy-guard split unchanged); tables on `bg-paper2` with hairlines; festival panel (maroon, haldi double rule) only on `/kumbh` and an occasion inside its window. Remove remaining marks. **Step 4:** green. **Step 5:** Commit.

---

### Task 15: `/account`

**Files:** `src/components/pages/Account.tsx`, `src/content/account.ts`. Test: `tests/e2e/cta.spec.ts` (signed-out redirect unchanged) and a unit render of the register rows.

- [ ] **Step 1:** Failing test: the register renders one row per morning, newest first, each with date, water and `nthMorning(n)` in sindoor; mornings left in plain words via `countLine`.
- [ ] **Step 2:** FAIL. **Step 3:** Per spec 6.7. **Step 4:** green. **Step 5:** Commit.

---

### Task 16: Email

**Files:** `src/lib/email.ts`, `src/content/email.ts`; create `scripts/email-art.mjs` (renders `public/email/river-600x120.png` and `public/email/logo-480.png` from `river-geometry.ts` and `Logo.tsx`). Test: `tests/unit/reminders.test.ts` (extend).

- [ ] **Step 1:** Failing test: the reminder HTML has a capitals headline with the river in `#c8251d`, a five-cell gauge table with exactly one cell marked today (none when `percentile` is null), the small figure row, one button cell with `border-right:4px solid #141210;border-bottom:4px solid #141210`, the river PNG above the footer, no mauli border, and no word matching `/streak|in a row|missed|of 1[1]/i`.
- [ ] **Step 2:** FAIL. **Step 3:** Per spec 6.8; run `node scripts/email-art.mjs`. **Step 4:** green; send one reminder to the owner's test inbox from the preview. **Step 5:** Commit.

---

### Task 17: The link card and Open Graph

**Files:** `src/lib/site-card.ts`, `src/lib/seo.ts` (`SITE_CARD_VERSION`), `src/app/[lang]/opengraph-image.tsx`, `tests/unit/og-image.test.ts` (`ROUTE_SHA256`).

- [ ] **Step 1:** Change `site-card.ts` to paper, the capitals headline per locale, `RiverHorizon` geometry with the sun; bump `SITE_CARD_VERSION` (16 hex of the new card's SHA-256, as today).
- [ ] **Step 2:** `npm run build`, then update `ROUTE_SHA256` to the route file's new SHA-256. **Step 3:** `npm test` green. **Step 4:** Commit `design-v3: the link card`.

---

### Task 18: The voice pass

**Files:** every content module in `tests/unit/copy-guard.test.ts`'s `MODULES`; `tests/unit/copy-guard.test.ts`.

- [ ] **Step 1:** Failing test: add `OFF_LIMITS = /holy (dip|water)|punya|on your behalf|as good as being there|measured at the ghat|passes the ghat|most people/i` and assert no shipped string matches; assert `MARKETING` h1/lede strings stay under `MAX_WORDS` (40).
- [ ] **Step 2:** FAIL if any string trips. **Step 3:** Rewrite remaining strings per spec 7.2 rules (lead with the verb, bold and true, simple, reverent; Hindi in everyday words with "आप"). **Step 4:** green. **Step 5:** Commit.

---

### Task 19: The ads

**Files:** `ads/src/copy.mjs`, `ads/src/plain.html`, `ads/src/loud.html`, `ads/src/campaign.html`, renderers; `ads/README.md`.

- [ ] **Step 1:** `grep -rnE '#(f6c518|d1261c|1a1410|e2a93b|b32620)' ads/src` → hits.
- [ ] **Step 2:** Replace with spec 3 values (`#f2c230`, `#c8251d`, `#141210`, `#e3962b`); swap the logo for the v3 mark and wordmark.
- [ ] **Step 3:** Re-run every renderer and `cut-video.sh`; the grep in Step 1 returns nothing. **Step 4:** Commit the templates and renders. Meta stays untouched (spec 6.10).

---

### Task 20: Docs, retirement, review, cutover

**Files:** `DESIGNSYSTEM.md` (rewritten to the spec), `CLAUDE.md` (spec 8 lines), `plan.md`, `src/components/marks/index.tsx` (delete all but `Bindu`).

- [ ] **Step 1:** `grep -rnE 'Tilak|Kumkum|Mauli|Diya|Petals|impress|flicker|\bwarm\b' src` → empty; delete the retired marks.
- [ ] **Step 2:** Rewrite `DESIGNSYSTEM.md` from the spec (palette, type, kit, river, surfaces, motion, voice, mobile first, checklist with "one press"); apply the spec 8 edits to `CLAUDE.md`; move the v3 item in `plan.md` to "waits for the owner's eyes".
- [ ] **Step 3:** `npm test && npx tsc --noEmit && npm run lint && npm run build && npx playwright test` → all green. Commit.
- [ ] **Step 4:** Send the owner the preview URL with a surface checklist (landing, /snan, /begin, setup, the snan, the Patra and /p/[id], account, reference pages, an email, the link card, icons) in both locales. **Stop here until he says go.**
- [ ] **Step 5 (on his go):** merge `design-v3` into `main`, push, watch the production deploy, run the smoke and fold e2e against `https://www.snanify.com`.

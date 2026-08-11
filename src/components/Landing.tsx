import Link from "next/link";
import { content } from "@/lib/content";
import { RIVERS } from "@/content/rivers";
import { DATED_OCCASIONS } from "@/content/muhurat";
import { deepHref, deepLang, pickDeep, type Lang } from "@/lib/locales";
import { Mark } from "@/components/Logo";
import { RiverFlow } from "@/components/RiverFlow";
import { Reveal } from "@/components/Reveal";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  StructuredData,
  organization,
  webPage,
  website,
} from "@/components/StructuredData";
import { CTA, Eyebrow, LinkButton, Section, SectionHeader, StatusBadge } from "@/components/ui";

/** Devanagari numerals in the Hindi edition, as a printed panchang sets them. */
const DEVA = "०१२३४५६७८९";
function numeral(n: number, lang: Lang): string {
  const s = String(n).padStart(2, "0");
  return lang === "hi" ? [...s].map((d) => DEVA[Number(d)]).join("") : s;
}

/**
 * The front page of the digital product.
 *
 * BUILT FOR 390px FIRST. Over nine in ten readers arrive on a phone, so every
 * block here is designed at 390 x 844 and widened afterwards, not the other way
 * round. The rules that produced this layout, so they survive the next edit:
 *
 *  · Nothing may scroll horizontally. There is not a single `min-w-` table on
 *    this page; the tariff, the calendar and the five limbs are all ruled rows
 *    that stack on a phone and become columns from `sm` upward.
 *  · The hero is bottom-aligned inside `86svh` so the headline sits high and the
 *    two buttons land under the thumb rather than under the masthead. `svh`, not
 *    `vh`, because mobile browser chrome makes `vh` overshoot.
 *  · A ruled bar is fixed to the bottom edge on small screens carrying the hero
 *    SKU and its price. It is the thumb-reachable primary action for the whole
 *    page; the spacer at the very bottom keeps it off the imprint.
 *  · Every tappable thing clears 44px. Buttons carry `!py-4` on the phone.
 *  · Body copy never drops below 0.875rem. `label` is used for labels only.
 *
 * The river SVG is confined to a band beneath the headline on a phone: full
 * bleed at that size would put the sun through the type and paints far more
 * pixels than a mid-range Android wants at 60fps.
 */
export function Landing({ lang }: { lang: Lang }) {
  const t = content[lang];

  return (
    <>
      {/* The home page is where the Organization and WebSite nodes are anchored;
          every other page references them by @id. */}
      <StructuredData
        graph={[
          organization(lang),
          website(),
          webPage({
            lang,
            path: "/",
            name: t.meta.title,
            description: t.meta.description,
          }),
        ]}
      />

      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath="/" ctaTo="#sankalp" />

      <main>
        {/* ------------------------------------------------ front page ----
            Badge, headline, lede, buttons, price. Nothing else: the register
            and the figures move to their own band below so that the two
            buttons stay within reach of a thumb at 844px tall.            */}
        {/* The waterline is anchored under the headline rule (see
            `data-horizon-anchor` below and the note in RiverFlow), so the
            masthead and the headline are always on sky and never cut by the
            horizon, whatever the viewport does and however the headline wraps
            in twelve languages. */}
        <section className="relative flex min-h-[92svh] flex-col overflow-hidden border-b-2 border-rulestrong sm:min-h-[86svh] sm:justify-end">
          {/* Wide: a full-bleed panorama behind the type, its channel kept
              narrow and far right so the left column stays clean paper. */}
          <RiverFlow
            variant="panorama"
            anchorSelector="[data-horizon-anchor]"
            className="absolute inset-0 hidden h-full w-full text-ink sm:block"
          />

          <div className="relative mx-auto w-full max-w-6xl px-5 pt-8 pb-28 sm:px-8 sm:pt-28 sm:pb-16">
            <div className="flex max-w-3xl flex-col">
              <div className="ink-in order-1 max-w-full">
                <StatusBadge live>{t.hero.badge}</StatusBadge>
              </div>

              <h1
                className="ink-in display order-2 mt-6 text-[2.65rem] leading-[1.02] sm:mt-7 sm:text-[4rem] lg:text-[5.4rem]"
                style={{ animationDelay: "80ms" }}
              >
                {t.hero.titleA} <span className="text-spot">{t.hero.titleB}</span>
              </h1>

              {/* The printed rule and the waterline are the same line of
                  thought: everything above it is sky. */}
              <div data-horizon-anchor className="rule-double order-3 mt-6 max-w-xl sm:mt-8" />

              {/* Phone only: the river gets a band of its own, above the fold,
                  with nothing set over it. Full bleed through the container's
                  own gutter. At this size the panorama above is display:none,
                  so only one of the two ever animates. */}
              <div className="relative order-4 -mx-5 mt-6 h-[30svh] max-h-[320px] min-h-[210px] sm:hidden">
                <RiverFlow
                  variant="portrait"
                  className="absolute inset-0 h-full w-full text-ink"
                />
              </div>

              {/* Stacked and full width on a phone, so both are a comfortable
                  target and neither is a 90px pill in a corner. On a phone they
                  sit directly under the river, which puts the primary action
                  inside the first screen instead of a scroll below it. */}
              <div
                className="ink-in order-5 mt-7 flex flex-col gap-3 sm:order-6 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center"
                style={{ animationDelay: "240ms" }}
              >
                <a href="#sankalp" className="block">
                  <CTA className="w-full !py-4 sm:w-auto">{t.hero.ctaPrimary}</CTA>
                </a>
                <a href="#form" className="block">
                  <CTA variant="ghost" className="w-full !py-4 sm:w-auto">
                    {t.hero.ctaSecondary}
                  </CTA>
                </a>
              </div>

              <p
                className="ink-in order-6 mt-7 max-w-xl text-[1.02rem] leading-[1.7] text-ink2 sm:order-5 sm:mt-5 sm:text-[1.05rem] sm:leading-[1.75]"
                style={{ animationDelay: "160ms" }}
              >
                {t.hero.lede}
              </p>

              {/* The offer, stated in the hero rather than buried in the
                  tariff. A price is a fact about the thing, not a reveal. */}
              <p
                className="ink-in order-7 mt-7 max-w-xl border-l-2 border-spot pl-4 text-sm leading-[1.75] text-ink2"
                style={{ animationDelay: "320ms" }}
              >
                {t.hero.offer}
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ the reading ---
            The live river is the product, so it is the first thing under the
            headline: the day's entry, printed on paper laid over the water. */}
        <section className="tint border-b-2 border-rulestrong">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1fr_20rem] lg:gap-12">
            <div className="boxed bg-paper p-5 sm:p-7">
              <p className="label text-spot">{t.hero.card.label}</p>
              <p className="display mt-2 text-[1.7rem] leading-tight sm:text-3xl">
                {t.hero.card.title}
              </p>

              <dl className="mt-4 border-t border-rule">
                {t.hero.card.rows.map((r) => (
                  <div
                    key={r.k}
                    className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-b border-rule py-3 last:border-b-0 sm:grid-cols-[9rem_1fr]"
                  >
                    <dt className="label text-ink2">{r.k}</dt>
                    <dd className="text-sm leading-snug text-ink sm:text-right">{r.v}</dd>
                  </div>
                ))}
              </dl>

              <Link
                {...deepHref(lang, "/rivers")}
                className="label mt-3 inline-flex min-h-[44px] items-center text-spot underline decoration-rule decoration-1 underline-offset-4 transition-colors hover:decoration-spot"
              >
                {t.hero.card.link}
              </Link>
            </div>

            {/* Ruled rows at every width. Three columns of figures at 390px
                would break "1,20,000+" across two lines. */}
            <dl className="border-t-2 border-rulestrong">
              {t.hero.stats.map((s) => (
                <div
                  key={s.l}
                  className="flex items-baseline justify-between gap-5 border-b border-rule py-3.5"
                >
                  <dt className="display text-[1.7rem] leading-none text-ink">{s.n}</dt>
                  <dd className="label max-w-[11rem] text-right text-ink2">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ------------------------------------------------ procedure ----- */}
        <Section id="how">
          <Reveal>
            <SectionHeader eyebrow={t.how.eyebrow} title={t.how.title} />

            <ol className="mt-10 grid gap-px border-2 border-rulestrong bg-rule md:grid-cols-3">
              {t.how.steps.map((s, i) => (
                <li key={s.n} className="tint p-6 sm:p-7">
                  <span className="display block text-4xl text-spot">{numeral(i + 1, lang)}</span>
                  <div className="rule-thin mt-4" />
                  <h3 className="display mt-4 text-2xl">{s.t}</h3>
                  <p className="mt-3 text-sm leading-[1.75] text-ink2">{s.d}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </Section>

        {/* ------------------------------------------------ the form ------
            The four and a half minutes, set out limb by limb. Nobody guesses
            that a fifth of a devotional product is a black screen, so the
            ninety seconds are printed as a reverse block rather than as a
            bullet: it is the strongest thing in the product.

            The clock and the lengths agree with docs/digital/experience.md:
            4s transition, 21s reading, 60s breath, 60s sankalp, 90s stillness,
            35s mark, which is 270 seconds. Change one and change them all. */}
        <Section id="form" tinted>
          <Reveal>
            <SectionHeader eyebrow={t.form.eyebrow} title={t.form.title} lede={t.form.lede} />

            <ol className="mt-10 border-t-2 border-rulestrong">
              {t.form.limbs.map((l) => (
                <li
                  key={l.name}
                  className="grid grid-cols-[3.25rem_1fr] gap-x-4 gap-y-2 border-b border-rule py-5 sm:grid-cols-[4.5rem_13rem_1fr] sm:gap-x-8"
                >
                  <span className="label tabular pt-2 text-spot">{l.clock}</span>
                  <div>
                    <h3 className="display text-xl sm:text-2xl">{l.name}</h3>
                    <p className="label mt-1.5 text-ink2">
                      {l.alt} · {l.len}
                    </p>
                  </div>
                  <p className="col-start-2 text-sm leading-[1.75] text-ink2 sm:col-start-3">
                    {l.d}
                  </p>
                </li>
              ))}
            </ol>

            {/* the black screen, printed as a black screen */}
            <div className="mt-10 border-2 border-rulestrong bg-ink p-6 text-paper sm:p-8">
              <p className="label text-spot">{t.form.pull.label}</p>
              <p className="display mt-3 max-w-2xl text-[1.55rem] leading-tight sm:text-[2.1rem]">
                {t.form.pull.title}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-[1.8]">{t.form.pull.body}</p>
            </div>

            <p className="mt-6 max-w-2xl text-sm leading-[1.75] text-ink2">{t.form.note}</p>
          </Reveal>
        </Section>

        {/* ------------------------------------------------ the six ------- */}
        <Section id="rivers">
          <Reveal>
            <SectionHeader
              eyebrow={t.rivers.eyebrow}
              title={t.rivers.title}
              lede={t.rivers.lede}
            />

            {/* a register, not a card grid */}
            <ul className="mt-10 border-t-2 border-rulestrong">
              {RIVERS.map((r, i) => (
                <li key={r.slug}>
                  {/* The six water pages are English and Hindi only, so from a
                      Tamil landing page this link goes to the English one and
                      says so; see `deepHref` in src/lib/locales.ts. */}
                  <Link
                    {...deepHref(lang, `/rivers/${r.slug}`)}
                    className="group grid grid-cols-[2.75rem_1fr] items-baseline gap-x-4 gap-y-1 border-b border-rule py-5 transition-colors hover:bg-paper3 sm:grid-cols-[3.5rem_14rem_1fr_auto] sm:gap-x-8"
                  >
                    <span className="display text-xl text-spot">{numeral(i + 1, lang)}</span>
                    <span className="display text-2xl text-ink">{pickDeep(r.river, lang)}</span>
                    <span className="col-start-2 text-sm text-ink2 sm:col-start-auto">
                      {pickDeep(r.ghat, lang)}, {pickDeep(r.city, lang)}
                    </span>
                    <span className="label col-start-2 text-ink2 sm:col-start-auto sm:text-right">
                      {pickDeep(r.state, lang)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        {/* ------------------------------------------------ calendar ------
            A ruled register rather than a <table>: at 390px a three-column
            table is a horizontal scroller, and these are six links, not a
            dataset. The column heads only appear once the columns do.     */}
        <Section id="muhurat" tinted>
          <Reveal>
            <SectionHeader
              eyebrow={t.muhurat.eyebrow}
              title={t.muhurat.title}
              lede={t.muhurat.lede}
            />

            <div className="mt-10 hidden border-b-2 border-rulestrong pb-2.5 sm:grid sm:grid-cols-[15rem_1fr_9rem] sm:gap-6">
              <span className="label text-ink2">{t.muhurat.heads.occasion}</span>
              <span className="label text-ink2">{t.muhurat.heads.reckoning}</span>
              <span className="label text-right text-ink2">{t.muhurat.heads.window}</span>
            </div>

            <ul className="mt-10 border-t-2 border-rulestrong sm:mt-0 sm:border-t-0">
              {DATED_OCCASIONS.slice(0, 6).map((o) => (
                <li key={o.slug}>
                  <Link
                    {...deepHref(lang, `/muhurat/${o.slug}`)}
                    className="grid gap-1.5 border-b border-rule py-4 transition-colors hover:bg-paper3 sm:grid-cols-[15rem_1fr_9rem] sm:items-baseline sm:gap-6"
                  >
                    <span className="display text-xl text-ink underline decoration-rule decoration-1 underline-offset-4">
                      {pickDeep(o.name, lang)}
                    </span>
                    <span
                      className="text-sm leading-snug text-ink2"
                      lang={deepLang(lang)}
                    >
                      {pickDeep(o.occurrence.note, lang)}
                    </span>
                    <span className="label text-ink2 sm:text-right" lang={deepLang(lang)}>
                      {pickDeep(o.occurrence.label, lang)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-sm leading-relaxed text-ink2">{t.muhurat.note}</p>
          </Reveal>
        </Section>

        {/* ------------------------------------------------ tariff --------
            Paid only, three lines, both ladders printed side by side on every
            one of them. The free register comes first because it is the larger
            half of the offer and because it is what makes the paid half easy
            to state: content is free, the snan is paid.

            Every per-snan figure is arithmetic on the price above it and is
            documented in src/lib/content.ts. The middle line is the one to
            take, so it is the one that carries the flag and the paper3 ground.
            Keep it in the middle: on a phone these are three stacked rows and
            the middle row is where the eye lands.                          */}
        <Section id="sankalp">
          <Reveal>
            <SectionHeader
              eyebrow={t.pricing.eyebrow}
              title={t.pricing.title}
              lede={t.pricing.lede}
            />

            <div className="mt-12">
              <Eyebrow>{t.pricing.free.label}</Eyebrow>
            </div>

            <ul className="mt-5 border-t-2 border-rulestrong">
              {t.pricing.free.items.map((f) => (
                <li key={f.name}>
                  <Link
                    {...deepHref(lang, f.href)}
                    className="grid gap-1 border-b border-rule py-4 transition-colors hover:bg-paper3 sm:grid-cols-[15rem_1fr] sm:items-baseline sm:gap-6"
                  >
                    <span className="display text-xl text-ink underline decoration-rule decoration-1 underline-offset-4">
                      {f.name}
                    </span>
                    <span className="text-sm leading-[1.7] text-ink2">{f.d}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-sm text-ink2">{t.pricing.free.note}</p>

            {/* the three lines: stacked ruled rows on a phone, three columns
                from lg, hairlines drawn by the gap over an inked ground */}
            <div className="mt-14 grid gap-px border-2 border-rulestrong bg-rule lg:grid-cols-3">
              {t.pricing.tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`flex flex-col p-6 sm:p-7 ${tier.flag ? "bg-paper3" : "tint"}`}
                >
                  <p className={`label ${tier.flag ? "text-spot" : "text-ink2"}`}>
                    {tier.flag || tier.sub}
                  </p>

                  <div className="mt-2 flex items-baseline justify-between gap-4">
                    <h3 className="display text-[1.7rem] leading-tight sm:text-2xl">
                      {tier.name}
                    </h3>
                    <span className="label text-ink2">{tier.alt}</span>
                  </div>

                  {/* both currencies, always, never a geo switch */}
                  <div className="mt-5 grid grid-cols-2 border-y border-rule">
                    <div className="border-r border-rule py-4 pr-4">
                      <p className="display text-[2rem] leading-none text-spot">{tier.world}</p>
                      <p className="label mt-2 text-ink2">{t.pricing.heads.world}</p>
                    </div>
                    <div className="py-4 pl-4">
                      <p className="display text-[2rem] leading-none text-ink">{tier.india}</p>
                      <p className="label mt-2 text-ink2">{t.pricing.heads.india}</p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-[1.75] text-ink2">{tier.body}</p>

                  <dl className="mt-6 border-t border-rule">
                    {tier.rows.map((r) => (
                      <div
                        key={r.k}
                        className="flex justify-between gap-6 border-b border-rule py-2.5 last:border-b-0"
                      >
                        <dt className="label shrink-0 pt-0.5 text-ink2">{r.k}</dt>
                        <dd className="text-right text-sm leading-snug text-ink">{r.v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-px border-2 border-rulestrong bg-rule lg:grid-cols-2">
              <div className="tint p-6 sm:p-7">
                <p className="label text-spot">{t.pricing.ladders.label}</p>
                {t.pricing.ladders.body.map((p) => (
                  <p key={p} className="mt-4 text-sm leading-[1.75] text-ink2">
                    {p}
                  </p>
                ))}
              </div>

              <div className="bg-paper3 p-6 sm:p-7">
                <p className="label text-spot">{t.pricing.truth.label}</p>
                <p className="mt-4 text-[1.02rem] leading-[1.8] text-ink">
                  {t.pricing.truth.body}
                </p>
              </div>
            </div>

            <p className="mt-7 max-w-3xl text-sm leading-[1.75] text-ink2">{t.pricing.note}</p>

            <div className="mt-8">
              <LinkButton
                {...deepHref(lang, "/snan")}
                variant="ghost"
                className="w-full !py-4 sm:w-auto"
              >
                {t.pricing.cta}
              </LinkButton>
            </div>
          </Reveal>
        </Section>

        {/* ------------------------------------------------ colophon ------ */}
        <section className="border-t-2 border-rulestrong">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-24">
            <Mark className="mx-auto h-12 w-12 text-ink" />
            <div className="rule-double mt-8" />
            <h2 className="display mt-8 text-[2rem] leading-tight sm:text-[3.2rem]">
              {t.closing.title}
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[1.02rem] leading-[1.75] text-ink2">
              {t.closing.lede}
            </p>
            <a href="#sankalp" className="mt-9 block sm:inline-block">
              <CTA className="w-full !py-4 sm:w-auto sm:!px-10">{t.closing.cta}</CTA>
            </a>
          </div>
        </section>
      </main>

      <Footer lang={lang} />

      {/* ------------------------------------------------ thumb rail ----
          The phone's primary action, kept at the bottom edge where the thumb
          is, carrying the hero SKU and its price in both currencies. Set as a
          ruled bar on paper, not a floating pill. Hidden from `sm` up, where
          the buttons in the flow are already reachable.                   */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-rulestrong bg-paper sm:hidden">
        <div className="flex items-center justify-between gap-4 px-5 py-2.5">
          <div className="min-w-0">
            <p className="label text-ink2">{t.bar.label}</p>
            <p className="display mt-0.5 truncate text-lg leading-tight text-ink">
              {t.bar.price}
            </p>
          </div>
          <a
            href="#sankalp"
            className="label flex min-h-[48px] shrink-0 items-center bg-spot px-7 text-paper transition-colors hover:bg-ink"
          >
            {t.bar.cta}
          </a>
        </div>
      </div>
      {/* keeps the imprint clear of the rail */}
      <div className="h-[4.75rem] sm:hidden" aria-hidden="true" />
    </>
  );
}

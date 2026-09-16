import Link from "next/link";
import { content } from "@/lib/content";
import { RIVERS } from "@/content/rivers";
import { deepHref, type Lang } from "@/lib/locales";
import { waterName } from "@/content/names";
import { Mark } from "@/components/Logo";
import { RiverFlow } from "@/components/RiverFlow";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  StructuredData,
  organization,
  webPage,
  website,
} from "@/components/StructuredData";
import { PastHero } from "@/components/site/PastHero";
import { Specimen } from "@/components/Specimen";
import { CTA, LinkButton, Price, Section } from "@/components/ui";
import { PER_SNAN, PRICE, type TierKey } from "@/content/prices";

/**
 * The front page of the digital product.
 *
 * BUILT FOR 390px FIRST. Over nine in ten readers arrive on a phone, so every
 * block here is designed at 390 x 844 and widened afterwards, not the other way
 * round. The rules that produced this layout, so they survive the next edit:
 *
 *  · Nothing may scroll horizontally. There is not a single `min-w-` table on
 *    this page; the tariff and the six waters are ruled rows that stack on a
 *    phone and become columns from `sm` upward.
 *  · The hero is bottom-aligned inside `86svh` so the headline sits high and the
 *    two buttons land under the thumb rather than under the masthead. `svh`, not
 *    `vh`, because mobile browser chrome makes `vh` overshoot.
 *  · A ruled bar is fixed to the bottom edge on small screens carrying the hero
 *    SKU and its price. It is the thumb-reachable primary action for the whole
 *    page; the spacer at the very bottom keeps it off the imprint.
 *  · Every tappable thing clears 44px. Buttons carry `!py-4` on the phone.
 *  · Body copy never drops below 0.875rem.
 *
 * WHAT WAS TAKEN OFF THIS PAGE, and must stay off. It once carried the whole
 * kit that generated pages carry regardless of subject: a tracked caps label
 * with a red dash above every heading, a boxed badge joining three facts with
 * middle dots, a fade-and-rise on every section as it scrolled in, numbered
 * markers on a list that is not a sequence, half the headline in red, a row of
 * three big figures with small captions, and a labelled box explaining "what
 * you are buying, exactly". Each of those is a default, and together they made
 * the page read as a template. The small caps voice now appears only where it
 * does a job: as the column head of a ruled data row, and on a button.
 *
 * The river SVG is confined to a band beneath the headline on a phone: full
 * bleed at that size would put the sun through the type and paints far more
 * pixels than a mid-range Android wants at 60fps.
 */
/**
 * What the reading shows, built on the server from the day's snapshot.
 *
 * It used to be four hardcoded strings under a heading reading "The river,
 * now", which is precisely the thing this repo forbids: a fabricated reading
 * presented as fact. The figures are real now, and the card says which day the
 * model published for rather than implying an hour.
 */
export type LiveCard = {
  /** One sentence for the top of the page: the river, the flow, the day. */
  line: string;
  title: string;
  rows: { k: string; v: string }[];
};

export function Landing({ lang, live }: { lang: Lang; live: LiveCard }) {
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

      <PastHero />
      <Header lang={lang} currentPath="/" ctaAfterHero />

      <main>
        {/* ------------------------------------------------ front page ----
            One live sentence, headline, river, buttons, lede, price. Nothing
            else: the reading and the six waters move to their own bands below
            so the two buttons stay within reach of a thumb at 844px tall.  */}
        {/* The waterline is anchored under the headline rule (see
            `data-horizon-anchor` below and the note in RiverFlow), so the
            masthead and the headline are always on sky and never cut by the
            horizon, whatever the viewport does and however the headline wraps. */}
        {/* Capped at 56rem from `sm` up. The section fills the viewport so
            the horizon lands under the headline, but on a tall desktop display
            an uncapped 86svh is a thousand pixels of empty paper above the
            first word, which read as a broken page. */}
        <section className="relative flex min-h-[92svh] flex-col overflow-hidden border-b-2 border-rulestrong sm:min-h-[min(86svh,56rem)] sm:justify-end">
          {/* Wide: a full-bleed panorama behind the type, its channel kept
              narrow and far right so the left column stays clean paper. */}
          <RiverFlow
            variant="panorama"
            anchorSelector="[data-horizon-anchor]"
            sunAnchorSelector="[data-sun-anchor]"
            className="absolute inset-0 hidden h-full w-full text-ink sm:block"
          />

          <div className="relative mx-auto w-full max-w-6xl px-5 pt-8 pb-28 sm:px-8 sm:pt-28 sm:pb-16">
            <div className="flex flex-col">
              {/* The one live fact, as a sentence in body type. The filled
                  square is the site's mark for a figure that is live, and it
                  is the only ornament this line gets. */}
              <p className="ink-in order-1 flex max-w-xl items-baseline gap-2.5 text-sm leading-snug text-ink2 sm:text-[0.95rem]">
                <span className="mt-[0.05em] h-2 w-2 shrink-0 self-center bg-spot" aria-hidden="true" />
                <span>{live.line}</span>
              </p>

              {/* The headline runs the full measure and the sun is set into it
                  rather than beside it: the float below carries a circular
                  `shape-outside`, so the first line runs full width and every
                  line after it wraps around the disc. The sun is not drawn here;
                  RiverFlow finds this element and paints itself onto it, which
                  is why the whole composition is sized in `em` off the headline
                  and holds together at any measure and in any script. */}
              <h1
                data-horizon-anchor
                className="ink-in display order-2 mt-6 text-[2.65rem] leading-[1.02] sm:mt-7 sm:text-[4.6rem] lg:text-[7rem]"
                style={{ animationDelay: "80ms" }}
              >
                <span
                  data-sun-anchor
                  aria-hidden="true"
                  className="float-right hidden aspect-square w-[1.75em] sm:block"
                  style={{
                    /* One line down, so the first row keeps the full measure. */
                    marginTop: "calc(1lh + 0.35em)",
                    /* The lower half hangs out of the headline: an h1 that is a
                       flex item contains its floats, so without this the disc
                       adds its full height to the block and opens a hole under
                       the last line. Pulling half of it back also puts the
                       headline's bottom edge, and therefore the waterline
                       anchored to it, straight through the sun's centre, which
                       is what makes it read as setting into the water rather
                       than floating above it. */
                    marginBottom: "-0.875em",
                    marginRight: "1.2em",
                    shapeOutside: "circle(50%) border-box",
                    shapeMargin: "0.28em",
                  }}
                />
                {/* One colour for the whole headline. The second half used to
                    be set in the spot colour, which is the commonest tell of a
                    generated page. The sun carries the vermilion up here. */}
                {t.hero.titleA} {t.hero.titleB}
              </h1>

              {/* Phone only: the river gets a band of its own, above the fold,
                  with nothing set over it. Full bleed through the container's
                  own gutter. At this size the panorama above is display:none,
                  so only one of the two ever animates. */}
              <div className="relative order-4 -mx-5 mt-8 h-[30svh] max-h-[320px] min-h-[210px] sm:hidden">
                <RiverFlow
                  variant="portrait"
                  className="absolute inset-0 h-full w-full text-ink"
                />
              </div>

              {/* Stacked and full width on a phone, so both are a comfortable
                  target and neither is a 90px pill in a corner. On a phone they
                  sit directly under the river, which puts the primary action
                  inside the first screen instead of a scroll below it. */}
              {/* One solid button, marked so the masthead's Begin and the
                  thumb rail can wait for it to scroll off (PastHero). The
                  second action is a quiet link on a phone and a ruled button
                  from `sm`, where there is room beside the first. */}
              <div
                className="ink-in order-6 mt-7 flex flex-col gap-4 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center"
                style={{ animationDelay: "240ms" }}
              >
                <Link {...deepHref(lang, "/begin")} className="block" data-hero-cta>
                  <CTA className="w-full !py-4 sm:w-auto">{t.hero.ctaPrimary}</CTA>
                </Link>
                <Link
                  {...deepHref(lang, "/live")}
                  className="impress self-center text-[0.95rem] text-ink underline decoration-rule decoration-1 underline-offset-4 active:text-spot sm:hidden"
                >
                  {t.hero.ctaSecondary}
                </Link>
                <Link {...deepHref(lang, "/live")} className="hidden sm:block">
                  <CTA variant="ghost" className="!py-4">
                    {t.hero.ctaSecondary}
                  </CTA>
                </Link>
              </div>

              {/* The lede sits above the buttons at every width, so the
                  sentence saying what this is comes before the thing to press.
                  From `sm` up it sits below the horizon, over the water lines,
                  and type over hatching is unreadable: it gets a paper slip,
                  so it reads as printed on a card laid over the river rather
                  than engraved into it. The price line shares the slip. */}
              <div
                className="ink-in order-5 mt-7 max-w-xl sm:mt-5 sm:bg-paper sm:px-4 sm:py-3"
                style={{ animationDelay: "160ms" }}
              >
                <p className="text-[1.02rem] leading-[1.7] text-ink2 sm:text-[1.05rem] sm:leading-[1.75]">
                  {t.hero.lede}
                </p>
                {/* The offer, stated in the hero rather than buried in the
                    tariff. A price is a fact about the thing, not a reveal.
                    {price} is the eleven-morning line, in the reader's currency. */}
                <p className="mt-4 text-sm leading-[1.75] text-ink">
                  {t.hero.offer.split("{price}")[0]}
                  <Price prices={PRICE.eleven} className="display text-[1.15rem]" />
                  {t.hero.offer.split("{price}")[1]}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ the reading ---
            The live river is the product, so it is the first thing under the
            headline: the day's entry, printed on paper laid over the water.
            The river's own name is the heading; a label above it saying
            "the river, now" was saying what the rows already say.         */}
        <section className="tint border-b-2 border-rulestrong">
          <div className="mx-auto grid max-w-6xl gap-5 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-[minmax(0,42rem)_1fr] lg:gap-12">
            <div className="boxed bg-paper p-5 sm:p-7">
              <h2 className="display text-[1.7rem] leading-tight sm:text-3xl">{live.title}</h2>

              <dl className="mt-4 border-t border-rule">
                {live.rows.map((r) => (
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
                className="mt-4 inline-flex min-h-[44px] items-center text-sm text-ink underline decoration-rule decoration-1 underline-offset-4 transition-colors hover:decoration-spot"
              >
                {t.hero.card.link}
              </Link>
            </div>

            {/* The three figures the owner keeps on the page, as one sentence
                a reader can check rather than three big numbers in a row. A
                marginal note beside the card from lg, under it before that. */}
            <p className="max-w-sm text-sm leading-[1.7] text-ink2 lg:pt-1">{t.hero.record}</p>
          </div>
        </section>

        {/* ------------------------------------------------ the six ------- */}
        <Section id="rivers">
          <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:items-start lg:gap-20">
            <div>
              <div className="max-w-3xl">
                <h2 className="display text-[2.1rem] sm:text-[2.9rem]">{t.rivers.title}</h2>
                <p className="mt-4 max-w-2xl leading-relaxed text-ink2">{t.rivers.lede}</p>
              </div>

              {/* A register, not a card grid, and unnumbered: six waters are a
                  choice, not a sequence. */}
              <ul className="mt-10 border-t-2 border-rulestrong">
            {RIVERS.map((r) => (
              <li key={r.slug}>
                <Link
                  {...deepHref(lang, `/rivers/${r.slug}`)}
                  className="group impress grid gap-y-1 border-b border-rule py-5 hover:bg-paper3 active:bg-paper3 sm:grid-cols-[12rem_1fr_auto] sm:items-baseline sm:gap-x-8"
                >
                  <span className="display text-2xl text-ink">{waterName(r, "river", lang)}</span>
                  <span className="text-sm text-ink2">
                    {waterName(r, "ghat", lang)}, {waterName(r, "city", lang)}
                  </span>
                  <span className="text-sm text-ink2 sm:text-right">
                    {waterName(r, "state", lang)}
                  </span>
                </Link>
              </li>
            ))}
              </ul>
            </div>

            {/* The sheet itself, beside the waters it is drawn from. */}
            <Specimen lang={lang} className="lg:sticky lg:top-28" />
          </div>
        </Section>

        {/* ------------------------------------------------ tariff --------
            Three lines and one price. The reference pages sell nothing here;
            they are in the nav and the footer, where a reader looks for them.

            Every per-morning figure is arithmetic on the price above it and is
            documented in src/content/prices.ts. The middle line is the one to
            take, so it stands on the paper3 ground. Keep it in the middle: on
            a phone these are three stacked rows and the middle row is where
            the eye lands.                                                  */}
        <Section id="prices">
          <div className="max-w-3xl">
            <h2 className="display text-[2.1rem] sm:text-[2.9rem]">{t.pricing.title}</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink2">{t.pricing.lede}</p>
          </div>

          {/* the three lines: stacked ruled rows on a phone, three columns
              from lg, hairlines drawn by the gap over an inked ground */}
          {/* Eleven first on a phone and raised with the second impression;
              from lg the three sit side by side with eleven in the middle,
              where the eye lands. The count is the name, so each line needs
              only its price, its per-morning figure and one sentence. */}
          <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:items-start">
            {t.pricing.tiers.map((tier) => {
              const hero = tier.key === "eleven";
              return (
                <div
                  key={tier.name}
                  className={`flex flex-col border-2 border-rulestrong p-6 sm:p-7 ${
                    hero ? "misregister order-first bg-paper lg:order-none lg:-mt-3" : "tint"
                  }`}
                >
                  <h3 className="display text-[1.7rem] leading-tight sm:text-2xl">{tier.name}</h3>

                  {/* One price, in the reader's own currency. Every currency
                      ships in the markup and CSS shows one; see lib/currency.ts. */}
                  <p className={`display mt-5 leading-none text-ink ${hero ? "text-[3.2rem]" : "text-[2.4rem]"}`}>
                    <Price prices={PRICE[tier.key as TierKey]} />
                  </p>
                  <p className="mt-2 text-sm text-ink2">
                    <Price prices={PER_SNAN[tier.key as TierKey]} /> {t.pricing.labels.each}
                  </p>

                  <p className="mt-5 text-[0.98rem] leading-[1.7] text-ink2">{tier.body}</p>
                </div>
              );
            })}
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-[1.75] text-ink2">{t.pricing.note}</p>

          <div className="mt-8">
            <LinkButton
              {...deepHref(lang, "/snan")}
              variant="ghost"
              className="w-full !py-4 sm:w-auto"
            >
              {t.pricing.cta}
            </LinkButton>
          </div>
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
            <Link {...deepHref(lang, "/begin")} className="mt-9 block sm:inline-block">
              <CTA className="w-full !py-4 sm:w-auto sm:!px-10">{t.closing.cta}</CTA>
            </Link>
          </div>
        </section>
      </main>

      <Footer lang={lang} />

      {/* ------------------------------------------------ thumb rail ----
          The phone's primary action, kept at the bottom edge where the thumb
          is, carrying the hero SKU and its price in the reader's currency. Set
          as a ruled bar on paper, not a floating pill. Hidden from `sm` up,
          where the buttons in the flow are already reachable.             */}
      <aside
        aria-label={t.bar.label}
        data-until-scrolled="rail"
        className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-rulestrong bg-paper sm:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-2.5">
          <div className="min-w-0">
            <p className="text-xs text-ink2">{t.bar.label}</p>
            <p className="display mt-0.5 truncate text-lg leading-tight text-ink">
              <Price prices={PRICE.eleven} />
            </p>
          </div>
          <Link
            {...deepHref(lang, "/begin")}
            className="label impress flex min-h-[48px] shrink-0 items-center bg-spot px-7 text-paper hover:bg-ink active:bg-ink"
          >
            {t.bar.cta}
          </Link>
        </div>
      </aside>
      {/* keeps the imprint clear of the rail */}
      <div className="h-[4.75rem] sm:hidden" aria-hidden="true" />
    </>
  );
}

import Link from "next/link";
import { content } from "@/lib/content";
import { RIVERS } from "@/content/rivers";
import { localePath, type Lang } from "@/lib/locales";
import { waterName } from "@/content/names";
import type { FlowBand } from "@/lib/riverdata";
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
import { Band, Gauge, Label, RiverHorizon, Seal } from "@/components/kit";
import { CTA, CurrencyLine, Price, TaxNote } from "@/components/ui";
import { PER_SNAN, PRICE, type TierKey } from "@/content/prices";

/**
 * The front page of the digital product (spec 6.1, approved mock
 * docs/design/v3-mockups/landing-v7.html).
 *
 * BUILT FOR 390px FIRST, AND THE FOLD IS A CONTRACT. Readers arrive from Meta
 * ads inside the Instagram and Facebook browsers, which leave about 390 x 660
 * of page. Five things sit above that line, in this order, the press included,
 * in both editions, and above 640 at 360 wide (tests/e2e/fold.spec.ts):
 *
 *  1. the masthead over the strip (the Header),
 *  2. the headline in capitals, the river in sindoor,
 *  3. the band, the one thing to do,
 *  4. the price seal and the short pitch,
 *  5. the press.
 *
 * If something must give, the band shortens first. Below the fold: the full
 * river with its sun, the reading as a gauge with the small figure row, the
 * specimen sheet in its phone, the six waters as a list, the packs (eleven on
 * the label, one and sixty as plain rows), and the footer.
 *
 * From `lg` up the page stays ONE centred column, scaled up, never two: the
 * capitals larger, the band running the full width of the window, the seal
 * and the pitch, the press; then the river as a full-width panorama, the
 * reading under it, and the specimen phone centred in its own section.
 * Desktop uses its width for the river and the type, not a second column.
 *
 * One press per screen: the hero's. The masthead's Begin waits for it to
 * scroll off (PastHero). The eleven pack carries the only other press, far
 * below it.
 */

/** What the reading shows, built on the server from the day's snapshot. */
export type LiveCard = {
  /** The hero water's name in this locale, for the headline. */
  river: string;
  /** "Ganga, Har Ki Pauri". */
  title: string;
  /** The morning's percentile, or null when the feed is quiet. */
  percentile: number | null;
  band: FlowBand | null;
  /** The small proof under the gauge: "797 m³/s, 86th percentile since 1997". */
  figure: string;
  /** "Next muhurat 04:24 IST", when the sky has one. */
  muhurat: string | null;
};

/* h2 and h3 are sentence case, Eczar 700 (the plan's global constraints). */
const H2 = "display text-[1.75rem] leading-[1.12] sm:text-[2.25rem]";
const W700 = { fontWeight: 700 } as const;

export function Landing({ lang, live }: { lang: Lang; live: LiveCard }) {
  const t = content[lang];
  const hi = lang === "hi";
  const [lead, tail] = t.hero.title.split("{river}");
  const packHref = (key: string) => `${localePath(lang, "/begin")}?pack=${key}`;

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
        {/* The band overhangs the column and its turn lifts the corners, so
            the section clips sideways; the page never scrolls at 390. */}
        <section className="overflow-x-clip">
          <div className="mx-auto max-w-md px-5 lg:max-w-4xl lg:px-8 lg:text-center">
            {/* -------------------------------------- above the fold ---
                Capitals in Latin; Devanagari has no case and takes its
                own leading, set inline because the script rule for
                .display sits outside the utility layer. */}
            <h1
              className={`display pt-5 text-ink sm:pt-10 lg:pt-16 ${
                hi
                  ? "text-[2.25rem] sm:text-[2.6rem] lg:text-[4.25rem]"
                  : "text-[2.35rem] uppercase min-[380px]:text-[2.5rem] sm:text-[2.85rem] lg:text-[5.25rem]"
              }`}
              style={{ fontWeight: 800, lineHeight: hi ? 1.22 : 0.95, letterSpacing: hi ? 0 : "-0.01em" }}
            >
              {lead}
              <span className="text-sindoor">{live.river}</span>
              {tail}
            </h1>

            {/* On a phone the band overhangs the gutter; from lg it runs the
                full width of the window (the bleed is half of what the
                column leaves), and the section clips its turned corners. */}
            <Band
              className="mt-4 [--band-bleed:1.25rem] lg:mt-8 lg:py-3 lg:text-[1.375rem] lg:[--band-bleed:calc((100vw_-_100%)/2)]"
              bleed="var(--band-bleed)"
            >
              {t.hero.band}
            </Band>

            <div className="mt-5 flex items-center gap-4 lg:mt-12 lg:justify-center lg:gap-8">
              <div className="shrink-0 lg:scale-[1.35]">
                <Seal kind="price" prices={PRICE.eleven} lang={lang} />
              </div>
              <p className="text-[0.9375rem] leading-[1.45] text-ink lg:max-w-md lg:text-left lg:text-[1.25rem]">
                {t.hero.pitch} <strong style={{ fontWeight: 800 }}>{t.hero.push}</strong>
              </p>
            </div>

            {/* The press, full column width and thumb-sized. data-hero-cta
                lets the masthead's Begin wait for it to scroll off;
                data-hero-press is what the fold test measures. */}
            <Link
              href={localePath(lang, "/begin")}
              className="mt-5 flex lg:mx-auto lg:mt-12 lg:max-w-md"
              data-hero-cta
              data-hero-press
            >
              <CTA className="w-full">{t.hero.ctaPrimary}</CTA>
            </Link>
          </div>

          {/* ------------------------------------------ the river ----
              The full river, the sun cut by its horizon: full bleed on a
              phone, a panorama the width of the window from lg. */}
          <div className="mx-auto mt-14 max-w-md lg:mt-24 lg:max-w-none">
            <div className="lg:hidden">
              <RiverHorizon height={156} />
            </div>
            <div className="hidden lg:block">
              <RiverHorizon height={280} />
            </div>
          </div>

          {/* ----------------------------------------- the reading ---
              The state, one plain sentence and the gauge lead; the
              exact figure sits under it in one small row. */}
          <div className="mx-auto max-w-md px-5 pt-6 pb-14 lg:max-w-2xl lg:px-8 lg:pt-12 lg:pb-24 lg:text-center">
            <h2 className={`${H2} text-sindoor lg:text-[3rem]`} style={W700}>
              {live.title}
            </h2>
            <Gauge
              className="mt-4 lg:mt-8"
              percentile={live.percentile}
              band={live.band}
              lang={lang}
              figure={live.figure}
            />
            {live.muhurat ? (
              <p className="tabular mt-1 text-[0.75rem] leading-[1.4] text-ink2">{live.muhurat}</p>
            ) : null}
            <Link
              href={localePath(lang, "/rivers")}
              className="mt-3 inline-flex min-h-[44px] items-center font-bold text-ink underline decoration-ink decoration-2 underline-offset-4 active:text-sindoor"
            >
              {t.hero.card.link}
            </Link>
          </div>
        </section>

        {/* ------------------------------------------- the sheet ---------
            What people pay for: a sheet with a family's names on it, inside
            a phone, because that is where it is opened. Its own section,
            centred, larger from lg. */}
        <section id="sheet" className="scroll-mt-16">
          <div className="mx-auto max-w-md px-5 pb-16 lg:max-w-3xl lg:px-8 lg:pt-8 lg:pb-28 lg:text-center">
            <h2 className={`${H2} lg:text-[3rem]`} style={W700}>
              {t.sheet.title}
            </h2>
            <p className="mt-3 leading-[1.6] text-ink2 lg:mx-auto lg:max-w-xl lg:text-[1.125rem]">{t.sheet.lede}</p>
            <Specimen lang={lang} className="mt-8 lg:mt-12" phoneClassName="max-w-[280px] lg:max-w-[340px]" />
          </div>
        </section>

        {/* ------------------------------------------------ the six ------- */}
        <section id="rivers" className="tint scroll-mt-16">
          <div className="mx-auto max-w-md px-5 py-16 lg:max-w-3xl lg:px-8">
            <h2 className={H2} style={W700}>
              {t.rivers.title}
            </h2>
            <p className="mt-3 leading-[1.6] text-ink2">{t.rivers.lede}</p>

            {/* A list, unnumbered: six waters are a choice, not a sequence.
                Stacked ruled rows, each one a 56px target. */}
            <ul className="mt-8 border-b border-rule">
              {RIVERS.map((r) => (
                <li key={r.slug} className="border-t border-rule">
                  <Link
                    href={localePath(lang, `/rivers/${r.slug}`)}
                    className="group flex min-h-[56px] items-baseline justify-between gap-4 py-3 active:bg-paper2"
                  >
                    <span className="display text-[1.375rem] text-ink group-active:text-sindoor" style={W700}>
                      {waterName(r, "river", lang)}
                    </span>
                    <span className="text-right text-sm text-ink2">
                      {waterName(r, "ghat", lang)}, {waterName(r, "city", lang)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------ the packs -----
            Eleven on the matchbox label, the one to take, with the press
            under it. One and sixty as plain rows. Every per-morning figure
            is arithmetic on the price above it, in src/content/prices.ts.
            Each one carries its pack to /begin. */}
        <section id="prices" className="scroll-mt-16">
          <div className="mx-auto max-w-md px-5 py-16 lg:px-8 lg:py-24">
            <h2 className={`${H2} lg:text-center`} style={W700}>
              <CurrencyLine other={t.pricing.title} inr={t.pricing.titleInr} />
            </h2>
            <p className="mt-3 leading-[1.6] text-ink2 lg:text-center">{t.pricing.lede}</p>

            {t.pricing.tiers
              .filter((tier) => tier.key === "eleven")
              .map((tier) => (
                <div key={tier.key} className="mt-8">
                  {/* The label is the pack's face, not a second link: the
                      press under it is the one tab stop to /begin. */}
                  <Label
                    kicker={
                      <>
                        <Price prices={PER_SNAN.eleven} /> {t.pricing.labels.each}
                      </>
                    }
                    title={tier.name}
                    price={PRICE.eleven}
                  />
                  <p className="mt-4 text-[0.9375rem] leading-[1.6] text-ink2">{tier.body}</p>
                  <Link href={packHref(tier.key)} className="mt-5 flex">
                    <CTA className="w-full">{t.pricing.labels.choose}</CTA>
                  </Link>
                </div>
              ))}

            <ul className="mt-10 border-b border-rule">
              {t.pricing.tiers
                .filter((tier) => tier.key !== "eleven")
                .map((tier) => (
                  <li key={tier.key} className="border-t border-rule">
                    <Link href={packHref(tier.key)} className="group block min-h-[56px] py-4 active:bg-paper2">
                      <span className="flex items-baseline justify-between gap-4">
                        <span className="display text-[1.375rem] text-ink group-active:text-sindoor" style={W700}>
                          {tier.name}
                        </span>
                        <span className="display tabular-nums text-[1.375rem] text-ink" style={W700}>
                          <Price prices={PRICE[tier.key as TierKey]} />
                        </span>
                      </span>
                      <span className="mt-1 block text-sm leading-[1.55] text-ink2">
                        <Price prices={PER_SNAN[tier.key as TierKey]} /> {t.pricing.labels.each}
                      </span>
                      <span className="mt-1 block text-sm leading-[1.55] text-ink2">{tier.body}</span>
                    </Link>
                  </li>
                ))}
            </ul>

            <p className="mt-6 text-sm leading-[1.6] text-ink2">
              <TaxNote lang={lang} />
            </p>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}

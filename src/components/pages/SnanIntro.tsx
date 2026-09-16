import Link from "next/link";
import { localePath } from "@/lib/i18n";
/* This page exists in English and Hindi only; see the tier note and the
   FULL_ONLY list at the top of src/lib/locales.ts. `Lang` here is therefore
   the full-depth pair and not the twelve locales the site serves. */
import type { FullLang as Lang } from "@/lib/locales";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { RiverFlow } from "@/components/RiverFlow";
import { Mark } from "@/components/Logo";
import { PastHero } from "@/components/site/PastHero";
import { buttonClass, Price, Section } from "@/components/ui";
import { snanContent } from "@/content/snan";
import { PER_SNAN, PRICE } from "@/content/prices";
import { clock, LIMB_START, SITTING } from "@/lib/sitting-plan";

/**
 * /snan, the page where somebody decides to pay.
 *
 * Built for a 390px phone first, read in bed, in the dark, one thumb. Every
 * consequence of that is deliberate:
 *
 *  - One column at every width. The only multi-column layouts appear at `lg`
 *    and they are the clock rail beside each part and the tariff's price pair.
 *    Nothing scrolls sideways at 390px.
 *  - Body copy is 1.05rem at 1.85 leading. Nothing readable is set below
 *    0.9rem; the small caps `label` face is a column head or a button, never
 *    prose and never a heading's eyebrow.
 *  - Every interactive element carries `min-h-[44px]`.
 *  - The primary action lives in a fixed bar at the bottom edge, inside the
 *    thumb arc, on phones only. Desktop keeps the masthead CTA. The bar is
 *    plain CSS with no observers, and it carries no countdown, no scarcity and
 *    no urgency, because there is none.
 *  - The tariff is a stack of ruled rows, not a table.
 *
 * WHAT WAS TAKEN OFF THIS PAGE, and must stay off: the caps eyebrow with a
 * red dash above every heading, the fade-and-rise on every section, numbered
 * markers on the questions, half the headline in red, the "what is actually
 * true" box, the pull quote, the specimen almanac with figures from a gauge
 * this product does not read, and the register with a ninety-second
 * stillness. The five parts keep their order marks because they are a
 * sequence, and their clocks and lengths come from src/lib/sitting-plan.ts.
 *
 * The claims are the constraint. No rite is asserted anywhere on this page.
 */

/** Devanagari numerals in the Hindi edition, as a printed panchang sets them. */
const DEVA = "०१२३४५६७८९";
function digits(s: string, lang: Lang): string {
  return lang === "hi" ? [...s].map((d) => (/\d/.test(d) ? DEVA[Number(d)] : d)).join("") : s;
}
function numeral(n: number, lang: Lang): string {
  return digits(String(n).padStart(2, "0"), lang);
}

const ROUTE = "/snan";

export function SnanIntro({ lang }: { lang: Lang }) {
  const t = snanContent[lang];
  const begin = localePath(lang, "/begin");

  const length = (id: keyof typeof SITTING) =>
    t.form.seconds.replace("{n}", digits(String(SITTING[id]), lang));
  const startsAt = (id: keyof typeof SITTING) => digits(clock(LIMB_START[id]), lang);

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <PastHero />
      <Header lang={lang} currentPath={ROUTE} ctaTo="#tariff" ctaAfterHero />

      <main>
        {/* ------------------------------------------------ masthead ------ */}
        {/* The river is anchored under the headline's double rule, as the
            landing anchors it under the headline: everything above the rule
            is on sky, and the lede and the offer sit on a paper slip below it. */}
        <section className="relative overflow-hidden border-b-2 border-rulestrong">
          {/* Phone: a band under the type. The panorama tuning's small sun
              stays inside the band; the portrait one rose into the offer line. */}
          <RiverFlow
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] w-full text-ink lg:hidden"
          />
          {/* Wide: the full panorama behind the type, horizon on the rule. */}
          <RiverFlow
            variant="panorama"
            anchorSelector="[data-snan-horizon]"
            className="pointer-events-none absolute inset-0 hidden h-full w-full text-ink lg:block"
          />

          <div className="relative mx-auto max-w-6xl px-5 pt-10 pb-14 sm:px-8 sm:pt-16 sm:pb-20">
            <h1 className="ink-in display max-w-4xl text-[2.5rem] leading-[1.06] sm:text-[3.8rem] lg:text-[5rem]">
              {t.hero.title}
            </h1>

            <div data-snan-horizon className="rule-double mt-7 max-w-xl" />

            <div
              className="ink-in mt-6 max-w-2xl lg:bg-paper lg:px-4 lg:py-3"
              style={{ animationDelay: "140ms" }}
            >
              <p className="text-[1.05rem] leading-[1.85] text-ink2">{t.hero.lede}</p>
              <p className="mt-4 text-[1rem] leading-[1.8] text-ink">
                {t.hero.offer.split("{price}")[0]}
                <Price prices={PRICE.eleven} className="display text-[1.15rem]" />
                {t.hero.offer.split("{price}")[1]}
              </p>
            </div>

            {/* Paper behind the block on a phone: the band's sun rises behind
                the buttons there, and a flex gap shows its container's ground. */}
            <div
              className="ink-in mt-9 flex flex-col gap-3 bg-paper sm:flex-row sm:flex-wrap sm:items-center lg:bg-transparent"
              style={{ animationDelay: "260ms" }}
            >
              <Link href={begin} className={buttonClass("solid", "min-h-[52px] w-full sm:w-auto")} data-hero-cta>
                {t.hero.ctaPrimary}
              </Link>
              <a href="#form" className={buttonClass("ghost", "min-h-[52px] w-full sm:w-auto")}>
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ the form ------ */}
        <Section id="form">
          <div className="max-w-3xl">
            <h2 className="display text-[2rem] leading-[1.14] sm:text-[2.8rem]">{t.form.title}</h2>
            <p className="mt-4 max-w-2xl text-[1.05rem] leading-[1.85] text-ink2">{t.form.lede}</p>
          </div>

          {/* The five parts at a glance: a ruled row each, five columns wide. */}
          <ul className="mt-10 border-t-2 border-rulestrong lg:grid lg:grid-cols-5 lg:border-b-2">
            {t.form.limbs.map((l) => (
              <li
                key={`glance-${l.id}`}
                className="flex items-baseline justify-between gap-4 border-b border-rule py-3 lg:flex-col lg:items-start lg:gap-1 lg:border-r lg:border-b-0 lg:py-4 lg:pr-4 lg:last:border-r-0"
              >
                <span className="display text-[1.25rem] text-ink">{l.title}</span>
                <span className="text-sm text-ink2 tabular-nums">
                  {startsAt(l.id)}, {length(l.id)}
                </span>
              </li>
            ))}
          </ul>

          {/* The long version. Numbered, because the parts run in this order. */}
          <ol className="mt-12 border-t-2 border-rulestrong">
            {t.form.limbs.map((l, i) => (
              <li
                key={l.id}
                id={l.id}
                className="scroll-mt-20 border-b border-rule py-9 lg:grid lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-14"
              >
                <div className="flex items-baseline gap-4 lg:sticky lg:top-24 lg:block lg:self-start">
                  <span className="display text-[2.2rem] leading-none text-spot tabular-nums">
                    {numeral(i + 1, lang)}
                  </span>
                  {/* Phone: the clock and the length on one line beside the
                      number. Wide: a two-row column with its heads. */}
                  <span className="text-sm text-ink2 tabular-nums lg:hidden">
                    {startsAt(l.id)}, {length(l.id)}
                  </span>
                  <dl className="mt-5 hidden text-sm lg:block">
                    <dt className="label text-ink2">{t.form.clockHead}</dt>
                    <dd className="mt-1 text-ink tabular-nums">{startsAt(l.id)}</dd>
                    <dt className="label mt-3 text-ink2">{t.form.lengthHead}</dt>
                    <dd className="mt-1 text-ink tabular-nums">{length(l.id)}</dd>
                  </dl>
                </div>

                <div className="mt-6 lg:mt-0">
                  <h3 className="display text-[1.75rem] leading-[1.25] sm:text-[2.1rem]">{l.title}</h3>
                  <div className="rule-thin mt-5" />
                  {l.body.map((p) => (
                    <p key={p} className="mt-5 max-w-[38rem] text-[1.05rem] leading-[1.85] text-ink2">
                      {p}
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* ------------------------------------------------ the stillness --
            The one reverse block on the site: ink ground, paper type, which is
            what a press does when it wants a page to stop you. It is also
            literally what the part does. */}
        <section id="stillness" className="border-t-2 border-rulestrong bg-ink text-paper">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
            <h2 className="display max-w-3xl text-[2rem] leading-[1.14] sm:text-[2.9rem]">
              {t.still.title}
            </h2>

            <div className="mt-8 h-px w-full max-w-3xl bg-paper" />

            <p className="mt-8 max-w-2xl text-[1.05rem] leading-[1.85]">{t.still.body}</p>

            <div className="mt-10 max-w-xl border border-paper px-5 py-10 text-center sm:px-8 sm:py-14">
              <p className="display text-[1.3rem] leading-[1.5] sm:text-[1.7rem]">{t.still.instruction}</p>
            </div>

            <p className="mt-7 max-w-2xl text-[0.98rem] leading-[1.8]">{t.still.note}</p>
          </div>
        </section>

        {/* ------------------------------------------------ the sheet ----- */}
        <Section id="patra" tinted>
          <div className="max-w-3xl">
            <h2 className="display text-[2rem] leading-[1.14] sm:text-[2.8rem]">{t.patra.title}</h2>
            <p className="mt-4 max-w-2xl text-[1.05rem] leading-[1.85] text-ink2">{t.patra.lede}</p>
          </div>

          <dl className="mt-10 border-t-2 border-rulestrong">
            {t.patra.carries.map((row) => (
              <div
                key={row.k}
                className="border-b border-rule py-5 sm:grid sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-10"
              >
                <dt className="display text-[1.3rem] leading-none text-ink">{row.k}</dt>
                <dd className="mt-2 max-w-[38rem] text-[1.02rem] leading-[1.85] text-ink2 sm:mt-0">
                  {row.v}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 max-w-3xl">
            <h3 className="display text-[1.6rem] leading-[1.25] sm:text-[2rem]">{t.patra.engravingTitle}</h3>
            {t.patra.engravingBody.map((p) => (
              <p key={p} className="mt-5 text-[1.02rem] leading-[1.85] text-ink2">
                {p}
              </p>
            ))}
          </div>
        </Section>

        {/* ------------------------------------------------ before you pay */}
        <Section id="questions">
          <h2 className="display text-[2rem] leading-[1.14] sm:text-[2.8rem]">{t.before.title}</h2>

          <ul className="mt-10 border-t-2 border-rulestrong">
            {t.before.items.map((item) => (
              <li key={item.q} className="border-b border-rule py-7">
                <h3 className="display text-[1.4rem] leading-[1.3] sm:text-[1.7rem]">{item.q}</h3>
                <p className="mt-4 max-w-[40rem] text-[1.05rem] leading-[1.85] text-ink2">{item.a}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* ------------------------------------------------ the tariff -----
            A price list set as ruled rows, so it stacks on a phone instead of
            becoming a horizontal scroller. The hero row stands on paper with
            the spot rule; nothing here counts down or runs out. */}
        <Section id="tariff" tinted>
          <div className="max-w-3xl">
            <h2 className="display text-[2rem] leading-[1.14] sm:text-[2.8rem]">{t.tariff.title}</h2>
            <p className="mt-4 max-w-2xl text-[1.05rem] leading-[1.85] text-ink2">{t.tariff.lede}</p>
          </div>

          <ul className="mt-11 border-t-2 border-rulestrong">
            {t.tariff.rows.map((row) => (
              <li
                key={row.name}
                className={`border-b border-rule ${row.hero ? "border-l-4 border-l-spot bg-paper" : ""}`}
              >
                <div className={`py-7 ${row.hero ? "px-4 sm:px-6" : ""}`}>
                  <div className="sm:flex sm:items-start sm:justify-between sm:gap-10">
                    <div className="min-w-0">
                      <h3 className="display text-[1.7rem] leading-none sm:text-[2.1rem]">{row.name}</h3>
                      <p className="mt-3 max-w-[40rem] text-[1.02rem] leading-[1.85] text-ink2">{row.body}</p>
                    </div>

                    {/* One price, in the reader's own currency. */}
                    <dl className="mt-5 border-t border-rule pt-4 sm:mt-0 sm:shrink-0 sm:border-t-0 sm:pt-0 sm:text-right">
                      <dt className="label text-ink2">{t.tariff.heads.price}</dt>
                      <dd className="display mt-1.5 text-[2.4rem] leading-none text-spot tabular-nums">
                        <Price prices={PRICE[row.key]} />
                      </dd>
                    </dl>
                  </div>

                  <dl className="mt-6 flex items-baseline gap-3 border-t border-rule pt-4">
                    <dt className="label shrink-0 text-ink2">{t.tariff.heads.per}</dt>
                    <dd className="text-[1.05rem] leading-none text-ink tabular-nums">
                      <Price prices={PER_SNAN[row.key]} />
                    </dd>
                  </dl>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-6 max-w-3xl text-[0.98rem] leading-[1.8] text-ink2">{t.tariff.note}</p>

          <div className="mt-8">
            <Link href={begin} className={buttonClass("solid", "min-h-[52px] w-full sm:w-auto")}>
              {t.tariff.cta}
            </Link>
          </div>
        </Section>

        {/* ------------------------------------------------ colophon ------ */}
        <section className="border-t-2 border-rulestrong">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-24">
            <Mark className="mx-auto h-12 w-12 text-ink" />
            <div className="rule-double mt-8" />
            <h2 className="display mt-8 text-[1.9rem] leading-[1.2] sm:text-[2.9rem]">{t.closing.title}</h2>
            <p className="mx-auto mt-6 max-w-lg text-[1.05rem] leading-[1.85] text-ink2">{t.closing.body}</p>
            <Link href={begin} className={buttonClass("solid", "mt-9 min-h-[52px] w-full sm:w-auto")}>
              {t.closing.cta}
            </Link>
          </div>
        </section>
      </main>

      <Footer lang={lang} />

      {/* The footer's own ground continued behind the fixed bar, so the last
          rule of the page is never sitting underneath it. */}
      <div aria-hidden="true" className="tint h-24 lg:hidden" />

      {/* ------------------------------------------------ thumb rail -----
          Phones only, pinned to the bottom edge inside the thumb arc, and
          padded past the home indicator. No JavaScript, no timer, no offer
          that expires. */}
      <aside
        aria-label={t.sticky.name}
        data-until-scrolled="rail"
        className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-rulestrong bg-paper lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-2.5">
          <div className="min-w-0">
            <p className="truncate text-xs text-ink2">{t.sticky.name}</p>
            <p className="display mt-0.5 text-lg leading-tight text-ink tabular-nums">
              <Price prices={PRICE.eleven} />
            </p>
          </div>
          <Link href={begin} className={buttonClass("solid", "min-h-[44px] shrink-0 px-5 py-2.5")}>
            {t.sticky.cta}
          </Link>
        </div>
      </aside>
    </>
  );
}

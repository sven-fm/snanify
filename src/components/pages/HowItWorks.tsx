import Link from "next/link";
import { localePath } from "@/lib/i18n";
/* This page exists in English and Hindi only; see the tier note and the
   FULL_ONLY list at the top of src/lib/locales.ts. `Lang` here is therefore
   the full-depth pair and not the twelve locales the site serves. */
import type { FullLang as Lang } from "@/lib/locales";
import { ctaHref } from "@/lib/nav";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Eyebrow, Price, Section } from "@/components/ui";
import { PER_SNAN, PRICE } from "@/content/prices";
import { Reveal } from "@/components/Reveal";
import { howItWorksContent } from "@/content/trust";

/**
 * /how-it-works, Jal Sankalp at full length: five limbs, two hundred and
 * seventy seconds, the same every day.
 *
 * Set as a printed procedure. Each limb opens with its numeral large in the
 * spot colour and its clock beside it, and what appears on the screen is set
 * as an almanac entry rather than a screenshot, because there is no screenshot
 * that would be honest: the screen is black for a third of the form.
 *
 * MOBILE FIRST. Laid out for 390px and widened afterwards. The timetable, the
 * setup questions and the tariff are ruled registers that stack on a phone and
 * become columns from `sm` up; none of them is ever a horizontal scroller.
 * The primary action sits on a thumb rail at the bottom of the viewport.
 */

/** Devanagari numerals in the Hindi edition, as a printed panchang sets them. */
const DEVA = "०१२३४५६७८९";
function numeral(n: number, lang: Lang): string {
  const s = String(n).padStart(2, "0");
  return lang === "hi" ? [...s].map((d) => DEVA[Number(d)]).join("") : s;
}

/**
 * What the screen actually shows, set as a printed entry: display face,
 * tabular numerals, letterspaced. Deliberately not uppercased, because half
 * these lines are Devanagari and Devanagari has no case.
 */
function Specimen({ lines }: { lines: readonly string[] }) {
  return (
    <div className="boxed tint mt-6 px-5 py-5 sm:px-7">
      {lines.map((line) => (
        <p
          key={line}
          className="display text-[0.95rem] leading-[1.9] tracking-[0.04em] text-ink tabular-nums"
        >
          {line}
        </p>
      ))}
    </div>
  );
}

export function HowItWorks({ lang }: { lang: Lang }) {
  const t = howItWorksContent[lang];
  const cta = ctaHref(lang);

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath="/how-it-works" />

      {/* The bottom rail is 3.75rem tall on a phone; the page ends above it. */}
      <main className="pb-20 sm:pb-0">
        {/* ---------------- masthead ---------------- */}
        <header className="border-b-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 pt-10 pb-12 sm:px-8 sm:pt-24 sm:pb-24">
            <div className="ink-in max-w-3xl">
              <Eyebrow>{t.eyebrow}</Eyebrow>
              <h1 className="display mt-5 text-[2.3rem] leading-[1.12] sm:mt-6 sm:text-6xl">
                {t.title}
              </h1>
              <div className="rule-double mt-7 max-w-xl" />
              <p className="mt-6 max-w-2xl text-[1.05rem] leading-[1.8] text-ink2 sm:text-[1.08rem]">
                {t.lede}
              </p>
            </div>
          </div>
        </header>

        {/* ---------------- nothing is shipped, nothing is performed ------ */}
        <section id="shipping" className="tint scroll-mt-20 border-b-2 border-rulestrong">
          <div className="mx-auto grid max-w-6xl gap-7 px-5 py-12 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
            <div>
              <p className="label text-spot">{t.shipping.eyebrow}</p>
              <h2 className="display mt-4 text-[1.9rem] leading-[1.14] sm:mt-5 sm:text-[2.7rem]">
                {t.shipping.title}
              </h2>
            </div>
            <div className="max-w-[40rem] self-center border-t-2 border-rulestrong pt-6 lg:border-t-0 lg:pt-0">
              {t.shipping.body.map((p) => (
                <p key={p} className="mt-4 text-[1.02rem] leading-[1.8] text-ink2 first:mt-0">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- before the first one ---------------- */}
        <Section id={t.first.id}>
          <Reveal>
            <div className="gap-12 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20">
              <div>
                <div className="lg:sticky lg:top-24">
                  <span className="display block text-5xl leading-none text-spot sm:text-7xl">
                    {t.first.n}
                  </span>
                  <div className="rule-heavy mt-4 sm:mt-5" />
                  <h2 className="display mt-4 text-[1.5rem] leading-[1.2] text-ink sm:mt-5 sm:text-[1.6rem]">
                    {t.first.label}
                  </h2>
                </div>
              </div>

              <div className="mt-8 lg:mt-0">
                <p className="max-w-[40rem] text-[1.02rem] leading-[1.8] text-ink2">
                  {t.first.lede}
                </p>

                <blockquote className="mt-7 border-y-2 border-rulestrong py-7">
                  {t.first.screen.map((p) => (
                    <p
                      key={p}
                      className="mt-4 max-w-[38rem] text-[1.02rem] leading-[1.8] text-ink first:mt-0"
                    >
                      {p}
                    </p>
                  ))}
                </blockquote>

                <h3 className="label mt-12 border-t border-rule pt-4 text-ink">{t.first.setupH}</h3>
                <dl className="mt-5 border-t-2 border-rulestrong">
                  {t.first.setup.map((row) => (
                    <div
                      key={row.k}
                      className="grid gap-1.5 border-b border-rule py-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6"
                    >
                      <dt className="label pt-1 text-spot">{row.k}</dt>
                      <dd className="text-[0.98rem] leading-[1.75] text-ink2">{row.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ---------------- the timetable ---------------- */}
        <Section id="form" tinted>
          <Reveal>
            <h2 className="display text-[1.9rem] leading-[1.15] sm:text-[2.6rem]">{t.formH}</h2>
            <p className="mt-5 max-w-2xl text-[1.02rem] leading-[1.8] text-ink2">{t.formLede}</p>

            {/* A timetable, ruled. On a phone each limb is one stacked entry;
                from sm it becomes the three columns a printed almanac uses. */}
            <dl className="mt-9 border-t-2 border-rulestrong">
              <div className="hidden gap-6 border-b border-rule pb-2 sm:grid sm:grid-cols-[5rem_minmax(0,1fr)_7rem]">
                <span className="label text-ink2">{t.formHeads.clock}</span>
                <span className="label text-ink2">{t.formHeads.limb}</span>
                <span className="label text-ink2 sm:text-right">{t.formHeads.length}</span>
              </div>

              {t.limbs.map((limb) => (
                <div
                  key={limb.id}
                  className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[5rem_minmax(0,1fr)_7rem] sm:items-baseline sm:gap-6"
                >
                  <dt className="display text-[1.05rem] text-spot tabular-nums">{limb.clock}</dt>
                  <dd>
                    <a
                      href={`#${limb.id}`}
                      className="inline-flex min-h-[44px] flex-wrap items-center gap-x-3 text-ink transition-colors hover:text-spot"
                    >
                      <span className="display text-[1.15rem]">{limb.label}</span>
                      <span className="text-[0.9rem] text-ink2">{limb.deva}</span>
                    </a>
                  </dd>
                  <dd className="label text-ink2 sm:text-right">{limb.length}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Section>

        {/* ---------------- the five limbs ---------------- */}
        {t.limbs.map((limb, li) => (
          <Section key={limb.id} id={limb.id} tinted={li % 2 === 1}>
            <Reveal>
              <div className="gap-12 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20">
                <div>
                  <div className="lg:sticky lg:top-24">
                    {/* The numeral is typographic furniture: it sequences the
                        page, the label beside it carries the meaning. */}
                    <span className="display block text-5xl leading-none text-spot sm:text-7xl">
                      {limb.n}
                    </span>
                    <div className="rule-heavy mt-4 sm:mt-5" />
                    <h2 className="display mt-4 text-[1.5rem] leading-[1.2] text-ink sm:mt-5 sm:text-[1.6rem]">
                      {limb.label}
                    </h2>
                    <p className="mt-2 text-[0.95rem] text-ink2">{limb.deva}</p>
                    <p className="label mt-4 text-ink2 tabular-nums">
                      {limb.clock} · {limb.length}
                    </p>
                  </div>
                </div>

                <div className="mt-8 max-w-[40rem] lg:mt-0">
                  {limb.body.map((p) => (
                    <p
                      key={p}
                      className="mt-5 text-[1.02rem] leading-[1.8] text-ink2 first:mt-0"
                    >
                      {p}
                    </p>
                  ))}

                  <p className="label mt-10 border-t border-rule pt-4 text-ink">
                    {limb.specimenH}
                  </p>
                  <Specimen lines={limb.specimen} />

                  <p className="mt-5 text-[0.95rem] leading-[1.8] text-ink2">{limb.note}</p>
                </div>
              </div>
            </Reveal>
          </Section>
        ))}

        {/* ---------------- what you keep ---------------- */}
        <Section id={t.after.id} tinted>
          <Reveal>
            <div className="gap-12 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20">
              <div>
                <div className="lg:sticky lg:top-24">
                  <span className="display block text-5xl leading-none text-spot sm:text-7xl">
                    {t.after.n}
                  </span>
                  <div className="rule-heavy mt-4 sm:mt-5" />
                  <h2 className="display mt-4 text-[1.5rem] leading-[1.2] text-ink sm:mt-5 sm:text-[1.6rem]">
                    {t.after.label}
                  </h2>
                </div>
              </div>

              <ol className="mt-8 border-t-2 border-rulestrong lg:mt-0">
                {t.after.steps.map((s, i) => (
                  <li
                    key={s.t}
                    className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 border-b border-rule py-7 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-8"
                  >
                    <span className="display text-[1.3rem] leading-none text-spot tabular-nums sm:text-[1.8rem]">
                      {numeral(i + 1, lang)}
                    </span>
                    <div>
                      <h3 className="display text-[1.25rem] leading-snug text-ink sm:text-[1.5rem]">
                        {s.t}
                      </h3>
                      {s.d.map((p) => (
                        <p key={p} className="mt-3.5 text-[1.02rem] leading-[1.8] text-ink2">
                          {p}
                        </p>
                      ))}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </Section>

        {/* ---------------- the sound, stated rather than played ----------
            No stem may play until it has a licence and a named recordist. A
            water without an honest recording ships silent and says so. */}
        <Section id="sound">
          <Reveal>
            <div className="mx-auto max-w-3xl boxed px-6 py-10 sm:px-10 sm:py-12">
              <p className="label text-spot">{t.sound.label}</p>
              {t.sound.body.map((p) => (
                <p key={p} className="mt-5 text-[1.02rem] leading-[1.8] text-ink2">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ---------------- the tariff ---------------- */}
        <Section id="price" tinted>
          <Reveal>
            <Eyebrow>{t.price.eyebrow}</Eyebrow>
            <h2 className="display mt-4 text-[1.9rem] leading-[1.15] sm:text-[2.6rem]">
              {t.price.title}
            </h2>
            <p className="mt-5 max-w-2xl text-[1.02rem] leading-[1.8] text-ink2">{t.price.lede}</p>

            {/* One price per line, in the reader's own currency. Every currency
                ships in the markup and CSS shows one, so this page stays fully
                prerendered; see the note at the top of src/lib/currency.ts. */}
            <dl className="mt-9 border-t-2 border-rulestrong">
              <div className="hidden gap-6 border-b border-rule pb-2 lg:grid lg:grid-cols-[12rem_minmax(0,1fr)_7rem_6rem]">
                <span className="label text-ink2">{t.price.heads.name}</span>
                <span className="label text-ink2">{t.price.heads.what}</span>
                <span className="label text-right text-spot">{t.price.heads.price}</span>
                <span className="label text-right text-ink2">{t.price.heads.per}</span>
              </div>

              {t.price.rows.map((row) => (
                <div
                  key={row.key}
                  className="grid gap-3 border-b border-rule py-6 lg:grid-cols-[12rem_minmax(0,1fr)_7rem_6rem] lg:items-baseline lg:gap-6"
                >
                  <dt>
                    <span className="display block text-[1.3rem] text-ink">{row.name}</span>
                    <span className="label mt-1 block text-ink2">{row.alt}</span>
                  </dt>
                  <dd className="max-w-[34rem] text-[0.98rem] leading-[1.75] text-ink2">
                    {row.what}
                  </dd>
                  <dd className="flex items-baseline gap-6 lg:block lg:text-right">
                    <span className="display text-[1.5rem] text-spot tabular-nums">
                      <Price prices={PRICE[row.key]} />
                    </span>
                    <span className="label text-ink2 lg:hidden">{t.price.heads.price}</span>
                  </dd>
                  <dd className="flex items-baseline gap-6 lg:block lg:text-right">
                    <span className="text-[1.05rem] text-ink2 tabular-nums">
                      <Price prices={PER_SNAN[row.key]} />
                    </span>
                    <span className="label text-ink2 lg:hidden">{t.price.heads.per}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 max-w-3xl text-[0.95rem] leading-[1.8] text-ink2">{t.price.note}</p>
          </Reveal>
        </Section>

        {/* ---------------- closing ---------------- */}
        <section className="border-t-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-24">
            <div className="max-w-2xl">
              <h2 className="display text-[1.8rem] leading-[1.18] sm:text-[2.6rem]">
                {t.closing.title}
              </h2>
              <p className="mt-5 text-[1.02rem] leading-[1.8] text-ink2">{t.closing.body}</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-10">
                <Link
                  href={localePath(lang, "/ethics")}
                  className="inline-flex min-h-[44px] items-center border-b-2 border-spot pb-1 text-[1.02rem] text-spot transition-colors hover:border-rulestrong hover:text-ink"
                >
                  {t.closing.ethicsLabel}
                </Link>
                <Link
                  href={localePath(lang, "/faq")}
                  className="inline-flex min-h-[44px] items-center border-b border-rule pb-1 text-[1.02rem] text-ink2 transition-colors hover:border-spot hover:text-spot"
                >
                  {t.closing.faqLabel}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />

      {/* ---------------- thumb rail, phones only ---------------- */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-rulestrong bg-paper sm:hidden">
        <a
          href={cta}
          className="label flex min-h-[3.75rem] items-center justify-center gap-3 bg-spot px-5 text-paper"
        >
          <span>{t.price.cta}</span>
          <span aria-hidden="true">·</span>
          {/* The hero SKU, not the cheapest line: eleven mornings for eleven. */}
          <span className="tabular-nums">
            <Price prices={PRICE.eleven} />
          </span>
        </a>
      </div>
    </>
  );
}

import Link from "next/link";
import { localePath } from "@/lib/i18n";
/* This page exists in English and Hindi only; see the tier note and the
   FULL_ONLY list at the top of src/lib/locales.ts. `Lang` here is therefore
   the full-depth pair and not the twelve locales the site serves. */
import type { FullLang as Lang } from "@/lib/locales";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/Reveal";
import { RiverFlow } from "@/components/RiverFlow";
import { Mark } from "@/components/Logo";
import { buttonClass, Eyebrow, Section, SectionHeader } from "@/components/ui";
import { snanContent } from "@/content/snan";

/**
 * /snan, the page where somebody decides to pay.
 *
 * Built for a 390px phone first, read in bed, in the dark, one thumb. Every
 * consequence of that is deliberate:
 *
 *  - One column at every width. The only multi-column layouts appear at `lg`
 *    and they are the clock rail beside each limb and the tariff's price pair.
 *    Nothing scrolls sideways at 390px, so the long seed string wraps with
 *    `break-all` rather than sitting in a scroller.
 *  - Body copy is 1.05rem at 1.85 leading. Nothing readable is set below
 *    0.9rem; the small caps `label` face is furniture, never prose.
 *  - Every interactive element carries `min-h-[44px]`.
 *  - The primary action lives in a fixed bar at the bottom edge, inside the
 *    thumb arc, on phones only. Desktop keeps the masthead CTA. The bar is
 *    plain CSS with no observers, and it carries no countdown, no scarcity and
 *    no urgency, because there is none.
 *  - The tariff is a stack of ruled rows, not a table. It is a price list, not
 *    a dataset, so it stacks rather than scrolls.
 *
 * The claims are the constraint. No rite is asserted anywhere on this page.
 * The specimen almanac lines are labelled specimens where they stand, because
 * the live readings belong to the free water pages and a fabricated fresh
 * number would cost more than this whole product is worth.
 */

/** Devanagari numerals in the Hindi edition, as a printed panchang sets them. */
const DEVA = "०१२३४५६७८९";
function numeral(n: number, lang: Lang): string {
  const s = String(n).padStart(2, "0");
  return lang === "hi" ? [...s].map((d) => DEVA[Number(d)]).join("") : s;
}

const ROUTE = "/snan";

export function SnanIntro({ lang }: { lang: Lang }) {
  const t = snanContent[lang];
  const hi = lang === "hi";

  /* Latin caps want the extra tracking; Devanagari matras do not. */
  const specimenType = hi
    ? "text-[0.95rem] leading-[2]"
    : "text-[0.9rem] leading-[2] tracking-[0.06em]";

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath={ROUTE} ctaTo="#tariff" />

      <main>
        {/* ------------------------------------------------ masthead ------ */}
        <section className="relative overflow-hidden border-b-2 border-rulestrong">
          {/* A band, not a background. On a phone it sits under the type where
              it cannot fight the headline for contrast. */}
          <RiverFlow
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] w-full text-ink lg:h-[58%]"
          />

          <div className="relative mx-auto max-w-6xl px-5 pt-10 pb-14 sm:px-8 sm:pt-16 sm:pb-20">
            <div className="ink-in">
              <Eyebrow>{t.hero.eyebrow}</Eyebrow>
            </div>

            <h1
              className="ink-in display mt-5 max-w-4xl text-[2.5rem] leading-[1.06] sm:text-[3.8rem] lg:text-[5rem]"
              style={{ animationDelay: "60ms" }}
            >
              {t.hero.titleA}{" "}
              <span className="text-spot">{t.hero.titleB}</span>
            </h1>

            <div className="rule-double mt-7 max-w-xl" />

            <p
              className="ink-in mt-6 max-w-2xl text-[1.05rem] leading-[1.85] text-ink2"
              style={{ animationDelay: "140ms" }}
            >
              {t.hero.lede}
            </p>

            <p
              className="ink-in mt-6 max-w-2xl border-l-2 border-spot pl-4 text-[1rem] leading-[1.8] text-ink"
              style={{ animationDelay: "200ms" }}
            >
              {t.hero.offer}
            </p>

            <div
              className="ink-in mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              style={{ animationDelay: "260ms" }}
            >
              <a
                href="#tariff"
                className={buttonClass("solid", "min-h-[52px] w-full sm:w-auto")}
              >
                {t.hero.ctaPrimary}
              </a>
              <a
                href="#form"
                className={buttonClass("ghost", "min-h-[52px] w-full sm:w-auto")}
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ what is true -- */}
        <Section id="true" tinted>
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>{t.truth.label}</Eyebrow>
              <h2 className="display mt-4 text-[2rem] leading-[1.14] sm:text-[2.8rem]">
                {t.truth.title}
              </h2>
              {t.truth.body.map((p, i) => (
                <p
                  key={p}
                  className={`mt-6 text-[1.05rem] leading-[1.85] ${
                    i === t.truth.body.length - 1 ? "display text-[1.35rem] leading-[1.5] text-ink sm:text-[1.6rem]" : "text-ink2"
                  }`}
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="boxed mt-10 max-w-3xl bg-paper p-5 sm:p-7">
              <p className="label text-spot">{t.truth.never.label}</p>
              <ul className="mt-4 border-t border-rule">
                {t.truth.never.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-rule py-4 text-[1rem] leading-[1.8] text-ink2 last:border-b-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Section>

        {/* ------------------------------------------------ the form ------ */}
        <Section id="form">
          <Reveal>
            <SectionHeader
              eyebrow={t.form.eyebrow}
              title={t.form.title}
              lede={t.form.lede}
            />

            {/* the five limbs at a glance, before the long version */}
            <ul className="mt-10 border-t-2 border-rulestrong lg:grid lg:grid-cols-5 lg:border-b-2">
              {t.form.limbs.map((l) => (
                <li
                  key={`glance-${l.id}`}
                  className="flex items-baseline justify-between gap-4 border-b border-rule py-3 lg:flex-col lg:items-start lg:gap-1 lg:border-r lg:border-b-0 lg:py-4 lg:pr-4 lg:last:border-r-0"
                >
                  <span className="display text-[1.25rem] text-ink">{l.deva}</span>
                  <span className="label text-ink2 tabular-nums">
                    {l.clock} · {l.length}
                  </span>
                </li>
              ))}
            </ul>

            <ol className="mt-12 border-t-2 border-rulestrong">
              {t.form.limbs.map((l, i) => (
                <li
                  key={l.id}
                  id={l.id}
                  className="scroll-mt-20 border-b border-rule py-9 lg:grid lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-14"
                >
                  <div className="lg:sticky lg:top-24 lg:self-start">
                    <div className="flex items-baseline gap-4">
                      <span className="display text-[2.2rem] leading-none text-spot tabular-nums">
                        {numeral(i + 1, lang)}
                      </span>
                      <span className="label text-ink2 tabular-nums">
                        <span className="sr-only">{t.form.clockHead}: </span>
                        {l.clock}
                      </span>
                    </div>
                    <div className="rule-heavy mt-4 hidden lg:block" />
                    <p className="label mt-2 text-ink2 lg:mt-4">
                      <span className="sr-only">{t.form.lengthHead}: </span>
                      {l.length}
                    </p>
                  </div>

                  <div className="mt-6 lg:mt-0">
                    <h3 className="display text-[1.75rem] leading-[1.25] sm:text-[2.1rem]">
                      {l.deva}
                    </h3>
                    <p className="label mt-2 text-ink2">
                      {l.name} · {l.gloss}
                    </p>
                    <div className="rule-thin mt-5" />

                    {l.body.map((p) => (
                      <p
                        key={p}
                        className="mt-5 max-w-[38rem] text-[1.05rem] leading-[1.85] text-ink2"
                      >
                        {p}
                      </p>
                    ))}

                    {l.specimen && (
                      <div className="boxed mt-7 max-w-[38rem] bg-paper2 px-4 py-5 sm:px-6">
                        {l.specimen.lines.map((line) => (
                          <p
                            key={line}
                            className={`${specimenType} break-words text-ink tabular-nums`}
                          >
                            {line}
                          </p>
                        ))}
                        <div className="rule-thin mt-4" />
                        <p className="mt-3 text-[0.95rem] leading-[1.7] text-ink2">
                          {l.specimen.note}
                        </p>
                      </div>
                    )}

                    {l.diagram && (
                      <figure className="mt-7 max-w-[38rem]">
                        {/* The indicator, drawn rather than described: a hairline
                            at the reading, the datum and the published danger
                            line dashed above and below it. Two divs, no SVG. */}
                        <div
                          className="boxed relative h-40 overflow-hidden bg-paper sm:h-48"
                          aria-hidden="true"
                        >
                          <div className="absolute inset-x-0 top-[8%] border-t border-dashed border-rule" />
                          <div className="tint absolute inset-x-0 top-[44%] bottom-0" />
                          <div className="absolute inset-x-0 top-[44%] border-t-2 border-rulestrong" />
                          <div className="absolute inset-x-0 bottom-[6%] border-t border-dashed border-rule" />
                        </div>
                        <figcaption className="label mt-4 text-spot">
                          {l.diagram.label}
                        </figcaption>
                        <p className="mt-2 text-[0.98rem] leading-[1.8] text-ink2">
                          {l.diagram.caption}
                        </p>
                      </figure>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 max-w-3xl border-l-2 border-spot pl-4">
              <p className="label text-spot">{t.form.restraint.label}</p>
              <p className="mt-3 text-[1.02rem] leading-[1.85] text-ink2">
                {t.form.restraint.body}
              </p>
            </div>
          </Reveal>
        </Section>

        {/* ------------------------------------------------ the hold ------ */}
        <Section id="hold" tinted>
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>{t.hold.label}</Eyebrow>
              <h2 className="display mt-4 text-[2rem] leading-[1.14] sm:text-[2.8rem]">
                {t.hold.title}
              </h2>
              {t.hold.body.map((p) => (
                <p key={p} className="mt-6 text-[1.05rem] leading-[1.85] text-ink2">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-10 max-w-3xl border-l-4 border-spot pl-5">
              <p className="display text-[2.4rem] leading-none text-spot sm:text-[3.2rem]">
                {t.hold.pull}
              </p>
              <p className="mt-4 text-[1rem] leading-[1.8] text-ink2">
                {t.hold.pullNote}
              </p>
            </div>
          </Reveal>
        </Section>

        {/* ------------------------------------------------ the stillness --
            The one reverse block on the site: ink ground, paper type, which is
            what a press does when it wants a page to stop you. It is also
            literally what the limb does. */}
        <section id="stillness" className="border-t-2 border-rulestrong bg-ink text-paper">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
            <p className="label">{t.still.label}</p>
            <h2 className="display mt-5 max-w-3xl text-[2rem] leading-[1.14] sm:text-[2.9rem]">
              {t.still.title}
            </h2>

            <div className="mt-8 h-px w-full max-w-3xl bg-paper" />

            <p className="mt-8 max-w-2xl text-[1.05rem] leading-[1.85]">
              {t.still.body}
            </p>

            <div className="mt-10 max-w-xl border border-paper px-5 py-10 text-center sm:px-8 sm:py-14">
              {t.still.lines.map((line) => (
                <p key={line} className="display text-[1.3rem] leading-[1.5] sm:text-[1.7rem]">
                  {line}
                </p>
              ))}
            </div>

            <p className="mt-7 max-w-2xl text-[0.98rem] leading-[1.8]">{t.still.note}</p>
          </div>
        </section>

        {/* ------------------------------------------------ the mark ------ */}
        <Section id="register">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>{t.mark.label}</Eyebrow>
              <h2 className="display mt-4 text-[2rem] leading-[1.14] sm:text-[2.8rem]">
                {t.mark.title}
              </h2>
              {t.mark.body.map((p) => (
                <p key={p} className="mt-6 text-[1.05rem] leading-[1.85] text-ink2">
                  {p}
                </p>
              ))}
            </div>

            <div className="boxed mt-9 max-w-3xl bg-paper2 px-4 py-5 sm:px-7 sm:py-6">
              <p className="label text-spot">{t.mark.lineLabel}</p>
              <p
                className={`mt-4 break-words text-ink tabular-nums ${
                  hi ? "text-[1rem] leading-[1.9]" : "text-[0.95rem] leading-[1.9] tracking-[0.03em]"
                }`}
              >
                {t.mark.line}
              </p>
              <div className="rule-thin mt-5" />
              {t.mark.count.map((line) => (
                <p
                  key={line}
                  className="display mt-3 text-[1.3rem] leading-[1.45] text-ink sm:text-[1.6rem]"
                >
                  {line}
                </p>
              ))}
              <p className="label mt-6 text-ink2">{t.mark.close}</p>
            </div>

            <p className="mt-7 max-w-3xl text-[1.02rem] leading-[1.85] text-ink2">
              {t.mark.note}
            </p>
          </Reveal>
        </Section>

        {/* ------------------------------------------------ the artefact -- */}
        <Section id="chihna" tinted>
          <Reveal>
            <SectionHeader
              eyebrow={t.chihna.eyebrow}
              title={t.chihna.title}
              lede={t.chihna.lede}
            />

            <div className="mt-12">
              <p className="label text-spot">{t.chihna.drawLabel}</p>
              <dl className="mt-5 border-t-2 border-rulestrong">
                {t.chihna.draws.map((row) => (
                  <div
                    key={row.k}
                    className="border-b border-rule py-6 sm:grid sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-10"
                  >
                    <dt className="display text-[1.3rem] leading-none text-ink">{row.k}</dt>
                    <dd className="mt-3 max-w-[38rem] text-[1.02rem] leading-[1.85] text-ink2 sm:mt-0">
                      {row.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="boxed mt-12 max-w-3xl bg-paper p-5 sm:p-8">
              <p className="label text-spot">{t.chihna.forgeLabel}</p>
              <h3 className="display mt-4 text-[1.6rem] leading-[1.25] sm:text-[2rem]">
                {t.chihna.forgeTitle}
              </h3>
              {t.chihna.forgeBody.map((p) => (
                <p key={p} className="mt-5 text-[1.02rem] leading-[1.85] text-ink2">
                  {p}
                </p>
              ))}

              <div className="rule-double mt-8" />

              <p className="label mt-6 text-ink2">{t.chihna.seedLabel}</p>
              {/* Long, and it must wrap rather than open a sideways scroller. */}
              <p className="mt-3 break-all text-[0.9rem] leading-[1.9] text-ink">
                {t.chihna.seedLine}
              </p>
              <p className="mt-4 text-[0.98rem] leading-[1.8] text-ink2">
                {t.chihna.seedNote}
              </p>
            </div>

            <p className="mt-8 max-w-3xl border-l-2 border-spot pl-4 text-[1.02rem] leading-[1.85] text-ink">
              {t.chihna.flood}
            </p>
          </Reveal>
        </Section>

        {/* ------------------------------------------------ before you pay */}
        <Section id="questions">
          <Reveal>
            <SectionHeader eyebrow={t.before.eyebrow} title={t.before.title} />

            <ul className="mt-10 border-t-2 border-rulestrong">
              {t.before.items.map((item, i) => (
                <li
                  key={item.q}
                  className="border-b border-rule py-7 lg:grid lg:grid-cols-[3rem_minmax(0,1fr)] lg:gap-8"
                >
                  <span className="display hidden text-[1.6rem] leading-none text-spot tabular-nums lg:block">
                    {numeral(i + 1, lang)}
                  </span>
                  <div>
                    <h3 className="display text-[1.4rem] leading-[1.3] sm:text-[1.7rem]">
                      {item.q}
                    </h3>
                    <p className="mt-4 max-w-[40rem] text-[1.05rem] leading-[1.85] text-ink2">
                      {item.a}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        {/* ------------------------------------------------ the tariff -----
            A price list set as ruled rows, so it stacks on a phone instead of
            becoming a horizontal scroller. The hero row carries the spot rule
            and the tint; nothing here counts down or runs out. */}
        <Section id="tariff" tinted>
          <Reveal>
            <SectionHeader
              eyebrow={t.tariff.eyebrow}
              title={t.tariff.title}
              lede={t.tariff.lede}
            />

            <ul className="mt-11 border-t-2 border-rulestrong">
              {t.tariff.rows.map((row) => (
                <li
                  key={row.name}
                  className={`border-b border-rule ${
                    row.hero ? "border-l-4 border-l-spot bg-paper" : ""
                  }`}
                >
                  <div className={`py-7 ${row.hero ? "px-4 sm:px-6" : ""}`}>
                    {row.hero && (
                      <p className="label mb-4 text-spot">{t.tariff.heroLabel}</p>
                    )}

                    <div className="sm:flex sm:items-start sm:justify-between sm:gap-10">
                      <div className="min-w-0">
                        <h3 className="display text-[1.7rem] leading-none sm:text-[2.1rem]">
                          {row.deva}
                        </h3>
                        <p className="label mt-2 text-ink2">
                          {row.name} · {row.what}
                        </p>
                      </div>

                      <dl className="mt-5 grid grid-cols-2 gap-6 border-t border-rule pt-4 sm:mt-0 sm:shrink-0 sm:border-t-0 sm:pt-0 sm:text-right">
                        <div>
                          <dt className="label text-ink2">{t.tariff.heads.world}</dt>
                          <dd className="display mt-1.5 text-[2rem] leading-none text-spot tabular-nums">
                            {row.world}
                          </dd>
                        </div>
                        <div>
                          <dt className="label text-ink2">{t.tariff.heads.india}</dt>
                          <dd className="display mt-1.5 text-[2rem] leading-none text-ink tabular-nums">
                            {row.india}
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="mt-6 flex items-baseline gap-3 border-t border-rule pt-4">
                      <p className="label shrink-0 text-ink2">{t.tariff.heads.per}</p>
                      <p className="text-[1.05rem] leading-none text-spot tabular-nums">
                        {row.per}
                      </p>
                    </div>
                    <p className="mt-4 max-w-[40rem] text-[1.02rem] leading-[1.85] text-ink2">
                      {row.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="boxed mt-10 max-w-3xl bg-paper p-5 sm:p-7">
              <p className="label text-spot">{t.tariff.heroWhyLabel}</p>
              {t.tariff.heroBody.map((p) => (
                <p key={p} className="mt-4 text-[1.02rem] leading-[1.85] text-ink2">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-10 max-w-3xl border-l-2 border-spot pl-4">
              <p className="label text-spot">{t.tariff.freeLabel}</p>
              <p className="mt-3 text-[1.02rem] leading-[1.85] text-ink2">
                {t.tariff.freeBody}
              </p>
            </div>

            <div className="mt-11">
              <Link
                href={localePath(lang, "/rivers")}
                className={buttonClass("solid", "min-h-[52px] w-full sm:w-auto")}
              >
                {t.tariff.cta}
              </Link>
              <p className="mt-4 text-[0.98rem] leading-[1.8] text-ink2">
                {t.tariff.ctaNote}
              </p>
            </div>
          </Reveal>
        </Section>

        {/* ------------------------------------------------ colophon ------ */}
        <section className="border-t-2 border-rulestrong">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-24">
            <Mark className="mx-auto h-12 w-12 text-ink" />
            <div className="rule-double mt-8" />
            <h2 className="display mt-8 text-[1.9rem] leading-[1.2] sm:text-[2.9rem]">
              {t.closing.title}
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-[1.05rem] leading-[1.85] text-ink2">
              {t.closing.body}
            </p>
            <a
              href="#tariff"
              className={buttonClass("solid", "mt-9 min-h-[52px] w-full sm:w-auto")}
            >
              {t.closing.cta}
            </a>
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
      <div
        className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-rulestrong bg-paper lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-2.5">
          <div className="min-w-0">
            <p className="label truncate text-ink">{t.sticky.name}</p>
            <p className="mt-1 text-[0.95rem] leading-none text-ink2 tabular-nums">
              {t.sticky.price}
            </p>
          </div>
          <Link
            href={localePath(lang, "/rivers")}
            className={buttonClass("solid", "min-h-[44px] shrink-0 px-5 py-2.5")}
          >
            {t.sticky.cta}
          </Link>
        </div>
      </div>
    </>
  );
}

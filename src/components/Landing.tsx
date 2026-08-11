import Link from "next/link";
import { content } from "@/lib/content";
import { RIVERS } from "@/content/rivers";
import { DATED_OCCASIONS } from "@/content/muhurat";
import { localePath } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";
import { Mark } from "@/components/Logo";
import { RiverFlow } from "@/components/RiverFlow";
import { Reveal } from "@/components/Reveal";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CTA, Section, SectionHeader, StatusBadge } from "@/components/ui";

/** Devanagari numerals in the Hindi edition, as a printed panchang sets them. */
const DEVA = "०१२३४५६७८९";
function numeral(n: number, lang: Lang): string {
  const s = String(n).padStart(2, "0");
  return lang === "hi" ? [...s].map((d) => DEVA[Number(d)]).join("") : s;
}

export function Landing({ lang }: { lang: Lang }) {
  const t = content[lang];
  const hi = lang === "hi";

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath="/" ctaTo="#sankalp" />

      <main>
        {/* ------------------------------------------------ front page ---- */}
        <section className="relative flex min-h-[88vh] flex-col justify-end overflow-hidden border-b-2 border-rulestrong">
          <RiverFlow className="text-ink" />

          <div className="relative mx-auto w-full max-w-6xl px-5 pt-24 pb-12 sm:px-8 sm:pt-28 sm:pb-16">
            <div className="max-w-3xl">
              <div className="ink-in">
                <StatusBadge live>{t.hero.badge}</StatusBadge>
              </div>

              <h1
                className="ink-in display mt-7 text-[3.4rem] leading-[0.97] sm:text-[5rem] lg:text-[6.2rem]"
                style={{ animationDelay: "80ms" }}
              >
                {t.hero.titleA}{" "}
                <span className="text-spot">{t.hero.titleB}</span>
              </h1>

              <div className="rule-double mt-8 max-w-xl" />

              <p
                className="ink-in mt-6 max-w-xl text-[1.05rem] leading-[1.75] text-ink2"
                style={{ animationDelay: "160ms" }}
              >
                {t.hero.lede}
              </p>

              <div
                className="ink-in mt-9 flex flex-wrap items-center gap-3"
                style={{ animationDelay: "240ms" }}
              >
                <a href="#sankalp">
                  <CTA>{t.hero.ctaPrimary}</CTA>
                </a>
                <Link href={localePath(lang, "/how-it-works")}>
                  <CTA variant="ghost">{t.hero.ctaSecondary}</CTA>
                </Link>
              </div>
            </div>

            {/* the day's entry, printed on paper laid over the water */}
            <div className="mt-12 grid items-end gap-8 lg:grid-cols-[1fr_auto]">
              <dl className="ink-in grid max-w-xl grid-cols-3 border-t-2 border-rulestrong bg-paper">
                {t.hero.stats.map((s) => (
                  <div
                    key={s.l}
                    className="border-r border-rule py-4 pr-4 pl-3 first:pl-0 last:border-r-0"
                  >
                    <dt className="display text-[1.6rem] leading-none text-ink sm:text-[2rem]">
                      {s.n}
                    </dt>
                    <dd className="label mt-2 text-ink2">{s.l}</dd>
                  </div>
                ))}
              </dl>

              <aside className="ink-in boxed w-full bg-paper p-6 lg:w-[22rem]">
                <p className="label text-spot">{t.hero.card.label}</p>
                <p className="display mt-1.5 text-2xl">{t.hero.card.title}</p>
                <dl className="mt-4 border-t border-rule">
                  <div className="flex justify-between gap-4 border-b border-rule py-2.5">
                    <dt className="label text-ink2">{hi ? "घाट" : "Ghat"}</dt>
                    <dd className="text-right text-sm">{t.hero.card.meta}</dd>
                  </div>
                  <div className="flex justify-between gap-4 py-2.5">
                    <dt className="label text-ink2">{hi ? "समय" : "Window"}</dt>
                    <dd className="text-right text-sm text-spot">
                      {t.hero.card.countdown}
                    </dd>
                  </div>
                </dl>
              </aside>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ the six ------- */}
        <Section id="rivers">
          <Reveal>
            <SectionHeader
              eyebrow={t.rivers.eyebrow}
              title={t.rivers.title}
              lede={t.rivers.lede}
            />

            {/* a register, not a card grid */}
            <ul className="mt-12 border-t-2 border-rulestrong">
              {RIVERS.map((r, i) => (
                <li key={r.slug}>
                  <Link
                    href={localePath(lang, `/rivers/${r.slug}`)}
                    className="group grid grid-cols-[2.75rem_1fr] items-baseline gap-x-4 gap-y-1 border-b border-rule py-5 transition-colors hover:bg-paper3 sm:grid-cols-[3.5rem_14rem_1fr_auto] sm:gap-x-8"
                  >
                    <span className="display text-xl text-spot">
                      {numeral(i + 1, lang)}
                    </span>
                    <span className="display text-2xl text-ink">
                      {r.river[lang]}
                    </span>
                    <span className="col-start-2 text-sm text-ink2 sm:col-start-auto">
                      {r.ghat[lang]}, {r.city[lang]}
                    </span>
                    <span className="label col-start-2 text-ink2 sm:col-start-auto sm:text-right">
                      {r.state[lang]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        {/* ------------------------------------------------ procedure ----- */}
        <Section id="how" tinted>
          <Reveal>
            <SectionHeader eyebrow={t.how.eyebrow} title={t.how.title} />

            <ol className="mt-12 grid gap-px border-2 border-rulestrong bg-rule md:grid-cols-3">
              {t.how.steps.map((s, i) => (
                <li key={s.n} className="tint p-7">
                  <span className="display block text-4xl text-spot">
                    {numeral(i + 1, lang)}
                  </span>
                  <div className="rule-thin mt-4" />
                  <h3 className="display mt-4 text-2xl">{s.t}</h3>
                  <p className="mt-3 text-sm leading-[1.75] text-ink2">{s.d}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </Section>

        {/* ------------------------------------------------ calendar ------ */}
        <Section id="muhurat">
          <Reveal>
            <SectionHeader
              eyebrow={t.muhurat.eyebrow}
              title={t.muhurat.title}
              lede={t.muhurat.lede}
            />

            <div className="mt-12 overflow-x-auto">
              <table className="w-full min-w-[34rem] border-collapse text-left">
                <thead>
                  <tr className="border-y-2 border-rulestrong">
                    <th className="label py-3 pr-4 text-ink2">
                      {hi ? "पर्व" : "Occasion"}
                    </th>
                    <th className="label py-3 pr-4 text-ink2">
                      {hi ? "विवरण" : "Reckoning"}
                    </th>
                    <th className="label py-3 text-right text-ink2">
                      {hi ? "काल" : "Window"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {DATED_OCCASIONS.slice(0, 6).map((o) => (
                    <tr
                      key={o.slug}
                      className="border-b border-rule transition-colors hover:bg-paper3"
                    >
                      <td className="py-4 pr-4">
                        <Link
                          href={localePath(lang, `/muhurat/${o.slug}`)}
                          className="display text-xl underline decoration-rule decoration-1 hover:decoration-spot"
                        >
                          {o.name[lang]}
                        </Link>
                      </td>
                      <td className="py-4 pr-4 text-sm text-ink2">
                        {o.occurrence.note[lang]}
                      </td>
                      <td className="label py-4 text-right text-ink">
                        {o.occurrence.label[lang]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-5 text-xs text-ink2">
              {hi
                ? "अस्थायी। बुकिंग खुलने से पूर्व हर समय पंचांग से पुष्ट किया जाता है।"
                : "Provisional. Every timing is confirmed against the panchang before booking opens."}
            </p>
          </Reveal>
        </Section>

        {/* ------------------------------------------------ tariff -------- */}
        <Section id="sankalp" tinted>
          <Reveal>
            <SectionHeader
              eyebrow={t.pricing.eyebrow}
              title={t.pricing.title}
              lede={t.pricing.lede}
            />

            <div className="mt-12 grid gap-px border-2 border-rulestrong bg-rule lg:grid-cols-3">
              {t.pricing.plans.map((p, i) => {
                const featured = i === 1;
                return (
                  <div
                    key={p.name}
                    className={`flex flex-col p-7 ${featured ? "bg-paper3" : "tint"}`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="display text-2xl">{p.name}</h3>
                      {featured && (
                        <span className="label bg-spot px-2 py-1 text-paper">
                          {t.pricing.popular}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-ink2">{p.sub}</p>

                    <p className="display mt-6 text-5xl text-spot">{p.price}</p>

                    <div className="rule-thin mt-6" />

                    <ul className="mt-5 flex-1 space-y-3">
                      {p.features.map((f) => (
                        <li
                          key={f}
                          className="flex gap-3 text-sm leading-relaxed text-ink2"
                        >
                          <span className="mt-[0.5rem] h-[3px] w-3 shrink-0 bg-spot" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7">
                      <CTA
                        variant={featured ? "solid" : "ghost"}
                        className="w-full"
                      >
                        {t.pricing.cta} {p.name}
                      </CTA>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </Section>

        {/* ------------------------------------------------ colophon ------ */}
        <section className="border-t-2 border-rulestrong">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-24">
            <Mark className="mx-auto h-12 w-12 text-ink" />
            <div className="rule-double mt-8" />
            <h2 className="display mt-8 text-[2.2rem] leading-tight sm:text-[3.2rem]">
              {t.closing.title}
            </h2>
            <p className="mx-auto mt-5 max-w-lg leading-[1.75] text-ink2">
              {t.closing.lede}
            </p>
            <a href="#sankalp" className="mt-9 inline-block">
              <CTA className="!px-10 !py-4">{t.closing.cta}</CTA>
            </a>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}

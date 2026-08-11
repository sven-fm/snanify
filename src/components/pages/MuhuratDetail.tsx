import Link from "next/link";

import type { Lang } from "@/lib/content";
import { localePath } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/Reveal";
import { CTA, Section, Eyebrow } from "@/components/ui";
import { ProvisionalBadge } from "@/components/pages/MuhuratIndex";
import {
  GHAT_BY_ID,
  MUHURAT,
  OCCASIONS,
  WINDOW_BY_ID,
  muhuratContent,
  type Bilingual,
  type MasaScheme,
  type Occasion,
} from "@/content/muhurat";

const SCHEME_LABEL: Record<MasaScheme, Bilingual> = {
  amanta: { en: "Amanta reckoning", hi: "अमांत गणना" },
  purnimanta: { en: "Purnimanta reckoning", hi: "पूर्णिमांत गणना" },
};

const CLOCK_NOTE: Bilingual = {
  en: "Every timing is given at the ghat first and in your own zone beside it.",
  hi: "प्रत्येक समय पहले घाट का दिया जाता है और उसके साथ आपके समयक्षेत्र का।",
};

/** The link's own words. An arrow on its own has no accessible name. */
const CLOCK_LINK: Bilingual = {
  en: "How we read the clock",
  hi: "घड़ी हम कैसे पढ़ते हैं",
};

/** Devanagari numerals in the Hindi edition, as a printed panchang sets them. */
const DEVA = "०१२३४५६७८९";
function numeral(n: number, lang: Lang): string {
  const s = String(n).padStart(2, "0");
  return lang === "hi" ? [...s].map((d) => DEVA[Number(d)]).join("") : s;
}

/**
 * The Eyebrow primitive renders a <p>, which is right for a kicker above an
 * h1 but wrong for a section label. Sections here need a real heading in
 * order, so this carries the same rule-and-caps treatment on an <h2>.
 */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="label flex items-center gap-3 text-spot">
      <span className="h-[2px] w-6 shrink-0 bg-spot" aria-hidden="true" />
      {children}
    </h2>
  );
}

function neighbours(occasion: Occasion) {
  const i = OCCASIONS.findIndex((o) => o.slug === occasion.slug);
  return {
    prev: i > 0 ? OCCASIONS[i - 1] : undefined,
    next: i >= 0 && i < OCCASIONS.length - 1 ? OCCASIONS[i + 1] : undefined,
  };
}

export function MuhuratDetail({ lang, occasion }: { lang: Lang; occasion: Occasion }) {
  const t = muhuratContent[lang];
  const d = t.detail;
  const { prev, next } = neighbours(occasion);
  const windows = occasion.windows.map((id) => WINDOW_BY_ID[id]).filter(Boolean);

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath={`/muhurat/${occasion.slug}`} />

      <main>
        {/* ---------------- masthead ---------------- */}
        <section className="border-b-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 pt-8 pb-16 sm:px-8 sm:pt-10 sm:pb-20">
            <Link
              href={localePath(lang, "/muhurat")}
              className="label inline-flex min-h-11 items-center gap-2 text-ink2 transition-colors hover:text-spot"
            >
              <span aria-hidden="true">&larr;</span>
              {t.nav.back}
            </Link>

            <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div>
                <div className="ink-in">
                  <Eyebrow>{t.tiers[occasion.tier]}</Eyebrow>
                </div>

                <h1
                  className="ink-in display mt-6 text-[2.7rem] leading-[1.0] sm:text-6xl"
                  style={{ animationDelay: "80ms" }}
                >
                  {occasion.name[lang]}
                </h1>

                <div className="rule-double mt-7 max-w-md" />

                <p
                  className="ink-in mt-6 max-w-lg text-[1.05rem] leading-[1.75] text-ink2"
                  style={{ animationDelay: "160ms" }}
                >
                  {occasion.line[lang]}
                </p>
              </div>

              {/* The provisional window. Date, rule and provenance in one block,
                  so the timing can never be read without its caveat. */}
              <div className="boxed misregister self-start border-2 bg-paper p-7 sm:p-8">
                <h2 className="label text-spot">{d.whenTitle}</h2>
                <div className="rule-thin mt-4" />

                <p className="display mt-5 text-3xl text-ink sm:text-4xl">
                  {occasion.occurrence.label[lang]}
                </p>
                <p className="mt-4 text-sm leading-[1.75] text-ink2">
                  {occasion.occurrence.note[lang]}
                </p>

                <dl className="mt-7 border-t-2 border-rulestrong text-sm">
                  <div className="border-b border-rule py-4">
                    <dt className="label text-ink2">{d.rulePrefix}</dt>
                    <dd className="mt-2 text-ink">{occasion.rule.label[lang]}</dd>
                  </div>
                  <div className="border-b border-rule py-4">
                    <dt className="label text-ink2">{d.resolutionPrefix}</dt>
                    <dd className="mt-2 text-ink">
                      {t.resolutions[occasion.rule.dayResolution]}
                    </dd>
                    <dd className="mt-2 text-xs leading-[1.75] text-ink2">
                      {occasion.rule.resolutionNote[lang]}
                    </dd>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                    <dt className="label text-ink2">{d.cadenceLabel}</dt>
                    <dd className="text-ink">{t.cadences[occasion.cadence]}</dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <ProvisionalBadge lang={lang} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- what it is / why ---------------- */}
        <Section>
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
              <div>
                <SectionTitle>{d.aboutTitle}</SectionTitle>
                <p className="mt-7 max-w-2xl text-[1.05rem] leading-[1.85] text-ink2">
                  {occasion.about[lang]}
                </p>
              </div>

              <aside className="border-t-2 border-rulestrong pt-8 lg:border-t-0 lg:border-l lg:border-rule lg:pt-0 lg:pl-12">
                <h2 className="label text-ink">{d.whyTitle}</h2>
                <div className="rule-thin mt-3" />
                <p className="mt-5 max-w-xl leading-[1.75] text-ink2">{occasion.why[lang]}</p>
              </aside>
            </div>
          </Reveal>
        </Section>

        {/* ---------------- which waters ---------------- */}
        <Section tinted>
          <Reveal>
            <div className="max-w-2xl">
              <SectionTitle>{d.watersTitle}</SectionTitle>
              <p className="mt-6 leading-[1.75] text-ink2">{occasion.ghatsNote[lang]}</p>
            </div>

            <ul className="mt-12 border-t-2 border-rulestrong">
              {occasion.ghats.map((entry, i) => {
                const ghat = GHAT_BY_ID[entry.id];
                if (!ghat) return null;
                return (
                  <li
                    key={entry.id}
                    className="grid gap-x-8 gap-y-3 border-b border-rule py-7 sm:grid-cols-[3rem_16rem_1fr]"
                  >
                    <span className="display text-xl leading-none text-spot">
                      {numeral(i + 1, lang)}
                    </span>

                    <div>
                      <h3 className="display text-xl text-ink">{ghat.river[lang]}</h3>
                      <p className="mt-1 text-sm text-ink2">
                        {ghat.ghat[lang]}, {ghat.city[lang]}
                      </p>
                      <p className="label mt-3 text-ink2">
                        {SCHEME_LABEL[ghat.masaScheme][lang]}
                      </p>
                    </div>

                    <div className="max-w-2xl">
                      {entry.note ? (
                        <p className="text-sm leading-[1.75] text-ink2">{entry.note[lang]}</p>
                      ) : (
                        <p className="text-sm leading-[1.75] text-ink2 italic">
                          {ghat.note[lang]}
                        </p>
                      )}
                      {ghat.refusal && (
                        <p className="mt-4 border-l-2 border-spot pl-5 text-xs leading-[1.75] text-ink2">
                          {ghat.refusal[lang]}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </Section>

        {/* ---------------- the windows ---------------- */}
        <Section>
          <Reveal>
            <div className="max-w-2xl">
              <SectionTitle>{d.windowsTitle}</SectionTitle>
            </div>

            {/* the day's schedule for this occasion, ruled */}
            <ul className="mt-12 border-t-2 border-rulestrong">
              {windows.map((w, i) => (
                <li
                  key={w.id}
                  className="grid gap-x-8 gap-y-4 border-b border-rule py-8 sm:grid-cols-[3rem_15rem_1fr]"
                >
                  <span className="display text-3xl leading-none text-spot">
                    {numeral(i + 1, lang)}
                  </span>

                  <div>
                    <h3 className="display text-2xl">{w.name[lang]}</h3>
                    <p className="label mt-3 text-ink">{t.windows.minutes(w.durationMin)}</p>
                    <p className="label mt-1.5 text-ink2">{t.anchors[w.anchor]}</p>
                  </div>

                  <div className="max-w-2xl">
                    <dl>
                      <div className="border-t border-rule pt-3">
                        <dt className="label text-ink2">{t.windows.formulaLabel}</dt>
                        <dd className="mt-1.5 text-sm text-ink">{w.formula[lang]}</dd>
                      </div>
                    </dl>
                    <p className="mt-5 border-t border-rule pt-3 text-sm leading-[1.75] text-ink2">
                      {w.note[lang]}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-10 max-w-2xl text-sm leading-[1.75] text-ink2">
              {CLOCK_NOTE[lang]}{" "}
              <Link
                href={`${localePath(lang, "/muhurat")}#clock`}
                className="inline-flex min-h-11 items-center gap-2 text-spot underline decoration-spot decoration-1 underline-offset-4"
              >
                {CLOCK_LINK[lang]}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </p>

            <div className="mt-6">
              <ProvisionalBadge lang={lang} />
            </div>
          </Reveal>
        </Section>

        {/* ---------------- what this is not ---------------- */}
        {occasion.notClaimed && (
          <Section tinted>
            <Reveal>
              <div className="max-w-3xl border-l-2 border-spot pl-7 sm:pl-10">
                <h2 className="label text-spot">{d.notClaimedTitle}</h2>
                <p className="mt-6 text-[1.05rem] leading-[1.8] text-ink2">
                  {occasion.notClaimed[lang]}
                </p>
              </div>
            </Reveal>
          </Section>
        )}

        {/* ---------------- provenance ---------------- */}
        <Section>
          <Reveal>
            <div className="max-w-2xl">
              <SectionTitle>{d.provenanceTitle}</SectionTitle>
            </div>

            <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
              <dl className="border-t-2 border-rulestrong text-sm">
                <div className="border-b border-rule py-4">
                  <dt className="label text-ink2">{t.provenance.sourceLabel}</dt>
                  <dd className="mt-2 text-ink">{MUHURAT.provider.displayName[lang]}</dd>
                </div>
                <div className="border-b border-rule py-4">
                  <dt className="label text-ink2">{t.provenance.ayanamsaLabel}</dt>
                  <dd className="mt-2 text-ink">
                    {occasion.panchang.ayanamsa ?? t.provenance.notSet}
                  </dd>
                </div>
                <div className="border-b border-rule py-4">
                  <dt className="label text-ink2">{t.provenance.coordinatesLabel}</dt>
                  <dd className="mt-2 text-ink">{t.provenance.coordinatesPending}</dd>
                </div>
              </dl>

              <div>
                <h3 className="label text-ink">{d.basisTitle}</h3>
                <div className="rule-thin mt-3" />
                <p className="mt-4 max-w-xl text-sm leading-[1.75] text-ink2">
                  {occasion.textualBasis[lang]}
                </p>
                <p className="mt-7 max-w-xl border-t border-rule pt-6 text-sm leading-[1.75] text-ink2">
                  {t.provenance.line}
                </p>
                <div className="mt-6">
                  <ProvisionalBadge lang={lang} />
                </div>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* ---------------- neighbours ---------------- */}
        <section className="border-t-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <div className="grid gap-px bg-rule sm:grid-cols-2">
              {prev ? (
                <Link
                  href={localePath(lang, `/muhurat/${prev.slug}`)}
                  className="group block bg-paper p-6 transition-colors hover:bg-paper3"
                >
                  <p className="label text-ink2">{d.prev}</p>
                  <p className="display mt-2 text-xl text-ink underline decoration-rule decoration-1 group-hover:decoration-spot">
                    {prev.name[lang]}
                  </p>
                </Link>
              ) : (
                <span className="bg-paper" />
              )}

              {next && (
                <Link
                  href={localePath(lang, `/muhurat/${next.slug}`)}
                  className="group block bg-paper p-6 transition-colors hover:bg-paper3 sm:text-right"
                >
                  <p className="label text-ink2">{d.next}</p>
                  <p className="display mt-2 text-xl text-ink underline decoration-rule decoration-1 group-hover:decoration-spot">
                    {next.name[lang]}
                  </p>
                </Link>
              )}
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <Link href={localePath(lang, "/muhurat")}>
                <CTA variant="ghost">{d.backToCalendar}</CTA>
              </Link>
              <Link href={localePath(lang, "/rivers")}>
                <CTA>{t.cta.primary}</CTA>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}

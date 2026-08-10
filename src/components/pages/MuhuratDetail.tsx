import Link from "next/link";

import type { Lang } from "@/lib/content";
import { localePath } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CTA, Section, Eyebrow } from "@/components/ui";
import { ProvisionalBadge, muhuratNavLinks } from "@/components/pages/MuhuratIndex";
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

/**
 * The Eyebrow primitive renders a <p>, which is right for a kicker above an
 * h1 but wrong for a section label. Sections here need a real heading in
 * order, so this carries the same rule-and-caps treatment on an <h2>.
 */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="inscription flex items-center gap-3 text-[0.68rem] text-gold">
      <span className="h-px w-8 bg-gold/50" aria-hidden="true" />
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

      <Header
        lang={lang}
        links={muhuratNavLinks(lang)}
        currentPath={`/muhurat/${occasion.slug}`}
      />

      <main>
        {/* ---------------- masthead ---------------- */}
        <section className="relative overflow-hidden border-b border-line/60">
          <div className="halo" aria-hidden="true" />
          <div className="relative mx-auto max-w-6xl px-5 pt-12 pb-16 sm:px-8 sm:pt-16 sm:pb-20">
            <Link
              href={localePath(lang, "/muhurat")}
              className="inscription inline-flex min-h-11 items-center gap-2 text-[0.6rem] text-ink2 transition-colors hover:text-gold"
            >
              <span aria-hidden="true">←</span>
              {t.nav.back}
            </Link>

            <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div>
                <Eyebrow>{t.tiers[occasion.tier]}</Eyebrow>
                <h1 className="display mt-6 text-[2.7rem] leading-[1.0] sm:text-6xl">
                  {occasion.name[lang]}
                </h1>
                <p className="mt-5 max-w-lg text-[1.05rem] text-ink2">{occasion.line[lang]}</p>
              </div>

              {/* The provisional window. Date, rule and provenance in one block,
                  so the timing can never be read without its caveat. */}
              <div className="rounded-2xl border border-gold/40 bg-bg2/70 p-7 backdrop-blur-sm sm:p-8">
                <h2 className="inscription text-[0.58rem] text-gold">{d.whenTitle}</h2>

                <p className="display mt-5 text-3xl text-ink sm:text-4xl">
                  {occasion.occurrence.label[lang]}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink2">
                  {occasion.occurrence.note[lang]}
                </p>

                <dl className="mt-7 space-y-4 border-t border-line/60 pt-6 text-sm">
                  <div>
                    <dt className="inscription text-[0.55rem] text-ink2/70">{d.rulePrefix}</dt>
                    <dd className="mt-1.5 text-ink">{occasion.rule.label[lang]}</dd>
                  </div>
                  <div>
                    <dt className="inscription text-[0.55rem] text-ink2/70">
                      {d.resolutionPrefix}
                    </dt>
                    <dd className="mt-1.5 text-ink">
                      {t.resolutions[occasion.rule.dayResolution]}
                    </dd>
                    <dd className="mt-2 text-xs leading-relaxed text-ink2">
                      {occasion.rule.resolutionNote[lang]}
                    </dd>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
                    <span className="text-xs text-ink2">
                      <span className="inscription text-[0.55rem] text-ink2/70">
                        {d.cadenceLabel}
                      </span>{" "}
                      · {t.cadences[occasion.cadence]}
                    </span>
                  </div>
                </dl>

                <div className="mt-7 border-t border-line/60 pt-6">
                  <ProvisionalBadge lang={lang} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- what it is / why ---------------- */}
        <Section>
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <h2 className="inscription text-[0.62rem] text-gold">{d.aboutTitle}</h2>
              <p className="mt-6 text-[1.05rem] leading-[1.85] text-ink2">
                {occasion.about[lang]}
              </p>
            </div>

            <aside className="border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
              <h2 className="inscription text-[0.62rem] text-teal">{d.whyTitle}</h2>
              <p className="mt-6 leading-relaxed text-ink2">{occasion.why[lang]}</p>
            </aside>
          </div>
        </Section>

        {/* ---------------- which waters ---------------- */}
        <Section tinted>
          <div className="max-w-2xl">
            <SectionTitle>{d.watersTitle}</SectionTitle>
            <p className="mt-6 leading-relaxed text-ink2">{occasion.ghatsNote[lang]}</p>
          </div>

          <ul className="mt-12 border-t border-line/60">
            {occasion.ghats.map((entry) => {
              const ghat = GHAT_BY_ID[entry.id];
              if (!ghat) return null;
              return (
                <li
                  key={entry.id}
                  className="grid gap-3 border-b border-line/60 py-7 sm:grid-cols-[16rem_1fr] sm:gap-10"
                >
                  <div>
                    <h3 className="display text-xl text-ink">
                      {ghat.river[lang]}
                    </h3>
                    <p className="mt-1 text-sm text-ink2">
                      {ghat.ghat[lang]}, {ghat.city[lang]}
                    </p>
                    <p className="inscription mt-3 text-[0.55rem] text-ink2/60">
                      {SCHEME_LABEL[ghat.masaScheme][lang]}
                    </p>
                  </div>
                  <div>
                    {entry.note ? (
                      <p className="text-sm leading-relaxed text-ink2">{entry.note[lang]}</p>
                    ) : (
                      <p className="text-sm text-ink2/60 italic">{ghat.note[lang]}</p>
                    )}
                    {ghat.refusal && (
                      <p className="mt-4 border-l-2 border-sindoor/50 pl-4 text-xs leading-relaxed text-ink2">
                        {ghat.refusal[lang]}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </Section>

        {/* ---------------- the windows ---------------- */}
        <Section>
          <div className="max-w-2xl">
            <SectionTitle>{d.windowsTitle}</SectionTitle>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-2 lg:gap-14">
            {windows.map((w) => (
              <div key={w.id} className="border-t border-line pt-7">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="display text-2xl">{w.name[lang]}</h3>
                  <p className="inscription text-[0.56rem] text-teal">
                    {t.windows.minutes(w.durationMin)}
                  </p>
                </div>
                <p className="mt-4 text-sm text-ink">{w.formula[lang]}</p>
                <p className="mt-3 text-xs leading-relaxed text-ink2">{w.note[lang]}</p>
                <p className="inscription mt-4 text-[0.55rem] text-ink2/60">{t.anchors[w.anchor]}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 max-w-2xl text-sm text-ink2">
            {CLOCK_NOTE[lang]}{" "}
            <Link
              href={`${localePath(lang, "/muhurat")}#clock`}
              className="inline-flex min-h-11 items-center gap-2 text-gold underline-offset-4 hover:underline"
            >
              {CLOCK_LINK[lang]}
              <span aria-hidden="true">→</span>
            </Link>
          </p>

          <div className="mt-8">
            <ProvisionalBadge lang={lang} />
          </div>
        </Section>

        {/* ---------------- what this is not ---------------- */}
        {occasion.notClaimed && (
          <Section tinted>
            <div className="max-w-3xl border-l-2 border-sindoor/60 pl-7 sm:pl-10">
              <h2 className="inscription text-[0.62rem] text-sindoor">{d.notClaimedTitle}</h2>
              <p className="mt-6 text-[1.05rem] leading-[1.8] text-ink2">
                {occasion.notClaimed[lang]}
              </p>
            </div>
          </Section>
        )}

        {/* ---------------- provenance ---------------- */}
        <Section>
          <div className="max-w-2xl">
            <SectionTitle>{d.provenanceTitle}</SectionTitle>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <dl className="space-y-6 text-sm">
              <div className="border-t border-line/60 pt-5">
                <dt className="inscription text-[0.55rem] text-ink2/70">
                  {t.provenance.sourceLabel}
                </dt>
                <dd className="mt-1.5 text-ink">{MUHURAT.provider.displayName[lang]}</dd>
              </div>
              <div className="border-t border-line/60 pt-5">
                <dt className="inscription text-[0.55rem] text-ink2/70">
                  {t.provenance.ayanamsaLabel}
                </dt>
                <dd className="mt-1.5 text-ink">
                  {occasion.panchang.ayanamsa ?? t.provenance.notSet}
                </dd>
              </div>
              <div className="border-t border-line/60 pt-5">
                <dt className="inscription text-[0.55rem] text-ink2/70">
                  {t.provenance.coordinatesLabel}
                </dt>
                <dd className="mt-1.5 text-ink">{t.provenance.coordinatesPending}</dd>
              </div>
            </dl>

            <div>
              <h3 className="inscription text-[0.55rem] text-ink2/70">{d.basisTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink2">
                {occasion.textualBasis[lang]}
              </p>
              <p className="mt-7 border-t border-line/60 pt-6 text-sm leading-relaxed text-ink2">
                {t.provenance.line}
              </p>
              <div className="mt-6">
                <ProvisionalBadge lang={lang} />
              </div>
            </div>
          </div>
        </Section>

        {/* ---------------- neighbours ---------------- */}
        <section className="border-t border-line/60">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={localePath(lang, `/muhurat/${prev.slug}`)}
                  className="group block rounded-2xl border border-line/70 p-6 transition-colors hover:border-gold/60"
                >
                  <p className="inscription text-[0.55rem] text-ink2/70">{d.prev}</p>
                  <p className="display mt-2 text-xl transition-colors group-hover:text-gold">
                    {prev.name[lang]}
                  </p>
                </Link>
              ) : (
                <span />
              )}

              {next && (
                <Link
                  href={localePath(lang, `/muhurat/${next.slug}`)}
                  className="group block rounded-2xl border border-line/70 p-6 text-right transition-colors hover:border-gold/60"
                >
                  <p className="inscription text-[0.55rem] text-ink2/70">{d.next}</p>
                  <p className="display mt-2 text-xl transition-colors group-hover:text-gold">
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

import Link from "next/link";
import { WaterBand } from "@/components/WaterBand";

/* This page exists in English and Hindi only; see the tier note and the
   FULL_ONLY list at the top of src/lib/locales.ts. `Lang` here is therefore
   the full-depth pair and not the wider set the site serves. */
import type { FullLang as Lang } from "@/lib/locales";
import { localePath } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CTA, Section } from "@/components/ui";
import { ProvisionalBadge } from "@/components/pages/MuhuratIndex";
import {
  GHAT_BY_ID,
  MUHURAT,
  OCCASIONS,
  WINDOW_BY_ID,
  muhuratContent,
  type Occasion,
} from "@/content/muhurat";
import { muhuratIndexContent } from "@/content/muhurat-index";
import { GAUGES } from "@/lib/riverdata";
import { horizonFrom, resolveOccasion, RESOLVER, sayResolved } from "@/lib/occasions";

/** A section heading, in order after the h1. */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="display text-[1.9rem] leading-tight sm:text-[2.4rem]">{children}</h2>;
}

function neighbours(occasion: Occasion) {
  const i = OCCASIONS.findIndex((o) => o.slug === occasion.slug);
  return {
    prev: i > 0 ? OCCASIONS[i - 1] : undefined,
    next: i >= 0 && i < OCCASIONS.length - 1 ? OCCASIONS[i + 1] : undefined,
  };
}

export function MuhuratDetail({ lang, occasion }: { lang: Lang; occasion: Occasion }) {
  /* The shared keys (meta, nav, cta, provenance, tiers, windows, anchors) live
     in content/muhurat-index/; the detail-only keys stayed in muhurat.ts. */
  const t = { ...muhuratIndexContent[lang], ...muhuratContent[lang] };
  const d = t.detail;
  const { from, to } = horizonFrom(new Date());
  const dates = resolveOccasion(occasion, from, to);
  const gauge = GAUGES.find((g) => g.slug === (dates[0]?.ghat ?? "ganga-haridwar")) ?? GAUGES[0];
  const ghatRecord = GHAT_BY_ID[gauge.slug];
  const ghatName = ghatRecord ? `${ghatRecord.ghat[lang]}, ${ghatRecord.city[lang]}` : gauge.slug;
  /* A sankranti after sunset at the ghat is kept next day by many; say so. */
  const afterSunset = (() => {
    const first = dates[0];
    if (!first || first.kind !== "instant" || !first.instant) return false;
    const hourIst = (new Date(first.instant).getUTCHours() + 5.5) % 24;
    return hourIst >= 18 || hourIst < 5;
  })();
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
              className="inline-flex min-h-11 items-center text-sm text-ink2 underline decoration-rule decoration-1 underline-offset-4 transition-colors hover:decoration-spot"
            >
              {t.nav.back}
            </Link>

            <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div>
                <h1 className="ink-in display text-[2.7rem] leading-[1.0] sm:text-6xl">
                  {occasion.name[lang]}
                </h1>

                <div className="rule-double mt-7 max-w-md" />
                <WaterBand seed={occasion.slug} className="mt-5 h-12 w-full sm:h-14" />

                <p
                  className="ink-in mt-6 max-w-lg text-[1.05rem] leading-[1.75] text-ink2"
                  style={{ animationDelay: "120ms" }}
                >
                  {occasion.line[lang]}
                </p>
              </div>

              {/* The provisional window. Date, rule and provenance in one block,
                  so the timing can never be read without its caveat. */}
              <div className="boxed self-start border-2 bg-paper p-7 sm:p-8">
                <h2 className="display text-xl text-ink">{d.whenTitle}</h2>
                <div className="rule-thin mt-4" />

                {/* The dates, computed at the ghat's own sunrise for the
                    twelve months from today. A dated occasion has one; a
                    recurring one lists what is coming. */}
                {dates.length === 1 ? (
                  <p className="display mt-5 text-[1.7rem] leading-[1.25] text-ink sm:text-[2.1rem]" data-occasion-date={dates[0].date}>
                    {sayResolved(dates[0], lang)}
                  </p>
                ) : (
                  <>
                    <p className="label mt-5 text-ink2">{t.provenance.dates.next}</p>
                    <ul className="mt-2 border-t border-rule">
                      {dates.map((d) => (
                        <li key={d.date} className="border-b border-rule py-2 text-[1.02rem] text-ink" data-occasion-date={d.date}>
                          {sayResolved(d, lang)}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {dates.length === 1 && dates[0].kind === "instant" && afterSunset && (
                  <p className="mt-3 text-sm leading-[1.75] text-ink2">{t.provenance.dates.afterSunset}</p>
                )}
                <p className="mt-4 text-sm leading-[1.75] text-ink2">
                  {t.provenance.dates.by.replace("{ghat}", ghatName)}
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
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule py-4">
                    <dt className="label text-ink2">{d.tierLabel}</dt>
                    <dd className="text-ink">{t.tiers[occasion.tier]}</dd>
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

        {/* ---------------- what it is ---------------- */}
        <Section>
          <div className="max-w-3xl">
            <SectionTitle>{d.aboutTitle}</SectionTitle>
            <p className="mt-6 max-w-2xl text-[1.05rem] leading-[1.85] text-ink2">
              {occasion.about[lang]}
            </p>
          </div>
        </Section>

        {/* ---------------- which waters ---------------- */}
        <Section tinted>
          <div className="max-w-2xl">
            <SectionTitle>{d.watersTitle}</SectionTitle>
            <p className="mt-5 leading-[1.75] text-ink2">{occasion.ghatsNote[lang]}</p>
          </div>

          <ul className="mt-10 border-t-2 border-rulestrong">
            {occasion.ghats.map((entry) => {
              const ghat = GHAT_BY_ID[entry.id];
              if (!ghat) return null;
              return (
                <li
                  key={entry.id}
                  className="grid gap-x-8 gap-y-3 border-b border-rule py-7 sm:grid-cols-[16rem_1fr]"
                >
                  <div>
                    <h3 className="display text-xl text-ink">{ghat.river[lang]}</h3>
                    <p className="mt-1 text-sm text-ink2">
                      {ghat.ghat[lang]}, {ghat.city[lang]}
                    </p>
                    <p className="mt-2 text-sm text-ink2">{t.schemes[ghat.masaScheme]}</p>
                  </div>

                  <p className="max-w-2xl text-sm leading-[1.75] text-ink2">
                    {entry.note ? entry.note[lang] : ghat.note[lang]}
                  </p>
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

          {/* the day's schedule for this occasion, ruled */}
          <ul className="mt-10 border-t-2 border-rulestrong">
            {windows.map((w) => (
              <li
                key={w.id}
                className="grid gap-x-8 gap-y-4 border-b border-rule py-8 sm:grid-cols-[15rem_1fr]"
              >
                <div>
                  <h3 className="display text-2xl">{w.name[lang]}</h3>
                  <p className="mt-2 text-sm text-ink">{t.windows.minutes(w.durationMin)}</p>
                  <p className="mt-1 text-sm text-ink2">{t.anchors[w.anchor]}</p>
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

          <p className="mt-8 max-w-2xl text-sm leading-[1.75] text-ink2">
            {d.clockNote}{" "}
            <Link
              href={`${localePath(lang, "/muhurat")}#clock`}
              className="inline-flex min-h-11 items-center text-ink underline decoration-rule decoration-1 underline-offset-4 transition-colors hover:decoration-spot"
            >
              {d.clockLink}
            </Link>
          </p>

          <div className="mt-6">
            <ProvisionalBadge lang={lang} />
          </div>
        </Section>

        {/* ---------------- provenance ---------------- */}
        <Section tinted>
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
                  {occasion.panchang.ayanamsa ?? RESOLVER.ayanamsaName[lang]}
                </dd>
              </div>
              <div className="border-b border-rule py-4">
                <dt className="label text-ink2">{t.provenance.coordinatesLabel}</dt>
                <dd className="mt-2 text-ink">
                  {ghatName}: {gauge.ghat[0].toFixed(4)}, {gauge.ghat[1].toFixed(4)}
                </dd>
              </div>
            </dl>

            <div>
              <h3 className="display text-xl text-ink">{d.basisTitle}</h3>
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
                  <p className="text-sm text-ink2">{d.prev}</p>
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
                  <p className="text-sm text-ink2">{d.next}</p>
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

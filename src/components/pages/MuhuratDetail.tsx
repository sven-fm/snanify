import Link from "next/link";

import type { Lang } from "@/lib/locales";
import { localePath } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Section } from "@/components/ui";
import { ctaHref } from "@/lib/nav";
import { Festival, H2, H3, QUIET, RefClose, RefHead, TABLE_GROUND, W700 } from "@/components/site/Reference";
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
import { horizonFrom, inWindow, resolveOccasion, RESOLVER, sayResolved } from "@/lib/occasions";

/** A section heading, in order after the h1. */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className={H2} style={W700}>
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
  /* Inside its window the occasion gets the festival panel (spec 6.6). */
  const now = inWindow(dates);

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath={`/muhurat/${occasion.slug}`} />

      <main>
        {/* ---------------- masthead ----------------
            The occasion's own name is the headline, all of it in sindoor. */}
        <RefHead
          lang={lang}
          title=""
          accent={occasion.name[lang]}
          plain={occasion.line[lang]}
          wide
          before={
            <Link
              href={localePath(lang, "/muhurat")}
              className="inline-flex min-h-11 items-center text-sm text-ink2 underline decoration-rule decoration-1 underline-offset-4 active:text-sindoor"
            >
              {t.nav.back}
            </Link>
          }
        >
          {occasion.aka && (
            <p className="mt-2 text-sm text-ink2">{d.alsoCalled.replace("{aka}", occasion.aka[lang])}</p>
          )}
          {now && (
            <div className="mt-6">
              <Festival name={occasion.name[lang]}>{sayResolved(now, lang)}</Festival>
            </div>
          )}
        </RefHead>

        <section>
          <div className="mx-auto max-w-6xl px-5 pb-12 sm:px-8">
            <div className="max-w-2xl">
              {/* The provisional window. Date, rule and provenance in one block,
                  so the timing can never be read without its caveat. */}
              <div className="bg-paper2 p-5 sm:p-7">
                <h2 className={H3} style={W700}>
                  {d.whenTitle}
                </h2>

                {/* The dates, computed at the ghat's own sunrise for the
                    twelve months from today. A dated occasion has one; a
                    recurring one lists what is coming. */}
                {dates.length === 1 ? (
                  <p className="display mt-4 text-[1.5rem] leading-[1.25] text-ink sm:text-[1.9rem]" style={W700} data-occasion-date={dates[0].date}>
                    {sayResolved(dates[0], lang)}
                  </p>
                ) : (
                  <>
                    <p className="label mt-5 text-ink2">{t.provenance.dates.next}</p>
                    <ul className="mt-2">
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

                <dl className="mt-8 space-y-5 text-sm">
                  <div>
                    <dt className="label text-ink2">{d.rulePrefix}</dt>
                    <dd className="mt-2 text-ink">{occasion.rule.label[lang]}</dd>
                  </div>
                  <div>
                    <dt className="label text-ink2">{d.resolutionPrefix}</dt>
                    <dd className="mt-2 text-ink">
                      {t.resolutions[occasion.rule.dayResolution]}
                    </dd>
                    <dd className="mt-2 text-xs leading-[1.75] text-ink2">
                      {occasion.rule.resolutionNote[lang]}
                    </dd>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <dt className="label text-ink2">{d.tierLabel}</dt>
                    <dd className="text-ink">{t.tiers[occasion.tier]}</dd>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
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
        <Section>
          <div className="max-w-2xl">
            <SectionTitle>{d.watersTitle}</SectionTitle>
            <p className="mt-5 leading-[1.75] text-ink2">{occasion.ghatsNote[lang]}</p>
          </div>

          <ul className="mt-10">
            {occasion.ghats.map((entry) => {
              const ghat = GHAT_BY_ID[entry.id];
              if (!ghat) return null;
              return (
                <li
                  key={entry.id}
                  className="grid gap-x-8 gap-y-3 border-b border-rule py-7 sm:grid-cols-[16rem_1fr]"
                >
                  <div>
                    <h3 className={H3} style={W700}>{ghat.river[lang]}</h3>
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
          <ul className={`mt-8 ${TABLE_GROUND}`}>
            {windows.map((w) => (
              <li
                key={w.id}
                className="grid gap-x-8 gap-y-4 border-b border-rule py-7 last:border-b-0 sm:grid-cols-[15rem_1fr]"
              >
                <div>
                  <h3 className={H3} style={W700}>{w.name[lang]}</h3>
                  <p className="mt-2 text-sm text-ink">{t.windows.minutes(w.durationMin)}</p>
                  <p className="mt-1 text-sm text-ink2">{t.anchors[w.anchor]}</p>
                </div>

                <div className="max-w-2xl">
                  <dl>
                    <div>
                      <dt className="label text-ink2">{t.windows.formulaLabel}</dt>
                      <dd className="mt-1.5 text-sm text-ink">{w.formula[lang]}</dd>
                    </div>
                  </dl>
                  <p className="mt-6 text-sm leading-[1.75] text-ink2">
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
              className={QUIET}
            >
              {d.clockLink}
            </Link>
          </p>

          <div className="mt-6">
            <ProvisionalBadge lang={lang} />
          </div>
        </Section>

        {/* ---------------- provenance ---------------- */}
        <Section>
          <div className="max-w-2xl">
            <SectionTitle>{d.provenanceTitle}</SectionTitle>
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <dl className="space-y-6 text-sm">
              <div>
                <dt className="label text-ink2">{t.provenance.sourceLabel}</dt>
                <dd className="mt-2 text-ink">{MUHURAT.provider.displayName[lang]}</dd>
              </div>
              <div>
                <dt className="label text-ink2">{t.provenance.ayanamsaLabel}</dt>
                <dd className="mt-2 text-ink">
                  {occasion.panchang.ayanamsa ?? RESOLVER.ayanamsaName[lang]}
                </dd>
              </div>
              <div>
                <dt className="label text-ink2">{t.provenance.coordinatesLabel}</dt>
                <dd className="mt-2 text-ink">
                  {ghatName}: {gauge.ghat[0].toFixed(4)}, {gauge.ghat[1].toFixed(4)}
                </dd>
              </div>
            </dl>

            <div>
              <h3 className={H3} style={W700}>{d.basisTitle}</h3>
              <p className="mt-4 max-w-xl text-sm leading-[1.75] text-ink2">
                {occasion.textualBasis[lang]}
              </p>
              <p className="mt-8 max-w-xl text-sm leading-[1.75] text-ink2">
                {t.provenance.line}
              </p>
              <div className="mt-6">
                <ProvisionalBadge lang={lang} />
              </div>
            </div>
          </div>
        </Section>

        {/* ---------------- neighbours ---------------- */}
        <section>
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
            <ul className="border-t border-rule sm:grid sm:grid-cols-2 sm:gap-x-8 sm:border-t-0">
              {(
                [
                  [prev, d.prev],
                  [next, d.next],
                ] as const
              ).map(([o, label]) =>
                o ? (
                  <li key={o.slug} className="border-b border-rule">
                    <Link href={localePath(lang, `/muhurat/${o.slug}`)} className="group block py-4">
                      <span className="block text-sm text-ink2">{label}</span>
                      <span className="display mt-1 block text-[1.25rem] text-ink underline decoration-rule decoration-1 underline-offset-4 group-active:text-sindoor" style={W700}>
                        {o.name[lang]}
                      </span>
                    </Link>
                  </li>
                ) : null,
              )}
            </ul>
            <Link href={localePath(lang, "/muhurat")} className={`${QUIET} mt-4`}>
              {d.backToCalendar}
            </Link>
          </div>
        </section>

        <RefClose title={t.cta.title} body={t.cta.lede} label={t.cta.snan} href={ctaHref(lang)}>
          <Link href={localePath(lang, "/rivers")} className={`${QUIET} mt-4`}>
            {t.cta.primary}
          </Link>
        </RefClose>
      </main>

      <Footer lang={lang} />
    </>
  );
}

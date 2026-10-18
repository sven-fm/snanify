import Link from "next/link";
import { localePath } from "@/lib/i18n";
import type { Lang } from "@/lib/locales";
import { waterName } from "@/content/names";
import { ctaHref } from "@/lib/nav";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { RiverHorizon } from "@/components/kit";
import { H2, H3, QUIET, QUIET_ROW, RefClose, RefHead, W700 } from "@/components/site/Reference";
import { Reading, readingView } from "@/components/live/Reading";
import { clock } from "@/components/live/WaterDetail";
import { InView } from "@/components/live/InView";
import { getGhat } from "@/content/rivers";
import { fill, liveContent } from "@/content/live";
import { SOURCES, istWallClock, type LiveSnapshot } from "@/lib/riverdata";

/* ---------------------------------------------------------------------------
   /live, the free page: the six at a glance (the owner's ruling of
   18 October 2026).

   Built for a 390px viewport first, because this is a page people open at
   six in the morning on a phone:

   1. The head: one capitals headline with the rivers in sindoor, and one
      plain sentence.
   2. The six, each as its name, its place, and the reading (the state word,
      the gauge, the exact figure and rank, the source line), and a full-width
      quiet row to the river's own page (QUIET_ROW: one press per screen, so
      the six are not presses; the river's page carries the press). Everything else about a water this morning,
      the trend, the usual range, the eleven model days, the sky and the
      register, is on that page (src/components/live/WaterDetail.tsx).
   3. Where the numbers come from, and the one press, inviting the snan.

   The rule that outranks the rest: a number appears here only with its
   provenance and its date beside it. The `Discharge` union is what makes
   that structural rather than a matter of care, see `riverdata.ts`.
   --------------------------------------------------------------------------- */

export function LiveRivers({ lang, snapshot }: { lang: Lang; snapshot: LiveSnapshot }) {
  const t = liveContent[lang];

  /* Our own clock, labelled as ours. It is not a reading time and the copy
     beside it does not pretend it is. */
  const assembledAt = clock(istWallClock(new Date(snapshot.generatedAt)));

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath="/live" />

      <main>
        <RefHead lang={lang} title={t.head.title} accent={t.head.accent} plain={t.head.plain} wide />

        {/* ------------------------------------------- the six at a glance --- */}
        <section>
          <div className="mx-auto max-w-3xl px-5 pb-10 sm:px-8 lg:max-w-6xl">
            <InView as="ul" className="grid gap-x-14 lg:grid-cols-2">
              {snapshot.waters.map((water, i) => {
                const ghat = getGhat(water.slug);
                if (!ghat) return null;
                const river = waterName(ghat, "river", lang);
                return (
                  <li
                    key={water.slug}
                    id={water.slug}
                    className="reveal scroll-mt-20 border-b border-rule py-10 first:pt-2 lg:[&:nth-child(2)]:pt-2"
                    style={{ ["--i" as string]: i }}
                  >
                    <h2 className="display text-[1.75rem] leading-[1.1] text-sindoor sm:text-[2.1rem]" style={{ fontWeight: 800 }}>
                      {river}
                    </h2>
                    <p className="mt-1 text-sm text-ink2">
                      {waterName(ghat, "ghat", lang)}, {waterName(ghat, "city", lang)}
                    </p>
                    <Reading className="mt-5" view={readingView(water, lang)} lang={lang} />
                    <Link data-open-river href={localePath(lang, `/rivers/${water.slug}`)} className={`${QUIET_ROW} mt-6`}>
                      <span className="underline decoration-ink decoration-2 underline-offset-4">
                        {fill(t.open, { river })}
                      </span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                );
              })}
            </InView>

            <p className="mt-6 text-sm leading-[1.6] text-ink2">
              {fill(t.assembled, { time: assembledAt })} {t.modelledEvery}
            </p>
          </div>
        </section>

        {/* The full river, below the readings (spec 5.6). */}
        <div className="mx-auto max-w-3xl">
          <RiverHorizon height={120} />
        </div>

        {/* -------------------------------------------- how we know it --- */}
        <section>
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
            <h2 className={H2} style={W700}>
              {t.provenance.heading}
            </h2>

            <div className="mt-6 space-y-5">
              {t.provenance.paras.map((para) => (
                <p key={para.slice(0, 24)} className="text-[0.98rem] leading-[1.75] text-ink2">
                  {para}
                </p>
              ))}
            </div>

            <h3 className={`${H3} mt-12`} style={W700}>
              {t.provenance.attributionLabel}
            </h3>
            <ul className="mt-3 space-y-2">
              {t.provenance.attribution.map((line) => (
                <li key={line.slice(0, 24)} className="text-[0.9rem] leading-[1.7] text-ink2">
                  {line}
                </li>
              ))}
            </ul>

            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              <li>
                <a href={SOURCES.discharge.modelHref} rel="noopener noreferrer external" className={QUIET}>
                  Copernicus EMS
                </a>
              </li>
              <li>
                <a href={SOURCES.discharge.href} rel="noopener noreferrer external" className={QUIET}>
                  Open-Meteo
                </a>
              </li>
              <li>
                <a href={SOURCES.registry.href} rel="noopener noreferrer external" className={QUIET}>
                  {SOURCES.registry.shortName}
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------- close --- */}
        <RefClose title={t.close.title} body={t.close.body} label={t.close.cta} href={ctaHref(lang)}>
          <ul className="mt-6">
            {(
              [
                ["/rivers", t.close.links.rivers],
                ["/muhurat", t.close.links.muhurat],
                ["/panchang", t.close.links.panchang],
              ] as const
            ).map(([path, label]) => (
              <li key={path}>
                <Link href={localePath(lang, path)} className={QUIET}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </RefClose>
      </main>

      <Footer lang={lang} />
    </>
  );
}

import Link from "next/link";
import type { Lang } from "@/lib/locales";
import { localePath } from "@/lib/i18n";
import { ctaHref } from "@/lib/nav";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { H2, QUIET, RefClose, RefHead, W700 } from "@/components/site/Reference";
import { CityFinder, type FinderGroup } from "@/components/pages/CityFinder";
import { citiesByCountry } from "@/content/cities";
import { panchangContent } from "@/content/panchang";
import { RIVERS } from "@/content/rivers";
import { MUHURAT } from "@/content/muhurat";

/* ---------------------------------------------------------------------------
   /panchang, the directory, in v3 (spec 6.6): the capitals headline, the
   three hundred cities behind a filter, the shraddha guide, the six ghats,
   the ways onward, and the one press at the end. The explainers live on
   /panchang/shraddha, where the reader who needs them will finish them.
   --------------------------------------------------------------------------- */

/** The registry, flattened to what the finder needs on the client. */
export function finderGroups(lang: Lang): readonly FinderGroup[] {
  return citiesByCountry(lang).map((g) => ({
    code: g.country.code,
    name: g.country.name[lang],
    cities: g.cities.map((c) => ({
      slug: c.slug,
      name: c.name[lang],
      nameEn: c.name.en,
      region: c.region?.[lang],
      regionEn: c.region?.en,
      country: c.country[lang],
      countryEn: c.country.en,
    })),
  }));
}

/** A ruled row: a name on the left, where it is on the right. */
export function PlaceRow({ href, title, sub }: { href: string; title: string; sub?: string }) {
  return (
    <li className="border-b border-rule">
      <Link href={href} className="group flex min-h-[48px] items-baseline justify-between gap-3 py-3">
        <span className="display text-[1.125rem] text-ink group-active:text-sindoor" style={W700}>
          {title}
        </span>
        {sub && <span className="text-right text-sm text-ink2">{sub}</span>}
      </Link>
    </li>
  );
}

export function Panchang({ lang }: { lang: Lang }) {
  const t = panchangContent[lang];
  const groups = finderGroups(lang);

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath="/panchang" />

      <main>
        <RefHead lang={lang} title={t.head.title} accent={t.head.accent} plain={t.hero.lede} wide />

        {/* ---------------- the cities ---------------- */}
        <section id="cities" className="scroll-mt-16">
          <div className="mx-auto max-w-6xl px-5 pb-14 sm:px-8">
            <p className="max-w-2xl leading-[1.6] text-ink2">{t.cities.lede}</p>
            <div className="mt-8">
              <CityFinder lang={lang} groups={groups} t={t.finder} />
            </div>
          </div>
        </section>

        {/* ---------------- the shraddha guide ---------------- */}
        <section id="shraddha" className="scroll-mt-16">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <div className="max-w-3xl">
              <h2 className={H2} style={W700}>
                {t.guide.title}
              </h2>
              <p className="mt-3 leading-[1.6] text-ink2">{t.guide.lede}</p>
              <Link href={localePath(lang, "/panchang/shraddha")} className={`${QUIET} mt-4`}>
                {t.guide.cta}
              </Link>
            </div>
          </div>
        </section>

        {/* ---------------- the six waters ---------------- */}
        <section id="ghats" className="scroll-mt-16">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <h2 className={H2} style={W700}>
              {t.ghats.title}
            </h2>
            <p className="mt-3 max-w-2xl leading-[1.6] text-ink2">{t.ghats.lede}</p>
            <ul className="mt-6 border-t border-rule sm:grid sm:grid-cols-2 sm:gap-x-8 sm:border-t-0 lg:grid-cols-3">
              {RIVERS.map((g) => (
                <PlaceRow
                  key={g.slug}
                  href={localePath(lang, `/rivers/${g.slug}`)}
                  title={g.river[lang]}
                  sub={`${g.city[lang]}, ${g.state[lang]}`}
                />
              ))}
            </ul>
            <Link href={localePath(lang, "/live")} className={`${QUIET} mt-4`}>
              {t.ghats.live}
            </Link>
          </div>
        </section>

        {/* ---------------- onward ---------------- */}
        <section>
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <h2 className={H2} style={W700}>
              {t.close.title}
            </h2>
            <ul className="mt-4">
              {t.close.links.map((l) => (
                <li key={l.href}>
                  <Link href={localePath(lang, l.href)} className={QUIET}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-[1.7] text-ink2">{t.close.note}</p>
            <p className="mt-4 max-w-2xl text-xs leading-[1.75] text-ink2">{MUHURAT.provider.note[lang]}</p>
          </div>
        </section>

        <RefClose title={t.close.snan} label={t.close.cta} href={ctaHref(lang)} />
      </main>

      <Footer lang={lang} />
    </>
  );
}

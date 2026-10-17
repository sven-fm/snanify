import Link from "next/link";
import { WaterBand } from "@/components/WaterBand";
import type { Lang } from "@/lib/locales";
import { localePath } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Mark } from "@/components/Logo";
import { Section } from "@/components/ui";
import { CityFinder, type FinderGroup } from "@/components/pages/CityFinder";
import { citiesByCountry } from "@/content/cities";
import { panchangContent } from "@/content/panchang";
import { RIVERS } from "@/content/rivers";
import { MUHURAT } from "@/content/muhurat";

/* ---------------------------------------------------------------------------
   /panchang: the directory. A masthead, the shraddha guide in one tinted block, the
   three hundred cities behind a filter, the six ghats, and the way onward.
   The explainers live on /panchang/shraddha, where the reader who needs them
   will finish them.
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

export function Panchang({ lang }: { lang: Lang }) {
  const t = panchangContent[lang];
  const groups = finderGroups(lang);

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath="/panchang" />

      <main>
        {/* ---------------- masthead ---------------- */}
        <section>
          <div className="mx-auto max-w-6xl px-5 pt-16 pb-20 sm:px-8 sm:pt-20 sm:pb-24">
            <h1
              className="ink-in display max-w-3xl text-[2.6rem] leading-[1] sm:text-6xl lg:text-7xl"
              style={{ animationDelay: "80ms" }}
            >
              {t.hero.title}
            </h1>

            <WaterBand seed="panchang" className="mt-8 h-14 w-full max-w-3xl sm:h-16" />

            <p
              className="ink-in mt-6 max-w-3xl text-[1.05rem] leading-[1.75] text-ink2"
              style={{ animationDelay: "160ms" }}
            >
              {t.hero.lede}
            </p>
          </div>
        </section>

        {/* ---------------- the cities ---------------- */}
        <Section id="cities">
          <p className="max-w-3xl leading-relaxed text-ink2">{t.cities.lede}</p>
          <div className="mt-10">
            <CityFinder lang={lang} groups={groups} t={t.finder} />
          </div>
        </Section>

        {/* ---------------- the shraddha guide ---------------- */}
        <Section id="shraddha" tinted>
          <div className="bg-paper2 p-6 sm:p-8 [&>*]:max-w-3xl">
            <p className="label text-ink2">{t.guide.kicker}</p>
            <h2 className="display mt-3 text-[2.1rem] leading-tight sm:text-[2.9rem]">{t.guide.title}</h2>
            <p className="mt-4 leading-relaxed text-ink2">{t.guide.lede}</p>
            <Link
              href={localePath(lang, "/panchang/shraddha")}
              className="label impress mt-8 inline-flex min-h-[48px] items-center bg-sindoor px-7 text-paper hover:bg-ink active:bg-ink"
            >
              {t.guide.cta}
            </Link>
          </div>
        </Section>

        {/* ---------------- the six waters ---------------- */}
        <Section id="ghats">
          <div className="max-w-3xl">
            <h2 className="display text-[2.1rem] leading-tight sm:text-[2.9rem]">{t.ghats.title}</h2>
            <p className="mt-4 leading-relaxed text-ink2">{t.ghats.lede}</p>
          </div>
          <ul className="mt-10 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-8">
            {RIVERS.map((g) => (
              <li key={g.slug} className="border-b border-rule">
                <Link
                  href={localePath(lang, `/rivers/${g.slug}`)}
                  className="impress flex min-h-[48px] items-baseline justify-between gap-3 py-3 text-ink active:text-sindoor"
                >
                  <span className="display text-[1.1rem]">{g.river[lang]}</span>
                  <span className="text-right text-sm text-ink2">
                    {g.city[lang]}, {g.state[lang]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={localePath(lang, "/live")}
            className="impress mt-8 inline-flex min-h-[44px] items-center text-ink underline decoration-rule decoration-1 underline-offset-4 active:text-sindoor"
          >
            {t.ghats.live}
          </Link>
        </Section>

        {/* ---------------- onward ---------------- */}
        <section>
          <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="text-center">
              <Mark className="mx-auto h-12 w-12 text-ink" />
              <h2 className="display mt-10 text-[2.2rem] leading-tight sm:text-[3rem]">{t.close.title}</h2>
            </div>

            <ul className="mt-12">
              {t.close.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={localePath(lang, l.href)}
                    className="impress flex min-h-[56px] items-center py-4 text-ink active:text-sindoor"
                  >
                    <span className="display text-xl underline decoration-rule decoration-1 underline-offset-4">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-10 text-center text-xs leading-[1.75] text-ink2">{t.close.note}</p>

            <p className="mx-auto mt-16 max-w-2xl text-center text-xs leading-[1.75] text-ink2">
              {MUHURAT.provider.note[lang]}
            </p>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}

import Link from "next/link";
import { CITIES, type City } from "@/content/cities";
import { RIVERS } from "@/content/rivers";
import { panchangCityContent } from "@/content/panchang-city";
import { PAKSHA_NAMES } from "@/lib/sky";
import type { CityDay } from "@/lib/city-day";
import { localePath, type Lang } from "@/lib/locales";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { H2, QUIET, RefClose, RefHead, TABLE_GROUND, W700 } from "@/components/site/Reference";
import { PlaceRow } from "@/components/pages/Panchang";
import { ctaHref } from "@/lib/nav";
import { greatCircleKm } from "@/lib/distance";
import { isIndexableCity } from "@/lib/indexable";

/* ---------------------------------------------------------------------------
   One city's morning, in v3 (spec 6.6): the capitals headline with the city
   in sindoor, then a table of hairline rows on the tint, each row the city's
   own clock on the left and the ghat's IST on the right, so a reader in
   Leicester sees both without arithmetic. The one press closes the page.
   --------------------------------------------------------------------------- */

/** Eight cities near this one: the indexed ones within a day's drive first,
    then the nearest of the rest. The whole list is one link away on /panchang. */
const NEIGHBOURS = 8;
const NEAR_KM = 1000;

function nearest(city: City): readonly City[] {
  const byDistance = CITIES.filter((x) => x.slug !== city.slug)
    .map((x) => ({ x, d: greatCircleKm([city.lat, city.lon], [x.lat, x.lon]) }))
    .sort((a, b) => a.d - b.d);
  const indexed = byDistance.filter(({ x, d }) => d <= NEAR_KM && isIndexableCity(x.slug));
  const rest = byDistance.filter((n) => !indexed.includes(n));
  return [...indexed, ...rest].slice(0, NEIGHBOURS).map(({ x }) => x);
}

const DEVA = "०१२३४५६७८९";
const deva = (s: string, lang: Lang) =>
  lang === "hi" ? [...s].map((ch) => (ch >= "0" && ch <= "9" ? DEVA[Number(ch)] : ch)).join("") : s;

function clock(at: Date, zone: string, lang: Lang): string {
  const s = new Intl.DateTimeFormat("en-GB", { timeZone: zone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(at);
  return deva(s, lang);
}

function dayOf(at: Date, zone: string, lang: Lang): string {
  const s = new Intl.DateTimeFormat(lang === "hi" ? "hi-IN" : "en-GB", { timeZone: zone, weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(at);
  return deva(s, lang);
}

/** "Wed 16 Sep, 05:12" only when the instant's date differs from `on` in that zone. */
function withDate(at: Date, on: Date, zone: string, lang: Lang): string {
  const civil = (d: Date) => new Intl.DateTimeFormat("en-CA", { timeZone: zone, year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
  const time = clock(at, zone, lang);
  if (civil(at) === civil(on)) return time;
  const d = new Intl.DateTimeFormat(lang === "hi" ? "hi-IN" : "en-GB", { timeZone: zone, day: "numeric", month: "short" }).format(at);
  return `${deva(d, lang)}, ${time}`;
}

const IST = "Asia/Kolkata";

export function CityPanchang({ lang, city, day }: { lang: Lang; city: City; day: CityDay }) {
  const t = panchangCityContent[lang];
  const name = city.name[lang];
  const fill = (s: string) => s.replace(/\{city\}/g, name);
  const neighbours = nearest(city);
  const tithi = `${day.tithi.name[lang]}, ${PAKSHA_NAMES[day.tithi.paksha][lang]}`;
  const ends = day.tithi.endsAt ? new Date(day.tithi.endsAt) : null;

  const rows: { label: string; local: string; ist: string }[] = [
    { label: t.rows.sunrise, local: clock(day.sunrise, city.zone, lang), ist: withDate(day.sunrise, day.sunrise, IST, lang) },
    {
      label: t.rows.brahma,
      local: `${clock(day.brahma.start, city.zone, lang)} ${t.to} ${clock(day.brahma.end, city.zone, lang)}`,
      ist: `${withDate(day.brahma.start, day.sunrise, IST, lang)} ${t.to} ${clock(day.brahma.end, IST, lang)}`,
    },
    { label: t.rows.sunset, local: clock(day.sunset, city.zone, lang), ist: withDate(day.sunset, day.sunrise, IST, lang) },
    { label: t.rows.tithi, local: tithi, ist: "" },
    ...(ends
      ? [{ label: t.rows.ends, local: withDate(ends, day.sunrise, city.zone, lang), ist: withDate(ends, day.sunrise, IST, lang) }]
      : []),
    { label: t.rows.tomorrow, local: withDate(day.sunriseTomorrow, day.sunrise, city.zone, lang), ist: withDate(day.sunriseTomorrow, day.sunrise, IST, lang) },
  ];

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header lang={lang} currentPath="/panchang" />
      <main>
        <RefHead lang={lang} title={t.title.replace("{city}", "{accent}")} accent={name} plain={fill(t.lede)} wide>
          <p className="mt-3 text-sm text-ink2">
            <span className="mr-2">{t.rows.date}</span>
            <span className="text-ink">{dayOf(day.sunrise, city.zone, lang)}</span>
          </p>
        </RefHead>

        {/* ---------------- the morning, as a table ----------------
            The columns line up, so the rows keep their hairlines on the
            tint. Three columns fit at 360 in both scripts. */}
        <section id="morning" className="scroll-mt-16">
          <div className="mx-auto max-w-6xl px-5 pb-14 sm:px-8">
            <div className={TABLE_GROUND}>
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-rule">
                    <th className="label py-3 pr-3 text-ink2" />
                    <th className="label py-3 pr-3 text-ink2">{fill(t.localLabel)}</th>
                    <th className="label py-3 text-ink2">{t.istLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.label} className="border-b border-rule align-baseline last:border-b-0">
                      <th scope="row" className="py-3.5 pr-3 text-left font-normal">
                        <span className="display text-[1rem] leading-[1.25] text-ink sm:text-[1.2rem]" style={W700}>
                          {r.label}
                        </span>
                      </th>
                      <td className="py-3.5 pr-3 text-[0.9375rem] text-ink tabular-nums sm:text-[1.05rem]">{r.local}</td>
                      <td className="py-3.5 text-[0.9375rem] text-ink2 tabular-nums sm:text-[1.05rem]">{r.ist}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="mt-6">
              <li>
                <Link href={localePath(lang, "/muhurat")} className={QUIET}>
                  {t.ghatLink}
                </Link>
              </li>
              <li>
                <Link href={localePath(lang, "/panchang/shraddha")} className={QUIET}>
                  {t.guideLink}
                </Link>
              </li>
            </ul>
          </div>
        </section>

        <section id="how" className="scroll-mt-16">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <div className="max-w-3xl">
              <h2 className={H2} style={W700}>
                {t.how}
              </h2>
              {t.howBody.map((p) => (
                <p key={p} className="mt-4 leading-[1.75] text-ink2">
                  {fill(p)}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section id="ghats" className="scroll-mt-16">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <h2 className={H2} style={W700}>
              {t.ghatsTitle}
            </h2>
            <p className="mt-3 max-w-3xl leading-[1.6] text-ink2">{t.ghatsLede}</p>
            <ul className="mt-6 border-t border-rule sm:grid sm:grid-cols-2 sm:gap-x-8 sm:border-t-0 lg:grid-cols-3">
              {RIVERS.map((r) => (
                <PlaceRow
                  key={r.slug}
                  href={localePath(lang, `/rivers/${r.slug}`)}
                  title={r.river[lang]}
                  sub={`${r.city[lang]}, ${r.state[lang]}`}
                />
              ))}
            </ul>
            <Link href={localePath(lang, "/live")} className={`${QUIET} mt-4`}>
              {t.liveLink}
            </Link>
          </div>
        </section>

        <section id="cities" className="scroll-mt-16">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
            <h2 className={H2} style={W700}>
              {fill(t.othersIn)}
            </h2>
            <ul className="mt-6 border-t border-rule sm:grid sm:grid-cols-2 sm:gap-x-8 sm:border-t-0 lg:grid-cols-4">
              {neighbours.map((x) => (
                <PlaceRow
                  key={x.slug}
                  href={localePath(lang, `/panchang/${x.slug}`)}
                  title={x.name[lang]}
                  sub={x.region?.[lang]}
                />
              ))}
            </ul>
            <Link href={localePath(lang, "/panchang#cities")} className={`${QUIET} mt-4`}>
              {t.allCities}
            </Link>
          </div>
        </section>

        <RefClose title={t.close} label={t.begin} href={ctaHref(lang)} />
      </main>
      <Footer lang={lang} />
    </>
  );
}

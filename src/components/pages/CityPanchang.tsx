import Link from "next/link";
import { citiesByCountry, type City } from "@/content/cities";
import { RIVERS } from "@/content/rivers";
import { panchangCityContent } from "@/content/panchang-city";
import { PAKSHA_NAMES } from "@/lib/sky";
import type { CityDay } from "@/lib/city-day";
import { localePath, type Lang } from "@/lib/locales";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Section } from "@/components/ui";
import { ctaHref } from "@/lib/nav";

/* ---------------------------------------------------------------------------
   One city's morning, as a ruled register: each row the city's own clock on
   the left and the ghat's IST on the right, so a reader in Leicester sees
   both without arithmetic.
   --------------------------------------------------------------------------- */

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
  const neighbours = (citiesByCountry(lang).find((g) => g.country.code === city.countryCode)?.cities ?? []).filter((x) => x.slug !== city.slug);
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
      <Header lang={lang} currentPath="/panchang" />
      <main className="mx-auto max-w-6xl px-5 sm:px-8">
        <section className="border-b-2 border-rulestrong pt-10 pb-10 sm:pt-14 sm:pb-14">
          <p className="label text-spot">{t.kicker}</p>
          <h1 className="display mt-3 text-[2.4rem] leading-[1.08] sm:text-[3.4rem]">{fill(t.title)}</h1>
          <p className="mt-4 max-w-2xl text-[1.05rem] leading-[1.8] text-ink2">{fill(t.lede)}</p>
          <p className="mt-6 text-sm text-ink2">
            <span className="label mr-2 text-ink2">{t.rows.date}</span>
            <span className="text-ink">{dayOf(day.sunrise, city.zone, lang)}</span>
          </p>
        </section>

        <Section id="morning">
          <div className="overflow-x-auto" tabIndex={0}>
            <table className="w-full min-w-[30rem] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-rulestrong">
                  <th className="label py-3 pr-4 text-ink2" />
                  <th className="label py-3 pr-4 text-ink2">{fill(t.localLabel)}</th>
                  <th className="label py-3 text-ink2">{t.istLabel}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label} className="border-b border-rule align-baseline">
                    <th scope="row" className="py-4 pr-4 text-left font-normal">
                      <span className="display text-[1.2rem] text-ink">{r.label}</span>
                    </th>
                    <td className="py-4 pr-4 text-[1.05rem] text-ink tabular-nums">{r.local}</td>
                    <td className="py-4 text-[1.05rem] text-ink2 tabular-nums">{r.ist}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href={ctaHref(lang)} className="label impress flex min-h-[48px] items-center bg-spot px-7 text-paper hover:bg-ink active:bg-ink">
              {t.begin}
            </Link>
            <Link href={localePath(lang, "/muhurat")} className="impress text-ink underline decoration-rule decoration-1 underline-offset-4 active:text-spot">
              {t.ghatLink}
            </Link>
            <Link href={localePath(lang, "/panchang/shraddha")} className="impress text-ink underline decoration-rule decoration-1 underline-offset-4 active:text-spot">
              {t.guideLink}
            </Link>
          </div>
        </Section>

        <Section id="how" tinted>
          <div className="max-w-3xl">
            <h2 className="display text-[1.75rem] sm:text-[2.2rem]">{t.how}</h2>
            {t.howBody.map((p) => (
              <p key={p} className="mt-4 leading-[1.8] text-ink2">
                {fill(p)}
              </p>
            ))}
          </div>
        </Section>

        <Section id="ghats">
          <h2 className="display text-[1.75rem] sm:text-[2.2rem]">{t.ghatsTitle}</h2>
          <p className="mt-4 max-w-3xl leading-[1.8] text-ink2">{t.ghatsLede}</p>
          <ul className="mt-6 border-t-2 border-rulestrong sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-8">
            {RIVERS.map((r) => (
              <li key={r.slug} className="border-b border-rule">
                <Link
                  href={localePath(lang, `/rivers/${r.slug}`)}
                  className="impress flex min-h-[48px] items-baseline justify-between gap-3 py-3 text-ink active:text-spot"
                >
                  <span className="display text-[1.1rem]">{r.river[lang]}</span>
                  <span className="text-right text-sm text-ink2">
                    {r.city[lang]}, {r.state[lang]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={localePath(lang, "/live")}
            className="impress mt-8 inline-flex min-h-[44px] items-center text-ink underline decoration-rule decoration-1 underline-offset-4 active:text-spot"
          >
            {t.liveLink}
          </Link>
        </Section>

        <Section id="cities" tinted>
          <h2 className="display text-[1.75rem] sm:text-[2.2rem]">{t.othersIn.replace("{country}", city.country[lang])}</h2>
          <ul className="mt-6 border-t-2 border-rulestrong sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-8">
            {neighbours.map((x) => (
              <li key={x.slug} className="border-b border-rule">
                <Link
                  href={localePath(lang, `/panchang/${x.slug}`)}
                  className="impress flex min-h-[48px] items-baseline justify-between gap-3 py-3 text-ink active:text-spot"
                >
                  <span className="display text-[1.1rem]">{x.name[lang]}</span>
                  {x.region && <span className="text-sm text-ink2">{x.region[lang]}</span>}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={localePath(lang, "/panchang#cities")}
            className="impress mt-8 inline-flex min-h-[44px] items-center text-ink underline decoration-rule decoration-1 underline-offset-4 active:text-spot"
          >
            {t.allCities}
          </Link>
        </Section>
      </main>
      <Footer lang={lang} />
    </>
  );
}

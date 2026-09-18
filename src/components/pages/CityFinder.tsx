"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { localePath, type Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   The directory of cities, with a filter above it.

   Three hundred rows is too many to scroll on a phone, so the reader types
   and the list narrows to ruled rows. With the box empty every country is a
   run of names, by state or province where the country has them, which is
   how a printed almanac lists its towns and about a fifth of the height of
   a ruled list. The whole list is in the HTML either way, so a crawler reads
   every link without touching the box.
   --------------------------------------------------------------------------- */

export interface FinderCity {
  readonly slug: string;
  readonly name: string;
  readonly nameEn: string;
  readonly region?: string;
  readonly regionEn?: string;
  readonly country: string;
  readonly countryEn: string;
}

export interface FinderGroup {
  readonly code: string;
  readonly name: string;
  readonly cities: readonly FinderCity[];
}

export interface FinderCopy {
  readonly label: string;
  readonly placeholder: string;
  readonly hint: string;
  readonly matches: string;
  readonly match: string;
  readonly empty: string;
  readonly clear: string;
}

const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function hits(city: FinderCity, q: string): boolean {
  return [city.name, city.nameEn, city.region, city.regionEn, city.country, city.countryEn]
    .filter((x): x is string => Boolean(x))
    .some((x) => fold(x).includes(q));
}

/** The cities of one country by region, in the order they arrive (alphabetical). */
function byRegion(cities: readonly FinderCity[]): readonly { region?: string; cities: FinderCity[] }[] {
  const out: { region?: string; cities: FinderCity[] }[] = [];
  for (const c of cities) {
    let g = out.find((x) => x.region === c.region);
    if (!g) {
      g = { region: c.region, cities: [] };
      out.push(g);
    }
    g.cities.push(c);
  }
  return out.sort((a, b) => (a.region ?? "").localeCompare(b.region ?? ""));
}

function Run({ cities, lang, region }: { cities: readonly FinderCity[]; lang: Lang; region?: string }) {
  return (
    <p className="text-[1.05rem] leading-[2]">
      {region && <span className="label mr-3 text-ink2">{region}</span>}
      {cities.map((c, i) => (
        <span key={c.slug}>
          {i > 0 && <span className="text-ink2">, </span>}
          <Link
            href={localePath(lang, `/panchang/${c.slug}`)}
            className="impress text-ink underline decoration-rule decoration-1 underline-offset-4 active:text-spot"
          >
            {c.name}
          </Link>
        </span>
      ))}
    </p>
  );
}

function Row({ city, lang, sub }: { city: FinderCity; lang: Lang; sub?: string }) {
  return (
    <li className="border-b border-rule">
      <Link
        href={localePath(lang, `/panchang/${city.slug}`)}
        className="impress flex min-h-[48px] items-baseline justify-between gap-3 py-3 text-ink active:text-spot"
      >
        <span className="display text-[1.1rem]">{city.name}</span>
        {sub && <span className="text-right text-sm text-ink2">{sub}</span>}
      </Link>
    </li>
  );
}

export function CityFinder({ lang, groups, t }: { lang: Lang; groups: readonly FinderGroup[]; t: FinderCopy }) {
  const [query, setQuery] = useState("");
  const q = fold(query.trim());

  const found = useMemo(
    () => (q ? groups.flatMap((g) => g.cities.filter((c) => hits(c, q))) : []),
    [groups, q],
  );

  return (
    <div>
      <label className="block max-w-xl">
        <span className="label text-ink2">{t.label}</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.placeholder}
          autoComplete="off"
          enterKeyHint="search"
          className="mt-3 block min-h-[48px] w-full border-2 border-rulestrong bg-paper px-4 text-[1.05rem] text-ink placeholder:text-ink2 focus:border-spot focus:outline-none"
        />
        <span className="mt-2 block text-sm text-ink2" aria-live="polite">
          {q
            ? found.length === 0
              ? t.empty
              : found.length === 1
                ? t.match
                : t.matches.replace("{n}", String(found.length))
            : t.hint}
        </span>
      </label>

      {q ? (
        <>
          <ul className="mt-8 border-t-2 border-rulestrong sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-8">
            {found.map((c) => (
              <Row key={c.slug} city={c} lang={lang} sub={[c.region, c.country].filter(Boolean).join(", ")} />
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="impress mt-8 inline-flex min-h-[44px] items-center text-ink underline decoration-rule decoration-1 underline-offset-4 active:text-spot"
          >
            {t.clear}
          </button>
        </>
      ) : (
        groups.map((g) => (
          <div key={g.code} className="mt-10">
            <h3 className="label border-b-2 border-rulestrong pb-3 text-ink2">{g.name}</h3>
            <div className="mt-3 space-y-3">
              {byRegion(g.cities).map((r) => (
                <Run key={r.region ?? g.code} cities={r.cities} lang={lang} region={r.region} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

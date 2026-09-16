import Link from "next/link";
import { WaterBand } from "@/components/WaterBand";

import { content } from "@/lib/content";
import { deepLang, pickDeep, type Lang } from "@/lib/locales";
import { localePath } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Mark } from "@/components/Logo";
import { CTA, Section } from "@/components/ui";
import {
  MUHURAT,
  RECURRING_OCCASIONS,
  WINDOWS,
  monthLabel,
  type MuhuratWindow,
  type Occasion,
  OCCASIONS,
} from "@/content/muhurat";
import { muhuratIndexContent } from "@/content/muhurat-index";
import { LiveClock } from "@/components/live/LiveClock";
import { getLiveSnapshot } from "@/lib/riverdata";
import { horizonFrom, resolveOccasion, sayDay, sayResolvedShort, type ResolvedDate } from "@/lib/occasions";
import { occasionName, windowName } from "@/content/names";

/* Nav is shared with the occasion pages so the two never drift. */
export function muhuratNavLinks(lang: Lang) {
  const t = content[lang];
  return [
    { href: localePath(lang, "/rivers"), label: t.nav.rivers },
    { href: localePath(lang, "/muhurat"), label: t.nav.muhurat },
    { href: localePath(lang, "/snan"), label: t.nav.how },
    { href: localePath(lang, "/begin"), label: t.nav.pricing },
  ];
}

/* --- numerals -------------------------------------------------------------
   A printed panchang sets its figures in the script it is printed in. Every
   digit that is furniture rather than data goes through here.               */

const DEVA = "०१२३४५६७८९";

function deva(value: string, lang: Lang): string {
  if (lang !== "hi") return value;
  return [...value].map((ch) => (ch >= "0" && ch <= "9" ? DEVA[Number(ch)] : ch)).join("");
}

/**
 * The label that has to appear beside every date and every time on the site.
 * It is a component rather than a string so that adding a timing surface
 * without its provenance is a conspicuous omission rather than a silent one.
 *
 * The square is hollow, matching StatusBadge: it only ever fills when a thing
 * is settled, and nothing on this calendar is settled yet.
 */
export function ProvisionalBadge({ lang, short = false }: { lang: Lang; short?: boolean }) {
  const c = muhuratIndexContent[lang].provenance;
  return (
    <span className="label inline-flex items-center gap-2 border border-spot px-2.5 py-1.5 text-spot">
      <span className="h-1.5 w-1.5 shrink-0 border border-spot" aria-hidden="true" />
      {short ? c.badgeShort : c.badge}
    </span>
  );
}

/** A section heading: the title and, at most, one plain sentence under it. */
function Heading({ title, lede }: { title: string; lede?: string }) {
  return (
    <div className="max-w-3xl">
      <h2 className="display text-[2.1rem] leading-tight sm:text-[2.9rem]">{title}</h2>
      {lede && <p className="mt-4 max-w-2xl leading-relaxed text-ink2">{lede}</p>}
    </div>
  );
}

/* --- the day diagram ------------------------------------------------------
   A day drawn as an arc, with the four windows marked where they fall. The
   geometry is the same arithmetic the window records carry, laid out from an
   assumed 06:00 sunrise and 18:00 sunset; it is a picture of the rule, not of
   any date. Hidden below `sm`, the ruled schedule below carries every fact it
   shows.

   Cut in two colours like the rest of the forme: tint blocks for the bands,
   hairlines for the structure, the spot colour only on the window edges.   */

const T0 = 4; // the diagram spans 04:00 to 20:00
const SPAN = 16;
const x = (hours: number) => 40 + ((hours - T0) / SPAN) * 920;

const BANDS = [
  { id: "brahma", from: 4.4, to: 5.2 },
  { id: "pratah", from: 6, to: 7.6 },
  { id: "abhijit", from: 11.6, to: 12.4 },
  { id: "godhuli", from: 17.6, to: 18.4 },
] as const;

function DayDiagram({ lang }: { lang: Lang }) {
  const c = muhuratIndexContent[lang].windows;
  const byId = Object.fromEntries(WINDOWS.map((w) => [w.id, w])) as Record<string, MuhuratWindow>;

  return (
    <figure className="mt-12 hidden border-t-2 border-rulestrong pt-8 sm:block">
      <svg
        viewBox="0 0 1000 236"
        className="w-full text-ink2"
        role="img"
        aria-label={c.diagramLabel}
      >
        {/* Daylight, laid in as a flat tint. Drawn as light-on-paper rather
            than night-as-a-shadow so the picture reads the same way in both
            editions: the tints step away from the paper in either theme. */}
        <rect x={x(6)} y="24" width={x(18) - x(6)} height="146" fill="var(--paper-2)" />

        {/* the sun's path */}
        <path
          d={`M${x(6)},170 Q${x(12)},-30 ${x(18)},170`}
          fill="none"
          stroke="var(--rule)"
          strokeWidth="1"
        />
        <circle cx={x(12)} cy="70" r="5" fill="var(--spot)" />

        {/* the four windows */}
        {BANDS.map((b) => (
          <g key={b.id}>
            <rect
              x={x(b.from)}
              y="24"
              width={x(b.to) - x(b.from)}
              height="146"
              fill="var(--paper-3)"
            />
            <rect x={x(b.from)} y="24" width="1.5" height="146" fill="var(--spot)" />
            <rect x={x(b.to)} y="24" width="1.5" height="146" fill="var(--spot)" />
            <text
              x={(x(b.from) + x(b.to)) / 2}
              y="192"
              textAnchor="middle"
              fill="currentColor"
              fontSize="13"
            >
              {byId[b.id] ? windowName(b.id, byId[b.id]!.name, lang) : b.id}
            </text>
          </g>
        ))}

        {/* horizon */}
        <line x1="0" y1="170" x2="1000" y2="170" stroke="var(--rule-strong)" strokeWidth="1" />

        {/* anchors */}
        {(
          [
            [6, c.diagram.sunrise],
            [12, c.diagram.noon],
            [18, c.diagram.sunset],
          ] as const
        ).map(([h, label]) => (
          <g key={label}>
            <line
              x1={x(h)}
              y1="162"
              x2={x(h)}
              y2="178"
              stroke="var(--rule-strong)"
              strokeWidth="1.5"
            />
            <text x={x(h)} y="222" textAnchor="middle" fill="currentColor" fontSize="12">
              {label}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}

/* --- the calendar register ------------------------------------------------
   Column template shared by the head row and every occasion line, so the
   register stays in column the whole way down the page.                    */

const SPINE_COLS =
  "sm:grid sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1.15fr)_13rem] sm:gap-x-8";

function OccasionRow({
  occasion,
  dates,
  lang,
}: {
  occasion: Occasion;
  /** The occasion's dates inside the month this row sits under. */
  dates: ResolvedDate[];
  lang: Lang;
}) {
  const t = muhuratIndexContent[lang];
  const waters = occasion.ghats.length;

  return (
    <li>
      <Link
        href={localePath(lang, `/muhurat/${occasion.slug}`)}
        className={`group block py-6 transition-colors hover:bg-paper3 ${SPINE_COLS}`}
      >
        {/* the occasion */}
        <div>
          {/* h4: the month above it is the h3 of this group. */}
          <h4 className="display text-2xl text-ink underline decoration-rule decoration-1 group-hover:decoration-spot sm:text-[1.6rem]">
            {occasionName(occasion, lang)}
          </h4>
          <p className="mt-1.5 text-sm leading-[1.7] text-ink2">{pickDeep(occasion.line, lang)}</p>
          <p className="mt-2 text-sm text-ink2">
            {t.spine.observedAt} {t.spine.waters(waters)}. {t.tiers[occasion.tier]}.
          </p>
        </div>

        {/* the reckoning */}
        <p className="mt-3 text-sm leading-[1.7] text-ink2 sm:mt-0">
          {pickDeep(occasion.rule.label, lang)}
        </p>

        {/* the dates, computed */}
        <div className="mt-3 sm:mt-0 sm:text-right">
          {dates.map((d) => (
            <p key={d.date} className="text-sm text-ink" data-occasion-date={d.date}>
              {deva(sayResolvedShort(d, deepLang(lang)), lang)}
            </p>
          ))}
        </div>
      </Link>
    </li>
  );
}

/**
 * The register, month by month, from today: each occasion under every month
 * it has a date in, recurring ones included, the empty months kept because
 * an almanac shows the quiet weeks too.
 */
function almanac(now: Date) {
  const { from, to } = horizonFrom(now);
  const resolved = OCCASIONS.map((o) => ({ o, dates: resolveOccasion(o, from, to) }));
  const out: { month: string; rows: { o: Occasion; dates: ResolvedDate[] }[] }[] = [];
  let [y, m] = from.split("-").map(Number);
  const [ty, tm] = to.split("-").map(Number);
  while (y < ty || (y === ty && m <= tm)) {
    const key = `${y}-${String(m).padStart(2, "0")}`;
    const rows = resolved
      .map(({ o, dates }) => ({ o, dates: dates.filter((d) => d.date.startsWith(key) || (d.to ?? "").startsWith(key)) }))
      .filter((r) => r.dates.length > 0)
      .sort((a, b) => a.dates[0].date.localeCompare(b.dates[0].date));
    out.push({ month: key, rows });
    m += 1;
    if (m > 12) {
      m = 1;
      y += 1;
    }
  }
  return { from, out };
}

/* --- page ----------------------------------------------------------------- */

export async function MuhuratIndex({ lang }: { lang: Lang }) {
  const t = muhuratIndexContent[lang];
  const { from: today, out: months } = almanac(new Date());
  /* The six cities of the worked example, which are the right six for the
     live clock too; the example's own instant is no longer printed. */
  const example = MUHURAT.workedExample;

  /* Today's windows and sunrise at Har Ki Pauri, from the same snapshot /live
     prints, computed once a day with the page. The clock itself is live in
     the browser and finds the open or the next window from these. */
  const snapshot = await getLiveSnapshot();
  const ganga = snapshot.waters.find((w) => w.slug === "ganga-haridwar") ?? snapshot.waters[0];
  const todayWindows = ganga.windows.map((slot) => {
    const def = WINDOWS.find((w) => w.id === slot.id);
    return {
      name: def ? windowName(def.id, def.name, deepLang(lang)) : slot.id,
      startsAt: slot.startsAt,
      endsAt: slot.endsAt,
    };
  });
  /* The sky's sunrise is an IST wall-clock string with no offset written on
     it; read as-is on a server in Berlin it lands three and a half hours out.
     Pinned to +05:30 before it goes to the browser. */
  const sunriseToday = ganga.sky.sunrise
    ? /[Zz]|[+-]\d\d:\d\d$/.test(ganga.sky.sunrise)
      ? ganga.sky.sunrise
      : `${ganga.sky.sunrise}+05:30`
    : null;

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath="/muhurat" />

      <main>
        {/* ---------------- masthead ----------------
            Title, one sentence, and the provenance sentence with its badge.
            The provenance is part of the masthead rather than a footnote,
            because /faq#how promises that every timing carries it. */}
        <section className="border-b-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 pt-14 pb-16 sm:px-8 sm:pt-20 sm:pb-20">
            <h1 className="ink-in display max-w-3xl text-[2.9rem] leading-[0.98] sm:text-6xl lg:text-7xl">
              {t.hero.title}
            </h1>

            <div className="rule-double mt-8 max-w-xl" />
            <WaterBand seed="muhurat" className="mt-5 h-14 w-full sm:h-16" />

            <p
              className="ink-in mt-6 max-w-xl text-[1.05rem] leading-[1.75] text-ink2"
              style={{ animationDelay: "120ms" }}
            >
              {t.hero.lede}
            </p>

            <div
              className="ink-in mt-10 max-w-2xl border-t border-rule pt-6"
              style={{ animationDelay: "200ms" }}
            >
              <p className="text-sm leading-[1.75] text-ink2">{t.provenance.line}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                <ProvisionalBadge lang={lang} />
                <p className="text-sm text-ink2">{deva(t.hero.asOf.replace("{date}", sayDay(today, deepLang(lang))), lang)}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- how to read this ---------------- */}
        <Section>
          <Heading title={t.reading.title} />

          <dl className="mt-10 border-t-2 border-rulestrong">
            {t.reading.items.map((item) => (
              <div
                key={item.t}
                className="grid gap-2 border-b border-rule py-5 sm:grid-cols-[15rem_1fr] sm:gap-8"
              >
                <dt className="display text-xl text-ink">{item.t}</dt>
                <dd className="max-w-2xl text-sm leading-[1.75] text-ink2">{item.d}</dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* ---------------- the monthly rhythm ---------------- */}
        <Section tinted>
          <Heading title={t.rhythm.title} lede={t.rhythm.lede} />

          <ul className="mt-10 border-t-2 border-rulestrong">
            {RECURRING_OCCASIONS.map((o) => (
              <li key={o.slug}>
                <Link
                  href={localePath(lang, `/muhurat/${o.slug}`)}
                  className="group grid gap-y-1.5 border-b border-rule py-5 transition-colors hover:bg-paper3 sm:grid-cols-[14rem_1fr_11rem] sm:items-baseline sm:gap-x-8"
                >
                  <h3 className="display text-2xl text-ink underline decoration-rule decoration-1 group-hover:decoration-spot">
                    {occasionName(o, lang)}
                  </h3>
                  <span className="text-sm leading-[1.7] text-ink2">{pickDeep(o.line, lang)}</span>
                  <span className="text-sm text-ink sm:text-right">
                    {pickDeep(o.occurrence.label, lang)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        {/* ---------------- the almanac spine ----------------
            An almanac reads down a column, month by month, and shows the
            months with nothing dated too. Nothing is featured at the top: the
            nearest occasion here is Pitru Paksha, and a bereavement season
            does not go in a hero slot. */}
        <Section id="spine">
          <Heading title={t.spine.title} />

          <div className="mt-10">
            {/* column heads, as a printed register sets them */}
            <div className="hidden border-y-2 border-rulestrong sm:grid sm:grid-cols-[8rem_1fr] sm:gap-x-8">
              <p className="label py-3 text-ink2">{t.spine.columns.month}</p>
              <div className={SPINE_COLS}>
                <p className="label py-3 text-ink2">{t.spine.columns.occasion}</p>
                <p className="label py-3 text-ink2">{t.spine.columns.rule}</p>
                <p className="label py-3 text-right text-ink2">{t.spine.columns.window}</p>
              </div>
            </div>

            <div className="border-t-2 border-rulestrong sm:border-t-0">
              {months.map((m) => {
                const { name, year } = monthLabel(m.month, lang);
                return (
                  <div
                    key={m.month}
                    className="grid gap-3 border-b border-rule py-7 sm:grid-cols-[8rem_1fr] sm:gap-x-8 sm:py-0"
                  >
                    <div className="sm:sticky sm:top-24 sm:self-start sm:py-7">
                      {/* A real heading: the month is how this list is navigated. */}
                      <h3 className="display text-2xl text-ink">{name}</h3>
                      <p className="mt-1 text-sm text-ink2">{deva(year, lang)}</p>
                    </div>

                    {m.rows.length === 0 ? (
                      <p className="self-center text-sm text-ink2 sm:py-7">{t.spine.empty}</p>
                    ) : (
                      <ul className="divide-y divide-rule sm:py-1">
                        {m.rows.map((r) => (
                          <OccasionRow key={r.o.slug} occasion={r.o} dates={r.dates} lang={lang} />
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dates that come from elsewhere, and the calendars this one does
              not follow, stated as facts under the register they qualify. */}
          <div className="mt-16 max-w-3xl">
            <h3 className="display text-2xl text-ink">{t.elsewhere.title}</h3>
            <dl className="mt-6 border-t-2 border-rulestrong">
              {MUHURAT.notPublished.map((n) => (
                <div key={n.id} className="border-b border-rule py-5">
                  <dt className="display text-lg text-ink">{pickDeep(n.name, lang)}</dt>
                  <dd className="mt-2 max-w-2xl text-sm leading-[1.75] text-ink2">
                    {pickDeep(n.text, lang)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>

        {/* ---------------- daily windows ---------------- */}
        <Section tinted>
          <Heading title={t.windows.title} lede={t.windows.lede} />

          <DayDiagram lang={lang} />

          {/* the day's schedule, ruled, in the order the day runs */}
          <ul className="mt-12 border-t-2 border-rulestrong">
            {WINDOWS.map((w) => (
              <li
                key={w.id}
                className="grid gap-x-8 gap-y-4 border-b border-rule py-8 sm:grid-cols-[15rem_1fr] sm:py-10"
              >
                <div>
                  <h3 className="display text-2xl">{windowName(w.id, w.name, lang)}</h3>
                  <p className="mt-2 text-sm text-ink">{t.windows.minutes(w.durationMin)}</p>
                  <p className="mt-1 text-sm text-ink2">{t.anchors[w.anchor]}</p>
                </div>

                <div className="max-w-2xl">
                  <dl>
                    <div className="border-t border-rule pt-3">
                      <dt className="label text-ink2">{t.windows.formulaLabel}</dt>
                      <dd className="mt-1.5 text-sm text-ink">{pickDeep(w.formula, lang)}</dd>
                    </div>
                    <div className="mt-5 border-t border-rule pt-3">
                      <dt className="label text-ink2">{t.windows.basisLabel}</dt>
                      <dd className="mt-1.5 text-sm leading-[1.75] text-ink2">
                        {pickDeep(w.basis, lang)}
                      </dd>
                    </div>
                  </dl>
                  <p className="mt-5 border-t border-rule pt-3 text-sm leading-[1.75] text-ink2">
                    {pickDeep(w.note, lang)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <ProvisionalBadge lang={lang} />
          </div>

          <div className="mt-14 max-w-3xl">
            <h3 className="display text-2xl text-ink">{t.windows.alsoTitle}</h3>
            <dl className="mt-6 border-t-2 border-rulestrong">
              {MUHURAT.displayedNotActedOn.map((n) => (
                <div key={n.id} className="border-b border-rule py-5">
                  <dt className="display text-lg text-ink">{pickDeep(n.name, lang)}</dt>
                  <dd className="mt-2 max-w-2xl text-sm leading-[1.75] text-ink2">
                    {pickDeep(n.text, lang)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>

        {/* ---------------- reading the clock ---------------- */}
        <Section id="clock">
          <Heading title={t.clock.title} lede={t.clock.lede} />

          <LiveClock
            lang={lang}
            t={t.clock}
            zones={example.zones.map((z) => ({ zone: z.zone, label: pickDeep(z.label, lang) }))}
            windows={todayWindows}
            sunrise={sunriseToday}
          />
        </Section>

        {/* ---------------- closing ---------------- */}
        <section className="border-t-2 border-rulestrong">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-24">
            <Mark className="mx-auto h-12 w-12 text-ink" />
            <div className="rule-double mt-8" />
            <h2 className="display mt-8 text-[2.2rem] leading-tight sm:text-[3.2rem]">
              {t.cta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-lg leading-[1.75] text-ink2">{t.cta.lede}</p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href={localePath(lang, "/rivers")}>
                <CTA>{t.cta.primary}</CTA>
              </Link>
              <a href="#spine">
                <CTA variant="ghost">{t.cta.secondary}</CTA>
              </a>
            </div>

            {/* The provenance sentence closes the page as well as opening it. */}
            <p className="mx-auto mt-14 max-w-2xl border-t border-rule pt-8 text-xs leading-[1.75] text-ink2">
              {pickDeep(MUHURAT.provider.note, lang)}
            </p>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}

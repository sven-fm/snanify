import { localePath, type Lang } from "@/lib/i18n";
import { Mark } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  DataRow,
  Eyebrow,
  LinkButton,
  Section,
  SectionHeader,
  StatusBadge,
} from "@/components/ui";
import { ritualsContent, type Fare, type Honesty, type Note, type RitualsCopy } from "@/content/rituals";

/**
 * /rituals, the full offering catalog, set as a printed tariff.
 *
 * The page is organised around the one structural claim the catalog rests on:
 * the price axis is how the rite is held (samuhik / ekantik), not how many
 * names are read. So a rite offered in both vessels prints two fares, each
 * with the reason for its number beside it, rather than hiding the difference
 * inside a single figure. Everything else, the modules, the Snan Kosh, the two
 * ladders, the refusal list, hangs off that.
 *
 * Every rite renders `honesty.is` and `honesty.isNot`. Both are required
 * fields on the Rite type, so a rite without them cannot be added to the
 * catalog; do not make this block collapsible, and do not move it behind a
 * "read more". It is set as a tinted, hard-ruled block so it reads as a
 * printed rider on the entry rather than as decoration. The Snan Kosh section
 * carries the same block for the same reason.
 */

/** Devanagari numerals in the Hindi edition, as a printed panchang sets them. */
const DEVA = "०१२३४५६७८९";
function numeral(n: number, lang: Lang): string {
  const s = String(n).padStart(2, "0");
  return lang === "hi" ? [...s].map((d) => DEVA[Number(d)]).join("") : s;
}

/* --- small parts ------------------------------------------------- */

function HonestyBlock({
  labels,
  honesty,
}: {
  labels: RitualsCopy["honestyLabels"];
  honesty: Honesty;
}) {
  return (
    <div className="boxed tint mt-7 p-5 sm:p-6">
      <p className="label text-spot">{labels.block}</p>
      <dl className="mt-4 grid gap-6 border-t border-rule pt-5 sm:grid-cols-2 sm:gap-0">
        <div className="sm:pr-8">
          <dt className="label text-ink2">{labels.is}</dt>
          <dd className="mt-2.5 text-sm leading-[1.75] text-ink">{honesty.is}</dd>
        </div>
        <div className="border-t border-rule pt-6 sm:border-t-0 sm:border-l sm:border-rule sm:pt-0 sm:pl-8">
          <dt className="label text-ink2">{labels.isNot}</dt>
          <dd className="mt-2.5 text-sm leading-[1.75] text-ink">{honesty.isNot}</dd>
        </div>
      </dl>
    </div>
  );
}

/** Provenance notes. These exist so an unconfirmed operational fact is stated
    as unconfirmed rather than quietly invented. */
function NoteList({ notes }: { notes: Note[] }) {
  if (notes.length === 0) return null;
  return (
    <dl className="mt-8 border-t border-rulestrong">
      {notes.map((n) => (
        <div
          key={n.label}
          className="grid gap-1.5 border-b border-rule py-4 sm:grid-cols-[11rem_1fr] sm:gap-8"
        >
          <dt className="label pt-1 text-ink2">{n.label}</dt>
          <dd className="text-sm leading-[1.75] text-ink2">{n.body}</dd>
        </div>
      ))}
    </dl>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-rule pb-3">
      <dt className="label text-ink2">{label}</dt>
      <dd className="mt-1.5 text-sm text-ink">{value}</dd>
    </div>
  );
}

/** A bare product code reads as noise to a screen reader, so it carries a
    visually-hidden label rather than being announced on its own. */
function Sku({ label, code, className = "" }: { label: string; code: string; className?: string }) {
  return (
    <p className={`label text-ink2 ${className}`}>
      <span className="sr-only">{label}: </span>
      {code}
    </p>
  );
}

/**
 * The fares for one rite, set as a ruled register rather than a price tag.
 * Each fare states the vessel it buys, both published rates, and the reason
 * the number is what it is. The reason is not optional: a rite that is dearer
 * in one vessel has to say why on the same line.
 */
function Fares({
  fares,
  skuLabel,
  className = "",
}: {
  fares: Fare[];
  skuLabel: string;
  className?: string;
}) {
  return (
    <ul className={`border-t-2 border-rulestrong ${className}`}>
      {fares.map((f) => (
        <li key={f.sku} className="border-b border-rule py-5">
          <p className="label text-ink2">{f.vessel}</p>
          <p className="display mt-2 text-3xl text-spot">{f.usd}</p>
          <p className="mt-0.5 text-base text-ink2">{f.inr}</p>
          <p className="mt-3 text-xs leading-[1.7] text-ink2">{f.note}</p>
          <Sku label={skuLabel} code={f.sku} className="mt-3" />
        </li>
      ))}
    </ul>
  );
}

/* --- page --------------------------------------------------------- */

export function Rituals({ lang }: { lang: Lang }) {
  const t: RitualsCopy = ritualsContent[lang];
  const home = localePath(lang, "/");

  // The summary table lists one row per purchasable fare, so a rite offered in
  // both vessels appears twice, at both rates, rather than once at whichever
  // number reads best.
  const priceRows = t.catalog.flatMap((r) => [
    ...r.fares.map((f) => ({
      key: f.sku,
      name: r.name,
      deva: r.deva,
      vessel: f.vessel,
      duration: r.duration,
      usd: f.usd,
      inr: f.inr,
      sub: false,
    })),
    ...(r.variant
      ? r.variant.fares.map((f) => ({
          key: f.sku,
          name: r.variant!.name,
          deva: r.variant!.deva,
          vessel: f.vessel,
          duration: r.variant!.duration,
          usd: f.usd,
          inr: f.inr,
          sub: true,
        }))
      : []),
  ]);

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath="/rituals" />

      <main>
        {/* ---------------- masthead ---------------- */}
        <section className="border-b-2 border-rulestrong">
          <div className="mx-auto max-w-6xl px-5 pt-16 pb-14 sm:px-8 sm:pt-20 sm:pb-16">
            <div className="max-w-3xl">
              <div className="ink-in">
                <Eyebrow>{t.hero.eyebrow}</Eyebrow>
              </div>
              <h1
                className="ink-in display mt-6 text-[2.9rem] leading-[1.02] sm:text-6xl lg:text-7xl"
                style={{ animationDelay: "80ms" }}
              >
                {t.hero.title}
              </h1>

              <div className="rule-double mt-8 max-w-xl" />

              <p
                className="ink-in mt-6 max-w-2xl text-[1.05rem] leading-[1.75] text-ink2"
                style={{ animationDelay: "160ms" }}
              >
                {t.hero.lede}
              </p>
              <div className="ink-in mt-8" style={{ animationDelay: "240ms" }}>
                <StatusBadge>{t.hero.badge}</StatusBadge>
              </div>
            </div>

            {/* the standing guarantees, set as a three-column register */}
            <p className="label mt-16 text-spot">{t.hero.guaranteesLabel}</p>
            <ol className="mt-6 grid border-t-2 border-rulestrong md:grid-cols-3">
              {t.hero.guarantees.map((g) => (
                <li
                  key={g.n}
                  className="border-b border-rule py-7 md:border-b-0 md:border-r md:border-rule md:pr-8 md:pl-8 md:first:pl-0 md:last:border-r-0"
                >
                  <span className="display block text-3xl text-spot">{g.n}</span>
                  <h2 className="display mt-3 text-xl text-ink">{g.t}</h2>
                  <p className="mt-2.5 text-sm leading-[1.75] text-ink2">{g.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------- section index, set as a ruled row ---------------- */}
        <nav
          aria-label={t.nav.label}
          className="sticky top-16 z-40 border-b-2 border-rulestrong bg-paper"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <ul className="flex items-stretch divide-x divide-rule overflow-x-auto">
              {t.nav.items.map((item) => (
                <li key={item.href} className="shrink-0">
                  <a
                    href={item.href}
                    className="label flex min-h-11 items-center px-4 whitespace-nowrap text-ink2 transition-colors hover:bg-ink hover:text-paper"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* ---------------- the two vessels ---------------- */}
        <Section id="vessels" className="!scroll-mt-32">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
              <SectionHeader
                eyebrow={t.vessels.eyebrow}
                title={t.vessels.title}
                lede={t.vessels.lede}
              />
              <div className="lg:pt-16">
                <p className="border-l-2 border-rulestrong pl-6 text-[1.05rem] leading-[1.75] text-ink">
                  {t.vessels.statement}
                </p>
                <p className="mt-6 pl-6 text-sm leading-[1.75] text-ink2">{t.vessels.nameNote}</p>
              </div>
            </div>

            {/* a genuine two-column comparison, line by line */}
            <div className="mt-16 overflow-x-auto">
              <table className="w-full min-w-[42rem] border-collapse text-left">
                <caption className="sr-only">{t.vessels.tableCaption}</caption>
                <thead>
                  <tr className="border-y-2 border-rulestrong">
                    <th scope="col" className="w-[26%] py-5 pr-4 align-bottom">
                      <span className="sr-only">{t.vessels.heads.row}</span>
                    </th>
                    <th scope="col" className="w-[37%] border-l border-rule py-5 pr-6 pl-6 align-bottom">
                      <span className="display block text-2xl text-ink">
                        {t.vessels.heads.samuhik}
                      </span>
                      <span className="mt-1.5 block text-sm text-ink2">
                        {t.vessels.heads.samuhikDeva}
                      </span>
                    </th>
                    <th scope="col" className="w-[37%] border-l border-rule py-5 pl-6 align-bottom">
                      <span className="display block text-2xl text-ink">
                        {t.vessels.heads.ekantik}
                      </span>
                      <span className="mt-1.5 block text-sm text-ink2">
                        {t.vessels.heads.ekantikDeva}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {t.vessels.columns.map((row) => (
                    <tr key={row.key} className="border-b border-rule align-top">
                      <th scope="row" className="label py-5 pr-4 text-ink2">
                        {row.key}
                      </th>
                      <td className="border-l border-rule py-5 pr-6 pl-6 text-sm leading-[1.7] text-ink">
                        {row.samuhik}
                      </td>
                      <td className="border-l border-rule py-5 pl-6 text-sm leading-[1.7] text-ink">
                        {row.ekantik}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-14 grid gap-px border-2 border-rulestrong bg-rule md:grid-cols-2">
              {[t.vessels.cap, t.vessels.privacy].map((n) => (
                <div key={n.label} className="tint p-7">
                  <p className="label text-spot">{n.label}</p>
                  <div className="rule-thin mt-4" />
                  <p className="mt-4 text-sm leading-[1.75] text-ink2">{n.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ---------------- always included + standing terms ---------------- */}
        <Section id="included" tinted className="!scroll-mt-32">
          <Reveal>
            <SectionHeader
              eyebrow={t.included.eyebrow}
              title={t.included.title}
              lede={t.included.lede}
            />

            <div className="mt-14 grid border-t-2 border-rulestrong sm:grid-cols-2">
              {t.included.items.map((item, i) => (
                <article
                  key={item.sku}
                  className={`flex flex-col border-b border-rule py-8 ${
                    i === 0 ? "sm:pr-10" : "sm:border-l sm:border-rule sm:pl-10"
                  }`}
                >
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="display text-3xl text-ink">{item.name}</h3>
                    <span className="text-base text-ink2">{item.deva}</span>
                  </div>
                  <Sku label={t.rites.labels.sku} code={item.sku} className="mt-4" />
                  <p className="mt-3 text-xs leading-[1.7] text-ink2">{item.meta}</p>
                  <p className="mt-6 text-sm leading-[1.75] text-ink2">{item.body}</p>
                  <div className="mt-auto">
                    <HonestyBlock labels={t.honestyLabels} honesty={item.honesty} />
                  </div>
                </article>
              ))}
            </div>

            <h3 className="display mt-20 text-2xl text-ink sm:text-3xl">{t.included.termsTitle}</h3>
            <dl className="mt-8 border-t-2 border-rulestrong">
              {t.included.terms.map((term) => (
                <div
                  key={term.label}
                  className="grid gap-2 border-b border-rule py-6 sm:grid-cols-[16rem_1fr] sm:gap-10 sm:py-7"
                >
                  <dt className="text-sm leading-[1.75] text-ink">{term.label}</dt>
                  <dd className="text-sm leading-[1.75] text-ink2">{term.body}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Section>

        {/* ---------------- the anushthan modules ---------------- */}
        <Section id="rites" className="!scroll-mt-32">
          <Reveal>
            <SectionHeader eyebrow={t.rites.eyebrow} title={t.rites.title} lede={t.rites.lede} />

            {/* PLACEHOLDER pricing, stated as provisional where the figures are,
                not only in a source comment. */}
            <p className="mt-9 max-w-2xl border-l-2 border-rulestrong pl-6 text-sm leading-[1.75] text-ink2">
              {t.priceNote}
            </p>
          </Reveal>

          <div className="mt-16 border-t-2 border-rulestrong">
            {t.catalog.map((r) => (
              <article
                key={r.id}
                id={r.id}
                className="scroll-mt-32 border-b border-rule py-14 lg:grid lg:grid-cols-[15rem_1fr] lg:gap-14"
              >
                {/* meta rail */}
                <div className="lg:sticky lg:top-32 lg:self-start">
                  <span className="display block text-4xl text-spot">{r.index}</span>
                  <h3 className="display mt-3 text-3xl text-ink">{r.name}</h3>
                  <p className="mt-1 text-base text-ink2">{r.deva}</p>

                  <dl className="mt-7 space-y-4 border-t border-rule pt-5">
                    <Fact label={t.rites.labels.duration} value={r.duration} />
                  </dl>

                  <p className="label mt-7 text-spot">{t.rites.labels.fares}</p>
                  <Fares fares={r.fares} skuLabel={t.rites.labels.sku} className="mt-4" />
                </div>

                {/* body */}
                <div className="mt-10 lg:mt-0">
                  <dl className="grid gap-7 sm:grid-cols-2 sm:gap-x-10">
                    <div className="sm:col-span-2">
                      <dt className="label text-ink2">{t.rites.labels.what}</dt>
                      <dd className="mt-2 text-[1.02rem] leading-[1.75] text-ink">{r.what}</dd>
                    </div>
                    <div>
                      <dt className="label text-ink2">{t.rites.labels.who}</dt>
                      <dd className="mt-2 text-sm leading-[1.75] text-ink2">{r.who}</dd>
                    </div>
                    <div>
                      <dt className="label text-ink2">{t.rites.labels.receive}</dt>
                      <dd className="mt-2 text-sm leading-[1.75] text-ink2">{r.receive}</dd>
                    </div>
                    {r.need && (
                      <div className="sm:col-span-2">
                        <dt className="label text-ink2">{t.rites.labels.need}</dt>
                        <dd className="mt-2 text-sm leading-[1.75] text-ink2">{r.need}</dd>
                      </div>
                    )}
                  </dl>

                  {/* Mandatory. Never collapse, never hide behind "read more". */}
                  <HonestyBlock labels={t.honestyLabels} honesty={r.honesty} />

                  {r.variant && (
                    <div className="mt-7 border border-rule p-5 sm:p-6">
                      <p className="label text-ink2">{t.rites.labels.alsoAvailable}</p>
                      <div className="rule-thin mt-4 pt-4">
                        <div className="flex flex-wrap items-baseline gap-x-3">
                          <h4 className="display text-xl text-ink">{r.variant.name}</h4>
                          <span className="text-sm text-ink2">{r.variant.deva}</span>
                        </div>
                        <p className="mt-2 text-xs text-ink2">{r.variant.duration}</p>
                        <p className="mt-3 text-sm leading-[1.75] text-ink2">{r.variant.note}</p>
                        <Fares
                          fares={r.variant.fares}
                          skuLabel={t.rites.labels.sku}
                          className="mt-6"
                        />
                      </div>
                    </div>
                  )}

                  <NoteList notes={r.notes} />
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* ---------------- snan kosh, the credit that replaced varsh -------
            The refund promise is the product, so it is set as the body of the
            section and never as small print under it. Do not move
            `kosh.terms` into a footnote, an accordion or a terms page. */}
        <Section id="kosh" tinted className="!scroll-mt-32">
          <Reveal>
            <SectionHeader eyebrow={t.kosh.eyebrow} title={t.kosh.title} lede={t.kosh.lede} />

            <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
              <div>
                <p className="border-l-2 border-rulestrong pl-6 text-[1.05rem] leading-[1.75] text-ink">
                  {t.kosh.statement}
                </p>
                <Sku label={t.rites.labels.sku} code={t.kosh.sku} className="mt-6 pl-6" />
                <HonestyBlock labels={t.honestyLabels} honesty={t.kosh.honesty} />
              </div>

              <div>
                <h3 className="display text-2xl text-ink">{t.kosh.tableTitle}</h3>
                <div className="mt-6 overflow-x-auto">
                  <table className="w-full min-w-[22rem] border-collapse text-left">
                    <caption className="sr-only">{t.kosh.tableCaption}</caption>
                    <thead>
                      <tr className="border-y-2 border-rulestrong">
                        <th scope="col" className="label py-4 pr-6 text-ink2">
                          {t.kosh.heads.ladder}
                        </th>
                        <th scope="col" className="label py-4 pr-6 text-right text-ink2">
                          {t.kosh.heads.place}
                        </th>
                        <th scope="col" className="label py-4 text-right text-spot">
                          {t.kosh.heads.spend}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {t.kosh.rows.map((row) => (
                        <tr key={`${row.ladder}-${row.place}`} className="border-b border-rule">
                          <th scope="row" className="py-4 pr-6 text-sm font-normal text-ink2">
                            {row.ladder}
                          </th>
                          <td className="py-4 pr-6 text-right text-sm text-ink">{row.place}</td>
                          <td className="display py-4 text-right text-lg text-spot">{row.spend}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="boxed tint mt-10 p-6">
                  <p className="label text-spot">{t.kosh.withdrawn.label}</p>
                  <div className="rule-thin mt-4" />
                  <p className="mt-4 text-sm leading-[1.75] text-ink2">{t.kosh.withdrawn.body}</p>
                </div>
              </div>
            </div>

            <dl className="mt-16 border-t-2 border-rulestrong">
              {t.kosh.terms.map((term) => (
                <div
                  key={term.label}
                  className="grid gap-2 border-b border-rule py-6 sm:grid-cols-[18rem_1fr] sm:gap-10 sm:py-7"
                >
                  <dt className="text-sm leading-[1.75] text-ink">{term.label}</dt>
                  <dd className="text-sm leading-[1.75] text-ink2">{term.body}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Section>

        {/* ---------------- the two ladders ---------------- */}
        <Section id="sankalp" className="!scroll-mt-32">
          <Reveal>
            <SectionHeader eyebrow={t.ladder.eyebrow} title={t.ladder.title} lede={t.ladder.lede} />

            <p className="mt-10 max-w-3xl border-l-2 border-rulestrong pl-6 text-[1.05rem] leading-[1.75] text-ink">
              {t.ladder.statement}
            </p>

            {/* The reason for the gap, set at full weight in the open. A dual
                ladder that does not print its own justification is the version
                that becomes a scandal when somebody discovers it. */}
            <div className="misregister boxed tint mt-12 border-2 p-7 sm:p-9">
              <p className="label text-spot">{t.ladder.reason.label}</p>
              <div className="rule-double mt-5" />
              <p className="mt-6 max-w-3xl text-[1.02rem] leading-[1.8] text-ink">
                {t.ladder.reason.body}
              </p>
            </div>

            <div className="mt-14 grid gap-px border-2 border-rulestrong bg-rule md:grid-cols-2">
              {t.ladder.ladders.map((l) => (
                <div key={l.name} className="bg-paper p-7 sm:p-8">
                  <h3 className="display text-2xl text-ink">{l.name}</h3>
                  <p className="mt-1.5 text-sm text-ink2">{l.deva}</p>
                  <p className="display mt-6 text-lg leading-[1.6] text-spot">{l.steps}</p>
                  <p className="mt-5 border-t border-rule pt-5 text-sm leading-[1.75] text-ink2">
                    {l.note}
                  </p>
                </div>
              ))}
            </div>

            {/* What each ladder buys, line by line, so the difference sits in
                the service and is visible rather than implied. */}
            <h3 className="display mt-20 text-2xl text-ink sm:text-3xl">
              {t.ladder.differencesTitle}
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-[1.75] text-ink2">
              {t.ladder.differencesLede}
            </p>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[44rem] border-collapse text-left">
                <caption className="sr-only">{t.ladder.differencesCaption}</caption>
                <thead>
                  <tr className="border-y-2 border-rulestrong">
                    <th scope="col" className="w-[22%] py-5 pr-4 align-bottom">
                      <span className="sr-only">{t.ladder.differencesHeads.key}</span>
                    </th>
                    <th
                      scope="col"
                      className="w-[39%] border-l border-rule py-5 pr-6 pl-6 align-bottom"
                    >
                      <span className="display block text-2xl text-ink">
                        {t.ladder.differencesHeads.vishwa}
                      </span>
                      <span className="mt-1.5 block text-sm text-ink2">
                        {t.ladder.differencesHeads.vishwaDeva}
                      </span>
                    </th>
                    <th scope="col" className="w-[39%] border-l border-rule py-5 pl-6 align-bottom">
                      <span className="display block text-2xl text-ink">
                        {t.ladder.differencesHeads.bharat}
                      </span>
                      <span className="mt-1.5 block text-sm text-ink2">
                        {t.ladder.differencesHeads.bharatDeva}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {t.ladder.differences.map((row) => (
                    <tr key={row.key} className="border-b border-rule align-top">
                      <th scope="row" className="label py-5 pr-4 text-ink2">
                        {row.key}
                      </th>
                      <td className="border-l border-rule py-5 pr-6 pl-6 text-sm leading-[1.7] text-ink">
                        {row.vishwa}
                      </td>
                      <td className="border-l border-rule py-5 pl-6 text-sm leading-[1.7] text-ink">
                        {row.bharat}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <dl className="mt-16 border-t-2 border-rulestrong">
              {[t.ladder.eligibility, t.ladder.fee, t.ladder.split, t.ladder.cooling].map((n) => (
                <DataRow key={n.label} term={n.label}>
                  <span className="block text-sm leading-[1.75] text-ink2">{n.body}</span>
                </DataRow>
              ))}
            </dl>
          </Reveal>

          {/* full comparison, both rates */}
          <Reveal>
            <h3 className="display mt-20 text-2xl text-ink sm:text-3xl">{t.ladder.tableTitle}</h3>
            <p className="mt-5 max-w-2xl border-l-2 border-rulestrong pl-6 text-sm leading-[1.75] text-ink2">
              {t.priceNote}
            </p>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[46rem] border-collapse text-left">
                <caption className="sr-only">{t.ladder.tableCaption}</caption>
                <thead>
                  <tr className="border-y-2 border-rulestrong">
                    <th scope="col" className="label py-4 pr-6 text-ink2">
                      {t.ladder.heads.rite}
                    </th>
                    <th scope="col" className="label py-4 pr-6 text-ink2">
                      {t.ladder.heads.vessel}
                    </th>
                    <th scope="col" className="label py-4 pr-6 text-ink2">
                      {t.ladder.heads.duration}
                    </th>
                    <th scope="col" className="label py-4 pr-6 text-right text-spot">
                      {t.ladder.heads.usd}
                    </th>
                    <th scope="col" className="label py-4 text-right text-spot">
                      {t.ladder.heads.inr}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {priceRows.map((row) => (
                    <tr key={row.key} className="border-b border-rule align-top">
                      <th scope="row" className={`py-4 pr-6 font-normal ${row.sub ? "pl-5" : ""}`}>
                        <span className="block text-sm text-ink">{row.name}</span>
                        <span className="mt-0.5 block text-xs text-ink2">{row.deva}</span>
                      </th>
                      <td className="py-4 pr-6 text-sm text-ink2">{row.vessel}</td>
                      <td className="py-4 pr-6 text-sm text-ink2">{row.duration}</td>
                      <td className="py-4 pr-6 text-right text-sm text-ink">{row.usd}</td>
                      <td className="py-4 text-right text-sm text-ink">{row.inr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* premiums, each with the operational reason printed beside it */}
          <Reveal>
            <h3 className="display mt-20 text-2xl text-ink sm:text-3xl">
              {t.ladder.premiumsTitle}
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-[1.75] text-ink2">
              {t.ladder.premiumsLede}
            </p>
            <ul className="mt-10 border-t-2 border-rulestrong">
              {t.ladder.premiums.map((p) => (
                <li
                  key={p.name}
                  className="grid gap-3 border-b border-rule py-6 sm:grid-cols-[1.1fr_auto_1.2fr] sm:items-baseline sm:gap-8"
                >
                  <p className="text-sm leading-[1.75] text-ink">{p.name}</p>
                  <p className="text-sm whitespace-nowrap text-spot">
                    {p.usd} <span className="text-ink2">· {p.inr}</span>
                  </p>
                  <p className="text-sm leading-[1.75] text-ink2">{p.reason}</p>
                </li>
              ))}
            </ul>

            <div className="mt-12 flex flex-wrap items-baseline gap-x-8 gap-y-3">
              <p className="label text-spot">{t.ladder.freeTitle}</p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {t.ladder.freeItems.map((f) => (
                  <li key={f} className="flex items-baseline gap-2.5 text-sm text-ink2">
                    <span className="h-[3px] w-3 shrink-0 bg-spot" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Section>

        {/* ---------------- refusal list, the heaviest block on the page ---- */}
        <Section id="refusals" className="!scroll-mt-32">
          <Reveal>
            <SectionHeader
              eyebrow={t.refusals.eyebrow}
              title={t.refusals.title}
              lede={t.refusals.lede}
            />

            <ul className="misregister mt-14 border-2 border-rulestrong">
              {t.refusals.items.map((item, i) => (
                <li
                  key={item.name}
                  className="grid gap-3 border-b border-rulestrong p-6 last:border-b-0 sm:grid-cols-[3rem_1fr_1.15fr] sm:items-baseline sm:gap-8 sm:p-8"
                >
                  <span className="display text-2xl text-spot" aria-hidden="true">
                    {numeral(i + 1, lang)}
                  </span>
                  <h3 className="display text-xl leading-snug text-ink">{item.name}</h3>
                  <p className="text-sm leading-[1.75] text-ink2">{item.reason}</p>
                </li>
              ))}
            </ul>

            <p className="mt-10 max-w-xl text-sm leading-[1.75] text-ink2">
              {t.refusals.footnote}
            </p>
          </Reveal>
        </Section>

        {/* ---------------- closing ---------------- */}
        <section className="tint border-t-2 border-rulestrong">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-24">
            <Mark className="mx-auto h-12 w-12 text-ink" />
            <div className="rule-double mt-8" />
            <h2 className="display mt-8 text-3xl leading-[1.1] sm:text-5xl">{t.closing.title}</h2>
            <p className="mx-auto mt-6 max-w-xl leading-[1.75] text-ink2">{t.closing.lede}</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <LinkButton href={`${home}#sankalp`} className="!px-8 !py-3.5">
                {t.closing.cta}
              </LinkButton>
              <LinkButton href={`${home}#rivers`} variant="ghost" className="!px-8 !py-3.5">
                {t.closing.ctaSecondary}
              </LinkButton>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}

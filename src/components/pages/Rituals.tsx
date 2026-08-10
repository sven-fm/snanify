import { localePath, type Lang } from "@/lib/i18n";
import { Mark } from "@/components/Logo";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Card, Section, SectionHeader, Eyebrow, LinkButton, StatusBadge } from "@/components/ui";
import { ritualsContent, type Honesty, type Note, type RitualsCopy } from "@/content/rituals";

/**
 * /rituals — the full offering catalog.
 *
 * The page is organised around the one structural claim the catalog rests on:
 * the price axis is how the rite is held (samuhik / ekantik), not how many
 * names are read. Everything else — the modules, the two ladders, the refusal
 * list — hangs off that.
 *
 * Every rite renders `honesty.is` and `honesty.isNot`. Both are required
 * fields on the Rite type, so a rite without them cannot be added to the
 * catalog; do not make this block collapsible, and do not move it behind a
 * "read more".
 */

/* --- small parts ------------------------------------------------- */

function HonestyBlock({
  labels,
  honesty,
}: {
  labels: RitualsCopy["honestyLabels"];
  honesty: Honesty;
}) {
  return (
    <div className="mt-7 rounded-xl border border-gold/35 bg-bg3/25 p-5 sm:p-6">
      <p className="inscription text-[0.58rem] text-gold">{labels.block}</p>
      <dl className="mt-4 grid gap-6 sm:grid-cols-2 sm:gap-8">
        <div>
          <dt className="inscription text-[0.62rem] text-ink2">{labels.is}</dt>
          <dd className="mt-2.5 text-sm leading-relaxed text-ink">{honesty.is}</dd>
        </div>
        <div className="border-t border-line/70 pt-6 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-8">
          <dt className="inscription text-[0.62rem] text-ink2">{labels.isNot}</dt>
          <dd className="mt-2.5 text-sm leading-relaxed text-ink">{honesty.isNot}</dd>
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
    <ul className="mt-7 space-y-4">
      {notes.map((n) => (
        <li key={n.label} className="border-l-2 border-gold/35 pl-4">
          <p className="inscription text-[0.62rem] text-ink2">{n.label}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink2">{n.body}</p>
        </li>
      ))}
    </ul>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="inscription text-[0.62rem] text-ink2">{label}</dt>
      <dd className="mt-1.5 text-sm text-ink">{value}</dd>
    </div>
  );
}

/** A bare product code reads as noise to a screen reader, so it carries a
    visually-hidden label rather than being announced on its own. */
function Sku({ label, code, className = "" }: { label: string; code: string; className?: string }) {
  return (
    <p className={`inscription text-[0.58rem] text-ink2 ${className}`}>
      <span className="sr-only">{label}: </span>
      {code}
    </p>
  );
}

/* --- page --------------------------------------------------------- */

export function Rituals({ lang }: { lang: Lang }) {
  const t: RitualsCopy = ritualsContent[lang];
  const home = localePath(lang, "/");

  // The summary table lists every rite at both rates, extended forms included.
  const priceRows = t.catalog.flatMap((r) => [
    {
      key: r.sku,
      name: r.name,
      deva: r.deva,
      vessel: r.vessel,
      duration: r.duration,
      usd: r.usd,
      inr: r.inr,
      sub: false,
    },
    ...(r.variant
      ? [
          {
            key: r.variant.sku,
            name: r.variant.name,
            deva: r.variant.deva,
            vessel: r.vessel,
            duration: r.variant.duration,
            usd: r.variant.usd,
            inr: r.variant.inr,
            sub: true,
          },
        ]
      : []),
  ]);

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath="/rituals" />

      <main>
        {/* ---------------- masthead ---------------- */}
        <section className="relative overflow-hidden">
          <div className="halo" aria-hidden="true" />
          <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-14 sm:px-8 sm:pt-24 sm:pb-20">
            <div className="max-w-3xl">
              <div className="rise-in" style={{ animationDelay: "40ms" }}>
                <Eyebrow>{t.hero.eyebrow}</Eyebrow>
              </div>
              <h1
                className="rise-in display mt-6 text-[2.9rem] leading-[1.02] sm:text-6xl lg:text-7xl"
                style={{ animationDelay: "140ms" }}
              >
                {t.hero.title}
              </h1>
              <p
                className="rise-in mt-7 max-w-2xl text-[1.05rem] leading-relaxed text-ink2"
                style={{ animationDelay: "240ms" }}
              >
                {t.hero.lede}
              </p>
              <div className="rise-in mt-8" style={{ animationDelay: "320ms" }}>
                <StatusBadge>{t.hero.badge}</StatusBadge>
              </div>
            </div>

            <div className="rule-fade mt-16" />

            <p className="inscription mt-10 text-[0.6rem] text-gold">
              {t.hero.guaranteesLabel}
            </p>
            <ol className="mt-8 grid gap-10 md:grid-cols-3 md:gap-8">
              {t.hero.guarantees.map((g) => (
                <li key={g.n}>
                  <span className="display block text-3xl text-gold/60">{g.n}</span>
                  <h2 className="display mt-3 text-xl text-ink">{g.t}</h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink2">{g.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------- sticky section index ---------------- */}
        <nav
          aria-label={t.nav.label}
          className="sticky top-16 z-40 border-y border-line/60 bg-bg/85 backdrop-blur-xl"
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <ul className="-mx-2 flex items-center gap-1 overflow-x-auto sm:gap-2">
              {t.nav.items.map((item) => (
                <li key={item.href} className="shrink-0">
                  <a
                    href={item.href}
                    className="inscription flex min-h-11 items-center px-3 py-3 text-[0.66rem] whitespace-nowrap text-ink2 transition-colors hover:text-gold"
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
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <SectionHeader
              eyebrow={t.vessels.eyebrow}
              title={t.vessels.title}
              lede={t.vessels.lede}
            />
            <div className="lg:pt-16">
              <p className="border-l-2 border-gold/50 pl-6 text-[1.05rem] leading-relaxed text-ink">
                {t.vessels.statement}
              </p>
              <p className="mt-6 pl-6 text-sm leading-relaxed text-ink2">{t.vessels.nameNote}</p>
            </div>
          </div>

          <div className="mt-16 overflow-x-auto">
            <table className="w-full min-w-[42rem] border-collapse text-left">
              <caption className="sr-only">{t.vessels.tableCaption}</caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="w-[26%] py-5 pr-4 align-bottom">
                    <span className="sr-only">{t.vessels.heads.row}</span>
                  </th>
                  <th scope="col" className="w-[37%] py-5 pr-6 align-bottom">
                    <span className="display block text-2xl text-ink">
                      {t.vessels.heads.samuhik}
                    </span>
                    <span className="mt-1 block text-xs text-teal">
                      {t.vessels.heads.samuhikDeva}
                    </span>
                  </th>
                  <th scope="col" className="w-[37%] py-5 align-bottom">
                    <span className="display block text-2xl text-ink">
                      {t.vessels.heads.ekantik}
                    </span>
                    <span className="mt-1 block text-xs text-teal">
                      {t.vessels.heads.ekantikDeva}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {t.vessels.columns.map((row) => (
                  <tr key={row.key} className="border-b border-line/60 align-top">
                    <th scope="row" className="py-5 pr-4 text-sm font-normal text-ink2">
                      {row.key}
                    </th>
                    <td className="py-5 pr-6 text-sm text-ink">{row.samuhik}</td>
                    <td className="py-5 text-sm text-ink">{row.ekantik}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {[t.vessels.cap, t.vessels.privacy].map((n) => (
              <Card key={n.label}>
                <p className="inscription text-[0.58rem] text-gold">{n.label}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink2">{n.body}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* ---------------- always included + standing terms ---------------- */}
        <Section id="included" tinted className="!scroll-mt-32">
          <SectionHeader
            eyebrow={t.included.eyebrow}
            title={t.included.title}
            lede={t.included.lede}
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {t.included.items.map((item) => (
              <Card key={item.sku} className="flex flex-col">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="display text-3xl text-ink">{item.name}</h3>
                  <span className="text-base text-teal">{item.deva}</span>
                </div>
                <Sku label={t.rites.labels.sku} code={item.sku} className="mt-4" />
                <p className="mt-3 text-xs leading-relaxed text-ink2">{item.meta}</p>
                <p className="mt-6 text-sm leading-relaxed text-ink2">{item.body}</p>
                <div className="mt-auto">
                  <HonestyBlock labels={t.honestyLabels} honesty={item.honesty} />
                </div>
              </Card>
            ))}
          </div>

          <h3 className="display mt-20 text-2xl text-ink sm:text-3xl">{t.included.termsTitle}</h3>
          <dl className="mt-8 border-t border-line/60">
            {t.included.terms.map((term) => (
              <div
                key={term.label}
                className="grid gap-2 border-b border-line/60 py-6 sm:grid-cols-[16rem_1fr] sm:gap-10 sm:py-7"
              >
                <dt className="text-sm leading-relaxed text-ink">{term.label}</dt>
                <dd className="text-sm leading-relaxed text-ink2">{term.body}</dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* ---------------- the anushthan modules ---------------- */}
        <Section id="rites" className="!scroll-mt-32">
          <SectionHeader eyebrow={t.rites.eyebrow} title={t.rites.title} lede={t.rites.lede} />

          {/* PLACEHOLDER pricing — stated as provisional where the figures are,
              not only in a source comment. */}
          <p className="mt-9 max-w-2xl border-l-2 border-gold/50 pl-6 text-sm leading-relaxed text-ink2">
            {t.priceNote}
          </p>

          <div className="mt-16">
            {t.catalog.map((r) => (
              <article
                key={r.sku}
                id={r.id}
                className="scroll-mt-32 border-t border-line/60 py-14 first:border-t-0 first:pt-0 lg:grid lg:grid-cols-[15rem_1fr] lg:gap-14"
              >
                {/* meta rail */}
                <div className="lg:sticky lg:top-32 lg:self-start">
                  <span className="inscription text-[0.66rem] text-gold">{r.index}</span>
                  <h3 className="display mt-3 text-3xl text-ink">{r.name}</h3>
                  <p className="mt-1 text-base text-teal">{r.deva}</p>

                  <p className="display mt-7 text-4xl text-gold">{r.usd}</p>
                  <p className="mt-1 text-lg text-ink2">{r.inr}</p>

                  <dl className="mt-7 space-y-4 border-t border-line/60 pt-6">
                    <Fact label={t.rites.labels.duration} value={r.duration} />
                    <Fact label={t.rites.labels.vessel} value={r.vessel} />
                  </dl>
                  <Sku label={t.rites.labels.sku} code={r.sku} className="mt-6" />
                </div>

                {/* body */}
                <div className="mt-10 lg:mt-0">
                  <dl className="grid gap-7 sm:grid-cols-2 sm:gap-x-10">
                    <div className="sm:col-span-2">
                      <dt className="inscription text-[0.62rem] text-ink2">
                        {t.rites.labels.what}
                      </dt>
                      <dd className="mt-2 text-[1.02rem] leading-relaxed text-ink">{r.what}</dd>
                    </div>
                    <div>
                      <dt className="inscription text-[0.62rem] text-ink2">
                        {t.rites.labels.who}
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-ink2">{r.who}</dd>
                    </div>
                    <div>
                      <dt className="inscription text-[0.62rem] text-ink2">
                        {t.rites.labels.receive}
                      </dt>
                      <dd className="mt-2 text-sm leading-relaxed text-ink2">{r.receive}</dd>
                    </div>
                    {r.need && (
                      <div className="sm:col-span-2">
                        <dt className="inscription text-[0.62rem] text-ink2">
                          {t.rites.labels.need}
                        </dt>
                        <dd className="mt-2 text-sm leading-relaxed text-ink2">{r.need}</dd>
                      </div>
                    )}
                  </dl>

                  {/* Mandatory. Never collapse, never hide behind "read more". */}
                  <HonestyBlock labels={t.honestyLabels} honesty={r.honesty} />

                  {r.variant && (
                    <div className="mt-7 rounded-xl border border-line/70 bg-bg2/50 p-5 sm:p-6">
                      <p className="inscription text-[0.62rem] text-ink2">
                        {t.rites.labels.alsoAvailable}
                      </p>
                      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                        <div className="flex flex-wrap items-baseline gap-x-3">
                          <h4 className="display text-xl text-ink">{r.variant.name}</h4>
                          <span className="text-sm text-teal">{r.variant.deva}</span>
                        </div>
                        <p className="text-sm text-ink">
                          <span className="text-gold">{r.variant.usd}</span>
                          <span className="text-ink2"> · {r.variant.inr}</span>
                        </p>
                      </div>
                      <p className="mt-2 text-xs text-ink2">{r.variant.duration}</p>
                      <p className="mt-3 text-sm leading-relaxed text-ink2">{r.variant.note}</p>
                      <Sku label={t.rites.labels.sku} code={r.variant.sku} className="mt-4" />
                    </div>
                  )}

                  <NoteList notes={r.notes} />
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* ---------------- the two ladders ---------------- */}
        <Section id="sankalp" tinted className="!scroll-mt-32">
          <SectionHeader eyebrow={t.ladder.eyebrow} title={t.ladder.title} lede={t.ladder.lede} />

          <p className="mt-10 max-w-3xl border-l-2 border-gold/50 pl-6 text-[1.05rem] leading-relaxed text-ink">
            {t.ladder.statement}
          </p>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line/70 bg-line/70 md:grid-cols-2">
            {t.ladder.ladders.map((l) => (
              <div key={l.name} className="bg-bg p-7 sm:p-8">
                <h3 className="display text-2xl text-ink">{l.name}</h3>
                <p className="mt-1 text-xs text-teal">{l.deva}</p>
                <p className="display mt-6 text-lg leading-relaxed text-gold">{l.steps}</p>
                <p className="mt-5 border-t border-line/60 pt-5 text-sm leading-relaxed text-ink2">
                  {l.note}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {[t.ladder.eligibility, t.ladder.fee, t.ladder.split, t.ladder.cooling].map((n) => (
              <div key={n.label} className="rounded-xl border border-line/70 bg-bg2/40 p-6">
                <p className="inscription text-[0.58rem] text-gold">{n.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink2">{n.body}</p>
              </div>
            ))}
          </div>

          {/* full comparison, both rates */}
          <h3 className="display mt-20 text-2xl text-ink sm:text-3xl">{t.ladder.tableTitle}</h3>
          <p className="mt-5 max-w-2xl border-l-2 border-gold/50 pl-6 text-sm leading-relaxed text-ink2">
            {t.priceNote}
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <caption className="sr-only">{t.ladder.tableCaption}</caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="inscription py-4 pr-6 text-[0.62rem] text-ink2">
                    {t.ladder.heads.rite}
                  </th>
                  <th scope="col" className="inscription py-4 pr-6 text-[0.62rem] text-ink2">
                    {t.ladder.heads.vessel}
                  </th>
                  <th scope="col" className="inscription py-4 pr-6 text-[0.62rem] text-ink2">
                    {t.ladder.heads.duration}
                  </th>
                  <th scope="col" className="inscription py-4 pr-6 text-right text-[0.62rem] text-gold">
                    {t.ladder.heads.usd}
                  </th>
                  <th scope="col" className="inscription py-4 text-right text-[0.62rem] text-gold">
                    {t.ladder.heads.inr}
                  </th>
                </tr>
              </thead>
              <tbody>
                {priceRows.map((row) => (
                  <tr key={row.key} className="border-b border-line/60 align-top">
                    <th scope="row" className={`py-4 pr-6 font-normal ${row.sub ? "pl-5" : ""}`}>
                      <span className="block text-sm text-ink">{row.name}</span>
                      <span className="mt-0.5 block text-xs text-teal">{row.deva}</span>
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

          {/* premiums, each with the operational reason printed beside it */}
          <h3 className="display mt-20 text-2xl text-ink sm:text-3xl">
            {t.ladder.premiumsTitle}
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink2">
            {t.ladder.premiumsLede}
          </p>
          <ul className="mt-10 border-t border-line/60">
            {t.ladder.premiums.map((p) => (
              <li
                key={p.name}
                className="grid gap-3 border-b border-line/60 py-6 sm:grid-cols-[1.1fr_auto_1.2fr] sm:items-baseline sm:gap-8"
              >
                <p className="text-sm leading-relaxed text-ink">{p.name}</p>
                <p className="text-sm whitespace-nowrap text-gold">
                  {p.usd} <span className="text-ink2">· {p.inr}</span>
                </p>
                <p className="text-sm leading-relaxed text-ink2">{p.reason}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap items-baseline gap-x-8 gap-y-3">
            <p className="inscription text-[0.58rem] text-gold">{t.ladder.freeTitle}</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {t.ladder.freeItems.map((f) => (
                <li key={f} className="flex items-baseline gap-2 text-sm text-ink2">
                  <span
                    className="h-1.5 w-1.5 shrink-0 translate-y-[-0.1rem] rounded-full bg-gold/60"
                    aria-hidden="true"
                  />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ---------------- refusal list ---------------- */}
        <Section id="refusals" className="!scroll-mt-32">
          <SectionHeader
            eyebrow={t.refusals.eyebrow}
            title={t.refusals.title}
            lede={t.refusals.lede}
          />

          <ul className="mt-14 border-t border-line/60">
            {t.refusals.items.map((item) => (
              <li
                key={item.name}
                className="grid gap-3 border-b border-line/60 py-7 sm:grid-cols-[1fr_1.15fr] sm:gap-12"
              >
                <h3 className="display text-xl leading-snug text-ink">{item.name}</h3>
                <p className="text-sm leading-relaxed text-ink2">{item.reason}</p>
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-xl text-sm text-ink2">{t.refusals.footnote}</p>
        </Section>

        {/* ---------------- closing ---------------- */}
        <section className="relative overflow-hidden border-t border-line/60 bg-bg2/40">
          <div className="halo" aria-hidden="true" />
          <div className="relative mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 sm:py-32">
            <Mark className="mx-auto h-12 w-12 text-ink" />
            <h2 className="display mt-9 text-3xl leading-[1.1] sm:text-5xl">{t.closing.title}</h2>
            <p className="mx-auto mt-6 max-w-xl text-ink2">{t.closing.lede}</p>
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

import Link from "next/link";
import { localePath } from "@/lib/i18n";
import { snanHereHref } from "@/lib/nav";
import type { Lang } from "@/lib/locales";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LinkButton, StatusBadge } from "@/components/ui";
import { H2, H3, QUIET, RefHead, TABLE_GROUND, W700 } from "@/components/site/Reference";
import { Reading, readingView } from "@/components/live/Reading";
import { TrendLine, WaterDetail } from "@/components/live/WaterDetail";
import { ghatNeighbours, riverDetailContent, type Ghat } from "@/content/rivers";
import type { WaterState } from "@/lib/riverdata";

/* ---------------------------------------------------------------------------
   /rivers/[river], in v3 (spec 6.6).

   The capitals headline with the river in sindoor and its epithet as the
   one plain sentence; then the river this morning as /live shows it (state
   word, plain sentence, gauge, the exact figure and rank in one small row,
   the source line) and the press, "Do your snan here", which starts Begin
   with this water chosen for a new sheet; then the rest of this morning
   that /live carried until it became the six at a glance (WaterDetail: the
   landmark, the usual range, the sky, the register); the facts as a ruled
   register on the tint; the water's own prose in sections set apart by
   space; and at the end the same invitation as a quiet link, since the
   press under the reading is the page's one press.
   --------------------------------------------------------------------------- */

function Heading({ title, lede }: { title: string; lede?: string }) {
  return (
    <>
      <h2 className={H2} style={W700}>
        {title}
      </h2>
      {lede && <p className="mt-3 leading-[1.6] text-ink2">{lede}</p>}
    </>
  );
}

/** A section in the reading column. */
function Block({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-16">
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">{children}</div>
    </section>
  );
}

export function RiverDetail({ lang, ghat, water }: { lang: Lang; ghat: Ghat; water?: WaterState }) {
  const t = riverDetailContent[lang];

  const riversHref = localePath(lang, "/rivers");
  const muhuratHref = localePath(lang, "/muhurat");
  const liveHref = localePath(lang, "/live");
  const here = snanHereHref(lang, ghat.slug);
  const neighbours = ghatNeighbours(ghat.slug);

  const facts: { key: string; label: string; value: string }[] = [
    { key: "river", label: t.facts.river, value: ghat.river[lang] },
    { key: "ghat", label: t.facts.ghat, value: ghat.ghat[lang] },
    { key: "place", label: t.facts.place, value: `${ghat.city[lang]}, ${ghat.state[lang]}` },
    { key: "form", label: t.facts.form, value: t.formLabels[ghat.form] },
    ...(ghat.riverAlso ? [{ key: "also", label: t.facts.alsoKnown, value: ghat.riverAlso[lang] }] : []),
    { key: "tz", label: t.facts.timezone, value: ghat.tz },
  ];

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath={`/rivers/${ghat.slug}`} />

      <main>
        <RefHead
          lang={lang}
          title={t.head.title.replace("{place}", ghat.city[lang])}
          accent={ghat.river[lang]}
          plain={ghat.epithet[lang]}
          before={
            <Link href={riversHref} className="inline-flex min-h-11 items-center text-sm text-ink2 underline decoration-rule underline-offset-4 active:text-sindoor">
              {t.back}
            </Link>
          }
        >
          <p className="mt-4 leading-[1.7] text-ink2">{ghat.standfirst[lang]}</p>
        </RefHead>

        {/* --------------------------------------- this morning ------ */}
        <section id="now" className="scroll-mt-16">
          <div className="mx-auto max-w-3xl px-5 pb-12 sm:px-8">
            {water && (
              <>
                <h2 className="display text-[1.5rem] leading-[1.15] text-ink" style={W700}>
                  {t.head.now}
                </h2>
                <p className="mt-1 text-sm text-ink2">
                  {ghat.ghat[lang]}, {ghat.city[lang]}
                </p>
                <Reading className="mt-5" view={readingView(water, lang)} lang={lang} />
                <TrendLine water={water} lang={lang} className="mt-4" />
              </>
            )}
            <LinkButton href={here} className="mt-7 w-full sm:w-auto">
              {t.here}
            </LinkButton>
          </div>
          {water && (
            <div className="mx-auto max-w-3xl px-5 pb-4 sm:px-8 lg:max-w-6xl">
              <WaterDetail water={water} lang={lang} />
              <Link href={liveHref} className={`${QUIET} mt-6`}>
                {t.reading.cta}
              </Link>
            </div>
          )}
        </section>

        {/* ------------------------------------------------ facts ------ */}
        <section>
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <dl className={TABLE_GROUND}>
              {facts.map((f) => (
                <div
                  key={f.key}
                  className="flex items-baseline justify-between gap-4 border-b border-rule py-3 last:border-b-0"
                >
                  <dt className="label shrink-0 text-ink2">{f.label}</dt>
                  <dd className="min-w-0 text-right text-sm text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ----------------------------------------------- caution ------
            A fact the reader needs before choosing this water, set off by
            a sindoor rule at its edge. */}
        {ghat.caution && (
          <Block>
            <div className="border-l-4 border-sindoor pl-4">
              <h2 className={H3} style={W700}>
                {t.caution.label}
              </h2>
              <p className="mt-2 leading-[1.7] text-ink">{ghat.caution[lang]}</p>
            </div>
          </Block>
        )}

        {/* ------------------------------------------------ sacred ------ */}
        <Block id="water">
          <Heading title={t.sacred.title} />
          <div className="mt-6 space-y-5">
            {ghat.sacred[lang].map((para, i) => (
              <p key={i} className="leading-[1.75] text-ink2">
                {para}
              </p>
            ))}
          </div>
        </Block>

        {/* ----------------------------------------------- reading ------ */}
        <Block id="reading">
          <Heading title={t.reading.title} lede={t.reading.lede} />
          <p className="mt-6 leading-[1.75] text-ink">{ghat.reading[lang]}</p>

          {/* Where the figures come from and the licence they carry. */}
          <h3 className={`${H3} mt-10`} style={W700}>
            {t.reading.provenanceLabel}
          </h3>
          <div className="mt-3 space-y-4">
            {t.reading.provenance.map((para, i) => (
              <p key={i} className="text-sm leading-[1.75] text-ink2">
                {para}
              </p>
            ))}
          </div>

          <h3 className={`${H3} mt-8`} style={W700}>
            {t.reading.attributionLabel}
          </h3>
          <ul className="mt-3 space-y-1.5">
            {t.reading.attribution.map((line) => (
              <li key={line} className="text-sm leading-[1.7] text-ink2">
                {line}
              </li>
            ))}
          </ul>
        </Block>

        {/* ------------------------------------------------- offer ------ */}
        <Block id="offer">
          <Heading title={t.offer.title} lede={t.offer.lede} />
          <ul className="mt-6">
            {t.offer.items.map((item) => (
              <li key={item.key} className="py-4">
                <h3 className={H3} style={W700}>
                  {item.name}
                </h3>
                <p className="mt-2 text-sm leading-[1.75] text-ink2">{item.body}</p>
              </li>
            ))}
          </ul>
          <Link href={muhuratHref} className={`${QUIET} mt-2`}>
            {t.offer.muhurat}
          </Link>
        </Block>

        {/* --------------------------------------------- tradition ------ */}
        <Block id="tradition">
          <Heading title={t.tradition.title} lede={t.tradition.lede} />
          <ul className="mt-6">
            {ghat.tradition.map((item) => (
              <li key={item.key} className="py-4">
                <h3 className={H3} style={W700}>
                  {item.name[lang]}
                </h3>
                <p className="mt-1 text-sm text-ink2">{t.tradition.kindLabels[item.kind]}</p>
                <p className="mt-2 text-sm leading-[1.75] text-ink2">{item.note[lang]}</p>
              </li>
            ))}
          </ul>
        </Block>

        {/* --------------------------------------------- occasions ------
            The reckonings line up in a column, so the rows keep their
            hairline on the tint. */}
        <Block id="occasions">
          <Heading title={t.occasions.title} lede={t.occasions.lede} />
          <div className="mt-4">
            <StatusBadge>{t.occasions.provisional}</StatusBadge>
          </div>
          <ul className={`mt-4 ${TABLE_GROUND}`}>
            {ghat.occasions.map((o) => (
              <li key={o.key} className="border-b border-rule py-5 last:border-b-0">
                <h3 className={H3} style={W700}>
                  {o.name[lang]}
                </h3>
                <p className="mt-1 text-sm text-ink">{o.reckoning[lang]}</p>
                <p className="mt-2 text-sm leading-[1.75] text-ink2">{o.note[lang]}</p>
              </li>
            ))}
          </ul>
        </Block>

        {/* ------------------------------------------------ keeper ------ */}
        <Block id="keeper">
          <Heading title={t.keeper.title} />
          <p className="mt-6 leading-[1.75] text-ink">{ghat.keeper[lang]}</p>
        </Block>

        {/* ------------------------------------------------ onward ------ */}
        <Block>
          <Heading title={t.onward.title} />
          {neighbours && (
            <ul className="mt-6 border-t border-rule">
              {[neighbours.prev, neighbours.next].map((g) => (
                <li key={g.slug} className="border-b border-rule">
                  <Link href={localePath(lang, `/rivers/${g.slug}`)} className="group flex min-h-[56px] items-baseline justify-between gap-3 py-3">
                    <span className="display text-[1.25rem] text-ink group-active:text-sindoor" style={W700}>
                      {g.river[lang]}
                    </span>
                    <span className="text-right text-sm text-ink2">
                      {g.ghat[lang]}, {g.city[lang]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link href={riversHref} className={`${QUIET} mt-4`}>
            {t.onward.all}
          </Link>
        </Block>

        <section>
          <div className="mx-auto max-w-md px-5 py-16 sm:max-w-3xl sm:px-8 sm:py-20">
            <h2 className={H2} style={W700}>
              {t.head.close.replace("{river}", ghat.river[lang])}
            </h2>
            <Link href={here} className={`${QUIET} mt-5`}>
              {t.here}
            </Link>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}

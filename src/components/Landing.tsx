import Link from "next/link";
import { content } from "@/lib/content";
import { RIVERS } from "@/content/rivers";
import { DATED_OCCASIONS } from "@/content/muhurat";
import { localePath } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";
import { Mark } from "@/components/Logo";
import { RiverFlow } from "@/components/RiverFlow";
import { Reveal } from "@/components/Reveal";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  StructuredData,
  organization,
  webPage,
  website,
} from "@/components/StructuredData";
import {
  CTA,
  Eyebrow,
  LinkButton,
  Section,
  SectionHeader,
  StatusBadge,
} from "@/components/ui";

/** Devanagari numerals in the Hindi edition, as a printed panchang sets them. */
const DEVA = "०१२३४५६७८९";
function numeral(n: number, lang: Lang): string {
  const s = String(n).padStart(2, "0");
  return lang === "hi" ? [...s].map((d) => DEVA[Number(d)]).join("") : s;
}

export function Landing({ lang }: { lang: Lang }) {
  const t = content[lang];
  const hi = lang === "hi";

  return (
    <>
      {/* The home page is where the Organization and WebSite nodes are anchored;
          every other page references them by @id. */}
      <StructuredData
        graph={[
          organization(lang),
          website(),
          webPage({
            lang,
            path: "/",
            name: t.meta.title,
            description: t.meta.description,
          }),
        ]}
      />

      <div className="grain" aria-hidden="true" />

      <Header lang={lang} currentPath="/" ctaTo="#sankalp" />

      <main>
        {/* ------------------------------------------------ front page ---- */}
        <section className="relative flex min-h-[88vh] flex-col justify-end overflow-hidden border-b-2 border-rulestrong">
          {/* On a narrow screen the river is confined to a band beneath the
              headline; the crop would otherwise put the sun through the type. */}
          <RiverFlow className="absolute inset-x-0 bottom-0 h-[54%] w-full text-ink lg:inset-0 lg:h-full" />

          <div className="relative mx-auto w-full max-w-6xl px-5 pt-24 pb-12 sm:px-8 sm:pt-28 sm:pb-16">
            <div className="max-w-3xl">
              <div className="ink-in">
                <StatusBadge live>{t.hero.badge}</StatusBadge>
              </div>

              <h1
                className="ink-in display mt-7 text-[3.4rem] leading-[0.97] sm:text-[5rem] lg:text-[6.2rem]"
                style={{ animationDelay: "80ms" }}
              >
                {t.hero.titleA}{" "}
                <span className="text-spot">{t.hero.titleB}</span>
              </h1>

              <div className="rule-double mt-8 max-w-xl" />

              <p
                className="ink-in mt-6 max-w-xl text-[1.05rem] leading-[1.75] text-ink2"
                style={{ animationDelay: "160ms" }}
              >
                {t.hero.lede}
              </p>

              <div
                className="ink-in mt-9 flex flex-wrap items-center gap-3"
                style={{ animationDelay: "240ms" }}
              >
                <a href="#sankalp">
                  <CTA>{t.hero.ctaPrimary}</CTA>
                </a>
                <Link href={localePath(lang, "/how-it-works")}>
                  <CTA variant="ghost">{t.hero.ctaSecondary}</CTA>
                </Link>
              </div>

              {/* The offer, stated in the hero rather than buried in the
                  tariff. A price is a fact about the thing, not a reveal. */}
              <p
                className="ink-in mt-7 max-w-xl border-l-2 border-spot pl-4 text-sm leading-[1.75] text-ink2"
                style={{ animationDelay: "320ms" }}
              >
                {t.hero.offer}
              </p>
            </div>

            {/* the day's entry, printed on paper laid over the water */}
            <div className="mt-12 grid items-end gap-8 lg:grid-cols-[1fr_auto]">
              <dl className="ink-in grid max-w-xl grid-cols-3 border-t-2 border-rulestrong bg-paper">
                {t.hero.stats.map((s) => (
                  <div
                    key={s.l}
                    className="border-r border-rule py-4 pr-4 pl-3 first:pl-0 last:border-r-0"
                  >
                    <dt className="display text-[1.6rem] leading-none text-ink sm:text-[2rem]">
                      {s.n}
                    </dt>
                    <dd className="label mt-2 text-ink2">{s.l}</dd>
                  </div>
                ))}
              </dl>

              <aside className="ink-in boxed w-full bg-paper p-6 lg:w-[22rem]">
                <p className="label text-spot">{t.hero.card.label}</p>
                <p className="display mt-1.5 text-2xl">{t.hero.card.title}</p>
                <dl className="mt-4 border-t border-rule">
                  <div className="flex justify-between gap-4 border-b border-rule py-2.5">
                    <dt className="label text-ink2">{hi ? "घाट" : "Ghat"}</dt>
                    <dd className="text-right text-sm">{t.hero.card.meta}</dd>
                  </div>
                  <div className="flex justify-between gap-4 py-2.5">
                    <dt className="label text-ink2">{hi ? "समय" : "Window"}</dt>
                    <dd className="text-right text-sm text-spot">
                      {t.hero.card.countdown}
                    </dd>
                  </div>
                </dl>
              </aside>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ the six ------- */}
        <Section id="rivers">
          <Reveal>
            <SectionHeader
              eyebrow={t.rivers.eyebrow}
              title={t.rivers.title}
              lede={t.rivers.lede}
            />

            {/* a register, not a card grid */}
            <ul className="mt-12 border-t-2 border-rulestrong">
              {RIVERS.map((r, i) => (
                <li key={r.slug}>
                  <Link
                    href={localePath(lang, `/rivers/${r.slug}`)}
                    className="group grid grid-cols-[2.75rem_1fr] items-baseline gap-x-4 gap-y-1 border-b border-rule py-5 transition-colors hover:bg-paper3 sm:grid-cols-[3.5rem_14rem_1fr_auto] sm:gap-x-8"
                  >
                    <span className="display text-xl text-spot">
                      {numeral(i + 1, lang)}
                    </span>
                    <span className="display text-2xl text-ink">
                      {r.river[lang]}
                    </span>
                    <span className="col-start-2 text-sm text-ink2 sm:col-start-auto">
                      {r.ghat[lang]}, {r.city[lang]}
                    </span>
                    <span className="label col-start-2 text-ink2 sm:col-start-auto sm:text-right">
                      {r.state[lang]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </Section>

        {/* ------------------------------------------------ procedure ----- */}
        <Section id="how" tinted>
          <Reveal>
            <SectionHeader eyebrow={t.how.eyebrow} title={t.how.title} />

            <ol className="mt-12 grid gap-px border-2 border-rulestrong bg-rule md:grid-cols-3">
              {t.how.steps.map((s, i) => (
                <li key={s.n} className="tint p-7">
                  <span className="display block text-4xl text-spot">
                    {numeral(i + 1, lang)}
                  </span>
                  <div className="rule-thin mt-4" />
                  <h3 className="display mt-4 text-2xl">{s.t}</h3>
                  <p className="mt-3 text-sm leading-[1.75] text-ink2">{s.d}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </Section>

        {/* ------------------------------------------------ calendar ------ */}
        <Section id="muhurat">
          <Reveal>
            <SectionHeader
              eyebrow={t.muhurat.eyebrow}
              title={t.muhurat.title}
              lede={t.muhurat.lede}
            />

            <div className="mt-12 overflow-x-auto">
              <table className="w-full min-w-[34rem] border-collapse text-left">
                <thead>
                  <tr className="border-y-2 border-rulestrong">
                    <th className="label py-3 pr-4 text-ink2">
                      {hi ? "पर्व" : "Occasion"}
                    </th>
                    <th className="label py-3 pr-4 text-ink2">
                      {hi ? "विवरण" : "Reckoning"}
                    </th>
                    <th className="label py-3 text-right text-ink2">
                      {hi ? "काल" : "Window"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {DATED_OCCASIONS.slice(0, 6).map((o) => (
                    <tr
                      key={o.slug}
                      className="border-b border-rule transition-colors hover:bg-paper3"
                    >
                      <td className="py-4 pr-4">
                        <Link
                          href={localePath(lang, `/muhurat/${o.slug}`)}
                          className="display text-xl underline decoration-rule decoration-1 hover:decoration-spot"
                        >
                          {o.name[lang]}
                        </Link>
                      </td>
                      <td className="py-4 pr-4 text-sm text-ink2">
                        {o.occurrence.note[lang]}
                      </td>
                      <td className="label py-4 text-right text-ink">
                        {o.occurrence.label[lang]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-5 text-xs text-ink2">
              {hi
                ? "अस्थायी। बुकिंग खुलने से पूर्व हर समय पंचांग से पुष्ट किया जाता है।"
                : "Provisional. Every timing is confirmed against the panchang before booking opens."}
            </p>
          </Reveal>
        </Section>

        {/* ------------------------------------------------ tariff --------
            The section is about the samuhik/ekantik distinction first and the
            numbers second, because that distinction is the honest reason an
            $11 rite and a $251 rite can sit on the same page. The vessels come
            before the tariff for that reason; do not reorder them.

            Every session figure here agrees with the others: 11 per segment,
            up to 51 per session in five segments, at least 45 seconds each,
            which is ~53 minutes against a 48-minute Brahma Muhurat, hence the
            stated overrun into Pratah Sandhya. Changing one of those numbers
            means changing all of them, in both locales.                    */}
        <Section id="sankalp" tinted>
          <Reveal>
            <SectionHeader
              eyebrow={t.pricing.eyebrow}
              title={t.pricing.title}
              lede={t.pricing.lede}
            />

            {/* the two vessels, set as facing registers */}
            <div className="mt-12">
              <Eyebrow>{t.pricing.modes.eyebrow}</Eyebrow>
            </div>

            <div className="mt-6 grid gap-px border-2 border-rulestrong bg-rule lg:grid-cols-2">
              {t.pricing.modes.items.map((m) => (
                <div key={m.name} className="tint flex flex-col p-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="display text-2xl">{m.name}</h3>
                    <span className="label text-ink2">{m.alt}</span>
                  </div>
                  <p className="label mt-2 text-spot">{m.sub}</p>

                  <div className="rule-thin mt-5" />

                  <p className="mt-5 text-sm leading-[1.75] text-ink2">
                    {m.body}
                  </p>

                  <dl className="mt-6 border-t border-rule">
                    {m.rows.map((r) => (
                      <div
                        key={r.k}
                        className="flex justify-between gap-6 border-b border-rule py-2.5 last:border-b-0"
                      >
                        <dt className="label shrink-0 pt-0.5 text-ink2">
                          {r.k}
                        </dt>
                        <dd className="text-right text-sm leading-snug text-ink">
                          {r.v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>

            {/* the arithmetic of a full session, stated rather than implied */}
            <div className="boxed mt-8 bg-paper p-6 sm:p-7">
              <p className="label text-spot">{t.pricing.session.label}</p>
              {t.pricing.session.body.map((p) => (
                <p
                  key={p}
                  className="mt-4 max-w-3xl text-sm leading-[1.75] text-ink2"
                >
                  {p}
                </p>
              ))}
            </div>

            {/* the tariff, both ladders in one table, never a geo switch */}
            <div className="mt-16">
              <Eyebrow>{t.pricing.tariff.label}</Eyebrow>
              <h3 className="display mt-4 text-[1.9rem] sm:text-[2.3rem]">
                {t.pricing.tariff.caption}
              </h3>

              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[48rem] border-collapse text-left">
                  <thead>
                    <tr className="border-t-2 border-rulestrong">
                      <th className="label py-3 pr-6 text-ink2">
                        {t.pricing.tariff.heads.rite}
                      </th>
                      <th className="label py-3 pr-6 text-ink2">
                        {t.pricing.tariff.heads.vessel}
                      </th>
                      <th className="label py-3 pr-6 text-right text-spot">
                        {t.pricing.tariff.heads.world}
                      </th>
                      <th className="label py-3 text-right text-ink">
                        {t.pricing.tariff.heads.india}
                      </th>
                    </tr>
                    <tr className="border-b-2 border-rulestrong">
                      <td className="pb-3" colSpan={2} />
                      <td className="max-w-[10rem] pr-6 pb-3 text-right text-[0.7rem] leading-snug text-ink2">
                        {t.pricing.tariff.subheads.world}
                      </td>
                      <td className="max-w-[10rem] pb-3 text-right text-[0.7rem] leading-snug text-ink2">
                        {t.pricing.tariff.subheads.india}
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {t.pricing.tariff.rows.map((r) => (
                      <tr key={r.name} className="border-b border-rule align-top">
                        <td className="py-5 pr-6">
                          <span className="display block text-xl text-ink">
                            {r.name}
                          </span>
                          <span className="label mt-1.5 block text-ink2">
                            {r.alt}
                          </span>
                          <p className="mt-2.5 max-w-sm text-sm leading-[1.7] text-ink2">
                            {r.what}
                          </p>
                        </td>
                        <td className="label py-5 pr-6 text-ink2">{r.vessel}</td>
                        <td className="py-5 pr-6 text-right">
                          <span className="display text-2xl text-spot">
                            {r.world}
                          </span>
                        </td>
                        <td className="py-5 text-right">
                          <span className="display text-2xl text-ink">
                            {r.india}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* the two things the table cannot say on its own */}
            <div className="mt-12 grid gap-px border-2 border-rulestrong bg-rule lg:grid-cols-2">
              <div className="tint p-7">
                <p className="label text-spot">{t.pricing.ladders.label}</p>
                {t.pricing.ladders.body.map((p) => (
                  <p key={p} className="mt-4 text-sm leading-[1.75] text-ink2">
                    {p}
                  </p>
                ))}
              </div>

              <div className="bg-paper3 p-7">
                <p className="label text-spot">{t.pricing.kosh.label}</p>
                <h3 className="display mt-3 text-2xl">{t.pricing.kosh.title}</h3>
                <p className="mt-4 text-sm leading-[1.75] text-ink2">
                  {t.pricing.kosh.body}
                </p>

                <dl className="mt-6 border-t border-rule">
                  {t.pricing.kosh.rows.map((r) => (
                    <div
                      key={r.k}
                      className="flex justify-between gap-6 border-b border-rule py-2.5 last:border-b-0"
                    >
                      <dt className="label shrink-0 pt-0.5 text-ink2">{r.k}</dt>
                      <dd className="text-right text-sm leading-snug text-ink">
                        {r.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <p className="mt-7 max-w-3xl text-xs leading-[1.75] text-ink2">
              {t.pricing.note}
            </p>

            <div className="mt-8">
              <LinkButton
                href={localePath(lang, "/rituals")}
                variant="ghost"
              >
                {t.pricing.cta}
              </LinkButton>
            </div>
          </Reveal>
        </Section>

        {/* ------------------------------------------------ colophon ------ */}
        <section className="border-t-2 border-rulestrong">
          <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-24">
            <Mark className="mx-auto h-12 w-12 text-ink" />
            <div className="rule-double mt-8" />
            <h2 className="display mt-8 text-[2.2rem] leading-tight sm:text-[3.2rem]">
              {t.closing.title}
            </h2>
            <p className="mx-auto mt-5 max-w-lg leading-[1.75] text-ink2">
              {t.closing.lede}
            </p>
            <a href="#sankalp" className="mt-9 inline-block">
              <CTA className="!px-10 !py-4">{t.closing.cta}</CTA>
            </a>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}

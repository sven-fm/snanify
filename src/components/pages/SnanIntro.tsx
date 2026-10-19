import Link from "next/link";
import { localePath } from "@/lib/i18n";
import type { Lang } from "@/lib/locales";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PastHero } from "@/components/site/PastHero";
import { Walkthrough } from "@/components/snan/Walkthrough";
import { Specimen } from "@/components/Specimen";
import { Band, Label, RiverHorizon, Seal } from "@/components/kit";
import { buttonClass, CTA, CurrencyLine, Price, TaxNote } from "@/components/ui";
import { snanContent } from "@/content/snan";
import { PER_SNAN, PRICE } from "@/content/prices";
import { clock, LIMB_START, SITTING } from "@/lib/sitting-plan";
import type { WalkData } from "@/lib/walkthrough";

/**
 * /snan, the landing's sibling (spec 6.2).
 *
 * 390px first. A capitals headline with the river word in sindoor, the band,
 * the price seal and the short pitch, then the one press. The snan follows as a
 * walkthrough in a phone (the launch video's cut, live, on today's figure), then
 * the five parts as a list with their clocks and lengths from src/lib/sitting-plan.ts.
 *
 * One press above the parts (the hero's). The eleven pack carries the only
 * other press, far below, as on the landing; every other action is a quiet
 * link. The masthead's Begin waits for the hero press to scroll off (PastHero).
 */

/** Devanagari numerals in the Hindi edition, as a printed panchang sets them. */
const DEVA = "०१२३४५६७८९";
function digits(s: string, lang: Lang): string {
  return lang === "hi" ? [...s].map((d) => (/\d/.test(d) ? DEVA[Number(d)] : d)).join("") : s;
}
function numeral(n: number, lang: Lang): string {
  return digits(String(n).padStart(2, "0"), lang);
}

const ROUTE = "/snan";

const H2 = "display text-[1.75rem] leading-[1.12] sm:text-[2.25rem]";
const W700 = { fontWeight: 700 } as const;

export function SnanIntro({ lang, walk }: { lang: Lang; walk: WalkData }) {
  const t = snanContent[lang];
  const hi = lang === "hi";
  const begin = localePath(lang, "/begin");
  const [lead, tail] = t.hero.title.split("{river}");

  const length = (id: keyof typeof SITTING) =>
    t.form.seconds.replace("{n}", digits(String(SITTING[id]), lang));
  const startsAt = (id: keyof typeof SITTING) => digits(clock(LIMB_START[id]), lang);

  return (
    <>
      <div className="grain" aria-hidden="true" />

      <PastHero />
      <Header lang={lang} currentPath={ROUTE} ctaAfterHero />

      <main>
        {/* ------------------------------------------------ masthead ------ */}
        <section className="overflow-x-clip">
          <div className="mx-auto max-w-md px-5 lg:max-w-3xl lg:px-8">
            <h1
              className={`display pt-5 text-ink sm:pt-10 ${
                hi
                  ? "text-[2.25rem] sm:text-[2.6rem]"
                  : "text-[2.35rem] uppercase min-[380px]:text-[2.5rem] sm:text-[2.85rem]"
              }`}
              style={{ fontWeight: 800, lineHeight: hi ? 1.22 : 0.95, letterSpacing: hi ? 0 : "-0.01em" }}
            >
              {lead}
              <span className="text-sindoor">{t.hero.riverWord}</span>
              {tail}
            </h1>

            <Band className="mt-4">{t.hero.band}</Band>

            <div className="mt-5 flex items-center gap-4">
              <Seal kind="price" prices={PRICE.eleven} lang={lang} />
              <p className="text-[0.9375rem] leading-[1.45] text-ink">{t.hero.offer}</p>
            </div>

            <Link href={begin} className="mt-5 flex" data-hero-cta data-hero-press>
              <CTA className="w-full">{t.hero.ctaPrimary}</CTA>
            </Link>

            <p className="mt-8 leading-[1.6] text-ink2">{t.hero.lede}</p>

            <div className="-mx-5 mt-10 lg:mx-0">
              <RiverHorizon height={156} />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ the five parts */}
        <section id="form" className="scroll-mt-16">
          <div className="mx-auto max-w-md px-5 py-14 lg:max-w-3xl lg:px-8">
            <h2 className={H2} style={W700}>
              {t.form.title}
            </h2>
            <p className="mt-3 leading-[1.6] text-ink2">{t.form.lede}</p>

            <div className="mt-8">
              <Walkthrough lang={lang} data={walk} />
            </div>

            <ol id="parts" className="mt-10 border-b border-rule">
              {t.form.limbs.map((l, i) => (
                <li key={l.id} id={l.id} className="scroll-mt-20 border-t border-rule py-6">
                  <div className="flex items-baseline gap-4">
                    <span className="display text-[1.5rem] leading-none text-sindoor tabular-nums" style={W700}>
                      {numeral(i + 1, lang)}
                    </span>
                    <h3 className="display min-w-0 flex-1 text-[1.375rem] leading-[1.25]" style={W700}>
                      {l.title}
                    </h3>
                    <span className="shrink-0 text-sm text-ink2 tabular-nums">
                      {startsAt(l.id)}, {length(l.id)}
                    </span>
                  </div>
                  {l.body.map((p) => (
                    <p key={p} className="mt-3 text-[0.9375rem] leading-[1.6] text-ink2">
                      {p}
                    </p>
                  ))}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------ the stillness -- */}
        <section id="stillness" className="bg-ink text-paper">
          <div className="mx-auto max-w-md px-5 py-16 lg:max-w-3xl lg:px-8">
            <h2 className={H2} style={W700}>
              {t.still.title}
            </h2>
            <p className="mt-4 leading-[1.6]">{t.still.body}</p>
            <p className="display mt-8 text-[1.5rem] leading-[1.3]" style={W700}>
              {t.still.instruction}
            </p>
            <p className="mt-6 text-sm leading-[1.6]">{t.still.note}</p>
          </div>
        </section>

        {/* ------------------------------------------------ the sheet ----- */}
        <section id="patra" className="tint scroll-mt-16">
          <div className="mx-auto max-w-md px-5 py-16 lg:max-w-3xl lg:px-8">
            <h2 className={H2} style={W700}>
              {t.patra.title}
            </h2>
            <p className="mt-3 leading-[1.6] text-ink2">{t.patra.lede}</p>

            <Specimen lang={lang} className="mt-8" />

            <dl className="mt-10 border-b border-rule">
              {t.patra.carries.map((row) => (
                <div key={row.k} className="border-t border-rule py-4">
                  <dt className="display text-[1.125rem]" style={W700}>
                    {row.k}
                  </dt>
                  <dd className="mt-1 text-[0.9375rem] leading-[1.6] text-ink2">{row.v}</dd>
                </div>
              ))}
            </dl>

            <h3 className="display mt-10 text-[1.375rem] leading-[1.25]" style={W700}>
              {t.patra.engravingTitle}
            </h3>
            {t.patra.engravingBody.map((p) => (
              <p key={p} className="mt-3 text-[0.9375rem] leading-[1.6] text-ink2">
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------ questions ----- */}
        <section id="questions" className="scroll-mt-16">
          <div className="mx-auto max-w-md px-5 py-16 lg:max-w-3xl lg:px-8">
            <h2 className={H2} style={W700}>
              {t.before.title}
            </h2>
            <ul className="mt-6 border-b border-rule">
              {t.before.items.map((item) => (
                <li key={item.q} className="border-t border-rule py-5">
                  <h3 className="display text-[1.25rem] leading-[1.3]" style={W700}>
                    {item.q}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-[1.6] text-ink2">{item.a}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------ the packs ------ */}
        <section id="tariff" className="tint scroll-mt-16">
          <div className="mx-auto max-w-md px-5 py-16 lg:max-w-3xl lg:px-8">
            <h2 className={H2} style={W700}>
              <CurrencyLine other={t.tariff.title} inr={t.tariff.titleInr} />
            </h2>
            <p className="mt-3 leading-[1.6] text-ink2">{t.tariff.lede}</p>

            {t.tariff.rows
              .filter((row) => row.hero)
              .map((row) => (
                <div key={row.key} className="mt-8">
                  <Link href={`${begin}?pack=${row.key}`} className="block">
                    <Label
                      kicker={
                        <>
                          <Price prices={PER_SNAN[row.key]} /> {t.tariff.heads.per}
                        </>
                      }
                      title={row.name}
                      price={PRICE[row.key]}
                    />
                  </Link>
                  <p className="mt-4 text-[0.9375rem] leading-[1.6] text-ink2">{row.body}</p>
                  <Link href={`${begin}?pack=${row.key}`} className="mt-5 flex">
                    <CTA className="w-full">{t.tariff.choose}</CTA>
                  </Link>
                </div>
              ))}

            <ul className="mt-10 border-b border-rule">
              {t.tariff.rows
                .filter((row) => !row.hero)
                .map((row) => (
                  <li key={row.key} className="border-t border-rule">
                    <Link
                      href={`${begin}?pack=${row.key}`}
                      className="group block min-h-[56px] py-4 active:bg-paper2"
                    >
                      <span className="flex items-baseline justify-between gap-4">
                        <span className="display text-[1.375rem] text-ink group-active:text-sindoor" style={W700}>
                          {row.name}
                        </span>
                        <span className="display text-[1.375rem] text-ink tabular-nums" style={W700}>
                          <Price prices={PRICE[row.key]} />
                        </span>
                      </span>
                      <span className="mt-1 block text-sm leading-[1.55] text-ink2">
                        <Price prices={PER_SNAN[row.key]} /> {t.tariff.heads.per}
                      </span>
                      <span className="mt-1 block text-sm leading-[1.55] text-ink2">{row.body}</span>
                    </Link>
                  </li>
                ))}
            </ul>

            <p className="mt-6 text-sm leading-[1.6] text-ink2">
              <TaxNote lang={lang} /> {t.tariff.note}
            </p>
          </div>
        </section>

        {/* ------------------------------------------------ closing ------- */}
        <section>
          <div className="mx-auto max-w-md px-5 py-16 lg:max-w-3xl lg:px-8">
            <h2 className={H2} style={W700}>
              {t.closing.title}
            </h2>
            <p className="mt-3 leading-[1.6] text-ink2">{t.closing.body}</p>
            <Link href={begin} className={buttonClass("quiet", "mt-3")}>
              {t.closing.cta}
            </Link>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </>
  );
}

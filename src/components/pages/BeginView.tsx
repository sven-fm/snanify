import Link from "next/link";
import { Specimen } from "@/components/Specimen";
import { beginContent } from "@/content/begin";
import { content } from "@/lib/content";
import { PER_SNAN, PRICE, type TierKey } from "@/content/prices";
import { localePath, type Lang } from "@/lib/locales";
import { Price, TaxNote, buttonClass } from "@/components/ui";
import { Band, Label, Seal } from "@/components/kit";
import { Bindu } from "@/components/marks";
import { Steps } from "@/components/site/Steps";
import { startCheckout } from "@/app/[lang]/begin/actions";
import { TrackedSubmit } from "@/components/site/TrackedSubmit";

/* ---------------------------------------------------------------------------
   The pay step as it is drawn (spec 6.3), from what Begin has already read:
   no database here, so the view renders in a unit test as it does on the page.

   Built at 390 first, in one max-w-md column, in this order:

    1. the three-step line, on a first visit, with the bindu on the mornings;
    2. the headline in capitals, its second sentence in sindoor;
    3. the band, the one thing to know: pay once, use them any morning;
    4. the specimen in its phone, with the buyer's own names on it, and
       beside it the eleven pack on the matchbox label under the price seal;
    5. the press, "Pay $11", full column width, under the thumb;
    6. one and sixty as plain ruled rows, each paid by an underlined link.

   ONE PRESS. The eleven's Pay is the only block on the page. One and sixty
   are rows whose Pay is a quiet link, and the way to today, for somebody
   with mornings in hand, is a quiet link too.

   THE BUTTONS ARE FORMS, NOT LINKS. Opening a Checkout Session is a write: a
   POST that reads the currency on the server (src/app/[lang]/begin/actions.ts).
   --------------------------------------------------------------------------- */

type Copy = (typeof beginContent)["en"];

function PayForm({
  lang,
  tier,
  t,
  press,
  className = "",
}: {
  lang: Lang;
  tier: TierKey;
  t: Copy;
  press: boolean;
  className?: string;
}) {
  const [before, after] = t.cta.split("{price}");
  return (
    <form action={startCheckout.bind(null, lang)} className={className}>
      <input type="hidden" name="tier" value={tier} />
      <TrackedSubmit
        className={press ? "w-full" : ""}
        variant={press ? "solid" : "quiet"}
        event="checkout_start"
        props={{ pack: tier, lang }}
        pending={t.opening}
      >
        {/* The button names the charge: "Pay $11", in the reader's currency. */}
        {before}
        <Price prices={PRICE[tier]} />
        {after}
      </TrackedSubmit>
    </form>
  );
}

/* A line that needs reading before the packs: led by the bindu, in bold ink. */
function Notice({ children }: { children: React.ReactNode }) {
  return (
    <p role="status" className="mt-5 flex items-baseline gap-2.5 text-[0.9375rem] font-bold leading-[1.5] text-ink">
      <Bindu className="shrink-0 text-[1.1rem]" />
      <span>{children}</span>
    </p>
  );
}

const W700 = { fontWeight: 700 } as const;

export function BeginView({
  lang,
  credits,
  returning,
  out = false,
  cancelled = false,
  error = false,
}: {
  lang: Lang;
  /** Mornings already on the account. */
  credits: number;
  /** Bought before, or sent with every morning kept: the step line is for a first visit. */
  returning: boolean;
  out?: boolean;
  cancelled?: boolean;
  error?: boolean;
}) {
  const t = beginContent[lang];
  const hi = lang === "hi";
  const tiers = content[lang].pricing.tiers;
  const name = (tier: TierKey) => tiers.find((row) => row.key === tier)!.name;
  const lede = out ? t.outLine : t.setLine;

  return (
    <main className="overflow-x-clip">
      <div className="mx-auto max-w-md px-5 pt-6 pb-16 sm:pt-10">
        {/* The third of the three steps that began on /setup, for a first visit. */}
        {!returning && <Steps steps={t.steps} here={[2]} label={t.title} className="mb-5" />}

        {/* Capitals in Latin; Devanagari has no case and takes its own leading. */}
        <h1
          className={`display text-ink ${hi ? "text-[2.1rem]" : "text-[2.2rem] uppercase min-[380px]:text-[2.35rem]"}`}
          style={{ fontWeight: 800, lineHeight: hi ? 1.22 : 0.95, letterSpacing: hi ? 0 : "-0.01em" }}
        >
          {t.title} <span className="text-sindoor">{t.sub}</span>
        </h1>

        <Band className="mt-4">{t.band}</Band>

        {cancelled && <Notice>{t.cancelled}</Notice>}
        {error && <Notice>{t.payError}</Notice>}

        {credits > 0 ? (
          <div className="mt-5">
            <p className="text-[0.9375rem] leading-[1.5] text-ink">
              {credits === 1 ? t.haveOne : t.haveCredits.replace("{credits}", String(credits))}
            </p>
            <Link href={localePath(lang, "/today")} className={buttonClass("quiet")}>
              {t.toToday}
            </Link>
          </div>
        ) : (
          <p className="mt-5 text-[0.9375rem] leading-[1.5] text-ink2">{lede}</p>
        )}

        {/* ---------------- the sheet, and eleven beside it ----------------
            Their own names on the specimen, drawn from today's figure. */}
        <div className="mt-6 grid grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)] items-center gap-4 min-[380px]:grid-cols-[minmax(0,9.25rem)_minmax(0,1fr)]">
          <Specimen lang={lang} caption={false} />
          <div className="relative pt-12">
            <Seal kind="price" prices={PRICE.eleven} lang={lang} size={74} className="absolute top-0 right-1 z-10" />
            <Label
              kicker={
                <>
                  <Price prices={PER_SNAN.eleven} /> {t.perLabel}
                </>
              }
              title={name("eleven")}
              price={PRICE.eleven}
            />
            <p className="mt-3 text-sm leading-[1.5] text-ink2">{t.blurb.eleven}</p>
          </div>
        </div>

        <PayForm lang={lang} tier="eleven" t={t} press className="mt-6" />

        {/* ---------------- one and sixty, as plain rows ---------------- */}
        <ul className="mt-10 border-b border-rule">
          {(["one", "sixty"] as const).map((tier) => (
            <li key={tier} className="border-t border-rule py-4">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="display text-[1.375rem] text-ink" style={W700}>
                  {name(tier)}
                </h2>
                <p className="display tabular-nums text-[1.375rem] text-ink" style={W700}>
                  <Price prices={PRICE[tier]} />
                </p>
              </div>
              <p className="mt-1 text-sm leading-[1.55] text-ink2">
                <Price prices={PER_SNAN[tier]} /> {t.perLabel}
                {hi ? "। " : ". "}
                {t.blurb[tier]}
              </p>
              <PayForm lang={lang} tier={tier} t={t} press={false} className="mt-1" />
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm leading-[1.6] text-ink2">
          {t.note} <TaxNote lang={lang} /> {t.refund}
        </p>
      </div>
    </main>
  );
}

import Link from "next/link";
import { redirect } from "next/navigation";
import { WaterBand } from "@/components/WaterBand";
import { Specimen } from "@/components/Specimen";
import { eq } from "drizzle-orm";
import { db, profiles, purchases } from "@/db";
import { beginContent } from "@/content/begin";
import { content } from "@/lib/content";
import { PER_SNAN, PRICE, type TierKey } from "@/content/prices";
import { balance } from "@/lib/credits";
import { currentUser } from "@/lib/auth";
import { DEFAULT_TIER, isTier } from "@/lib/packs";
import { localePath, type Lang } from "@/lib/locales";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CTA, Price, TaxNote } from "@/components/ui";
import { Tilak } from "@/components/marks";
import { Steps } from "@/components/site/Steps";
import { startCheckout } from "@/app/[lang]/begin/actions";
import { TrackView } from "@/components/site/TrackView";
import { TrackedSubmit } from "@/components/site/TrackedSubmit";

/* ---------------------------------------------------------------------------
   /begin, where the site finally takes money.

   Every "Begin" on the site lands here. It is read by somebody who has already
   decided, so there is no second pitch, no free-tier comparison and no essay
   about the price. Eleven first and large, because it is the pack most people
   take and the one the whole site prices from, on the tinted ground; one
   and sixty as two quieter blocks beneath it.

   THE BUTTONS ARE FORMS, NOT LINKS. Creating a Checkout Session is a write: it
   must be a POST, it must be able to sign the person in first, and it must
   read the currency on the server. A link with a tier in the query string
   would let a crawler open sessions.

   SET UP BEFORE PAYING. A stranger who presses Begin is sent to sign in and
   then to /setup; the sheet is made first, and this page is the last step,
   with the buyer's own names on the specimen beside the packs. Paying for a
   thing you have already half made converts better than paying for a
   description of it, and a saved profile with no mornings on it is harmless.

   ONE PRESS OF PAY, EVEN WITH A SIGN-IN IN BETWEEN. A reader whose session
   lapsed before pressing Pay signs in and returns to /begin/go, a route
   handler that spends the intent cookie and opens the session itself; see
   src/app/[lang]/begin/go/route.ts. This page only reads.

   A PRESS THAT CAME BACK UNOPENED arrives as `error=pay`, and a short line
   above the packs asks for one more. See src/app/[lang]/begin/actions.ts.

   A RETURNING BUYER SKIPS THE SETUP LINE. The three steps belong to the first
   visit; somebody who has bought before, or is sent from /today or /account
   with every morning kept (`out=1`), is shown the packs and one line to match.

   A SIGNED-IN PERSON WITH MORNINGS IN HAND is told so, and offered the way to
   sit rather than the way to buy again.
   --------------------------------------------------------------------------- */

function PayButton({
  lang,
  tier,
  t,
  solid,
  className = "",
}: {
  lang: Lang;
  tier: TierKey;
  t: (typeof beginContent)["en"];
  solid: boolean;
  className?: string;
}) {
  return (
    <form action={startCheckout.bind(null, lang)} className={className}>
      <input type="hidden" name="tier" value={tier} />
      <TrackedSubmit
        className="w-full"
        variant={solid ? "solid" : "ghost"}
        event="checkout_start"
        props={{ pack: tier, lang }}
        pending={t.opening}
      >
        {/* The button names the charge: "Pay $11", in the reader's currency. */}
        {t.cta.split("{price}")[0]}
        <Price prices={PRICE[tier]} />
        {t.cta.split("{price}")[1]}
      </TrackedSubmit>
    </form>
  );
}

export async function Begin({
  lang,
  pack,
  cancelled,
  error,
  out,
}: {
  lang: Lang;
  pack?: string;
  cancelled?: boolean;
  /** A Pay press that came back unopened. */
  error?: boolean;
  /** Sent from /today or /account with every morning kept. */
  out?: boolean;
}) {
  const t = beginContent[lang];
  const tiers = content[lang].pricing.tiers;
  const name = (tier: TierKey) => tiers.find((row) => row.key === tier)!.name;

  const chosen: TierKey = pack && isTier(pack) ? pack : DEFAULT_TIER;
  /* A pack chosen on a price table travels with the reader, through the
     sign-in and through setup, and comes back raised here. */
  const here = pack && isTier(pack) ? `${localePath(lang, "/begin")}?pack=${pack}` : localePath(lang, "/begin");

  const user = await currentUser(lang);
  if (!user) redirect(`${localePath(lang, "/sign-in")}?redirect_url=${encodeURIComponent(here)}`);

  const [credits, profile, bought] = await Promise.all([
    balance(db, user.id),
    db.select().from(profiles).where(eq(profiles.userId, user.id)).limit(1),
    db.select({ id: purchases.id }).from(purchases).where(eq(purchases.userId, user.id)).limit(1),
  ]);

  const setUp = profile[0]?.completedAt != null;
  if (!setUp) redirect(pack && isTier(pack) ? `${localePath(lang, "/setup")}?pack=${pack}` : localePath(lang, "/setup"));

  const returning = out || bought.length > 0;
  const lede = credits > 0 ? t.lede : out ? t.outLine : t.setLine;

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <TrackView event="begin_view" props={{ pack: chosen, lang }} />
      <Header lang={lang} currentPath="/begin" />

      <main className="mx-auto max-w-5xl px-5 py-10 pb-16 sm:px-8 sm:py-16">
        {/* The tilak marks the one headline on the pay step. */}
        <div className="flex items-start gap-3">
          <Tilak className="mt-[0.15em] text-[1.6rem] sm:text-[1.9rem]" />
          <h1 className="display text-[2.1rem] leading-[1.15] sm:text-4xl">{t.title}</h1>
        </div>
        <WaterBand seed="begin" className="mt-5 h-[68px] w-full" />

        {/* The third of the three steps that began on /setup, for a first visit. */}
        {!returning && (
          <Steps steps={t.steps} here={[2]} label={t.title} className="mt-8 max-w-xl" />
        )}

        <div className="mt-6 grid gap-8 sm:grid-cols-[1fr_220px] sm:items-start sm:gap-12">
          <div>
            <p className="max-w-xl text-[1.02rem] leading-[1.75] text-ink">{lede}</p>
            <p className="mt-3 max-w-xl text-[0.98rem] leading-[1.7] text-ink2">{t.lede2}</p>
          </div>
          {/* Their own names on it, drawn from today's figure. */}
          <Specimen lang={lang} caption={false} />
        </div>

        {cancelled && (
          <p className="bg-paper2 mt-6 px-4 py-3 text-[0.98rem] text-ink">
            {t.cancelled}
          </p>
        )}

        {error && (
          <p role="status" className="bg-paper2 mt-6 px-4 py-3 text-[0.98rem] text-ink">
            {t.payError}
          </p>
        )}

        {credits > 0 && (
          <div className="bg-paper2 mt-8 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[1.02rem] text-ink">
              {credits === 1 ? t.haveOne : t.haveCredits.replace("{credits}", String(credits))}
            </p>
            <Link href={localePath(lang, setUp ? "/today" : "/setup")} className="shrink-0">
              <CTA className="w-full sm:w-auto">{t.toToday}</CTA>
            </Link>
          </div>
        )}

        {/* ---------------- eleven, the one to take ---------------- */}
        <section className="misregister bg-paper2 mt-10 p-5 sm:p-7 lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10">
          <div>
            <p className="label text-sindoor">{t.usual}</p>
            <h2 className="display mt-2 text-[2rem] leading-none sm:text-[2.4rem]">{name("eleven")}</h2>
            <p className="display mt-5 text-[3.4rem] leading-none text-ink sm:text-[4rem]">
              <Price prices={PRICE.eleven} />
            </p>
            <p className="mt-2 text-sm text-ink2">
              <Price prices={PER_SNAN.eleven} /> {t.perLabel}
            </p>
            <p className="mt-4 max-w-md text-[0.98rem] leading-[1.7] text-ink2">{t.blurb.eleven}</p>
          </div>
          <PayButton lang={lang} tier="eleven" t={t} solid className="mt-6 lg:mt-0 lg:w-64" />
        </section>

        {/* ---------------- one and sixty, as two quieter blocks ---------------- */}
        <ul className="mt-8 space-y-3">
          {(["one", "sixty"] as const).map((tier) => (
            <li
              key={tier}
              className="tint grid gap-4 p-5 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-8"
            >
              <div>
                <h2 className="display text-[1.4rem] leading-tight">{name(tier)}</h2>
                <p className="mt-1 text-sm text-ink2">{t.blurb[tier]}</p>
              </div>
              <div className="sm:text-right">
                <p className="display text-[1.8rem] leading-none">
                  <Price prices={PRICE[tier]} />
                </p>
                <p className="mt-1 text-sm text-ink2">
                  <Price prices={PER_SNAN[tier]} /> {t.perLabel}
                </p>
              </div>
              <PayButton lang={lang} tier={tier} t={t} solid={false} className="sm:w-44" />
            </li>
          ))}
        </ul>

        <p className="mt-8 max-w-xl text-sm leading-relaxed text-ink2">
          {t.note} <TaxNote lang={lang} /> {t.refund}
        </p>
      </main>

      <Footer lang={lang} />
    </>
  );
}

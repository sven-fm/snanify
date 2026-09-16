import Link from "next/link";
import { cookies } from "next/headers";
import { WaterBand } from "@/components/WaterBand";
import { eq } from "drizzle-orm";
import { db, profiles } from "@/db";
import { beginContent } from "@/content/begin";
import { content } from "@/lib/content";
import { PER_SNAN, PRICE, type TierKey } from "@/content/prices";
import { balance } from "@/lib/credits";
import { currentUser } from "@/lib/auth";
import { DEFAULT_TIER, isTier } from "@/lib/packs";
import { localePath, type FullLang as Lang } from "@/lib/locales";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CTA, Price } from "@/components/ui";
import { checkoutFor, startCheckout } from "@/app/[lang]/(app)/begin/actions";
import { TrackView } from "@/components/site/TrackView";
import { TrackedSubmit } from "@/components/site/TrackedSubmit";

/* ---------------------------------------------------------------------------
   /begin, where the site finally takes money.

   Every "Begin" on the site lands here. It is read by somebody who has already
   decided, so there is no second pitch, no free-tier comparison and no essay
   about the price. Eleven first and large, because it is the pack most people
   take and the one the whole site prices from; one and sixty as two ruled
   rows beneath it.

   THE BUTTONS ARE FORMS, NOT LINKS. Creating a Checkout Session is a write: it
   must be a POST, it must be able to sign the person in first, and it must
   read the currency on the server. A link with a tier in the query string
   would let a crawler open sessions.

   ONE PRESS OF PAY, EVEN WITH A SIGN-IN IN BETWEEN. A stranger who presses
   Pay is sent to sign in and comes back to `/begin?pack=eleven&go=1`. With a
   signed-in reader, a pack in the query and the intent cookie the Pay press
   left behind, this page opens the Checkout Session itself and redirects,
   so nobody presses the same button twice. The cookie is short-lived and
   cleared on use, so a bookmark of that URL opens nothing.

   A SIGNED-IN PERSON WITH MORNINGS IN HAND is told so, and offered the way to
   sit rather than the way to buy again.
   --------------------------------------------------------------------------- */

const INTENT_COOKIE = "snf-intent";

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
  go,
  cancelled,
}: {
  lang: Lang;
  pack?: string;
  go?: boolean;
  cancelled?: boolean;
}) {
  const t = beginContent[lang];
  const tiers = content[lang].pricing.tiers;
  const name = (tier: TierKey) => tiers.find((row) => row.key === tier)!.name;

  const user = await currentUser(lang);
  const chosen: TierKey = pack && isTier(pack) ? pack : DEFAULT_TIER;

  /* The continuation after a sign-in: see the note at the head of the file. */
  if (go && user) {
    const jar = await cookies();
    if (jar.get(INTENT_COOKIE)?.value === chosen) {
      jar.delete(INTENT_COOKIE);
      await checkoutFor(lang, chosen, `/begin?pack=${chosen}`);
    }
  }

  const [credits, profile] = user
    ? await Promise.all([
        balance(db, user.id),
        db.select().from(profiles).where(eq(profiles.userId, user.id)).limit(1),
      ])
    : [0, []];

  const setUp = profile[0]?.completedAt != null;

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <TrackView event="begin_view" props={{ pack: chosen, lang }} />
      <Header lang={lang} currentPath="/begin" />

      <main className="mx-auto max-w-5xl px-5 py-10 pb-16 sm:px-8 sm:py-16">
        <h1 className="display text-[2.1rem] leading-[1.15] sm:text-4xl">{t.title}</h1>
        <div className="rule-double mt-6 max-w-xl" />
        <WaterBand seed="begin" className="mt-5 h-[68px] w-full" />
        <p className="mt-5 max-w-xl text-[1.02rem] leading-[1.75] text-ink2">{t.lede}</p>

        {cancelled && (
          <p className="mt-6 border-l-2 border-spot pl-4 text-[0.98rem] text-ink2">
            {t.cancelled}
          </p>
        )}

        {credits > 0 && (
          <div className="mt-8 flex flex-col gap-4 border-2 border-rulestrong p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[1.02rem] text-ink">
              {credits === 1 ? t.haveOne : t.haveCredits.replace("{credits}", String(credits))}
            </p>
            <Link href={localePath(lang, setUp ? "/today" : "/setup")} className="shrink-0">
              <CTA className="w-full sm:w-auto">{t.toToday}</CTA>
            </Link>
          </div>
        )}

        {/* ---------------- eleven, the one to take ---------------- */}
        <section className="misregister mt-10 border-2 border-rulestrong bg-paper p-5 sm:p-7 lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10">
          <div>
            <p className="label text-spot">{t.usual}</p>
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

        {/* ---------------- one and sixty, as ruled rows ---------------- */}
        <ul className="mt-8 border-t-2 border-rulestrong">
          {(["one", "sixty"] as const).map((tier) => (
            <li
              key={tier}
              className="grid gap-4 border-b border-rule py-5 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-8"
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

        <p className="mt-8 max-w-xl text-sm leading-relaxed text-ink2">{t.note}</p>
      </main>

      <Footer lang={lang} />
    </>
  );
}

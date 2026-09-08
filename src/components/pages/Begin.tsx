import Link from "next/link";
import { eq } from "drizzle-orm";
import { db, profiles } from "@/db";
import { beginContent } from "@/content/begin";
import { content } from "@/lib/content";
import { PER_SNAN, PRICE, type TierKey } from "@/content/prices";
import { balance } from "@/lib/credits";
import { currentUser } from "@/lib/auth";
import { DEFAULT_TIER, PACKS } from "@/lib/packs";
import { localePath, type FullLang as Lang } from "@/lib/locales";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CTA, Eyebrow, Price } from "@/components/ui";
import { startCheckout } from "@/app/[lang]/begin/actions";
import { TrackView } from "@/components/site/TrackView";
import { TrackedSubmit } from "@/components/site/TrackedSubmit";

/* ---------------------------------------------------------------------------
   /begin, where the site finally takes money.

   Every "Begin" on the site lands here. It is read by somebody who has already
   decided, so there is no second pitch, no free-tier comparison and no essay
   about the price. Three packs, the eleven marked, and a button on each.

   THE BUTTONS ARE FORMS, NOT LINKS. Creating a Checkout Session is a write: it
   must be a POST, it must be able to sign the person in first, and it must
   read the currency on the server. A link with a tier in the query string
   would let a crawler open sessions.

   A SIGNED-IN PERSON WITH MORNINGS IN HAND is told so, and offered the way to
   sit rather than the way to buy again.
   --------------------------------------------------------------------------- */

function TierCard({
  lang,
  tier,
  flagged,
  t,
  labels,
}: {
  lang: Lang;
  tier: TierKey;
  flagged: boolean;
  t: (typeof beginContent)["en"];
  labels: { name: string; alt: string; sub: string; body: string; flag: string };
}) {
  const pack = PACKS.find((p) => p.tier === tier)!;

  return (
    <form action={startCheckout.bind(null, lang)} className="flex">
      <input type="hidden" name="tier" value={tier} />

      <div
        className={`flex w-full flex-col border-2 p-5 sm:p-6 ${
          flagged ? "border-spot" : "border-rulestrong"
        }`}
      >
        {flagged && <p className="label mb-3 text-spot">{labels.flag}</p>}

        <p className="display text-[1.6rem] leading-none text-ink">{labels.name}</p>
        <p className="label mt-2 text-ink2">{labels.sub}</p>

        <p className="display mt-5 text-[2.6rem] leading-none text-ink">
          <Price prices={PRICE[tier]} />
        </p>
        <p className="mt-2 text-sm text-ink2">
          <Price prices={PER_SNAN[tier]} /> · {t.perLabel}
        </p>

        <p className="mt-5 flex-1 text-[0.98rem] leading-[1.7] text-ink2">{labels.body}</p>

        <dl className="mt-5 border-t border-rule pt-3 text-sm">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="label text-ink2">{t.countLabel}</dt>
            <dd className="text-ink tabular-nums">{pack.credits}</dd>
          </div>
        </dl>

        <TrackedSubmit
          className="mt-5 w-full !py-4"
          variant={flagged ? "solid" : "ghost"}
          event="checkout_start"
          props={{ pack: tier, lang }}
        >
          {t.cta}
        </TrackedSubmit>
      </div>
    </form>
  );
}

export async function Begin({
  lang,
  pack,
  cancelled,
}: {
  lang: Lang;
  pack?: string;
  cancelled?: boolean;
}) {
  const t = beginContent[lang];
  const tiers = content[lang].pricing.tiers;

  const user = await currentUser(lang);
  const [credits, profile] = user
    ? await Promise.all([
        balance(db, user.id),
        db.select().from(profiles).where(eq(profiles.userId, user.id)).limit(1),
      ])
    : [0, []];

  const setUp = profile[0]?.completedAt != null;
  const chosen = pack && PACKS.some((p) => p.tier === pack) ? pack : DEFAULT_TIER;

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <TrackView event="begin_view" props={{ pack: chosen, lang }} />
      <Header lang={lang} currentPath="/begin" />

      <main className="mx-auto max-w-5xl px-5 py-10 pb-16 sm:px-8 sm:py-16">
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h1 className="display mt-4 text-[2.1rem] leading-[1.15] sm:text-4xl">{t.title}</h1>
        <div className="rule-double mt-6 max-w-xl" />
        <p className="mt-5 max-w-xl text-[1.02rem] leading-[1.75] text-ink2">{t.lede}</p>

        {cancelled && (
          <p className="mt-6 border-l-2 border-spot pl-4 text-[0.98rem] text-ink2">
            {t.cancelled}
          </p>
        )}

        {credits > 0 && (
          <div className="mt-8 flex flex-col gap-4 border-2 border-rulestrong p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[1.02rem] text-ink">
              {t.haveCredits.replace("{credits}", String(credits))}
            </p>
            <Link href={localePath(lang, setUp ? "/today" : "/setup")} className="shrink-0">
              <CTA className="w-full sm:w-auto">{t.toToday}</CTA>
            </Link>
          </div>
        )}

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {PACKS.map((p) => {
            const labels = tiers.find((row) => row.key === p.tier)!;
            return (
              <TierCard
                key={p.tier}
                lang={lang}
                tier={p.tier}
                flagged={p.tier === chosen}
                t={t}
                labels={labels}
              />
            );
          })}
        </div>

        <p className="mt-8 max-w-xl text-sm leading-relaxed text-ink2">{t.note}</p>
      </main>

      <Footer lang={lang} />
    </>
  );
}

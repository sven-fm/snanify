import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { db, profiles, purchases } from "@/db";
import { beginContent } from "@/content/begin";
import type { TierKey } from "@/content/prices";
import { alertOwner } from "@/lib/alert";
import { requireUser } from "@/lib/auth";
import { balance } from "@/lib/credits";
import { isTier } from "@/lib/packs";
import { isPaid } from "@/lib/fulfil";
import { settle } from "@/lib/settle";
import { getSession } from "@/lib/stripe";
import { LANGS, localePath, type Lang } from "@/lib/locales";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LinkButton } from "@/components/ui";
import { TrackView } from "@/components/site/TrackView";

/* ---------------------------------------------------------------------------
   Where Stripe sends somebody back to.

   THE RACE THIS PAGE EXISTS FOR. Stripe redirects the browser and delivers the
   webhook at the same time, over different connections, and the browser
   usually wins. So this page books the purchase itself: it asks Stripe for the
   session, checks it belongs to the person signed in, and hands a paid one to
   src/lib/settle.ts, the same door the webhook uses. Whichever arrives first
   books the mornings and sends the receipt; the other finds the ledger row and
   does nothing. The buyer reads their new balance on the first load.

   A BANK PAYMENT IS PAID LATER. A debit or a voucher completes the checkout
   with the money still on its way, and Stripe confirms it hours or days later
   through `async_payment_succeeded`. The page says the bank is confirming and
   looks again a few times; the webhook books it when it clears.

   THE HEADLINE CLAIMS THE MORNINGS ONLY ONCE THEY ARE BOOKED. Until then it
   says who is confirming what.

   The refresh is a meta tag rather than JavaScript, so it works before
   hydration and on a phone that has already been put back in a pocket.
   --------------------------------------------------------------------------- */

const ROUTE = "/begin/done";

/** How long to keep looking before settling on the message that waits. */
const ATTEMPTS = 6;
const EVERY_SECONDS = 2;
const BANK_EVERY_SECONDS = 5;

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: beginContent[lang].done.meta,
    robots: { index: false, follow: false },
  };
}

type State =
  | { kind: "booked"; tier: TierKey | null }
  | { kind: "confirming" }
  | { kind: "bank" };

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Lang }>;
  searchParams: Promise<{ session_id?: string; try?: string }>;
}) {
  const [{ lang }, query] = await Promise.all([params, searchParams]);
  const t = beginContent[lang].done;
  const sessionId = query.session_id;

  /* The session id rides through a sign-in, so a lapsed session still lands
     back here with its purchase. */
  const here = sessionId ? `${ROUTE}?session_id=${encodeURIComponent(sessionId)}` : ROUTE;
  const user = await requireUser(lang, here);

  if (!sessionId) redirect(localePath(lang, "/account"));

  const session = await getSession(sessionId);
  let state: State;

  if (!session) {
    /* Stripe unreachable for a moment. A booked purchase still answers. */
    const row = await db
      .select({ pack: purchases.pack })
      .from(purchases)
      .where(and(eq(purchases.stripeSessionId, sessionId), eq(purchases.userId, user.id)))
      .limit(1);
    if (!row[0]) redirect(localePath(lang, "/account"));
    state = { kind: "booked", tier: isTier(row[0].pack) ? row[0].pack : null };
  } else {
    /* A stranger pasting somebody's session id sees nothing of it. */
    const owner = session.client_reference_id ?? session.metadata?.userId ?? null;
    if (owner !== user.id) redirect(localePath(lang, "/account"));

    const pack = session.metadata?.pack;
    const tier = pack && isTier(pack) ? pack : null;

    if (isPaid(session)) {
      try {
        const result = await settle(session);
        if (result.outcome === "ignored") {
          console.warn("begin/done: ignored", session.id, result.why);
          await alertOwner(`begin/done: paid session left unbooked (${session.id})`, result.why);
        }
        state = result.outcome === "ignored" ? { kind: "confirming" } : { kind: "booked", tier };
      } catch (error) {
        /* The webhook retries for days; the page waits on it. */
        console.error("begin/done: booking failed", session.id, error);
        await alertOwner("begin/done: booking failed", error);
        state = { kind: "confirming" };
      }
    } else if (session.status === "complete") {
      state = { kind: "bank" };
    } else {
      redirect(`${localePath(lang, "/begin")}?cancelled=1`);
    }
  }

  if (state.kind === "booked") {
    const [left, profile] = await Promise.all([
      balance(db, user.id),
      db
        .select({ completedAt: profiles.completedAt })
        .from(profiles)
        .where(eq(profiles.userId, user.id))
        .limit(1),
    ]);
    const setUp = profile[0]?.completedAt != null;

    return (
      <>
        {/* Counted where the buyer lands, once per payment: a refresh or a
            return visit to this address adds none. */}
        <TrackView event="purchase" props={{ lang }} onceKey={sessionId} />
        <div className="grain" aria-hidden="true" />
        <Header lang={lang} currentPath={ROUTE} />

        <main className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
          <h1 className="display text-[2.1rem] leading-[1.15] sm:text-4xl">{t.title}</h1>
          <p className="mt-5 text-[1.02rem] leading-[1.75] text-ink">
            {state.tier ? `${t.booked[state.tier]} ` : ""}
            {left === 1 ? t.haveNowOne : t.haveNow.replace("{n}", String(left))}
          </p>
          <div className="mt-8">
            <LinkButton href={localePath(lang, setUp ? "/today" : "/setup")}>
              {setUp ? t.toToday : t.toSetup}
            </LinkButton>
          </div>
        </main>

        <Footer lang={lang} />
      </>
    );
  }

  const bank = state.kind === "bank";
  const attempt = Number(query.try ?? "1");
  const again = Number.isFinite(attempt) && attempt < ATTEMPTS;
  const next = `${localePath(lang, ROUTE)}?session_id=${encodeURIComponent(sessionId)}&try=${attempt + 1}`;

  return (
    <>
      {again && (
        <meta httpEquiv="refresh" content={`${bank ? BANK_EVERY_SECONDS : EVERY_SECONDS};url=${next}`} />
      )}
      <div className="grain" aria-hidden="true" />
      <Header lang={lang} currentPath={ROUTE} />

      <main className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
        <h1 className="display text-[2.1rem] leading-[1.15] sm:text-4xl">
          {bank ? t.bank : t.waiting}
        </h1>
        <p className="mt-5 text-[1.02rem] leading-[1.75] text-ink2">
          {bank ? t.bankNote : again ? t.waitingNote : t.slow}
        </p>

        {!again && (
          <div className="mt-8">
            <LinkButton href={localePath(lang, "/account")}>{t.toAccount}</LinkButton>
          </div>
        )}
      </main>

      <Footer lang={lang} />
    </>
  );
}

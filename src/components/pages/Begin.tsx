import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, profiles, purchases } from "@/db";
import { balance } from "@/lib/credits";
import { currentUser } from "@/lib/auth";
import { DEFAULT_TIER, isTier } from "@/lib/packs";
import { localePath, type Lang } from "@/lib/locales";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TrackView } from "@/components/site/TrackView";
import { BeginView } from "@/components/pages/BeginView";

/* ---------------------------------------------------------------------------
   /begin, where the site finally takes money.

   Every "Begin" on the site lands here. It is read by somebody who has already
   decided: one offer, eleven first and on the label, because it is the pack
   the whole site prices from. This file reads; BeginView draws (spec 6.3).

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
  const chosen = pack && isTier(pack) ? pack : DEFAULT_TIER;
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

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <TrackView event="begin_view" props={{ pack: chosen, lang }} />
      <Header lang={lang} currentPath="/begin" />
      <BeginView
        lang={lang}
        credits={credits}
        returning={returning}
        out={out}
        cancelled={cancelled}
        error={error}
      />
      <Footer lang={lang} />
    </>
  );
}

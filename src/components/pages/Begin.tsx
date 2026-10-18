import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, profiles, purchases } from "@/db";
import { balance } from "@/lib/credits";
import { currentUser } from "@/lib/auth";
import { isTier } from "@/lib/packs";
import { getGhat } from "@/content/rivers";
import { beginRoute } from "@/lib/begin-path";
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

   WHO SEES WHAT is decided in src/lib/begin-path.ts. Somebody with mornings
   in hand goes to /account, where the press is today's sitting. A first
   purchase is made beside the specimen. Everyone else here to buy (the menu's
   `buy=1`, a returning buyer at zero, `out=1`) sees the three packs alone.
   --------------------------------------------------------------------------- */

export async function Begin({
  lang,
  pack,
  buy,
  cancelled,
  error,
  out,
  water,
}: {
  lang: Lang;
  pack?: string;
  /** A water chosen on /rivers, carried on to /setup for a new sheet. */
  water?: string;
  /** From the menu's "Buy mornings": the packs alone, whatever is in hand. */
  buy?: boolean;
  cancelled?: boolean;
  /** A Pay press that came back unopened. */
  error?: boolean;
  /** Sent from /today or /account with every morning kept. */
  out?: boolean;
}) {
  const picked = pack && isTier(pack) ? pack : undefined;
  const chosenWater = water && getGhat(water) ? water : undefined;
  const query = { pack, buy, out, cancelled, error };
  /* What the reader came with travels through the sign-in and comes back. */
  const params = new URLSearchParams();
  if (picked) params.set("pack", picked);
  if (buy) params.set("buy", "1");
  if (chosenWater) params.set("water", chosenWater);
  const here = `${localePath(lang, "/begin")}${params.size ? `?${params}` : ""}`;

  /* One place decides (src/lib/begin-path.ts); this only reads for it. */
  const user = await currentUser(lang);
  const [credits, profile, bought] = user
    ? await Promise.all([
        balance(db, user.id),
        db.select().from(profiles).where(eq(profiles.userId, user.id)).limit(1),
        db.select({ id: purchases.id }).from(purchases).where(eq(purchases.userId, user.id)).limit(1),
      ])
    : [0, [], []];

  const route = beginRoute(
    user
      ? { signedIn: true, setUp: profile[0]?.completedAt != null, credits, bought: bought.length > 0 }
      : { signedIn: false },
    query,
  );
  if (route.to === "sign-in") redirect(`${localePath(lang, "/sign-in")}?redirect_url=${encodeURIComponent(here)}`);
  if (route.to === "setup") {
    const onward = new URLSearchParams();
    if (picked) onward.set("pack", picked);
    if (chosenWater) onward.set("water", chosenWater);
    redirect(`${localePath(lang, "/setup")}${onward.size ? `?${onward}` : ""}`);
  }
  if (route.to === "account") redirect(localePath(lang, "/account"));

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <TrackView event="begin_view" props={{ pack: route.pack, lang }} />
      <Header lang={lang} currentPath="/begin" hideCta />
      <BeginView
        lang={lang}
        credits={credits}
        packsOnly={route.to === "packs"}
        pack={route.pack}
        out={out}
        cancelled={cancelled}
        error={error}
      />
      <Footer lang={lang} />
    </>
  );
}

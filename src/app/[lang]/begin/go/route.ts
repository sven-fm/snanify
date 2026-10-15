import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { db, profiles } from "@/db";
import { currentUser } from "@/lib/auth";
import { DEFAULT_TIER, isTier } from "@/lib/packs";
import { localePath, parseLang } from "@/lib/locales";
import { INTENT_COOKIE, checkoutTarget } from "@/app/[lang]/begin/checkout";

/* ---------------------------------------------------------------------------
   ONE PRESS OF PAY, EVEN WITH A SIGN-IN IN BETWEEN.

   A reader whose session lapsed between loading /begin and pressing Pay is
   sent to sign in, and the sign-in returns here, to `/begin/go?pack=eleven`.
   With a signed-in reader, a set-up sheet and the intent cookie the Pay press
   left behind, this opens the Checkout Session and sends them straight on to
   Stripe, so nobody presses the same button twice.

   A ROUTE HANDLER, BECAUSE THE COOKIE IS SPENT ON USE. Next lets a page read
   cookies and forbids it to write them, and this continuation lived in the
   /begin page until that rule crashed it. Here the cookie is cleared on the
   response, so a bookmark of this URL opens nothing and lands on /begin.

   It sits under /begin, so src/proxy.ts runs Clerk's middleware on the way in
   and `auth()` reads the session as it does on the page.
   --------------------------------------------------------------------------- */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ lang: string }> },
): Promise<Response> {
  const lang = parseLang((await params).lang) ?? "en";
  const url = new URL(request.url);
  const asked = url.searchParams.get("pack") ?? "";
  const tier = isTier(asked) ? asked : DEFAULT_TIER;

  const intent = (await cookies()).get(INTENT_COOKIE)?.value;

  const go = (target: string) => {
    const res = NextResponse.redirect(new URL(target, request.url), 303);
    res.cookies.delete(INTENT_COOKIE);
    return res;
  };

  const user = await currentUser(lang);
  /* Still signed out: back to the sign-in, with the cookie kept for the return. */
  if (!user) {
    const back = encodeURIComponent(localePath(lang, `/begin/go?pack=${tier}`));
    return NextResponse.redirect(new URL(`${localePath(lang, "/sign-in")}?redirect_url=${back}`, request.url), 303);
  }
  if (intent !== tier) return go(`${localePath(lang, "/begin")}?pack=${tier}`);

  const profile = await db
    .select({ completedAt: profiles.completedAt })
    .from(profiles)
    .where(eq(profiles.userId, user.id))
    .limit(1);
  if (!profile[0]?.completedAt) return go(localePath(lang, "/setup"));

  return go(await checkoutTarget(lang, user, tier));
}

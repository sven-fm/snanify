"use server";

import { checkBotId } from "botid/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { currentUser, requireUser } from "@/lib/auth";
import { isTier } from "@/lib/packs";
import { localePath, type Lang } from "@/lib/locales";
import { INTENT_COOKIE, checkoutTarget, origin, payErrorPath } from "@/app/[lang]/begin/checkout";

/* ---------------------------------------------------------------------------
   Buying a pack.

   The tier arrives from a form, so it is a string from the open internet and
   is checked against the three that exist before it reaches Stripe. The
   session itself is opened in ./checkout.ts, which also holds the rules on
   currency and return address.

   EVERY PRESS ENDS ON A PAGE. A refusal from BotID or a session Stripe would
   not open sends the reader back to /begin with `error=pay`, where a short
   line beside the buttons asks for one more press. The framework's own error
   page is for bugs, and a buyer should never meet it.

   REDIRECT IS THROWN, NOT RETURNED. `redirect()` works by throwing, so every
   call here sits outside any try; otherwise the framework's own control flow
   is caught and reported as a failed payment.
   --------------------------------------------------------------------------- */

export async function startCheckout(lang: Lang, formData: FormData): Promise<void> {
  const tier = String(formData.get("tier") ?? "");
  if (!isTier(tier)) redirect(localePath(lang, "/begin"));

  /* A script pressing Pay gets nothing; see src/instrumentation-client.ts. A
     person BotID misjudges gets the line asking for another press. */
  let refused = false;
  try {
    refused = (await checkBotId()).isBot;
  } catch (error) {
    console.error("pay: BotID check failed", error);
  }
  if (refused) {
    console.warn("pay: refused by BotID", tier);
    redirect(payErrorPath(lang, tier));
  }

  /* Signed out between loading the page and pressing Pay: the press is kept
     in a short-lived cookie, and the sign-in returns to /begin/go, which
     opens the session without a second press. See go/route.ts. */
  if (!(await currentUser(lang))) {
    const jar = await cookies();
    jar.set(INTENT_COOKIE, tier, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      /* Secure follows the scheme, not the build: a production build served
         over plain http on a laptop would otherwise drop the cookie silently
         and the continuation could never be tested. */
      secure: (await origin()).startsWith("https"),
      maxAge: 60 * 15,
    });
  }
  const user = await requireUser(lang, `/begin/go?pack=${tier}`);

  redirect(await checkoutTarget(lang, user, tier));
}

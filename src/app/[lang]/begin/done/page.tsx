import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { db, profiles, purchases } from "@/db";
import { beginContent } from "@/content/begin";
import { requireUser } from "@/lib/auth";
import { getSession } from "@/lib/stripe";
import { FULL_LANGS, localePath, type FullLang as Lang } from "@/lib/locales";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Eyebrow, LinkButton } from "@/components/ui";

/* ---------------------------------------------------------------------------
   Where Stripe sends somebody back to.

   THE RACE THIS PAGE EXISTS FOR. Stripe redirects the browser and delivers the
   webhook at the same time, over different connections. The browser usually
   wins. So this page must not assume the credits are booked, and it must never
   book them itself: two writers of the same money is how somebody ends up with
   twenty-two mornings.

   Instead it reads. If the purchase row is there, the webhook has landed and
   the reader goes straight on to set up or to sit. If it is not, the page says
   Stripe is confirming and refreshes itself a few times. If it still is not,
   it says the receipt will arrive by email, which is true: the webhook retries
   for days and the credits land whether or not this tab is still open.

   The refresh is a meta tag rather than JavaScript, so it works before
   hydration and on a phone that has already been put back in a pocket.
   --------------------------------------------------------------------------- */

const ROUTE = "/begin/done";

/** How long to keep refreshing before falling back to the honest message. */
const ATTEMPTS = 6;
const EVERY_SECONDS = 2;

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return FULL_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: beginContent[lang].done.title,
    robots: { index: false, follow: false },
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Lang }>;
  searchParams: Promise<{ session_id?: string; try?: string }>;
}) {
  const [{ lang }, query] = await Promise.all([params, searchParams]);
  const t = beginContent[lang].done;

  const user = await requireUser(lang, ROUTE);
  const sessionId = query.session_id;

  if (!sessionId) redirect(localePath(lang, "/account"));

  const booked = await db
    .select({ id: purchases.id })
    .from(purchases)
    .where(eq(purchases.stripeSessionId, sessionId))
    .limit(1);

  if (booked[0]) {
    const profile = await db
      .select({ completedAt: profiles.completedAt })
      .from(profiles)
      .where(eq(profiles.userId, user.id))
      .limit(1);

    redirect(localePath(lang, profile[0]?.completedAt ? "/today" : "/setup"));
  }

  /* Not booked yet. Confirm with Stripe that this session is real and paid, so
     a stranger pasting a session id sees nothing, and so an abandoned checkout
     does not sit here spinning. */
  const session = await getSession(sessionId);
  const paid = session?.payment_status === "paid";

  if (!session || session.client_reference_id !== user.id) {
    redirect(localePath(lang, "/account"));
  }

  if (!paid) redirect(`${localePath(lang, "/begin")}?cancelled=1`);

  const attempt = Number(query.try ?? "1");
  const again = Number.isFinite(attempt) && attempt < ATTEMPTS;
  const next = `${localePath(lang, ROUTE)}?session_id=${encodeURIComponent(sessionId)}&try=${attempt + 1}`;

  return (
    <>
      {again && (
        <meta httpEquiv="refresh" content={`${EVERY_SECONDS};url=${next}`} />
      )}
      <div className="grain" aria-hidden="true" />
      <Header lang={lang} currentPath={ROUTE} />

      <main className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
        <Eyebrow>{beginContent[lang].eyebrow}</Eyebrow>
        <h1 className="display mt-4 text-[2.1rem] leading-[1.15] sm:text-4xl">
          {again ? t.waiting : t.title}
        </h1>
        <div className="rule-double mt-6" />
        <p className="mt-5 text-[1.02rem] leading-[1.75] text-ink2">
          {again ? t.waitingNote : t.slow}
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

import { redirect } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { SignOutButton } from "@clerk/nextjs";
import { db, profiles, purchases } from "@/db";
import { accountContent } from "@/content/account";
import { morningsContent } from "@/content/mornings";
import { patraPageContent } from "@/content/patra-page";
import { asTier, formatDay, formatMoney } from "@/lib/mornings";
import { loadRegister } from "@/lib/register";
import { sittingToday } from "@/lib/sitting";
import { patraView } from "@/lib/patra-view";
import { getGhat } from "@/content/rivers";
import { waterName } from "@/content/names";
import { balance } from "@/lib/credits";
import { accountForwardsToSetup } from "@/lib/begin-path";
import { requireUser } from "@/lib/auth";
import { localePath, SITE_ORIGIN, type Lang } from "@/lib/locales";
import { headers } from "next/headers";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { AccountView, type TodaySheet } from "@/components/pages/AccountView";

/* ---------------------------------------------------------------------------
   /account: reads the database and hands the drawing to AccountView
   (src/components/pages/AccountView.tsx), which owns the layout and the
   copy. Data loading, reminder saving and deletion are unchanged.

   Rows from before the count was kept (morningNo null) are numbered by their
   place in the whole history, oldest = 1, against a count of every sitting
   rather than the hundred loaded (src/lib/register.ts).
   --------------------------------------------------------------------------- */

function formatKept(keptOn: string, lang: Lang): string {
  const date = new Date(`${keptOn}T00:00:00Z`);
  return new Intl.DateTimeFormat(lang === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export async function Account({
  lang,
  misstyped,
  remindersOff,
}: {
  lang: Lang;
  misstyped?: boolean;
  /** Arrived from the one-tap link in a reminder. */
  remindersOff?: boolean;
}) {
  const user = await requireUser(lang, "/account");

  const [credits, kept, profile, bought] = await Promise.all([
    balance(db, user.id),
    loadRegister(db, user.id),
    db.select().from(profiles).where(eq(profiles.userId, user.id)).limit(1),
    db
      .select({
        id: purchases.id,
        pack: purchases.pack,
        credits: purchases.credits,
        currency: purchases.currency,
        amountMinor: purchases.amountMinor,
        createdAt: purchases.createdAt,
      })
      .from(purchases)
      .where(eq(purchases.userId, user.id))
      .orderBy(desc(purchases.createdAt))
      .limit(100),
  ]);

  const setUp = profile[0]?.completedAt != null;
  /* Somebody signed in with nothing here yet (no sheet, no morning, nothing
     bought) has one thing to do, and it is on /setup. The landing sends every
     signed-in visitor here (src/proxy.ts), so this is where they move on. */
  if (accountForwardsToSetup({ setUp, kept: kept.length, bought: bought.length, credits })) {
    redirect(localePath(lang, "/setup"));
  }
  const sitToday = setUp && profile[0] ? await sittingToday(user.id, profile[0].waterSlug, user.tz) : null;
  const m = morningsContent[lang];
  const locale = lang === "hi" ? "hi-IN" : "en-IN";

  let today: TodaySheet | null = null;
  if (sitToday) {
    /* The absolute origin, so a share carries a link that works from a phone
       that is not this one (localhost in development, as on /p/[id]). */
    const head = await headers();
    const host = head.get("x-forwarded-host") ?? head.get("host");
    const origin =
      host && (host.startsWith("localhost") || host.startsWith("127.")) ? `http://${host}` : SITE_ORIGIN;
    const view = patraView(sitToday, lang);
    today = {
      id: sitToday.id,
      pageUrl: `${origin}${localePath(lang, `/p/${sitToday.id}`)}`,
      imageUrl: `${origin}${localePath(lang, `/p/${sitToday.id}/image`)}`,
      waterSlug: sitToday.waterSlug,
      text: patraPageContent[lang].shareText
        .replace("{name}", view.names[0] ?? "")
        .replace("{water}", view.water)
        .replace("{date}", view.keptDate),
    };
  }

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header lang={lang} currentPath="/account" />
      <AccountView
        lang={lang}
        credits={credits}
        setUp={setUp}
        names={profile[0] ? (profile[0].names as { name: string }[]).map((n) => n.name) : []}
        rows={kept.map((s) => {
          const ghat = getGhat(s.waterSlug);
          return {
            id: s.id,
            day: formatKept(s.keptOn, lang),
            water: ghat ? waterName(ghat, "river", lang) : s.waterSlug,
            n: s.n,
          };
        })}
        purchases={bought.map((p) => {
          const tier = asTier(p.pack);
          return {
            id: p.id,
            pack: tier ? m.pack[tier] : String(p.credits),
            day: formatDay(p.createdAt, user.tz, locale),
            amount: formatMoney(p.amountMinor, p.currency, "en-IN"),
          };
        })}
        today={today}
        reminder={{ hour: user.reminderHour, on: user.reminderOn, tz: user.tz }}
        misstyped={misstyped}
        remindersOff={remindersOff}
        signOut={
          <SignOutButton redirectUrl={localePath(lang, "/")}>
            <button type="button" className="inline-flex min-h-[44px] items-center font-bold text-ink2 underline decoration-ink2 decoration-2 underline-offset-4 active:text-sindoor">
              {accountContent[lang].account.signOut}
            </button>
          </SignOutButton>
        }
      />
      <Footer lang={lang} />
    </>
  );
}

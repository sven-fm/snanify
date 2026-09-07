import { auth, currentUser as clerkUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, users, type User } from "@/db";
import { localePath, type Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   Who is asking.

   Clerk owns identity: it holds the email address, the Google connection and
   the sign-in session, and its user id is the primary key of our `users`
   table. There is no second identity to keep in step, and no password
   anywhere in this system.

   OUR ROW EXISTS SO THE PRODUCT CAN ASK QUESTIONS CLERK CANNOT ANSWER: what
   time zone this person's morning is in, which hour to write to them, which
   edition they read the site in. It is created the first time we see them,
   inside the same request, with `on conflict do nothing`, so two tabs opening
   at once cannot make two rows or raise.

   THE LOCALE AND THE ZONE ARE SET ONCE AND THEN LEFT ALONE. A person who
   signed up on the Hindi edition and later reads an English page has not
   changed language; they followed a link. /account is where those change,
   deliberately, and nothing else writes them.
   --------------------------------------------------------------------------- */

/**
 * The signed-in person's row, creating it on first sight. Null when nobody is
 * signed in.
 */
export async function currentUser(lang: Lang = "en"): Promise<User | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const existing = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (existing[0]) return existing[0];

  /* First sight. Ask Clerk for the details we keep a copy of, and write the
     row. `onConflictDoNothing` covers the second tab. */
  const profile = await clerkUser();
  const email =
    profile?.primaryEmailAddress?.emailAddress ?? profile?.emailAddresses[0]?.emailAddress;

  if (!email) {
    /* Clerk is configured for Google and email link, so every account has an
       address. If one ever does not, that is a configuration problem and it
       should be loud rather than a row with an empty email. */
    throw new Error(`clerk user ${userId} has no email address`);
  }

  await db
    .insert(users)
    .values({
      id: userId,
      email,
      displayName: profile?.fullName ?? null,
      locale: lang,
    })
    .onConflictDoNothing();

  const created = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return created[0] ?? null;
}

/**
 * The signed-in person, or a redirect to sign in and come back here.
 *
 * `next` is where to return after signing in. Pass the path the reader asked
 * for, so buying a pack and then signing in lands back on the pack rather than
 * on the home page.
 */
export async function requireUser(lang: Lang, next: string): Promise<User> {
  const user = await currentUser(lang);
  if (user) return user;

  const target = localePath(lang, "/sign-in");
  redirect(`${target}?redirect_url=${encodeURIComponent(localePath(lang, next))}`);
}

/** Whether anybody is signed in, without touching the database. The header asks this. */
export async function isSignedIn(): Promise<boolean> {
  const { userId } = await auth();
  return Boolean(userId);
}

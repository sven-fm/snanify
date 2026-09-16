import { ClerkThemed } from "@/components/ClerkThemed";
import { clerkLocalization } from "@/lib/clerk-look";
import { LANGS, type Lang } from "@/lib/locales";

/* ---------------------------------------------------------------------------
   Everything behind a sign-in, and nothing else.

   THE ROUTE GROUP EXISTS TO KEEP CLERK OFF THE MARKETING PAGES. `ClerkProvider`
   used to sit in the root shell, which meant Clerk's client bundle loaded on
   the landing page, the six waters, the calendar and the panchang: about two
   hundred kilobytes of JavaScript, on a mid-range phone, to render pages that
   have no account on them at all. Those pages are the free, crawlable surface
   and the whole point of them is that they are cheap to open.

   A route group changes no URL. `/begin` is still `/begin`. It only decides
   which layout wraps it, and this one adds the provider that the signed-in
   pages genuinely need for their client-side Clerk widgets.

   SERVER-SIDE AUTH DOES NOT NEED THIS. `auth()` and `currentUser()` read the
   session that `clerkMiddleware` in src/proxy.ts put on the request, so a
   server component anywhere can still ask who is signed in. The provider is
   only for hooks and widgets that run in the browser.
   --------------------------------------------------------------------------- */

export default async function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  /* Next types a layout's params as plain strings, since a layout sits above
     whatever validated them. Narrowed here rather than asserted. */
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const edition = (LANGS as readonly string[]).includes(lang) ? (lang as Lang) : "en";

  return (
    <ClerkThemed localization={clerkLocalization(edition)}>
      {children}
    </ClerkThemed>
  );
}

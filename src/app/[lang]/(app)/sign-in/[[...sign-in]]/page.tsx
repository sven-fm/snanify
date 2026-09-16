import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { accountContent } from "@/content/account";
import { FULL_LANGS, localePath, type FullLang as Lang } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo";
import { TrackView } from "@/components/site/TrackView";

/* The sign-in screen sits inside the site rather than on a page of its own,
   because it is the first thing somebody sees after deciding to pay and a bare
   Clerk card on a white page reads as a different company.

   ONE SCREEN FOR SIGNING IN AND SIGNING UP. `withSignUp` turns Clerk's card
   into the combined flow: an email or a Google press, and the account is
   found or made. A first-time buyer used to land on "Sign in" and have to
   notice "New here?" under the card. The page's own heading is for screen
   readers only; the card carries the visible one, so there is one heading
   and one lede rather than two of each. */
const ROUTE = "/sign-in";


export function generateStaticParams() {
  return FULL_LANGS.map((lang) => ({ lang, "sign-in": [] as string[] }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = accountContent[lang].signIn;

  return {
    ...(await pageMetadata({ lang, path: ROUTE, title: t.meta, description: t.lede })),
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  const { lang } = await params;
  const t = accountContent[lang].signIn;

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <TrackView event="sign_in_view" props={{ lang }} />
      <Header lang={lang} currentPath={ROUTE} />

      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-md">
          <h1 className="sr-only">{t.title}</h1>

          <div className="flex justify-center">
            <SignIn
              routing="path"
              path={localePath(lang, ROUTE)}
              signUpUrl={localePath(lang, "/sign-up")}
              fallbackRedirectUrl={localePath(lang, "/begin")}
              signUpFallbackRedirectUrl={localePath(lang, "/begin")}
              withSignUp
            />
          </div>

          <p className="mt-6 text-center text-sm leading-[1.7] text-ink2">{t.lede}</p>
        </div>
      </main>

      <Footer lang={lang} />
    </>
  );
}

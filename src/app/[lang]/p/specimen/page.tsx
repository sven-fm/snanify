import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PatraOwner } from "@/components/patra/PatraOwner";
import { patraPageContent } from "@/content/patra-page";
import type { PatraRecord } from "@/content/patra";
import { localePath, type Lang } from "@/lib/locales";
import { specimenView } from "@/lib/specimen";

/* ---------------------------------------------------------------------------
   /p/specimen, the owner's page on the specimen sheet, in development only.

   The owner's /p/[id] needs a sign-in and a kept morning, so a browser test
   cannot reach it. This draws the same `PatraOwner` on the specimen with the
   tallest sheet the form allows in practice (five names, the prayer, the
   seal) and a sankalp of the full 280 characters, so tests/e2e/
   patra-print.spec.ts can print it to A4 and to US Letter and count the
   pages. A production build answers 404.
   --------------------------------------------------------------------------- */

export const dynamic = "force-dynamic";

export const metadata: Metadata = { robots: { index: false, follow: false } };

const NAMES: Record<Lang, string[]> = {
  en: ["Anjali Sharma", "Vikram Sharma", "Meenakshi Raghunathan", "Lakshmi Narayanan Venkataraman", "Kamla Devi Sharma"],
  hi: ["अंजलि शर्मा", "विक्रम शर्मा", "मीनाक्षी रघुनाथन", "लक्ष्मी नारायणन वेंकटरमन", "कमला देवी शर्मा"],
};

/** At the form's limit of 280 characters, near enough. */
const SANKALP: Record<Lang, string> = {
  en: "May this water carry our thanks to the river that raised my grandmother, and may the year ahead keep our parents well, our children kind and our home open. I sit for them each morning this month, at the hour the panchang names, and I keep this promise in my own words to my family",
  hi: "यह जल मेरी दादी को पालने वाली नदी तक हमारा आभार ले जाए। आने वाला वर्ष हमारे माता पिता को स्वस्थ रखे, हमारे बच्चों को दयालु रखे और हमारे घर के द्वार खुले रखे। इस महीने हर सुबह, पंचांग की बताई घड़ी पर, मैं उनके लिए बैठता हूँ और अपने परिवार से अपने शब्दों में यह वचन निभाता हूँ।",
};

export default async function Page({ params }: { params: Promise<{ lang: Lang }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { lang } = await params;

  const view = await specimenView(lang, new Date(), NAMES[lang]);
  const printable: PatraRecord = { ...view, morning: 7, sankalp: SANKALP[lang] };
  const t = patraPageContent[lang];

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header lang={lang} currentPath="/" />
      <PatraOwner
        lang={lang}
        t={t}
        id="specimen"
        imageSrc={localePath(lang, "/specimen")}
        pageUrl={localePath(lang, "/p/specimen")}
        imageUrl={localePath(lang, "/specimen")}
        shareText={view.water}
        waterSlug={view.waterSlug}
        isPublic
        printable={printable}
        auto={false}
        next={{ credits: 3, reminderHour: "05:00", tz: "America/New_York" }}
      />
      <Footer lang={lang} />
    </>
  );
}

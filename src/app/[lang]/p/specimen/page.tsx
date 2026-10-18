import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PatraOwner } from "@/components/patra/PatraOwner";
import { patraPageContent } from "@/content/patra-page";
import type { PatraRecord } from "@/content/patra";
import { localePath, type Lang } from "@/lib/locales";
import { specimenView } from "@/lib/specimen";
import { PRAYER_BY_ID } from "@/content/prayers";
import { LIMITS } from "@/lib/limits";

/* ---------------------------------------------------------------------------
   /p/specimen, the owner's page on the specimen sheet, in development only.

   The owner's /p/[id] needs a sign-in and a kept morning, so a browser test
   cannot reach it. This draws the same `PatraOwner` on the specimen with the
   tallest sheet the form allows in practice (five names, the prayer, the
   seal) and a sankalp of the full 280 characters, so tests/e2e/
   patra-print.spec.ts can print it to A4 and to US Letter and count the
   pages. `?worst=1` draws the tallest sheet the form allows at all: five
   names of 60 characters and the longest prayer, the case the print's
   fallback column is sized for. A production build answers 404.
   --------------------------------------------------------------------------- */

export const dynamic = "force-dynamic";

export const metadata: Metadata = { robots: { index: false, follow: false } };

const NAMES: Record<Lang, string[]> = {
  en: ["Anjali Sharma", "Vikram Sharma", "Meenakshi Raghunathan", "Lakshmi Narayanan Venkataraman", "Kamla Devi Sharma"],
  hi: ["अंजलि शर्मा", "विक्रम शर्मा", "मीनाक्षी रघुनाथन", "लक्ष्मी नारायणन वेंकटरमन", "कमला देवी शर्मा"],
};

/** Five names at the form's limit of 60 characters each. */
const WORST_NAMES: Record<Lang, string[]> = {
  en: [
    "Venkataraghavan Subrahmanyam Lakshminarayanan Ramachandran Iy",
    "Meenakshisundaram Balasubramanian Gopalakrishnan Chandrasekar",
    "Annapoorna Devi Rajarajeswari Vishalakshi Kamakshi Sundaravalli",
    "Purushottamdas Harikrishnadas Govardhandas Ranchhoddas Mehta",
    "Bhagyalakshmi Thiruvenkatam Padmanabhan Ananthakrishnan Pillai",
  ],
  hi: [
    "श्री वेंकटराघवन सुब्रह्मण्यम लक्ष्मीनारायणन रामचन्द्रन अय्यर",
    "श्री मीनाक्षीसुन्दरम बालसुब्रह्मण्यम गोपालकृष्णन चन्द्रशेखरन",
    "अन्नपूर्णा देवी राजराजेश्वरी विशालाक्षी कामाक्षी सुन्दरवल्ली",
    "श्री पुरुषोत्तमदास हरिकृष्णदास गोवर्धनदास रणछोड़दास मेहता जी",
    "श्रीमती भाग्यलक्ष्मी तिरुवेंकटम पद्मनाभन अनन्तकृष्णन पिल्लै",
  ],
};

/** The prayer that sets tallest on the sheet. */
const WORST_PRAYER = "ganga-stotram";

/** At the form's limit of 280 characters. */
const SANKALP: Record<Lang, string> = {
  en: "May this water carry our thanks to the river that raised my grandmother, and may the year ahead keep our parents well, our children kind and our home open. I sit for them each morning this month, at the hour the panchang names, and I keep this promise in my own words to my family",
  hi: "यह जल मेरी दादी को पालने वाली नदी तक हमारा आभार ले जाए। आने वाला वर्ष हमारे माता पिता को स्वस्थ रखे, हमारे बच्चों को दयालु रखे और हमारे घर के द्वार खुले रखे। इस महीने हर सुबह, पंचांग की बताई घड़ी पर, मैं उनके लिए बैठता हूँ और अपने परिवार से अपने शब्दों में यह वचन निभाता हूँ। सदा।",
};

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: Lang }>;
  searchParams: Promise<{ worst?: string }>;
}) {
  if (process.env.NODE_ENV === "production") notFound();
  const [{ lang }, query] = await Promise.all([params, searchParams]);
  const worst = query.worst === "1";

  const names = (worst ? WORST_NAMES : NAMES)[lang].map((n) => n.slice(0, LIMITS.nameChars));
  const view = await specimenView(lang, new Date(), names);
  const prayer = PRAYER_BY_ID[WORST_PRAYER];
  const printable: PatraRecord = {
    ...view,
    morning: 7,
    sankalp: SANKALP[lang].slice(0, LIMITS.sankalpChars),
    ...(worst && prayer
      ? { prayer: { devanagari: [...prayer.devanagari], roman: [...prayer.roman], title: prayer.title[lang] } }
      : {}),
  };
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

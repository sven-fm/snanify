import type { WaterSlug } from "@/lib/riverdata";

/* ---------------------------------------------------------------------------
   The six pictures on /live, one landmark a reader of each water knows on
   sight, printed as ink on the paper. Each is a photograph from Wikimedia
   Commons under a licence that allows this use with credit, reduced to five
   tones of ink in public/waters/<slug>.webp (the mask, not the photograph).
   The credit line prints on the page beside the data sources, because a
   picture is a source too.
   --------------------------------------------------------------------------- */

export interface Picture {
  readonly src: string;
  readonly alt: { readonly en: string; readonly hi: string };
  readonly subject: { readonly en: string; readonly hi: string };
  readonly author: string;
  readonly license: string;
  readonly page: string;
}

export const PICTURES: Record<WaterSlug, Picture> = {
  "ganga-haridwar": {
    src: "/waters/ganga-haridwar.webp",
    alt: { en: "The clock tower and the ghats at Har Ki Pauri, Haridwar", hi: "हर की पौड़ी, हरिद्वार का घंटाघर और घाट" },
    subject: { en: "Har Ki Pauri and the clock tower, Haridwar", hi: "हर की पौड़ी और घंटाघर, हरिद्वार" },
    author: "Whispyhistory",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Har_Ki_Pauri_and_Clock_Tower_of_Haridwar.jpg",
  },
  "triveni-prayagraj": {
    src: "/waters/triveni-prayagraj.webp",
    alt: { en: "Gulls over the water at the Sangam, Prayagraj, fed from a boat", hi: "संगम, प्रयागराज पर नाव से दाना खाते गल पक्षी" },
    subject: { en: "Gulls at the Sangam, Prayagraj", hi: "संगम, प्रयागराज के गल पक्षी" },
    author: "Sanskritidubey",
    license: "CC BY 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Migratory_gulls_feeding_at_Triveni_Sangam,_Prayagraj,_India,_at_sunset.jpg",
  },
  "yamuna-mathura": {
    src: "/waters/yamuna-mathura.webp",
    alt: { en: "Vishram Ghat, Mathura, at dusk, with boats on the Yamuna", hi: "संध्या में विश्राम घाट, मथुरा, यमुना पर नावें" },
    subject: { en: "Vishram Ghat, Mathura", hi: "विश्राम घाट, मथुरा" },
    author: "Umang108",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Vishram_Ghat.jpg",
  },
  "godavari-nashik": {
    src: "/waters/godavari-nashik.webp",
    alt: { en: "Bathers at Ram Kund, Nashik, on Makar Sankranti", hi: "मकर संक्रांति पर रामकुंड, नासिक में स्नान करते लोग" },
    subject: { en: "Ram Kund, Nashik", hi: "रामकुंड, नासिक" },
    author: "Rohit R Nashik",
    license: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Makar_Sankranti_Celebration_at_Ramkund_Nashik_Maharashtra_14_Jan_2025_Rohit_R_Nashik_Photos_1.jpg",
  },
  "shipra-ujjain": {
    src: "/waters/shipra-ujjain.webp",
    alt: { en: "The temples on Ram Ghat, Ujjain, beside the Shipra", hi: "शिप्रा के किनारे रामघाट, उज्जैन के मंदिर" },
    subject: { en: "Ram Ghat, Ujjain", hi: "रामघाट, उज्जैन" },
    author: "Arian Zwegers",
    license: "CC BY 2.0",
    page: "https://commons.wikimedia.org/wiki/File:Ujjain,_Ram_Ghat_(9840921865).jpg",
  },
  "kaveri-talakaveri": {
    src: "/waters/kaveri-talakaveri.webp",
    alt: { en: "The spring tank at Talakaveri in the mist", hi: "कोहरे में तलकावेरी का स्रोत-कुंड" },
    subject: { en: "The spring tank, Talakaveri", hi: "स्रोत-कुंड, तलकावेरी" },
    author: "Abhijitsathe",
    license: "CC BY 3.0",
    page: "https://commons.wikimedia.org/wiki/File:1632_px_-_Talakaveri_India.JPG",
  },
};

import type { Sitting } from "@/db/schema";
import type { PatraView } from "@/lib/patra-view";
import type { RiverSlice, SkySlice } from "@/lib/patra-record";

/* Fixtures for the Patra image tests. Every value is fixed, so a render is the
   same on every run and nothing reaches the network: the ghat plate is read
   from public/waters and the portrait is an inline PNG. */

export const FIVE_LONG = ["Anjali Sharma", "Vikram Sharma", "Meenakshi Raghunathan", "Rohan Sharma", "कमला देवी शर्मा"];

/** A 2 by 2 grey PNG, inline, so the portrait never needs a fetch. */
export const PORTRAIT =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAAAAABX3VL4AAAADklEQVR4nGNgYGD4z8AAAAMBAQBkzNRrAAAAAElFTkSuQmCC";

const PRAYER = {
  devanagari: ["गङ्गे च यमुने चैव गोदावरि सरस्वति।", "नर्मदे सिन्धु कावेरि जलेऽस्मिन् सन्निधिं कुरु॥"],
  roman: ["Gaṅge ca Yamune caiva Godāvari Sarasvati", "Narmade Sindhu Kāveri jale'smin sannidhiṃ kuru"],
  title: "The seven rivers",
};

export const SPECIMEN_VIEW: PatraView = {
  waterSlug: "ganga-haridwar",
  id: "specimen",
  locale: "en",
  names: ["Anjali Sharma", "Vikram Sharma"],
  water: "Ganga",
  ghat: "Har Ki Pauri",
  city: "Haridwar",
  keptDate: "15 October 2026",
  keptTime: "06:12",
  keptZone: "New York",
  keptLocal: "06:12 in New York",
  keptIst: "15:42",
  state: "Running full",
  flow: "732 m³/s",
  band: "full",
  rank: "86",
  modelledFor: "2026-10-15",
  figureKind: "modelled",
  tithi: "Shukla Chaturdashi",
  nakshatra: "Revati 2",
  moon: "98%",
  prayer: PRAYER,
  portraitUrl: null,
  seed: "4d5e3569e33055ac9f1b2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f6071",
  seedShort: "4d5e3569",
  percentile: 86,
  morning: null,
  distance: "11,650 km away",
  specimen: true,
};

const RIVER: RiverSlice = {
  kind: "modelled",
  cumecs: 732.4,
  modelledFor: "2026-09-08",
  ageDays: 0,
  percentile: 86,
  band: "full",
  median: 610,
  source: "GloFAS via Open-Meteo",
  cell: [29.95, 78.15],
};

const SKY: SkySlice = {
  tithi: "Shukla Chaturdashi",
  paksha: "shukla",
  tithiIndex: 14,
  nakshatra: "Revati",
  nakshatraPada: 2,
  boundary: "",
  moonPct: 98,
  phase: "waxing",
  sunrise: null,
  sunset: null,
};

/** A sitting minted before the morning count and the image version existed. */
export const OLD_ROW: Sitting = {
  id: "oldrow0001",
  userId: "u1",
  waterSlug: "ganga-haridwar",
  keptAt: new Date("2026-09-08T10:12:00Z"),
  keptTz: "America/New_York",
  keptOn: "2026-09-08",
  locale: "en",
  river: RIVER,
  sky: SKY,
  seed: "9f1b2c3d4e5f60714d5e3569e33055ac0a1b2c3d4e5f60718293a4b5c6d7e8f9",
  names: [{ name: "Rekha Sharma" }, { name: "अनिल शर्मा" }],
  prayerId: "sapta-nadi",
  portraitKey: null,
  sankalpText: "May the house keep its health",
  imageKey: null,
  distanceKm: 11650,
  morningNo: null,
  imageVersion: null,
  isPublic: true,
  createdAt: new Date("2026-09-08T10:12:00Z"),
};

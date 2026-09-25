import type { Lang } from "@/lib/locales";
import { fitDescription } from "@/lib/seo";
import type { Ghat } from "@/content/rivers";
import { en, type RiversIndexCopy } from "./en";
import { hi } from "./hi";

export type { RiversIndexCopy };

/**
 * The waters index in every locale the site serves. See the header of ./en.ts
 * for the rules the copy is written under.
 */
export const riversIndexContent = {
  en,
  hi,
} satisfies Record<Lang, RiversIndexCopy>;

/**
 * A water's search snippet. The first words answer what a search for
 * "haridwar river name" asks; today's flow follows where there is room.
 * Written fullest first and fitted to 120 to 155 characters.
 */
export function riverDescription(lang: Lang, g: Ghat): string {
  if (lang === "hi") {
    const lead = `${g.city.hi} की नदी ${g.river.hi} है, ${g.ghat.hi} पर।`;
    const short = `${g.river.hi}, ${g.ghat.hi}, ${g.city.hi}।`;
    const flow = "आज का मॉडल-प्रवाह, 1997 से 2025 के सापेक्ष।";
    const live = "आज का प्रवाह, सजीव।";
    return fitDescription([
      `${lead} ${g.standfirst.hi} ${flow}`,
      `${lead} ${g.standfirst.hi} ${live}`,
      `${lead} ${g.standfirst.hi}`,
      `${short} ${g.standfirst.hi} ${live}`,
      `${short} ${g.standfirst.hi}`,
    ]);
  }
  const lead = `The river at ${g.city.en} is the ${g.river.en}, at ${g.ghat.en}.`;
  const short = `The ${g.river.en} at ${g.ghat.en}, ${g.city.en}.`;
  const flow = "Today's modelled flow, ranked against 1997 to 2025.";
  const live = "Today's flow, live.";
  return fitDescription([
    `${lead} ${g.standfirst.en} ${flow}`,
    `${lead} ${g.standfirst.en} ${live}`,
    `${lead} ${g.standfirst.en}`,
    `${short} ${g.standfirst.en} ${live}`,
    `${short} ${g.standfirst.en}`,
  ]);
}

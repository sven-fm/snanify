/* The copy rules, checked over every word in calendar.mjs: card and post.
   Run: node ads/social/check.mjs. Exits 1 on the first slip it reports. */
import { POSTS, caption } from "./calendar.mjs";

const RULES = [
  [/—/, "em dash"],
  [/\b(no(?!\. ?\d)|nobody|nothing|never|none|nowhere|neither|nor|not)\b|n't\b/i, "negative construction"],
  [/\bmeasured\b/i, "the figure is modelled, never measured"],
  [/\b(like|share|tag|comment)\s+(this|us|below|if)\b/i, "engagement bait"],
  [/\b(karma|sins?|blessings?|soul|moksha guaranteed|guarantee)\b/i, "promised outcome"],
  [/\b(priest|pandit|on your behalf|for you at the ghat|we perform|performed for)\b/i, "a rite claimed"],
  [/\b(Hindus abroad|NRIs?|as a Hindu|you Hindus)\b/i, "telling readers who they are"],
  [/\b(Jal Sankalp|Jal Chihna|Watermark|Jal Path|Shwas|Maun|Chihn)\b/, "retired coined name"],
  [/·/, "middle dot"],
  [/holy (dip|water)|punya(?! kaal)|as good as being there|measured at the ghat|passes the ghat|most people/i, "off limits (copy-guard)"],
  [/\b(Diya|Petals|Tilak|Kumkum|Mauli)\b/, "retired mark named on a card"],
];
const strings = (v) => (typeof v === "string" ? [v] : Array.isArray(v) ? v.flatMap(strings) : v && typeof v === "object" ? Object.values(v).flatMap(strings) : []);
let bad = 0;
for (const p of POSTS) {
  for (const s of [caption(p), ...strings(p.card)]) {
    for (const [re, why] of RULES) {
      const m = s.match(re);
      if (m) { bad++; console.log(`${p.date}: ${why}: "${s.slice(Math.max(0, m.index - 40), m.index + 40).replace(/\n/g, " ")}"`); }
    }
  }
  const sentences = p.text.split(/(?<=[.!?:।])\s+/).filter(Boolean);
  for (const s of sentences) if (s.split(/\s+/).length > 40) { bad++; console.log(`${p.date}: sentence over 40 words: "${s.slice(0, 60)}..."`); }
}
const dates = POSTS.map((p) => p.date);
if (new Set(dates).size !== dates.length || dates.length !== 30) { bad++; console.log(`dates: ${dates.length} posts, ${new Set(dates).size} distinct`); }
console.log(bad ? `${bad} slips` : `30 posts, every rule holds`);
process.exit(bad ? 1 : 0);

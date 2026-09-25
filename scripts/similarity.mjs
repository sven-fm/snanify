/* ---------------------------------------------------------------------------
   How alike the indexed city pages read. Two templated pages that share most
   of their text look like a doorway set to a search engine, so each indexed
   city needs enough of its own words to stand apart.

     npm run seo:similarity                           production
     npm run seo:similarity -- http://localhost:3000  a local server

   Takes every /panchang/<city> URL in the sitemap, reads the text of <main>
   (scripts and tags stripped), and compares each pair in the same locale by
   the Jaccard overlap of their 4-word shingles. Prints the ten most alike
   pairs and fails if any pair is above 0.5.
   --------------------------------------------------------------------------- */

const ORIGIN = "https://www.snanify.com";
const BASE = process.argv[2] ?? ORIGIN;
const LIMIT = 0.5;
const CONCURRENCY = 8;

const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1].trim())
  .filter((u) => /\/panchang\/(?!shraddha$)[a-z0-9-]+$/.test(new URL(u).pathname))
  .map((u) => u.replace(ORIGIN, BASE));

function text(html) {
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? html;
  return main
    .replace(/<(script|style)[\s\S]*?<\/\1>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .toLowerCase()
    .split(/[^\p{L}\p{M}\p{N}]+/u)
    .filter(Boolean);
}

function shingles(words) {
  const set = new Set();
  for (let i = 0; i + 4 <= words.length; i++) set.add(words.slice(i, i + 4).join(" "));
  return set;
}

const pages = [];
let next = 0;
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (next < urls.length) {
      const url = urls[next++];
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${url}: ${res.status}`);
      pages.push({ url, locale: new URL(url).pathname.startsWith("/hi/") ? "hi" : "en", set: shingles(text(await res.text())) });
    }
  }),
);

const pairs = [];
for (let i = 0; i < pages.length; i++) {
  for (let j = i + 1; j < pages.length; j++) {
    const [a, b] = [pages[i], pages[j]];
    if (a.locale !== b.locale) continue;
    let shared = 0;
    for (const s of a.set) if (b.set.has(s)) shared++;
    pairs.push({ a: a.url, b: b.url, score: shared / (a.set.size + b.set.size - shared) });
  }
}
pairs.sort((x, y) => y.score - x.score);

const path = (u) => new URL(u).pathname;
console.log(`${pages.length} city pages, ${pairs.length} pairs; the ten most alike:`);
for (const p of pairs.slice(0, 10)) console.log(`  ${p.score.toFixed(3)}  ${path(p.a)}  ${path(p.b)}`);
const over = pairs.filter((p) => p.score > LIMIT);
if (over.length) {
  console.log(`\n${over.length} pairs above ${LIMIT}`);
  process.exitCode = 1;
} else {
  console.log(`\nevery pair at or below ${LIMIT}`);
}

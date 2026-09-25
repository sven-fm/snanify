/* ---------------------------------------------------------------------------
   Read production the way a crawler does and fail on anything that breaks
   the index contract in src/lib/indexable.ts.

     npm run seo:check

   · the sitemap holds 70 to 90 routes per locale
   · every sitemap URL answers 200, carries no noindex, has itself as
     canonical, and every hreflang target it names is in the sitemap
   · 20 sampled pages outside the sitemap answer 200 and carry noindex
   · the apex redirects to www in one hop and keeps the path

   Titles over 60 characters and descriptions outside 120 to 155 are listed
   as warnings; they do not fail the run.
   --------------------------------------------------------------------------- */

const ORIGIN = "https://www.snanify.com";
const APEX = "https://snanify.com";
const PER_LOCALE = [70, 90];
const SAMPLE = 20;
const CONCURRENCY = 8;

const failures = [];
const warnings = [];
const fail = (what) => failures.push(what);

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

function head(html) {
  const tag = (re) => html.match(re)?.[1];
  return {
    robots: tag(/<meta name="robots" content="([^"]*)"/) ?? "",
    canonical: tag(/<link rel="canonical" href="([^"]*)"/),
    title: decode(tag(/<title>([^<]*)<\/title>/) ?? ""),
    description: decode(tag(/<meta name="description" content="([^"]*)"/) ?? ""),
    hreflang: [...html.matchAll(/<link rel="alternate" hrefLang="[^"]+" href="([^"]*)"/g)].map((m) => m[1]),
  };
}

async function get(url) {
  const res = await fetch(url, { redirect: "manual", headers: { "user-agent": "snanify-seo-check" } });
  return { status: res.status, html: res.status === 200 ? await res.text() : "" };
}

async function pool(items, fn) {
  const out = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (i < items.length) {
        const n = i++;
        out[n] = await fn(items[n]);
      }
    }),
  );
  return out;
}

/* The sitemap */
const xml = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
const sitemap = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
const inSitemap = new Set(sitemap);
const hindi = sitemap.filter((u) => new URL(u).pathname.startsWith("/hi")).length;
const english = sitemap.length - hindi;
for (const [label, n] of [["en", english], ["hi", hindi]]) {
  if (n < PER_LOCALE[0] || n > PER_LOCALE[1]) fail(`sitemap: ${n} ${label} URLs, expected ${PER_LOCALE.join(" to ")}`);
}

/* Every sitemap URL */
const rows = await pool(sitemap, async (url) => {
  const { status, html } = await get(url);
  const h = head(html);
  const problems = [];
  if (status !== 200) problems.push(`status ${status}`);
  if (/noindex/i.test(h.robots)) problems.push(`robots "${h.robots}"`);
  if (h.canonical !== url) problems.push(`canonical ${h.canonical ?? "missing"}`);
  const stray = h.hreflang.filter((u) => !inSitemap.has(u));
  if (stray.length) problems.push(`hreflang outside the sitemap: ${stray.join(" ")}`);
  if (h.title.length > 60) warnings.push(`title ${h.title.length}: ${url}  "${h.title}"`);
  if (h.description.length < 120 || h.description.length > 155) {
    warnings.push(`description ${h.description.length}: ${url}`);
  }
  for (const p of problems) fail(`${url}: ${p}`);
  return { url, ok: !problems.length };
});

/* Pages outside the index, found the way a crawler finds them */
const linked = new Set(["/privacy", "/terms"]);
for (const page of ["/panchang", "/muhurat"]) {
  const { html } = await get(`${ORIGIN}${page}`);
  for (const m of html.matchAll(/href="(\/(?:panchang|muhurat)\/[a-z0-9-]+)"/g)) linked.add(m[1]);
}
const outside = [...linked]
  .flatMap((p) => [`${ORIGIN}${p}`, `${ORIGIN}/hi${p}`])
  .filter((u) => !inSitemap.has(u))
  .sort(() => Math.random() - 0.5)
  .slice(0, SAMPLE);
if (outside.length < SAMPLE) fail(`found only ${outside.length} pages outside the sitemap to sample`);
await pool(outside, async (url) => {
  const { status, html } = await get(url);
  const { robots } = head(html);
  if (status !== 200) fail(`${url} (outside): status ${status}`);
  if (!/noindex/i.test(robots)) fail(`${url} (outside): robots "${robots}", expected noindex`);
});

/* The apex */
for (const path of ["/rivers", "/hi/muhurat/amavasya"]) {
  const res = await fetch(`${APEX}${path}`, { redirect: "manual" });
  const to = res.headers.get("location");
  if (![301, 308].includes(res.status) || to !== `${ORIGIN}${path}`) {
    fail(`apex ${path}: ${res.status} to ${to}, expected 301 or 308 to ${ORIGIN}${path}`);
  } else {
    const next = await fetch(to, { redirect: "manual" });
    if (next.status !== 200) fail(`apex ${path}: second hop answered ${next.status}`);
  }
}

console.log(`sitemap     ${sitemap.length} URLs (${english} en, ${hindi} hi)`);
console.log(`indexed     ${rows.filter((r) => r.ok).length}/${rows.length} clean`);
console.log(`outside     ${outside.length} sampled`);
if (warnings.length) console.log(`\nwarnings (${warnings.length})\n  ${warnings.join("\n  ")}`);
if (failures.length) {
  console.log(`\nFAILED (${failures.length})\n  ${failures.join("\n  ")}`);
  process.exitCode = 1;
} else {
  console.log("\nall checks pass");
}

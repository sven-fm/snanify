/* ---------------------------------------------------------------------------
   Tell the IndexNow engines (Bing, Yandex, Naver, Seznam, Yep) which pages
   changed. Run by hand after a deploy that changed what a page says.

     npm run indexnow -- /live /rivers/ganga      these routes, both locales
     npm run indexnow -- --since <git-ref>        the pages whose content changed
     npm run indexnow -- --dry-run ...            print the list, send nothing

   Only pages in the live sitemap go out, and the sitemap is built from
   src/lib/indexable.ts, so a noindex page is never submitted. A run sends at
   most 100 URLs in one POST. Bing's rule is to submit a URL when its content
   changed: a new sunrise or tithi on a city page is the page working, and
   nothing here fires on a schedule or on every deploy. Repeating unchanged
   URLs is what Bing reads as noise.

   `--since` maps the files changed since <ref> to the routes they feed:
   copy in src/content, the page components in src/components/pages and the
   route files in src/app/[lang]. A route is both locales of it. A change to
   shared code (the header, the type layer) maps to nothing; name the routes
   by hand if one of those is worth a recrawl.

   One key, verified by the file at public/<key>.txt. The reply is a status
   with an empty body: 200 or 202 means accepted, 403 is a key mismatch, 422
   a URL outside the host, 429 too many requests (retried).
   --------------------------------------------------------------------------- */

import { execFileSync } from "node:child_process";

const ORIGIN = "https://www.snanify.com";
const HOST = new URL(ORIGIN).host;
const KEY = "8b6cc2fb2f124d6a8955bba929f94f10";
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const CAP = 100;

/* File → routes. A trailing `*` is every sitemap route under that prefix. */
const ROUTES_BY_FILE = [
  [/^src\/content\/landing\/|^src\/app\/\[lang\]\/page\.tsx$/, ["/"]],
  [/^src\/content\/rivers\.ts$/, ["/rivers", "/rivers/*", "/live"]],
  [/^src\/content\/rivers-index\/|^src\/components\/pages\/RiversIndex|^src\/app\/\[lang\]\/rivers\/page/, ["/rivers"]],
  [/^src\/components\/pages\/RiverDetail|^src\/app\/\[lang\]\/rivers\/\[river\]/, ["/rivers/*"]],
  [/^src\/content\/snan\.ts$|^src\/components\/pages\/SnanIntro|^src\/app\/\[lang\]\/snan\//, ["/snan"]],
  [/^src\/content\/live\/|^src\/components\/pages\/LiveRivers|^src\/app\/\[lang\]\/live\//, ["/live"]],
  [/^src\/content\/panchang\.ts$/, ["/panchang", "/panchang/shraddha"]],
  [/^src\/components\/pages\/(Panchang|CityFinder)|^src\/app\/\[lang\]\/panchang\/page/, ["/panchang"]],
  [/^src\/components\/pages\/Shraddha|^src\/app\/\[lang\]\/panchang\/shraddha\//, ["/panchang/shraddha"]],
  [/^src\/content\/(cities|panchang-city)\.ts$|^src\/components\/pages\/CityPanchang|^src\/app\/\[lang\]\/panchang\/\[city\]/, ["/panchang/*"]],
  [/^src\/content\/muhurat-index\/|^src\/components\/pages\/MuhuratIndex|^src\/app\/\[lang\]\/muhurat\/page/, ["/muhurat"]],
  [/^src\/content\/(muhurat\.ts|data\/muhurat\.json|names\.ts)$|^src\/components\/pages\/MuhuratDetail|^src\/app\/\[lang\]\/muhurat\/\[occasion\]/, ["/muhurat", "/muhurat/*"]],
  [/^src\/content\/kumbh\.ts$|^src\/components\/pages\/Kumbh|^src\/app\/\[lang\]\/kumbh\//, ["/kumbh"]],
  [/^src\/content\/trust\.ts$|^src\/components\/pages\/Faq|^src\/app\/\[lang\]\/faq\//, ["/faq"]],
];

async function sitemapUrls() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

/** "/hi/rivers/ganga" and "/rivers/ganga" both → "/rivers/ganga". */
const routeOf = (url) => new URL(url).pathname.replace(/^\/hi(?=\/|$)/, "") || "/";

const matches = (pattern, route) =>
  pattern.endsWith("/*") ? route.startsWith(pattern.slice(0, -1)) : route === pattern;

function routesSince(ref) {
  const files = execFileSync("git", ["diff", "--name-only", ref, "--"], { encoding: "utf8" })
    .split("\n")
    .filter(Boolean);
  const routes = new Set();
  for (const file of files) {
    for (const [re, rs] of ROUTES_BY_FILE) if (re.test(file)) rs.forEach((r) => routes.add(r));
  }
  console.log(`${files.length} files changed since ${ref}; routes: ${[...routes].join(" ") || "none"}`);
  return [...routes];
}

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const rest = args.filter((a) => a !== "--dry-run");
const sinceAt = rest.indexOf("--since");
const patterns = sinceAt >= 0 ? routesSince(rest[sinceAt + 1] ?? "HEAD~1") : rest.map((p) => new URL(p, ORIGIN).pathname);

if (!patterns.length) {
  console.error("usage: npm run indexnow -- [--dry-run] (--since <git-ref> | <path>...)");
  process.exit(sinceAt >= 0 ? 0 : 1);
}

const inSitemap = await sitemapUrls();
const wanted = inSitemap.filter((u) => patterns.some((p) => matches(p, routeOf(u))));
const outside = patterns.filter((p) => !p.endsWith("/*") && !inSitemap.some((u) => routeOf(u) === p));
if (outside.length) console.log(`left out, not in the sitemap (noindex): ${outside.join(" ")}`);

if (!wanted.length) {
  console.log("nothing to submit");
  process.exit(0);
}
const urlList = wanted.slice(0, CAP);
if (wanted.length > CAP) console.log(`capped at ${CAP}; ${wanted.length - CAP} URLs left for a later run`);

if (dryRun) {
  console.log(urlList.join("\n"));
  console.log(`dry run: ${urlList.length} URLs, nothing sent`);
  process.exit(0);
}

async function verifyKeyFile() {
  const res = await fetch(KEY_LOCATION);
  const body = res.ok ? (await res.text()).trim() : "";
  if (body !== KEY) {
    throw new Error(`${KEY_LOCATION} answered ${res.status} with "${body.slice(0, 40)}", expected the key`);
  }
}

await verifyKeyFile();

const RETRY_AFTER_MS = 60_000;
const ATTEMPTS = 3;

for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });
  const text = (await res.text()).trim();
  console.log(`submitted ${urlList.length} URLs: ${res.status}${text ? ` ${text}` : ""}`);
  if (res.status !== 429 || attempt === ATTEMPTS) {
    if (res.status >= 400) process.exitCode = 1;
    break;
  }
  console.log(`retrying in ${RETRY_AFTER_MS / 1000}s (${attempt}/${ATTEMPTS})`);
  await new Promise((r) => setTimeout(r, RETRY_AFTER_MS));
}

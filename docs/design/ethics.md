# Snanify — Authenticity, Ethics & Trust Architecture

> Facet: **Authenticity, ethics & trust architecture**  
> Adversarial review verdict: **needs-work**

## Summary

Snanify's defensibility is not that a digital snan "works" — it is that Snanify never claims it works, and can prove everything it does claim. The architecture rests on four load-bearing structures: (1) a published theological position that separates acts from effects, with a public, binding list of claims Snanify will never make; (2) a cryptographic proof-of-performance chain — a pre-rite sankalp commitment hash, an on-camera slate carrying an unforgeable daily public anchor, one unedited continuous take, and a public append-only Rite Ledger that contains zero personal data and can be verified by a stranger in their own browser; (3) an officiant model with published pay formulas, itemised "what we verified / what we did not" credentials, and the right to refuse a sankalp without penalty; (4) a data posture that treats gotra, ancestor names and sankalp text as the religious-belief data it legally and morally is — 90-day default deletion, silent-by-default recitation, two-person break-glass access with user notification, and crypto-shredding so permanent proof coexists with real erasure. Anti-patterns are banned in CI, not in a values deck: a copy-lint blocklist fails the build on grief, guilt, fear, and fake scarcity language. Urgent finding: the currently live landing page carries three fabricated trust signals ("1,20,000+ Sankalps offered", "48 Countries served", a hardcoded "Live now" badge and a hardcoded 04:24 IST muhurat) that must be removed before this architecture means anything.

## Decisions

**Snanify's public position is "we describe acts, we do not describe effects" — it sells ritual sponsorship and proof, never punya, moksha, or outcomes.**

*Why:* It is the only position that is both honest and unattackable. Any efficacy claim invites the scam framing and is theologically contested even inside Hinduism; a claim strictly about what physically happened is verifiable and cannot be falsified.

**Ground the offering in the yajamana/purohit distinction, the desha-kala-gotra grammar of sankalpa itself, the tirth purohits' centuries-old vahi registers, and existing remote temple archana/seva — and name the exact places where precedent runs out.**

*Why:* The precedent is real and specific, which makes citing it credible; naming where it stops is what distinguishes an honest position from apologetics.

**Publish a literal, numbered list of 16 claims Snanify will never make, on the public Ethics page, with an address to report violations.**

*Why:* Publishing your own blocklist is a stronger trust signal than any testimonial, because it is costly and enforceable against you.

**Local recording on the officiant's device is the source of truth; the live stream is explicitly a courtesy, best-effort.**

*Why:* Ghat connectivity will fail regularly. Making the recording authoritative means the common failure mode is minor and cheap to remedy, instead of a total service failure.

**Publish a SHA-256 commitment of the sankalp (the "Sankalp Mudra") to a public log at booking time, before the rite.**

*Why:* Proves the intention existed prior to the rite and was not back-filled, without ever exposing the intention itself.

**The on-camera slate carries a daily public randomness anchor (drand quicknet round at 00:00 IST) alongside the rite code.**

*Why:* A number that did not exist yesterday makes pre-filmed or reused footage structurally impossible to pass off, and any third party can check the round independently.

**Each rite is one continuous, uncut take of ≥90 seconds, enforced by automated PTS-continuity and scene-cut detection that blocks publication.**

*Why:* "Unedited" must be a machine-checked property, not a promise, or it is worth nothing.

**A public append-only Rite Ledger with hash-chained entries containing rite code, hashes, ghat, officiant ID and timestamps — and, by construction, no names, gotras or sankalp text ever.**

*Why:* Permanent proof and full erasure rights are only compatible if the permanent record is personally empty by design.

**Verification runs client-side via WebCrypto — the user drags their downloaded MP4 into snanify.com/verify and the browser hashes it locally.**

*Why:* The sceptical relative must be able to check without trusting Snanify's servers and without uploading a family's private recording anywhere.

**State plainly on the Ethics page that the ledger proves a file existed unaltered at a time, and proves nothing about sincerity.**

*Why:* Overselling cryptography as spiritual assurance is the same category error as selling punya, and admitting the limit is what makes the rest believable.

**Disclose sankalp density honestly — a segment carries at most 11 sankalps, each name and gotra spoken aloud, with the exact second your name is spoken stored and deep-linked.**

*Why:* Users will discover batching anyway. Disclosing it with a per-name timestamp converts the biggest credibility liability into a proof feature.

**Add a private single-sankalp tier (Ekant Snan, proposed $251) rather than implying exclusivity the $11 tier does not deliver.**

*Why:* The honest answer to "is my rite private?" is "not unless you buy a private one" — which requires a private one to exist.

**Officiant pay is a published formula: max(flat ₹1,800 per segment, 20% of that segment's gross), paid within 7 days, with no clawback for connectivity failures; 100% of any dakshina passes through.**

*Why:* A formula is auditable and survives scale; a rate is a marketing number. Publishing it is the only credible answer to "you're exploiting priests."

**Officiants may refuse any sankalp on grounds of conscience and are paid anyway.**

*Why:* Purchased consent is not consent; a priest who cannot decline is not an officiant, and users can tell.

**Officiant profiles publish an itemised "what we verified / what we did not" block instead of a credential badge.**

*Why:* No neutral certifying body exists for ghat purohits, so any badge would be fabricated authority. Enumerating the gaps is the credential.

**Sankalp text defaults to being offered silently — the officiant states the rite is for the intention the user holds — unless the user opts in to have it read aloud.**

*Why:* Traditionally sound (sankalpa is frequently held mentally) and privacy-preserving by default rather than by settings archaeology.

**Sankalp text is deleted 90 days after the rite by default, with a 24-hour option; access requires two-person approval, is logged, and the user is emailed within 24h that it was read and why.**

*Why:* Notified break-glass access is the structural version of "we don't read your intentions" — it costs the company something and is therefore believable.

**Deletion is implemented as crypto-shredding — per-rite DEKs destroyed — while the plaintext media hash remains in the ledger.**

*Why:* Reconciles WORM/object-lock integrity storage with genuine erasure, and the user's own downloaded copy still verifies forever after the server copy is destroyed.

**Zero third-party scripts and an absolute ban on session replay anywhere on the site, especially the sankalp entry flow.**

*Why:* Session replay on a page where someone types "for my mother's cancer" is indefensible under any policy, so it must be prohibited structurally rather than configured carefully.

**Enforce the anti-pattern ban in CI via scripts/copy-lint.ts, failing the build on a bilingual regex blocklist covering grief, guilt, divine punishment, and fake scarcity.**

*Why:* Ethics that live in a document decay at the first growth sprint; ethics that break the build do not.

**Any scarcity number must be a live query against real scheduler capacity or it may not render at all.**

*Why:* Muhurat slots genuinely are limited, so the honest number is available — which removes every excuse for inventing one.

**Monthly public SLA report (scheduled, performed, degraded, not performed, refunded, stream uptime, time-to-patra), published from rite #1 including bad months.**

*Why:* Small honest numbers early build more trust than large vague numbers later, and the commitment is only credible if it predates having good numbers.

**Refund grid: full refund up to 24h before, 50% inside 24h, full no-questions refund within 14 days after for any reason once per account, pro-rata refunds on unused Varsh snans, and full refund or free tarpan if the named person dies before the rite.**

*Why:* Every case where a user might feel trapped is pre-resolved in their favour, removing the entire category of grievance that fuels scam accusations.

**Close the Ethics page with "ask your own purohit — if he says this is not for you, he is right and we are not offended."**

*Why:* Deferring to the user's own religious authority is the single strongest proof that Snanify is not trying to capture their faith, and it is the brand's whole thesis in one sentence.

---

« # Snanify — Authenticity, Ethics & Trust Architecture

**Spec status:** implementation-ready. Every `PLACEHOLDER` is a real-world fact a human must establish before it ships. Nothing marked PLACEHOLDER may appear in production copy.

---

## 0. URGENT — remediation of the currently live landing page

The live MVP contains three fabricated trust signals that directly violate the product's own constraints. These must be fixed **before** any of the architecture below is published, or the Ethics page becomes a lie about a lie.

`src/lib/content.ts`:

| Line | Current | Problem | Fix |
|---|---|---|---|
| 40–44 / 181–185 | `hero.stats`: `1,20,000+ Sankalps offered`, `48 Countries served` | Fabricated trust statistics | Either (a) delete the stats block entirely until real, or (b) drive from `GET /api/transparency/live` returning true ledger counts. Ship (a) now. Keep `6 · Sacred waters` — it is true. |
| 28 / 169 | `hero.badge`: `"Live now · Har Ki Pauri, Haridwar"` | Asserts a live stream that is not live | Drive from real stream state. When no stream: render the *next* muhurat label instead, or omit the badge. Component must accept `badge: null`. |
| 37 / 178 | `hero.card.meta`: `"04:24 IST · Ganga, Haridwar"`, `countdown: "opens in 6h 12m"` | Invented panchang timing presented as fact | Must come from the panchang source record (§7). Until sourced, show the occasion name without a clock time. Never hardcode a countdown. |
| 85–89 / 226–230 | `muhurat.items` dates ("November 2026" etc.) | Month-level only, no day/time asserted — **acceptable**, but must carry provenance once exact times appear | Add `source` to each item when times are added. |
| 115 / 252 | `"HD recording, kept for good"` / `"HD रिकॉर्डिंग, सदैव सुरक्षित"` | "Forever" is a promise that conflicts with the erasure right | → EN `"HD recording, kept until you delete it"` / HI `"HD रिकॉर्डिंग, जब तक आप न हटाएँ"` |
| 140 / 277 | Footer link `"Our priests"` / `"हमारे पुरोहित"` | Dead link | Route to `/officiants` (§4) |
| 141 / 278 | Footer link `"Ethics & rites"` / `"नीति एवं विधि"` | Dead link | Route to `/ethics` (§8) — this is the page specced below |

Also add a CI test asserting `content.ts` contains no numeric string matching `/\d[\d,]{3,}\s*\+/` outside of a file explicitly allowlisted as ledger-derived.

---

## 1. The theological position

### 1.1 The plain statement (canonical — this wording is normative, reuse it everywhere)

> Snanify is not a temple and is not your purohit. It is a service that engages a qualified officiant to perform a snan-sankalp at a named ghat, at a named hour, in your name and your gotra — and then gives you proof that it happened.
>
> **We describe acts. We do not describe effects.**

### 1.2 Where genuine precedent exists

These are the four defensible pillars. Each is real; none is invented. Marketing may cite these; it may not embellish them.

1. **The grammar of sankalpa itself is a naming, not a presence-requirement.** The sankalpa formula fixes *deśa* (place), *kāla* (time — down to samvatsara, ayana, ṛtu, māsa, pakṣa, tithi), *gotra*/*pravara* (lineage), and *nāma* (the person). Its own structure is what binds a rite to a named individual. It has never required that the named person be standing there; it requires that the person be named. This is the strongest pillar.
2. **The yajamāna/ṛtvij separation is foundational, not a workaround.** In both śrauta and smārta practice the sponsor of a rite is structurally distinct from its performer. The purohit performs; the yajamāna offers and receives. Hindu ritual has been delegable in exactly this direction for its entire recorded history. Snanify occupies the yajamāna-facilitation slot — it is not inventing a new relationship, it is intermediating an old one.
3. **Tīrtha purohits have performed rites for absent families for centuries, with records.** The *vahi/bahi-khata* genealogical registers maintained by tīrth purohits at Haridwar (Kankhal), Prayagraj, Gaya, Trimbakeshwar and Chintpurni are a documented, centuries-old proof-of-record institution for precisely this transaction: a family that cannot travel, a named lineage, a rite performed, an entry made. Snanify's Rite Ledger is a digital instance of a very old idea — say so, in those words. It is the single most useful analogy in the whole product.
4. **Institutional Hinduism already accepts remote sponsorship.** Archana and seva booked from another city or by post, name-and-gotra given at a counter with the sponsor outside the sanctum, and live darshan streamed from major temples for over two decades. Remote participation is not a diaspora invention; it is mainstream temple practice.

> The line for copy: **"None of this is new. The camera is new."**

### 1.3 Where precedent runs out — the honest limits

State these publicly and unprompted. Each is a real limit, not a hedge.

- **Snāna is a bodily act.** *Deha-śuddhi* is not occurring on the user's body and Snanify must never imply it is. What is performed is the sankalpa and the officiant's rite following it.
- **The journey is part of the tīrtha.** *Śrama* — the effort of going — is treated in the tradition as part of the merit of pilgrimage. Snanify cannot supply the journey and must not claim equivalence to being there.
- **Obligatory life-cycle rites are out of scope.** Not antyeṣṭi. Not the immersion of actual ashes. Not a śrāddha where a specific person's physical presence and physical piṇḍa are prescribed. Snanify offers *tarpaṇ in remembrance*, which is a different and lesser thing, and must be labelled as such everywhere in the UI (field: `rite_kind: "tarpan_smaran"`, never `"shraddh"`).
- **Traditions disagree about mediated darśana.** Some ācāryas accept it, some do not. Snanify takes no side and says so.
- **No outcome claims of any kind.** Health, fertility, visas, litigation, marriage, examinations, employment, wealth.

### 1.4 THE NEVER-CLAIM LIST (binding; published verbatim on `/ethics`)

Snanify will never state, imply, or permit a partner, affiliate, ad, email, push notification, officiant, or influencer to state:

1. That your sins are washed away, or any variant of *pāp dhul jāte haiṅ* as a product promise.
2. That this grants mokṣa, mukti, or liberation.
3. That this is equal to, or a substitute for, bathing in the river yourself.
4. That merit can be counted, measured, multiplied, accumulated, banked, or is greater in one tier than another. (**The tiers differ in scope of service, never in efficacy.** $108 buys twelve rites, not more punya per rite. This must be explicit on the pricing page.)
5. That ancestors are restless, unfulfilled, trapped, wandering, waiting, or suffering — or that anything will befall a family that does not book.
6. That any doṣa exists in a user's chart, or that Snanify can identify or remove one (pitṛ doṣa, kāla sarpa doṣa, śani, maṅgal — all banned as both diagnosis and remedy).
7. That the service produces any outcome in a user's life.
8. That it replaces a rite the user's own tradition requires them to perform in person.
9. That any ācārya, maṭha, akhāṛā, temple trust, or ghat authority endorses Snanify — **unless** a signed, dated, publicly published, unilaterally revocable letter exists at `/endorsements`.
10. That water, soil, or any material has scientifically demonstrated purificatory or medicinal properties.
11. That the user's physical body has been purified.
12. That a muhurat is a last chance, or will not return for N years — factual astronomy may appear in the calendar; it may never appear within a checkout flow.
13. That a rite occurred when it did not.
14. That any generated, stock, reused, or previously recorded footage is the user's rite. **Generative video and synthetic voice are banned outright, with no exception for illustration, marketing, or B-roll.**
15. Any use of a deceased named person in marketing, case studies, or social proof.
16. Any conditional-harm framing: "if you don't…", "before it's too late", "your family will…".

**Enforcement:** violations are a P0. Public commitment on the page: *"If you ever see us make one of these claims, write to ethics@snanify.com. We will take it down and say so publicly."* Corrections are logged at `/ethics/corrections` with date, the claim, and the fix.

### 1.5 THE PERMITTED-CLAIM ALLOWLIST

Marketing may say, without further approval:

- "A rite was performed in your name."
- "Your name and gotra were spoken aloud at [ghat] on [date] at [time IST]."
- "Here is the unedited recording. Here is the exact second your name is spoken."
- "You can verify this yourself, and so can anyone you send it to."
- "Many traditions accept a rite performed by a purohit on a sponsor's behalf. Yours may not. Ask."
- "The river comes to you." *(existing hero — poetic, makes no efficacy claim, retained)*
- "Ten thousand kilometres is not a distance the Ganga recognises." *(existing closing — devotional register, no promise. Retained.)*

Anything outside this list requires two-person sign-off (§6.3).

---

## 2. Proof-of-performance: the verification chain

### 2.1 Architectural principle

**The local recording is the source of truth. The live stream is a courtesy.** The officiant's device always records locally at 1080p30 regardless of connectivity; the stream is best-effort. This makes "stream dropped" a minor, cheap failure rather than a service failure, and it is why the remedy in §5 is a 25% credit rather than a refund.

### 2.2 The chain, in order

**Step 1 — Sankalp commitment (at booking, T-minus days).**

On payment success, generate:
- `riteId` — ULID.
- `riteCode` — 8 characters, Crockford Base32, from `riteId` entropy. This is the user-facing code, printed on the slate and the patra.
- `sankalpHash` = `SHA-256(canonicalJSON({riteId, sankalpText, names[], gotra, riverId, ghatId, muhuratStartUtc, windowSeconds, tier, createdAtUtc}))` using RFC 8785 JCS canonicalisation.

Display the first 16 hex characters to the user immediately as the **Sankalp Mudra**, grouped for legibility: `7F3A · 22C1 · 90DE · B4A6`. Publish the full hash to the public ledger within 60 minutes of booking.

*What this proves:* the intention existed before the rite and was not written afterwards. *What it does not reveal:* anything. The hash is of data the user already knows and nobody else can invert.

**Step 2 — The slate (at the ghat, on camera).**

The officiant's capture app renders a slate on a handheld e-ink/thermal-printed card showing, in ≥28pt:
- `riteCode` (8 chars)
- Date, ghat name
- First 8 hex of the `sankalpHash`
- **The daily anchor** (Step 3)

Filmed at the head of the segment, held still and in focus for ≥5 seconds, legible when the frame is downscaled to 1080p. The pipeline OCRs the slate and rejects the segment if the OCR'd rite code does not match the booking.

**Step 3 — The freshness anchor (this is the load-bearing anti-fraud control).**

The slate carries a number that could not have existed before that day: the **drand quicknet round** for 00:00:00 IST of the rite date — round number plus the first 8 hex characters of its randomness. Recorded in the ledger as `drandRound` and `dailyAnchor`.

*Why:* drand's randomness is unpredictable until the round is emitted and is publicly retrievable forever by round number. No footage shot before that instant can display it. Any third party can fetch the round and check the slate. This defeats reused, pre-filmed, and stock footage without requiring anyone to trust Snanify.

- Fallback if the ghat is offline at print time: use the most recent available round, set `anchorStale: true` and `anchorAgeSeconds` in the ledger entry. Honest degradation, visibly recorded — never silently.
- Secondary anchor for redundancy: NIST Randomness Beacon pulse. Recorded but not printed.

**Step 4 — The continuous segment.**

Requirements, machine-enforced:
- **One take. No cuts. Minimum 90 seconds.**
- Contains, in order: slate held to camera → sankalpa recitation naming **each** name and gotra aloud → the dip / jal-arpan → closing.
- Editing is permitted **only** as head/tail trim. Any cut inside the segment voids it.

Enforcement in the ingest pipeline (`worker/segment-validate`):
- PTS continuity check on the fMP4 — any discontinuity → `REJECT`.
- Scene-cut scan: `ffmpeg -i seg.mp4 -vf "select='gt(scene,0.4)',metadata=print" -f null -`. Score > 0.6 → `REJECT`. Score 0.4–0.6 → `HOLD` for human review.
- Audio continuity: reject on any silence gap > 1.5s combined with an RMS discontinuity > 12 dB (indicates a splice).
- Duration < 90s → `REJECT`.
- Store per-GOP SHA-256 hashes in the manifest so a partial-tamper claim can be localised.

**Step 5 — Device attestation (anti-substitution).**

The capture app (iOS/Android) holds an ES256 keypair in Secure Enclave / StrongBox, enrolled per officiant device. Every media file is signed at capture: `sig = ES256(deviceKey, SHA-256(file))`. Ingest rejects any media without a valid signature from an enrolled, non-revoked device. The manifest also records GPS fix, geofence result (200 m polygon around the ghat), GPS-derived UTC, device UTC, and server-received UTC.

**Be honest about this in the public copy:** GPS is spoofable and attestation can be defeated by a determined insider. That is precisely why the slate, the drand anchor, and the live stream carry more weight. Do not present attestation as unbreakable.

**Step 6 — The live stream.**

- Ingest: WHIP (WebRTC) from a bonded-cellular encoder at the ghat (vendor PLACEHOLDER). Distribution: WebRTC, LL-HLS fallback.
- Latency targets: < 5 s WebRTC, < 12 s LL-HLS.
- Join link issued at booking; push/email at T-15 minutes and T-2 minutes.
- Stream failure never blocks the rite (see §2.1).

**Step 7 — Finalisation and integrity.**

- Compute `mediaSha256` over the **plaintext** MP4 bytes exactly as the user will download them.
- Encrypt at rest: AES-256-GCM under a per-rite DEK, DEK wrapped by a KMS CMK. Ciphertext to object storage with Object Lock / WORM, retention 7 years.
- **The ledger stores the plaintext hash.** This is deliberate: after crypto-shredding (§6/§7) destroys the server copy, a user's own downloaded file still verifies against the ledger forever. Proof outlives storage.

**Step 8 — The public Rite Ledger.**

Append-only, hash-chained, publicly readable, **containing no personal data by construction**.

```ts
// src/lib/ledger/types.ts
export type RiteStatus =
  | "booked" | "scheduled" | "in_window" | "performed"
  | "performed_degraded" | "rescheduled" | "not_performed"
  | "refunded" | "cancelled_by_user";

export type Immersion =
  | "full" | "partial"
  | "none_unsafe_water" | "none_ghat_closed";

export interface LedgerEntry {
  seq: number;                 // strictly increasing
  riteCode: string;            // 8 chars, public
  sankalpHash: string;         // sha256 hex, published at booking
  riverId: string;             // "ganga"
  ghatId: string;              // "haridwar-har-ki-pauri"
  officiantId: string;         // "OFF-0007" -> /officiants/OFF-0007
  scheduledUtc: string;
  performedUtc: string | null;
  windowSeconds: number;
  drandRound: number;
  dailyAnchor: string;         // first 8 hex of that round's randomness
  anchorStale: boolean;
  mediaSha256: string | null;  // of plaintext MP4
  mediaBytes: number | null;
  segmentSeconds: number | null;
  sankalpCount: number;        // how many sankalps shared this segment — DISCLOSED
  immersion: Immersion | null;
  status: RiteStatus;
  degradedReason: string | null;
  panchangSourceId: string | null;
  prevEntryHash: string;
  entryHash: string;           // sha256(prevEntryHash || jcs(entry minus entryHash))
}
```

**Mandatory CI test:** `ledger-no-pii.test.ts` — serialise 10,000 synthetic entries and assert no field ever contains a name, gotra, email, free text, or any value not drawn from an enumerated/derived set. `degradedReason` must be an enum key, never prose.

- Daily head hash published at `/api/ledger/head` and timestamped with an RFC 3161 TSA (vendor PLACEHOLDER).
- Optional: notarise the daily head hash to a public chain. **If done, the copy must read:** *"This proves the record existed at a time and has not been altered. It does not prove sincerity. No technology proves sincerity."* Never the phrase "blockchain-verified snan".

**Step 9 — Public verification page.**

`GET /verify` and `GET /verify/:riteCode` — **no login, no upload.**

1. User enters a rite code (or arrives via the QR on the patra).
2. Page shows the ledger entry: ghat, officiant (linked), scheduled vs performed time, drand round (with an outbound link to verify the round independently), segment length, sankalp count, immersion, status.
3. A drop zone: user drags in their downloaded MP4. The page hashes it with `crypto.subtle.digest('SHA-256', …)` streamed in 8 MB chunks with a progress bar, **entirely in the browser**. The file never leaves the device.
4. Result: **`This is the file we recorded.`** / **`This file does not match.`**

This is the product's single most important trust surface. Design it to the same standard as the landing page: the sceptical uncle in Kanpur must be able to use it without an account, without Hindi/English toggle friction, on a five-year-old Android.

**Step 10 — Independent oversight.**

- Fixed second camera per ghat: wide shot of the ghat plus a visible clock, continuously recorded, retained 30 days, sampled into audits.
- **Third-party audit** (auditor PLACEHOLDER): 2% of rites spot-checked monthly; unannounced attendance at ≥2 ghats/month; officiant identity verified in person; ledger count reconciled against observed activity. Quarterly summary published at `/ethics/audits` with pass/fail counts — **including failures**.

### 2.3 Sankalp density — the honest answer to "is my rite private?"

At $11, a rite cannot be exclusive. Do not pretend otherwise.

- **A segment carries at most 11 sankalps.** Each name and each gotra is spoken aloud, individually and audibly. Never a batch mumble, never "and all others".
- The pipeline stores `nameSpokenAtSeconds` per sankalp (from a forced-alignment pass on the audio, human-corrected on HOLD). The user's recording **opens at that second**, and the patra says: *"Your name is spoken at 02:14."*
- `sankalpCount` is public in the ledger. If eleven names shared a segment, the ledger says eleven.
- Public copy, verbatim: **"Your rite is not private unless you buy a private rite."**

**Proposed new tier (founder decision required): Ekant Snan — $251.** One sankalp, one segment, one officiant, no one else's name in the recording, choice of muhurat within the window. This exists so that the honest sentence above has an honest remedy. Does not disturb the 11/31/108 structure; 251 is not presented as auspicious numerology, it is presented as a price.

### 2.4 The Sankalp Patra

PDF/A-3 plus a 2048px PNG. Digitally signed (PAdES, Snanify certificate); a detached `.sig` is downloadable and the signing certificate is published at `/verify/cert`.

Required fields:
- Name(s) and gotra — *user may suppress the sankalp text from the visible certificate; default is suppressed.*
- River, ghat, date, muhurat in IST **and** the user's timezone at booking.
- Officiant name and ID.
- Rite code, Sankalp Mudra (16 hex, grouped), QR to `/verify/:riteCode`.
- **Mandatory closing line, both languages, non-removable:**
  - EN: *"This is a record of a rite performed and recorded. It is not a claim about its fruit."*
  - HI: *"यह संपन्न एवं अभिलिखित अनुष्ठान का प्रमाण है। इसके फल का दावा नहीं।"*

---

## 3. Public API surface

| Route | Auth | Returns |
|---|---|---|
| `GET /verify/:riteCode` | none | HTML verification page |
| `GET /api/ledger/entry/:riteCode` | none | `LedgerEntry` JSON |
| `GET /api/ledger/head` | none | `{ seq, headHash, publishedUtc, tsaTokenUrl }` |
| `GET /api/ledger/export?from=&to=` | none, rate-limited | Full NDJSON log — downloadable, diffable, mirrorable |
| `GET /api/officiants/:officiantId` | none | Public officiant profile |
| `GET /api/transparency/:yyyy-mm` | none | Monthly SLA numbers (§5.3) |
| `GET /api/panchang/source/:panchangSourceId` | none | Provenance record (§7) |
| `POST /api/rites/:riteId/refund` | user | One-click refund, no reason field |
| `POST /api/account/erase` | user, re-auth | Full erasure (§6) |

Ledger endpoints must be CORS-open (`*`) so third parties can build independent verifiers. Encourage that publicly.

---

## 4. The officiants

### 4.1 Engagement

Direct written contract with Snanify. **Not a marketplace, not gig work.** Contract in the officiant's own language (Hindi / Marathi / Kannada as applicable), plain language, ≤2 pages, signed copy physically retained by the officiant. Term 12 months, rolling. Either side may exit on 30 days' notice.

### 4.2 Credentialing — publish what was verified *and what was not*

Verification steps performed:
- (a) Government photo ID and address verification.
- (b) Evidence of training: named pāṭhaśālā / veda-vidyālaya certificate, **or** attested testimony from two established purohits at that ghat.
- (c) Local standing: membership or registration with the relevant ghat body where one exists (e.g. Śrī Gaṅgā Sabhā at Har Ki Pauri — **PLACEHOLDER: must be confirmed and consented to before naming any body**).
- (d) Recorded assessment: the officiant records the sankalpa-vidhi and one tarpaṇa; reviewed by the **Vidhi Panel** — three external advisors, publicly named, honorarium-paid, two-year terms, empowered to publicly dissent (**ALL PLACEHOLDER until letters are signed**).

**Every officiant profile carries a "What we verified" block, itemised, including the gaps.** Model text:

> **Verified:** identity and address · 14 years of daily practice at Ram Ghat, attested by two ghat purohits · training certificate from [PLACEHOLDER institution] · recorded vidhi assessment, reviewed [date].
> **Not verified:** we did not test his Sanskrit pronunciation against any board, because no such board exists. We did not verify his lineage claims beyond the two attestations above.

The absence of a badge *is* the credential. Never invent one.

### 4.3 Public profile (`/officiants/:id`)

Name; photograph (with written, revocable consent); ghat; sampradāya/tradition; languages; years of practice at that ghat; date joined Snanify; number of Snanify rites performed (from the ledger, live); the "What we verified" block; a one-paragraph statement in his own words, in his own language, unedited except for length.

### 4.4 Pay — published formula, not a published rate

**Per segment: `max(₹1,800 flat, 20% of that segment's gross revenue)`.**
Worked example: 11 sankalps × $11 ≈ ₹10,600 gross → 20% = ₹2,120 → officiant receives ₹2,120. A segment with 2 sankalps → flat ₹1,800 applies. *The officiant is never worse off because the segment was quiet.*

| Item | Amount | Notes |
|---|---|---|
| Rite segment (shared) | `max(₹1,800, 20% of segment gross)` | PLACEHOLDER pending market check; formula is the commitment |
| Ekant Snan (private) | ₹4,000 flat | |
| Ghat assistant / camera | ₹600 per segment | |
| Ghat lead availability retainer | ₹8,000 / month | Covers brahma-muhurat scheduling |
| Payment terms | Weekly, within **7 days**, UPI or bank | No clawback for connectivity failure |
| Dakshina | **100% to the officiant** | Optional, never pre-checked, shown as a separate line, ₹0 to Snanify |

No unpaid trials. No tips-only compensation. No structuring that lets Snanify substitute user dakshina for base pay. The officiant-share ratio is published quarterly in the transparency report as an actual computed percentage.

### 4.5 Officiant rights and conduct

- **Right of refusal:** may decline any sankalp on grounds of conscience, without penalty, and **is paid for the segment anyway**. Refusal reasons are not demanded, not logged against him, and not disclosed to the user beyond "your rite was reassigned; you were not charged / you may choose another officiant".
- **Data minimisation on device:** sees names and gotra; sees sankalp text **only** if the user opted into aloud-recitation. All user data is purged from the capture device within 48 hours, enforced by the app.
- **No direct solicitation.** May not sell to users, accept off-platform payment, or retain user contact details. Breach = termination.
- **Marketing consent is revocable.** Name and photo removed from marketing on request within 7 days. Historical ledger and patra records retain his name — accuracy of a religious record outranks erasure, and this is disclosed at signing, in the contract, in his language.
- **Ghat Conduct Code** (published at `/officiants/conduct`): no plastic or non-biodegradable offerings; no obstruction of public bathers; no filming of identifiable third parties; full compliance with ghat authority and local rules; camera framed on the officiant and the water.

---

## 5. Failure, refunds, and the SLA

### 5.1 The remedy grid (implement as a decision table, not case-by-case discretion)

| Case | Ledger status | What Snanify does | User's options |
|---|---|---|---|
| Stream dropped, recording intact | `performed_degraded` / `stream_loss` | Recording published within **6 h**; proactive notification | Nothing owed. **25% credit or refund, auto-granted on one click, no questions.** |
| Stream dropped **and** recording lost | `not_performed` | Say so, unprompted, within 12 h | Free re-performance at next equivalent muhurat **or** full refund |
| Muhurat missed, Snanify's fault | `not_performed` | Proactive apology + both options offered | Free redo **or** full refund |
| Ghat closed / curfew / flood | `not_performed` | Notify **before** the window | (a) same river, another ghat (b) another river, same muhurat (c) next equivalent muhurat (d) full refund. **Never a silent substitution.** |
| Water unsafe for entry | `performed_degraded`, `immersion: none_unsafe_water` | Officiant performs jal-arpan from the steps; recorded and disclosed in the ledger | Accept · free redo · full refund |
| Officiant unavailable | `scheduled` (reassigned) | Named substitute, user told **before** | Accept · decline → redo or refund |
| User's own device/connection failed | `performed` | Recording always available | — |
| Wrong name or gotra submitted by user | `performed` | One free correction and re-recitation within 30 days | — |
| User cancels before the rite | `cancelled_by_user` | Full refund up to **24 h** before muhurat start; 50% inside 24 h (officiant already scheduled and paid) | — |
| Named person dies before the rite | `cancelled_by_user` | Full refund **or** convert free of charge to a tarpaṇ in remembrance | User's choice. **No upsell, no follow-up marketing, account flagged `bereavement_hold` for 90 days suppressing all non-transactional email.** |
| User unsatisfied, any reason | `refunded` | **Full refund within 14 days, no reason required, once per account.** Ledger entry retained (the rite did happen). | — |
| Varsh ($108) snans unused | — | Pro-rata refund at $9/snan, any time within 12 months. **No expiry forfeiture inside the year.** | — |

### 5.2 Refund mechanics and copy

- Original payment method. Initiated within **2 business days**. Zero fee. No store credit unless the user asks for it. Never requires a phone call, a chat, or a reason.
- One button in the account: **"Refund this snan"** / **"इस स्नान की राशि वापस लें"**.
- **Banned confirmation copy:** "Are you sure?", "Your sankalp will be void", "Your mother would have wanted…", any interstitial offer, any retention flow. Permitted confirmation, verbatim: EN *"Refund $11 to your card. The record of the rite stays; we do not erase what happened."* HI *"$11 आपके कार्ड पर वापस। अनुष्ठान का अभिलेख यथावत रहेगा; जो हुआ उसे हम नहीं मिटाते।"*
- Varsh cancellation must be ≤2 clicks in-account, matching the click-count of subscribing.

### 5.3 The monthly transparency report (`/ethics/numbers`)

Published on the 5th of each month, from **rite #1** — small honest numbers beat large vague ones, and the commitment is only credible if it predates having good numbers.

Fields: rites scheduled · performed · degraded (by reason) · not performed (by reason) · refunded (by category) · median stream uptime · p50/p95 time-to-Sankalp-Patra · officiant pay as % of gross · audit spot-checks passed/failed · ethics complaints received/upheld · government data requests received.

**Publish bad months unedited.** A month where the Godavari flooded and 40% of rites moved is a trust asset if reported plainly and a scandal if discovered later.

---

## 6. Data dignity

Names, gotra, ancestor names and sankalp text are religious-belief and lineage data — GDPR Art. 9 special category for EU/UK diaspora, sensitive personal data under India's DPDP Act 2023, and morally the most private thing a user will ever type into a checkout.

### 6.1 Data classes and retention

| Class | Contents | Default retention | User control |
|---|---|---|---|
| **C1 Account** | email, display name, country, payment token | Life of account; invoices 7 yrs where tax law requires | Delete account |
| **C2 Ritual identity** | names recited, gotra, relationships, ancestor names | **24 months** | 3 mo / 24 mo / keep |
| **C3 Sankalp text** | free text — may contain illness, death, infertility, immigration, litigation | **90 days after the rite** | delete within 24 h of rite / 90 days / keep |
| **C4 Media** | segment recording, user's clipped copy | 24 months (Ekal); Parivar & Varsh "kept until you delete it" | Delete any time |
| **C5 Ledger** | hashes, times, ghat, officiant, status | **Permanent** | Not deletable — *and contains no personal data by construction* |

The C5 explanation is a feature, and belongs in the UI verbatim: *"The ledger proves the rite happened. It never contains your name."*

### 6.2 Encryption and crypto-shredding

Envelope encryption: per-rite DEK (AES-256-GCM), wrapped by a KMS CMK. **Erasure = destroy the DEK + write a tombstone.** This satisfies a deletion request even against WORM/Object-Lock media storage and even against backups whose rotation has not yet completed. Document this on the privacy page — it is the technical answer to *"how can your storage be immutable and also honour deletion?"*

The plaintext `mediaSha256` remains in the ledger after shredding, so a user's own downloaded copy verifies forever. Deletion removes Snanify's ability to hold your rite; it does not remove your ability to prove it.

### 6.3 Sankalp text — the strongest controls

- **Never** used for: model training, advertising, targeting, lookalike audiences, segmentation, "popular intentions" widgets, testimonials, quotes, press, or internal browsing.
- **Break-glass access only.** Reading a sankalp requires a ticket, **two-person approval**, and is immutably logged. **The user is emailed within 24 hours stating that their sankalp was read, by which team, and why.** No exceptions for "support convenience".
- **Silent by default.** The officiant does **not** read the sankalp aloud unless the user opts in. Default recitation is: *"…this rite is offered for the intention held by [name], of [gotra] gotra."* This is traditionally sound — sankalpa is frequently held mentally — and privacy-preserving without requiring the user to hunt for a setting.
- The opt-in checkbox is unchecked, and its label says exactly what it means: EN *"Read my sankalp aloud at the ghat. It will be audible in the recording, which may include other families."* HI *"मेरा संकल्प घाट पर ऊँचे स्वर में पढ़ा जाए। यह रिकॉर्डिंग में सुनाई देगा, जिसमें अन्य परिवार भी हो सकते हैं।"*

### 6.4 Recording privacy

- The user's downloadable copy is **clipped to their own portion by default** (opens at `nameSpokenAtSeconds − 8 s`, runs to the end of their recitation plus the dip). The full segment is available on request.
- Automated face-blur pass over everyone except the officiant and named assistants. A public ghat is public; that is not consent.
- Camera framing rules are contractual (§4.5), not merely post-hoc blurring.

### 6.5 Tracking, analytics, payments

- **Zero third-party scripts on `/sankalp/*` and `/checkout/*`.** No Meta pixel, no Google Ads tag, no chat widget.
- **Session replay is banned site-wide, permanently.** No Hotjar, FullStory, Clarity, or equivalent. Recording a screen where a person types "for my mother's cancer" is indefensible under any policy; therefore it is prohibited structurally, not configured carefully. Add a CSP `connect-src`/`script-src` allowlist that makes it fail at runtime, and a CI check on the dependency tree.
- Analytics: self-hosted, cookieless, aggregate-only, **no free-text capture, no form-field capture, no URL parameters carrying names**.
- Payments: PCI handled entirely by the processor (Stripe / Razorpay); no card data touches Snanify. Statement descriptor: `SNANIFY`. Receipts describe "ritual sponsorship" and never the sankalp, the names, or the occasion — many users share a family email address.

### 6.6 Erasure, minors, the dead

- **One button: "Delete everything."** Executes across primaries, replicas, search indices and backups within **7 days** (documented backup rotation ≤35 days; crypto-shred covers the interval). Confirmation email itemises what was deleted, what was retained (tax invoices, anonymous ledger entry), and the legal basis for each.
- **Minors:** naming a minor requires the account holder to affirm guardianship. No marketing referencing a minor, ever.
- **The deceased cannot consent.** Rules: ancestor names accepted only from a person who states their relationship; never used in marketing, social proof, or case studies; **no death-anniversary messaging unless the user explicitly created the reminder**, and that reminder must be cancellable in one click directly from the message body.

### 6.7 Jurisdiction, requests, breach

- Primary storage: India (Mumbai region). EU/UK users may elect an EU replica. SCCs for transfers. DPDP consent notice in EN + HI at launch; eight additional Indian languages on roadmap.
- Government/legal requests: counts published semi-annually; user notified unless legally barred; **sankalp text (C3) will be resisted as religious-belief data** and the resistance disclosed in the transparency report.
- Breach: notify affected users within **72 hours**; anyone whose C3 sankalp text was in scope is notified **individually and regardless of any risk threshold**.

---

## 7. Panchang sourcing — no invented timings

Every muhurat carries a provenance record. No time is ever rendered without one.

```ts
export interface PanchangSource {
  id: string;              // "drik-2026-11-24-harkipauri"
  provider: string;        // PLACEHOLDER — must be a licensed/attributed provider
  method: "drik_ganita" | "surya_siddhanta";
  ayanamsa: "lahiri" | "raman" | "kp";
  lat: number; lon: number; // the ghat, not the city
  computedAtUtc: string;
  disagreesWithAlternate: boolean;  // true if any alternate provider differs > 4 min
}
```

UI rule: display the method and location alongside any precise time —
EN: *"Computed by drik ganita, Lahiri ayanamsa, for Har Ki Pauri (29.9457° N, 78.1642° E). Panchang sources differ. This is ours."*
HI: *"दृक् गणित, लाहिरी अयनांश, हर की पौड़ी (29.9457° उ., 78.1642° पू.) हेतु गणना। पंचांग स्रोतों में भिन्नता होती है। यह हमारा है।"*

If `disagreesWithAlternate`, show the range rather than a false precision. Never present a computed time as an astronomical fact, and never present it without the source.

---

## 8. Anti-patterns: banned, and enforced in CI

### 8.1 The banned list

1. **Ancestor guilt** — restless / unfulfilled / trapped / wandering / will not rest / pitṛ doṣa.
2. **Divine punishment** — wrath, curse, doṣa lagegā, pāp lagegā, aniṣṭ.
3. **Consequence threats** — "your family will suffer", "if you don't…", "before it's too late".
4. **Fake scarcity** — resetting countdowns, "only 3 slots left" absent a live capacity query, "last chance". **Rule: any scarcity number must be a live query against real scheduler capacity, or it may not render.** Muhurat slots genuinely are limited; the true number is always available, which removes every excuse for inventing one.
5. **Astronomical urgency at the point of sale** — "this muhurat won't return for 144 years" may appear in the calendar as fact; never within a checkout flow or a cart-abandonment email.
6. **Fabricated social proof** — invented testimonials, invented counts, stock-photo devotees presented as customers. (See §0.)
7. **Tier shaming** — no "Basic", no "for those who can only offer the minimum", no downgrade friction, no implication that $108 buys more merit than $11.
8. **Pre-checked anything** — add-ons, dakshina, recurring billing, marketing consent.
9. **Roach-motel cancellation** — cancel must cost no more clicks than subscribe; no phone, no chat, no retention interstitial.
10. **Unsubscribe friction** — one click, honoured immediately, no "reduce frequency instead" step.
11. **Astrological diagnosis as a lead magnet** — no "check your kundli for doṣa" funnel, ever.
12. **Bereavement targeting** — no ad buys against obituary, funeral, grief, or terminal-illness keywords or interest segments; **no retargeting of any user whose sankalp mentioned illness or death** (enforced by never passing C3-derived signals to any ad system — trivially satisfied because no ad systems touch that flow).
13. **Personalised or surge pricing** — the price never changes because the day is auspicious or because the user is affluent. PPP-based INR pricing is permitted **only** if published openly with the rate and review cadence (proposed: ₹351 / ₹999 / ₹3,100, reviewed quarterly — founder decision).
14. **Generative AI** — no AI-generated ghat footage, no synthetic voice reciting sankalpa, no AI-written sankalp, no autocomplete suggestions in the sankalp field (suggestions steer people toward grief).
15. **Cryptography as spiritual claim** — "blockchain-verified snan" is banned; "verifiable record" is permitted.
16. **Gamification of ritual** — no streaks, badges, levels, leaderboards, or "you've missed three months" nudges.
17. **Comparative faith framing** — never denigrate physical pilgrimage or another practice. Snanify is a complement, never a replacement, and never a "why fly when…".

### 8.2 CI enforcement — `scripts/copy-lint.ts`

All user-facing strings live in `src/lib/content.ts` and the mail/push templates. A pre-commit hook and a CI job fail the build on any match. Bilingual patterns, case-insensitive:

```ts
export const BANNED = [
  // ancestors / guilt
  /\b(restless|unfulfilled|trapped|wandering)\s+(soul|ancestor|atma)/i,
  /\bpit(ri|ru)\s*dosh/i, /\bkaal\s*sarp/i,
  /अतृप्त/, /भटकत[ीे]\s*आत्मा/, /पितृ\s*दोष/, /काल\s*सर्प/,
  // punishment / consequence
  /\b(curse|wrath|misfortune)\b/i, /your family will\b/i,
  /\bif you (don'?t|do not)\b/i, /\bbefore it'?s too late\b/i,
  /पाप\s*लगेगा/, /दोष\s*लगेगा/, /अनिष्ट/, /देर\s*हो\s*जाए/,
  // efficacy overreach
  /\bsins?\s+(are\s+)?(washed|cleansed|removed)/i,
  /\b(moksha|mukti|salvation)\b/i,
  /\bpunya\s*(points|multiplied|guaranteed|\d)/i,
  /\bsame as (being there|bathing yourself)/i,
  /पाप\s*(धुल|मिट)/, /मोक्ष\s*(मिल|प्राप्त)/, /पुण्य\s*गुण/,
  // scarcity / urgency
  /\bonly\s+\d+\s+(slots?|spots?|places?)\s+left/i,  // allowlist via LIVE_CAPACITY
  /\blast chance\b/i, /\bhurry\b/i, /\bexpires? in\b/i,
  /केवल\s*\d+\s*स्थान\s*शेष/, /अंतिम\s*अवसर/, /शीघ्र\s*करें/,
  // AI / fabrication
  /\bAI[- ]generated\b/i, /\bblockchain[- ]verified\s+(snan|rite|puja)/i,
];
```

`only N slots left` is allowlisted **only** when the string is produced by `renderLiveCapacity()`, which reads the scheduler. Static occurrences fail.

### 8.3 Governance

- **Two-person sign-off** on every new user-facing surface (ad, landing page, email, push, influencer brief) — one from product, one from the ethics owner. Recorded.
- **Ethics veto:** any employee or officiant may block a launch by filing an objection at `ethics@snanify.com`. The objection and its resolution are published (redacted) in the quarterly report — including objections that were overruled.
- **Standing rule, written into the employee handbook and the ad-agency brief:** *If a growth tactic requires the user to feel worse, it is out.*
- **The Ethics page is versioned.** Every revision keeps its predecessor at `/ethics/v/:date`. Never silently edited.

---

## 9. The public "Ethics & Rites" page

**Routes:** `/ethics` and `/hi/ethics`. Linked from the footer (already present in `content.ts` as `"Ethics & rites"` / `"नीति एवं विधि"` — wire it up).

**Design notes for the build:** editorial long-form, single column, max-width ~68ch, `display` face for section titles, `inscription` eyebrows, `rule-fade` between sections. No cards, no icons, no illustration, no CTA buttons anywhere on this page except the ethics@ mailto. The page must read like a masthead statement, not a landing page. The never-claim list is set as a plain `<ul>` in body face — its power is that it is unadorned. Section 5 (verification) may carry one inline SVG diagram of the chain, in `--ink2` hairlines only.

Add to `src/lib/content.ts` as `ethics: { … }` under each language, following the existing shape (`eyebrow`, `title`, `lede`, `sections[]`).

### 9.1 English copy (final, ship as written)

**Eyebrow:** Our position
**Title:** What we can promise, and what we cannot.
**Lede:** Snanify arranges a rite and proves it happened. It does not sell its fruit. This page is the long version, and it is binding on us.

**1 — The plain statement**

We are not a temple, and we are not your purohit. We are a service that engages a qualified officiant to perform a snan-sankalp at a named ghat, at a named hour, in your name and your gotra — and then gives you proof that it happened.

What that rite means is between you, your family, and your tradition. We describe acts. We do not describe effects.

**2 — Where the tradition already goes with us**

The sankalp is, by its own grammar, a naming. It fixes place, time, lineage and person. It has never required that the person be standing there. It has required that the person be named.

Hindu ritual has always separated the one who sponsors a rite from the one who performs it. The yajaman offers; the purohit performs. The tirth purohits of Haridwar, Prayagraj, Gaya and Trimbakeshwar have kept family registers for generations, and have performed rites for families who could not travel. Our ledger is a very old idea in a new form.

Temples have accepted remote sponsorship for a long time — an archana booked from another city, a name and gotra given at a counter, a puja sponsored by post. Live darshan has been streamed from major temples for over twenty years.

None of this is new. The camera is new.

**3 — Where we stop**

Snan is an act of the body. We are not performing it on your body, and we will never say we are. What is performed is the sankalp, and the rite that follows it, by the officiant, in your name.

We do not claim this is the same as standing in the river. It is not. The journey is part of the pilgrimage, and we cannot give you the journey.

We do not perform the obligatory rites of the life cycle. Not the funeral. Not the immersion of actual ashes. Not a shraddh where your own presence is prescribed. We offer tarpan in remembrance. That is a different and smaller thing, and we will keep saying so.

And we make no claim about outcomes in your life. Not health. Not a visa. Not a marriage. Not a court case.

**4 — Claims we will never make**

- That your sins are washed away.
- That this grants moksha, or any measure of punya.
- That it is equal to bathing in the river yourself.
- That merit can be counted, multiplied, or accumulated in a plan. Our tiers differ in what we do for you, never in what a rite is worth.
- That your ancestors are suffering, restless or waiting — or that anything will befall your family if you do not book.
- That any dosha exists in your chart, or that we can remove one.
- That this replaces a rite your tradition asks you to perform yourself.
- That any acharya, math, akhara or temple endorses us — unless they have signed a letter we publish, and can withdraw it whenever they wish.
- That footage made or reused elsewhere is your rite. Every recording is your own, made on your day.

If you ever see us make one of these claims, write to ethics@snanify.com. We will take it down, and say so publicly.

**5 — How you know it happened**

*Before the rite.* The moment you book, we publish a fingerprint of your sankalp — your Sankalp Mudra — to a public record. Your name is not in it. It proves your intention existed before the rite, and was not written afterwards.

*At the ghat.* The officiant holds a slate to the camera showing your rite code and that day's public anchor — a number that did not exist yesterday, drawn from a public source anyone can check. No recording made earlier can carry it.

*The segment.* One continuous take. No cuts. At least ninety seconds. Your name and your gotra spoken aloud, one by one. We record the exact second your name is said, and your recording opens there.

*Afterwards.* The recording's fingerprint goes into our public ledger. Anyone — your uncle in Kanpur, a sceptic on the internet — can go to snanify.com/verify, enter your rite code, drag in the video file, and confirm it is the same file we recorded. The check runs in their own browser. The file never leaves their computer. They never have to trust us.

*A segment may carry up to eleven sankalps.* Each name and each gotra is spoken aloud, separately. The ledger says how many shared your segment. Your rite is not private unless you buy a private rite.

*What the ledger proves:* that a recording of a particular rite existed at a particular time and has not been altered since. *What it does not prove:* sincerity. No technology proves sincerity. We are not going to pretend otherwise.

**6 — The officiants**

Every officiant is engaged directly by Snanify, on a written contract, in his own language, with a copy in his hand. He is not a gig worker.

On each officiant's page we publish what we verified — and what we did not. There is no certifying board for ghat purohits, so we will not invent a badge. We will tell you exactly what we checked.

We publish what he is paid: the greater of ₹1,800 for each rite segment or a fifth of what that segment earns [PLACEHOLDER — proposed], within seven days, by bank transfer. If you add dakshina, all of it reaches him and none of it reaches us.

He may refuse any sankalp he does not wish to speak. He is paid anyway.

**7 — If something goes wrong**

If the stream drops but the rite was recorded, you get the recording within six hours, and a quarter of your offering back if you ask. No questions.

If the rite did not happen, it did not happen. We will tell you before you ask. Then you choose: perform it again at the next equivalent muhurat, at no cost, or take a full refund.

If the ghat is closed, or the water is unsafe, we tell you beforehand and offer you another ghat, another river, another muhurat, or your money back. We will never quietly substitute one river for another.

If you simply change your mind — for any reason, or none — full refund within fourteen days. One button. No call. No "are you sure your mother would have wanted this".

We publish our numbers every month. Rites scheduled, performed, degraded, refunded. Including the bad months.

**8 — Your name, your gotra, your intention**

A gotra is lineage. A sankalp may hold an illness, a death, a fear. This is not ordinary customer data, and we do not treat it as such.

Your sankalp text is deleted ninety days after the rite, by default. You may have it deleted within twenty-four hours instead, or keep it.

By default your officiant does not read your sankalp aloud. He states that the rite is offered for the intention you hold. He reads it aloud only if you ask us.

Nobody at Snanify browses sankalps. Reading one requires two approvals and a written reason, it is logged, and you are emailed within a day telling you that it was read and why.

We never train anything on it. We never advertise from it. We never quote it. We never turn it into a testimonial.

Our public ledger never contains your name, your gotra, or your intention — only fingerprints and times. That is how the proof can be permanent while your data is not.

Delete everything, one button, done within seven days including our backups. We keep only the invoices the law requires and the anonymous ledger entry — and we tell you exactly that, in writing.

**9 — Things we will not do to you**

No countdown timer on a rite. No "only two slots left" unless two slots are actually left. No email on the anniversary of a death unless you asked us for one. No badges, no streaks, no "you have missed three months". No advertising to people reading obituaries. No price that changes because the day is auspicious. No screen recording on the page where you type your intention. No AI writing your sankalp, and no AI footage — not now, not ever.

**10 — Ask your own purohit**

If your family has a purohit, ask him about this before you book. If he tells you it is not the right thing for you, he is right, and we are not offended.

And if you think we have got any of this wrong — the shastra, the price, the proof — write to ethics@snanify.com. We publish the objections made in good faith, and what we did about them.

*Last revised [DATE]. Every earlier version of this page is kept at snanify.com/ethics/v.*

### 9.2 Hindi copy (final, ship as written)

**Eyebrow:** हमारा पक्ष
**Title:** हम क्या वचन दे सकते हैं, और क्या नहीं।
**Lede:** स्नानिफ़ाई अनुष्ठान की व्यवस्था करती है और उसका प्रमाण देती है। उसका फल नहीं बेचती। यह विस्तृत रूप है, और हम इससे बँधे हैं।

**१ — सीधी बात**

हम न मंदिर हैं, न आपके पुरोहित। हम एक सेवा हैं जो योग्य पुरोहित द्वारा, निर्दिष्ट घाट पर, निर्दिष्ट घड़ी में, आपके नाम और आपके गोत्र से स्नान-संकल्प संपन्न कराती है — और फिर आपको इसका प्रमाण देती है।

उस अनुष्ठान का अर्थ आपके, आपके परिवार और आपकी परंपरा के बीच है। हम कर्म का वर्णन करते हैं। फल का नहीं।

**२ — जहाँ परंपरा हमारे साथ चलती है**

संकल्प अपने स्वरूप में ही एक नामकरण है। वह देश, काल, गोत्र और व्यक्ति को निश्चित करता है। उसने कभी यह नहीं माँगा कि व्यक्ति वहीं खड़ा हो। उसने यह माँगा कि व्यक्ति का नाम लिया जाए।

कर्मकांड में यजमान और पुरोहित सदा अलग रहे हैं। यजमान अर्पित करता है; पुरोहित संपन्न कराता है। हरिद्वार, प्रयागराज, गया और त्र्यंबकेश्वर के तीर्थ पुरोहित पीढ़ियों से वंशावली बहियाँ रखते आए हैं, और उन परिवारों के लिए अनुष्ठान करते रहे हैं जो आ न सके। हमारा अभिलेख उसी पुराने विचार का नया रूप है।

मंदिर बहुत समय से दूर से की गई अर्चना स्वीकार करते हैं — दूसरे नगर से बुक की गई सेवा, काउंटर पर दिया गया नाम और गोत्र, डाक से प्रायोजित पूजा। बड़े मंदिरों से सजीव दर्शन बीस वर्षों से प्रसारित हो रहा है।

इसमें कुछ नया नहीं। नया केवल कैमरा है।

**३ — जहाँ हम रुक जाते हैं**

स्नान देह का कर्म है। हम उसे आपकी देह पर नहीं कर रहे, और कभी ऐसा कहेंगे भी नहीं। जो संपन्न होता है वह संकल्प है, और उसके पश्चात का अनुष्ठान — पुरोहित द्वारा, आपके नाम से।

हम यह नहीं कहते कि यह स्वयं नदी में खड़े होने के समान है। नहीं है। यात्रा भी तीर्थ का अंग है, और यात्रा हम आपको नहीं दे सकते।

हम जीवन के अनिवार्य संस्कार नहीं करते। न अंत्येष्टि। न अस्थि-विसर्जन। न वह श्राद्ध जहाँ आपकी अपनी उपस्थिति विहित है। हम स्मरण-तर्पण अर्पित करते हैं। वह भिन्न और छोटी वस्तु है, और हम यह कहते रहेंगे।

और आपके जीवन के परिणामों पर हम कोई दावा नहीं करते। न स्वास्थ्य। न वीज़ा। न विवाह। न मुक़दमा।

**४ — जो दावे हम कभी नहीं करेंगे**

- कि आपके पाप धुल गए।
- कि इससे मोक्ष मिलता है, या पुण्य की कोई माप।
- कि यह स्वयं नदी में स्नान करने के बराबर है।
- कि पुण्य गिना, गुणा या किसी योजना में संचित किया जा सकता है। हमारे स्तर सेवा में भिन्न हैं, अनुष्ठान के मूल्य में कभी नहीं।
- कि आपके पूर्वज अतृप्त हैं, भटक रहे हैं या प्रतीक्षा में हैं — या यह कि न बुक करने से आपके परिवार पर कुछ बीतेगा।
- कि आपकी कुंडली में कोई दोष है, या हम उसे दूर कर सकते हैं।
- कि यह उस विधि का स्थान ले लेता है जिसे आपकी परंपरा स्वयं करने को कहती है।
- कि कोई आचार्य, मठ, अखाड़ा या मंदिर हमारा समर्थन करता है — जब तक उनका हस्ताक्षरित पत्र हम प्रकाशित न करें, जिसे वे जब चाहें वापस ले सकें।
- कि कहीं और बना या पुनः प्रयुक्त दृश्य आपका अनुष्ठान है। हर रिकॉर्डिंग आपकी अपनी है, आपके दिन की।

यदि कभी हमें इनमें से कोई दावा करते देखें, ethics@snanify.com पर लिखें। हम उसे हटाएँगे, और सार्वजनिक रूप से स्वीकार करेंगे।

**५ — आप कैसे जानेंगे कि यह हुआ**

*अनुष्ठान से पहले।* बुकिंग के क्षण ही हम आपके संकल्प की एक छाप — आपकी संकल्प मुद्रा — सार्वजनिक अभिलेख में प्रकाशित कर देते हैं। उसमें आपका नाम नहीं होता। वह सिद्ध करती है कि आपका संकल्प अनुष्ठान से पहले था, बाद में गढ़ा नहीं गया।

*घाट पर।* पुरोहित कैमरे के सामने एक पट्टिका दिखाते हैं जिस पर आपका अनुष्ठान कोड और उस दिन का सार्वजनिक अंक होता है — ऐसा अंक जो कल तक अस्तित्व में नहीं था, और जिसे कोई भी स्वतंत्र रूप से जाँच सकता है। पहले बनाई गई कोई रिकॉर्डिंग उसे नहीं दिखा सकती।

*खंड।* एक अखंड दृश्य। बिना कट। कम से कम नब्बे सेकंड। आपका नाम और गोत्र स्पष्ट स्वर में, एक-एक करके। हम वह सेकंड दर्ज करते हैं जब आपका नाम बोला गया, और आपकी रिकॉर्डिंग वहीं से खुलती है।

*उसके बाद।* रिकॉर्डिंग की छाप हमारे सार्वजनिक अभिलेख में जाती है। कोई भी — कानपुर में बैठे आपके चाचा, या इंटरनेट पर कोई संशयी — snanify.com/verify पर जाकर, कोड डालकर, वीडियो फ़ाइल खींचकर पुष्टि कर सकता है कि यह वही फ़ाइल है। जाँच उनके अपने ब्राउज़र में चलती है। फ़ाइल उनके कंप्यूटर से बाहर नहीं जाती। उन्हें हम पर विश्वास करने की आवश्यकता नहीं।

*एक खंड में ग्यारह संकल्प तक हो सकते हैं।* हर नाम और हर गोत्र अलग-अलग, ऊँचे स्वर में बोला जाता है। अभिलेख बताता है कि आपके खंड में कितने थे। आपका अनुष्ठान तब तक निजी नहीं, जब तक आप निजी अनुष्ठान न लें।

*अभिलेख क्या सिद्ध करता है:* कि एक निश्चित अनुष्ठान की रिकॉर्डिंग एक निश्चित समय पर थी, और तब से उसमें कोई फेरबदल नहीं हुआ। *क्या सिद्ध नहीं करता:* श्रद्धा। श्रद्धा को कोई तकनीक सिद्ध नहीं करती। हम इसका दिखावा नहीं करेंगे।

**६ — पुरोहित**

हर पुरोहित सीधे स्नानिफ़ाई से, लिखित अनुबंध पर, उनकी अपनी भाषा में जुड़ते हैं, और एक प्रति उनके हाथ में रहती है। वे दिहाड़ी कर्मी नहीं हैं।

हर पुरोहित के पृष्ठ पर हम बताते हैं कि हमने क्या सत्यापित किया — और क्या नहीं। घाट के पुरोहितों के लिए कोई प्रमाणन संस्था नहीं है, इसलिए हम कोई मुहर गढ़ेंगे नहीं। हम ठीक-ठीक बताएँगे कि हमने क्या जाँचा।

हम यह भी प्रकाशित करते हैं कि उन्हें कितना मिलता है: प्रत्येक अनुष्ठान खंड के ₹1,800, या उस खंड की आय का पाँचवाँ भाग — जो अधिक हो [अस्थायी — प्रस्तावित], सात दिन के भीतर, बैंक से। यदि आप दक्षिणा जोड़ते हैं, तो पूरी उन्हीं तक जाती है, हम तक कुछ नहीं।

वे किसी भी संकल्प को बोलने से मना कर सकते हैं। भुगतान फिर भी होता है।

**७ — यदि कुछ गड़बड़ हो**

यदि प्रसारण टूटा पर अनुष्ठान रिकॉर्ड हुआ — छह घंटे में रिकॉर्डिंग आपके पास, और माँगने पर एक चौथाई राशि वापस। बिना प्रश्न।

यदि अनुष्ठान हुआ ही नहीं, तो नहीं हुआ। आपके पूछने से पहले हम बताएँगे। फिर चुनाव आपका: अगले समान मुहूर्त में निःशुल्क पुनः, या पूरी राशि वापस।

यदि घाट बंद हो या जल असुरक्षित, हम पहले बताएँगे — और दूसरा घाट, दूसरी नदी, दूसरा मुहूर्त, या पूरी वापसी प्रस्तुत करेंगे। एक नदी के बदले चुपचाप दूसरी कभी नहीं।

यदि आपका मन बदल जाए — किसी भी कारण से, या बिना कारण — चौदह दिन में पूरी वापसी। एक बटन। न कॉल। न "क्या आप निश्चित हैं कि आपकी माँ यही चाहतीं"।

हर माह हम अपने आँकड़े प्रकाशित करते हैं। नियत, संपन्न, बाधित, वापस किए गए। बुरे महीनों के भी।

**८ — आपका नाम, आपका गोत्र, आपका संकल्प**

गोत्र वंश है। संकल्प में कोई रोग हो सकता है, कोई मृत्यु, कोई भय। यह सामान्य ग्राहक-सूचना नहीं है, और हम इसे वैसा नहीं मानते।

आपका संकल्प-पाठ अनुष्ठान के नब्बे दिन बाद स्वतः मिट जाता है। आप चाहें तो चौबीस घंटे में मिटवा सकते हैं, या सदा रख सकते हैं।

सामान्यतः पुरोहित आपका संकल्प ऊँचे स्वर में नहीं पढ़ते। वे कहते हैं कि अनुष्ठान आपके मन में धारित संकल्प हेतु है। ऊँचे स्वर में तभी, जब आप कहें।

स्नानिफ़ाई में कोई संकल्प यूँ ही नहीं पढ़ता। पढ़ने के लिए दो अनुमतियाँ और लिखित कारण चाहिए, वह दर्ज होता है, और एक दिन के भीतर आपको सूचित किया जाता है कि पढ़ा गया और क्यों।

हम इस पर कुछ प्रशिक्षित नहीं करते। इससे विज्ञापन नहीं करते। इसे उद्धृत नहीं करते। प्रशंसापत्र नहीं बनाते।

हमारे सार्वजनिक अभिलेख में कभी आपका नाम, गोत्र या संकल्प नहीं होता — केवल छाप और समय। इसीलिए प्रमाण स्थायी रह सकता है, जबकि आपकी सूचना नहीं।

सब कुछ मिटाएँ — एक बटन, सात दिन में पूरा, हमारे बैकअप सहित। केवल वे रसीदें रहती हैं जो क़ानून माँगता है, और अनाम अभिलेख प्रविष्टि — और हम आपको लिखित में ठीक यही बताते हैं।

**९ — जो हम आपके साथ नहीं करेंगे**

अनुष्ठान पर कोई उलटी गिनती नहीं। "केवल दो स्थान शेष" तभी, जब सचमुच दो शेष हों। किसी की पुण्यतिथि पर ईमेल तभी, जब आपने माँगा हो। न कोई बैज, न शृंखला, न "आपने तीन माह छोड़ दिए"। शोक-संदेश पढ़ते लोगों को विज्ञापन नहीं। शुभ दिन देखकर बदलता मूल्य नहीं। जिस पृष्ठ पर आप अपना संकल्प लिखते हैं, वहाँ कोई स्क्रीन-रिकॉर्डिंग नहीं। आपका संकल्प कोई AI नहीं लिखेगा, और कोई दृश्य AI से नहीं बनेगा — न अभी, न कभी।

**१० — अपने पुरोहित से पूछिए**

यदि आपके परिवार के पुरोहित हैं, बुक करने से पहले उनसे पूछिए। यदि वे कहें कि यह आपके लिए उचित नहीं, तो वे ठीक कहते हैं, और हमें बुरा नहीं लगेगा।

और यदि आपको लगे कि हमसे कहीं चूक हुई है — शास्त्र में, मूल्य में, प्रमाण में — ethics@snanify.com पर लिखिए। सद्भाव से की गई आपत्तियाँ और उन पर हमारा किया, दोनों हम प्रकाशित करते हैं।

*अंतिम संशोधन [तिथि]। इस पृष्ठ के सभी पुराने रूप snanify.com/ethics/v पर सुरक्षित हैं।*

---

## 10. Build order

1. **Week 0 (blocking):** §0 remediation of the live page. Nothing else ships first.
2. **Week 1–2:** `LedgerEntry` schema, hash chain, `ledger-no-pii` test, `/api/ledger/*`.
3. **Week 2–3:** Sankalp commitment hash at booking + Sankalp Mudra in the confirmation UI.
4. **Week 3–5:** `/verify` page with client-side WebCrypto hashing. This ships **before** any paid acquisition.
5. **Week 4–6:** Capture app — local-first recording, device attestation, slate printing, drand anchor fetch.
6. **Week 5–7:** Segment validation worker (PTS, scene-cut, audio continuity, OCR, forced alignment).
7. **Week 6:** `copy-lint.ts` in CI + the CSP/dependency guard that makes session replay impossible.
8. **Week 7:** `/ethics` EN + HI, `/officiants`, `/ethics/numbers` (publishing from rite #1).
9. **Week 8:** Data-class retention jobs, crypto-shred erasure path, break-glass notification email.
10. **Ongoing:** monthly transparency report; quarterly audit summary; ethics-page versioning. »

---

## Open questions for a human

- Panchang sourcing: which provider is licensed, at what cost, and under what attribution terms? Drik Ganita with Lahiri ayanamsa is proposed as the default method, but the actual data supplier, its update cadence, and whether it computes to ghat coordinates (not city centroids) must be confirmed before any precise time is rendered on the site.
- Ghat authority permissions: does Snanify have — or can it obtain — written permission to film commercially at Har Ki Pauri, Triveni Sangam, Vishram Ghat, Ram Kund, Ram Ghat and Talakaveri? Several are administered by trusts, sabhas or municipal bodies with distinct rules, and Kumbh-period restrictions differ again. Every 'PLACEHOLDER' naming a ghat body (notably Shri Ganga Sabha at Har Ki Pauri) must be verified and consented to before it appears in copy.
- Officiant partnerships: no priest names, institutions, or affiliations exist yet. Who recruits them, in which language, and through what local intermediary? Confirm whether tirth purohit sabhas will treat Snanify as a competitor or a channel — this determines whether the model is viable at all in Haridwar and Prayagraj.
- Officiant pay rates (₹1,800 / ₹600 / ₹8,000 / ₹4,000) are proposed, not market-tested. Verify against actual ghat purohit earnings for comparable work. The *formula* (max of flat fee or 20% of segment gross) is the commitment; the numbers must be validated and then published as fixed for at least 12 months.
- Vidhi Panel: which three external advisors would agree to be publicly named, paid an honorarium, and empowered to publicly dissent? This is the highest-risk PLACEHOLDER — an unfilled panel means the credentialing story has a hole in it.
- Sankalp density of 11 per segment is an economic assumption. Model the real unit economics: segment throughput per officiant per muhurat window, bandwidth costs from ghat locations, storage at 24-month retention, and whether $11 clears cost at all once the 20% officiant floor and third-party audit are funded.
- Ekant Snan at $251 (private, single-sankalp) is a proposal that adds a fourth tier outside the 11/31/108 structure. Founder decision: adopt it, price it differently, or accept that 'your rite is not private' has no remedy.
- INR/PPP pricing (proposed ₹351 / ₹999 / ₹3,100) — adopt or reject. If adopted it must be published openly with the conversion basis and review cadence, since undisclosed geographic price differences read as the same dark pattern the anti-pattern list bans.
- Payments: Stripe (global) plus Razorpay (India) is assumed. Confirm both will underwrite a religious-services merchant, what descriptor is permitted, and whether refund-within-14-days-no-questions creates chargeback-ratio exposure.
- Legal structure and jurisdiction: which entity contracts the officiants (an Indian subsidiary is likely required for employment and FX), where does the money land, and how do India DPDP Act obligations interact with GDPR for EU/UK diaspora users? A DPO or equivalent is needed given Article 9 data.
- Third-party auditor for the 2%-of-rites spot check: who, at what cost, and will they accept a mandate that includes publishing failures?
- Charitable/consumer-protection exposure: several jurisdictions regulate claims made around religious services and 'spiritual healing'. Get counsel to review the never-claim list and the Sankalp Patra wording specifically — the certificate is the document most likely to be read as a guarantee.
- Bereavement flows need human review, not just policy. Someone must decide who staffs the case where a named person dies before the rite, and confirm the 90-day marketing suppression is technically enforceable across every send path.
- Face-blur vendor for third parties at public ghats, and whether automated blur is reliable enough at ghat crowd density — or whether framing discipline alone must carry it.
- Ethics page revision authority: who can change /ethics, and does changing it require the same two-person sign-off as marketing? Recommend it require founder plus one external Vidhi Panel member, so the page cannot quietly soften under growth pressure.

---

## Adversarial review

**Verdict:** needs-work

### Credibility risks

- THE PRODUCT CONTRADICTS ITS OWN NEVER-CLAIM #3. Never-claim #3 forbids implying equivalence to bathing yourself, yet the shipped copy is built entirely on that implication: the name 'Snanify', step 03 'Take your dip' / 'डुबकी लगाएँ', rivers.title 'Six rivers. One dip.' / 'छह नदियाँ। एक डुबकी।' The spec then explicitly grants itself an exemption for the two lines it likes ('The river comes to you', 'Ten thousand kilometres is not a distance the Ganga recognises') as 'poetic'. A reviewer, a journalist, or an unfriendly acharya will read that as the ethics page carving out the exact claim it bans. Right now the second-person imperative 'you take a dip' is a literal falsehood — the officiant takes the dip.
- THE §0 AUDIT CLAIMS COMPLETENESS AND IS INCOMPLETE — which discredits the whole document. It flags three fabrications and misses at least five more live in src/lib/content.ts: (a) line 51/198 rivers.items[0].note = 'Moksha · the great purifier' / 'मोक्ष · महाशोधिनी' — an outright moksha claim, banned by never-claim #2, sitting in production; (b) line 49/196 'never a stock video, never a re-run' — a proof claim asserted before any proof chain exists; (c) line 71/218 'We compute it against the panchang' — asserts a capability that does not exist; (d) line 76/223 'Your Sankalp Patra arrives the same day' — an SLA promise with no SLA behind it; (e) line 94/241 'no hidden dakshina' directly contradicts the officiant model's '100% of any dakshina passes through', which introduces a dakshina flow the pricing page denies exists.
- BATCHING IS DESIGNED AS A THIRD-PARTY DATA BREACH AND THE SPEC ONLY TREATS IT AS A MARKETING PROBLEM. Eleven sankalps per uncut segment, every name and gotra spoken aloud, delivered as one continuous file to all eleven families and forwarded on WhatsApp. Each family receives ten other families' names, gotras, ancestors' names and — if read-aloud is opted into — their health and family intentions. 'No cuts' and 'your family only sees your own' are mutually exclusive as specced. This is the single most serious defect in the document.
- THE VERIFICATION STORY BREAKS FOR EVERY REAL USER. The ledger holds the hash of the captured original; the user downloads a transcoded delivery rendition, and any file re-shared through WhatsApp, iOS, or Telegram is recompressed. Dragging that MP4 into /verify returns NO MATCH for honest customers. A verifier that fails the sceptical relative it was built for is worse than no verifier — it manufactures the accusation it was meant to pre-empt.
- GOTRA IS TREATED AS UNIVERSAL AND MANDATORY. Large parts of the user base have no gotra in practice — most non-Brahmin South Indian communities, many OBC/Dalit and Adivasi families, Sikhs, converts, adoptees, mixed and inter-faith households. A required gotra field is a caste-legible form, and the 'up to six names, ONE gotra' data model is ritually wrong for any household with a married-in woman, adopted child, or inter-caste marriage. The entire ethics architecture does not contain the word caste once.
- OFFICIANT 'CONSCIENCE REFUSAL' IS AN UNBOUNDED DISCRIMINATION VECTOR. Snanify will receive bookings from a same-sex couple, an inter-faith family, someone with a Muslim or Christian name doing a sankalp for a Hindu parent, someone with no gotra, a woman doing pitru tarpan. As written, an officiant may refuse any of these, be paid, and the user is told a priest refused them. Refusal on ritual grounds is legitimate; refusal on the identity of the sponsor is the product taking a side it says it never takes.
- OFFICIANT SAFETY AND HEALTH ARE ENTIRELY ABSENT. A real person immerses in the Ganga at Har Ki Pauri repeatedly per day, in monsoon, in flood, in winter, in water with documented faecal coliform problems, on camera, on a schedule the platform sets. There is no dip-frequency cap, no no-dip condition list (flood, high current, night, water-quality advisory), no insurance, no medical provision, and no statement of who decides between full immersion and jal-arpan. The spec has a pay formula and no duty of care.
- 20% TO THE PERSON PERFORMING THE RITE IS NOT A DEFENCE AGAINST 'YOU'RE EXPLOITING PRIESTS' — IT IS THE EVIDENCE. Publishing an unfavourable split is transparency, not fairness. Worse, an officiant using a Snanify device, a Snanify app, Snanify-mandated framing and Snanify-set timings, paid per segment, is functionally an employee under Indian labour law; there is no discussion of contractor classification, PF/ESI, or who bears device, connectivity, ghat-access, and monsoon-idle costs.
- NO FILMING RIGHT, NO BYSTANDER CONSENT, NO GHAT AUTHORITY. Every named site is governed — Ganga Sabha at Har Ki Pauri, the Mela Authority at Prayagraj, temple trusts and municipal bodies at Vishram Ghat, Ram Kund, Ram Ghat. Commercial filming needs permission. Far more seriously: these are public bathing ghats where women bathe, and the spec mandates a continuous uncut wide shot with no framing rules and no bystander policy. That is a dignity failure, a plausible IT Act 66E / BNS voyeurism exposure, and the fastest route to a crowd confronting your officiant on your own live stream.
- TALAKAVERI IS NOT A WORKING SNAN GHAT. It is the source kundike at Brahmagiri, temple-controlled, ceremonially significant chiefly at Tula Sankramana, with no standing body of ghat purohits available for daily filmed rites. Any South Indian user recognises this instantly, and an authenticity architecture that gets a river's geography wrong forfeits the right to lecture anyone about proof.
- 'WE NEVER READ YOUR SANKALP' AND ABUSE-SCANNING CANNOT BOTH BE SILENTLY TRUE. A free-text ritual-intention box will receive suicidal disclosures, medical crises, and maleficent intentions directed at a named person. There is no policy for any of these, and any automated scan silently contradicts the two-person break-glass promise that the whole privacy posture rests on.
- '90-DAY DELETION' IS PARTLY ILLUSORY. If read-aloud is opted into, the sankalp is in the permanent recording. Deleting the text row while the audio persists is the kind of technically-true erasure the spec exists to repudiate.
- MONEY STRUCTURE IS A REAL INDIA RISK, UNMENTIONED. Foreign consumers paying a Berlin/Prayagraj structure for Indian religious activity sits near FCRA (foreign contribution to religious purposes), GST treatment of ceremony-conduct services and cross-border supply, and prepaid-obligation treatment of the $108 twelve-rite Varsh tier. If the flow is ever framed as an offering or donation rather than a commercial service, this becomes existential.
- REFUNDING A PERFORMED RITE COMMODIFIES IT. A 14-day no-questions money-back guarantee on a completed sacred act reads as a satisfaction guarantee on prasad, and the automatic 'free tarpan if the named person dies before the rite' means the system proactively offers a bereavement upsell to a grieving family — banned in spirit by never-claim #5, permitted in the refund grid.
- SMALLER TELLS THAT READ AS TECH-BRO COSPLAY: batch size 11 dresses a throughput constant in numerology; a 90-second minimum for eleven families is roughly eight seconds each and the phrase 'your ancestors get eight seconds' writes itself; $251 for privacy is 23× the base price, i.e. a paywall on dignity; 'Ekant Snan' will be confused with 'Ekal Snan' in both scripts (एकल/एकांत); and calling a SHA-256 prefix a 'Sankalp Mudra' hands users a hex string as a talisman.
- PUBLISHING OFFICIANT ID PLUS GHAT PLUS TIMESTAMPS FOREVER, ALONGSIDE A PUBLISHED PAY FORMULA, PUBLISHES A NAMED PRIEST'S WORK HISTORY AND INCOME. That is a harassment and targeting vector for the least powerful party in the system.
- 'ZERO THIRD-PARTY SCRIPTS' IS AN ABSOLUTE YOU WILL BREAK AT CHECKOUT. Stripe or Razorpay is a third-party script. An unqualified promise that the first payment integration violates is a broken promise on the ethics page itself.
- A DATABASE OF NAME + GOTRA + LOCATION + FAMILY INTENTION FOR DIASPORA AND INDIAN HINDUS IS A POLITICALLY DANGEROUS ASSET. 'No third-party scripts' does not address subpoena, state access, or where the plaintext physically lives. There is no warrant canary, no data-localisation decision, and no never-sell/never-derive commitment.

### Required fixes

- Resolve the dip contradiction rather than exempting favoured copy. In src/lib/content.ts: how.steps[2].t 'Take your dip' → 'Attend the rite' / 'अनुष्ठान में सम्मिलित हों'; rivers.title 'Six rivers. One dip.' → 'Six rivers. One sankalp.' / 'छह नदियाँ। एक संकल्प।'. Keep 'The river comes to you' — it is a metaphor about reach, not efficacy — but remove the second-person imperatives that assert the user bathed.
- Delete the moksha claim now: rivers.items[0].note 'Moksha · the great purifier' → 'Har Ki Pauri · the elder river' or similar; HI 'मोक्ष · महाशोधिनी' likewise. Extend the §0 table to also cover 'never a stock video, never a re-run' (line 49/196), 'We compute it against the panchang' (71/218), 'arrives the same day' (76/223), and the 'no hidden dakshina' / dakshina-pass-through conflict (94/241). Add each to the CI lint as a named forbidden string, not just the numeric-stat regex.
- Fix the batch privacy leak before anything else. Either (a) one segment = one sankalp whenever any third-party name is audible, or (b) names/gotras are never spoken aloud in shared segments and are instead offered in the silent default, with only the rite code audible, or (c) the delivered artefact is the family's own timestamped excerpt under a distinct integrity scheme and the full take is available only on request with all co-participants' consent. Whichever you choose, the checkout must state in one plain sentence who else will hear the user's name.
- Make the deliverable byte-identical to the hashed artefact, or publish per-rendition hashes plus a signed manifest, and put a blunt line on /verify: 'If this file was forwarded through WhatsApp it has been recompressed and will not match. Download the original from your rite page.' Ship a known-good sample rite so anyone can test the verifier before they need it.
- Make gotra optional with dignity. Field copy: 'Gotra (leave blank if your family does not use one — the sankalpa will use the customary Kashyapa gotra, or your family's own convention if you tell us).' Allow per-name gotra in the Parivar tier instead of 'one gotra'; the current model produces ritually wrong sankalpas for ordinary households.
- Bound conscience refusal explicitly: refusal is permitted on ritual grounds only, never on the identity, caste, religion, gender, marital status, or sexuality of the sponsor. Log every refusal with a reason code, audit them, re-match the user free and immediately, and never surface 'a priest declined you' to the user. Publish this rule on /officiants next to the refusal right — the right and its bound must appear together or the right becomes a licence.
- Add an officiant welfare section with the same rigour as the pay formula: maximum dips per day and per week, a published no-dip condition list (flood, high current, darkness, water-quality advisory, illness) under which the rite proceeds as jal-arpan with no pay penalty and the user is told plainly, accident and health insurance, and an explicit statement that the officiant — never the platform, never the user — decides whether to submerge.
- Reopen the 20% split rather than defending it. Either raise the officiant share to a number you would be comfortable seeing in a headline, or publish the full unit economics beside it (ghat access, connectivity, encoder, storage, payment fees, refunds) so 20% is arguable rather than merely disclosed. Separately, decide and publish contractor-vs-employee status, who owns the device, who bears data cost, and what happens to pay during monsoon closures.
- Add a filming-and-bystander section: written permission from each ghat authority (Ganga Sabha, Mela Authority, temple trust, municipal body) as a per-ghat PLACEHOLDER gate that blocks launch at that ghat; a mandatory framing rule (tight on the officiant and the water, never a pan across bathers); an on-camera-consent policy for anyone recognisable; and an immediate takedown path. Every one of these is a launch blocker, not a nice-to-have.
- Replace Talakaveri with a working Kaveri ghat that has resident purohits and a real rite practice — Amma Mandapam at Tiruchirappalli, Mayiladuthurai, or Talakad are the honest candidates. Re-audit all six sites for governing authority, seasonal accessibility, and whether daily filmed rites are actually possible; publish that audit on /ethics as the same 'what we verified / what we did not' block used for officiants.
- Resolve the scan-vs-never-read contradiction in public. State exactly what automated processing touches the sankalp text (e.g. 'an automated safety check runs on the text; no human reads it without the two-person process'), publish a refusal of maleficent sankalps in the never-claim list's sibling 'we will not perform' list, and define a crisis-disclosure response that offers resources without implying a human read the text.
- Close the deletion loophole: if read-aloud is opted into, say on that toggle that the sankalp becomes part of a permanent recording and cannot be deleted from it by the 90-day rule, and offer 'delete my recording too' as the paired control.
- Get Indian counsel on the money structure before launch and record the conclusions in the spec: commercial export-of-services framing with LUT/GST treatment rather than anything resembling an offering or donation (FCRA), prepaid-obligation and revenue-recognition treatment of the twelve-rite Varsh tier, and confirmation that no copy anywhere touches the Drugs and Magic Remedies (Objectionable Advertisements) Act 1954 — which is live the moment any sankalp about illness meets any implication of help.
- Map the copy-lint blocklist explicitly to the CCPA 2023 dark-pattern guidelines' named patterns (false urgency, confirmshaming, basket sneaking, forced action, etc.). That converts an internal values control into a regulatory-defensible one at almost zero cost, and it is the single cheapest legal upgrade in the document.
- Fix the GDPR Article 9 hole for third-party data: the booker is entering living relatives' names and gotras — special-category religious data about people who have not consented. Add a booker attestation, a per-name notice-and-removal route, a plain statement that Snanify will delete any named living person's data on that person's own request, and reflect the same under DPDP consent-notice requirements. Also add verifiable-parental-consent handling for named children.
- Re-frame refunds so the rite is not a returnable good: refund the service fee, state plainly that the rite is not undone and the officiant is paid in full regardless, and drop the once-per-account cliff. Remove the automatic bereavement tarpan offer — make it available on request, never proactively surfaced to a family that just reported a death.
- Set the segment minimum per sankalp, not per segment: minimum 45 seconds of dedicated recitation per named sankalp, so an eleven-sankalp segment cannot be under roughly nine minutes. Publish the per-sankalp minimum, not the segment minimum — the segment number is the one that will be quoted against you.
- Add the highest-value trust artefact the spec is missing: name pronunciation. Let the user record their own name and gotra at booking; the officiant hears it before the rite; add a one-tap 'my name was not said correctly' dispute that triggers a free re-do with no argument. For an Indian family this beats every hash in the document.
- Add a Sankalp Patra design ethic: it must carry Snanify's name prominently, must not use the iconography, seal, or name-styling of any real temple or trust, and must state on its face that it records a sponsored rite and is not a temple certificate. It is the artefact families will frame and show to their own purohit; it is the most likely place for accidental impersonation of a real institution.
- Add missing never-claims: (17) never claim the water is clean, safe, or medicinal; (18) never claim a specific ancestor received or was affected by anything; (19) never use any user's sankalp text in marketing, even anonymised or paraphrased; (20) never sell, share, license, or derive products from the name/gotra/intention corpus. Pair (20) with a warrant canary, a named data-residency decision, and a plain statement of which jurisdictions can compel the plaintext.
- Pseudonymise officiants in the public ledger (stable opaque ID, real identity only on the officiant's own profile if they consent), and let officiants opt out of public profiles entirely without losing work.
- Qualify the absolutes so they survive contact with production: 'zero third-party scripts' → 'no analytics, advertising, or session-replay scripts anywhere, ever; exactly one payment processor script, loaded only on the payment step, named here'. And extend the copy-lint's reach beyond content.ts with a pre-publication review gate for ad copy, push notifications, transactional email, and a written affiliate/influencer clause with termination — the build does not contain your ad account.
- Rename 'Ekant Snan' (collides with 'Ekal Snan' in both scripts) — 'Nij Snan' or 'Antaraṅg Snan' are cleaner — and drop the 'Sankalp Mudra' name for a hash; 'Sankalp seal' / 'संकल्प चिह्न' avoids handing users a hex string as a talisman. Reconsider $251-for-privacy: a smaller private tier, or private-by-default with batching as the discounted option, avoids selling dignity at 23× the base price.
- Fix the closing line's pronoun and its assumption: 'Ask someone whose judgement you trust in these matters — your own purohit, your family's acharya, your elders. If they say this is not for you, they are right, and we are not offended.' Keep the substance; it is the best sentence in the document.
- Soften the reliance on the vahi/bahi-khata analogy for the India audience. The registers are historically real and the analogy is genuinely strong for the diaspora, but tirth pandas carry a mixed reputation domestically, and the registers are cross-generational lineage records, not service receipts. Cite the precedent, do not claim the mantle: say 'a very old idea', not 'a digital instance' of theirs.

### Must survive

- 'We describe acts. We do not describe effects.' This is the correct and probably the only defensible position, and it is stated with the right restraint. Every good thing in the document descends from this sentence.
- The published, numbered, binding never-claim list. Publishing your own blocklist is costly and enforceable against you, which is exactly why it works. Pair it with the corrections log at /ethics/corrections — the log is what makes the list more than a poster.
- Never-claim #4: tiers differ in scope of service, never in efficacy; $108 buys twelve rites, not more punya per rite. This is the single most important sentence in the pricing story and it kills the worst monetisation pattern in the entire category. Put it on the pricing page in both languages, not just on /ethics.
- Never-claim #12: factual astronomy may appear in the calendar, never inside a checkout flow. A precise, testable, structural rule against the industry's favourite manipulation. Excellent.
- Never-claims #5 and #6 together — no restless ancestors, no dosha diagnosis or remedy. These two ban the entire business model of the exploitative competition. They are the product's moral spine.
- Never-claim #14: generative video and synthetic voice banned outright with no exception for illustration, marketing, or B-roll. The no-exception framing is what makes it hold.
- Never-claim #9: no endorsement claim without a signed, dated, publicly published, unilaterally revocable letter. Correctly designed, including the revocability.
- The local recording as source of truth, live stream as explicit courtesy. This is good engineering AND good ethics: it turns the most frequent failure into a small honest one instead of an occasion to lie.
- Disclosing batch density with a per-name timestamp deep link. The instinct — convert your biggest credibility liability into a proof feature — is exactly right, even though the privacy consequence still has to be solved.
- Officiants may refuse on conscience and are paid anyway. Purchased consent is not consent. Keep it; bound it.
- 'What we verified / what we did not' instead of a credential badge. There is no neutral certifying body for ghat purohits, so any badge would be fabricated authority. Enumerating the gaps as the credential is the most original honest idea in the document and should be reused for ghats, panchang sources, and stream reliability.
- Silent-by-default recitation of the sankalp, opt-in to read aloud. Traditionally sound — sankalpa is frequently held mentally — and privacy-preserving by default rather than by settings archaeology.
- Notified two-person break-glass access. It costs the company something, which is precisely why it is believable. Add only the law-enforcement carve-out and canary.
- Crypto-shredding so a permanent public record and a real erasure right can coexist, with a ledger that by construction contains no names, gotras, or sankalp text.
- Absolute ban on session replay in the sankalp flow. Correct, and correctly justified: a page where someone types 'for my mother's cancer' must be protected structurally, not configured carefully.
- Scarcity numbers must be a live query against real capacity or must not render at all. The right rule, and the honest number genuinely exists.
- Ethics enforced in CI rather than in a values deck. The principle — ethics that live in documents decay at the first growth sprint — is correct even though the current lint's coverage is too narrow.
- The monthly public SLA report published from rite #1 including bad months. Committing before you have good numbers is the only version of this that means anything.
- The §0 urgent remediation itself. Identifying and demanding removal of the live fabricated stats, the hardcoded 'Live now' badge, and the invented 04:24 IST muhurat before publishing any of this is the correct order of operations, and the 'kept for good' → 'kept until you delete it' fix is exactly the right instinct.
- Honesty about the limits of the proof: that GPS is spoofable, that attestation can be defeated by an insider, and that the ledger proves a file existed unaltered and proves nothing about sincerity. Admitting the limit is what makes the rest believable — and refusing to sell cryptography as spiritual assurance is the same discipline as refusing to sell punya.
- The four precedent pillars in §1.2, especially the observation that the sankalpa formula's own grammar names desha-kala-gotra-nama and has never required the named person's presence. That is the strongest and most genuinely learned argument in the document.
- 'None of this is new. The camera is new.' Six words that do the work of a whole page, in the brand's register.
- 'Ask your own purohit — if he says this is not for you, he is right and we are not offended.' Deferring to the user's own religious authority is the strongest possible proof that Snanify is not trying to capture their faith. Fix the pronoun; keep the sentence.
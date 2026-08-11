# Snanify: Automation Architecture and Operations — designing to the line where the only human minutes are the rite

**The machine is buildable and cheap (infra is ~$2.80 per session, under 1% of revenue), the Naam Kshan should be solved with a button press rather than ASR, and the real ceiling is not software but ~50 contracted people at 9 ghat stations — but two published claims break on contact with a stopwatch: 51 sankalps at 45 seconds each does not fit inside a 48-minute Brahma Muhurat, and the live site runs an analytics script the ethics page swears does not exist.**

> Adversarial review: **needs-work**

## Key numbers

```
## The timing arithmetic that governs everything

The published ethics page commits to **"at least forty-five seconds of recitation for every named sankalp"** (`src/content/trust.ts:145`, and repeated at `:775`). The catalog commits to **"up to 51 sankalps"** per Samuhik session (`src/content/rituals.ts:212`). Brahma Muhurat is one muhurta = **48 minutes**. These three numbers are mutually exclusive.

Session time model: `total = 420s shared (opening + dip/jal-arpan + closing) + 35s per segment (slate + transition) + 45s per sankalp`, with segments capped at 11 (the privacy unit from `trust.ts:173`).

| Sankalps | Segments | Session length | Fits 48-min window? |
|---|---|---|---|
| 11 | 1 | 15.8 min | yes |
| 21 | 2 | 23.9 min | yes |
| 31 | 3 | 32.0 min | yes |
| 35 | 4 | 35.6 min | yes |
| 41 | 4 | 40.1 min | yes, with 8 min buffer |
| 45 | 5 | 43.7 min | yes, with 4 min buffer |
| **51** | **5** | **48.2 min** | **no — overruns with zero buffer** |

**The honest Brahma Muhurat cap is 41, not 51.**

## Physical ceiling of the current design

Stations per `muhurat.md`: Haridwar 3, Prayagraj 2, four others 1 each = **9 stations**.

- 9 stations × 41 sankalps = **369 sankalps per Brahma Muhurat per day**
- (`muhurat.md` currently states "one Brahma Muhurat across all six ghats seats 108 sankalps" — that was derived before the 45s/sankalp rule was published. 369 is the figure consistent with the shipped ethics page.)
- At 3 sellable windows/day: 9 × 41 × 3 × 30 = **33,210 sankalps/month ≈ 810 sessions/month**

**1,000 sessions/month is beyond the physical ceiling of six ghats and nine stations.** Getting there requires more stations, more ghats, or both — that is a recruiting problem, not an engineering one.

## Unit economics per session

ASSUMPTION: ₹88/USD. Officiant `max(₹1,800, 20% of segment gross)`, assistant ₹600/segment, PSP 3%, infra ₹250/session (computed below).

| Sankalps | Gross | Officiant | Assistant | Fees | Contribution |
|---|---|---|---|---|---|
| 3 | ₹2,904 | ₹1,800 | ₹600 | ₹87 | ₹167 (5.7%) |
| 5 | ₹4,840 | ₹1,800 | ₹600 | ₹145 | ₹2,045 (42.2%) |
| 9 | ₹8,712 | ₹1,800 | ₹600 | ₹261 | ₹5,801 (66.6%) |
| 11 | ₹10,648 | ₹2,130 | ₹600 | ₹319 | ₹7,349 (69.0%) |
| 31 | ₹30,008 | ₹6,059 | ₹1,800 | ₹900 | ₹20,999 (70.0%) |
| 41 | ₹39,688 | ₹8,043 | ₹2,400 | ₹1,191 | ₹27,804 (70.1%) |

The ₹1,800 floor binds below **9.3 sankalps per segment** (where 20% of gross = ₹1,800). Above ~11 per segment the margin structure is flat at ~70%, which is the whole point of the shared-session design: the marginal sankalp costs ₹193 in officiant share and ~₹34 in everything else, against ₹968 of revenue.

**Break-even fill.** Fixed monthly: 6 ghat-lead retainers at ₹8,000 = ₹48,000, plus ~₹15,000 platform = ₹63,000. At 30 sessions/month, contribution per session is `939n − 2,450`. Solving `30(939n − 2,450) ≥ 63,000` gives **n ≥ 4.85**. Five sankalps per session at one session per ghat per day covers the entire field and platform cost base. That is a far friendlier number than the 51-seat cap implies, and it is the number that should drive launch planning.

## Infrastructure cost per session (41 sankalps, 4 segments, ~40 min)

| Item | Basis | Cost |
|---|---|---|
| R2 storage, 24-month retention | 1.2 GB raw + 0.5 GB clips × $0.015/GB-mo × 24 | $0.61 |
| Forced alignment + ffmpeg (Modal CPU, preemptible) | 4 segments × ~$0.16 | $0.64 |
| ASR tripwire (Deepgram Nova-3 batch) | 40 min × $0.0043/min | $0.17 |
| Live stream input (Cloudflare Stream) | 40 min × $0.75/1,000 min | $0.03 |
| Live stream delivery | 41 viewers × 15 min × $1/1,000 min | $0.62 |
| Email (Resend, ~6 per sankalp) | 246 × $0.0009 | $0.22 |
| Patra render + sign | headless Chromium, ~10s | $0.02 |
| **Total** | | **≈ $2.31 (₹203)** |

Round to **₹250/session, $0.06 per sankalp, 0.5% of the $11 price.** Infrastructure is not a cost centre in this business and should never be optimised at the expense of trust.

## Ops burden (non-officiant human minutes)

| Activity | Min/session |
|---|---|
| Manifest print + collection | 5 |
| Name/transliteration spot check (after pushing Devanagari entry to the customer) | 2 |
| Roster exception handling (amortised, 1 in 20 sessions × 20 min) | 1 |
| Naam Kshan disputes (0.5/session × 3 min) | 1.5 |
| Support tickets (ASSUMPTION 3 per 100 sankalps × 4 min) | 5 |
| **Total HQ ops** | **~14.5 min/session** |

| Sessions/mo | Sankalps at 60% fill | Officiant-h (paid, the product) | Assistant-h (paid) | **HQ ops hours** |
|---|---|---|---|---|
| 10 | 246 | 13 | 12 | **2.4** |
| 100 | 2,460 | 133 | 125 | **24** |
| 810 (ceiling) | 19,900 | 1,080 | 1,013 | **196 ≈ 1.2 FTE** |

Ops scales **linearly**, entirely through the support and dispute lines. The rest — alignment, clipping, patra, email, verification, ledger — is O(1) in human time.

## Field headcount at the ceiling

810 sessions/mo ÷ 30 days ÷ 9 stations = 3 sessions/station/day, ~2 hours of water time per officiant per day. With the published dip cap, rest days, monsoon and illness cover: **~25-30 contracted officiants and ~25 assistants across 6 towns.** A 50-person field organisation is what 810 sessions/month means.
```

## Findings

**The live site mounts Vercel Web Analytics site-wide, while the published ethics page states no analytics script runs anywhere on the site, ever, and that exactly one third-party script exists in the entire product.**  
*high confidence.* VERIFIED in repo. src/components/RootShell.tsx:2 `import { Analytics } from "@vercel/analytics/next";` and :42 `<Analytics />`; package.json:12 `"@vercel/analytics": "^2.0.1"`. Contradicts src/content/trust.ts s8.tracking: "No analytics script, no advertising script, and no session-replay script runs anywhere on this site, ever" and "Exactly one third-party script exists anywhere in the product: the payment processor's, on the payment step alone."

**51 sankalps at the published 45-seconds-each minimum physically cannot fit inside Brahma Muhurat. The honest cap for a pre-dawn session is 41.**  
*high confidence.* VERIFIED arithmetic. Brahma muhurta = 48 min = 2880s. Model: 420s shared (opening + dip + closing) + 35s/segment + 45s/sankalp, segments capped at 11 per trust.ts:173. n=51 → 5 segments → 420 + 175 + 2295 = 2890s = 48.2 min, overrunning a 48-min window with zero buffer. n=41 → 2405s = 40.1 min, 8 min buffer. Per-sankalp minimum from src/content/trust.ts:145 and :775; cap of 51 from src/content/rituals.ts:212.

**The Naam Kshan should not be built on ASR. Sanskrit ASR is nowhere near good enough, and proper names are the worst category for any recogniser.**  
*high confidence.* VERIFIED. Best published Sanskrit WER is 15.42% via transfer learning on Vāksañcayaḥ (arXiv:2501.10024, Jan 2025) and 21.94% with SLP1/BPE encoding; Vedavani (arXiv:2506.00145, May 2025) is the first Vedic-poetry ASR corpus, 54h / 30,779 samples. Whisper's native timestamps vary by 100-400ms for the same tokens across model sizes (linto-ai/whisper-timestamped). Whisper-small scored 86.9% WER on Hindi FLEURS.

**Forced alignment with a known transcript — which you always have, because you wrote the manifest — is an entirely different and far more tractable problem than ASR, and is the correct machine layer.**  
*high confidence.* VERIFIED. torchaudio.pipelines.MMS_FA is a wav2vec2-based forced aligner trained on 23,000h across 1,100+ languages, taking uroman-romanised transcripts and emitting word-level spans with per-word confidence (PyTorch audio 2.9 multilingual forced alignment tutorial). MFA 3.0 reports mean boundary errors under 15ms on trained languages and ships a Hindi acoustic model. Hindi-English code-mixed alignment reaches 4.15ms mean error with matched training data (arXiv:2607.25581).

**The cheapest, most reliable Naam Kshan is a button, not a model: the camera assistant taps NEXT once per sankalp, producing ground-truth timestamps at zero marginal human cost because he is already present for the whole segment.**  
*medium confidence.* ASSUMPTION on error rate (I estimate ~95% usable taps, 300-800ms human latency, occasional double/missed taps), but the assistant is already contracted at ₹600/segment per docs/design/ethics.md §4.4, so the marginal human minutes are literally zero. Arithmetic: 41 sankalps × 1 tap = 41 taps over 40 minutes.

**Speaker diarisation is the wrong tool here and should not be in the pipeline. There is one speaker by design, and diarisation would add error rather than remove it.**  
*high confidence.* VERIFIED. pyannote.audio 3.1 reports ~11% DER on clean 2-speaker AMI, degrading to 15-19% on noisy/many-speaker audio, and 15-25% DER on challenging real-world data (picovoice.ai and pyannote.ai 2026 benchmarks). A public ghat at 4am with river noise, crowds and PA systems is worse than the 'noisy' condition in every one of those benchmarks.

**Cloudflare R2 is the correct archive because the deliverable is a video that gets downloaded, forwarded and re-downloaded by relatives — egress is unbounded and correlates with your happiest customers.**  
*high confidence.* VERIFIED pricing. R2: $0.015/GB-month standard, $0.01 infrequent access, Class A $4.50/M, Class B $0.36/M, and zero egress charges for all storage classes (developers.cloudflare.com/r2/pricing). Mux charges $0.015/GB-month storage plus delivery; S3 charges per-GB egress.

**Infrastructure is not a meaningful cost in this business: roughly $2.31 per 41-sankalp session, about 0.5% of gross. Every architectural decision should be made on reliability and trust, never on infra cost.**  
*high confidence.* VERIFIED arithmetic from published rates: R2 $0.015/GB-mo; Modal CPU $0.0000131/core-sec; Deepgram Nova-3 batch $0.0043/min; Cloudflare Stream Live $0.75/1,000 input min + $1/1,000 viewed min, $5/1,000 min stored; Resend ~$0.90/1,000 emails at 100k tier. Full breakdown in the numbers field.

**Five sankalps per session at one session per ghat per day covers all six ghat-lead retainers plus platform costs. The business does not need full sessions to survive; it needs them to be excellent.**  
*medium confidence.* VERIFIED arithmetic. Contribution per session at n sankalps (single segment, floor binding) = 968n − 1,800 − 600 − 29n − 50 = 939n − 2,450. Fixed monthly ₹63,000 (6 × ₹8,000 retainer + ~₹15,000 platform). 30(939n − 2,450) ≥ 63,000 → n ≥ 4.85. ASSUMPTION: ₹88/USD, ₹250/session infra.

**Sessions must never be rolled forward for low demand. The published failure grid has no row for it, and a customer who bought a named muhurat bought that muhurat. Economics are protected by how many sessions you open, not by cancelling the ones you sold.**  
*high confidence.* VERIFIED against src/content/trust.ts s7 rows: the only stated grounds for non-performance are ghat closure, unsafe water, officiant unavailability, and Snanify fault — every one a supply failure. Adding 'too few people booked' would be a new, unpublished failure mode on a page that says 'This is a table, not a discretion.'

**Offering a choice of time slots destroys session density and is the single most expensive product decision available. Sell one window per ghat per day; open a second only at 70% fill.**  
*medium confidence.* ASSUMPTION, but structural: demand split across k windows yields sessions averaging n/k sankalps, and the ₹1,800 officiant floor binds below 9.3 sankalps per segment. Splitting 20 daily sankalps across 3 windows produces three floor-bound sessions (₹5,400 officiant cost on ₹19,360 gross, 28%); concentrating them into one produces ₹3,872 on the same gross (20%).

**Cross-border money for an India-performed rite is an export of services: zero-rated with an LUT, 18% IGST without one, and it requires FIRC/eFIRC per transaction as proof of receipt in convertible foreign exchange.**  
*medium confidence.* VERIFIED. Export of services under IGST Act s.2(6) is zero-rated; the exporter files Form RFD-11 (LUT) to export without paying IGST, or pays 18% and reclaims. Razorpay auto-generates an eFIRC per international transaction — a concrete operational reason to prefer an Indian rail for the India-entity leg (razorpay.com/blog/gst-export-services-india-guide).

**RBI's PA-CB regime binds your payment provider, not you — but it culled the field, so verify in writing that your chosen provider holds export PA-CB authorisation before building against its API.**  
*medium confidence.* VERIFIED. RBI circular of 31 Oct 2023 brought all cross-border payment aggregators under PSO authorisation via the Payment & Settlement Systems Act 2007, categorised as export-only, import-only, or both, with existing operators required to apply by 30 Apr 2024. Net worth ₹15 crore at application, ₹25 crore by 31 Mar 2026.

**Competitor volume data suggests the demand is real and the average order value is far above $11 — VAMA booked ~800,000 orders for ₹19.5 crore in FY25, implying roughly ₹244 per order.**  
*medium confidence.* VERIFIED (reported figures). Entrackr: Vama operating revenue ₹19.5 crore FY25, up from ₹9.4 crore; company claims 800k+ orders and 300k+ paying customers. Sri Mandir (TechCrunch, Sept 2024): 1.2 million devotees performing online prayers/offerings across 70+ temples in 12 months, ~3.5M MAU including ~90,000 outside India. Arithmetic ₹19.5cr ÷ 800k = ₹244 is mine.

**Vercel now has the two primitives this pipeline needs natively: Workflows (GA, durable multi-step execution with checkpointing) and Queues (public beta since 27 Feb 2026, at-least-once messaging). Neither existed when this repo was scaffolded.**  
*high confidence.* VERIFIED. Vercel Workflows reached GA after an Oct 2025 beta, having processed 100M+ runs and 500M+ steps across 1,500+ customers; built on the open-source Workflow Development Kit, using the 'use workflow' directive to checkpoint each step. Vercel Queues entered public beta 27 Feb 2026 on all plans. Cron schedules have no per-project count limit.

**The catalog and the ethics page disagree on what a 'session' is, and the reconciliation matters: session (51, economic/scheduling unit) ≠ segment (11, recording/privacy/ledger unit).**  
*high confidence.* VERIFIED. src/content/rituals.ts:212 'Up to 51 sankalps' per Samuhik session; src/content/trust.ts:173 'A shared segment may carry up to eleven sankalps'; trust.ts:145 'a segment carrying eleven sankalps runs about nine minutes'. 11 × 45s = 495s ≈ 8.25 min, consistent. A 41-sankalp session is therefore 4 segments and 4 ledger entries, not one.

## Recommendations

- **[S] Remove @vercel/analytics from RootShell.tsx and package.json today, and add a CI check that fails the build if any package outside an explicit allowlist injects a client script.**  
  The published ethics page says no analytics script runs anywhere on the site, ever. It currently does. This is the first thing a hostile journalist finds with view-source, and it discredits every other claim on that page including the ones that are true. It is a two-line fix and it is the highest-value thing in this entire document.
- **[S] Change the published Samuhik cap from 51 to 41 for pre-dawn windows, or publish plainly that a full session runs from Brahma Muhurat into Pratah Sandhya. Print the derivation on the pricing page.**  
  51 × 45s plus overhead is 48.2 minutes inside a 48-minute muhurta. The 45-second minimum is the most quotable promise you have made and the one most likely to be checked with a stopwatch. 41 is also a shagun number, so nothing is lost aesthetically, and 'here is why 41' is a better story than 'up to 51'.
- **[L] Build the Naam Kshan as a four-layer pipeline with the assistant's NEXT tap as the primary source of truth, forced alignment as refinement, carrier-phrase template matching as an independent cross-check, and an honest excerpt-window fallback that never prints a fabricated second.**  
  Sanskrit ASR at 15-22% WER cannot locate personal names. A button press costs zero incremental human minutes because the assistant is already contracted and present. The fallback is the part that protects you: 'your name is spoken in this excerpt (02:05-03:10)' is true; a made-up '02:14' is the kind of thing that ends the company.
- **[M] Make Devanagari the primary name input, with live romanisation, TTS playback, and an optional 5-second voice recording from the customer that reaches the officiant as a QR on the manifest sheet.**  
  It moves transliteration QA from your staff to the customer at booking, where it is free and more accurate, and it simultaneously ships the feature your own adversarial review called the highest-value trust artefact the spec was missing. It is the only change that both reduces ops cost and increases trust.
- **[M] Sell a date and a ghat, never a time. Open exactly one session per ghat per day; open a second station only when the primary crosses 70% fill with more than 48 hours to go.**  
  Choice of window fragments demand across sessions that then sit under the ₹1,800 officiant floor. Supply must follow demand with headroom, never lead it. This single rule is worth more to the unit economics than any infrastructure decision in the stack.
- **[M] Ship a per-rite public status page reachable by a signed link with no account: sankalp received → sealed → written into the sheet → performed → uploaded → checked → your moment located → patra signed → sent, each with a real timestamp.**  
  'Where is my patra' and 'did it actually happen' are the two highest-volume ticket categories in this business, and both are answerable from data the system already holds. Every ticket category answerable from existing data must become a page, not a reply. This is the highest-ROI support artefact available.
- **[S] Make the manifest sheet and the on-camera slate the same physical object: one thermal-printed A5 sheet per segment, printed at T−6h, carrying rite codes, names in 18pt Devanagari, gotras, read-aloud flags, the date, the ghat and that day's drand anchor.**  
  The ghat is wet and pre-dawn. One paper artefact that the officiant reads from and holds to camera removes a device, a failure mode, and a step. It also means the freshness anchor is physically inseparable from the manifest, which is exactly the property the proof chain needs.
- **[L] Put the rite pipeline on Vercel Workflows (durable, crash-resumable, human-pause-capable), fan-out on Vercel Queues, time-triggered work only on Vercel Cron, and all ffmpeg/torch/PDF work on Modal preemptible CPU — not on Vercel Functions.**  
  Upload → validate → align → clip → sign → email is textbook durable execution with retries and a human-in-the-loop branch. A 280MB ffmpeg plus torch job is the wrong shape for a serverless function, and Vercel Sandbox bills CPU at 3× the Function rate for a workload that is neither untrusted nor interactive. Modal preemptible costs about $0.16 per segment.
- **[M] Neon Postgres with a CHECK constraint plus SELECT FOR UPDATE on seat capacity, and 10-minute TTL holds at checkout start. Never enforce capacity in application code.**  
  Kartik Purnima at Har Ki Pauri will sell out in minutes and application-level checks race. Overselling a muhurat is a failure with no good remedy in your published grid — you would have to tell someone their named hour was given away. A database constraint cannot race.
- **[S] Auto-refund on silence: when a supply failure forces roll-forward, present four one-click options with no default and no expiry pressure, and fully refund anyone who has not chosen within seven days.**  
  A silent default that keeps the money is precisely the dark pattern the ethics page bans elsewhere. Refund-by-default costs revenue and buys total defensibility, and it is the only version of roll-forward that is consistent with a page that says 'you never have to telephone us'.
- **[S] Pack segments by read-aloud flag first, then balance sizes: 23 sankalps become 8/8/7, never 11/11/1, and merge any singleton upward.**  
  A family that chose silence must never sit in a segment where someone else's illness is read out — that is the third-party data leak your own review called the single most serious defect. Balanced packing also minimises maximum exposure: 7 strangers hear your name instead of 10, at zero cost.
- **[M] Keep the canonical MP4 in R2 and hash that; use Cloudflare Stream only for playback and live. Publish a hash per rendition plus a signed manifest, and ship a known-good sample rite.**  
  The ledger must commit to bytes you control, not to a transcode a vendor may silently change. And the verifier that returns NO MATCH for an honest customer whose file came through WhatsApp manufactures the exact accusation it was built to pre-empt.
- **[S] Resend for transactional email now; migrate to SES with a dedicated IP past roughly 200,000 emails/month.**  
  At 100k emails Resend is ~$0.90/1,000 versus SES at $0.10/1,000. The crossover is worth about $250/month at 300k emails — real but not urgent. Migrate when the ops cost of owning DKIM/DMARC, bounce handling and Indian ISP reputation is cheaper than the difference, not before.
- **[M] Get written confirmation that your cross-border payment provider holds RBI export PA-CB authorisation, and file the GST LUT (Form RFD-11) before the first foreign rupee lands.**  
  RBI's 31 Oct 2023 circular culled the unauthorised cross-border aggregators. Building against an API that loses authorisation is a total outage of revenue with no engineering fix. And exporting services without an LUT means 18% IGST on everything, retroactively.
- **[S] Never let the word 'donation' or 'offering' near the checkout, and restructure dakshina as a disclosed increase to the officiant's segment fee rather than a pass-through you collect on his behalf.**  
  Foreign money for religious purposes framed as a contribution is FCRA territory, which is existential rather than expensive. A conduit for someone else's religious receipts is the risky shape; a commercial service fee that happens to be larger is not.
- **[S] Constrain the automated sankalp safety check so it can only append a resources block to an email the user was already receiving — never send a new message.**  
  The ethics page promises no human sees the text as a result of that check. An unsolicited crisis message on a false positive is worse than a support ticket: it tells someone a machine read their prayer about their mother, which is precisely the impression the whole section exists to prevent.

## Risks

- The 51-sankalp cap is falsifiable with a stopwatch. 51 × 45s plus opening, dip and closing is 48.2 minutes inside a 48-minute Brahma Muhurat. Publishing both numbers means the first person who times a full session catches you, and the 45-second promise is precisely the one people will time.
- @vercel/analytics is live on a site whose ethics page says no analytics script runs anywhere, ever. This is currently true of production and is trivially checkable from view-source. It is a small bug with a disproportionate blast radius, because it makes the rest of the page look like copy rather than commitment.
- The Naam Kshan is the product's central proof claim and the hardest thing in the build. If it depends on ASR it will fail — the best published Sanskrit WER is 15.42% and personal names are out-of-vocabulary by construction. Even with the tap-plus-alignment design, expect roughly 5% of sankalps to land in the fallback band at launch, before the model is tuned on your own audio.
- 1,000 sessions/month exceeds the physical ceiling of six ghats and nine stations (≈810/month at 41 per session across three daily windows). Growth past that is a recruiting and welfare problem across 50 field people in six towns, and no amount of software helps.
- An officiant using a Snanify device, a Snanify app, Snanify framing rules and Snanify-set timings, paid per segment, is functionally an employee under Indian labour law. PF/ESI and contractor classification exposure grows with headcount and is worst exactly when the business is working.
- Support cost scales linearly while everything else scales at O(1) in human time. At the ceiling that is ~200 hours/month of HQ ops, almost all of it tickets and disputes. If the rite status page and the customer-side Devanagari entry do not ship, the ticket rate does not fall and this becomes 2-3 FTE rather than 1.2.
- Upload bandwidth from the ghats is the least controllable dependency. At the ceiling each ghat pushes ~7-8 GB/day over consumer uplinks from six provincial towns, during a monsoon, and at Prayagraj during a Kumbh when the cellular network is saturated by millions of people. The local-recording-first architecture protects the rite; it does not protect the delivery SLA.
- Dual PSP (Razorpay INR/UPI plus Stripe global) doubles the reconciliation, refund and dispute surface, and the export-of-services GST treatment depends on FIRC evidence that only one of the two rails generates automatically. Getting this wrong is discovered at audit, years later, retroactively.
- The published 14-day no-questions refund on a completed rite is the right ethic and a chargeback-ratio asset, but it is also an underwriting conversation. 'Religious services' plus generous refunds plus cross-border card volume is a merchant profile that gets reviewed. Have that conversation before you build against an API, not after your first busy month.
- Everything above assumes ghat filming permission exists, which it currently does not for any of the six sites. It is a binary gate on the entire operation and no part of this architecture is worth building at a ghat that will not grant it.

---

## Snanify: the automation architecture

*Domain: automation and operations. What follows assumes the ethics page as published in `src/content/trust.ts` is binding, because it is. Where I think a line should move, I say so and price it.*

---

## 0. The line, restated precisely

"As little human interaction as possible" means: **the only human minutes in the loop are minutes a customer is paying for, or minutes that cannot be automated without lying.**

Here is the complete inventory of irreducible human minutes. Everything not on this list is machine work.

| Human | Minutes per session | Keep or remove |
|---|---|---|
| Officiant performing the rite | 60 at the water + 20 travel/prep | **Keep.** This is the product. |
| Assistant filming and tapping NEXT | 60 + 15 upload supervision | **Keep.** Argued below. |
| Ghat lead availability | ~2 h/ghat/month, amortised | Keep. Roster, not per-session. |
| Bereavement and distress cases | ~30 min/month per 100 sessions | **Keep, deliberately.** Never automate. |
| Sankalp break-glass (two approvals) | rare by design | Keep. Its cost is the point. |
| Officiant recruitment, contracting, welfare | lumpy | Keep. Not per-session. |
| Manifest print, spot-check, exceptions, disputes, tickets | ~14.5 | Attack this. It is the only linear term. |

**Why the assistant stays, and why it is not a violation of the line.** He is already contracted at ₹600/segment. He is required regardless, because the ethics page's framing rules — camera tight on the officiant and the water, never panning across bathers, recognisable third parties removed before publication — cannot be honoured by an unattended tripod at a public bathing ghat. Given that he is standing there for the whole segment holding the camera, having him tap a button once per sankalp costs **zero** incremental human minutes and converts the Naam Kshan from a machine-learning gamble into a deterministic fact. This is the best trade in the entire design.

**Where I would move the line the other way.** I would automate *less* in two places:

1. **The sankalp safety check.** The page promises "one automated safety check runs over the text. No person sees it as a result of that check." A system that then *sends a new message* on a false positive tells someone a machine read their prayer — the exact impression the section exists to prevent. Constrain it: the check may only **append a resources block to an email the user was already receiving**. Never a new send. Cost: near zero. Benefit: the promise survives its own implementation.

2. **The bereavement path.** The failure grid's "someone you named has died before the rite" row commits to a 90-day suppression and an explicitly non-proactive tarpan offer. Any automation that detects a death and acts on it is the automated death-anniversary campaign the page bans, wearing a different hat. Route these to a human, always. At 100 sessions/month that is roughly half an hour. Pay it.

---

## 1. Ordering

Self-serve end to end. Six screens, no human.

**1. Vessel.** Samuhik or Ekantik, with the "two ways a rite can be held" copy verbatim above the choice. Anushthan modules compose on top.

**2. Occasion and ghat — not a time.** The user picks a river/ghat and a date or occasion. The system assigns the window. This is the single most important scheduling decision in the product and it runs against product instinct, so here is the arithmetic:

Splitting 20 daily sankalps across three offered windows gives three sessions of ~7, all sitting under the ₹1,800 officiant floor: ₹5,400 of officiant cost on ₹19,360 of gross, 28%. Concentrating the same 20 into one session gives ₹3,872, 20%. **Choice of time costs you eight points of margin and buys the customer nothing they asked for.** A specific window is an Ekantik feature; that is what Ekantik is for.

Conveniently, the site already markets occasions rather than clock times, because the panchang source is unsettled. Keep that shape permanently.

**3. Sankalp capture.** The screen that matters.

- **Name field is Devanagari-primary.** Live romanised echo beneath it, a TTS playback button so the user *hears* how it will be read, and an optional 5-second recording of the user saying the name themselves. That recording becomes a QR on the manifest sheet; the assistant plays it to the officiant before the segment.
  - This is worth two separate things at once. It moves transliteration QA from your payroll to the customer, where it is free and more accurate. And it ships the feature your own adversarial review named as the highest-value missing trust artefact: *"For an Indian family this beats every hash in the document."* Automatic Latin→Devanagari transliteration is ~90-95% right and catastrophically wrong on the rest — Sneha vs Snehā, Krishnan vs Krishna, "K. S. Ramanathan". At 41 names per session that is 2-4 names a session needing a human eye, forever. Push it to the customer at booking and it disappears.
- **Gotra is per-name and nullable.** Data model: `names: [{ deva, latin, gotra: string|null, relationship, voiceNoteUrl? }]`. Null resolves to the customary Kashyapa gotra, with that stated at the point of leaving it blank rather than in a footnote. Per-name gotra is not a nicety — one gotra across six names is ritually wrong for any household with a married-in woman, an adopted child, or an inter-caste marriage.
- **Sankalp text**, 240 chars. No autocomplete, no suggestions, no session replay, no third-party script on this route. Enforce with CSP `script-src`, not with a settings page.
- **`readAloud` checkbox, unchecked**, carrying the exact disclosure sentence already drafted, plus the paired "delete my recording too" control.
- Third-party attestation for living relatives; guardianship affirmation for minors.

**4. Muhurat confirmation.** Mandatory dual clock. IST wall time at the ghat as primary, user-local as secondary, and an explicit date-shift sentence whenever the local calendar date differs. `.ics` attached, carrying the UTC instant.

Detect the timezone from `Intl.DateTimeFormat().resolvedOptions().timeZone`, but **let the user change it and store what they chose** — diaspora users routinely book from a laptop in one zone for a family in another, and silently assuming the browser is right is how someone misses their mother's rite by eleven hours.

Store UTC instants plus IANA zone ids only. Never a wall-clock time, never `+05:30`. Use `Temporal`.

**5. Payment.** Razorpay if the instrument is Indian, Stripe otherwise. This is the only page in the product with a third-party script, and it is named on the page, exactly as the ethics text now says.

**6. Post-purchase.** Sankalp seal (16 hex, grouped) shown immediately. Ledger publish within 60 minutes. Rite status page URL emailed as a signed link — **no account required**. An account is a ticket generator and a password reset flow; a signed link is neither.

---

## 2. Scheduling: how sessions form and fill

### 2.1 The core principle

**A session that is open is a promise.** Sessions are scheduled from the supply side, on forecast, and once a sankalp is sold into one, that session runs at any count ≥ 1. The published failure grid lists exactly four grounds for non-performance — ghat closed, water unsafe, officiant unavailable, Snanify's fault — and every one is a supply failure. "Not enough people booked" is not on that list and must never be added to it.

Economics are protected by **how many sessions you open**, never by cancelling ones you sold.

### 2.2 Session ≠ segment

Your two documents use these words differently and the reconciliation matters:

- **Session** — the scheduling and economic unit. One officiant, one muhurat window, one station, up to 41 sankalps (see §2.5).
- **Segment** — the recording, privacy and ledger unit. One continuous uncut take, up to 11 sankalps, one `LedgerEntry`, one `mediaSha256`.

A 41-sankalp session is **four segments and four ledger entries**, wrapped in a shared opening and closing. Write this down; every downstream component depends on it.

### 2.3 The algorithm

```
// cron: hourly — supply follows demand with 30% headroom
for ghat g, date d in [today, today + horizon(g,d)]:      // 90d regular, 180d parva
    primary = session(g, d, PRIMARY_WINDOW)
    ensure primary.state == OPEN                           // always exactly one

    if sold(primary) >= 0.70 * cap(primary)
       and (d - now) > 48h
       and roster.hasAvailableStation(g, d):
        open(session(g, d, next_window(g, d)))

// cron: every 5 min — the lock
for session s where now >= s.window.start - 6h and s.state == OPEN:
    s.state = LOCKED
    roster.assign(s)                       // officiant + assistant from pre-committed roster
    manifest = pack(s.sankalps)            // §2.4
    render(manifest) -> PDF -> ghat printer queue + capture-app sync
    email(s.sankalps, "written into tomorrow's sheet", manifest.excerpt)
```

Cutoffs, from `muhurat.md`: **Samuhik T−6h IST**, **Ekantik T−48h**. For a 04:24 muhurat that is a 22:24 cutoff the previous evening — late enough to be generous, early enough that nobody is transliterating names at 3am. Bookings arriving after the cutoff are shown the next window **before payment**, never silently moved.

### 2.4 Segment packing

```
pack(sankalps):
    aloud  = [s for s in sankalps if s.readAloud]
    silent = [s for s in sankalps if not s.readAloud]
    # A family that chose silence must never sit in a segment where
    # someone else's illness is read out. This is the third-party leak.
    segs = balanced_chunks(aloud, 11) + balanced_chunks(silent, 11)
    # balanced: n=23 -> [8,8,7], never [11,11,1]
    # merge any singleton upward: a segment of one inside a shared
    # session is both a privacy anomaly and a pricing anomaly.
    return renumber(segs)
```

Balanced packing is free and reduces maximum exposure: at 23 sankalps each family hears seven strangers instead of ten.

### 2.5 Capacity, derived not entered

`cap = f(window_length, segments, 45s_per_sankalp)`, never a hand-typed number.

| Sankalps | Segments | Length | Fits 48-min Brahma Muhurat |
|---|---|---|---|
| 11 | 1 | 15.8 min | yes |
| 31 | 3 | 32.0 min | yes |
| **41** | **4** | **40.1 min** | **yes, 8-min buffer** |
| 45 | 5 | 43.7 min | yes, 4-min buffer |
| 51 | 5 | 48.2 min | **no** |

Model: `420s shared (opening + dip/jal-arpan + closing) + 35s/segment (slate + transition) + 45s/sankalp`.

**Recommendation: publish 41 for pre-dawn windows.** It is a shagun number, it derives cleanly from a promise you already made, and "here is why 41" is a better page than "up to 51". Alternatively, publish that a full session runs from Brahma Muhurat into Pratah Sandhya — but publish *something*, because 51 and 45-seconds-each cannot both be true and the 45 seconds is the one people will time.

Note that `muhurat.md`'s "one Brahma Muhurat across all six ghats seats 108 sankalps" predates the 45-second commitment. With 9 stations at 41 each the honest figure is **369**. That is a better number and it is also a true one.

### 2.6 What happens at 3 sankalps

Nothing special. The session runs. One segment of three. The officiant receives the ₹1,800 floor. The ledger records `sankalpCount: 3`. Contribution is ₹167 — thin but positive.

**Publish this rule.** "A session runs whether three families or forty are in it, and the officiant is paid the same floor either way" is a sentence that costs nothing and does a great deal of work.

The scaling protection is that at 30 sessions/month you break even at **4.85 sankalps per session** against all six ghat retainers plus platform. Five. That is the number to plan launch against, not 41.

### 2.7 Roll-forward

```
on supply_failure(session s, reason r):
    assert r in {ghat_closed, water_unsafe, no_officiant, snanify_fault}
    assert r != low_demand                         # structurally impossible

    alts = panchang.equivalent(s.occasion, s.ghat, horizon=90d)
           # [same ghat next equivalent, same river other ghat, other river same occasion]

    for sankalp in s:
        email(4 one-click options + refund; no default; no expiry pressure)

    at T + 7d:
        any sankalp that has not chosen -> automatic full refund
```

**Auto-refund on silence.** A default that keeps the money is the dark pattern the ethics page bans elsewhere, wearing a different hat. This costs revenue and buys the entire posture.

---

## 3. Fulfilment

### 3.1 What the officiant actually receives

**One thermal-printed A5 sheet per segment, printed at T−6h.** It is simultaneously the manifest and the on-camera slate — one artefact, one failure mode.

```
┌───────────────────────────────────────────────┐
│ HAR KI PAURI · 24 NOV 2026 · SEG 2 of 4       │
│ RITE CODES  7F3A22C1 · 90DEB4A6 · …           │
│ DAILY ANCHOR  drand rd 5,214,880 · a3f91c02   │
├───────────────────────────────────────────────┤
│ 1  सुनीता शर्मा        काश्यप   [QR ♪]         │
│ 2  रमेश कुमार अय्यर    भारद्वाज  [QR ♪]  ‹ALOUD›│
│ …                                             │
└───────────────────────────────────────────────┘
```

Names at 18pt+ Devanagari. Each row carries a QR linking to the customer's own recording of the name — the assistant plays it before the segment. The header is the slate: rite codes, date, ghat, and the day's drand anchor, which is why it must be printed **that day** and cannot be pre-printed. That is a feature, not a constraint.

Paper because the ghat is wet, pre-dawn, and a phone screen at 4:15am with wet hands is a failure mode you do not need.

### 3.2 Device and capture

Company-owned mid-range Android (~₹18,000), one per station plus one spare per ghat. Android over iOS at a quarter the cost, with adequate StrongBox attestation.

- Records locally, always, regardless of connectivity: 1080p30 H.264 + AAC 48kHz mono at ~4 Mbps ≈ **30 MB/min**. A 4-segment session ≈ 1.2 GB.
- Simultaneously pushes WHIP to Cloudflare Stream Live at 1.5 Mbps *if bandwidth allows*. Degrades to audio-only, then to nothing, and **never touches the local recording**. Stream ingest is free; the recording is the deliverable and the stream is the courtesy. This is already your architectural principle and it is the right one.
- **Tap track.** The assistant taps NEXT once per sankalp. Each tap appends `{segmentId, sankalpSeq, monotonicNs, wallClockUtc, mediaPts}` to a local append-only file, signed with the device key at segment close.
- Media signed at capture with an ES256 key in StrongBox. GPS fix, geofence result, GPS-derived UTC, device UTC all recorded in the manifest.
- Upload on wifi at the lodge afterward: resumable multipart to R2 via presigned URLs. 1.2 GB over a 5 Mbps uplink ≈ 32 minutes, fully background, no human waiting.

### 3.3 Ingest validation (machine gate, blocks publication)

Unchanged from your spec and correct: PTS continuity, scene-cut scan (`select='gt(scene,0.4)'`, >0.6 REJECT, 0.4-0.6 HOLD), audio splice detection, duration floor, slate OCR matched against the booking, per-GOP hashes in the manifest. Add one: **tap count must equal manifest count**, else HOLD.

---

## 4. The Naam Kshan

This is the hardest thing in the build and the centre of the product's credibility. Four layers.

### Layer 0 — Deterministic tap track (primary)

The assistant's NEXT taps. Human reaction latency, typically 300-800ms late, occasional double or missed taps. Cost ₹0. **This is the only layer that requires no machine learning and it is the layer that actually ships.**

### Layer 1 — Structural prior

The manifest fixes the order and the count. Any estimate must be monotonically increasing and produce exactly N boundaries in a T-second segment, with a strong near-uniform prior because every sankalp is ≥45 seconds. This turns open-ended search into a heavily constrained optimisation.

### Layer 2 — Carrier-phrase repetition detection (independent cross-check)

The sankalp vakya is a **fixed liturgical formula repeated once per sankalp** — the same words, the same speaker, the same microphone, the same acoustic environment, N times in a row. That is an ideal query-by-example target. Take the first repetition (bounded by the first tap), embed it with a self-supervised speech model, and run segmental DTW across the rest of the segment.

The key property: **this never has to recognise a name.** It counts and locates repeats of a template it extracted from the same recording. Same-speaker, same-session template matching is dramatically more robust than open-vocabulary recognition and is completely independent of Sanskrit ASR quality.

Honest caveat: query-by-example spoken term detection is established technique, but I found no published benchmark on ghat-recorded Sanskrit recitation. Treat the accuracy as **ASSUMPTION** until measured on your own first fifty segments. Instrument it from day one.

### Layer 3 — Forced alignment on the name (refinement)

`torchaudio.pipelines.MMS_FA` — wav2vec2 trained on 23,000 hours across 1,100+ languages — with `uroman` romanisation of the Devanagari name. Emits word-level spans with per-word confidence.

The crucial point: **you supply the exact transcript, because you wrote the manifest.** Forced alignment against a known transcript is a fundamentally easier and more accurate task than recognition. MFA 3.0 reports mean boundary errors under 15ms on trained languages and ships a Hindi acoustic model; Hindi-English code-mixed alignment reaches 4.15ms with matched training data. On ghat audio expect an order of magnitude worse. **±0.5s is more than enough** for a clip that opens eight seconds early.

### Layer 4 — Agreement gate and the honest fallback

```
if   |tap − align|     <= 2.0s  ->  publish align,      HIGH
elif |carrier − align| <= 2.0s  ->  publish align,      HIGH
elif tap present                ->  publish tap − 2.0s, MEDIUM
else                            ->  FALLBACK
```

**The fallback is the part most designs get wrong.** Do not print a fabricated second. Give the family a clip bounded by the two neighbouring high-confidence anchors, and change one line of copy:

- HIGH/MEDIUM: *"Your name is spoken at 02:14."*
- FALLBACK: *"Your name is spoken in this excerpt (02:05-03:10)."*

Both are true. Only one is precise. The whole posture of the ethics page makes the imprecise-but-true version cheap to say; a fabricated second is the kind of thing that ends the company.

Add a one-tap **"that was not my name"** on the rite page, creating a ticket with the 40-second excerpt attached. Budget ~3 minutes per dispute; expect well under 1% of sankalps once the customer-recorded pronunciation feature ships.

### What NOT to use

**Never build this on ASR.** Best published Sanskrit WER is 15.42% (transfer learning on Vāksañcayaḥ, Jan 2025), 21.94% on an earlier SLP1/BPE setup; Vedavani (May 2025) is the first Vedic-poetry corpus at 54 hours. Whisper's Hindi is far behind its English, and its native timestamps drift 100-400ms between model sizes on identical input. Proper names are out-of-vocabulary by definition, and Indian personal names across twenty-plus language traditions are the worst case of the worst case.

ASR has exactly one legitimate role here: a **tripwire**. Run Deepgram Nova-3 batch ($0.0043/min) to confirm speech is present, the length is roughly right, and the repetition count is roughly right. At 40 min/session that is $0.17.

**Never use speaker diarisation.** There is one speaker by design. pyannote 3.1 reports ~11% DER clean, 15-19% noisy, 15-25% on hard real-world audio — and a public ghat at 4am with river noise, crowds and temple PA is beyond any of those conditions. Diarisation would add error, not remove it. Its only defensible use is a *negative* check — flag if substantial second-speaker speech occurs inside a recitation window — and even that is better done with VAD plus energy.

### Compute cost

MMS_FA on CPU runs faster than real time on a 10-minute segment. Modal CPU at $0.0000131/core-sec: 4 cores × 300s ≈ **$0.016/segment**; at a generous 10× still $0.16. No GPU needed. Use preemptible instances — retries are free because it is queued work. Watch Modal's multipliers: region 1.5-1.75×, non-preemptible 3×, Sandbox CPU 3× the Function rate.

---

## 5. Delivery

- **Clip generation.** Each family's excerpt: `nameSpokenAt − 8s` through end of their recitation plus the dip. ffmpeg stream-copy where GOP boundaries allow, re-encode otherwise. Automated face-blur pass over everyone except the officiant and named assistants.
- **Patra.** React → HTML → PDF/A-3 + 2048px PNG via headless Chromium in the same worker. PAdES-signed, detached `.sig` downloadable, signing certificate published. QR to `/verify/:riteCode`. The mandatory closing line, both languages, non-removable.
- **Latency.** T+90 min p50, T+6h p95. Consistent with the 6-hour commitment already published for the degraded case.
- **Email.** Resend now (free to 3k/mo, ~$0.90/1,000 at the 100k tier); SES past ~200k/mo at $0.10/1,000. The crossover is worth ~$250/month at 300k emails — real, not urgent. Migrate when owning DKIM/DMARC, bounce handling and Indian ISP reputation is cheaper than the difference.
- **Archive.** Cloudflare R2. $0.015/GB-month standard, $0.01 infrequent access, **zero egress on every class**. This is the decisive infra decision after the database, because the deliverable is a video that gets downloaded, forwarded, and re-downloaded by relatives — egress is unbounded and correlates precisely with your happiest customers. S3 and Mux both charge for exactly that traffic.
  - 1.7 GB/session (raw + clips). At 100 sessions/month, 24-month steady state ≈ 4.1 TB ≈ **$61/month**. At 810/month ≈ 33 TB ≈ **$495/month**. Rounding error.
- **Playback.** Cloudflare Stream for live and for the friction-free player. But **keep the canonical MP4 in R2 and hash that** — the ledger must commit to bytes you control, not to a transcode a vendor may silently change.
- **Verification.** Publish a hash per rendition plus a signed manifest, ship a known-good sample rite, and put the blunt WhatsApp-recompression line on `/verify`. Operationally: `/verify` must be an edge-cached route backed by a read replica or Edge Config, because it gets hit in bursts (one booking → thirty WhatsApp forwards → thirty verify hits) and it must never be down when a sceptic tries it. Keep the ledger endpoints CORS-open so third parties can build independent verifiers, and say publicly that you want them to.

---

## 6. Support: what generates tickets, and how to design them away

**The rule: every ticket category answerable from data the system already holds must become a page, not a reply.**

| Driver | Volume | Design that removes it |
|---|---|---|
| "When is my rite in my time?" | high | Dual clock + `.ics` + date-shift sentence. The `.ics` alone is the single highest-leverage ticket killer in the product. |
| "Where is my patra / did it happen?" | high | **The rite status page.** See below. |
| "The video won't verify" | medium | Per-rendition hashes + the blunt line + the sample rite. |
| "My name was said wrong" | medium | Customer-recorded pronunciation at booking + one-tap dispute → free re-recitation, no argument. |
| "I want a refund" | medium | One button, no reason field. A refund handled by a button is not a ticket. |
| "I missed the stream" | medium | Say in the T−15m email that the recording is the deliverable. |
| Payment failed | medium | Dual PSP + retry + "your seat is held for 10 minutes". |
| "Can you do X" (not sold) | low | The published refusal list. |
| Bereavement / distress | low, high-cost | **Human. Always.** |

### The rite status page

One signed URL, no account, showing the actual pipeline stage with real timestamps:

```
sankalp received  ✓ 14 Nov 09:12
sealed            ✓ 14 Nov 09:14   7F3A · 22C1 · 90DE · B4A6
written into the sheet ✓ 23 Nov 22:24
rite performed    ✓ 24 Nov 04:31 IST
recording uploaded ✓ 24 Nov 06:02
checked           ✓ 24 Nov 06:09
your moment located ✓ 02:14
patra signed      ✓ 24 Nov 06:11
sent              ✓ 24 Nov 06:12
```

This kills the two highest-volume categories at once, and it is the transparency posture applied to operations rather than to ethics. Build it early.

---

## 7. The stack on Vercel

| Layer | Choice | Justification against the alternative |
|---|---|---|
| Framework | Next.js 16 App Router (already in repo) | Already here. PPR/ISR keeps marketing and `/verify` edge-cacheable while booking stays dynamic. Remix/Astro buy nothing and cost a rewrite. |
| Hosting | Vercel, Fluid Compute | Already linked. Fluid's per-request concurrency matters because booking is I/O-bound on PSP and DB calls. |
| Database | **Neon Postgres** | Seat capacity is a transactional invariant needing a `CHECK` constraint plus `SELECT … FOR UPDATE`, with 10-min TTL holds at checkout. Application-level capacity checks race, and overselling a named muhurat has no good remedy in your published grid. Also gives range types for windows and an append-only ledger table with a trigger. Neon over Supabase because you need none of Supabase's auth/storage/realtime and do want branching; over RDS because there is no ops team. **Not** a KV store. |
| Auth | Passwordless magic link, or no account until after purchase | An account is a ticket generator and a password-reset flow. A signed link in the email is one dependency and zero client script — and Clerk/Auth0 are third-party scripts on a site that fought hard to have exactly one. |
| Payments | **Razorpay (INR/UPI) + Stripe (rest of world)** | UPI has ~₹0 MDR and is the only way ₹101 is viable — a card at ₹101 loses ~2% plus a fixed fee. Stripe for USD/EUR/GBP. Two PSPs is real complexity, but one global PSP makes the entire Bharat Dar ladder uneconomic. Razorpay additionally auto-generates eFIRC per international transaction, which is the GST evidence you need. |
| Durable pipeline | **Vercel Workflows** (GA) | Upload → validate → align → clip → sign → email is textbook durable execution: multi-step, crash-resumable, with a human-in-the-loop branch. The `"use workflow"` directive checkpoints each step so a crash resumes rather than restarts. Inngest/QStash are fine but are one more vendor on a platform that now has this natively. Do **not** poll this from cron. |
| Fan-out | **Vercel Queues** (public beta, Feb 2026) | At-least-once messaging for per-sankalp work (clip, patra, email) fanned out from a session. |
| Cron | **Vercel Cron** | Only for genuinely time-triggered work: calendar generation, session opening, T−6h lock, T−24h and T−60m emails, nightly panchang three-way verification, retention/deletion jobs. Anything user-triggered belongs in the queue. No per-project schedule limit. |
| Heavy compute | **Modal, preemptible CPU — not Vercel** | A 5-minute ffmpeg + torch job on a 300 MB file is the wrong shape for a serverless function. Vercel Sandbox bills CPU at 3× the Function rate and is designed for untrusted code, which this is not. Modal: ~$0.16/segment. |
| Object storage | **Cloudflare R2** | Zero egress. See §5. |
| Video | **Cloudflare Stream** for live (free WHIP ingest, $0.75/1,000 input min, $1/1,000 viewed min, $5/1,000 min stored) and playback | Canonical MP4 stays in R2 regardless. |
| Email | Resend → SES past ~200k/mo | See §5. |
| Panchang | In-house Swiss Ephemeris, professional licence (CHF 750) | Already decided and correct: you need instants not display strings, and the AGPL network clause on `sweph` ≥2.10.1 would otherwise compel publishing your booking stack. |
| Freshness anchor | drand quicknet | Already decided. |
| Analytics | **None.** Server-side aggregate counters in Postgres | The ethics page forbids it. **`@vercel/analytics` is currently mounted in `src/components/RootShell.tsx:42` and is a dependency in `package.json:12`. Remove both before launch.** Add a CI check that fails the build if any package outside an explicit allowlist injects a client script — the same discipline as `copy-lint.ts`, applied to the dependency tree. |

---

## 8. What breaks first

### At 10 sessions/month (~250 sankalps, ~$2,700 gross)

**Nothing technical breaks.** Everything sits inside free tiers. What breaks is **demand**: you cannot fill 41 seats, most sessions run at 2-6 sankalps, and the ₹1,800 officiant floor takes 55-90% of gross. This is expected and must be *planned for*, not fixed. The correct response is to open fewer sessions, not to discount.

Second: **the panchang engine is the only thing that must be perfect on day one.** A wrong date is public, unfixable, and exactly the failure your audience is primed to notice.

Third: **ghat permission is binary** and gates everything. No permission, no ghat, no revenue from that water.

### At 100 sessions/month (~2,500 sankalps, ~$27,000 gross)

1. **Transliteration and name QA**, if you did not push Devanagari entry to the customer. 2,500 names/month × 5% = 125 human name-checks. This is the first thing that becomes a job.
2. **Alignment fallbacks.** ~5% of 2,500 = 125/month needing a decision. Which is precisely why the fallback must be *automatic and honest* (an excerpt window) rather than *queued for a human*. Get this wrong and it is a second job.
3. **Roster fragility.** With ~6 officiants, one illness cancels a day, and the published grid then obliges four options and a named substitute before the rite — which requires a bench you may not have.
4. **Payment mix.** Dual-rail reconciliation, refunds across two PSPs, and FIRC/eFIRC collection for export treatment. If foreign money reached an Indian entity without an LUT on file, you now owe 18% IGST on all of it.

### At 810-1,000 sessions/month (~20,000-25,000 sankalps, ~$220-270k gross)

1. **People, at the ghats — and this is the real ceiling.** 9 stations × 41 × 3 windows × 30 days = 33,210 sankalps/month is the physical maximum of the current six-ghat design, ≈810 sessions. Reaching it needs ~25-30 contracted officiants and ~25 assistants across six towns, with monsoon closures, the published dip cap, insurance, and Indian labour-law classification exposure (an officiant on your device, your app, your framing rules and your timings, paid per segment, is functionally an employee — PF/ESI). **The binding constraint is a 50-person field organisation, and none of it is on Vercel.**
2. **Upload bandwidth from the ghats.** ~7-8 GB/day per ghat over consumer uplinks in provincial towns, during a monsoon, and at Prayagraj during a Kumbh when the cellular network is saturated by millions of people. Local-recording-first protects the *rite*; it does not protect the delivery SLA. Budget a fixed broadband line and a bonded-cellular fallback per ghat.
3. **Support linearity.** ~750 tickets/month at 3 per 100 sankalps. Everything else is O(1) in human time; this is the only term that grows. If the status page and customer-side Devanagari entry ship, ~1.2 FTE. If they do not, 2-3.
4. **Ledger read path.** One verification burst per booking forwarded to relatives. Behind the CDN with a hash-chained NDJSON export, it never breaks. In front of Postgres, it does.
5. **Chargeback ratio and PSP underwriting.** 25,000 orders/month with a 14-day no-questions refund. The generous policy actually *protects* the ratio, because refunds pre-empt chargebacks — but "religious services + generous refunds + cross-border card volume" is a merchant profile that gets reviewed. Have that conversation before you build against an API.

---

## 9. Money flow, because it constrains the architecture

Not my domain, but it determines which rails you build on, so:

- Foreign customer paying for a rite performed in India by an Indian officiant is an **export of services** if the supplier is in India and the recipient outside. Zero-rated under GST with an LUT (Form RFD-11); 18% IGST without one. You need FIRC/eFIRC per transaction as proof of receipt in convertible foreign exchange. **Razorpay auto-generates eFIRC per international transaction** — a concrete operational reason to prefer that rail for the India-entity leg.
- **RBI's PA-CB circular (31 Oct 2023)** brought all cross-border payment aggregators under PSO authorisation, categorised export-only / import-only / both, with ₹15 crore net worth at application and ₹25 crore by 31 Mar 2026. **This binds your provider, not you** — you are collecting for your own services. The operational consequence is real, though: verify in writing that your provider actually holds export PA-CB authorisation, because unauthorised ones were required to stop and building against an API that loses authorisation is a total revenue outage with no engineering fix.
- **Never let "donation" or "offering" near the checkout.** Foreign money for religious purposes framed as a contribution is FCRA territory, which is existential rather than merely expensive. The riskiest shape in the current design is the **100% dakshina pass-through**, which looks like collecting on someone else's religious account. Restructure it as a disclosed increase to the officiant's segment fee — same money, same transparency, ordinary commercial character.

---

## 10. The three things to do this week

1. **Delete `@vercel/analytics`.** `src/components/RootShell.tsx:2` and `:42`, `package.json:12`. Add the CI dependency check. This is a two-line fix protecting the credibility of a thousand-line ethics page.
2. **Decide 41 vs 51**, and publish the derivation. The 45-second promise is your most quotable and most testable claim; make the cap consistent with it before anyone times a session.
3. **Prototype the tap track and MMS_FA on twenty minutes of real recitation** — any purohit, any phone, any quiet room. You will learn more about whether the Naam Kshan is buildable in one afternoon of real audio than in a month of specification, and everything downstream (the patra copy, the clip generator, the fallback wording, the dispute flow) depends on the answer.

---

### Sources

- [PyTorch/torchaudio multilingual forced alignment (MMS_FA)](https://docs.pytorch.org/audio/2.9.0/tutorials/forced_alignment_for_multilingual_data_tutorial.html)
- [Montreal Forced Aligner and the state of speech-to-text alignment in 2026](https://arxiv.org/html/2606.18466v1)
- [Evaluation of forced alignment of code-mixed speech: Hindi-English](https://arxiv.org/abs/2607.25581v1)
- [Automatic Speech Recognition for Sanskrit with Transfer Learning](https://arxiv.org/html/2501.10024)
- [Vedavani: A Benchmark Corpus for ASR on Vedic Sanskrit Poetry](https://arxiv.org/abs/2506.00145)
- [whisper-timestamped (timestamp variance note)](https://github.com/linto-ai/whisper-timestamped)
- [State of Speaker Diarization in 2026: pyannote vs Falcon](https://picovoice.ai/blog/state-of-speaker-diarization/)
- [Cloudflare R2 pricing](https://developers.cloudflare.com/r2/pricing)
- [Mux Video pricing](https://www.mux.com/docs/pricing/video)
- [Cloudflare Stream Live](https://blog.cloudflare.com/stream-live/)
- [Modal pricing](https://modal.com/pricing)
- [Deepgram pricing](https://deepgram.com/pricing)
- [Resend pricing](https://resend.com/docs/knowledge-base/what-is-resend-pricing)
- [Amazon SES pricing](https://aws.amazon.com/ses/pricing/)
- [Vercel Queues](https://vercel.com/docs/queues)
- [Vercel Workflows](https://vercel.com/docs/workflows)
- [A new programming model for durable execution](https://vercel.com/blog/a-new-programming-model-for-durable-execution)
- [RBI circular on Cross Border Payment Aggregators (Trilegal)](https://trilegal.com/knowledge_repository/rbis-circular-on-cross-border-payment-aggregators/)
- [Cross-Border Payment Aggregator licensing regime (Cyril Amarchand)](https://www.cyrilshroff.com/wp-content/uploads/2023/12/Client-Alert-PA-CB-Guidelines-0412-FIG.pdf)
- [GST on Export of Services in India](https://razorpay.com/blog/gst-export-services-india-guide/)
- [Sri Mandir scale and priest operations (TechCrunch)](https://techcrunch.com/2024/09/09/sri-mandir-is-on-a-quest-to-digitize-indias-devotional-journey/)
- [Vama FY25 revenue (Entrackr)](https://entrackr.com/fintrackr/virtual-spiritual-app-vama-doubles-its-revenue-in-fy25-9459668)

---

## Adversarial review

**Verdict:** needs-work

### Wrong or unverified

- THE HEADLINE BREAK-EVEN IS FALSE BY THE DOCUMENT'S OWN TABLE. The unit-economics table charges ₹250/session infra (verified: at n=3, 2904−1800−600−87−250=₹167, matching the stated ₹167). The break-even formula silently switches to ₹50: '968n − 1800 − 600 − 29n − 50 = 939n − 2,450'. With the document's own ₹250, break-even is n ≥ 5.06, not 4.85. Check it against their own table: 30 sessions × ₹2,045 contribution at n=5 = ₹61,350, against ₹63,000 fixed. Five sankalps does NOT cover the cost base. The single most quotable line in the piece ('Five sankalps per session covers the entire field and platform cost base') is arithmetically false against the table two paragraphs above it, and it is false because of an undisclosed 5x change to one input.
- PSP AT 3% IS WRONG FOR THIS BUSINESS AND WRONG IN THE DIRECTION THAT FLATTERS. Razorpay charges 3% + 18% GST on the fee for international cards = 3.54%, before the FX conversion spread; Razorpay's own blog puts all-in cross-border cost near 5%, and industry international MDR at 3-4.5% pre-conversion (razorpay.com/blog/cross-border-fees-explained). Worse, the model assumes a pure percentage rail with NO fixed per-transaction component. At a $11 ASP a Stripe-style $0.30 fixed fee alone is 2.7%. For a business whose entire thesis is a sub-$15 order, per-transaction fee structure is the most consequential input in the model and it is set to the most optimistic possible value with no source. At 5% effective, break-even goes to n ≥ 5.17; combined with the ₹250 infra correction the 'five sankalps' claim needs six.
- 'ONE SESSION PER GHAT PER DAY' AND '30 SESSIONS/MONTH' DIFFER BY 6x, AND THE CHEAPER ONE WAS USED. The break-even solves at 30 sessions/month. One session per ghat per day across six ghats is 180 sessions/month. The recommendations explicitly say 'Open exactly one session per ghat per day.' Under that rule, 180 sessions each carry ₹2,400 of floor-bound officiant+assistant cost whether or not anyone books, so monthly sankalp volume needed to break even rises from ~150 to ~575. The document picked the operating model that produces the friendly number and recommended the other one. This is the most consequential internal inconsistency after the ₹50/₹250 swap.
- THE ₹8,043 OFFICIANT FIGURE AT n=41 MATCHES NO INTEGER SEGMENT PACKING. Officiant is max(₹1,800, 20% of segment gross) per segment. 41 as 11/11/11/8 gives ₹8,188.80. 41 balanced as 11/10/10/10 — which is what the document's OWN packing recommendation ('23 become 8/8/7, never 11/11/1') requires — gives ₹7,937.60. There is no partition of 41 into ≤11 segments producing ₹8,043 (it implies a segment of 8.75 sankalps). Small in rupees, large in a document whose entire authority rests on 'I checked the arithmetic.'
- '~95% USABLE TAPS' IS QUOTED PER-TAP AND USED AS IF IT WERE PER-SESSION. Taps are sequential and a missed or doubled tap shifts every subsequent sankalp in that segment. At 95% per tap, an 11-sankalp segment is clean 0.95^11 = 56.9% of the time — 43% of segments carry at least one bad Naam Kshan. A 41-sankalp session is clean 0.95^41 = 12.2% of the time. The risks section then states 'expect roughly 5% of sankalps to land in the fallback band,' which is irreconcilable with the assumption feeding it unless every bad tap is independently detectable and recoverable — a capability the design never specifies. The tap-as-primary-source recommendation may still be right, but the reliability case for it as written does not survive being multiplied out.
- THE GST ANALYSIS IS CONFIDENTLY WRONG-SHAPED AND MARKED 'VERIFIED'. Two provisions that decide this question are never mentioned. (1) IGST Act s.13(5): for 'organisation of a cultural... event, or a celebration... or similar events,' place of supply is where the event is ACTUALLY HELD. A rite organised and held at an Indian ghat plausibly lands here, which makes it NOT an export, which makes the LUT irrelevant and 18% IGST payable on worldwide revenue (taxinformation.cbic.gov.in, IGST s.13; taxtmi.com/manuals?id=2481). (2) Notification 12/2017-CT(R) Entry 13(a) exempts 'services by a person by way of conduct of any religious ceremony' outright — which would mean 0% but with input tax credit blocked, and would turn on whether Snanify is the conductor or an aggregator charging a taxable technology/arrangement fee (cbic-gst.gov.in Notification12-CGST). The spread between these readings is 0% vs 18% of ALL revenue on a product with a $11 ASP. Presenting 'export of services: zero-rated with an LUT' as VERIFIED when the two most relevant provisions point elsewhere is exactly the regulatory hand-waving that sinks companies. This needs an advance ruling, not a Razorpay blog post as its citation.
- THE VAMA COMPARABLE IS CITED SELECTIVELY, AND THE OMITTED HALF IS THE HALF THAT MATTERS. Same Entrackr report: Vama lost ₹12 crore in FY25 on ₹19.5 crore revenue, and marketing was ₹13.93 crore — 40% of total expenses and 71% of revenue (entrackr.com/fintrackr/virtual-spiritual-app-vama-doubles-its-revenue-in-fy25-9459668). That is ~₹174 of marketing per order against the ₹244 AOV the analysis computes. The closest public comparable in this exact category spends 71 paise of marketing per rupee of revenue and loses money at 800k orders. Citing its volume as proof 'the demand is real' while dropping its loss and its CAC is the single most misleading move in the document.
- THE ₹244 AOV IS A UNIT MISMATCH. ₹19.5 crore is FY25 operating revenue; '8L+ orders' and '3L+ paying customers' are cumulative milestones announced at an Aug 2025 press conference, not FY25 flow. Dividing a one-year revenue by a lifetime order count is not an AOV and should not be used to argue 'average order value is far above $11.'
- 'THE LIVE SITE MOUNTS VERCEL WEB ANALYTICS... TRIVIALLY CHECKABLE FROM VIEW-SOURCE' — the finding is correct but the mechanism stated is not. I fetched https://www.snanify.com/ : the initial HTML contains no 'insights' string. The script is injected client-side; the reference lives in chunk /_next/static/immutable/chunks/2kp6yxjia--89.js and https://www.snanify.com/_vercel/insights/script.js returns HTTP 200 on production. So the breach is real and shipping, but it is found in the network tab or the bundle, not view-source. Fix the sentence before anyone checks it and concludes the reviewer did not.
- '24-MONTH RETENTION' CONTRADICTS THE PUBLISHED PROMISE THE DOCUMENT CLAIMS TO DESIGN AROUND. trust.ts:279-281 sets 24 months for names/gotra but Recordings to 'kept until you delete them' — indefinite by default. The $0.61 storage line amortises a 24-month liability that the site has promised is perpetual. In absolute terms it stays small (at the 810-session ceiling, ~1.4 TB/month accreting, roughly $250/month of new perpetual cost each month), but it is a modelling error of type rather than size: a one-time charge standing in for an unbounded one, in the one document whose selling point is that it checks numbers.
- THE OFFICIANT PAY RATES ARE MARKED PLACEHOLDER IN THE SOURCE AND PRESENTED HERE AS COSTS. ethics.md:413 '₹1,800 ... PLACEHOLDER pending market check'; :860 'Officiant pay rates (₹1,800 / ₹600 / ₹8,000 / ₹4,000) are proposed, not market-tested'; trust.ts:189 publishes that the figures 'have not yet been tested against what purohits at these ghats actually earn.' Every margin number in the document rests on untested inputs. ₹88/USD and ₹250 infra are dutifully labelled ASSUMPTION; the three inputs that actually drive the 70% margin are not.
- THE DAKSHINA RECOMMENDATION BREAKS A LIVE PUBLISHED PROMISE AND DOES NOT ADMIT IT. 'Restructure dakshina as a disclosed increase to the officiant's segment fee rather than a pass-through you collect on his behalf' contradicts trust.ts:194 ('Dakshina: all of it reaches him, none of it reaches us'), trust.ts:1177, and ethics.md:418 (' 100% to the officiant... shown as a separate line, ₹0 to Snanify'). The recommendation may well be right on FCRA grounds — but it is a retraction of shipped copy, presented as a neutral restructuring, in a document that correctly excoriates the analytics breach for exactly this class of gap. Also note the FCRA framing overstates the risk: consideration received in the ordinary course of business for services is carved out of 'foreign contribution', so a disclosed service fee is likely fine as-is; the sharper unaddressed risk is that collecting and remitting someone else's money is the shape that attracts RBI payment-aggregator escrow/nodal obligations.
- 'THE PHYSICAL CEILING IS 9 STATIONS × 41' TAKES ONE PARAMETER FROM muhurat.md AND OVERRIDES ANOTHER WITHOUT SAYING SO. The same section that supplies 'Haridwar 3, Prayagraj 2, others 1' also derives 12 seats per ceremony and one 30-minute ceremony per Brahma Muhurat (muhurat.md:1016-1025). The analysis keeps the station counts and replaces 12 with 41, then reports 369/day and 810 sessions/month as 'the physical ceiling of the current design.' Under the repo's own model the pre-dawn ceiling is 108, which is exactly the number the analysis dismisses as stale. Pick one model and say why. Separately, '3 sellable windows/day' is asserted, not derived — Brahma, Abhijit and Godhuli are each short windows with their own veto rules, and the ceiling assumes 30 sellable days a month with zero loss to monsoon, flood, Kumbh crowd control or ghat closure, even as the staffing paragraph invokes 'monsoon and illness cover' for the same period.
- THE 45s-VS-DIARISATION NOISE ARGUMENT IS APPLIED ASYMMETRICALLY. Diarisation is rejected because 'a public ghat at 4am with river noise, crowds and PA systems is worse than the noisy condition in every one of those benchmarks' — correct. But MMS_FA and MFA are wav2vec2/GMM-HMM acoustic models whose alignment degrades under precisely the same SNR conditions, and the cited MFA '<15ms mean boundary error' and the 4.15ms code-mixed figure are studio/read-speech results. Applying a clean-audio benchmark to the forced aligner while applying a noise discount to the diariser is the reviewer's thumb on the scale. The 15.42% Sanskrit WER (arXiv:2501.10024) I verified; the alignment-accuracy figures I could not, and arXiv:2607.25581 should be re-checked before it is quoted to anyone.
- 'INFRASTRUCTURE IS ~$2.31/SESSION' ASSUMES 1.0 VIEWERS PER SANKALP. '41 viewers × 15 min' for a product sold to diaspora families whose entire emotional proposition is relatives watching together. At a still-modest 5 viewers per sankalp for the full 40 minutes, Cloudflare Stream delivery alone is 8,200 min × $1/1,000 = $8.20 — more than triple the entire quoted session total. The conclusion (infra is immaterial) survives; the number does not, and it is the number in the headline.

### Missing

- NO CAC, NO CONVERSION RATE, NO PAYBACK — in a document that concludes what the business needs to survive. 'The business does not need full sessions to survive' is a survival claim derived from a gross-margin equation with zero customer acquisition cost in it. The one comparable the document cites spends ~₹174/order on marketing against a ₹244 AOV. Add that line and 'five sankalps per session' stops being break-even and becomes a structural loss. Either scope the claim explicitly to contribution margin, or put a CAC line in it.
- NO RE-PERFORMANCE COST, DESPITE THE ETHICS PAGE MANDATING IT. trust.ts:145: 'A segment that fails is not published. It is performed again.' A failed splice check, a dropped uplink, a bad slate, a missed tap sequence all trigger a re-take with full officiant and assistant cost and zero incremental revenue. At 4am, on a river, on mobile uplink, the re-take rate is not zero, and by the document's own tap arithmetic (43% of segments carry a bad tap) it could be substantial. There is no failure-rate line, no reserve, and no sensitivity on it anywhere in the cost model.
- NO GHAT-AUTHORITY PERMISSION LAYER. The ceiling is declared 'a recruiting problem, not an engineering one.' It is also a permissions problem. Har Ki Pauri's Brahmakund and ghats are managed by the Ganga Sabha, which has previously intervened over film content shot at those ghats; Prayagraj is under the Mela Authority during Magh/Kumbh; the others sit under municipal and temple bodies. Daily commercial livestreaming from three simultaneous stations at Har Ki Pauri is a negotiated licence, not a hiring plan, and it is the most likely single point of failure in the entire supply story. Zero mentions.
- NO DPDP ACT 2023 AND NO GDPR, IN A PRODUCT BUILT ON SANKALP TEXT. Sankalp free-text routinely contains a named third party's illness, death or misfortune — special-category health data under GDPR Art 9 for the UK/EU diaspora that is a core segment, and personal data of a data principal who never consented. The recommended automated 'sankalp safety check' is automated processing of that text. India's DPDP Act brings consent notice, data-fiduciary duties, grievance officer and cross-border rules. The document handles this territory carefully at the ethics level and never once names the statutes that govern it.
- NO WHATSAPP, IN AN INDIA-FIRST PRODUCT. Six emails per sankalp is the entire messaging model. Indian customers and their relatives live on WhatsApp; delivery of the Naam Kshan link to an uncle in Kanpur by email is a fiction. WhatsApp Business API is per-conversation billed and is the one line item that would meaningfully move the ₹250/session infra figure — plausibly doubling it — and it is the channel most likely to carry the 'where is my patra' traffic the status-page recommendation is designed to absorb.
- THE SHARPEST CONTRADICTION IN THE REPO IS THE ONE NOT FOUND. rituals.ts:252 publishes 'Where 51 comes from': 'A name and a gotra take about EIGHT SECONDS to read. Fifty-one of them is roughly seven minutes of reading inside a session of forty.' The same site's ethics page publishes 'at least FORTY-FIVE SECONDS of recitation for every named sankalp' (trust.ts:145, :775). Same product, same public site, 5.6x apart — and rituals.ts:230 repeats 'about 8 seconds per name in a shared session.' The analysis treats 45s as settled and tests it only against the Brahma Muhurat window. The real defect is that the site publishes two irreconcilable per-name durations, one of which is presented as a derivation ('the cap is derived from the guarantee, not chosen because the number is auspicious'). Whichever number survives, one of two pieces of live copy is false, and 'here is how we derived it' copy that is derived from the wrong constant is worse than no derivation. This belongs alongside the analytics finding as a same-day fix.
- NO TDS / CONTRACTOR-CLASSIFICATION / GST-REGISTRATION TREATMENT FOR THE FIELD ORGANISATION. Fifty contracted people across six towns paid per segment means s.194C withholding, PAN collection, quarterly returns, permanent-establishment questions if any entity is offshore, and the risk that a full-time-equivalent 'contractor' on a monthly retainer plus per-segment fees is reclassified as an employee. The document sizes the field org at 50 people and never prices its compliance.
- NO REFUND, CHARGEBACK OR FX-SETTLEMENT LOSS LINE. The document recommends auto-refund-on-silence within 7 days — correctly — and then never charges the model for it. Cross-border cards on a religious purchase to an Indian merchant are an elevated-chargeback profile, and refunded transactions typically forfeit the PSP fee. Zero reserve.
- NO ANSWER TO THE QUESTION THE REPO ITSELF FLAGS AS OPEN. ethics.md:1268: 'Is the rite performed when no one books, i.e. is the rite happens at a real place at a real hour contingent on sales?' The analysis correctly forbids rolling sessions forward for low demand but never states whether a zero-booking session still runs. Under 'one session per ghat per day' plus the ₹2,400 floor, that answer sets the monthly loss floor, and it is the exact hinge between the 30-session and 180-session models.

### Must survive

- THE ANALYTICS FINDING IS THE BEST THING IN THE DOCUMENT AND IT IS CORRECT. I independently confirmed it end to end: RootShell.tsx:2 imports @vercel/analytics/next and :42 renders <Analytics />; package.json:12 carries the dependency; the string _vercel/insights/script.js ships in production chunk 2kp6yxjia--89.js; and https://www.snanify.com/_vercel/insights/script.js returns HTTP 200. Against trust.ts:291 ('No analytics script... runs anywhere on this site, ever') and :292 ('Exactly one third-party script exists anywhere in the product'), plus the file-header comment at trust.ts:15 calling the 'zero third-party scripts' claim absolute. Two-line fix, and the recommended CI allowlist that fails the build on any client-script-injecting package is the right generalisation — a policy that does not fail on code already in the repo is not a policy. Correct only in the mechanism it names for finding it (see wrong).
- REJECTING ASR FOR THE NAAM KSHAN IS THE RIGHT CALL, ON CORRECTLY CITED EVIDENCE. arXiv:2501.10024's 15.42% Sanskrit WER via Whisper transfer learning on Vāksañcayaḥ is real and I verified it. The reasoning that follows is sound: proper names are out-of-vocabulary by construction and are the worst possible target class for a recogniser, so the headline WER understates the failure rate on exactly the tokens the product depends on. Forced alignment against a known manifest is the right reframing of the problem, and the recommendation is stronger than its own evidence.
- THE FALLBACK RULE IS THE MOST IMPORTANT SENTENCE IN THE DOCUMENT. 'Your name is spoken in this excerpt (02:05-03:10)' is true; a fabricated '02:14' is the kind of thing that ends the company. A product whose entire claim is verifiability must never emit a synthetic timestamp, and building the honest-window fallback as a first-class output rather than an error path is correct design. Keep it verbatim.
- THE SESSION-VS-SEGMENT RECONCILIATION IS A REAL AND USEFUL DISTINCTION. rituals.ts:212 caps a session at 51; trust.ts:173 caps a segment at 11; trust.ts:145 says eleven sankalps runs about nine minutes (11 x 45s = 8.25 min, consistent). Naming session as the economic/scheduling unit and segment as the recording/privacy/ledger unit is the right model, and the consequence — a large session is four ledger entries, not one — is the sort of thing that is very expensive to discover after the ledger is public.
- BALANCED SEGMENT PACKING BY READ-ALOUD FLAG IS CORRECT AND CHEAP. Sorting silent from read-aloud sankalps before balancing sizes prevents a family that chose silence from sitting in a segment where a stranger's illness is read out — a third-party data exposure, not a UX preference. And 8/8/7 over 11/11/1 lowers maximum exposure at literally zero cost. Right on both the ethics and the arithmetic.
- THE DATABASE-CONSTRAINT-NOT-APPLICATION-CODE RULE ON SEAT CAPACITY IS RIGHT, AND THE JUSTIFICATION IS THE RIGHT ONE. Overselling a named muhurat has no remedy in the published failure grid — you would have to tell someone their hour was given away, and trust.ts s7 offers no row for it. Deriving the operational requirement from what the published grid CANNOT absorb is exactly the reasoning discipline the rest of the document should have used on GST and on the 45-second promise.
- REFUSING TO ADD 'TOO FEW PEOPLE BOOKED' TO THE FAILURE GRID IS THE RIGHT LINE. Verified against trust.ts s7: every published ground for non-performance is a supply failure. Adding a demand-side cancellation to a page that says 'This is a table, not a discretion' would convert the most credible page on the site into marketing. And protecting economics by how many sessions you OPEN rather than which ones you cancel is the correct place to absorb the pressure.
- THE INFRASTRUCTURE CONCLUSION SURVIVES ITS OWN ERRORS. Even correcting viewership 5x and storage to perpetual, infra stays low single-digit dollars per session against a ₹39,688 gross at full fill. The derived instruction — make every architectural decision on reliability and trust, never on infra cost — is the correct operating principle and is worth more than the precision of the $2.31.
- R2 FOR THE ARCHIVE, ON THE RIGHT REASON. Zero egress on a deliverable that gets downloaded, forwarded and re-downloaded by relatives, where egress correlates with your happiest customers, is the correct read of the workload. The follow-on — hash the canonical MP4 you control, not a vendor transcode that may silently change, publish a hash per rendition, and ship a known-good sample rite — closes the exact hole where a verifier returning NO MATCH for an honest customer manufactures the accusation it exists to pre-empt.
- THE PER-RITE PUBLIC STATUS PAGE IS THE HIGHEST-ROI ITEM IN THE RECOMMENDATIONS. 'Where is my patra' and 'did it actually happen' are the two ticket categories that scale linearly with volume, both are answerable from data the system already holds, and the general rule stated — every ticket category answerable from existing data becomes a page, not a reply — is the only idea here that actually delivers the owner's 'as little human interaction as possible' without touching the rite.
- THE MANIFEST SHEET AND ON-CAMERA SLATE AS ONE PHYSICAL OBJECT IS A GENUINELY GOOD OPERATIONAL INSIGHT. A wet pre-dawn ghat is a hostile environment for a device. One thermal-printed A5 sheet that the officiant reads from AND holds to camera removes a device, a failure mode and a step, and it makes the daily randomness-beacon anchor physically inseparable from the manifest — which is precisely the property the freshness proof needs. Cheap, concrete, and derived from the physical setting rather than from a diagram.
- DEVANAGARI-FIRST NAME ENTRY WITH LIVE ROMANISATION, TTS PLAYBACK AND AN OPTIONAL CUSTOMER VOICE CLIP ON THE MANIFEST QR. This is the one recommendation that simultaneously lowers ops cost and raises trust, by moving transliteration QA to the person who actually knows how their mother's name is pronounced, at the moment they are already paying attention. It should be near the top of the build order, not the middle.
- CONSTRAINING THE SANKALP SAFETY CHECK TO APPEND-ONLY, NEVER SEND-NEW. An unsolicited crisis message on a false positive tells a grieving person that a machine read their prayer about their mother — worse than the ticket it was meant to prevent, and a direct breach of the promise that no human sees the text as a result of that check. Exactly right.
- THE RBI PA-CB FACTS ARE ACCURATE AND THE OPERATIONAL INSTRUCTION IS THE RIGHT ONE. The 31 Oct 2023 circular, the export/import/both categorisation, the 30 Apr 2024 application deadline and the ₹15 crore / ₹25 crore-by-31-Mar-2026 net worth thresholds all check out. 'Get it in writing before you build against the API' is the correct response to a regime that culled the field, and this finding is under-confident at 'medium' — unlike the GST one next to it, which is over-confident.
- VERCEL WORKFLOWS AND QUEUES ARE REAL AND THE DATES ARE RIGHT. Queues entered public beta 27 Feb 2026 (vercel.com/changelog/vercel-queues-now-in-public-beta); Workflows went GA in Apr 2026 after an Oct 2025 beta. Durable execution with checkpointing and a human-in-the-loop branch is genuinely the right shape for upload -> validate -> align -> clip -> sign -> email, and keeping ffmpeg/torch off serverless functions and on Modal preemptible CPU is correct (Modal's $0.0000131/core-sec Functions rate verified, with the caveat that Sandboxes bill ~3x that and non-preemptible is 3x base — the document gets this distinction right where most people get it wrong).
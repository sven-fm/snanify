# Digital Snan: category, manifesto and the full rewrite map

**Snanify is a digital snan: at an hour the panchang names, you sit with the live, measured state of a sacred river in India and make your sankalp yourself, wherever in the world you are.**

## 0. What I verified, and what I could not

**Verified this session**
- The Central Water Commission publishes **River Water Level (Telemetry, Hourly)** and **River Discharge (Telemetry, Hourly)** datasets on the National Water Data Portal (nwdp.nwic.gov.in), hosted on CKAN, available as **CSV and API**. The water level dataset page showed *last updated 11 August 2026, 06:35 UTC*, so it is genuinely live, not an archive. Rivers named in the dataset scope include Godavari, Cauvery, Narmada, Mahanadi, Krishna and others. Rainfall telemetry (hourly) exists too.
- Source: [River Water Level (Telemetry, Hourly), CWC](https://nwdp.nwic.gov.in/dataset/river-water-level-telemetry-hourly-central-water-commission-cwc), [National Water Data Portal](https://nwdp.nwic.gov.in/en/), [River Discharge (Telemetry, Hourly), CWC](https://www.nwdp.nwic.gov.in/dataset/river-discharge-telemetry-hourly-central-water-commission-cwc)

**Not verified, do not ship as fact until checked**
- **Licence and terms of reuse.** No licence statement was visible on the dataset page. Contact given: helpdesk-nwic@gov.in, +91-011-20863687. Get written confirmation of commercial reuse and attribution wording before a single number is displayed. This is the one item that can kill the mechanic.
- **cwc.gov.in/ffm_dashboard** returned HTTP 401 to automated fetch. Its existence and content are unconfirmed by me.
- **Whether a gauge station exists near each of the six waters.** Har Ki Pauri (Haridwar), Sangam (Prayagraj), Vishram Ghat (Mathura), Ram Kund (Nashik), Ram Ghat (Ujjain), Talakaveri. Ganga, Yamuna and Godavari almost certainly have nearby CWC stations. **Shipra at Ujjain and Talakaveri very likely do not.** Design for that, see §4.
- **Water temperature.** Only level, discharge and rainfall are confirmed. **Do not promise temperature anywhere.** Cut it from the pitch.
- The exact textual source and standard wording of the Ganga-invocation verse used in the manifesto (§3). Cite a named edition before publishing.
- Any diaspora population statistic. My copy deliberately contains none.

---

## 1. Positioning

**The one sentence, for a stranger**

> Snanify is a digital snan: at an hour the panchang names, you sit with the live, measured state of a sacred river in India and make your sankalp yourself, wherever in the world you are.

**The category**

| | English | Hindi |
|---|---|---|
| Category name | **digital snan** (lowercase, generic, we own it by being the ones who defined it) | **डिजिटल स्नान** |
| Category descriptor | a live-water practice | सजीव जल साधना |
| The product | Snanify | स्नानिफ़ाई |

Do not capitalise "digital snan" as a brandable proper noun. A category you own is a category everyone else is allowed to use your definition of. Snanify is the first digital snan; the phrase should be free to spread.

**Named product concepts** (these replace the dead ones one for one)

| New | Devanagari | What it is | Replaces |
|---|---|---|---|
| **Nadi Spandan** | नदी स्पंदन | The river's pulse. The live gauge reading driving the whole site: level, flow, trend, station name, reading time. | the live stream |
| **Jal Kshan** | जल क्षण | The water-moment. The exact minute you sat, and the river's exact reading at that minute, from a named CWC station. Printed on the patra. | Naam Kshan |
| **Sankalp Patra** | संकल्प पत्र | Unchanged name. Now records *your* sitting, not somebody else's performance. | itself, rewritten |
| **Nitya / Parva / Smaran** | नित्य / पर्व / स्मरण | The three-tier ladder. See §5. | the 9-rite catalog, Snan Kosh, samuhik/ekantik |

**Taglines**

- Primary: **The river is real. The hour is real. The distance is the only thing we changed.** / **नदी सच्ची है। घड़ी सच्ची है। हमने केवल दूरी बदली है।**
- Short, for the hero and the OG card: **Snan, wherever you stand.** / **जहाँ आप हैं, वहीं स्नान।**
- The owner's line, kept verbatim as a pull quote because it is the best line in the deck: **Our servers are in the river.** / **हमारे सर्वर नदी में हैं।**

**Why "our servers are in the river" is literally defensible, and must be built that way**

It stops being a joke the moment the number on the screen is the number the Government of India measured this hour. So the rule for engineering is absolute: **no loops, no stock footage, no simulated rise and fall, no generative anything.** If the gauge is silent, the page says the gauge is silent and prints the last good reading with its timestamp. A single faked ripple destroys the entire positioning, because the honesty of the water is the only thing the product actually sells.

---

## 2. Who this is for, and who it is not for

Pick, hard, all three of these and nobody else:

1. **Diaspora who cannot get back on the calendar's schedule.** Not "Indians abroad" in general. Specifically: the person whose tithi arrives on a Tuesday in Frankfurt, who has three weeks of leave a year and a shraddh that falls in the middle of none of them.
2. **People in India for whom the ghat is unreachable, not far.** Old knees have kept more people from the water than distance ever has. A night on a train and thirty wet steps is a wall.
3. **People who want the practice without the institution.** No intermediary, no queue, no one deciding whether their gotra qualifies them, no counter to hand a name across.

**Explicitly not for**, and say so on the page, at the top, in bold:

- Anyone who can get to the water. **Go.** This is not a competitor to a pilgrimage and it loses that comparison every time. Saying this first is what makes everything else believable.
- Anyone who wants a guaranteed outcome. We sell none.
- Anyone who holds that a rite is valid only when a qualified man performs it at the tirth on your behalf. That is a coherent position. It is simply a position this product is not built for. Write it down calmly and stop arguing.

Writing item three into the manifesto is what makes the haters not the audience. They are not refuted, they are **excused**. You cannot be outraged by a product that already agreed you are not its customer.

---

## 3. The manifesto page, structure

Route: **`/manifesto`** (301 from `/ethics`). Nav label: "Manifesto" / "घोषणा". Ten sections, letterpress numerals 01 to 10, same TOC pattern as the old Ethics page so the component survives.

| # | Section | Function |
|---|---|---|
| 01 | The plain statement | What it is, in five lines. No priest, no ghat, no performance. |
| 02 | Our servers are in the river | The mechanic, stated as a specification rather than a slogan. The proudest section on the site. |
| 03 | The oldest argument for this is not ours | The Ganga-invocation verse, which invites seven rivers into whatever water is in front of you. The tradition already ships a protocol for making a distant river present. We built a better instrument for it. |
| 04 | What a digital snan is not | Confident, itemised, unhedged. Four items. |
| 05 | "You cannot wash sins over wifi" | The attack, answered head on, with humour. |
| 06 | Who this is for | The three audiences, named. |
| 07 | Who this is not for | Including "if you can go, go." |
| 08 | What we will never say | The surviving never-list, trimmed of the dead items. |
| 09 | What is actually running | Gauge stations, panchang method, audio provenance, no generative anything, what we do with your sankalp. |
| 10 | Ask someone whose judgement you trust | Kept from the old page, nearly unchanged, because it is the single most disarming paragraph on the site. |

Full finished copy for 01 to 07, EN and HI, is in the `copy` field. Sections 08 to 10 are edits of surviving trust.ts blocks, mapped in §6.

---

## 4. The product, in one page

**The free surface (this is the growth engine, build it first)**

- **`/live`**, new route. Six waters, six live readings, one page, no account, no wall. Level, flow, trend arrow, station name, reading time, distance from station to ghat, link to the CWC source. Ambient river audio, muted by default. Today's tithi and the next named muhurat, in IST and the viewer's zone.
- Every `/rivers/[river]` page gets the same live block at the top.
- `/kumbh` becomes the live Simhastha page for Nashik and Trimbakeshwar 2027 to 2028. The Godavari runs through the confirmed CWC dataset scope. A free, live, bilingual, correctly-dated Kumbh water page is the largest organic traffic asset this company will ever have, and it is one page.

**The sit itself**

1. Choose a water and an hour. Muhurat and panchang machinery already exists and is unaffected.
2. Write the sankalp. Name, optional gotra, your own words. Nothing is suggested to you, no AI writes it.
3. Sit. The screen carries the live reading, the river audio, the tithi, and the words of the sankalp in Devanagari and Latin. A minute of stillness, then the sankalp, then the invocation verse. Six to nine minutes.
4. The Jal Kshan is captured: your minute, the station's reading at that minute, the tithi.
5. The Sankalp Patra is issued to a permanent unlisted page. `/verify` confirms it and links to the public CWC record so anyone can check the water reading independently.

Near-zero human operations: no scheduling, no officiant, no video, no support queue by design, no refund arguments (see the failure table rewrite).

**The gauge-distance problem, solved honestly**

Some of the six will have no nearby station. **Never round this away.** Each water carries an explicit provenance line:

- Best case: `Ganga, Haridwar. CWC gauge at Haridwar, at the ghat. Read 04:00 IST.`
- Distant gauge: `Shipra, Ujjain. Nearest published gauge: [station], [n] km downstream on the [river]. Read 04:00 IST.`
- No gauge: `Talakaveri. The source has no telemetry station. This water carries the Kaveri's reading at [station], the first gauge downstream, and the day's rainfall on Brahmagiri.` If neither exists, the page says the water has no live reading and offers panchang and audio only, and says that plainly.

The credibility of the honest case is worth more than the polish of the fake one, and it is the same argument the old site made about permissions. Keep that habit; it was the best thing about the old copy.

---

## 5. Pricing, shaped for $20k/month profit

Delete the entire nine-rite catalog, both vessels, the 51-cap, the 45-second floor, Snan Kosh and the officiant share note. Three lines, two ladders. Keep the Vishwa Dar / Bharat Dar dual-pricing policy exactly as written; it is true, it is still right, and it is one of the best-argued blocks in the repo.

| Line | Devanagari | Shape | Vishwa Dar | Bharat Dar | What it is |
|---|---|---|---|---|---|
| **Nitya** | नित्य | Subscription, monthly or annual | $4.99 / mo, $49 / yr | ₹149 / mo, ₹1,499 / yr | All six waters, live. Sit as often as you like. Muhurat alerts. Full audio. Every patra kept. |
| **Parva** | पर्व | One time | $11 | ₹199 | One named sitting on one occasion, with a keepsake Sankalp Patra. The gift SKU and the entry point. |
| **Smaran** | स्मरण | Annual | $51 | ₹999 | A remembrance year: the tithi anchored once, a reminder only if you asked for one, a sitting each year and a permanent page. |

**The arithmetic, and it should be printed internally, not on the site:** at roughly 85 percent gross margin after payment fees and hosting, $20,000 of monthly profit needs about $24,000 of MRR. That is **5,000 Nitya subscribers at $4.99**, or a mix of 3,000 subscribers and 900 Parva sittings a month. Five thousand paying subscribers, worldwide, bilingual, in a category with no competitor, is a small number. Every design decision follows from that: free live layer for reach, one-tap subscribe, no operations, no support surface.

Remove from the site: officiant pay formula, dakshina, the 20 percent share note, the Snan Kosh refund mechanic, the "why prices went up in 2026" block.

---

## 6. The rewrite map, file by file

Legend: **DELETE** = remove the export or key entirely. **REWRITE** = key survives, contents replaced. **KEEP** = ships as is.

### src/content/trust.ts (1,606 lines)

| Key | Claim | Verdict |
|---|---|---|
| `ETHICS_MAIL` | ethics@snanify.com | KEEP, rename export to `CONTACT_MAIL`. The address must exist. |
| `trustNav.ethics` | "Our position" | REWRITE to "Manifesto" / "घोषणा" |
| `ethicsContent` | whole export | DELETE, replace with `manifestoContent` |
| `ethics.s1` | "engages a qualified officiant to perform a snan-sankalp at a named ghat" | FALSE. DELETE, replaced by manifesto 01. |
| `ethics.s2` | yajaman/purohit separation as the precedent | FALSE framing. There is no purohit. REWRITE as manifesto 03: the invocation verse, manasa puja, japa at home, twenty years of streamed darshan. |
| `ethics.s3` | "what is performed is the sankalp, by the officiant, in your name" | FALSE. REWRITE as manifesto 04. Keep "if you can go, go" verbatim; it is the best sentence on the old site. |
| `ethics.s4` items 1 to 11 | sins, moksha, punya, equal to bathing, merit plans, restless ancestors, dosha, outcomes, replacing your own rite, endorsement, clean water, purified body, last muhurat | KEEP all. Still true, still binding. |
| `ethics.s4` item "That a rite happened when it did not" | presupposes a rite | REWRITE to "That anything was performed on your behalf. Nothing is. Nobody is at the ghat." |
| `ethics.s4` item on generative footage | KEEP, strengthen: no generative video, no synthetic voice, **and no simulated river data.** |
| `ethics.s4` items on the dead, on threats, on quoting your sankalp, on selling data | KEEP verbatim |
| `ethics.s5` all five proof steps: sankalp seal, ghat slate, one continuous take, ledger, verifier | ALL FALSE. DELETE. Replace with a three-step "How you know the river is real": named station, timestamped reading, public CWC archive anyone can open. |
| `ethics.s5.caveats`, `s5.density` | recompression, insider signatures, eleven sankalps per segment | DELETE. No recordings, no segments. |
| `ethics.s6` entire section: officiants, pay table, ₹1,800, dakshina, refusal bounds, welfare, immersion caps, insurance | ALL FALSE. DELETE the section. Preserve one idea, that the price is not a merit ladder, into the pricing note. |
| `ethics.s7` rows: stream dropped, rite did not happen, ghat closed, officiant absent, name said wrongly, cancellation window because "the officiant is scheduled and paid" | ALL FALSE. DELETE. REWRITE the table with four honest rows: the gauge station went quiet; the audio failed; you cancelled a subscription; you want your money back. |
| `ethics.s7.note` monthly numbers: scheduled, performed, degraded, officiant share | REWRITE: sittings held, patras issued, gauge uptime by station, refunds, complaints, government demands. Keep the monthly-publication habit. |
| `ethics.s8` gotra optional, Kashyapa default, per-name gotra, nobody browses sankalps, two approvals, automated safety check, no training, third-party names, retention table, erasure by key destruction, tracking | KEEP nearly whole. This is the strongest 200 lines in the repo and none of it depended on a priest. |
| `ethics.s8.sankalp` "the officiant does not read it aloud", "part of a permanent recording" | FALSE. REWRITE: your sankalp is displayed to you and to no one else, and is never spoken aloud by anyone anywhere. |
| `ethics.s8.retention` "Recordings, kept until you delete them" | DELETE row. Replace with "Your patras, kept until you delete them." |
| `ethics.s9` "things we will not do to you" | KEEP all thirteen items. Only edits: "no countdown on a rite" becomes "no countdown on a muhurat"; drop "dakshina" from the pre-ticked-box item; keep "never a word against making the journey yourself" as the closing line, it is now more true than before. |
| `ethics.s10` rows: filming permission, people at the ghat, the six waters audit, the officiants, what we pay, the review panel | ALL MOOT. DELETE six of eight rows. |
| `ethics.s10` panchang row, money/tax/jurisdiction row | KEEP. Add two new rows: CWC licence and attribution terms; audio provenance and field-recordist credits. |
| `ethics.s11` "ask someone whose judgement you trust" | KEEP, one clause edit. |
| `howItWorksContent.shipping` "nothing is shipped to you" | KEEP verbatim, now more true. |
| `howItWorksContent.phases` | all three describe booking, ghat performance, delivery of a recording | REWRITE to: choose water and hour; write the sankalp; sit with the live river and receive the Jal Kshan. |
| `howItWorksContent.film` short film at the ghat | DELETE. Replace with the audio provenance block: where each recording was made, by whom, and that no generative audio is used. |
| `faqContent` | container | KEEP |
| FAQ "Does this actually work?" | REWRITE. Best answer on the site: "Define works. If you mean does the river's level on your screen match the gauge, yes, and here is the link. If you mean does it change your fate, we have no idea, and neither does anyone charging you more." |
| FAQ "How do I know this is not a scam?" | REWRITE around the public data source. |
| FAQ "How do I know you actually did it, and did it for me?" | DELETE. Nothing is done for you. Replace with "What is actually happening on my screen?" |
| FAQ "Is this the same as bathing in the river myself?" | KEEP, answer unchanged. |
| FAQ "Do I get more punya if I pay more?" | KEEP. |
| FAQ "Who actually performs it? Is he a real priest?" | REWRITE to "Is there a priest? No. There never is. Here is why that is the point." |
| FAQ "What is in the video?", "Do I have to watch it live?", "Who else will hear my name?", "Can I have a rite that is only mine?", "What if the stream drops", "What am I paying for" (officiant framing) | DELETE all six. |
| FAQ "Do you send me Ganga jal or prasad?" | KEEP verbatim. |
| FAQ "What is a Sankalp Patra?" | REWRITE per §patra. |
| FAQ gotra, several people, someone who has died, non-Hindu or inter-faith, "will they say my name correctly" | KEEP first four. DELETE the last one, nobody says it. |
| FAQ data group, all five | KEEP, minus the "video does not match" recompression question, DELETE. |
| FAQ new questions to add | "Where does the river data come from?", "What happens when the gauge goes offline?", "Is the sound real?", "Why is there no priest?", "Can I do this if I am not in India?", "What do I get for ₹149 a month?" |

### src/content/rituals.ts (1,834 lines)

**DELETE THE ENTIRE FILE.** Replace with `src/content/practice.ts`. Nothing in it survives contact with the new model: the three hero guarantees (name spoken aloud, Naam Kshan, verifiable ritvik), both vessels, the 51-sankalp cap, the 45-second recitation floor, Pratinidhi Snan, all nine catalog rites (Deep Daan, Ekal Snan, Parivar, Pitru Tarpan, Nadi Puja, Abhishek, Aarti Sankalp, Path, Sankalpit Japa), Snan Kosh, the ritvik pay note, dakshina, and the 2026 price-rise explanation.

Salvage exactly three blocks into the new file or the manifesto:
- `refusals` (the "what we do not sell" list). Move to `/manifesto#refusals`, trim the four items that reference on-site rites (asthi visarjan, pind daan at Gaya, forwarded charity, shipped prasad stays).
- `ladder` (Vishwa Dar / Bharat Dar). Move to the pricing block, unchanged.
- `closing` ("ask your family's purohit first"). Move to manifesto 10.

### src/content/patra.ts (631 lines)

| Item | Verdict |
|---|---|
| `PatraData.ritvik` | DELETE field, DELETE `ritvikLabel`, `ritvikUnnamed`, and the specimen ritvik |
| `PatraData.naamKshan` | DELETE, replace with `jalKshan: { station, code, level, discharge?, readAtIst, source }` |
| `PatraData.ghat` | REWRITE meaning: the water and the named gauge, not the steps a rite happened on |
| `PatraData.performedOn`, `performedIst`, `performedLocal` | RENAME to `satOn`, `satIst`, `satLocal` |
| `PatraData.tithi` | KEEP, including the sourced/provisional discipline |
| anatomy, 10 fields | REWRITE to 9: identifier, names, gotra, the sankalp, the water, date and hour in both zones, tithi, **Jal Kshan**, seal and attestation |
| `restraint` six points | KEEP all six. Every one is still true and they read better now. |
| `restraint.attestation` "Snanify performed and recorded this rite at this ghat at this time" | FALSE. REWRITE: "This records that a sankalp was made under this name, at this hour, with the [river] at [level] at [station]. It attests to nothing else." |
| `verify` section | REWRITE, see verify.ts |
| `privacy` four items | KEEP. Delete only "the recording is a separate thing". |
| `formats` three forms plus `nothingShipped` | KEEP entirely |
| `sheet.footerLine` "the rites named above were performed on your behalf, by the person named" | FALSE. REWRITE: "This patra records a sankalp you made yourself, at the hour named, with the water in the state named. It is a record of what you did. It is not a promise of what follows." |
| `specimenPatra()` and the watermark discipline | KEEP the whole apparatus, repopulate the fields |

### src/content/verify.ts (90 lines)

REWRITE the file. Delete `shows.items` entries for the officiant's name and the Naam Kshan, and the lede claim that "the rite behind it was actually performed". New contract, and it is a *better* proof story than the old one because the third party is the Government of India:

- Shown: masked name; the water and the gauge station; the date and hour; the Jal Kshan reading; whether the patra still stands; **a direct link to the public CWC dataset for that station and date.**
- Never shown: the sankalp, the full name, other names on the booking, contact details, anything about payment.
- Keep `EXAMPLE_ID_SHAPE` and the 22-character unguessable identifier. Keep the "empty room rather than a search box that pretends to look" paragraph until the first patra is issued; it is excellent.

### src/lib/content.ts (483 lines)

| Key | Verdict |
|---|---|
| `meta` | REWRITE, new positioning sentence |
| `hero.badge` "Live now, Har Ki Pauri" | REWRITE to the live reading: "Ganga at Haridwar, 1.83 m, read 04:00 IST" |
| `hero.titleA/B`, `lede` | REWRITE, see copy |
| `hero.offer` (three prices, all dead SKUs) | REWRITE to the three-tier ladder |
| `hero.stats` "1,20,000+ Sankalps offered", "48 Countries served" | **FALSE AND UNFOUNDED even under the old model.** DELETE. Replace with facts that are true on day one: "6 waters", "24 readings a day", "0 flights". |
| `hero.card` next muhurat | KEEP |
| `rivers.lede` "performed at the ghat itself, in your name and gotra, and recorded as it happens" | FALSE. REWRITE. |
| `how.steps[2]` "Your name and gotra are spoken aloud at the ghat. The recording is timestamped." | FALSE. REWRITE to the sit and the Jal Kshan. |
| `muhurat` block | KEEP |
| `pricing` entire block: modes, session mechanics, tariff, ladders, kosh, note | REWRITE wholesale. Keep only `ladders` (the two-price argument), verbatim. |
| `footer.cols` "Our priests" | FALSE. DELETE the link. Replace with "The live water". |
| `footer.tagline` "A digital snan for Indians everywhere" | KEEP. It was accidentally already the new positioning. |
| `notFound`, `closing` | KEEP both |

### src/content/rivers.ts (1,167 lines)

Ninety percent survives. This file is the reason the pivot is cheap.

| Item | Verdict |
|---|---|
| `PermitStatus` type, `permitStatus` field on all six | DELETE, moot |
| `authority` field | KEEP, retitle in the UI from "who must grant permission" to "who keeps this water". Still interesting, no longer a blocker. |
| NEW field `gauge: { station, code, river, distanceKm, source }` | ADD to all six, with `null` allowed and rendered honestly |
| `sacred`, `rites`, `occasions`, `epithet`, `standfirst`, `caution` per water | KEEP all. This is the best content in the repo. |
| `riversIndexContent.permission` block | DELETE |
| `riversIndexContent.lede` "by a ritvik standing in it" | FALSE. REWRITE. |
| `riversIndexContent.honesty.isBody` "a pratinidhi snan, the ritvik entering the water as your representative, streamed and recorded" | FALSE. REWRITE to the digital sit plus the live reading. |
| `riversIndexContent.honesty.isNotBody` | KEEP verbatim, add one line: "and nobody is standing at the ghat on your behalf." |
| `choosing` four rows | KEEP. Editorial facts about the places, not offers. |
| river detail `rite` section | REWRITE to "what this water is for" plus the live gauge block |

### src/content/kumbh.ts (877 lines)

| Item | Verdict |
|---|---|
| `KUMBH_SCHEDULE`, all six entries with `provisional` confidence and the honest 2027/2028 avarohan note | KEEP entirely. Public dates, correctly hedged. |
| `PERMIT_STATUS` | DELETE |
| `KUMBH_MAIL` waitlist for on-site rites | REWRITE as a notification list for the live Simhastha page |
| any ritvik, recording, filming or proof copy in the page content | DELETE |
| the page itself | REPURPOSE as the free live Godavari page for Simhastha 2027. Highest-leverage single page on the site. |

### Components, lib and routes

- `src/components/pages/Ethics.tsx` → rename `Manifesto.tsx`, new sections
- `src/components/pages/Rituals.tsx` → rename `Practice.tsx`
- `src/components/pages/Verify.tsx`, `PatraExplainer.tsx`, `Faq.tsx`, `HowItWorks.tsx`, `RiversIndex.tsx`, `RiverDetail.tsx`, `Kumbh.tsx` → edit per the content changes above
- `src/components/SankalpPatra.tsx` → remove `naamKshan` and `ritvik` rendering, add the Jal Kshan row
- `src/components/StructuredData.tsx` → the comments and nodes reference officiants, permissions and attendance mode. Rewrite: this is a `WebApplication` or `Product` with an `Offer`, not an `Event` with a performer. **Prices now exist, so publish them.**
- `src/components/RiverFlow.tsx` → this is where Nadi Spandan lives. If it currently animates decoratively, it must be driven by the real reading or clearly marked as ornament.
- `src/lib/nav.ts` → `rituals` becomes `practice` at `/practice`; `ethics` becomes `manifesto` at `/manifesto`; add `live` at `/live`; `refusals` anchor moves to `/manifesto#refusals`; `ctaHref` points at `/live` rather than the pricing anchor, because the free thing converts better than the tariff
- `src/lib/og-card.tsx` → remove "streamed"
- `src/app/sitemap.ts` → drop `/rituals` and `/ethics`, add `/practice`, `/manifesto`, `/live`
- `src/proxy.ts` → add the two 301s

### Route verdicts

| Route | Verdict |
|---|---|
| `/` | REWRITE hero, rivers lede, step 3, entire pricing block |
| `/rivers`, `/rivers/[river]` x6 | KEEP, minor rewrite plus the live gauge block. Cheapest win on the site. |
| `/muhurat`, `/muhurat/[occasion]` x13 | UNAFFECTED apart from any "booking opens" or "performed at the ghat" phrasing |
| `/panchang` | UNAFFECTED |
| `/rituals` | DELETE, 301 to `/practice` |
| `/practice` | NEW, replaces the catalog |
| `/ethics` | DELETE, 301 to `/manifesto` |
| `/manifesto` | NEW |
| `/live` | NEW, free, no wall, the growth engine |
| `/how-it-works` | KEEP route, full copy rewrite |
| `/faq` | KEEP route, roughly 60 percent rewritten |
| `/patra`, `/patra/sample` | KEEP routes, heavy rewrite |
| `/verify` | KEEP route, repurposed to patra plus river-reading check |
| `/kumbh` | KEEP route, repurposed to the live Simhastha page |

---

## 7. The ordered checklist

**Gate zero, do this before writing any code**

1. Email helpdesk-nwic@gov.in and confirm in writing the licence, attribution wording and rate limits for commercial reuse of CWC telemetry. Everything below assumes a yes. If it is a no, the mechanic changes and the positioning does not.
2. For each of the six waters, identify the nearest published gauge station, its code, its river and its distance from the ghat. Record the ones with no station. Do not fabricate a substitute.
3. Confirm the CKAN API endpoint shape, update cadence and historical query for one station end to end, in a scratch script, before any UI work.
4. Source the invocation verse from a named edition and fix the Devanagari, the transliteration and the translation.
5. Line up ambient audio for all six waters with clear provenance and licence. If any water has no honest recording, it ships without audio and the page says so.

**Content demolition**

6. Delete `src/content/rituals.ts`. Salvage `refusals`, `ladder` and `closing` into a scratch file first.
7. Delete `ethicsContent` from `src/content/trust.ts`. Salvage s4, s8, s9, s11 into a scratch file.
8. Delete `PERMIT_STATUS` from kumbh.ts and `PermitStatus` plus `permitStatus` from rivers.ts.
9. Delete `ritvik` and `naamKshan` from `PatraData` and from `SankalpPatra.tsx`. The build will now fail in exactly the places that were lying. Follow the errors.

**Content construction**

10. Write `src/content/manifesto.ts` from the copy in this document, both locales, keeping the `satisfies Record<Lang, typeof en>` discipline.
11. Write `src/content/practice.ts`: the three tiers, both ladders, the refusals list, the "what this is not" block.
12. Rewrite the `pricing` block in `src/lib/content.ts` to the three tiers. Delete the 130-line pricing comment and write a new one recording where $4.99, $11 and $51 come from and what the 5,000-subscriber target is.
13. Rewrite `hero`, `rivers.lede`, `how.steps[2]` and `footer.cols` in `src/lib/content.ts`. Delete the invented stats.
14. Rewrite `howItWorksContent.phases` and `.film` in trust.ts.
15. Rewrite `faqContent`: delete the seven dead questions, rewrite six, add six.
16. Rewrite `verify.ts` in full.
17. Rewrite the patra copy: anatomy to nine fields, both attestation lines, the specimen.
18. Rewrite `riversIndexContent.lede`, `.honesty`, delete `.permission`.
19. Rewrite the kumbh page copy around the live Godavari.

**Engineering**

20. Add `gauge` to the `Ghat` type and populate all six, `null` where honest.
21. Build the telemetry fetcher: server side, cached at the hour, per station, with a hard rule that a stale or missing reading renders as stale or missing and never as a plausible number.
22. Build the `NadiSpandan` component: level, flow, trend, station, read-at time, source link, and an explicit offline state.
23. Build `/live` with all six.
24. Put `NadiSpandan` on every `/rivers/[river]` and on the landing hero.
25. Build the sit: sankalp form, the sitting screen, the Jal Kshan capture.
26. Extend `PatraData` with `jalKshan` and render it on the sheet.
27. Rewrite `/verify` to check the patra and deep-link the CWC record for that station and date.
28. Rewrite `StructuredData.tsx` as a priced `Product` or `WebApplication`. Remove every officiant and permission node.
29. Audit `RiverFlow.tsx`: real data or declared ornament, nothing in between.

**Routing and cleanup**

30. Rename `Ethics.tsx` to `Manifesto.tsx`, `Rituals.tsx` to `Practice.tsx`, move the route folders, add 301s in `proxy.ts` for `/ethics` and `/rituals` in both locales.
31. Update `src/lib/nav.ts` labels, paths and `ctaHref`.
32. Update `src/app/sitemap.ts`.
33. Grep the whole tree for `officiant`, `ritvik`, `purohit`, `priest`, `Naam Kshan`, `naamKshan`, `pratinidhi`, `samuhik`, `ekantik`, `dakshina`, `permitStatus`, `recording`, `stream`, `performed on your behalf`, `Snan Kosh`, `Varsh`. Every hit is either deleted, rewritten, or an editorial mention of a real place rather than a claim about us. Zero exceptions.
34. Re-read every page end to end in both locales against the two rules. Any sentence that implies a person acted on the user's behalf, or that promises an outcome, comes out.

---

## 8. Three things I would not compromise on

1. **"If you can go, go" stays at the top of the manifesto.** It is the single line that converts a sceptic into a customer, because it proves nothing else on the page is a sales pitch.
2. **The offline state of the gauge is a designed screen, not an error.** The one time the river goes quiet and the site says "the gauge at Haridwar has not reported since 02:00 IST, here is the last reading" is worth more than a year of marketing.
3. **No stats until they are real.** Delete "1,20,000+ sankalps offered" today. Zero is a fine number to have, and the entire product is an argument that measured beats impressive.


---

## Copy

═══════════════════════════════════════════
ENGLISH
═══════════════════════════════════════════

── POSITIONING LINE (site meta, press, first line of any deck) ──

Snanify is a digital snan: at an hour the panchang names, you sit with the live, measured state of a sacred river in India and make your sankalp yourself, wherever in the world you are.

── TAGLINES ──

Primary: The river is real. The hour is real. The distance is the only thing we changed.
Short: Snan, wherever you stand.
Pull quote, use it big: Our servers are in the river.

── LANDING HERO ──

Badge: Ganga at Haridwar · 1.83 m · read 04:00 IST
Title A: The river
Title B: is already here.
Lede: A digital snan. No priest, no ghat performance, nothing done on your behalf by anyone. At an hour the panchang names, you sit with the real, measured state of a sacred river and make your sankalp yourself.
CTA primary: Sit with the river
CTA secondary: What a digital snan is
Offer line: The live water is free and always will be. A single named sitting with a Sankalp Patra is $11. Everything, every water, every day, is $4.99 a month. The India rate is printed beside every one of them.
Stats: 6 waters · 24 readings a day · 0 flights

── LANDING, HOW IT WORKS (three steps) ──

01 Choose a water and an hour
Six rivers, and a calendar that means something. The panchang decides which hours are worth sitting in, and we show them in IST and in the time you actually keep.

02 Write your sankalp
Your name, your gotra if your family keeps one, and the thing you came to say, in your own words. Nothing is suggested to you. No machine writes it.

03 Sit
The river's condition at that minute is on your screen, read from a government gauge, and the water is in your ears. You say the sankalp yourself. Your Sankalp Patra records the minute, and what the river was doing in it.

── LANDING, CLOSING ──

Title: Ten thousand kilometres is not a distance the Ganga recognises.
Lede: The water is at its own level tonight, whether anyone is watching or not. You can be one of the people watching.
CTA: Sit with the river

═══════════════════════════════════════════
MANIFESTO · /manifesto
═══════════════════════════════════════════

Eyebrow: Manifesto
Title: A digital snan is a real thing to do.
Lede: Snanify is not a recording of somebody else's ritual. Nobody stands in the river for you. You sit, wherever you are, at an hour the panchang names, with a river whose actual condition at that minute is on the screen in front of you, and you say what you came to say. That is the whole product, and we think it is enough.

── 01 · THE PLAIN STATEMENT ──

There is no priest here. There is no ceremony at a ghat. Nothing is performed on your behalf, anywhere, by anyone, and nothing on this site is a recording of a rite.

What there is: the real state of a real river, read this hour from a government gauge station. The real panchang, so the hour you sit in is an hour that means something. The sound of that water. And a form of words that you, and only you, say.

We are not a temple and we are not standing in for one. We are a place to sit, at four in the morning, with the river you are from.

Pull quote: We describe what is on the screen. We do not describe what it does to your soul.

── 02 · OUR SERVERS ARE IN THE RIVER ──

It sounds like a line. It is a specification.

India's Central Water Commission publishes hourly telemetry from gauge stations on the country's rivers: water level, flow, rainfall. It is public data, measured by instruments in the water, updated through the day. We read the station nearest each of our six waters, and the number on your screen is that number.

So when the Ganga rises at Haridwar tonight, this website rises with it. When the Godavari runs thin in May, it runs thin here. Nothing on this site is a loop, a stock clip, or a mood video with a filter on it. There is no generated water anywhere in this product and there never will be.

And when a gauge goes quiet, which happens, the page tells you it has gone quiet and shows you the last honest reading with the hour it was taken. We would rather show you a silent instrument than a beautiful lie about a river.

That is what we mean. The river is not a theme here. It is the input.

── 03 · THE OLDEST ARGUMENT FOR THIS IS NOT OURS ──

Before you tell us a river cannot travel, look at what your own household already does every morning.

गङ्गे च यमुने चैव गोदावरि सरस्वति।
नर्मदे सिन्धु कावेरि जलेऽस्मिन् सन्निधिं कुरु॥

Ganga and Yamuna, Godavari, Saraswati, Narmada, Sindhu, Kaveri: be present in this water.

That is said over a bucket in Lucknow. Over a shower in Leicester. Over a tap in New Jersey, by people who have not seen any of those seven rivers in twenty years. It is not a metaphor that got out of hand. It is a protocol, and an old one, for making a distant river present in the water in front of you, and the tradition has never treated it as a lesser act.

We did not invent making the river come to you. Your grandmother does it before breakfast. We built a better instrument for it, one that can tell you exactly what the Ganga is doing this hour.

── 04 · WHAT A DIGITAL SNAN IS NOT ──

It is not a bath. Your body does not enter the Ganga and no arrangement of pixels will put it there.

It is not a rite performed for you. Nobody is at the ghat. Nobody is paid to say your name into a camera. We think that is an improvement, and we will explain why in a moment.

It is not a claim on your soul. We do not know what happens to anyone's karma. Neither does anybody selling you the alternative, though they charge more for the confidence.

It is not a replacement for going. If you can go, go. Book the flight, take the train, walk down the steps. We will still be here in the eleven years between.

── 05 · "YOU CANNOT WASH SINS OVER WIFI" ──

Correct. You cannot. Neither can we, and we have never said we could.

Look at what is actually being sold to you here: an hour, a water, a true reading of that water, a form of words, and a page to keep. Read every price on this site and you will not find one promised outcome. No sins washed. No punya counted. No dosha discovered and removed for a small additional fee. If that is what you came for, we are genuinely the wrong shop, and there are many, many others.

The rest of the objection is usually not about plumbing. It is about seriousness, and that is a fair thing to worry about. So here is the test, and it is not ours.

Nobody has ever complained that a mala is only string. Or that a diya is only a wick in oil. Or that a temple is only granite that people carried up a hill. The instrument was never the point. Attention is the point, and attention has always needed somewhere to stand.

We built somewhere. It opens at four in the morning, it knows what the river is doing, and it does not require a visa.

── 06 · WHO THIS IS FOR ──

For the person whose passport says one country and whose calendar says another. The grandson in Frankfurt who knows the tithi by heart and has never seen the ghat. The mother in Toronto with three weeks of leave a year and a father whose shraddh falls in none of them.

For anyone in India for whom the ghat is not far but unreachable. A night on a train and thirty wet steps have kept more people from the water than distance ever has.

For people who want the practice and not the institution. No intermediary. No queue. No counter to hand your name across, and nobody deciding whether your gotra qualifies you.

And for people who are simply curious, at eleven dollars, without being told first that something is wrong with their lives.

── 07 · WHO THIS IS NOT FOR ──

If you can get to the water, go. We mean this and we have put it at the top of every version of this page we have ever written. This is not a competitor to a pilgrimage and it loses that comparison every single time.

If you want a guarantee, we do not sell one, and you will not talk us into it.

And if you hold that a rite counts only when a qualified man performs it on your behalf at the tirth itself, that is a coherent position, held by serious people, and this product is not built for you. We are not going to argue you out of it and we are not going to write copy pretending you do not exist. Go with our respect.

── 08 · CLOSING ──

The Ganga is at its own level tonight at Haridwar, whether anyone is watching or not.

You can be one of the people watching.

CTA: Sit with the river

═══════════════════════════════════════════
SUPPORTING COPY
═══════════════════════════════════════════

── THE ATTESTATION LINE, printed on every Sankalp Patra ──

This patra records a sankalp made under this name, at the hour named, with the river at the level named. It is a record of what you did. It is not a promise of what follows.

── THE VERIFY PAGE LEDE ──

Every Sankalp Patra carries an identifier and a Jal Kshan: the minute you sat, and what the river was doing in that minute, at a named government gauge. Anyone holding the identifier can check both, and they do not have to take our word for the river. The Government of India publishes it.

── PRICING, three lines ──

Nitya · नित्य · $4.99 a month, ₹149 a month
Every water, every day, for as long as you keep it. Muhurat in your own time. The full sound of each river. Every patra kept.

Parva · पर्व · $11, ₹199
One named sitting, one occasion, one Sankalp Patra to keep or to give. The way in, and a whole thing, not a sample of one.

Smaran · स्मरण · $51 a year, ₹999 a year
A remembrance year. The tithi held, a sitting on it, a permanent page, and one message from us only if you asked for one.

═══════════════════════════════════════════
हिन्दी
═══════════════════════════════════════════

── स्थिति-वाक्य ──

स्नानिफ़ाई एक डिजिटल स्नान है: पंचांग जिस घड़ी को नाम देता है, उसी घड़ी में आप, दुनिया में जहाँ भी हों, किसी पवित्र नदी की उसी क्षण की मापी हुई वास्तविक स्थिति के साथ बैठते हैं और अपना संकल्प स्वयं करते हैं।

── पंक्तियाँ ──

मुख्य: नदी सच्ची है। घड़ी सच्ची है। हमने केवल दूरी बदली है।
संक्षिप्त: जहाँ आप हैं, वहीं स्नान।
उद्धरण, बड़े अक्षरों में: हमारे सर्वर नदी में हैं।

── मुखपृष्ठ ──

सूचक: गंगा, हरिद्वार · १.८३ मी · ०४:०० IST पर पढ़ा गया
शीर्षक क: नदी
शीर्षक ख: पहले से यहीं है।
भूमिका: एक डिजिटल स्नान। न पुरोहित, न घाट पर कोई अनुष्ठान, न आपकी ओर से किसी के द्वारा कुछ भी किया जाना। पंचांग जिस घड़ी को नाम देता है, उसी में आप किसी पवित्र नदी की वास्तविक, मापी हुई स्थिति के साथ बैठते हैं और अपना संकल्प स्वयं करते हैं।
मुख्य बटन: नदी के साथ बैठिए
दूसरा बटन: डिजिटल स्नान क्या है
मूल्य पंक्ति: सजीव जल निःशुल्क है और सदा रहेगा। संकल्प पत्र सहित एक नामित सत्र ₹१९९ का है। सब कुछ, हर जल, हर दिन, ₹१४९ मासिक। हर मूल्य के साथ भारत दर छपी है।
आँकड़े: ६ जल · दिन में २४ पाठ · ० उड़ानें

── तीन चरण ──

०१ जल और घड़ी चुनिए
छह नदियाँ, और एक पंचांग जिसका अर्थ है। कौन-सी घड़ी बैठने योग्य है, यह पंचांग तय करता है, और हम उसे भारतीय समय में तथा आपके अपने समय में, दोनों में दिखाते हैं।

०२ अपना संकल्प लिखिए
आपका नाम, गोत्र यदि आपका परिवार रखता है, और जो कहने आए हैं वह, आपके अपने शब्दों में। कोई सुझाव नहीं दिया जाता। कोई यंत्र उसे नहीं लिखता।

०३ बैठिए
उस मिनट की नदी की स्थिति आपकी स्क्रीन पर होती है, सरकारी मापक यंत्र से पढ़ी हुई, और जल आपके कानों में। संकल्प आप स्वयं कहते हैं। आपका संकल्प पत्र उस मिनट को, और उस मिनट में नदी क्या कर रही थी, दर्ज कर लेता है।

═══════════════════════════════════════════
घोषणा · /manifesto
═══════════════════════════════════════════

सूचक: घोषणा
शीर्षक: डिजिटल स्नान करने योग्य सच्चा कर्म है।
भूमिका: स्नानिफ़ाई किसी और के अनुष्ठान की रिकॉर्डिंग नहीं है। कोई आपके बदले नदी में नहीं उतरता। आप जहाँ हैं वहीं बैठते हैं, उस घड़ी में जिसे पंचांग नाम देता है, सामने उस नदी की उसी क्षण की वास्तविक स्थिति होती है, और आप स्वयं वही कहते हैं जो कहने आए थे। यही पूरा उत्पाद है, और हमारे मत में यह पर्याप्त है।

── ०१ · सीधी बात ──

यहाँ कोई पुरोहित नहीं है। किसी घाट पर कोई अनुष्ठान नहीं होता। आपकी ओर से, कहीं भी, कोई कुछ नहीं करता, और इस साइट पर कुछ भी किसी विधि की रिकॉर्डिंग नहीं है।

जो है, वह यह: एक सच्ची नदी की सच्ची स्थिति, इसी घंटे किसी सरकारी मापक केंद्र से पढ़ी हुई। सच्चा पंचांग, ताकि जिस घड़ी में आप बैठें उसका अर्थ हो। उसी जल की ध्वनि। और वे शब्द, जिन्हें केवल आप कहते हैं।

हम न मंदिर हैं, न किसी मंदिर की जगह ले रहे हैं। हम बैठने का एक स्थान हैं, तड़के चार बजे, उसी नदी के साथ जहाँ से आप हैं।

उद्धरण: हम बताते हैं कि स्क्रीन पर क्या है। यह नहीं बताते कि उससे आपकी आत्मा का क्या होगा।

── ०२ · हमारे सर्वर नदी में हैं ──

यह वाक्य नारे जैसा लगता है। असल में यह एक तकनीकी विवरण है।

भारत का केंद्रीय जल आयोग देश की नदियों के मापक केंद्रों से प्रति घंटा आँकड़े प्रकाशित करता है: जल-स्तर, प्रवाह, वर्षा। यह सार्वजनिक आँकड़ा है, जल में लगे यंत्रों से मापा हुआ, दिन भर बदलता हुआ। हमारे छह जलों में से हर एक के निकटतम केंद्र को हम पढ़ते हैं, और आपकी स्क्रीन पर वही अंक होता है।

तो आज रात हरिद्वार में गंगा चढ़ेगी, तो यह वेबसाइट भी उसी के साथ चढ़ेगी। मई में गोदावरी क्षीण होगी, तो यहाँ भी क्षीण होगी। इस साइट पर कुछ भी लूप नहीं है, न कोई तैयार दृश्य, न कोई सजाया हुआ वीडियो। इस उत्पाद में कहीं कोई कृत्रिम रूप से बनाया गया जल नहीं है, और कभी होगा भी नहीं।

और जब कोई यंत्र चुप हो जाता है, जो होता है, तो पृष्ठ आपको बताता है कि वह चुप है और अंतिम सच्चा पाठ उसके समय सहित दिखा देता है। हम आपको चुप यंत्र दिखाना अधिक ठीक मानते हैं, बनिस्बत नदी के बारे में एक सुंदर झूठ के।

हमारा अर्थ यही है। नदी यहाँ सजावट नहीं है। वह इनपुट है।

── ०३ · इसका सबसे पुराना तर्क हमारा नहीं है ──

इससे पहले कि आप कहें कि नदी यात्रा नहीं कर सकती, देखिए कि आपके अपने घर में हर सुबह क्या होता है।

गङ्गे च यमुने चैव गोदावरि सरस्वति।
नर्मदे सिन्धु कावेरि जलेऽस्मिन् सन्निधिं कुरु॥

गंगा और यमुना, गोदावरी, सरस्वती, नर्मदा, सिंधु, कावेरी: इस जल में सन्निधि कीजिए।

यह लखनऊ में बाल्टी पर कहा जाता है। लेस्टर में शॉवर के नीचे। न्यू जर्सी में नल पर, उन लोगों के द्वारा जिन्होंने इनमें से एक भी नदी बीस वर्षों से नहीं देखी। यह कोई बहकी हुई उपमा नहीं है। यह एक विधि है, और बहुत पुरानी, जिससे दूर की नदी सामने रखे जल में सन्निहित होती है, और परंपरा ने इसे कभी छोटा कर्म नहीं माना।

नदी को आप तक लाना हमने नहीं गढ़ा। आपकी दादी नाश्ते से पहले यही करती हैं। हमने उसके लिए एक बेहतर यंत्र बनाया है, जो आपको ठीक-ठीक बता सकता है कि गंगा इस घंटे क्या कर रही है।

── ०४ · डिजिटल स्नान क्या नहीं है ──

यह स्नान नहीं है। आपकी देह गंगा में नहीं उतरती, और पिक्सल की कोई सजावट उसे वहाँ नहीं पहुँचाएगी।

यह आपके लिए किया गया अनुष्ठान नहीं है। घाट पर कोई नहीं है। किसी को इसका पैसा नहीं मिलता कि वह कैमरे के सामने आपका नाम बोले। हम इसे सुधार मानते हैं, और क्यों, यह अभी बताते हैं।

यह आपकी आत्मा पर कोई दावा नहीं है। किसी के कर्म का क्या होता है, हम नहीं जानते। जो इसका विकल्प बेच रहे हैं, वे भी नहीं जानते, यद्यपि उस आत्मविश्वास का मूल्य वे अधिक लेते हैं।

यह जाने का विकल्प नहीं है। यदि आप जा सकते हैं, अवश्य जाइए। टिकट लीजिए, रेल पकड़िए, सीढ़ियाँ उतरिए। बीच के ग्यारह वर्षों में हम यहीं मिलेंगे।

── ०५ · "वाई-फ़ाई से पाप नहीं धुलते" ──

सही बात है। नहीं धुलते। हमसे भी नहीं धुलते, और हमने कभी कहा भी नहीं कि धुलते हैं।

देखिए कि यहाँ आपको बेचा क्या जा रहा है: एक घड़ी, एक जल, उस जल का सच्चा पाठ, कुछ शब्द, और रखने योग्य एक पत्र। इस साइट का हर मूल्य पढ़ जाइए, आपको एक भी वचन नहीं मिलेगा। न पाप धुलने का। न पुण्य गिनने का। न किसी दोष का, जो थोड़े और शुल्क पर खोजकर हटा दिया जाए। यदि आप इसी के लिए आए हैं, तो हम सचमुच ग़लत दुकान हैं, और दुकानें और भी बहुत हैं।

बाक़ी आपत्ति प्रायः तकनीक की नहीं होती। वह गंभीरता की होती है, और यह चिंता उचित है। तो यह रही कसौटी, और यह हमारी बनाई हुई नहीं है।

किसी ने कभी शिकायत नहीं की कि माला केवल धागा है। या दीया केवल तेल में बाती है। या मंदिर केवल वह पत्थर है जिसे लोग पहाड़ी पर ढो लाए। साधन कभी मुद्दा नहीं था। मुद्दा ध्यान है, और ध्यान को सदा खड़े होने के लिए कोई जगह चाहिए रही है।

हमने एक जगह बनाई है। वह तड़के चार बजे खुलती है, उसे पता होता है कि नदी क्या कर रही है, और उसके लिए वीज़ा नहीं चाहिए।

── ०६ · यह किसके लिए है ──

उस व्यक्ति के लिए जिसका पासपोर्ट एक देश कहता है और कैलेंडर दूसरा। फ़्रैंकफ़र्ट के उस पोते के लिए जिसे तिथि कंठस्थ है और जिसने घाट कभी नहीं देखा। टोरंटो की उस माँ के लिए जिसके पास वर्ष में तीन सप्ताह की छुट्टी है और जिनके पिता का श्राद्ध उनमें से किसी में नहीं पड़ता।

भारत में भी उन सबके लिए जिनके लिए घाट दूर नहीं, पहुँच के बाहर है। रात भर की रेल और तीस गीली सीढ़ियों ने लोगों को जल से उतना रोका है जितना दूरी ने कभी नहीं रोका।

उनके लिए जिन्हें साधना चाहिए, संस्था नहीं। कोई बिचौलिया नहीं। कोई पंक्ति नहीं। नाम थमाने के लिए कोई काउंटर नहीं, और यह तय करने वाला कोई नहीं कि आपका गोत्र आपको पात्र बनाता है या नहीं।

और उनके लिए भी जो बस जिज्ञासु हैं, ₹१९९ में, यह सुने बिना कि उनके जीवन में कुछ गड़बड़ है।

── ०७ · यह किसके लिए नहीं है ──

यदि आप जल तक पहुँच सकते हैं, जाइए। यह हम गंभीरता से कहते हैं और इस पृष्ठ के हर रूप में इसे सबसे ऊपर रखा है। यह तीर्थयात्रा का प्रतिद्वंद्वी नहीं है और उस तुलना में हर बार हारता है।

यदि आपको कोई गारंटी चाहिए, हम नहीं बेचते, और आप हमें मना भी नहीं पाएँगे।

और यदि आपका मत यह है कि अनुष्ठान तभी मान्य है जब कोई योग्य व्यक्ति तीर्थ पर आपकी ओर से उसे संपन्न करे, तो वह एक सुसंगत मत है, गंभीर लोगों का मत है, और यह उत्पाद आपके लिए नहीं बना। हम आपसे बहस नहीं करेंगे, और ऐसा लिखेंगे भी नहीं मानो आप हैं ही नहीं। हमारे आदर सहित जाइए।

── ०८ · समापन ──

आज रात हरिद्वार में गंगा अपने ही स्तर पर है, कोई देखे या न देखे।

आप देखने वालों में हो सकते हैं।

बटन: नदी के साथ बैठिए

═══════════════════════════════════════════
सहायक पंक्तियाँ
═══════════════════════════════════════════

── हर संकल्प पत्र पर छपी पंक्ति ──

यह पत्र दर्ज करता है कि इस नाम से, बताई गई घड़ी में, नदी के बताए गए स्तर के साथ एक संकल्प किया गया। यह उसका अभिलेख है जो आपने किया। यह इसका वचन नहीं कि आगे क्या होगा।

── सत्यापन पृष्ठ की भूमिका ──

हर संकल्प पत्र पर एक पहचान-संख्या होती है और एक जल क्षण: वह मिनट जिसमें आप बैठे, और उस मिनट में किसी नामित सरकारी मापक केंद्र पर नदी क्या कर रही थी। जिसके पास पहचान-संख्या है, वह दोनों जाँच सकता है, और नदी के लिए उसे हम पर विश्वास करने की आवश्यकता नहीं। वह भारत सरकार प्रकाशित करती है।

── मूल्य, तीन पंक्तियाँ ──

नित्य · ₹१४९ मासिक
हर जल, हर दिन, जब तक आप रखें। मुहूर्त आपके अपने समय में। हर नदी की पूरी ध्वनि। हर पत्र सुरक्षित।

पर्व · ₹१९९
एक नामित सत्र, एक अवसर, और रखने या देने योग्य एक संकल्प पत्र। भीतर आने का मार्ग, और पूरा कर्म, उसका नमूना नहीं।

स्मरण · ₹९९९ वार्षिक
स्मरण का एक वर्ष। तिथि सुरक्षित, उस पर एक सत्र, एक स्थायी पृष्ठ, और हमसे एक संदेश केवल तभी जब आपने माँगा हो।

## Open questions

- CWC licence and attribution. No licence statement was visible on the nwdp.nwic.gov.in dataset page and the portal lists only a helpdesk contact (helpdesk-nwic@gov.in, +91-011-20863687). Written confirmation that hourly telemetry may be redisplayed in a commercial product, and the exact attribution wording required, is the one item that can kill the entire mechanic. Resolve before any UI is built.
- Gauge coverage for the six waters. Ganga at Haridwar, the Sangam and the Yamuna at Mathura are very likely covered; Shipra at Ujjain and Talakaveri at the Kaveri's source very likely are not. Which of the six ship with a station at the ghat, which with a named station some kilometres away, and which with no live reading at all? The manifesto's central claim survives an honest 'no gauge here' but not a silently substituted one.
- Water temperature is not confirmed in any CWC dataset I could see. Level, discharge and rainfall are. All copy currently avoids temperature; do not add it back without a source.
- The invocation verse in manifesto section 03 is quoted from general knowledge. Fix the Devanagari, the transliteration and the translation against a named published edition, and decide whether to cite the source on the page. It is the load-bearing paragraph of the whole positioning, so it should be the best-sourced line on the site.
- cwc.gov.in/ffm_dashboard returned HTTP 401 to automated fetch, so its existence and contents are unverified by me. If it is usable, a flood-forecast state per station is a strong second signal alongside level and flow.
- Audio provenance. Six waters need ambient recordings with a clear licence and a named recordist. Field-recording a ghat is one trip and near-zero ongoing cost, but it is the only physical operation left in the business, and a water without honest audio should ship silent rather than borrowed.
- Price points are proposed, not tested: $4.99 / ₹149 monthly, $11 / ₹199 for Parva, $51 / ₹999 for Smaran. The 5,000-subscriber path to $20k monthly profit assumes roughly 85 percent margin and near-zero support load. Both assumptions want a month of real data before the tariff is set in copy.
- Whether to keep the name 'Snanify' unchanged. It was built for a service that arranged rites. It still works for a digital snan, and the domain and the site are already there, so my recommendation is keep it, but the pivot is the only moment where changing it would cost nothing.
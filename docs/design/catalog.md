# Snanify Service Catalog & Offering Architecture v1

> Facet: **Service catalog & offering architecture**  
> Adversarial review verdict: **needs-work**

## Summary

The catalog is built on one honest structural decision: the real product axis is not "how many names" but **how the rite is held** — Samuhik (your sankalp read aloud inside a shared session of up to 51, the traditional collective puja) versus Ekantik (a session held for your household alone). Everything else composes on top: a Snan Vessel (Ekal / Parivar / Ekantik / Varsh) plus optional Anushthan modules (Pitru Tarpan, Deep Daan, Nadi Puja, Abhishek, Aarti Sankalp, Sankalpit Japa, Path, Pind Daan) plus pass-through Daan (Annadaan, Gau Seva). Every purchase, at every price, carries three hard guarantees: your name is spoken aloud, the recording is deep-linked to the exact second your name is spoken (the Naam Kshan), and the Sankalp Patra is publicly verifiable against the stream archive. Pricing runs two independent ladders — the Vishwa Dar in USD on shagun numbers ($11/21/31/51/108/151/251/1008) and the Bharat Dar in INR on the dakshina ladder (₹101/251/501/751/1100/2100/5100/21000), disclosed openly as roughly 20–40% of the world price rather than hidden geo-discrimination. Every rite carries a mandatory, non-removable "Yah kya hai / Yah kya nahin hai" honesty block, and a named list of things Snanify refuses to sell — dosha diagnosis, tripindi-style fear rites, prasad shipping, asthi visarjan, and any claim of guaranteed outcome.

## Decisions

**The primary price axis is Samuhik (collective, up to 51 sankalps per session) vs Ekantik (private, one household). Not name-count, not river, not duration.**

*Why:* An $11 rite cannot honestly be a private ceremony, and pretending otherwise is the single most likely place this business becomes a lie. Samuhik puja is genuine, ancient, and performed at every ghat daily — so the cheap tier is not a degraded product, it is a real category with its own name. This lets us sell $11 without deceiving anyone and sell $151 without inventing artificial scarcity.

**Hard cap of 51 sankalps per Samuhik session, because every single name is read aloud, always, at every price point.**

*Why:* 51 names at ~6 seconds is ~5 minutes of name-reading — operationally real. The cap is derived from the guarantee, not from an auspicious number we then rationalized. If we ever raised the cap we would have to stop reading names, which would gut the product.

**The Naam Kshan: every recording is deep-linked to the exact second the user's own name is spoken, with that timestamp printed on the Sankalp Patra.**

*Why:* This is the proof mechanism that makes the whole business credible. A 40-minute video nobody watches proves nothing; 'your name at 07:41' is checkable in eleven seconds. It converts a faith purchase into a verifiable service without diminishing the faith.

**Public verification endpoint at /verify/<patra-id> showing the ritvik, the ghat, the UTC and IST timestamps, and the stream segment.**

*Why:* Any competitor can claim a rite was performed. Only one that publishes checkable evidence deserves the diaspora's money. It also disciplines internal operations — you cannot quietly skip a session that has a public URL.

**Two independent price ladders (Vishwa Dar in USD, Bharat Dar in INR), openly disclosed on the pricing page rather than silently geo-switched, with Bharat Dar gated by an Indian payment instrument rather than IP.**

*Why:* ₹968 for a snan prices out the domestic market that gives the service its legitimacy; $11 in New Jersey is a coffee. Dual pricing is correct — but hiding it turns a defensible ethic into a discovered scandal. IP gating is trivially defeated and punishes travellers; payment instrument is the honest test.

**Sankalp (naming an ancestor) and Tarpan (making an offering to them) are sold as distinct things and never conflated, including in the existing Parivar tier which includes the former only.**

*Why:* They are theologically different acts. Bundling them so a customer believes they bought tarpan when they bought a mention is exactly the kind of soft fraud that this category is infamous for.

**Named refusal list published as a product page: no dosha diagnosis, no tripindi/pret-baadha style fear rites, no prasad or Ganga jal shipping, no asthi visarjan, no rudraksha or yantra sales, no guaranteed-outcome language.**

*Why:* Refusing revenue in public is the cheapest trust asset available and the only one competitors cannot copy without giving up their margin. Asthi visarjan additionally requires shipping human remains, which breaks the fully-digital constraint outright.

**Parva-day and Brahma Muhurat premiums are charged with the operational reason printed next to the price ('ghat access is permitted and ritvik time is contested on this date').**

*Why:* Surge pricing on a holy day reads as extortion unless the cost basis is stated. Stating it converts the same number from predatory to candid.

**Smaran (perpetual memorial + automatic tithi-accurate annual shraddha tarpan) is the flagship recurring product, wrapped in the strictest guardrails in the catalog: one plain notification, no guilt copy, cancellation confirmed with 'cancelling this changes nothing for the departed'.**

*Why:* Tithi drifts against the Gregorian calendar every year, so remembering the correct shraddha date is genuine, boring, valuable utility — a real reason to keep paying that owes nothing to grief manipulation. It is also the product most easily turned predatory, so the guardrails ship with it, not after it.

**Pind Daan offered only at Triveni Sangam, only as Ekantik, only with a mandatory pre-booking honesty interstitial; Gaya is not offered at all.**

*Why:* Prayagraj is a legitimate pind daan sthal and proxy performance by a commissioning descendant has real precedent. Gaya carries a specificity and weight we cannot honestly claim without a verified, named partnership there — so we do not claim it.

**Recordings are included free at every tier and never paywalled or expired at the $11 tier for the first 3 years.**

*Why:* Charging a person to keep the video of a rite performed in their own dead father's name is the grubbiest possible line item. Its absence is worth more than its revenue.

**Sankalp free-text passes a moderation policy that blocks harm-to-named-third-parties and rewrites nothing else, and any cure-seeking sankalp triggers a gentle non-blocking notice that we carry the prayer but promise no outcome.**

*Why:* Users will type their cancer diagnosis into that box. The product must neither censor their prayer nor let the brand imply a medical claim by silence.

---

> **Status of this document.** Everything marked `PLACEHOLDER` is unverified and must not ship as fact. All Sanskrit ritual wording, all panchang timings, all ritvik names, all ghat permissions, and all trust statistics are PLACEHOLDER. The existing landing page stats (`1,20,000+ sankalps`, `48 countries`) are fabricated and **must be removed or replaced with real counts before launch** — see Open Questions.

---

# 1. The spine: what a person is actually buying

A Snanify purchase is always three things stacked:

```
  VESSEL          how the rite is held        (Samuhik or Ekantik)
+ ANUSHTHAN[]     which rites are performed   (snan, tarpan, deep daan, …)
+ PATRA           the record you receive      (Sankalp Patra + Naam Kshan + verify URL)
```

## 1.1 The two vessels

This is the real price axis. Not name count, not river, not duration.

| | **Samuhik** समूहिक — *held together* | **Ekantik** एकांतिक — *held alone* |
|---|---|---|
| Session shared with | up to **51** sankalps | your household only |
| Names read aloud | **every one, always** | every one, always |
| Ritvik attention | one ritvik, one shared rite | one ritvik, your rite only |
| Camera | fixed ghat frame + name-reading close-up | full session, your names on the shot list |
| Session length | 30–45 min | 25–90 min depending on anushthan |
| You can speak to the ritvik | no | yes — 3 min before, 3 min after, two-way audio |
| Sankalp read in | shared sankalp sequence | your sankalp alone, unhurried |
| Precedent | samuhik puja / sanghik path — performed daily at every ghat | ekantik / vyaktigat anushthan |

**EN copy (pricing page, must appear verbatim above the tiers):**
> Two ways a rite can be held. A *samuhik* snan places your sankalp inside a session shared with up to fifty other households — the same way a ghat has always worked at dawn. An *ekantik* snan is held for your household alone. Both are real. One is not a lesser version of the other; it is a different room.

**HI:**
> अनुष्ठान दो प्रकार से संपन्न होता है। *समूहिक* स्नान में आपका संकल्प पचास अन्य परिवारों के साथ एक ही सत्र में रखा जाता है — जैसे भोर के समय घाट सदा से होता आया है। *एकांतिक* स्नान केवल आपके परिवार के लिए संपन्न होता है। दोनों वास्तविक हैं। एक दूसरे का घटिया रूप नहीं — वह केवल एक भिन्न कक्ष है।

## 1.2 The three guarantees (apply at every price, printed on every product page)

1. **आपका नाम बोला जाएगा** — Your name is spoken aloud at the ghat. Not displayed, not listed. Spoken.
2. **नाम क्षण** *Naam Kshan* — Your recording opens at the exact second your name is spoken. The timestamp is printed on your Sankalp Patra.
3. **सत्यापन** — Every Sankalp Patra is verifiable by anyone at `snanify.com/verify/<patra-id>` without logging in.

---

# 2. The core Snan, minute by minute

Reference case: **Ekal Snan, Samuhik, Ganga at Har Ki Pauri, Brahma Muhurat slot.** All times IST. `T` = start of the rite.

### Booking phase

| When | What happens | What the user sees |
|---|---|---|
| **T − 14d to T − 3h** | Booking window open. Samuhik sessions close at T − 3h; Ekantik at T − 48h. | Live seat counter: *"31 of 51 sankalps taken."* Real number, never inflated. |
| **Booking + 0s** | Sankalp captured: name(s) (Latin + Devanagari, user-editable transliteration with audio preview of pronunciation), gotra, sankalp text (240 chars), relationship of each additional name, optional pitru names with relationship + year of passing. | Pronunciation preview — TTS reads the Devanagari back. User can correct it. This single feature prevents the most common complaint in this category: *"they said my name wrong."* |
| **Booking + 0s** | Moderation pass on sankalp free text (§9.3). | Nothing, unless flagged. |
| **Booking + 2 min** | Confirmation email + calendar invite (.ics) in the user's timezone, with the IST time shown alongside. | *"Your snan is on Thursday 14 May, 04:24 IST — that is Wednesday 13 May, 18:54 for you in Berlin."* |
| **T − 24h** | Ritvik roster locked. Sankalp sheet generated and printed at the ghat (paper, because the ghat is wet). | Email: *"Your sankalp has been written into tomorrow's sheet."* Shows the exact sankalp text as it will be read. Last chance to correct a spelling — one free edit. |
| **T − 60 min** | Stream infrastructure check. Backup ritvik confirmed. | Push/email if opted in: *"The ghat is awake. Your snan begins in an hour."* No urgency language, no countdown pressure. |

### The rite

| Clock | Segment | What is performed | What is on camera |
|---|---|---|---|
| **T − 12 min** | *Pravesh* | Stream opens. Static frame of the ghat, ambient sound only. No music bed, no voiceover. | The river, the steps, whatever light there is. |
| **T − 5 min** | *Aasan & Achamana* | Ritvik seats himself, performs achamana (three sips of water with the three names), pranayama, and the ritual self-purification that precedes any rite. | Mid shot. Subtitles EN/HI naming each action as it happens. |
| **T + 0** | **Sankalp — the naming** | Ritvik states desha (place), kaal (samvat, ayana, ritu, maas, paksha, tithi, vaar, nakshatra), then reads gotra + name + the yajaman's stated intention, for each sankalp in the session. | **Close shot on the ritvik.** Timecode index written per name → this generates the Naam Kshan. |
| ~T + 6 | *Nadi Vandana* | Short invocation of the river by name (Ganga / Yamuna / Godavari / Shipra / Kaveri / the three at Sangam). | Wide shot to the water. |
| **T + 9** | **Pratinidhi Snan — the dip** | The ritvik enters the water and performs the snan **as pratinidhi (representative) of the named yajamans** — the marjan/abhishek-snan sequence, three immersions, water taken up in the hands and released while the sankalp names are held. | Full shot, unedited, no cuts. This segment is never sped up and never stock. |
| ~T + 16 | *Arghya* | Water offered to the sun (or, before sunrise, to the direction of sunrise). | — |
| **T + 18** | Add-on anushthan block | Purchased modules run here in fixed canonical order: Tarpan → Abhishek → Nadi Puja → Japa/Path → Deep Daan. See §3. | Each module gets its own chapter marker in the recording. |
| **T + ~34** | *Kshama Prarthana & Visarjan* | Closing petition for forgiveness of errors in performance; formal conclusion. | Mid shot. |
| **T + ~38** | *Samapti* | Ritvik states the session ID aloud on camera. | **This is the anti-fraud device** — the recording contains its own ID, spoken, so a recording cannot be reused for another date. |

### Delivery phase

| When | What happens | What the user sees |
|---|---|---|
| **T + 45 min** | Stream archived, chaptered, name-index applied. | — |
| **T + 90 min** | **Delivery email.** | Recording (streamable + downloadable MP4, 1080p), Naam Kshan deep link, chapter list, Sankalp Patra PDF (print-ready A4 + US Letter, 300dpi) + web version, verify URL. |
| **T + 90 min** | Delivery email subject line, EN: *"Your snan was performed this morning at Har Ki Pauri."* HI: *"आज प्रातः हर की पौड़ी पर आपका स्नान संपन्न हुआ।"* | No exclamation marks. No "Congratulations". |
| **T + 24h** | One follow-up: how to share the recording with family, how to save the Patra. Nothing sold in this email. | — |
| **T + 7d** | Optional single feedback request. Unsubscribable in one click. | — |

### Failure modes (must be built, not improvised)

| Failure | Policy |
|---|---|
| Stream drops >90s during the sankalp or snan segment | Rite is re-performed free at the next equivalent muhurat, **or** full refund — user's choice, offered proactively within 3h. Never make the user ask. |
| Ghat closed (flood, police order, festival crowd control, mourning) | Auto-move to the designated alternate ghat **on the same river** (PLACEHOLDER: alternate ghat list per river must be secured). User notified with reason before T. Free cancellation. |
| Ritvik unavailable | Backup ritvik performs. The Patra names whoever actually performed. Never the rostered name. |
| Name mispronounced | Report within 30 days → name is re-read at the next session free, new Patra issued, old one superseded (not deleted — the verify URL shows both). |
| River water unsafe / genuinely unenterable | Rite is performed at the water's edge with jal taken up by hand, and **the recording and Patra say so explicitly**. No pretending. Full refund on request. |

**Cancellation & refund:** >24h before T → 100% refund. <24h → free reschedule, or 50% refund (the ritvik's time is already committed). Rite not performed for any reason → 100%, automatic, no request needed. Varsh/membership → prorated on unused snans, cancel any time, no exit interview.

---

# 3. The Anushthan catalog

Every rite below has a mandatory, non-collapsible **"Yah kya hai / Yah kya nahin hai"** block on its product page and in the checkout summary. Engineering: this is a required non-nullable field on the `Rite` type; a rite without it cannot render.

---

### 3.1 Sankalp — संकल्प
**SKU** `SNF-RITE-SANKALP` · included in every purchase, not sold alone · **~40s per name** · Samuhik or Ekantik

**What it is.** The formal declaration that binds a rite to a person. The ritvik states where the rite is happening, when it is happening in the traditional calendar, then your gotra, your name, and the intention you gave us — and dedicates what follows to you.

**Who it is for.** Everyone. Nothing else in this catalog is meaningful without it.

**What you see.** A close shot on the ritvik. Your name spoken. Your own words, read aloud, in the sankalp you wrote. Your Naam Kshan timestamp points here.

**Honestly:**
- *This is:* the traditional act of naming a beneficiary before a rite, performed exactly as it is performed for anyone who stands at the ghat and cannot recite the formula themselves.
- *This is not:* magic. Naming you does not change your circumstances. It records and dedicates an intention.

---

### 3.2 Pratinidhi Snan — प्रतिनिधि स्नान
**SKU** `SNF-RITE-SNAN` · included in every Snan vessel · **~9 min**

**What it is.** The ritvik enters the river and performs the snan sequence on your behalf as your representative.

**Honestly:**
- *This is:* a rite performed by proxy, a practice with long and ordinary precedent for those who cannot travel — the ill, the aged, the distant.
- *This is not:* your own bath. Your body does not enter the Ganga. Anyone who tells you a streamed rite is identical to standing in the water yourself is selling you something. We are selling you the rite, performed, in your name, at the place — and the record of it.

---

### 3.3 Pitru Tarpan — पितृ तर्पण
**SKU** `SNF-RITE-TARPAN-PITRU` · **$21 / ₹501** · add-on or standalone · **~12 min** · Samuhik or Ekantik
Extended form **Tridev Tarpan** (deva + rishi + pitru) `SNF-RITE-TARPAN-TRI` · **$31 / ₹751** · ~18 min

**What it is.** Water offered to the departed, poured from the hands with the ancestors named. The oldest and simplest of the ancestral rites.

**Who it is for.** Anyone who has lost someone. Especially: Pitru Paksha (the fortnight of the ancestors), a death anniversary (barsi), Amavasya, a parent's tithi, or a person who was unable to attend the funeral — a very large diaspora case.

**What you see.** The ritvik faces south, takes water and darbha, and names each of your departed in turn — name, relationship to you, and the year they died. The water falls. Each name gets its own Naam Kshan.

**What we need from you.** Name, relationship, year of passing (approximate is accepted), gotra if different from yours.

**Honestly:**
- *This is:* an offering of water and remembrance to named ancestors, performed by a ritvik on behalf of a descendant who cannot be present.
- *This is not:* a rescue. We will never tell you your ancestors are suffering, restless, unsatisfied, or waiting. We do not know that, nobody does, and using it to sell you something would be contemptible. Perform tarpan because you wish to remember them.

---

### 3.4 Deep Daan — दीप दान
**SKU** `SNF-RITE-DEEPDAAN` · **$11 / ₹101** · add-on or standalone · **~3 min**

**What it is.** A lamp lit at the ghat in your name and set on the water.

**Who it is for.** The cheapest honest entry point. Birthdays, a good result, a small thanksgiving, Kartik Purnima, Dev Deepawali, a death anniversary, or simply a difficult week.

**What you see.** 90 seconds in your recording: the wick catches, your name is spoken over the flame, the lamp is set on the current, and the camera follows it until it leaves the frame. It is not cut short.

**Honestly:**
- *This is:* a lamp, lit, named, floated. That is the whole of it and it has always been enough.
- *This is not:* going to arrive anywhere. It is a lamp on a river.
- *Environmental note (must be shown):* lamps are leaf-and-cotton, no plastic, no thermocol. PLACEHOLDER — confirm supplier and local ghat rules per river.

---

### 3.5 Nadi Puja — नदी पूजा
**SKU** `SNF-RITE-NADIPUJA` · **$31 / ₹751** · **~18 min** · Samuhik or Ekantik

**What it is.** Worship of the river herself as a deity — the upachara sequence (invocation, water, flowers, incense, lamp, offering, salutation), performed at the water's edge in your name. At Haridwar this is Ganga Puja; at Mathura, Yamuna Puja; at Sangam, Triveni Puja; and so on per river.

**Who it is for.** A new house, a new business, a marriage, a first child, a completed vow, an anniversary. Occasions of gratitude rather than petition.

**What you see.** The full upachara sequence with each step named in subtitles as it happens. Flowers and lamp on the water at the close.

**Honestly:**
- *This is:* a devotional puja to the river, performed with your sankalp, at the ghat.
- *This is not:* a substitute for a griha pravesh or a wedding rite performed at your own home with your own family. It accompanies those. It does not replace them.

---

### 3.6 Abhishek — अभिषेक
**SKU** `SNF-RITE-ABHISHEK` · **$31 / ₹751** · **~12 min**

**What it is.** River water poured in continuous stream over the murti or shivling at the ghat-side shrine, with recitation, in your name.
Available at: Har Ki Pauri (PLACEHOLDER shrine), Ram Ghat Ujjain (Mahakal-adjacent ghat shrine — **PLACEHOLDER, we do not claim access to the Mahakaleshwar garbhagriha and must never imply it**), Ram Kund Nashik, Vishram Ghat Mathura.

**Who it is for.** Mahashivratri, Shravan Mondays, Pradosh, a vow.

**Honestly:**
- *This is:* an abhishek at a ghat-side shrine, PLACEHOLDER-named, performed with river water in your name.
- *This is not:* an abhishek inside a Jyotirlinga sanctum. We will name the exact shrine on your Patra and it will not be one we do not have access to.

---

### 3.7 Aarti Sankalp — आरती संकल्प
**SKU** `SNF-RITE-AARTI` · **$21 / ₹501** · **~25 min stream, name read at a fixed point**

**What it is.** Your name and sankalp are read at the evening aarti at the ghat, and a lamp is offered on your behalf during it.

**Who it is for.** People who want the spectacle and the sound — the diaspora's most emotionally direct product. Grandparents watching with grandchildren.

**What you see.** The full aarti, streamed, with the moment your name is read indexed as your Naam Kshan.

**Honestly:**
- *This is:* your name read, and a lamp offered, within a public aarti that would have happened whether or not you booked.
- *This is not:* a private aarti, and we are not the organisers of the aarti. PLACEHOLDER — the exact arrangement with the aarti samiti at each ghat must be secured and described in one plain sentence here before this SKU ships.

---

### 3.8 Sankalpit Japa — संकल्पित जप
**SKU** `SNF-RITE-JAPA` · **$51 / ₹1,100** (1,008 repetitions) · **~55 min** · Ekantik only
Larger: `SNF-RITE-JAPA-10K` · **$251 / ₹5,100** (10,008 repetitions, performed across 3 days) · Ekantik only

**What it is.** A fixed count of a chosen mantra, recited at the ghat, dedicated to your sankalp. Choose from: Gayatri, Mahamrityunjaya, Om Namah Shivaya, Om Namo Bhagavate Vasudevaya, Ram Naam. (PLACEHOLDER: final mantra list requires review by the pandit advisory — see Open Questions.)

**Who it is for.** Illness in the family, surgery, a long recovery, exams, a period of difficulty. This is the highest-emotion, highest-risk SKU in the catalog.

**What you see.** Unbroken recording of the recitation with a visible count. The full duration, not a highlight.

**Honestly (this block is legally as well as ethically load-bearing):**
- *This is:* a count of recitations, performed, recorded in full so you can see the count was real, dedicated to the person you named.
- *This is not:* medicine. Mahamrityunjaya japa is not a treatment. If someone you love is ill, this is something you may do **alongside** their doctors, never instead of them. We will not say otherwise and we will not sell you a second one because the first "didn't work."
- **UI requirement:** if the sankalp text contains health language, show a non-blocking inline notice before payment: *"We will carry this prayer. We cannot promise a recovery, and we will never claim to. — हम यह प्रार्थना अवश्य ले चलेंगे। हम स्वस्थ होने का वचन नहीं दे सकते, और कभी नहीं देंगे।"*

---

### 3.9 Path — पाठ
**SKU** `SNF-RITE-PATH` · **$51 / ₹1,100** · **35–70 min** · Ekantik only

Recitation of a complete text at the ghat in your name. Options: Vishnu Sahasranama (~35 min), Hanuman Chalisa ×11 (~40 min), Sundarkand (~70 min), Rudri path (PLACEHOLDER — verify ritvik competence per river). Full unedited recording.

**Honestly:** *This is* a complete text, recited in full, dedicated to you. *This is not* abridged, sped up, or pre-recorded — and the session ID spoken on camera at the end proves the date.

---

### 3.10 Pind Daan — पिंड दान
**SKU** `SNF-RITE-PINDDAAN` · **$251 / ₹5,100** · **~45 min** · **Triveni Sangam, Prayagraj only** · **Ekantik only**

**What it is.** The offering of pindas for a named departed person, performed at a recognised pind daan sthal by a ritvik on behalf of the descendant who commissions it.

**Who it is for.** A death in the family where the descendant genuinely cannot travel. Pitru Paksha. The end of the first year.

**Booking requirement.** This SKU has a mandatory full-screen interstitial before checkout, which cannot be skipped, containing the honesty block in full and a single sentence: *"If you are able to travel to India for this, we think you should. — यदि आप इसके लिए भारत आ सकते हैं, तो हमारा मत है कि आपको आना चाहिए।"* Then two buttons: *"I understand, continue"* / *"Not now."*

**Honestly:**
- *This is:* a pind daan performed at Prayagraj by a ritvik, commissioned by you, with your gotra and the departed named, recorded in full.
- *This is not:* your presence. Tradition places weight on the descendant's own hands. We are not going to tell you this is the same thing.
- *We do not offer Gaya.* Gaya carries a specific weight, and we will not claim it without a named, verified arrangement there. When and if we have one, we will name the person.

---

### 3.11 Daan (pass-through) — दान

These are donations, not rites. Sold at cost plus a stated 15% handling fee, with the fee shown as a line item. Receipts returned.

| | SKU | Price | What you get back |
|---|---|---|---|
| **Annadaan** अन्नदान — 11 meals | `SNF-DAAN-ANNA-11` | **$31 / ₹751** | Dated photo of the distribution, kitchen receipt, count served. PLACEHOLDER partner per city. |
| **Annadaan** — 51 meals | `SNF-DAAN-ANNA-51` | **$108 / ₹2,100** | as above |
| **Gau Seva** गौ सेवा — one day's fodder | `SNF-DAAN-GAU` | **$21 / ₹501** | Gaushala receipt, dated photo. PLACEHOLDER partner per city. |

**Honestly:** *This is* money, forwarded, minus a stated fee, with proof. *This is not* a rite, and it will not appear in your recording as one. We separate daan from anushthan deliberately, because bundling charity into a ceremony is how the amount actually reaching the kitchen becomes unknowable.

---

### 3.12 What we do not sell — जो हम नहीं बेचते

**This is a published page** (`/refusals`, linked from the footer under Ethics & rites), not a buried disclaimer. It is a product feature.

| We do not offer | Why |
|---|---|
| **Dosha diagnosis or remedy rites** (kaal sarp, manglik, pitru dosh, shani sade sati packages) | Telling a stranger something is wrong with their chart and then selling the fix is fear, sold by the hour. We do not do it. |
| **Tripindi Shraddha and comparable "unsatisfied ancestor" rites** | The entire sales premise is that your dead are in distress and you caused it. No. |
| **Shipped prasad, Ganga jal bottles, threads, rudraksha, yantras** | Snanify is fully digital. Nothing is ever posted to you. |
| **Asthi visarjan** (immersion of ashes) | It requires human remains to be physically transported to India. That is outside what a digital service can honourably handle. |
| **Named guarantees of outcome** — a job, a visa, a pregnancy, a cure, a marriage | We cannot deliver these and neither can anyone charging you for them. |
| **Urgency, scarcity, or guilt in any bereavement flow** | Product rule, enforced in code (§9.2). |

---

# 4. Vessels & price table

## 4.1 Pricing logic

**Two ladders, not one converted number.**

- **Vishwa Dar (विश्व दर) — USD**, built on shagun numbers ending in 1: `11 · 21 · 31 · 51 · 81 · 108 · 151 · 251 · 501 · 1008`.
- **Bharat Dar (भारत दर) — INR**, built on the traditional dakshina ladder: `101 · 251 · 501 · 751 · 1,100 · 2,100 · 5,100 · 11,000 · 21,000`.

They are **not conversions of each other.** At roughly ₹88 to the dollar, the Bharat Dar lands at **20–40% of the Vishwa Dar**. That is intentional and it is stated on the pricing page, in both languages:

**EN:** *"We charge two prices. India pays what India can offer; the world pays what the world can. We would rather say this plainly than hide it behind your IP address."*
**HI:** *"हम दो दर रखते हैं। भारत वही अर्पित करता है जो भारत के लिए उचित है; शेष विश्व वही जो उसके लिए। हम इसे आपके IP पते के पीछे छिपाने के बजाय स्पष्ट कह देना बेहतर समझते हैं।"*

**Enforcement:** Bharat Dar requires an Indian payment instrument (UPI, RuPay, or an Indian-issued card). Not IP geolocation — IP is trivially defeated and punishes travellers. The currency selector is always visible and always switchable; the payment method decides eligibility at checkout, and the message on rejection is plain, not accusatory.

**Other currencies:** GBP, EUR, AUD, CAD, AED, SGD, NZD, MYR are derived from the USD ladder, rounded up to the nearest local shagun-adjacent number (£11, €11, A$16, C$16, AED 41, S$16 for the $11 tier). Fixed for a quarter; not live FX — price flicker on a religious purchase reads as a bazaar.

**Premiums (each shown with its reason printed beside it):**

| Premium | Vishwa | Bharat | Reason shown to user |
|---|---|---|---|
| Brahma Muhurat slot (04:00–05:30 IST) | +$21 | +₹501 | *"The ritvik is at the ghat before four. Waived on Varsh, Kutumb and Ekantik."* |
| Parva day (Kartik Purnima, Makar Sankranti, Mahashivratri, Ganga Dussehra, Amavasya, Pitru Paksha) | +$31 | +₹751 | *"Ghat access is contested and ritvik hours are scarce on this date."* |
| Kumbh / Ardh Kumbh at the host river | +$81 | +₹2,100 | *"Separate permissions and crowd management. Booked as a distinct calendar."* |
| Additional name beyond tier cap (max 21 total, Samuhik) | +$11 | +₹251 | *"Each name adds time to the reading."* |

**Never charged for:** the recording, the Sankalp Patra, additional Patra language versions, re-issue after a mispronunciation, the verify URL, or timezone conversion.

## 4.2 The vessels

| Product | SKU | Vessel | Names | Includes | **Vishwa (USD)** | **Bharat (INR)** |
|---|---|---|---|---|---|---|
| **Ekal Snan** एकल स्नान | `SNF-SNAN-EKAL` | Samuhik | 1 | Sankalp · Pratinidhi Snan · recording (3 yrs) · Patra | **$11** | **₹251** |
| **Parivar** परिवार | `SNF-SNAN-PARIVAR` | Samuhik | up to 6, one gotra | + Pitru **Sankalp** (naming, not tarpan) · priority slot · recording kept permanently | **$31** | **₹751** |
| **Ekantik Snan** एकांतिक स्नान | `SNF-SNAN-EKANTIK` | **Ekantik** | up to 11 | + private session · 2-way audio with the ritvik before & after · Tridev Tarpan included · Nadi Puja included | **$151** | **₹5,100** |
| **Varsh** वार्षिक | `SNF-VARSH` | Samuhik | 1 | 12 snans/yr, any river, any occasion · Brahma Muhurat waived · Parva premium waived · family archive · tithi almanac | **$108** | **₹2,100** |
| **Parivar Varsh** परिवार वार्षिक | `SNF-VARSH-PARIVAR` | Samuhik | up to 6 | Varsh at Parivar scope + 2 Pitru Tarpans included | **$251** | **₹6,100** |
| **Kutumb** कुटुंब | `SNF-VARSH-KUTUMB` | **Ekantik** | up to 11 | 12 private sessions/yr · a named ritvik who keeps your family's record · all premiums waived · Pitru Paksha tarpan included · one Pind Daan credit | **$1,008** | **₹21,000** |

## 4.3 Add-on rites

| Rite | SKU | Vishwa | Bharat | Duration | Standalone? |
|---|---|---|---|---|---|
| Deep Daan | `SNF-RITE-DEEPDAAN` | $11 | ₹101 | 3 min | yes |
| Pitru Tarpan | `SNF-RITE-TARPAN-PITRU` | $21 | ₹501 | 12 min | yes |
| Aarti Sankalp | `SNF-RITE-AARTI` | $21 | ₹501 | 25 min | yes |
| Tridev Tarpan | `SNF-RITE-TARPAN-TRI` | $31 | ₹751 | 18 min | yes |
| Nadi Puja | `SNF-RITE-NADIPUJA` | $31 | ₹751 | 18 min | yes |
| Abhishek | `SNF-RITE-ABHISHEK` | $31 | ₹751 | 12 min | yes |
| Sankalpit Japa 1,008 | `SNF-RITE-JAPA` | $51 | ₹1,100 | 55 min | yes (Ekantik) |
| Path | `SNF-RITE-PATH` | $51 | ₹1,100 | 35–70 min | yes (Ekantik) |
| Sankalpit Japa 10,008 | `SNF-RITE-JAPA-10K` | $251 | ₹5,100 | 3 days | yes (Ekantik) |
| Pind Daan | `SNF-RITE-PINDDAAN` | $251 | ₹5,100 | 45 min | yes (Ekantik, Prayagraj) |
| Annadaan ×11 | `SNF-DAAN-ANNA-11` | $31 | ₹751 | — | yes |
| Annadaan ×51 | `SNF-DAAN-ANNA-51` | $108 | ₹2,100 | — | yes |
| Gau Seva | `SNF-DAAN-GAU` | $21 | ₹501 | — | yes |

## 4.4 Recurring

| Product | SKU | Vishwa | Bharat | What it is | Why anyone keeps paying |
|---|---|---|---|---|---|
| **Nitya Seva** नित्य सेवा | `SNF-SUB-NITYA` | **$21/mo** | **₹501/mo** | One Samuhik snan per month, river of your choosing · rollover up to 3 · 20% off all add-ons · family archive · tithi calendar synced to your phone | It is a practice, not a purchase. The tithi calendar alone (see below) does real work. |
| **Smaran** स्मरण | `SNF-SUB-SMARAN` | **$81/yr** | **₹2,100/yr** | A permanent memorial page for one departed person + **automatic Pitru Tarpan on their correct tithi each year** + tarpan during Pitru Paksha | **The tithi drifts against the Gregorian calendar every single year.** Almost nobody computes it correctly. This product remembers, and performs. That is a real service, and it owes nothing to grief. |
| **Varsh / Parivar Varsh / Kutumb** | above | | | Prepaid annual, not auto-renewing by default | — |

**Smaran guardrails — build these, they are not optional:**
- Exactly **one** notification per observance, sent 3 days ahead. Copy: *"Ramesh Kumar Sharma's tithi falls on Tuesday 14 October this year. The tarpan is scheduled for 06:10 IST. — इस वर्ष रमेश कुमार शर्मा की तिथि मंगलवार, 14 अक्टूबर को पड़ रही है। तर्पण प्रातः 06:10 IST पर नियत है।"* Nothing more.
- **Forbidden in this flow:** countdowns, "don't let them be forgotten", "X families have already", any red UI, any upsell of any kind.
- Cancellation is one click and the confirmation reads: *"Cancelled. This changes nothing for them. The memorial page stays up, free, for as long as we exist. — रद्द कर दिया गया। इससे उनके लिए कुछ नहीं बदलता। स्मृति पृष्ठ जब तक हम हैं, नि:शुल्क बना रहेगा।"* **The memorial page genuinely stays up free.** If it does not, do not ship this sentence.
- Auto-renewal notice at 30 and 14 days, both cancellable in the email itself.

## 4.5 Composition rules (engineering)

```ts
type Vessel = "samuhik" | "ekantik";

type Rite = {
  sku: string;
  name: { en: string; hi: string };
  vessel: Vessel[];              // where it may be performed
  rivers: RiverId[] | "all";     // PIND_DAAN => ["triveni"]
  durationMin: number;
  price: { usd: number; inr: number };
  standalone: boolean;
  order: number;                 // canonical sequence within a session
  honesty: {                     // REQUIRED. No rite renders without it.
    is:   { en: string; hi: string };
    isNot:{ en: string; hi: string };
  };
  interstitial?: "pind_daan" | "health";  // blocking pre-checkout screen
};
```

Rules:
1. Add-ons attach to a Snan vessel **or** stand alone as their own micro-session (a standalone Deep Daan still gets sankalp, recording, Naam Kshan and Patra).
2. Session runtime = base snan (~38 min) + Σ add-on durations. Ekantik sessions hard-cap at 120 min; beyond that the system splits across two muhurats and says so at checkout.
3. `SNF-RITE-JAPA*`, `SNF-RITE-PATH`, `SNF-RITE-PINDDAAN` are Ekantik-only — attempting them on a Samuhik vessel silently upgrades the cart to Ekantik with the price change shown, never absorbed.
4. Samuhik sessions close at 51 sankalps. **Never raise this without removing the name-reading guarantee, which is not permitted.**
5. Tier caps: Ekal 1 name · Parivar 6 · Ekantik 11 · Kutumb 11. Overflow billed per §4.1, absolute max 21.

---

# 5. Occasions

Occasion drives ~everything in this category. Each occasion is a first-class object with a landing page, a lead time, and a recommended bundle. **Never** an occasion page with fear framing.

| Occasion | HI | Recommended | Lead time | Peak | Notes |
|---|---|---|---|---|---|
| **Pitru Paksha** (16 days, Bhadrapada) | पितृ पक्ष | Parivar + Pitru Tarpan, or Smaran | book 30d ahead | **the single largest revenue event of the year** | Capacity must be planned months out. Sept–Oct, PLACEHOLDER exact dates. |
| **Barsi / death anniversary** | बरसी | Pitru Tarpan, or Smaran subscription | recurring | year-round | Tithi-based, not Gregorian. This is what Smaran exists for. |
| **Post-bereavement (could not attend the funeral)** | अंत्येष्टि में सम्मिलित न हो पाना | Pitru Tarpan; Pind Daan if the family wishes | 0–30d | year-round | **Dedicated flow with all upsell disabled and no marketing follow-up ever.** Highest-care path in the product. |
| **Amavasya** (esp. Mauni, Somvati, Mahalaya) | अमावस्या | Pitru Tarpan + Deep Daan | 7d | monthly | Steady recurring demand. |
| **Birthday (tithi or date)** | जन्मदिन / जन्म तिथि | Ekal Snan + Deep Daan | 7d | year-round | Best gifting SKU — see §8. |
| **New home / griha pravesh** | गृह प्रवेश | Nadi Puja + Ekal Snan | 14d | year-round | Framed as accompaniment, never replacement. |
| **New job / new business** | नया कार्य / नया व्यवसाय | Ekal Snan + Nadi Puja | 7d | year-round | No "remove obstacles" language. Gratitude framing. |
| **Illness / surgery / recovery** | रोग / शल्यक्रिया | Sankalpit Japa (Mahamrityunjaya) + Ekal Snan | 3d, rush available | year-round | **Health interstitial mandatory.** No repeat marketing. |
| **Marriage / anniversary** | विवाह / वर्षगाँठ | Parivar + Nadi Puja | 21d | Nov–Feb, Apr–May | Couples' Patra variant (§6.4). |
| **Exams & results** | परीक्षा | Ekal Snan + Deep Daan | 3d | Feb–Jun | **Copy must be modest.** No implication that a snan produces a result. Parents are the buyer; students are watching. |
| **Mahashivratri** | महाशिवरात्रि | Abhishek at Ujjain or Haridwar | 30d | Feb–Mar | High volume. |
| **Kartik Purnima / Dev Deepawali** | कार्तिक पूर्णिमा / देव दीपावली | Deep Daan + Aarti Sankalp | 30d | Nov | Highest-emotion streaming night. |
| **Makar Sankranti** | मकर संक्रांति | Ekal Snan at Prayagraj | 30d | Jan | |
| **Ganga Dussehra** | गंगा दशहरा | Ekal Snan + Nadi Puja at Haridwar | 30d | May–Jun | |
| **Kumbh / Ardh Kumbh** | कुंभ / अर्ध कुंभ | Ekal or Parivar, Kumbh calendar | 90d | per cycle | Separate calendar, separate capacity, separate premium. |

**Occasion copy rule (enforced in review):** every occasion page states the occasion, what the rite is, and what it costs. None of them states or implies what will happen to you if you skip it.

---

# 6. The Sankalp Patra — संकल्प पत्र

Delivered as: web page (permanent URL), print-ready PDF (A4 + US Letter, 300dpi, CMYK-safe), and a 1200×1600 image for sharing. Typography and palette inherit the brand: Marcellus / Tiro Devanagari, night-ghat indigo `#080C19` field, marigold `#E3AC46` seal, `#F4ECDB` ink. Devanagari sets in Tiro, never a fallback. Uses the existing Logo seal mark (crescent-and-ripples) as the wax-seal device.

### 6.1 Contents (every field, in order)

| # | Field | Example |
|---|---|---|
| 1 | **Patra number** | `SNF-2026-GNG-0004417` — river code embedded |
| 2 | **Yajaman name(s)** — Latin **and** Devanagari, plus one optional additional script | Ananya Sharma / अनन्या शर्मा / அனன்யா ஷர்மா |
| 3 | **Gotra** | Bharadwaj / भारद्वाज |
| 4 | **Relationship of each additional name** to the primary yajaman | "Vikram Sharma — father" |
| 5 | **Pitru names** where applicable, with relationship and year | "Late Shri Ramesh Sharma — paternal grandfather — 1998" |
| 6 | **Sankalp, in your own words, verbatim, unedited** | Set in the display face. This is the emotional centre of the document. |
| 7 | **Sankalp formula slots as declared** — desha, kaal (samvat / ayana / ritu / maas / paksha / tithi / vaar / nakshatra), muhurat name | PLACEHOLDER — exact Sanskrit wording must be reviewed and signed off before any Patra is issued. Ship structure now, wording after review. |
| 8 | **Rites performed**, in the order performed, each with its duration | Sankalp · Pratinidhi Snan · Pitru Tarpan · Deep Daan |
| 9 | **River, ghat, and coordinates** | Ganga · Har Ki Pauri, Haridwar · 29.9568° N, 78.1707° E — PLACEHOLDER, verify per ghat |
| 10 | **Date & time, twice** — IST, and the yajaman's own timezone at booking | 14 May 2026, 04:24 IST / 13 May 2026, 18:54 CEST |
| 11 | **Tithi date** in the traditional calendar | PLACEHOLDER — sourced panchang, see Open Questions |
| 12 | **Officiating ritvik** — name and Snanify ritvik ID, whoever actually performed | PLACEHOLDER. Never the rostered name if a backup performed. |
| 13 | **Naam Kshan** — the timestamp your name is spoken | *"Your name is spoken at 07:41 in the recording."* |
| 14 | **Recording link + QR code** | |
| 15 | **Verification** — `snanify.com/verify/SNF-2026-GNG-0004417` + QR + SHA-256 of the recording segment | Public, no login. |
| 16 | **Seal** | The Snanify mark, embossed treatment. |
| 17 | **The footer line** | see below |

### 6.2 The footer line (verbatim, on every Patra, never removed, never shrunk below 9pt)

**EN:** *"This patra records that the rites named above were performed on your behalf, at the place and hour named, by the person named. It is a record of what was done. It is not a promise of what will follow."*

**HI:** *"यह पत्र इस बात का अभिलेख है कि ऊपर वर्णित अनुष्ठान, वर्णित स्थान और समय पर, वर्णित व्यक्ति द्वारा, आपके निमित्त संपन्न हुए। यह किए गए कार्य का अभिलेख है। आगे क्या होगा, इसका वचन नहीं।"*

### 6.3 Languages
Body text in EN and HI, both always generated. Names additionally renderable in Tamil, Telugu, Kannada, Malayalam, Bengali, Gujarati, Marathi, Odia, Gurmukhi. Free. A user who cannot see their mother's name in her own script has not received the thing they paid for.

### 6.4 Variants
`patra.standard` · `patra.parivar` (name block for 6) · `patra.pitru` (memorial framing, restrained, no imagery of grief) · `patra.couple` (marriage/anniversary) · `patra.gift` (names the giver: *"Offered for you by —"*).

### 6.5 What is NOT on it
No "certified", no "authenticated by", no invented registry number, no temple crest we do not have the right to, no priest photograph without written consent, no claim of religious authority beyond "this was performed."

---

# 7. Landing-page tiers → catalog mapping

The three live tiers keep their names and prices. Their contents are now explicit:

| Live tier | Currently says | Now means, precisely | Change required |
|---|---|---|---|
| **Ekal Snan $11** | "One river, one sankalp / Live attendance + recording / Digital Sankalp Patra" | Samuhik vessel · Sankalp + Pratinidhi Snan · recording 3 yrs · Patra · Naam Kshan · verify URL | Add "one name, within a shared session of up to 51" to the feature list. **Do not let this stay implicit.** Add Bharat Dar ₹251. |
| **Parivar $31** | "Up to six names, one gotra / Priority muhurat / HD recording kept for good / **Pitru sankalp** for ancestors" | Samuhik · 6 names · ancestors **named in the sankalp** · recording permanent | **Critical:** the UI must distinguish *Pitru Sankalp* (naming, included) from *Pitru Tarpan* (offering, +$21). Add a one-line explainer under that feature: *"Your ancestors are named. To make the water offering itself, add Pitru Tarpan."* Add ₹751. |
| **Varsh $108** | "Twelve snans / Every river, every occasion / Brahma muhurat priority / Family archive + annual almanac" | 12 Samuhik snans, 1 name, any river, Brahma Muhurat and Parva premiums waived, tithi almanac | Bound "every occasion" to "premiums waived on every occasion, Kumbh excepted." Add ₹2,100. |

**New tiers to add to the pricing section:** Ekantik Snan ($151 / ₹5,100) placed **above** Varsh as the quality anchor, and Nitya Seva ($21/mo) as a footer-level option. Keep "Most chosen" on Parivar. The line *"No subscription you cannot leave"* stays true and now also covers Nitya and Smaran — both cancellable in one click, prorated.

---

# 8. Gifting

Gifting is a large fraction of diaspora demand (a child in Toronto booking for a mother in Lucknow) and needs its own flow, not a checkbox.

- Any SKU can be bought as a gift. Recipient supplies nothing — the giver enters name, gotra and sankalp, or leaves the sankalp blank and the recipient fills it in.
- Delivery: an email or WhatsApp card, scheduled to a chosen date, in the recipient's language, containing the muhurat, the stream link, and the sentence *"— has offered a snan in your name."*
- The Patra names both parties.
- **Gift flow is exempt from all reminder cadence.** One card, one delivery email, nothing else, ever.
- Gift Deep Daan at $11 / ₹101 is the entry product and should be one tap from any occasion page.

---

# 9. Product ethics, enforced in code

## 9.1 Required per rite
`honesty.is` and `honesty.isNot` are non-nullable. A rite without both fails the build. They render in full on the product page, in the cart, and in the confirmation email — never behind a "read more".

## 9.2 Forbidden mechanics (lint rule + design review checklist)
- No countdown timers on any bereavement, tarpan, pind daan, or Smaran surface.
- No "X people are viewing" / "only N left" **except** the honest Samuhik seat counter, which shows the true number and no colour change.
- No red or alarm colour anywhere in the ancestral flows.
- No upsell, cross-sell, or recommendation module in: post-bereavement, Pind Daan, Smaran, or health-flagged Japa flows.
- No push notification on a death anniversary without explicit per-person opt-in.
- No "your ancestors", "your karma", "the consequences of", or any second-person claim about spiritual jeopardy — anywhere in the product, marketing, or lifecycle email.
- No auto-renew without notice at 30 and 14 days.
- No dark-pattern cancellation. One click, no retention offer on Smaran.

## 9.3 Sankalp free-text moderation
- **Block:** intent to harm a named third party; sexual content; content targeting a private individual.
- **Do not touch:** grammar, spelling, theology, language mixing, or emotional register. It is their prayer.
- **Flag, don't block:** health/cure language → show the §3.8 notice.
- Human review queue for anything flagged, SLA 2h, and if a sankalp is refused the payment is voided, not held, with a plain explanation.

---

# 10. Operations model (what makes the above true)

| | |
|---|---|
| **Ritvik roster** | PLACEHOLDER. Per river: 2 primary + 1 backup, minimum. Each with a public profile: name, ritvik ID, training lineage, years, languages, and a photograph — **only with written consent**, and the profile is never presented as an accreditation Snanify issued. |
| **Sessions/day/river** | Samuhik: 3 (Brahma Muhurat, mid-morning, evening aarti-adjacent). Ekantik: up to 4, scheduled around them. |
| **Capacity ceiling** | 51 × 3 = 153 Samuhik sankalps/river/day = 918/day across six rivers. Pitru Paksha needs 3–4× this. Plan the roster in June. |
| **Streaming** | Two independent uplinks per ghat (primary 5G bonded, secondary local ISP). PLACEHOLDER: vendor. Recording written locally at the ghat as well as to the cloud — the local copy is the fallback that makes the re-perform guarantee affordable. |
| **Name index** | The ritvik's sheet is barcoded per sankalp; an operator taps a hardware button as each name is read. That tap generates the Naam Kshan. Manual QA pass on 100% of Ekantik and a 10% sample of Samuhik. |
| **Panchang** | PLACEHOLDER — must come from one named, licensed ephemeris source with a stated ayanamsa (Lahiri assumed) and a stated sunrise convention per ghat coordinate. **Until that contract exists, every muhurat time in the product must be labelled "provisional" and confirmed manually before booking opens.** The landing page already says timings are "confirmed when booking opens" — honour it. |

---

# 11. Copy blocks to add to `src/lib/content.ts`

Add a `catalog` key alongside `pricing`, structured as `{ vessels, rites, occasions, patra, refusals }` following the existing shape (parallel `en` / `hi` objects, arrays of `{ name, sub, price, features }`-style records). Key strings, both languages:

```
catalog.eyebrow        EN "The catalog"                  HI "सेवा सूची"
catalog.title          EN "Every rite, named."           HI "हर अनुष्ठान, नाम सहित।"
catalog.lede           EN "What is performed, by whom, for how long, and what it is not."
                       HI "क्या संपन्न होता है, किसके द्वारा, कितनी देर — और क्या नहीं होता।"
catalog.honestyIs      EN "What this is"                 HI "यह क्या है"
catalog.honestyIsNot   EN "What this is not"             HI "यह क्या नहीं है"
catalog.naamKshan      EN "Your name is spoken at"       HI "आपका नाम बोला जाता है"
catalog.vesselNote     EN "Held together" / "Held alone" HI "समूह में संपन्न" / "एकांत में संपन्न"
catalog.rateWorld      EN "World rate"                   HI "विश्व दर"
catalog.rateBharat     EN "India rate"                   HI "भारत दर"
catalog.refusals       EN "What we do not sell"          HI "जो हम नहीं बेचते"
catalog.verify         EN "Verify this patra"            HI "इस पत्र का सत्यापन करें"
```

Add to `footer.cols[0].links`: `"The catalog"` / `"सेवा सूची"` and `"What we do not sell"` / `"जो हम नहीं बेचते"`.


---

## Open questions for a human

- PANCHANG SOURCING — which ephemeris? A licensed Drik Panchang / Swiss Ephemeris (pyswisseph) pipeline with a declared ayanamsa (Lahiri assumed) and a per-ghat sunrise convention is required before any muhurat time is stated as fact. Until that exists, every time in the product must carry a 'provisional' label. Also needs a named human panchang authority to sign off on Pitru Paksha and parva dates each year — an ephemeris does not settle tithi-boundary conventions that differ by region.
- RITVIK PARTNERSHIPS — every priest name, ID, lineage, and photograph in this spec is PLACEHOLDER. Required per river: 2 primary + 1 backup, a written agreement covering per-session rates, the name-reading guarantee, on-camera consent, and the right to publish their name on a customer's certificate. Photograph consent must be separate and revocable.
- GHAT ACCESS — written permission to film and perform commercially at each of the six ghats, plus a named alternate ghat per river for closures. Har Ki Pauri and Vishram Ghat in particular have local samitis whose consent is not the same as municipal consent. Aarti Sankalp cannot ship until the arrangement with each aarti samiti is documented in one plain sentence.
- SANSKRIT WORDING — the sankalp formula slots (desha-kaal-gotra-nama-kamana) are structurally standard, but the exact recited wording per rite and per river is PLACEHOLDER and must be reviewed by a qualified pandit advisory panel before a single Sankalp Patra is issued. Same for the Sankalpit Japa mantra list.
- PIND DAAN — is it in scope at all for v1? It is the highest-revenue, highest-emotional-weight, highest-reputational-risk SKU in the catalog. Recommend deferring to v2 until the Prayagraj ritvik relationship has a track record. Gaya stays out until there is a named person there.
- PAYMENTS — dual-currency needs Stripe (world) + Razorpay/Cashfree (India, UPI + RuPay). The Bharat Dar gate depends on reading the payment instrument's issuing country, which constrains provider choice. Also: FEMA and RBI rules on collecting INR for a service and USD from abroad, and whether Snanify India Pvt Ltd and a foreign entity are both required.
- TAX & LEGAL — is a streamed religious rite a service (GST 18%?) or exempt? Advertising standards on religious services in India and in the target diaspora markets (US, UK, Canada, Australia, UAE, Singapore) — several restrict claims about spiritual or health outcomes. The refusals list in §3.12 is partly a compliance asset; a lawyer should confirm it is sufficient.
- THE FABRICATED LANDING STATS — '1,20,000+ sankalps offered' and '48 countries served' are on the live site and are not true. They must be removed, or replaced with the real running count (which is honest even at 0 — 'Sankalps offered since March 2026: 41' is more persuasive to this audience than a fake six-figure number). This is the most urgent item in this document.
- DAAN PARTNERS — named gaushala and annadaan kitchen per city, with a receipting process that survives audit. The stated 15% handling fee needs to actually cover the operational cost, or it is not honest either.
- ANNADAAN / GAU SEVA SCOPE — these are the only non-ritual SKUs and they complicate the 'nothing physical' story (a meal is physical, it just isn't shipped to the customer). Confirm the founder is comfortable holding this line, or cut them.
- SMARAN'S FREE-FOREVER PROMISE — the cancellation copy promises the memorial page stays up free permanently. That is a real perpetual liability. Either commit to it and budget for it, or rewrite the sentence. Do not ship it unbudgeted.
- PRICE POINTS TO VALIDATE — $151 Ekantik and $1,008 Kutumb are reasoned but untested. Kutumb in particular assumes a diaspora segment that will pay four figures annually for a named ritvik relationship; that hypothesis should be tested with ten conversations before it is built.
- RECORDING RETENTION & PRIVACY — Samuhik recordings contain 51 households' names spoken aloud. Every buyer receives a video naming 50 strangers and their dead. This needs a decision: publish the full session to all participants (transparent, but a real privacy exposure under GDPR for EU customers), or deliver a per-household clip window around the Naam Kshan plus the shared snan segment. Recommend the latter; it changes the encoding pipeline and must be settled before build.

---

## Adversarial review

**Verdict:** needs-work

### Credibility risks

- FLAGSHIP PRODUCT NAME IS MISSPELLED. 'समूहिक' is not a word. The correct form is सामूहिक (sāmūhika, from समूह). It appears in the vessel table, in the verbatim Hindi pricing copy, and by implication across SKUs. Every Hindi-literate visitor sees a typo in the name of the thing they are buying, on the page that argues you are more careful than your competitors. This single error costs more trust than the verify endpoint buys.
- 'Ekantik' (एकांतिक / ऐकान्तिक) does not mean 'private session'. In Vaishnava/Pancharatra usage ekantika/ekantin means exclusive, single-pointed devotion to one deity. Using it as a tier name for 'we booked the priest for you alone' reads to an informed Hindu as a marketing team that grabbed a Sanskrit-sounding word from a glossary. The plain correct words exist: व्यक्तिगत / निजी अनुष्ठान.
- 'Tridev Tarpan' for deva-rishi-pitru tarpan is wrong. 'Tridev' in ordinary Indian usage means Brahma-Vishnu-Mahesh. You are selling a rite whose name says one thing and whose content is another. The traditional name is देव-ऋषि-पितृ तर्पण or त्रिविध तर्पण.
- THE JAPA MATH IS PHYSICALLY IMPOSSIBLE AND YOU PROMISED AN UNBROKEN RECORDING PROVING IT. 1,008 Gayatri or Mahamrityunjaya in ~55 minutes is 3.3 seconds per repetition; either mantra recited properly takes 10-12 seconds, so 1,008 is 2.5-3.5 hours. You simultaneously guarantee 'unbroken recording of the recitation with a visible count... the full duration, not a highlight.' The first customer who watches has a debunking video. This is the most falsifiable claim in the document.
- THE NAME-READING MATH ALSO DOES NOT CLOSE. §3.1 says ~40s per sankalp (place, kaal, gotra, name, the user's stated intention). 51 × 40s = 34 minutes. The rationale defends the cap with '~6 seconds' per name, and the timeline gives the entire naming block T+0 to ~T+6. Six seconds cannot contain desha-kaal-gotra-naam-sankalp. The headline structural decision is defended with an operational number the rest of the document contradicts.
- STRUCTURAL PRIVACY FAILURE IN THE SAMUHIK PRODUCT. Every purchaser receives a recording of a session in which 50 other households' names, gotras, dead relatives' names and years of death, and freely-typed sankalp intentions were read aloud. You explicitly anticipate that users 'will type their cancer diagnosis into that box' — and then you broadcast it live and ship the archive to fifty strangers. Under GDPR (footer says Berlin) religious belief and health are Art. 9 special categories; under India's DPDP Act 2023 this is unconsented disclosure. This is not a policy gap, it is the core mechanic of the cheap tier.
- THE PUBLIC /verify/<id> ENDPOINT IS A DOXXING SURFACE. No-login, publicly fetchable pages carrying a real person's name, gotra, ghat, timestamp and ancestral data will be indexed, scraped and shared. Gotra is caste-adjacent data. For diaspora users in the Gulf, in interfaith marriages, or in workplaces where religious practice is private, a public record of their Hindu rite is a material harm. The feature sold as the trust mechanism is the largest privacy liability in the catalog.
- GOTRA IS TREATED AS UNIVERSALLY AVAILABLE. It is not. Very large numbers of Hindus — many non-Brahmin, Dalit and Adivasi communities, many Bengali/Odia/Tamil/Malayali families, adoptees, children of interfaith marriages, converts — do not know or do not have a gotra. Making it a required field silently encodes a caste-lineage gate into a product addressed to 'Indians worldwide'. The traditional fallback rule (Kashyapa gotra when unknown) is not mentioned anywhere.
- THE SMARAN FLAGSHIP'S CORE CLAIM IS WRONG FOR A LARGE MINORITY OF CUSTOMERS. 'Tithi-accurate annual shraddha' assumes one reckoning. Amanta and purnimanta calendars disagree on the month; Bengali and Odia conventions differ again; Tamil and Malayali families commonly observe by solar month and nakshatra, not tithi at all. A subscription whose entire value is 'we remember the correct date' will send a meaningful share of South Indian and Eastern customers the wrong date, annually, forever, about their dead parent. The worst possible failure for the highest-trust product.
- 'DAKSHINA LADDER' IS A CATEGORY ERROR WITH COMMERCIAL BENEFIT. Dakshina is by definition voluntary, given afterwards, in an amount the yajamana chooses. A mandatory fixed price in a checkout cart is a fee (शुल्क). Calling it dakshina borrows the moral cover of a gift for a commercial transaction — and the live landing page already promises 'no hidden dakshina', so the word is now used two contradictory ways.
- NO DISCLOSURE OF WHERE THE MONEY GOES. In a document this preoccupied with trust, the number an Indian customer actually cares about — what share of the $11 reaches the ritvik, the ghat, the samiti, and what Snanify keeps — is absent. Its absence beside eight honesty blocks reads as ethics performed on the cheap items and withheld on the expensive question. It is also exactly what the exploitative competitors omit.
- PASS-THROUGH DAAN (ANNADAAN, GAU SEVA) IS A REGULATORY TRAP. Foreign money routed to an Indian entity for charitable purposes engages FCRA; no registered partner is named, no receipting story, no 80G/501(c)(3) position, no audit. Separately, 'Gau Seva' sold to diaspora is the most politically loaded charitable category in India today — cow-shelter funding sits directly adjacent to gau-raksha politics. For a brand whose stated position is explicitly NOT saffron-nationalist, this SKU undoes the positioning by itself.
- SANKALPIT JAPA IS MARKETED ON ILLNESS. 'Illness in the family, surgery, a long recovery' as the named use case, at $251, is desperation pricing however careful the disclaimer. In India this runs at the Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954, which prohibits advertisements ascribing magical or talismanic properties to anything for the treatment of disease — a disclaimer does not cure an advertisement that names the disease context as the occasion to buy. Consumer Protection Act 2019 misleading-advertisement provisions also apply. You correctly identify this as the highest-risk SKU and then market it on the risk.
- PROXY SANKALP FOR A HEALTHY, ABLE CUSTOMER IS THINNER THAN THE DOCUMENT ADMITS. Sankalpa is constitutively first-person ('aham... karishye'). Pratinidhi precedent is real for the ill, the aged, the genuinely unable — exactly the list §3.2 cites — but the business is sold to healthy diaspora professionals who could fly and choose not to. §3.2's honesty block is excellent; the vessel copy's 'Both are real... it is a different room' quietly launders the harder question that honesty block was written to face.
- NO ADHIKARA HANDLING FOR TARPAN AND PIND DAAN. Sold to 'anyone who has lost someone' with no note that eligibility rules vary sharply by sampradaya and region — including the widely-held prohibition on performing pitru tarpan while one's father is living. A $21 checkbox will cause customers to commit what their own family purohit tells them is a fault, after paying you for it. Also unaddressed: whether daughters may commission tarpan and pind daan. The ritvik will decide that at the ghat, after you have taken the money.
- 'PRATINIDHI SNAN' AND 'NAAM KSHAN' ARE COINED TERMS presented in the same Devanagari-and-italics register as genuine traditional vocabulary (sankalp, tarpan, achamana, arghya). Manufacturing traditional-sounding terminology is precisely the move the honesty blocks exist to disavow.
- TALAKAVERI CANNOT SUPPORT THE ADVERTISED RITE. It is a source-kundike and temple tank in Kodagu under temple authority, with seasonal flow — not a ghat where a ritvik enters flowing water for three immersions. 'Pratinidhi Snan — the dip' as specified cannot be performed there, and the catalog now stacks abhishek on top of it.
- HEREDITARY PUROHIT INSTITUTIONS ARE NOT ACKNOWLEDGED ANYWHERE. Har Ki Pauri is administered by Shri Ganga Sabha; Prayagraj pind daan runs through the Prayagwal purohits; Ram Kund, Vishram Ghat and Ram Ghat each have their own tirth-purohit and samiti structures with hereditary rights to perform rites for pilgrims. Commissioning rites and commercial filming at these ghats without those bodies is not a PLACEHOLDER — it is a live permissions-and-local-conflict problem that could stop operations after launch.
- ARGHYA BEFORE SUNRISE IS PRESENTED AS CANONICAL. The reference case is Brahma Muhurat (~04:24) and the timeline gives 'water offered to the sun (or, before sunrise, to the direction of sunrise)' at T+16. Surya arghya is given at or after sunrise. Small — but it is the kind of small wrongness that tells an informed viewer the liturgy was assembled rather than sourced.
- NO SAMPRADAYA DECLARATION. The whole liturgical script is one North-Indian Smarta frame — achamana with 'the three names', a single sankalp formula, one tarpan procedure. Smarta, Sri Vaishnava, Madhva, Shaiva, Bengali and Kerala practice differ in ways your customers will notice in their own family's rite. Either declare the tradition plainly or offer variants; do not present one as the rite.
- LIVE LANDING-PAGE FABRICATIONS ARE ONLY PARTLY FLAGGED. The spec correctly condemns '1,20,000+ sankalps' and '48 countries' — but the same page ships a 'Live now · Har Ki Pauri' badge, a 'Next muhurat 04:24 IST · opens in 6h 12m' countdown card, and a footer link to 'Our priests'. All fabricated, none flagged. Every trust mechanism in this document is being built on top of a page that is currently lying.
- NO LABOR STORY. Who the ritviks are, how they are vetted, what they are paid, whether they consent to being filmed performing rites for strangers three times a day, what burnout looks like at scale — absent from a document that states dignity is a product requirement. Dignity that stops at the customer is marketing.
- 'Grandparents watching with grandchildren' and 'the diaspora's most emotionally direct product' is a sentence about emotional leverage sitting inside an ethics document. Naming the lever in the SKU rationale is the tell that some of the restraint is aesthetic rather than structural.
- EIGHT MANDATORY NON-COLLAPSIBLE HONESTY BLOCKS PLUS A REFUSAL PAGE PLUS INTERSTITIALS PLUS NOTICES BECOMES COMPLIANCE THEATRE. Past a certain density, disclosure stops informing and starts inoculating — the reader skims the wall of caveats and the wall itself becomes the trust signal.
- NO DATA SECTION AT ALL. No lawful basis, no retention period, no deletion path, no position on processing a deceased person's data, no position on a Parivar purchaser submitting six living relatives' names and gotras without their consent, no DPIA. With a Berlin footprint and Indian data subjects this is the most concrete legal exposure in the document and it is not mentioned once.
- NO TAX POSITION. Indian GST on digital services to Indian consumers, US state nexus, and whether this is a service or an offering. If any customer infers charitable-donation treatment from the dakshina/daan framing, that inference is yours to have caused.
- SPEC IS TRUNCATED MID-SENTENCE AT §3.8. §3.9 (Path), the vessel and pricing tables, the Smaran detail, the refusal-list page, and §9.3 — the moderation policy the document cites twice — do not exist. Several of the hardest questions live in the missing half.

### Required fixes

- Fix the Hindi. सामूहिक not समूहिक, everywhere including SKUs and copy decks. Replace 'Ekantik' with व्यक्तिगत or निजी अनुष्ठान. Rename 'Tridev Tarpan' to देव-ऋषि-पितृ तर्पण. Change 'एक दूसरे का घटिया रूप नहीं' — घटिया is colloquial and pejorative, wrong register for this brand — to 'एक दूसरे से न्यून नहीं'. Set the section heading in Devanagari, 'यह क्या है / यह क्या नहीं है', not romanised, on the Hindi site.
- Reconcile the arithmetic before anything else ships. Decide what is actually read per sankalp (name + gotra only, ~8s, or name + gotra + intention, ~40s), derive the cap from it, and publish the derivation. If the intention is read, 51 is impossible in a 45-minute session and the honest cap is 15-20. Do the same for japa: state the real duration (1,008 Gayatri ≈ 3 hours), price accordingly, and keep the unbroken-recording guarantee — it is only worth anything if the number is true.
- Restructure the Samuhik recording so it does not distribute other customers' data. Concretely: in Samuhik read name + gotra only, never the free-text sankalp, and deliver each customer a per-customer clip (their Naam Kshan plus context) and the impersonal ghat segments — not the full multi-household archive. Free-text sankalp is read aloud only in Ekantik, where the only listener is the household that wrote it. This is a product change, not a policy paragraph.
- Rebuild /verify as capability-based and minimal by default. Default payload: patra ID valid, session ID, ghat, UTC and IST timestamps, and the ritvik who actually performed — no personal names, no gotra, no sankalp text. Let the holder opt in per field to showing more. Serve noindex, rate-limit, and never make the ID guessable or sequential. Keep the verification promise; stop making it a public register of who prayed for what.
- Make gotra optional with a first-class 'I do not know' path that states the customary fallback plainly ('when the gotra is not known, Kashyapa gotra is used — this is the traditional rule, not a workaround'). Never require it, never gate a tier on it, and treat it as sensitive data in storage.
- Ask which panchang tradition the family follows before selling Smaran — amanta or purnimanta, and whether the family observes by tithi or by nakshatra/solar month (Tamil, Malayali and many others). If you cannot compute a tradition correctly, say so and do not sell Smaran to that family. Publish the source panchang by name and show the computed date with its reckoning printed beside it so the customer's own family can check it.
- Stop calling the price dakshina. Call it शुल्क / fee, plainly. If you want real dakshina, add it as an optional additional amount that goes 100% to the ritvik, with that fact stated and the split published.
- Publish the money split on the pricing page: of this fee, X to the ritvik, Y to the ghat or samiti, Z to Snanify. This will do more for Indian trust than the verify endpoint, and unlike the verify endpoint no competitor will copy it.
- Drop pass-through Daan from v1. If it returns, it returns with one named, audited, FCRA-registered partner, per-donation receipts issued by that partner rather than by you, and published annual totals. Drop Gau Seva entirely — the political adjacency is incompatible with the stated brand position and there is no version of it that reads as neutral to your own audience.
- Remove illness from the marketed occasions for Sankalpit Japa. Delete 'Illness in the family, surgery, a long recovery' from the who-it-is-for. Sell the japa as a count performed and recorded, and let users bring their own intention without you naming the disease context as the reason to buy. This addresses both the DMRA 1954 exposure and the ethical line.
- Add an adhikara note to every ancestral rite: who traditionally performs it, that rules vary by community, that some traditions prohibit pitru tarpan while one's father lives, and an explicit Snanify position that any descendant of any gender may commission — stated up front so no ritvik refuses at the ghat after payment. Add a plain line: 'if your family has a purohit, ask them first; we are not a replacement for your family's practice.'
- Mark coined vocabulary as coined. One line: 'Naam Kshan and Pratinidhi Snan are our names for these features, not traditional terms.' Keep the features; stop dressing them as inherited.
- Add a cooling-off period, 24 hours minimum, on Smaran, Japa-10K and anything above the $108 rung. The customer you are most likely to harm is a grieving person with a card at 2am, and a delay costs you almost nothing.
- Specify the Smaran failure and dunning flow and make it the strictest thing in the catalog: no payment-failure email may mention the departed at all; on failure the subscription simply ends; the copy is 'nothing is owed and nothing is lost'. Retire 'perpetual' as a word you cannot honour against a card on file, and add a named successor or handover for when the subscriber themselves dies.
- Fix the refund asymmetry. A Samuhik session runs regardless, so the ritvik's time is not incrementally committed and the 50% late-cancellation charge is unjustified there. Full refund for late Samuhik cancellation; keep the 50% for Ekantik, where the stated rationale is actually true.
- Make the alternate-ghat substitution opt-in rather than automatic. For many customers the specific tirtha — Brahmakund at Har Ki Pauri, not 'Ganga at Haridwar' — is the entire purchase. Offer move, reschedule, or refund and let them choose.
- Correct or remove Talakaveri as a snan location, since the rite as specified cannot be performed there. Correct the arghya timing relative to sunrise. Declare the sampradaya the liturgy follows in one plain sentence on every rite page.
- Add a purohit-institution section to the operational plan: Ganga Sabha at Har Ki Pauri, the Prayagwals at Sangam, and the equivalent bodies at Ram Kund, Vishram Ghat and Ram Ghat — not as PLACEHOLDER pricing inputs but as counterparties whose consent determines whether this business exists.
- Strengthen the anti-fraud story and stop overselling the spoken-session-ID device: it proves the recording is of that session, not that it was live or at the claimed place. Add commit-then-reveal (publish the session ID and a hash of the sankalp sheet at T−24h), keep a public clock or that morning's verifiable external signal in frame, and commit to an annual independent audit of sessions-sold versus sessions-performed. Third-party attestation is the only verification that is not Snanify verifying Snanify.
- Write the data section that does not exist: lawful basis for religious and health-adjacent data under GDPR Art. 9 and DPDP 2023, retention and deletion, the position on deceased persons' data, consent handling when a purchaser submits living relatives' names, and a DPIA. Do this before the catalog, because it constrains the catalog.
- Delete the fabricated landing-page elements in the same commit as the stats: the 'Live now · Har Ki Pauri' badge, the 04:24 IST countdown card, and the 'Our priests' footer link. Everything in this document is trust architecture on top of a page that is currently lying; fix the foundation first.
- Add the ritvik section: vetting, named compensation, filming consent, a sessions-per-day limit, and the right to decline a sankalp. Dignity as a product requirement has to include the person standing in the river.
- Cut the honesty blocks to two lines each and move the long form to a single 'What we do not claim' page. Strip the internal register from anything customer-facing — 'the grubbiest possible line item' and 'would be contemptible' are the right sentences in a strategy doc and the wrong ones on a product page.
- Finish the document. §3.9, the vessel and pricing tables, the Smaran detail, the refusal page, and §9.3 moderation policy — cited twice, never written — are where several of the hardest questions live.

### Must survive

- The Samuhik/Ekantik axis is the best idea in the document and the rationale is correct: an $11 rite cannot honestly be a private ceremony, collective puja is a genuine ancient category rather than a degraded tier, and naming it lets you sell the cheap thing without lying. Fix the Sanskrit, keep the structure.
- Deriving the session cap from the guarantee rather than picking an auspicious number and reasoning backwards — 'if we ever raised the cap we would have to stop reading names' — is exactly how to make a constraint load-bearing. The stated numbers are wrong; the method is right.
- The Naam Kshan as a concept: a checkable second rather than a 40-minute video nobody watches. It converts a faith purchase into a verifiable service without diminishing the faith. Genuinely novel and genuinely honest — just do not distribute the whole session to deliver it.
- Separating sankalp (naming) from tarpan (offering) and refusing to bundle them so a customer believes they bought one when they bought the other. This is the precise soft fraud the category runs on, and naming it is the sharpest theological judgment in the document.
- The named refusal list — no dosha diagnosis, no tripindi/pret-baadha fear rites, no prasad or Ganga jal shipping, no asthi visarjan, no rudraksha or yantra, no guaranteed outcomes — and the observation that publicly refused revenue is a trust asset competitors cannot copy without giving up margin. Ship it as a page.
- Not offering Gaya, with the reason stated: specificity and weight you cannot claim without a verified, named partnership. Restricting pind daan to Prayagraj, Ekantik only, with a mandatory honesty interstitial. Correct answer, correct reasoning.
- The explicit Ujjain guardrail — 'we do not claim access to the Mahakaleshwar garbhagriha and must never imply it' — together with the commitment to name the exact shrine on the Patra. The sharpest self-restraint in the document. Apply the same rule to every location.
- Recordings free at every tier and never paywalled, with the reason stated: charging a person to keep the video of a rite performed in their own dead father's name is the grubbiest possible line item. Correct, and its absence is worth more than its revenue.
- The tarpan honesty block, verbatim: 'This is not a rescue. We will never tell you your ancestors are suffering, restless, unsatisfied, or waiting. We do not know that, nobody does.' This is the anti-tripindi position stated as product policy, and it is the most valuable paragraph in the document.
- The deep daan honesty block, verbatim: 'This is: a lamp, lit, named, floated. That is the whole of it and it has always been enough. This is not: going to arrive anywhere. It is a lamp on a river.' Perfect voice and perfect honesty in four lines. Do not let anyone edit it.
- The pratinidhi snan honesty block, verbatim: 'Your body does not enter the Ganga. Anyone who tells you a streamed rite is identical to standing in the water yourself is selling you something.' Preserve exactly — then make the vessel copy live up to it.
- The Smaran cancellation confirmation: 'cancelling this changes nothing for the departed.' The best possible sentence in that flow. Keep it, and extend the same discipline to the dunning path.
- Charging parva-day and Brahma Muhurat premiums with the operational cost basis printed next to the price. The reasoning — surge on a holy day reads as extortion unless the reason is stated — is right, and it generalises to every premium in the catalog.
- Payment instrument rather than IP as the test for the India rate, and disclosing dual pricing openly instead of geo-switching silently. Correct on both counts. The framing needs work (do not anchor the India price as a percentage discount off the dollar price — publish two real prices for two markets) but the ethic and the mechanism should survive.
- The pronunciation preview — user-editable Devanagari transliteration with TTS playback, plus one free correction at T−24h — and the mispronunciation remedy where the old Patra is superseded rather than deleted. The most concrete respect-for-the-customer feature in the document, and it addresses the most common real complaint in this category.
- The unedited, never-sped-up, never-stock snan segment; the ambient-only stream open with no music bed and no voiceover; subtitles naming each ritual action as it happens. This is where the heritage-restraint brand voice becomes an operational rule rather than a design preference.
- The delivery email discipline: 'Your snan was performed this morning at Har Ki Pauri', no exclamation marks, no 'Congratulations', nothing sold in the follow-up, one-click unsubscribe on feedback — plus the pre-rite notification with no countdown pressure and no urgency language.
- Failure modes as built policy rather than improvisation — especially the proactive stream-drop remedy offered within 3h without the user asking, the Patra naming whoever actually performed rather than the rostered ritvik, and the rule that when the water is genuinely unenterable the rite happens at the edge and the recording and Patra say so explicitly. 'No pretending' is the whole company in two words.
- Engineering the honesty block as a non-nullable field on the Rite type so a rite without one cannot render. Encoding an ethic as a type constraint is the only kind of ethic that survives a growth team.
- Moderation that blocks harm to named third parties and rewrites nothing else, plus a gentle non-blocking notice on cure-seeking sankalps. The reasoning — the product must neither censor the prayer nor let silence imply a medical claim — is exactly right.
- The document's own status header: naming its PLACEHOLDERs, and explicitly identifying the live landing page's '1,20,000+ sankalps' and '48 countries' as fabricated and blocking on their removal. A spec that indicts its own shipped product is written by someone who can be trusted with this.
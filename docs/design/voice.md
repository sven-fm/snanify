# Snanify Language System, Voice Guide, Term Policy, Bilingual Copy Standards & Microcopy Kit

> Facet: **Brand voice, naming & bilingual copy system**  
> Adversarial review verdict: **needs-work**

## Summary

The existing landing copy already obeys a consistent, unwritten set of rules, the period used as a caesura, one spaced em dash per sentence that turns rather than adds, triads before the turn, concrete place-nouns over abstractions, honesty stated as negation ("never a stock video"), and verbs of offering rather than purchase. This spec names those rules so they survive fifty more pages, then extends them into a Sanskrit/Hindi term policy delivered as a UI pattern (a first-occurrence-only inline gloss component backed by a typed lexicon, not a glossary page), Hindi register and Devanagari typography standards, a revised offering-name system (Darshan / Ekal Snan / Parivar Snan / Mahaparv Snan / Varshik Snan, plus the Pitru Sankalp modifier and Snan Bhent gifting), and a complete EN+HI microcopy kit covering buttons, loading, empty states, errors, validation, confirmations, notifications, date/time, and currency. It also names what must never be said: the affliction-and-remedy sales frame, scarcity pressure, guaranteed punya, physical-fulfilment vocabulary, New Age wellness register, and any copy that leans on grief or divine displeasure. Three concrete defects in the shipped build are flagged: fabricated trust statistics in the hero, faux-italic applied to Devanagari, and a 0.98 display line-height that will collide Hindi matras.

## Decisions

**Codify the ten voice rules already latent in src/lib/content.ts rather than invent a new voice, period-as-caesura, one spaced em dash per sentence, the triad-then-turn, concrete nouns, honesty-by-negation, no intensifiers, no exclamation marks, British spelling, sentence case in source with CSS doing the uppercase.**

*Why:* The shipped copy is already unusually disciplined. Writing down what it is doing is cheaper and safer than redefining it, and it lets a second writer match it without reading the founder's mind.

**Sanskrit/Hindi terms stay untranslated in English copy, snan, sankalp, gotra, muhurat, ghat, panchang, tarpan, punya, prasad, aarti, dakshina, pitru. Never 'holy dip', 'holy water', 'prayer intention'.**

*Why:* Translating these flattens them into tourist English and makes the product read like a description of Hindu practice written for outsiders. Keeping the word and glossing it teaches the reader instead of talking down.

**Ship glossing as a <T k="sankalp"/> component with a dotted gold underline and a popover, backed by a typed lexicon in src/lib/lexicon.ts, first occurrence per page only, never inside a heading, max four per section, with a persistent auto/always/never preference.**

*Why:* A glossary page is a page nobody visits. Glossing at the point of confusion is the only mechanism that actually reaches the second-generation reader who does not know what gotra is and will not leave the flow to find out.

**Suppress most glosses in the Hindi locale via a per-entry glossHi flag; keep them only for product terms (Sankalp Patra) and regional terms (Ponni).**

*Why:* A Hindi reader does not need गोत्र defined. Explaining it insults them, and the dotted underline noise would wreck the page.

**Transliteration is schwa-deleted and diacritic-free in body copy, 'sankalp' not 'saṅkalpa', 'muhurat' not 'muhūrta'. IAST lives only in the lexicon's secondary field.**

*Why:* Macrons signal an academic register the brand does not have, and they break in URLs, email subject lines and OG cards. Schwa-deleted forms are how people actually say these words.

**Rename the third tier from Varsh to Varshik (वार्षिक) and make all three names parallel: Ekal Snan, Parivar Snan, Varshik Snan, short forms Ekal / Parivar / Varshik permitted in compact UI.**

*Why:* The English currently says 'Varsh' while the Hindi already says 'वार्षिक'. Varsh is the noun 'year', not the adjective 'annual', so 'Varsh Snan' is not idiomatic. Varshik fixes the mismatch and makes the set grammatically consistent.

**Add Darshan (free, watch a live snan, no sankalp), Mahaparv Snan ($51, festival-scale occasions), the Pitru Sankalp modifier (+$10 on any tier), and Snan Bhent (gift wrapper).**

*Why:* Darshan is an honest acquisition surface that costs nothing to give and proves the stream is real. Mahaparv fills the gap between $31 and $108 at a genuinely different occasion, and 51 continues the auspicious-integer ladder.

**Refuse to build Grah Shanti, Dosh Nivaran, Kaal Sarp, Pitra Dosh or any affliction-and-remedy offering, and ban the entire vocabulary.**

*Why:* That product category works by first convincing the customer they are afflicted. It is the single most profitable and most dishonest thing this business could sell, and it is incompatible with the stated constraint against manipulating fear.

**Prices are authored per-currency as auspicious integers, never FX-converted: USD/EUR/GBP/CAD/AUD/SGD/AED use 0 / 11 / 31 / 51 / 108; INR uses the 1-ending dakshina ladder 0 / 251 / 751 / 1,251 / 2,501.**

*Why:* 11, 31, 51 and 108 are the product, not a price point, a converted €10.34 destroys the meaning. Indian ritual amounts conventionally end in 1, so INR needs its own ladder rather than a translated one.

**Indian digit grouping (1,20,000) in both locales for counts of people and sankalps; western grouping only for non-INR money. 'Lakh'/'crore' as words are allowed in Hindi marketing copy but never in English UI.**

*Why:* The existing hero already uses 1,20,000+ in English and it reads as fluent rather than foreign to the diaspora, it is a deliberate signature. But 'lakh' as an English word forces a lookup for a reader in Ohio.

**Hindi register is formal आप with -एँ/-इए imperatives throughout, everyday Hindi for UI verbs and Sanskritized register only inside ritual language.**

*Why:* Over-Sanskritizing the interface is the most common failure of Hindi localisation, it produces copy that is technically correct and completely unreadable. 'सहेजें' for Save, not 'संरक्षित करें'.

**Forbid interpolating nouns into Hindi sentences; every string with a variable noun gets pre-authored per-noun variants, and counts are rendered noun-first or in neutral constructions.**

*Why:* Hindi verbs and adjectives agree in gender with their subject. A generic {noun} placeholder produces grammatically wrong Hindi in roughly half of cases, and no runtime library can fix it.

**Devanagari opts out of italic entirely (html[lang="hi"] .italic { font-style: normal }), gets display line-height raised from 0.98 to 1.18, body line-height 1.75, inscription tracking dropped from 0.08em to 0.05em, and a 1.0625rem body size.**

*Why:* Tiro Devanagari Hindi has no italic, the browser synthesises an oblique that shears the shirorekha. At 0.98 line-height, upper matras on line two collide with lower matras on line one. Both are live defects in the current build.

**Make gotra optional, with an explicit 'I do not know my gotra' path that falls back to Kashyap gotra and says so plainly in the helper text.**

*Why:* A large share of the diaspora genuinely does not know their gotra, and the tradition already provides for this. Making it a required field would push people to invent one, which corrupts the rite the product exists to perform.

**Every muhurat time renders with a mandatory source-and-state label, provisional or confirmed, with the panchang source and ayanamsa named, and no timing is ever displayed as bare fact.**

*Why:* Astronomical timings vary by panchang tradition and by ayanamsa. Stating one as unqualified truth is both false precision and a promise the operations side cannot keep.

**Keep the name Snanify, but never verb or conjugate it, 'Snanify your sankalp' and 'Snanified' are banned, and the wordmark is always inscriptional caps.**

*Why:* The -ify suffix reads SaaS, which is a real tension with the heritage register, but it is memorable, the domain is live, and its slight lightness is what keeps the brand from tipping into piousness. Verbing it would collapse that balance.

**Restructure content into src/lib/i18n/{en,hi}/*.ts namespaced by surface, with en as the source-of-truth type and hi enforced against it by a deep-required Translation<T> type, plus a copy:lint script that fails CI on banned terms.**

*Why:* A single content.ts is already 285 lines for one page. At thirty pages it becomes unreviewable, and a missing Hindi key will ship silently as undefined rather than failing the build.

**Mark the hero statistics (1,20,000+ sankalps, 48 countries) and the 'Our priests' footer link as PLACEHOLDER and gate them behind real data before the next deploy.**

*Why:* These are fabricated trust statistics presented as fact on a live page. The stated constraint forbids exactly this, and it is also the fastest way to lose the audience the product depends on.

---

> **Scope.** This document is the language system for Snanify. It is derived from the copy already shipped in `src/lib/content.ts` and is meant to be applied verbatim. Everything marked **PLACEHOLDER** is unverified and must not ship as fact.

---

# PART 1, THE VOICE GUIDE

## 1.1 What the existing copy is already doing

Read these lines from `src/lib/content.ts` before writing anything:

```
"Six rivers. One dip."
"Three steps. No airport."
"Days the water listens."
"Your name, your gotra, your sankalp, carried into a rite performed at India's
 most sacred waters, and streamed to wherever you stand."
"Every snan is performed at the ghat itself, at the hour the panchang appoints
, never a stock video, never a re-run."
"One-time offerings. No subscription you cannot leave, no hidden dakshina."
"Ten thousand kilometres is not a distance the Ganga recognises."
```

These obey eleven rules. Name them, so they are reproducible.

### Rule 1, The period is the caesura

Headlines are built from fragments joined by a full stop, not clauses joined by a comma. The period is doing the work a line break or a beat would do in speech.

- Do: `Six rivers. One dip.`
- Do: `Three steps. No airport.`
- Don't: `Six rivers, one dip.`
- Don't: `Six sacred rivers and just one dip for you.`

Fragments are permitted and preferred in headings. In body copy, prefer complete sentences.

### Rule 2, One em dash per sentence, spaced, and it turns

The em dash is set with spaces on both sides (`, `, U+2014). It appears at most **once** per sentence and **once** per paragraph. It marks a turn, a shift from setup to payoff, never a parenthetical aside and never a substitute for a comma.

- Do: `...at the hour the panchang appoints, never a stock video, never a re-run.`
- Don't: `Your name, and gotra, and sankalp.`
- Don't: `We stream it live--and record it.` (double hyphen, unspaced)

Use an en dash (`-`) only for numeric ranges (`04:24-05:12 IST`). Never use a hyphen as a dash.

### Rule 3, The triad, then the turn

A list of three concrete items, then a dash, then what happens to them.

- Do: `Your name, your gotra, your sankalp, carried into a rite...`
- Do: `Every river, every occasion.`
- Don't: four items. Don't: two items pretending to be a rhythm.

### Rule 4, Concrete noun over abstract noun

Place-names, physical objects, units. `ghat`, `airport`, `timezone`, `kilometres`, `panchang`, `stock video`. Not `experience`, `journey`, `connection`, `essence`, `energy`.

- Do: `Three steps. No airport.`
- Don't: `Three simple steps to your spiritual journey.`
- Do: `Ten thousand kilometres is not a distance the Ganga recognises.`
- Don't: `Distance is no barrier to devotion.`

### Rule 5, Understate the claim, and state its limit in the same breath

Every promise carries its own boundary.

- Do: `Auspicious occasions open months ahead. Exact timings follow the panchang and are confirmed when booking opens.`
- Don't: `Book the perfect muhurat, calculated to the second.`

### Rule 6, Honesty by negation

The most trust-building sentences in the current copy are the ones that say what we do *not* do. Keep this device, but ration it, at most one negation pair per section, or it curdles into defensiveness.

- Do: `never a stock video, never a re-run`
- Do: `No subscription you cannot leave, no hidden dakshina.`
- Don't: stack three or more negations in a row.

### Rule 7, No intensifiers, no superlatives

Banned outright in body copy: `very`, `truly`, `deeply`, `incredibly`, `absolutely`, `simply`, `just`, `literally`, `most sacred`, `holiest`, `unforgettable`, `unparalleled`, `world-class`.

The one permitted superlative is `India's most sacred waters` in the hero lede, because it is scoping a set, not grading an experience. Do not extend it.

### Rule 8, Second person, present tense, active voice

The user acts. We assist. `You take sankalp.` `We compute it against the panchang.` Never `Sankalp can be taken by the devotee.`

### Rule 9, Verbs of offering, not verbs of purchase

| Never | Always |
|---|---|
| buy, purchase, order | offer, choose |
| book now | reserve your muhurat, choose your muhurat |
| add to cart, checkout | (no cart metaphor exists, see §7.2) |
| subscribe | take the Varshik Snan |
| upgrade | choose a fuller sankalp |
| plan, package, tier, bundle | sankalp, form of sankalp |
| customer, user | you |

The pricing section is titled **Sankalp**, not Pricing. Keep it that way on every page.

### Rule 10, Length budgets

| Element | Budget |
|---|---|
| `h1` | ≤ 7 words, ≤ 2 fragments |
| `h2` | ≤ 6 words |
| `h3` / step title | ≤ 4 words |
| eyebrow | ≤ 3 words |
| lede | ≤ 32 words, ≤ 2 sentences |
| body sentence | ≤ 24 words |
| feature bullet | ≤ 8 words, no terminal period |
| button | ≤ 4 words EN, ≤ 4 words HI |
| toast | ≤ 8 words |
| tooltip / gloss | ≤ 14 words |

### Rule 11, Punctuation and orthography

- **No exclamation marks.** Anywhere. Not in errors, not in confirmations, not in email.
- **No emoji.** Anywhere, including notifications and social.
- **No ellipses**, except a single trailing one is *still* disallowed in loading states (see §7.3, loading copy names the action instead).
- **No question-mark headlines.** (`Ready to begin?` is banned.)
- **British spelling**: `recognise`, `kilometres`, `centre`, `honour`, `travelled`, `catalogue`. Already established by `recognises` and `kilometres` in the closing section. `-ise` not `-ize`.
- **Meta separator** is the middot with hairspaces: ` · ` (U+00B7). Used in `04:24 IST · Ganga, Haridwar`. Never a pipe, never a slash, never a bullet.
- **Sentence case** for all headings, buttons, labels and nav. Title Case is reserved for proper names: rites (`Brahma Muhurat`), artifacts (`Sankalp Patra`), offerings (`Ekal Snan`), places (`Har Ki Pauri`), occasions (`Kartik Purnima`).
- **Never author copy in ALL CAPS.** The `inscription` utility in `globals.css` applies `text-transform: uppercase` at the CSS layer. Source strings stay sentence case so the Hindi locale, which correctly opts out of the transform, is not left with shouting Devanagari.
- **Curly quotes** (`"` `"` `'`) in prose. Straight quotes only in code.
- **No Oxford comma**, the existing triads (`Your name, your gotra, your sankalp`) don't take one before the dash. Keep consistent.

### 1.2 Do / don't, side by side

| Context | Don't | Do |
|---|---|---|
| Hero | `Experience the divine from anywhere!` | `The river comes to you.` |
| Hero lede | `Snanify brings you an authentic, 100% genuine holy dip experience.` | `A complete digital snan. Your name, your gotra, your sankalp, carried into a rite performed at India's most sacred waters, and streamed to wherever you stand.` |
| Rivers | `Choose from 6 amazing holy rivers!` | `Six rivers. One dip.` |
| Proof | `Trusted by thousands of happy devotees` | `Every snan is performed at the ghat itself, never a stock video, never a re-run.` |
| Pricing | `Choose your plan and unlock blessings` | `Offer what is right.` |
| Urgency | `Only 3 slots left, hurry!` | `Eleven muhurats remain at Har Ki Pauri for Kartik Purnima. The ghat admits a fixed number.` (only if literally true, and always with the reason) |
| Ancestors | `Your ancestors are waiting for you.` | `Pitru sankalp names your forebears in the rite.` |
| Failure | `Oops! Something went wrong 😔` | `Something failed on our side. Nothing you did caused it.` |
| Empty | `Nothing here yet!` | `You have not taken a snan yet. Your first sankalp begins here.` |
| Confirmation | `Congratulations! Your booking is confirmed 🎉` | `Your sankalp is taken.` |
| Closing | `Start your spiritual journey today!` | `Wherever you stand, the water is already there.` |

### 1.3 Two register modes

The voice has exactly two modes. Nothing else.

**Ritual register**, hero, section headings, closing, certificate, occasion names. Serif display, fragments, the dash, the triad. Cadence is slow. This is where `Days the water listens.` belongs.

**Operational register**, forms, errors, receipts, account, legal. Plain, complete sentences. No dashes, no fragments, no metaphor. The water does not listen inside a payment error. `Your bank declined the payment. Nothing was charged.`

The single most common failure mode will be leaking ritual register into operational surfaces. A loading spinner that says `The Ganga is gathering...` is a violation. So is an error that says `The river could not hear you.`

### 1.4 Copy that touches grief, hard constraints

Pitru sankalp, tarpan, Smaran and anything naming the deceased are governed by three additional rules that override everything above.

1. **Never assert the state of the dead.** Not `at peace`, not `waiting`, not `blessed`, not `released`. Describe only what the rite does: `Pitru sankalp names your forebears in the rite and offers tarpan in their name.`
2. **Never create an obligation.** No `you owe them this`, no `it has been a year since`, no reminder that implies neglect. Smaran reminders are opt-in, capped at one per year per name, and every one carries an inline off-switch.
3. **Never price grief above joy.** The Pitru Sankalp modifier is +$10 on every tier, the same as any other addition. It is never a premium product, never featured, never the default.

---

# PART 2, SANSKRIT & HINDI TERM POLICY

## 2.1 Terms that stay untranslated in English copy

These are never translated, never glossed inline in the sentence, never put in quotation marks or italics.

**Core (used constantly):** snan, sankalp, gotra, muhurat, ghat, panchang, Sankalp Patra

**Frequent:** tarpan, punya, prasad, aarti, dakshina, pitru, purohit, puja, tirth, jal, sangam, kund, purnima, amavasya

**Occasional:** moksha, bhakti, mantra, achaman, abhishek, deepdaan, kalash, parikrama, darshan, bhent, mahaparv, prayag

**Never translate as:** `holy dip` (snan), `wish` / `prayer request` / `prayer intention` (sankalp), `family clan` / `lineage code` (gotra), `auspicious time slot` / `lucky hour` (muhurat), `riverbank steps` (ghat), `Hindu calendar` (panchang), `certificate of prayer` (Sankalp Patra), `merit points` (punya), `donation` / `tip` (dakshina), `blessed food` (prasad, and see §7.1, we never offer it).

## 2.2 Fixed spellings (transliteration lock)

Schwa-deleted, no diacritics, lowercase in running text except proper nouns. This table is normative, a lint rule enforces it.

```
snan            sankalp         gotra           muhurat         ghat
panchang        tarpan          punya           prasad          aarti
dakshina        pitru           purohit         puja            tirth
jal             sangam          kund            purnima         amavasya
moksha          bhakti          mantra          achaman         abhishek
deepdaan        kalash          parikrama       darshan         bhent
ekal            parivar         varshik         mahaparv        smaran

Proper nouns:
Ganga           Yamuna          Godavari        Shipra          Kaveri
Triveni Sangam  Har Ki Pauri    Vishram Ghat    Ram Ghat        Ram Kund
Talakaveri      Haridwar        Prayagraj       Mathura         Nashik
Ujjain          Kodagu          Kumbh           Brahma Muhurat
Kartik Purnima  Makar Sankranti Mahashivratri   Ganga Dussehra
Pitru Paksha    Dev Deepawali   Sankalp Patra
```

Banned variants: `sankalpa`, `saṅkalpa`, `snana`, `muhūrta`, `muhurta`, `gotram`, `panchanga`, `Hardwar`, `Allahabad`, `Nasik`, `Cauvery`, `Kaveri River`, `Ganges` (use `Ganga`), `Jumna`, `pandit` as a job title (use `purohit`).

**`Ganges` is banned outright.** It is the colonial exonym; the brand says `Ganga`.

## 2.3 The gloss mechanism, a UI pattern, not a page

### 2.3.1 The lexicon

`src/lib/lexicon.ts`:

```ts
export type LexEntry = {
  /** stable key, ascii, kebab */
  id: string;
  /** how it renders in EN body copy, matches §2.2 */
  en: string;
  /** how it renders in HI body copy */
  hi: string;
  /** Devanagari headword shown in the popover */
  deva: string;
  /** academic transliteration, popover secondary line only */
  iast: string;
  /** ≤ 14 words. No sentence-final period. */
  glossEn: string;
  /** ≤ 14 words. Ends with danda. */
  glossHi: string;
  /** optional literal etymon, ≤ 8 words */
  literalEn?: string;
  literalHi?: string;
  /** does a Hindi reader need this explained? default false */
  showInHi?: boolean;
  /** audio pronunciation asset, optional */
  audio?: string;
};
```

Starting entries (glosses are the deliverable, use verbatim):

| id | en | deva | glossEn | glossHi | showInHi |
|---|---|---|---|---|---|
| `snan` | snan | स्नान | A ritual bath in sacred water |, | false |
| `sankalp` | sankalp | संकल्प | The intention you state before a rite, in your own name |, | false |
| `gotra` | gotra | गोत्र | Your paternal lineage, traced to an ancient rishi |, | false |
| `muhurat` | muhurat | मुहूर्त | An hour the panchang marks as fit for a rite |, | false |
| `ghat` | ghat | घाट | The stone steps where a river meets the town |, | false |
| `panchang` | panchang | पंचांग | The traditional almanac that fixes auspicious hours |, | false |
| `tarpan` | tarpan | तर्पण | A water offering made in the name of forebears |, | false |
| `punya` | punya | पुण्य | Merit earned by right action. Not a currency, and not something we can promise | पुण्य कोई मुद्रा नहीं, इसका वचन हम नहीं देते। | **true** |
| `prasad` | prasad | प्रसाद | Food offered at a rite and shared afterwards. Snanify sends nothing physical | स्नानिफ़ाई कुछ भी भौतिक नहीं भेजता। | **true** |
| `aarti` | aarti | आरती | The lamp offering sung at the water's edge at dusk |, | false |
| `dakshina` | dakshina | दक्षिणा | What is given to the purohit for performing a rite |, | false |
| `purohit` | purohit | पुरोहित | The priest who performs the rite at the ghat |, | false |
| `pitru` | pitru | पितृ | Forebears, the ancestral line a rite can name |, | false |
| `sankalp-patra` | Sankalp Patra | संकल्प पत्र | The record of a snan performed in your name | जो अनुष्ठान संपन्न हुआ, उसका अभिलेख। | **true** |
| `brahma-muhurat` | Brahma Muhurat | ब्रह्म मुहूर्त | The hour and a half before sunrise, held most fit for a rite | सूर्योदय से लगभग डेढ़ घंटा पूर्व का समय। | **true** |
| `ponni` | Ponni | பொன்னி / पोन्नी | The Tamil name for the Kaveri, the golden one | कावेरी का तमिल नाम, स्वर्णिम धारा। | **true** |
| `triveni` | Triveni Sangam | त्रिवेणी संगम | Where the Ganga, Yamuna and the unseen Saraswati meet |, | false |
| `bhent` | bhent | भेंट | Something given, an offering made on another's behalf |, | false |
| `darshan` | darshan | दर्शन | To look, and be looked upon, at a sacred place |, | false |
| `amavasya` | amavasya | अमावस्या | The new moon. Many rites for forebears fall here |, | false |

### 2.3.2 The component

```tsx
<T k="sankalp" />          // renders: sankalp (dotted underline, first time only)
<T k="sankalp" force />    // always glossed, use once per long-form page
<T k="sankalp" plain />    // never glossed
```

**Visual.** No colour change. `border-bottom: 1px dotted color-mix(in oklab, var(--gold) 55%, transparent); text-underline-offset: 0.28em; cursor: help;` The dotted rule is the only signal, colouring the word would break the editorial restraint of the page.

**Markup.**
```html
<button type="button" class="term" aria-describedby="gloss-sankalp"
        popovertarget="gloss-sankalp">sankalp</button>
<div id="gloss-sankalp" popover="auto" class="gloss" role="note">…</div>
```
Native Popover API + CSS anchor positioning; absolute-positioned fallback where `anchor-name` is unsupported. Opens on: hover with a 160 ms delay, focus, or tap. Closes on: pointer leave with 240 ms grace, `Escape`, outside click, or scroll.

**Popover content**, in order:
1. Devanagari headword, `font-family: var(--font-tiro)`, 1.25rem
2. Transliteration + IAST, `--ink-2`, 0.75rem, `sankalp · saṅkalpa`
3. Gloss, ≤ 14 words, `--ink`, 0.875rem
4. Optional `literally: …` line, italic, `--ink-2` (Latin only, never italicise the Devanagari)
5. `More →` link to `/glossary#sankalp`

Width `min(22rem, calc(100vw - 2rem))`. Background `--bg-2`, border `--line`, radius 12px, the same `backdrop-blur-xl` shadow used by the hero muhurat card.

**Density rules, these are what keep the page from looking like a textbook.**
- Only the **first occurrence per page** is glossed. A React context counts occurrences and resets per route.
- **Never inside `h1`, `h2`, `h3`, the eyebrow, the wordmark, or a button.** `<T>` inside any of these renders plain, automatically, by checking a `HeadingContext`. Headlines stay clean.
- **Maximum four glossed terms per `<section>`.** The fifth onward render plain.
- Never glossed inside the Sankalp Patra, inside legal pages, or inside an email.

**Preference control.** Footer control, three states, persisted at `localStorage["snanify.gloss"]`:

| state | EN label | HI label | behaviour |
|---|---|---|---|
| `auto` (default) | Meanings: first mention | अर्थ: पहली बार | as above |
| `always` | Meanings: always | अर्थ: हर बार | every occurrence glossed |
| `never` | Meanings: off | अर्थ: बंद | plain text everywhere |

Control label EN `Show meanings` / HI `अर्थ दिखाएँ`.

**Hindi locale.** `showInHi !== true` → renders plain. Only the six flagged entries gloss in Hindi.

**Accessibility.** `aria-describedby` is the primary affordance; the popover text is announced whether or not it is visually open. The button is in the tab order. Do not use the `title` attribute. Do not rely on hover alone.

**Print / PDF.** In `@media print`, glossed terms render plain with a superscript marker and the glosses collect as endnotes.

**SEO surface.** `/glossary` and `/hi/glossary` remain, carrying `DefinedTermSet` JSON-LD generated from the same lexicon. The page is the canonical source and the deep-link target; it is not the primary mechanism.

---

# PART 3, HINDI COPY STANDARDS

## 3.1 Register

- **आप throughout.** Never तुम, never तू, in any surface including errors and toasts.
- **Formal imperative** `-एँ` / `-इए`: करें, चुनें, लें, भेजें, सहेजें, देखें, जोड़ें, हटाएँ, बदलें. Never करो, चुनो, देखो.
- **No honorific inflation.** No श्रीमान, महोदय, आदरणीय, कृपया-in-every-sentence. It reads like a government form. `कृपया` is permitted at most once per screen, and only where a genuine request is being made of the user.
- **Everyday Hindi for UI verbs; Sanskritized Hindi only inside ritual language.** This is the single most important rule and the one most often broken.

| Function | Wrong (over-Sanskritized) | Right |
|---|---|---|
| Save | संरक्षित करें | सहेजें |
| Sign in | सत्रारंभ करें | प्रवेश करें |
| Download | अवतरित करें | डाउनलोड करें |
| Edit | संपादित करें | बदलें |
| Share | साझाकरण करें | साझा करें |
| Settings | विन्यास | सेटिंग्स |
| Link | कड़ी | लिंक |
| Email | विद्युत-डाक | ईमेल |
| Recording | अभिलेखन | रिकॉर्डिंग |
| Live | प्रत्यक्ष प्रसारण | सजीव |

Contrast with ritual language, where the Sanskritized register is correct and required: `संकल्प अर्पित`, `अनुष्ठान संपन्न हुआ`, `पंचांग के अनुसार`, `पितृ तर्पण`.

- **Loanwords stay in Devanagari transliteration**, not translated: ईमेल, पासवर्ड, लिंक, डाउनलोड, अपलोड, वीडियो, रिकॉर्डिंग, ब्राउज़र, कैलेंडर, नोटिफ़िकेशन, कार्ड, बैंक, सर्वर, HD (Latin, acceptable).

- **Nukta discipline.** Use the nukta for Perso-Arabic loans and keep it consistent: फ़रवरी, हज़ार, ज़रूरी, ख़ास, क़रीब, फ़ोन, नौकरी → note that ज़ in ज़रूरी and फ़ in फ़रवरी are already correct in the shipped copy. Standardised list: फ़रवरी, हज़ार, ज़्यादा, ज़रूरी, ख़ास, ख़ाली, क़ीमत, फ़ोटो, फ़ाइल, ज़िला. Do **not** put a nukta on tatsama words (जल, संकल्प, ज्ञान).

- **Danda.** `।` ends every sentence where English would take a full stop, including headline fragments (the shipped copy already does this: `छह नदियाँ। एक डुबकी।`). No space before the danda. **No danda** after: single-word labels, list items shorter than a clause, table cells, button text, field labels.

- **Question mark and comma** are the Latin `?` and `,`. Only the danda is Devanagari.

## 3.2 The literal-translation trap

Marketing English does not survive word-for-word transfer. These are the failures to expect.

| EN source | ✗ Literal / wrong | ✓ Idiomatic |
|---|---|---|
| Get started | आरंभ प्राप्त करें / शुरू हो जाओ | आरंभ करें |
| Book now | अभी बुक करो | मुहूर्त सुरक्षित करें |
| Learn more | और सीखें | और जानें |
| Most chosen | सबसे लोकप्रिय | सर्वाधिक चुना गया *(as shipped, correct)* |
| Free | मुफ़्त / फ्री | निःशुल्क |
| Try again | फिर से कोशिश करो | पुनः प्रयास करें |
| Sorry, something went wrong | क्षमा करें, कुछ गलत हो गया | कुछ बाधा आ गई। |
| Your journey begins | आपकी यात्रा शुरू होती है | आपका संकल्प आरंभ होता है |
| Unlock premium features | प्रीमियम सुविधाएँ अनलॉक करें | *(banned entirely, see §7)* |
| Don't miss out | चूक न जाएँ | *(banned entirely)* |
| We've got you covered | हमने आपको कवर किया है | यह हमारी ज़िम्मेदारी है |
| Wherever you stand | आप जहाँ भी खड़े हों | आप जहाँ भी हों *(as shipped, correct)* |
| Powered by | द्वारा संचालित | *(omit; state the fact plainly)* |
| Coming soon | जल्द आ रहा है | शीघ्र उपलब्ध |
| Something for everyone | हर किसी के लिए कुछ | *(cut, empty in both languages)* |
| Loved by thousands | हज़ारों द्वारा पसंद किया गया | *(cut, see §7.4)* |
| Your data is safe with us | आपका डेटा हमारे साथ सुरक्षित है | आपकी जानकारी सुरक्षित रखी जाती है |

Three specific traps worth naming:

1. **`यात्रा` is a real journey.** It means travel, and for this audience specifically it means pilgrimage. Using it as the metaphor for "customer journey" makes Snanify sound like a tour operator. Never use it except for literal travel.
2. **`मुफ़्त` carries a whiff of cheapness** that is actively wrong beside a rite. `निःशुल्क` is neutral and correct.
3. **`गलत` means morally wrong**, not malfunctioning. `कुछ गलत हो गया` in an error message reads as an accusation. Use `बाधा` (obstruction) or `विफल` (failed).

## 3.3 Gender agreement, the interpolation ban

Hindi verbs, participles and adjectives agree in gender and number with their subject. `{noun} सहेजा गया` is right for a masculine noun and wrong for a feminine one.

**Rule: no user-facing Hindi string may interpolate a noun into a position that governs agreement.**

```ts
// ✗ FORBIDDEN
hi: "{item} सहेजा गया।"

// ✓ Pre-authored per noun
hi: { sankalp: "संकल्प सहेज लिया गया।", muhurat: "मुहूर्त सुरक्षित कर लिया गया।" }

// ✓ Or restructure so nothing agrees
hi: "सहेज लिया गया।"
hi: "नाम: {n}"
```

Numbers are safe: `{n} शेष।`, `छह नाम तक`. Proper names in vocative position are safe: `{name}, आपका संकल्प...`.

Provide a `hiPlural(n, {one, other})` helper only where the *counted noun is fixed*, e.g. `{one: "एक नाम", other: "{n} नाम"}`.

## 3.4 Devanagari typography

The current build has two live defects. Fix both.

**Defect 1, faux italic.** `Landing.tsx` applies `italic` to `t.hero.titleB` (line 131) and to river notes (line 209). Tiro Devanagari Hindi ships **only** a 400 upright. The browser synthesises an oblique, which shears the shirorekha and is visibly broken.

```css
html[lang="hi"] .italic,
html[lang="hi"] em,
html[lang="hi"] i { font-style: normal; }
html[lang="hi"] { font-synthesis: none; }
```
Hindi emphasis is carried by colour (`--gold`) and by the display face, never by slant, never by faux-bold on Tiro.

**Defect 2, display line-height.** `@utility display` sets `line-height: 0.98`. On a two-line Devanagari `h1`, the upper matras (ि ी ै ो ौ) of line two collide with the lower matras (ु ू ृ) of line one. `html[lang="hi"]` currently overrides only the font stack and tracking.

```css
html[lang="hi"] .display { line-height: 1.18; }
```

**Full Devanagari block to add to `globals.css`:**

```css
html[lang="hi"] {
  --f-display: var(--font-tiro), "Noto Serif Devanagari", Georgia, serif;
  --f-body: var(--font-mukta), "Noto Sans Devanagari", "Nirmala UI",
            "Kohinoor Devanagari", ui-sans-serif, system-ui, sans-serif;
  --tracking-display: 0;
  font-synthesis: none;
  hyphens: none;
}
html[lang="hi"] body      { font-size: 1.0625rem; line-height: 1.75; }
html[lang="hi"] .display  { line-height: 1.18; }
html[lang="hi"] .inscription { text-transform: none; letter-spacing: 0.05em; }
html[lang="hi"] .italic, html[lang="hi"] em, html[lang="hi"] i { font-style: normal; }
html[lang="hi"] p, html[lang="hi"] li { text-wrap: pretty; }
```

Additional standards:
- **Never letter-space Devanagari above `0.05em`.** The current `.inscription` value of `0.08em` is at the edge; drop it. Above ~0.06em the shirorekha reads as broken.
- **Never uppercase.** Already handled, do not regress.
- **Never bold the display face.** Tiro has one weight. Mukta (300/400/500/600) may be weighted freely.
- **Body copy 1.0625rem, min line-height 1.75; small text (≤0.8rem) min 1.7.** Devanagari's effective x-height is lower than Latin at the same px, and stacked matras need the leading.
- **Never truncate by character count.** Slicing a Devanagari string orphans a matra or a virama and produces a non-word. Use `-webkit-line-clamp` / `text-overflow: ellipsis` only, and never `str.slice(0, n) + "…"` on Hindi.
- **`hyphens: none`.** Devanagari does not hyphenate; the browser's Latin hyphenation dictionary will break words wrongly.
- **Numerals are Latin by default**, `Intl` with `hi-IN` already outputs `1,20,000`. Devanagari digits (`०१`) are used **only** for the decorative step ordinals in the How section, which is already correct in the shipped copy. Where explicitly wanted, request them with the `hi-IN-u-nu-deva` locale tag; never hand-substitute.
- **Line-length**: 62-68ch in EN, 52-58ch in HI. Devanagari's denser glyph body makes an equal ch-count harder to track.

## 3.5 Two corrections to shipped Hindi and English

**1. Duplicate river epithet.** `Godavari, "Dakshin Ganga"` and `Kaveri, "Ganga of the south"` are the same epithet twice in one six-item grid. Both are traditional, but the repetition reads as an error, and defining the southern river by a northern one is the wrong instinct for this brand.

```
Kaveri  EN note: "Ponni · the golden one"
        HI note: "पोन्नी · स्वर्णिम धारा"
```
`Ponni` (பொன்னி) is the Kaveri's own Tamil name. **PLACEHOLDER, verify with a Tamil-speaking advisor before ship.**

**2. Tier name mismatch.** EN says `Varsh`, HI says `वार्षिक`. See §4.

---

# PART 4, NAMING THE OFFERINGS

## 4.1 Verdict on the existing three

| Name | Verdict | Reasoning |
|---|---|---|
| **Ekal Snan** / एकल स्नान | **Keep** | एकल is precise and sets up the contrast with परिवार. It reads slightly clinical (its most common modern collocation is एकल परिवार, "nuclear family"), but every alternative is worse: `Eka Snan` is Sanskritist, `Vyakti Snan` is bureaucratic, `Akela` means lonely. Keep, and let the English subtitle warm it. |
| **Parivar** / परिवार | **Keep the word, add the noun** | Warm, universally understood, no register problem. But it is a bare noun where `Ekal Snan` is qualifier+noun. Make it `Parivar Snan`. |
| **Varsh** / वार्षिक | **Rename to Varshik** | `वर्ष` is the noun "year"; `वार्षिक` is the adjective "annual". `Varsh Snan` is not idiomatic Hindi. The Hindi copy already correctly says वार्षिक, the English is the one that is wrong. |

## 4.2 The offering set

| Canonical (EN) | Devanagari | Short form | Price | One-line sub (EN) | One-line sub (HI) |
|---|---|---|---|---|---|
| **Darshan** | दर्शन | Darshan | Free | Watch a snan | एक स्नान देखें |
| **Ekal Snan** | एकल स्नान | Ekal | $11 / ₹251 | A single dip | एक डुबकी |
| **Parivar Snan** | परिवार स्नान | Parivar | $31 / ₹751 | For the household | पूरे घर के लिए |
| **Mahaparv Snan** | महापर्व स्नान | Mahaparv | $51 / ₹1,251 | For the great occasions | बड़े पर्वों के लिए |
| **Varshik Snan** | वार्षिक स्नान | Varshik | $108 / ₹2,501 | The whole year | पूरा वर्ष |

Modifiers, not tiers:

| Name | Devanagari | Price | What it is |
|---|---|---|---|
| **Pitru Sankalp** | पितृ संकल्प | +$10 / +₹251 | Names forebears in the rite; tarpan offered. Available on every tier including Ekal. Never featured, never default. |
| **Snan Bhent** | स्नान भेंट | +$0 | Any snan offered in someone else's name, with a note. Not a price change, a mode. |

Artifacts:

| Name | Devanagari | What it is |
|---|---|---|
| **Sankalp Patra** | संकल्प पत्र | The record of a snan performed. Keep exactly as is, it is the strongest name in the product. |
| **Smaran** | स्मरण | An opt-in annual reminder tied to a named person or date. |

Section labels:

| EN | HI |
|---|---|
| Sankalp *(the pricing section, never "Pricing")* | संकल्प |
| Sacred waters | पवित्र जल |
| Muhurat | मुहूर्त |
| The calendar | पंचांग |

## 4.3 Naming rules for anything added later

1. The name is a **Hindi or Sanskrit noun phrase**, transliterated per §2.2, that describes *what the rite is*, never what the customer gets and never a metaphor.
2. Two words maximum. If it needs three, it is two products.
3. It must survive back-translation: a Hindi speaker reading the Devanagari must arrive at the same product a diaspora reader arrives at from the transliteration.
4. Never an English-Sanskrit hybrid (`Snan Pro`, `Sankalp Plus`, `Moksha Max`, `Ganga Premium`) and never a tier ladder word (Basic, Standard, Premium, Pro, Plus, Elite, Gold, Platinum).
5. The price must be an auspicious integer in every currency (§8.3).
6. **Do not name it after a result.** `Moksha`, `Punya`, `Shanti`, `Siddhi` are outcomes, not services. Naming an offering after an outcome is a promise the product cannot keep.

## 4.4 Offerings this brand will not build

Refuse these by name, so nobody proposes them twice:

**Grah Shanti · Dosh Nivaran · Kaal Sarp Dosh · Pitra Dosh · Mangal Dosh · Shani Upay · any "remedy" product.**

The entire category works by first persuading the customer they are afflicted, then selling relief. It is the most profitable thing this business could build and it is directly incompatible with the constraint against manipulating fear. The vocabulary is banned along with the products (§7.2).

Also refused: **anything requiring physical fulfilment.** No Ganga jal bottle, no prasad box, no thread, no printed certificate mailed, no kit. Snanify ships nothing. This is a product fact, not a limitation, and the copy says so plainly where relevant: `Nothing is posted to you. The rite is real; the record is digital.` / `आपको कुछ भेजा नहीं जाता। अनुष्ठान वास्तविक है; अभिलेख डिजिटल।`

---

# PART 5, CONTENT ARCHITECTURE

`src/lib/content.ts` is 285 lines for one page. It will not survive thirty.

```
src/lib/i18n/
  index.ts          // getContent(lang), Lang, Translation<T>
  types.ts
  en/
    common.ts       // buttons, generic actions, meta separators
    nav.ts
    home.ts         // everything currently in content.ts
    sankalp.ts      // the booking flow
    muhurat.ts      // calendar, occasion names, timing states
    account.ts
    patra.ts        // certificate strings
    errors.ts
    notifications.ts
    legal.ts
  hi/               // mirror, identical keys
```

Enforcement:

```ts
// types.ts, a missing Hindi key is a compile error, not a runtime undefined
export type Translation<T> = {
  [K in keyof T]: T[K] extends string ? string
    : T[K] extends readonly (infer U)[] ? readonly Translation<U>[]
    : Translation<T[K]>;
};
// en/home.ts is the source of truth
export const home = { … } as const;
// hi/home.ts
export const home: Translation<typeof import("../en/home").home> = { … };
```

Rules:
- **No literal user-facing text in `src/components` or `src/app`.** Add ESLint `react/jsx-no-literals` with an allowlist for punctuation and `·`.
- **No cross-locale string concatenation.** Never `` `${t.verb} ${t.noun}` ``. Word order differs; Hindi is SOV.
- **Named placeholders only**: `{name}`, `{river}`, `{ghat}`, `{date}`, `{time}`, `{n}`, `{count}`. A 20-line `fmt(str, vars)` substitutes them. No positional `%s`.
- **Nothing user-facing outside these files**, including `alt` text, `aria-label`, `<title>`, OG descriptions, email subjects, and push notification bodies.

**`pnpm copy:lint`**, fails CI. Checks: banned terms (§7), `!` in any string, `…`/`...` in any string, emoji codepoints, more than one `, ` per string, heading strings over the §1.10 budget, `--` used as a dash, straight quotes in prose, Latin `.` used where Hindi needs `।`, any HI string interpolating `{item}`-style noun placeholders.

---

# PART 6, THE MICROCOPY KIT

All strings are production-ready. EN is sentence case. HI uses आप and formal imperatives.

## 6.1 Buttons and actions

| Key | EN | HI |
|---|---|---|
| `begin` | Begin your snan | स्नान आरंभ करें |
| `continue` | Continue | आगे बढ़ें |
| `back` | Back | पीछे |
| `save` | Save | सहेजें |
| `saveContinue` | Save and continue | सहेजकर आगे बढ़ें |
| `dismiss` | Not now | अभी नहीं |
| `keep` | Keep it | रहने दें |
| `confirm` | Confirm | पुष्टि करें |
| `choose` | Choose | चुनें |
| `chooseTier` | Choose {tier} | {tier} चुनें |
| `reserve` | Reserve this muhurat | यह मुहूर्त सुरक्षित करें |
| `changeMuhurat` | Change muhurat | मुहूर्त बदलें |
| `addName` | Add a name | नाम जोड़ें |
| `remove` | Remove | हटाएँ |
| `edit` | Edit | बदलें |
| `watchLive` | Watch live | सजीव देखें |
| `watchRecording` | Watch the recording | रिकॉर्डिंग देखें |
| `downloadPatra` | Download Sankalp Patra | संकल्प पत्र डाउनलोड करें |
| `share` | Share | साझा करें |
| `copyLink` | Copy link | लिंक कॉपी करें |
| `copied` | Copied | कॉपी हो गया |
| `retry` | Try again | पुनः प्रयास करें |
| `signIn` | Sign in | प्रवेश करें |
| `signOut` | Sign out | बाहर निकलें |
| `sendLink` | Send sign-in link | प्रवेश लिंक भेजें |
| `addToCalendar` | Add to calendar | कैलेंडर में जोड़ें |
| `giftSnan` | Offer a snan to someone | किसी के नाम स्नान भेंट करें |
| `viewRivers` | See all six waters | छहों जल देखें |
| `cancelSnan` | Cancel this snan | यह स्नान रद्द करें |
| `showMeanings` | Show meanings | अर्थ दिखाएँ |
| `readEthics` | Read the ethics note | नीति एवं विधि पढ़ें |

`cancel` as a soft dismiss is **`रहने दें`**, not `रद्द करें`. `रद्द करें` is reserved for actually cancelling a booked snan.

## 6.2 Loading

Loading copy **names the operation**. No spinner text ever says "please wait", "almost there", "hang tight", or carries an ellipsis.

| Key | EN | HI |
|---|---|---|
| `generic` | One moment. | एक क्षण। |
| `panchang` | Consulting the panchang | पंचांग देखा जा रहा है |
| `slots` | Finding open muhurats | उपलब्ध मुहूर्त खोजे जा रहे हैं |
| `payment` | Confirming your offering | आपका अर्पण दर्ज हो रहा है |
| `stream` | Opening the stream from {ghat} | {ghat} से प्रसारण खुल रहा है |
| `patra` | Preparing your Sankalp Patra | आपका संकल्प पत्र तैयार हो रहा है |
| `upload` | Uploading | अपलोड हो रहा है |

## 6.3 Empty states

Pattern: **one line of fact, one line of consequence or invitation, one action.**

| Surface | EN | HI |
|---|---|---|
| No snans | You have not taken a snan yet.<br>Your first sankalp begins here.<br>`[Begin your snan]` | आपने अभी तक कोई स्नान नहीं लिया है।<br>आपका पहला संकल्प यहीं से आरंभ होता है।<br>`[स्नान आरंभ करें]` |
| No recordings | Nothing recorded yet.<br>A recording appears within 24 hours of the rite. | अभी कोई रिकॉर्डिंग नहीं।<br>अनुष्ठान के 24 घंटे के भीतर रिकॉर्डिंग यहाँ आ जाती है। |
| No muhurats at a river | No muhurat is open at {river} this month.<br>The next window opens {date}.<br>`[See other waters]` | इस माह {river} पर कोई मुहूर्त उपलब्ध नहीं।<br>अगला अवसर {date} को खुलता है।<br>`[अन्य जल देखें]` |
| Search, no result | Nothing by that name. | इस नाम से कुछ नहीं मिला। |
| Gift unclaimed | This snan is waiting for its name.<br>Send the link to whoever it is for. | यह स्नान अपने नाम की प्रतीक्षा में है।<br>जिनके लिए है, उन्हें लिंक भेजें। |
| No Smaran set | No Smaran is set.<br>A Smaran is a once-a-year reminder, and nothing more. | कोई स्मरण निर्धारित नहीं।<br>स्मरण वर्ष में एक बार की सूचना है, इससे अधिक कुछ नहीं। |

## 6.4 Errors

Pattern: **what happened → what it cost you (usually nothing) → what to do.** Never blame the user. Never apologise more than once per app, `sorry` is reserved for a failure of ours that cost someone a muhurat.

| Key | EN | HI |
|---|---|---|
| `network` | The connection dropped. Nothing was charged. | संपर्क टूट गया। कोई शुल्क नहीं लिया गया। |
| `server500` | Something failed on our side. Nothing you did caused it. | हमारी ओर से कुछ विफल हुआ। इसमें आपकी कोई चूक नहीं। |
| `notFound404` | This page does not exist.<br>`[Return home]` | यह पृष्ठ मौजूद नहीं है।<br>`[मुख्य पृष्ठ पर लौटें]` |
| `sessionExpired` | You were signed out for safety. Sign in to continue. | सुरक्षा के लिए आप बाहर हो गए। जारी रखने के लिए फिर प्रवेश करें। |
| `paymentDeclined` | Your bank declined the payment. Nothing was charged. Try another card. | आपके बैंक ने भुगतान अस्वीकार कर दिया। कोई शुल्क नहीं लिया गया। दूसरा कार्ड आज़माएँ। |
| `slotTaken` | That muhurat filled while you were deciding. Here are the next three. | आप जब तक चुनते, वह मुहूर्त भर गया। अगले तीन ये हैं। |
| `streamDown` | The stream from {ghat} is interrupted. The rite continues. We will post the recording and tell you when it is up. | {ghat} से प्रसारण बाधित है। अनुष्ठान जारी है। रिकॉर्डिंग उपलब्ध होते ही हम आपको सूचित करेंगे। |
| `riteNotPerformed` | The rite at {ghat} could not be performed on {date}, the ghat was closed. Your sankalp moves to {newDate}, or we refund it in full. You choose. | {date} को {ghat} पर अनुष्ठान संपन्न नहीं हो सका, घाट बंद था। आपका संकल्प {newDate} को स्थानांतरित है, या पूरी राशि लौटा दी जाएगी। निर्णय आपका। |
| `ourFault` | We are sorry, your snan did not happen at the muhurat you chose, and that is our failure. It has been refunded in full. | हमें खेद है, आपका स्नान चुने गए मुहूर्त पर नहीं हो सका, और यह हमारी चूक है। पूरी राशि लौटा दी गई है। |
| `rateLimit` | Too many attempts. Try again in a minute. | बहुत सारे प्रयास। एक मिनट बाद फिर प्रयास करें। |
| `linkExpired` | This link has expired. Ask for a new one. | यह लिंक समाप्त हो चुका है। नया लिंक माँगें। |

## 6.5 Validation

Inline, below the field, on blur, never on keystroke. Never red-flash a field a user has not left.

| Field / rule | EN | HI |
|---|---|---|
| Name empty | A name is needed to take sankalp. | संकल्प के लिए नाम आवश्यक है। |
| Name > 60 chars | Keep the name under 60 characters. | नाम 60 अक्षरों से कम रखें। |
| Gotra, label | Gotra (optional) | गोत्र (वैकल्पिक) |
| Gotra, helper | If you do not know your gotra, leave it blank. The rite then uses Kashyap gotra, as tradition provides for those whose lineage is not recorded. | यदि आपको अपना गोत्र ज्ञात नहीं है, तो इसे रिक्त छोड़ दें। परंपरा के अनुसार अनुष्ठान में कश्यप गोत्र लिया जाएगा। |
| Sankalp empty | Write the intention you carry. One sentence is enough. | जो मनोकामना आप लिए हैं, वह लिखें। एक वाक्य पर्याप्त है। |
| Sankalp counter | 240 characters. {n} left. | 240 अक्षर। {n} शेष। |
| Sankalp > 240 | Say it in 240 characters or fewer. | अपनी बात 240 अक्षरों में कहें। |
| Too many names (Parivar) | Parivar Snan carries up to six names. Remove one, or choose Varshik Snan. | परिवार स्नान में छह नाम तक आते हैं। एक हटाएँ, या वार्षिक स्नान चुनें। |
| Email malformed | That email address is not complete. | यह ईमेल पता पूरा नहीं है। |
| Date in past | That muhurat has passed. | वह मुहूर्त बीत चुका है। |
| Nothing selected | Choose a river to see its muhurats. | मुहूर्त देखने के लिए एक नदी चुनें। |

**Gotra field, additional requirements.** The field accepts free text (there is no closed list of gotras and offering one would be wrong). It offers an inline `I do not know my gotra` toggle which sets the value to `Kashyap` and shows the helper above. **PLACEHOLDER, the Kashyap fallback convention must be confirmed by a named purohit advisor before this ships.**

**Name field** accepts Devanagari, Latin, Tamil, Telugu, Kannada, Malayalam, Gujarati, Bengali, Gurmukhi and Odia scripts. Do not validate against `[A-Za-z]`.

## 6.6 Confirmations

**After a snan is taken:**

> EN, **Your sankalp is taken.**
> {name}, {gotra} gotra, {river}, {ghat}
> {date} at {time} IST · {localTime} where you are
> We will remind you an hour before.
>
> HI, **आपका संकल्प ले लिया गया है।**
> {name}, {gotra} गोत्र, {river}, {ghat}
> {date}, {time} IST · आपके यहाँ {localTime}
> हम एक घंटा पूर्व स्मरण कराएँगे।

**Destructive confirm (cancelling):**

> EN, **Cancel this snan?**
> The muhurat is released to someone else. You are refunded in full until 24 hours before the rite.
> `[Keep it]` `[Cancel the snan]`
>
> HI, **यह स्नान रद्द करें?**
> मुहूर्त किसी और के लिए खुल जाएगा। अनुष्ठान से 24 घंटे पूर्व तक पूरी राशि लौटा दी जाती है।
> `[रहने दें]` `[स्नान रद्द करें]`

**Toasts** (≤ 8 words, no punctuation beyond a danda):

| EN | HI |
|---|---|
| Saved. | सहेज लिया गया। |
| Name added. | नाम जोड़ दिया गया। |
| Muhurat changed. | मुहूर्त बदल दिया गया। |
| Link copied. | लिंक कॉपी हो गया। |
| Your Sankalp Patra is ready. | आपका संकल्प पत्र तैयार है। |
| Smaran turned off. | स्मरण बंद कर दिया गया। |

## 6.7 Notifications

Cap: **four per snan, maximum.** Booking confirmation, 24-hour reminder, 1-hour reminder, recording ready. Nothing else without an explicit opt-in.

| Trigger | EN | HI |
|---|---|---|
| Booked | Your sankalp is taken, {date}, {time} IST at {ghat}. | आपका संकल्प ले लिया गया, {date}, {time} IST, {ghat}। |
| 24 h before | Tomorrow at {time} IST, your snan at {ghat}. | कल {time} IST, {ghat} पर आपका स्नान। |
| 1 h before | In an hour. The stream opens ten minutes early. | एक घंटे में। प्रसारण दस मिनट पहले खुल जाता है। |
| Rite done, user absent | Your snan was performed at {time} IST. The recording is here. | आपका स्नान {time} IST पर संपन्न हुआ। रिकॉर्डिंग यहाँ है। |
| Patra ready | Your Sankalp Patra is ready. | आपका संकल्प पत्र तैयार है। |
| Smaran (opt-in, 1/yr) | The Smaran you set for {name} falls on {date}. `[Open]` `[Turn this off]` | {name} के लिए निर्धारित स्मरण {date} को है। `[खोलें]` `[बंद करें]` |

**The absent-user notification never says "you missed it".** No `sorry you couldn't make it`, no `we noticed you weren't there`. The rite was performed; that is the whole message.

**Every Smaran notification carries an inline off-switch.** Not a settings link, the actual control.

## 6.8 The Sankalp Patra

The certificate copy. Fixed layout, fixed wording.

```
                    SANKALP PATRA

  This records that on {date}, at {time} IST,
  at {ghat}, on the {river},
  a snan was performed in the name of

                    {NAME}
                of {gotra} gotra

  with this sankalp:
  "{sankalp}"

  Performed by {purohit}
  Attending live: {n}
  Recording: {url}          Reference: {id}

  Issued by Snanify. This is a record of a rite
  performed. It is not a claim about its result.
```

```
                    संकल्प पत्र

  यह अभिलेख है कि {date} को, {time} IST पर,
  {river} के {ghat} पर,
  स्नान संपन्न हुआ, के नाम से

                    {NAME}
                {gotra} गोत्र

  संकल्प:
  "{sankalp}"

  आचार्य: {purohit}
  सजीव उपस्थित: {n}
  रिकॉर्डिंग: {url}          क्रमांक: {id}

  स्नानिफ़ाई द्वारा जारी। यह संपन्न अनुष्ठान का
  अभिलेख है, उसके फल का दावा नहीं।
```

The final line is not optional and is not to be softened. It is the single sentence that separates this product from the category it sits in.

## 6.9 Muhurat state labels

Every muhurat renders exactly one state.

| State | EN | HI |
|---|---|---|
| `estimated` | Provisional, confirmed nearer the date | अस्थायी, तिथि निकट आने पर पुष्ट |
| `confirmed` | Confirmed | पुष्ट |
| `open` | Open | उपलब्ध |
| `few` | {n} places remain, the ghat admits a fixed number | {n} स्थान शेष, घाट पर निश्चित संख्या ही संभव |
| `closed` | Closed | बंद |
| `inProgress` | Under way now | अभी चल रहा है |
| `completed` | Performed | संपन्न |
| `recordingReady` | Recording ready | रिकॉर्डिंग उपलब्ध |
| `rescheduled` | Moved to {date} | {date} को स्थानांतरित |
| `refunded` | Refunded in full | पूरी राशि लौटा दी गई |

`few` is only ever shown when the number is real and the constraint is real, and it always states the reason. Never a countdown timer on a muhurat.

---

# PART 7, BANNED TERMS

`copy:lint` fails the build on any of these.

## 7.1 Physical fulfilment, banned because we ship nothing

`ship`, `shipping`, `delivery`, `deliver` (of objects), `courier`, `post`, `dispatch`, `tracking number`, `kit`, `box`, `bottle`, `Ganga jal delivered`, `prasad delivered`, `sacred thread`, `printed certificate`, `mailed`, `at your doorstep`

HI: `भेजा जाएगा` (of objects), `घर तक`, `डिलीवरी`, `कूरियर`, `पार्सल`

`prasad` may be *discussed* (it is in the lexicon) but never offered. `deliver` is permitted only of digital things and only in operational register (`the recording is delivered to your account`), prefer `arrives`.

## 7.2 Commerce metaphors, banned because they commodify the rite

`buy`, `purchase`, `order`, `cart`, `add to cart`, `checkout`, `SKU`, `product`, `package`, `plan`, `tier`, `bundle`, `deal`, `discount`, `sale`, `offer` (as a discount noun), `subscribe`, `subscription`, `upgrade`, `downgrade`, `premium`, `pro`, `basic`, `elite`, `unlock`, `redeem`, `credits`, `points`, `loyalty`, `referral bonus`, `coupon`, `promo code`

HI: `ख़रीदें`, `ऑर्डर करें`, `कार्ट`, `डिस्काउंट`, `ऑफर`, `सेल`, `प्रीमियम`, `अनलॉक करें`, `पॉइंट्स`, `कूपन`

`offer` as a **verb** is not only permitted but preferred (`offer what is right`). Only the discount-noun sense is banned.

## 7.3 Scarcity, urgency and pressure, banned because they are pressure

`hurry`, `hurry up`, `act now`, `last chance`, `don't miss`, `don't miss out`, `missing out`, `limited time`, `limited offer`, `ends soon`, `expires soon`, `while stocks last`, `only X left` (unbounded), `X people are looking at this`, `booked in the last hour`, `almost gone`, `selling fast`, `before it's too late`, any countdown on a muhurat

HI: `जल्दी करें`, `अभी करें`, `अंतिम अवसर`, `चूक न जाएँ`, `सीमित समय`, `जल्द समाप्त`, `तेज़ी से भर रहा है`

Real constraint may be stated once, factually, with its reason (see §6.9 `few`).

## 7.4 Unverifiable trust claims, banned because we cannot evidence them

`authentic`, `100% authentic`, `genuine`, `real pandit`, `certified priest`, `verified brahmin`, `government approved`, `temple approved`, `trusted by thousands`, `loved by`, `#1`, `India's leading`, `award-winning`, `as seen on`, any statistic without a source

HI: `प्रामाणिक`, `असली पंडित`, `प्रमाणित`, `भारत का नंबर 1`, `हज़ारों का भरोसा`

Verifiable facts are always allowed and always preferred: name the ghat, name the purohit (with consent), state the time, show the recording.

## 7.5 Theological overreach, banned because they are false and because they are not ours to promise

`guaranteed blessings`, `assured punya`, `instant moksha`, `salvation`, `karma cleanse`, `cleanse your karma`, `wash away your sins`, `purify your sins`, `sin` (as a noun, `papa` is not `sin`; the mapping is a Christian import), `absolution`, `divine guarantee`, `the gods will`, `God's blessing delivered`, `100% punya`

HI: `पाप धुलेंगे`, `मोक्ष की गारंटी`, `पुण्य निश्चित`, `चमत्कार`, `भाग्य बदलें`, `मनोकामना पूर्ण होगी`

The product **records a rite performed**. It never claims a result. Every surface that could imply otherwise carries the Sankalp Patra disclaimer line.

## 7.6 The affliction-and-remedy frame, banned outright, product and vocabulary

`dosh`, `dosha`, `nivaran`, `upay`, `remedy`, `Kaal Sarp`, `Pitra Dosh`, `Mangal Dosh`, `Shani Sade Sati`, `graha peeda`, `nazar`, `negative energy`, `bad luck`, `curse`, `affliction`, `cure`

HI: `दोष`, `निवारण`, `उपाय`, `कालसर्प`, `पितृदोष`, `साढ़ेसाती`, `नकारात्मक ऊर्जा`, `बुरी नज़र`, `कष्ट निवारण`

## 7.7 Grief and obligation, banned because they are the line

`your ancestors are waiting`, `they are waiting for you`, `do it for them`, `you owe`, `it has been X years since`, `don't let them down`, `they would have wanted`, `at peace at last`, `finally released`, `unfinished duty`, `neglected`

HI: `पूर्वज प्रतीक्षा कर रहे हैं`, `उनका ऋण`, `कर्तव्य अधूरा`, `आत्मा भटक रही है`

## 7.8 New Age register, banned because it is the wrong culture

`spiritual journey`, `sacred journey`, `soul journey`, `wellness`, `self-care`, `mindfulness`, `energy`, `vibrations`, `high vibration`, `chakra` (unless a rite genuinely involves it), `manifest`, `manifestation`, `abundance`, `align`, `aligned`, `intentional living`, `healing`, `transformative`, `life-changing`

HI: `आध्यात्मिक यात्रा`, `ऊर्जा`, `कंपन`, `परिवर्तनकारी`

## 7.9 Tone and register violations

`holy dip` (use `snan` or `the dip`), `holy water` / `holy river` (use `sacred`), `Ganges` (use `Ganga`), `virtual snan` / `simulated` / `AI-generated` (the rite is real, the *attendance* is remote; the service is `digital`), `devotees` (use `you`), `guru` / `baba` as a marketing persona, `Om` as ornament, `Namaste` as a UI greeting, `NRI` (use `Indians abroad`, or better, `wherever you are`), `oops`, `uh-oh`, `whoops`, `yay`, `awesome`, `magic`, `magical`, `seamless`, `frictionless`, `game-changing`, `revolutionary`, `disrupting`, `leverage`, `utilise`

HI: `पवित्र डुबकी`, `अनिवासी भारतीय` (bureaucratic, use `प्रवासी भारतीय` if the term is needed at all), `बाबा`, `जादू`, `क्रांतिकारी`

## 7.10 Identity language

Not banned, but restricted. Describe **rites**, never **identity**. `A Hindu rite performed at a Hindu ghat` is factual and fine. `The Hindu way`, `for Hindus only`, `every true Hindu`, `our sanatan duty`, and every religious-political slogan are banned. Nothing in this product asserts who someone is or ought to be.

---

# PART 8, NUMBERS, DATES, MONEY

## 8.1 Date and time

`formatMuhurat(instant, { locale, tz })` returns `{ ist, local, relative }`.

| | EN | HI |
|---|---|---|
| IST (canonical, always 24 h) | `Sat 21 Nov 2026 · 04:24 IST` | `शनि 21 नवंबर 2026 · 04:24 IST` |
| Local echo | `Fri 20 Nov · 5:54 pm · America/Los_Angeles` | `शुक्र 20 नवंबर · शाम 5:54 · America/Los_Angeles` |
| Relative > 1 h | `opens in 6h 12m` | `6 घंटे 12 मिनट में` |
| Relative < 1 h | `opens in 41m` | `41 मिनट में` |
| Relative < 60 s | `opens in under a minute` | `एक मिनट से कम में` |
| Range | `04:24-05:12 IST` | `04:24-05:12 IST` |

Rules:
- **IST is always 24-hour, in both locales.** It is a panchang time and that is how panchang times are written.
- **Local echo follows the user's locale convention**: 12 h for en-US/en-AU/en-CA, 24 h for en-GB/de/fr and for hi-IN.
- **Hindi 12-hour uses day-part words, not पूर्वाह्न/अपराह्न** (which is stiff and legal-sounding):
  `04:00-11:59 → सुबह` · `12:00-15:59 → दोपहर` · `16:00-18:59 → शाम` · `19:00-03:59 → रात`
  Written before the numeral: `शाम 5:54`.
- **Always show the IANA zone**, never an abbreviation, `America/Los_Angeles`, not `PST`.
- **Weekdays HI (short):** रवि सोम मंगल बुध गुरु शुक्र शनि
- **Months HI:** जनवरी फ़रवरी मार्च अप्रैल मई जून जुलाई अगस्त सितंबर अक्टूबर नवंबर दिसंबर
- **Never show a muhurat time without its source-and-state line** (§8.2).

## 8.2 Panchang attribution, mandatory

Every rendered timing carries, in the same block:

| EN | HI |
|---|---|
| Timing per {source}, {ayanamsa} ayanamsa · confirmed {confirmedDate} | समय {source} के अनुसार, {ayanamsa} अयनांश · {confirmedDate} को पुष्ट |
| Timing per {source}, {ayanamsa} ayanamsa · provisional, confirmed nearer the date | समय {source} के अनुसार, {ayanamsa} अयनांश · अस्थायी, तिथि निकट आने पर पुष्ट |

`source` and `ayanamsa` are data fields, never hardcoded. **PLACEHOLDER, no panchang source is contracted yet. Until one is, no specific timing may appear anywhere except as an obviously illustrative example, clearly labelled.** The hero card's `04:24 IST` currently reads as fact and must either become live data or be labelled.

Occasion dates in the muhurat section are correctly hedged today (`November 2026`, month-level, plus `Exact timings follow the panchang and are confirmed when booking opens`). Keep that hedge. **Never narrow to a day** until a source confirms it.

## 8.3 Currency

**Prices are authored, not converted.** The numeral is the ritual.

| Offering | USD/EUR/GBP/CAD/AUD/SGD/AED | INR |
|---|---|---|
| Darshan | 0 | 0 |
| Ekal Snan | 11 | 251 |
| Parivar Snan | 31 | 751 |
| Mahaparv Snan | 51 | 1,251 |
| Varshik Snan | 108 | 2,501 |
| Pitru Sankalp (add) | 10 | 251 |

- Non-INR markets share the 11 / 31 / 51 / 108 ladder because those integers *are* the meaning; FX drift of ±25% is accepted and absorbed in margin.
- INR uses the traditional dakshina ladder ending in 1.
- Formatting: `Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 })`. Prices are always whole. Never `$11.00`.
- INR renders with Indian grouping: `₹2,501`, `₹1,251`.
- Free renders as the word, never `$0`: EN `Free`, but per §3.2, HI is `निःशुल्क`, never `मुफ़्त`.

Copy rules for money: never `only $11`, never `just $11`, never a struck-through comparison price, never `save 18%`. If the Varshik Snan is better value, state it as a fact: `Twelve snans across the year` sitting beside `A single dip` does the work.

## 8.4 The Indian numbering system

- **Counts of people, sankalps and countries use Indian grouping in both locales**: `1,20,000+`, `12,50,000`. This is already the shipped convention (`1,20,000+ Sankalps offered`) and it is deliberate, it reads as fluent to the diaspora rather than foreign. Implementation: `new Intl.NumberFormat("en-IN")` in EN, `"hi-IN"` in HI.
- **Money in non-INR currencies uses western grouping** (`$1,250`), because the currency's own convention governs.
- **`lakh` and `crore` as words are banned in English UI.** A reader in Ohio has to stop and convert. Use digits.
- **Hindi may use लाख / करोड़ as words** for rounded marketing figures (`सवा लाख संकल्प`), and digits everywhere else. Rounding must never round *up* past the true figure.
- Ordinals: EN `1st, 2nd, 3rd`. HI `पहला, दूसरा, तीसरा`, never `1ला`.

## 8.5 PLACEHOLDER audit, must be resolved before the next deploy

Three strings in `src/lib/content.ts` are fabricated trust claims presented as fact and violate the stated constraints:

| Location | String | Required action |
|---|---|---|
| `hero.stats[0]` | `1,20,000+ · Sankalps offered` | Replace with a real count from the database, or remove the stat. Do not ship a number we cannot produce. |
| `hero.stats[2]` | `48 · Countries served` | Same. |
| `hero.badge` | `Live now · Har Ki Pauri, Haridwar` | Must be driven by real stream state, with an off-air variant: EN `Next live · Har Ki Pauri, {time} IST` / HI `अगला सजीव · हर की पौड़ी, {time} IST` |
| `hero.card` | `Brahma Muhurat · 04:24 IST · opens in 6h 12m` | Must be live panchang data with the §8.2 attribution line, or explicitly labelled illustrative. |
| `footer.cols[0].links[2]` | `Our priests` | No purohit partnership exists. Either the page names real, consenting purohits, or the link is removed. |
| `pricing.plans[1].features[2]` | `HD recording, kept for good` | "For good" is an unbounded promise. Replace with a stated term: EN `HD recording, kept for ten years` / HI `HD रिकॉर्डिंग, दस वर्ष तक सुरक्षित`, and confirm with legal/storage. |

`hero.stats[1]` (`6 · Sacred waters`) is true and stays.

---

# PART 9, QUICK REFERENCE FOR WRITERS

Before shipping any string, check:

1. Would it survive `copy:lint`? (No `!`, no emoji, no banned term, ≤ one em dash.)
2. Is it in the right register, ritual or operational? (§1.3)
3. Does every claim carry its limit? (§1.5)
4. Is any Sanskrit term spelled per §2.2?
5. Does the Hindi use आप and the formal imperative, and does it read like Hindi rather than translated English? (§3.2)
6. Does the Hindi interpolate a noun into an agreement position? (§3.3, if yes, rewrite)
7. Does anything imply a guaranteed result, an obligation to the dead, or an urgency that is not literally true? (§1.4, §7.3, §7.5, §7.7)
8. Is any number, date, timing, credential or partnership real, or is it PLACEHOLDER? (§8.5)

---

## Open questions for a human

- Panchang source and ayanamsa: which almanac tradition is authoritative for Snanify, Drik (Drikpanchang), Vishwavijay/Vishuddha Siddhanta, or a temple's own panchang? Different ayanamsas (Lahiri vs Raman vs KP) yield different muhurat times for the same day. This must be contracted, named in the UI on every timing, and not chosen by an engineer. Until it is resolved, no specific time may ship as fact, including the hero card's 04:24 IST.
- Purohit partnerships: are there named, consenting purohits at each of the six ghats? The 'Our priests' footer link currently promises a page that cannot honestly be written. Consent must cover being named, being filmed, and appearing on the Sankalp Patra.
- Ghat access and filming rights: Har Ki Pauri, Vishram Ghat, Ram Ghat and Ram Kund are administered by trusts and local authorities, several of which restrict commercial filming. Confirm permissions before any copy promises 'performed at the ghat itself, never a stock video', that sentence is currently a legal and reputational commitment.
- The Kashyap gotra fallback: is defaulting to Kashyap for users of unknown lineage the correct and respectful convention for the rites Snanify performs? A named purohit advisor must confirm the wording of the helper text before it ships, and confirm it holds across the six ghats' regional traditions.
- The 'Ponni' epithet for the Kaveri: verify with a Tamil-speaking advisor that Ponni reads as a dignified name rather than a folk or filmic one, and confirm the Devanagari transliteration पोन्नी is acceptable in the Hindi locale.
- Payments: which processor supports both INR (UPI, RuPay, netbanking) and the diaspora currencies with one flow? This determines whether the authored-price ladder in §8.3 is actually implementable, and whether the ±25% FX drift is absorbable at these price points.
- Recording retention: 'kept for good' must become a stated number. What retention is legally and financially sustainable, ten years? And what happens to a recording when a user deletes their account, given the recording contains a named third party (the purohit) and possibly other attendees?
- Data protection and DPDP compliance: gotra and sankalp text are almost certainly sensitive personal data under India's DPDP Act, and religious belief is a special category under GDPR for European users. The sankalp free-text field in particular will collect health and bereavement information. This needs a lawyer before the field ships.
- Deceased persons' names in Pitru Sankalp: what is the policy on naming someone who has died, who may name them, and what happens on a takedown request from another family member? This is a real conflict pattern in ancestor-rite products.
- The Mahaparv Snan at $51: is there operational capacity at festival scale? Kartik Purnima and Kumbh days are the highest-load, lowest-access days at every one of the six ghats. Selling a premium festival product we cannot deliver is worse than not offering it.
- Whether Darshan (free live viewing) creates a rights or dignity problem, an unbounded public stream of a ghat may capture bathers who have not consented. Framing and camera policy need a decision before free viewing ships.
- Refund policy: §6.6 and §6.4 both commit to full refunds (24 hours before, and whenever a rite cannot be performed). Confirm this is the actual policy and that it is written into Terms, because the microcopy is a binding representation.
- Hindi editorial ownership: this system needs a named native-speaker editor with sign-off on every Hindi string. A translation vendor will produce technically correct, tonally wrong Hindi and will not catch the §3.2 traps. Budget for a person, not a service.
- Whether the brand name Snanify survives contact with the Indian domestic market. The recommendation here is to keep it, but that is a judgement made from the diaspora side. If the India-resident audience reads it as flippant, the whole language system still holds, only the wordmark changes.
- Trademark and script: is स्नानिफ़ाई registrable in Devanagari alongside the Latin mark, and is snanify.in / .co.in secured?

---

## Adversarial review

**Verdict:** needs-work

### Credibility risks

- NAME COLLISION, SEVERE: 'Sankalp Patra' (संकल्प पत्र) is the standard Hindi term for an election manifesto, it is literally the title of the BJP's 2019 and 2024 manifestos. Every politically literate Indian reads those two words as a party document before they read them as a certificate. The spec elevates this to a Title-Cased proper artifact appearing on the certificate, in nav, in the lexicon, and in the footer. For a brand that spends a whole section proving it is not saffron-nationalist, this is the loudest possible own-goal, and the spec never notices it.
- THE BATCHING QUESTION IS UNANSWERED, and it is the product's central honesty risk. 'A rite performed in your name' and 'never a re-run' imply an individuated rite. At any real volume, one purohit will read many names in one session. Samuhik (collective) sankalp is a legitimate practice, but if the copy implies individuation and the operation delivers collective, the entire trust architecture built on 'never a stock video' collapses on the first sceptical Reddit thread. The language system defines the promise and does not define its boundary.
- DESHA-KALA PROBLEM UNADDRESSED: a properly performed sankalp names place and time, 'in this country, this samvatsara, this tithi, at this tirtha.' The yajaman is in Ohio; the rite is at Haridwar. A knowledgeable Hindu asks this within thirty seconds. The honest answer exists (pratinidhi / proxy sankalp with the yajaman named in absentia is accepted practice), but the spec never names it, so the product looks like it has not thought about the one question its own audience will ask first.
- 'SNAN BHENT' IS THEOLOGICALLY INCOHERENT as specified. Sankalp is by definition the yajaman's own stated intention. You cannot gift-wrap another competent adult's intention. Modelled as 'I took a sankalp for you,' it is a gift nobody can actually receive. (Parents for minors and pitru sankalp for the deceased are the real exceptions.)
- GOTRA IS CASTE-PROXY DATA and the spec treats it purely as a copy problem. Name + gotra + ancestor names + religious intention is special-category data under GDPR Art. 9 and sensitive under India's DPDP Act 2023, for an operation whose own footer says 'Prayagraj & Berlin.' A language system that specifies helper text for gotra but has zero words on consent language, purpose limitation, or retention is drafting the exact strings that create the exposure.
- 'HD recording, kept for good' / 'सदैव सुरक्षित' (content.ts:126, :258) is a perpetual-retention promise written into marketing copy. It conflicts head-on with erasure rights and storage limitation under both GDPR and DPDP, and it is a promise made in the voice the spec is trying to preserve.
- THE FREE 'DARSHAN' TIER BROADCASTS OTHER CUSTOMERS' RITES TO STRANGERS. A paying Ekal Snan customer's name, gotra and stated intention are read aloud on a stream the spec proposes to open, for free, as an acquisition surface. The spec never asks whether that customer consented to an anonymous audience. This is simultaneously a dignity failure, a GDPR failure, and the kind of thing that ends a spiritual-tech company.
- Naming the free acquisition funnel 'Darshan' is exactly the term-inflation the spec bans elsewhere. Darshan is reciprocal seeing, of and by the deity. Using it as the label on a top-of-funnel freebie is the quiet kind of exploitation that a practising user feels before they can articulate it.
- MAHAPARV SNAN AT $51 CHARGES MORE FOR THE HOLIER DAY. The spec bans 'Only 3 slots left, hurry' and then builds its pricing equivalent. If the surcharge has an operational basis (more purohits, crowd logistics, permits at Kumbh scale), that must be the stated reason. Absent that, the customer correctly infers that Snanify sells auspiciousness by the gram.
- THE PITRU SANKALP MODIFIER IS PRICED GRIEF, whatever §1.4 says. Tarpan is traditionally inside the sankalp, not an upsell SKU. +$10 also breaks the auspicious-integer system the spec just declared load-bearing ('11, 31, 51 and 108 are the product'). Charging a round Western $10 to name your dead, on a page where every other number is a shagun integer, reads as the one line item where the ritual logic was dropped for the revenue logic.
- 'Ganges is the colonial exonym' is factually wrong and tonally the closest this document comes to the register it claims to avoid. Ganges reaches English via Greek from Sanskrit Gaṅgā, attested from the Alexander-era accounts, two millennia before the Raj. Similarly, making 'Allahabad' a banned term with commentary aligns the brand with a live political position. Use the Indic names because they are the names; do not editorialise about it in a style guide.
- HINDI-ONLY BILINGUALISM IS PRESENTED AS PAN-INDIAN. Five of six sites are North Indian; the sixth is the Kaveri, whose devotees are Tamil, Kannada and Telugu speakers for whom Hindi is not a second language but a political sore point. Sankalp conventions genuinely differ by sampradaya (Tamil Smarta vs Sri Vaishnava desha-kala and lineage markers), and Lingayats/Veerashaivas reject rishi-gotra outright. 'A digital snan for Indians everywhere' delivered as English + Hindi with a mandatory gotra field is a North Indian Brahminical system wearing a pan-Indian label.
- THE SIX RIVERS QUIETLY BREAK THE SAPTANADI SHLOKA that observant Hindus recite daily, गंगे च यमुने चैव गोदावरि सरस्वति। नर्मदे सिन्धु कावेरि। Narmada is absent and Shipra is substituted. 'Six rivers. One dip.' implies a canonical set. The actual logic (the four Kumbh grounds, plus Yamuna and Kaveri) is defensible and better, but it is nowhere stated, so the omission reads as ignorance rather than choice.
- SILENT KASHYAP-GOTRA FALLBACK ASSIGNS AN IDENTITY ON THE USER'S BEHALF. Using Kashyap gotra when one is unknown is a real convention, but it is one convention among several (kuldevta-based, achyut gotra, the family purohit's gotra), and the spec asserts it as 'the tradition already provides for this.' Silently attaching a rishi-lineage to a diaspora user, possibly from a community that has never used gotra, is a claim about who they are, made by a checkout form.
- The lexicon lists prasad, aarti, abhishek, deepdaan, kalash and parikrama. In a product that offers none of these, a lexicon entry is a promise-shaped artifact, it reads as a menu.
- FABRICATED OPERATIONAL CLAIMS BEYOND THE STATS: the spec correctly flags '1,20,000+ sankalps' and '48 countries' (content.ts:41-43) but misses 'Made with reverence · Prayagraj & Berlin' (content.ts:150), an unverified claim of Indian operational presence, which is precisely the claim this product's credibility rests on. Also note the flagged stats are not merely a brand risk: they are a misleading commercial practice under the EU UCPD and actionable under India's CCPA 2019 / ASCI rules.
- NO IMPRESSUM. A Berlin-operating service has a statutory duty to publish a legal entity, address and contact. The footer (content.ts:143-152) has none, and the language system that specifies every other footer string does not mention it.
- 'Never a stock video, never a re-run' is hard-coded into the brand voice as an absolute, but it is an operational commitment dependent on filming permission at each ghat (Ganga Sabha at Har Ki Pauri, municipal and mela authorities at Kumbh sites). A language system should not enshrine a promise that a permit refusal breaks.

### Required fixes

- Rename Sankalp Patra. 'Snan Praman' / स्नान प्रमाण, or simply 'Patra', or 'Snan Abhilekh'. Anything that does not collide with a national party's manifesto. Update content.ts:76, :146, :223, :289 and the lexicon entry `sankalp-patra` together.
- Add a mandatory §on individuation to the voice guide: define in copy whether a snan is individually or collectively sankalped, name समूहिक/samuhik sankalp if collective, and forbid any string that implies exclusivity the operation does not deliver. This is a higher-priority section than anything in Part 1.
- Add pratinidhi sankalp to the term policy and to the how-it-works copy. Something like: 'The sankalp is taken at the ghat, in your name, in your absence, the practice the shastras call pratinidhi.' Naming it converts the product's weakest theological point into its strongest trust signal.
- Re-model Snan Bhent as a voucher the recipient redeems by taking their own sankalp. Copy must never say 'a sankalp taken for you'; it says 'a snan offered to you, for you to take.' Carve out minors-by-guardian and pitru sankalp explicitly.
- Make Pitru Sankalp free on every tier and say so in the copy. It removes the grief-pricing charge entirely, costs almost nothing, and is the single most credibility-buying decision available. If it must be paid, price it at 11, never 10.
- Give Mahaparv Snan a stated operational reason for its price, in the copy itself, or drop the tier. 'Festival muhurats need more purohits and a permitted slot at a crowded ghat' is honest. Silence reads as selling auspiciousness.
- Gate the free Darshan stream: it shows the ghat and the rite, never a named sankalp, unless that customer opted in. Add a consent string to the sankalp form and to the language kit. Also reconsider the name, 'Watch a snan' (already shipped at content.ts:33) is honest and unloaded; Darshan is not.
- Add a data-and-consent section to the language system covering gotra, ancestor names and sankalp text as sensitive data: consent copy, purpose limitation, a stated retention period, and an erasure path. Replace 'kept for good' / 'सदैव सुरक्षित' with a specific, honourable term ('kept for ten years, and yours to delete at any time').
- Add an explicit exemption: legal, refund, cancellation and privacy copy is exempt from the voice rules, is drafted by counsel, and is never softened to avoid purchase vocabulary. The spec's operational register gestures at this; make it a rule.
- Publish an Impressum / legal entity block in the footer, and verify or delete 'Prayagraj & Berlin' (content.ts:150). Mark it PLACEHOLDER alongside the hero stats.
- Require documented filming permission per ghat before the 'never a stock video, never a re-run' line ships on any page. Add it to the same PLACEHOLDER gate as the stats.
- Replace 'India's most sacred waters' with the actual, statable logic: the four Kumbh grounds, Haridwar, Prayagraj, Nashik, Ujjain, plus the Yamuna at Mathura and the Kaveri at its source. It is more concrete (Rule 4), removes the last superlative (Rule 7), and pre-empts 'where is the Narmada?'
- Fix the Kaveri site description. Talakaveri is the source kundike at Brahmagiri, not a ghat. Either say 'the Tirtha Kundike at Talakaveri' or move the Kaveri site to an actual ghat (Srirangapatna, Tiruchirappalli). 'Every snan is performed at the ghat itself' is currently false for one of six rivers.
- Scope the bilingual claim honestly: state in the spec that v1 is English + Hindi, that this does not serve the Kaveri's own linguistic communities, and name Tamil/Kannada/Telugu/Marathi as a committed roadmap. Make the sankalp form sampradaya-agnostic: gotra optional and never presented as universal, with a plain 'many families do not use gotra' note.
- Make the Kashyap fallback an explicit, confirmed user choice, not a silent default. Helper text: 'Where a gotra is not known, rites are commonly performed under Kashyap gotra. We will use it only if you choose it.' Never write it into the record without an affirmative click.
- Fix 'मनोकामना' at content.ts:213. The shipped Hindi translates sankalp as 'wish', precisely what §2.1 bans in English. Use संकल्प. The spec audited the English and did not audit the Hindi against its own rules; do a full HI pass against the term policy.
- Resolve the wordmark contradiction: globals.css:126-133 states the wordmark stays Latin inscriptional caps in every locale, but content.ts:294 ships '© 2026 स्नानिफ़ाई'. Pick one. Recommend Latin-only, स्नानिफ़ाई reads close to 'Bath-ify' in Hindi, which is a real comic risk the spec's '-ify reads SaaS' paragraph does not confront in the Devanagari locale.
- THE LINE-HEIGHT FIX AS SPECIFIED DOES NOT WORK. Raising globals.css:109 from 0.98 to 1.18 is defeated by Tailwind arbitrary values at the component level: Landing.tsx:58 sets leading-[0.95] on the hero h1 and Landing.tsx:239 sets leading-[1.08] on the closing h2, the two largest Hindi headings on the page. The fix must set these per-locale (a `display-hi` variant or a CSS var the components consume), not just the utility default.
- The italic defect is worse than the spec states. Landing.tsx:63 applies `italic` to the hero titleB, in Hindi that is 'आप तक आती है।' in synthetically obliqued Tiro Devanagari at 5.4rem, the single largest text on the site. Landing.tsx:135 does the same to every river note. Ship the `html[lang="hi"] .italic { font-style: normal }` rule, and give the Hindi hero a different emphasis device (colour alone, which it already has via text-gold).
- Set the Hindi `inscription` letter-spacing to 0, not 0.05em (globals.css:123). Tracking on Devanagari opens gaps in the shirorekha, which is meant to run continuous across a word, it is a legibility defect, not just a taste one. Get the 'carved' feel from size, weight and colour instead.
- Add a Devanagari-vs-Latin numeral rule. The shipped Hindi mixes ०१/०२/०३ for steps (content.ts:211-221) with Latin for dates, prices, times and the 1,20,000 stat. Pick one, recommend Latin numerals throughout for machine-readable values, Devanagari only for decorative step ordinals, and say so.
- Correct two false claims about the shipped copy before anyone treats the spec as descriptive. (a) The Oxford comma rule is wrong: content.ts:66 reads 'your name, your gotra, and the intention you carry', an Oxford comma. (b) The one-em-dash rule is violated in the same line: 'Add family, and ancestors, if you wish' is a two-dash parenthetical, which the spec lists as its own Don't. Either fix the copy or fix the rule, but do not claim the rules are already latent when they are not.
- Rewrite the incoherent ellipsis rule in §1.11, 'No ellipses, except a single trailing one is still disallowed' does not parse. It should read: no ellipses anywhere; loading states name the action instead.
- Reconsider 'Varshik'. The grammar fix is correct, but वार्षिक is the standard Hindi adjective in वार्षिक शुल्क / वार्षिक सदस्यता, annual fee, annual subscription, which is the exact connotation Rule 9 bans. 'Samvatsar Snan' (संवत्सर, the ritual year, and a word that appears in real sankalp formulae) is in-register, dodges the subscription reading, and is more beautiful. 'Barah Snan' is the plain alternative.
- Reconcile the schema with the decision text: the decisions describe a `glossHi` flag controlling Hindi suppression, but LexEntry defines `showInHi`. Also fix the punya and prasad Hindi glosses, which carry only the disclaimer and drop the definition, a Hindi reader gets 'punya is not a currency' with no antecedent.
- Soften the pandit/purohit ban. Purohit is specifically a family's hereditary priest, so a purohit serving a stranger is technically a misuse; and at Har Ki Pauri the officiants are the tirth purohits / pandas who keep the genealogical vahis. 'The purohit at the ghat' (which the gloss already says) works; a blanket ban on 'pandit ji' is tone-deaf to how everyone actually speaks.
- Add a pluralisation rule for loanwords, the shipped copy already uses 'Sankalps' and 'snans'. Rule it explicitly (English -s plural) rather than leaving a second writer to guess.
- Prune the lexicon to terms the product actually uses. Drop deepdaan, parikrama, kalash, abhishek unless offered. Keep prasad solely for its 'we send nothing physical' disclaimer and mark it as such.
- Rule that Smaran reminders contain no CTA, no price and no link to checkout. An opt-in, once-yearly, easily-disabled death-anniversary notification is defensible; the same notification with a Buy button is grief marketing regardless of frequency caps.
- Permit 'Ganges' in exactly two places, the meta description and schema.org alternateName, for search discovery, while banning it in all visible prose. And delete the 'colonial exonym' justification from the doc; 'we use the Indic name' needs no argument.

### Must survive

- THE REFUSAL OF GRAH SHANTI / DOSH NIVARAN / KAAL SARP / PITRA DOSH, and the ban on the entire affliction-and-remedy vocabulary. This is the single most valuable decision in the document. That category is where every exploitative puja-tech company makes its money, and naming it as 'the single most profitable and most dishonest thing this business could sell' is the sentence that proves an adult wrote this. Do not soften it, do not add an 'educational' astrology surface as a back door.
- §1.4, the three grief rules, essentially verbatim. Never assert the state of the dead ('not at peace, not waiting, not blessed, not released'). Never create an obligation, no 'it has been a year since'. Describe only what the rite does. This is more rigorous than most real dharmic institutions manage and it is the ethical spine of the whole product.
- The two-register split, and specifically 'The water does not listen inside a payment error.' Naming ritual-register leakage into operational surfaces as the predicted top failure mode is the kind of foresight that survives contact with a growth team. Keep 'The Ganga is gathering...' as the canonical banned example.
- Inline first-occurrence glossing as a component backed by a typed lexicon, instead of a glossary page. The reasoning, that the second-generation reader who does not know what gotra is will not leave the flow to find out, is correct and is the mechanism that makes the untranslated-terms policy viable rather than alienating.
- Suppressing glosses in the Hindi locale per-entry. 'A Hindi reader does not need गोत्र defined. Explaining it insults them.' Exactly right, and almost every bilingual product gets this wrong.
- The untranslated-terms policy and, above all, the 'Never translate as' table. 'Holy dip', 'merit points', 'lucky hour', 'certificate of prayer', 'donation' for dakshina, every one of those is a real product that exists and is embarrassing. Banning them by name is enforceable in a way that 'be respectful' is not.
- Schwa-deleted, diacritic-free transliteration with IAST quarantined to a lexicon field. Correct call: macrons signal an academic register the brand does not have and break in URLs and OG cards.
- Per-currency authored auspicious integers, never FX-converted, '11, 31, 51 and 108 are the product, not a price point', and the separate INR ladder ending in 1 (251 / 751 / 1,251 / 2,501). The observation that Indian ritual amounts conventionally end in 1 is a genuine cultural detail most teams would never find, and a converted €10.34 really would destroy the meaning.
- The ban on interpolating nouns into Hindi strings, with pre-authored per-noun variants. Hindi gender agreement breaking a generic {noun} placeholder in roughly half of cases is true, no runtime library fixes it, and almost no localisation spec anticipates it.
- Formal आप with -एँ/-इए, everyday Hindi for UI verbs, Sanskritized register confined to ritual language. 'सहेजें not संरक्षित करें' is the perfect one-line illustration of the most common Hindi-localisation failure.
- Mandatory source-and-state labelling on every muhurat, provisional or confirmed, panchang source and ayanamsa named, never a bare fact. Naming the ayanamsa specifically is a detail only someone who has actually compared two panchangs would think of, and it directly satisfies the honesty constraint.
- Making gotra optional with an explicit unknown path, and the reasoning that a required field pushes people to invent one, 'which corrupts the rite the product exists to perform.' The mechanism needs fixing (see fixes) but the principle is exactly right.
- Flagging the hero statistics and the 'Our priests' link as PLACEHOLDER and gating them behind real data. Verified live at content.ts:41-43 and content.ts:146.
- Never verbing or conjugating Snanify, and the honest acknowledgement that '-ify reads SaaS' is a real tension held deliberately rather than pretended away. A brand doc that admits its own compromise is more trustworthy than one that doesn't.
- Sentence case in source with CSS applying the uppercase, so the Hindi locale opting out of text-transform is not left with shouting Devanagari. Small, correct, and already implemented at globals.css:114-124.
- The correct diagnosis of both typographic defects: Tiro Devanagari has no italic and the browser shears the shirorekha, and 0.98 line-height collides upper and lower matras. Both confirmed live in the build (Landing.tsx:63, :135; globals.css:109).
- The ten voice rules as a set, the period as caesura, the triad-then-turn, concrete place-nouns over abstractions, honesty-by-negation rationed to once per section, and 'verbs of offering, not verbs of purchase' with the pricing section titled Sankalp. This is a genuinely distinctive voice and the discipline is real. Rule 5, understating the claim and stating its limit in the same breath, is the one that will keep this company honest when it is under revenue pressure.
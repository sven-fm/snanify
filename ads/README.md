# Meta ads, Kartik 2026

The campaign, the copy and the creative for the first Meta ads. Written under the two rules in
`CLAUDE.md`: nothing claims a rite happened, nothing promises an outcome. Under Meta's own rules:
no sentence tells the reader who they are (religion, origin), and nothing is engagement bait.

## The files

| File | What |
| --- | --- |
| `out/static-home-{en,hi}-{diaspora,india}-{45,916}.png` | "Send the Ganga home", loud: truck-art signboard, the hook in giant capitals with GANGA in red, the Patra in a phone with a price burst, Start now. 4:5 for Feed (hook beside the phone), 9:16 for Stories and Reels (hook above it) |
| `out/static-kartik-…` | "Kartik with the Ganga", loud: calendar art, KARTIK SNAN with a gold offset, the "Starts 27 October" sash, the four-by-five sheet framed in gold, Start now. A second static, held back for week two |
| `out/video-kartik-{en,hi}-{diaspora,india}.mp4` | The 9:16 video, cut from a real sitting recorded on an iPhone (13 October, so the app inside the phone is the earlier design): the recording plays in a phone on the loud signboard, five captions in black capitals with a red offset, then the end card (GANGA SNAN, the price burst, Start now, the owner's Patra rising in a phone). `upload/kartik-*-v2.mp4` is the same file; `upload/kartik-*-45.mp4` the 4:5 cut, `crop=1080:1350:0:285` |
| `launch/out/snanify-launch-45.mp4` | The LinkedIn launch video, 4:5, 18.6 s: the title, then five screens of the snan drawn from the kit and simplified to read at feed size (the reading, the breath, the sankalp, the stillness, the Patra) swipe through a phone standing in the river, each under its caption, then "Do your own snan." and the press. A synthesised tanpura and one bell under it. `node ads/launch/render.mjs` (`--stills` for one frame per screen); the captions and timing are in `launch/render.mjs`, the screens in `launch/launch.html` |
| `out/patra-*.png` | The specimen Patra, today's real figure, the Sharma family, 06:12 in New York |
| `src/*` | Everything that made them: `render-patra.ts`, `render-statics.mjs` and `render-cards.mjs` (both through `loud.html`), `render-loud.mjs`, `render-campaign.mjs`, `campaign.html`, `cut-video.sh`, `copy.mjs` |
| `out/campaign-{matchbox,signboard,calendar}-{en,hi}-{diaspora,india}-{45,916}.png` | The campaign layer in bazaar print (DESIGNSYSTEM.md, Campaigns): matchbox and signboard for the price story and scroll-stopping ads, calendar art for Kartik and the festival posts |

Re-render after a copy change: `node ads/src/render-statics.mjs && node ads/src/render-cards.mjs`, then
the videos: `ads/src/cut-video.sh ads/in/sitting.mp4 <en|hi> <diaspora|india> 0 3.2 7 31 ads/in/patra-sven-ganga.png`
for each of the four, and the 4:5 cuts with `ffmpeg -i <video> -vf crop=1080:1350:0:285`.
The campaign layer: `node ads/src/render-campaign.mjs` (or with one style: `matchbox`,
`signboard`, `calendar`). Its words are `CAMPAIGN` and `SEAL` in `copy.mjs`; a festival day is a
new `calendar` entry with its own dates.
`render-patra.ts` needs the repo briefly as an ES module (harfbuzzjs uses top-level await).

## The structure

**Campaign** "Snanify, Kartik 2026". Objective Sales, website, dataset 1070899835939869.
Budgets on the ad sets, so India cannot take the diaspora's money. Advantage+ creative
enhancements off for text, backgrounds and image expansion: Meta's generated words would not
be held to the two rules.

**Optimise for** CompleteRegistration (setup done) while purchases are under about 25 a week;
switch the event to Purchase once they pass it.

| Ad set | Budget | Who |
| --- | --- | --- |
| Diaspora 40+ | $15 a day | US, UK, Canada, Australia, New Zealand, Singapore, UAE, Qatar, Kuwait, Oman, Bahrain. 40 to 65+, a hard limit (original audience options). Interests, which Meta treats as suggestions: Bollywood movies, Cinema of India, Music of India, Hindi (languages), T-Series. No language limit |
| India, river states 40+ | $5 a day | Uttarakhand, Uttar Pradesh, Maharashtra, Madhya Pradesh, Karnataka, Delhi. 40 to 65+. Languages Hindi and English. No interests |

Each ad set carries three ads: "Video, Kartik" (English, `/snan`), "Video, Kartik, Hindi" (`/hi/snan`)
and "Static, Send the Ganga home" (4:5 in feeds, 9:16 in Stories and Reels). Meta does not allow its
languages option on an ad with several text variants, so Hindi is its own ad and Meta moves budget to
whichever performs. The India ads carry the ₹501 creative and copy. Every ad: URL parameters
`utm_source=meta&utm_medium=paid&utm_campaign=kartik26&utm_content={{ad.name}}`, call to action
"See details", multi-advertiser off, personalised destinations off, every Advantage+ creative
enhancement off, and Meta's suggested event (it reads "Oct 27" from the copy) unticked. It re-ticks
itself after any creative change: check it again after an edit.

The draft is unpublished. Two things block publishing: a verified phone number on the ad account,
and advertiser verification for Singapore (or drop Singapore from the diaspora set).

## The copy

### English, diaspora

Primary text (Meta rotates up to five):

1. Far from the Ganga this Kartik? Kartik snan runs 27 October to 24 November. Sit with the Ganga for three minutes each morning, wherever you live: today's flow at Har Ki Pauri, a breath with the river, your own sankalp. Then send the family a Sankalp Patra with their names on it. Eleven mornings for eleven.
2. Send the Ganga home. Three minutes each morning with the river. Then a Patra with your family's names, the tithi and the hour in IST, straight to the family WhatsApp.
3. Thousands of miles from Haridwar. Three minutes from the Ganga. Each morning: the river's flow today, a breath with it, your sankalp. Then a Sankalp Patra for the family group.
4. Send Maa the Ganga this Kartik. Your family's names beside today's river, on one sheet, ready for WhatsApp. Eleven mornings for eleven.
5. A daily snan, wherever you live. Three minutes with the Ganga. Your sankalp. A Patra for the family.

Headlines: Eleven mornings for eleven · Send the Ganga home · Kartik with the Ganga, from anywhere · Three minutes with the Ganga · Your family's names, by the Ganga

Description: Kartik snan, 27 Oct to 24 Nov

### English, India

The same, with "Eleven mornings for ₹501." in 1 and 4, and 3 left out (the distance is the diaspora's).

### Hindi

Primary text:

1. इस कार्तिक गंगा से दूर हैं? कार्तिक स्नान 27 अक्टूबर से 24 नवंबर तक है। हर सुबह तीन मिनट गंगा के साथ, आप जहाँ भी हों: हर की पौड़ी पर आज का प्रवाह, नदी के साथ साँस, आपका अपना संकल्प। फिर परिवार के नामों वाला संकल्प पत्र, सीधे परिवार के WhatsApp पर। ग्यारह सुबहें, ग्यारह में।
2. गंगा घर भेजिए। हर सुबह तीन मिनट नदी के साथ। फिर परिवार के नाम, तिथि और भारत का समय, एक पत्र पर, सीधे WhatsApp पर।
3. माँ को इस कार्तिक गंगा भेजिए। आज की नदी के साथ परिवार के नाम, एक पत्र पर। ग्यारह सुबहें, ग्यारह में।

Headlines: ग्यारह सुबहें, ग्यारह में · गंगा घर भेजिए · कार्तिक गंगा के साथ · तीन मिनट गंगा के साथ

Description: कार्तिक स्नान, 27 अक्टूबर से 24 नवंबर

India: "ग्यारह सुबहें ₹501 में।" in 1 and 3. A native reader checks the Hindi before it runs.

## What to watch

- Week one: cost per completed setup, and the drop from `begin_view` to `setup_done` in Vercel Analytics.
- India: checkout starts against purchases. A wide gap means Indian cards refusing an international charge; pause the ad set rather than raise it.
- After 7 days: the ad with the higher click-through keeps its place; the other is swapped for `static-kartik`.

## LOUD, the second Kartik set (15 October 2026)

The campaign layer turned all the way up, to stop a thumb: type that fills the frame, hard offsets
(a press slipping, never a soft shadow), starburst price seals, tilted labels, a diagonal sash. Same
two rules, same Meta rules; the only urgency is Kartik's real start date.

| File | What |
| --- | --- |
| `out/loud-signboard-{en,hi}-{diaspora,india}-{45,916}.png` | Truck art: hazard stripes round all four edges, GANGA SNAN in stacked capitals with hard offsets, a starburst price seal, a tilted black band, Start now, SNAN OK PLEASE between two diyas. The 9:16 carries the offer large |
| `out/loud-matchbox-…` | Full-bleed red: SEND THE GANGA HOME, the label tilted with a hard black offset and a "No. 11", a starburst price stamp, the box's brown side carrying Start now |
| `out/loud-calendar-…` | Kartik calendar art: the painted ghat with the sun turned up, a gold sash "Starts 27 October", KARTIK SNAN with a gold offset, Start now on a cream bar |

Re-render: `node ads/src/render-loud.mjs` (or one style: `signboard`, `matchbox`, `calendar`). Words:
`LOUD` (images) and `LOUD_TEXT` (Ads Manager) in `src/copy.mjs`; `{offer}` takes the market's line
from `OFFER`.

### Ads Manager copy, English

Primary text:

1. Kartik starts 27 October. Sit with the Ganga every morning of it, wherever you live. Three minutes: today's flow at Har Ki Pauri, a breath with the river, your own sankalp. Then the family gets a Sankalp Patra with their names on it. Eleven mornings for eleven. Start now.
2. Ganga snan. Three minutes. Every morning. Your first one can be today, and the sheet reaches the family WhatsApp before your chai.
3. Eleven mornings for eleven. Your first morning with the Ganga starts the moment you do.
4. Send the Ganga home this Kartik. Your family's names beside today's river, on one sheet, ready for WhatsApp. Start now.

Headlines: Start your Ganga snan now; Kartik starts 27 October; Eleven mornings for eleven; Send the Ganga home

Description: Kartik snan, 27 Oct to 24 Nov

India: "Eleven mornings for ₹501." in 1 and 3, and the headline "Eleven mornings for ₹501".

### Ads Manager copy, Hindi

1. कार्तिक 27 अक्टूबर से है। उसकी हर सुबह गंगा के साथ बैठिए, आप जहाँ भी हों। तीन मिनट: हर की पौड़ी पर आज का प्रवाह, नदी के साथ साँस, आपका अपना संकल्प। फिर परिवार को उनके नामों वाला संकल्प पत्र। ग्यारह सुबहें, ग्यारह में। अभी आरंभ कीजिए।
2. गंगा स्नान। तीन मिनट। हर सुबह। पहली सुबह आज ही हो सकती है, और पत्र चाय से पहले परिवार के WhatsApp पर।
3. इस कार्तिक गंगा घर भेजिए। आज की नदी के साथ परिवार के नाम, एक पत्र पर। अभी आरंभ कीजिए।

Headlines: अभी गंगा स्नान आरंभ कीजिए; कार्तिक 27 अक्टूबर से; ग्यारह सुबहें, ग्यारह में; गंगा घर भेजिए

Description: कार्तिक स्नान, 27 अक्टूबर से 24 नवंबर

India: "ग्यारह सुबहें ₹501 में।" in 1. A native reader checks the Hindi before it runs.

Suggested ads per ad set: one per style (Signboard, Matchbox, Kartik calendar), each with its 4:5
for Feed and 9:16 for Stories and Reels, English and Hindi as separate ads as before, the call to
action "Sign up" or "See details", landing on `/` (it now says Start your snan now).


## The daily posts, 17 October to 15 November 2026

`ads/social/`: thirty Facebook posts, one a day, in the campaign print (B1 calendar art, B2
matchbox, B4 signboard), half of them moving. `calendar.mjs` holds every word and card;
`social.html` is the template, with each moving part a function of time; `render.mjs` steps it
into `posts/<date>/video.mp4` (30 fps, 4:5, with `poster.png`) or `card.png`, beside
`post.txt`, the post as it goes up. `check.mjs` holds the words to the copy rules;
`make-doc.mjs` writes `docs/meta/facebook-calendar.md`, which the daily task publishes from.

## PLAIN, the third Kartik set (17 October 2026)

"Dumb is trump": a thumb that is not stopping to think gets the whole idea in three seconds. Do
a digital Ganga snan from home, then send it to the family. One idea per ad, solid yellow, black
type with the key words in red, one red Start now. No jokes to decode. What goes to the family is
the Sankalp Patra (names, river, date); the sankalp text stays private, so no line promises to
share it. The copy avoids the word WhatsApp, which may be what set off Meta's "WhatsApp number
required" error on 16 October.

| File | What |
| --- | --- |
| `out/plain-home-{en,hi}-{diaspora,india}-{45,916}.png` | DIGITAL GANGA SNAN. FROM HOME. 3 minutes on your phone. The real start screen in a phone |
| `out/plain-send-…` | DO YOUR SNAN. SEND IT TO THE FAMILY. The Patra arriving in a chat called Family (no app logo, no invented replies) |
| `out/plain-steps-…` | GANGA SNAN FROM HOME, then 1 Pick your river, 2 Sit 3 minutes, 3 Send to family |
| `out/video-kartik-…`, `upload/kartik-*` | The video recut with one literal caption per segment (Digital Ganga snan. / From home. / 3 minutes. / Make your sankalp. / Send it to the family.) and a plain end card |

Re-render: `node ads/src/render-plain.mjs` (images), `node ads/src/render-cards.mjs` (video
captions and end cards, through `plain.html`), then cut the videos as above. Words: `PLAIN`,
`PLAIN_TEXT` and `VIDEO` in `src/copy.mjs`.

### Ads Manager copy, English

1. Do a digital Ganga snan from home. 3 minutes on your phone. Then send it to the family. Start now.
2. Kartik snan from home. 3 minutes with the Ganga, then send it to the family group. Eleven mornings for eleven.
3. Ganga snan from home: pick your river, sit 3 minutes, send it to the family. Start now.

Headlines: Digital Ganga snan, from home; 3 minutes. Then send it home.; Start your snan now

Description: Kartik snan, 27 Oct to 24 Nov. India: "Eleven mornings for ₹501." in 2.

### Ads Manager copy, Hindi

1. घर से डिजिटल गंगा स्नान कीजिए। फ़ोन पर 3 मिनट। फिर परिवार को भेजिए। अभी शुरू कीजिए।
2. घर से कार्तिक स्नान। गंगा के साथ 3 मिनट, फिर परिवार के समूह में भेजिए। ग्यारह सुबहें, ग्यारह में।
3. घर से गंगा स्नान: नदी चुनिए, 3 मिनट बैठिए, परिवार को भेजिए। अभी शुरू कीजिए।

Headlines: घर से डिजिटल गंगा स्नान; 3 मिनट। फिर घर भेजिए।; अभी स्नान शुरू कीजिए

Description: कार्तिक स्नान, 27 अक्टूबर से 24 नवंबर. India: "ग्यारह सुबहें ₹501 में।" in 2. A native reader checks the Hindi.


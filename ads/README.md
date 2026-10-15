# Meta ads, Kartik 2026

The campaign, the copy and the creative for the first Meta ads. Written under the two rules in
`CLAUDE.md`: nothing claims a rite happened, nothing promises an outcome. Under Meta's own rules:
no sentence tells the reader who they are (religion, origin), and nothing is engagement bait.

## The files

| File | What |
| --- | --- |
| `out/static-home-{en,hi}-{diaspora,india}-{45,916}.png` | "Send the Ganga home": the Patra in a phone. 4:5 for Feed, 9:16 for Stories and Reels |
| `out/static-kartik-…` | "Kartik with the Ganga": the four-by-five sheet. A second static, held back for week two |
| `out/video-kartik-{en,hi}-{diaspora,india}.mp4` | The 9:16 video, cut from a real sitting recorded on an iPhone |
| `out/patra-*.png` | The specimen Patra, today's real figure, the Sharma family, 06:12 in New York |
| `src/*` | Everything that made them: `render-patra.ts`, `render-statics.mjs`, `render-cards.mjs`, `render-campaign.mjs`, `campaign.html`, `cut-video.sh`, `copy.mjs` |
| `out/campaign-{matchbox,signboard,calendar}-{en,hi}-{diaspora,india}-{45,916}.png` | The campaign layer in bazaar print (DESIGNSYSTEM.md, Campaigns): matchbox and signboard for the price story and scroll-stopping ads, calendar art for Kartik and the festival posts |

Re-render after a copy change: `node ads/src/render-statics.mjs && node ads/src/render-cards.mjs`.
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

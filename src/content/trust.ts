import type { Lang } from "@/lib/content";

/**
 * Copy for the trust layer: /ethics, /how-it-works, /faq.
 *
 * Every string exists in both locales. The `satisfies Record<Lang, typeof …En>`
 * on each export is deliberate, it makes a missing or renamed Hindi key a
 * compile error rather than a page that silently falls back to English.
 *
 * Sourced from docs/design/ethics.md §9 (whose EN and HI copy is normative) and
 * amended to honour the required fixes in that document's adversarial review:
 * bounded conscience refusal, officiant welfare, gotra made optional, the batch
 * privacy leak, the recompression failure of naive verification, the automated
 * safety check, third-party (living relative) data, and the qualification of the
 * "zero third-party scripts" absolute.
 *
 * The tracking copy names Vercel Web Analytics explicitly. It previously claimed
 * no analytics script ran anywhere, which was false the moment analytics shipped.
 * If analytics is ever removed, tighten this copy back; never loosen the copy to
 * cover a script that is not named on the page.
 *
 * PLACEHOLDER inventory, none of these may be presented as settled fact, and
 * each is stated as unsettled in the UI (see ethics §10 "What we have not
 * settled yet"):
 *   · ethics@snanify.com, the address must exist and be monitored before launch
 *   · ₹1,800 flat / 20% of segment gross, proposed officiant pay, not market-tested
 *   · the publication and revision dates of this page
 *   · the short film on /how-it-works
 *   · the sample rite used to test the verifier
 *   · panchang provider, ghat filming permissions, officiant names, review panel
 */

export const ETHICS_MAIL = "ethics@snanify.com";

/* ------------------------------------------------------------------ nav --- */

/* The trust pages carry the same four header links. `rivers` is deliberately
   absent here: it already exists as content[lang].nav.rivers, and one label in
   two places is one label that will eventually disagree with itself. */
const navEn = {
  how: "How it works",
  ethics: "Our position",
  faq: "Questions",
};

export const trustNav = { en: navEn, hi: {
  how: "कैसे काम करता है",
  ethics: "हमारा पक्ष",
  faq: "प्रश्न",
} } satisfies Record<Lang, typeof navEn>;

/* --------------------------------------------------------------- ethics --- */

const ethicsEn = {
  meta: {
    title: "Our position, what we can promise, and what we cannot · Snanify",
    description:
      "Snanify arranges a rite and proves it happened. It does not sell its fruit. The claims we will never make, how the proof works, how officiants are engaged and paid, and what happens to your name, your gotra and your sankalp.",
  },
  eyebrow: "Our position",
  title: "What we can promise, and what we cannot.",
  lede: "Snanify arranges a rite and proves it happened. It does not sell its fruit. This is the long version, and it is binding on us.",
  version:
    "Version 1. The date of publication is recorded on the day this page goes live, and every later revision is kept and dated beside it. This page is not edited silently.",
  tocLabel: "On this page",

  s1: {
    n: "01",
    id: "position",
    h: "The plain statement",
    body: [
      "We are not a temple, and we are not your purohit. We are a service that engages a qualified officiant to perform a snan-sankalp at a named ghat, at a named hour, in your name and your gotra, and then gives you proof that it happened.",
      "What that rite means is between you, your family, and your tradition.",
    ],
    pull: "We describe acts. We do not describe effects.",
  },

  s2: {
    n: "02",
    id: "precedent",
    h: "Where the tradition already goes with us",
    body: [
      "The sankalp is, by its own grammar, a naming. It fixes place, time, lineage and person. It has never required that the person be standing there. It has required that the person be named.",
      "Hindu ritual has always separated the one who sponsors a rite from the one who performs it. The yajaman offers; the purohit performs. That separation is not a workaround we found; it is how the tradition is built.",
      "The tirth purohits of Haridwar, Prayagraj, Gaya and Trimbakeshwar have kept family registers for generations, and have performed rites for families who could not travel. We do not claim their mantle and we are not their successors. We are saying only that a record of a rite kept for an absent family is a very old idea.",
      "Temples have accepted remote sponsorship for a long time, an archana booked from another city, a name and gotra handed across a counter, a puja sponsored by post. Live darshan has been streamed from large temples for more than twenty years.",
    ],
    coda: "None of this is new. The camera is new.",
  },

  s3: {
    n: "03",
    id: "limits",
    h: "Where we stop",
    body: [
      "Snan is an act of the body. We are not performing it on your body, and we will never say we are. What is performed is the sankalp, and the rite that follows it, by the officiant, in your name.",
      "We do not claim this is the same as standing in the river. It is not. The journey is part of the pilgrimage, and we cannot give you the journey. If you can go, go.",
      "We do not perform the obligatory rites of the life cycle. Not the funeral. Not the immersion of actual ashes. Not a shraddh where your own presence is prescribed. We offer tarpan in remembrance. That is a different and smaller thing, and we will keep saying so.",
      "Traditions disagree about whether a rite witnessed through a screen is witnessed at all. Some acharyas accept it and some do not. We take no side in that, and we will not quote the ones who agree with us as though the question were settled.",
      "And we make no claim about outcomes in your life. Not health. Not a visa. Not a marriage. Not a court case.",
    ],
  },

  s4: {
    n: "04",
    id: "never",
    h: "Claims we will never make",
    lede: "This list is binding on us, on anyone we pay, and on anyone who writes about us on our behalf. We will never state, imply, or allow a partner, an officiant, an email or an advertisement to state:",
    items: [
      "That your sins are washed away.",
      "That this grants moksha, mukti, or any measure of punya.",
      "That it is equal to bathing in the river yourself.",
      "That merit can be counted, multiplied, or accumulated in a plan. Our offerings differ in what we do for you, never in what a rite is worth. Twelve snans are twelve rites, not more merit per rite.",
      "That your ancestors are restless, unfulfilled or waiting, or that anything will befall your family if you do not book.",
      "That any dosha exists in your chart, or that we can find one or remove one.",
      "That this produces any outcome in your life, health, a child, a visa, a marriage, a case, an examination, work, money.",
      "That it replaces a rite your own tradition asks you to perform yourself.",
      "That any acharya, math, akhara, temple trust or ghat authority endorses us, unless they have signed a dated letter that we publish, and that they can withdraw whenever they wish.",
      "That the water at any ghat is clean, safe to drink, or medicinal.",
      "That your body has been purified.",
      "That a muhurat is the last one, or that it will not return in your lifetime. Astronomy belongs in a calendar; it will never appear inside a payment page.",
      "That a rite happened when it did not.",
      "That footage made elsewhere, reused, or generated is your rite. We do not use generative video or synthetic voice, not for a rite, not for marketing, not for illustration, not as background.",
      "That a person who has died received anything, or was affected by anything.",
      "Any use of a person who has died in an advertisement, a case study, or a testimonial.",
      "Any sentence built on a threat, that time is running out, that something will come to your family, that you will regret not having booked.",
      "We will never quote your sankalp in our marketing, not named, not anonymised, not paraphrased.",
      "We will never sell, share, license, or build a product out of the names, gotras and intentions people entrust to us.",
    ],
    report:
      "If you ever see us make one of these claims, write to us. We will take it down, say so publicly, and keep the correction on the record with its date. We publish the corrections, including the ones that were embarrassing.",
  },

  s5: {
    n: "05",
    id: "proof",
    h: "How you know it happened",
    lede: "Five things, in order. None of them requires you to trust us.",
    steps: [
      {
        t: "Before the rite, the sankalp seal",
        d: "The moment you book, we publish a fingerprint of your sankalp to a public record: a hash, sixteen characters of which you are shown at once. Your name is not in it, and it cannot be turned back into your words. It proves your intention existed before the rite and was not written afterwards.",
      },
      {
        t: "At the ghat, the slate",
        d: "The officiant holds a card to the camera showing your rite code, the date, the ghat, and that day's public anchor, a number drawn from a public randomness beacon that could not have existed the day before. No recording made earlier can display it, and anyone can look the number up at its source.",
      },
      {
        t: "The rite, one continuous take",
        d: "No cuts. Each name and each gotra spoken aloud, separately, with at least forty-five seconds of recitation for every named sankalp, so a segment carrying eleven sankalps runs about nine minutes, not ninety seconds. A machine checks the take for cuts, for splices in the audio, and for a slate that matches the booking. A segment that fails is not published. It is performed again.",
      },
      {
        t: "Afterwards, the ledger",
        d: "The fingerprint of the recording goes into a public, append-only record together with the ghat, the officiant's identifier, the times, and what actually happened, performed, degraded, or not performed. It never contains a name, a gotra, or a sankalp. That is how the record can be permanent while your data is not.",
      },
      {
        t: "Anyone can check it",
        d: "Your uncle in Kanpur, or a stranger on the internet, can enter the rite code, drag the video file in, and be told whether it is the file we recorded. The check runs in their own browser. The file never leaves their computer. They never have to trust us, and neither do you.",
      },
    ],
    caveatsH: "Where this proof is weak, in our own words",
    caveats: [
      {
        t: "A forwarded file will not match",
        d: "If the video reaches you through WhatsApp or Telegram it has been recompressed, and the check will say it does not match. That is the messenger, not a forgery. Download the original from your rite page. We publish a separate fingerprint for every version we hand you, and we keep a sample rite so you can try the check before you ever need it.",
      },
      {
        t: "Our own signatures are the weakest link",
        d: "Location can be faked and a device signature can be defeated by someone on the inside. That is exactly why the slate, the daily anchor and the live stream carry more weight than anything we sign ourselves. We would rather tell you where our proof is thin than let you find out.",
      },
      {
        t: "The record proves a file, not a feeling",
        d: "It proves that a recording of a particular rite existed at a particular time and has not been altered since. It proves nothing about sincerity. No technology proves sincerity, and we are not going to pretend otherwise.",
      },
    ],
    densityH: "Who else will hear your name",
    density: [
      "A shared segment may carry up to eleven sankalps, and every family in that segment would otherwise hear every other family's names, gotras and ancestors. That is not a marketing problem; it is other people's data.",
      "So what we hand you is your own excerpt, opening a few seconds before your name is spoken, containing your names and no one else's. The full segment exists, and it is released only if every family in it agrees. Your sankalp is offered silently unless you ask for it aloud, and if you do ask, the checkout says in one sentence who will hear it.",
      "The public record still says how many sankalps shared your segment. Your rite is not private unless you buy a private rite, and we will not imply otherwise to sell you a cheaper one.",
    ],
  },

  s6: {
    n: "06",
    id: "officiants",
    h: "The officiants",
    body: [
      "Every officiant is engaged directly by Snanify, on a written contract, in his own language, at a length he can read, with a signed copy in his hand. He is not a gig worker and this is not a marketplace.",
      "On each officiant's page we publish what we verified, and what we did not. There is no certifying board for ghat purohits, so we will not invent a badge. We will tell you exactly what we checked, and exactly what we could not.",
    ],
    payH: "What he is paid",
    payNote:
      "The formula is the commitment. The figures below are proposed and have not yet been tested against what purohits at these ghats actually earn; they will be fixed and published for at least twelve months before the first rite, and the officiant share is published every quarter as an actual computed percentage.",
    pay: [
      { k: "Each rite segment", v: "the greater of ₹1,800 or a fifth of what that segment earns" },
      { k: "A private rite", v: "₹4,000" },
      { k: "Paid", v: "within seven days, by bank transfer, with no deduction for a stream that failed" },
      { k: "Dakshina", v: "all of it reaches him, none of it reaches us" },
    ],
    refusalH: "Refusal, and its bounds",
    refusal: [
      "He may decline any sankalp he does not wish to speak, on grounds of the rite itself, and he is paid for the segment anyway. Consent that has been purchased is not consent, and a priest who cannot say no is not an officiant.",
      "He may not decline you for who you are. Not your caste, your religion, your gender, your marital status, your sexuality, the name you carry, or the fact that your family keeps no gotra. Every refusal is logged with a reason and audited, and you are never told that a priest declined you, we find another officiant at once, at no cost to you, because that is our failure and not yours.",
    ],
    welfareH: "His safety",
    welfare: [
      "He decides whether to enter the water. Never us, and never you. If he judges it unsafe, the rite proceeds as jal-arpan from the steps, his pay is unchanged, and the record says plainly what happened.",
      "There is a published cap on how many times he may immerse in a day and in a week, set with the officiants themselves rather than by us alone, and a published list of conditions under which nobody enters, flood, strong current, darkness, a water-quality advisory, illness.",
      "Accident and health cover is ours to provide, not his to buy.",
      "In the public record he appears as an opaque identifier, not a name. A permanent, public log of one man's working hours and earnings is a target, and he is the least powerful person in this arrangement. His name appears on your patra and on his own profile, and he may decline a public profile without losing work.",
    ],
  },

  s7: {
    n: "07",
    id: "failure",
    h: "If something goes wrong",
    lede: "This is a table, not a discretion. You do not have to argue with anyone, and you never have to telephone us.",
    rows: [
      {
        w: "The stream dropped, the rite was recorded",
        t: "You have the recording within six hours, and a quarter of the fee back if you want it. One click, no questions. The recording, not the stream, is the thing we owe you.",
      },
      {
        w: "The rite did not happen",
        t: "We tell you before you ask. Then you choose: performed again at the next equivalent muhurat at no cost, or the whole fee back.",
      },
      {
        w: "The ghat was closed, or the water unsafe",
        t: "We tell you before the window, and offer another ghat, another river, another muhurat, or your money back. If the officiant makes the offering from the steps instead, the record says so. We never quietly substitute one river for another.",
      },
      {
        w: "The officiant could not attend",
        t: "We name the substitute before the rite, not after. You may decline him.",
      },
      {
        w: "Your name or gotra was said wrongly",
        t: "Tell us and it is recited again, free, once, without an argument. You can record your own voice saying the names when you book, so that he hears them from you first.",
      },
      {
        w: "You change your mind before the rite",
        t: "The whole fee back up to twenty-four hours before the window; half within it, because the officiant is by then scheduled and paid.",
      },
      {
        w: "You are unhappy afterwards",
        t: "We refund the fee, within fourteen days, without asking why. We are refunding what you paid us for arranging, performing and recording the rite. We are not undoing the rite: it happened, the officiant is paid in full, and the record stays. A rite is not a returnable good, and we will not pretend it is one.",
      },
      {
        w: "Someone you named has died before the rite",
        t: "The whole fee back, or, only if you ask us, the same rite performed as a tarpan in remembrance, at no charge. We will not offer you that. For ninety days you hear nothing from us that your booking does not require.",
      },
    ],
    note: "We publish our numbers on the fifth of every month, from the first rite onward: scheduled, performed, degraded and why, not performed and why, refunded, how long the patra took, what share of revenue reached the officiants, complaints received and upheld, and government demands received. Including the bad months. Small honest numbers now are worth more than large vague ones later.",
  },

  s8: {
    n: "08",
    id: "data",
    h: "Your name, your gotra, your intention",
    body: [
      "A gotra is lineage. A sankalp may hold an illness, a death, a fear. This is not ordinary customer data, and we do not treat it as such, not in law, where it is special-category religious data, and not in practice.",
    ],
    gotraH: "Gotra is optional here",
    gotra: [
      "Many families do not keep a gotra, and a form that insists on one is a form that sorts people by caste. Ours does not insist. Leave it blank and the sankalp uses the customary Kashyapa gotra, or your family's own convention if you tell us what it is.",
      "In a household booking each name may carry its own gotra, because households are not uniform, a woman who married in, an adopted child, an inter-caste marriage. One gotra for six names would produce a sankalp that is simply wrong for most families.",
    ],
    sankalpH: "The sankalp text",
    sankalp: [
      "By default the officiant does not read it aloud. He states that the rite is offered for the intention you hold. He reads it aloud only if you ask, and the box that asks is never ticked for you.",
      "If you do ask for it aloud, it becomes part of a permanent recording, and the ninety-day deletion below cannot reach it. We say that on the checkbox itself, and we offer to delete the recording with it.",
      "Nobody at Snanify browses sankalps. Reading one requires two approvals and a written reason, it is logged permanently, and you are emailed within a day telling you that it was read, by whom, and why. That costs us something, which is why it is worth believing.",
      "One automated safety check runs over the text. No person sees it as a result of that check. If the text suggests someone may be in danger, you receive a message with places you can call, written so that nothing in it implies a person read your words, because none did. We will not perform a sankalp intended to harm a named person, and that refusal is one of the very few reasons a human would ever be shown the text.",
      "We never train anything on it. We never advertise from it. We never quote it, and we never turn it into a testimonial.",
    ],
    othersH: "Names that are not yours",
    others: [
      "When you name a living relative you are handing us their information, not your own. We ask you to confirm they would not object. We will remove any living person's details at that person's own request, without asking your permission first and without telling you who asked. Naming a child requires you to say that you are their guardian.",
    ],
    retentionH: "What is kept, and for how long",
    retention: [
      { k: "Your account", v: "as long as you keep it; invoices only where tax law requires" },
      { k: "Names, gotra, relationships", v: "24 months by default, 3 months or indefinite if you prefer" },
      { k: "Sankalp text", v: "90 days after the rite by default, or 24 hours, or kept" },
      { k: "Recordings", v: "kept until you delete them" },
      { k: "The public record", v: "permanent, and by construction contains no name, gotra or sankalp" },
    ],
    eraseH: "Erasure",
    erase: [
      "One button deletes everything, across copies and backups, within seven days. It works by destroying the key your rite was encrypted with, which is why it holds even where the storage itself cannot be overwritten. The fingerprint stays in the public record, so the copy you downloaded still verifies afterwards: deleting removes our ability to hold your rite, not your ability to prove it.",
      "The confirmation lists what was deleted, what was kept, and why, the invoices the law requires, and the anonymous ledger entry.",
    ],
    trackingH: "What runs on this site",
    tracking: [
      "No advertising script and no session-replay script runs anywhere on this site, ever. Nothing records the screen where you type your sankalp.",
      "One analytics script counts page views: Vercel Web Analytics. It sets no cookies, follows you to no other site, and never sees the contents of a form. We would rather name it than claim a zero we do not hold.",
      "The only other third-party script in the product is the payment processor's, on the payment step alone, named on that page.",
      "From the first rite this page will carry a plain count of the secret demands for data we have received. If that sentence is ever removed rather than updated, read the removal.",
    ],
  },

  s9: {
    n: "09",
    id: "never-do",
    h: "Things we will not do to you",
    items: [
      "No countdown on a rite.",
      "No “two places left” unless two places are actually left.",
      "No message on the anniversary of a death unless you asked us for one, and one tap in that message stops it forever.",
      "No streaks, no badges, no levels, no “you have not booked since March”.",
      "No advertising placed against grief, funerals, obituaries or illness.",
      "No price that rises because a day is auspicious, and none that changes because of who you appear to be.",
      "No box ticked for you, not an add-on, not dakshina, not a renewal, not a mailing list.",
      "Cancelling costs no more clicks than starting, with no interstitial and no offer.",
      "One click to unsubscribe, honoured at once, with no “how about fewer emails” step.",
      "No quiz that tells you what is wrong with your chart.",
      "No confirmation dialogue that asks whether you are sure, and no invoking of anyone you have lost in order to keep your money.",
      "No AI writing your sankalp, and no suggestions in that box, suggestions steer people toward grief.",
      "Never a word against making the journey yourself.",
    ],
  },

  s10: {
    n: "10",
    id: "unsettled",
    h: "What we have not settled yet",
    lede: "The same block we put on every officiant's page, what was verified, and what was not, applied to ourselves. Weigh what follows accordingly.",
    rows: [
      {
        q: "Permission to film at the ghats",
        a: "Every one of these sites is governed by someone: a sabha, a temple trust, a mela authority, a municipality. No ghat opens until we hold written permission to film there, and the page for that water will name who granted it.",
      },
      {
        q: "The people at the ghat who are not us",
        a: "These are public bathing places. The camera stays tight on the officiant and the water and never pans across bathers. Anyone recognisable who has not agreed to be filmed is removed before publication, and there is a takedown address on every page. A public place is not consent.",
      },
      {
        q: "The panchang",
        a: "We have not yet named a source. Until we do, no exact time appears anywhere on this site, only the occasion. When times appear they will carry the method, the ayanamsa and the coordinates of the ghat itself, and where sources disagree we will show the range rather than a false precision.",
      },
      {
        q: "The six waters",
        a: "We are auditing all six for who governs them, whether daily rites can honestly be performed and filmed there, and what the season does to access. Where the honest answer is no, that water does not open, and we will say why rather than quietly drop it.",
      },
      {
        q: "The officiants",
        a: "No priest's name, face or history appears on this site until he has signed a contract and agreed in writing to be named. There are no officiants published today, and no placeholder person will ever stand in for one.",
      },
      {
        q: "What we pay",
        a: "Proposed, not yet tested against what purohits at these ghats actually earn. We also have not yet settled who owns the capture device, who bears the data cost, what happens to pay during a monsoon closure, or how he is classified in law. We will publish the answers rather than describe them vaguely.",
      },
      {
        q: "Who reviews the rite itself",
        a: "We want three external advisors, publicly named, paid an honorarium, and free to disagree with us in public. We do not have them. Until we do, the judgement that an officiant's vidhi is sound is ours alone, and that is a weaker thing.",
      },
      {
        q: "Money, tax and jurisdiction",
        a: "Where the company sits, how this is taxed, and which law governs your data are real questions with real answers that we are still taking from counsel. Your data is meant to sit in India, with a European copy for those who ask. Until that is settled, this sentence is the honest state of it.",
      },
    ],
  },

  s11: {
    n: "11",
    id: "ask",
    h: "Ask someone whose judgement you trust",
    body: [
      "Before you book, ask someone whose judgement you trust in these matters, your own purohit, your family's acharya, your elders. If they tell you this is not the right thing for you, they are right, and we are not offended.",
      "And if you think we have got any of this wrong, the shastra, the price, the proof, write to us. We publish objections made in good faith and what we did about them, including the ones we decided not to act on, and why.",
    ],
    mailLabel: "Write to us",
  },
};

export const ethicsContent = { en: ethicsEn, hi: {
  meta: {
    title: "हमारा पक्ष, हम क्या वचन दे सकते हैं, और क्या नहीं · स्नानिफ़ाई",
    description:
      "स्नानिफ़ाई अनुष्ठान की व्यवस्था करती है और उसका प्रमाण देती है। उसका फल नहीं बेचती। जो दावे हम कभी नहीं करेंगे, प्रमाण कैसे काम करता है, पुरोहितों से हमारा अनुबंध और भुगतान, और आपके नाम, गोत्र तथा संकल्प का क्या होता है।",
  },
  eyebrow: "हमारा पक्ष",
  title: "हम क्या वचन दे सकते हैं, और क्या नहीं।",
  lede: "स्नानिफ़ाई अनुष्ठान की व्यवस्था करती है और उसका प्रमाण देती है। उसका फल नहीं बेचती। यह विस्तृत रूप है, और हम इससे बँधे हैं।",
  version:
    "संस्करण १। प्रकाशन की तिथि उसी दिन दर्ज होती है जिस दिन यह पृष्ठ सार्वजनिक होता है, और हर बाद का संशोधन तिथि सहित साथ रखा जाता है। यह पृष्ठ चुपचाप नहीं बदला जाता।",
  tocLabel: "इस पृष्ठ पर",

  s1: {
    n: "०१",
    id: "position",
    h: "सीधी बात",
    body: [
      "हम न मंदिर हैं, न आपके पुरोहित। हम एक सेवा हैं जो योग्य पुरोहित द्वारा, निर्दिष्ट घाट पर, निर्दिष्ट घड़ी में, आपके नाम और आपके गोत्र से स्नान-संकल्प संपन्न कराती है, और फिर आपको इसका प्रमाण देती है।",
      "उस अनुष्ठान का अर्थ आपके, आपके परिवार और आपकी परंपरा के बीच है।",
    ],
    pull: "हम कर्म का वर्णन करते हैं। फल का नहीं।",
  },

  s2: {
    n: "०२",
    id: "precedent",
    h: "जहाँ परंपरा हमारे साथ चलती है",
    body: [
      "संकल्प अपने स्वरूप में ही एक नामकरण है। वह देश, काल, गोत्र और व्यक्ति को निश्चित करता है। उसने कभी यह नहीं माँगा कि व्यक्ति वहीं खड़ा हो। उसने यह माँगा कि व्यक्ति का नाम लिया जाए।",
      "कर्मकांड में यजमान और पुरोहित सदा अलग रहे हैं। यजमान अर्पित करता है; पुरोहित संपन्न कराता है। यह विभाजन हमारी खोजी हुई कोई गली नहीं, परंपरा इसी ढाँचे पर बनी है।",
      "हरिद्वार, प्रयागराज, गया और त्र्यंबकेश्वर के तीर्थ पुरोहित पीढ़ियों से वंशावली बहियाँ रखते आए हैं, और उन परिवारों के लिए अनुष्ठान करते रहे हैं जो आ न सके। हम उनकी विरासत का दावा नहीं करते और न उनके उत्तराधिकारी हैं। हम केवल इतना कहते हैं कि अनुपस्थित परिवार के लिए रखा गया अनुष्ठान का अभिलेख बहुत पुराना विचार है।",
      "मंदिर बहुत समय से दूर से की गई अर्चना स्वीकार करते हैं, दूसरे नगर से बुक की गई सेवा, काउंटर पर दिया गया नाम और गोत्र, डाक से प्रायोजित पूजा। बड़े मंदिरों से सजीव दर्शन बीस वर्षों से अधिक समय से प्रसारित हो रहा है।",
    ],
    coda: "इसमें कुछ नया नहीं। नया केवल कैमरा है।",
  },

  s3: {
    n: "०३",
    id: "limits",
    h: "जहाँ हम रुक जाते हैं",
    body: [
      "स्नान देह का कर्म है। हम उसे आपकी देह पर नहीं कर रहे, और कभी ऐसा कहेंगे भी नहीं। जो संपन्न होता है वह संकल्प है, और उसके पश्चात का अनुष्ठान, पुरोहित द्वारा, आपके नाम से।",
      "हम यह नहीं कहते कि यह स्वयं नदी में खड़े होने के समान है। नहीं है। यात्रा भी तीर्थ का अंग है, और यात्रा हम आपको नहीं दे सकते। यदि आप जा सकते हैं, अवश्य जाइए।",
      "हम जीवन के अनिवार्य संस्कार नहीं करते। न अंत्येष्टि। न अस्थि-विसर्जन। न वह श्राद्ध जहाँ आपकी अपनी उपस्थिति विहित है। हम स्मरण-तर्पण अर्पित करते हैं। वह भिन्न और छोटी वस्तु है, और हम यह कहते रहेंगे।",
      "पर्दे के माध्यम से देखा गया अनुष्ठान वस्तुतः देखा गया माना जाए या नहीं, इस पर परंपराओं में मतभेद है। कुछ आचार्य स्वीकार करते हैं, कुछ नहीं। हम इसमें कोई पक्ष नहीं लेते, और जो हमसे सहमत हैं केवल उन्हीं को ऐसे उद्धृत नहीं करेंगे मानो प्रश्न सुलझ गया हो।",
      "और आपके जीवन के परिणामों पर हम कोई दावा नहीं करते। न स्वास्थ्य। न वीज़ा। न विवाह। न मुक़दमा।",
    ],
  },

  s4: {
    n: "०४",
    id: "never",
    h: "जो दावे हम कभी नहीं करेंगे",
    lede: "यह सूची हम पर बाध्यकारी है, हम पर, हमारे हर सहयोगी पर, और हमारी ओर से लिखने वाले हर व्यक्ति पर। हम कभी यह न कहेंगे, न संकेत करेंगे, न किसी साझेदार, पुरोहित, ईमेल या विज्ञापन को कहने देंगे:",
    items: [
      "कि आपके पाप धुल गए।",
      "कि इससे मोक्ष या मुक्ति मिलती है, या पुण्य की कोई माप।",
      "कि यह स्वयं नदी में स्नान करने के बराबर है।",
      "कि पुण्य गिना, गुणा या किसी योजना में संचित किया जा सकता है। हमारे अर्पण सेवा में भिन्न हैं, अनुष्ठान के मूल्य में कभी नहीं। बारह स्नान बारह अनुष्ठान हैं, प्रति अनुष्ठान अधिक पुण्य नहीं।",
      "कि आपके पूर्वज अतृप्त हैं, भटक रहे हैं या प्रतीक्षा में हैं, या यह कि न बुक करने से आपके परिवार पर कुछ बीतेगा।",
      "कि आपकी कुंडली में कोई दोष है, या हम उसे खोज या दूर कर सकते हैं।",
      "कि इससे आपके जीवन में कोई परिणाम आता है, स्वास्थ्य, संतान, वीज़ा, विवाह, मुक़दमा, परीक्षा, नौकरी या धन।",
      "कि यह उस विधि का स्थान ले लेता है जिसे आपकी परंपरा स्वयं करने को कहती है।",
      "कि कोई आचार्य, मठ, अखाड़ा, मंदिर न्यास या घाट संस्था हमारा समर्थन करती है, जब तक उनका तिथि-अंकित हस्ताक्षरित पत्र हम प्रकाशित न करें, जिसे वे जब चाहें वापस ले सकें।",
      "कि किसी घाट का जल स्वच्छ, पीने योग्य या औषधीय है।",
      "कि आपकी देह शुद्ध हो गई।",
      "कि कोई मुहूर्त अंतिम है, या आपके जीवन में फिर नहीं आएगा। खगोल का स्थान पंचांग है; भुगतान के पृष्ठ पर वह कभी नहीं आएगा।",
      "कि कोई अनुष्ठान हुआ, जब वह हुआ ही नहीं।",
      "कि कहीं और बना, पुनः प्रयुक्त या कृत्रिम रूप से रचा गया दृश्य आपका अनुष्ठान है। हम न AI से बने दृश्य प्रयोग करते हैं, न कृत्रिम स्वर, न अनुष्ठान में, न विज्ञापन में, न उदाहरण के लिए, न पृष्ठभूमि में।",
      "कि किसी दिवंगत व्यक्ति को कुछ प्राप्त हुआ, या उन पर कुछ प्रभाव पड़ा।",
      "किसी दिवंगत व्यक्ति का उपयोग विज्ञापन, उदाहरण या प्रशंसापत्र में।",
      "कोई भी वाक्य जो भय पर टिका हो, कि समय बीता जा रहा है, कि आपके घर पर कुछ आ पड़ेगा, कि न करने का पछतावा रहेगा।",
      "आपका संकल्प हम अपने विज्ञापन में कभी उद्धृत नहीं करेंगे, न नाम के साथ, न अनाम, न बदले हुए शब्दों में।",
      "जो नाम, गोत्र और संकल्प लोग हमें सौंपते हैं, उन्हें हम न बेचेंगे, न साझा करेंगे, न उनसे कोई उत्पाद बनाएँगे।",
    ],
    report:
      "यदि कभी हमें इनमें से कोई दावा करते देखें, हमें लिखिए। हम उसे हटाएँगे, सार्वजनिक रूप से स्वीकार करेंगे, और सुधार को तिथि सहित अभिलेख में रखेंगे। सुधार हम प्रकाशित करते हैं, वे भी जो हमारे लिए असहज थे।",
  },

  s5: {
    n: "०५",
    id: "proof",
    h: "आप कैसे जानेंगे कि यह हुआ",
    lede: "क्रम से पाँच बातें। इनमें से किसी के लिए हम पर विश्वास करना आवश्यक नहीं।",
    steps: [
      {
        t: "अनुष्ठान से पहले, संकल्प चिह्न",
        d: "बुकिंग के क्षण ही हम आपके संकल्प की एक छाप सार्वजनिक अभिलेख में प्रकाशित कर देते हैं, जिसके सोलह अक्षर आपको तुरंत दिखते हैं। उसमें आपका नाम नहीं होता, और उसे वापस आपके शब्दों में बदला नहीं जा सकता। वह सिद्ध करती है कि आपका संकल्प अनुष्ठान से पहले था, बाद में गढ़ा नहीं गया।",
      },
      {
        t: "घाट पर, पट्टिका",
        d: "पुरोहित कैमरे के सामने एक पट्टिका दिखाते हैं जिस पर आपका अनुष्ठान कोड, तिथि, घाट और उस दिन का सार्वजनिक अंक होता है, एक ऐसा अंक जो एक दिन पहले अस्तित्व में नहीं था। पहले बनाई गई कोई रिकॉर्डिंग उसे नहीं दिखा सकती, और उसे कोई भी उसके मूल स्रोत पर जाँच सकता है।",
      },
      {
        t: "अनुष्ठान, एक अखंड दृश्य",
        d: "बिना कट। हर नाम और हर गोत्र अलग-अलग, स्पष्ट स्वर में, और प्रत्येक नामित संकल्प के लिए कम से कम पैंतालीस सेकंड का पाठ, इसलिए ग्यारह संकल्पों वाला खंड लगभग नौ मिनट का होता है, नब्बे सेकंड का नहीं। यंत्र स्वयं जाँचता है कि कहीं कट तो नहीं, ध्वनि में जोड़ तो नहीं, और पट्टिका बुकिंग से मेल खाती है या नहीं। जो खंड जाँच में विफल हो, वह प्रकाशित नहीं होता। वह दोबारा किया जाता है।",
      },
      {
        t: "उसके बाद, सार्वजनिक अभिलेख",
        d: "रिकॉर्डिंग की छाप घाट, पुरोहित के पहचान-अंक, समयों और वास्तव में जो हुआ, संपन्न, बाधित, या नहीं हुआ, के साथ एक सार्वजनिक, केवल-जुड़ने वाले अभिलेख में जाती है। उसमें कभी कोई नाम, गोत्र या संकल्प नहीं होता। इसीलिए अभिलेख स्थायी रह सकता है, जबकि आपकी सूचना नहीं।",
      },
      {
        t: "इसे कोई भी जाँच सकता है",
        d: "कानपुर में बैठे आपके चाचा, या इंटरनेट पर कोई अपरिचित, अनुष्ठान कोड डालकर और वीडियो फ़ाइल खींचकर जान सकते हैं कि यह वही फ़ाइल है या नहीं। जाँच उनके अपने ब्राउज़र में चलती है। फ़ाइल उनके कंप्यूटर से बाहर नहीं जाती। उन्हें हम पर विश्वास करने की आवश्यकता नहीं, और आपको भी नहीं।",
      },
    ],
    caveatsH: "यह प्रमाण कहाँ दुर्बल है, हमारे ही शब्दों में",
    caveats: [
      {
        t: "आगे भेजी गई फ़ाइल मेल नहीं खाएगी",
        d: "यदि वीडियो आप तक WhatsApp या Telegram से पहुँचा है, तो वह दबाकर छोटा किया जा चुका है और जाँच कहेगी कि मेल नहीं खाता। यह संदेशवाहक का प्रभाव है, कोई जालसाज़ी नहीं। मूल फ़ाइल अपने अनुष्ठान पृष्ठ से उतारिए। हम आपको दी गई हर प्रति की अलग छाप प्रकाशित करते हैं, और एक नमूना अनुष्ठान रखते हैं ताकि आवश्यकता पड़ने से पहले ही आप जाँच आज़मा सकें।",
      },
      {
        t: "सबसे कमज़ोर कड़ी हमारे अपने हस्ताक्षर हैं",
        d: "स्थान की जानकारी छली जा सकती है, और भीतर का कोई व्यक्ति उपकरण-हस्ताक्षर को भी हरा सकता है। इसीलिए पट्टिका, दैनिक सार्वजनिक अंक और सजीव प्रसारण हमारे अपने हस्ताक्षरों से अधिक भार रखते हैं। हम चाहेंगे कि अपनी दुर्बलता स्वयं बताएँ, न कि आप उसे खोजें।",
      },
      {
        t: "अभिलेख फ़ाइल सिद्ध करता है, भाव नहीं",
        d: "वह सिद्ध करता है कि एक निश्चित अनुष्ठान की रिकॉर्डिंग एक निश्चित समय पर थी और तब से उसमें फेरबदल नहीं हुआ। श्रद्धा के विषय में वह कुछ सिद्ध नहीं करता। श्रद्धा को कोई तकनीक सिद्ध नहीं करती, और हम इसका दिखावा नहीं करेंगे।",
      },
    ],
    densityH: "आपका नाम और कौन सुनेगा",
    density: [
      "एक साझा खंड में ग्यारह संकल्प तक हो सकते हैं, और अन्यथा उस खंड का हर परिवार शेष सब परिवारों के नाम, गोत्र और पूर्वज सुन लेता। यह विपणन की समस्या नहीं, यह दूसरों की निजी सूचना है।",
      "इसलिए हम आपको आपका अपना अंश देते हैं, जो आपका नाम बोले जाने से कुछ सेकंड पहले आरंभ होता है और जिसमें केवल आपके नाम हैं, किसी और के नहीं। पूरा खंड रहता है, पर वह तभी दिया जाता है जब उसमें सम्मिलित हर परिवार सहमत हो। आपका संकल्प मौन रूप से अर्पित होता है, जब तक आप ऊँचे स्वर में पढ़ने को न कहें, और यदि कहें, तो भुगतान से पहले एक वाक्य में लिखा रहता है कि उसे कौन सुनेगा।",
      "सार्वजनिक अभिलेख फिर भी बताता है कि आपके खंड में कितने संकल्प थे। आपका अनुष्ठान तब तक निजी नहीं, जब तक आप निजी अनुष्ठान न लें, और सस्ता विकल्प बेचने के लिए हम इसका उलटा संकेत नहीं देंगे।",
    ],
  },

  s6: {
    n: "०६",
    id: "officiants",
    h: "पुरोहित",
    body: [
      "हर पुरोहित सीधे स्नानिफ़ाई से जुड़ते हैं, लिखित अनुबंध पर, उनकी अपनी भाषा में, और इतना छोटा कि वे उसे पूरा पढ़ सकें; हस्ताक्षरित प्रति उनके हाथ में रहती है। वे दिहाड़ी कर्मी नहीं हैं, और यह कोई मंडी नहीं है।",
      "हर पुरोहित के पृष्ठ पर हम बताते हैं कि हमने क्या सत्यापित किया, और क्या नहीं। घाट के पुरोहितों के लिए कोई प्रमाणन संस्था नहीं है, इसलिए हम कोई मुहर गढ़ेंगे नहीं। हम ठीक-ठीक बताएँगे कि हमने क्या जाँचा, और क्या नहीं जाँच सके।",
    ],
    payH: "उन्हें क्या मिलता है",
    payNote:
      "सूत्र हमारा वचन है। नीचे दिए अंक प्रस्तावित हैं और अभी इस कसौटी पर नहीं कसे गए कि इन घाटों के पुरोहित वास्तव में कितना कमाते हैं; पहले अनुष्ठान से पहले इन्हें कम से कम बारह महीनों के लिए निश्चित करके प्रकाशित किया जाएगा, और पुरोहितों तक पहुँचा हिस्सा हर तिमाही वास्तविक प्रतिशत के रूप में प्रकाशित होता है।",
    pay: [
      { k: "प्रत्येक अनुष्ठान खंड", v: "₹1,800 या उस खंड की आय का पाँचवाँ भाग, जो अधिक हो" },
      { k: "निजी अनुष्ठान", v: "₹4,000" },
      { k: "भुगतान", v: "सात दिन के भीतर, बैंक से; प्रसारण टूटने पर कोई कटौती नहीं" },
      { k: "दक्षिणा", v: "पूरी उन्हीं तक जाती है, हम तक कुछ नहीं" },
    ],
    refusalH: "मना करने का अधिकार, और उसकी सीमा",
    refusal: [
      "वे किसी भी संकल्प को बोलने से मना कर सकते हैं, अनुष्ठान के आधार पर, और भुगतान फिर भी होता है। ख़रीदी हुई सहमति सहमति नहीं होती, और जो पुरोहित मना न कर सके वह पुरोहित नहीं।",
      "पर वे आपको इसलिए मना नहीं कर सकते कि आप कौन हैं। न जाति, न धर्म, न लिंग, न वैवाहिक स्थिति, न आपका यौन रुझान, न आपका नाम, न यह कि आपका परिवार गोत्र नहीं मानता। हर इनकार कारण सहित दर्ज और लेखा-परीक्षित होता है, और आपको कभी यह नहीं बताया जाता कि किसी पुरोहित ने मना किया, हम तुरंत, बिना अतिरिक्त शुल्क, दूसरे पुरोहित की व्यवस्था करते हैं, क्योंकि यह हमारी चूक है, आपकी नहीं।",
    ],
    welfareH: "उनकी सुरक्षा",
    welfare: [
      "जल में उतरना है या नहीं, यह वे तय करते हैं। न हम, न आप। यदि वे असुरक्षित समझें तो अनुष्ठान सीढ़ियों से जल-अर्पण के रूप में होता है, उनका भुगतान अपरिवर्तित रहता है, और अभिलेख स्पष्ट कहता है कि क्या हुआ।",
      "दिन और सप्ताह में वे कितनी बार जल में उतर सकते हैं, इसकी प्रकाशित सीमा है, जो पुरोहितों के साथ मिलकर तय होती है, अकेले हमारे द्वारा नहीं, और उन स्थितियों की प्रकाशित सूची है जिनमें कोई जल में नहीं उतरता: बाढ़, तेज़ धारा, अंधेरा, जल-गुणवत्ता की चेतावनी, अस्वस्थता।",
      "दुर्घटना और स्वास्थ्य बीमा हमारा दायित्व है, उनका ख़र्च नहीं।",
      "सार्वजनिक अभिलेख में वे नाम से नहीं, एक अपारदर्शी पहचान-अंक से दर्ज होते हैं। एक व्यक्ति के काम के घंटों और आय का स्थायी सार्वजनिक लेखा उसे निशाना बनाता है, और इस व्यवस्था में सबसे कम शक्ति उन्हीं के पास है। उनका नाम आपके संकल्प पत्र पर और उनके अपने पृष्ठ पर रहता है, और वे सार्वजनिक पृष्ठ से मना कर सकते हैं, काम खोए बिना।",
    ],
  },

  s7: {
    n: "०७",
    id: "failure",
    h: "यदि कुछ गड़बड़ हो",
    lede: "यह तालिका है, किसी का विवेक नहीं। आपको किसी से बहस नहीं करनी पड़ती, और फ़ोन तो कभी नहीं करना पड़ता।",
    rows: [
      {
        w: "प्रसारण टूटा, अनुष्ठान रिकॉर्ड हुआ",
        t: "छह घंटे में रिकॉर्डिंग आपके पास, और चाहें तो एक चौथाई राशि वापस। एक क्लिक, बिना प्रश्न। हम पर आपका अधिकार रिकॉर्डिंग का है, प्रसारण का नहीं।",
      },
      {
        w: "अनुष्ठान हुआ ही नहीं",
        t: "आपके पूछने से पहले हम बताएँगे। फिर चुनाव आपका: अगले समान मुहूर्त में निःशुल्क पुनः, या पूरी राशि वापस।",
      },
      {
        w: "घाट बंद था, या जल असुरक्षित",
        t: "मुहूर्त से पहले हम बताएँगे, और दूसरा घाट, दूसरी नदी, दूसरा मुहूर्त, या पूरी वापसी प्रस्तुत करेंगे। यदि पुरोहित सीढ़ियों से अर्पण करें, तो अभिलेख यही कहेगा। एक नदी के बदले चुपचाप दूसरी कभी नहीं।",
      },
      {
        w: "पुरोहित नहीं आ सके",
        t: "जो उनके स्थान पर आएँगे, उनका नाम अनुष्ठान से पहले बताया जाता है, बाद में नहीं। आप मना कर सकते हैं।",
      },
      {
        w: "आपका नाम या गोत्र ग़लत बोला गया",
        t: "कहिए, और वह एक बार फिर, निःशुल्क, बिना बहस के पढ़ा जाएगा। बुकिंग के समय आप स्वयं अपने स्वर में नाम रिकॉर्ड कर सकते हैं, ताकि वे पहले आपसे सुन लें।",
      },
      {
        w: "अनुष्ठान से पहले आपका मन बदल जाए",
        t: "मुहूर्त से चौबीस घंटे पहले तक पूरी राशि वापस; उसके भीतर आधी, क्योंकि तब तक पुरोहित नियत और भुगतान-प्राप्त हो चुके होते हैं।",
      },
      {
        w: "बाद में आप असंतुष्ट हों",
        t: "चौदह दिन के भीतर, कारण पूछे बिना, राशि वापस। हम वह लौटा रहे हैं जो आपने व्यवस्था, अनुष्ठान और रिकॉर्डिंग के लिए हमें दिया। हम अनुष्ठान को पलट नहीं रहे: वह हुआ, पुरोहित को पूरा भुगतान हुआ, और अभिलेख यथावत रहता है। अनुष्ठान लौटाई जाने वाली वस्तु नहीं है, और हम इसका दिखावा नहीं करेंगे।",
      },
      {
        w: "अनुष्ठान से पहले किसी नामित व्यक्ति का देहांत हो जाए",
        t: "पूरी राशि वापस, या, केवल आपके कहने पर, वही अनुष्ठान स्मरण-तर्पण के रूप में, निःशुल्क। हम स्वयं यह प्रस्ताव नहीं रखेंगे। नब्बे दिन तक हमसे आपको वही मिलेगा जो आपकी बुकिंग के लिए आवश्यक है।",
      },
    ],
    note: "हर माह की पाँच तारीख़ को, पहले अनुष्ठान से ही, हम अपने आँकड़े प्रकाशित करते हैं: नियत, संपन्न, बाधित और क्यों, न हुए और क्यों, वापस किए गए, संकल्प पत्र में लगा समय, आय का कितना भाग पुरोहितों तक पहुँचा, कितनी आपत्तियाँ आईं और कितनी सही पाई गईं, और सरकार से कितनी माँगें आईं। बुरे महीनों के भी। आज के छोटे सच्चे आँकड़े कल के बड़े धुँधले आँकड़ों से अधिक मूल्यवान हैं।",
  },

  s8: {
    n: "०८",
    id: "data",
    h: "आपका नाम, आपका गोत्र, आपका संकल्प",
    body: [
      "गोत्र वंश है। संकल्प में कोई रोग हो सकता है, कोई मृत्यु, कोई भय। यह सामान्य ग्राहक-सूचना नहीं है, और हम इसे वैसा नहीं मानते, न क़ानून में, जहाँ यह विशेष श्रेणी की धार्मिक सूचना है, न व्यवहार में।",
    ],
    gotraH: "यहाँ गोत्र वैकल्पिक है",
    gotra: [
      "बहुत से परिवार गोत्र नहीं मानते, और जो फ़ॉर्म गोत्र पर अड़ता है वह लोगों को जाति से छाँटने वाला फ़ॉर्म है। हमारा नहीं अड़ता। रिक्त छोड़िए और संकल्प में प्रचलित कश्यप गोत्र लिया जाएगा, या आपके परिवार की अपनी परिपाटी, यदि आप बता दें।",
      "पारिवारिक बुकिंग में हर नाम का अपना गोत्र हो सकता है, क्योंकि घर एकरूप नहीं होते, विवाह कर आई स्त्री, गोद लिया बच्चा, अंतर्जातीय विवाह। छह नामों पर एक ही गोत्र अधिकांश परिवारों के लिए ग़लत संकल्प बनाता।",
    ],
    sankalpH: "संकल्प-पाठ",
    sankalp: [
      "सामान्यतः पुरोहित उसे ऊँचे स्वर में नहीं पढ़ते। वे कहते हैं कि अनुष्ठान आपके मन में धारित संकल्प हेतु है। ऊँचे स्वर में तभी, जब आप कहें, और वह डिब्बी आपके लिए पहले से चुनी हुई कभी नहीं होती।",
      "यदि आप ऊँचे स्वर में पढ़वाना चुनते हैं, तो वह स्थायी रिकॉर्डिंग का अंग बन जाता है, और नीचे लिखा नब्बे दिन का नियम वहाँ तक नहीं पहुँच सकता। यह हम उसी डिब्बी पर लिख देते हैं, और साथ ही रिकॉर्डिंग भी मिटाने का विकल्प देते हैं।",
      "स्नानिफ़ाई में कोई संकल्प यूँ ही नहीं पढ़ता। पढ़ने के लिए दो अनुमतियाँ और लिखित कारण चाहिए, वह स्थायी रूप से दर्ज होता है, और एक दिन के भीतर आपको सूचित किया जाता है कि पढ़ा गया, किसने और क्यों। इसकी क़ीमत हमें चुकानी पड़ती है, इसीलिए यह विश्वास योग्य है।",
      "पाठ पर एक स्वचालित सुरक्षा-जाँच चलती है। उस जाँच के कारण कोई व्यक्ति उसे नहीं देखता। यदि पाठ से लगे कि कोई संकट में हो सकता है, तो आपको एक संदेश मिलता है जिसमें वे स्थान लिखे होते हैं जहाँ आप बात कर सकते हैं, और वह इस तरह लिखा जाता है कि उससे यह संकेत न मिले कि किसी ने आपके शब्द पढ़े, क्योंकि किसी ने नहीं पढ़े। किसी नामित व्यक्ति की हानि के उद्देश्य से किया गया संकल्प हम नहीं करेंगे, और वही उन गिने-चुने कारणों में है जिनमें कोई व्यक्ति पाठ देख सकता है।",
      "हम इस पर कुछ प्रशिक्षित नहीं करते। इससे विज्ञापन नहीं करते। इसे उद्धृत नहीं करते। प्रशंसापत्र नहीं बनाते।",
    ],
    othersH: "वे नाम जो आपके अपने नहीं",
    others: [
      "जब आप किसी जीवित संबंधी का नाम देते हैं, तो आप हमें उनकी सूचना सौंप रहे हैं, अपनी नहीं। हम आपसे पुष्टि माँगते हैं कि उन्हें आपत्ति न होगी। किसी भी जीवित व्यक्ति की सूचना उन्हीं के कहने पर हटा दी जाती है, आपकी अनुमति लिए बिना, और यह बताए बिना कि किसने कहा। किसी बच्चे का नाम देने के लिए आपको यह कहना होता है कि आप उनके संरक्षक हैं।",
    ],
    retentionH: "क्या रखा जाता है, और कितने समय",
    retention: [
      { k: "आपका खाता", v: "जब तक आप रखें; रसीदें केवल जहाँ कर-क़ानून माँगे" },
      { k: "नाम, गोत्र, संबंध", v: "सामान्यतः 24 माह, आप चाहें तो 3 माह, या अनिश्चित काल" },
      { k: "संकल्प-पाठ", v: "अनुष्ठान के 90 दिन बाद, या 24 घंटे में, या सदा" },
      { k: "रिकॉर्डिंग", v: "जब तक आप न हटाएँ" },
      { k: "सार्वजनिक अभिलेख", v: "स्थायी, और रचना से ही उसमें कोई नाम, गोत्र या संकल्प नहीं" },
    ],
    eraseH: "सब कुछ मिटाना",
    erase: [
      "एक बटन सब कुछ मिटा देता है, प्रतियों और बैकअप सहित, सात दिन के भीतर। यह उस कुंजी को नष्ट करके होता है जिससे आपका अनुष्ठान एन्क्रिप्ट किया गया था, इसीलिए यह वहाँ भी चलता है जहाँ भंडारण स्वयं मिटाया नहीं जा सकता। छाप सार्वजनिक अभिलेख में रहती है, इसलिए आपकी उतारी हुई प्रति बाद में भी प्रमाणित होती रहती है: मिटाने से हमारी क्षमता जाती है, आपकी नहीं।",
      "पुष्टि-संदेश में लिखा होता है कि क्या मिटा, क्या रखा गया, और क्यों, वे रसीदें जो क़ानून माँगता है, और अनाम अभिलेख प्रविष्टि।",
    ],
    trackingH: "इस साइट पर क्या चलता है",
    tracking: [
      "इस साइट पर कोई विज्ञापन या स्क्रीन-रिकॉर्डिंग स्क्रिप्ट नहीं चलती, कभी नहीं। जिस पृष्ठ पर आप अपना संकल्प लिखते हैं, उसे कुछ भी रिकॉर्ड नहीं करता।",
      "एक विश्लेषण स्क्रिप्ट पृष्ठ-दृश्य गिनती है: Vercel Web Analytics। वह कोई कुकी नहीं रखती, आपका पीछा किसी दूसरी साइट तक नहीं करती, और किसी फ़ॉर्म की सामग्री कभी नहीं देखती। जो शून्य हमारे पास नहीं है, उसका दावा करने से अच्छा है उसका नाम बता देना।",
      "उत्पाद में केवल एक और बाहरी स्क्रिप्ट है: भुगतान सेवा की, केवल भुगतान वाले चरण पर, और उसी पृष्ठ पर उसका नाम लिखा रहता है।",
      "पहले अनुष्ठान से यह पृष्ठ यह गिनती भी रखेगा कि सूचना के लिए कितनी गुप्त माँगें हमें मिलीं। यदि वह वाक्य कभी बदलने के बजाय हटा दिया जाए, तो हटाए जाने को ही पढ़िए।",
    ],
  },

  s9: {
    n: "०९",
    id: "never-do",
    h: "जो हम आपके साथ नहीं करेंगे",
    items: [
      "अनुष्ठान पर कोई उलटी गिनती नहीं।",
      "“दो स्थान शेष” तभी, जब सचमुच दो शेष हों।",
      "किसी की पुण्यतिथि पर संदेश तभी, जब आपने माँगा हो, और उसी संदेश में एक स्पर्श से वह सदा के लिए बंद।",
      "न कोई शृंखला, न बैज, न स्तर, न “आपने मार्च से कुछ नहीं किया”।",
      "शोक, अंत्येष्टि, श्रद्धांजलि या रोग से जुड़े पन्नों पर कोई विज्ञापन नहीं।",
      "शुभ दिन देखकर बढ़ता मूल्य नहीं, और यह देखकर बदलता मूल्य भी नहीं कि आप कौन लगते हैं।",
      "कोई डिब्बी पहले से चुनी हुई नहीं, न अतिरिक्त सेवा, न दक्षिणा, न नवीनीकरण, न सूचना-सूची।",
      "रोकने में उतने ही क्लिक जितने आरंभ करने में; बीच में न कोई पर्दा, न कोई प्रस्ताव।",
      "सूची से हटने के लिए एक क्लिक, तुरंत मान्य, और “कम ईमेल कैसे रहेंगे” वाला चरण नहीं।",
      "कोई ऐसी प्रश्नावली नहीं जो आपको बताए कि आपकी कुंडली में क्या दोष है।",
      "कोई ऐसा पुष्टि-पर्दा नहीं जो पूछे कि आप निश्चित हैं, और आपकी राशि रोकने के लिए किसी बिछड़े हुए का नाम कभी नहीं।",
      "आपका संकल्प कोई AI नहीं लिखेगा, और उस खाने में कोई सुझाव नहीं, सुझाव लोगों को शोक की ओर मोड़ते हैं।",
      "स्वयं यात्रा करने के विरुद्ध एक शब्द भी नहीं।",
    ],
  },

  s10: {
    n: "१०",
    id: "unsettled",
    h: "जो अभी तय नहीं हुआ",
    lede: "वही खंड जो हम हर पुरोहित के पृष्ठ पर रखते हैं, क्या सत्यापित हुआ और क्या नहीं, इस बार अपने ऊपर लागू। आगे जो है, उसे इसी तराज़ू पर तौलिए।",
    rows: [
      {
        q: "घाटों पर फ़िल्माने की अनुमति",
        a: "इनमें से हर स्थल किसी के अधीन है: कोई सभा, कोई मंदिर न्यास, कोई मेला प्राधिकरण, कोई नगर निकाय। जब तक वहाँ फ़िल्माने की लिखित अनुमति हमारे पास न हो, वह घाट नहीं खुलेगा, और उस जल के पृष्ठ पर लिखा होगा कि अनुमति किसने दी।",
      },
      {
        q: "घाट पर वे लोग जो हम नहीं हैं",
        a: "ये सार्वजनिक स्नान-स्थल हैं। कैमरा पुरोहित और जल पर स्थिर रहता है, स्नान करते लोगों पर कभी नहीं फिरता। जिनकी पहचान हो सकती है और जिन्होंने सहमति नहीं दी, वे प्रकाशन से पहले हटा दिए जाते हैं, और हर पृष्ठ पर हटवाने का पता रहता है। सार्वजनिक स्थान सहमति नहीं होता।",
      },
      {
        q: "पंचांग",
        a: "हमने अभी कोई स्रोत तय नहीं किया। जब तक न हो, इस साइट पर कहीं कोई सटीक समय नहीं आएगा, केवल पर्व का नाम। जब समय आएँगे, उनके साथ गणना-पद्धति, अयनांश और घाट के अपने अक्षांश-देशांतर होंगे; और जहाँ स्रोत आपस में भिन्न हों, वहाँ झूठी सटीकता के बजाय हम सीमा दिखाएँगे।",
      },
      {
        q: "छह जल",
        a: "हम छहों की जाँच कर रहे हैं, कौन उन्हें संचालित करता है, क्या वहाँ प्रतिदिन अनुष्ठान सच में संपन्न और फ़िल्माए जा सकते हैं, और ऋतु का पहुँच पर क्या प्रभाव है। जहाँ सच्चा उत्तर “नहीं” हो, वह जल नहीं खुलेगा, और हम कारण बताएँगे, चुपचाप हटा नहीं देंगे।",
      },
      {
        q: "पुरोहित",
        a: "जब तक कोई पुरोहित अनुबंध पर हस्ताक्षर न करें और लिखित में नाम प्रकाशित करने की सहमति न दें, उनका नाम, चित्र या परिचय इस साइट पर नहीं आएगा। आज यहाँ कोई पुरोहित प्रकाशित नहीं है, और किसी काल्पनिक व्यक्ति को उनकी जगह कभी नहीं रखा जाएगा।",
      },
      {
        q: "हम कितना देते हैं",
        a: "प्रस्तावित, अभी इस कसौटी पर नहीं कसा गया कि इन घाटों के पुरोहित वास्तव में कितना कमाते हैं। यह भी तय नहीं कि कैमरा किसका होगा, डेटा का ख़र्च कौन उठाएगा, वर्षा-काल में घाट बंद रहने पर भुगतान का क्या होगा, और क़ानून में उनका दर्जा क्या होगा। हम उत्तर प्रकाशित करेंगे, गोल-मोल विवरण नहीं देंगे।",
      },
      {
        q: "विधि की समीक्षा कौन करता है",
        a: "हम तीन बाहरी परामर्शदाता चाहते हैं, सार्वजनिक रूप से नामित, मानदेय-प्राप्त, और सार्वजनिक रूप से हमसे असहमत होने के लिए स्वतंत्र। वे अभी हमारे पास नहीं हैं। तब तक किसी पुरोहित की विधि उचित है या नहीं, यह निर्णय केवल हमारा है, और वह दुर्बल निर्णय है।",
      },
      {
        q: "धन, कर और अधिकार-क्षेत्र",
        a: "कंपनी कहाँ बैठेगी, इस पर कर कैसे लगेगा, और आपकी सूचना पर कौन-सा क़ानून चलेगा, ये वास्तविक प्रश्न हैं जिनके उत्तर हम अभी विधि-सलाहकारों से ले रहे हैं। आपकी सूचना भारत में रहनी है, और जो चाहें उनके लिए यूरोप में एक प्रति। जब तक यह तय न हो, यही वाक्य इसकी सच्ची स्थिति है।",
      },
    ],
  },

  s11: {
    n: "११",
    id: "ask",
    h: "जिनका विवेक आप मानते हैं, उनसे पूछिए",
    body: [
      "बुक करने से पहले किसी ऐसे व्यक्ति से पूछिए जिनके विवेक पर आप इन विषयों में भरोसा करते हैं, अपने पुरोहित, अपने परिवार के आचार्य, अपने बड़े। यदि वे कहें कि यह आपके लिए उचित नहीं, तो वे ठीक कहते हैं, और हमें बुरा नहीं लगेगा।",
      "और यदि आपको लगे कि हमसे कहीं चूक हुई है, शास्त्र में, मूल्य में, प्रमाण में, हमें लिखिए। सद्भाव से की गई आपत्तियाँ और उन पर हमारा किया, दोनों हम प्रकाशित करते हैं, वे भी जिन पर हमने कुछ नहीं किया, और क्यों नहीं किया।",
    ],
    mailLabel: "हमें लिखिए",
  },
} } satisfies Record<Lang, typeof ethicsEn>;

/* --------------------------------------------------------- how it works --- */

const howEn = {
  meta: {
    title: "How it works, from sankalp to Sankalp Patra · Snanify",
    description:
      "The full sequence: what you fill in, what the officiant does at the ghat, what is streamed, and what reaches you afterwards. Nothing is shipped to you, everything Snanify gives you is digital.",
  },
  eyebrow: "How it works",
  title: "The three steps, at full length.",
  lede: "What you fill in, what the officiant does at the ghat, what is streamed while it happens, and what reaches you afterwards. Where we do not yet know how long something takes, this page says so.",

  shipping: {
    eyebrow: "Read this first",
    title: "Nothing is shipped to you.",
    body: [
      "Everything Snanify gives you is digital: a recording, a certificate, and a record that anyone can verify. No water, no prasad, no thread, no ash, no parcel. Nothing arrives at your door and nothing needs a customs form.",
      "If what you want is Ganga jal in your hand, we are not the service for that, and we would rather say so here than take your money and disappoint you later.",
    ],
  },

  phases: [
    {
      id: "before",
      n: "01",
      label: "Before, what you do",
      steps: [
        {
          t: "You take sankalp",
          d: [
            "Your name, the names of anyone you are including, your relationship to them, and, if your family keeps one, your gotra. Leave the gotra blank and the customary Kashyapa gotra is used, or your family's own convention if you tell us what it is. Each name may carry its own gotra.",
            "Then the intention. There is no box asking what is wrong with your life. The suggestions are neutral, nothing is ticked for you, and “let it remain unspoken” is a real choice that many people make.",
          ],
        },
        {
          t: "You record your own name, if you like",
          d: [
            "Twenty seconds of your own voice saying the names and the gotra. The officiant listens to it before the rite. For an Indian family this is worth more than any of the cryptography further down this page, and if a name is still said wrongly, one tap has it recited again.",
          ],
        },
        {
          t: "You choose a water and a window",
          d: [
            "Six rivers, and the occasions each observes. While no panchang source is named, you will see the occasion and not a clock time, we would rather show you less than show you a time we invented. When exact timings appear they carry their method and the coordinates of the ghat, and are converted to wherever you are.",
          ],
        },
        {
          t: "You decide who hears it",
          d: [
            "By default the officiant does not read your sankalp aloud; he states that the rite is offered for the intention you hold. If you ask for it aloud, the checkout tells you in one sentence who else will hear it, and that it becomes part of a recording the ninety-day deletion cannot reach.",
            "A shared segment carries up to eleven sankalps. A private rite carries one. The page says which you are buying before you pay.",
          ],
        },
        {
          t: "You pay, and two things arrive at once",
          d: [
            "A rite code, and the sankalp seal, the first sixteen characters of a fingerprint of everything you just entered, published to a public record within the hour. Your words are not in it and cannot be recovered from it. It is what proves, later, that your intention existed before the rite.",
            "You do not need an account. The confirmation email carries a link that claims the booking whenever you want it.",
          ],
        },
      ],
    },
    {
      id: "ghat",
      n: "02",
      label: "At the ghat, what the officiant does",
      steps: [
        {
          t: "He is told what to say, and nothing more",
          d: [
            "The names, the gotras, and the fact that you hold an intention. He sees the words of your sankalp only if you asked for it aloud. Everything about you is wiped from his device within forty-eight hours, by the app rather than by his diligence.",
          ],
        },
        {
          t: "The slate",
          d: [
            "Held to the camera and kept still: your rite code, the date, the ghat, the first characters of your sankalp seal, and that day's public anchor, a number published each morning by a public randomness beacon, which no recording made earlier could possibly display. Anyone can look that number up at its source.",
          ],
        },
        {
          t: "The sankalp, then the water",
          d: [
            "The sankalp fixes the place, the time, the lineage and the person, in the ordinary way. Each name and each gotra is spoken separately and audibly, with at least forty-five seconds of recitation for every named sankalp.",
            "Then the dip, or, if he judges the water unsafe to enter, the offering is made from the steps. That is his decision, never ours and never yours, and the record says which of the two happened.",
          ],
        },
        {
          t: "One take",
          d: [
            "No cuts. A machine checks the file for cuts, for splices in the audio, and for a slate that matches the booking. A segment that fails any of those checks is not published, it is performed again, and you are told.",
          ],
        },
      ],
    },
    {
      id: "live",
      n: "03",
      label: "While it happens, if you want to be there",
      steps: [
        {
          t: "The stream is a courtesy",
          d: [
            "A link at booking, a reminder fifteen minutes before and again at two minutes. Join from anywhere; there is nothing to install.",
            "The recording, not the stream, is what we owe you. Connectivity at a ghat fails often, and a stream that drops is a small honest failure, not a failed rite. If you sleep through it, many people are eleven hours away, nothing at all is lost.",
          ],
        },
      ],
    },
    {
      id: "after",
      n: "04",
      label: "Afterwards, what reaches you",
      steps: [
        {
          t: "Your recording",
          d: [
            "Your own excerpt, opening a few seconds before your name is spoken, with the exact second written down. It contains your names and no one else's, because the other families in a shared segment did not consent to be in your video any more than you consented to be in theirs. The full segment exists and is released only if everyone in it agrees.",
          ],
        },
        {
          t: "Your Sankalp Patra",
          d: [
            "The names and gotras, the water, the ghat, the date, the window in IST and in your own timezone, the officiant's name and identifier, the rite code, the sankalp seal, and a code that takes anyone straight to the verification page.",
            "It carries a line that cannot be removed: “This is a record of a rite performed and recorded. It is not a claim about its fruit.” It carries our name, and it deliberately does not borrow the seal, the styling or the name of any temple or trust. It is not a temple certificate and it does not pretend to be one.",
            "We aim to have it with you within a day. Until we have published a month of real numbers, please read that as an aim and not a promise, what we actually achieve is published on the fifth of every month.",
          ],
        },
        {
          t: "Anyone can check it",
          d: [
            "The verification page takes a rite code and a video file. It shows the ghat, the officiant, the scheduled and actual times, the day's anchor with a link to its source, how many sankalps shared the segment, and whether the rite was performed, degraded or not performed at all.",
            "Drag the file in and the check runs in the browser: the file never leaves the computer, and no account is needed. A file forwarded through WhatsApp has been recompressed and will not match, that is the messenger, not a forgery. Download the original from your rite page. There is a sample rite you can practise on before you ever need this.",
          ],
        },
        {
          t: "If something went wrong",
          d: [
            "Every failure has a published remedy, decided in advance rather than argued case by case: a dropped stream, a rite that did not happen, a closed ghat, a name said wrongly, a change of mind. You never have to telephone anyone.",
          ],
        },
      ],
    },
  ],

  /* PLACEHOLDER: no film exists yet. This block must keep saying so until a
     real rite has been recorded, no stock footage, no generated video. */
  film: {
    label: "A short film will sit here",
    body: "Forty seconds of an actual rite, silent, so you can see the ghat, the slate and the take before you decide anything. It is not here yet because no rite has been performed yet. We will not fill this space with stock footage, someone else's ghat, or anything generated.",
  },

  closing: {
    title: "The longer answer to “is this legitimate?”",
    body: "Our position, what we can promise, what we cannot, the claims we will never make, and what we have not yet settled, is written out in full.",
    ethicsLabel: "Read our position",
    faqLabel: "Questions people ask",
  },
};

export const howItWorksContent = { en: howEn, hi: {
  meta: {
    title: "कैसे काम करता है, संकल्प से संकल्प पत्र तक · स्नानिफ़ाई",
    description:
      "पूरा क्रम: आप क्या भरते हैं, पुरोहित घाट पर क्या करते हैं, सजीव क्या प्रसारित होता है, और बाद में आप तक क्या पहुँचता है। आपके पास कुछ भेजा नहीं जाता, स्नानिफ़ाई जो देती है वह सब डिजिटल है।",
  },
  eyebrow: "कैसे काम करता है",
  title: "तीन चरण, पूरे विस्तार से।",
  lede: "आप क्या भरते हैं, पुरोहित घाट पर क्या करते हैं, उस समय सजीव क्या दिखता है, और बाद में आप तक क्या पहुँचता है। जहाँ हमें अभी नहीं पता कि कितना समय लगेगा, यह पृष्ठ वही कहता है।",

  shipping: {
    eyebrow: "पहले यह पढ़िए",
    title: "आपके पास कुछ भेजा नहीं जाता।",
    body: [
      "स्नानिफ़ाई जो देती है वह सब डिजिटल है: एक रिकॉर्डिंग, एक प्रमाणपत्र, और एक अभिलेख जिसे कोई भी जाँच सकता है। न जल, न प्रसाद, न मौली, न भस्म, न कोई पार्सल। आपके द्वार पर कुछ नहीं आता, और किसी सीमा-शुल्क फ़ॉर्म की आवश्यकता नहीं।",
      "यदि आपको हाथ में गंगाजल चाहिए, तो हम उसकी सेवा नहीं हैं, और यह हम यहीं कह देना चाहेंगे, बजाय इसके कि आपकी राशि लेकर बाद में निराश करें।",
    ],
  },

  phases: [
    {
      id: "before",
      n: "०१",
      label: "पहले, आप क्या करते हैं",
      steps: [
        {
          t: "आप संकल्प लेते हैं",
          d: [
            "आपका नाम, जिन्हें आप सम्मिलित कर रहे हैं उनके नाम, उनसे आपका संबंध, और, यदि आपका परिवार मानता है, आपका गोत्र। रिक्त छोड़ेंगे तो प्रचलित कश्यप गोत्र लिया जाएगा, या आपके परिवार की अपनी परिपाटी, यदि आप बता दें। हर नाम का अपना गोत्र हो सकता है।",
            "फिर आपका संकल्प। कोई खाना यह नहीं पूछता कि आपके जीवन में क्या कष्ट है। सुझाव तटस्थ हैं, कुछ भी पहले से चुना हुआ नहीं, और “इसे अनकहा ही रहने दें” एक वास्तविक विकल्प है जिसे बहुत लोग चुनते हैं।",
          ],
        },
        {
          t: "चाहें तो अपने स्वर में नाम रिकॉर्ड कीजिए",
          d: [
            "बीस सेकंड, जिनमें आप स्वयं नाम और गोत्र बोलते हैं। पुरोहित अनुष्ठान से पहले उसे सुनते हैं। किसी भारतीय परिवार के लिए यह इस पृष्ठ पर आगे लिखी सारी तकनीक से अधिक मूल्यवान है, और यदि फिर भी नाम ग़लत बोला जाए, तो एक स्पर्श से वह दोबारा पढ़ा जाता है।",
          ],
        },
        {
          t: "आप जल और घड़ी चुनते हैं",
          d: [
            "छह नदियाँ, और हर एक पर मनाए जाने वाले पर्व। जब तक कोई पंचांग स्रोत तय नहीं होता, आपको पर्व दिखेगा, घड़ी का समय नहीं, गढ़ा हुआ समय दिखाने से कम दिखाना अच्छा है। जब सटीक समय आएँगे, उनके साथ गणना-पद्धति और घाट के अपने निर्देशांक होंगे, और वे आपके स्थान के समय में बदलकर दिखेंगे।",
          ],
        },
        {
          t: "आप तय करते हैं कि इसे कौन सुनेगा",
          d: [
            "सामान्यतः पुरोहित आपका संकल्प ऊँचे स्वर में नहीं पढ़ते; वे कहते हैं कि अनुष्ठान आपके मन में धारित संकल्प हेतु है। यदि आप ऊँचे स्वर में पढ़वाना चाहें, तो भुगतान से पहले एक वाक्य में लिखा रहता है कि उसे और कौन सुनेगा, और यह कि वह उस रिकॉर्डिंग का अंग बन जाएगा जहाँ नब्बे दिन का नियम नहीं पहुँचता।",
            "साझा खंड में ग्यारह संकल्प तक होते हैं। निजी अनुष्ठान में एक। आप कौन-सा ले रहे हैं, यह भुगतान से पहले पृष्ठ पर लिखा होता है।",
          ],
        },
        {
          t: "आप भुगतान करते हैं, और दो चीज़ें एक साथ मिलती हैं",
          d: [
            "एक अनुष्ठान कोड, और संकल्प चिह्न, अभी आपने जो भरा उसकी छाप के पहले सोलह अक्षर, जो एक घंटे के भीतर सार्वजनिक अभिलेख में प्रकाशित हो जाते हैं। उसमें आपके शब्द नहीं होते और उससे वे वापस निकाले नहीं जा सकते। बाद में यही सिद्ध करता है कि आपका संकल्प अनुष्ठान से पहले था।",
            "खाता बनाना आवश्यक नहीं। पुष्टि-ईमेल में एक कड़ी रहती है, जिससे आप जब चाहें बुकिंग अपने नाम कर सकते हैं।",
          ],
        },
      ],
    },
    {
      id: "ghat",
      n: "०२",
      label: "घाट पर, पुरोहित क्या करते हैं",
      steps: [
        {
          t: "उन्हें उतना ही बताया जाता है जितना बोलना है",
          d: [
            "नाम, गोत्र, और यह कि आपके मन में कोई संकल्प है। आपके संकल्प के शब्द वे तभी देखते हैं जब आपने ऊँचे स्वर में पढ़ने को कहा हो। आपसे जुड़ी हर बात अड़तालीस घंटे में उनके उपकरण से मिट जाती है, ऐप से, उनकी सावधानी के भरोसे नहीं।",
          ],
        },
        {
          t: "पट्टिका",
          d: [
            "कैमरे के सामने स्थिर रखी जाती है: आपका अनुष्ठान कोड, तिथि, घाट, आपके संकल्प चिह्न के पहले अक्षर, और उस दिन का सार्वजनिक अंक, जो प्रत्येक प्रातः एक सार्वजनिक स्रोत से आता है और जिसे पहले बनी कोई रिकॉर्डिंग दिखा ही नहीं सकती। उस अंक को कोई भी उसके स्रोत पर जाँच सकता है।",
          ],
        },
        {
          t: "संकल्प, फिर जल",
          d: [
            "संकल्प देश, काल, गोत्र और व्यक्ति को सामान्य विधि से निश्चित करता है। हर नाम और हर गोत्र अलग-अलग और सुनाई देने योग्य स्वर में बोला जाता है, और प्रत्येक नामित संकल्प के लिए कम से कम पैंतालीस सेकंड का पाठ होता है।",
            "फिर डुबकी, या यदि वे जल में उतरना असुरक्षित समझें, तो सीढ़ियों से अर्पण। यह निर्णय उनका है, न हमारा, न आपका; और अभिलेख बताता है कि दोनों में से क्या हुआ।",
          ],
        },
        {
          t: "एक ही दृश्य",
          d: [
            "बिना कट। यंत्र फ़ाइल में कट, ध्वनि के जोड़, और पट्टिका का बुकिंग से मेल, तीनों जाँचता है। जो खंड किसी भी जाँच में विफल हो, वह प्रकाशित नहीं होता; वह दोबारा किया जाता है और आपको बताया जाता है।",
          ],
        },
      ],
    },
    {
      id: "live",
      n: "०३",
      label: "उस समय, यदि आप साथ रहना चाहें",
      steps: [
        {
          t: "प्रसारण एक शिष्टाचार है",
          d: [
            "बुकिंग के साथ एक कड़ी, पंद्रह मिनट पहले और फिर दो मिनट पहले स्मरण। कहीं से भी जुड़िए; कुछ इंस्टॉल नहीं करना।",
            "हम पर आपका अधिकार रिकॉर्डिंग का है, प्रसारण का नहीं। घाट पर संपर्क अक्सर टूटता है, और टूटा प्रसारण एक छोटी सच्ची चूक है, विफल अनुष्ठान नहीं। यदि आप उस समय सो रहे हों, बहुत लोग ग्यारह घंटे दूर हैं, तो कुछ भी नहीं खोता।",
          ],
        },
      ],
    },
    {
      id: "after",
      n: "०४",
      label: "बाद में, आप तक क्या पहुँचता है",
      steps: [
        {
          t: "आपकी रिकॉर्डिंग",
          d: [
            "आपका अपना अंश, जो आपका नाम बोले जाने से कुछ सेकंड पहले आरंभ होता है, और वह सेकंड लिखा हुआ मिलता है। उसमें आपके नाम हैं, किसी और के नहीं, क्योंकि साझा खंड के अन्य परिवारों ने आपके वीडियो में रहने की सहमति उतनी ही नहीं दी, जितनी आपने उनके वीडियो में रहने की। पूरा खंड रहता है, और तभी दिया जाता है जब उसमें सम्मिलित सब सहमत हों।",
          ],
        },
        {
          t: "आपका संकल्प पत्र",
          d: [
            "नाम और गोत्र, जल, घाट, तिथि, मुहूर्त भारतीय समय में और आपके अपने समय में, पुरोहित का नाम और पहचान-अंक, अनुष्ठान कोड, संकल्प चिह्न, और एक कोड जो किसी को भी सीधे जाँच-पृष्ठ तक ले जाता है।",
            "उस पर एक पंक्ति रहती है जो हटाई नहीं जा सकती: “यह संपन्न एवं अभिलिखित अनुष्ठान का प्रमाण है। इसके फल का दावा नहीं।” उस पर हमारा नाम रहता है, और वह जानबूझकर किसी मंदिर या न्यास की मुहर, शैली या नाम उधार नहीं लेता। यह मंदिर का प्रमाणपत्र नहीं है और होने का दिखावा भी नहीं करता।",
            "हमारा प्रयास है कि वह एक दिन में आप तक पहुँचे। जब तक हम एक महीने के वास्तविक आँकड़े प्रकाशित न कर दें, कृपया इसे प्रयास मानिए, वचन नहीं, जो वास्तव में होता है वह हर माह की पाँच तारीख़ को प्रकाशित होता है।",
          ],
        },
        {
          t: "इसे कोई भी जाँच सकता है",
          d: [
            "जाँच-पृष्ठ अनुष्ठान कोड और वीडियो फ़ाइल लेता है। वह घाट, पुरोहित, नियत और वास्तविक समय, उस दिन का अंक (स्रोत की कड़ी सहित), खंड में कितने संकल्प थे, और अनुष्ठान संपन्न हुआ, बाधित रहा या नहीं हुआ, सब दिखाता है।",
            "फ़ाइल खींचकर छोड़िए और जाँच ब्राउज़र में ही चलती है: फ़ाइल कंप्यूटर से बाहर नहीं जाती, और कोई खाता नहीं चाहिए। WhatsApp से आगे भेजी गई फ़ाइल दबाकर छोटी की जा चुकी होती है और मेल नहीं खाएगी, यह संदेशवाहक का प्रभाव है, जालसाज़ी नहीं। मूल फ़ाइल अपने अनुष्ठान पृष्ठ से उतारिए। एक नमूना अनुष्ठान भी है, जिस पर आप आवश्यकता पड़ने से पहले अभ्यास कर सकते हैं।",
          ],
        },
        {
          t: "यदि कुछ गड़बड़ हुआ",
          d: [
            "हर चूक का उपाय पहले से लिखा और प्रकाशित है, हर बार अलग बहस नहीं: टूटा प्रसारण, न हुआ अनुष्ठान, बंद घाट, ग़लत बोला गया नाम, बदला हुआ मन। किसी को फ़ोन करने की आवश्यकता कभी नहीं पड़ती।",
          ],
        },
      ],
    },
  ],

  film: {
    label: "यहाँ एक लघु फ़िल्म आएगी",
    body: "चालीस सेकंड, किसी वास्तविक अनुष्ठान के, बिना ध्वनि, ताकि निर्णय से पहले आप घाट, पट्टिका और पूरा दृश्य देख सकें। वह अभी यहाँ नहीं है क्योंकि अभी कोई अनुष्ठान हुआ ही नहीं। इस स्थान को हम न किसी तैयार फ़ुटेज से भरेंगे, न किसी और के घाट से, न किसी कृत्रिम रूप से बने दृश्य से।",
  },

  closing: {
    title: "“क्या यह सचमुच वैध है?”, विस्तृत उत्तर",
    body: "हमारा पक्ष, हम क्या वचन दे सकते हैं, क्या नहीं, कौन-से दावे हम कभी नहीं करेंगे, और क्या अभी तय नहीं हुआ, पूरा लिखा हुआ है।",
    ethicsLabel: "हमारा पक्ष पढ़िए",
    faqLabel: "लोग जो पूछते हैं",
  },
} } satisfies Record<Lang, typeof howEn>;

/* ------------------------------------------------------------------ faq --- */

const faqEn = {
  meta: {
    title: "Questions, including the sceptical ones · Snanify",
    description:
      "Does this actually work? How do I know you did it? Is this against tradition? What if I have no gotra? Plain answers, including the ones where the honest answer is that we cannot promise.",
  },
  eyebrow: "Questions",
  title: "Questions, including the ones we would rather not be asked.",
  lede: "If the honest answer is that we cannot promise something, the answer below says exactly that. Nothing here is written to close a sale.",
  indexLabel: "Sections",
  moreLabel: "Read the long answer",

  groups: [
    {
      id: "hard",
      title: "The hard questions",
      items: [
        {
          id: "does-it-work",
          q: "Does this actually work?",
          a: [
            "We cannot answer that, and we will not pretend to.",
            "What we can tell you is exactly what happens: a qualified officiant performs a snan-sankalp at a named ghat, at a named hour, in your name and your gotra, and we give you an unedited recording and a record that anyone can verify. That much is a fact about the world and you can check it.",
            "Whether a rite performed by a purohit on your behalf carries what you hope it carries is a question for your tradition, and for people whose judgement you trust in these matters, not for a company that profits when the answer is yes.",
          ],
        },
        {
          id: "scam",
          q: "How do I know this is not a scam?",
          a: [
            "Partly by what we can prove, and partly by what we refuse to say.",
            "The proof: a fingerprint of your sankalp published before the rite, a slate on camera carrying a number that did not exist the previous day, one continuous take, and a public record you can check in your own browser without an account.",
            "The refusal is the stronger signal. We publish a list of claims we will never make, no washed-away sins, no moksha, no dosha in your chart, no restless ancestors, no outcome in your life, and an address to report us if we ever break it. A business selling fake punya would not publish that list, because the list is the whole product they would be selling.",
          ],
        },
        {
          id: "proof",
          q: "How do I know you actually did it, and did it for me?",
          a: [
            "Five things, and none of them require trusting us. Before the rite, we publish a fingerprint of your sankalp, so it cannot be back-dated. At the ghat, the officiant holds up a slate with your rite code and that day's public anchor number, footage shot earlier cannot show it. The rite is one continuous take with no cuts, machine-checked. Afterwards, the recording's fingerprint goes into a public record with the times and the ghat. And anyone at all can drag the video file into our verification page and be told whether it is the file we recorded; the check runs in their browser, and the file never leaves their computer.",
            "Your name is spoken aloud, individually, and we write down the exact second. Your recording opens there.",
          ],
        },
        {
          id: "tradition",
          q: "Is this against tradition?",
          a: [
            "Some of it has clear precedent. The sankalp is, by its own grammar, a naming, it fixes place, time, lineage and person, and has never required that the person be standing there. Hindu ritual has always separated the sponsor of a rite from its performer. Temples have accepted archana and seva booked from another city for a very long time.",
            "Some of it does not. Traditions genuinely disagree about whether a rite watched through a screen is witnessed at all. Some acharyas accept mediated darshan; some do not. We take no side, and we will not quote only the ones who agree with us.",
            "So: ask someone whose judgement you trust in these matters. If they say it is not for you, they are right, and we are not offended.",
          ],
        },
        {
          id: "same-as-bathing",
          q: "Is this the same as bathing in the river myself?",
          a: [
            "No. Not close, and we will never say otherwise.",
            "Snan is an act of the body, and it is not happening to your body. The journey is part of the pilgrimage, and we cannot give you the journey. What is performed is the sankalp and the rite that follows it, by the officiant, in your name.",
            "If you can make the journey, make it. We will not say a word against it.",
          ],
        },
        {
          id: "punya",
          q: "Do I get more punya if I pay more?",
          a: [
            "No, and anyone who tells you otherwise is selling the thing we refuse to sell.",
            "The offerings differ in what we do for you, how many rites, how many names, whether the segment is shared or private. They do not differ in what a rite is worth. Twelve snans are twelve rites, not more merit per rite.",
          ],
        },
        {
          id: "priest",
          q: "Who actually performs it? Is he a real priest?",
          a: [
            "Every officiant is engaged directly by Snanify on a written contract, in his own language, with a signed copy in his hand. Not a marketplace, not gig work.",
            "There is no certifying board for ghat purohits, so we will not print a badge that means nothing. Instead each officiant's page states what we verified, identity, years of practice at that ghat, attestation from other purohits there, a recorded assessment, and, in the same block, what we could not verify and why.",
            "Today there are no officiants published on this site. Nobody has signed and consented to be named, and we will never fill that gap with a stock photograph of a priest.",
          ],
        },
      ],
    },
    {
      id: "receive",
      title: "What you actually get",
      items: [
        {
          id: "shipping",
          q: "Do you send me Ganga jal, or prasad?",
          a: [
            "No. Nothing is shipped to you, ever.",
            "Everything Snanify gives you is digital: the recording, the Sankalp Patra, and a record anyone can verify. No water, no prasad, no thread, no ash, no parcel, no customs form.",
            "If what you want is Ganga jal in your hand, we are not the service for that.",
          ],
        },
        {
          id: "patra",
          q: "What is a Sankalp Patra?",
          a: [
            "A signed digital certificate recording what was done: the names and gotras, the water, the ghat, the date, the window in IST and in your own timezone, the officiant's name, the rite code, the sankalp seal, and a code that takes anyone to the verification page.",
            "It carries a line that cannot be removed: “This is a record of a rite performed and recorded. It is not a claim about its fruit.”",
            "It is deliberately not designed to look like a temple document. It does not borrow any temple's seal, styling or name, because it is the thing families frame and show to their own purohit, and it must not be mistaken for something it is not.",
          ],
        },
        {
          id: "recording",
          q: "What is in the video?",
          a: [
            "Your own excerpt: it opens a few seconds before your name is spoken and runs through your recitation and the dip. We write down the exact second your name is said.",
            "It contains your names and no one else's. The full segment exists, and it is released only if every family in it agrees.",
          ],
        },
        {
          id: "live",
          q: "Do I have to watch it live?",
          a: [
            "No. Many people are eleven hours away and asleep, and nothing is lost by that.",
            "The stream is a courtesy. The recording is the thing we owe you, and it is captured locally at the ghat whether or not the connection holds. If the stream drops, you have the recording within six hours and a quarter of the fee back if you want it.",
          ],
        },
        {
          id: "who-else",
          q: "Who else will hear my name?",
          a: [
            "In a shared segment, up to eleven sankalps are offered, and every family present hears the others' names and gotras. We tell you that plainly before you pay rather than after you notice.",
            "That is why what we hand you is your own excerpt, with only your names in it, and why your sankalp is offered silently unless you ask for it aloud. If you do ask, the checkout says in one sentence who will hear it.",
            "The public record says how many sankalps shared your segment. If eleven names shared it, the record says eleven.",
          ],
        },
        {
          id: "private",
          q: "Can I have a rite that is only mine?",
          a: [
            "Yes, a private rite, one sankalp, one segment, no other family's name in the recording.",
            "We would rather sell you that than let you assume the shared one is private. Your rite is not private unless you buy a private rite, and that sentence is on our ethics page in exactly those words.",
          ],
        },
      ],
    },
    {
      id: "booking",
      title: "Booking, timing and money",
      items: [
        {
          id: "account",
          q: "Do I need an account?",
          a: [
            "No. You can book without one. The confirmation email carries a link that claims the booking whenever you want it, and there is no password to forget.",
          ],
        },
        {
          id: "timing",
          q: "Why do you not show exact muhurat timings?",
          a: [
            "Because we have not yet named a panchang source, and a precise time with nothing behind it is an invented fact.",
            "Until a source is named you will see the occasion and not a clock time. When exact timings appear they will carry the method, the ayanamsa and the coordinates of the ghat itself, and where sources disagree by more than a few minutes, we will show the range rather than pick the one that suits us.",
          ],
        },
        {
          id: "timezone",
          q: "What time will it be where I am?",
          a: [
            "Every window is shown in IST and converted to wherever you are, at booking and on the certificate. If you want to be awake for it, we send a reminder fifteen minutes before and again at two minutes.",
          ],
        },
        {
          id: "paying-for",
          q: "What am I actually paying for?",
          a: [
            "The arrangement, the officiant's work, the recording, and the record. A service, and its proof.",
            "Not a blessing, not an outcome, and not a quantity of merit. We publish what the officiant is paid and what share of the money reaches him, and all of any dakshina you add goes to him and none to us.",
          ],
        },
        {
          id: "refund",
          q: "Can I get a refund?",
          a: [
            "Yes. Before the rite: the whole fee back up to twenty-four hours before the window, half within it, because by then the officiant is scheduled and paid.",
            "After the rite: if you are unhappy for any reason, we refund the fee within fourteen days without asking why. One button, no telephone call, no retention offer, and no question at the end asking whether you are sure.",
            "One honest caveat: we are refunding what you paid us for arranging, performing and recording the rite. We are not undoing the rite. It happened, the officiant is paid in full, and the record of it stays. A rite is not a returnable good.",
          ],
        },
        {
          id: "failure",
          q: "What if the stream drops, or the rite does not happen?",
          a: [
            "If the stream drops but the rite was recorded: the recording within six hours, and a quarter of the fee back on one click if you want it.",
            "If the rite did not happen: we tell you before you ask. Then you choose, performed again at the next equivalent muhurat at no cost, or the whole fee back.",
            "If the ghat is closed or the water is unsafe: we tell you before the window and offer another ghat, another river, another muhurat, or your money back. We never quietly substitute one river for another.",
          ],
        },
      ],
    },
    {
      id: "family",
      title: "Names, gotra and family",
      items: [
        {
          id: "gotra",
          q: "I do not know my gotra, or my family does not use one.",
          a: [
            "Then leave it blank. A form that insists on a gotra is a form that sorts people by caste, and ours does not insist.",
            "If the field is empty the sankalp uses the customary Kashyapa gotra, which is the ordinary practice for exactly this situation. If your family has its own convention, tell us and we will use that instead.",
          ],
        },
        {
          id: "names",
          q: "Can I include several people? What if they have different gotras?",
          a: [
            "Yes, and yes. Each name may carry its own gotra, because households are not uniform, a woman who married in, an adopted child, an inter-caste marriage. One gotra imposed on six names would produce a sankalp that is simply wrong for most families.",
            "You will be asked to confirm that anyone living whom you name would not object. If they later ask us to remove their details, we do it, without asking your permission first.",
          ],
        },
        {
          id: "ancestors",
          q: "Can I do this for someone who has died?",
          a: [
            "You can ask for a tarpan in remembrance, and we will label it exactly that.",
            "It is not a shraddh. We do not perform the obligatory rites of the life cycle, we do not immerse actual ashes, and we do not perform any rite where your own physical presence is prescribed. Tarpan in remembrance is a different and smaller thing, and we will keep saying so rather than let you assume otherwise.",
            "We will never say that anyone who has died received anything, was affected by anything, or is waiting for anything.",
          ],
        },
        {
          id: "who-can-book",
          q: "I am not Hindu, or my family is inter-faith, or my name is not a Hindu name. Can I book?",
          a: [
            "Yes. People book for a Hindu parent, for a spouse, for a friend, for themselves.",
            "An officiant may decline a sankalp he does not wish to speak on grounds of the rite itself, and he is paid anyway, consent that has been bought is not consent. But he may not decline you for who you are: not your caste, religion, gender, marital status, sexuality, the name you carry, or the absence of a gotra. Every refusal is logged with a reason and audited, and you are never told that a priest declined you. We simply arrange another officiant, at once, at no cost.",
          ],
        },
        {
          id: "pronunciation",
          q: "Will they say my name correctly?",
          a: [
            "You can record twenty seconds of your own voice saying the names and the gotra when you book. The officiant listens to it before the rite.",
            "If a name is still said wrongly, one tap has it recited again, free, without an argument.",
          ],
        },
      ],
    },
    {
      id: "data",
      title: "Your data",
      items: [
        {
          id: "sankalp-private",
          q: "Who reads my sankalp?",
          a: [
            "By default, nobody, not even the officiant. He states that the rite is offered for the intention you hold. He reads your words aloud only if you ask, and that box is never ticked for you.",
            "Nobody at Snanify browses sankalps. Reading one requires two approvals and a written reason, it is logged permanently, and you are emailed within a day telling you that it was read, by whom, and why.",
            "One automated safety check runs over the text; no person sees it as a result. If the text suggests someone may be in danger, you get a message with places you can call, written so that nothing in it implies a person read your words, because none did.",
          ],
        },
        {
          id: "delete",
          q: "Can I delete everything?",
          a: [
            "Yes. One button, across copies and backups, within seven days. Your sankalp text is deleted ninety days after the rite by default in any case, or within twenty-four hours if you prefer.",
            "The confirmation lists what was deleted and what was kept, the invoices tax law requires, and the anonymous record entry, and why.",
            "One thing to know: if you asked for your sankalp to be read aloud, it is in a permanent recording, and deleting the text does not remove it from the audio. We say that on the checkbox, and we offer to delete the recording with it.",
          ],
        },
        {
          id: "ledger",
          q: "Is my name in your public record?",
          a: [
            "No, and it never can be. The record contains fingerprints, times, the ghat, an opaque officiant identifier and the status of the rite. There is no field in it that could hold a name, a gotra or a sankalp.",
            "That is what lets the proof be permanent while your data is not: even after everything of yours is deleted, the file you downloaded still verifies against the record.",
          ],
        },
        {
          id: "verify-fail",
          q: "I checked my video and it says it does not match.",
          a: [
            "Almost always this means the file was forwarded. WhatsApp, Telegram and most phones recompress video when it is shared, which changes every byte and therefore the fingerprint. That is the messenger, not a forgery.",
            "Download the original from your rite page and check that one. We publish a separate fingerprint for each version we hand you, and there is a sample rite you can practise on before you need it.",
            "If the original still does not match, write to us and we will investigate publicly rather than quietly.",
          ],
        },
        {
          id: "tracking",
          q: "What is tracking me on this site?",
          a: [
            "No advertising script and no session-replay script, anywhere, ever. Nothing records the screen where you type your sankalp.",
            "Two third-party scripts exist in the whole product, and we name both. Vercel Web Analytics counts page views: no cookies, no cross-site following, no sight of any form. The payment processor's script runs on the payment step alone. We would rather qualify an absolute than break one.",
          ],
        },
      ],
    },
  ],

  closing: {
    title: "Not answered here?",
    body: "Write to us. If it is a question others will have, we will add it to this page, and if you think we have got something wrong, we publish objections made in good faith along with what we did about them.",
    mailLabel: "Write to us",
  },
};

export const faqContent = { en: faqEn, hi: {
  meta: {
    title: "प्रश्न, संशय के प्रश्न भी · स्नानिफ़ाई",
    description:
      "क्या यह सचमुच काम करता है? मुझे कैसे पता चले कि आपने किया? क्या यह परंपरा के विरुद्ध है? गोत्र न हो तो? सीधे उत्तर, वे भी जहाँ सच्चा उत्तर यही है कि हम वचन नहीं दे सकते।",
  },
  eyebrow: "प्रश्न",
  title: "प्रश्न, वे भी जो हमसे न पूछे जाएँ तो अच्छा लगता।",
  lede: "जहाँ सच्चा उत्तर यह है कि हम कोई वचन नहीं दे सकते, वहाँ उत्तर ठीक यही कहता है। यहाँ कुछ भी सौदा पक्का करने के लिए नहीं लिखा गया।",
  indexLabel: "खंड",
  moreLabel: "विस्तृत उत्तर पढ़िए",

  groups: [
    {
      id: "hard",
      title: "कठिन प्रश्न",
      items: [
        {
          id: "does-it-work",
          q: "क्या इससे सचमुच कुछ होता है?",
          a: [
            "इसका उत्तर हम नहीं दे सकते, और देने का दिखावा भी नहीं करेंगे।",
            "हम इतना बता सकते हैं कि होता क्या है: योग्य पुरोहित निर्दिष्ट घाट पर, निर्दिष्ट घड़ी में, आपके नाम और गोत्र से स्नान-संकल्प संपन्न कराते हैं, और हम आपको बिना काटी हुई रिकॉर्डिंग तथा ऐसा अभिलेख देते हैं जिसे कोई भी जाँच सके। इतना संसार का तथ्य है और आप इसे परख सकते हैं।",
            "पर आपके निमित्त पुरोहित द्वारा किया गया अनुष्ठान वह फल रखता है या नहीं जिसकी आप आशा करते हैं, यह प्रश्न आपकी परंपरा का है, और उन लोगों का जिनके विवेक पर आप इन विषयों में भरोसा करते हैं; उस कंपनी का नहीं जिसे उत्तर “हाँ” होने पर लाभ मिलता है।",
          ],
        },
        {
          id: "scam",
          q: "मुझे कैसे पता चले कि यह ठगी नहीं है?",
          a: [
            "कुछ इससे कि हम क्या सिद्ध कर सकते हैं, और कुछ इससे कि हम क्या कहने से इनकार करते हैं।",
            "प्रमाण: अनुष्ठान से पहले प्रकाशित आपके संकल्प की छाप, कैमरे पर वह पट्टिका जिस पर एक दिन पहले तक अस्तित्वहीन अंक है, एक अखंड दृश्य, और एक सार्वजनिक अभिलेख जिसे आप बिना खाता बनाए अपने ब्राउज़र में जाँच सकते हैं।",
            "पर इनकार अधिक बड़ा संकेत है। हम उन दावों की सूची प्रकाशित करते हैं जो हम कभी नहीं करेंगे, न धुले पाप, न मोक्ष, न कुंडली का दोष, न अतृप्त पूर्वज, न आपके जीवन में कोई परिणाम, और साथ में वह पता भी जहाँ हमारी शिकायत की जा सके। नक़ली पुण्य बेचने वाला व्यापार यह सूची कभी नहीं छापेगा, क्योंकि वही सूची उसका पूरा माल है।",
          ],
        },
        {
          id: "proof",
          q: "मुझे कैसे पता चले कि आपने सचमुच किया, और मेरे लिए किया?",
          a: [
            "पाँच बातें, और इनमें से किसी के लिए हम पर विश्वास आवश्यक नहीं। अनुष्ठान से पहले हम आपके संकल्प की छाप प्रकाशित करते हैं, इसलिए उसे पीछे की तिथि में गढ़ा नहीं जा सकता। घाट पर पुरोहित पट्टिका दिखाते हैं जिस पर आपका अनुष्ठान कोड और उस दिन का सार्वजनिक अंक है, पहले बना कोई दृश्य उसे दिखा नहीं सकता। अनुष्ठान एक अखंड दृश्य है, बिना कट, और यंत्र इसकी जाँच करता है। बाद में रिकॉर्डिंग की छाप समयों और घाट के साथ सार्वजनिक अभिलेख में जाती है। और कोई भी व्यक्ति वीडियो फ़ाइल जाँच-पृष्ठ पर खींचकर जान सकता है कि यह वही फ़ाइल है या नहीं, जाँच उनके ब्राउज़र में चलती है और फ़ाइल कहीं नहीं भेजी जाती।",
            "आपका नाम अलग से, स्पष्ट स्वर में बोला जाता है, और हम वह सेकंड लिख लेते हैं। आपकी रिकॉर्डिंग वहीं से खुलती है।",
          ],
        },
        {
          id: "tradition",
          q: "क्या यह परंपरा के विरुद्ध है?",
          a: [
            "कुछ बातों का स्पष्ट आधार है। संकल्प अपने स्वरूप में ही एक नामकरण है, वह देश, काल, गोत्र और व्यक्ति निश्चित करता है, और उसने कभी यह नहीं माँगा कि व्यक्ति वहीं खड़ा हो। कर्मकांड में यजमान और पुरोहित सदा अलग रहे हैं। मंदिर बहुत समय से दूसरे नगर से बुक की गई अर्चना और सेवा स्वीकार करते आए हैं।",
            "कुछ बातों का नहीं। पर्दे पर देखा गया अनुष्ठान वस्तुतः देखा गया माना जाए या नहीं, इस पर परंपराओं में सच्चा मतभेद है। कुछ आचार्य स्वीकार करते हैं, कुछ नहीं। हम कोई पक्ष नहीं लेते, और केवल सहमत लोगों को उद्धृत नहीं करेंगे।",
            "इसलिए: जिनके विवेक पर आप इन विषयों में भरोसा करते हैं, उनसे पूछिए। यदि वे कहें कि यह आपके लिए नहीं, तो वे ठीक कहते हैं, और हमें बुरा नहीं लगेगा।",
          ],
        },
        {
          id: "same-as-bathing",
          q: "क्या यह स्वयं नदी में स्नान करने के समान है?",
          a: [
            "नहीं। कहीं से नहीं, और हम कभी इसका उलटा नहीं कहेंगे।",
            "स्नान देह का कर्म है, और वह आपकी देह पर नहीं हो रहा। यात्रा भी तीर्थ का अंग है, और यात्रा हम आपको नहीं दे सकते। जो संपन्न होता है वह संकल्प है और उसके पश्चात का अनुष्ठान, पुरोहित द्वारा, आपके नाम से।",
            "यदि आप यात्रा कर सकते हैं, अवश्य कीजिए। हम उसके विरुद्ध एक शब्द नहीं कहेंगे।",
          ],
        },
        {
          id: "punya",
          q: "अधिक राशि देने पर अधिक पुण्य मिलता है क्या?",
          a: [
            "नहीं। और जो आपसे इसका उलटा कहे, वह ठीक वही बेच रहा है जिसे बेचने से हम इनकार करते हैं।",
            "हमारे अर्पण इसमें भिन्न हैं कि हम आपके लिए क्या करते हैं, कितने अनुष्ठान, कितने नाम, खंड साझा है या निजी। वे इसमें भिन्न नहीं कि अनुष्ठान का मूल्य क्या है। बारह स्नान बारह अनुष्ठान हैं, प्रति अनुष्ठान अधिक पुण्य नहीं।",
          ],
        },
        {
          id: "priest",
          q: "अनुष्ठान वास्तव में कौन करता है? क्या वे सचमुच पुरोहित हैं?",
          a: [
            "हर पुरोहित सीधे स्नानिफ़ाई से, लिखित अनुबंध पर, उनकी अपनी भाषा में जुड़ते हैं, और हस्ताक्षरित प्रति उनके हाथ में रहती है। न कोई मंडी, न दिहाड़ी काम।",
            "घाट के पुरोहितों के लिए कोई प्रमाणन संस्था नहीं है, इसलिए हम ऐसी मुहर नहीं छापेंगे जिसका कोई अर्थ न हो। इसके बदले हर पुरोहित के पृष्ठ पर लिखा रहता है कि हमने क्या सत्यापित किया, पहचान, उस घाट पर अभ्यास के वर्ष, वहाँ के अन्य पुरोहितों की गवाही, रिकॉर्ड की गई विधि-परीक्षा, और उसी खंड में यह भी कि क्या हम सत्यापित नहीं कर सके, और क्यों।",
            "आज इस साइट पर कोई पुरोहित प्रकाशित नहीं है। किसी ने अभी हस्ताक्षर करके नाम छापने की सहमति नहीं दी, और उस रिक्त स्थान को हम किसी तैयार चित्र से कभी नहीं भरेंगे।",
          ],
        },
      ],
    },
    {
      id: "receive",
      title: "आपको वास्तव में क्या मिलता है",
      items: [
        {
          id: "shipping",
          q: "क्या आप गंगाजल या प्रसाद भेजते हैं?",
          a: [
            "नहीं। आपके पास कुछ भी नहीं भेजा जाता, कभी नहीं।",
            "स्नानिफ़ाई जो देती है वह सब डिजिटल है: रिकॉर्डिंग, संकल्प पत्र, और एक अभिलेख जिसे कोई भी जाँच सके। न जल, न प्रसाद, न मौली, न भस्म, न पार्सल, न कोई सीमा-शुल्क फ़ॉर्म।",
            "यदि आपको हाथ में गंगाजल चाहिए, तो हम उसकी सेवा नहीं हैं।",
          ],
        },
        {
          id: "patra",
          q: "संकल्प पत्र क्या है?",
          a: [
            "एक हस्ताक्षरित डिजिटल प्रमाणपत्र, जिसमें दर्ज रहता है कि क्या हुआ: नाम और गोत्र, जल, घाट, तिथि, मुहूर्त भारतीय समय में और आपके अपने समय में, पुरोहित का नाम, अनुष्ठान कोड, संकल्प चिह्न, और एक कोड जो किसी को भी जाँच-पृष्ठ तक ले जाता है।",
            "उस पर एक पंक्ति रहती है जो हटाई नहीं जा सकती: “यह संपन्न एवं अभिलिखित अनुष्ठान का प्रमाण है। इसके फल का दावा नहीं।”",
            "वह जानबूझकर मंदिर के दस्तावेज़ जैसा नहीं दिखता। वह किसी मंदिर की मुहर, शैली या नाम उधार नहीं लेता, क्योंकि यही वह पत्र है जिसे परिवार फ़्रेम कराकर अपने पुरोहित को दिखाते हैं, और उसे किसी और वस्तु के भ्रम में नहीं पड़ना चाहिए।",
          ],
        },
        {
          id: "recording",
          q: "वीडियो में क्या रहता है?",
          a: [
            "आपका अपना अंश: वह आपका नाम बोले जाने से कुछ सेकंड पहले आरंभ होता है और आपके पाठ तथा डुबकी तक चलता है। आपका नाम जिस सेकंड पर बोला गया, वह हम लिख देते हैं।",
            "उसमें आपके नाम हैं, किसी और के नहीं। पूरा खंड रहता है, और वह तभी दिया जाता है जब उसमें सम्मिलित हर परिवार सहमत हो।",
          ],
        },
        {
          id: "live",
          q: "क्या सजीव देखना आवश्यक है?",
          a: [
            "नहीं। बहुत लोग ग्यारह घंटे दूर हैं और उस समय सो रहे होते हैं; इससे कुछ नहीं खोता।",
            "प्रसारण एक शिष्टाचार है। हम पर आपका अधिकार रिकॉर्डिंग का है, और वह घाट पर उपकरण में ही दर्ज होती है, संपर्क बना रहे या न रहे। प्रसारण टूटे तो छह घंटे में रिकॉर्डिंग आपके पास होती है, और चाहें तो एक चौथाई राशि वापस।",
          ],
        },
        {
          id: "who-else",
          q: "मेरा नाम और कौन सुनेगा?",
          a: [
            "साझा खंड में ग्यारह संकल्प तक अर्पित होते हैं, और वहाँ उपस्थित हर परिवार शेष के नाम और गोत्र सुनता है। यह हम भुगतान से पहले साफ़ कह देते हैं, आपके ध्यान में आने के बाद नहीं।",
            "इसीलिए हम आपको आपका अपना अंश देते हैं, जिसमें केवल आपके नाम हैं; और इसीलिए आपका संकल्प मौन रूप से अर्पित होता है, जब तक आप ऊँचे स्वर में न कहलवाएँ। यदि कहलवाएँ, तो भुगतान से पहले एक वाक्य बताता है कि उसे कौन सुनेगा।",
            "सार्वजनिक अभिलेख बताता है कि आपके खंड में कितने संकल्प थे। यदि ग्यारह थे, तो अभिलेख ग्यारह ही कहेगा।",
          ],
        },
        {
          id: "private",
          q: "क्या केवल मेरा अपना अनुष्ठान हो सकता है?",
          a: [
            "हाँ, निजी अनुष्ठान: एक संकल्प, एक खंड, रिकॉर्डिंग में किसी अन्य परिवार का नाम नहीं।",
            "हम चाहेंगे कि आप वही लें, बजाय इसके कि आप साझा वाले को निजी मान बैठें। आपका अनुष्ठान तब तक निजी नहीं जब तक आप निजी अनुष्ठान न लें, और यह वाक्य हमारे पक्ष वाले पृष्ठ पर इन्हीं शब्दों में लिखा है।",
          ],
        },
      ],
    },
    {
      id: "booking",
      title: "बुकिंग, समय और राशि",
      items: [
        {
          id: "account",
          q: "क्या खाता बनाना आवश्यक है?",
          a: [
            "नहीं। आप बिना खाते के बुक कर सकते हैं। पुष्टि-ईमेल में एक कड़ी रहती है जिससे आप जब चाहें बुकिंग अपने नाम कर लें, और कोई पासवर्ड भूलने को नहीं रहता।",
          ],
        },
        {
          id: "timing",
          q: "आप सटीक मुहूर्त-समय क्यों नहीं दिखाते?",
          a: [
            "क्योंकि हमने अभी कोई पंचांग स्रोत तय नहीं किया, और जिस सटीक समय के पीछे कुछ न हो वह गढ़ा हुआ तथ्य है।",
            "जब तक स्रोत तय न हो, आपको पर्व दिखेगा, घड़ी का समय नहीं। जब सटीक समय आएँगे, उनके साथ गणना-पद्धति, अयनांश और घाट के अपने निर्देशांक होंगे, और जहाँ स्रोत कुछ मिनटों से अधिक भिन्न हों, वहाँ हम अपने अनुकूल समय चुनने के बजाय पूरी सीमा दिखाएँगे।",
          ],
        },
        {
          id: "timezone",
          q: "मेरे यहाँ उस समय कितने बजे होंगे?",
          a: [
            "हर मुहूर्त भारतीय समय में और आपके अपने समय में दिखाया जाता है, बुकिंग के समय भी, प्रमाणपत्र पर भी। जागकर साथ रहना चाहें तो हम पंद्रह मिनट पहले और फिर दो मिनट पहले स्मरण भेजते हैं।",
          ],
        },
        {
          id: "paying-for",
          q: "मैं वास्तव में किसका भुगतान कर रहा हूँ?",
          a: [
            "व्यवस्था, पुरोहित के श्रम, रिकॉर्डिंग और अभिलेख का। एक सेवा, और उसका प्रमाण।",
            "किसी आशीर्वाद का नहीं, किसी परिणाम का नहीं, और पुण्य की किसी मात्रा का नहीं। पुरोहित को कितना मिलता है और आय का कितना भाग उन तक पहुँचता है, यह हम प्रकाशित करते हैं; और आप जो दक्षिणा जोड़ते हैं वह पूरी उन्हीं तक जाती है, हम तक कुछ नहीं।",
          ],
        },
        {
          id: "refund",
          q: "क्या राशि वापस मिल सकती है?",
          a: [
            "हाँ। अनुष्ठान से पहले: मुहूर्त से चौबीस घंटे पहले तक पूरी राशि, उसके भीतर आधी, क्योंकि तब तक पुरोहित नियत और भुगतान-प्राप्त हो चुके होते हैं।",
            "अनुष्ठान के बाद: यदि आप किसी भी कारण असंतुष्ट हों, तो चौदह दिन के भीतर, कारण पूछे बिना, राशि वापस। एक बटन, न फ़ोन, न रोकने का कोई प्रस्ताव, न अंत में यह प्रश्न कि आप निश्चित हैं या नहीं।",
            "एक सच्ची बात: हम वह लौटा रहे हैं जो आपने व्यवस्था, अनुष्ठान और रिकॉर्डिंग के लिए दिया। हम अनुष्ठान को पलट नहीं रहे। वह हुआ, पुरोहित को पूरा भुगतान हुआ, और उसका अभिलेख यथावत रहता है। अनुष्ठान लौटाई जाने वाली वस्तु नहीं है।",
          ],
        },
        {
          id: "failure",
          q: "यदि प्रसारण टूट जाए, या अनुष्ठान हो ही न सके?",
          a: [
            "प्रसारण टूटा पर अनुष्ठान रिकॉर्ड हुआ: छह घंटे में रिकॉर्डिंग, और चाहें तो एक क्लिक पर एक चौथाई राशि वापस।",
            "अनुष्ठान हुआ ही नहीं: आपके पूछने से पहले हम बताएँगे। फिर चुनाव आपका, अगले समान मुहूर्त में निःशुल्क पुनः, या पूरी राशि वापस।",
            "घाट बंद हो या जल असुरक्षित: मुहूर्त से पहले बताएँगे और दूसरा घाट, दूसरी नदी, दूसरा मुहूर्त, या पूरी वापसी प्रस्तुत करेंगे। एक नदी के बदले चुपचाप दूसरी कभी नहीं।",
          ],
        },
      ],
    },
    {
      id: "family",
      title: "नाम, गोत्र और परिवार",
      items: [
        {
          id: "gotra",
          q: "मुझे अपना गोत्र नहीं मालूम, या मेरा परिवार गोत्र नहीं मानता।",
          a: [
            "तो उसे रिक्त छोड़ दीजिए। जो फ़ॉर्म गोत्र पर अड़ता है, वह लोगों को जाति से छाँटने वाला फ़ॉर्म है; हमारा नहीं अड़ता।",
            "खाना रिक्त हो तो संकल्प में प्रचलित कश्यप गोत्र लिया जाता है, जो ठीक ऐसी ही स्थिति की सामान्य परिपाटी है। यदि आपके परिवार की अपनी परिपाटी हो, बता दीजिए, हम वही लेंगे।",
          ],
        },
        {
          id: "names",
          q: "क्या कई लोगों को जोड़ सकते हैं? यदि उनके गोत्र अलग हों तो?",
          a: [
            "हाँ, और हाँ। हर नाम का अपना गोत्र हो सकता है, क्योंकि घर एकरूप नहीं होते, विवाह कर आई स्त्री, गोद लिया बच्चा, अंतर्जातीय विवाह। छह नामों पर एक ही गोत्र थोप देना अधिकांश परिवारों के लिए ग़लत संकल्प बनाता।",
            "जिन जीवित व्यक्तियों का नाम आप देते हैं, उनके विषय में आपसे पुष्टि माँगी जाती है कि उन्हें आपत्ति न होगी। यदि वे बाद में अपनी सूचना हटाने को कहें, तो हम हटा देते हैं, आपकी अनुमति लिए बिना।",
          ],
        },
        {
          id: "ancestors",
          q: "क्या यह किसी दिवंगत के लिए किया जा सकता है?",
          a: [
            "आप स्मरण-तर्पण करा सकते हैं, और हम उसे ठीक इसी नाम से अंकित करेंगे।",
            "यह श्राद्ध नहीं है। हम जीवन के अनिवार्य संस्कार नहीं करते, अस्थि-विसर्जन नहीं करते, और कोई ऐसा अनुष्ठान नहीं करते जहाँ आपकी अपनी उपस्थिति विहित हो। स्मरण-तर्पण भिन्न और छोटी वस्तु है, और हम यह कहते रहेंगे, यह नहीं होने देंगे कि आप कुछ और मान लें।",
            "हम कभी नहीं कहेंगे कि किसी दिवंगत को कुछ प्राप्त हुआ, उन पर कुछ प्रभाव पड़ा, या वे किसी की प्रतीक्षा में हैं।",
          ],
        },
        {
          id: "who-can-book",
          q: "मैं हिंदू नहीं हूँ, या मेरा परिवार अंतर-धार्मिक है, या मेरा नाम हिंदू नाम नहीं है। क्या मैं बुक कर सकता हूँ?",
          a: [
            "हाँ। लोग अपने हिंदू माता-पिता के लिए, जीवनसाथी के लिए, मित्र के लिए, और अपने लिए बुक करते हैं।",
            "पुरोहित किसी संकल्प को बोलने से, अनुष्ठान के आधार पर, मना कर सकते हैं, और भुगतान फिर भी होता है; ख़रीदी हुई सहमति सहमति नहीं होती। पर वे आपको इसलिए मना नहीं कर सकते कि आप कौन हैं: न जाति, न धर्म, न लिंग, न वैवाहिक स्थिति, न यौन रुझान, न आपका नाम, न गोत्र का न होना। हर इनकार कारण सहित दर्ज और लेखा-परीक्षित होता है, और आपको यह कभी नहीं बताया जाता कि किसी पुरोहित ने मना किया। हम तुरंत, बिना अतिरिक्त शुल्क, दूसरे पुरोहित की व्यवस्था कर देते हैं।",
          ],
        },
        {
          id: "pronunciation",
          q: "क्या वे मेरा नाम ठीक बोलेंगे?",
          a: [
            "बुकिंग के समय आप बीस सेकंड अपने स्वर में नाम और गोत्र रिकॉर्ड कर सकते हैं। पुरोहित अनुष्ठान से पहले उसे सुनते हैं।",
            "यदि फिर भी नाम ग़लत बोला जाए, तो एक स्पर्श से वह दोबारा, निःशुल्क, बिना बहस के पढ़ा जाता है।",
          ],
        },
      ],
    },
    {
      id: "data",
      title: "आपकी सूचना",
      items: [
        {
          id: "sankalp-private",
          q: "मेरा संकल्प कौन पढ़ता है?",
          a: [
            "सामान्यतः कोई नहीं, पुरोहित भी नहीं। वे कहते हैं कि अनुष्ठान आपके मन में धारित संकल्प हेतु है। आपके शब्द वे तभी पढ़ते हैं जब आप कहें, और वह डिब्बी आपके लिए पहले से चुनी हुई कभी नहीं होती।",
            "स्नानिफ़ाई में कोई संकल्प यूँ ही नहीं पढ़ता। पढ़ने के लिए दो अनुमतियाँ और लिखित कारण चाहिए, वह स्थायी रूप से दर्ज होता है, और एक दिन के भीतर आपको सूचित किया जाता है कि पढ़ा गया, किसने और क्यों।",
            "पाठ पर एक स्वचालित सुरक्षा-जाँच चलती है; उसके कारण कोई व्यक्ति उसे नहीं देखता। यदि पाठ से लगे कि कोई संकट में हो सकता है, तो आपको एक संदेश मिलता है जिसमें वे स्थान लिखे होते हैं जहाँ आप बात कर सकते हैं, और वह ऐसे लिखा जाता है कि उससे यह संकेत न मिले कि किसी ने आपके शब्द पढ़े, क्योंकि किसी ने नहीं पढ़े।",
          ],
        },
        {
          id: "delete",
          q: "क्या मैं सब कुछ मिटा सकता हूँ?",
          a: [
            "हाँ। एक बटन, प्रतियों और बैकअप सहित, सात दिन के भीतर। वैसे भी आपका संकल्प-पाठ अनुष्ठान के नब्बे दिन बाद स्वतः मिट जाता है, या चाहें तो चौबीस घंटे में।",
            "पुष्टि-संदेश में लिखा रहता है कि क्या मिटा और क्या रखा गया, वे रसीदें जो कर-क़ानून माँगता है, और अनाम अभिलेख प्रविष्टि, और क्यों।",
            "एक बात जान लीजिए: यदि आपने संकल्प ऊँचे स्वर में पढ़वाया था, तो वह स्थायी रिकॉर्डिंग में है, और पाठ मिटाने से वह ध्वनि से नहीं हटता। यह हम उसी डिब्बी पर लिख देते हैं, और साथ में रिकॉर्डिंग भी मिटाने का विकल्प देते हैं।",
          ],
        },
        {
          id: "ledger",
          q: "क्या आपके सार्वजनिक अभिलेख में मेरा नाम है?",
          a: [
            "नहीं, और कभी हो भी नहीं सकता। अभिलेख में छापें, समय, घाट, पुरोहित का अपारदर्शी पहचान-अंक और अनुष्ठान की स्थिति रहती है। उसमें ऐसा कोई खाना ही नहीं जिसमें नाम, गोत्र या संकल्प रखा जा सके।",
            "इसीलिए प्रमाण स्थायी रह सकता है जबकि आपकी सूचना नहीं: आपकी हर सूचना मिट जाने के बाद भी, आपकी उतारी हुई फ़ाइल उस अभिलेख से प्रमाणित होती रहती है।",
          ],
        },
        {
          id: "verify-fail",
          q: "मैंने अपना वीडियो जाँचा और वह कहता है कि मेल नहीं खाता।",
          a: [
            "लगभग हमेशा इसका अर्थ है कि फ़ाइल आगे भेजी गई थी। WhatsApp, Telegram और अधिकांश फ़ोन साझा करते समय वीडियो को दबाकर छोटा कर देते हैं, जिससे हर बाइट बदल जाती है और छाप भी। यह संदेशवाहक का प्रभाव है, जालसाज़ी नहीं।",
            "अपने अनुष्ठान पृष्ठ से मूल फ़ाइल उतारकर उसे जाँचिए। हम आपको दी गई हर प्रति की अलग छाप प्रकाशित करते हैं, और एक नमूना अनुष्ठान भी है जिस पर आप पहले से अभ्यास कर सकते हैं।",
            "यदि मूल फ़ाइल भी मेल न खाए, तो हमें लिखिए, हम इसकी जाँच चुपचाप नहीं, सार्वजनिक रूप से करेंगे।",
          ],
        },
        {
          id: "tracking",
          q: "इस साइट पर मुझ पर नज़र क्या रख रहा है?",
          a: [
            "कोई विज्ञापन स्क्रिप्ट नहीं और कोई Vercel Web Analytics के अतिरिक्त विश्लेषण स्क्रिप्ट नहीं, और कोई स्क्रीन-रिकॉर्डिंग स्क्रिप्ट नहीं, कहीं भी, कभी भी। जिस पृष्ठ पर आप अपना संकल्प लिखते हैं, वहाँ आपकी स्क्रीन को कोई रिकॉर्ड नहीं करता।",
            "पूरे उत्पाद में केवल एक बाहरी स्क्रिप्ट है: भुगतान सेवा की, केवल भुगतान वाले चरण पर, और उसी पृष्ठ पर उसका नाम लिखा रहता है। वचन तोड़ने से अच्छा है उसे सीमित कर देना।",
          ],
        },
      ],
    },
  ],

  closing: {
    title: "उत्तर यहाँ नहीं मिला?",
    body: "हमें लिखिए। यदि यह प्रश्न औरों के मन में भी होगा, तो हम उसे इस पृष्ठ पर जोड़ देंगे, और यदि आपको लगे कि हमसे कहीं चूक हुई है, तो सद्भाव से की गई आपत्तियाँ और उन पर हमारा किया, दोनों हम प्रकाशित करते हैं।",
    mailLabel: "हमें लिखिए",
  },
} } satisfies Record<Lang, typeof faqEn>;

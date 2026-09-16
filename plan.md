# Product work, from the first real morning

Written 15 September 2026, the evening the owner bought a pack with a real card,
sat the first production morning and sent the first sheet. `build-plan.md` is
still the master spec; this file is the queue of product work it does not yet
cover, in the order it should be done. Each item says what is wrong, what done
looks like, and what it must not break. The two rules in `CLAUDE.md` apply to
every line of copy touched here.

## 1. The sitting tells you where you are

**What is wrong.** The reading screen shows the river and nothing to do, so it
reads as a broken page rather than a fifteen second pause. The breath starts on
its own. A single tap on the words is followed, eleven seconds later, by a black
screen with no warning, and the one instruction for the black screen, "Put the
phone down", is read only by screen readers. A first-time sitter is lost from
the second screen on.

**Done looks like.**

- A bar across the top of the sitting, five segments for the five parts, each
  filling with its own time, the way a story bar does. Under it, the name of
  the part the screen is on. The bar is drawn from `SITTING` in
  `src/lib/sitting-plan.ts`, so it cannot disagree with the clock.
- A "Next" button, thumb-reachable at the bottom, on the reading and on the
  breath. It moves on early; it never lengthens anything.
- The sankalp waits for the hold. The ink fills under an unbroken thumb, and
  the part ends when the fill completes rather than on the clock. The screen
  says so in one line.
- The stillness keeps its rule: it cannot be skipped and there is no timer. The
  instruction is shown for three seconds in dim ink before the screen goes
  fully black, so the black is announced rather than sprung.
- The mark stays automatic.

**Must not break.** The stillness stays unskippable. The three minute form is
still the default path for somebody who presses nothing. Hydration: the bar's
widths are numbers, never raw trigonometry.

## 2. The morning that ended on /begin. Done 15 September.

The sitting was saved; the return trip broke. `/today` judged the balance
before it looked for a morning already kept today, so once the last credit
was spent, a re-request of the page during the mark went to the pack picker.
The kept morning is now answered first, and the end of the sitting also
offers a button to the sheet. What re-requested the page is still unknown; a
locked phone waking is the likely cause, and the fix holds either way.

## 3. The Sankalp Patra page, for the person who kept it. Done 16 September.

Under the sheet now: the send button, the owner's own sankalp with one line
saying it is private, the controls under a quiet "This sheet" heading, the
print version, and one line for the record with a link to `/faq#verify`. The
"On this sheet" register and the "Check it yourself" section are gone, and the
sheet's footer keeps its address and its record line and loses the second
honesty sentence. `src/components/patra/PatraOwner.tsx`.

## 4. The sheet as it arrives in a family group. Done 16 September.

A recipient page of its own, `src/components/patra/PatraGuest.tsx`: the
sheet, one line in the small voice, the invitation to sit with their own
river. No register, no seed, no controls. Still to do inside it: the line's
water name and date come out in English on the Hindi page, because the view
carries them once; they should be set per edition.

## 5. Sending, on a phone, to WhatsApp

**What is wrong.** The send button opens only the native share sheet, with the
image attached when the browser allows it. There is no WhatsApp button, and
WhatsApp is where the sheet is going.

**Done looks like.** Three ways to send, in this order on a phone: WhatsApp
(a `wa.me` link carrying the one-line text and the page link, which WhatsApp
renders with the image card), the native share sheet with the image file as
now, and copy the link. On desktop the WhatsApp link opens WhatsApp Web. The
page's Open Graph image is the sheet at the right ratio, so the link card in
the thread is the sheet even when the file is not attached.

**Must not break.** The image-file path stays, because a message carrying the
image is better than a card. The `?new=1` auto-open after a morning stays, but
it opens the chooser above rather than the bare native sheet.

## 6. The source, said plainly. Done in part, 16 September.

The sitting's reading now says "From the European flood model, which
publishes once a day", and the sheet's "Published" cell says "European flood
model (Copernicus GloFAS)". The technical name stays where somebody checking
a figure goes: `/live`, the structured data and `/faq`. Open: the owner has
not chosen the final wording, and `/rivers` and `/live` still print the
publisher's own name in their badges.

## 7. Small things seen tonight

- The reading's source line on the sitting is one line now. Done.
- The masthead's "Your mornings" link is live. Done.
- The owner's purchase of `one` is refunded. Done.
- Sharing text and the recipient line are built once, in English, whatever
  the edition. See item 4.

## Still open from build-plan.md, owner's side

- Read the privacy and terms drafts.
- Review the prayer list for text accuracy.
- Real hero figures before launch.
- Resend key in Vercel, so reminders and receipts send.

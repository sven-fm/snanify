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

## 2. The morning that ended on /begin

**What is wrong.** After the first production sitting the page landed on
`/begin` instead of the Sankalp Patra. `/today` sends to `/begin` when the
balance is zero and no sitting is found for today, so either the morning was
never written, or it was written and the return trip re-requested `/today`.

**Done looks like.** The cause is known from the owner's two answers (is the
sitting listed on `/account`; did the phone lock during the stillness) and the
production log, and the sitting either survives a locked phone or says plainly
what happened. If the mark's request fails, the screen already says "Your
morning did not save" with a retry; a page reload mid-sitting must not lose a
morning that was already paid for.

## 3. The Sankalp Patra page, for the person who kept it

**What is wrong.** The page under the sheet is a second, apologetic version of
the sheet. "On this sheet" repeats the figures the image already shows. "Check
it yourself" explains SHA-256 hashing to somebody who just sat in silence for a
minute, and the sheet's own footer already says "Anyone can check this sheet
at". Three places on one screen argue for the sheet's honesty. That is the
violation `CLAUDE.md` describes: a page written against a critic who is not in
the room.

**Done looks like.** Under the sheet, in this order and nothing else:

1. The send button.
2. The owner's own sankalp, private, one line saying so.
3. Sharing controls (make private, print version), quieter than they are now.
4. One line, not a section, for the record: "The figures on this sheet are the
   river's published state that morning." with a link to `/faq#verify`, which
   is where the seed and the hash live. The "On this sheet" register and the
   "Check it yourself" section go.

The sheet itself keeps one attestation line in its footer and loses the second.

**Must not break.** The seed line still exists and `/faq#verify` still explains
it; the page simply stops repeating it. The print version keeps the sankalp.

## 4. The sheet as it arrives in a family group

**What is wrong.** The person it is sent to sees the owner's page, minus the
private parts: the same sheet, the same register, the same hashing lesson.
Nothing on it is written for them.

**Done looks like.** A recipient page that is a greeting rather than a
dashboard: the sheet, one line in the small voice ("Devadatta kept a sankalp
with the Ganga on 15 September"), and the invitation to sit with their own river
tomorrow. No register, no seed, no controls. The owner's page and the recipient
page are two components, not one page with conditionals.

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

## 6. The source, said plainly

**What is wrong.** "Copernicus Emergency Management Service, GloFAS" and
"modelled discharge" are the words of the data's publisher, not the words of a
reader in Haridwar or Toronto. They sound like a lab report and they are
repeated on the sitting, the sheet and the page.

**Done looks like.** One human name for the source, used everywhere the reader
is, and the technical name in one place, `/faq`, where somebody who wants to
check can follow it. Candidate: "the European flood model, read each morning".
It stays true: the figure is a model's, it is European, it is read daily. The
owner picks the wording; the rule is that a sentence about the source is a fact
about craftsmanship, one line long, and never a defence.

## 7. Small things seen tonight

- The reading's source line on the sitting screen is a paragraph; it becomes
  one line or moves to the sheet.
- "Put the phone on silent. It takes three minutes." is on the ready screen and
  is right; nothing after it says how long the next part is. Item 1 covers it.
- The masthead's "Your mornings" link now exists on every page and in the phone
  menu. Deploy it.
- The owner's real purchase of `one` is still to be refunded.

## Still open from build-plan.md, owner's side

- Read the privacy and terms drafts.
- Review the prayer list for text accuracy.
- Real hero figures before launch.
- Resend key in Vercel, so reminders and receipts send.

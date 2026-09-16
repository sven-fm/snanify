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

## 5. Sending, on a phone, to WhatsApp. Parked 16 September.

The owner tested it on the phone: the send button opens the native share
sheet with the image attached, WhatsApp is one tap inside it, and that is
good enough. A dedicated WhatsApp button and copy-link stay in the queue for
a later pass, together with the recipient line's Hindi (item 4).

## 6. The source, said plainly. Done 16 September, further than planned.

The owner's direction: the source and the word "modelled" are noise on every
surface a reader feels rather than checks. They now live only on `/rivers`,
`/live`, `/faq` and `/ethics`. The landing card, the sitting, the sheet and
its shared image, the Patra page and `/snan` show the figure plainly, with no
source line, no "modelled for" date and no publisher's name. The copy guard
fails the build if any of it comes back. `CLAUDE.md` records the rule.

## 7. Small things seen tonight

- The reading's source line on the sitting is one line now. Done.
- The masthead's "Your mornings" link is live. Done.
- The owner's purchase of `one` is refunded. Done.
- Sharing text and the recipient line are built once, in English, whatever
  the edition. See item 4.

## 8. The calendar says the day. Done 16 September.

Every occasion resolves to civil dates at the ghat's sunrise, from rules,
with lunar months named by their sankranti, kshaya tithis kept, and sign
entries timed. The muhurat pages print the dates and remake themselves
daily; the badge reads "Computed here, checked against Drik Panchang".
Open: read the dated occasions off Drik and record each match in
`docs/panchang-check.md`.

## 9. The sheet as a memento. Done 16 September.

The shared image is 1080 by 1920, phone-shaped: the ghat and its water in
one frame, the names large with the portrait beside them, the prayer, and
two figures, flow and rank, on paper with the water drawn faintly across the
whole page. The A4 sheet with every field stays as the print version on the
Patra page. Sheets rendered before keep their old image.

## Still open from build-plan.md, owner's side

- Read the privacy and terms drafts.
- Review the prayer list for text accuracy.
- Real hero figures before launch.
- Resend key in Vercel, so reminders and receipts send.

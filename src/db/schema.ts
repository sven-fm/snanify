import {
  boolean,
  date,
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/* ---------------------------------------------------------------------------
   The whole database, five tables.

   Read ARCHITECTURE.md and plan.md before changing anything here. The shape is
   deliberately small: a person, what they set up once, what they bought, the
   ledger that says what they may still spend, and one row per morning kept.

   THREE DECISIONS WORTH THE INK.

   1. CREDITS ARE A LEDGER, NOT A COUNTER. `credit_ledger` is append-only and
      the balance is SUM(delta). A mutable integer on `users` is one lost
      update away from giving somebody a free snan or eating one they paid for,
      and it leaves no way to answer "where did my eleventh morning go". The
      ledger answers that by construction, and it is what a refund reverses.

   2. A SITTING SNAPSHOTS EVERYTHING IT PRINTS. `river`, `sky`, `names`,
      `prayer_id`, `portrait_key` and `sankalp_text` are copied onto the row at
      the moment it is minted, never joined at read time. A Patra issued in
      August must still render in five years exactly as it rendered that
      morning, after the profile changed, after the portrait was replaced,
      after the flood model revised the day's figure. The sheet is a record,
      and a record that changes underneath its holder is not one.

   3. THE SANKALP LIVES ON THE SITTING AND NOWHERE ELSE PUBLIC. It is on the
      row so the owner's own copy can print it. Nothing that serves /p/[id] to
      a stranger selects this column. See src/lib/patra.ts.
   --------------------------------------------------------------------------- */

/**
 * A person. `id` is Clerk's user id, so there is no second identity to keep in
 * step and no password anywhere in this system.
 */
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  displayName: text("display_name"),
  /** The edition they read the site in: "en" or "hi". */
  locale: text("locale").notNull().default("en"),
  /** IANA zone, e.g. "Asia/Kolkata". Decides when their morning is. */
  tz: text("tz").notNull().default("Asia/Kolkata"),
  /** Local hour, 0 to 23, the reminder is sent at. */
  reminderHour: integer("reminder_hour").notNull().default(5),
  reminderOn: boolean("reminder_on").notNull().default(true),
  /**
   * The last local date a reminder went out. The cron writes it in the same
   * statement that sends, so a retry inside the hour cannot double-send.
   */
  lastRemindedOn: date("last_reminded_on"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/**
 * What someone sets up once: the water, the portrait, the household names, the
 * prayer, the words. Every morning copies from here onto its own sitting row.
 */
export const profiles = pgTable("profiles", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  waterSlug: text("water_slug").notNull(),
  /** Key in the public blob store. Null when they chose not to add a portrait. */
  portraitKey: text("portrait_key"),
  /** Array<{ name: string }>, one to five. Validated in the server action. */
  names: jsonb("names").notNull().default([]),
  /** An id from src/content/prayers.ts, or null for none. */
  prayerId: text("prayer_id"),
  sankalpText: text("sankalp_text").notNull().default(""),
  /** Set when the form is finished. /today redirects to /setup until it is. */
  completedAt: timestamp("completed_at", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/**
 * One row per completed Stripe Checkout Session. `stripeSessionId` is unique,
 * which is the whole of the webhook's idempotency: Stripe delivers more than
 * once, and the second delivery must not buy a second pack.
 */
export const purchases = pgTable(
  "purchases",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    stripeSessionId: text("stripe_session_id").notNull(),
    stripePaymentIntent: text("stripe_payment_intent"),
    /** "one" | "eleven" | "sixty", the TierKey from src/content/prices.ts. */
    pack: text("pack").notNull(),
    currency: text("currency").notNull(),
    /** Minor units, so 1100 is eleven dollars. Never a float. */
    amountMinor: integer("amount_minor").notNull(),
    credits: integer("credits").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("purchases_session_uq").on(t.stripeSessionId),
    index("purchases_user_ix").on(t.userId),
  ],
);

/**
 * Append-only. A purchase adds credits, a sitting spends one, a refund gives
 * one back. Balance is SUM(delta) and there is no other source of truth.
 *
 * `refId` is the thing that caused the row: a Stripe session id for a
 * purchase, a sitting id for a sitting. Unique per reason, so neither a
 * redelivered webhook nor a double-submitted sitting can book twice.
 */
export const creditLedger = pgTable(
  "credit_ledger",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    delta: integer("delta").notNull(),
    /** "purchase" | "sitting" | "grant" | "refund". */
    reason: text("reason").notNull(),
    refId: text("ref_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("credit_ledger_reason_ref_uq").on(t.reason, t.refId),
    index("credit_ledger_user_ix").on(t.userId),
  ],
);

/**
 * One morning kept. Everything the Patra prints is on this row, frozen at the
 * instant it was minted. See decision 2 at the head of this file.
 */
export const sittings = pgTable(
  "sittings",
  {
    /** 22-character base58, from src/lib/ids.ts. This is the public URL. */
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    waterSlug: text("water_slug").notNull(),
    keptAt: timestamp("kept_at", { withTimezone: true }).notNull(),
    /** The zone the person was in, so the sheet can print their own clock. */
    keptTz: text("kept_tz").notNull(),
    /** Their local calendar date, which is what "one sitting a day" counts. */
    keptOn: date("kept_on").notNull(),
    locale: text("locale").notNull(),
    /** The water's slice of the live snapshot, as fetched. See src/lib/patra.ts. */
    river: jsonb("river").notNull(),
    /** Tithi, nakshatra, moon, sunrise and sunset, as computed. */
    sky: jsonb("sky").notNull(),
    /** SHA-256 of the canonical line. See src/lib/seed.ts. */
    seed: text("seed").notNull(),
    names: jsonb("names").notNull().default([]),
    prayerId: text("prayer_id"),
    portraitKey: text("portrait_key"),
    /** The owner's own words. Never selected by anything that serves a stranger. */
    sankalpText: text("sankalp_text").notNull().default(""),
    /** The rendered 1080x1920 memento in the public blob store, once it exists. */
    imageKey: text("image_key"),
    isPublic: boolean("is_public").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    /* One sitting per water per local day. The unique index is what makes
       minting idempotent when a phone retries the server action. */
    uniqueIndex("sittings_user_water_day_uq").on(t.userId, t.waterSlug, t.keptOn),
    index("sittings_user_ix").on(t.userId, t.keptAt),
  ],
);

export type User = typeof users.$inferSelect;
export type Profile = typeof profiles.$inferSelect;
export type Purchase = typeof purchases.$inferSelect;
export type LedgerEntry = typeof creditLedger.$inferSelect;
export type Sitting = typeof sittings.$inferSelect;

/** What `names` holds, in both profiles and sittings. */
export type NameEntry = { name: string };

/** Why a ledger row exists. */
export type LedgerReason = "purchase" | "sitting" | "grant" | "refund";

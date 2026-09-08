CREATE TABLE "credit_ledger" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"delta" integer NOT NULL,
	"reason" text NOT NULL,
	"ref_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"user_id" text PRIMARY KEY NOT NULL,
	"water_slug" text NOT NULL,
	"portrait_key" text,
	"names" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"prayer_id" text,
	"sankalp_text" text DEFAULT '' NOT NULL,
	"completed_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "purchases" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"stripe_session_id" text NOT NULL,
	"stripe_payment_intent" text,
	"pack" text NOT NULL,
	"currency" text NOT NULL,
	"amount_minor" integer NOT NULL,
	"credits" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sittings" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"water_slug" text NOT NULL,
	"kept_at" timestamp with time zone NOT NULL,
	"kept_tz" text NOT NULL,
	"kept_on" date NOT NULL,
	"locale" text NOT NULL,
	"river" jsonb NOT NULL,
	"sky" jsonb NOT NULL,
	"seed" text NOT NULL,
	"names" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"prayer_id" text,
	"portrait_key" text,
	"sankalp_text" text DEFAULT '' NOT NULL,
	"image_key" text,
	"is_public" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"display_name" text,
	"locale" text DEFAULT 'en' NOT NULL,
	"tz" text DEFAULT 'Asia/Kolkata' NOT NULL,
	"reminder_hour" integer DEFAULT 5 NOT NULL,
	"reminder_on" boolean DEFAULT true NOT NULL,
	"last_reminded_on" date,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "credit_ledger" ADD CONSTRAINT "credit_ledger_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sittings" ADD CONSTRAINT "sittings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "credit_ledger_reason_ref_uq" ON "credit_ledger" USING btree ("reason","ref_id");--> statement-breakpoint
CREATE INDEX "credit_ledger_user_ix" ON "credit_ledger" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "purchases_session_uq" ON "purchases" USING btree ("stripe_session_id");--> statement-breakpoint
CREATE INDEX "purchases_user_ix" ON "purchases" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "sittings_user_water_day_uq" ON "sittings" USING btree ("user_id","water_slug","kept_on");--> statement-breakpoint
CREATE INDEX "sittings_user_ix" ON "sittings" USING btree ("user_id","kept_at");
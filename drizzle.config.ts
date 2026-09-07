import { defineConfig } from "drizzle-kit";

/* Migrations are generated from src/db/schema.ts and committed. `generate`
   needs no database; `migrate` needs DATABASE_URL, which comes from
   `vercel env pull .env.local`. */
export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL ?? "" },
  strict: true,
  verbose: true,
});

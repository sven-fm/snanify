/* ---------------------------------------------------------------------------
   Give somebody mornings without a purchase.

     set -a; . ./.env.local; set +a; node scripts/grant.mjs <email> [count]

   For the owner test-driving the site, for a friend, for making a wronged
   customer whole. It writes one "grant" row to the ledger, which is the same
   ledger a purchase writes to, so the balance, the register and the sitting
   see nothing unusual. The count defaults to sixty.

   THE PERSON MUST HAVE SIGNED IN ONCE, because a row in `users` only exists
   after the first sign-in; the script says so if it finds nobody. The email
   is the one Clerk holds, which for a Google sign-in is the Google address.

   RUN IT TWICE AND IT GRANTS TWICE. The reference carries the moment of the
   grant, so each run is its own row. That is the point of a grant.

   `DATABASE_URL` is the production database in every environment today, so
   this is real. There is no dry run, because the script prints the balance
   before and after and a grant is reversed with a negative count.
   --------------------------------------------------------------------------- */

import { neon } from "@neondatabase/serverless";

const [email, countArg] = process.argv.slice(2);
const count = Number(countArg ?? 60);

if (!email || !Number.isInteger(count) || count === 0) {
  console.error("usage: node scripts/grant.mjs <email> [count]   (count defaults to 60, negative reverses)");
  process.exit(1);
}
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing; run: set -a; . ./.env.local; set +a");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const people = await sql`select id, email from users where lower(email) = lower(${email}) limit 2`;
if (people.length === 0) {
  console.error(`no account for ${email}. Sign in once on the site first; the account is created then.`);
  process.exit(1);
}
if (people.length > 1) {
  console.error(`${email} matches more than one account; grant by id instead.`);
  process.exit(1);
}
const { id } = people[0];

const before = await sql`select coalesce(sum(delta), 0)::int as balance from credit_ledger where user_id = ${id}`;

await sql`insert into credit_ledger (user_id, delta, reason, ref_id)
          values (${id}, ${count}, 'grant', ${`grant:${email}:${new Date().toISOString()}`})`;

const after = await sql`select coalesce(sum(delta), 0)::int as balance from credit_ledger where user_id = ${id}`;

console.log(`${email}: ${before[0].balance} mornings before, ${after[0].balance} after.`);

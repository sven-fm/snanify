import { initBotId } from "botid/client/core";

/* ---------------------------------------------------------------------------
   Vercel BotID, on the two forms that cost money or storage.

   A server action posts to the page it sits on, so the paths are the pages:
   the pack picker (Pay) and the setup form (a portrait into the blob store).
   The English edition is unprefixed and Hindi lives under /hi. The check
   itself is `checkBotId()` inside the actions; without this client script it
   would answer "human" for everyone.
   --------------------------------------------------------------------------- */

initBotId({
  protect: [
    { path: "/begin", method: "POST" },
    { path: "/hi/begin", method: "POST" },
    { path: "/setup", method: "POST" },
    { path: "/hi/setup", method: "POST" },
  ],
});

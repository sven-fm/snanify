import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Left out of the bundle and required at runtime instead.
   *
   * Both are native: `@resvg/resvg-js` is a Rust addon loaded through a `.node`
   * binary, and `harfbuzzjs` is WebAssembly. The bundler cannot place either in
   * an ECMAScript chunk, and the build fails outright rather than degrading, so
   * anything drawing the Sankalp Patra takes both from node_modules directly.
   *
   * `sharp` is here for the same reason, and because Vercel keeps its own
   * prebuilt copy for the platform the function runs on.
   */
  serverExternalPackages: ["@resvg/resvg-js", "harfbuzzjs", "sharp"],

  /**
   * The portrait arrives through a server action as multipart form data.
   * Next caps action bodies at one megabyte unless told otherwise, and a
   * phone photograph is three to eight, so every real upload was answered
   * with a 500 before src/lib/portrait.ts saw a byte. The limit here matches
   * PORTRAIT.maxUploadBytes; the pipeline still rejects anything larger.
   */
  experimental: {
    serverActions: { bodySizeLimit: "12mb" },
  },
};

export default nextConfig;

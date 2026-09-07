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
};

export default nextConfig;

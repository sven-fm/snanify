import type { MetadataRoute } from "next";

/* The web app manifest, so the site can be added to a home screen: this is
   opened at six in the morning, and the icon is how. Standalone, in the
   paper colours; the night edition is a class, not a second manifest. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Snanify",
    short_name: "Snanify",
    description: "A digital snan. Three minutes with the river you grew up near.",
    start_url: "/today",
    display: "standalone",
    background_color: "#f2ead9",
    theme_color: "#f2ead9",
    lang: "en",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

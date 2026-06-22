import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "나만의닥터",
    short_name: "나만의닥터",
    description: "나만의닥터 홈 화면",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f3f4f7",
    theme_color: "#f3f4f7",
    orientation: "portrait",
    icons: [
      {
        src: "/assets/pwa/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/assets/pwa/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/assets/pwa/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

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
  };
}

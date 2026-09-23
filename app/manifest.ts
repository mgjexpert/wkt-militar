import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Operação WKT",
    short_name: "WKT",
    description: "Treinos guiados. Uma missão de cada vez.",
    start_url: "/app",
    display: "standalone",
    background_color: "#07100d",
    theme_color: "#7cff72",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

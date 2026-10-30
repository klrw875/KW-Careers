import type { MetadataRoute } from "next";
import { site } from "@/content/config";

export const dynamic = "force-static";

const paths = ["", "/new-agents", "/experienced-agents", "/teams", "/idaho-falls", "/pocatello", "/calculator", "/quiz", "/stories", "/events", "/refer", "/faq", "/book", "/privacy", "/disclosures"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: `${site.url}${p}`, lastModified: new Date(), changeFrequency: p === "/events" || p === "/stories" ? "weekly" : "monthly", priority: p === "" ? 1 : 0.7 }));
}

import type { Metadata } from "next";
import { site } from "@/content/config";

type Og = "og-default" | "og-training" | "og-lobby";

/** Unique title/description/canonical/Open Graph image per page. */
export function pageMeta({ title, description, path, og = "og-default", noindex = false }: { title: string; description: string; path: string; og?: Og; noindex?: boolean }): Metadata {
  const image = { url: `/media/${og}.jpg`, width: 1200, height: 630, alt: site.brokerage };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: site.name, images: [image], type: "website", locale: "en_US" },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

import type { MetadataRoute } from "next";
import { content, siteUrl } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const now = new Date();

  const staticPages = ["", "/diensten", "/werkgebied", "/contact"];

  const entries: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p === "" ? 1.0 : 0.8,
  }));

  for (const s of content.services) {
    entries.push({
      url: `${base}/diensten/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const w of content.workArea) {
    entries.push({
      url: `${base}/werkgebied/${w.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  return entries;
}

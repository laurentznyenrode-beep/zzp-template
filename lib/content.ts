import contentJson from "@/content.json";
import type { Content } from "@/types/content";

export const content = contentJson as Content;

export function getContent(): Content {
  return content;
}

export function getServiceBySlug(slug: string) {
  return content.services.find((s) => s.slug === slug);
}

export function getWorkAreaBySlug(slug: string) {
  return content.workArea.find((w) => w.slug === slug);
}

export function siteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return url || "https://example.nl";
}

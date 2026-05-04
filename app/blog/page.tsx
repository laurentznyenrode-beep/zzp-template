import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { getAllPostsMeta } from "@/lib/blog";
import { content } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: `Tips, weetjes en praktische gidsen van ${content.business.name} — uw ${content.trade.type} in ${content.business.address.city}.`,
  alternates: { canonical: "/blog" },
};

function formatDate(d: string) {
  if (!d) return "";
  const date = new Date(d);
  return date.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogIndex() {
  const posts = getAllPostsMeta();

  return (
    <>
      <section className="border-b border-[var(--color-border)] bg-[var(--color-muted)]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">Blog</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Tips, achtergronden en praktische gidsen rondom {content.trade.service}.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16">
          {posts.length === 0 ? (
            <p className="text-slate-600">Er zijn nog geen blogposts gepubliceerd.</p>
          ) : (
            <div className="space-y-6">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group block rounded-2xl border border-[var(--color-border)] bg-white p-6 md:p-8 hover:shadow-md hover:border-[var(--color-primary)] transition-all"
                >
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                    <Calendar className="size-4" />
                    <time dateTime={p.date}>{formatDate(p.date)}</time>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 group-hover:text-[var(--color-primary)]">
                    {p.title}
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-3">{p.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)] group-hover:gap-2 transition-all">
                    Lees verder <ArrowRight className="size-4" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

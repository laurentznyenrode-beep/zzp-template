import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { content } from "@/lib/content";
import { CTABlock } from "@/components/CTABlock";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
    },
  };
}

function formatDate(d: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <article>
        <header className="border-b border-[var(--color-border)] bg-[var(--color-muted)]">
          <div className="mx-auto max-w-3xl px-4 py-16">
            <Link href="/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-slate-600 hover:text-[var(--color-primary)]">
              <ArrowLeft className="size-4" /> Alle blogposts
            </Link>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
              <Calendar className="size-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.author && <span>— {post.author}</span>}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">{post.title}</h1>
            <p className="text-lg text-slate-600">{post.excerpt}</p>
          </div>
        </header>

        <div className="bg-white">
          <div className="mx-auto max-w-3xl px-4 py-12">
            <div
              className="prose-blog"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </div>
        </div>
      </article>

      <CTABlock
        title={`Hulp nodig van een ${content.trade.type}?`}
        description="Bel direct of vraag een vrijblijvende offerte aan."
        phone={content.business.phone}
        phoneRaw={content.business.phoneRaw}
      />
    </>
  );
}

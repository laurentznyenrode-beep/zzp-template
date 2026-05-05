import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Phone } from "lucide-react";
import { Icon } from "@/lib/icon";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { content, getServiceBySlug, siteUrl } from "@/lib/content";
import type { Metadata } from "next";

export function generateStaticParams() {
  return content.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} — ${content.trade.typeCapital} ${content.business.address.city}`,
    description: service.shortDescription,
    alternates: { canonical: `/diensten/${service.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const { business, trade, usps, workArea } = content;

  // Service schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    description: service.longDescription,
    provider: {
      "@type": "LocalBusiness",
      name: business.name,
      telephone: business.phoneRaw,
      address: {
        "@type": "PostalAddress",
        streetAddress: business.address.street,
        postalCode: business.address.postalCode,
        addressLocality: business.address.city,
        addressCountry: "NL",
      },
    },
    areaServed: workArea.map((w) => w.name),
    url: `${siteUrl()}/diensten/${service.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {service.image && service.image.startsWith("http") && (
        <div className="relative h-64 md:h-80 overflow-hidden bg-slate-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={service.image} alt={service.title} className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      <section className="border-b border-[var(--color-border)] bg-[var(--color-muted)]">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <Link href="/diensten" className="mb-6 inline-flex items-center gap-1 text-sm text-slate-600 hover:text-[var(--color-primary)]">
            <ArrowLeft className="size-4" /> Alle diensten
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="size-14 inline-flex items-center justify-center rounded-xl bg-white border border-[var(--color-border)] text-[var(--color-primary)]">
              <Icon name={service.icon} className="size-7" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{service.title}</h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl">{service.shortDescription}</p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 grid md:grid-cols-[2fr_1fr] gap-10">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Wat houdt het in?</h2>
            <p className="text-slate-700 leading-relaxed mb-8">{service.longDescription}</p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">Waarom {business.shortName}?</h2>
            <ul className="space-y-2 mb-8">
              {usps.map((u, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="size-5 shrink-0 text-[var(--color-primary)] mt-0.5" />
                  <span><strong>{u.title}</strong> — {u.description}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">Werkgebied</h2>
            <p className="text-slate-700 mb-3">
              Voor {service.title.toLowerCase()} rijden we naar:
            </p>
            <div className="flex flex-wrap gap-2">
              {workArea.map((w) => (
                <Link
                  key={w.slug}
                  href={`/werkgebied/${w.slug}`}
                  className="rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-sm hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                >
                  {w.name}
                </Link>
              ))}
            </div>
          </div>

          <aside>
            <div className="sticky top-24 rounded-2xl border border-[var(--color-border)] bg-[var(--color-muted)] p-6">
              <h3 className="font-bold text-slate-900 mb-3">Direct een afspraak?</h3>
              <p className="text-sm text-slate-600 mb-4">
                Bel direct of vraag vrijblijvend een offerte aan voor {service.title.toLowerCase()}.
              </p>
              <a href={`tel:${business.phoneRaw}`} className="block mb-2">
                <Button className="w-full">
                  <Phone className="size-4" /> {business.phone}
                </Button>
              </a>
              <Link href="/contact" className="block">
                <Button variant="outline" className="w-full">Offerte aanvragen</Button>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-[var(--color-muted)]">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">
            Vraag een offerte aan voor {service.title.toLowerCase()}
          </h2>
          <p className="text-slate-600 mb-8 text-center">
            Vakkundige {trade.type} — {business.address.city} en omgeving
          </p>
          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

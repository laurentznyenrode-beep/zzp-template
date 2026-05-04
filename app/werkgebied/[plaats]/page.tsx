import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ServiceCard";
import { ContactForm } from "@/components/ContactForm";
import { ReviewCard } from "@/components/ReviewCard";
import { content, getWorkAreaBySlug, siteUrl } from "@/lib/content";
import type { Metadata } from "next";

export function generateStaticParams() {
  return content.workArea.map((w) => ({ plaats: w.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ plaats: string }> }
): Promise<Metadata> {
  const { plaats } = await params;
  const area = getWorkAreaBySlug(plaats);
  if (!area) return {};
  return {
    title: `${content.trade.typeCapital} ${area.name} — ${content.business.name}`,
    description: `${content.trade.typeCapital} nodig in ${area.name}? ${content.business.name} is uw vaste vakman. Vaste prijs vooraf, snel ter plaatse, erkend en verzekerd.`,
    alternates: { canonical: `/werkgebied/${area.slug}` },
  };
}

export default async function WerkgebiedDetailPage({ params }: { params: Promise<{ plaats: string }> }) {
  const { plaats } = await params;
  const area = getWorkAreaBySlug(plaats);
  if (!area) notFound();

  const { business, trade, services, usps, reviews } = content;

  // Localized LocalBusiness JSON-LD per plaats
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${trade.typeCapital} ${area.name} — ${business.name}`,
    telephone: business.phoneRaw,
    url: `${siteUrl()}/werkgebied/${area.slug}`,
    areaServed: area.name,
    address: {
      "@type": "PostalAddress",
      addressLocality: area.name,
      addressCountry: "NL",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-[var(--color-border)] bg-[var(--color-muted)]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <Link href="/werkgebied" className="mb-6 inline-flex items-center gap-1 text-sm text-slate-600 hover:text-[var(--color-primary)]">
            <ArrowLeft className="size-4" /> Heel het werkgebied
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="size-7 text-[var(--color-primary)]" />
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900">
              {trade.typeCapital} in {area.name}
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-3xl mb-6">
            Op zoek naar een betrouwbare {trade.type} in {area.name}? {business.name} is uw vaste vakman in {area.name} en omgeving — vaste prijs vooraf, snelle service en altijd persoonlijk contact.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${business.phoneRaw}`}>
              <Button size="lg"><Phone className="size-4" /> Bel {business.phone}</Button>
            </a>
            <Link href="/contact">
              <Button variant="outline" size="lg">Offerte aanvragen</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{area.name} — uw lokale {trade.type}</h2>
            <p className="text-slate-700 leading-relaxed mb-6">{area.intro}</p>
            <p className="text-slate-700 leading-relaxed">
              Of het nu gaat om een spoedklus, regulier onderhoud of een grote renovatie: in {area.name} bent u bij {business.name} aan het juiste adres. We kennen de wijken, de bouwstijlen en de typische installaties die u in {area.name} aantreft.
            </p>
          </div>
          <ul className="space-y-3">
            {usps.map((u, i) => (
              <li key={i} className="flex items-start gap-3 rounded-lg border border-[var(--color-border)] bg-white p-4">
                <CheckCircle2 className="size-5 shrink-0 text-[var(--color-primary)] mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">{u.title}</div>
                  <div className="text-sm text-slate-600">{u.description}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[var(--color-muted)]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Onze diensten in {area.name}</h2>
          <p className="text-slate-600 mb-8">Volledig pakket aan {trade.service} — voor particulieren en bedrijven.</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.slug} {...s} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Klanten uit de regio aan het woord</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reviews.map((r, i) => (
              <ReviewCard key={i} {...r} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-muted)]">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">
            {trade.typeCapital} nodig in {area.name}?
          </h2>
          <p className="text-slate-600 mb-8 text-center">Vul het formulier in — wij reageren doorgaans binnen één werkdag.</p>
          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

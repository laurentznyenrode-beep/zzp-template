import Link from "next/link";
import { Phone, ArrowRight, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ServiceCard";
import { ReviewCard } from "@/components/ReviewCard";
import { WerkgebiedList } from "@/components/WerkgebiedList";
import { FAQ } from "@/components/FAQ";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/lib/icon";
import { content, siteUrl } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${content.business.tagline} — ${content.business.name}`,
  description: `${content.business.name} is uw vaste ${content.trade.type} in ${content.business.address.city} en omgeving. Vaste prijs vooraf, snel ter plaatse, erkend en verzekerd.`,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const { business, trade, usps, services, workArea, reviews, faq, emergency } = content;
  const avgRating =
    reviews.reduce((s, r) => s + r.rating, 0) / Math.max(reviews.length, 1);

  // LocalBusiness JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl()}/#business`,
    name: business.name,
    image: `${siteUrl()}${content.branding.ogImage}`,
    telephone: business.phoneRaw,
    email: business.email,
    url: siteUrl(),
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      postalCode: business.address.postalCode,
      addressLocality: business.address.city,
      addressCountry: "NL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.address.lat,
      longitude: business.address.lng,
    },
    areaServed: workArea.map((w) => w.name),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating.toFixed(1),
      reviewCount: reviews.length,
    },
    priceRange: "€€",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="border-b border-[var(--color-border)] bg-gradient-to-b from-[var(--color-muted)] to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white border border-[var(--color-border)] px-3 py-1 text-xs font-medium text-slate-700">
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3 fill-[var(--color-secondary)] text-[var(--color-secondary)]" />
                ))}
              </span>
              <span>{avgRating.toFixed(1)}/5 op basis van {reviews.length} reviews</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              {business.tagline}
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
              {business.name} staat voor vakwerk, vaste prijs vooraf en snelle service. {trade.typeCapital} in {business.address.city} en omgeving — al sinds {business.foundedYear}.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${business.phoneRaw}`}>
                <Button size="lg">
                  <Phone className="size-4" /> Bel {business.phone}
                </Button>
              </a>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Offerte aanvragen <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
            {emergency.enabled && (
              <p className="mt-6 text-sm text-slate-600">
                <strong>{emergency.label}:</strong>{" "}
                <a href={`tel:${emergency.phoneRaw}`} className="font-semibold text-[var(--color-primary)] hover:underline">
                  {emergency.phone}
                </a>
              </p>
            )}
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-slate-100">
            {/* Vervang door eigen foto in /public — dit is placeholder */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://placehold.co/800x600/0E5BA8/ffffff?text=Foto+vakman"
              alt={`${trade.typeCapital} ${business.owner} aan het werk`}
              className="size-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* USPs */}
      <section className="border-b border-[var(--color-border)] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {usps.map((u) => (
            <div key={u.title} className="flex gap-4">
              <div className="shrink-0 size-12 inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <Icon name={u.icon} className="size-6" />
              </div>
              <div>
                <div className="font-semibold text-slate-900 mb-1">{u.title}</div>
                <p className="text-sm text-slate-600 leading-relaxed">{u.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Diensten */}
      <section className="bg-[var(--color-muted)]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Onze diensten</h2>
              <p className="text-slate-600 max-w-2xl">
                Van klein onderhoud tot complete renovatie — wij zijn uw vaste {trade.type} voor alles rond {trade.service}.
              </p>
            </div>
            <Link href="/diensten" className="text-sm font-semibold text-[var(--color-primary)] hover:underline">
              Bekijk alle diensten →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s) => (
              <ServiceCard key={s.slug} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Werkgebied */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="mb-8 flex items-start gap-3">
            <MapPin className="size-7 text-[var(--color-primary)] shrink-0 mt-1" />
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Werkgebied</h2>
              <p className="text-slate-600">
                Wij werken in {business.address.city} en de directe omgeving. Klik op uw plaats voor lokaal {trade.service}.
              </p>
            </div>
          </div>
          <WerkgebiedList content={content} />
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-[var(--color-muted)]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Wat klanten zeggen</h2>
          <p className="text-slate-600 mb-8">
            Gemiddeld {avgRating.toFixed(1)} sterren op basis van {reviews.length} reviews.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reviews.map((r, i) => (
              <ReviewCard key={i} {...r} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">Veelgestelde vragen</h2>
          <p className="text-slate-600 mb-8 text-center">Staat uw vraag er niet bij? Bel of mail ons gerust.</p>
          <FAQ items={faq} />
        </div>
      </section>

      {/* Contact */}
      <section className="bg-[var(--color-muted)]">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">Stuur ons een bericht</h2>
          <p className="text-slate-600 mb-8 text-center">Vul het formulier in en wij nemen zo snel mogelijk contact op.</p>
          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

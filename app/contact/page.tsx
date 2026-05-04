import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { content } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: `Neem contact op met ${content.business.name} — ${content.business.phone} of ${content.business.email}. Adres: ${content.business.address.street}, ${content.business.address.city}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { business, openingHours, emergency } = content;
  const mapsSrc = `https://www.google.com/maps?q=${business.address.lat},${business.address.lng}&z=14&output=embed`;

  return (
    <>
      <section className="border-b border-[var(--color-border)] bg-[var(--color-muted)]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">Contact</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Heeft u een vraag of wilt u een vrijblijvende offerte? Bel, mail of vul het formulier in — wij reageren doorgaans binnen één werkdag.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Stuur een bericht</h2>
            <ContactForm />
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Direct contact</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <Phone className="size-4 text-[var(--color-primary)]" />
                  <a href={`tel:${business.phoneRaw}`} className="text-slate-700 hover:text-[var(--color-primary)]">
                    {business.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="size-4 text-[var(--color-primary)]" />
                  <a href={`mailto:${business.email}`} className="text-slate-700 hover:text-[var(--color-primary)] break-all">
                    {business.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="size-4 text-[var(--color-primary)] mt-0.5 shrink-0" />
                  <span className="text-slate-700">
                    {business.address.street}
                    <br />
                    {business.address.postalCode} {business.address.city}
                  </span>
                </li>
              </ul>
              {emergency.enabled && (
                <div className="mt-5 rounded-lg bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 p-3 text-sm">
                  <strong className="text-[var(--color-primary)]">{emergency.label}:</strong>{" "}
                  <a href={`tel:${emergency.phoneRaw}`} className="font-semibold text-[var(--color-primary)] hover:underline">
                    {emergency.phone}
                  </a>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Clock className="size-5 text-[var(--color-primary)]" /> Openingstijden
              </h3>
              <ul className="space-y-1.5 text-sm">
                {openingHours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-3 text-slate-700">
                    <span>{h.day}</span>
                    <span className="text-slate-500">{h.close ? `${h.open} - ${h.close}` : h.open}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-slate-100">
              <iframe
                title={`Kaart ${business.address.city}`}
                src={mapsSrc}
                className="w-full h-72"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

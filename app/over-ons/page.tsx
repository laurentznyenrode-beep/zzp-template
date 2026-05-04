import { Award, CheckCircle2 } from "lucide-react";
import { content } from "@/lib/content";
import { CTABlock } from "@/components/CTABlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Over ons",
  description: `Maak kennis met ${content.business.owner} en het team achter ${content.business.name}, uw vaste ${content.trade.type} sinds ${content.business.foundedYear}.`,
  alternates: { canonical: "/over-ons" },
};

export default function AboutPage() {
  const { about, business, certifications, trade } = content;
  const yearsActive = new Date().getFullYear() - business.foundedYear;

  return (
    <>
      <section className="border-b border-[var(--color-border)] bg-[var(--color-muted)]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">{about.headline}</h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            Sinds {business.foundedYear} — dat is inmiddels meer dan {yearsActive} jaar — zijn wij de vaste {trade.type} voor particulieren en bedrijven in {business.address.city} en omgeving.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-12 items-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://placehold.co/600x750/0E5BA8/ffffff?text=Foto+eigenaar"
              alt={`${business.owner}, eigenaar van ${business.name}`}
              className="size-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Ons verhaal</h2>
            <p className="text-slate-700 leading-relaxed mb-8">{about.story}</p>

            <h3 className="text-xl font-bold text-slate-900 mb-4">Waarom kiezen voor {business.shortName}?</h3>
            <ul className="space-y-3 mb-8">
              {about.whyChoose.map((reason, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 shrink-0 text-[var(--color-primary)] mt-0.5" />
                  <span className="text-slate-700">{reason}</span>
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-bold text-slate-900 mb-4">Certificeringen</h3>
            <ul className="space-y-2">
              {certifications.map((c, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-700">
                  <Award className="size-5 text-[var(--color-secondary)]" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTABlock
        title="Klaar om aan de slag te gaan?"
        description="Bel ons direct of vraag vrijblijvend een offerte aan."
        phone={business.phone}
        phoneRaw={business.phoneRaw}
      />
    </>
  );
}

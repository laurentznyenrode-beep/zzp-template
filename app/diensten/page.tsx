import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/lib/icon";
import { content } from "@/lib/content";
import { CTABlock } from "@/components/CTABlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diensten",
  description: `Bekijk alle diensten van ${content.business.name} — van CV-ketel onderhoud tot complete badkamerrenovatie. ${content.trade.typeCapital} in ${content.business.address.city}.`,
  alternates: { canonical: "/diensten" },
};

export default function ServicesPage() {
  const { services, business, trade } = content;

  return (
    <>
      <section className="border-b border-[var(--color-border)] bg-[var(--color-muted)]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">Onze diensten</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            {business.name} biedt een volledig pakket aan {trade.service}. Klik op een dienst voor meer informatie of neem direct contact op voor een offerte.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 space-y-8">
          {services.map((s) => (
            <article
              key={s.slug}
              className="grid md:grid-cols-[auto_1fr_auto] gap-6 items-start rounded-2xl border border-[var(--color-border)] p-6 md:p-8 bg-white hover:shadow-md transition-shadow"
            >
              <div className="size-14 inline-flex items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                <Icon name={s.icon} className="size-7" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h2>
                <p className="text-slate-700 leading-relaxed">{s.longDescription}</p>
              </div>
              <Link
                href={`/diensten/${s.slug}`}
                className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)] hover:underline self-end md:self-start"
              >
                Meer info <ArrowRight className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <CTABlock
        title="Niet gevonden wat u zocht?"
        description="Neem contact op — vaak kunnen we ook helpen bij niet-genoemde klussen."
        phone={business.phone}
        phoneRaw={business.phoneRaw}
      />
    </>
  );
}

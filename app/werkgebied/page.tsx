import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { content } from "@/lib/content";
import { CTABlock } from "@/components/CTABlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Werkgebied",
  description: `${content.business.name} werkt in ${content.workArea.map((w) => w.name).join(", ")}.`,
  alternates: { canonical: "/werkgebied" },
};

export default function WerkgebiedPage() {
  const { workArea, business, trade } = content;

  return (
    <>
      <section className="border-b border-[var(--color-border)] bg-[var(--color-muted)]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">Werkgebied</h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Wij zijn dé {trade.type} voor {business.address.city} en de regio. Bekijk hieronder waar wij werken.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {workArea.map((w) => (
              <Link
                key={w.slug}
                href={`/werkgebied/${w.slug}`}
                className="group block rounded-xl border border-[var(--color-border)] bg-white p-6 hover:shadow-md hover:border-[var(--color-primary)] transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="size-5 text-[var(--color-primary)]" />
                  <h2 className="text-xl font-bold text-slate-900">{w.name}</h2>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{w.intro}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary)] group-hover:gap-2 transition-all">
                  Bekijk pagina <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABlock
        title="Niet zeker of uw plaats erbij hoort?"
        description="Bel even — vaak komen we ook in omliggende plaatsen."
        phone={business.phone}
        phoneRaw={business.phoneRaw}
      />
    </>
  );
}

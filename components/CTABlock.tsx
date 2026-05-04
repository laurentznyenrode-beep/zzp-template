import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  description?: string;
  phone: string;
  phoneRaw: string;
};

export function CTABlock({ title, description, phone, phoneRaw }: Props) {
  return (
    <section className="my-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-2xl bg-[var(--color-primary)] text-white px-6 py-10 md:px-12 md:py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
            {description && <p className="text-white/90 max-w-xl">{description}</p>}
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${phoneRaw}`}>
              <Button variant="secondary" size="lg">
                <Phone className="size-4" /> {phone}
              </Button>
            </a>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="bg-white">
                Offerte aanvragen
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

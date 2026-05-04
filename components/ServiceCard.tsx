import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/lib/icon";
import { ArrowRight } from "lucide-react";

type Props = {
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
};

export function ServiceCard({ slug, title, shortDescription, icon }: Props) {
  return (
    <Link href={`/diensten/${slug}`} className="group block h-full">
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardContent className="p-6">
          <div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
            <Icon name={icon} className="size-6" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
          <p className="mb-4 text-sm text-slate-600 leading-relaxed">{shortDescription}</p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] group-hover:gap-2 transition-all">
            Lees meer <ArrowRight className="size-4" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}

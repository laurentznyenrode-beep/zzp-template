import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/lib/icon";
import { ArrowRight } from "lucide-react";

type Props = {
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  image?: string;
};

export function ServiceCard({ slug, title, shortDescription, icon, image }: Props) {
  const hasValidImage = image && image.startsWith("http");
  return (
    <Link href={`/diensten/${slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
        {hasValidImage && (
          <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3 inline-flex size-10 items-center justify-center rounded-lg bg-white/95 text-[var(--color-primary)] shadow-sm">
              <Icon name={icon} className="size-5" />
            </div>
          </div>
        )}
        <CardContent className="p-6">
          {!hasValidImage && (
            <div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
              <Icon name={icon} className="size-6" />
            </div>
          )}
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

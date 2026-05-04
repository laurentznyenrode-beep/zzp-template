import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Content } from "@/types/content";

export function WerkgebiedList({ content }: { content: Content }) {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {content.workArea.map((w) => (
        <li key={w.slug}>
          <Link
            href={`/werkgebied/${w.slug}`}
            className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            <MapPin className="size-4 text-[var(--color-primary)]" />
            {w.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

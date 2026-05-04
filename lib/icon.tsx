import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function Icon({ name, className }: { name: string; className?: string }) {
  const C = (Icons as unknown as Record<string, LucideIcon>)[name] ?? Icons.CircleDot;
  return <C className={className} aria-hidden="true" />;
}

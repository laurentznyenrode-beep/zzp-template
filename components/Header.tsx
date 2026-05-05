"use client";

import Link from "next/link";
import * as React from "react";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/diensten", label: "Diensten" },
  { href: "/werkgebied", label: "Werkgebied" },
  { href: "/contact", label: "Contact" },
];

type Business = { name: string; phone: string; phoneRaw: string };
type Emergency = { enabled: boolean; phone: string; phoneRaw: string; label: string };

export function Header({ business, emergency }: { business: Business; emergency: Emergency }) {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      {emergency.enabled && (
        <div className="bg-[var(--color-primary)] text-white text-xs">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5 gap-3">
            <span className="hidden sm:inline">{emergency.label} — bel direct voor spoedgevallen</span>
            <span className="sm:hidden">{emergency.label}</span>
            <a
              href={`tel:${emergency.phoneRaw}`}
              className="inline-flex items-center gap-1.5 font-semibold hover:underline"
            >
              <Phone className="size-3.5" /> {emergency.phone}
            </a>
          </div>
        </div>
      )}
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-bold text-slate-900 text-lg">
          {business.name}
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-700 hover:text-[var(--color-primary)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${business.phoneRaw}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900"
          >
            <Phone className="size-4" /> {business.phone}
          </a>
          <Link href="/contact">
            <Button size="sm">Offerte aanvragen</Button>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden inline-flex size-10 items-center justify-center rounded-lg border border-[var(--color-border)]"
          aria-label="Menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div className={cn("md:hidden border-t border-[var(--color-border)]", !open && "hidden")}>
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-[var(--color-muted)]"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-2 px-1">
            <a href={`tel:${business.phoneRaw}`}>
              <Button variant="outline" className="w-full"><Phone className="size-4" /> {business.phone}</Button>
            </a>
            <Link href="/contact" onClick={() => setOpen(false)}>
              <Button className="w-full">Offerte aanvragen</Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

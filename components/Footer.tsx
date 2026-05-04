import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import type { Content } from "@/types/content";

export function Footer({ content }: { content: Content }) {
  const { business, social, openingHours, workArea, services } = content;

  return (
    <footer className="mt-20 border-t border-[var(--color-border)] bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-4">
        <div>
          <div className="mb-3 text-lg font-bold text-white">{business.name}</div>
          <p className="text-sm leading-relaxed text-slate-400 mb-4">{business.tagline}</p>
          <div className="space-y-2 text-sm">
            <a href={`tel:${business.phoneRaw}`} className="flex items-center gap-2 hover:text-white">
              <Phone className="size-4" /> {business.phone}
            </a>
            <a href={`mailto:${business.email}`} className="flex items-center gap-2 hover:text-white break-all">
              <Mail className="size-4" /> {business.email}
            </a>
            <div className="flex items-start gap-2">
              <MapPin className="size-4 mt-0.5 shrink-0" />
              <span>
                {business.address.street}
                <br />
                {business.address.postalCode} {business.address.city}
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-3 text-sm font-semibold text-white">Diensten</div>
          <ul className="space-y-2 text-sm">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link href={`/diensten/${s.slug}`} className="hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-3 text-sm font-semibold text-white">Werkgebied</div>
          <ul className="space-y-2 text-sm">
            {workArea.map((w) => (
              <li key={w.slug}>
                <Link href={`/werkgebied/${w.slug}`} className="hover:text-white">
                  {content.trade.typeCapital} in {w.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-3 text-sm font-semibold text-white">Openingstijden</div>
          <ul className="space-y-1 text-sm">
            {openingHours.map((h) => (
              <li key={h.day} className="flex justify-between gap-3">
                <span>{h.day}</span>
                <span className="text-slate-400">
                  {h.close ? `${h.open} - ${h.close}` : h.open}
                </span>
              </li>
            ))}
          </ul>
          {(social.facebook || social.instagram || social.linkedin) && (
            <div className="mt-4 flex gap-3">
              {social.facebook && (
                <a href={social.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="hover:text-white">
                  <Facebook className="size-5" />
                </a>
              )}
              {social.instagram && (
                <a href={social.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="hover:text-white">
                  <Instagram className="size-5" />
                </a>
              )}
              {social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" className="hover:text-white">
                  <Linkedin className="size-5" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-5 flex flex-col md:flex-row justify-between gap-2 text-xs text-slate-500">
          <span>
            &copy; {new Date().getFullYear()} {business.name} — KVK {business.kvk} — BTW {business.btw}
          </span>
          <span>
            <Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

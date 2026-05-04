import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="mb-4 text-6xl font-bold text-[var(--color-primary)]">404</div>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Pagina niet gevonden</h1>
        <p className="text-slate-600 mb-8">
          De pagina die u zoekt bestaat niet of is verplaatst. Geen zorgen — via onderstaande knop bent u zo terug op de homepagina.
        </p>
        <Link href="/">
          <Button size="lg">Terug naar home</Button>
        </Link>
      </div>
    </section>
  );
}

# ZZP-template — Nederlandse vakman website

Een productie-klare Next.js 15 + Tailwind v4 template voor Nederlandse ZZP'ers in de bouw / installatie-sector (loodgieter, elektricien, aannemer, stukadoor, hovenier, …). Volledig SEO-geoptimaliseerd, responsive, met contactformulier via Resend en alle klantspecifieke content uit één centraal `content.json`-bestand.

## Wat zit erin

- **Next.js 15** met App Router en TypeScript
- **Tailwind CSS v4** met thema-kleuren via CSS custom properties (verandert mee met `content.json`)
- **shadcn-stijl UI componenten** (Button, Card, Input, Accordion) — geen externe Radix-deps om de bundle klein te houden
- **Lucide React** voor iconen
- **Resend** voor contactformulier-e-mails
- **Zod** validatie + honeypot anti-spam
- **Markdown blog** via `gray-matter` + `remark`
- **JSON-LD** structured data: `LocalBusiness` op home + per werkgebied, `Service` per dienst-pagina
- **Auto-gegenereerde** `sitemap.xml` (alle pagina's, services, werkgebieden, blogposts) en `robots.txt`
- **Per-plaats SEO-pagina's** — elke plaats in `workArea` krijgt een unieke URL met plaatsnaam in `<title>`, `<h1>` en tekst (lokale SEO!)
- **Per-dienst SEO-pagina's** — elke service krijgt een eigen pagina met sleutelwoorden in titel + intro
- Klaar voor deployment op **Vercel** zonder configuratie

## Lokaal starten

```bash
npm install
cp .env.example .env.local   # vul je Resend API key in
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Hoe maak ik een nieuwe site voor een klant?

1. **Kopieer de repo** naar een nieuwe map / nieuwe Git repo.
2. **Pas `content.json` aan** met de gegevens van de klant. Dit is de enige bron van klantdata. Verander hier:
   - `business.*` — naam, KVK, BTW, adres, telefoon, e-mail
   - `trade.*` — type vakman: `loodgieter`, `elektricien`, `aannemer`, `stukadoor`, `hovenier`, … (beïnvloedt teksten op de hele site)
   - `branding.primaryColor` / `secondaryColor` — hex-codes voor de huisstijl (de hele site krijgt direct deze kleuren)
   - `workArea` — alle plaatsen waar de klant werkt; elke plaats wordt een aparte SEO-pagina
   - `services` — alle diensten met `slug`, `title`, `shortDescription`, `longDescription` en `icon` (Lucide-naam)
   - `usps`, `reviews`, `faq`, `social`, `openingHours`, `emergency`, `certifications`, `about`
3. **Vervang afbeeldingen** in `/public`:
   - `/logo.svg` — het bedrijfslogo
   - `/favicon.svg` (of `.ico`)
   - `/og.png` — Open Graph afbeelding (1200×630)
   - Optioneel `/services/*.jpg`, `/about/owner.jpg`, `/blog/*.jpg`
4. **Voeg blogposts toe** als markdown in `content/blog/{slug}.md` met frontmatter `title`, `excerpt`, `date`, `author`, `cover`. Twee voorbeelden zitten er al in.
5. **Maak Resend-account** aan (gratis tot 3000 mails/maand) op [resend.com](https://resend.com) en verifieer het mail-domein van de klant. Zet de `RESEND_API_KEY`, `RESEND_FROM_EMAIL` en `NEXT_PUBLIC_SITE_URL` in `.env.local` en op Vercel.
6. **Deploy naar Vercel**: koppel de Git-repo, voeg de environment variables toe, en je bent live.

## Environment variables

Zie `.env.example`:

| Variabele | Omschrijving |
| --- | --- |
| `RESEND_API_KEY` | API key van [resend.com](https://resend.com) |
| `RESEND_FROM_EMAIL` | Geverifieerd FROM-adres (bv. `no-reply@klant.nl`) |
| `RESEND_BCC_EMAIL` | Optioneel — kopie naar monitoring-inbox |
| `NEXT_PUBLIC_SITE_URL` | Productie-URL zonder trailing slash, bijv. `https://klant.nl` |

## Project-structuur

```
content.json              ← ALLE klant-content
content/blog/*.md         ← Blogposts in markdown
types/content.ts          ← TypeScript types voor content.json
lib/                      ← content loader, blog parser, utils, icon helper
components/               ← Header, Footer, ServiceCard, ReviewCard, ContactForm, …
components/ui/            ← Button, Card, Input, Accordion (shadcn-stijl)
app/
├── layout.tsx            ← Root layout + dynamische thema-kleur uit content.json
├── page.tsx              ← Home
├── over-ons/
├── contact/
├── diensten/             ← Index + [slug] (auto-gegenereerd uit content.json)
├── werkgebied/           ← Index + [plaats] (auto-gegenereerd, lokale SEO)
├── blog/                 ← Index + [slug] (uit markdown)
├── api/contact/          ← Resend route handler met Zod validatie
├── sitemap.ts            ← Auto-gegenereerde sitemap
├── robots.ts             ← robots.txt
└── not-found.tsx         ← 404
public/                   ← Logo, favicon, OG image, foto's
```

## Hoe werkt de dynamische theming?

`content.branding.primaryColor` en `secondaryColor` worden in `app/layout.tsx` ge-injecteerd als CSS custom properties (`--color-primary`, `--color-secondary`). Alle componenten gebruiken deze variabelen via Tailwind's arbitrary-value syntax (bv. `bg-[var(--color-primary)]`). Verander dus alleen de hex in `content.json` en de hele site wisselt mee.

## Go-live checklist per klant

- [ ] `content.json` volledig ingevuld en gecontroleerd (KVK, BTW, telefoon, openingstijden)
- [ ] `branding.primaryColor` en `secondaryColor` in huisstijl
- [ ] Logo, favicon, OG image vervangen in `/public`
- [ ] Foto's per dienst (optioneel) in `/public/services/`
- [ ] Foto eigenaar op `/public/about/owner.jpg`
- [ ] Resend-account aangemaakt + domein geverifieerd (DKIM/SPF)
- [ ] Environment variables ingesteld op Vercel
- [ ] `NEXT_PUBLIC_SITE_URL` op productie-URL gezet
- [ ] Contactformulier getest in productie (komt mail aan?)
- [ ] Google Search Console toegevoegd → sitemap submitted (`/sitemap.xml`)
- [ ] Google Business Profile aangemaakt / geclaimd voor de klant
- [ ] Lighthouse-check (mikt op 90+ op alle assen)
- [ ] Mobile responsive doorlopen (mobiel + tablet)
- [ ] 301-redirects vanaf oude website (indien van toepassing)
- [ ] Cookie-banner — alleen nodig als er tracking gebruikt wordt; standaard staat er geen tracking in
- [ ] Privacyverklaring + algemene voorwaarden op `/privacy` en `/voorwaarden` (toevoegen per klant)

## Aannames die ik gemaakt heb

- **Geen tracking out-of-the-box** — geen Google Analytics of Pixel. Daarmee is geen cookie-banner nodig en is de site AVG-conform vanaf dag 1. Voeg per klant toe als zij het willen.
- **Inter** als systeemfont via `next/font/google`. Vervang in `app/layout.tsx` als de klant een andere font wil.
- **Geen Radix UI** voor de Accordion — eigen lichtgewicht implementatie. Scheelt ~30KB. Voeg Radix toe als je drag-and-drop, complexe dialogs etc. nodig hebt.
- **Honeypot** als spam-bescherming, niet reCAPTCHA — dat zou per klant een Google-account vereisen.
- **Markdown blog** zonder admin UI. Klant levert kant-en-klare teksten aan, jij plaatst ze als `.md`-bestand. Eenvoudigste model.
- **Google Maps via iframe** — geen API key nodig, geen kosten. Voor uitgebreide kaart-features kun je later upgraden naar de embed API.

## Scripts

```bash
npm run dev        # development
npm run build      # production build
npm run start      # production server
npm run lint       # eslint
npm run send-lead  # verstuur lead-outreach mail (zie hieronder)
```

## Een lead mailen

Het project bevat een herbruikbaar email-template (`emails/lead-outreach.html` + `.txt`) en een CLI-script (`scripts/send-lead.mjs`) om een lead via Resend te benaderen met een link naar je live demo.

### Eenmalige setup

1. Verifieer een eigen domein in Resend → Domains (DNS-records bij je registrar). Zonder eigen domein werkt het FROM-adres `onboarding@resend.dev` **alleen** naar je eigen test-adres in Resend.
2. Vul `.env.local`:
   ```
   RESEND_API_KEY=re_…
   RESEND_FROM_EMAIL=noreply@jouwdomein.nl
   LEAD_DEMO_URL=https://jouw-demo.vercel.app
   SENDER_NAME=Jouw Naam
   SENDER_EMAIL=contact@jouwdomein.nl
   SENDER_PHONE=06 12 34 56 78
   ```

### Een lead verzenden

Eerst een dry-run om te checken hoe de mail eruit ziet:

```bash
npm run send-lead -- \
  --to "Pieter <pieter@vakmanvoorbeeld.nl>" \
  --owner "Pieter" \
  --business "Vakman Voorbeeld" \
  --trade "loodgieter" \
  --city "Utrecht" \
  --personalNote "je nog geen eigen website hebt" \
  --dry-run
```

Tevreden? Verwijder `--dry-run` en de mail wordt daadwerkelijk verstuurd. Het script returnt de Resend message-ID bij succes.

### Velden in de template

Placeholders in `emails/lead-outreach.html` en `.txt`:

| Placeholder | Vervangen door |
| --- | --- |
| `{{ownerName}}` | voornaam van de lead, gebruikt in de aanhef |
| `{{businessName}}` | naam van het bedrijf (alleen in subject) |
| `{{trade}}` | bv. "loodgieter" — gebruikt in de Google-zoekvoorbeeld |
| `{{exampleCity}}` | bv. "Utrecht" — gebruikt in de Google-zoekvoorbeeld |
| `{{personalNote}}` | persoonlijke observatie, bv. *"je nog geen website hebt"* of *"je website wat verouderd oogt"* — vult de zin "Ik kwam je bedrijf tegen en zag dat ___" |
| `{{demoUrl}}` | URL van je Vercel-demo |
| `{{senderName}}` / `{{senderEmail}}` / `{{senderPhone}}` | jouw gegevens uit env. Telefoon is optioneel — als hij leeg is wordt de "of bel me direct"-zin automatisch weggelaten |

Pas de templates aan voor jouw eigen pitch en stijl. Het script doet HTML én plain-text versie automatisch — sommige email-clients (Outlook, oude clients) laten de plain-text variant zien.

## License

Privé / commercieel — pas aan naar wens voor je eigen gebruik.

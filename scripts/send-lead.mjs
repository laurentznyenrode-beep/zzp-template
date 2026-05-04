#!/usr/bin/env node
/**
 * Verstuur een lead-outreach mail via Resend.
 *
 * Gebruik:
 *   npm run send-lead -- \
 *     --to "Pieter <pieter@vakmanvoorbeeld.nl>" \
 *     --owner "Pieter" \
 *     --business "Vakman Voorbeeld" \
 *     --trade "loodgieter" \
 *     --city "Utrecht"
 *
 * Vereist (in .env.local of geëxporteerd):
 *   RESEND_API_KEY        — je Resend API-key
 *   RESEND_FROM_EMAIL     — geverifieerd FROM-adres ('onboarding@resend.dev'
 *                            werkt alleen naar je eigen test-adres)
 * Optioneel:
 *   LEAD_DEMO_URL         — overschrijft --demo default
 *   SENDER_NAME / SENDER_EMAIL / SENDER_PHONE
 */

import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import { Resend } from "resend";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// .env.local lader (geen extra dep)
function loadDotEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m) continue;
    let v = m[2];
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (process.env[m[1]] === undefined) process.env[m[1]] = v;
  }
}
loadDotEnv(path.join(ROOT, ".env.local"));
loadDotEnv(path.join(ROOT, ".env"));

// --- Argument parser (simpel, geen extra dep) ---
function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith("--")) {
        args[key] = true;
      } else {
        args[key] = next;
        i++;
      }
    }
  }
  return args;
}

const argv = parseArgs(process.argv.slice(2));

if (argv.help || argv.h) {
  console.log(`
send-lead.mjs — verstuur lead-outreach mail via Resend

Verplicht:
  --to        "Naam <email@domein.nl>"  ontvanger
  --owner     "Pieter"                  voornaam in aanhef
  --business  "Loodgieter Jansen"       bedrijfsnaam

Optioneel:
  --trade        "loodgieter"           default: "vakman"
  --city         "Utrecht"              voorbeeldplaats voor SEO-pitch
  --personalNote "je nog geen website hebt"
                  → vult de zin: "Ik kwam je bedrijf tegen en zag dat ___."
  --demo         "https://demo.url"     default: env LEAD_DEMO_URL of homepage
  --dry-run                             render mail naar stdout, verstuur niet
`);
  process.exit(0);
}

function need(key) {
  if (!argv[key]) {
    console.error(`✖ Verplicht argument ontbreekt: --${key}`);
    console.error(`  Gebruik --help voor de syntax.`);
    process.exit(1);
  }
  return String(argv[key]);
}

// --- Inputs ---
const to = need("to");
const ownerName = need("owner");
const businessName = need("business");

const trade = String(argv.trade ?? "vakman");
const exampleCity = String(argv.city ?? "jouw plaats");
const personalNote = String(
  argv.personalNote ?? "je nog geen eigen website hebt"
);
const demoUrl = String(
  argv.demo ?? process.env.LEAD_DEMO_URL ?? "https://zzp-template.vercel.app"
);
const dryRun = Boolean(argv["dry-run"]);

const senderName = process.env.SENDER_NAME;
const senderEmail = process.env.SENDER_EMAIL ?? process.env.RESEND_FROM_EMAIL;
const senderPhone = process.env.SENDER_PHONE ?? "";

if (!senderName || !senderEmail) {
  console.error("✖ SENDER_NAME en SENDER_EMAIL moeten in .env.local staan.");
  console.error("  Bijvoorbeeld:");
  console.error('    SENDER_NAME="Jouw Naam"');
  console.error('    SENDER_EMAIL="contact@jouwdomein.nl"');
  process.exit(1);
}
const senderPhoneRaw = senderPhone.replace(/[^\d+]/g, "");
const senderPhoneSuffix = senderPhone ? ` · ${senderPhone}` : "";

// --- Render templates ---
function render(tpl, vars) {
  // {{key}} → value
  let out = tpl.replace(/\{\{(\w+)\}\}/g, (_, k) =>
    vars[k] !== undefined ? String(vars[k]) : ""
  );
  // {{#key}}...{{/key}} → blok renderen alleen als waarde truthy is
  out = out.replace(/\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g, (_, k, body) =>
    vars[k] ? body : ""
  );
  return out;
}

const vars = {
  ownerName,
  businessName,
  trade,
  exampleCity,
  personalNote,
  demoUrl,
  senderName,
  senderEmail,
  senderPhone,
  senderPhoneRaw,
  senderPhoneSuffix,
};

const htmlTpl = fs.readFileSync(
  path.join(ROOT, "emails", "lead-outreach.html"),
  "utf8"
);
const textTpl = fs.readFileSync(
  path.join(ROOT, "emails", "lead-outreach.txt"),
  "utf8"
);
const html = render(htmlTpl, vars);
const text = render(textTpl, vars);

const subject = `Idee voor de website van ${businessName}`;

// --- Dry run: gewoon tonen, niet versturen ---
if (dryRun) {
  console.log("=== DRY RUN — niet verstuurd ===");
  console.log(`To:      ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`From:    ${process.env.RESEND_FROM_EMAIL ?? "(niet gezet)"}`);
  console.log("\n--- Plain text ---");
  console.log(text);
  process.exit(0);
}

// --- Sanity-checks vóór versturen ---
const apiKey = process.env.RESEND_API_KEY;
const from = process.env.RESEND_FROM_EMAIL;

if (!apiKey) {
  console.error("✖ RESEND_API_KEY ontbreekt. Zet hem in .env.local.");
  process.exit(1);
}
if (!from) {
  console.error("✖ RESEND_FROM_EMAIL ontbreekt. Zet hem in .env.local.");
  process.exit(1);
}
if (from.includes("@resend.dev")) {
  console.warn(
    "⚠ Je gebruikt het test-FROM 'resend.dev'. Resend laat dat ALLEEN naar"
  );
  console.warn(
    "  je eigen geverifieerde test-adres versturen. Voor echte leads moet je"
  );
  console.warn("  een eigen domein verifiëren in Resend → Domains.");
}

const resend = new Resend(apiKey);

console.log(`→ Versturen naar ${to} ...`);

const result = await resend.emails.send({
  from,
  to: [to],
  subject,
  html,
  text,
  replyTo: senderEmail,
});

if (result.error) {
  console.error("✖ Verzenden mislukt:");
  console.error(result.error);
  process.exit(1);
}

console.log(`✓ Verstuurd. Resend message-ID: ${result.data?.id ?? "(geen)"}`);

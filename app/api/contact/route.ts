import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { content } from "@/lib/content";

export const runtime = "nodejs";

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Naam is te kort").max(100),
  email: z.string().trim().email("Ongeldig e-mailadres").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(5, "Bericht is te kort").max(4000),
  website: z.string().max(0).optional(), // honeypot — moet leeg blijven
});

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!)
  );
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige payload" }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Ongeldige invoer" },
      { status: 400 }
    );
  }

  // Honeypot getriggerd — fake success zodat bots niet doorhebben dat ze gefilterd zijn
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const bcc = process.env.RESEND_BCC_EMAIL;

  if (!apiKey || !from) {
    console.error("RESEND_API_KEY of RESEND_FROM_EMAIL ontbreekt");
    return NextResponse.json(
      { error: "Mailservice niet geconfigureerd. Bel ons direct." },
      { status: 500 }
    );
  }

  const { name, email, phone, message } = parsed.data;
  const resend = new Resend(apiKey);

  const subject = `Nieuw contactformulier — ${name}`;
  const text = [
    `Naam: ${name}`,
    `E-mail: ${email}`,
    phone ? `Telefoon: ${phone}` : null,
    "",
    "Bericht:",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <h2>Nieuw bericht via website</h2>
    <p><strong>Naam:</strong> ${escapeHtml(name)}</p>
    <p><strong>E-mail:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
    ${phone ? `<p><strong>Telefoon:</strong> ${escapeHtml(phone)}</p>` : ""}
    <p><strong>Bericht:</strong></p>
    <p style="white-space:pre-line">${escapeHtml(message)}</p>
  `;

  try {
    const result = await resend.emails.send({
      from,
      to: [content.business.email],
      bcc: bcc ? [bcc] : undefined,
      replyTo: email,
      subject,
      text,
      html,
    });
    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json(
        { error: "Verzenden mislukt. Probeer opnieuw of bel ons direct." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Mail send failed:", err);
    return NextResponse.json(
      { error: "Verzenden mislukt. Probeer opnieuw of bel ons direct." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

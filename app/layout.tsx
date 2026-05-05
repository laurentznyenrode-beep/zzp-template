import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { MobileCTABar } from "@/components/MobileCTABar";
import { content, siteUrl } from "@/lib/content";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${content.business.name} — ${content.business.tagline}`,
    template: `%s | ${content.business.name}`,
  },
  description: content.business.tagline,
  icons: { icon: content.branding.favicon },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: content.business.name,
    images: [{ url: content.branding.ogImage }],
  },
};

export const viewport: Viewport = {
  themeColor: content.branding.primaryColor,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // CSS custom properties uit content.json — verandert hele site door alleen json aan te passen
  const themeStyle = `:root {
    --color-primary: ${content.branding.primaryColor};
    --color-secondary: ${content.branding.secondaryColor};
    --color-ring: ${content.branding.primaryColor};
  }`;

  return (
    <html lang="nl" className={inter.variable}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: themeStyle }} />
      </head>
      <body className="min-h-screen flex flex-col pb-[68px] md:pb-0">
        <Header business={content.business} emergency={content.emergency} branding={content.branding} />
        <main className="flex-1">{children}</main>
        <Footer content={content} />
        <WhatsAppFloat phoneRaw={content.business.phoneRaw} />
        <MobileCTABar phone={content.business.phone} phoneRaw={content.business.phoneRaw} />
      </body>
    </html>
  );
}

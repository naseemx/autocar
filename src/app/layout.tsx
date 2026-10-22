import type { Metadata, Viewport } from "next";
import { headers, cookies } from "next/headers";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { LocationProvider } from "@/context/LocationContext";
import { resolveLocation } from "@/utils/domainResolver";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import PhoneFloatingButton from "@/components/PhoneFloatingButton";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host =
    headersList.get("x-current-domain") ||
    headersList.get("x-forwarded-host") ||
    headersList.get("host") ||
    "autoankauf-in-koeln.de";
  const locationSlug = headersList.get("x-location-slug");

  const loc = resolveLocation(host, locationSlug);

  return {
    title: `Autoankauf ${loc.name} | Auto verkaufen in ${loc.name} zum Bestpreis`,
    description: `Auto verkaufen in ${loc.name} leicht gemacht: Bei Autoankauf ${loc.name} erhalten Sie den besten Preis für Ihren Gebrauchtwagen, Unfallwagen oder Motorschaden mit kostenloser Haustür-Abholung in ganz ${loc.name} & Umgebung.`,
    keywords: loc.seoKeywords,
    alternates: {
      canonical: loc.canonicalUrl,
    },
    other: {
      google: 'notranslate',
    },
    openGraph: {
      title: `Autoankauf ${loc.name} | Auto verkaufen in ${loc.name}`,
      description: `Verkaufen Sie Ihr Auto direkt in ${loc.name} und Umgebung zum Bestpreis mit Sofortauszahlung.`,
      url: loc.canonicalUrl,
      siteName: `Autoankauf ${loc.name}`,
      locale: "de_DE",
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const cookieStore = await cookies();
  const host =
    headersList.get("x-current-domain") ||
    headersList.get("x-forwarded-host") ||
    headersList.get("host") ||
    "autoankauf-in-koeln.de";
  const locationSlug = headersList.get("x-location-slug");
  const loc = resolveLocation(host, locationSlug);
  const initialLang = (cookieStore.get("site_language")?.value as "EN" | "DE") || "DE";

  return (
    <html lang={initialLang.toLowerCase()} translate="no" className={`notranslate ${plusJakartaSans.variable}`}>
      <head>
        <meta name="google" content="notranslate" />
        <meta name="googlebot" content="notranslate" />
        <link rel="canonical" href={loc.canonicalUrl} />
      </head>
      <body className="notranslate" translate="no">
        <LanguageProvider initialLanguage={initialLang}>
          <LocationProvider initialLocation={loc}>
            {children}
            <PhoneFloatingButton />
            <WhatsAppFloatingButton />
          </LocationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

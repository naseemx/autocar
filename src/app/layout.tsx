import type { Metadata, Viewport } from "next";
import { headers, cookies } from "next/headers";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { LocationProvider } from "@/context/LocationContext";
import { resolveLocation } from "@/utils/domainResolver";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const cookieStore = await cookies();
  const host =
    headersList.get("x-current-domain") ||
    headersList.get("x-forwarded-host") ||
    headersList.get("host") ||
    "autoankauf-in-koeln.de";
  const locationSlug =
    headersList.get("x-location-slug") ||
    cookieStore.get("site_location")?.value;

  const loc = resolveLocation(host, locationSlug);

  return {
    title: `Autoankauf ${loc.name} | Auto verkaufen in ${loc.name} zum Bestpreis`,
    description: `Auto verkaufen in ${loc.name} leicht gemacht: Bei Autoankauf ${loc.name} erhalten Sie den besten Preis für Ihren Gebrauchtwagen, Unfallwagen oder Motorschaden mit kostenloser Haustür-Abholung in ganz ${loc.name} & Umgebung.`,
    keywords: loc.seoKeywords,
    alternates: {
      canonical: loc.canonicalUrl,
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
  const locationSlug =
    headersList.get("x-location-slug") ||
    cookieStore.get("site_location")?.value;
  const loc = resolveLocation(host, locationSlug);

  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href={loc.canonicalUrl} />
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            }
          `
        }} />
      </head>
      <body>
        <LanguageProvider>
          <LocationProvider initialLocation={loc}>
            {children}
            <WhatsAppFloatingButton />
          </LocationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

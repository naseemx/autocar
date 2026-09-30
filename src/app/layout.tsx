import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { LocationProvider } from "@/context/LocationContext";

export const metadata: Metadata = {
  title: "Autoankauf Köln | Auto verkaufen in Köln & NRW zum Bestpreis",
  description: "Auto verkaufen in Köln leicht gemacht: Bei Autoankauf Köln erhalten Sie den besten Preis für Ihren Gebrauchtwagen, Unfallwagen oder Motorschaden mit kostenloser Haustür-Abholung in ganz Köln & NRW.",
  keywords: ["Auto verkaufen Köln", "Autoankauf Köln", "Gebrauchtwagen Ankauf Köln", "Auto mit Motorschaden verkaufen Köln", "Unfallwagen Ankauf Köln", "Autoankauf NRW", "autoankauf-koeln", "autoankauf koeln"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
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
          <LocationProvider>
            {children}
          </LocationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

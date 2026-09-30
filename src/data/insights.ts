export interface InsightArticle {
  id: string;
  category: 'market' | 'guides' | 'stories';
  categoryLabel: string;
  categoryLabelDe: string;
  title: string;
  titleDe: string;
  excerpt: string;
  excerptDe: string;
  date: string;
  dateDe: string;
  readTime: string;
  readTimeDe: string;
  image: string;
  slug: string;
}

export const INSIGHTS_ARTICLES: InsightArticle[] = [
  {
    id: 'insight-1',
    category: 'market',
    categoryLabel: 'GUIDE',
    categoryLabelDe: 'RATGEBER',
    title: 'Selling a car with engine damage – How to do it right',
    titleDe: 'Auto mit Motorschaden verkaufen – So machen Sie es richtig',
    excerpt: 'Why expensive repairs often make no economic sense and how you can sell your car with engine or transmission failure safely at a fair market value.',
    excerptDe: 'Warum teure Reparaturen oft wirtschaftlicher Totalschaden sind und wie Sie Ihr Fahrzeug mit Motorschaden sicher und zum Höchstpreis verkaufen.',
    date: 'March 1, 2025',
    dateDe: '1. März 2025',
    readTime: '4 min read',
    readTimeDe: '4 Min. Lesezeit',
    image: 'https://res.cloudinary.com/dymoyukvh/image/upload/v1790760694/kauf-auto/images/insight-1.jpg',
    slug: 'selling-car-with-engine-damage-guide',
  },
  {
    id: 'insight-2',
    category: 'guides',
    categoryLabel: 'COMPARISON',
    categoryLabelDe: 'VERGLEICH',
    title: 'Selling your car privately vs. to a dealer – Pros and cons',
    titleDe: 'Auto privat verkaufen oder an Händler – Vor- und Nachteile',
    excerpt: 'Time investment, buyer liability, and payment safety compared: Why direct acquisition with Autoankauf Köln gives you the best price without haggling.',
    excerptDe: 'Zeitaufwand, Gewährleistung und Zahlungssicherheit im Vergleich: Warum der Direktankauf bei Autoankauf Köln ohne Händlerspiele überzeugt.',
    date: 'March 7, 2025',
    dateDe: '7. März 2025',
    readTime: '6 min read',
    readTimeDe: '6 Min. Lesezeit',
    image: 'https://res.cloudinary.com/dymoyukvh/image/upload/v1790760695/kauf-auto/images/insight-2.jpg',
    slug: 'private-car-sale-vs-dealer-comparison',
  },
  {
    id: 'insight-3',
    category: 'stories',
    categoryLabel: 'ADVICE',
    categoryLabelDe: 'PRAXISTIPP',
    title: 'Fast cash for your car – What to watch out for with instant buyers',
    titleDe: 'Schnelles Geld fürs Auto – Worauf Sie bei Sofortankäufern achten sollten',
    excerpt: 'No bait prices or surprise renegotiations upon pickup: How to identify reputable car buyers in Cologne & NRW and receive verified immediate payout on the spot.',
    excerptDe: 'Keine Lockpreise oder böse Überraschungen bei der Übergabe: So erkennen Sie seriöse Autoankäufer in Köln & NRW mit garantierter Barzahlung.',
    date: 'March 14, 2025',
    dateDe: '14. März 2025',
    readTime: '5 min read',
    readTimeDe: '5 Min. Lesezeit',
    image: 'https://res.cloudinary.com/dymoyukvh/image/upload/v1790760696/kauf-auto/images/insight-3.jpg',
    slug: 'fast-cash-car-sale-instant-buyer-guide',
  },
  {
    id: 'insight-4',
    category: 'guides',
    categoryLabel: 'KÖLN & NRW',
    categoryLabelDe: 'KÖLN & NRW',
    title: 'Autoankauf Köln: Free doorstep pickup across Cologne & NRW',
    titleDe: 'Autoankauf Köln: Kostenlose Haustür-Abholung in ganz Köln & NRW',
    excerpt: 'Whether in Cologne city center, Ehrenfeld, Porz, Bonn, or Leverkusen: How free doorstep vehicle collection, transparent contract signing, and official deregistration work.',
    excerptDe: 'Ob Innenstadt, Ehrenfeld, Porz, Bonn oder Leverkusen: So funktioniert die kostenfreie Fahrzeugabholung direkt vor Ort inklusive Abmeldung.',
    date: 'April 28, 2025',
    dateDe: '28. April 2025',
    readTime: '5 min read',
    readTimeDe: '5 Min. Lesezeit',
    image: 'https://res.cloudinary.com/dymoyukvh/image/upload/v1790760698/kauf-auto/images/insight-4.jpg',
    slug: 'autoankauf-koeln-free-doorstep-pickup',
  },
];

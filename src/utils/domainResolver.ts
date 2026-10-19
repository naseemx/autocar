/**
 * Multi-domain and location resolution utility for Vercel deployment.
 * Supports individual domains per city (e.g., autoankaufinhamburg.de, autoankaufcolonia.de,
 * autoankaufmünchen.de, auto-ankauf-rostock.de, autoankauf-in-koeln.de)
 * sharing the same codebase with dynamic canonical URLs, metadata, and location keywords.
 */

import { LOCATION_ITEMS } from '@/data/locations';

export interface LocationConfig {
  name: string; // German name (e.g., 'Köln', 'Hamburg', 'München', 'Rostock')
  nameEn: string; // English name (e.g., 'Cologne', 'Hamburg', 'Munich', 'Rostock')
  slug: string; // URL-safe slug (e.g., 'koeln', 'hamburg', 'muenchen', 'rostock')
  region: string; // Regional territory in German (e.g., 'NRW', 'Hamburg & Umgebung', 'Bayern', etc.)
  regionEn: string; // Regional territory in English (e.g., 'NRW', 'Hamburg and surrounding area', 'Bavaria', etc.)
  domain: string; // Active domain (e.g., 'autoankauf-in-koeln.de', 'autoankaufinhamburg.de')
  canonicalUrl: string; // e.g., 'https://autoankauf-in-koeln.de'
  brandName: string; // e.g., 'Autoankauf Köln', 'Autoankauf Hamburg'
  brandLogoLocation: string; // e.g., 'Köln', 'Hamburg'
  phone: string;
  email: string;
  keywordsEn: string[];
  keywordsDe: string[];
  seoKeywords: string[];
}

/**
 * Explicit mapping of domains to cities and regions
 */
export const KNOWN_DOMAINS: Record<string, { city: string; cityEn: string; region: string; regionEn: string }> = {
  'autoankaufinhamburg.de': {
    city: 'Hamburg',
    cityEn: 'Hamburg',
    region: 'Hamburg & Umgebung',
    regionEn: 'Hamburg and surrounding area',
  },
  'autoankaufcolonia.de': {
    city: 'Colonia',
    cityEn: 'Colonia',
    region: 'Köln, Bonn & NRW',
    regionEn: 'Cologne, Bonn & NRW',
  },
  'autoankauf-in-koeln.de': {
    city: 'Köln',
    cityEn: 'Cologne',
    region: 'Köln & NRW',
    regionEn: 'Cologne & NRW',
  },
  'autoankauf-koeln.de': {
    city: 'Köln',
    cityEn: 'Cologne',
    region: 'Köln & NRW',
    regionEn: 'Cologne & NRW',
  },
  'autoankaufmünchen.de': {
    city: 'München',
    cityEn: 'Munich',
    region: 'München & Bayern',
    regionEn: 'Munich & Bavaria',
  },
  'autoankaufmuenchen.de': {
    city: 'München',
    cityEn: 'Munich',
    region: 'München & Bayern',
    regionEn: 'Munich & Bavaria',
  },
  'xn--autoankaufmnchen-tzb.de': {
    city: 'München',
    cityEn: 'Munich',
    region: 'München & Bayern',
    regionEn: 'Munich & Bavaria',
  },
  'auto-ankauf-rostock.de': {
    city: 'Rostock',
    cityEn: 'Rostock',
    region: 'Rostock & Mecklenburg-Vorpommern',
    regionEn: 'Rostock and surrounding area',
  },
  'autoankaufrostock.de': {
    city: 'Rostock',
    cityEn: 'Rostock',
    region: 'Rostock & Mecklenburg-Vorpommern',
    regionEn: 'Rostock and surrounding area',
  },
};

/**
 * Generate location-specific keyword list in English and German
 */
export function generateLocationKeywords(city: string, cityEn: string) {
  const en = [
    `Car buying service ${cityEn}`,
    `Sell car ${cityEn}`,
    `Car dealer ${cityEn}`,
    `Used car buying service ${cityEn}`,
    `Passenger car buying service ${cityEn}`,
    `Vehicle buying service ${cityEn}`,
    `Sell car immediately ${cityEn}`,
    `Car buying service in ${cityEn}`,
    `Sell used car ${cityEn}`,
    `Accident car buying service ${cityEn}`,
    `Car export ${cityEn}`,
    `Car buying service ${cityEn} and surrounding area`,
    `Free car buying service ${cityEn}`,
    `Car buying service ${cityEn} with pickup`,
    `Car buying service ${cityEn} without TÜV`,
    `Car buying service ${cityEn} engine damage`,
    `Car buying service ${cityEn} transmission damage`,
    `Car buying service ${cityEn} accident car`,
    `Car buying service ${cityEn} cash payment`,
  ];

  const de = [
    `Autoankauf ${city}`,
    `Auto verkaufen ${city}`,
    `Autohändler ${city}`,
    `Gebrauchtwagen Ankauf ${city}`,
    `PKW Ankauf ${city}`,
    `Fahrzeugankauf ${city}`,
    `Auto sofort verkaufen ${city}`,
    `Autoankauf in ${city}`,
    `Gebrauchtwagen verkaufen ${city}`,
    `Unfallwagen Ankauf ${city}`,
    `Autoexport ${city}`,
    `Autoankauf ${city} und Umgebung`,
    `Kostenloser Autoankauf ${city}`,
    `Autoankauf ${city} mit Abholung`,
    `Auto sofort verkaufen ${city}`,
    `Autoankauf ${city} ohne TÜV`,
    `Autoankauf ${city} Motorschaden`,
    `Autoankauf ${city} Getriebeschaden`,
    `Autoankauf ${city} Unfallwagen`,
    `Autoankauf ${city} Barauszahlung`,
  ];

  return {
    en,
    de,
    combined: [...de, ...en],
  };
}

/**
 * Default location configuration (Köln / Cologne)
 */
export const DEFAULT_LOCATION_CONFIG: LocationConfig = {
  name: 'Köln',
  nameEn: 'Cologne',
  slug: 'koeln',
  region: 'Köln & NRW',
  regionEn: 'Cologne & NRW',
  domain: 'autoankauf-in-koeln.de',
  canonicalUrl: 'https://autoankauf-in-koeln.de',
  brandName: 'Autoankauf Köln',
  brandLogoLocation: 'Köln',
  phone: '+4915207107540',
  email: 'kontakt@autoankauf-in-koeln.de',
  keywordsEn: generateLocationKeywords('Köln', 'Cologne').en,
  keywordsDe: generateLocationKeywords('Köln', 'Cologne').de,
  seoKeywords: generateLocationKeywords('Köln', 'Cologne').combined,
};

/**
 * Clean hostname to extract pure domain (remove port, http, www)
 */
export function normalizeHost(host: string): string {
  if (!host) return '';
  let cleaned = host.toLowerCase().trim();
  try {
    cleaned = decodeURIComponent(cleaned);
  } catch {
    // ignore
  }
  return cleaned
    .replace(/^https?:\/\//, '')
    .split(':')[0]
    .replace(/^www\./, '')
    .trim();
}

/**
 * Find city item in location directory by city name or slug
 */
function findLocationItem(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return undefined;
  if (q === 'cologne' || q === 'colonia') {
    return LOCATION_ITEMS.find((l) => l.slug === 'koeln');
  }
  const qNormalized = q
    .replace(/ü/g, 'ue')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ß/g, 'ss');

  // Exact match first
  const exact = LOCATION_ITEMS.find((loc) => {
    const locSlug = loc.slug.toLowerCase();
    const locName = loc.name.toLowerCase();
    const locDeName = (loc.deName || '').toLowerCase();
    return (
      locSlug === q ||
      locSlug === qNormalized ||
      locName === q ||
      locName === qNormalized ||
      locDeName === q ||
      locDeName === qNormalized
    );
  });
  if (exact) return exact;

  // Prefix match (e.g. "frankfurt" -> "frankfurt-am-main")
  return LOCATION_ITEMS.find((loc) => {
    const locSlug = loc.slug.toLowerCase();
    const locName = loc.name.toLowerCase();
    return locSlug.startsWith(q) || locSlug.startsWith(qNormalized) || locName.startsWith(q);
  });
}

/**
 * Primary resolver: takes incoming request hostname and optional location query/cookie,
 * and produces the exact LocationConfig with canonical URL and keywords.
 */
export function resolveLocation(host?: string | null, locationParam?: string | null): LocationConfig {
  const cleanHost = normalizeHost(host || '');

  // 1. If explicit location override is provided via ?location= or cookie (useful for preview/testing)
  if (locationParam) {
    const locItem = findLocationItem(locationParam);
    if (locItem) {
      const city = locItem.deName || locItem.name;
      const cityEn = locItem.name;
      const slug = locItem.slug;
      const activeDomain = cleanHost.includes('.') && !cleanHost.includes('localhost') && !cleanHost.includes('vercel.app')
        ? cleanHost
        : `autoankauf-${slug}.de`;

      const kw = generateLocationKeywords(city, cityEn);
      const isKoeln = slug === 'koeln';

      return {
        name: city,
        nameEn: cityEn,
        slug,
        region: isKoeln ? 'Köln & NRW' : `${city} & Umgebung`,
        regionEn: isKoeln ? 'Cologne & NRW' : `${cityEn} and surrounding area`,
        domain: activeDomain,
        canonicalUrl: `https://${activeDomain}`,
        brandName: `Autoankauf ${city}`,
        brandLogoLocation: city,
        phone: '+4915207107540',
        email: `kontakt@${activeDomain}`,
        keywordsEn: kw.en,
        keywordsDe: kw.de,
        seoKeywords: kw.combined,
      };
    }
  }

  // 2. Check known domain dictionary
  if (cleanHost && KNOWN_DOMAINS[cleanHost]) {
    const known = KNOWN_DOMAINS[cleanHost];
    const locItem = findLocationItem(known.city) || findLocationItem(known.cityEn);
    const slug = locItem?.slug || 'koeln';
    const kw = generateLocationKeywords(known.city, known.cityEn);

    return {
      name: known.city,
      nameEn: known.cityEn,
      slug,
      region: known.region,
      regionEn: known.regionEn,
      domain: cleanHost,
      canonicalUrl: `https://${cleanHost}`,
      brandName: `Autoankauf ${known.city}`,
      brandLogoLocation: known.city,
      phone: '+4915207107540',
      email: `kontakt@${cleanHost}`,
      keywordsEn: kw.en,
      keywordsDe: kw.de,
      seoKeywords: kw.combined,
    };
  }

  // 3. Check if hostname contains any city slug or name
  if (cleanHost) {
    // Check specific known patterns: e.g. "colonia" -> Colonia / Cologne
    if (cleanHost.includes('colonia')) {
      const kwColonia = generateLocationKeywords('Colonia', 'Colonia');
      const kwKoeln = generateLocationKeywords('Köln', 'Cologne');
      const combinedDe = Array.from(new Set([...kwColonia.de, ...kwKoeln.de]));
      const combinedEn = Array.from(new Set([...kwColonia.en, ...kwKoeln.en]));
      return {
        name: 'Colonia',
        nameEn: 'Colonia',
        slug: 'koeln',
        region: 'Köln, Bonn & NRW',
        regionEn: 'Cologne, Bonn & NRW',
        domain: cleanHost,
        canonicalUrl: `https://${cleanHost}`,
        brandName: 'Autoankauf Colonia',
        brandLogoLocation: 'Colonia',
        phone: '+4915207107540',
        email: `kontakt@${cleanHost}`,
        keywordsEn: combinedEn,
        keywordsDe: combinedDe,
        seoKeywords: [...combinedDe, ...combinedEn],
      };
    }

    if (cleanHost.includes('koeln') || cleanHost.includes('cologne')) {
      const kw = generateLocationKeywords('Köln', 'Cologne');
      return {
        name: 'Köln',
        nameEn: 'Cologne',
        slug: 'koeln',
        region: 'Köln & NRW',
        regionEn: 'Cologne & NRW',
        domain: cleanHost,
        canonicalUrl: `https://${cleanHost}`,
        brandName: 'Autoankauf Köln',
        brandLogoLocation: 'Köln',
        phone: '+4915207107540',
        email: `kontakt@${cleanHost}`,
        keywordsEn: kw.en,
        keywordsDe: kw.de,
        seoKeywords: kw.combined,
      };
    }

    // Check München patterns (umlauts, ue, punycode mnchen)
    if (cleanHost.includes('münchen') || cleanHost.includes('muenchen') || cleanHost.includes('mnchen')) {
      const kw = generateLocationKeywords('München', 'Munich');
      return {
        name: 'München',
        nameEn: 'Munich',
        slug: 'muenchen',
        region: 'München & Bayern',
        regionEn: 'Munich & Bavaria',
        domain: cleanHost,
        canonicalUrl: `https://${cleanHost}`,
        brandName: 'Autoankauf München',
        brandLogoLocation: 'München',
        phone: '+4915207107540',
        email: `kontakt@${cleanHost}`,
        keywordsEn: kw.en,
        keywordsDe: kw.de,
        seoKeywords: kw.combined,
      };
    }

    const cleanHostNormalized = cleanHost
      .replace(/[-_.]/g, '')
      .replace(/ü/g, 'ue')
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ß/g, 'ss');

    // Check against all 101 cities
    for (const loc of LOCATION_ITEMS) {
      const slugPattern = loc.slug.replace(/-/g, '');
      const deNamePattern = (loc.deName || '').toLowerCase().replace(/[-_.]/g, '')
        .replace(/ü/g, 'ue').replace(/ä/g, 'ae').replace(/ö/g, 'oe');
      const namePattern = loc.name.toLowerCase().replace(/[-_.]/g, '');

      if (
        cleanHostNormalized.includes(slugPattern) ||
        (deNamePattern && cleanHostNormalized.includes(deNamePattern)) ||
        cleanHostNormalized.includes(namePattern)
      ) {
        const city = loc.deName || loc.name;
        const cityEn = loc.name;
        const kw = generateLocationKeywords(city, cityEn);
        const isKoeln = loc.slug === 'koeln';

        return {
          name: city,
          nameEn: cityEn,
          slug: loc.slug,
          region: isKoeln ? 'Köln & NRW' : `${city} & Umgebung`,
          regionEn: isKoeln ? 'Cologne & NRW' : `${cityEn} and surrounding area`,
          domain: cleanHost,
          canonicalUrl: `https://${cleanHost}`,
          brandName: `Autoankauf ${city}`,
          brandLogoLocation: city,
          phone: '+4915207107540',
          email: `kontakt@${cleanHost}`,
          keywordsEn: kw.en,
          keywordsDe: kw.de,
          seoKeywords: kw.combined,
        };
      }
    }
  }

  // 4. Default fallback: Köln
  return DEFAULT_LOCATION_CONFIG;
}

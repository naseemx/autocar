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
/**
 * Explicit mapping of domains to cities, regions, slugs, and canonical domains
 */
export const KNOWN_DOMAINS: Record<
  string,
  { city: string; cityEn: string; region: string; regionEn: string; slug: string; primaryDomain: string }
> = {
  // Hamburg (autoankaufinhamburg.de)
  'autoankaufinhamburg.de': {
    city: 'Hamburg',
    cityEn: 'Hamburg',
    slug: 'hamburg',
    region: 'Hamburg & Umgebung',
    regionEn: 'Hamburg and surrounding area',
    primaryDomain: 'autoankaufinhamburg.de',
  },
  'autoankauf-in-hamburg.de': {
    city: 'Hamburg',
    cityEn: 'Hamburg',
    slug: 'hamburg',
    region: 'Hamburg & Umgebung',
    regionEn: 'Hamburg and surrounding area',
    primaryDomain: 'autoankaufinhamburg.de',
  },
  'autoankaufhamburg.de': {
    city: 'Hamburg',
    cityEn: 'Hamburg',
    slug: 'hamburg',
    region: 'Hamburg & Umgebung',
    regionEn: 'Hamburg and surrounding area',
    primaryDomain: 'autoankaufinhamburg.de',
  },
  'auto-ankauf-hamburg.de': {
    city: 'Hamburg',
    cityEn: 'Hamburg',
    slug: 'hamburg',
    region: 'Hamburg & Umgebung',
    regionEn: 'Hamburg and surrounding area',
    primaryDomain: 'autoankaufinhamburg.de',
  },

  // Colonia (autoankaufcolonia.de)
  'autoankaufcolonia.de': {
    city: 'Colonia',
    cityEn: 'Colonia',
    slug: 'colonia',
    region: 'Köln, Bonn & NRW',
    regionEn: 'Cologne, Bonn & NRW',
    primaryDomain: 'autoankaufcolonia.de',
  },
  'autoankauf-colonia.de': {
    city: 'Colonia',
    cityEn: 'Colonia',
    slug: 'colonia',
    region: 'Köln, Bonn & NRW',
    regionEn: 'Cologne, Bonn & NRW',
    primaryDomain: 'autoankaufcolonia.de',
  },
  'auto-ankauf-colonia.de': {
    city: 'Colonia',
    cityEn: 'Colonia',
    slug: 'colonia',
    region: 'Köln, Bonn & NRW',
    regionEn: 'Cologne, Bonn & NRW',
    primaryDomain: 'autoankaufcolonia.de',
  },

  // Köln (autoankauf-in-koeln.de)
  'autoankauf-in-koeln.de': {
    city: 'Köln',
    cityEn: 'Cologne',
    slug: 'koeln',
    region: 'Köln & NRW',
    regionEn: 'Cologne & NRW',
    primaryDomain: 'autoankauf-in-koeln.de',
  },
  'autoankauf-koeln.de': {
    city: 'Köln',
    cityEn: 'Cologne',
    slug: 'koeln',
    region: 'Köln & NRW',
    regionEn: 'Cologne & NRW',
    primaryDomain: 'autoankauf-in-koeln.de',
  },
  'autoankaufkoeln.de': {
    city: 'Köln',
    cityEn: 'Cologne',
    slug: 'koeln',
    region: 'Köln & NRW',
    regionEn: 'Cologne & NRW',
    primaryDomain: 'autoankauf-in-koeln.de',
  },
  'autoankauf-in-köln.de': {
    city: 'Köln',
    cityEn: 'Cologne',
    slug: 'koeln',
    region: 'Köln & NRW',
    regionEn: 'Cologne & NRW',
    primaryDomain: 'autoankauf-in-koeln.de',
  },
  'autoankauf-köln.de': {
    city: 'Köln',
    cityEn: 'Cologne',
    slug: 'koeln',
    region: 'Köln & NRW',
    regionEn: 'Cologne & NRW',
    primaryDomain: 'autoankauf-in-koeln.de',
  },

  // München (autoankaufmünchen.de)
  'autoankaufmünchen.de': {
    city: 'München',
    cityEn: 'Munich',
    slug: 'muenchen',
    region: 'München & Bayern',
    regionEn: 'Munich & Bavaria',
    primaryDomain: 'autoankaufmünchen.de',
  },
  'autoankaufmuenchen.de': {
    city: 'München',
    cityEn: 'Munich',
    slug: 'muenchen',
    region: 'München & Bayern',
    regionEn: 'Munich & Bavaria',
    primaryDomain: 'autoankaufmünchen.de',
  },
  'xn--autoankaufmnchen-tzb.de': {
    city: 'München',
    cityEn: 'Munich',
    slug: 'muenchen',
    region: 'München & Bayern',
    regionEn: 'Munich & Bavaria',
    primaryDomain: 'autoankaufmünchen.de',
  },
  'auto-ankauf-muenchen.de': {
    city: 'München',
    cityEn: 'Munich',
    slug: 'muenchen',
    region: 'München & Bayern',
    regionEn: 'Munich & Bavaria',
    primaryDomain: 'autoankaufmünchen.de',
  },

  // Rostock (auto-ankauf-rostock.de)
  'auto-ankauf-rostock.de': {
    city: 'Rostock',
    cityEn: 'Rostock',
    slug: 'rostock',
    region: 'Rostock & Mecklenburg-Vorpommern',
    regionEn: 'Rostock and surrounding area',
    primaryDomain: 'auto-ankauf-rostock.de',
  },
  'autoankaufrostock.de': {
    city: 'Rostock',
    cityEn: 'Rostock',
    slug: 'rostock',
    region: 'Rostock & Mecklenburg-Vorpommern',
    regionEn: 'Rostock and surrounding area',
    primaryDomain: 'auto-ankauf-rostock.de',
  },
  'autoankauf-rostock.de': {
    city: 'Rostock',
    cityEn: 'Rostock',
    slug: 'rostock',
    region: 'Rostock & Mecklenburg-Vorpommern',
    regionEn: 'Rostock and surrounding area',
    primaryDomain: 'auto-ankauf-rostock.de',
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
 * Dedicated location configuration for Colonia
 */
export const COLONIA_LOCATION_CONFIG: LocationConfig = {
  name: 'Colonia',
  nameEn: 'Colonia',
  slug: 'colonia',
  region: 'Köln, Bonn & NRW',
  regionEn: 'Cologne, Bonn & NRW',
  domain: 'autoankaufcolonia.de',
  canonicalUrl: 'https://autoankaufcolonia.de',
  brandName: 'Autoankauf Colonia',
  brandLogoLocation: 'Colonia',
  phone: '+4915207107540',
  email: 'kontakt@autoankaufcolonia.de',
  keywordsEn: generateLocationKeywords('Colonia', 'Colonia').en,
  keywordsDe: generateLocationKeywords('Colonia', 'Colonia').de,
  seoKeywords: generateLocationKeywords('Colonia', 'Colonia').combined,
};

/**
 * Dedicated location configuration for Hamburg
 */
export const HAMBURG_LOCATION_CONFIG: LocationConfig = {
  name: 'Hamburg',
  nameEn: 'Hamburg',
  slug: 'hamburg',
  region: 'Hamburg & Umgebung',
  regionEn: 'Hamburg and surrounding area',
  domain: 'autoankaufinhamburg.de',
  canonicalUrl: 'https://autoankaufinhamburg.de',
  brandName: 'Autoankauf Hamburg',
  brandLogoLocation: 'Hamburg',
  phone: '+4915207107540',
  email: 'kontakt@autoankaufinhamburg.de',
  keywordsEn: generateLocationKeywords('Hamburg', 'Hamburg').en,
  keywordsDe: generateLocationKeywords('Hamburg', 'Hamburg').de,
  seoKeywords: generateLocationKeywords('Hamburg', 'Hamburg').combined,
};

/**
 * Dedicated location configuration for München
 */
export const MUENCHEN_LOCATION_CONFIG: LocationConfig = {
  name: 'München',
  nameEn: 'Munich',
  slug: 'muenchen',
  region: 'München & Bayern',
  regionEn: 'Munich & Bavaria',
  domain: 'autoankaufmünchen.de',
  canonicalUrl: 'https://autoankaufmünchen.de',
  brandName: 'Autoankauf München',
  brandLogoLocation: 'München',
  phone: '+4915207107540',
  email: 'kontakt@autoankaufmuenchen.de',
  keywordsEn: generateLocationKeywords('München', 'Munich').en,
  keywordsDe: generateLocationKeywords('München', 'Munich').de,
  seoKeywords: generateLocationKeywords('München', 'Munich').combined,
};

/**
 * Dedicated location configuration for Rostock
 */
export const ROSTOCK_LOCATION_CONFIG: LocationConfig = {
  name: 'Rostock',
  nameEn: 'Rostock',
  slug: 'rostock',
  region: 'Rostock & Mecklenburg-Vorpommern',
  regionEn: 'Rostock and surrounding area',
  domain: 'auto-ankauf-rostock.de',
  canonicalUrl: 'https://auto-ankauf-rostock.de',
  brandName: 'Autoankauf Rostock',
  brandLogoLocation: 'Rostock',
  phone: '+4915207107540',
  email: 'kontakt@auto-ankauf-rostock.de',
  keywordsEn: generateLocationKeywords('Rostock', 'Rostock').en,
  keywordsDe: generateLocationKeywords('Rostock', 'Rostock').de,
  seoKeywords: generateLocationKeywords('Rostock', 'Rostock').combined,
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
  if (q === 'cologne') {
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
 * Primary resolver: takes incoming request hostname, optional location query/cookie,
 * and optional domain override.
 *
 * Domain priority:
 * 1. If incoming host/domain is one of the 5 explicit domains, that domain ALWAYS determines
 *    the identity and city (cookies or location queries CANNOT override a domain's identity).
 * 2. On localhost / preview deployments, explicit domain parameter (?domain=...) or location parameter
 *    (?location=... / ?city=...) can be used to preview each domain.
 * 3. Default fallback is Köln (autoankauf-in-koeln.de).
 */
export function resolveLocation(
  host?: string | null,
  locationParam?: string | null,
  domainOverride?: string | null
): LocationConfig {
  const rawTarget = domainOverride || host || '';
  const cleanHost = normalizeHost(rawTarget);

  // 1. Direct Known Domain dictionary match (Highest priority)
  if (cleanHost && KNOWN_DOMAINS[cleanHost]) {
    const known = KNOWN_DOMAINS[cleanHost];
    const kw = generateLocationKeywords(known.city, known.cityEn);
    const activeDomain = known.primaryDomain || cleanHost;

    return {
      name: known.city,
      nameEn: known.cityEn,
      slug: known.slug,
      region: known.region,
      regionEn: known.regionEn,
      domain: activeDomain,
      canonicalUrl: `https://${activeDomain}`,
      brandName: `Autoankauf ${known.city}`,
      brandLogoLocation: known.city,
      phone: '+4915207107540',
      email: `kontakt@${activeDomain}`,
      keywordsEn: kw.en,
      keywordsDe: kw.de,
      seoKeywords: kw.combined,
    };
  }

  // 2. Substring & keyword matching in hostname for the 5 target domains
  if (cleanHost && !cleanHost.includes('localhost') && !cleanHost.includes('127.0.0.1')) {
    // Colonia: autoankaufcolonia.de
    if (cleanHost.includes('colonia')) {
      return COLONIA_LOCATION_CONFIG;
    }

    // Hamburg: autoankaufinhamburg.de
    if (cleanHost.includes('hamburg')) {
      return HAMBURG_LOCATION_CONFIG;
    }

    // München: autoankaufmünchen.de, autoankaufmuenchen.de, punycode mnchen
    if (
      cleanHost.includes('münchen') ||
      cleanHost.includes('muenchen') ||
      cleanHost.includes('mnchen') ||
      cleanHost.includes('tzb')
    ) {
      return MUENCHEN_LOCATION_CONFIG;
    }

    // Rostock: auto-ankauf-rostock.de
    if (cleanHost.includes('rostock')) {
      return ROSTOCK_LOCATION_CONFIG;
    }

    // Köln: autoankauf-in-koeln.de, autoankauf-koeln.de
    if (cleanHost.includes('koeln') || cleanHost.includes('cologne') || cleanHost.includes('köln')) {
      return DEFAULT_LOCATION_CONFIG;
    }
  }

  // 3. Testing & preview overrides: if on localhost / preview, or explicit query parameter passed
  if (locationParam) {
    const q = locationParam.toLowerCase().trim();

    if (q === 'colonia') {
      return COLONIA_LOCATION_CONFIG;
    }
    if (q === 'hamburg') {
      return HAMBURG_LOCATION_CONFIG;
    }
    if (q === 'muenchen' || q === 'münchen' || q === 'munich') {
      return MUENCHEN_LOCATION_CONFIG;
    }
    if (q === 'rostock') {
      return ROSTOCK_LOCATION_CONFIG;
    }
    if (q === 'koeln' || q === 'cologne' || q === 'köln') {
      return DEFAULT_LOCATION_CONFIG;
    }

    // Search broader 101 German cities
    const locItem = findLocationItem(locationParam);
    if (locItem) {
      const city = locItem.deName || locItem.name;
      const cityEn = locItem.name;
      const slug = locItem.slug;
      const activeDomain = `autoankauf-${slug}.de`;
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

  // 4. Default fallback: Köln (autoankauf-in-koeln.de)
  return DEFAULT_LOCATION_CONFIG;
}

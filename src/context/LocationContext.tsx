'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LocationConfig, DEFAULT_LOCATION_CONFIG, resolveLocation } from '@/utils/domainResolver';

interface LocationContextType {
  locationConfig: LocationConfig;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  displayLocation: string;
  canonicalUrl: string;
  domain: string;
  keywordsEn: string[];
  keywordsDe: string[];
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const STORAGE_KEY = 'kauf_auto_selected_location';

// Module-level reference for direct translation lookups outside hooks
let currentActiveLocationConfig: LocationConfig = DEFAULT_LOCATION_CONFIG;

export function getActiveLocationConfig(): LocationConfig {
  return currentActiveLocationConfig;
}

export function setActiveLocationConfig(config: LocationConfig) {
  currentActiveLocationConfig = config;
}

interface LocationProviderProps {
  children: ReactNode;
  initialLocation?: LocationConfig;
}

export function LocationProvider({ children, initialLocation }: LocationProviderProps) {
  const [locationConfig, setLocationConfig] = useState<LocationConfig>(() => {
    const config = initialLocation || DEFAULT_LOCATION_CONFIG;
    setActiveLocationConfig(config);
    return config;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const params = new URLSearchParams(window.location.search);
      const domainParam = params.get('domain');
      const locationParam = params.get('location') || params.get('city');

      // Resolve based on current client hostname or query parameters
      const resolved = resolveLocation(hostname, locationParam, domainParam);
      if (resolved.slug !== locationConfig.slug || resolved.domain !== locationConfig.domain) {
        setLocationConfig(resolved);
        setActiveLocationConfig(resolved);
      }

      try {
        localStorage.setItem(STORAGE_KEY, resolved.slug);
      } catch {
        // storage fallback
      }
    }
  }, [initialLocation, locationConfig.slug, locationConfig.domain]);

  const setSelectedLocation = (query: string) => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const params = new URLSearchParams(window.location.search);
      const domainParam = params.get('domain');
      const resolved = resolveLocation(hostname, query, domainParam);
      setLocationConfig(resolved);
      setActiveLocationConfig(resolved);
      try {
        localStorage.setItem(STORAGE_KEY, resolved.slug);
        document.cookie = `site_location=${resolved.slug};path=/;max-age=2592000;SameSite=Lax`;
      } catch {
        // storage fallback
      }
    }
  };

  return (
    <LocationContext.Provider
      value={{
        locationConfig,
        selectedLocation: locationConfig.name,
        setSelectedLocation,
        displayLocation: locationConfig.name,
        canonicalUrl: locationConfig.canonicalUrl,
        domain: locationConfig.domain,
        keywordsEn: locationConfig.keywordsEn,
        keywordsDe: locationConfig.keywordsDe,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation(): LocationContextType {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LocationContextType {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  displayLocation: string;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const STORAGE_KEY = 'kauf_auto_selected_location';
const DEFAULT_LOCATION = 'Köln';

export function LocationProvider({ children }: { children: ReactNode }) {
  const [selectedLocation, setSelectedLocationState] = useState<string>(DEFAULT_LOCATION);

  useEffect(() => {
    try {
      // Force default location as place cannot be changed by user
      setSelectedLocationState(DEFAULT_LOCATION);
      localStorage.setItem(STORAGE_KEY, DEFAULT_LOCATION);
    } catch {
      // localStorage fallback
    }
  }, []);

  const setSelectedLocation = (_loc: string) => {
    // Locked to default location
    setSelectedLocationState(DEFAULT_LOCATION);
  };

  const displayLocation = DEFAULT_LOCATION;

  return (
    <LocationContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation,
        displayLocation,
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


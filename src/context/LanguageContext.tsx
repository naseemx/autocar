'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'EN' | 'DE';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isGerman: boolean;
  isEnglish: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'kauf_auto_language_v2';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('DE'); // German default for Autoankauf Köln
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (savedLang === 'EN' || savedLang === 'DE') {
        setLanguageState(savedLang);
      } else {
        // Default to German when website opens
        setLanguageState('DE');
      }
    } catch {
      // localStorage unavailable fallback
    }
    setIsInitialized(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // safe fallback
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang.toLowerCase();
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'DE' : 'EN');
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language.toLowerCase();
    }
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isGerman: language === 'DE',
        isEnglish: language === 'EN',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

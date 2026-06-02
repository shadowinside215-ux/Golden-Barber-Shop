import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translations } from '../lib/translations';

export type Language = 'en' | 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  langDir: 'ltr' | 'rtl';
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = translations[language];
  const langDir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = langDir;
    document.documentElement.lang = language;
  }, [language, langDir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, langDir, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

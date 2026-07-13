import { createContext, useContext, useState } from 'react';

import { DEFAULT_LANGUAGE } from 'Constants';

import I18n from 'Locales';

const LanguageContext = createContext({
  language: DEFAULT_LANGUAGE,
  changeLanguage: (_lang: string) => {},
});

interface LanguageProviderProps {
  children: React.ReactNode;
}

/**
 * The URL decides the language: / is Romanian, /en is English. That is what lets
 * each language ship its own crawlable meta tags (see the seo-i18n plugin in
 * vite.config.ts), so the path has to win over the stored preference — otherwise
 * someone with 'ro' saved would open /en and still be served Romanian.
 */
const languageFromPath = () =>
  window.location.pathname.startsWith('/en') ? 'en' : DEFAULT_LANGUAGE;

const pathForLanguage = (lang: string) => (lang === DEFAULT_LANGUAGE ? '/' : `/${lang}`);

const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState(languageFromPath());

  const changeLanguage = (lang: string) => {
    localStorage.setItem('language', lang);
    I18n.changeLanguage(lang);
    setLanguage(lang);

    // A full navigation rather than a client-side one: it re-fetches the document
    // for that language, so <html lang> and the meta tags match what is rendered.
    if (window.location.pathname !== pathForLanguage(lang)) {
      window.location.assign(pathForLanguage(lang));
    }
  };

  return (
    <LanguageContext.Provider key={language} value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
};

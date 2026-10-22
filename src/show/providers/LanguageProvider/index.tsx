import { createContext, useContext, useLayoutEffect, useRef, useState } from 'react';

import { DEFAULT_LANGUAGE } from 'Constants';

import I18n from 'Locales';
import { router } from 'Navigator/routes';
import { track } from 'Helpers/analytics';

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
  const scrollPosition = useRef<{ window: number; main: number } | null>(null);

  // The key below remounts the whole tree so every I18n.t call re-runs. Put the
  // reader back where they were once the new language has rendered.
  useLayoutEffect(() => {
    if (!scrollPosition.current) return;

    window.scrollTo(0, scrollPosition.current.window);
    document.querySelector('main')?.scrollTo(0, scrollPosition.current.main);
    scrollPosition.current = null;
  }, [language]);

  const changeLanguage = (lang: string) => {
    if (lang === language) return;

    track('language_change', { from: language, to: lang });

    scrollPosition.current = {
      window: window.scrollY,
      main: document.querySelector('main')?.scrollTop ?? 0,
    };

    localStorage.setItem('language', lang);
    I18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    setLanguage(lang);

    // Client-side, so the page doesn't reload. The URL still follows the language,
    // so a refresh or a shared link lands on the document with the matching
    // static meta tags (the seo-i18n plugin in vite.config.ts).
    router.navigate(pathForLanguage(lang), { replace: true, preventScrollReset: true });
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

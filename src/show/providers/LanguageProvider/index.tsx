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

const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || DEFAULT_LANGUAGE);

  const changeLanguage = (lang: string) => {
    localStorage.setItem('language', lang);
    I18n.changeLanguage(lang);
    setLanguage(lang);
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

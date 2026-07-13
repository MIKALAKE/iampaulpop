import I18n from 'i18next';

import { DEFAULT_LANGUAGE } from 'Constants';

import en from './en';
import ro from './ro';

// The URL is the single source of truth for the language: / is Romanian, /en is
// English. It has to outrank localStorage, because the meta tags and <html lang>
// of the served document are fixed per path — letting a stored preference flip the
// rendered language would leave the page contradicting its own <head>.
const initialLanguage = window.location.pathname.startsWith('/en') ? 'en' : DEFAULT_LANGUAGE;

I18n.init({
  fallbackLng: DEFAULT_LANGUAGE,
  lng: initialLanguage,
  resources: { en, ro },
});

export default I18n;

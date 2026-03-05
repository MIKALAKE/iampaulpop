import I18n from 'i18next';

import { DEFAULT_LANGUAGE } from 'Constants';

import en from './en';
import ro from './ro';

I18n.init({
  fallbackLng: 'ro',
  lng: localStorage.getItem('language') || DEFAULT_LANGUAGE,
  resources: { en, ro },
});

export default I18n;

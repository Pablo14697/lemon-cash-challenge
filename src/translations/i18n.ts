import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Resources } from './languages/languages.types';
import { English, Spanish } from './languages';

const RESOURCES: Resources = {
  en: English,
  es: Spanish,
};

const DEFAULT_LANGUAGE = 'es';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: RESOURCES,
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
});

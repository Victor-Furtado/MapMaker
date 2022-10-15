import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en_US from './locales/en_US.json';
import pt_BR from './locales/pt_BR.json';

const resources = {
  pt_BR,
  en_US,
};

export const availableLanguages = {
  en_US: 'English',
  pt_BR: 'Português',
};

i18n.use(initReactI18next).use(LanguageDetector).init({
  resources,
  defaultNS: 'common',
  fallbackLng: 'en_US',
});

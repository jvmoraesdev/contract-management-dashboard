import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/locales/en/dashboard.json';
import ptBr from '@/locales/pt-br/dashboard.json';

export const resources = {
  en: {
    translation: en
  },
  ptBr: {
    translation: ptBr
  }
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: ['ptBr', 'en'],
  debug: true,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Traduções de exemplo
const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      description: "This is a simple translation example",
      // Adicione mais strings de tradução aqui
    },
  },
  pt: {
    translation: {
      welcome: "Bem-vindo",
      description: "Este é um exemplo simples de tradução",
      // Adicione mais strings de tradução aqui
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Idioma padrão
  fallbackLng: "en", // Idioma de fallback caso a tradução não esteja disponível
  interpolation: {
    escapeValue: false, // React já faz a sanitização
  },
});

export default i18n;

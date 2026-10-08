import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "appTitle": "Smart City Waste Intelligence",
      "commandCenter": "Command Center",
      "zones": "Zones",
      "history": "History",
      "landfill": "Landfill",
      "collection": "Collection",
      "segregation": "Segregation",
      "dataAI": "Data & AI",
      "routes": "Routes",
      "alerts": "Alerts",
      "ecoAgent": "EcoAgent",
      "dashboardSummary": "Dashboard Summary",
      "language": "Language",
    }
  },
  hi: {
    translation: {
      "appTitle": "स्मार्ट सिटी अपशिष्ट बुद्धिमत्ता",
      "commandCenter": "कमांड सेंटर",
      "zones": "क्षेत्र",
      "history": "इतिहास",
      "landfill": "लैंडफिल",
      "collection": "संग्रहण",
      "segregation": "अलगाव",
      "dataAI": "डेटा और एआई",
      "routes": "मार्ग",
      "alerts": "अलर्ट",
      "ecoAgent": "इकोएजेंट",
      "dashboardSummary": "डैशबोर्ड सारांश",
      "language": "भाषा",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;

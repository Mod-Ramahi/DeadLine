import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationAR from "./translation/ar.json";
import translationEN from "./translation/en.json";

const resources = {
  en: {
    translation: translationEN
  },
  ar: {
    translation: translationAR
  }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next) 
    .init({
        resources,
        lng: "en", 

        interpolation: {
        escapeValue: false 
        },
        react:{
            usesuspense:false
        }
    });

  export default i18n;
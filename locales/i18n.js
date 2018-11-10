import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';
import Expo from 'expo';
// Import all locales
import en from './en.json';
import sv from './sv.json';

// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector
const languageDetector = {
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: (callback) => { return /*'en'; */ Expo.DangerZone.Localization.getPreferredLocalesAsync().then(lng => { callback(lng[0].replace('_', '-')); }) },
  init: () => {},
  cacheUserLanguage: () => {}
}

i18n.use(languageDetector)
    .use(reactI18nextModule)
    .init({
      fallbackLng: 'sv',

      resources: {
        // en: en, 
        sv: sv
      },
      ns: ['common'],
      defaultNS: 'common',

      debug: true,

      interpolation: {
        escapeValue: false, // not needed for react as it does escape per default to prevent xss!
      }
  });


export default i18n;
import '@sailor/i18n-mach-pro-intl-polyfill';
import i18next, { i18n, TFunction } from 'i18next';
import ICU from 'i18next-icu';
import { initReactI18next } from 'react-i18next';
import I18nLanguageDetector from '@sailor/i18n-language-detector/lib/native';
export interface I18nClient extends i18n {
  getText: TFunction;
}

function createInstance() {
  const instance: I18nClient = i18next
    .createInstance({
      parseMissingKeyHandler(key, defaultValue) {
        if (typeof defaultValue === 'undefined') {
          return '';
        }
        return defaultValue;
      },
      load: 'currentOnly',
      fallbackLng: 'en',
    })
    .use(ICU)
    .use(I18nLanguageDetector)
    .use(initReactI18next) as I18nClient;

  Object.defineProperty(instance, 'getText', {
    value: instance.t,
    writable: true,
    enumerable: false,
    configurable: true,
  });
  return instance;
}
const i18nClient = createInstance();

export { i18nClient, createInstance };
export {
  I18n,
  MLocale,
  NumberFormat,
  DateTimeFormat,
  DateTimeStyle,
  RelativeTimeFormat,
} from '@sailor/i18n-extends';

export {
  useTranslation,
  withTranslation,
  initReactI18next,
  Trans,
  I18nContext,
  composeInitialProps,
  getInitialProps,
  I18nextProvider,
} from 'react-i18next';

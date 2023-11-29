import i18next, { i18n, TFunction } from 'i18next';
import ICU from 'i18next-icu';
import {
  useTranslation,
  withTranslation,
  initReactI18next,
  Trans,
  I18nContext,
  composeInitialProps,
  getInitialProps,
  I18nextProvider,
} from 'react-i18next';
import I18nLanguageDetector from '@sailor/i18n-language-detector/lib/web';
import { owlPlugin } from '@sailor/i18n-owl';
import { I18n } from '@sailor/i18n-extends';
import { getCacheLocale } from '@sailor/i18n-shared';
import type { OwlOptions } from '@sailor/i18n-owl';
export interface I18nClient extends i18n {
  getText: TFunction;
  getCurrentLocale: () => string | undefined;
}

declare module 'i18next' {
  interface PluginOptions {
    owl?: OwlOptions;
  }
}

function createInstance() {
  const instance = i18next
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
    .use(owlPlugin)
    .use(initReactI18next) as I18nClient;

  Object.defineProperty(instance, 'getText', {
    value: instance.t,
    writable: true,
    enumerable: false,
    configurable: true,
  });

  Object.defineProperty(instance, 'getCurrentLocale', {
    value: getCurrentLocale,
    writable: true,
    enumerable: false,
    configurable: true,
  });

  function getCurrentLocale() {
    // 初始化完成
    if (instance.language) return instance.language;
    // 还未初始化完成， 配置了 lng 会覆盖 derector
    if (instance.options.lng) {
      return instance.options.lng;
    }
    const lngs = instance.services.languageDetector.detect();
    return instance.services.languageUtils.getBestMatchFromCodes(lngs);
  }
  return instance;
}

const i18nClient = createInstance();

export {
  i18nClient,
  createInstance,
  I18n,
  getCacheLocale,
  useTranslation,
  withTranslation,
  initReactI18next,
  Trans,
  I18nContext,
  composeInitialProps,
  getInitialProps,
  I18nextProvider,
};

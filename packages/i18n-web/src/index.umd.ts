import i18next, { i18n, TFunction } from 'i18next';
import ICU from 'i18next-icu';
import I18nLanguageDetector from '@sailor/i18n-language-detector/lib/web';
import { I18n } from '@sailor/i18n-extends';

export interface I18nClient extends i18n {
  getText: TFunction;
}

const i18nClient: I18nClient = i18next
  .createInstance({
    parseMissingKeyHandler(key, defaultValue) {
      if (typeof defaultValue === 'undefined') {
        return '';
      }
      return defaultValue;
    },
  })
  .use(ICU)
  .use(I18nLanguageDetector) as I18nClient;

Object.defineProperty(i18nClient, 'getText', {
  value: i18nClient.t,
  writable: true,
  enumerable: false,
  configurable: true,
});

Object.defineProperty(i18nClient, 'getCurrentLocale', {
  value: getCurrentLocale,
  writable: true,
  enumerable: false,
  configurable: true,
});

function getCurrentLocale() {
  // 初始化完成
  if (i18nClient.language) return i18nClient.language;
  // 还未初始化完成， 配置了 lng 会覆盖 derector
  if (i18nClient.options.lng) {
    return i18nClient.options.lng;
  }
  const lngs = i18nClient.services.languageDetector.detect();
  return i18nClient.services.languageUtils.getBestMatchFromCodes(lngs);
}

export { i18nClient, I18n };

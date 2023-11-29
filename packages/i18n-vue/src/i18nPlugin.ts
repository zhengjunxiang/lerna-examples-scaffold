import i18next, { InitOptions, i18n } from 'i18next';
import ICU from 'i18next-icu';
import I18nLanguageDetector from '@sailor/i18n-language-detector/lib/web';
import { owlPlugin } from '@sailor/i18n-owl';

type initFunc = (i18nClient: i18n) => i18n;
let _Vue;
let i18nClient;

export default function install(Vue, initFunc: initFunc) {
  // @ts-ignore
  if (install.installed && _Vue === Vue) return;
  // @ts-ignore
  install.installed = true;
  _Vue = Vue;

  i18nClient = i18next
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
    .use(owlPlugin)
    .use(I18nLanguageDetector);
  // 获取当前语言
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
  if (typeof initFunc === 'function') {
    initFunc(i18nClient);
  }

  const genericT = i18nClient.t.bind(i18nClient);

  let changeTracker;
  if (typeof Vue.observable !== 'undefined') {
    changeTracker = Vue.observable({ lastI18nChange: new Date() });
  } else {
    changeTracker = { lastI18nChange: new Date() };
    Vue.util.defineReactive(changeTracker, 'lastI18nChange', new Date());
  }
  const invalidate = (event) => () => {
    changeTracker.lastI18nChange = new Date();
  };
  const usingTranslation = () => changeTracker.lastI18nChange;
  const rerenderOn = [
    'initialized',
    'languageChanged',
    'loaded',
    'added',
    'removed',
  ];
  rerenderOn.forEach((event) => {
    switch (event) {
      case 'added':
      case 'removed':
        i18nClient.store?.on(event, invalidate(event));
        break;
      default:
        i18nClient.on(event, invalidate(event));
        break;
    }
  });

  Vue.prototype.$getText = function (key, options) {
    usingTranslation(); // 在渲染时获取响应时对象，在语言改变时将触发重新渲染
    if (i18nClient.isInitialized) {
      return genericT(key, options);
    } else {
      let ret = { defaultValue: '' };
      if (typeof options === 'object') ret = options;
      if (typeof options === 'string') ret.defaultValue = options;
      return ret.defaultValue || '';
    }
  };
  const isSupportProxy = typeof Proxy === 'function';
  Vue.prototype.$i18nClient = isSupportProxy
    ? new Proxy(i18nClient, {
        get(target, prop) {
          usingTranslation();
          return Reflect.get(target, prop);
        },
      })
    : i18nClient;
}

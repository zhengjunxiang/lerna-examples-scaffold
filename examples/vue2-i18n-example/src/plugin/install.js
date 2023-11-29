import i18next from 'i18next';
import ICU from 'i18next-icu';
let _Vue;
let i18nClient;
export default function install(Vue, options = {}) {
  if (install.installed && _Vue === Vue) return;
  install.installed = true;

  _Vue = Vue;
  i18nClient = i18next.use(ICU);
  i18nClient.init(options);

  const changeTracker = Vue.observable({ lastI18nChange: new Date() });
  const invalidate = () => (changeTracker.lastI18nChange = new Date());
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
        i18nClient.store?.on(event, invalidate);
        break;
      default:
        i18nClient.on(event, invalidate);
        break;
    }
  });

  Vue.prototype.$getText = function (key, options) {
    usingTranslation(); // 在渲染时获取响应时对象，在语言改变时将触发重新渲染
    if (i18nClient.isInitialized) {
      return i18nClient.t(key, options);
    } else {
      return key;
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

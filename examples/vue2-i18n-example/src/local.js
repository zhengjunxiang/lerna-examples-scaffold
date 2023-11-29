import Vue from 'vue';
import App from './Components/App.vue';

import resources from './assets/dev/locales/resources';
import { i18nPlugin } from '@sailor/i18n-vue';
import { normalizedUrl } from '@sailor/i18n-utils';

Vue.use(i18nPlugin, (i18nClient) => {
  i18nClient.init({
    resources,
    ns: ['waimai_home', 'waimai_home_f'],
    defaultNS: 'waimai_home',
    supportedLngs: ['en', 'zh', 'zh-HK'],
  });
  const getCurrentLocale = i18nClient.getCurrentLocale();
  console.log('====初始化获取 getCurrentLocale', getCurrentLocale);
});
[
  'https://123.sankuai.com?name=122',
  'https://123.sankuai.com?locale=cn',
  'https://123.sankuai.com',
  'https://123.sankuai.com?name=122#hasdd',
  'https://123.sankuai.com?name=122#hasdd#4444',
  'https://123.sankuai.com?name=122&locale=en#hasdd#4444',
].forEach((item) => {
  console.log('==== item', item);
  console.log('==== item normalizedUrl', normalizedUrl(item, 'zh-HK'));
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');

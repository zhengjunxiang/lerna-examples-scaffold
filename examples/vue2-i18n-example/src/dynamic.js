import Vue from 'vue';
import App from './Components/DynamicApp.vue';

import resources from './assets/locales/resources.js';
import { i18nPlugin } from '@sailor/i18n-vue';
import ChainedBackend from 'i18next-chained-backend';
import OpenAPIBackend from '@sailor/i18n-web-openapi-backend';
import resourcesToBackend from 'i18next-resources-to-backend';
import Owl from '@dp/owl-i18n'


console.log('==== Owl', Owl);
Vue.use(i18nPlugin, (i18nClient) => {
  i18nClient.use(ChainedBackend).init({
    fallbackLng: 'en',
    ns: ['waimai_home', 'waimai_home_f'],
    // 配置backend
    backend: {
      backends: [OpenAPIBackend, resourcesToBackend(resources)],
      // 这里配置一下所使用的projectId和namespaceId
      backendOptions: [
        {
          env: 'dev',
          namespaces: [
            {
              projectId: 91,
              apiKey: '2d6962c3385144a1b72332ec2646b7d5',
              namespaceId: 'w2exgtcgaz',
              name: 'waimai_home',
            },
            {
              projectId: 91,
              apiKey: '2d6962c3385144a1b72332ec2646b7d5',
              namespaceId: 'w2exgtcgaz',
              name: 'waimai_home_f',
            },
          ],
        },
      ],
    },
    owl: {
      devMode: true
    }
  });
});
new Vue({
  render: (h) => h(App),
}).$mount('#app');

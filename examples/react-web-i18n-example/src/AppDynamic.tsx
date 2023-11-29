import React from 'react';
import BaseComponent from './components/BaseComponent';
import { i18nClient } from '@sailor/i18n-web';
import resourcesToBackend from 'i18next-resources-to-backend';
import ChainedBackend from 'i18next-chained-backend';
import OpenAPIBackend from '@sailor/i18n-web-openapi-backend';
import resources from './assets/locales/resources';
import { createRoot } from 'react-dom/client';
import { getI18nWebParams } from '@sailor/i18n-utils';
// @ts-ignore
import Owl from '@dp/owl-i18n'


console.log('==== Owl', Owl);
async function getConfig() {
  const r1 = await getI18nWebParams({ clientType: 'c_ios', env: 'prod' });
  console.log('==== r1', r1);
}
getConfig();
i18nClient.use(ChainedBackend).init({
  // fallbackLng: 'zh-HK',
  // supportedLngs: ['en', 'zh-HK', 'zh-CN'],
  // lng: 'en',
  // defaultNS: false,
  // fallbackNS: 'waimai_home',
  ns: ['waimai_home', 'waimai_home_f'],
  debug: true,
  detection: {},
  // resources,

  // 配置backend
  backend: {
    backends: [OpenAPIBackend, resourcesToBackend(resources)],
    // 这里配置一下所使用的projectId和namespaceId
    backendOptions: [
      {
        env: 'test',
        namespaces: [
          {
            projectId: 1,
            namespaceId: 'qy9xq1l70k',
            name: 'waimai_home',
          },
          {
            projectId: 1,
            namespaceId: 'qy9xq1l70k',
            name: 'waimai_home_f',
          },
        ],
      },
    ],
  },
  owl: {
    devMode: true,
    open: true
  }
});

const root = createRoot(document.getElementById('app') as Element);
root.render(<BaseComponent />);

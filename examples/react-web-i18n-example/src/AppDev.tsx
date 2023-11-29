import React from 'react';
import DevBaseComponent from './components/DevBaseComponent';
import { i18nClient } from '@sailor/i18n-web';
import resourcesToBackend from 'i18next-resources-to-backend';
import ChainedBackend from 'i18next-chained-backend';
import OpenAPIBackend from '@sailor/i18n-web-openapi-backend';
import resources from './assets/dev/locales/resources';
import { createRoot } from 'react-dom/client';


i18nClient.use(ChainedBackend).init({
  fallbackLng: 'en',
  // defaultNS: false,
  // fallbackNS: 'waimai_home',
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
            namespaceId: 'xccwknm5h1',
            name: 'waimai_home',
          },
          {
            projectId: 91,
            namespaceId: 'w2exgtcgaz',
            name: 'waimai_home_f',
          },
        ],
      },
    ],
  }
});
const root = createRoot(document.getElementById('app') as Element);
root.render(<DevBaseComponent />);

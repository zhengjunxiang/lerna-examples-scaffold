
import resourcesToBackend from 'i18next-resources-to-backend';
import ChainedBackend from 'i18next-chained-backend';
import OpenAPIBackend from '@sailor/i18n-web-openapi-backend';
import { i18nClient } from '@sailor/i18n-web';
import resources from './assets/locales/resources';

i18nClient
.use(ChainedBackend)
.init({
    fallbackLng: 'zh',
    ns: ['waimai_home', 'waimai_home_2'],
    defaultNS: 'waimai_home',
    // 配置backend
    backend: {
        backends: [
            OpenAPIBackend,
            resourcesToBackend(resources)
        ],
        // 这里配置一下所使用的projectId和namespaceId
        backendOptions: [{
            projectId: '91',
            apiKey: '2d6962c3385144a1b72332ec2646b7d5',
            namespaces: [{
                name: 'waiwai_home',
                namespaceId: 'a4239a5fd7664fa086d4f28c5ee1f6b4',
            },{
                name: 'waiwai_home_2',
                namespaceId: 'a4239a5fd7664fa086d4f28c5ee1f6b4',
            },]
        }]
    }
});

export default i18nClient;
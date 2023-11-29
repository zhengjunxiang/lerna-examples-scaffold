import * as i18next from 'i18next';
import { checkUpdate, fetchText } from './api';
import { LanguagePackage, OpenAPIBackendOption, OpenAPIRequestParams } from './interface';
const getDefaults = (): OpenAPIBackendOption => ({
    namespaces: [],
    env: 'prod',
});

declare module 'i18next' {
    interface Services {
      $owl: any;
    }
  }

class I18nOpenAPIBackend implements i18next.BackendModule {
    type: 'backend';
    public static type: string;
    services: i18next.Services;
    backendOptions: OpenAPIBackendOption;
    constructor(services: i18next.Services, backendOptions: OpenAPIBackendOption, i18nextOptions: i18next.InitOptions) {
        this.init(services, backendOptions, i18nextOptions);
    }
    getDefauleNs(i18nextOptions: i18next.InitOptions) {
        const { defaultNS } = i18nextOptions || {};
        if (typeof defaultNS === 'string') {
            return defaultNS;
        } else if (Array.isArray(defaultNS) && defaultNS.length > 0) {
            return defaultNS[0];
        }
        return '';
    }
    normalizeOptions(i18nextOptions: i18next.InitOptions) {
        const { namespaces } = this.backendOptions;
        const len = namespaces.length;
        const defaultNS = this.getDefauleNs(i18nextOptions);
        if (len === 1) {
            const curNamespace = namespaces[0];
            if (!curNamespace.name) {
                curNamespace.name = defaultNS;
            }
            return;
        } 
        if (len > 1) {
            let isSetDefault = false;
            const namespaceNames: string[] = [];
            for(const namespace of namespaces) {
                if (!namespace.name) {
                    console.error('OpenAPIBackend parameter error: ensure that the name value in the namespace not empty');
                    if (isSetDefault) {
                        console.error('OpenAPIBackend parameter error: ensure that the name value in the namespace is unique');
                        return;
                    }
                    isSetDefault = true;
                    namespace.name = defaultNS;
                }
                if (namespaceNames.includes(namespace.name!)) {
                    console.error('OpenAPIBackend parameter error: ensure that the name value in the namespace is unique');
                    return;
                }
                namespaceNames.push(namespace.name!);
            }
        }
        
    }
    init(services: i18next.Services, backendOptions: OpenAPIBackendOption, i18nextOptions: i18next.InitOptions): void {
        this.services = services;
        this.backendOptions = {
            ...getDefaults(),
            ...backendOptions,
        };
        this.normalizeOptions(i18nextOptions);
        this.type = 'backend';
    }
    
    getCacheKey(projectId: string, namespaceId: string, language: string, namespace: string): string {
        return `${projectId}_${namespaceId}_${language}_${namespace}`; 
    }
    async read(language: string, namespace: string, callback: i18next.ReadCallback): Promise<void> {
        const { env, namespaces } = this.backendOptions;
        const curNamespaceInfo = namespaces.find(item => {
           return  item.name === namespace;
        });
        if (!curNamespaceInfo) {
            return callback(new Error('The space does not exist in the configuration'), null);
        }
        const $owl = this.services.$owl;
        const { projectId, namespaceId } = curNamespaceInfo;
        const params: OpenAPIRequestParams = {
            projectId,
            namespaceId,
            locale: language,
            onlyVersion: 0,
        };

        try {

            let res;
            try {
                // @ts-ignore
                res = await checkUpdate(params, env);
            } catch (error) {
                $owl && $owl.setMetric('FEi18nBundleUpdateFailure', 1);
                $owl && $owl.addError(`checkUpdate 异常：${error.message}`);
                return callback(error, null);
            }
            const cacheKey = this.getCacheKey(projectId, namespaceId, language, namespace);
            
            if (res.packages && res.packages.length > 0) {
                const cachedText = window.localStorage.getItem(cacheKey);
                const cachedData: any = cachedText ? JSON.parse(cachedText) : {};
                const languagePackage: LanguagePackage = res.packages[0];

                if (cachedData 
                    && cachedData.version 
                    && languagePackage.version === cachedData.version
                ) {
                    // 存在缓存
                    $owl && $owl.setMetric('FEi18nBundleCacheUsage', 1);
                    return callback(null, cachedData.kv);
                }
            } 
            // 不存在缓存
            let resText;
            try {
                resText = await fetchText(params, env);
            } catch (error) {
                $owl && $owl.setMetric('FEi18nBundleGetTextFailure', 1);
                $owl && $owl.addError(`fetchText 异常：${error.message || ''}`);
                return callback(error, null);
            }
            $owl && $owl.setMetric('FEi18nBundleGetTextSuccess', 1);
            if (resText.version && resText.kv) {
                $owl && $owl.setMetric('FEi18nBundleUpdateSuccess', 1);
                window.localStorage.setItem(cacheKey, JSON.stringify(resText));
                return callback(null, resText.kv);
            } else {
                $owl && $owl.setMetric('FEi18nBundleEmpty', 1);
                return callback(new Error('language package empty'), null);
            }
        } catch (error) {
            $owl && $owl.addError(`openapi read 异常：${error.message}`);
            return callback(error, null);
        }
    }

    // create?(languages: readonly string[], namespace: string, key: string, fallbackValue: string): void {
    //     throw new Error('Method not implemented.');
    // }

    // readMulti?(languages: readonly string[], namespaces: readonly string[], callback: i18next.MultiReadCallback): void {
    //     throw new Error('Method not implemented.');
    // }

    // save?(language: string, namespace: string, data: i18next.ResourceLanguage): void {
    //     // throw new Error('Method not implemented.');
    //     console.log('save lanaguage = ', language);
    //     console.log('save namespace = ', namespace);
    //     console.log('save data = ', data);
    // }   
    
}

I18nOpenAPIBackend.type = 'backend';
export default I18nOpenAPIBackend;
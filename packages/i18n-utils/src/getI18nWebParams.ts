import { fetchConfig, fetchCurrentLocalInfo } from './api';
import { ConfigData, Params } from './types';

let cacheConfig: ConfigData = null;

// 用户输入：默认选择香港地区
let defaultRegionInfo = {
  systemRegion: 'HK',
  systemLocale: 'zh-HK',
  systemTimeZone: 'GMT+08:00',
};
async function getConfig(clientType: string, env) {
  if (cacheConfig) return cacheConfig;
  const res = await fetchConfig({ clientType }, env);
  cacheConfig = res;
  return cacheConfig;
}

const getI18nWebParams = async (params: Params) => {
  const { clientType, env = 'prod' } = params || {};
  if (!params || !clientType) {
    throw new Error('clientType is required');
  }
  try {
    let [regionsConfig, localInfo] = await Promise.all([
      getConfig(clientType, env),
      fetchCurrentLocalInfo(defaultRegionInfo, env),
    ]);
    if (localInfo) {
      const { supportLocales, supportRegions } = regionsConfig;
      const currentRegionLocales =
        supportRegions[defaultRegionInfo.systemRegion].supportLocales;
      let locales = [];
      if (currentRegionLocales) {
        locales = currentRegionLocales.map((item) => {
          const itemInfo = supportLocales.find(
            (localeItem) => localeItem.locale === item,
          );
          return {
            value: itemInfo.locale,
            label: itemInfo.localizedDisplayName,
          };
        });
      }
      localInfo.locales = locales;
      return {
        localInfo,
      };
    }
    return null;
  } catch (error) {
    console.error('getI18nWebParams error:', error);
    return null;
  }
};
export { getI18nWebParams };

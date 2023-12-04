import axios from 'axios';
import Horn from '@mtfe/horn-sdk';
import { stringify } from './utils';

interface IInstance {
  init: (parmas: {
    systemRegion: string,
    systemLocale: string,
    systemTimeZone: string,
    appToken: string | number
    isDev?: boolean
  }, cb: (result: Record<string, any> | null, errorInfo?: {
    message: string,
    error: any
  }) => void) => void
};

function createInstance(): IInstance {
  const instance = {
    init: (params, cb) => {
      const { isDev = false } = params;
      const url = isDev
        ? 'https://ocean.waimai.test.sankuai.com/api/openapi/v1/currentLocalInfo'
        : 'https://i18n.mykeeta.com/api/openapi/v1/currentLocalInfo';

      // 获取 localStorage 缓存
      let L10N_STORE = null;
      try {
        const localL10nStore = window.localStorage.getItem('L10N_STORE');
        if (localL10nStore) {
          L10N_STORE = JSON.parse(window.localStorage.getItem('L10N_STORE'));
        }
      } catch (error) {
        L10N_STORE = null;
        console.error('L10N_STORE_PARSE:', error);
      }

      axios.post(
        url,
        stringify(params),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
      )
      .then(function (response) {
        if (response?.data?.code === 0) {
          const {config} = response?.data?.data || {};

          Horn.init({}, { isDev });
          Horn.fetch(config.commonConfig.hornConfigKey).then((result) => {
            cb && cb(result);
            window.localStorage.setItem('L10N_STORE', JSON.stringify(result));
          }).catch((error) => {
            // 当有缓存时，返回缓存
            if (L10N_STORE) {
              cb && cb(L10N_STORE, {
                message: 'RESULT_FROM_STORAGE',
                error
              });
            } else {
              cb && cb(null, {
                message: 'ERROR_FROM_HORNSDK',
                error
              });
            }
            error && console.error('ERROR_FROM_HORNSDK', error);
          });
        }
      })
      .catch(function (error) {
        // 当有缓存时，返回缓存
        if (L10N_STORE) {
          cb && cb(L10N_STORE, {
            message: 'RESULT_FROM_STORAGE',
            error
          });
        } else {
          cb && cb(null, {
            message: 'ERROR_FROM_LOCALINFO',
            error
          });
        }
        error && console.error('ERROR_FROM_LOCALINFO', error);
      });
    }
  };

  return instance;
}

const l10nClient = createInstance();

export {
  l10nClient,
  createInstance,
};

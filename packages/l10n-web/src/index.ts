import axios from 'axios';
import { stringify } from './utils';
import { IInstance } from './interface';

axios.defaults.timeout = 5000;

function createInstance(): IInstance {
  let _LocalInfo = null;
  let _L10NInfo = null;

  return {
    init: (params, cb) => {
      const { isDev = false } = params;
      const localInfoUrl = isDev
        ? 'https://xxx.com/api/openapi/v1/currentLocalInfo'
        : 'https://xxx.com/api/openapi/v1/currentLocalInfo';

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
        localInfoUrl,
        stringify(params),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
      )
      .then(function (response) {
        if (response?.data?.code === 0) {
          const { config } = response?.data?.data || {};
          _LocalInfo = response?.data?.data || null;
        }
      })
      .catch(function (error) {
        // 当有缓存时，返回缓存
        if (L10N_STORE) {
          _LocalInfo = L10N_STORE;

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
    },

    exportLocalInfo: () => _LocalInfo,

    exportL10nInfo: () => _L10NInfo
  };
}

const l10nClient = createInstance();

export {
  l10nClient,
  createInstance,
};

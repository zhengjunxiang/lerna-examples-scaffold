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
    isAutoSave?: boolean
  }, cb: (result: Record<string, any>, error?: {
    message: string,
    error: any
  }) => void) => void
};

function createInstance(): IInstance {
  const instance = {
    init: (params, cb) => {
      const { isDev = false, isAutoSave = true } = params;
      const url = isDev
        ? 'https://ocean.waimai.test.sankuai.com/api/openapi/v1/currentLocalInfo'
        : 'https://i18n.mykeeta.com/api/openapi/v1/currentLocalInfo';
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
            if (isAutoSave) {
              window.localStorage.setItem('L10N_STORE', JSON.stringify(result));
            }
            cb && cb(result);
          }).catch((error) => {
            cb && cb(null, {
              message: 'ERROR_FROM_HORNSDK',
              error
            });
            console.error('ERROR_FROM_HORNSDK', error);
          });
        }
      })
      .catch(function (error) {
        cb && cb(null, {
          message: 'ERROR_FROM_LOCALINFO',
          error
        });
        console.error('ERROR_FROM_LOCALINFO', error);
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

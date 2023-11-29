import React from 'react';
import { useTranslation } from '@sailor/i18n-web';
import i18nClient from './instance';

export default () => {
  const { t } = useTranslation(undefined, { i18n: i18nClient });
  console.log('==== another', i18nClient.getCurrentLocale());
  return (
    <div className="app">
      <div className="app-body">
        <div>
          {/* @ts-ignore */}
          <div>
            c_sp_last_order:
            {i18nClient.getText('c_sp_last_order')}
          </div>
          <div>{t('c_sp_last_order')}</div>
        </div>
      </div>
    </div>
  );
};

import React, { useCallback, useState } from 'react';
import { i18nClient, useTranslation } from '@sailor/i18n-web';
import Another from './anotherInstance/Another';

export default () => {
  const [language, setLanguage] = useState('zh');
  const { i18n } = useTranslation();
  const onLanguageChange = useCallback((e: any) => {
    i18n.changeLanguage(e.target.value, (err, t) => {
      if (!err) {
        console.log('changeLanguage', e.target.value);
        setLanguage(e.target.value);
      }
    });
  }, []);
  const getLg = () => {
    console.log('==== ', i18nClient.getCurrentLocale());
  };
  console.log('==== dev', i18nClient.getCurrentLocale());

  const t1 = i18nClient.t('c_sp_last_order')
  return (
    <div className="app">
      <div className="app-body">
        <div onClick={getLg}>多语言测试：{language}</div>
        <div>
          {/* @ts-ignore */}
          <div>
            waimai_home c_sp_last_order字段：{t1}
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="html">
          <input
            onChange={onLanguageChange}
            checked={language === 'zh-CN'}
            type="radio"
            name="fav_language"
            value="zh-CN"
          />
          简体中文
        </label>
        <br /> 
        <label htmlFor="css">
          <input
            onChange={onLanguageChange}
            checked={language === 'en'}
            type="radio"
            name="fav_language"
            value="en"
          />
          English
        </label>
        <br />
        <label htmlFor="css">
          <input
            onChange={onLanguageChange}
            checked={language === 'zh-HK'}
            type="radio"
            name="fav_language"
            value="zh-HK"
          />
          中文（繁体）（香港）
        </label>
        <br />
      </div>
      <Another></Another>
    </div>
  );
};

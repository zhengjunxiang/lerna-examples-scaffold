import React, { useCallback, useState } from 'react';
import { i18nClient, useTranslation } from '@sailor/i18n-web';

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
    // i18nClient.changeLanguage(e.target.value, (err, t) => {
    //     console.error("changeLanguage error ", err);
    //     if (!err) {
    //         setLanguage(e.target.value);
    //     }
    // });
  }, []);
  return (
    <div className="app">
      <div className="app-body">
        <div>多语言测试：{language}</div>
        <div>
          {/* @ts-ignore */}
          <div>
            waimai_home machine_2字段：
            {i18nClient.t('machine_2', { count: 2, name: 'lj', age: 10 })}
          </div>
          {/* @ts-ignore */}
          <div>
            waimai_home_f f_1字段：
            {i18nClient.t('waimai_home_f:f_1')}
          </div>
          {/* @ts-ignore */}
          <div>
            waimai_home_f f_2字段：
            {i18nClient.t('waimai_home_f:f_2')}
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
    </div>
  );
};

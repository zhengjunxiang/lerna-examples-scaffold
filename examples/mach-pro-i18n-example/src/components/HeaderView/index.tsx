import * as React from 'react';
import { useTranslation, I18n, MLocale } from '@sailor/i18n-mach-pro';
import './index.css';

const HeaderView = () => {
    const { t, i18n } = useTranslation();
    const locale: MLocale = I18n.getCurrentLocale();
    const deicalNum = I18n.getNumberFormat().format(1234.567);
    const currency = I18n.getCurrencyFormat('HKD').format(1234.567);
    const unit = I18n.getMeasureFormat('kilometer').format(1234.567);
    const percent = I18n.getPercentFormat().format(1234.567);
    const now = Date.now();
    const df = I18n.getDateFormat().format(now);
    const tf = I18n.getTimeFormat().format(now);
    const dtf = I18n.getDateTimeFormat('short', 'short').format(now);
    const sk = I18n.getDateFormatWithSkeleton('yyyyMMMMdd').format(now);
    const rdf = I18n.getRelativeTimeFormat().format(1, 'day');

    return (
        <view style={{
            marginTop: Mach.env.safeAreaInsets.top + Mach.env.navigationBarHeight,
            backgroundColor: '#ffffff',
            padding: '0 8',
            width: Mach.env.screenWidth - 8,
            borderRadius: 8,
            margin: 8,
            flexDirection: 'column',
            height: 600,
        }}>
            <text content={t('title')} />
            <text>{t('current_language', { CURRENT: locale.language })}</text>
            <text>{t('I18n_useage')}</text>
            <text className='wrap-text'>{t('I18n_locale', { LANGUAGE: locale.language, LOCALE_ID: locale.baseName })}</text>
            <text className='wrap-text'>{t('I18n_Number_format')}</text>
            <text className='wrap-text'>{t('I18n_Number_format_num', {Num: deicalNum} )}</text>
            <text className='wrap-text'>{t('I18n_Number_format_currency', {Num: currency} )}</text>
            <text className='wrap-text'>{t('I18n_Number_format_currency', {Num: unit} )}</text>
            <text className='wrap-text'>{t('I18n_Number_format_percent', {Num: percent} )}</text>
            <text className='wrap-text'>{t('I18n_DateTime')}</text>
            <text className='wrap-text'>{t('I18n_Date_format', {DATE: df})}</text>
            <text className='wrap-text'>{t('I18n_Time_format', {TIME: tf})}</text>
            <text className='wrap-text'>{t('I18n_DateTime_format', {DATETIME: dtf})}</text>
            <text className='wrap-text'>{t('I18n_DateTimeSkeleton_format', {DATETIME: sk})}</text>
            <text className='wrap-text'>{t('I18n_RelativeTimeFormat')}</text>
            <text className='wrap-text'>{t('I18n_RelativeTimeFormat_format', {VAL: rdf})}</text>
        </view>
    );
};

export default HeaderView;
import * as React from 'react';
import { useTranslation, I18n } from '@sailor/i18n-mach-pro';

const CardView = () => {
    const { t } = useTranslation();
    const now = Date.now();

    return (
        <view style={{
            width: Mach.env.screenWidth - 8,
            height: 250,
            backgroundColor: '#ffffff',
            flexDirection: 'column',
            padding: 4,
            borderRadius: 8,
            margin: 8,
        }}>
            <text content={`${t('icu_message_syntax')}: `}/>
            <text content={t('icu', { pluralCount: 0 })} />
            <text content={t('icu', { pluralCount: 1 })} />
            <text content={t('icu', { pluralCount: 501 })} />
            <text content={t('fm', {
                FIRST: 'Anthony',
                LAST: 'Pipkin',
                age: 8,
            })} />
            <text content={t('birthday', {
                year: 2,
            })} />
            <text content={
                t('gbp', {
                    amount: 123456.78,
                })
            }/>
            <text content={
                t('munit', {
                    d: 123
                })
            } />
            <text content={
                t('percent', {
                    amount: 1332.33
                })
            }/>
            <text content={t('date3m', {
                    d: now
                })}/>
            <text content={
                t('date2m', {
                    d: now
                })
            } />
            <text content={
                t('times', {
                    d: now
                })
            } />
            <text content={
                t('timej', {
                    d: now
                })
            } />
            <text content={
                t('munit', {
                    d: 123
                })
            } />
            <text>{t('otherns:accrossns')}</text>
        </view>
    );
};

export default CardView;
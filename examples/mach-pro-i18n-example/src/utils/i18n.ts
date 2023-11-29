/* eslint-disable max-len */
import { i18nClient } from '@sailor/i18n-mach-pro';

i18nClient
.init({
  // the translations
  // (tip move them in a JSON file and import them,
  // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
  debug: false,
  fallbackLng: 'en', 
  fallbackNS: 'translation',
  lng: 'zh-Hans-CN',
  resources: {
    en: {
      translation: {
        'Welcome to React': '[translation]Welcome to React and react-i18next(en)'
      },
      otherns: {
        'Welcome to React': '[otherns]Welcome to React and react-i18next(en)'
      },
    },
    'en-US': {
      translation: {
        'Welcome to React': '[translation]Welcome to React and react-i18next(en-US)'
      },
      otherns: {
        'title': 'Welcome to react using react-i18next',
        'description.part1': 'To get started, edit <1>src/App.js</1> and save to reload.',
        'description.part2': 'Switch language between english and german using buttons above.',
        'icu': '{numPersons, plural, =0 {no persons} =1 {one person} other {# persons}} en-US',
        'icu_and_trans': 'We invited <0>{numPersons, plural, =0 {no persons} =1 {one person} other {# persons}}</0>.',
        'Welcome, {name}!': 'Welcome, {name}!',
        'Welcome, <0>{name}</0>!': 'Welcome, <0>{name}</0>!',
        'Trainers: {trainersCount, number}': 'Trainers: {trainersCount, number}',
        'Trainers: <0>{trainersCount, number}</0>!': 'Trainers: <0>{trainersCount, number}</0>!',
        'Caught on {catchDate, date, full}': 'Caught on {catchDate, date, full}',
        'Caught on <0>{catchDate, date, full}</0>!': 'Caught on <0>{catchDate, date, full}</0>!',
        '{gender, select,  male {He avoids bugs.} female {She avoids bugs.} other {They avoid bugs.}}': '{gender, select,  male {He avoids bugs.} female {She avoids bugs.} other {They avoid bugs.}}',
        '{gender, select,  male {<0>He</0> avoids bugs.} female {<1>She</1> avoids bugs.} other {<2>They</2> avoid bugs.}}': '{gender, select,  male {<0>He</0> avoids bugs.} female {<1>She</1> avoids bugs.} other {<2>They</2> avoid bugs.}}',
        '{itemsCount1, plural,  =0 {There is no item.} one {There is # item.} other {There are # items.}}': '{itemsCount1, plural,  =0 {There is no item.} one {There is # item.} other {There are # items.}}',
        '{itemsCount2, plural,  =0 {There is no item.} one {There is # item.} other {There are # items.}}': '{itemsCount2, plural,  =0 {There is no item.} one {There is # item.} other {There are # items.}}',
        '{itemsCount3, plural,  =0 {There is no item.} one {There is # item.} other {There are # items.}}': '{itemsCount3, plural,  =0 {There is no item.} one {There is # item.} other {There are # items.}}',
        'testKey': '{itemsCount3, plural,  =0 { There is <0>no</0> item. } one { There is <1>#</1> item. } other { There are <2>#</2> items. }}',
      },
    },
    'zh-Hans-CN': {
      translation: {
        'Welcome to React': '[translation]欢迎使用React i18next(CN)'
      },
      otherns: {
        'title': 'Welcome to react using react-i18next',
        'description.part1': 'To get started, edit <1>src/App.js</1> and save to reload.',
        'description.part2': 'Switch language between english and german using buttons above.',
        'icu': '{numPersons, plural, =0 {没人} =1 {个人} other {# 人}} zh-Hans-CN',
        'icu_and_trans': 'We invited <0>{numPersons, plural, =0 {no persons} =1 {one person} other {# persons}}</0>.',
        'Welcome, {name}!': 'Welcome, {name}!',
        'Welcome, <0>{name}</0>!': 'Welcome, <0>{name}</0>!',
        'Trainers: {trainersCount, number}': 'Trainers: {trainersCount, number}',
        'Trainers: <0>{trainersCount, number}</0>!': 'Trainers: <0>{trainersCount, number}</0>!',
        'Caught on {catchDate, date, full}': 'Caught on {catchDate, date, full}',
        'Caught on <0>{catchDate, date, full}</0>!': 'Caught on <0>{catchDate, date, full}</0>!',
        '{gender, select,  male {He avoids bugs.} female {She avoids bugs.} other {They avoid bugs.}}': '{gender, select,  male {He avoids bugs.} female {She avoids bugs.} other {They avoid bugs.}}',
        '{gender, select,  male {<0>He</0> avoids bugs.} female {<1>She</1> avoids bugs.} other {<2>They</2> avoid bugs.}}': '{gender, select,  male {<0>He</0> avoids bugs.} female {<1>She</1> avoids bugs.} other {<2>They</2> avoid bugs.}}',
        '{itemsCount1, plural,  =0 {There is no item.} one {There is # item.} other {There are # items.}}': '{itemsCount1, plural,  =0 {There is no item.} one {There is # item.} other {There are # items.}}',
        '{itemsCount2, plural,  =0 {There is no item.} one {There is # item.} other {There are # items.}}': '{itemsCount2, plural,  =0 {There is no item.} one {There is # item.} other {There are # items.}}',
        '{itemsCount3, plural,  =0 {There is no item.} one {There is # item.} other {There are # items.}}': '{itemsCount3, plural,  =0 {There is no item.} one {There is # item.} other {There are # items.}}',
        'testKey': '{itemsCount3, plural,  =0 { There is <0>no</0> item. } one { There is <1>#</1> item. } other { There are <2>#</2> items. }}',
      },
    },
    'zh-Hans-HK': {
      translation: {
        'Welcome to React': '[translation]欢迎使用React i18next(HK)'
      },
      otherns: {
        'Welcome to React': '[otherns]欢迎使用React i18next(HK)'
      },
    },
  },
  interpolation: {
    escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
  react: {
    useSuspense: false,
  },
  defaultNS: 'otherns',
  partialBundledLanguages: true,
  saveMissing: true,
  returnNull: false,
}, (err, t) => {
    if (err) {
        return console.log('something went wrong loading', err);
    }
    
    console.log('init callback = ', t('Interpolation', { what: 'female', how: 'great' }));
});

export default i18nClient;
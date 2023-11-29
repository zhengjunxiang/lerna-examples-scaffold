import { defineProperty } from '@formatjs/ecma402-abstract';
import { shouldPolyfill } from './should-polyfill';
import { getCanonicalLocales } from './intl-getcanonicallocales';
import { NumberFormat } from './intl-numberformat';
import { DateTimeFormat } from './intl-datetimeformat';
import { PluralRules } from './intl-pluralrules';
import { RelativeTimeFormat } from './intl-relativetimeformat';
import { Locale } from './intl-locale';

if (shouldPolyfill()) {
    if (typeof globalThis !== 'undefined') {
        Object.defineProperty(globalThis, 'Intl', {
            value: {},
        });
    }

    Object.defineProperty(Intl, 'getCanonicalLocales', {
        value: getCanonicalLocales,
        writable: true,
        enumerable: false,
        configurable: true,
    });
    
    defineProperty(Intl, 'NumberFormat', { value: NumberFormat });
    defineProperty(Intl, 'DateTimeFormat', { value: DateTimeFormat });
    defineProperty(Intl, 'RelativeTimeFormat', { value: RelativeTimeFormat });
    defineProperty(Intl, 'PluralRules', { value: PluralRules });
    defineProperty(Intl, 'Locale', { value: Locale });
}

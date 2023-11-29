import {
    LDMLPluralRule
} from '@formatjs/ecma402-abstract';
import { MachProI18N } from '@sailor/i18n-mach-pro-native';
export class PluralRules implements Intl.PluralRules {
    options: Intl.PluralRulesOptions | undefined;

    constructor(locales?: string | string[], options?: Intl.PluralRulesOptions) {
        this.options = options;
    }

    public resolvedOptions(): Intl.ResolvedPluralRulesOptions {
        return {
            locale: 'zh-Hant-HK',
            pluralCategories: [],
            type: 'cardinal',
            minimumIntegerDigits: -1,
            minimumFractionDigits: -1,
            maximumFractionDigits: -1,
            minimumSignificantDigits: -1,
            maximumSignificantDigits: -1
        };
    }

    public select(val: number): LDMLPluralRule {
        const opts: MachProI18N.PluralOptions = {
            number: val,
            type: 'cardinal',
        };

        return MachProI18N.getPluralRulesOfNumber(opts);
    }

    toString() {
        return '[object Intl.PluralRules]';
    }

    public static supportedLocalesOf(
        locales?: string | string[],
        options?: Pick<Intl.PluralRulesOptions, 'localeMatcher'>
    ) {
        return locales || [];
    }

    static getDefaultLocale() {
        return {};
    }

    public static polyfilled = true;
}

try {
    if (typeof Symbol !== 'undefined') {
        Object.defineProperty(PluralRules.prototype, Symbol.toStringTag, {
            value: 'Intl.PluralRules',
            writable: false,
            enumerable: false,
            configurable: true,
        });
    }
    
    try {
        // https://github.com/tc39/test262/blob/master/test/intl402/PluralRules/length.js
        Object.defineProperty(PluralRules, 'length', {
            value: 0,
            writable: false,
            enumerable: false,
            configurable: true,
        });
    } catch (error) {
        // IE 11 sets Function.prototype.length to be non-configurable which will cause the
        // above Object.defineProperty to throw an error.
    }
    // https://github.com/tc39/test262/blob/master/test/intl402/RelativeTimeFormat/constructor/length.js
    Object.defineProperty(PluralRules.prototype.constructor, 'length', {
        value: 0,
        writable: false,
        enumerable: false,
        configurable: true,
    });
    // https://github.com/tc39/test262/blob/master/test/intl402/RelativeTimeFormat/constructor/supportedLocalesOf/length.js
    Object.defineProperty(PluralRules.supportedLocalesOf, 'length', {
        value: 1,
        writable: false,
        enumerable: false,
        configurable: true,
    });
} catch (error) {
    
}
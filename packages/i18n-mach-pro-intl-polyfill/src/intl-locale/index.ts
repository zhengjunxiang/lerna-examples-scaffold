import { MachProI18N } from '@sailor/i18n-mach-pro-native';
export interface IntlLocaleOptions {
    language?: string
    script?: string
    region?: string
    calendar?: string
    collation?: string
    hourCycle?: 'h11' | 'h12' | 'h23' | 'h24'
    caseFirst?: 'upper' | 'lower' | 'false'
    numberingSystem?: string
    numeric?: boolean
}

export interface IntlLocaleInternal extends IntlLocaleOptions {
    locale: string
    initializedLocale: boolean
}

const RELEVANT_EXTENSION_KEYS = ['ca', 'co', 'hc', 'kf', 'kn', 'nu'] as const;

export class Locale {
    /**
     * https://www.unicode.org/reports/tr35/#Likely_Subtags
     */
    public maximize(): Locale {
        return this;
    }

    /**
     * https://www.unicode.org/reports/tr35/#Likely_Subtags
     */
    public minimize(): Locale {
        return this;
    }

    public toString() {
        return '';
    }

    public get baseName() {
        return MachProI18N.getCurrentLocaleInfo()?.baseName;
    }

    public get calendar() {
        return MachProI18N.getCurrentLocaleInfo()?.calendar;
    }

    public get collation() {
        return undefined;
    }

    public get hourCycle() {
        return undefined;
    }

    public get caseFirst() {
        return undefined;
    }

    public get numeric() {
        return undefined;
    }
    public get numberingSystem() {
        return undefined;
    }
    /**
     * https://tc39.es/proposal-intl-locale/#sec-Intl.Locale.prototype.language
     */
    public get language() {
        return MachProI18N.getCurrentLocaleInfo()?.language;
    }
    /**
     * https://tc39.es/proposal-intl-locale/#sec-Intl.Locale.prototype.script
     */
    public get script() {
        return MachProI18N.getCurrentLocaleInfo()?.script;
    }
    /**
     * https://tc39.es/proposal-intl-locale/#sec-Intl.Locale.prototype.region
     */
    public get region() {
        return MachProI18N.getCurrentLocaleInfo()?.region;
    }

  static relevantExtensionKeys = RELEVANT_EXTENSION_KEYS;
}
import { MLocale } from './locale';

export interface RelativeTimeOptions {
    numeric?: 'always' | 'auto',
    style?: 'long' | 'short' | 'narrow',
}

export type RelativeTimeUnit = 'year' | 'quarter' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second';

export class RelativeTimeFormat {
    private options: RelativeTimeOptions;
    constructor(opts: RelativeTimeOptions = {}) {
        this.options = opts;
    }

    public static getRelativeTimeFormat(): RelativeTimeFormat {
        return new RelativeTimeFormat();
    }

    public format(val: number, unit: RelativeTimeUnit) {
        const locale: MLocale = MLocale.getCurrentLocale();
        const rtf: Intl.RelativeTimeFormat = new Intl.RelativeTimeFormat(locale.baseName, {
            numeric: 'auto',
            style: 'narrow',
            ...this.options
        });
        console.log('rtf = ', rtf);
        return rtf.format(val, unit);
    }
}
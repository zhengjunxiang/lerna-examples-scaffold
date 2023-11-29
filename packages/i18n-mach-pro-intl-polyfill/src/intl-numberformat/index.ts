import {
    NumberFormatOptions,
} from '@formatjs/ecma402-abstract';
import { MachProI18N } from '@sailor/i18n-mach-pro-native';
export class NumberFormat {
    private options: NumberFormatOptions | undefined;

    constructor(locales?: string | string[], options?: NumberFormatOptions) {
        this.options = options;
    }

    formatToParts(this: Intl.NumberFormat, x: number) {
        return [];
    }

    format(value?: number) {
        if (typeof value !== 'number') {
            return NaN;
        }

        const options = this.options;
        const opts: MachProI18N.FormatNumberOptions = {
            number: value,
            style: this.options?.style || 'decimal',
        };
        
        if (options?.style === 'currency') {
            opts.currencyCode = this.options?.currency;
            opts.currencyStyle = this.options?.currencyDisplay || 'symbol';
        } else if (options?.style === 'unit') {
            opts.unitCode = this.options?.unit;
            opts.unitStyle = this.options?.unitDisplay;
        }

        if (typeof this.options?.maximumFractionDigits !== 'undefined') {
            opts.maximumFractionDigits = this.options?.maximumFractionDigits;
        }

        if (typeof this.options?.maximumSignificantDigits !== 'undefined') {
            opts.maximumSignificantDigits = this.options.maximumSignificantDigits;
        }

        if (typeof this.options?.minimumFractionDigits !== 'undefined') {
            opts.minimumFractionDigits = this.options.minimumFractionDigits;
        }

        if (typeof this.options?.minimumIntegerDigits !== 'undefined') {
            opts.minimumIntegerDigits = this.options.minimumIntegerDigits;
        }

        if (typeof this.options?.minimumSignificantDigits !== 'undefined') {
            opts.minimumSignificantDigits = this.options.minimumSignificantDigits;
        }
        return MachProI18N.formatNumber(opts);
    }

    resolvedOptions() {
        return this.options;
    }

    public static supportedLocalesOf(
        locales: string | string[],
        options?: Pick<Intl.RelativeTimeFormatOptions, 'localeMatcher'>
    ): string[] {
        return Array.isArray(locales) ? locales : [ locales ];
    }
  
    public static polyfilled = true;
}
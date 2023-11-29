import {
    defineProperty,
    DateTimeFormat as OriginalDateTimeFormat,
} from '@formatjs/ecma402-abstract';
import { MachProI18N } from '@sailor/i18n-mach-pro-native';

interface IDateTimeFormat extends OriginalDateTimeFormat {
    options?: Intl.DateTimeFormatOptions;
}

/**
 * 根据Intl.DateTimeFormatOptions 生成 Date time skeleton
 * @param opts Intl.DateTimeFormatOptions
 * @returns 
 */
function dateTimeSkeletonFromOptions(opts: Intl.DateTimeFormatOptions | undefined): string {
    if (!opts) {
        return '';
    }

    const result: string[] = [];
    // Era
    if (opts.era) {
        switch(opts.era) {
            case 'long':
                result.push('GGGG');
                break;

            case 'narrow':
                result.push('GGGGG');
                break;

            case 'short': 
                result.push('G');
                break;
        }
    }
    // Year
    if (opts.year) {
        switch(opts.year) {
            case 'numeric':
                result.push('yyyy');
                break;

            case '2-digit': 
                result.push('yy');
                break;
        }
    }
    // Quarter 不支持
    // Month
    if (opts.month) {
        switch(opts.month) {
            case '2-digit':
                result.push('MM');
                break;
            
            case 'long':
                result.push('MMMM');
                break;
            
            case 'narrow':
                result.push('MMMMM');
                break;

            case 'numeric':
                result.push('M');
                break;

            case 'short':
                result.push('MMM');
                break;
        }
    }
    // Weekday
    if (opts.weekday) {
        switch(opts.weekday) {
            case 'long':
                result.push('EEEE');
                break;

            case 'narrow':
                result.push('EEEEE');
                break;

            case 'short':
                result.push('EEEEEE');
                break;
        }
    }
    // Week
    if (opts.day) {
        switch(opts.day) {
            case '2-digit':
                result.push('dd');
                break;

            case 'numeric':
                result.push('d');
                break;
        }
    }
    // Hour
    if (opts.hourCycle) {
        switch(opts.hourCycle) {
            case 'h11':
                if (opts.hour === '2-digit') {
                    result.push('KK');
                } else {
                    result.push('K');
                }
                break;
            
            case 'h12':
                if (opts.hour === '2-digit') {
                    result.push('hh');
                } else {
                    result.push('h');
                }
                break;

            case 'h23':
                if (opts.hour === '2-digit') {
                    result.push('HH');
                } else {
                    result.push('H');
                }
                break;
            
            case 'h24':
                if (opts.hour === '2-digit') {
                    result.push('kk');
                } else {
                    result.push('k');
                }
                break;
        }
    }

    if (opts.hour12) {
        result.push('aaaa');
    }

    // Minute
    if (opts.minute) {
        switch(opts.minute) {
            case '2-digit':
                result.push('mm');
                break;
            
            case 'numeric':
                result.push('m');
                break;
        }
    }

    // Second
    if (opts.second) {
        switch(opts.second) {
            case '2-digit':
                result.push('ss');
                break;
            
            case 'numeric':
                result.push('s');
                break;
        }
    }

    return result.join('');
}

const formatDescriptor = {
    enumerable: false,
    configurable: true,
    get(this: IDateTimeFormat) {
        const boundFormat = (date?: Date | number) => {
            const opts: MachProI18N.DateTimeOptions = {
                timestamp: date?.valueOf() || NaN,
                ...this.options,
            };

            const format = dateTimeSkeletonFromOptions(this.options);

            if (format) {
                opts.format = format;
            }
            return MachProI18N.formatDateTime(opts);
        };

        return boundFormat;
    },
} as const;

try {
    // https://github.com/tc39/test262/blob/master/test/intl402/NumberFormat/prototype/format/name.js
    Object.defineProperty(formatDescriptor.get, 'name', {
        configurable: true,
        enumerable: false,
        writable: false,
        value: 'get format',
    });
} catch (e) {
    // In older browser (e.g Chrome 36 like polyfill.io)
    // TypeError: Cannot redefine property: name
}

export interface DateTimeFormatConstructor {
    new (
      locales?: string | string[],
      options?: Intl.DateTimeFormatOptions
    ): IDateTimeFormat;
    (
      locales?: string | string[],
      options?: Intl.DateTimeFormatOptions
    ): IDateTimeFormat;
  
    supportedLocalesOf(
      locales: string | string[],
      options?: Pick<Intl.DateTimeFormatOptions, 'localeMatcher'>
    ): string[];
    getDefaultLocale(): string;
    relevantExtensionKeys: string[];
    getDefaultTimeZone(): string;
    availableLocales: Set<string>;
    polyfilled: boolean;
}

export const DateTimeFormat = function (
    this: IDateTimeFormat,
    locales?: string | string[],
    options?: Intl.DateTimeFormatOptions
) {
    this.options = options;
} as DateTimeFormatConstructor;

defineProperty(DateTimeFormat, 'supportedLocalesOf', {
    value: function supportedLocalesOf(
        locales: string | string[],
        options?: Pick<Intl.DateTimeFormatOptions, 'localeMatcher'>
    ) {
        return locales;
    }
});

defineProperty(DateTimeFormat.prototype, 'resolvedOptions', {
    value: function resolvedOptions(this: IDateTimeFormat) {
        return this.options;
    }
});

defineProperty(DateTimeFormat.prototype, 'formatToParts', {
    value: function formatToParts(date?: number | Date) {
        return [];
    }
});

defineProperty(DateTimeFormat.prototype, 'formatRangeToParts', {
    value: function formatRangeToParts(
        startDate: number | Date,
        endDate: number | Date
    ) {
        return [];
    },
});

defineProperty(DateTimeFormat.prototype, 'formatRange', {
    value: function formatRange(
        startDate: number | Date,
        endDate: number | Date
    ) {
        return '';
    }
});

DateTimeFormat.getDefaultTimeZone = () => 'UTC';
Object.defineProperty(DateTimeFormat.prototype, 'format', formatDescriptor);
DateTimeFormat.polyfilled = true;

try {
    if (typeof Symbol !== 'undefined') {
        Object.defineProperty(DateTimeFormat.prototype, Symbol.toStringTag, {
            value: 'Intl.DateTimeFormat',
            writable: false,
            enumerable: false,
            configurable: true,
        });
    }
  
    Object.defineProperty(DateTimeFormat.prototype.constructor, 'length', {
        value: 1,
        writable: false,
        enumerable: false,
        configurable: true,
    });
} catch (e) {
// Meta fix so we're test262-compliant, not important
}
  
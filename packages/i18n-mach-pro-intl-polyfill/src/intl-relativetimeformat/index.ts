import { MachProI18N } from '@sailor/i18n-mach-pro-native';

export class RelativeTimeFormat {
    private options: Intl.RelativeTimeFormatOptions;
    private locales: string | string[];

    constructor(
      locales: string | string[],
      options: Intl.RelativeTimeFormatOptions
    ) {
        // test262/test/intl402/RelativeTimeFormat/constructor/constructor/newtarget-undefined.js
        // Cannot use `new.target` bc of IE11 & TS transpiles it to something else
        const newTarget =
            this && this instanceof RelativeTimeFormat ? this.constructor : void 0;
        if (!newTarget) {
            throw new TypeError("Intl.RelativeTimeFormat must be called with 'new'");
        }
        this.options = options;
        this.locales = locales;
    }

    format(value: number, unit: Intl.RelativeTimeFormatUnit): string {
        if (typeof this !== 'object') {
            throw new TypeError('format was called on a non-object');
        }

        // years => year
        const removePlural = (u: Intl.RelativeTimeFormatUnit): MachProI18N.RelativeTimeUnitMP => {
            if (u.endsWith('s')) {
                return u.substring(0, u.lastIndexOf('s')) as MachProI18N.RelativeTimeUnitMP;
            }

            return u as MachProI18N.RelativeTimeUnitMP;
        };

        const opt: MachProI18N.RelativeDateTimeOptions = {
            number: value,
            unit: removePlural(unit),
            style: this.options.style,
            numeric: this.options.numeric,
        };
        return MachProI18N.relativeDateTimeFormat(opt);
    }

    formatToParts(
      value: number,
      unit: Intl.RelativeTimeFormatUnit
    ): Intl.RelativeTimeFormatPart[] {
        if (typeof this !== 'object') {
            throw new TypeError('formatToParts was called on a non-object');
        }
        return [];
    }
  
    resolvedOptions(): Intl.ResolvedRelativeTimeFormatOptions {
        if (typeof this !== 'object') {
            throw new TypeError('resolvedOptions was called on a non-object');
        }
      
        return {
            locale: Array.isArray(this.locales) ? this.locales[0] : this.locales,
            style: this.options.style || 'narrow',
            numeric: this.options.numeric || 'always',
            numberingSystem: '',
        };
    }
  
    public static supportedLocalesOf(
      locales: string | string[],
      options?: Pick<Intl.RelativeTimeFormatOptions, 'localeMatcher'>
    ): string[] {
        return Array.isArray(locales) ? locales : [ locales ];
    }

    public static polyfilled = true;
}
  
try {
    // IE11 does not have Symbol
    if (typeof Symbol !== 'undefined') {
        Object.defineProperty(RelativeTimeFormat.prototype, Symbol.toStringTag, {
            value: 'Intl.RelativeTimeFormat',
            writable: false,
            enumerable: false,
            configurable: true,
        });
    }

    // https://github.com/tc39/test262/blob/master/test/intl402/RelativeTimeFormat/constructor/length.js
    Object.defineProperty(RelativeTimeFormat.prototype.constructor, 'length', {
        value: 0,
        writable: false,
        enumerable: false,
        configurable: true,
    });
    // https://github.com/tc39/test262/blob/master/test/intl402/RelativeTimeFormat/constructor/supportedLocalesOf/length.js
    Object.defineProperty(RelativeTimeFormat.supportedLocalesOf, 'length', {
        value: 1,
        writable: false,
        enumerable: false,
        configurable: true,
    });
} catch (e) {
    // Meta fix so we're test262-compliant, not important
}
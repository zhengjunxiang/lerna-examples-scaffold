import { NumberFormat, NumberFormatOptions } from './number-format';
import { DateTimeFormat, DateTimeStyle } from './datetime-format';
import { RelativeTimeFormat } from './relativetime-format';
import { MLocale } from './locale';
import { checkAmountFraction, CurrencySymbolOptions, getCurrencySymbol, SUPPORT_CURRENCY } from './currency'
export default class      {
    public static getCurrentLocale(): MLocale {
        return MLocale.getCurrentLocale();
    }

    public static getNumberFormat(opts?: NumberFormatOptions): NumberFormat {
        return NumberFormat.getNumberFormat(opts);
    }

    public static getCurrencyFormat(opts: NumberFormatOptions | string): NumberFormat {
        return NumberFormat.getCurrencyFormat(opts);
    }

    public static getMeasureFormat(opts: NumberFormatOptions | string): NumberFormat {
        return NumberFormat.getMeasureFormat(opts);
    }

    public static getPercentFormat(): NumberFormat {
        return NumberFormat.getPercentFormat();
    }

    public static getDateFormat(dateStyle: DateTimeStyle = 'short'): DateTimeFormat {
        return DateTimeFormat.getDateFormat(dateStyle);
    }

    public static getTimeFormat(timeStyle: DateTimeStyle = 'short'): DateTimeFormat {
        return DateTimeFormat.getTimeFormat(timeStyle);
    }

    public static getDateTimeFormat(dateStyle: DateTimeStyle = 'short', timeStyle: DateTimeStyle = 'short'): DateTimeFormat {
        return DateTimeFormat.getDateTimeFormat(dateStyle, timeStyle);
    }

    public static getDateFormatWithSkeleton(skeleton: string): DateTimeFormat {
        return DateTimeFormat.getDateFormatWithSkeleton(skeleton);
    }

    public static getRelativeTimeFormat(): RelativeTimeFormat {
        return RelativeTimeFormat.getRelativeTimeFormat();
    }
    public static checkAmountFraction(amount: number, currencyCode: keyof typeof SUPPORT_CURRENCY) {
        return checkAmountFraction(amount, currencyCode);
    }
    public static getCurrencySymbol(options: CurrencySymbolOptions) {
        return getCurrencySymbol(options);
    }
}

export {
    MLocale,
    NumberFormat,
    DateTimeFormat,
    DateTimeStyle,
    RelativeTimeFormat,
    checkAmountFraction,
    getCurrencySymbol,
};
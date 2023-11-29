import { test, expect } from '../../utils/unit-test/index';
const Intl = Mach.requireModule('Intl');

export default function () {
    test('getCurrentLocaleInfo', () => {
        const locale = Intl.getCurrentLocaleInfo();
        expect(locale.baseName).toBe('zh-Hant-HK');
        expect(locale.language).toBe('zh');
    });

    test('formatDecimalNumber', () => {
        const result = Intl.formatDecimalNumber({
            number: 123321000
        });

        expect(result).toBe('123,321,000');
    });

    /**
     * roundingMode 详细结果可参考：
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
     */
    test('formatDecimalNumber roundingMode', () => {
        const ceil = Intl.formatDecimalNumber({
            number: 2.23,
            roundingMode: 'ceil',
        });
        expect(ceil).toBe('2.3');

        const floor = Intl.formatDecimalNumber({
            number: 2.23,
            roundingMode: 'floor',
        });
        expect(floor).toBe('2.2');

        const expand = Intl.formatDecimalNumber({
            number: 2.23,
            roundingMode: 'expand',
        });
        expect(expand).toBe('2.3');

        const trunc = Intl.formatDecimalNumber({
            number: 2.23,
            roundingMode: 'expand',
        });
        expect(trunc).toBe('2.2');

        const halfCeil = Intl.formatDecimalNumber({
            number: 2.23,
            roundingMode: 'halfCeil',
        });
        expect(halfCeil).toBe('2.2');

        const halfFloor = Intl.formatDecimalNumber({
            number: 2.23,
            roundingMode: 'halfFloor',
        });
        expect(halfFloor).toBe('2.2');

        const halfExpand = Intl.formatDecimalNumber({
            number: 2.23,
            roundingMode: 'halfExpand',
        });
        expect(halfExpand).toBe('2.2');

        const halfTrunc = Intl.formatDecimalNumber({
            number: 2.23,
            roundingMode: 'halfTrunc',
        });
        expect(halfTrunc).toBe('2.2');

        const halfEven = Intl.formatDecimalNumber({
            number: 2.23,
            roundingMode: 'halfEven',
        });
        expect(halfEven).toBe('2.2');
    });

    test('formatDecimalNumber digits', () => {
        const min_integer_fraction = Intl.formatDecimalNumber({
            number: 4.33,
            minimumIntegerDigits: 3,
            minimumFractionDigits: 4,
        });

        expect(min_integer_fraction).toBe('004.3300');

        const max_fraction = Intl.formatDecimalNumber({
            number: 4.33145,
            maximumFractionDigits: 2,
        });

        expect(max_fraction).toBe('4.33');
    });

    test('formatCurrencyNumber', () => {
        const result = Intl.formatCurrencyNumber({
            number: 123321000
        });
        expect(result).toBe('HK$123,321,000.00');
    });

    test('getCurrentCurrencySymbol', () => {
        const result = Intl.getCurrentCurrencySymbol();
        expect(result).toBe('HK$');
    });

    test('formatPercentNumber', () => {
        const result = Intl.formatPercentNumber({
            number: 123321000
        });
        expect(result).toBe('12,332,100,000%');
    });

    test('formatUnitNumber', () => {
        const result = Intl.formatUnitNumber({
            number: 123321000,
            unitCode: 'kilometer'
        });

        expect(result).toBe('123,321,000 公里');
    });

    test('formatDateTime', () => {
        const h23_date_full_time_full = Intl.formatDateTime({
            timestamp: 1665720000000,
            hc: 'h23',
            dateStyle: 'full',
            timeStyle: 'full'
        });

        const h23_date_long_time_long = Intl.formatDateTime({
            timestamp: 1665720000000,
            hc: 'h23',
            dateStyle: 'long',
            timeStyle: 'long'
        });

        const h23_date_medium_time_medium = Intl.formatDateTime({
            timestamp: 1665720000000,
            hc: 'h23',
            dateStyle: 'medium',
            timeStyle: 'medium'
        });

        const h23_date_short_time_short = Intl.formatDateTime({
            timestamp: 1665720000000,
          hc: 'h23',
          dateStyle: 'short',
          timeStyle: 'short'
        });
        
        const h11_date_short_time_short = Intl.formatDateTime({
            timestamp: 1665720000000,
            hc: 'h11',
            dateStyle: 'short',
            timeStyle: 'short'
        });

        const h12_date_short_time_short = Intl.formatDateTime({
            timestamp: 1665720000000,
            hc: 'h12',
            dateStyle: 'short',
            timeStyle: 'short'
        });

        expect(h23_date_full_time_full).toBe('2022年10月14日 星期五 12:00:00 [中國標準時間]');
        expect(h23_date_long_time_long).toBe('14/10/2022 12:00:00 [GMT+8]');
        expect(h23_date_medium_time_medium).toBe('14/10/2022 12:00:00');
        expect(h23_date_short_time_short).toBe('14/10/2022 12:00');
        expect(h11_date_short_time_short).toBe('14/10/2022 下午0:00');
        expect(h12_date_short_time_short).toBe('14/10/2022 下午12:00');
    });

    test('formatDateTime dayPeriod', () => {
        const noon_long = Intl.formatDateTime({
            timestamp: 1665720000000,
            dayPeriod: 'long'
        });
        expect(noon_long).toBe('中午');

        const noon_short = Intl.formatDateTime({
            timestamp: 1665720000000,
            dayPeriod: 'short'
        });
        expect(noon_short).toBe('中午');

        const noon_narrow = Intl.formatDateTime({
            timestamp: 1665720000000,
            dayPeriod: 'narrow'
        });
        expect(noon_narrow).toBe('中午');
    });

    test('formatDateTime date specific', () => {
        const long_numeric = Intl.formatDateTime({
            timestamp: 1665720000000,
            format: 'eeeeeyyyyMMMMd',
        });

        expect(long_numeric).toBe('2022年10月14日星期五');

        const weekday_short_numeric = Intl.formatDateTime({
            timestamp: 1665720000000,
            format: 'eeeeyyyyMMMMd',
        });

        expect(weekday_short_numeric).toBe('2022年10月14日週五');

        const weekday_narrow_numeric = Intl.formatDateTime({
            timestamp: 1665720000000,
            format: 'eeeeeeyyyyMMMMd',   // 同 EEEEEyyyyMMMMd
        });
        expect(weekday_narrow_numeric).toBe('2022年10月14日五');

        const weekday_narrow_year_2_digit = Intl.formatDateTime({
            timestamp: 1665720000000,
            format: 'eeeeeeyyMMMMdd',   // 同 EEEEEyyMMMMdd
        });
        expect(weekday_narrow_year_2_digit).toBe('22年10月14日五');

        const weekday_narrow_all_2_digit = Intl.formatDateTime({
            timestamp: 1665720000000,
            format: 'eeeeeeyyMMdd', // 同EEEEEyyMMdd
        });
        expect(weekday_narrow_all_2_digit).toBe('14/10/22（五）');
    }); 

    test('formatDateTime time specific', () => {
        const time_all_numeric = Intl.formatDateTime({
            timestamp: 1665720000000,
            format: 'hms',  // hc = h12
        });
        expect(time_all_numeric).toBe('下午12:00:00');

        const time_all_numeric_with_hc = Intl.formatDateTime({
            timestamp: 1665720000000,
            format: 'Hms',  // hc = h24
        });
        expect(time_all_numeric_with_hc).toBe('12:00:00');

        const time_all_2_digit = Intl.formatDateTime({
            timestamp: 1665720000000,
            format: 'hhmmss',   // hc = h12
        });
        expect(time_all_2_digit).toBe('下午12:00:00');

        const time_except_second = Intl.formatDateTime({
            timestamp: 1665720000000,
            format: 'hhmm', 
        });
        expect(time_except_second).toBe('下午12:00');
    });

    test('formatDateTime datetime specific', () => {
        const weekday_hour_minute = Intl.formatDateTime({
            timestamp: 1665720000000,
            format: 'eeeehhmm', // 同 EEEEhhmm
        });
        expect(weekday_hour_minute).toBe('週五 下午12:00');

        const weekday_year_hour_minute = Intl.formatDateTime({
            timestamp: 1665720000000,
            format: 'eeeeyyhhmm',   // 同  EEEEyyhhmm
        });
        expect(weekday_year_hour_minute).toBe('22年 週五 下午12:00');
    });

    test('relativeDateTimeFormat', () => {
        const one_year_later_narrow = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'year',
            style: 'narrow'
        });

        const one_year_ago_narrow = Intl.relativeDateTimeFormat({
            number: -1,
            unit: 'year',
            style: 'narrow'
        });

        const one_year_later_short = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'year',
            style: 'short'
        });

        const one_year_later_long = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'year',
            style: 'long'
        });

        const one_quarter_later_narrow = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'quarter',
            style: 'narrow'
        });

        const one_quarter_ago_narrow = Intl.relativeDateTimeFormat({
            number: -1,
            unit: 'quarter',
            style: 'narrow'
        });

        const one_quarter_later_short = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'quarter',
            style: 'short'
        });

        const one_quarter_later_long = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'quarter',
            style: 'long'
        });

        const one_month_later_narrow = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'month',
            style: 'narrow'
        });

        const one_month_ago_narrow = Intl.relativeDateTimeFormat({
            number: -1,
            unit: 'month',
            style: 'narrow'
        });

        const one_month_later_short = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'month',
            style: 'short'
        });

        const one_month_later_long = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'month',
            style: 'long'
        });

        const one_week_later_narrow = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'week',
            style: 'narrow'
        });

        const one_week_ago_narrow = Intl.relativeDateTimeFormat({
            number: -1,
            unit: 'week',
            style: 'narrow'
        });

        const one_week_later_short = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'week',
            style: 'short'
        });

        const one_week_later_long = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'week',
            style: 'long'
        });

        const one_day_later_narrow = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'day',
            style: 'narrow'
        });

        const one_day_ago_narrow = Intl.relativeDateTimeFormat({
            number: -1,
            unit: 'day',
            style: 'narrow'
        });

        const one_day_later_short = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'day',
            style: 'short'
        });

        const one_day_later_long = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'day',
            style: 'long'
        });

        const one_hour_later_narrow = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'hour',
            style: 'narrow'
        });

        const one_hour_ago_narrow = Intl.relativeDateTimeFormat({
            number: -1,
            unit: 'hour',
            style: 'narrow'
        });

        const one_hour_later_short = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'hour',
            style: 'short'
        });

        const one_hour_later_long = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'hour',
            style: 'long'
        });

        const one_minute_later_narrow = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'minute',
            style: 'narrow'
        });

        const one_minute_ago_narrow = Intl.relativeDateTimeFormat({
            number: -1,
            unit: 'minute',
            style: 'narrow'
        });

        const one_minute_later_short = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'minute',
            style: 'short'
        });

        const one_minute_later_long = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'minute',
            style: 'long'
        });

        const one_second_later_narrow = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'second',
            style: 'narrow'
        });

        const one_second_ago_narrow = Intl.relativeDateTimeFormat({
            number: -1,
            unit: 'second',
            style: 'narrow'
        });

        const one_second_later_short = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'second',
            style: 'short'
        });

        const one_second_later_long = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'second',
            style: 'long'
        });

        expect(one_year_later_narrow).toBe('1年後');
        expect(one_year_ago_narrow).toBe('1年前');
        expect(one_year_later_short).toBe('1 年後');
        expect(one_year_later_long).toBe('1 年後');

        expect(one_quarter_later_narrow).toBe('+1Q');
        expect(one_quarter_ago_narrow).toBe('-1Q');
        expect(one_quarter_later_short).toBe('1 季後');
        expect(one_quarter_later_long).toBe('1 季後');

        expect(one_month_later_narrow).toBe('1個月後');
        expect(one_month_ago_narrow).toBe('1個月前');
        expect(one_month_later_short).toBe('1 個月後');
        expect(one_month_later_long).toBe('1 個月後');

        expect(one_week_later_narrow).toBe('1星期後');
        expect(one_week_ago_narrow).toBe('1星期前');
        expect(one_week_later_short).toBe('1 星期後');
        expect(one_week_later_long).toBe('1 星期後');

        expect(one_day_later_narrow).toBe('1日後');
        expect(one_day_ago_narrow).toBe('1日前');
        expect(one_day_later_short).toBe('1 日後');
        expect(one_day_later_long).toBe('1 日後');

        expect(one_hour_later_narrow).toBe('1小時後');
        expect(one_hour_ago_narrow).toBe('1小時前');
        expect(one_hour_later_short).toBe('1 小時後');
        expect(one_hour_later_long).toBe('1 小時後');

        expect(one_minute_later_narrow).toBe('1分後');
        expect(one_minute_ago_narrow).toBe('1分前');
        expect(one_minute_later_short).toBe('1 分鐘後');
        expect(one_minute_later_long).toBe('1 分鐘後');

        expect(one_second_later_narrow).toBe('1秒後');
        expect(one_second_ago_narrow).toBe('1秒前');
        expect(one_second_later_short).toBe('1 秒後');
        expect(one_second_later_long).toBe('1 秒後');
    });

    /**
     * 设置numeric为auto时不会影响hour、minute、second，会影响day以上的单位
     */
    test('relativeTimeFormat numeric', () => {
        const one_day_later_narrow_numeric = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'day',
            style: 'narrow',
            numeric: 'auto',
        });

        const one_day_ago_narrow_numeric = Intl.relativeDateTimeFormat({
            number: -1,
            unit: 'day',
            style: 'narrow',
            numeric: 'auto',
        });

        const one_day_later_short_numeric = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'day',
            style: 'short',
            numeric: 'auto',
        });

        const one_day_later_long_numeric = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'day',
            style: 'long',
            numeric: 'auto',
        });

        const one_week_later_long_numeric = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'week',
            style: 'long',
            numeric: 'auto',
        });

        const one_month_later_long_numeric = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'month',
            style: 'long',
            numeric: 'auto',
        });

        const one_quarter_later_long_numeric = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'quarter',
            style: 'long',
            numeric: 'auto',
        });

        const one_year_later_long_numeric = Intl.relativeDateTimeFormat({
            number: 1,
            unit: 'year',
            style: 'long',
            numeric: 'auto',
        });

        expect(one_day_later_narrow_numeric).toBe('明日');
        expect(one_day_ago_narrow_numeric).toBe('昨日');
        expect(one_day_later_short_numeric).toBe('明日');
        expect(one_day_later_long_numeric).toBe('明日');
        expect(one_week_later_long_numeric).toBe('下星期');
        expect(one_month_later_long_numeric).toBe('下個月');
        expect(one_quarter_later_long_numeric).toBe('下一季');
        expect(one_year_later_long_numeric).toBe('下年');
    });

    test('getPluralRulesOfNumber', () => {
        const cardinal_0 = Intl.getPluralRulesOfNumber({
            number: 0,
            type: 'cardinal'
        });

        const cardinal_1 = Intl.getPluralRulesOfNumber({
            number: 1,
            type: 'cardinal'
        });

        const cardinal_2 = Intl.getPluralRulesOfNumber({
            number: 2,
            type: 'cardinal'
        });

        const cardinal_5 = Intl.getPluralRulesOfNumber({
            number: 5,
            type: 'cardinal'
        });

        const cardinal_55 = Intl.getPluralRulesOfNumber({
            number: 55,
            type: 'cardinal'
        });

        const ordinal_0 = Intl.getPluralRulesOfNumber({
            number: 0,
            type: 'ordinal'
        });

        const ordinal_1 = Intl.getPluralRulesOfNumber({
            number: 1,
            type: 'ordinal'
        });

        const ordinal_2 = Intl.getPluralRulesOfNumber({
            number: 2,
            type: 'ordinal'
        });

        const ordinal_5 = Intl.getPluralRulesOfNumber({
            number: 5,
            type: 'ordinal'
        });

        const ordinal_55 = Intl.getPluralRulesOfNumber({
            number: 55,
            type: 'ordinal'
        });

        expect(cardinal_0).toBe('other');
        expect(cardinal_1).toBe('other');
        expect(cardinal_2).toBe('other');
        expect(cardinal_5).toBe('other');
        expect(cardinal_55).toBe('other');

        expect(ordinal_0).toBe('other');
        expect(ordinal_1).toBe('other');
        expect(ordinal_2).toBe('other');
        expect(ordinal_5).toBe('other');
        expect(ordinal_55).toBe('other');
    });

    test('compare', () => {
        const result = Intl.compare({
            string1: '張三',
            string2: '李四',
            options: {
                sensitivity: 'base',
                ignorePunctuation: false,
                numeric: false,
                caseFirst: false,
            }
        });

        expect(result).toBe(-1);
    });

}
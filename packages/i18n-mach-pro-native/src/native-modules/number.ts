export type RoundingModeType =
    | 'ceil'
    | 'floor'
    | 'expand'
    | 'trunc'
    | 'halfCeil'
    | 'halfFloor'
    | 'halfExpand'
    | 'halfTrunc'
    | 'halfEven';

export interface PrecisionNumberOptions {
    /**
     * 要格式化的数字
     */
    number: number;
    /**
     * 整数部分最大位数，范围1-21，默认值1
     */
    minimumIntegerDigits?: number;
    /**
     * 小数部分最小位数，范围0-20，默认值0
     */
    minimumFractionDigits?: number;
    /**
     * 小数部分最大位数，范围0-20，默认值3
     */
    maximumFractionDigits?: number;
    /**
     * 所有的数字最小个数，范围1-21，默认值1
     */
    minimumSignificantDigits?: number;
    /**
     * 所有的数字最大个数，范围1-21，默认值21
     */
    maximumSignificantDigits?: number;
}

export interface FormatNumberOptions extends PrecisionNumberOptions {
    /**
     * 要格式化的风格
     */
    style: 'decimal' | 'currency' | 'percent' | 'unit';
    /**
     * 格式化货币时的展示风格，默认symbol
     */
    currencyStyle?: 'symbol' | 'narrowSymbol' | 'code' | 'name';
    /**
     * 是否使用会计格式展示
     */
    accounting?: boolean;
    /**
     * ISO 4217标准的货币符号code，如USD，EUR，CNY等，当style为currency时，必须提供该参数
     */
    currencyCode?: string;
    /**
     * 单位码，当style为unit时，必须提供该参数
     */
    unitCode?: string;
    /**
     * 单位展示风格
     */
    unitStyle?: string;
    /**
     * 取整方式，取值为：ceil/floor/expand/trunc/halfCeil/halfFloor/halfExpand/halfTrunc/halfEven：一些取整方式，
     * 详见Rounding Modes https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#examples
     */
    roundingMode?: RoundingModeType;
}

export function formatNumber(options: FormatNumberOptions): string {
    const Intl = Mach.requireModule('Intl');
    return Intl.formatNumber(options);
}
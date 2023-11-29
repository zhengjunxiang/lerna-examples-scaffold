import { isIphoneSafariLowerThan, isMacSafariLowerThan } from '@sailor/i18n-shared';
import { MLocale } from './locale';

// 数字格式化的类型
export type NumberFormatStyle = 'decimal' | 'currency' | 'percent' | 'unit';

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
export interface NumberFormatOptions {
    /**
     * ISO 货币code，style为currency时必须提供此属性
     */
    currency?: string;
    /**
     * ISO 货币展示格式
     */
    currencyDisplay?: string;
    /**
     * 测量单位code，style为unit时必须提供此属性
     */
    unitCode?: string;
    /**
     * 取整模式
     */
    roundingMode?: RoundingModeType;
    /**
     * 整数部分最小位数，范围1-21
     */
    minimumIntegerDigits?: number;
    /**
     * 小数部分最小位数，范围0-20
     */
    minimumFractionDigits?: number;
    /**
     * 小数部分最大位数，范围0-20
     */
    maximumFractionDigits?: number;
    /**
     * 数字整体的最低位数，范围1-21
     */
    minimumSignificantDigits?: number;
    /**
     * 数字整体的最高位数，范围1-21
     */
    maximumSignificantDigits?: number;
}

const getDefaultOptions = (): NumberFormatOptions  => ({
    maximumFractionDigits: 2,
});

export class NumberFormat {
    /**
     * 展示类型
     */
    private style: NumberFormatStyle;
    /**
     * 配置项
     */
    private options: NumberFormatOptions;
    private locale: string;

    constructor(style: NumberFormatStyle, opts: NumberFormatOptions = {}) {
        if (style === 'currency' && !opts.currency) {
            throw new Error('currency must be provided when style is currency');
        }

        if (style === 'unit' && !opts.unitCode) {
            throw new Error('unitCode must be provided when style is unit');
        }

        this.style = style;
        this.options = {
            ...getDefaultOptions(),
            ...opts,
        };
    }

    public static getNumberFormat(opts?: NumberFormatOptions): NumberFormat {
        return new NumberFormat('decimal', opts);
    }

    public static getCurrencyFormat(opts: NumberFormatOptions | string): NumberFormat {
        let options: NumberFormatOptions = {};
        if (typeof opts === 'string') {
            options.currency = opts;
        } else {
            options = opts;
        }
        if (typeof options.currencyDisplay === 'undefined') {
            options.currencyDisplay = 'narrowSymbol';
        }
        return new NumberFormat('currency', options);
    }

    public static getMeasureFormat(opts: NumberFormatOptions | string): NumberFormat {
        let options: NumberFormatOptions = {};
        if (typeof opts === 'string') {
            options.unitCode = opts;
        } else {
            options = opts;
        }
        return new NumberFormat('unit', options);
    }

    public static getPercentFormat(): NumberFormat {
        return new NumberFormat('percent');
    }

    format(num: number): string {
        const locale: MLocale = MLocale.getCurrentLocale();
        let nf: Intl.NumberFormat;
        
        if (this.style === 'currency') {
            const options = {
                style: this.style,
                ...this.options,
            };
            if (process.env.BUILD_TYPE !== 'mach-pro' && options.currencyDisplay  === 'narrowSymbol' && isIphoneSafariLowerThan('14.5') && isMacSafariLowerThan('14.1')) {
                // iphone safari >=14.5 mac safari >=14,1 只支持 symbol、code、name, HACK,后续增加货币需验证
                options.currencyDisplay = 'symbol';
                nf = new Intl.NumberFormat(locale.baseName, options);
                return nf.format(num).replace(/^[A-Za-z]+/, '').trim();
            } else {
                nf = new Intl.NumberFormat(locale.baseName, options);
            }
        } else if (this.style === 'percent') {
            nf = new Intl.NumberFormat(locale.baseName, {
                style: this.style,
                ...this.options,
            });
        } else if (this.style === 'unit') {
            nf = new Intl.NumberFormat(locale.baseName, {
                style: this.style,
                unit: this.options.unitCode,
                ...this.options,
            });
        } else {
            nf = new Intl.NumberFormat(locale.baseName, {
                ...this.options,
            })
        }
        return nf.format(num);
    }
}

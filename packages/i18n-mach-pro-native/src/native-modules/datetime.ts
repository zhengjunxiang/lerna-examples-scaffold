export interface DateTimeOptions {
    /**
     * 时间戳，单位毫秒
     */
    timestamp: number;
    /**
     * 日期展示风格
     */
    dateStyle?: 'full' | 'long' | 'medium' | 'short';
    /**
     * 时间展示风格
     */
    timeStyle?: 'full' | 'long' | 'medium' | 'short';
    /**
     * 使用 icu datetime selekton 来实现
     */
    format?: string;
}

export type RelativeTimeUnitMP = 'year' | 'quarter' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second';

export interface RelativeDateTimeOptions {
    /**
     * 相对时间的数量
     */
    number: number;
    /**
     * 相对时间的单位
     */
    unit: RelativeTimeUnitMP;
    /**
     * 展示风格
     */
    style?: 'narrow' | 'short' | 'long';
    /**
     * 是否数字化展示？
     * 如果设置为always，则展示：一天前
     * 如果设置为auto，则展示：昨天
     */
    numeric?: 'always' | 'auto';
}

/**
 * 根据当前系统locale对数字进行格式化，格式化为日期时间
 * @param options IDateTimeOptions
 * @returns 格式化后的字符串
 */
export function formatDateTime(options: DateTimeOptions): string {
    const Intl = Mach.requireModule('Intl');
    return Intl.formatDateTime(options);
}

/**
 * 根据当前系统locale，按相对时间方式对数字和单位进行格式化
 * @param options IRelativeDateTimeOptions
 * @returns 返回格式化后的字符串，示例值：一天前，昨天，明天
 */
export function relativeDateTimeFormat(options: RelativeDateTimeOptions): string {
    const Intl = Mach.requireModule('Intl');
    return Intl.relativeDateTimeFormat(options);
}
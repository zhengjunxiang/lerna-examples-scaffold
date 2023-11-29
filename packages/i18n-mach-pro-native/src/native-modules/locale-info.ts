export interface ILocaleInfo {
    /**
     * 完整语言名称，例如：zh-HK, en, zh
     */
    locale?: string;
    /**
     * 安卓 zh_HK, iOS zh-HK
     */
    baseName?: string;
    /**
     * 语言名称，例如：zh, en
     */
    language?: string;
    /**
     * 当前locale的日历类型
     */
    calendar?: string;
    /**
     * 返回当前locale支持的日历类型
     */
    calendars?: string[];
    /**
     * 区域，如CN、HK
     */
    region?: string;
    /**
     * 方言，如Hans，Hant等
     */
    script?: string;
    /**
     * 文字书写方向，ltr或rtl
     */
    textDirection?: string;
    /**
     * 返回当前locale的时区标识数组 
     */
    timeZones?: string[]; 
    /**
     * 货币code，如HKD，CNY等
     */
    currency?: string;
}

export function getCurrentLocaleInfo(): ILocaleInfo | undefined {
    const Intl = Mach.requireModule('Intl');
    return Intl.getCurrentLocaleInfo() as ILocaleInfo;
}
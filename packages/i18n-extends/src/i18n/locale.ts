import {
    getDefaults,
    cookie,
    querystring,
    localStorage,
    sessionStorage,
    navigator,
    htmlTag
} from '@sailor/i18n-language-detector/lib/web';
export interface MLocaleOptions {
    /**
     * 完整的语言地区标签名称，如zh-Hans-CN
     */
    baseName: string;
    /**
     * 地区对应使用的语言
     */
    language: string;
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
}

export class MLocale {
    /**
     * 完整的语言地区标签名称，如zh-Hans-CN
     */
    public readonly baseName: string;
    /**
     * 地区对应使用的语言
     */
    public readonly language: string;
    /**
     * 当前locale的日历类型
     */
    public readonly calendar?: string;
    /**
     * 返回当前locale支持的日历类型
     */
    public readonly calendars?: string[];
    /**
     * 区域，如CN、HK
     */
    public readonly region?: string;
    /**
     * 方言，如Hans，Hant等
     */
    public readonly script?: string;
    /**
     * 文字书写方向，ltr或rtl
     */
    public readonly textDirection?: string;
    /**
     * 返回当前locale的时区标识数组 
     */
    public readonly timeZones?: string[]; 

    constructor(options: MLocaleOptions) {
        this.baseName = options.baseName;
        this.language = options.language;
        this.calendar = options.calendar;
        this.calendars = options.calendars;
        this.region = options.region;
        this.script = options.script;
        this.textDirection = options.script;
        this.timeZones = options.timeZones;
    }

    public static getCurrentLocale(): MLocale {
        let localeOptions: MLocaleOptions;
        // 编译时替换
        if (process.env.BUILD_TYPE === 'mach-pro') {
            // @ts-ignore
            localeOptions = new Intl.Locale('');
        } else {
            const options = getDefaults();
            const detectors = [ querystring, sessionStorage, cookie, localStorage ];
            let detected: string[] = [];

            detectors.forEach((detector) => {
                let lookup = detector.lookup(options);
                if (lookup && typeof lookup === 'string') lookup = [lookup];
                if (lookup) detected = detected.concat(lookup);
            });

            const currentLanguage = detected.length > 0 ? detected[0] : undefined;
            const locale: any = new Intl.Locale(currentLanguage as string);
            localeOptions = {
                baseName: locale.baseName,
                language: locale.language,
                calendar: locale.calendar,
                calendars: locale.calendars,
                region: locale.region,
                script: locale.script,
                textDirection: locale.textInfo?.direction,
                timeZones: locale.timeZones,
            };
        }

        return new MLocale({
            baseName: localeOptions.baseName,
            language: localeOptions.language,
            calendar: localeOptions.calendar,
            calendars: localeOptions.calendars,
            region: localeOptions.region,
            script: localeOptions.script,
            textDirection: localeOptions.textDirection,
            timeZones: localeOptions.timeZones,
        });
    }
}
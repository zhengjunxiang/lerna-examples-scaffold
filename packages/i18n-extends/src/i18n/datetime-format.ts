import { parseDateTimeSkeleton } from '@formatjs/icu-skeleton-parser';
import { MLocale } from './locale';

export interface DateTimeOptions {
    /**
     * 日期展示风格
     */
    dateStyle?: 'full' | 'long' | 'medium' | 'short';
    /**
     * 时间的展示风格
     */
    timeStyle?: 'full' | 'long' | 'medium' | 'short';
    /**
     * 根据icu datetime skeleton 语法来展示
     */
    skeleton?: string;
}

export type DateTimeStyle = 'full' | 'long' | 'medium' | 'short';

export class DateTimeFormat {
    private options: DateTimeOptions;
    constructor(opts: DateTimeOptions = {}) {
        this.options = opts;

        if (opts.skeleton) {
            const options = parseDateTimeSkeleton(opts.skeleton);
            this.options = {
                ...opts,
                ...options,
            };
        }
    }

    public static getDateFormat(dateStyle: DateTimeStyle = 'short'): DateTimeFormat {
        return new DateTimeFormat({
            dateStyle
        });
    }

    public static getTimeFormat(timeStyle: DateTimeStyle = 'short'): DateTimeFormat {
        return new DateTimeFormat({
            timeStyle
        });
    }

    public static getDateTimeFormat(dateStyle: DateTimeStyle, timeStyle: DateTimeStyle): DateTimeFormat {
        return new DateTimeFormat({
            dateStyle,
            timeStyle,
        });
    }

    public static getDateFormatWithSkeleton(skeleton: string): DateTimeFormat {
        return new DateTimeFormat({
            skeleton
        });
    }

    public format(datetime: Date | number = new Date()): string {
        const locale: MLocale = MLocale.getCurrentLocale();
        const dtfm = new Intl.DateTimeFormat(locale.baseName, {
            ...this.options
        });
        return dtfm.format(datetime);
    }
}
export interface Detector {
    name: string;
    lookup: (options: any) => string | string[] | undefined;
    cacheUserLanguage?: (lng: string, options: any) => void;
}

export interface DetectorOptions {
    /**
     * 语言检测顺序来源，从哪里检测，例如从cookie中、querystring中等
     */
    order?: string[];
    /**
     * 下面为检测语言的key
     */
    lookupQuerystring?: string;
    lookupCookie?: string;
    lookupLocalStorage?: string;
    lookupSessionStorage?: string;
    /**
     * 在caches中指定的检测来源进行语言缓存
     */
    caches?: string[];
    /**
     * 不缓存的场景，通常cimode模式下不需要缓存
     */
    excludeCacheFor?: string[];
    /**
     * 语言标签，默认为document.documentElement
     */
    htmlTag?: HTMLElement;
    /**
     * cookie检测时的选项，默认{ path: '/', sameSite: 'strict' }
     */
    cookieOptions?: any;
}
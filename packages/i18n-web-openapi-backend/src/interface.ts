type ENV = 'dev' | 'test' | 'prod';
export interface Namespace {
    /**
     * 项目id
     */
    projectId: string;
    /**
     * 管理端空间 id（hash处理后的id）
     */
    namespaceId: string;
    name?: string;
}
export interface OpenAPIBackendOption {
    /**
     * i18next空间（不是管理端后台）
     */
    namespaces: Namespace[];
    /**
     * 环境，默认prod
     */
    env: ENV;
}

/**
 * 获取文案请求参数
 */
export interface OpenAPIRequestParams {
    projectId: string;
    namespaceId: string;
    locale: string;
    onlyVersion?: number;
}

/**
 * 语言包
 */
export interface LanguagePackage {
    locale: string;
    version: string;
    resouceUrl: string;
}

/**
 * 检查语言包
 */
export interface OpenAPIResponsePackage {
    projectId: string;
    namespaceName: string;
    packages: LanguagePackage[];
}

/**
 * 文案
 */
export interface OpenAPIResponseText {
    version: string | number;
    kv?: {
        [key: string]: string;
    };
}

export interface OpenAPIResponse<T> {
    code: number;
    message: string;
    data: T;
}

export { ENV };
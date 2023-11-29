import { ENV, OpenAPIRequestParams, OpenAPIResponsePackage, OpenAPIResponseText } from './interface';
import { post } from './request';

// TODO
export const HOST: any = {
    'prod': 'https://i18n.mykeeta.com',
    'test': 'https://i18n.mykeeta.com',
    'dev': 'https://ocean.waimai.test.sankuai.com',
};

export const API = {
    dev: {
        checkTextVersion: '/api/openapi/v1/package',
        fetchText: '/api/openapi/v1/text',
    },
    test: {
        checkTextVersion: '/api/openapi/v1/package_test',
        fetchText: '/api/openapi/v1/text_test',
    },
    prod: {
        checkTextVersion: '/api/openapi/v1/package',
        fetchText: '/api/openapi/v1/text',
    },
};

/**
 * 检查文案是否有更新
 * @param params OpenAPIRequestParams
 * @param env 环境
 * @returns OpenAPIResponsePackage
 */
export async function checkUpdate(params: OpenAPIRequestParams, env: ENV = 'prod'): Promise<OpenAPIResponsePackage> {
    const url = `${HOST[env]}${API[env].checkTextVersion}`;
    return post<OpenAPIResponsePackage>(url, params);
}

/**
 * 获取最新翻译文案
 * @param params OpenAPIRequestParams
 * @param env 环境
 * @returns OpenAPIResponseText
 */
export async function fetchText(params: OpenAPIRequestParams, env: ENV = 'prod'): Promise<OpenAPIResponseText> {
    const url = `${HOST[env]}${API[env].fetchText}`;
    return post<OpenAPIResponseText>(url, params);
}
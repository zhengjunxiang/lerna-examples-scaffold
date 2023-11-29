import {
  ConfigParams,
  ConfigData,
  LocalInfoParams,
  LocalInfoData,
} from './types';
import { post } from './request';

export const HOST: any = {
  prod: 'https://i18n.mykeeta.com',
  test: 'https://ocean.waimai.test.sankuai.com',
};

export const API = {
  getRegionConfigs: '/api/openapi/v1/getRegionConfigs',
  currentLocalInfo: '/api/openapi/v1/currentLocalInfo',
};

/**
 * 获取地区及语言配置
 * @param params ConfigParams
 * @param env 环境
 * @returns ConfigData
 */
export async function fetchConfig(
  params: ConfigParams,
  env: string = 'prod',
): Promise<ConfigData> {
  const url = `${HOST[env]}${API.getRegionConfigs}`;
  return post<ConfigData>(url, {}, params);
}

/**
 * 计算当前设备国际化信息
 * @param params LocalInfoParams
 * @param env 环境
 * @returns LocalInfoData
 */
export async function fetchCurrentLocalInfo(
  params: LocalInfoParams,
  env: string = 'prod',
): Promise<LocalInfoData> {
  const url = `${HOST[env]}${API.currentLocalInfo}`;
  return post<LocalInfoData>(url, params);
}

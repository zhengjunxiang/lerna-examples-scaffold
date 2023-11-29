const cwd = process.cwd();
/**
 * 接口信息
 */
const HOST = {
  dev: 'ocean.waimai.test.sankuai.com',
  test: 'i18n.mykeeta.sankuai.com',
  prod: 'i18n.mykeeta.sankuai.com',
};
/**
 * 鉴权
 */
const AUTH_URL = {
  dev: '/api/openapi_inner/v1/authToken',
  test: '/api/openapi_inner/v1/authToken',
  prod: '/api/openapi_inner/v1/authToken',
};

const PACKAGE_URL = {
  dev: '/api/openapi_inner/v1/package',
  test: '/api/openapi_inner/v1/package_test',
  prod: '/api/openapi_inner/v1/package',
};
export { cwd, HOST, AUTH_URL, PACKAGE_URL };

import * as fs from 'fs-extra';
import * as path from 'path';
import { Config, Options } from '../types';
import log from '../uitls/log';
import { validateNamespace } from './validate';
import {
  resetWebCodeCollect,
  webCodeCollect,
  webCodeGenerate,
} from './webCodeGenerate';
import { cwd } from '../constants';
import { axiosDownLoad, fetchPackage, fetchToken } from '../api';
import unzip from '../uitls/unzip';

let cacheToken;
/**
 * 保存包到本地
 */
const savePackage = async (packages: any = [], params) => {
  const { namespaceName, dest } = params;
  const namespaces = namespaceName || 'translation';
  const localesDir = path.join(cwd, `./${dest}`);

  // 读取src目录
  fs.ensureDirSync(localesDir);
  for(let item of packages) {
    let localeName = item.locale;
    let resourceUrl = item.resourceUrl;
    // 语言包目录
    let localePath = path.join(localesDir, `./${localeName}`);
    fs.ensureDirSync(localePath);
    // 语言包文件目录
    let packageFilePath = path.join(localePath, `./${namespaces}.zip`);
    // 远程下载文件内容
    let packageRes = await axiosDownLoad(resourceUrl, packageFilePath);
    if (packageRes) {
      // console.log(`下载完成：${resourceUrl}`)
      let zipRes = await unzip(packageFilePath, localePath);
      if (zipRes) {
        try {
          fs.unlinkSync(packageFilePath);
          // 远程语言包名称，解压后的json文件默认为string.json
          let basename = 'string'; // path.basename(resourceUrl).split('.')[0];
          // 将kv拍平到json文件中
          const originPath = path.join(localePath, `${basename}.json`);
          const jsonBuffer = fs.readFileSync(originPath);
          const originalJson = JSON.parse(jsonBuffer.toString('utf8'));
          const destJson = {
            locale: originalJson.locale,
            version: originalJson.version,
            ...originalJson.kv,
          };
          fs.writeFileSync(originPath, JSON.stringify(destJson), 'utf8');
          // 重命名为通用namespaces
          fs.renameSync(
            `${path.join(localePath, basename + '.json')}`,
            `${path.join(localePath, namespaces + '.json')}`,
          );
          log.info(`${namespaceName}[${localeName}]语言包加载成功`);
        } catch (e) {}
      } else {
        log.error(
          `解压失败：\n解压文件 ${packageFilePath} \n目标路径 ${localePath}`,
        );
      }
    } else {
      log.error(`下载失败：${resourceUrl}`);
    }
  };
};

const languageDownLoad = async (params) => {
  let { apiKey, projectId, namespaceId, locale, env = 'prod' } = params;
  let token;
  if (cacheToken) {
    token = cacheToken;
  } else {
    // 获取token
    const tokenRes: any = await fetchToken({
      apiKey,
      projectId,
      namespaceId,
      env,
    });
    token = tokenRes?.token;
    cacheToken = token;
  }
  //   console.log('======= token ====', token)
  if (!token) {
    log.error('鉴权失败，请检查参数信息');
    return;
  }

  // 拉取语言包
  const packageRes: any = await fetchPackage({
    projectId,
    namespaceId,
    locale,
    token,
    env,
  });
  let packages = packageRes?.packages;
  if (!packages || !packages.length) {
    log.warn(
      `语言包不存在：项目id（${projectId}），空间id（${namespaceId}）下不存在${
        locale ? `【${locale}】` : ''
      }语言包`,
    );
    return;
  }

  // 语言包本地文件处理
  await savePackage(packages, params);
  webCodeCollect(packages, params);
};

/**
 *
 * @param configPath 配置文件路径，默认为项目目录下 i18.config.json
 */
function getWebConfig(opts: Options): Config {
  const { config = 'i18n.config.json' } = opts;
  const configPath = path.resolve(cwd, config);
  try {
    const configJSON = fs.readJSONSync(configPath);
    return configJSON;
  } catch (error) {
    const { message, path } = error;
    throw new Error(`获取配置文件失败:${path || message}`);
  }
}
/**
 * 拉取语言包列表信息
 */
export const getLanguagePackage = async (opts: Options) => {
  try {
    // web 场景，支持拉取多项目，多空间语言包
    const webConfig = getWebConfig(opts);
    let { namespaces, dest = 'src/assets/locales', env, appmock } = webConfig;
    const { clean } = opts;
    if (clean) {
      try {
        const localesDir = path.join(cwd, `./${dest}`);
        fs.unlinkSync(localesDir);
        log.info(`clean文件成功：${localesDir}`);
      } catch (error) {
        log.error(error.message);
      }
    }
    if (!Array.isArray(namespaces)) {
      namespaces = [namespaces];
    }
    validateNamespace(namespaces);
    // 重置 resources 的拼接数组
    resetWebCodeCollect();
    for (const namespace of namespaces) {
      const { projectId, apiKey, namespaceId, name, locale } = namespace;
      const params = {
        dest,
        env,
        appmock,
        projectId,
        apiKey,
        namespaceId,
        namespaceName: name || 'translation',
        locale,
      };
      await languageDownLoad(params);
    }
    // 代码拼接
    webCodeGenerate(webConfig);
  } catch (e) {
    log.error(e.message);
  }
};

import * as fs from 'fs-extra';
import * as path from 'path';
import { machCodeGenerate } from './machCodeGenerate';
import log from '../uitls/log';
import { cwd } from '../constants';
import { axiosDownLoad, fetchPackage, fetchToken } from '../api';
import unzip from '../uitls/unzip';

let cacheToken;
/**
 * 读取项目配置
 */
const getMachConfig = () => {
  try {
    const machConfigPath = path.join(cwd, './mach.config.js');
    const machConfig = require(machConfigPath);
    return machConfig;
  } catch (e) {
    return {};
  }
};

/**
 * 保存包到本地
 */
const savePackage = async (packages: any = [], params) => {
  const {
    page = '',
    namespaceName = '',
    dest = 'src/assets/locales',
  } = params || {};
  const namespaces = namespaceName || 'translation';
  const localesDir = path.join(cwd, `./${dest}`);

  // 读取src目录
  fs.ensureDirSync(localesDir);
  // 解析数据创建对应文件
  packages.forEach(async (item: any) => {
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
          const finalJsonPath = path.join(localePath, namespaces + '.json');
          if (page) {
            // 只有 mach 存在 page 参数
            log.info(`页面${page}语言包加载完成: ${finalJsonPath}`);
          } else {
            log.info(
              `${namespaceName}[${localeName}]语言包加载完成：${finalJsonPath}`,
            );
          }
        } catch (e) {}
      } else {
        log.error(
          `解压失败：\n解压文件 ${packageFilePath} \n目标路径 ${localePath}`,
        );
      }
    } else {
      log.error(`下载失败：${resourceUrl}`);
    }
  });
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
  await machCodeGenerate(packages, params);
};

/**
 * 拉取语言包列表信息
 */
export const getLanguagePackage = async (page: string = '') => {
  try {
    // 读machconfig
    let MachConfig = getMachConfig();
    // console.log(MachConfig);
    // 将config处理为数组
    if (!Array.isArray(MachConfig)) {
      MachConfig = new Array(MachConfig);
    }
    for (let i = 0; i < MachConfig.length; i++) {
      const { name } = MachConfig[i];

      if (page.length > 0) {
        if (page === name) {
          await languageDownLoad(MachConfig[i]);
          return;
        }
        continue;
      } else {
        await languageDownLoad(MachConfig[i]);
      }
    }
  } catch (e) {
    log.error(e.message);
  }
};

import axios from 'axios';
import * as fs from 'fs';
import { AUTH_URL, HOST, PACKAGE_URL } from '../constants';

// const appmockRequest = (host: string, path: string) => {
//   return `https://appmock.sankuai.com${path}?MKOriginHost=${host}&MKScheme=https`;
// };

const axiosPost = async (
  path: string,
  data: any,
  header?: any,
  env: any = 'prod',
) => {
  return new Promise((res, rej) => {
    let url = `https://${HOST[env]}${path}`;
    axios
      .post(
        url,
        { ...data },
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            ...header,
          },
        },
      )
      .then((response) => {
        const { code, data } = response.data;
        if (code === 0) {
          res(data);
        } else {
          rej(new Error(`${url}接口错误：${JSON.stringify(response.data)}`));
        }
      })
      .catch((e) => {
        rej(e);
      });
  });
};
/**
 * 下载文件
 */
const axiosDownLoad = async (url: string, packageFilePath: string) => {
  const writer = fs.createWriteStream(packageFilePath);
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });
  response.data.pipe(writer);
  return new Promise((res: any, rej: any) => {
    writer.on('finish', () => {
      res(true);
    });
    writer.on('error', () => {
      rej(false);
    });
  });
};

const fetchToken = async ({ apiKey, projectId, namespaceId, env }) => {
  const res = await axiosPost(
    AUTH_URL[env],
    { apiKey, projectId, namespaceId },
    {},
    env,
  );

  return res;
};

const fetchPackage = async ({ projectId, namespaceId, locale, token, env }) => {
  const res = await axiosPost(
    PACKAGE_URL[env],
    { projectId, namespaceId, locale },
    { authorization: token },
    env,
  );
  return res;
};
export { axiosPost, axiosDownLoad, fetchToken, fetchPackage };

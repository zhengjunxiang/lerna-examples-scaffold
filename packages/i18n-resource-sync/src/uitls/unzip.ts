import * as compressing from 'compressing';

/**
 * 解压文件
 */
const unzip = async (packageFilePath: string, localePath: string) => {
    return new Promise((res, rej) => {
        compressing.zip
            .uncompress(`${packageFilePath}`, `${localePath}`)
            .then(() => {
                res(true);
            })
            .catch((e: any) => {
                rej(false);
            });
    });
};

export default unzip;
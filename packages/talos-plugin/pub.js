// 发布上传至美团云bucket
const fsPath = require('path');
const MSS = require('mos-mss');
const mime = require('mime-types');
const fs = require('fs');

const pwd = process.cwd();
const s3 = new MSS({
    accessKeyId: '4d206e5bf2f144d1af8c905f2a6c3301',
    accessKeySecret: 'ddf4883d5b2740d6a92c6262c103f75e',
    bucket: 'r2x',
    secure: true,
    endpoint: 's3plus.vip.sankuai.com',
});

function uploadFile(key, path) {
    const staticKey = `i18n/${key}`;
    const fileBuffer = fs.readFileSync(fsPath.join(pwd, path));
    const mimeType = mime.lookup(path) || 'application/octet-stream';
    const headers = { 'Content-Type': mimeType };
    return new Promise((res, rej) => {
        const result = s3.putObject(staticKey, fileBuffer, {
            headers,
        });
        result.then((data) => {
            console.log(data);
            console.log(`\n============== upload ${fsPath.basename(path)} success ==============`);
            res(data);
        }).catch((e) => {
            console.log(e);
            console.log(`============== upload ${fsPath.basename(path)} fail ==============`);
            rej(e);
        });
    });
}

function getFilePath(startPath) {
    const result = [];
    function finder(localPath) {
        const files = fs.readdirSync(localPath);
        files.forEach((val, index) => {
            const fPath = fsPath.join(localPath, val);
            const stats = fs.statSync(fPath);
            if (stats.isDirectory()) finder(fPath);
            if (stats.isFile()) result.push(fPath);
        });
    }
    finder(startPath);
    return result;
}

function init() {
    const basePath = './lib'
    const fileArr = getFilePath(basePath);
    return Promise.all(fileArr.map((v) => {
        const key = v.slice(basePath.length - 1);
        // console.log(key, '===', v);
        return uploadFile(key, v);
    }));
}

init();
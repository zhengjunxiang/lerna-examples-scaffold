const fs = require('fs-extra');
const path = require('path');

function copyI18nextResourcesToBackend() {
  const packagePath = path.resolve(
    __dirname,
    '../../../',
    './node_modules/i18next-resources-to-backend/package.json',
  );
  const pkg = fs.readJSONSync(packagePath);
  const version = pkg.version;
  const srcPath = path.resolve(
    __dirname,
    '../../../',
    './node_modules/i18next-resources-to-backend/dist/umd/i18nextResourcesToBackend.min.js',
  );
  const destPath = path.resolve(
    __dirname,
    `../lib/umd/i18nextResourcesToBackend_${version}.min.js`,
  );
  fs.copy(srcPath, destPath, (err) => {
    if (!err) {
      console.log('copy I18nextResourcesToBackend success');
    } else {
      console.log('copy I18nextResourcesToBackend fail');
      throw err;
    }
  });
}
function copyI18nextChainedBackend() {
  const srcPath = path.resolve(
    __dirname,
    '../../../',
    './node_modules/i18next-chained-backend/dist/umd/i18nextChainedBackend.min.js',
  );
  const packagePath = path.resolve(
    __dirname,
    '../../../',
    './node_modules/i18next-chained-backend/package.json',
  );
  const pkg = fs.readJSONSync(packagePath);
  const version = pkg.version;

  const destPath = path.resolve(
    __dirname,
    `../lib/umd/i18nextChainedBackend_${version}.min.js`,
  );

  fs.copy(srcPath, destPath, (err) => {
    if (!err) {
      console.log('copy I18nextChainedBackend success');
    } else {
      console.log('copy I18nextChainedBackend fail');
      throw err;
    }
  });
}

copyI18nextResourcesToBackend();
copyI18nextChainedBackend();

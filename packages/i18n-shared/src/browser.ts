import { compareVersion } from './version';

/**
 *  判断是否是iphone的safari浏览器版本号大于
 * @param version 版本号
 */
function isIphoneSafariLowerThan(version) {
  return baseSafariLowerThan(version, 'iphone os');
}

function isMacSafariLowerThan(version) {
  return baseSafariLowerThan(version, 'mac os');
}

function baseSafariLowerThan(version, system) {
  const userAgent = window.navigator.userAgent.toLocaleLowerCase();
  const isSafari =
    userAgent.indexOf(system) !== -1 &&
    userAgent.indexOf('safari') !== -1 &&
    userAgent.indexOf('chrome') === -1;
  if (!isSafari) return false;
  const versionInfo = userAgent.match(/version\/([\d|\.]+)/);
  if (versionInfo && versionInfo[1]) {
    const safariVersion = versionInfo[1];
    return compareVersion(safariVersion, version) === -1;
  }
  return false;
}
export { isIphoneSafariLowerThan, isMacSafariLowerThan };

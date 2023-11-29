import { compareVersion } from '@sailor/i18n-shared';

function isSupportOwl() {
  return (
    typeof window !== 'undefined' &&
    window.Owl &&
    window.Owl.OWL &&
    compareVersion(window.Owl.__version__, '1.10.0') !== -1
  );
}

export { isSupportOwl };

import { LOCALSTORAGE_CACHE_KEY } from './contants';

function getCacheLocale(): string {
  const value = localStorage.getItem(LOCALSTORAGE_CACHE_KEY);
  return value;
}

export { getCacheLocale };

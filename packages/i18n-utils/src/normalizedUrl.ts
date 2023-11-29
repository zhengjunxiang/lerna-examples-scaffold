function normalizedUrl(url: string, locale: string) {
  if (!locale) return url;
  const searchIndex = url.indexOf('?');
  if (searchIndex === -1) {
    return `${url}?locale=${locale}`;
  }
  const hashIndex = url.indexOf('#');
  let hash = '';
  if (hashIndex !== -1 && hashIndex > searchIndex) {
    hash = url.slice(hashIndex);
    url = url.slice(0, hashIndex);
  } 
  const localeIndex = url.indexOf('locale=');
  if (localeIndex !== -1) {
    // 已存在
    url = url.replace(/locale=.+?(\&|$)/g, (_, g1) => {
      return `locale=${locale}${g1}`;
    });
    return `${url}${hash}`;
  }
  return `${url}&locale=${locale}${hash}`;
}

export { normalizedUrl };

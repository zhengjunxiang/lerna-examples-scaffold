let hasSessionStorageSupport: any = null;

const sessionStorageAvailable = () => {
    if (hasSessionStorageSupport !== null) return hasSessionStorageSupport;

    try {
        hasSessionStorageSupport = window && window.sessionStorage !== null;
        const testKey = 'i18next.translate.boo';
        window.sessionStorage.setItem(testKey, 'foo');
        window.sessionStorage.removeItem(testKey);
    } catch (e) {
        hasSessionStorageSupport = false;
    }
    return hasSessionStorageSupport;
};

export default {
    name: 'sessionStorage',

    lookup(options: any) {
        let found;

        if (options.lookupSessionStorage && sessionStorageAvailable()) {
        const lng = window.sessionStorage.getItem(options.lookupSessionStorage);
        if (lng) found = lng;
        }

        return found;
    },

    cacheUserLanguage(lng: string, options: any) {
        if (options.lookupSessionStorage && sessionStorageAvailable()) {
            window.sessionStorage.setItem(options.lookupSessionStorage, lng);
        }
    }
};

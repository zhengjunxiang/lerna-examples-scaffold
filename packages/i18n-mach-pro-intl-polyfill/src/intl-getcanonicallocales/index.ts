/**
 * Mach Pro容器中原样返回传入的locales
 * @param locales 
 * @returns 
 */
export function getCanonicalLocales(locales?: string[] | string): string[] {
    return Array.isArray(locales) ? locales : [ ];
}


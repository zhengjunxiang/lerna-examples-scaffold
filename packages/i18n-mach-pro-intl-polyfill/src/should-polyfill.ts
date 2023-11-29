
export function shouldPolyfill() {
    return typeof Intl === 'undefined';
}
const hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOwn(obj, prop) {
    return hasOwnProperty.call(obj, prop);
}

export { hasOwn };

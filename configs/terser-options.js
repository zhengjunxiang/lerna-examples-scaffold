// https://github.com/terser/terser
const terserOptions = {
    sourceMap: false,
    ecma: '2017',
    toplevel: true,
    ie8: false,
    keep_classnames: true,
    keep_fnames: false
};

module.exports = terserOptions;
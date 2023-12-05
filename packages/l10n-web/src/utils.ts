function stringify(obj, prefix = '') {
  var pairs = [];
  for (var key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }

    var value = obj[key];
    var enkey = encodeURIComponent(key);
    var pair;
    if (typeof value === 'object') {
      pair = stringify(value, prefix ? prefix + '[' + enkey + ']' : enkey);
    } else {
      pair = (prefix ? prefix + '[' + enkey + ']' : enkey) + '=' + encodeURIComponent(value);
    }
    pairs.push(pair);
  }
  return pairs.join('&');
}

export {
  stringify
};
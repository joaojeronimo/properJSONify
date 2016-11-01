const camelCase = require('camelcase');

function properJSONify(obj, keyTransform) {
  if (typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    const newArr = [];
    var n = obj.length;
    while(n--) {
      newArr[n] = properJSONify(obj[n], keyTransform);
    }
    return newArr;
  }

  const newObject = {};
  if (!keyTransform) {
    keyTransform = camelCase;
  }

  const keys = Object.keys(obj);
  var n = keys.length;
  while(n--) {
    const key = keys[n];
    const transformedKey = keyTransform(key);
    const value = properJSONify(obj[key], keyTransform);
    if (newObject[transformedKey]) {
      newObject[`_${transformedKey}`] = value;
    } else {
      newObject[transformedKey] = value;
    }
  }

  return newObject;
}

module.exports = properJSONify;

import _ from 'lodash';

const chekSameKey = (str, otherKey, k, files, result) => {
  if (files['file' + k][str] === files['file' + otherKey][str]) {
    if (!result.includes(`  ${str}: ${files['file' + k][str]}`)) {
      result.push(`  ${str}: ${files['file' + k][str]}`);
    }
  }

  return result;
};

const genSame = (keys, files) => {
  const result = ['{'];

  for (let k = 0; k < keys.length; k += 1) {
    const otherKey = (k === 0) ? 1 : 0

    for (const str of keys[k]) {
      if (keys[otherKey].includes(str)) {
        chekSameKey(str, otherKey, k, files, result);
      }
    }
  }

  result.push('}')
  return result.join('\n');
};

export default genSame;

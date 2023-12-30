import _ from 'lodash';

const chekSameKey = (str, other, k, files, result) => {
  if (files['file' + k][str] === files['file' + other.key][str]) {
    if (!result.includes(`    ${str}: ${files['file' + k][str]}`)) {
      result.push(`    ${str}: ${files['file' + k][str]}`);
    }
  } else if (!(files['file' + k][str] === files['file' + other.key][str])) {
    result.push(`  ${other.sing}${str}: ${files['file' + k][str]}`);
  }

  return result;
};

const genDiff = (keys, files) => {
  const result = ['{'];

  for (let k = 0; k < keys.length; k += 1) {
    const other = {
      key: (k === 0) ? 1 : 0,
      sing: (k === 0) ? '- ' : '+ '
    };

    for (const str of keys[k]) {
      if (!keys[other.key].includes(str)) {
        result.push(`  ${other.sing}${str}: ${files['file' + k][str]}`);
      } else {
        chekSameKey(str, other, k, files, result);
      }
    }
  }

  result.push('}')
  return result.join('\n');
};

export default genDiff;

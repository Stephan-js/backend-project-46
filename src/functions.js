
import fs from 'fs';
import _ from 'lodash';

const readAndParseJason = (files) => {
  try {
    const data = fs.readFileSync(files, 'utf8')
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading or parsing ${files}!`);
    return null;
  }
};

const genDiff = (keys, files) => {
  let result = '{';

  for (let k = 0; k < keys.length; k += 1) {
    const otherKey = (k === 0) ? 1 : 0;
    const sing = (k === 0) ? '- ' : '+ ';
    for (const str of keys[k]) {
      if (!keys[otherKey].includes(str)) {
        result += `\n  ${sing}${str}: ${files['file' + k][str]}`;
      } else {
        if (files['file' + k][str] === files['file' + otherKey][str] && !result.includes(str)) {
          result += `\n    ${str}: ${files['file' + k][str]}`;
        } else if (!(files['file' + k][str] === files['file' + otherKey][str])) {
          result += `\n  ${sing}${str}: ${files['file' + k][str]}`;
        }
      }
    }
  }
  return result += '\n}';
}

const getDiff = (wayFile0, wayFile1) => {
  const files = {
    file0: readAndParseJason(wayFile0), 
    file1: readAndParseJason(wayFile1)
  };

  if (!files.file1 || !files.file0) {
    console.error(`Sorry, programm can't find this files or they doesn't exsit!`);
    return undefined;
  };

  const keys = [_.keys(files.file0).sort(),  _.keys(files.file1).sort()];
  return genDiff(keys, files);
};

console.log(getDiff('../file1.json', '../file2.json'))

export default getDiff;

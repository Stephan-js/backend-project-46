import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const findParse = (typeFile) => {
  if (typeFile === '.json') {
    return JSON.parse;
  }
  if (typeFile === '.yaml' || typeFile === '.yml') {
    return yaml.load;
  }

  return undefined;
};

const readAndParseFile = (files) => {
  try {
    const format = path.extname(files);
    const data = fs.readFileSync(files, 'utf-8');
    const parse = findParse(format);

    return parse(data);
  } catch {
    return undefined;
  }
};

const getSpaces = (deep) => ' '.repeat(deep * 4 - 2);
const getKeys = (file) => _.keys(file).sort();

export { readAndParseFile, getSpaces, getKeys };

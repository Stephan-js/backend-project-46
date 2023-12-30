
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const findParse = (typeFile) => {
  if (typeFile === '.json') {
    return JSON.parse;
  } else if (typeFile === '.yaml' || typeFile === '.yml') {
    return yaml.load;
  } else if (typeFile === '.ini') {
    return ini.parse;
  }

  return undefined;
};

const readAndParseFile = (files) => {
  try {
    const format = path.extname(files);
    const data = fs.readFileSync(files, 'utf-8');
    let parse = findParse(format);

    return parse(data);
  } catch {
    return undefined;
  }
};

export default readAndParseFile;

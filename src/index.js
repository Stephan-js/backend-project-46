
import fs from 'fs';
import _ from 'lodash';

const readAndParseJason = (files) => {
  try {
    const data = fs.readFileSync(files, 'utf8')
    return JSON.parse(data);
  } catch {
    console.error(files);
    return null;
  }
};

const getWithFunction = (wayFile0, wayFile1, functions) => {
  const files = {
    file0: readAndParseJason(wayFile0), 
    file1: readAndParseJason(wayFile1)
  };

  if (!files.file1 || !files.file0 || !functions) {
    console.error('Error 101');
    return undefined;
  };

  const keys = [_.keys(files.file0).sort(),  _.keys(files.file1).sort()];

  return functions(keys, files);
};

export default getWithFunction;

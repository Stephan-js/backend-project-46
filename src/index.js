import { readAndParseFile, getKeys } from './functions.js';

const getWithFunction = (wayFile0, wayFile1, functions) => {
  const files = {
    file0: readAndParseFile(wayFile0),
    file1: readAndParseFile(wayFile1),
  };

  if (!files.file1 || !files.file0 || !functions) {
    return undefined;
  }

  const keys = [getKeys(files.file0), getKeys(files.file1)];

  return functions(keys, files);
};

export default getWithFunction;

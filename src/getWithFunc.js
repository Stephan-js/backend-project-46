import { getKeys } from './functions.js';

const getWithFunction = (files, functions) => {
  if (!files.file1 || !files.file0 || !functions) {
    return undefined;
  }

  const keys = [getKeys(files.file0), getKeys(files.file1)];

  return functions(keys, files);
};

export default getWithFunction;

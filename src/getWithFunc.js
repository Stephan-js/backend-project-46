import fs from 'fs';
import path from 'node:path';
import { getKeys } from './functions.js';
import readAndParseFile from './readAndParse.js';

const getWithFunction = (wayFile0, wayFile1, functions) => {
  let absoluteFilepath0;
  let absoluteFilepath1;
  try {
    absoluteFilepath0 = fs.readFileSync(path.resolve(wayFile0));
    absoluteFilepath1 = fs.readFileSync(path.resolve(wayFile1));
  } catch {
    return undefined;
  }
  const files = {
    file0: readAndParseFile(absoluteFilepath0, path.extname(wayFile0)),
    file1: readAndParseFile(absoluteFilepath1, path.extname(wayFile1)),
  };

  if (!files.file1 || !files.file0 || !functions) {
    return undefined;
  }

  const keys = [getKeys(files.file0), getKeys(files.file1)];

  return functions(keys, files);
};

export default getWithFunction;

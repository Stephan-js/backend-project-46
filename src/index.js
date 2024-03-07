import path from 'path';
import fs from 'fs';
import genDiffP from './formats/plain-form.js';
import genDiffJ from './formats/json-form.js';
import genDiffS from './formats/standart-form.js';
import readAndParseFile from './readAndParse.js';
import getWithFunction from './getWithFunc.js';

const genDiff = (wayFile0, wayFile1, format = 'stylish') => {
  let absoluteFilepath0;
  let absoluteFilepath1;
  // Why we need to use 'path.resolve(process.cwd(), filepath1)'
  // If 'path.resolve(filepath1)' give same result?
  try {
    absoluteFilepath0 = fs.readFileSync(path.resolve(wayFile0));
    absoluteFilepath1 = fs.readFileSync(path.resolve(wayFile1));
  } catch {
    return undefined;
  }

  const files = {
    // I think we needn't make const for each thing
    file0: readAndParseFile(absoluteFilepath0, path.extname(wayFile0)),
    file1: readAndParseFile(absoluteFilepath1, path.extname(wayFile1)),
  };

  if (format === 'json') {
    return getWithFunction(files, genDiffJ);
  }
  if (format === 'plain') {
    return getWithFunction(files, genDiffP);
  }

  return getWithFunction(files, genDiffS);
};

export default genDiff;

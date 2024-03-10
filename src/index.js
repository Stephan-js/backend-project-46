import path from 'path';
import fs from 'fs';
import getDiff from './getdiff-src.js';
import genDiffP from './formats/plain-form.js';
import genDiffS from './formats/standart-form.js';
import readAndParseFile from './getPersedData.js';

const genDiff = (wayFile0, wayFile1, format = 'stylish') => {
  let absoluteFilepath0;
  let absoluteFilepath1;
  // Why we need to use 'path.resolve(process.cwd(), filepath1)'
  // If 'path.resolve(filepath1)' give same result?
  try {
    absoluteFilepath0 = fs.readFileSync(path.resolve(wayFile0));
    absoluteFilepath1 = fs.readFileSync(path.resolve(wayFile1));
  } catch {
    // If user type wrong path
    return "Sorry, program can't find files.";
  }

  const obj0 = readAndParseFile(absoluteFilepath0, path.extname(wayFile0));
  const obj1 = readAndParseFile(absoluteFilepath1, path.extname(wayFile1));
  const diff = getDiff(obj0, obj1);

  if (format === 'json') {
    return JSON.stringify(diff);
  }
  if (format === 'plain') {
    return genDiffP(diff);
  }

  return genDiffS(diff);
};

export default genDiff;

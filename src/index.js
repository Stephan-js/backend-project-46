import path from 'path';
import fs from 'fs';
import getDiff from './getdiff-src.js';
import genDiffP from './formats/plain-form.js';
import genDiffS from './formats/standard-form.js';
import readAndParseFile from './getPersedData.js';

const giveRes = {
  json: (diff) => JSON.stringify(diff),
  plain: (diff) => genDiffP(diff),
  standard: (diff) => genDiffS(diff),
};

// If on default will be "format = 'stylish'", program'll work wrong
const genDiff = (wayFile0, wayFile1, format = 'standard') => {
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
  if (obj0 === undefined || obj1 === undefined) {
    return 'Sorry, you give wrong type file.';
  }
  const diff = getDiff(obj0, obj1);

  let res;
  try {
    res = giveRes[format](diff);
  } catch {
    res = 'Wrong format.';
  }
  return res;
};

export default genDiff;

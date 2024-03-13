import path from 'path';
import fs from 'fs';
import getDiff from './getdiff.js';
import genDiffP from './formats/plain-form.js';
import genDiffS from './formats/standard-form.js';
import getParsedData from './getPersedData.js';

const giveRes = {
  json: (diff) => JSON.stringify(diff),
  plain: (diff) => genDiffP(diff),
  stylish: (diff) => genDiffS(diff),
};

const genDiff = (wayFile0, wayFile1, format = 'stylish') => {
  const data0 = fs.readFileSync(path.resolve(wayFile0), 'utf-8');
  const data1 = fs.readFileSync(path.resolve(wayFile1), 'utf-8');

  const ext0 = path.extname(wayFile0);
  const ext1 = path.extname(wayFile1);

  const obj0 = getParsedData(data0, ext0);
  const obj1 = getParsedData(data1, ext1);
  const diff = getDiff(obj0, obj1);

  try {
    return giveRes[format](diff);
  } catch {
    throw new Error(`Sorry, you give unavailable format. (${format})`);
  }
};

export default genDiff;

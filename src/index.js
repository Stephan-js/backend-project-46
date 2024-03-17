import path from 'path';
import fs from 'fs';
import getDiff from './getdiff.js';
import getFormat from './getFormat.js';
import getParsedData from './getPersedData.js';

const genDiff = (wayFile0, wayFile1, format = 'stylish') => {
  const data0 = fs.readFileSync(path.resolve(wayFile0), 'utf-8');
  const data1 = fs.readFileSync(path.resolve(wayFile1), 'utf-8');

  const ext0 = path.extname(wayFile0);
  const ext1 = path.extname(wayFile1);

  const obj0 = getParsedData(data0, ext0);
  const obj1 = getParsedData(data1, ext1);
  const diff = getDiff(obj0, obj1);

  return getFormat(diff, format);
};

export default genDiff;

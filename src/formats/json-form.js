import getDiff from '../getdiff/getdiff-src.js';
import getRes from './gen-res.js';

const genDiffJ = (keys, files) => {
  const diff = [];
  getDiff(keys, files, 1, diff);
  const res = diff.map((val) => val.trim());
  // Map all key (delete all other spaces);
  const sett = {
    add: (rDirection, firstVal, val, result) => result.add.push({
      name: firstVal,
      value: String(val).replaceAll("'", ''),
      direction: `${rDirection}${firstVal}`,
    }),
    update: (rDirection, firstVal, backVal, val, result) => result.update.push({
      name: firstVal,
      oldValue: String(backVal).replaceAll("'", ''),
      newValue: String(val).replaceAll("'", ''),
      // Use class String to 'ReplaceAll' metod
      direction: `${rDirection}${firstVal}`,
    }),
    delete: (rDirection, firstVal, result) => result.deleted.push({
      name: firstVal,
      direction: `${rDirection}${firstVal}`,
    }),
  };
  // Give rule how add params

  return JSON.stringify(getRes(res, { add: [], update: [], deleted: [] }, sett));
  // Return result
};

export default genDiffJ;

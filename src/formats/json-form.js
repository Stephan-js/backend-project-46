import getDiff from '../function/gendiff-src.js';
import getRes from './gen-res.js';

const genDiff = (keys, files) => {
  const diff = [];
  getDiff(keys, files, 1, diff);
  const res = diff.map((val) => val.trim());
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
      direction: `${rDirection}${firstVal}`,
    }),
    delete: (rDirection, firstVal, result) => result.deleted.push({
      name: firstVal,
      direction: `${rDirection}${firstVal}`,
    }),
  };

  return getRes(res, { add: [], update: [], deleted: [] }, sett);
};

export default genDiff;

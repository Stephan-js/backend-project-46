import getDiff from '../../getdiff/src/gendiff-src.js';
import getRes from '../functions/gen-res.js';

const genDiff = (keys, files) => {
  const diff = [];
  getDiff(keys, files, 1, diff);
  const res = diff.map((val) => val.trim());
  const sett = {
    add: (rDirection, firstVal, val, result) => result.push(`Property '${rDirection}${firstVal}' was added with value: ${val}`),
    update: (rDirection, firstVal, backVal, val, result) => result.push(`Property '${rDirection}${firstVal}' was updated. From ${backVal} to ${val}`),
    delete: (rDirection, firstVal, result) => result.push(`Property '${rDirection}${firstVal}' was removed`),
  };

  return getRes(res, [], sett).join('\n');
};

export default genDiff;

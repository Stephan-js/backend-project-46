import getDiff from '../getdiff/getdiff-src.js';
import getRes from './gen-res.js';

const genDiffP = (keys, files) => {
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

export default genDiffP;

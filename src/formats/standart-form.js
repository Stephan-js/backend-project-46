import _ from 'lodash';
import { getSpaces } from '../functions.js';

const sign = {
  add: '+',
  deleted: '-',
  same: ' ',
};

const genDiffS = (diff, deep = 1) => {
  const res = [];
  const spaces = getSpaces(deep);
  for (const dif of diff) {
    if (!_.isObject(dif.value)) {
      res.push(`${spaces}${sign[dif.status]} ${dif.name}: ${dif.value}`);
    } else if (Array.isArray(dif.value)) {
      const val = genDiffS(dif.value, deep + 1);
      res.push(`${spaces}${sign[dif.status]} ${dif.name}: {`);
      res.push(val);
      res.push(`${spaces}}`);
    } else {
      console.log(dif);
    }
  }

  return res.join('\n');
};

export default genDiffS;

/* eslint-disable import/no-cycle */
import _ from 'lodash';
import checkStr from './check-str.js';
import checkObj from './check-obj.js';

const getDiff = (keys, files, deep, result) => {
  const sortedKeys = _.sortedUniq(keys[0].concat(keys[1]).sort());

  for (const str of sortedKeys) {
    const keyss = {
      this: keys[0].includes(str) ? 0 : 1,
      other: keys[0].includes(str) ? 1 : 0,
    };
    const sing = {
      this: keys[0].includes(str) ? '-' : '+',
      other: keys[0].includes(str) ? '+' : '-',
    };

    const data = [keys, files, deep, result, sing, keyss, str];

    if (_.isObject(files[`file${keyss.this}`][str])) {
      checkObj(data);
    } else {
      checkStr(data);
    }
  }

  return result;
};

export default getDiff;

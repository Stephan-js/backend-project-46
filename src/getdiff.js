/* eslint-disable no-restricted-syntax */
import _ from 'lodash';

// Get all keys
const getKeys = (file0, file1) => _.uniq(_.concat(_.keys(file0), _.keys(file1))).sort();

const getDiff = (obj0, obj1) => {
  const keys = getKeys(obj0, obj1);
  const res = [];
  keys.forEach((key) => {
    if (!_.has(obj0, key)) {
      res.push({ name: key, value: obj1[key], status: 'added' });
    } else if (!_.has(obj1, key)) {
      res.push({ name: key, value: obj0[key], status: 'deleted' });
    } else if (_.isObject(obj0[key]) && _.isObject(obj1[key])) {
      const val = getDiff(obj0[key], obj1[key]);
      res.push({ name: key, value: val, status: 'same' });
    } else if (obj0[key] === obj1[key]) {
      res.push({ name: key, value: obj0[key], status: 'same' });
    } else {
      res.push({ name: key, value: obj0[key], status: 'deleted' });
      res.push({ name: key, value: obj1[key], status: 'added' });
    }
  });

  return res;
};

export default getDiff;

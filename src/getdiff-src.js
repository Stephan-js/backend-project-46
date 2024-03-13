/* eslint-disable no-restricted-syntax */
import _ from 'lodash';

// Get all keys
const getKeys = (file0, file1) => _.uniq(_.concat(_.keys(file0), _.keys(file1))).sort();

// Make custom class for result
class MakeResObj {
  res = [];

  // Add 'Add' function
  push(n, v, s) {
    // n - name
    // v - value
    // s - satatus
    this.res.push({
      name: n,
      value: v,
      status: s,
    });
  }
}

const getDiff = (obj0, obj1) => {
  const keys = getKeys(obj0, obj1);
  const res = new MakeResObj();

  for (const key of keys) {
    // If one of val not obj =>
    if (!_.isObject(obj0[key]) || !_.isObject(obj1[key])) {
      // If both have val
      if (obj0[key] !== undefined && obj1[key] !== undefined) {
        // If both have same val
        if (obj0[key] === obj1[key]) {
          res.push(key, obj0[key], 'same');
          // If diffrent val
        } else {
          res.push(key, obj0[key], 'deleted');
          res.push(key, obj1[key], 'added');
        }
        // If only one val exist
      } else if (obj0[key] !== undefined) res.push(key, obj0[key], 'deleted');
      else res.push(key, obj1[key], 'added');
      // If both object
    } else {
      const val = getDiff(obj0[key], obj1[key]);
      res.push(key, val, 'same');
    }
  }

  return res.res;
};

// P.S. - Thx it's much easier ;)
export default getDiff;

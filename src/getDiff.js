import _ from 'lodash';

const getKeys = (file0, file1) => _.uniq(_.concat(_.keys(file0), _.keys(file1)));

const getDiff = (obj0, obj1) => {
  const keys = _.sortBy(getKeys(obj0, obj1));
  const treePart = keys.map((key) => {
    if (!_.has(obj0, key)) return { name: key, value: obj1[key], status: 'added' };
    if (!_.has(obj1, key)) return { name: key, value: obj0[key], status: 'deleted' };
    if (_.isObject(obj0[key]) && _.isObject(obj1[key])) {
      return { name: key, value: getDiff(obj0[key], obj1[key]), status: 'object' };
    }
    if (obj0[key] === obj1[key]) return { name: key, value: obj0[key], status: 'same' };
    return {
      name: key,
      oldValue: obj0[key],
      newValue: obj1[key],
      status: 'updated',
    };
  });

  return treePart;
};

export default getDiff;

// const sign = {
//   added: '+',
//   deleted: '-',
//   same: ' ',
//   object: ' ',
// };

// const getAllFromObj = (obj, deep) => {
//   let res = [];
//   const spaces = getSpaces(deep);
//   const keys = _.sortBy(_.keys(obj));

//   keys.forEach((key) => {
//     if (!_.isObject(obj[key])) {
//       res = _.concat(res, `${spaces}  ${key}: ${obj[key]}`);
//     } else {
//       res = _.concat(res, `${spaces}  ${key}:
// {`, getAllFromObj(obj[key], deep + 1), `${spaces}  }`);
//     }
//   });

//   return res.join('\n');
// };

// const addObj = (dif, deep, func) => {
//   const spaces = getSpaces(deep);
//   const name = `${spaces}${sign[dif.status]} ${dif.name}: {`;
//   return [name, func(dif.value, deep + 1), `${spaces}  }`]
// };

// const checkUpdatedVal = (dif, deep, val) => {
//   const spaces = getSpaces(deep);
//   const signs = (val === dif.newValue) ? '+' : '-';

//   if (_.isObject(val)) {
//     return [`${spaces}${signs} ${dif.name}: {`, getAllFromObj(val, deep + 1), `${spaces}  }`];
//   }
//   return `${spaces}${signs} ${dif.name}: ${val}`;
// };

// const genDiff = (diff, deep = 1) => {
//   let res = [];
//   const spaces = getSpaces(deep);
//   diff.forEach((dif) => {
//     if (dif.status === 'updated') {
//       res = _.concat(res, checkUpdatedVal(dif, deep, dif.oldValue));
//       res = _.concat(res, checkUpdatedVal(dif, deep, dif.newValue));
//     } else if (dif.status === 'object') {
//       res = _.concat(res, addObj(dif, deep, genDiff));
//     } else if (_.isObject(dif.value)) {
//       res = _.concat(res, addObj(dif, deep, getAllFromObj));
//     } else {
//       res = _.concat(res, `${spaces}${sign[dif.status]} ${dif.name}: ${dif.value}`);
//     }
//   });

//   return res.join('\n');
// };

// const genRes = (diff) => ['{', genDiff(diff), '}'].join('\n');

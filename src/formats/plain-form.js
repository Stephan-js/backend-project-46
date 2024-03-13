import _ from 'lodash';

const checkValue = (val) => {
  if (_.isString(val)) {
    return `'${val}'`;
  }
  if (_.isObject(val)) {
    return '[complex value]';
  }
  return val;
};

const addStr = {
  added: (dif, way) => `Property '${way}${dif.name}' was added with value: ${checkValue(dif.value)}`,
  deleted: (dif, way) => `Property '${way}${dif.name}' was removed`,
  updated: (dif, way) => `Property '${way}${dif.name}' was updated. From ${checkValue(dif.oldValue)} to ${checkValue(dif.newValue)}`,
};

const genDiffP = (diff, way = '') => {
  const res = [];
  diff.forEach((dif) => {
    if (dif.status !== 'same') {
      res.push(addStr[dif.status](dif, way));
    } else if (_.isObject(dif.value)) {
      res.push(genDiffP(dif.value, `${way}${dif.name}.`));
    }
  });

  return res.join('\n');
};

export default genDiffP;

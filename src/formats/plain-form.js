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
  update: (dif0, dif1, way) => `Property '${way}${dif0.name}' was updated. From ${checkValue(dif0.value)} to ${checkValue(dif1.value)}`,
};

const genDiffP = (diff, way = '') => {
  const res = [];
  for (let i = 0; i < diff.length; i += 1) {
    const dif = diff[i];

    if (dif.status !== 'same') {
      if (diff[i + 1]) {
        if (dif.name !== diff[i + 1].name) {
          // Yep, 2 same part (IDK, how to fix it)
          res.push(addStr[dif.status](dif, way));
        } else {
          res.push(addStr.update(dif, diff[i + 1], way));
          i += 1;
        }
      } else {
        // Yep, 2 same part (IDK, how to fix it)
        res.push(addStr[dif.status](dif, way));
      }
    } else if (_.isObject(dif.value)) {
      res.push(genDiffP(diff[i].value, `${way}${dif.name}.`));
    }
  }

  return res.join('\n');
};

export default genDiffP;

import _ from 'lodash';

const getSpaces = (deep) => ' '.repeat(deep * 4 - 2);
const sign = {
  added: '+',
  deleted: '-',
  same: ' ',
  object: ' ',
};

const getAllFromObj = (obj, deep) => {
  const res = [];
  const spaces = getSpaces(deep);
  const keys = _.sortBy(_.keys(obj));

  keys.forEach((key) => {
    if (!_.isObject(obj[key])) {
      res[res.length] = (`${spaces}  ${key}: ${obj[key]}`);
    } else {
      res[res.length] = (`${spaces}  ${key}: {`);
      res[res.length] = (getAllFromObj(obj[key], deep + 1));
      res[res.length] = (`${spaces}  }`);
    }
  });

  return res.join('\n');
};

const addObj = (dif, deep, res, func) => {
  const spaces = getSpaces(deep);

  res[res.length] = (`${spaces}${sign[dif.status]} ${dif.name}: {`);
  res[res.length] = (func(dif.value, deep + 1));
  res[res.length] = (`${spaces}  }`);
};

const checkUpdatedVal = (dif, deep, res, val) => {
  const spaces = getSpaces(deep);
  const signs = (val === dif.newValue) ? '+' : '-';

  if (_.isObject(val)) {
    res[res.length] = (`${spaces}${signs} ${dif.name}: {`);
    res[res.length] = (getAllFromObj(val, deep + 1));
    res[res.length] = (`${spaces}  }`);
  } else {
    res[res.length] = (`${spaces}${signs} ${dif.name}: ${val}`);
  }
};

const genDiff = (diff, deep = 1) => {
  const res = [];
  const spaces = getSpaces(deep);
  diff.forEach((dif) => {
    if (dif.status === 'updated') {
      checkUpdatedVal(dif, deep, res, dif.oldValue);
      checkUpdatedVal(dif, deep, res, dif.newValue);
    } else if (dif.status === 'object') {
      addObj(dif, deep, res, genDiff);
    } else if (_.isObject(dif.value)) {
      addObj(dif, deep, res, getAllFromObj);
    } else {
      res[res.length] = (`${spaces}${sign[dif.status]} ${dif.name}: ${dif.value}`);
    }
  });

  return res.join('\n');
};

const genRes = (diff) => ['{', genDiff(diff), '}'].join('\n');

export default genRes;

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
  const keys = _.keys(obj).sort();

  keys.forEach((key) => {
    if (!_.isObject(obj[key])) {
      res.push(`${spaces}  ${key}: ${obj[key]}`);
    } else {
      res.push(`${spaces}  ${key}: {`);
      res.push(getAllFromObj(obj[key], deep + 1));
      res.push(`${spaces}  }`);
    }
  });

  return res.join('\n');
};

const addObj = (dif, deep, res, func) => {
  const spaces = getSpaces(deep);

  res.push(`${spaces}${sign[dif.status]} ${dif.name}: {`);
  res.push(func(dif.value, deep + 1));
  res.push(`${spaces}  }`);
};

const checkUpdatedVal = (dif, deep, res, val) => {
  const spaces = getSpaces(deep);
  const signs = (val === dif.newValue) ? '+' : '-';

  if (_.isObject(val)) {
    res.push(`${spaces}${signs} ${dif.name}: {`);
    res.push(getAllFromObj(val, deep + 1));
    res.push(`${spaces}  }`);
  } else {
    res.push(`${spaces}${signs} ${dif.name}: ${val}`);
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
      res.push(`${spaces}${sign[dif.status]} ${dif.name}: ${dif.value}`);
    }
  });

  return res.join('\n');
};

const genRes = (diff) => {
  const res = ['{'];
  res.push(genDiff(diff));
  res.push('}');
  return res.join('\n');
};

export default genRes;

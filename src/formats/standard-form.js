import _ from 'lodash';

const getSpaces = (deep) => ' '.repeat(deep * 4 - 2);
const sign = {
  added: '+',
  deleted: '-',
  same: ' ',
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

// Function to make code shorter
const addObject = (deep, val, sings, name, res, func) => {
  const spaces = getSpaces(deep);
  res.push(`${spaces}${sings} ${name}: {`);
  res.push(func(val, deep + 1));
  res.push(`${spaces}  }`);
};

// I made special function for Updated value, 'cause this code too big for add in head function
const addUdatedValue = (deep, dif, res, newValue) => {
  const spaces = getSpaces(deep);
  const sings = newValue ? '+' : '-';
  const val = newValue ? dif.newValue : dif.oldValue;
  if (_.isObject(val)) {
    addObject(deep, val, sings, dif.name, res, getAllFromObj);
  } else {
    res.push(`${spaces}${sings} ${dif.name}: ${val}`);
  }
};

const genDiff = (diff, deep = 1) => {
  const res = [];
  const spaces = getSpaces(deep);
  diff.forEach((dif) => {
    if (dif.status === 'updated') {
      addUdatedValue(deep, dif, res, false);
      addUdatedValue(deep, dif, res, true);
    } else if (!_.isObject(dif.value)) {
      res.push(`${spaces}${sign[dif.status]} ${dif.name}: ${dif.value}`);
    } else if (Array.isArray(dif.value)) {
      addObject(deep, dif.value, sign[dif.status], dif.name, res, genDiff);
    } else {
      addObject(deep, dif.value, sign[dif.status], dif.name, res, getAllFromObj);
    }
  });

  return res.join('\n');
};

const makeRes = (diff) => {
  const res = ['{'];
  res.push(genDiff(diff));
  res.push('}');
  return res.join('\n');
};

export default makeRes;

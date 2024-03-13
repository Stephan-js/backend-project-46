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

// I made special function for Updated value, 'cause this code too big for add in head function
const checkUpdatedValue = (deep, dif, res) => {
  const spaces = getSpaces(deep);

  if (_.isObject(dif.oldValue)) {
    res.push(`${spaces}- ${dif.name}: {`);
    res.push(getAllFromObj(dif.oldValue, deep + 1));
    res.push(`${spaces}  }`);
  } else {
    res.push(`${spaces}- ${dif.name}: ${dif.oldValue}`);
  }

  if (_.isObject(dif.newValue)) {
    res.push(`${spaces}+ ${dif.name}: {`);
    res.push(getAllFromObj(dif.newValue, deep + 1));
    res.push(`${spaces}  }`);
  } else {
    res.push(`${spaces}+ ${dif.name}: ${dif.newValue}`);
  }
};

const genDiff = (diff, deep = 1) => {
  const res = [];
  const spaces = getSpaces(deep);
  diff.forEach((dif) => {
    if (dif.status === 'updated') {
      checkUpdatedValue(deep, dif, res);
    } else if (!_.isObject(dif.value)) {
      res.push(`${spaces}${sign[dif.status]} ${dif.name}: ${dif.value}`);
    } else if (Array.isArray(dif.value)) {
      res.push(`${spaces}${sign[dif.status]} ${dif.name}: {`);
      res.push(genDiff(dif.value, deep + 1));
      res.push(`${spaces}  }`);
    } else {
      res.push(`${spaces}${sign[dif.status]} ${dif.name}: {`);
      res.push(getAllFromObj(dif.value, deep + 1));
      res.push(`${spaces}  }`);
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

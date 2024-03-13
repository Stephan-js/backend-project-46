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

  for (const key of keys) {
    if (!_.isObject(obj[key])) {
      res.push(`${spaces}  ${key}: ${obj[key]}`);
    } else {
      res.push(`${spaces}  ${key}: {`);
      res.push(getAllFromObj(obj[key], deep + 1));
      res.push(`${spaces}  }`);
    }
  }

  return res.join('\n');
};

const genDiffS = (diff, deep = 1) => {
  const res = [];
  const spaces = getSpaces(deep);
  for (const dif of diff) {
    if (!_.isObject(dif.value)) {
      res.push(`${spaces}${sign[dif.status]} ${dif.name}: ${dif.value}`);
    } else if (Array.isArray(dif.value)) {
      const val = genDiffS(dif.value, deep + 1);
      res.push(`${spaces}${sign[dif.status]} ${dif.name}: {`);
      res.push(val);
      res.push(`${spaces}  }`);
    } else {
      res.push(`${spaces}${sign[dif.status]} ${dif.name}: {`);
      res.push(getAllFromObj(dif.value, deep + 1));
      res.push(`${spaces}  }`);
    }
  }

  return res.join('\n');
};

const giveRes = (diff) => {
  const res = ['{'];
  res.push(genDiffS(diff));
  res.push('}');
  return res.join('\n');
};

export default giveRes;

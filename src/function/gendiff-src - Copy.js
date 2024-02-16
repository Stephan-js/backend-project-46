import _ from 'lodash';

const getAllFromObj = (obj, deep) => {
  let result = {};
  const keys = _.keys(obj).sort();
  console.log(keys);
  for (const key of keys) {
    if (_.isObject(obj[key])) {
      result[key] = getAllFromObj(obj[key], deep + 1);
    } else {
      result[key] = { name: key };
    }
  }

  return result;
};

const checkObj = (data, arr, obj) => {
  const [keys, key, files, deep, result] = data;

  if (keys[arr].includes(key)) {
    console.log(key);
  } else {
    result.push(getAllFromObj(obj, deep));
  }
};

const getDiff = (keys, files, deep, result) => {
  for (const key of keys[0]) {
    const data = [keys, key, files, deep, result];
    if (_.isObject(files.file0[key])) {
      checkObj(data, 1, files.file0[key]);
    } else {

    }
  }
};

export default getDiff;

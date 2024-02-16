import _ from 'lodash';

const getAllFromObj = (obj, result, deep) => {
  const space = getSpaces(deep);

  const keys = _.keys(obj).sort();
  for (const str of keys) {
    if (_.isObject(obj[str])) {
      result.push(`${space}  ${str}: {`);
      getAllFromObj(obj[str], result, deep + 1);
      result.push(`${space}  }`);
    } else {
      result.push(`${space}  ${str}: ${obj[str]}`);
    }
  }

  return result;
};

const checkSameObj = (data) => {
  const [, files, deep, result,,, str] = data;
  const space = getSpaces(deep);

  const filesN = {
    file0: files[`file${0}`][str],
    file1: files[`file${1}`][str],
  };

  const keysN = [getKeys(filesN.file0), getKeys(filesN.file1)];

  result.push(`${space}  ${str}: {`);
  // eslint-disable-next-line no-use-before-define
  getDiff(keysN, filesN, deep + 1, result);
  result.push(`${space}  }`);

  return result;
};

const checkObj = (data) => {
  const [keys, files, deep, result, sing, keyss, str] = data;
  const space = getSpaces(deep);

  if (!keys[keyss.other].includes(str)) {
    result.push(`${space}${sing.this} ${str}: {`);
    getAllFromObj(files[`file${keyss.this}`][str], result, deep + 1);
    result.push(`${space}  }`);
  } else if (!_.isObject(files[`file${keyss.other}`][str])) {
    result.push(`${space}${sing.this} ${str}: {`);
    getAllFromObj(files[`file${keyss.this}`][str], result, deep + 1);
    result.push(`${space}  }`);
    result.push(`${space}${sing.other} ${str}: ${files[`file${keyss.other}`][str]}`);
  } else {
    checkSameObj(data);
  }

  return result;
};

const getDiff = (keys, files, deep, result) => {
  const sortedKeys = _.sortedUniq(keys[0].concat(keys[1]).sort());

  for (const str of sortedKeys) {
    const keyss = {
      this: keys[0].includes(str) ? 0 : 1,
      other: keys[0].includes(str) ? 1 : 0,
    };
    const sing = {
      this: keys[0].includes(str) ? '-' : '+',
      other: keys[0].includes(str) ? '+' : '-',
    };

    const data = [keys, files, deep, result, sing, keyss, str];

    if (_.isObject(files[`file${keyss.this}`][str])) {
      checkObj(data);
    } else {
      checkStr(data);
    }
  }

  return result;
};

export default getDiff;

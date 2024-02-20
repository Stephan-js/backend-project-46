/* eslint-disable import/no-cycle */
import _ from 'lodash';
import { getSpaces, getKeys, addToRes } from '../functions.js';
import getDiff from './getdiff-src.js';

const checkSameObj = (data) => {
  const [, files, deep, result,,, str] = data;
  const space = getSpaces(deep);

  const filesN = {
    file0: files[`file${0}`][str],
    file1: files[`file${1}`][str],
  };

  const keysN = [getKeys(filesN.file0), getKeys(filesN.file1)];

  result.push(`${space}  ${str}: {`);
  getDiff(keysN, filesN, deep + 1, result);
  result.push(`${space}  }`);

  return result;
};

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
    addToRes(result, space, sing.other, str, files, keyss.other);
  } else if (!_.isObject(files[`file${keyss.this}`][str])) {
    addToRes(result, space, sing.this, str, files, keyss.this);
    result.push(`${space}${sing.other} ${str}: {`);
    getAllFromObj(files[`file${keyss.other}`][str], result, deep + 1);
    result.push(`${space}  }`);
  } else {
    checkSameObj(data);
  }

  return result;
};

export default checkObj;

import _ from 'lodash';
import { getSpaces } from '../functions.js';
// eslint-disable-next-line import/no-cycle
import checkSameObj from './check-same-obj.js';

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
    result.push(`${space}${sing.other} ${str}: ${files[`file${keyss.other}`][str]}`);
  } else {
    checkSameObj(data);
  }

  return result;
};

export default checkObj;

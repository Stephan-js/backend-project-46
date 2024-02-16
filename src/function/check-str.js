import { getSpaces } from '../functions.js';

const checkSameKey = (data) => {
  const [, files, deep, result, sing, keyss, str] = data;
  const space = getSpaces(deep);

  if (files[`file${keyss.this}`][str] === files[`file${keyss.other}`][str]) {
    result.push(`${space}  ${str}: ${files[`file${keyss.this}`][str]}`);
  } else {
    result.push(`${space}${sing.this} ${str}: ${files[`file${keyss.this}`][str]}`);
    result.push(`${space}${sing.other} ${str}: ${files[`file${keyss.other}`][str]}`);
  }

  return result;
};

const checkStr = (data) => {
  const [keys, files, deep, result, sing, keyss, str] = data;
  const space = getSpaces(deep);

  if (!keys[keyss.other].includes(str)) {
    result.push(`${space}${sing.this} ${str}: ${files[`file${keyss.this}`][str]}`);
  } else {
    checkSameKey(data);
  }

  return result;
};

export default checkStr;

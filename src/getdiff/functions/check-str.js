import { getSpaces, addToRes } from './functions.js';

const checkSameKey = (data) => {
  const [, files, deep, result, sing, keyss, str] = data;
  const space = getSpaces(deep);

  if (files[`file${keyss.this}`][str] === files[`file${keyss.other}`][str]) {
    result.push(`${space}  ${str}: ${files[`file${keyss.this}`][str]}`);
  } else {
    addToRes(result, space, sing.this, str, files, keyss.this);
    addToRes(result, space, sing.other, str, files, keyss.other);
  }

  return result;
};

const checkStr = (data) => {
  const [keys, files, deep, result, sing, keyss, str] = data;
  const space = getSpaces(deep);

  if (!keys[keyss.other].includes(str)) {
    addToRes(result, space, sing.this, str, files, keyss.this);
  } else {
    checkSameKey(data);
  }

  return result;
};

export default checkStr;

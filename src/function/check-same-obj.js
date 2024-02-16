// eslint-disable-next-line import/no-cycle
import getDiff from './gendiff-src.js';
import { getSpaces, getKeys } from '../functions.js';

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

export default checkSameObj;

import genDiffP from './formats/plain-form.js';
import genDiffJ from './formats/json-form.js';
import genDiffS from './formats/standart-form.js';
import getWithFunction from './getWithFunc.js';

const genDiff = (file0, file1, format = 'standart') => {
  if (format === 'json') {
    return getWithFunction(file0, file1, genDiffJ);
  }
  if (format === 'plain') {
    return getWithFunction(file0, file1, genDiffP);
  }

  return getWithFunction(file0, file1, genDiffS);
};

export default genDiff;

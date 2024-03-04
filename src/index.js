import genDiffP from './formats/plain-form.js';
import genDiffJ from './formats/json-form.js';
import genDiffS from './formats/standart-form.js';
import getWithFunction from './getWithFunc.js';

const genDiff = (filepath1, filepath2, format = 'standart') => {
  if (format === 'json') {
    return getWithFunction(filepath1, filepath2, genDiffJ);
  }
  if (format === 'plain') {
    return getWithFunction(filepath1, filepath2, genDiffP);
  }

  return getWithFunction(filepath1, filepath2, genDiffS);
};

export default genDiff;

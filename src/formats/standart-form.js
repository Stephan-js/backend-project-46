import getDiff from '../getdiff/getdiff-src.js';

const genDiffS = (keys, files) => {
  const result = ['{'];

  getDiff(keys, files, 1, result);

  result.push('}');

  return result.join('\n');
};

export default genDiffS;

import getDiff from '../../getdiff/src/gendiff-src.js';

const genDiff = (keys, files) => {
  const result = ['{'];

  getDiff(keys, files, 1, result);

  result.push('}');

  return result.join('\n');
};

export default genDiff;

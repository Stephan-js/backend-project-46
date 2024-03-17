import genDiffP from './formats/plain.js';
import genDiffS from './formats/stylish.js';

const getFormat = (diff, format) => {
  switch (format) {
    case 'stylish':
      return genDiffS(diff);
    case 'plain':
      return genDiffP(diff);
    case 'json':
      return JSON.stringify(diff);
    default:
      throw new Error(`Unavalibal format - "${format}".`);
  }
};

export default getFormat;

import _ from 'lodash';

const getSpaces = (deep) => ' '.repeat(deep * 4 - 2);
const getKeys = (file0, file1) => _.uniq(_.concat(_.keys(file0), _.keys(file1))).sort();

export { getSpaces, getKeys };

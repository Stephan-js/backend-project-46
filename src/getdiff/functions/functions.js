import _ from 'lodash';

const getSpaces = (deep) => ' '.repeat(deep * 4 - 2);
const getKeys = (file) => _.keys(file).sort();

export { getSpaces, getKeys };

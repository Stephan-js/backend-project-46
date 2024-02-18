import _ from 'lodash';

const getSpaces = (deep) => ' '.repeat(deep * 4 - 2);
const getKeys = (file) => _.keys(file).sort();
const addToRes = (result, space, sing, str, files, key) => result.push(`${space}${sing} ${str}: ${files[`file${key}`][str]}`);

export { getSpaces, getKeys, addToRes };

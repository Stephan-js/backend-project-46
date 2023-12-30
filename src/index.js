
import _ from 'lodash';
import readAndParseFile from "./functions.js";

const getWithFunction = (wayFile0, wayFile1, functions) => {
  const files = {
    file0: readAndParseFile(wayFile0), 
    file1: readAndParseFile(wayFile1)
  };

  if (!files.file1 || !files.file0 || !functions) {
    return undefined;
  };

  const keys = [_.keys(files.file0).sort(),  _.keys(files.file1).sort()];

  return functions(keys, files);
};

export default getWithFunction;

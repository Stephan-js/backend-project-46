
import genDiff from "./function/gendiffsrc.js";
import genSame from "./function/gensamesrc.js";
import showFiles from "./function/genfilesrc.js";

const gen = {
  diff: genDiff,
  same: genSame,
  files: showFiles
};

export default gen;

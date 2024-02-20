const checkNumb = (val) => {
  if (Number(val).isNaN()) {
    return Number(val);
  }

  return val;
};

const checkValue = (val) => {
  let rVal;
  if (val !== undefined) {
    rVal = val.trim();
  }
  switch (rVal) {
    case 'true':
      return true;
    case 'false':
      return false;
    case 'undefined':
      return undefined;
    case '[complex value]':
      return '[complex value]';
    case 'null':
      return null;
    case 'NaN':
      return NaN;
    default:
      return checkNumb(rVal);
  }
};

export default checkValue;

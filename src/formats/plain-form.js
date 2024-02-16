import getDiff from '../function/gendiff-src.js';

const findVal = (diff, i, rat) => {
  let otherStr;
  let otherVal;
  let good;

  if (rat) {
    otherStr = diff[i + 1];
  } else {
    otherStr = diff[i - 1];
  }

  if (otherStr) {
    good = otherStr.startsWith('+');
    if (!good) {
      good = otherStr.startsWith('-');
    }
  }

  if (rat) {
    for (let n = i + 1; !good; n += 1) {
      if (diff[n] === undefined) {
        return [otherStr, otherVal];
      }
      if (diff[n].startsWith('+') || diff[n].startsWith('-')) {
        otherStr = diff[n];
        break;
      }
    }
  } else {
    for (let n = i - 1; !good; n -= 1) {
      if (diff[n] === undefined) {
        return [otherStr, otherVal];
      }
      if (diff[n].startsWith('+') || diff[n].startsWith('-')) {
        otherStr = diff[n];
        break;
      }
    }

    if (otherStr) {
      [, otherVal] = otherStr.split(':');
      if (otherVal.trim() === '{') {
        otherVal = '[complex value]';
      }
    }
  }

  return [otherStr, otherVal];
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
      return `'${rVal}'`;
  }
};

const findResult = (diff) => {
  const direction = [];
  const result = [];
  for (let i = 0; i < diff.length; i += 1) {
    const str = diff[i];
    let [, backVal] = findVal(diff, i, false);
    const [backStr] = findVal(diff, i, false);
    const [forwStr] = findVal(diff, i, true);
    let firstVal = str.split(':')[0];
    if (firstVal.startsWith('+') || firstVal.startsWith('-')) {
      firstVal = firstVal.slice(2);
    }
    let val = str.split(':')[1];
    if (val === ' {') {
      val = '[complex value]';
    }
    if ((str.startsWith('+') || str.startsWith('-')) && val === '[complex value]') {
      direction.push('');
    } else if (val === '[complex value]') {
      direction.push(firstVal);
    } else if (str.trim() === '}') {
      direction.pop();
    }
    let rDirection = direction.join('.');
    if (rDirection !== '' && !rDirection.endsWith('.')) {
      rDirection += '.';
    }
    val = checkValue(val);
    backVal = checkValue(backVal);

    if (str.startsWith('+') && !backStr.includes(firstVal)) {
      result.push(`Property '${rDirection}${firstVal}' was added with value: ${val}`);
    } else if (str.startsWith('+') && backStr.includes(firstVal)) {
      result.push(`Property '${rDirection}${firstVal}' was updated. From ${backVal} to ${val}`);
    } else if (str.startsWith('-') && !forwStr.includes(firstVal)) {
      result.push(`Property '${rDirection}${firstVal}' was removed`);
    }
  }

  return result.join('\n');
};

const genDiff = (keys, files) => {
  const diff = [];
  getDiff(keys, files, 1, diff);
  const res = diff.map((val) => val.trim());

  return findResult(res);
};

export default genDiff;

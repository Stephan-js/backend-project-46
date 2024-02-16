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

export default findVal;

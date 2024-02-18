const getParm = (diff, i, rat) => {
  // Function to get all parameters
  let n;
  let otherStr;
  let otherVal;
  let good;

  if (rat) {
    otherStr = diff[i + 1];
  } else {
    otherStr = diff[i - 1];
  }
  // Make start value (use from ratation)
  // Ratation: True - go forward; False - go back

  if (otherStr) {
    good = otherStr.startsWith('+');
    if (!good) {
      good = otherStr.startsWith('-');
    }
  }
  // Check if it starts with + or - (Mean it's add or delete)

  if (rat) {
    n = i + 1;
  } else {
    n = i - 1;
  }

  return [n, otherStr, otherVal, good];
};

const findVal = (diff, i, rat) => {
  // Find other delete or add value
  const param = getParm(diff, i, rat);
  let [n, otherStr, otherVal] = param;
  const [,,, good] = param;

  while (!good) {
    // Try to find - add or delte value
    if (rat) {
      n += 1;
    } else {
      n -= 1;
    }

    if (diff[n] === undefined) {
      return [otherStr, otherVal];
    }
    // End if we're beat the end
    if (diff[n].startsWith('+') || diff[n].startsWith('-')) {
      otherStr = diff[n];
      break;
    }
    // Also break if we're find value
  }

  if (otherStr) {
    [, otherVal] = otherStr.split(':');
    if (otherVal.trim() === '{') {
      otherVal = '[complex value]';
    }
  }
  // Check for complex value

  return [otherStr, otherVal];
  // Return
};

export default findVal;

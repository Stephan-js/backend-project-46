import findVal from './find-valus.js';
import checkValue from './check-val.js';

const getDirection = (str, val, direction, firstVal) => {
  // Check file way
  if ((str.startsWith('+') || str.startsWith('-')) && val === '[complex value]') {
    direction.push('');
  } else if (val === '[complex value]') {
    direction.push(firstVal);
  } else if (str.trim() === '}') {
    direction.pop();
  }

  let rDirection = direction.join('.');
  // Add result of Direction
  if (rDirection !== '' && !rDirection.endsWith('.')) {
    rDirection += '.';
  }

  return rDirection;
};

const getRes = (diff, result, sett) => {
  const direction = [];
  for (let i = 0; i < diff.length; i += 1) {
    const str = diff[i];
    // Get param
    let [, backVal] = findVal(diff, i, false);
    const [backStr] = findVal(diff, i, false);
    const [forwStr] = findVal(diff, i, true);
    // Let next or last value
    let firstVal = str.split(':')[0];
    // Let name of param

    if (firstVal.startsWith('+') || firstVal.startsWith('-')) {
      firstVal = firstVal.slice(2);
    }
    // Delete any sing
    let val = str.split(':')[1];
    // Value of Param
    if (val === ' {') {
      val = '[complex value]';
    }

    const rDirection = getDirection(str, val, direction, firstVal);

    val = checkValue(val);
    backVal = checkValue(backVal);
    // Checking value (like 'true' => true)

    if (str.startsWith('+') && !backStr.includes(firstVal)) {
      sett.add(rDirection, firstVal, val, result);
    } else if (str.startsWith('+') && backStr.includes(firstVal)) {
      sett.update(rDirection, firstVal, backVal, val, result);
    } else if (str.startsWith('-') && !forwStr.includes(firstVal)) {
      sett.delete(rDirection, firstVal, result);
    }
    // Add to result.
  }

  return result;
};

export default getRes;

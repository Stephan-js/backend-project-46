import findVal from './find-valus.js';
import checkValue from './check-val.js';

const getRes = (diff, result, sett) => {
  const direction = [];
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
      sett.add(rDirection, firstVal, val, result);
    } else if (str.startsWith('+') && backStr.includes(firstVal)) {
      sett.update(rDirection, firstVal, backVal, val, result);
    } else if (str.startsWith('-') && !forwStr.includes(firstVal)) {
      sett.delete(rDirection, firstVal, result);
    }
  }

  return result;
};

export default getRes;

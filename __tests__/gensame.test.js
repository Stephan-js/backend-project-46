
import { test, expect } from '@jest/globals';

import getWithFunction from '../src';
import genSame from '../src/function/gensamesrc.js';

const rightAnwer = '{\n  host: hexlet.io\n}';

test('work', () => {
  expect(getWithFunction('files/file1.json', 'files/file2.json', genSame)).toBe(rightAnwer);
});

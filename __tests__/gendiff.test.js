
import { test, expect } from '@jest/globals';

import getDiff from '../src/functions';
const rightAnwerP0 = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22';
const rightAnwerP1 = '\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';

test('work', () => {
  expect(getDiff('files/file1.json', 'files/file2.json')).toBe(rightAnwerP0 + rightAnwerP1);
});

test('file1', () => {
  expect(getDiff('')).toBeUndefined();
});

test('file2', () => {
  expect(getDiff('files/file1.js', 'files/file2.on')).toBeUndefined();
});

test('file3', () => {
  expect(getDiff('files/file1.json')).toBeUndefined();
});

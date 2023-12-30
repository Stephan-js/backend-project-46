
import { test, expect } from "@jest/globals";

import getWithFunction from "../src";
import genDiff from "../src/function/gendiffsrc.js";

const rightAnwerP0 = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22';
const rightAnwerP1 = '\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';

test('work', () => {
  expect(getWithFunction('files/file1.json', 'files/file2.json', genDiff)).toBe(rightAnwerP0 + rightAnwerP1);
});

test('file1', () => {
  expect(getWithFunction('', genDiff)).toBeUndefined();
});

test('file2', () => {
  expect(getWithFunction('files/file1.json', 'files/file2.json')).toBeUndefined();
});

test('file3', () => {
  expect(getWithFunction('files/file1.json', '', genDiff)).toBeUndefined();
});


import { test, expect } from "@jest/globals";

import getWithFunction from "../src";
import genDiff from "../src/function/gendiff-src.js";

const rightAnwerP0 = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22';
const rightAnwerP1 = '\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';

test('work1', () => {
  expect(getWithFunction('files/json/file1.json', 'files/json/file2.json', genDiff)).toBe(rightAnwerP0 + rightAnwerP1);
});

test('work2', () => {
  expect(getWithFunction('files/yaml/file1.yaml', 'files/yaml/file2.yml', genDiff)).toBe(rightAnwerP0 + rightAnwerP1);
});

test('file1', () => {
  expect(getWithFunction('', genDiff)).toBeUndefined();
});

test('file2', () => {
  expect(getWithFunction('files/json/file1.json', 'files/json/file2.json')).toBeUndefined();
});

test('file3', () => {
  expect(getWithFunction('files/json/file1.json', '', genDiff)).toBeUndefined();
});

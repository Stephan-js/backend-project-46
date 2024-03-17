import { test, expect } from '@jest/globals';
import { result0, result1, result2 } from '../__fixtures__/test/results.js';
import genDiff from '../src/index.js';

test('work0', () => {
  expect(genDiff('__fixtures__/json/fileh1.json', '__fixtures__/json/fileh2.json')).toBe(result0);
});

test('work1', () => {
  expect(genDiff('__fixtures__/yaml/file1.yaml', '__fixtures__/json/file2.json', 'stylish')).toBe(result1);
});

test('work2', () => {
  expect(genDiff('__fixtures__/json/fileh1.json', '__fixtures__/json/fileh2.json', 'plain')).toBe(result2);
});

test('fail0', () => {
  expect(() => genDiff('')).toThrow();
});

test('fail1', () => {
  expect(() => genDiff('files/json/file1.json', 'abc/dcb')).toThrow();
});

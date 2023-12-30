
import { test, expect } from '@jest/globals';

import getWithFunction from "../src/index.js";
import genSame from "../src/function/gensame-src.js";

const rightAnwer = '{\n  host: hexlet.io\n}';

test('work1', () => {
  expect(getWithFunction('files/json/file1.json', 'files/json/file2.json', genSame)).toBe(rightAnwer);
});

test('work2', () => {
  expect(getWithFunction('files/yaml/file1.yaml', 'files/yaml/file2.yml', genSame)).toBe(rightAnwer);
});

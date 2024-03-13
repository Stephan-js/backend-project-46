import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const result = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const result2 = `{
  - follow: false
    host: github.com
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const result3 = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

test('work0', () => {
  expect(genDiff('__fixtures__/json/fileh1.json', '__fixtures__/json/fileh2.json')).toBe(result);
});

test('work1', () => {
  expect(genDiff('__fixtures__/yaml/file1.yaml', '__fixtures__/json/file2.json', 'stylish')).toBe(result2);
});

test('work2', () => {
  expect(genDiff('__fixtures__/json/fileh1.json', '__fixtures__/json/fileh2.json', 'plain')).toBe(result3);
});

test('fail0', () => {
  expect(() => genDiff('')).toThrow();
});

test('fail1', () => {
  expect(() => genDiff('files/json/file1.json', 'abc/dcb')).toThrow();
});

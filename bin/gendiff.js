#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.3.5')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((file1, file2, options) => {
    if (options.format === 'plain') {
      console.log(genDiff(file1, file2, 'plain'));
    } else if (options.format === 'json') {
      console.log(genDiff(file1, file2, 'json'));
    } else {
      console.log(genDiff(file1, file2, 'standart'));
    }
  });

program.parse();

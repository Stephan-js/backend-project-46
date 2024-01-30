
import { Command } from "commander";
import genDiffP from "./formats/plain-form.js";
import genDiffS from "./formats/standat-form.js";
import getWithFunction from "./index.js";

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
      console.log(getWithFunction(file1, file2, genDiffP))
    } else {
      console.log(getWithFunction(file1, file2, genDiffS))
    }
  });

program.parse(process.argv);

// program
//   .name('gendiff')
//   .description('Compares two configuration files and shows a difference.')
//   .version('0.3.5')
//   .argument('<filepath1>')
//   .argument('<filepath2>')
//   .option('-f, --format <type>', 'output format')
//   .action((file1, file2) => {
//     console.log(getWithFunction(file1, file2, genDiff))
//   });

// program.parse();

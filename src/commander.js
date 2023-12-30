
import { Command } from "commander";
import getWithFunction from "./index.js";
import gen from "./functions.js";

const program = new Command();

program
  .name('JSON')
  .description('Compares two configuration files and shows it ...')
  .version('0.3.0')

  program.command('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((file1, file2) => {
    console.log(getWithFunction(file1, file2, gen.diff))
  });

  program.command('gensame')
  .description('Compares two configuration files and shows a sames.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((file1, file2) => {
    console.log(getWithFunction(file1, file2, gen.same))
  });

program.parse();

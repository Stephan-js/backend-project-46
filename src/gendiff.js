import { Command } from "commander";
import getDiff from "./functions.js";

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((file1, file2) => {
    console.log(getDiff(file1, file2))
  });

program.parse();

import { Command } from 'commander';
import { checkPath, processGenerate } from './action';

export function setupCommands(program: Command) {
  program
    .argument(`[path]`, 'Path to pkg with files generated using wasm-bindgen')
    .option('-j, --ts [ts]', `Generate typescript wrapper`)
    .action(async (path, options) => {
      processGenerate(await checkPath(path), options.ts);
    });
}

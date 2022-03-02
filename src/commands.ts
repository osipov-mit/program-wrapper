import { Command } from 'commander';
import { checkPath, processGenerate } from './action';

export function setupCommands(program: Command) {
  program
    .argument(`[path]`, 'Path to pkg with files generated using wasm-bindgen')
    .option('-j, --javascript', `Generate javascript wrapper`)
    .action(async (path) => {
      processGenerate(await checkPath(path));
    });
}

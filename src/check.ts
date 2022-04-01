import inquirer from 'inquirer';
import logger from './logger.js';
import { Target } from './interfaces.js';

export async function checkPath(path: string): Promise<string> {
  if (path === undefined) {
    const { path } = await inquirer.prompt([
      { type: 'input', name: 'path', message: 'Enter path to pkg with files generated using wasm-bindgen' },
    ]);
    return path;
  }
  return path;
}

export async function checkTarget(target: Target): Promise<Target> {
  if (!['web', 'nodejs'].includes(target)) {
    let { target } = await inquirer.prompt([
      { type: 'input', name: 'target', message: 'Enter type of output to generate, valid values are [web, nodejs]' },
    ]);
    if (!['web', 'nodejs'].includes(target)) {
      target = 'web';
      logger.info('Target set to web');
    }
    return target;
  }
  return target;
}

import inquirer from 'inquirer';
import * as fs from 'fs';
import { getFuncSignature, getFunctionsNames } from './generate/utils';
import { generateJs, generateTs } from './generate';
import { join, resolve } from 'path';

export async function checkPath(path: string): Promise<string> {
  if (path === undefined) {
    const { path } = await inquirer.prompt([
      { type: 'input', name: 'path', message: 'Enter path to pkg with files generated using wasm-bindgen' },
    ]);
    return path;
  }
  return path;
}

export async function processGenerate(path: string, typescript = true) {
  const mod = await import(resolve(path));
  const declarationFile = fs.readFileSync(resolve(`${path}.d.ts`));
  const functions = getFunctionsNames(mod);
  const result = typescript
    ? generateTs(
        functions.map((name) => {
          return {
            name,
            ...getFuncSignature(name, declarationFile.toString()),
          };
        }),
      )
    : generateJs();
  fs.writeFileSync(join(path.split('/').slice(0, -1).join('/'), 'index.ts'), result);
}

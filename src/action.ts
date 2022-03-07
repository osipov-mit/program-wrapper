import inquirer from 'inquirer';
import * as fs from 'fs';
import { getFuncSignature, getFunctionsNames } from './generate/utils';
import { generate } from './generate';
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

export async function processGenerate(path: string, ts: boolean) {
  const mod = await import(resolve(path));
  const declarationFile = fs.readFileSync(resolve(`${path}.d.ts`));
  const functions = getFunctionsNames(mod);
  const result = generate(
    functions.map((name) => {
      return {
        name,
        ...getFuncSignature(name, declarationFile.toString()),
      };
    }),
    ts,
  );
  const resultFilePath = join(path.split('/').slice(0, -1).join('/'), `index.${ts ? 'ts' : 'js'}`);
  console.log(resultFilePath);
  fs.writeFileSync(resultFilePath, result);
}

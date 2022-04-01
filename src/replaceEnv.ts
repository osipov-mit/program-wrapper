import { cpSync, readFileSync, writeFileSync } from 'fs';
import { Target } from 'interfaces';
import { join, resolve } from 'path';

export function replaceEnvImport(filePath: string, target: Target): void {
  if (target === 'nodejs') {
    let data = readFileSync(filePath).toString();
    data = data.replace(`require('env')`, `require('./env.js')`);
    writeFileSync(filePath, data);
  }
}

export function writeEnvFile(pkgPath: string, ts: boolean, target: Target): void {
  if (target === 'nodejs') {
    cpSync('./templates/env.js', join(pkgPath, 'env.js'));
    ts && cpSync('./templates/env.d.ts', join(pkgPath, 'env.d.ts'));
  }
}

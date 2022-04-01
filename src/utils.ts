import { cpSync, readdirSync, rmSync } from 'fs';
import { Target } from 'interfaces';
import { join } from 'path';

const REGEXP = {
  dts: new RegExp(/\/\w+\.d\.ts/),
  js: new RegExp(/\w+\.js/),
};

export function getPkgPath(path: string): { pkgPath: string; declarationPath?: string; modPath: string } {
  const splitted = path.split('/');
  const result: { pkgPath: string; declarationPath?: string; modPath: string } = {
    pkgPath: undefined,
    declarationPath: undefined,
    modPath: undefined,
  };
  const ext = pathExt(path);
  if (ext === null) {
    result.pkgPath = path;
    const files = readdirSync(path);
    files.forEach((element) => {
      const elemPath = join(path, element);
      if (elemPath.match(REGEXP.dts)) {
        result.declarationPath = elemPath;
      } else if (elemPath.match(REGEXP.js)) {
        result.modPath = elemPath;
      }
    });
  } else {
    result.pkgPath = splitted.slice(0, -1).join('/');
    result.modPath = path.replace(ext, '.js');
    result.declarationPath = path.replace(ext, '.d.ts');
  }
  return result;
}

function pathExt(path: string): string | null {
  for (let ext of ['.wasm', '.d.ts', '.js', '.wasm.d.ts']) {
    if (path.endsWith(ext)) {
      return ext;
    }
  }
  return null;
}

export function writePackageJson(pathToPkg: string, target: Target) {
  if (target === 'web') {
    cpSync('templates/package.json', join(pathToPkg, 'package.json'));
  }
}

export function rmPackageJson(pathToPkg: string, target: Target) {
  if (target === 'web') {
    rmSync(join(pathToPkg, 'package.json'));
  }
}

import { IFunction } from '../interfaces';
import { generateSendFunc } from './sendFunction';
import { getArgsNames, getArgsNamesWithType } from './utils';

export function generateTs(functions: IFunction[]): string {
  const result = [];
  result.push(`import { GearApi } from '@gear-js/api';`);
  result.push(`const rust = import('./wrapper');\n`);
  result.push(`export class Wrapper {`);
  result.push(
    `  api: GearApi;
  programId: string;
  isReady: Promise<string>;
  mod: any;\n`,
  );
  result.push(
    `  constructor(providerAddress: string, programId: string) {
    this.programId = programId;
    this.isReady = new Promise((resolve) => {
      Promise.all([
        GearApi.create({ providerAddress }).then((api) => {
          this.api = api
        }),
        rust.then((mod) => {
          this.mod = mod;
        })
      ]).then(() => resolve('ready'));
    });
  }`,
  );
  functions.forEach(({ name, args, resultType }) => {
    if (name.startsWith('__decode')) {
      result.push(
        `\n  async ${name.slice(2)}(${getArgsNamesWithType(args)}): Promise<${resultType}> {
    await this.isReady;
    return JSON.parse(this.mod.${name}(${getArgsNames(args)}));
  }`,
      );
    } else if (name.startsWith('__send')) {
      result.push(generateSendFunc(name, true, args, resultType));
    } else {
      result.push(
        `\n  async ${name}(${getArgsNamesWithType(args)}): Promise<${resultType}> {
    await this.isReady;
    const payload = this.mod.${name}(${getArgsNames(args)});
    return payload;
  }`,
      );
    }
  });
  result.push(`}`);
  return result.join('\n');
}

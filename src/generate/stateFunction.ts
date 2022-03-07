import { IArg } from '../interfaces';
import { getArgsNames, getArgsNamesWithType, getType } from './utils';

export function generateStateFunc(name: string, ts: boolean, args: IArg[], resultType: string) {
  return `\n  async ${name.slice(2)}(${getArgsNamesWithType(args)})${getType(`: Promise<${resultType}>`, ts)} {
    await this.isReady;
    const payload = this.mod.${name}(${getArgsNames(args)});
    return payload;
  }`;
}

import { IArg } from '../interfaces';
import { getArgsNames, getArgsNamesWithType } from './utils';

export function generateSendFunc(name: string, withTypes: boolean, args: IArg[], resultType: string) {
  `\n  async ${name.slice(2)}(${[
    withTypes ? getArgsNamesWithType(args) : getArgsNames(args),
    `gasLimit${withTypes ? ': number | string' : ''}`,
    `value${withTypes ? ': number | string' : ''}`,
  ].join(', ')})${withTypes ? `: Promise<${resultType}>` : ''} {
await this.isReady;
const payload = this.mod.${name}(${getArgsNames(args)});
return this.api.message.submit({ destination: this.programId, payload, gasLimit, value });
}`;
}

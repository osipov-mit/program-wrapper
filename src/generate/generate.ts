import { IFunction } from '../interfaces.js';
import { generateClass } from './class.js';
import { generateConstructor } from './constructor.js';
import { generateDecodeFunc } from './decodeFunction.js';
import { generateSendFunc } from './sendFunction.js';
import { generateStateFunc } from './stateFunction.js';

export function generate(functions: IFunction[], ts: boolean): string {
  const generatedFunctions = [];
  generatedFunctions.push(generateConstructor(ts));
  functions.forEach(({ name, args, resultType }) => {
    if (name.startsWith('__decode')) {
      generatedFunctions.push(generateDecodeFunc(name, ts, args, resultType));
    } else if (name.startsWith('__send')) {
      generatedFunctions.push(generateSendFunc(name, ts, args));
    } else if (name.startsWith('__query')) {
      generatedFunctions.push(generateStateFunc(name, ts, args, resultType));
    }
  });
  return generateClass(ts, generatedFunctions);
}

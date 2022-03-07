import { IFunction } from '../interfaces';
import { generateClass } from './class';
import { generateConstructor } from './constructor';
import { generateDecodeFunc } from './decodeFunction';
// import { generateImports } from './imports';
import { generateSendFunc } from './sendFunction';
import { generateStateFunc } from './stateFunction';

export function generate(functions: IFunction[], ts: boolean): string {
  const generatedFunctions = [];
  // result.push(generateImports());
  // result.push(`export class Wrapper {`);
  // result.push(
  //   `  api: GearApi;
  // programId: string;
  // isReady: Promise<string>;
  // mod: any;\n`,
  // );
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
  // generatedFunctions.push(`}`);
  return generateClass(ts, generatedFunctions);
}

import { generateImports } from './imports';

export function generateClass(ts: boolean, functions: string[]): string {
  const result = [];
  result.push(generateImports(ts));
  result.push(
    ts
      ? `export class Wrapper {
  api: GearApi;
  programId: string;
  isReady: Promise<string>;
  mod: any;\n
  ${functions.join('\n')}
}`
      : `export class Wrapper {
  api;
  programId;
  isReady;
  mod;\n
  ${functions.join('\n')}
}`,
  );
  return result.join('\n');
}

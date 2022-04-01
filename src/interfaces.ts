export interface IArg {
  [name: string]: string;
}

export interface IFunction {
  name: string;
  args: IArg[];
  resultType: string;
}

export type Target = 'web' | 'nodejs';

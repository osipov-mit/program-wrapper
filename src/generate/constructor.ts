import { getType } from './utils';

export function generateConstructor(ts: boolean) {
  return `constructor(providerAddress${getType(': string', ts)}, programId${getType(': string', ts)}) {
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
  }`;
}

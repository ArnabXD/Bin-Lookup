import binovnet from './binov-net';
import binsws from './bins-ws';

import { Result, Sites } from '../types';

export const sources: {
  [site in Sites]: (bin: number) => Promise<Result>;
} = {
  'binov.net': binovnet,
  'bins.ws': binsws,
};

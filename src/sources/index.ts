import binsws from './bins-ws';
import binssu from './bins-su';

import { Result, Sites } from '../types';

export const sources: {
  [site in Sites]: (bin: number) => Promise<Result>;
} = {
  'bins.ws': binsws,
  'bins.su': binssu,
};

import { sources } from './sources';
import { Sites, Result } from './types';
import { CustomError, InvalidBin } from './errors';

export const binLookup = async (
  bin: string | number,
  site: Sites = 'bins.ws'
): Promise<Result> => {
  try {
    bin = bin.toString();
    if (!/^\d+$/.test(bin.toString()) || bin.length < 6) return InvalidBin;

    return await sources[site](parseInt(bin, 10));
  } catch (e) {
    return CustomError('Something went wrong');
  }
};

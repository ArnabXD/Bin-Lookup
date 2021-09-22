import { Result } from './types';

export const InvalidBin: Result = {
  result: false,
  message: 'Invalid bin',
};

export const NotFound: Result = {
  result: false,
  message: 'No results found',
};

export const CustomError = (message: string): Result => ({
  result: false,
  message,
});

import ava from 'ava';
import binsws from '../bins-ws';
import { NotFound } from '../../errors';

ava('found', async test => {
  test.deepEqual(await binsws(439129), {
    result: true,
    message: 'Search Successful',
    data: {
      bin: 439129,
      vendor: 'VISA',
      bank: 'KUMARI BANK, LTD.',
      type: 'DEBIT',
      level: 'ELECTRON',
      country: 'NEPAL',
      countryInfo: {
        code: 'NP',
        emoji: '🇳🇵',
        name: 'Nepal',
        unicode: 'U+1F1F3 U+1F1F5',
      },
    },
  });
});

ava('not found', async test => {
  test.deepEqual(await binsws(121212), NotFound);
});

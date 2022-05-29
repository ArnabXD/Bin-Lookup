import ava from 'ava';
import binov from '../binov-net';
import { NotFound } from '../../errors';

ava('found', async test => {
  test.deepEqual(await binov(439129), {
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
  test.deepEqual(await binov(121212), NotFound);
});

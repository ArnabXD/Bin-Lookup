import cheerio from 'cheerio';
import axios from 'axios';
import emoji from 'emoji-flags';

import { alphaToCountry } from '../utils';

import { NotFound, CustomError } from '../errors';
import { Result } from '../types';

export default async (bin: number): Promise<Result> => {
  const response = await axios.get(`https://bins.ws/search?bins=${bin}`);
  if (!response.data) {
    return CustomError('Failed to fetch data');
  }

  const $ = cheerio.load(response.data);

  const message = $('.page h2').text();
  if (!message.match('Total found 1 bins')) {
    return NotFound;
  }

  const type = $('table.dataframe td:nth-child(2)').text();
  const level = $('table.dataframe td:nth-child(3)').text();
  const vendor = $('table.dataframe td:nth-child(4)').text();
  const bank = $('table.dataframe td:nth-child(5)').text();
  const country = $('table.dataframe td:nth-child(6)').text();
  const countryInfo = emoji.countryCode(country);

  return {
    result: true,
    message: 'Search Successful',
    data: {
      bin,
      vendor,
      type,
      level,
      bank,
      country: alphaToCountry(country),
      countryInfo: {
        name: countryInfo.name,
        emoji: countryInfo.emoji,
        unicode: countryInfo.unicode,
        code: countryInfo.code,
      },
    },
  };
};

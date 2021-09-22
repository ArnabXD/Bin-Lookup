import cheerio from 'cheerio';
import axios from 'axios';
import iso from 'iso-3166-1';
import emoji from 'emoji-flags';
import { NotFound, CustomError } from '../errors';
import { Result } from '../types';

export default async (bin: number): Promise<Result> => {
  const response = await axios({
    method: 'POST',
    url: 'http://binov.net/',
    headers: {
      // prettier-ignore
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'en-US,en;q=0.9',
      'cache-control': 'max-age=0',
      'content-type': 'application/x-www-form-urlencoded',
      'upgrade-insecure-requests': '1',
    },
    data: `BIN=${bin}&COUNTRY=1&BANK=1`,
  });

  if (!response.data) return CustomError('Failed to fetch data');

  const $ = cheerio.load(response.data);

  if (!$('form.logo table:nth-child(3)').text()) {
    console.log(1);
    return NotFound;
  }

  const vendor = $(
    'form.logo table:nth-child(3) tr:nth-child(2) td:nth-child(2)'
  ).text();
  const bank = $(
    'form.logo table:nth-child(3) tr:nth-child(2) td:nth-child(3)'
  ).text();
  const type = $(
    'form.logo table:nth-child(3) tr:nth-child(2) td:nth-child(4)'
  ).text();
  const level = $(
    'form.logo table:nth-child(3) tr:nth-child(2) td:nth-child(5)'
  ).text();
  const country = $(
    'form.logo table:nth-child(3) tr:nth-child(2) td:nth-child(6)'
  ).text();
  const countryInfo = emoji.countryCode(iso.whereCountry(country)?.alpha2!);

  return {
    result: true,
    message: 'Search Successful',
    data: {
      bin,
      vendor,
      bank,
      type,
      level,
      country,
      countryInfo: {
        code: countryInfo.code,
        emoji: countryInfo.emoji,
        name: countryInfo.name,
        unicode: countryInfo.unicode,
      },
    },
  };
};

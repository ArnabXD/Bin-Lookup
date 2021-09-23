import cheerio from 'cheerio';
import axios from 'axios';
import iso from 'iso-3166-1';
import emoji from 'emoji-flags';
import { NotFound, CustomError } from '../errors';
import { Result } from '../types';

export default async (bin: number): Promise<Result> => {
  const response = await axios({
    method: 'POST',
    url: 'http://bins.su/',
    headers: {
      // prettier-ignore
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      'accept-language': 'en-US,en;q=0.9',
      'cache-control': 'max-age=0',
      'content-type': 'application/x-www-form-urlencoded',
      'upgrade-insecure-requests': '1',
    },
    data: `action=searchbins&bins=${bin}&bank=&country=`,
  });

  if (!response.data) return CustomError('Failed to fetch data');

  const $ = cheerio.load(response.data);
  const result = $('#result').html();
  if (!result || !result.match('Total found 1 bins')) {
    return NotFound;
  }

  const country = $('#result tr:nth-child(2) td:nth-child(2)').text();
  const vendor = $('#result tr:nth-child(2) td:nth-child(3)').text();
  const type = $('#result tr:nth-child(2) td:nth-child(4)').text();
  const level = $('#result tr:nth-child(2) td:nth-child(5)').text();
  const bank = $('#result tr:nth-child(2) td:nth-child(6)').text();
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
      country: iso.whereAlpha2(country)?.country.toString()!,
      countryInfo: {
        name: countryInfo.name.toUpperCase(),
        emoji: countryInfo.emoji,
        unicode: countryInfo.unicode,
        code: countryInfo.code,
      },
    },
  };
};

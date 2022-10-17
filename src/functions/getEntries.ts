import { Entry } from '../types';
import { escapeRegExp } from './escapeRegExp';

export function getEntries(
  text: string,
  substrings: string[],
  regExpFlags: string
) {
  const arrayOfMatchesArrays = substrings.map((substring) => {
    return [...text.matchAll(new RegExp(escapeRegExp(substring), regExpFlags))];
  });

  return arrayOfMatchesArrays.reduce((acc, matchesArray, index) => {
    const entries = matchesArray.reduce((acc, item) => {
      acc.push({
        startIndex: item.index || 0,
        endIndex: (item.index || 0) + substrings[index].length,
      });

      return acc;
    }, [] as Entry[]);

    return [...acc, ...entries];
  }, [] as Entry[]);
}

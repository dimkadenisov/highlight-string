import { escapeRegExp } from './escapeRegExp';

export function getEntries(
  text: string,
  substrings: string[],
  regExpFlags: string
) {
  const arrayOfMatchesArrays = substrings.reduce((acc, substring) => {
    acc.push(
      ...text.matchAll(new RegExp(escapeRegExp(substring), regExpFlags))
    );

    return acc;
  }, [] as RegExpMatchArray[]);

  return arrayOfMatchesArrays.map((item) => ({
    startIndex: item.index || 0,
    endIndex: (item.index || 0) + item[0].length,
  }));
}

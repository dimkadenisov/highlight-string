import { Entry } from '../types';

export function concatEntries(entries: Entry[]) {
  const sortedEntries = entries.sort((a, b) => a.startIndex - b.startIndex);
  const result = [];

  let { startIndex: currentStartIndex, endIndex: currentEndIndex } = entries[0];

  for (let i = 1; i <= sortedEntries.length; i++) {
    const nextEntry = sortedEntries[i];

    if (!nextEntry) {
      result.push({ startIndex: currentStartIndex, endIndex: currentEndIndex });

      return result;
    }

    // chunks not overlap
    if (currentEndIndex < nextEntry.startIndex) {
      result.push({ startIndex: currentStartIndex, endIndex: currentEndIndex });
      currentStartIndex = nextEntry.startIndex;
      currentEndIndex = nextEntry.endIndex;
      // chunks overlap
    } else {
      currentEndIndex = Math.max(currentEndIndex, nextEntry.endIndex);
    }
  }

  return result;
}

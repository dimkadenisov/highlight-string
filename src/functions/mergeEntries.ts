import { Entry } from '../types';

export function mergeEntries(entries: Entry[]) {
  const sortedEntries = entries.sort((a, b) => a.startIndex - b.startIndex);
  const result = [];

  for (let i = 0; i < sortedEntries.length; i++) {
    if (
      result.length === 0 ||
      result[result.length - 1].endIndex < sortedEntries[i].startIndex
    ) {
      result.push(sortedEntries[i]);
    } else {
      result[result.length - 1].endIndex = Math.max(
        result[result.length - 1].endIndex,
        sortedEntries[i].endIndex
      );
    }
  }

  return result;
}

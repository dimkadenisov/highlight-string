import { Entry } from '../types';

export function convertEntriesToChunks(entries: Entry[], text: string) {
  const chunks = [];

  entries.forEach((currentEntry, index, entries) => {
    const prevEntry = entries[index - 1] || { startIndex: 0, endIndex: 0 };

    if (currentEntry.startIndex - prevEntry.endIndex) {
      chunks.push({
        text: text.substring(prevEntry.endIndex, currentEntry.startIndex),
        highlighted: false,
      });
    }

    chunks.push({
      text: text.substring(currentEntry.startIndex, currentEntry.endIndex),
      highlighted: true,
    });
  });

  const lastEntry = entries[entries.length - 1];

  if (lastEntry && lastEntry.endIndex < text.length - 1) {
    chunks.push({
      text: text.substring(lastEntry.endIndex),
      highlighted: false,
    });
  }

  return chunks;
}

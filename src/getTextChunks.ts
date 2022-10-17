type Entry = {
  startIndex: number;
  endIndex: number;
};

type MainPropsType = {
  text: string;
  substrings: string[];
  caseSensitive?: boolean;
  sanitize?: (string: string) => string;
};

function getRegExpFlags(caseSensitive: boolean) {
  return caseSensitive ? 'g' : 'gi';
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getEntries(text: string, substrings: string[], regExpFlags: string) {
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

function concatEntries(entries: Entry[]) {
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

export function getTextChunks({
  text,
  substrings,
  caseSensitive = false,
  sanitize,
}: MainPropsType) {
  const truthySubstrings = substrings.filter(Boolean);

  if (!text || truthySubstrings.length === 0) {
    return [
      {
        text,
        highlighted: false,
      },
    ];
  }

  const sanitizedText = sanitize ? sanitize(text) : text;
  const sanitizedSubstrings = sanitize
    ? truthySubstrings.map((substring) => sanitize(substring))
    : truthySubstrings;

  const entries = getEntries(
    sanitizedText,
    sanitizedSubstrings,
    getRegExpFlags(caseSensitive)
  );

  if (entries.length === 0) {
    return [
      {
        text: sanitizedText,
        highlighted: false,
      },
    ];
  }

  const concatenatedEntries = concatEntries(entries);

  const chunks = [];

  concatenatedEntries.forEach((currentEntry, index, entries) => {
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

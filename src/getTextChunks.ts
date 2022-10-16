type Entry = {
  startIndex: number;
  endIndex: number;
};

type MainPropsType = {
  text: string;
  substring: string;
  caseSensitive?: boolean;
  sanitize?: (string: string) => string;
};

function getRegExpFlags(caseSensitive: boolean) {
  return caseSensitive ? 'g' : 'gi';
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function getTextChunks({
  text,
  substring,
  caseSensitive = false,
  sanitize,
}: MainPropsType) {
  if (!text || !substring) {
    return [
      {
        text,
        highlighted: false,
      },
    ];
  }

  const sanitizedText = sanitize ? sanitize(text) : text;
  const sanitizedSubstring = sanitize ? sanitize(substring) : substring;

  const matches: RegExpMatchArray[] = [
    ...sanitizedText.matchAll(
      new RegExp(
        escapeRegExp(sanitizedSubstring),
        getRegExpFlags(caseSensitive)
      )
    ),
  ];

  if (matches.length === 0) {
    return [
      {
        text,
        highlighted: false,
      },
    ];
  }

  const entries = matches.reduce((acc, item) => {
    acc.push({
      startIndex: item.index || 0,
      endIndex: (item.index || 0) + substring.length,
    });

    return acc;
  }, [] as Entry[]);

  const chunks = [];

  entries.forEach((currentEntry, index) => {
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

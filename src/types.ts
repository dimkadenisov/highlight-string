export type Entry = {
  startIndex: number;
  endIndex: number;
};

export type HighlightStringType = {
  text: string;
  substrings: string[];
  caseSensitive?: boolean;
  sanitize?: (string: string) => string;
};

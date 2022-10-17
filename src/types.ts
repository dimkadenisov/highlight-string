export type Entry = {
  startIndex: number;
  endIndex: number;
};

export type GetTextChunksProps = {
  text: string;
  substrings: string[];
  caseSensitive?: boolean;
  sanitize?: (string: string) => string;
};

export type Entry = {
  startIndex: number;
  endIndex: number;
};

export type GetChunksType = {
  text: string;
  substrings: string[];
  caseSensitive?: boolean;
  sanitize?: (string: string) => string;
};

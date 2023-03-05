export type Entry = {
  startIndex: number;
  endIndex: number;
};

export type GetChunksType = {
  /**
   * Text to search and highlight
   */
  text: string;
  /**
   * Array of strings to search for
   */
  substrings: string[];
  /**
   * Pass `true` if search should be case sensitive
   */
  caseSensitive?: boolean;
  /**
   * Sanitize function
   * @param text input text (same as you put to text prop)
   * @returns sanitized text
   */
  sanitize?: (text: string) => string;
};

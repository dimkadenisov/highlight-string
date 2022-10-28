import { GetChunksType } from '../types';
import { concatEntries } from './concatEntries';
import { convertEntriesToChunks } from './convertEntriesToChunks';
import { getEntries } from './getEntries';
import { getRegExpFlags } from './getRegExpFlags';

/**
 * returns array of chunks that represents highlighted and non highlighted text pieces
 */
export function getChunks({
  text,
  substrings,
  caseSensitive = false,
  sanitize,
}: GetChunksType) {
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
  const chunks = convertEntriesToChunks(concatenatedEntries, sanitizedText);

  return chunks;
}

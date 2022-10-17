export function getRegExpFlags(caseSensitive: boolean) {
  return caseSensitive ? 'g' : 'gi';
}

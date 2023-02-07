Tiny util to highlight given string in text. Written in **TypeScript**. Better alternative for [highlight-words-core](https://github.com/bvaughn/react-highlight-words).

## API

This package contains only one function exported as `getChunks`. This method searches for a given string in text and returns an array of chunks that describes the matches found. For example:

```js
import { getChunks } from 'highlight-string';

const text = 'Have a nice day!';
const substrings = ['a', 'day'];

const chunks = getChunks({
  text,
  substrings,
});

const highlightedText = chunks
  .map(({ highlighted, text }) => (highlighted ? `<mark>${text}</mark>` : text))
  .join('');
```

### `getChunks`

| Parameter     | Required? | Default value | Type                       | Description                                    |
| ------------- | :-------: | ------------- | -------------------------- | ---------------------------------------------- |
| text          |    ✅     | -             | `string`                   | Text to search and highlight                   |
| substrings    |    ✅     | -             | `Array<string>`            | Array of strings to search for                 |
| caseSensitive |           | `false`       | `boolean`                  | Pass `true` if search should be case sensitive |
| sanitize      |           | -             | `(text: string) => string` | Sanitize function                              |

## License

MIT

import { getTextChunks } from '../src/getTextChunks';

const cases = [
  {
    testCaseName: 'Simple match with one substring and case insensitive',
    text: 'Hello everyone!',
    substring: 'every',
    expected: [
      {
        text: 'Hello ',
        highlighted: false,
      },
      {
        text: 'every',
        highlighted: true,
      },
      {
        text: 'one!',
        highlighted: false,
      },
    ],
  },
  {
    testCaseName: 'Simple match with one substring and case insensitive',
    text: 'Good luck!',
    substring: 'Good',
    expected: [
      {
        text: 'Good',
        highlighted: true,
      },
      {
        text: ' luck!',
        highlighted: false,
      },
    ],
  },
  {
    testCaseName: 'All string is match, one substring and case insensitive',
    text: 'Good luck!',
    substring: 'Good luck!',
    expected: [
      {
        text: 'Good luck!',
        highlighted: true,
      },
    ],
  },
  {
    testCaseName: 'No match, one substring, case insensitive',
    text: 'Good luck!',
    substring: 'qwerty',
    expected: [
      {
        text: 'Good luck!',
        highlighted: false,
      },
    ],
  },
  {
    testCaseName: 'Substring is an empty string',
    text: 'Good luck!',
    substring: '',
    expected: [
      {
        text: 'Good luck!',
        highlighted: false,
      },
    ],
  },
  {
    testCaseName: 'Multiple matches with case insensitive',
    text: 'Summer Smith',
    substring: 's',
    expected: [
      {
        text: 'S',
        highlighted: true,
      },
      {
        text: 'ummer ',
        highlighted: false,
      },
      {
        text: 'S',
        highlighted: true,
      },
      {
        text: 'mith',
        highlighted: false,
      },
    ],
  },
  {
    testCaseName: 'Case sensitivity check',
    text: 'Summer Smith',
    substring: 's',
    caseSensitive: true,
    expected: [
      {
        text: 'Summer Smith',
        highlighted: false,
      },
    ],
  },
  {
    testCaseName: 'Case sensitivity check',
    text: 'summer smith',
    substring: 's',
    caseSensitive: true,
    expected: [
      {
        text: 's',
        highlighted: true,
      },
      {
        text: 'ummer ',
        highlighted: false,
      },
      {
        text: 's',
        highlighted: true,
      },
      {
        text: 'mith',
        highlighted: false,
      },
    ],
  },
];

describe.each(cases)(
  'main function',
  ({ testCaseName, expected, ...props }) => {
    test(testCaseName, () => {
      expect(getTextChunks(props)).toStrictEqual(expected);
    });
  }
);

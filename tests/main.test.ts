import { getTextChunks } from '../src/functions/getTextChunks';

const cases = [
  {
    testCaseName: 'Simple match with one substrings and case insensitive',
    text: 'Hello everyone!',
    substrings: ['every'],
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
    testCaseName: 'Simple match with one substrings and case insensitive',
    text: 'Good luck!',
    substrings: ['Good'],
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
    testCaseName: 'All string is match, one substrings and case insensitive',
    text: 'Good luck!',
    substrings: ['Good luck!'],
    expected: [
      {
        text: 'Good luck!',
        highlighted: true,
      },
    ],
  },
  {
    testCaseName: 'No match, one substrings, case insensitive',
    text: 'Good luck!',
    substrings: ['qwerty'],
    expected: [
      {
        text: 'Good luck!',
        highlighted: false,
      },
    ],
  },
  {
    testCaseName: 'Substrings is an empty string',
    text: 'Good luck!',
    substrings: [''],
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
    substrings: ['s'],
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
    substrings: ['s'],
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
    substrings: ['s'],
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
  {
    testCaseName: 'Multiple substrings',
    text: 'testing',
    substrings: ['t', 'te', 'tes', 'test'],
    caseSensitive: true,
    expected: [
      {
        text: 'test',
        highlighted: true,
      },
      {
        text: 'ing',
        highlighted: false,
      },
    ],
  },
  {
    testCaseName: 'Multiple substrings',
    text: 'testing',
    substrings: ['t', 'tes', 'test'],
    caseSensitive: true,
    expected: [
      {
        text: 'test',
        highlighted: true,
      },
      {
        text: 'ing',
        highlighted: false,
      },
    ],
  },
  {
    testCaseName: 'Multiple substrings',
    text: 'testing',
    substrings: ['tes', 'ing'],
    caseSensitive: true,
    expected: [
      {
        text: 'tes',
        highlighted: true,
      },
      {
        text: 't',
        highlighted: false,
      },
      {
        text: 'ing',
        highlighted: true,
      },
    ],
  },
  {
    testCaseName: 'Multiple substrings',
    text: 'testing',
    substrings: ['tes', 'ti', 'ng'],
    caseSensitive: true,
    expected: [
      {
        text: 'testing',
        highlighted: true,
      },
    ],
  },
  {
    testCaseName: 'Multiple substrings',
    text: 'testing',
    substrings: ['tes', 'sti'],
    caseSensitive: true,
    expected: [
      {
        text: 'testi',
        highlighted: true,
      },
      {
        text: 'ng',
        highlighted: false,
      },
    ],
  },
  {
    testCaseName: 'Multiple substrings',
    text: 'testing',
    substrings: ['tes', '', 'qwe'],
    caseSensitive: true,
    expected: [
      {
        text: 'tes',
        highlighted: true,
      },
      {
        text: 'ting',
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

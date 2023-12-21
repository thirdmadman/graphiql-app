import { Formatter } from './Formatter';
import {
  SPACE,
  COLON,
  OPEN_CURLY_BRACKET,
  NEW_LINE,
  CLOSE_CURLY_BRACKET,
  CLOSE_BRACKET,
  ONLY_COMMENT_ID_REGEX,
  COMMENT_ID_REGEX,
  EMPTY_STRING,
} from '../constants';
import formatGQLFields from './format-gql-query-fields';
import {
  decreaseIndentSize,
  getNewLineWIthIndents,
  increaseIndentSize,
} from './helpers';

const formatters = [
  new Formatter(
    { prev: COLON, current: COMMENT_ID_REGEX },
    (range) => range.current
  ),
  new Formatter({ prev: COLON }, (range) => range.current),
  new Formatter({ current: COLON, next: COMMENT_ID_REGEX }, (range) =>
    range?.next?.split(SPACE)[0].match(ONLY_COMMENT_ID_REGEX)
      ? range.current
      : SPACE + range.current
  ),
  new Formatter(
    { current: COLON },
    (range) => range.current + (range.next === SPACE ? EMPTY_STRING : SPACE)
  ),
  new Formatter({ current: COLON }, (range) => range.current + SPACE),
  new Formatter(
    { prev: COLON, current: OPEN_CURLY_BRACKET },
    (range) => range.current + SPACE
  ),
  new Formatter(
    { prev: ONLY_COMMENT_ID_REGEX, current: OPEN_CURLY_BRACKET },
    (range, indentSize) =>
      range.current + getNewLineWIthIndents(increaseIndentSize(indentSize))
  ),
  new Formatter(
    { current: OPEN_CURLY_BRACKET, next: COMMENT_ID_REGEX },
    (range, indentSize) => {
      const lastItem = !range?.next
        ?.split(SPACE)[0]
        .match(ONLY_COMMENT_ID_REGEX)
        ? getNewLineWIthIndents(increaseIndentSize(indentSize))
        : EMPTY_STRING;
      return (range.prev ? SPACE : EMPTY_STRING) + range.current + lastItem;
    }
  ),
  new Formatter({ current: OPEN_CURLY_BRACKET }, (range, indentSize) => {
    const firstItem = range.prev ? SPACE : EMPTY_STRING;
    return (
      firstItem +
      range.current +
      getNewLineWIthIndents(increaseIndentSize(indentSize))
    );
  }),
  new Formatter(
    { current: CLOSE_CURLY_BRACKET, next: CLOSE_BRACKET },
    (range) => SPACE + range.current
  ),
  new Formatter(
    { current: CLOSE_CURLY_BRACKET, next: CLOSE_CURLY_BRACKET },
    (range, indentSize) =>
      getNewLineWIthIndents(decreaseIndentSize(indentSize)) + range.current
  ),
  new Formatter(
    { current: CLOSE_CURLY_BRACKET, next: COMMENT_ID_REGEX },
    (range, indentSize) =>
      getNewLineWIthIndents(decreaseIndentSize(indentSize)) + range.current
  ),
  new Formatter(
    { current: CLOSE_CURLY_BRACKET, nestingLevel: 1 },
    (range, indentSize) =>
      getNewLineWIthIndents(decreaseIndentSize(indentSize)) +
      range.current +
      (range.next
        ? getNewLineWIthIndents(decreaseIndentSize(indentSize)) + NEW_LINE
        : EMPTY_STRING)
  ),
  new Formatter(
    { current: CLOSE_CURLY_BRACKET },
    (range, indentSize) =>
      getNewLineWIthIndents(decreaseIndentSize(indentSize)) +
      range.current +
      getNewLineWIthIndents(decreaseIndentSize(indentSize))
  ),
  new Formatter({}, (range, indentSize) =>
    formatGQLFields(range.current, indentSize)
  ),
];

export default formatters;

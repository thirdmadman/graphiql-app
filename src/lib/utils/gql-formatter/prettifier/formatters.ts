import { Formatter } from './Formatter';
import {
  SPACE,
  COLON,
  OPEN_CURLY_BRACKET,
  NEW_LINE,
  INDENT_STEP,
  CLOSE_CURLY_BRACKET,
  CLOSE_BRACKET,
} from '../constants';

const increaseIndentSize = (currentSize: number) => currentSize + INDENT_STEP;

const decreaseIndentSize = (currentSize: number) => {
  const newIndentSize = currentSize - INDENT_STEP;
  return newIndentSize >= 0 ? newIndentSize : 0;
};

const formatters = [
  new Formatter({ current: COLON, next: SPACE }, (range) => range.current),
  new Formatter({ current: COLON }, (range) => range.current + SPACE),
  new Formatter(
    { prev: COLON, current: OPEN_CURLY_BRACKET },
    (range) => range.current + SPACE
  ),
  new Formatter(
    { prev: null, current: OPEN_CURLY_BRACKET },
    (range, indentSize) =>
      range.current + NEW_LINE + SPACE.repeat(increaseIndentSize(indentSize))
  ),
  new Formatter(
    { current: OPEN_CURLY_BRACKET },
    (range, indentSize) =>
      SPACE +
      range.current +
      NEW_LINE +
      SPACE.repeat(increaseIndentSize(indentSize))
  ),
  new Formatter(
    { current: CLOSE_CURLY_BRACKET, next: CLOSE_BRACKET },
    (range) => SPACE + range.current
  ),
  new Formatter(
    { current: CLOSE_CURLY_BRACKET, next: CLOSE_CURLY_BRACKET },
    (range, indentSize) =>
      NEW_LINE + SPACE.repeat(decreaseIndentSize(indentSize)) + range.current
  ),
  new Formatter(
    { current: CLOSE_CURLY_BRACKET, next: null, nestingLevel: 1 },
    (range) => NEW_LINE + range.current
  ),
  new Formatter(
    { current: CLOSE_CURLY_BRACKET, nestingLevel: 1 },
    (range, indentSize) =>
      NEW_LINE +
      SPACE.repeat(decreaseIndentSize(indentSize)) +
      range.current +
      NEW_LINE +
      SPACE.repeat(decreaseIndentSize(indentSize)) +
      NEW_LINE
  ),
  new Formatter(
    { current: CLOSE_CURLY_BRACKET },
    (range, indentSize) =>
      NEW_LINE +
      SPACE.repeat(decreaseIndentSize(indentSize)) +
      range.current +
      NEW_LINE +
      SPACE.repeat(decreaseIndentSize(indentSize))
  ),
  new Formatter(
    { next: SPACE },
    (range, indentSize) => range.current + NEW_LINE + SPACE.repeat(indentSize)
  ),
  new Formatter({ nestingLevel: 0 }, (range) => range.current),
  new Formatter({}, (range, indentSize) =>
    range.current.replaceAll(SPACE, NEW_LINE + SPACE.repeat(indentSize))
  ),
];

export default formatters;

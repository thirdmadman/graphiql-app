import {
  CLOSE_CURLY_BRACKET,
  EMPTY_STRING,
  INDENT_STEP,
  NEW_LINE,
  OPEN_CURLY_BRACKET,
  SPACE,
  SPLITTERS,
} from '../constants';
import { IRangeItems } from '../../../../types/prettifierTypes';

export const splitQueryToItems = (query: string): Array<string> => {
  const result: Array<string> = [EMPTY_STRING];

  for (const char of query) {
    if (SPLITTERS.includes(char)) {
      result.push(char);
      result.push(EMPTY_STRING);
    } else {
      result[result.length - 1] += char;
    }
  }

  return result.filter((c) => c !== EMPTY_STRING);
};

export const getRangeByIndex = (
  source: Array<string>,
  index: number
): IRangeItems => {
  return {
    prev: source[index - 1],
    current: source[index],
    next: source[index + 1],
  };
};

export const getCurrentNestingLevel = (interimResult: string): number => {
  const indentLevel =
    interimResult.split(OPEN_CURLY_BRACKET).length -
    interimResult.split(CLOSE_CURLY_BRACKET).length;

  return indentLevel >= 0 ? indentLevel : 0;
};

export const increaseIndentSize = (currentSize: number) =>
  currentSize + INDENT_STEP;

export const decreaseIndentSize = (currentSize: number) => {
  const newIndentSize = currentSize - INDENT_STEP;
  return newIndentSize >= 0 ? newIndentSize : 0;
};

export const getNewLineWIthIndents = (indentSize: number) => {
  return NEW_LINE + SPACE.repeat(indentSize);
};

export const generateRandomID = (prefix?: string): string => {
  const timestamp = new Date().getTime();
  const randomNum = Math.floor(Math.random() * 900) + 100;
  const ID = prefix
    ? `${prefix}_${timestamp + randomNum}`
    : (timestamp + randomNum).toString();
  return ID;
};

import {
  CLOSE_CURLY_BRACKET,
  EMPTY_STRING,
  INDENT_STEP,
  OPEN_CURLY_BRACKET,
  SPLITTERS,
} from '../constants';
import { ItemsRange, PrettifyResult } from './types';
import formatters from './formatters';
import { minifyQuery } from '../minifier';

function splitQueryToItems(query: string): string[] {
  const result: string[] = [EMPTY_STRING];

  for (let i = 0; i < query.length; i++) {
    const char = query[i];

    if (SPLITTERS.includes(char)) {
      result.push(char);
      result.push(EMPTY_STRING);
    } else {
      result[result.length - 1] += char;
    }
  }

  return result.filter((c) => c !== EMPTY_STRING);
}

function getRangeByIndex(source: string[], index: number): ItemsRange {
  return {
    prev: source[index - 1],
    current: source[index],
    next: source[index + 1],
  };
}

function getCurrentNestingLevel(interimResult: string): number {
  const indentLevel =
    interimResult.split(OPEN_CURLY_BRACKET).length -
    interimResult.split(CLOSE_CURLY_BRACKET).length;

  return indentLevel >= 0 ? indentLevel : 0;
}

export function prettifyQuery(query: string): PrettifyResult {
  try {
    const minifiedQuery = minifyQuery(query);
    const queryItems = splitQueryToItems(minifiedQuery);
    const ranges: ItemsRange[] = [];

    for (let i = 0; i < queryItems.length; i++) {
      ranges.push(getRangeByIndex(queryItems, i));
    }

    let result = EMPTY_STRING;
    for (let i = 0; i < ranges.length; i++) {
      const range = ranges[i];

      for (let j = 0; j < formatters.length; j++) {
        const formatter = formatters[j];
        const nestingLevel = getCurrentNestingLevel(result);
        const isMatch = formatter.isMatch(range, nestingLevel);

        if (isMatch) {
          result += formatter.format(range, nestingLevel * INDENT_STEP);
          break;
        }
      }
    }

    return {
      query: result,
    };
  } catch {
    return {
      query,
      errorMessage:
        'Request formatting error. Please ensure that your request is written correctly.',
    };
  }
}

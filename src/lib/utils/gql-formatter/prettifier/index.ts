import { EMPTY_STRING, INDENT_STEP, COMMENT_ID_REGEX } from '../constants';
import { IRangeItems, IPrettifyQueryResult } from './types';
import formatters from './formatters';
import { minifyGQLQuery } from '../minifier';
import { replaceCommentsToIDs, replaceIDsToComments } from './format-comments';
import {
  splitQueryToItems,
  getRangeByIndex,
  getCurrentNestingLevel,
} from './helpers';

export function prettifyGQLQuery(query: string): IPrettifyQueryResult {
  try {
    const queryToFormat = query.includes('#')
      ? replaceCommentsToIDs(query)
      : query;

    const minifiedQuery = minifyGQLQuery(queryToFormat);
    const queryItems = splitQueryToItems(minifiedQuery);
    const ranges: IRangeItems[] = [];

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

    const formattedQuery = result.match(COMMENT_ID_REGEX)
      ? replaceIDsToComments(result)
      : result;
    return {
      query: formattedQuery,
    };
  } catch (error) {
    console.error(error);
    return {
      query,
      errorMessage:
        'Request formatting error! Please ensure that request is written correctly.',
    };
  }
}

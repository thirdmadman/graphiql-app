import { EMPTY_STRING, INDENT_STEP, COMMENT_ID_REGEX } from '../constants';
import {
  IRangeItems,
  IPrettifyQueryResult,
} from '../../../../types/prettifierTypes';
import formatters from './formatters';
import { minifyGQLQuery } from '../minifier';
import {
  replaceCommentsToIDs,
  replaceIDsToComments,
} from './formatQueryComments';
import {
  splitQueryToItems,
  getRangeByIndex,
  getCurrentNestingLevel,
} from './helpers';
import { IPrettifyResponseResult } from '../../../../types/prettifierTypes';

export const prettifyGQLQuery = (query: string): IPrettifyQueryResult => {
  try {
    const queryToFormat = query.includes('#')
      ? replaceCommentsToIDs(query)
      : query;

    const minifiedQuery = minifyGQLQuery(queryToFormat);
    const queryItems = splitQueryToItems(minifiedQuery);
    const ranges: Array<IRangeItems> = [];

    for (let i = 0; i < queryItems.length; i++) {
      ranges.push(getRangeByIndex(queryItems, i));
    }

    let result = EMPTY_STRING;
    for (const range of ranges) {
      for (const formatter of formatters) {
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
    return {
      query,
      errorMessage: true,
    };
  }
};

export const prettifyJSON = (response?: object): IPrettifyResponseResult => {
  try {
    const prettified = JSON.stringify(response, null, INDENT_STEP);
    return {
      response: prettified,
    };
  } catch (error) {
    return {
      response: JSON.stringify(response),
      error: error instanceof Error ? error.message : '',
    };
  }
};

import {
  EMPTY_STRING,
  OPEN_CURLY_BRACKET,
  CLOSE_CURLY_BRACKET,
  COLON,
  SPACE,
  OPEN_BRACKET,
  CLOSE_BRACKET,
} from '../constants';

export const minifyQuery = (query: string) => {
  return query
    .replace(/\n/g, EMPTY_STRING)
    .replace(/\s*{\s*/g, OPEN_CURLY_BRACKET)
    .replace(/\s*}\s*/g, CLOSE_CURLY_BRACKET)
    .replace(/\s*\(\s*/g, OPEN_BRACKET)
    .replace(/\s*\)\s*/g, CLOSE_BRACKET)
    .replace(/\s*:\s*/g, COLON)
    .replace(/\s+/g, SPACE)
    .trim();
};

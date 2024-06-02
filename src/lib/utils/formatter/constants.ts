export const NEW_LINE = '\n';
export const EMPTY_STRING = '';
export const SPACE = ' ';
export const OPEN_CURLY_BRACKET = '{';
export const CLOSE_CURLY_BRACKET = '}';
export const OPEN_BRACKET = '(';
export const CLOSE_BRACKET = ')';
export const COLON = ':';

export const SPLITTERS = [
  OPEN_CURLY_BRACKET,
  CLOSE_CURLY_BRACKET,
  OPEN_BRACKET,
  CLOSE_BRACKET,
  COLON,
];

export const NEW_LINE_REGEX = /\n/g;
export const OPEN_CURLY_BRACKET_WITH_SPACES_REGEX = /\s*{\s*/g;
export const CLOSE_CURLY_BRACKET_WITH_SPACES_REGEX = /\s*}\s*/g;
export const OPEN_BRACKET_WITH_SPACES_REGEX = /\s*\(\s*/g;
export const CLOSE_BRACKET_WITH_SPACES_REGEX = /\s*\)\s*/g;
export const COLON_WITH_SPACES_REGEX = /\s*:\s*/g;
export const SPACES_REGEX = /\s+/g;
export const NEW_LINES_REGEX = /\n+/g;

export const NEW_LINES_IN_COMMENT_REGEX = /(?<=(\n)?(\s*)?#.*(\n)?)(\n+)/g;
export const COMMENT_REGEX = /(\n)?(\s*)?#.*(\n)?/g;
export const COMMENT_ID_REGEX = /c_\d{13}/g;
export const ONLY_COMMENT_ID_REGEX = /^c_\d{13}$/g;

export const OPERATION_TYPE_REGEX = /(query|mutation|subscription)/;
export const FRAGMENT_DEFINITION_REGEX = /fragment/;
export const DIRECTIVE_REGEX = /@\w+/g;

export const INDENT_STEP = 2;

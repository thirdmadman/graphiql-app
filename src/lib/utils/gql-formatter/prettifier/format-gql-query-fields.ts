import {
  SPACE,
  ONLY_COMMENT_ID_REGEX,
  EMPTY_STRING,
  DIRECTIVE_REGEX,
  OPERATION_TYPE_REGEX,
  FRAGMENT_DEFINITION_REGEX,
} from '../constants';
import { getNewLineWIthIndents } from './helpers';

const formatGQLFields = (fields: string, indentSize: number): string => {
  const splittedFields = fields.split(SPACE);

  let result = '';

  for (let i = 0; i < splittedFields.length; i++) {
    const currentItem = splittedFields[i];
    const nextItem = splittedFields[i + 1];

    if (currentItem === '...' && nextItem === 'on') {
      const field = `${currentItem} ${nextItem} ${
        splittedFields[i + 2] || EMPTY_STRING
      }`;
      result += field;
      i += field.split(SPACE).length;
    } else if (nextItem?.match(DIRECTIVE_REGEX)) {
      const field = `${currentItem} ${nextItem}`;
      result += field;
      i += field.split(SPACE).length;
    } else if (
      (!indentSize && currentItem.match(OPERATION_TYPE_REGEX)) ||
      currentItem.match(FRAGMENT_DEFINITION_REGEX)
    ) {
      const field = splittedFields.slice(i, splittedFields.length).join(SPACE);
      result += field;
      break;
    } else {
      result +=
        currentItem +
        (nextItem && !nextItem.match(ONLY_COMMENT_ID_REGEX)
          ? getNewLineWIthIndents(indentSize)
          : EMPTY_STRING);
    }
  }

  return result;
};

export default formatGQLFields;

import {
  COMMENT_REGEX,
  COMMENT_ID_REGEX,
  SPACE,
  NEW_LINES_IN_COMMENT_REGEX,
  NEW_LINE,
} from '../constants';
import { IComment } from './types';
import { generateRandomID } from './helpers';

export const getCommentsFromGQLQuery = (query: string) => {
  return query.match(COMMENT_REGEX);
};

export const getCommentsIDsFromQuery = (query: string) => {
  return query.match(COMMENT_ID_REGEX);
};

let commentsStore: IComment = {};

export const replaceCommentsToIDs = (query: string) => {
  const comments = getCommentsFromGQLQuery(query);
  if (!comments) {
    return query;
  }

  let queryWithCommentsIDs = query;

  comments?.forEach((comment: string) => {
    const ID = generateRandomID('c');
    queryWithCommentsIDs = queryWithCommentsIDs.replace(comment, ID + SPACE);
    commentsStore[ID] = comment;
  });

  return queryWithCommentsIDs;
};

export const replaceIDsToComments = (query: string) => {
  const IDS = getCommentsIDsFromQuery(query);
  if (!IDS) {
    return query;
  }

  let queryWithComments = query;

  IDS?.forEach((ID: string) => {
    const comment = commentsStore[ID];
    queryWithComments = queryWithComments.replace(ID, comment);
  });

  commentsStore = {};
  return queryWithComments.replace(NEW_LINES_IN_COMMENT_REGEX, NEW_LINE);
};

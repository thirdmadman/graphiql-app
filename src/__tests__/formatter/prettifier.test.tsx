import prettifyGQLQuery from '@/lib/utils/formatter/prettifier';
import {
  FormattedMockGQLQueries,
  UnformattedMockGQLQueries,
  mockGQLQuery,
} from '../__mocks__/mockGQLQueries';

describe('PrettifyGQLQuery format query in various cases', () => {
  test('prettifyGQLQuery should format the gql-query string', () => {
    expect(prettifyGQLQuery(mockGQLQuery)).toEqual({ query: mockGQLQuery });
  });
  test('prettifyGQLQuery should format the gql-query string with arguments', () => {
    expect(prettifyGQLQuery(UnformattedMockGQLQueries.arguments)).toEqual({
      query: FormattedMockGQLQueries.arguments,
    });
  });
  test('prettifyGQLQuery should format the gql-query string with aliases', () => {
    expect(prettifyGQLQuery(UnformattedMockGQLQueries.aliases)).toEqual({
      query: FormattedMockGQLQueries.aliases,
    });
  });
  test('prettifyGQLQuery should format the gql-query string with operationName', () => {
    expect(prettifyGQLQuery(UnformattedMockGQLQueries.operationName)).toEqual({
      query: FormattedMockGQLQueries.operationName,
    });
  });
  test('prettifyGQLQuery should format the gql-query string with variables', () => {
    expect(prettifyGQLQuery(UnformattedMockGQLQueries.variables)).toEqual({
      query: FormattedMockGQLQueries.variables,
    });
  });
  test('prettifyGQLQuery should format the gql-query string with defaultVariables', () => {
    expect(
      prettifyGQLQuery(UnformattedMockGQLQueries.defaultVariables)
    ).toEqual({
      query: FormattedMockGQLQueries.defaultVariables,
    });
  });
  test('prettifyGQLQuery should format the gql-query string with directives', () => {
    expect(prettifyGQLQuery(UnformattedMockGQLQueries.directives)).toEqual({
      query: FormattedMockGQLQueries.directives,
    });
  });
  test('prettifyGQLQuery should format the gql-query string with inlineFragments', () => {
    expect(prettifyGQLQuery(UnformattedMockGQLQueries.inlineFragments)).toEqual(
      {
        query: FormattedMockGQLQueries.inlineFragments,
      }
    );
  });
  test('prettifyGQLQuery should format the gql-query string with mutations', () => {
    expect(prettifyGQLQuery(UnformattedMockGQLQueries.mutations)).toEqual({
      query: FormattedMockGQLQueries.mutations,
    });
  });
  test('prettifyGQLQuery should format the gql-query string with metaFields', () => {
    expect(prettifyGQLQuery(UnformattedMockGQLQueries.metaFields)).toEqual({
      query: FormattedMockGQLQueries.metaFields,
    });
  });
  test('prettifyGQLQuery should format the gql-query string with comments', () => {
    expect(prettifyGQLQuery(UnformattedMockGQLQueries.comments)).toEqual({
      query: FormattedMockGQLQueries.comments,
    });
  });
});

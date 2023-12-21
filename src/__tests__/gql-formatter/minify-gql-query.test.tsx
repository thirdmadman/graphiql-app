import { minifyQuery } from '@/lib/utils/gql-request-helpers';
import {
  mockGQLQuery,
  minifiedMockGQLQuery,
} from '../__mocks__/gql-mock-queries/MockQueries';

describe('MinifyGQLQuery', () => {
  test('minifyGQLQuery should minify query', () => {
    const minified = minifyQuery(mockGQLQuery);
    expect(minified).toEqual(minifiedMockGQLQuery);
  });
});

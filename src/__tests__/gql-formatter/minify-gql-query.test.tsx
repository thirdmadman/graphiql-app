import { minifyQuery } from '@/lib/utils/gql-request-helpers';
import {
  mockGQLQuery,
  minifiedMockGQLQuery,
} from '../__mocks__/mock-gql-queries';

describe('MinifyGQLQuery', () => {
  test('minifyGQLQuery should minify query', () => {
    const minified = minifyQuery(mockGQLQuery);
    expect(minified).toEqual(minifiedMockGQLQuery);
  });
});

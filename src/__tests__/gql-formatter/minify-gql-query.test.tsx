import { minifyGQLQuery } from '@/lib/utils/gql-formatter/minifier';
import {
  mockGQLQuery,
  minifiedMockGQLQuery,
} from '../__mocks__/mock-gql-queries';

describe('MinifyGQLQuery', () => {
  test('minifyGQLQuery should minify query', () => {
    const minified = minifyGQLQuery(mockGQLQuery);
    expect(minified).toEqual(minifiedMockGQLQuery);
  });
});

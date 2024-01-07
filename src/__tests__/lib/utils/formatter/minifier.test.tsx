import { minifyGQLQuery } from '@/lib/utils/formatter/minifier';
import {
  mockGQLQuery,
  minifiedMockGQLQuery,
} from '../../../__mocks__/mockGQLQueries';

describe('MinifyGQLQuery', () => {
  test('minifyGQLQuery should minify query', () => {
    const minified = minifyGQLQuery(mockGQLQuery);
    expect(minified).toEqual(minifiedMockGQLQuery);
  });
});

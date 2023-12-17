import { minifyQuery } from '@/lib/utils/gql-request-helpers';

const mockQuery = `query ExampleQuery {
  company {
    ceo
  }
  roadster {
    apoapsis_au
  }
}`;

test('minifyQuery should minify the query string', () => {
  const minified = minifyQuery(mockQuery);

  expect(minified).toEqual(
    'query ExampleQuery{company{ceo}roadster{apoapsis_au}}'
  );
});

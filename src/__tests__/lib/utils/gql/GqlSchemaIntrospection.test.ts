import {
  allMutations,
  allQueries,
  allSubscriptions,
  mockGqlSchemaIntrospection,
  scalarType,
} from '@/__tests__/__mocks__/mockGqlSchemaIntrospection';
import { GqlSchemaIntrospection } from '@/lib/utils/gql/GqlSchemaIntrospection';
import { IIntrospectionSchema } from '@/lib/utils/gql/introspectionImportedTypes';

describe('GqlSchemaIntrospection', () => {
  it('should correctly extract all queries', () => {
    const gqlSchemaIntrospection = new GqlSchemaIntrospection(
      mockGqlSchemaIntrospection as unknown as IIntrospectionSchema
    );

    const result = gqlSchemaIntrospection.getAllQueries();

    expect(result).toBe(allQueries);
  });

  it('should correctly extract all mutations', () => {
    const gqlSchemaIntrospection = new GqlSchemaIntrospection(
      mockGqlSchemaIntrospection as unknown as IIntrospectionSchema
    );

    const result = gqlSchemaIntrospection.getAllMutations();

    expect(result).toBe(allMutations);
  });

  it('should correctly extract all subscriptions', () => {
    const gqlSchemaIntrospection = new GqlSchemaIntrospection(
      mockGqlSchemaIntrospection as unknown as IIntrospectionSchema
    );

    const result = gqlSchemaIntrospection.getAllSubscriptions();

    expect(result).toBe(allSubscriptions);
  });

  it('should correctly get type', () => {
    const gqlSchemaIntrospection = new GqlSchemaIntrospection(
      mockGqlSchemaIntrospection as unknown as IIntrospectionSchema
    );

    const result = gqlSchemaIntrospection.getType('SCALAR', 'ID');

    expect(result).toBe(scalarType);
  });
});

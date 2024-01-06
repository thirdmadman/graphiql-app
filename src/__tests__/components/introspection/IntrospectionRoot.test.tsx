import { mockGqlSchemaIntrospection } from '@/__tests__/__mocks__/mockGqlSchemaIntrospection';
import { IntrospectionRoot } from '@/app/components/introspection/IntrospectionRoot';
import { IIntrospectionSchema } from '@/lib/utils/gql/introspectionImportedTypes';
import { render } from '@testing-library/react';

describe('DeprecationReasonComponent', () => {
  it('should render component and not fail', () => {
    const { container } = render(
      <IntrospectionRoot
        schema={mockGqlSchemaIntrospection as unknown as IIntrospectionSchema}
      />
    );

    expect(container.firstChild).not.toBeNull();
  });
});

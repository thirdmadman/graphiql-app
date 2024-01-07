import { mockGqlSchemaIntrospection } from '@/__tests__/__mocks__/mockGqlSchemaIntrospection';
import { PossibleTypeFieldComponent } from '@/app/components/introspection/shared/PossibleTypeFieldComponent';
import {
  IIntrospectionNamedTypeRef,
  IIntrospectionObjectType,
  IIntrospectionSchema,
} from '@/types/introspectionImportedTypes';
import { render } from '@testing-library/react';

describe('PossibleTypeFieldComponent', () => {
  it('should not render component if type not present', () => {
    const { container } = render(
      <PossibleTypeFieldComponent
        type={
          undefined as unknown as IIntrospectionNamedTypeRef<IIntrospectionObjectType>
        }
        schema={mockGqlSchemaIntrospection as unknown as IIntrospectionSchema}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});

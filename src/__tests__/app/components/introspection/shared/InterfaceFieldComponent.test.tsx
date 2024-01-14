import { InterfaceFieldComponent } from '@/app/components/introspection/shared/InterfaceFieldComponent';
import {
  IIntrospectionInterfaceType,
  IIntrospectionNamedTypeRef,
  IIntrospectionSchema,
} from '@/types/introspectionImportedTypes';
import { render } from '@testing-library/react';

describe('InterfaceFieldComponent', () => {
  it('should not render component if type not present', () => {
    const { container } = render(
      <InterfaceFieldComponent
        type={
          undefined as unknown as IIntrospectionNamedTypeRef<IIntrospectionInterfaceType>
        }
        schema={{} as unknown as IIntrospectionSchema}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});

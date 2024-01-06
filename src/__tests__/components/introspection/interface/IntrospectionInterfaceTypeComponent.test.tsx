import { IntrospectionInterfaceTypeComponent } from '@/app/components/introspection/interface/IntrospectionInterfaceTypeComponent';
import { IIntrospectionSchema } from '@/lib/utils/gql/introspectionImportedTypes';

import { render } from '@testing-library/react';

describe('IntrospectionInterfaceTypeComponent', () => {
  it('should not render component if type not present', () => {
    const { container } = render(
      <IntrospectionInterfaceTypeComponent
        type={undefined}
        schema={undefined as unknown as IIntrospectionSchema}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});

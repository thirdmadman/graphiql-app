import { IntrospectionInputValueTypeComponent } from '@/app/components/introspection/input/IntrospectionInputValueTypeComponent';
import { IIntrospectionSchema } from '@/lib/utils/gql/introspectionImportedTypes';

import { render } from '@testing-library/react';

describe('IntrospectionInputValueTypeComponent', () => {
  it('should not render component if type not present', () => {
    const { container } = render(
      <IntrospectionInputValueTypeComponent
        type={undefined}
        schema={undefined as unknown as IIntrospectionSchema}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});

import { IntrospectionInputValueComponent } from '@/app/components/introspection/input/IntrospectionInputValueComponent';
import { IIntrospectionSchema } from '@/lib/utils/gql/introspectionImportedTypes';

import { render } from '@testing-library/react';

describe('IntrospectionInputValueComponent', () => {
  it('should not render component if type not present', () => {
    const { container } = render(
      <IntrospectionInputValueComponent
        inputValue={undefined}
        schema={undefined as unknown as IIntrospectionSchema}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});

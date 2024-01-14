import { IntrospectionEnumTypeComponent } from '@/app/components/introspection/enum/IntrospectionEnumTypeComponent';
import { IIntrospectionSchema } from '@/types/introspectionImportedTypes';

import { render } from '@testing-library/react';

describe('IntrospectionEnumTypeComponent', () => {
  it('should not render component if type not present', () => {
    const { container } = render(
      <IntrospectionEnumTypeComponent
        type={undefined}
        schema={undefined as unknown as IIntrospectionSchema}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});

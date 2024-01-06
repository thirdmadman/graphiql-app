import { IntrospectionEnumTypeComponent } from '@/app/components/introspection/enum/IntrospectionEnumTypeComponent';
import { IIntrospectionSchema } from '@/lib/utils/gql/introspectionImportedTypes';

import { render } from '@testing-library/react';

describe('IntrospectionEnumValueCopmponent', () => {
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
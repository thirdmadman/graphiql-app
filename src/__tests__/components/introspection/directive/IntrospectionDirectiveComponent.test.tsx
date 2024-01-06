import { IntrospectionDirectiveComponent } from '@/app/components/introspection/directive/IntrospectionDirectiveComponent';
import { IIntrospectionSchema } from '@/lib/utils/gql/introspectionImportedTypes';

import { render } from '@testing-library/react';

describe('IntrospectionDirectiveComponent', () => {
  it('should not render component if type not present', () => {
    const { container } = render(
      <IntrospectionDirectiveComponent
        directive={undefined}
        schema={undefined as unknown as IIntrospectionSchema}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});

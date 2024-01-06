import { AllDirectivesFieldComponent } from '@/app/components/introspection/AllDirectivesFieldComponent';
import {
  IIntrospectionDirective,
  IIntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';

import { screen, render } from '@testing-library/react';

describe('AllDirectivesFieldComponent', () => {
  it('should not render component if type not present', () => {
    const { container } = render(
      <AllDirectivesFieldComponent
        fields={undefined}
        schema={undefined as unknown as IIntrospectionSchema}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should render component and not fail', () => {
    const { container } = render(
      <AllDirectivesFieldComponent
        fields={[{ name: 'directiveName' }] as Array<IIntrospectionDirective>}
        schema={{} as unknown as IIntrospectionSchema}
      />
    );

    expect(container.firstChild).not.toBeNull();
    expect(screen.getByText('directiveName')).not.toBeNull();
  });
});

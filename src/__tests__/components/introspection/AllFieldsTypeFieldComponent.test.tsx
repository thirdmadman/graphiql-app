import { AllFieldsTypeFieldComponent } from '@/app/components/introspection/AllFieldsTypeFieldComponent';
import { IIntrospectionSchema } from '@/lib/utils/gql/introspectionImportedTypes';

import { screen, render, fireEvent } from '@testing-library/react';

describe('AllFieldsTypeFieldComponent', () => {
  it('should not render component if fields not present', () => {
    const { container } = render(
      <AllFieldsTypeFieldComponent
        fields={undefined}
        schema={undefined as unknown as IIntrospectionSchema}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should hide inside on title click', () => {
    render(
      <AllFieldsTypeFieldComponent
        fields={[]}
        schema={{} as unknown as IIntrospectionSchema}
      />
    );

    const title = screen.getByTestId('AllFieldsTypeTitle');

    const icon = screen.getByTestId('AllFieldsTypeIcon');

    expect(icon.textContent).toBe('+');

    fireEvent.click(title);

    expect(icon.textContent).toBe('-');
  });
});

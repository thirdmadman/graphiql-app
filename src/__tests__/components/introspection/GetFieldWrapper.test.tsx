import { mockGqlSchemaIntrospection } from '@/__tests__/__mocks__/mockGqlSchemaIntrospection';
import { GetFieldWrapper } from '@/app/components/introspection/shared/GetFieldWrapper';
import { IIntrospectionSchema } from '@/types/introspectionImportedTypes';

import { render } from '@testing-library/react';

describe('GetFieldWrapper', () => {
  it('should not render component if kind not present', () => {
    const { container } = render(
      <GetFieldWrapper
        kind={undefined as unknown as string}
        name={'name'}
        schema={{} as unknown as IIntrospectionSchema}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should not render component if name not present', () => {
    const { container } = render(
      <GetFieldWrapper
        kind={'OBJECT'}
        name={undefined as unknown as string}
        schema={{} as unknown as IIntrospectionSchema}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should not render component schema s not present', () => {
    const { container } = render(
      <GetFieldWrapper
        kind={'OBJECT'}
        name={'name'}
        schema={undefined as unknown as IIntrospectionSchema}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should render component and not fail', () => {
    const { container } = render(
      <GetFieldWrapper
        kind={'OBJECT'}
        name={'User'}
        schema={mockGqlSchemaIntrospection as unknown as IIntrospectionSchema}
      />
    );

    expect(container.firstChild).not.toBeNull();
  });

  it('should not render component if type not found', () => {
    const { container } = render(
      <GetFieldWrapper
        kind={'OBJECT'}
        name={'UserNotFound'}
        schema={mockGqlSchemaIntrospection as unknown as IIntrospectionSchema}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});

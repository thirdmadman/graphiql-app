import { IntrospectionTypeComponent } from '@/app/components/introspection/shared/IntrospectionTypeComponent';
import {
  IIntrospectionEnumType,
  IIntrospectionInputObjectType,
  IIntrospectionInterfaceType,
  IIntrospectionObjectType,
  IIntrospectionScalarType,
  IIntrospectionSchema,
  IIntrospectionUnionType,
} from '@/lib/utils/gql/introspectionImportedTypes';
import { screen, render } from '@testing-library/react';

describe('IntrospectionTypeComponent', () => {
  it('should render component and not fail', () => {
    const { container } = render(
      <IntrospectionTypeComponent
        type={{ name: 'someType', kind: 'SCALAR' }}
        schema={{} as unknown as IIntrospectionSchema}
      />
    );

    expect(container.firstChild).not.toBeNull();
  });

  it('should not render component if schema not present', () => {
    const { container } = render(
      <IntrospectionTypeComponent
        type={undefined}
        schema={{} as unknown as IIntrospectionSchema}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should render IntrospectionObjectTypeComponent', () => {
    render(
      <IntrospectionTypeComponent
        type={{ name: 'NameOfObj', kind: 'OBJECT' } as IIntrospectionObjectType}
        schema={{} as unknown as IIntrospectionSchema}
      />
    );

    expect(screen.getByText('NameOfObj')).not.toBeNull();
    expect(screen.getByText('OBJECT', { exact: false })).not.toBeNull();
  });

  it('should render IntrospectionInputObjectTypeComponent', () => {
    render(
      <IntrospectionTypeComponent
        type={
          {
            name: 'NameOfInpObj',
            kind: 'INPUT_OBJECT',
          } as IIntrospectionInputObjectType
        }
        schema={{} as unknown as IIntrospectionSchema}
      />
    );

    expect(screen.getByText('NameOfInpObj')).not.toBeNull();
    expect(screen.getByText('INPUT_OBJECT', { exact: false })).not.toBeNull();
  });

  it('should render IntrospectionEnumTypeComponent', () => {
    render(
      <IntrospectionTypeComponent
        type={
          {
            name: 'NameOfEnm',
            kind: 'ENUM',
            enumValues: [],
          } as IIntrospectionEnumType
        }
        schema={{} as unknown as IIntrospectionSchema}
      />
    );

    expect(screen.getByText('NameOfEnm')).not.toBeNull();
    expect(screen.getByText('ENUM:', { exact: false })).not.toBeNull();
  });

  it('should render IntrospectionInterfaceTypeComponent', () => {
    render(
      <IntrospectionTypeComponent
        type={
          {
            name: 'NameOfInterf',
            kind: 'INTERFACE',
          } as IIntrospectionInterfaceType
        }
        schema={{} as unknown as IIntrospectionSchema}
      />
    );

    expect(screen.getByText('NameOfInterf')).not.toBeNull();
    expect(screen.getByText('INTERFACE:', { exact: false })).not.toBeNull();
  });

  it('should render IntrospectionInterfaceTypeComponent', () => {
    render(
      <IntrospectionTypeComponent
        type={
          {
            name: 'NameOfUni',
            kind: 'UNION',
          } as IIntrospectionUnionType
        }
        schema={{} as unknown as IIntrospectionSchema}
      />
    );

    expect(screen.getByText('NameOfUni')).not.toBeNull();
    expect(screen.getByText('UNION:', { exact: false })).not.toBeNull();
  });

  it('should render IntrospectionInterfaceTypeComponent', () => {
    render(
      <IntrospectionTypeComponent
        type={
          {
            name: 'NameOfUni',
            kind: 'UNION',
          } as IIntrospectionUnionType
        }
        schema={{} as unknown as IIntrospectionSchema}
      />
    );

    expect(screen.getByText('NameOfUni')).not.toBeNull();
    expect(screen.getByText('UNION:', { exact: false })).not.toBeNull();
  });

  it('should render IntrospectionInterfaceTypeComponent', () => {
    render(
      <IntrospectionTypeComponent
        type={
          {
            name: 'NameOfScal',
            kind: 'SCALAR',
          } as IIntrospectionScalarType
        }
        schema={{} as unknown as IIntrospectionSchema}
      />
    );

    expect(screen.getByText('NameOfScal')).not.toBeNull();
    expect(screen.getByText('SCALAR:', { exact: false })).not.toBeNull();
  });
});

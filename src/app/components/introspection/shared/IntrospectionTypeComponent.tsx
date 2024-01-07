'use client';

import {
  IIntrospectionSchema,
  TIntrospectionType,
} from '@/types/introspectionImportedTypes';

import { IntrospectionEnumTypeComponent } from '../enum/IntrospectionEnumTypeComponent';
import { IntrospectionObjectTypeComponent } from '../object/IntrospectionObjectTypeComponent';
import { IntrospectionInputObjectTypeComponent } from '../input/IntrospectionInputObjectTypeComponent';
import { IntrospectionInterfaceTypeComponent } from '../interface/IntrospectionInterfaceTypeComponent';
import { IntrospectionUnionTypeComponent } from '../union/IntrospectionUnionTypeComponent';
import { IntrospectionScalarTypeComponent } from '../scalar/IntrospectionScalarTypeComponent';

interface IIntrospectionTypeComponentProps {
  type: TIntrospectionType | undefined | null;
  schema: IIntrospectionSchema;
  isOpenedSet?: boolean;
}

export function IntrospectionTypeComponent({
  type,
  schema,
  isOpenedSet = false,
}: IIntrospectionTypeComponentProps) {
  if (!type) {
    return;
  }

  if (type.kind === 'OBJECT') {
    return (
      <IntrospectionObjectTypeComponent
        type={type}
        schema={schema}
        isOpenedSet={isOpenedSet}
      />
    );
  }

  if (type.kind === 'INPUT_OBJECT') {
    return (
      <IntrospectionInputObjectTypeComponent
        type={type}
        schema={schema}
        isOpenedSet={isOpenedSet}
      />
    );
  }

  if (type.kind === 'ENUM') {
    return (
      <IntrospectionEnumTypeComponent
        type={type}
        schema={schema}
        isOpenedSet={isOpenedSet}
      />
    );
  }

  if (type.kind === 'INTERFACE') {
    return (
      <IntrospectionInterfaceTypeComponent
        type={type}
        schema={schema}
        isOpenedSet={isOpenedSet}
      />
    );
  }

  if (type.kind === 'UNION') {
    return (
      <IntrospectionUnionTypeComponent
        type={type}
        schema={schema}
        isOpenedSet={isOpenedSet}
      />
    );
  }

  if (type.kind === 'SCALAR') {
    return (
      <IntrospectionScalarTypeComponent
        type={type}
        schema={schema}
        isOpenedSet={isOpenedSet}
      />
    );
  }
}

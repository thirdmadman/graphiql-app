'use client';

import {
  IIntrospectionInterfaceType,
  IIntrospectionNamedTypeRef,
  IIntrospectionSchema,
} from '@/types/introspectionImportedTypes';
import { useState } from 'react';
import { GetFieldWrapper } from './GetFieldWrapper';

interface IInterfaceFieldComponentProps {
  type:
    | IIntrospectionNamedTypeRef<IIntrospectionInterfaceType>
    | undefined
    | null;
  schema: IIntrospectionSchema;
}

export function InterfaceFieldComponent({
  type,
  schema,
}: IInterfaceFieldComponentProps) {
  const [isOpened, setIsOpened] = useState(false);

  if (!type || !schema) {
    return;
  }

  return (
    <>
      {!isOpened && (
        <div className="pl-2 mb-2 border-l-4 border-indigo-500">
          <div
            className="mb-1 cursor-pointer"
            onClick={() => setIsOpened(!isOpened)}
          >
            type: {type.kind}: <i>{type.name}</i>
          </div>
        </div>
      )}

      {isOpened && (
        <GetFieldWrapper
          kind={type.kind}
          name={type.name}
          schema={schema}
          isOpenedSet
        />
      )}
    </>
  );
}

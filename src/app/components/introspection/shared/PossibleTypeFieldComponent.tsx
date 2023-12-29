'use client';

import {
  IntrospectionNamedTypeRef,
  IntrospectionObjectType,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';
import { useState } from 'react';
import { GetFieldWrapper } from '../GetFieldWrapper';

interface IPossibleTypeFieldComponentProps {
  type: IntrospectionNamedTypeRef<IntrospectionObjectType> | undefined | null;
  schema: IntrospectionSchema;
}

export function PossibleTypeFieldComponent({
  type,
  schema,
}: IPossibleTypeFieldComponentProps) {
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
        <GetFieldWrapper kind={type.kind} name={type.name} schema={schema} />
      )}
    </>
  );
}

'use client';

import {
  IntrospectionInputTypeRef,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';

import { useState } from 'react';
import { GetFieldWrapper } from '../GetFieldWrapper';

interface IIntrospectionInputValueTypeComponentProps {
  type: IntrospectionInputTypeRef | undefined | null;
  schema: IntrospectionSchema;
}

export function IntrospectionInputValueTypeComponent({
  type,
  schema,
}: IIntrospectionInputValueTypeComponentProps) {
  const [isOpened, setIsOpened] = useState(false);

  if (!type) {
    return;
  }

  if (type.kind === 'LIST' || type.kind === 'NON_NULL') {
    return (
      <div className="pl-2 mb-2 border-l-4 border-indigo-500">
        <div className="cursor-pointer" onClick={() => setIsOpened(!isOpened)}>
          of type: {type.kind}:
        </div>
        <div className={isOpened ? '' : 'hidden'}>
          <IntrospectionInputValueTypeComponent
            type={type.ofType}
            schema={schema}
          />
        </div>
      </div>
    );
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

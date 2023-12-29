'use client';

import {
  IntrospectionOutputTypeRef,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';
import { useState } from 'react';
import { GetFieldWrapper } from './GetFieldWrapper';

interface IIntrospectionOutputTypeComponentProps {
  type: IntrospectionOutputTypeRef | undefined | null;
  schema: IntrospectionSchema;
}

export function IntrospectionOutputTypeComponent({
  schema,
  type,
}: IIntrospectionOutputTypeComponentProps) {
  const [isOpened, setIsOpened] = useState(false);

  if (!type) {
    return;
  }

  if (type.kind === 'LIST' || type.kind === 'NON_NULL') {
    return (
      <div className="pl-2 mb-2 border-l-4 border-indigo-500">
        <div
          className="mb-1 cursor-pointer"
          onClick={() => setIsOpened(!isOpened)}
        >
          type: {type.kind}:
        </div>
        <div className={isOpened ? '' : 'hidden'}>
          <IntrospectionOutputTypeComponent
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

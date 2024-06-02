'use client';

import {
  TIntrospectionOutputTypeRef,
  IIntrospectionSchema,
} from '@/types/introspectionImportedTypes';
import { useState } from 'react';
import { GetFieldWrapper } from './shared/GetFieldWrapper';
import { FoldableBlockComponent } from './shared/FoldableBlockComponent';

interface IIntrospectionOutputTypeComponentProps {
  type: TIntrospectionOutputTypeRef | undefined | null;
  schema: IIntrospectionSchema;
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
      <FoldableBlockComponent
        title={`type: ${type.kind}:`}
        inside={
          <IntrospectionOutputTypeComponent
            type={type.ofType}
            schema={schema}
          />
        }
      />
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

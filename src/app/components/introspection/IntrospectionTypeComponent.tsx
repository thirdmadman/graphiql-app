'use client';

import {
  IntrospectionSchema,
  IntrospectionType,
} from '@/lib/utils/gql/introspectionImportedTypes';

import { useState } from 'react';
import { IntrospectionFieldComponent } from './IntrospectionFieldComponent';

interface IIntrospectionTypeComponentProps {
  type: IntrospectionType | undefined | null;
  schema: IntrospectionSchema;
}

export function IntrospectionTypeComponent({
  type,
  schema,
}: IIntrospectionTypeComponentProps) {
  const [isOpened, setIsOpened] = useState(false);

  if (!type) {
    return;
  }

  if (type.kind === 'OBJECT') {
    return type.fields?.map((field) => (
      <IntrospectionFieldComponent
        key={field.name}
        field={field}
        schema={schema}
      />
    ));
  }

  return (
    <div className="pl-2 mb-2 border-l-4 border-indigo-500">
      <div
        className="mb-1 cursor-pointer"
        onClick={() => setIsOpened(!isOpened)}
      >
        {type.name}
      </div>
      <div className={isOpened ? '' : 'hidden'}>
        <div>
          {type.description && (
            <div className="pl-2 mb-2 border-l-4 border-indigo-500">
              <div>description:</div>
              <div className="pl-2">{type.description}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

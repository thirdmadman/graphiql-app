'use client';

import {
  IntrospectionSchema,
  IntrospectionType,
} from '@/lib/utils/gql/introspectionImportedTypes';
import { useState } from 'react';
import { GetFieldWrapper } from './shared/GetFieldWrapper';

interface IAllFieldsTypeFieldComponentProps {
  fields: Array<IntrospectionType> | undefined | null;
  schema: IntrospectionSchema;
}

export function AllFieldsTypeFieldComponent({
  fields,
  schema,
}: IAllFieldsTypeFieldComponentProps) {
  const [isOpened, setIsOpened] = useState(false);

  if (!fields || !schema) {
    return;
  }

  return (
    <div className="pl-2 mb-2 border-l-4 border-indigo-500 relative">
      <div className="absolute -left-2 top-1.5 w-3 h-3 bg-black text-white leading-3 text-center font-mono dark:bg-white dark:text-black">
        {isOpened ? '-' : '+'}
      </div>
      <div
        className="mb-2 cursor-pointer"
        onClick={() => setIsOpened(!isOpened)}
      >
        <b>All types:</b>
      </div>
      {isOpened &&
        fields.map((field) => (
          <GetFieldWrapper
            key={`${field.kind}_${field.name}`}
            kind={field.kind}
            name={field.name}
            schema={schema}
          />
        ))}
    </div>
  );
}

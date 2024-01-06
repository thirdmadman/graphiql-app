'use client';

import {
  IIntrospectionSchema,
  TIntrospectionType,
} from '@/lib/utils/gql/introspectionImportedTypes';
import { useState } from 'react';
import { GetFieldWrapper } from './shared/GetFieldWrapper';

interface IAllFieldsTypeFieldComponentProps {
  fields: Array<TIntrospectionType> | undefined | null;
  schema: IIntrospectionSchema;
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
      <div
        data-testid="AllFieldsTypeIcon"
        className="absolute -left-2 top-1.5 w-3 h-3 bg-black text-white leading-3 text-center font-mono dark:bg-white dark:text-black"
      >
        {isOpened ? '-' : '+'}
      </div>
      <div
        className="mb-2 cursor-pointer"
        onClick={() => setIsOpened(!isOpened)}
        data-testid="AllFieldsTypeTitle"
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

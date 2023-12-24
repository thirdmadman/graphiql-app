'use client';

import {
  IntrospectionField,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';
import { IntrospectionFieldComponent } from './IntrospectionFieldComponent';
import { useState } from 'react';

interface IIntrospectionQueriesProps {
  schema: IntrospectionSchema;
  fields: Array<IntrospectionField> | undefined | null;
  name: string;
}

export function IntrospectionQueries({
  schema,
  fields,
  name,
}: IIntrospectionQueriesProps) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="flex flex-col pl-2 border-l-4 border-indigo-500">
      <div
        className="mb-2 cursor-pointer"
        onClick={() => setIsOpened(!isOpened)}
      >
        {name}
      </div>
      <div className={isOpened ? '' : 'hidden'}>
        {fields?.map((field) => (
          <IntrospectionFieldComponent
            key={field.name}
            field={field}
            schema={schema}
          />
        ))}
      </div>
    </div>
  );
}

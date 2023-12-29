'use client';

import {
  IntrospectionField,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';
import { IntrospectionFieldComponent } from './IntrospectionFieldComponent';
import { useState } from 'react';

interface IIntrospectionFieldsCollectionProps {
  schema: IntrospectionSchema;
  fields: Array<IntrospectionField> | undefined | null;
  name: string;
}

export function IntrospectionFieldsCollection({
  schema,
  fields,
  name,
}: IIntrospectionFieldsCollectionProps) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="flex mb-2 flex-col pl-2 border-l-4 border-indigo-500">
      <div
        className="mb-2 cursor-pointer"
        onClick={() => setIsOpened(!isOpened)}
      >
        <b>{name}</b>
      </div>
      <div className={isOpened ? '' : 'hidden'}>
        {fields?.map((field) => (
          <IntrospectionFieldComponent
            key={`${field.type.kind}_${field.name}`}
            field={field}
            schema={schema}
          />
        ))}
      </div>
    </div>
  );
}

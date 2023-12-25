'use client';

import {
  IntrospectionSchema,
  IntrospectionType,
} from '@/lib/utils/gql/introspectionImportedTypes';

import { useState } from 'react';
import { IntrospectionFieldComponent } from './IntrospectionFieldComponent';
import { IntrospectionInputValueComponent } from './IntrospectionInputValueComponent';

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
    return (
      <div className="pl-2 mb-2 border-l-4 border-indigo-500">
        <div className="mb-1">fields:</div>
        {type.fields?.map((field) => (
          <IntrospectionFieldComponent
            key={field.name}
            field={field}
            schema={schema}
          />
        ))}
      </div>
    );
  }

  if (type.kind === 'INPUT_OBJECT') {
    return (
      <div className="pl-2 mb-2 border-l-4 border-indigo-500">
        <div className="mb-1">input fields:</div>
        {type.inputFields?.map((inputValue) => (
          <IntrospectionInputValueComponent
            key={inputValue.name}
            inputValue={inputValue}
            schema={schema}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="pl-2 mb-2 border-l-4 border-indigo-500">
      <div
        className="mb-1 cursor-pointer"
        onClick={() => setIsOpened(!isOpened)}
      >
        <b>{type.name}</b>
      </div>
      <div className={isOpened ? '' : 'hidden'}>
        {type.description && (
          <div className="pl-2 mb-2 border-l-4 border-indigo-500">
            <div>description:</div>
            <div className="pl-2">{type.description}</div>
          </div>
        )}
      </div>
    </div>
  );
}

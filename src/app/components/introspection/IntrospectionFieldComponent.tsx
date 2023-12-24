'use client';

import {
  IntrospectionField,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';
import { IntrospectionOutputTypeComponent } from './IntrospectionOutputTypeComponent';
import { useState } from 'react';
import { IntrospectionInputValueComponent } from './IntrospectionInputValueComponent';

interface IIntrospectionFieldProps {
  field: IntrospectionField | undefined | null;
  schema: IntrospectionSchema;
}

export function IntrospectionFieldComponent({
  schema,
  field,
}: IIntrospectionFieldProps) {
  const [isOpened, setIsOpened] = useState(false);

  if (!field) {
    return;
  }

  return (
    <div className="pl-2 mb-2 border-l-4 border-indigo-500">
      <div
        className="mb-1 cursor-pointer"
        onClick={() => setIsOpened(!isOpened)}
      >
        {field.name}
      </div>
      <div className={isOpened ? '' : 'hidden'}>
        <div>
          {field.description && (
            <div className="pl-2 mb-2 border-l-4 border-indigo-500">
              description: {field.description}
            </div>
          )}
          {field.args && (
            <div className="pl-2 mb-2 border-l-4 border-indigo-500">
              <div>args: {field.args.length}</div>
              <div className="flex flex-col">
                {field.args.map((arg) => (
                  <IntrospectionInputValueComponent
                    schema={schema}
                    key={arg.name}
                    arg={arg}
                  />
                ))}
              </div>
            </div>
          )}
          <IntrospectionOutputTypeComponent type={field.type} schema={schema} />
        </div>
      </div>
    </div>
  );
}

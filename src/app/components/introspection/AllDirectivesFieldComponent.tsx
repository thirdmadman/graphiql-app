'use client';

import {
  IntrospectionDirective,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';
import { useState } from 'react';
import { IntrospectionDirectiveComponent } from './directive/IntrospectionDirectiveComponent';

interface IAllDirectivesFieldComponentProps {
  fields: Array<IntrospectionDirective> | undefined | null;
  schema: IntrospectionSchema;
}

export function AllDirectivesFieldComponent({
  fields,
  schema,
}: IAllDirectivesFieldComponentProps) {
  const [isOpened, setIsOpened] = useState(false);

  if (!fields || !schema) {
    return;
  }

  return (
    <div className="pl-2 mb-2 border-l-4 border-indigo-500">
      <div
        className="mb-2 cursor-pointer"
        onClick={() => setIsOpened(!isOpened)}
      >
        <b>directives</b>
      </div>
      {isOpened &&
        fields.map((directive) => (
          <IntrospectionDirectiveComponent
            directive={directive}
            key={directive.name}
            schema={schema}
          />
        ))}
    </div>
  );
}

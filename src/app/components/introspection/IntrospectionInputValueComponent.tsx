'use client';

import {
  IntrospectionInputValue,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';

import { useState } from 'react';

interface IIntrospectionInputValueComponentProps {
  arg: IntrospectionInputValue | undefined | null;
  schema: IntrospectionSchema;
}

export function IntrospectionInputValueComponent({
  arg,
}: IIntrospectionInputValueComponentProps) {
  const [isOpened, setIsOpened] = useState(false);

  if (!arg) {
    return;
  }

  return (
    <div className="pl-2 mb-2 border-l-4 border-indigo-500">
      <div
        className="mb-1 cursor-pointer"
        onClick={() => setIsOpened(!isOpened)}
      >
        {arg.name}: {arg.type.kind}
      </div>
      <div className={isOpened ? '' : 'hidden'}>
        {arg.description && (
          <div className="pl-2 mb-2 border-l-4 border-indigo-500">
            description: {arg.description}
          </div>
        )}
        {arg.defaultValue && (
          <div className="pl-2 mb-2 border-l-4 border-indigo-500">
            defaultValue: {arg.defaultValue}
          </div>
        )}
      </div>
    </div>
  );
}

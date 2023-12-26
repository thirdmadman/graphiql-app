'use client';

import {
  IntrospectionEnumType,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';

import { useState } from 'react';

interface IEnumTypeComponentProps {
  type: IntrospectionEnumType | undefined | null;
  schema: IntrospectionSchema;
}

export function EnumTypeComponent({ type }: IEnumTypeComponentProps) {
  const [isOpened, setIsOpened] = useState(false);

  if (!type) {
    return;
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
            <div>
              <b>description:</b>
            </div>
            <div>{type.description}</div>
          </div>
        )}
        <div className="pl-2 mb-2 border-l-4 border-indigo-500">
          <div>
            <b>Enum values:</b>
          </div>
          {type.enumValues.map((val) => (
            <div key={val.name}>
              <div className="mb-1">
                name: <b>{val.name}</b>
              </div>
              {val.description && <div>{val.description}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

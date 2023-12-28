'use client';

import {
  IntrospectionEnumType,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';

import { useState } from 'react';
import { IntrospectionEnumValueComponent } from './IntrospectionEnumValueCopmponent';
import { DescriptionFieldComponent } from '../shared/DescriptionFieldComponent';

interface IEnumTypeComponentProps {
  type: IntrospectionEnumType | undefined | null;
  schema: IntrospectionSchema;
}

// IntrospectionEnumType {
//   kind: 'ENUM';
//   name: string;
//   description?: Maybe<string>;
//   enumValues: Array<IntrospectionEnumValue>;
// }

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
        <DescriptionFieldComponent description={type.description} />
        <div className="pl-2 mb-2 border-l-4 border-indigo-500">
          <div className="mb-1">
            <b>Enum values:</b>
          </div>
          {type.enumValues.map((value) => (
            <IntrospectionEnumValueComponent
              value={value}
              key={`${type.name}_${value.name}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

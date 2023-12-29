'use client';

import {
  IntrospectionEnumType,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';

import { useState } from 'react';
import { IntrospectionEnumValueComponent } from './IntrospectionEnumValueCopmponent';
import { DescriptionFieldComponent } from '../shared/DescriptionFieldComponent';
import { SimpleBlockComponent } from '../shared/SimpleBlockComponent';

interface IIntrospectionEnumTypeComponentProps {
  type: IntrospectionEnumType | undefined | null;
  schema: IntrospectionSchema;
  isOpenedSet?: boolean;
}

// IntrospectionEnumType {
//   kind: 'ENUM';
//   name: string;
//   description?: Maybe<string>;
//   enumValues: Array<IntrospectionEnumValue>;
// }

export function IntrospectionEnumTypeComponent({
  type,
  isOpenedSet = false,
}: IIntrospectionEnumTypeComponentProps) {
  const [isOpened, setIsOpened] = useState(isOpenedSet);

  if (!type) {
    return;
  }

  return (
    <div className="pl-2 mb-2 border-l-4 border-indigo-500">
      <div
        className="mb-1 cursor-pointer"
        onClick={() => setIsOpened(!isOpened)}
      >
        type: {type.kind}: <i>{type.name}</i>
      </div>
      <div className={isOpened ? '' : 'hidden'}>
        <DescriptionFieldComponent description={type.description} />
        <SimpleBlockComponent
          title={`ENUM values: ${type.enumValues.length}`}
          inside={type.enumValues.map((value) => (
            <IntrospectionEnumValueComponent
              value={value}
              key={`${type.name}_${value.name}`}
            />
          ))}
        />
      </div>
    </div>
  );
}

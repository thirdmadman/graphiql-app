'use client';

import {
  IntrospectionSchema,
  IntrospectionType,
} from '@/lib/utils/gql/introspectionImportedTypes';

import { useState } from 'react';
import { IntrospectionInputValueComponent } from './IntrospectionInputValueComponent';
import { EnumTypeComponent } from './enum/EnumTypeComponent';
import { DescriptionFieldComponent } from './shared/DescriptionFieldComponent';
import { IntrospectionObjectTypeComponent } from './IntrospectionObjectTypeComponent';

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
    return <IntrospectionObjectTypeComponent type={type} schema={schema} />;
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

  if (type.kind === 'ENUM') {
    return <EnumTypeComponent type={type} schema={schema} />;
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
      </div>
    </div>
  );
}

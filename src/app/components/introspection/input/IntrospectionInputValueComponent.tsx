'use client';

import {
  IntrospectionInputValue,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';

import { useState } from 'react';
import { IntrospectionInputValueTypeComponent } from './IntrospectionInputValueTypeComponent';
import { DescriptionFieldComponent } from '../shared/DescriptionFieldComponent';
import { IsDeprecatedFieldComponent } from '../shared/IsDeprecatedFieldComponent';
import { DeprecationReasonComponent } from '../shared/DeprecationReasonComponent';

interface IIntrospectionInputValueComponentProps {
  inputValue: IntrospectionInputValue | undefined | null;
  schema: IntrospectionSchema;
}

// interface IntrospectionInputValue {
//   name: string;
//   description?: Maybe<string>;
//   type: IntrospectionInputTypeRef;
//   defaultValue: Maybe<string>;
//   isDeprecated?: boolean;
//   deprecationReason?: Maybe<string>;
// }

export function IntrospectionInputValueComponent({
  inputValue,
  schema,
}: IIntrospectionInputValueComponentProps) {
  const [isOpened, setIsOpened] = useState(false);

  if (!inputValue) {
    return;
  }

  if (inputValue.type.kind === 'LIST' || inputValue.type.kind === 'NON_NULL') {
    return (
      <div className="pl-2 mb-2 border-l-4 border-indigo-500">
        <div
          className="mb-1 cursor-pointer"
          onClick={() => setIsOpened(!isOpened)}
        >
          <b>{inputValue.name}</b>
        </div>
        <div className={isOpened ? '' : 'hidden'}>
          <div className="pl-2 mb-2 border-l-4 border-indigo-500">
            <div className="mb-1">of type: {inputValue.type.kind}:</div>
            <div className={isOpened ? '' : 'hidden'}>
              <IntrospectionInputValueTypeComponent
                type={inputValue.type.ofType}
                schema={schema}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pl-2 mb-2 border-l-4 border-indigo-500">
      <div
        className="mb-1 cursor-pointer"
        onClick={() => setIsOpened(!isOpened)}
      >
        <b>{inputValue.name}</b>
      </div>
      <div className={isOpened ? '' : 'hidden'}>
        <DescriptionFieldComponent description={inputValue.description} />
        <div className="pl-2 mb-2 border-l-4 border-indigo-500">
          <div>type: {inputValue.type.kind}:</div>
          <div>
            <IntrospectionInputValueTypeComponent
              type={inputValue.type}
              schema={schema}
            />
          </div>
        </div>
        {inputValue.defaultValue && (
          <div className="pl-2 mb-2 border-l-4 border-indigo-500">
            defaultValue: {inputValue.defaultValue}
          </div>
        )}
        <IsDeprecatedFieldComponent isDeprecated={inputValue.isDeprecated} />
        <DeprecationReasonComponent
          isDeprecated={inputValue.isDeprecated}
          deprecationReason={inputValue.deprecationReason}
        />
      </div>
    </div>
  );
}

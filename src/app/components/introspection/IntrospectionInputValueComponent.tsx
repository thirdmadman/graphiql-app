'use client';

import {
  IntrospectionInputValue,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';

import { useState } from 'react';
import { IntrospectionInputValueTypeComponent } from './IntrospectionInputValueTypeComponent';

interface IIntrospectionInputValueComponentProps {
  inputValue: IntrospectionInputValue | undefined | null;
  schema: IntrospectionSchema;
}

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
            <div>of type: {inputValue.type.kind}:</div>
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
        {inputValue.description && (
          <div className="pl-2 mb-2 border-l-4 border-indigo-500">
            description: {inputValue.description}
          </div>
        )}
        {inputValue.defaultValue && (
          <div className="pl-2 mb-2 border-l-4 border-indigo-500">
            defaultValue: {inputValue.defaultValue}
          </div>
        )}
        <div className="pl-2 mb-2 border-l-4 border-indigo-500">
          <div>type: {inputValue.type.kind}:</div>
          <div>
            <IntrospectionInputValueTypeComponent
              type={inputValue.type}
              schema={schema}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

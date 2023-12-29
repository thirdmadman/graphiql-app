'use client';

import {
  IntrospectionDirective,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';

import { useState } from 'react';
import { DescriptionFieldComponent } from '../shared/DescriptionFieldComponent';
import { IntrospectionInputValueComponent } from '../input/IntrospectionInputValueComponent';

interface IIntrospectionDirectiveComponentProps {
  directive: IntrospectionDirective | undefined | null;
  schema: IntrospectionSchema;
}

// interface IntrospectionDirective {
//   name: string;
//   description?: Maybe<string>;
//   isRepeatable?: boolean;
//   locations: Array<DirectiveLocation>;
//   args: Array<IntrospectionInputValue>;
// }

export function IntrospectionDirectiveComponent({
  directive,
  schema,
}: IIntrospectionDirectiveComponentProps) {
  const [isOpened, setIsOpened] = useState(false);

  if (!directive) {
    return;
  }

  return (
    <div className="pl-2 mb-2 border-l-4 border-indigo-500">
      <div
        className="mb-1 cursor-pointer"
        onClick={() => setIsOpened(!isOpened)}
      >
        <b>{directive.name}</b>
      </div>
      <div className={isOpened ? '' : 'hidden'}>
        <DescriptionFieldComponent description={directive.description} />
        {directive.isRepeatable && (
          <div className="pl-2 mb-2 border-l-4 border-indigo-500">
            <div className="mb-1">
              <b>isRepeatable:</b> {String(directive.isRepeatable)}
            </div>
          </div>
        )}
        {directive.args && directive.args.length > 0 && (
          <div className="pl-2 mb-2 border-l-4 border-indigo-500">
            <div className="mb-1">locations: {directive.locations.length}</div>
            <div className="flex flex-col">
              {directive.locations.map((location) => (
                <div key={location}>
                  <b>{location}</b>
                </div>
              ))}
            </div>
          </div>
        )}
        {directive.args && directive.args.length > 0 && (
          <div className="pl-2 mb-2 border-l-4 border-indigo-500">
            <div className="mb-1">args: {directive.args.length}</div>
            <div className="flex flex-col">
              {directive.args.map((inputValue) => (
                <IntrospectionInputValueComponent
                  schema={schema}
                  key={inputValue.name}
                  inputValue={inputValue}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

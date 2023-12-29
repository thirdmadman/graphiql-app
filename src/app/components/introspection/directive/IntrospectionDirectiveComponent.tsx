'use client';

import {
  IntrospectionDirective,
  IntrospectionSchema,
} from '@/lib/utils/gql/introspectionImportedTypes';

import { useState } from 'react';
import { DescriptionFieldComponent } from '../shared/DescriptionFieldComponent';
import { IntrospectionInputValueComponent } from '../input/IntrospectionInputValueComponent';
import { SimpleBlockComponent } from '../shared/SimpleBlockComponent';

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
          <SimpleBlockComponent
            title={
              <>
                <b>isRepeatable:</b> {String(directive.isRepeatable)}
              </>
            }
          />
        )}
        {directive.args && directive.args.length > 0 && (
          <SimpleBlockComponent
            title={`locations: ${directive.locations.length}`}
            inside={directive.locations.map((location) => (
              <div key={location}>
                <b>{location}</b>
              </div>
            ))}
          />
        )}
        {directive.args && directive.args.length > 0 && (
          <SimpleBlockComponent
            title={`args: ${directive.args.length}`}
            inside={directive.args.map((inputValue) => (
              <IntrospectionInputValueComponent
                schema={schema}
                key={inputValue.name}
                inputValue={inputValue}
              />
            ))}
          />
        )}
      </div>
    </div>
  );
}
